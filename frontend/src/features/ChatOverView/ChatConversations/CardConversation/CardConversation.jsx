import styled from 'styled-components';
import dayjs from 'dayjs';
import { Col, Row } from 'react-bootstrap';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useParams } from '../../../../../node_modules/react-router-dom/index';
import { CheckCircle } from '@styled-icons/heroicons-solid';
import { getLengthNewMessage } from 'app/selectors/chat';
import { useSelector } from 'react-redux';

dayjs.extend(relativeTime);

const Wrapper = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: hidden;
  overflow-x: hidden;
  border-left: ${(props) => (props.checked ? '3px solid #cd556b' : 'none')};
  background: ${(props) =>
    props.checked
      ? 'linear-gradient(90deg, #f1a7ac 0%, #eeb0b4 50%, #fad0d0 60%,#e0e0e6 100%);'
      : 'none'};
  &:hover {
    background-color: #d8d3d3;
  }
`;
const Card = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-around;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
`;

const Avatar = styled.div`
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MessageInner = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const Name = styled.h4`
  font-size: 16px;
  font-weight: bold;
  text-overflow: ellipsis;
`;
const Message = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;
const Status = styled.div``;
const Time = styled.p`
  font-size: 0.8rem;
  text-align: right;
`;
const StatusInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const SentStatus = styled(CheckCircle)`
  width: 1rem;
  height: 1rem;
  margin-left: 80%;
  color: #4849a1;
`;
const SeenStatus = styled.img`
  content: url(${(props) => props.Avatar});
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const WrapperNewMessage = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #f15959;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LengthNewMessage = styled.div`
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
`;

function CardConvention({ onSelectRoom, conversation }) {
  const { roomId } = useParams();

  const {
    Name: name,
    Avatar: avatar,
    LastMessage: lastMessage,
    SentDate,
    SeenDate,
    FromAccount,
    AccountId,
  } = conversation;


  const lengthNewMessages = useSelector(getLengthNewMessage(AccountId));

  const onRoomChange = () => {
    onSelectRoom(conversation);
  };

  return (
    <Wrapper checked={+roomId === +conversation.AccountId}>
      <Row>
        <Col>
          <Card onClick={onRoomChange}>
            <Avatar>
              <img src={avatar} alt="" />
            </Avatar>
            <CardContent>
              <Name> {name}</Name>
              <MessageInner>
                <Message>
                  {lastMessage
                    ? lastMessage
                    : 'You are now connected on MDMB Social'}
                </Message>
              </MessageInner>
            </CardContent>
            <Status>
              <Time>{lastMessage ? dayjs(SentDate).fromNow() : ''}</Time>
              <StatusInner>
                {lengthNewMessages > 0 ? (
                  <WrapperNewMessage>
                    <LengthNewMessage>{lengthNewMessages}</LengthNewMessage>
                  </WrapperNewMessage>
                ) : lastMessage && SeenDate ? (
                  <SeenStatus Avatar={avatar} />
                ) : FromAccount !== roomId ? (
                  <SeenStatus Avatar={avatar} />
                ) : (
                  <SentStatus />
                )}
              </StatusInner>
            </Status>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default CardConvention;
