import { getFetchingMessage, getListMessageLatest } from 'app/selectors/chat';
import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 5px;
  width: 100%;
`;

function WindowContent({ typing, onSeenMessage }) {
  const messagesLatest = useSelector(getListMessageLatest);
  const isFetching = useSelector(getFetchingMessage);

  return (
    <Wrapper>
      {messagesLatest.length > 0 ? (
        <Messages typing={typing} onSeenMessage={onSeenMessage} />
      ) : isFetching ? (
        <div>Loading</div>
      ) : (
        <MessageEmpty />
      )}
    </Wrapper>
  );
}
export default WindowContent;
