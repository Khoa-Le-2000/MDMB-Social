import { UserPlus, UserCheck, UserX } from '@styled-icons/boxicons-solid';
import styled, { css } from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';

const RightSideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid black;
`;
const Header = styled.div`
  padding: 10px;
  width: 100%;
  background-color: #efeff3;
  border-bottom: 1px solid #d6dbe0;
`;
const RowBS = styled(Row)``;
const CardFriend = css`
  border-radius: 10px;
  justify-items: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
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

const CardFriendRequest = styled.div`
  ${CardFriend}
`;

const CardFriendRecommend = styled.div`
  ${CardFriend}
`;

const Title = styled.div`
  margin: 4px 0 5px 10px;
  color: #3a4bcb;
`;

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
  margin: auto;
  background-color: inherit;
  color: #000000;
  margin-top: 10px;
`;
const AddFriendButton = styled(ButtonBS)`
  @media (max-width: 1250px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
  @media (max-width: 680px) {
    font-size: 0.6rem;
    padding: 0.05rem 0.05rem 0.05rem 0.05rem;
  }
`;
const Icon = css`
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 5px;
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

const AcceptButton = styled(ButtonBS)``;
const RemoveButton = styled(ButtonBS)``;
export default function RightSide() {
  return (
    <RightSideWrapper>
      <Header>Friend you may know...</Header>
      <Title>Friend Requests</Title>
      <RowBS>
        {Array(4)
          .fill(1)
          .map((item, index) => (
            <Col lg={3}>
              <CardFriendRequest key={index}>
                <Avatar>
                  <img
                    src={
                      'https://www.toponseek.com/blogs/wp-content/uploads/2019/06/toi-uu-hinh-anh-optimize-image-4-1200x700.jpg'
                    }
                    alt="avatar"
                  />
                </Avatar>
                <Name>Dino</Name>
                <AcceptButton>
                  <AcceptIcon /> Confirm
                </AcceptButton>
                <RemoveButton>
                  <RemoveIcon />
                  Remove
                </RemoveButton>
              </CardFriendRequest>
            </Col>
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
            <Col lg={3}>
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
                  <AddFriendIcon /> Add Friend
                </AddFriendButton>
              </CardFriendRecommend>
            </Col>
          ))}
      </RowBS>
    </RightSideWrapper>
  );
}
