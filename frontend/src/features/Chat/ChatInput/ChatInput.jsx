import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Photograph, PaperClip } from '@styled-icons/heroicons-solid';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
`;
const WrapperInput = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const FeaturesTop = styled.div``;

const IconSticker = styled.div``;
const IConUploadImage = styled(Photograph)`
  width: 1.2rem;
`;
const IconUploadFile = styled(PaperClip)`
  width: 1.2rem;
`;

const FeaturesRight = styled.div``;
const Input = styled.textarea`
  height: 50px;
  padding: 10px 140px 10px 10px;

  resize: none;
  border: 1px solid #ccc;
  display: block;
  width: 80%;
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
            <IConUploadImage />
            <IconUploadFile />
          </FeaturesTop>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <WrapperInput>
            <Input />
            <FeaturesRight>fsdfsd</FeaturesRight>
          </WrapperInput>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default ChatInput;
