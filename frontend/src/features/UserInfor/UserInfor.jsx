import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'app/actions/userProfile';
import { getPartnerProfile } from 'app/actions/partnerProfile';
import { getUserProfileSelector } from 'app/selectors/userProfile';
import { getPartnerProfileSelector } from 'app/selectors/partnerProfile';
import styled from 'styled-components';
import MainLayout from 'layouts/MainLayout';
import { Button, Container as BootstrapContainer } from 'react-bootstrap';
import { Chat, Rss, Cake } from '@styled-icons/heroicons-solid';
import { UserPlus, UserCheck, User } from '@styled-icons/boxicons-solid';
import {
  Male as MaleFemale,
  MaleSign,
  FemaleSign,
} from '@styled-icons/boxicons-regular';
import { getAuth } from 'app/selectors/login';
import { useEffect } from 'react';
import { getConversations } from 'app/selectors/conversations';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardProfile = styled.div`
  border: 2px solid #e3e3e3;
  border-radius: 1rem;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0 20px 0;
`;

const AvatarWrapper = styled.div`
  margin: 0 auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const LineWrapper = styled.div`
  padding: 0px 30px 10px 30px;
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`;
const NameCard = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonDefault = styled(Button)`
  background-color: #e8e4e4;
  color: #000000;
  margin: 0 10px 0 10px;
  &:hover {
    background-color: #eeeeee;
    color: #000000;
  }
`;
const IntroduceHeader = styled.div`
  font-weight: bold;
  text-align: left;
  width: 100%;
  font-size: 1.25rem;
`;
const Introduce = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  width: 80%;
  margin: auto;
`;
const IntroduceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const IntroduceIcon = styled(Rss)`
  width: 1.25rem;
  height: 1.25rem;
  margin: 0 3px 3px 0;
  align-content: center;
`;
const ChatIcon = styled(Chat)`
  width: 1.25rem;
  height: 1.25rem;
`;
const AddFriendIcon = styled(UserPlus)`
  width: 1.25rem;
  height: 1.25rem;
`;
const AlreadyFriendIcon = styled(UserCheck)`
  width: 1.25rem;
  height: 1.25rem;
`;
const InformationHeader = styled.div`
  text-align: left;
  width: 50%;
  font-size: 1.25rem;
`;
const Information = styled.div`
  text-align: left;
  width: 100%;
  font-size: 1.1rem;
`;
const GenderIcon = styled(MaleFemale)`
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 2px;
`;
const CakeIcon = styled(Cake)`
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 2px;
`;
const UserIcon = styled(User)`
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 2px;
`;
const MaleIcon = styled(MaleSign)`
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 2px;
`;
const FemaleIcon = styled(FemaleSign)`
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 2px;
`;
function UserInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  var AccountId = useSelector(getAuth)?.accountId;

  if (id == AccountId) navigate('/update-profile');

  useEffect(() => {
    dispatch(getUserProfile(AccountId));
    dispatch(getPartnerProfile(id));
  }, []);

  const accountInfor = useSelector(getUserProfileSelector);
  const partnerInfor = useSelector(getPartnerProfileSelector);
  const listConversation = useSelector(getConversations);

  let isFriend = false;
  listConversation.forEach((item) => {
    if (item.AccountId == id) isFriend = true;
  });

  const handleDirectMessageClick = () => {
    navigate(`/chat/${id}`);
  };
  return (
    <BootstrapContainer fluid>
      <MainLayout Name={accountInfor?.Name} Avatar={accountInfor?.Avatar}>
        <Wrapper>
          <CardProfile>
            <AvatarWrapper>
              <img src={partnerInfor?.Avatar}></img>
            </AvatarWrapper>
            <LineWrapper>
              <NameCard>{partnerInfor?.Name}</NameCard>
            </LineWrapper>
            <LineWrapper>
              {isFriend ? (
                <ButtonDefault className="btn">
                  <AlreadyFriendIcon />
                  Your Friend
                </ButtonDefault>
              ) : (
                <ButtonDefault className="btn">
                  <AddFriendIcon />
                  Add Friend
                </ButtonDefault>
              )}
              {isFriend && (
                <Button onClick={handleDirectMessageClick}>
                  <ChatIcon /> Direct Message
                </Button>
              )}
            </LineWrapper>
            <LineWrapper>
              <IntroduceWrapper>
                <IntroduceHeader>
                  <IntroduceIcon />
                  Introduce
                </IntroduceHeader>
                <Introduce>There still nothing to see yet</Introduce>
              </IntroduceWrapper>
            </LineWrapper>
            <LineWrapper>
              <InformationHeader>
                <CakeIcon /> Birthday
              </InformationHeader>
              <Information>
                {partnerInfor?.Birthday?.split('T')[0] || 'Unknow'}
              </Information>
            </LineWrapper>
            <LineWrapper>
              <InformationHeader>
                {partnerInfor?.Gender == 0 ? (
                  <FemaleIcon />
                ) : partnerInfor?.Gender == 1 ? (
                  <MaleIcon />
                ) : (
                  <GenderIcon />
                )}
                Gender
              </InformationHeader>
              <Information>
                {partnerInfor?.Gender == 0
                  ? 'Male'
                  : partnerInfor?.Gender == 1
                  ? 'Female'
                  : 'Unset'}
              </Information>
            </LineWrapper>
            <LineWrapper>
              <InformationHeader>
                <UserIcon /> Join
              </InformationHeader>
              <Information>
                {dayjs(partnerInfor?.CreatedDate).fromNow() || 'Unknow'}
              </Information>
            </LineWrapper>
          </CardProfile>
        </Wrapper>
      </MainLayout>
    </BootstrapContainer>
  );
}

export default UserInfor;
