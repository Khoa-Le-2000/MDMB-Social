import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'app/actions/userProfile';
import { getUserProfileSelector } from 'app/selectors/userProfile';
import styled from 'styled-components';
import MainLayout from 'layouts/MainLayout';
import {
  Button,
  Card,
  Col as BootstrapCol,
  Container as BootstrapContainer,
  Form,
  Row as BootstrapRow,
} from 'react-bootstrap';
import { Chat, Rss } from '@styled-icons/heroicons-solid';
import { UserPlus } from '@styled-icons/boxicons-solid';

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
  padding: 10px 30px 10px 30px;
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
  text-align: center;
  width: 80%;
  margin: auto;
`;
const IntroduceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
const InformationHeader = styled.div`
  text-align: left;
  width: 50%;
  font-size: 1.25rem;
`;
const Information = styled.div`
  text-align: left;
  width: 100%;
  font-size: 1.25rem;
`;
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function UserInfor() {
  const dispatch = useDispatch();

//   const [yourInfor, setYourInfor] = React.useState({});
//   let infor = useSelector(getUserProfileSelector);
//   if (isEmpty(yourInfor)) {
//     setYourInfor(infor);
// }

const { id } = useParams();
dispatch(getUserProfile('204')).then(value=>console.log)
// dispatch(getUserProfile(id));
// React.useEffect(() => {
// }, []);
// const userInfor = useSelector(getUserProfileSelector);
const userInfor ='';
const yourInfor=''
  // get your userInfor

  return (
    <BootstrapContainer fluid>
      <MainLayout Name={yourInfor?.Name} Avatar={yourInfor?.Avatar}>
        <Wrapper>
          <CardProfile>
            <AvatarWrapper>
              <img src={userInfor?.Avatar}></img>
            </AvatarWrapper>
            <LineWrapper>
              <NameCard>{userInfor?.Name}</NameCard>
            </LineWrapper>
            <LineWrapper>
              <ButtonDefault className="btn">
                <AddFriendIcon /> Add Friend
              </ButtonDefault>
              <Button>
                <ChatIcon /> Direct Message
              </Button>
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
              <InformationHeader>Birthday:</InformationHeader>
              <Information>{userInfor?.Birthday?.split('T')[0]}</Information>
            </LineWrapper>
            <LineWrapper>
              <InformationHeader>Gender:</InformationHeader>
              <Information>
                {userInfor.Gender == 0
                  ? 'Male'
                  : userInfor.Gender == 1
                  ? 'Female'
                  : 'Unset'}
              </Information>
            </LineWrapper>
          </CardProfile>
        </Wrapper>
      </MainLayout>
    </BootstrapContainer>
  );
}

export default UserInfor;
