import styled from 'styled-components';
import dayjs from 'dayjs';
import { Col, Row } from 'react-bootstrap';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useParams } from '../../../../../node_modules/react-router-dom/index';
dayjs.extend(relativeTime);

const Wrapper = styled.div`
  padding:10px 0 10px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: hidden;
  overflow-x: hidden;
  border-left: ${props=>props.checked? "3px solid #cd556b":"none"};
  background: ${props=>props.checked? "linear-gradient(90deg, #f1a7ac 0%, #eeb0b4 50%, #fad0d0 60%,#e0e0e6 100%);":"none"};
  &:hover{
    background-color:#d8d3d3 ;
  }
`;
const Card = styled.div`
  display: flex;
  cursor: pointer;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.div`
  margin-right: 10px;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Message = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  display: inline-block;
  width: 230px;

  padding: 0;
  overflow: hidden;
  position: relative;
  display: inline-block;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Time = styled.div`
  font-size: 0.8rem;
  display: inline-block;
  min-width: 80px;
`;

function CardConvention({ onSelectRoom, conversation }) {
  const {
    Name: name,
    Avatar: avatar,
    LastMessage: lastMessage,
    LastOnline,
  } = conversation;
  
  const onRoomChange = () => {
    onSelectRoom(conversation);
  };
  const {roomId} =useParams();

  return (
    <Wrapper checked={+roomId===+conversation.AccountId}>
      <Row>
        <Col>
          <Card onClick={onRoomChange}>
            <Avatar>
              <img src={avatar} alt="" />
            </Avatar>
            <CardContent>
              <Name>{name}</Name>
              <Message>
                {lastMessage
                  ? lastMessage
                  : 'You are now connected on MDMB Social'}
              </Message>
            </CardContent>
            <Time>{dayjs(LastOnline).fromNow()}</Time>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default CardConvention;
