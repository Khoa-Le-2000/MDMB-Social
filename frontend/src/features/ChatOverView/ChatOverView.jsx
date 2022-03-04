import { getMessagesLatest, selectRoom } from 'app/actions/chat';
import { getListMessageLatest, getPartner } from 'app/selectors/chat';
import { getAuth } from 'app/selectors/login';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  height: 100vh;
  overflow: hidden;
`;
const RowBS = styled(Row)`
  height: inherit;
`;
const ColBS = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;

let socket;
function ChatOverView() {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [currentWindow, setCurrentWindow] = React.useState(roomId);
  const [typing, setTyping] = React.useState(false);
  const navigate = useNavigate();
  const messages = useSelector(getListMessageLatest);
  const partner = useSelector(getPartner);

  React.useEffect(() => {
    socket = io?.connect(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
      auth: { token: auth?.accessToken },
      query: { accountId: auth?.accountId },
    });
  }, [auth?.accessToken, auth?.refreshToken, auth?.accountId]);

  React.useEffect(() => {
    socket?.on('typing', (typingId) => {
      if (+typingId === +roomId) {
        setTyping(true);
      }
    });
    socket?.on('stop typing', (typingId) => {
      if (+typingId === +roomId) {
        setTyping(false);
      }
    });
  }, [roomId]);

  React.useEffect(() => {
    socket?.on('chat message', (data) => {
      console.log('🚀 :: file: ChatOverView.jsx :: line 59 :: data', data);
    });
  }, [messages]);

  const handleTyping = ({ isTyping }) => {
    if (isTyping) {
      console.log('typing');
      socket.emit('typing', roomId);
    } else {
      console.log('stop typing');
      socket.emit('stop typing', roomId);
    }
  };

  const handleSendMessage = (message) => {
    console.log('🚀 :: file: ChatOverView.jsx :: line 68 :: message', message);
    socket.emit('chat message', message, roomId, (res) => {
      if (res === 'ok') {
      }
    });
  };

  const handleSelectRoomClick = (conversation) => {
    setCurrentWindow(conversation.AccountId);
    dispatch(selectRoom(conversation));
    navigate(`/chat/${conversation.AccountId}`);
    dispatch(getMessagesLatest(auth?.accountId, conversation.AccountId));
  };

  return (
    <Wrapper fluid>
      <RowBS>
        <ColBS lg={3} xs={3} md={3}>
          <ChatConversations onSelectRoom={handleSelectRoomClick} />
        </ColBS>
        <ColBS lg={9} xs={9} md={9}>
          <ChatWindow
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            myAccountId={auth?.accountId}
            partner={partner}
            messages={messages}
            currentWindow={currentWindow}
            typing={typing}
          />
        </ColBS>
      </RowBS>
    </Wrapper>
  );
}

export default ChatOverView;
