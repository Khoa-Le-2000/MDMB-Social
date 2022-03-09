import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 5px;
  
`;

function WindowContent({ messages, partner, typing }) {
  return (
    <Wrapper>
      {messages.length > 0 ? (
        <Messages messages={messages} partner={partner} typing={typing} />
      ) : (
        <MessageEmpty />
      )}
    </Wrapper>
  );
}
export default WindowContent;
