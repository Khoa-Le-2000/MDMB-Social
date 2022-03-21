import MessageEmpty from 'features/ChatOverView/ChatWindow/WindowContent/MessageEmpty/MessageEmpty';
import Messages from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Messages';
import React from 'react';
import { getFetchingMessage, getListMessageLatest } from 'app/selectors/chat';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAuth } from 'app/selectors/login';
import { getMessagesLatest } from 'app/actions/chat';
import { useParams } from 'react-router-dom';

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
