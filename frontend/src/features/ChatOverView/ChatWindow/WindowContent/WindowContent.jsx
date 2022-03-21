import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import { getListMessageLatest } from 'app/selectors/chat';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MessageLoading from './MessageLoading/MessageLoading';

const Wrapper = styled.div`
  padding: 0px 5px;
  width: 100%;
  height: 100%;
`;

function WindowContent({ typing, onSeenMessage }) {
  const messagesLatest = useSelector(getListMessageLatest);
  console.log('messagesLatest', messagesLatest);
  return (
    <Wrapper>
      {messagesLatest.listMessage ? (
        !messagesLatest.noMessage && messagesLatest.listMessage ? (
          <Messages typing={typing} onSeenMessage={onSeenMessage} />
        ) : (
          <MessageEmpty />
        )
      ) : (
        <MessageLoading />
      )}
    </Wrapper>
  );
}
export default WindowContent;
