import CardMessage from 'features/ChatOverView/ChatWindow/WindowContent/Messages/CardMessage/CardMessage';
import React from 'react';
import { getAuth } from 'app/selectors/login';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { getSeenLatest } from 'app/selectors/chat';

const dotTyping = keyframes`
  0% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
  16.667% {
    box-shadow: 9984px -10px 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
  33.333% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
  50% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px -10px 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
  66.667% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
  83.333% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px -10px 0 0 #9880ff;
  }
  100% {
    box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  }
`;
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  padding: 0 62px;
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: 0px 25px 25px 25px;
  border-bottom: 3px solid #81d4f9;
  background: linear-gradient(90deg, #cfd9df 0%, #e2ebf0 100%);
  color: #434354;
  width: 80px;
  position: relative;
`;
const WrapperMessage = styled.div`
  padding: 10px;
`;

const CardTyping = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DotFalling = styled.div`
  position: relative;
  left: -9999px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
  animation: ${dotTyping} 1.5s infinite linear;
`;

const WrapperScroll = styled.div``;

function Messages({ messages, partner, typing, onSeenMessage }) {
  const myAccountId = useSelector(getAuth)?.accountId;
  const seenDateLatest = useSelector(getSeenLatest);
  const messagesEndRef = React.useRef();

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [messages]);

  return (
    <>
      {messages.map((item) => (
        <WrapperScroll key={item.MessageId}>
          <CardMessage
            messageId={item.MessageId}
            seenDate={item.SeenDate}
            sentDate={item.SentDate}
            name={partner.Name}
            avatar={partner.Avatar}
            fromAccount={item.FromAccount}
            content={item.Content}
            type={item.Type === 0 ? 'text' : 'image'}
            owner={item.FromAccount === myAccountId}
            onSeenMessage={onSeenMessage}
            seenLatest={
              item.seenLatest || seenDateLatest?.MessageId === item.MessageId
            }
          />
          <div ref={messagesEndRef} />
        </WrapperScroll>
      ))}
      {typing && (
        <Wrapper>
          <WrapperContent>
            <WrapperMessage>
              <CardTyping>
                <DotFalling />
              </CardTyping>
            </WrapperMessage>
          </WrapperContent>
        </Wrapper>
      )}
    </>
  );
}
export default Messages;
