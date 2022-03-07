import { Send } from '@styled-icons/boxicons-solid';
import { EmojiHappy } from '@styled-icons/heroicons-outline';
import { PaperClip, Photograph } from '@styled-icons/heroicons-solid';
import { ReactComponent as StickerTest } from 'assets/images/icons/sticker.svg';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { HoverMixin } from 'styles/MixinStyles';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  opacity: ${(props) => (props.WindowEmpty ? "0" : "1")};

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
  border-radius: 50%;
`;
const IconUploadFile = styled(PaperClip)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  ${HoverMixin.default};
  border-radius: 50%;
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
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: rotate(-90deg);
    cursor: pointer;
  }
`;
const Emoji = styled(EmojiHappy)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  position: absolute;
  right: 100%;
  ${HoverMixin.default};
  border-radius: 50%;
`;

const Input = styled.input`
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
const IconSticker = styled(StickerTest)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  border-radius: 50%;
  ${HoverMixin.default};
`;

function ChatBox({ onSendMessage, onTyping, WindowEmpty }) {
  const [message, setMessage] = React.useState('');
  const typingTimeoutRef = React.useRef(null);
  const handleKeyPress = (e) => {
    clearTimeout(typingTimeoutRef.current);
    onTyping(true);
  };

  const handleKeyUp = (e) => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = window.setTimeout(() => { }, 1000);
    const value = e.currentTarget.value;
    setMessage(value);

    if (!onTyping) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        keyword: value.replace(/\s/g, ''),
      };
      onTyping(formValues);
    }, 300);
  };

  const onSendClick = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <Wrapper WindowEmpty={WindowEmpty}>
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
            <Input
              contentEditable
              onKeyUp={handleKeyUp}
              onKeyPress={handleKeyPress}
            />
            <FeaturesRight>
              <Emoji />
              <SendMessenger onClick={onSendClick} />
            </FeaturesRight>
          </WrapperInput>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default ChatBox;
