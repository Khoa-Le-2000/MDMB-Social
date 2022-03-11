import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoomId, getSeenLatest } from 'app/selectors/chat';

dayjs.extend(relativeTime);

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: ${({ owner }) => (owner === 1 ? 'flex-end' : 'flex-start')};
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: ${({ owner }) =>
    owner ? ' 10px 10px 0 10px' : ' 0px 10px 10px 10px'};
  border-bottom: 3px solid;
  border-bottom-color: ${({ owner }) => (owner === 1 ? '#f8f8fa' : '#d0bddc')};
  background-color: ${({ owner }) => (owner === 1 ? '#f0f0f6' : '#6049cd')};
  color: ${({ owner }) => (owner === 1 ? '#000000' : '#e7e7f1')};
  max-width: 800px;
  font-size: 14px;
  min-width: 200px;
  position: ${({ owner }) => (owner === 1 ? 'relative' : 'static')};
`;

const WrapperMessage = styled.div`
  padding: 10px;
  position: ${({ owner }) => (owner === 1 ? 'relative' : 'static')};
  word-break:break-all;
`;

const Avatar = styled.div`
  padding-right: 10px;
  display: ${({ owner }) => (owner === 1 ? 'none' : 'block')};
  img {
    width: 52px;
    height: 52px;
    padding: 4px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  position: relative;
`;
const Message = styled.div`
  font-size: 14px;
`;
const Time = styled(Form.Text)`
  font-size: 0.7rem;
  position: absolute;
  right: ${({ owner }) => (owner === 1 ? '2%' : '5%')};
  color: #767676;
  margin-top: ${({ owner }) => (owner === 1 ? '' : '5%')};
  left: ${({ owner }) => (owner === 1 ? '' : '0px')};
`;

const AvatarSeen = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  img {
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function CardMessage(props) {
  const {
    name,
    avatar,
    content,
    sentDate,
    seenDate,
    owner,
    type,
    onSeenMessage,
    fromAccount,
    messageId,
    seenLatest,
  } = props;

  const { roomId } = useParams();

  React.useEffect(() => {
    if (!seenDate && +roomId === fromAccount) {
      onSeenMessage(messageId);
    }
  }, [roomId, fromAccount, seenDate, messageId]);

  return (
    <Wrapper owner={owner ? 1 : 0}>
      <Avatar owner={owner ? 1 : 0}>
        <img src={avatar} alt="" />
      </Avatar>
      <Row>
        <Col lg={12}>
          {!owner && (
            <Name>
              {name} 
            </Name>
          )}

          <WrapperContent owner={owner ? 1 : 0}>
            <WrapperMessage owner={owner ? 1 : 0}>
              <Message>
                {type === 'text' ? content : <img src={content} alt="" />}
              </Message>
            </WrapperMessage>

            {!owner && (
            <Name>
              <Time owner={owner ? 1 : 0}>{dayjs(sentDate).fromNow()}</Time>
            </Name>
          )}
            {owner && (
              <Time owner={owner ? 1 : 0}>{dayjs(sentDate).fromNow()}</Time>
            )}
          </WrapperContent>
          {seenLatest && owner && (
            <AvatarSeen>
              <img src={avatar} alt="" />
            </AvatarSeen>
            
          )}
        </Col>
      </Row>
    </Wrapper>
  );
}
export default CardMessage;
