import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import SideBarLeft from 'features/ChatOverView/SideBarLeft/SideBarLeft';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import io from 'socket.io-client';
import React from 'react';
import { getAuth } from 'app/selectors/loginSelector';
import { useSelector } from 'react-redux';

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

  const handleSelectRoomClick = (roomId) => {
    setCurrentWindow(roomId);
  };

  const messages = [
    {
      id: 1,
      name: 'David',
      message: 'Hi. How’s it going? ',
      time: '12:00',
      seen: true,
      owner: 'me',
      type: 'text',
    },
    {
      id: 2,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      name: 'John',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur hic, voluptatum ipsa vel tempora omnis facere quidem consectetur quasi veniam molestiae exercitationem dolorum reiciendis nisi expedita eum quo architecto nam.Odio quae doloribus non architecto eveniet ipsam dicta accusamus sint aut repellendus eaque sunt at fugit ex ab enim adipisci natus debitis, id praesentium quibusdam repudiandae, facilis laborum. Sequi, maiores?',
      time: '12:00',
      seen: true,
      owner: 'you',
      type: 'text',
    },
    {
      id: 3,
      name: 'David',
      message: 'Pretty good. My name is David. What’s your name?',
      time: '12:00',
      seen: true,
      owner: 'me',
      type: 'text',
    },
    {
      id: 4,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      name: 'John',
      message: `I'm John. Nice to meet you.`,
      time: '12:00',
      seen: true,
      owner: 'you',
      type: 'text',
    },
    {
      id: 5,
      name: 'David',
      message: 'Nice to meet you, too',
      time: '12:00',
      seen: true,
      owner: 'me',
      type: 'text',
    },
    {
      id: 6,
      avatar:
        'https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      name: 'John',
      message: `Well, it’s time for class. See you later`,
      time: '12:00',
      seen: true,
      owner: 'you',
      type: 'text',
    },
    {
      id: 7,
      name: 'David',
      message: 'Take it easy. See you soon!',
      time: '12:00',
      seen: false,
      owner: 'me',
      type: 'text',
    },
  ];

  return (
    <Wrapper fluid>
      <RowBS>
        <ColBS lg={3}>
          <SideBarLeft onSelectRoom={handleSelectRoomClick} />
        </ColBS>
        <ColBS lg={9}>
          <ChatWindow
            onSendMessage={handleSendMessage}
            onChangeMessage={handleMessageChange}
            messages={messages}
            currentWindow={currentWindow}
          />
        </ColBS>
      </RowBS>
    </Wrapper>
  );
}

export default ChatOverView;
