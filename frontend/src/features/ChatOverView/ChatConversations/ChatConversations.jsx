import { Search } from '@styled-icons/heroicons-solid';
import LogoImg from 'assets/images/logos/logo.jpg';
import CardConvention from 'features/ChatOverView/ChatConversations/CardConversation/CardConversation';
import { Form, InputGroup as BsInputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListConversation } from 'app/actions/conversations';
import { getAuth } from 'app/selectors/login';
import { getConversations } from 'app/selectors/conversations';

const SideBar = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;

  padding: 0 5px;
  border-right: 1px solid rgba(24, 23, 23, 0.75);
`;
const Logo = styled.div`
  height: 7%;
  align-self: center;
  padding-top: 3%;
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
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; //Firefox
`;
const Tabs = styled.div`
  display: flex;
`;
const Tab = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  ${(props) => (props.selected ? 'color:#7a7abb' : '')};
  ::after {
    content: '';
    display: block;
    width: 2rem;
    height: 2px;
    background: #7a7abb;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: ${(props) => (props.selected ? '1' : '0')};
  }
  &:hover {
    background: #f5f5f5;
    ::after {
      opacity: 1;
    }
  }
`;

function ChatConversations({ onSelectRoom, messagesLatest }) {
  const dispatch = useDispatch();
  const accountId = useSelector(getAuth)?.accountId;
  const listConversation = useSelector(getConversations);
  if (listConversation.length > 0)
    listConversation.sort(
      (a, b) => Date.parse(b.SentDate) - Date.parse(a.SentDate)
    );
    console.log(listConversation);

  React.useEffect(() => {
    dispatch(getListConversation(accountId));
  }, [accountId, dispatch, messagesLatest]);

  return (
    <SideBar>
      <Logo> MDMB Social</Logo>
      <InputGroup>
        <Form.Control placeholder="Searching" />
        <InputSearch>
          <IconSearch />
        </InputSearch>
      </InputGroup>
      <Tabs>
        <Tab selected>All Message</Tab>
        <Tab>Message unread</Tab>
      </Tabs>
      <Wrapper>
        {listConversation &&
          listConversation?.map((item, index) => (
            <CardConvention
              key={index}
              onSelectRoom={onSelectRoom}
              conversation={item}
            />
          ))}
      </Wrapper>
    </SideBar>
  );
}
export default ChatConversations;
