import { Circle } from '@styled-icons/boxicons-solid';
import { DotsVertical, VideoCamera } from '@styled-icons/heroicons-solid';
import ToggleTheme from 'components/ToggleTheme';
import { useToggle } from 'hooks';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { getConversations } from 'app/selectors/conversations';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    Visibility : ${(props) => (props.WindowEmpty ? "hidden" : "none")};

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
  margin-right: 10px;
  margin-left: 4px;
  img {
    width: 52px;
    height: 52px;
    border: 1px solid rgba(255, 255, 255, 0.75);
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

const StatusText = styled.span``;
function ChatHeader({ partner, isOnline, WindowEmpty }) {
  const [isDark, setIsDark] = useToggle(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <Wrapper WindowEmpty={WindowEmpty}>
      <Row className="w-100">
        <Col lg={10}>
          <WrapperInfoPadding>
            <WrapperInfo>
              <Avatar>
                <img src={partner.Avatar} alt="avatar" />
              </Avatar>
              <WrapperText>
                <Name>{partner.Name}</Name>
                <Status>
                  <Online />
                  <StatusText>{isOnline?"Online":"NotOnline"}</StatusText>
                </Status>
              </WrapperText>
            </WrapperInfo>
          </WrapperInfoPadding>
        </Col>
        <Col lg={2}>
          <WrapperFeaturesPadding className="h-100">
            <Features className="h-100">
              <FutureSwitchWrapper onClick={toggleTheme}>
                <ToggleTheme />
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
