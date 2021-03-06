import {
  getMessagesLatest,
  receiveMessage,
  updateSeenMessage,
  selectRoom,
  sendMessage,
} from 'app/actions/chat';
import {
  getListConversation,
  updateCountUnreadConversation,
  updateListConversationWithNewMessage,
  updateListConversationWithSeenMessage,
  updateListConversationWithSentMessage,
} from 'app/actions/conversations';
import {
  addUserOffline,
  addUserOnline,
  getListUsersOnline,
  initSocket,
} from 'app/actions/socket';
import { getConversations } from 'app/selectors/conversations';
import { getAuth } from 'app/selectors/login';
import { getSocket } from 'app/selectors/socket';
import LoadingOverlay from 'components/LoadingOverlay';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import Sidebar from 'features/ChatOverView/Sidebar/Sidebar';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
const Wrapper = styled(Container)`
  height: 100vh;
  overflow: hidden;
  padding-right: 0;
`;
const RowBS = styled(Row)`
  height: inherit;
`;
const ColBS1 = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  background-color: #efeff3;
  width: 25%;
  @media (max-width: 1250px) {
    width: calc(100% - 90px);
    display: ${(props) => (props.active ? 'none' : 'unset')};
  }
`;
const ColBS2 = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  width: calc(75% - 80px);
  @media (max-width: 1250px) {
    width: calc(100% - 90px);
    display: ${(props) => (props.active ? 'unset' : 'none')};
  }
`;
const LeftBar = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  width: 80px;
  background-color: #efeff3;
`;

function ChatOverView() {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const navigate = useNavigate();
  const socket = useSelector(getSocket);
  const listConversation = useSelector(getConversations);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    if (!socket) {
      dispatch(initSocket(auth?.accountId, auth?.accessToken));
    }
    dispatch(getListConversation(auth?.accountId));
  }, [auth?.accessToken, socket, dispatch]);

  React.useEffect(() => {
    const listAccountId = listConversation.map((item) => item.AccountId);
    socket?.emit('get online', listAccountId, (data) => {
      dispatch(getListUsersOnline(data));
    });
  }, [socket, dispatch, listConversation]);

  React.useEffect(() => {
    socket?.on('user-online', function (accountId) {
      dispatch(addUserOnline(accountId));
    });
    socket?.on('user-offline', function (accountId) {
      dispatch(addUserOffline(accountId));
    });
  }, [dispatch, socket]);

  React.useEffect(() => {
    socket?.on('typing', (userId) => {
      if (+userId === +roomId) {
        setTyping(true);
      } else {
        setTyping(false);
      }
    });

    socket?.on('stop typing', (userId) => {
      if (+userId === +roomId) {
        setTyping(false);
      } else {
        setTyping(false);
      }
    });
  }, [roomId, socket]);

  React.useEffect(() => {
    socket?.on('seen message', (messageId) => {
      dispatch(updateSeenMessage(messageId));
      dispatch(updateListConversationWithSeenMessage(roomId));
    });
  }, [socket]);

  React.useEffect(() => {
    socket?.on('chat message', (data) => {
      if (roomId) {
        if (
          data.ToAccount === auth?.accountId &&
          data.FromAccount === +roomId
        ) {
          dispatch(receiveMessage(data));
        }
      }
      dispatch(updateListConversationWithNewMessage(data));
    });
    return () => {
      socket?.off('chat message');
    };
  }, [roomId, socket]);

  const handleTyping = ({ isTyping, partnerId }) => {
    if (isTyping) {
      socket?.emit('typing', partnerId);
    } else {
      socket?.emit('stop typing', partnerId);
    }
  };

  const handleSendMessage = (message) => {
    socket?.emit('chat message', message, roomId, (status, data) => {
      if (status === 'ok' && +data.ToAccount === +roomId) {
        dispatch(sendMessage(data));
        dispatch(updateListConversationWithSentMessage(data));
      }
    });
  };

  const handleSelectRoomClick = (conversation) => {
    if (+conversation.AccountId !== +roomId) {
      dispatch(selectRoom(conversation, navigate));
      dispatch(getMessagesLatest(auth?.accountId, conversation.AccountId));
    }
  };

  const handleSeenMessage = (latestMessageId, partnerId) => {
    if (latestMessageId) {
      dispatch(updateSeenMessage(latestMessageId));
      dispatch(updateCountUnreadConversation(partnerId));
      socket?.emit('seen message', latestMessageId);
    }
  };

  return socket ? (
    <Wrapper fluid>
      <RowBS>
        <LeftBar lg={1} xs={1} md={1}>
          <Sidebar MessageActive={true} />
        </LeftBar>
        <ColBS1 lg={3} xs={3} md={3} active={roomId ? 1 : 0}>
          <ChatConversations onSelectRoom={handleSelectRoomClick} />
        </ColBS1>
        <ColBS2 lg={8} xs={8} md={8} active={roomId ? 1 : 0}>
          {roomId ? (
            <ChatWindow
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              myAccountId={auth?.accountId}
              typing={typing}
              onSeenMessage={handleSeenMessage}
            />
          ) : (
            <WindowEmpty />
          )}
        </ColBS2>
      </RowBS>
    </Wrapper>
  ) : (
    <LoadingOverlay />
  );
}

export default ChatOverView;
