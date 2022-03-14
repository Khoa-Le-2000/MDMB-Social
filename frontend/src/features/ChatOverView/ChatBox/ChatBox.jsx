import { Send } from '@styled-icons/boxicons-solid';
import { EmojiHappy } from '@styled-icons/heroicons-outline';
import { PaperClip, Photograph } from '@styled-icons/heroicons-solid';
import { ReactComponent as StickerTest } from 'assets/images/icons/sticker.svg';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { HoverMixin } from 'styles/mixinStyles';
import { NimblePicker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/google.json';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  visibility: ${(props) => (props.WindowEmpty ? 'hidden' : 'none')};
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
const EmojiIcon = styled(EmojiHappy)`
  width: 1.5rem;
  height: 1.5rem;
  padding: 1px;
  position: absolute;
  right: 100%;
  ${HoverMixin.default};
  border-radius: 50%;
  margin: 12px 10px;
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

const WrapperDialog = styled.div`
  position: absolute;
  transform: translateY(-100%);
  right: 0;
`;

function ChatBox({ onSendMessage, onTyping, WindowEmpty }) {
  const [message, setMessage] = React.useState('');
  const typingTimeoutRef = React.useRef(null);
  const [showPicker, setShowPicker] = React.useState(false);

  const handleKeyPress = (e) => {
    clearTimeout(typingTimeoutRef.current);
    onTyping({
      isTyping: true,
    });
  };

  const handleKeyUp = (e) => {
    clearTimeout(typingTimeoutRef.current);
    const value = e.currentTarget.value;
    setMessage(value);
    if (!onTyping) return;
    typingTimeoutRef.current = setTimeout(() => {
      onTyping({
        isTyping: false,
      });
    }, 1000);
  };

  const onSendClick = (e) => {
    e.preventDefault();
    if (!message || message.trim().length === 0) return;
    onSendMessage(message);
    setMessage('');
  };

  const onPreviewEmoji = () => {
    setShowPicker((prev) => !prev);
  };

  const onEmojiClick = (emoji) => {
    setMessage(message + emoji.native);
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
              onKeyUp={handleKeyUp}
              onKeyPress={handleKeyPress}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={(e) => e.key === 'Enter' && onSendClick(e)}
              onFocus={() => setShowPicker(false)}
            />
            <FeaturesRight>
              <WrapperDialog>
                {showPicker && (
                  <NimblePicker
                    onSelect={onEmojiClick}
                    native={true}
                    data={data}
                    set={'google'}
                    emojiSize={32}
                    perLine={6}
                    sheetSize={32}
                    showSkinTones={false}
                    showPreview={false}
                  />
                )}
              </WrapperDialog>
              <EmojiIcon onClick={onPreviewEmoji} />
              <SendMessenger onClick={onSendClick} />
            </FeaturesRight>
          </WrapperInput>
        </Col>
      </Row>
    </Wrapper>
  );
}
export default ChatBox;
