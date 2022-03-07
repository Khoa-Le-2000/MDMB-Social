import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { ReactComponent as Pic1 } from 'assets/images/icons/avt1.svg'
import { ReactComponent as Pic2 } from 'assets/images/icons/avt2.svg'


const Wrapper = styled(Col)`
  display: flex;
  justify-content: center;
  margin:auto;
  margin-bottom:10%;
`;
const WrapperImage = styled.div`
  padding:5% 0 2% 0;
  background-color: #ffffff;
  border-radius: 10px;
  padding:-10%;
  box-shadow: -4px 4px 4px 4px #c985c6;
`;
const Title = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  border-right: 2px solid rgba(255,255,255,.75);
  font-size: 1.8rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  animation: typewriter 4s steps(44) 1s 1 normal both,
  blinkTextCursor 500ms steps(44) infinite normal;
  animation-iteration-count: infinite;
 
@keyframes typewriter{
from{width: 0;color:#5017b3}
to{width: 100%; color:#e708be}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}
`;
const Description = styled.div`
  display:inline;
  font-size: 1.1rem;
`;
const Avatar1 = styled(Pic1)`
  display: flex;
  margin:auto;
  height: 30%;
  width: 30%;
  transition: all 0.2s ease-in-out;
  &:hover{
    transform: scale(1.1);
  }
`
const Avatar2 = styled(Pic2)`
display: flex;
  margin:auto;
  height: 30%;
  width: 30%;
  transition: all 0.2s ease-in-out;
  &:hover{
    transform: scale(1.1);
  }
`
const MiddlePic = styled.div`
  display:flex;
  margin: 0 6% 6% 6%;
`

function WindowEmpty() {
  return (
    <Wrapper className="col-lg-8 col-md-7 empty-chat no-message content-message">
      <WrapperImage className="text-center">
        {/* <img
          src="https://images.unsplash.com/photo-1646082768043-afb7ff8817a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        /> */}
        <MiddlePic>
          <Avatar1 />
          <Avatar2 />
        </MiddlePic>
        <Title className="mb-1 mt-2 font-weight-bold">
          Welcome to MDMB Social
        </Title>
        <Description> Please select a chat to start messaging! </Description>
      </WrapperImage>
    </Wrapper>
  );
}
export default WindowEmpty;
