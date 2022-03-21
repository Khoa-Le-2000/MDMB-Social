import {
  getMessagesLatest,
  receiveMessage,
  seenMessage,
  selectRoom,
  sendMessage,
} from 'app/actions/chat';
import { getAuth } from 'app/selectors/login';
import ChatConversations from 'features/ChatOverView/ChatConversations/ChatConversations';
import ChatWindow from 'features/ChatOverView/ChatWindow/ChatWindow';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from 'features/ChatOverView/Sidebar/Sidebar';
import { getConversations } from 'app/selectors/conversations';
import {
  addUserOnline,
  getListUsersOnline,
  initSocket,
  addUserOffline,
} from 'app/actions/socket';
import {
  getListConversation,
  updateCountUnreadConversation,
  updateListConversationWithNewMessage,
} from 'app/actions/conversations';
import LeftSide from 'features/Contact/LeftSide/LeftSide';

const Wrapper = styled(Container)`
  height: 100vh;
  overflow: hidden;
  padding: 0;
  flex-direction: row;
  display: flex;
`;
const RowBS = styled(Row)`
  height: inherit;
`;
const ColBS1 = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  background-color: #efeff3;
`;
const ColBS2 = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;
const LeftBar = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  min-width: 80px;
  width: 80px;
  background-color: #efeff3;
  margin:0px;
`;
const LeftSideWrapper = styled.div`
  min-width:380px;
  background-color: #efeff3;
  padding:5px;
`;
const RightSideWrapper = styled.div`
  /* background-color: blue; */
  width: 100%;
`;

export default function Contact() {
  return (
    <Wrapper fluid>
      <LeftBar >
        <Sidebar ContactActive={true} />
      </LeftBar>

      <LeftSideWrapper>
        <LeftSide />
      </LeftSideWrapper>
      <RightSideWrapper></RightSideWrapper>
    </Wrapper>
  );
}
