import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Photograph, PaperClip, ChevronRight } from '@styled-icons/heroicons-solid';
import { EmojiHappy } from '@styled-icons/heroicons-outline';
import { Sticky } from '@styled-icons/bootstrap';

const iconHover = `&:hover {
  transform: scale(1.5);
  transition: all 0.3s linear;
}`
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
`;
const WrapperInput = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const FeaturesTop = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  `;

const IConUploadImage = styled(Photograph)`
  width: 2rem;
  ${iconHover};
`;
const IconUploadFile = styled(PaperClip)`
  width: 2rem;
  ${iconHover};
`;
const IconSticker = styled(Sticky)`
  width: 1.7rem;
  ${iconHover};
`;
const SendMessenger = styled(ChevronRight)`
  width: 2rem;
  ${iconHover};
`
const Emoji = styled(EmojiHappy)`
  width: 2rem;
  ${iconHover};
`

const FeaturesRight = styled.div`
display: flex;
justify-content: center;
margin-left: 10px;
`;
const Input = styled.textarea`
  height: 50px;
  padding: 10px 140px 10px 10px;

  resize: none;
  border: 1px solid #ccc;
  display: block;
  width: 90%;
  font-size: 1rem;
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
            <Input />
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
