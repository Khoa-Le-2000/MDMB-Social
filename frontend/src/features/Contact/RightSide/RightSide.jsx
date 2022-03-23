import { UserPlus, UserCheck, UserX } from '@styled-icons/boxicons-solid';
import styled, { css } from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListRelationshipSelector } from 'app/selectors/listRelationship';
import { getListRelationship } from 'app/actions/listRelationship';
import React from 'react';
import { getAuth } from 'app/selectors/login';
import { AddFriend, getSearchAccount } from 'app/actions/partnerProfile';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';

const RightSideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid black;
  overflow-x: hidden;
`;
const Header = styled.div`
  padding: 10px;
  width: 100%;
  background-color: #efeff3;
  border-bottom: 1px solid #d6dbe0;
`;
const RowBS = styled(Row)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 10px;

  @media (max-width: 680px) {
    margin-left: 2px;
  }
`;
const CardFriend = css`
  border-radius: 10px;
  justify-items: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #d6dbe0;
  margin: 10px;
  width: 235px;
  @media (max-width: 1250px) {
    width: 10.5rem;
  }
  @media (max-width: 680px) {
    width: 6rem;
    margin-top: 5px;
    margin: 2px;
  }
`;

const CardFriendRequest = styled.div`
  ${CardFriend}
`;

const CardFriendRecommend = styled.div`
  ${CardFriend}
  @media (max-width: 1250px) {
    width: 10.5rem;
    height: 14.5rem;
  }
  @media (max-width: 680px) {
    width: 6rem;
    height: 7rem;
    margin-top: 5px;
    margin: 2px;
  }
`;

const Title = styled.div`
  margin: 4px 0 5px 10px;
  color: #3a4bcb;
`;

const Avatar = styled.div`
  text-align: center;
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: fill;
    @media (max-width: 1250px) {
      width: 80px;
      height: 80px;
    }
    @media (max-width: 680px) {
      width: 40px;
      height: 40px;
    }
  }
`;

const Name = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1250px) {
    font-size: 1.2rem;
  }
  @media (max-width: 680px) {
    font-size: 0.9rem;
  }
`;
const Description = styled.div`
  font-size: 0.9rem;
  width: 100%;
  margin-top: 10px;
  @media (max-width: 1250px) {
    font-size: 0.8rem;
  }
  @media (max-width: 680px) {
    display: none;
  }
`;

const ButtonBS = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0px auto;
  margin-top: auto;
  background-color: #ffffff;
  color: #000000;
  margin-top: 10px;
  @media (max-width: 680px) {
    margin-top: 5px;
    padding: 0px;
  }
`;
const AddFriendButton = styled(ButtonBS)`
  @media (max-width: 1250px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
  @media (max-width: 680px) {
    font-size: 0.5em;
    padding: 0.05rem 0.05rem 0.05rem 0.05rem;
  }
`;
const Icon = css`
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 5px;
  @media (max-width: 680px) {
    display: none;
  }
`;
const AddFriendIcon = styled(UserPlus)`
  ${Icon}
`;
const RemoveIcon = styled(UserX)`
  ${Icon}
`;
const AcceptIcon = styled(UserCheck)`
  ${Icon}
`;

const AcceptButton = styled(ButtonBS)`
  @media (max-width: 1250px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
`;
const RemoveButton = styled(ButtonBS)`
  @media (max-width: 1250px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
`;
function updateRelationship(AccountId, id, type, dispatch) {
  if (AccountId < id)
    dispatch(AddFriend(AccountId, id, type)).then(() =>
      dispatch(getListRelationship(AccountId))
    );
  else
    dispatch(AddFriend(id, AccountId, type)).then(() =>
      dispatch(getListRelationship(AccountId))
    );
}

export default function RightSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AccountId = useSelector(getAuth)?.accountId;
  const listRelationship = useSelector(getListRelationshipSelector);
  React.useEffect(() => {
    dispatch(getListRelationship(AccountId));
  }, []);

  const newListRelationship = listRelationship?.filter(
    (item) =>
      (item.Type === 'rsendpending' && item.RelatedAccountId !== AccountId) ||
      (item.Type === 'lsendpending' && item.RelatingAccountId !== AccountId)
  );
  const handleAcceptClick = (id) => {
    updateRelationship(AccountId, id, 'friend', dispatch);
    dispatch(getListRelationship(AccountId));
  };
  const HandleRemoveClick = (id) => {
    updateRelationship(AccountId, id, 'delete', dispatch);
    dispatch(getListRelationship(AccountId));
  };
  const handleAvatarClick = (AccountId) => {
    navigate(`/userinfor/${AccountId}`);
  };
  return (
    <RightSideWrapper>
      <Header>Friend you may know...</Header>
      <Title>Friend Requests</Title>
      <RowBS>
        {newListRelationship.map((item, index) => (
          <CardFriendRequest key={index}>
            <Avatar
              onClick={() => {
                handleAvatarClick(
                  item.RelatedAccountId === AccountId
                    ? item.RelatingAccountId
                    : item.RelatedAccountId
                );
              }}
            >
              <img src={item.Avatar} alt="avatar" />
            </Avatar>
            <Name>{item.Name} asdasd</Name>
            <AcceptButton
              onClick={(e) => {
                handleAcceptClick(
                  item.RelatedAccountId === AccountId
                    ? item.RelatingAccountId
                    : item.RelatedAccountId
                );
              }}
            >
              <AcceptIcon /> Accept
            </AcceptButton>
            <RemoveButton
              onClick={() => {
                HandleRemoveClick(
                  item.RelatedAccountId === AccountId
                    ? item.RelatingAccountId
                    : item.RelatedAccountId
                );
              }}
            >
              <RemoveIcon />
              Remove
            </RemoveButton>
          </CardFriendRequest>
        ))}
      </RowBS>
      <hr />
      <Title>
        Recommend (33 <AddFriendIcon />)
      </Title>
      <RowBS>
        {Array(50)
          .fill(1)
          .map((item, index) => (
            <CardFriendRecommend key={index}>
              <Avatar>
                <img
                  src={
                    'https://www.toponseek.com/blogs/wp-content/uploads/2019/06/toi-uu-hinh-anh-optimize-image-4-1200x700.jpg'
                  }
                  alt="avatar"
                />
              </Avatar>
              <Name>Dino</Name>
              <Description>From friend recommended</Description>
              <AddFriendButton>
                <AddFriendIcon />
                Add Friend
              </AddFriendButton>
            </CardFriendRecommend>
          ))}
      </RowBS>
    </RightSideWrapper>
  );
}
