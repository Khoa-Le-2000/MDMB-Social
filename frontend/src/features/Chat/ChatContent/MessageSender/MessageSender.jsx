import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: flex-end;
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: 25px 25px 0 25px;
  border-bottom: 3px solid #81d4f9;

  background: linear-gradient(90deg, #cfd9df 0%, #e2ebf0 100%);
  color: #434354;
  max-width: 350px;
  font-size: 14px;
  min-width: 200px;

  position: relative;
`;

const WrapperMessage = styled.div`
  padding: 10px;
`;

const Name = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Message = styled.div`
  font-size: 14px;
`;
const Time = styled(Form.Text)`
  font-size: 0.8rem;
  margin-bottom: 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
`;

function MessageSender() {
  return (
    <Wrapper>
      <WrapperContent>
        <WrapperMessage>
          <Name>Sarah</Name>
          <Message>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed
            neque corporis eius voluptas. Nostrum tenetur laudantium quisquam
            quaerat provident soluta modi hic aliquid quod? Temporibus culpa
            sequi architecto itaque?
          </Message>
        </WrapperMessage>
        <Time muted>1 hour ago</Time>
      </WrapperContent>
    </Wrapper>
  );
}
export default MessageSender;
