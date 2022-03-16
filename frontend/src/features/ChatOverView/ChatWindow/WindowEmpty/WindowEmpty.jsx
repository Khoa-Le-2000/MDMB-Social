import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import LogoImg from 'assets/images/logos/logo.jpg';

const Wrapper = styled(Col)`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 10%;
  flex-direction: column;
  align-items: center;
`;
const WrapperTop = styled.div`
  width: 60%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-content: space-between;
`;
const Avatar = styled.div`
  width: 100px;
  height: 100px;
  img {
    min-width: 100px;
    min-height: 100px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #c90d7b;
  }
`;
const Name = styled.div`
  font-weight: bold;
`;
const Greeting = styled.div``;
const Tittle = styled.div`
  margin-left: 20px;
  font-size: 2rem;
  overflow: hidden;
  max-width: 70%;
`;
const EditProfile = styled.button`
  margin: auto;
  margin-right: 10px;
  height: 50px;
  max-width: 150px;
  min-width: 110px;
  border-radius: 30px;
  border: 2px solid #bd10c9;
  background-color: #eadeeb;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ca7ad0;
  }
`;
const WrapperBottom = styled.div`
  width: 70%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 40px;
  padding: 0 20px 0 20px;
`;
const Card = styled.div`
  width: 45%;
  border: 1px solid #bd10c9;
  border-radius: 1rem;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Intro = styled.div`
  text-align: center;
  margin: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Button = styled.button`
  position: absolute;
  margin-top: 120px;
  height: 45px;
  max-width: 120px;
  min-width: 120px;
  border-radius: 30px;
  border: 2px solid #bd10c9;
  background-color: #eadeeb;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ca7ad0;
  }
`;
const Footer = styled.footer`
  position: absolute;
  font-weight: bold;
  bottom: 6%;
`;
const Footer2 = styled.footer`
  position: absolute;
  font-weight: bold;
  bottom: 3%;
`;
const Link = styled.a`
  color: blue;
`;

function WindowEmpty() {
  return (
    <Wrapper>
      <WrapperTop>
        <Avatar>
          <img src={LogoImg} alt="avatar" />
        </Avatar>
        <Tittle>
          <Greeting>Welcome!</Greeting>
          <Name>"Your Name"</Name>
        </Tittle>
        <EditProfile>Edit Profile</EditProfile>
      </WrapperTop>
      <WrapperBottom>
        <Card>
          <Intro> Easly to connect with people</Intro>
          <Button>Add Friend!</Button>
        </Card>
        <Card>
          <Intro> Calling right now</Intro>
          <Button>Make a call!</Button>
        </Card>
      </WrapperBottom>
      <Footer> You are signin as "insert gmail here" </Footer>
      <Footer2>
        {' '}
        Try switching accounts if you not see your contact history,{' '}
        <Link href="">learn more</Link> on{' '}
        <Link href="">mdmbsocial@gmail.com</Link>{' '}
      </Footer2>
    </Wrapper>
  );
}
export default WindowEmpty;
