import React from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: flex-start;
`;
const WrapperContent = styled.div`
  transition: 0s;
  border-radius: 0px 25px 25px 25px;
  border-bottom: 3px solid #9b527e;

  background: #6049cd;
  color: #ebf0ff;
  max-width: 800px;
  font-size: 14px;
  min-width: 200px;
  position: relative;
`;

const WrapperMessage = styled.div`
  padding: 10px;
`;

const Avatar = styled.div`
  padding-right: 10px;
  img {
    width: 52px;
    height: 52px;
    /* border: 1px solid rgba(255, 255, 255, 0.75); */
    padding: 4px;
    border-radius: 50%;
    object-fit: cover;
  }
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
  font-size: 0.7rem;
  position: flex;
  transform: translateY(100%);
  margin-left: 8px;
  color:#d4d3eb;
  
`;

function MessageReceiver() {
  return (
    <Wrapper>
      <Avatar>
        <img
          src="https://images.unsplash.com/photo-1645815431490-7852a97ecfbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </Avatar>
      <Row>
        <Col lg={12}>

          <Name>Loran nata <Time >16:00</Time></Name>
          <WrapperContent>
            <WrapperMessage>
              <Message>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                sed neque corporis eius voluptas. Nostrum tenetur laudantium
                quisquam quaerat provident soluta modi hic aliquid quod?
                Temporibus culpa sequi architecto itaque?
              </Message>
            </WrapperMessage>
          </WrapperContent>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default MessageReceiver;
