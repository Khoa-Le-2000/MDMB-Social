import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button,
  Carousel,
  Col,
  Form,
  InputGroup as BsInputGroup,
  Row,
} from 'react-bootstrap';

import ChatCard from 'features/Chat/ChatCardConversation/ChatCard';
import { Search } from '@styled-icons/heroicons-solid';

const SideBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 5px;
  border-right: 1px solid rgba(24, 23, 23, 0.75);
`;
const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
const InputGroup = styled(BsInputGroup)`
  margin-bottom: 10px;
`;

const InputSearch = styled(InputGroup.Text)`
  cursor: pointer;
`;
const IconSearch = styled(Search)`
  width: 1.2rem;
`;
const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Tab = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f5f5f5;
    &::after {
      content: '';
      display: block;
      width: 2rem;
      height: 2px;
      background: #38d0ff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

function SideBarRight() {
  return (
    <SideBar>
      <Logo>MDMB Social</Logo>
      <InputGroup>
        <Form.Control placeholder="Password" />
        <InputSearch>
          <IconSearch />
        </InputSearch>
      </InputGroup>
      <Tabs>
        <Tab>All Convention</Tab>
        <Tab>All Convention</Tab>
      </Tabs>
      <Wrapper>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </Wrapper>
    </SideBar>
  );
}
export default SideBarRight;
