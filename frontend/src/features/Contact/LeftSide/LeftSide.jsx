import { Search } from '@styled-icons/heroicons-solid';
import { getConversations } from 'app/selectors/conversations';
import React from 'react';
import { Form, InputGroup as BsInputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMessagesLatest, selectRoom } from 'app/actions/chat';
import { getSearchAccount } from 'app/actions/partnerProfile';
import {
  getFetchingSearchAccount,
  getSearchAccountSelector,
} from 'app/selectors/partnerProfile';
import { getAuth } from 'app/selectors/login';

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

const SearchForm = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
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
const HeaderCard = styled.div`
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
  cursor: pointer;
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

export default function LeftSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listConversation = useSelector(getConversations);
  const [listUserMatch, setListUserMatch] = React.useState(listConversation);
  const [searchValue, setSearchValue] = React.useState('');
  const [show, setShow] = React.useState(false);
  const id = useSelector(getAuth)?.accountId;
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const listUserMatch = listConversation.filter((user) =>
      user.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setListUserMatch(listUserMatch);
  };

  const handleFriendCardClick = (AccountId, item) => {
    dispatch(selectRoom(item, navigate));
    dispatch(getMessagesLatest(AccountId, item.AccountId));
  };
  const typingTimeoutRef = React.useRef(null);
  var onTyping = false;
  const handleKeyPress = (e) => {
    clearTimeout(typingTimeoutRef.current);
    onTyping = true;
    setShow(false);
  };
  const handleKeyUp = (e) => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setShow(true);

      dispatch(getSearchAccount(searchValue, id));
      onTyping = false;
    }, 1000);
  };

  var ListSearchAccount = useSelector(getSearchAccountSelector);
  if (searchValue === '' && show) {
    setShow(false);
  }
  const handleUserProfileClick = (AccountId) => {
    navigate(`/userinfor/${AccountId}`);
  };
  console.log(show);
  return (
    <LeftSideWrapper>
      <Logo>MDMB Social</Logo>
      <SearchForm>
        <Form.Control
          placeholder="Searching"
          onChange={handleSearchChange}
          value={searchValue}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
        />
        <InputSearch>
          <IconSearch />
        </InputSearch>
      </SearchForm>
      <FriendList>
        <HeaderCard>Friend({listConversation?.length})</HeaderCard>
        {listUserMatch.length === 0 && (
          <UserNotFound> Friend not found!</UserNotFound>
        )}
        {listUserMatch?.map((item, index) => (
          <FriendCard
            key={index}
            onClick={() => {
              handleFriendCardClick(item.AccountId, item);
            }}
          >
            <Avatar>
              <img src={item.Avatar} alt="avatar" />
            </Avatar>
            <Name>{item.Name}</Name>
          </FriendCard>
        ))}
        {searchValue != '' && !show && <HeaderCard>Loading</HeaderCard>}
        {show && ListSearchAccount.length > 0 && (
          <HeaderCard>Searching</HeaderCard>
        )}
        {show && !ListSearchAccount.length > 0 && (
          <>
            <HeaderCard>Searching</HeaderCard>
            <UserNotFound>
              {' '}
              Coun't found any not your friend user for "{searchValue}", check
              your spell or try complete word!
            </UserNotFound>
          </>
        )}
        {show &&
          ListSearchAccount?.map((item, index) => (
            <FriendCard
              key={index}
              onClick={() => {
                handleUserProfileClick(item.AccountId);
              }}
            >
              <Avatar>
                <img src={item.Avatar} alt="avatar" />
              </Avatar>
              <Name>{item.Name}</Name>
            </FriendCard>
          ))}
      </FriendList>
    </LeftSideWrapper>
  );
}
