import 'emoji-mart/css/emoji-mart.css';
import React, { useState, useCallback, useRef } from 'react';
import { Picker } from 'emoji-mart';
import styled from 'styled-components';
import { HoverMixin } from 'styles/mixinStyles';
import { EmojiHappy } from '@styled-icons/heroicons-outline';

const Dialog = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const EmojiButton = styled.span`
  cursor: pointer;
  padding: 5px;
`;
const EmojiIcon = styled(EmojiHappy)`
  width: 2rem;
  height: 2rem;
  padding: 5px;
  position: absolute;
  right: 100%;
  ${HoverMixin.default};
  border-radius: 50%;
`;

const EmojiInput = ({ value, onSelection }) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef(null);

  const dismissPicker = useCallback(() => {
    setPickerState(false);
  }, [setPickerState]);

  const togglePicker = () => {
    setPickerState(!showPicker);
  };

  const addEmoji = (emoji) => {
    if ('native' in emoji) {
      onSelection(`${value}${emoji.native}`);
      dismissPicker();
    }
  };

  return (
    <div ref={picker}>
      <Dialog>
        {showPicker && (
          <Picker emoji="" title="" native={true} onSelect={addEmoji} />
        )}
      </Dialog>
      <EmojiButton onClick={togglePicker}>
        <EmojiIcon title="Open emoji selector" />
      </EmojiButton>
    </div>
  );
};

export default EmojiInput;
