import { Search } from '@styled-icons/heroicons-solid';
import { getConversations } from 'app/selectors/conversations';
import { getAuth } from 'app/selectors/login';
import CardConversation from 'features/ChatOverView/ChatConversations/CardConversation/CardConversation';
import React, { useEffect } from 'react';
import { Form, InputGroup as BsInputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getListConversation } from 'app/actions/conversations';
import { useDispatch } from 'react-redux';

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
  @media (max-width: 1250px) {
    padding-bottom: 3%;
  }
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
// const SearchingPopOut = styled.div`
//   position: absolute;
//   z-index: 2;
//   width: calc(100% - 44px);
//   top: 100%;
//   left: 0px;
//   border-radius: 0 0 10px 10px;
//   background-color: #ffffff;
// `;
const SearchForm = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
`;
// const SearchItemWrapper = styled.div`
//   cursor: pointer;
// `;
// const UserNotFound = styled.div`
//   height: 30px;
//   margin: 10px 0 0 10px;
// `;

function listFriendSearch(listFriend, searchValue) {
  let tempListFriend = [];
  listFriend.forEach((element) => {
    if (element.Name.toLowerCase().includes(searchValue.toLowerCase()))
      tempListFriend.push(element);
  });
  return tempListFriend;
}

function ChatConversations({ onSelectRoom }) {
  const accountId = useSelector(getAuth)?.accountId;
  const dispatch = useDispatch();

  const listConversation = useSelector(getConversations);
  console.log();
  const listConversationSorted = listConversation.sort(
    (a, b) => Date.parse(b.SentDate) - Date.parse(a.SentDate)
  );
  const [allMessageSelected, setAllMessageSelected] = React.useState(true);
  const [unreadMessageSelected, setUnreadMessageSelected] =
    React.useState(false);

  const handleAllMessageClick = () => {
    setAllMessageSelected(true);
    setUnreadMessageSelected(false);
    // dispatch(getListConversation(accountId));
  };
  const handleMessageUnreadClick = () => {
    setAllMessageSelected(false);
    setUnreadMessageSelected(true);
  };
  //Searching friend list

  const [searchingFriendList, setSearchingFriendList] = React.useState(
    listConversationSorted
  );
  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setSearchingFriendList(
      listFriendSearch(listConversationSorted, searchValue)
    );
  }, [searchValue]);

  return (
    <SideBar>
      <Logo> MDMB Social</Logo>
      <SearchForm>
        <Form.Control placeholder="Searching" onChange={handleSearchChange} />
        <InputSearch>
          <IconSearch />
        </InputSearch>
      </SearchForm>
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
        {(searchingFriendList.length==0?listConversationSorted:searchingFriendList)?.map((item, index) =>
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
