import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 5px;
  background: linear-gradient(
    90deg,
    rgba(133, 123, 231, 1) 0%,
    rgba(211, 140, 242, 1) 35%,
    rgba(243, 81, 175, 1) 100%
  );
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
