import { DotsVertical, VideoCamera } from '@styled-icons/heroicons-solid';
import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { CircleFill } from '@styled-icons/bootstrap';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const WrapperInfoPadding = styled.div`
  padding: 5px;
`;

const WrapperInfo = styled.div`
  display: flex;
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
const WrapperFeaturesPadding = styled.div`
  padding: 5px;
`;
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

const FeatureVideo = styled(Feature)``;
const IconVideo = styled(VideoCamera)`
  width: 1.4rem;
`;
const FeatureOther = styled(Feature)``;
const IconOther = styled(DotsVertical)`
  width: 1.4rem;
`;
const Online =
function ChatHeader() {
  return (
    <Wrapper>
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
              <Status>Online</Status>
            </WrapperText>
          </WrapperInfo>
        </WrapperInfoPadding>
      </Col>
      <Col lg={2}>
        <WrapperFeaturesPadding>
          <Features>
            <FeatureVideo>
              <IconVideo />
            </FeatureVideo>
            <FeatureOther>
              <IconOther />
            </FeatureOther>
          </Features>
        </WrapperFeaturesPadding>
      </Col>
    </Wrapper>
  );
}

export default ChatHeader;
