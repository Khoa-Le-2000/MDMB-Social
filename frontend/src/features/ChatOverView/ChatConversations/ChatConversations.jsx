import { Search } from '@styled-icons/heroicons-solid';
import { getConversations } from 'app/selectors/conversations';
import { getAuth } from 'app/selectors/login';
import CardConversation from 'features/ChatOverView/ChatConversations/CardConversation/CardConversation';
import React from 'react';
import { Form, InputGroup as BsInputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

function ChatConversations({ onSelectRoom }) {
  const accountId = useSelector(getAuth)?.accountId;
  const listConversation = useSelector(getConversations);
  console.log(listConversation)
  const listConversationSorted = listConversation.sort(
    (a, b) => Date.parse(b.SentDate) - Date.parse(a.SentDate)
  );
  const [allMessageSelected, setAllMessageSelected] = React.useState(true);
  const [unreadMessageSelected, setUnreadMessageSelected] =
    React.useState(false);

  const handleAllMessageClick = () => {
    setAllMessageSelected(true);
    setUnreadMessageSelected(false);
  };
  const handleMessageUnreadClick = () => {
    setAllMessageSelected(false);
    setUnreadMessageSelected(true);
  };

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
        <Tab onClick={handleAllMessageClick} selected={allMessageSelected}>
          All Message
        </Tab>
        <Tab
          onClick={handleMessageUnreadClick}
          selected={unreadMessageSelected}
        >
          Message unread
        </Tab>
      </Tabs>
      <Wrapper>
        {listConversationSorted?.map((item, index) =>
          allMessageSelected ? (
            <CardConversation
              key={index}
              onSelectRoom={onSelectRoom}
              conversation={item}
            />
          ) : (
            //message unread
            !item.SeenDate &&
            item.LastMessage &&
            item.FromAccount !== accountId && (
              <CardConversation
                key={index}
                onSelectRoom={onSelectRoom}
                conversation={item}
              />
            )
          )
        )}
      </Wrapper>
    </SideBar>
  );
}
export default ChatConversations;
