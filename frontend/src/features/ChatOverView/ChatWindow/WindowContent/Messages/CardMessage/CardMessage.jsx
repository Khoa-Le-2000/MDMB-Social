import React from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'react-bootstrap';
import { CheckCircle } from '@styled-icons/boxicons-solid';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: ${({ owner }) => (owner === 1 ? 'flex-end' : 'flex-start')};
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: 0px 25px 25px 25px;
  border-radius: ${({ owner }) =>
    owner ? ' 25px 25px 0 25px' : ' 0px 25px 25px 25px'};
  border-bottom: 3px solid;
  border-bottom-color ${({ owner }) => (owner === 1 ? '#9b527e' : '#d0bddc')};
  background-color: ${({ owner }) => (owner === 1 ? '#e7e5f2' : '#6049cd')};
  color:  ${({ owner }) => (owner === 1 ? '#434354' : '#ebf0ff')};
  max-width: 800px;
  font-size: 14px;
  min-width: 200px;
  position: ${({ owner }) => (owner === 1 ? 'relative' : 'static')};
`;

const WrapperMessage = styled.div`
  padding: 10px;
  position: ${({ owner }) => (owner === 1 ? 'relative' : 'static')};
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
  color: #d4d3eb;
`;
const SeenStatus = styled(CheckCircle)`
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  display: block;
  right: -15px;
  bottom: 0;
  color: ${({ seen }) => (seen ? '#551ecc' : 'none')};
`;
function Card(props) {
  const { messageId, name, avatar, content, sentDate, seenDate, owner, type } =
    props;
  console.log('prosp: ', {
    messageId,
    name,
    avatar,
    content,
    sentDate,
    seenDate,
    owner,
    type,
  });

  return (
    <Wrapper owner={owner ? 1 : 0}>
      <Avatar owner={owner ? 1 : 0}>
        <img src={avatar} alt="" />
      </Avatar>
      <Row>
        <Col lg={12}>
          {!owner && (
            <Name>
              {name} <Time>{dayjs(sentDate).fromNow()}</Time>
            </Name>
          )}
          <WrapperContent owner={owner ? 1 : 0}>
            <WrapperMessage owner={owner ? 1 : 0}>
              <Message>
                {type === 'text' ? content : <img src={content} alt="" />}
              </Message>
              {seenDate && owner && (
                <SeenStatus seen={seenDate ? true : false} />
              )}
            </WrapperMessage>
            {owner && (
              <Time owner={owner ? 1 : 0}>{dayjs(sentDate).fromNow()}</Time>
            )}
          </WrapperContent>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default Card;
