import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 5px;
`;
function WindowContent({ messages }) {
  return (
    <Wrapper>
      {messages ? <Messages messages={messages} /> : <MessageEmpty />}
    </Wrapper>
  );
}
export default WindowContent;
