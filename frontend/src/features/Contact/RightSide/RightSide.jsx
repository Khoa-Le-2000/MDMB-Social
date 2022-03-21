import styled from 'styled-components';
import {
  Button,
  Card,
  Col as BootstrapCol,
  Container as BootstrapContainer,
  Form,
  Row as BootstrapRow,
} from 'react-bootstrap';
import { UserPlus } from '@styled-icons/boxicons-solid';

const RightSideWrapper = styled.div`
  width: 100%;
  border-left: 1px solid black;
`;
const CardRecommendFriend = styled.div`
  width: 15.1rem;
  height: 15.1rem;
  border-radius: 10px;
  justify-items: center;
  display: flex;
  flex-direction: column;
  padding: 0.9rem;
  border: 1px solid #d6dbe0;
  margin: 10px;
  @media (max-width: 1250px) {
    width: 12.5rem;
    height: 12.5rem;
  }
  @media (max-width: 680px) {
    width: 5.8rem;
    height: 6.5rem;
    margin: 2px;
    margin-top: 5px;

  }
`;
const FriendRecommend = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 680px) {
    justify-content: space-around;
  }
`;
const Header = styled.div`
  padding:10px;
  width: 100%;
  background-color: #efeff3;
  border-bottom: 1px solid #d6dbe0;
`;
const Recommend = styled.div`
  margin:4px 0 5px 10px;
  color:#3a4bcb;
`
const Avatar = styled.div`
  text-align: center;
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
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: 1250px) {
    font-size: 1.2rem;
  }
  @media (max-width: 680px) {
    font-size: 0.9rem;
  }
`;
const Description = styled.div`
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
  height: 1rem;
  overflow: hidden;
  margin: 0px 0 10px 0;
  @media (max-width: 1250px) {
    font-size: 0.8rem;
  }
  @media (max-width: 680px) {
    display: none;
  }
`;
const AddfriendButton = styled(Button)`
  width: max-content;
  margin: auto;
  background-color: inherit;
  color: #000000;
  @media (max-width: 1250px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
  @media (max-width: 680px) {
    font-size: 0.6rem;
    padding: 0.05rem 0.05rem 0.05rem 0.05rem;
  }
`;
const AddFriendIcon = styled(UserPlus)`
  width: 1.2em;
  height: 1.2em;
  margin-bottom: 3px;
`;
export default function RightSide() {
  return (
    <RightSideWrapper>
      <Header>Friend you may know...</Header>
      <Recommend>Recommend (33 <AddFriendIcon/>)</Recommend>
      <FriendRecommend>
        {Array(50).fill(1).map(
          (item, index) => (
            <CardRecommendFriend key={index}>
              <Avatar>
                <img
                  src={
                    'https://www.toponseek.com/blogs/wp-content/uploads/2019/06/toi-uu-hinh-anh-optimize-image-4-1200x700.jpg'
                  }
                />
              </Avatar>
              <Name>Dino</Name>
              <Description>From friend recommended</Description>
              <AddfriendButton>
                <AddFriendIcon /> Add Friend
              </AddfriendButton>
            </CardRecommendFriend>
          )
        )}
      </FriendRecommend>
    </RightSideWrapper>
  );
}
