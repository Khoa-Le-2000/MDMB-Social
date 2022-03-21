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
import { getMessagesLatest, selectRoom } from 'app/actions/chat';
const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Logo = styled.div`
  height: 7%;
  align-self: center;
  padding-top: 2%;
  padding-bottom: 3%;
  justify-content: center;
  @media (max-width: 700px) {
    margin-left: auto;
    padding-top: 8%;
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
const SearchingPopOut = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0px;
  width: calc(100% - 44px);
  border-radius: 0 0 10px 10px;
  background-color: #ffffff;
  min-width: 300px;
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

const FriendList = styled.div`
  margin-right: auto;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const FriendCount = styled.div`
  margin: 10px 10px 0px 10px;
  font-size: 1rem;
  color: #848181;
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
  width: 20%;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 1250px) {
      width: 40px;
      height: 40px;
    }
  }
`;
const Name = styled.div`
  height: 50%;
  width: calc(80% - 10px);
  color: #000000;
  justify-content: center;
  align-self: center;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1250px) {
    margin-left: 10px;
  }
  @media (max-width: 800px) {
    margin-left: 20px;
  }
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
  const dispatch = useDispatch();
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
    navigate(`/chat/${AccountId}`);
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
      </SearchForm>
      <FriendList>
        <FriendCount>Friend({listConversation?.length})</FriendCount>
        {searchingFriendList.length === 0 && (
          <UserNotFound> Không có người dùng này!</UserNotFound>
        )}
        {searchingFriendList?.map((item, index) => (
          <FriendCard
            key={index}
            onClick={() => {
              handleFriendCardClick(item.AccountId);
            }}
          >
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
