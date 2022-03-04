import { getMessagesLatest } from 'app/actions/chat';
import { getListMessageLatest, getPartner } from 'app/selectors/chat';
import ChatInput from 'features/ChatOverView/ChatBox/ChatBox';
import ChatHeader from 'features/ChatOverView/ChatHeader/ChatHeader';
import WindowContent from 'features/ChatOverView/ChatWindow/WindowContent/WindowContent';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;
const RowMessageInner = styled(Row)`
  background: linear-gradient(
    90deg,
    rgba(133, 123, 231, 1) 0%,
    rgba(211, 140, 242, 1) 35%,
    rgba(243, 81, 175, 1) 100%
  );
  margin: 0;
`;
const WrapperMessageContent = styled.div`
  padding: 10px;
  overflow: auto;
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
`;
const RowBS = styled(Row)`
  height: inherit;
  margin: 0;
`;
const ColBS = styled(Col)``;

function ChatWindow({
  onSendMessage,
  onTyping,
  currentWindow,
  myAccountId,
  messages,
  partner,
  typing,
}) {
  const { roomId } = useParams();
  console.log(+roomId, +currentWindow);
  return (
    <Wrapper>
      <ChatHeader />
      <RowMessageInner>
        <WrapperMessageContent>
          <Col lg={12}>
            {+roomId === +currentWindow ? (
              <WindowContent
                messages={messages}
                partner={partner}
                typing={typing}
              />
            ) : (
              <WindowEmpty />
            )}
          </Col>
        </WrapperMessageContent>
      </RowMessageInner>
      <RowBS>
        <ColBS>
          <ChatInput onSendMessage={onSendMessage} onTyping={onTyping} />
        </ColBS>
      </RowBS>
    </Wrapper>
  );
}
export default ChatWindow;
