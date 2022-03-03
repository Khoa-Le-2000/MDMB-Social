import {
  DotsVertical,
  VideoCamera,
  Sun,
  Moon,
} from '@styled-icons/heroicons-solid';
import { Circle } from '@styled-icons/boxicons-solid';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useToggle } from 'hooks';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const WrapperInfoPadding = styled.div``;

const WrapperInfo = styled.div`
  display: flex;
  width: 100%;
`;
const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Avatar = styled.div`
  padding-right: 10px;
  img {
    width: 52px;
    height: 52px;
    border: 1px solid rgba(255, 255, 255, 0.75);
    padding: 4px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Status = styled.span`
  font-size: 0.8rem;
  color: #aaa;
  padding: 2px 5px;
  border-radius: 5px;
`;
const WrapperFeaturesPadding = styled.div``;
const Features = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Feature = styled.div`
  background: #f5f5f5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: #fff;
    transition: all 0.3s ease-in;
  }
`;

const FeatureVideoWrapper = styled(Feature)``;
const IconVideo = styled(VideoCamera)`
  width: 1.4rem;
`;
const FeatureOtherWrapper = styled(Feature)``;
const IconOther = styled(DotsVertical)`
  width: 1.4rem;
`;
const Online = styled(Circle)`
  width: 0.5rem;
  vertical-align: middle;
  margin-right: 5px;
  margin-bottom: 0.2rem;
  color: #8025d5;
`;
const FutureSwitchWrapper = styled(Feature)``;
const LightIcon = styled(Sun)`
  width: 1.4rem;
`;
const DarkIcon = styled(Moon)`
  width: 1.4rem;
`;

const StatusText = styled.span``;
function ChatHeader() {
  const [isDark, setIsDark] = useToggle(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Wrapper>
      <Row className="w-100">
        <Col lg={10}>
          <WrapperInfoPadding>
            <WrapperInfo>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1644982654131-79f434ac0c6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw3MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
              </Avatar>
              <WrapperText>
                <Name>UI Art Design</Name>
                <Status>
                  <Online />
                  <StatusText>Online</StatusText>
                </Status>
              </WrapperText>
            </WrapperInfo>
          </WrapperInfoPadding>
        </Col>
        <Col lg={2}>
          <WrapperFeaturesPadding className="h-100">
            <Features className="h-100">
              <FutureSwitchWrapper onClick={toggleTheme}>
                {isDark ? <DarkIcon /> : <LightIcon />}
              </FutureSwitchWrapper>
              <FeatureVideoWrapper>
                <IconVideo />
              </FeatureVideoWrapper>
              <FeatureOtherWrapper>
                <IconOther />
              </FeatureOtherWrapper>
            </Features>
          </WrapperFeaturesPadding>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default ChatHeader;
