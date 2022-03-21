import { Search } from '@styled-icons/heroicons-solid';
import { getConversations } from 'app/selectors/conversations';
import { getAuth } from 'app/selectors/login';
import CardConversation from 'features/ChatOverView/ChatConversations/CardConversation/CardConversation';
import React from 'react';
import { Form, InputGroup as BsInputGroup, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchChatConversation from 'features/ChatOverView/ChatConversations/Search/Search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileSelector } from 'app/selectors/userProfile';

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
  padding-top: 2%;
  padding-bottom: 3%;
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
const SearchingPopOut = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  top: 100%;
  left: 0px;
  width: 86%;
  border-radius: 0 0 10px 10px;
  background-color: #ffffff;
`;
const SearchForm = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
`;
const SearchItemWrapper = styled.div`
  cursor: pointer;
`;
const UserNotFound = styled.div`
  height: 30px;
  margin: 10px 0 0 10px;
`;
const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const FriendCount = styled.div`
  margin: 10px 10px 0px 10px;
  font-size: 1rem;
  color: #848181;
`;
const FriendList = styled.div`
  margin-right: auto;
  width: 100%;
`;
const FriendCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  background-color: #efeff3;
  &:hover {
    filter: brightness(85%);
  }
`;
const Avatar = styled.div`
  width: 30%;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.div`
  width: 100%;
  color: #000000;
  justify-content: center;
  align-self: center;
`;
function listFriendSearch(listFriend, searchValue) {
  let tempListFriend = [];
  listFriend.forEach((element) => {
    if (element.Name.toLowerCase().includes(searchValue.toLowerCase()))
      tempListFriend.push(element);
  });
  return tempListFriend;
}
export default function LeftSide() {
  const navigate = useNavigate();
  const listConversation = useSelector(getConversations);
  const listConversationSorted = listConversation.sort(
    (a, b) => Date.parse(b.SentDate) - Date.parse(a.SentDate)
  );

  //Searching friend list
  const [searchingFriendList, setSearchingFriendList] =
    React.useState(listConversation);
  const [showListSearch, SetShowListSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchClick = (e) => {
    SetShowListSearch(true);
  };

  const handleItemSelected = (AccountId) => {
    navigate(`/userinfor/${AccountId}`);
  };
  const handleSearchBlur = () => {
    setTimeout(() => {
      SetShowListSearch(false);
    }, 100);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    setSearchingFriendList(
      listFriendSearch(listConversationSorted, searchValue)
    );
  }, [searchValue]);

  const handleFriendCardClick = (AccountId) => {
    navigate(`/chat/${AccountId}`)
  };

  return (
    <LeftSideWrapper>
      <Logo> MDMB Social</Logo>
      <SearchForm>
        <Form.Control
          placeholder="Searching"
          onClick={handleSearchClick}
          onBlur={handleSearchBlur}
          onChange={handleSearchChange}
        />
        <InputSearch>
          <IconSearch />
        </InputSearch>
        {showListSearch && searchValue !== '' && (
          <SearchingPopOut>
            {searchingFriendList.length > 0 ? (
              searchingFriendList?.map((item, index) => (
                <SearchItemWrapper
                  key={index}
                  onClick={() => {
                    handleItemSelected(item.AccountId);
                  }}
                >
                  <SearchChatConversation item={item} />
                </SearchItemWrapper>
              ))
            ) : (
              <UserNotFound> Không có người dùng này!</UserNotFound>
            )}
          </SearchingPopOut>
        )}
      </SearchForm>
      <FriendList>
        <FriendCount>Friend({listConversation?.length})</FriendCount>
        {listConversation?.map((item,index) => (
          <FriendCard key={index}onClick={()=>{handleFriendCardClick(item.AccountId)}}>
            <Avatar>
              <img src={item.Avatar}></img>
            </Avatar>
            <Name>{item.Name}</Name>
          </FriendCard>
        ))}
      </FriendList>
    </LeftSideWrapper>
  );
}
