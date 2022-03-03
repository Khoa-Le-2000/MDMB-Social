import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 5px;
`;
function WindowContent({ messages, myAccountId }) {
  return (
    <Wrapper>
      {messages ? (
        <Messages messages={messages} myAccountId={myAccountId} />
      ) : (
        <MessageEmpty />
      )}
    </Wrapper>
  );
}
export default WindowContent;
