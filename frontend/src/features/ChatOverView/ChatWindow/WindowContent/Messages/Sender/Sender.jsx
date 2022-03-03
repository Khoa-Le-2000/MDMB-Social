import { CheckCircle } from '@styled-icons/boxicons-solid';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: flex-end;
  margin-right: 20px;
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: 25px 25px 0 25px;
  border-bottom: 3px solid #d0bddc;
  background: #e7e5f2;
  color: #434354;
  max-width: 800px;
  font-size: 14px;
  min-width: 20px;
  margin-right: 10px;
  position: relative;
`;

const WrapperMessage = styled.div`
  padding: 10px;
`;

const Message = styled.span`
  font-size: 14px;
`;
const Time = styled.p`
  font-size: 0.7rem;
  margin-bottom: 0px;
  position: absolute;
  bottom: 0;
  right: 2%;
  transform: translateY(100%);
  padding-top: 4px;
  color: #d4d3eb;
`;
const SeenStatus = styled(CheckCircle)`
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  display: block;
  right: -20px;
  color: ${(props) => (props.seen ? '#551ecc' : 'none')};
`;
function Sender({ name, avatar, message, time, seen, owner }) {
  return (
    <Wrapper>
      <Row>
        <Col lg={12}>
          <WrapperContent>
            <WrapperMessage>
              <Message>{message}</Message>
              <SeenStatus seen={seen} />
            </WrapperMessage>
            <Time>{time}</Time>
          </WrapperContent>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default Sender;
