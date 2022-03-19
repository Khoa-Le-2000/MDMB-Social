import {
  getMessagesLatest,
  receiveMessage,
  seenMessage,
  selectRoom,
  sendMessage,
} from 'app/actions/chat';
import { getAuth } from 'app/selectors/login';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from 'features/ChatOverView/Sidebar/Sidebar';
import { getConversations } from 'app/selectors/conversations';
import {
  addUserOnline,
  getListUsersOnline,
  initSocket,
  addUserOffline,
} from 'app/actions/socket';
import {
  getListConversation,
  updateCountUnreadConversation,
  updateListConversationWithNewMessage,
} from 'app/actions/conversations';
import { getSocket } from 'app/selectors/socket';

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
`;
const ColBS2 = styled(Col)`
  padding-left: 0;
  padding-right: 0;
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

  const [typing, setTyping] = React.useState(false);
  const navigate = useNavigate();
  const socket = useSelector(getSocket);
  const listConversation = useSelector(getConversations);

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
  }, [listConversation, socket, dispatch]);

  React.useEffect(() => {
    console.log('check user online', socket);
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
      dispatch(seenMessage(messageId));
    });
  }, [dispatch, socket]);

  React.useEffect(() => {
    if (roomId) {
      socket?.on('chat message', (data) => {
        if (
          data.ToAccount === auth?.accountId &&
          data.FromAccount === +roomId
        ) {
          dispatch(receiveMessage(data));
        }
        dispatch(updateListConversationWithNewMessage(data));
      });
    }
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
        dispatch(getListConversation(auth?.accountId));
      }
    });
  };

  const handleSelectRoomClick = (conversation) => {
    if (+conversation.AccountId !== +roomId) {
      dispatch(selectRoom(conversation));
      navigate(`/chat/${conversation.AccountId}`);
      dispatch(getMessagesLatest(auth?.accountId, conversation.AccountId));
    }
  };

  const handleSeenMessage = (messageId, partnerId) => {
    socket?.emit('seen message', messageId);
    dispatch(updateCountUnreadConversation(partnerId));
  };

  return socket ? (
    <Wrapper fluid>
      <RowBS>
        <LeftBar lg={1} xs={1} md={1} >
          <Sidebar MessageActive={true}/>
        </LeftBar>
        <ColBS1 lg={3} xs={3} md={3}>
          <ChatConversations onSelectRoom={handleSelectRoomClick} />
        </ColBS1>
        <ColBS2 lg={8} xs={8} md={8}>
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
    <div>Loading ...</div>
  );
}

export default ChatOverView;
