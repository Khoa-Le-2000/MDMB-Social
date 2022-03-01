import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Circle } from '@styled-icons/boxicons-solid';


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
  max-width: 350px;
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
const Time = styled(Form.Text)`
  font-size: 0.7rem;
  margin-bottom: 0px;
  position: absolute;
  bottom: 0;
  right: 2%;
  transform: translateY(100%);
  padding-top: 4px;
`;
const SeenStatus = styled(Circle)`
  width:0.7rem;
  height:0.7rem;
  position: absolute;
  display:block;
  right: -20px;
`
function MessageSender() {
  return (
    <Wrapper>
      <WrapperContent>
        <WrapperMessage>
          <Message>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed neque corporis eius voluptas.
            Nostrum tenetur laudantium quisquam quaerat provident soluta modi hic aliquid quod?
            Temporibus culpa sequi architecto itaque?
          </Message>
          <SeenStatus />
        </WrapperMessage>
        <Time muted>16:00</Time>

      </WrapperContent>
    </Wrapper>
  );
}
export default MessageSender;
