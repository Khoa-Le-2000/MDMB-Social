import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import io from 'socket.io-client';
import React from 'react';
import { getAuth } from 'app/selectors/loginSelector';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesLatest } from 'app/actions/chat';

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
  const [currentWindow, setCurrentWindow] = React.useState(false);

  React.useEffect(() => {
    socket = io?.connect(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
      auth: { token: auth?.accessToken },
      query: { accountId: auth?.accountId },
    });
  }, [auth?.accessToken, auth?.refreshToken, auth?.accountId]);

  const handleMessageChange = (messageChange) => {
    if (messageChange > 0) {
      socket.emit('typing', '4');
    } else {
      socket.emit('stop typing', '4');
    }
  };

  const handleSendMessage = (message) => {
    // socket.emit('chat message', message, '4', (res) => {
    //   if (res === 'ok') {
    //   }
    // });
  };

  const handleSelectRoomClick = (yourAccountId) => {
    setCurrentWindow(yourAccountId);
    dispatch(getMessagesLatest(auth?.accountId, yourAccountId));
  };

  const messages = [
    {
      MessageId: 101,
      FromAccount: 7,
      SentDate: '2022-03-02T06:57:44.000Z',
      Content: 'dfds',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 100,
      FromAccount: 7,
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'fdsdfd',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 43,
      FromAccount: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'fdsdfdfdsfd',
      Type: 0,
      ToAccount: 7,
      SeenDate: null,
    },
    {
      MessageId: 432,
      FromAccount: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'ffff',
      Type: 0,
      ToAccount: 7,
      SeenDate: null,
    },
    {
      MessageId: 431,
      FromAccount: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'saaa',
      Type: 0,
      ToAccount: 7,
      SeenDate: null,
    },
    {
      MessageId: 434,
      FromAccount: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'fdsdfdfccccccdsfd',
      Type: 0,
      ToAccount: 7,
      SeenDate: null,
    },
    {
      MessageId: 97,
      FromAccount: 7,
      SentDate: '2022-03-02T06:37:48.000Z',
      Content: 'sd',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 4314,
      FromAccount: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      SentDate: '2022-03-02T06:53:34.000Z',
      Content: 'bvbb',
      Type: 0,
      ToAccount: 7,
      SeenDate: null,
    },
    {
      MessageId: 93,
      FromAccount: 7,
      SentDate: '2022-03-01T21:12:11.000Z',
      Content: 'oke la',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 92,
      FromAccount: 7,
      SentDate: '2022-03-01T21:12:06.000Z',
      Content: 'hay',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 91,
      FromAccount: 7,
      SentDate: '2022-03-01T21:09:45.000Z',
      Content: 'hay',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 90,
      FromAccount: 7,
      SentDate: '2022-03-01T21:09:31.000Z',
      Content: 'dfdfdsfds',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 89,
      FromAccount: 7,
      SentDate: '2022-03-01T21:09:28.000Z',
      Content: 'dfdfds',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
    {
      MessageId: 88,
      FromAccount: 7,
      SentDate: '2022-03-01T21:09:25.000Z',
      Content: 'df',
      Type: 0,
      ToAccount: 4,
      SeenDate: null,
    },
  ];

  return (
    <Wrapper fluid>
      <RowBS>
        <ColBS lg={3}>
          <ChatConversations onSelectRoom={handleSelectRoomClick} />
        </ColBS>
        <ColBS lg={9}>
          <ChatWindow
            onSendMessage={handleSendMessage}
            onChangeMessage={handleMessageChange}
            messages={messages}
            myAccountId={auth?.accountId}
            currentWindow={currentWindow}
          />
        </ColBS>
      </RowBS>
    </Wrapper>
  );
}

export default ChatOverView;
