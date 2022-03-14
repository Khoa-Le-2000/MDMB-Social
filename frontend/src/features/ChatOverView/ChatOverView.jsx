import {
  getMessagesLatest,
  receiveMessage,
  seenMessage,
  selectRoom,
  sendMessage,
} from 'app/actions/chat';
import { getListMessageLatest, getPartner } from 'app/selectors/chat';
import { getAuth } from 'app/selectors/login';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';
import Sidebar from 'features/ChatOverView/Sidebar/Sidebar';

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
  width: 6%;
  background-color: #efeff3;
`;

let socket;
function ChatOverView() {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [currentWindow, setCurrentWindow] = React.useState(roomId);
  const [isOnline, setIsOnline] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const navigate = useNavigate();
  const messagesLatest = useSelector(getListMessageLatest);

  const partner = useSelector(getPartner);

  React.useEffect(() => {
    socket = io?.connect(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
      auth: { token: auth?.accessToken },
      query: { accountId: auth?.accountId },
    });
  }, [auth?.accessToken, auth?.refreshToken, auth?.accountId]);

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
  }, [roomId]);

  React.useEffect(() => {
    socket?.on('seen message', (messageId) => {
      dispatch(seenMessage(messageId));
    });
  }, [dispatch]);

  // React.useEffect(() => {
  //   socket?.on('chat message yourself', (data) => {
  //     dispatch(receiveMessage(data));
  //   });
  // }, [dispatch]);

  React.useEffect(() => {
    socket?.on('chat message', (data) => {
      if (+data.FromAccount === +roomId && data.ToAccount !== +roomId) {
        dispatch(receiveMessage(data));
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    socket.on('user-online', function (accountId) {
      if (+accountId === +roomId) {
        setIsOnline(true);
      }
    });
  }, [roomId]);

  const handleTyping = ({ isTyping, partnerId }) => {
    if (isTyping) {
      socket.emit('typing', partnerId);
    } else {
      socket.emit('stop typing', partnerId);
    }
  };

  const handleSendMessage = (message) => {
    socket.emit('chat message', message, roomId, (status, data) => {
      if (status === 'ok' && +data.ToAccount === +roomId) {
        dispatch(sendMessage(data));
      }
    });
  };

  const handleSelectRoomClick = (conversation) => {
    setCurrentWindow(conversation.AccountId);
    dispatch(selectRoom(conversation));
    navigate(`/chat/${conversation.AccountId}`);
    dispatch(getMessagesLatest(auth?.accountId, conversation.AccountId));
  };

  const handleSeenMessage = (messageId) => {
    socket?.emit('seen message', messageId);
  };

  return (
    <Wrapper fluid>
      <RowBS>
        <LeftBar lg={1} xs={1} md={1}>
          <Sidebar />
        </LeftBar>
        <ColBS1 lg={3} xs={3} md={3}>
          <ChatConversations
            onSelectRoom={handleSelectRoomClick}
            messagesLatest={messagesLatest}
          />
        </ColBS1>
        <ColBS2 lg={8} xs={8} md={8}>
          {+roomId === +currentWindow ? (
            <ChatWindow
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              myAccountId={auth?.accountId}
              partner={partner}
              messages={messagesLatest}
              currentWindow={currentWindow}
              typing={typing}
              isOnline={isOnline}
              onSeenMessage={handleSeenMessage}
            />
          ) : (
            <WindowEmpty />
          )}
        </ColBS2>
      </RowBS>
    </Wrapper>
  );
}

export default ChatOverView;
