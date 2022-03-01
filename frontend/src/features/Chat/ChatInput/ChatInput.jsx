import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Photograph, PaperClip } from '@styled-icons/heroicons-solid';
import { EmojiHappy } from '@styled-icons/heroicons-outline';
import { Send, Sticker } from '@styled-icons/boxicons-solid';
import { HoverMixin } from 'styles/MixinStyles';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const WrapperInput = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const FeaturesTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15%;
  height: 100%;
  padding: 5px;
  
`;

const IConUploadImage = styled(Photograph)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  ${HoverMixin.default};
`;
const IconUploadFile = styled(PaperClip)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  ${HoverMixin.default};
`;
const IconSticker = styled(Sticker)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  ${HoverMixin.default};
`;
const FeaturesRight = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
const SendMessenger = styled(Send)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 5px;
  margin-top: 10%;
  ${HoverMixin.default};
`;
const Emoji = styled(EmojiHappy)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  position: absolute;
  right: 100%;
  ${HoverMixin.default};
`;

const Input = styled.p`
  white-space: pre-wrap;
  margin-bottom: 0;
  padding: 10px;
  resize: none;
  border: 1px solid #ccc;
  display: block;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    outline: 0;
    border-color: #80bdff;
  }
`;

function ChatInput() {
  return (
    <Wrapper>
      <Row>
        <Col lg={12}>
          <FeaturesTop>
            <IconSticker />
            <IConUploadImage />
            <IconUploadFile />
          </FeaturesTop>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <WrapperInput>
            <Input contentEditable />
            <FeaturesRight>
              <Emoji />
              <SendMessenger />
            </FeaturesRight>
          </WrapperInput>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default ChatInput;
