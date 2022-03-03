import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const WrapperText = styled.div``;
const Title = styled.div``;
const Description = styled.div``;

function MessageEmpty() {
  return (
    <Wrapper>
      <WrapperText>
        <img
          src="https://images.unsplash.com/photo-1638913974071-ad0045d13691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <Title>No message found</Title>
        <Description>
          It seem. No message in your inbox. "Let's start messing now."
        </Description>
      </WrapperText>
    </Wrapper>
  );
}
export default MessageEmpty;
