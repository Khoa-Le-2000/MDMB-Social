import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const Wrapper = styled(Col)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const WrapperImage = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const Title = styled.div``;
const Description = styled.div``;

function WindowEmpty() {
  return (
    <Wrapper className="col-lg-8 col-md-7 empty-chat no-message content-message">
      <WrapperImage className="text-center">
        <img
          src="https://images.unsplash.com/photo-1646082768043-afb7ff8817a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <Title className="mb-1 mt-2 font-weight-bold">
          Welcome to MDMB Social
        </Title>
        <Description> Please select a chat to start messaging </Description>
      </WrapperImage>
    </Wrapper>
  );
}
export default WindowEmpty;
