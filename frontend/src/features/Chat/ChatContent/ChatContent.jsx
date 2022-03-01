import MessageSender from 'features/Chat/ChatContent/MessageSender/MessageSender';
import MessageReceiver from 'features/Chat/ChatContent/MessageReceiver/MessageReceiver';
import ChatHeader from 'features/Chat/ChatHeader/ChatHeader';
import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import ChatInput from 'features/Chat/ChatInput/ChatInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const WrapperMessageContent = styled.div`
  overflow: auto;
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  padding: 0;
`;
const RowContent = styled(Row)`
background: linear-gradient(90deg, rgba(133,123,231,1) 0%, rgba(211,140,242,1) 35%, rgba(243,81,175,1) 100%);


`
const RowBS = styled(Row)`
  height: inherit;
  padding-bottom: 10px;

`;
const ColBS = styled(Col)`
`;

function ChatContent() {
  return (
    <Wrapper>
      <ChatHeader />
      <RowContent>
        <WrapperMessageContent>
          <Col lg={12}>
            {Array.from({ length: 2 }).map((item, index) => (
              <MessageSender key={index} />
            ))}
            {Array.from({ length: 4 }).map((item, index) => (
              <MessageReceiver key={index} />
            ))}
            {Array.from({ length: 2 }).map((item, index) => (
              <MessageSender key={index} />
            ))}
          </Col>
          <Col lg={12}>
            {Array.from({ length: 2 }).map((item, index) => (
              <MessageSender key={index} />
            ))}
            {Array.from({ length: 4 }).map((item, index) => (
              <MessageReceiver key={index} />
            ))}
          </Col>
        </WrapperMessageContent>
      </RowContent>
      <RowBS>
        <ColBS>
          <ChatInput />
        </ColBS>
      </RowBS>
    </Wrapper>
  );
}
export default ChatContent;
