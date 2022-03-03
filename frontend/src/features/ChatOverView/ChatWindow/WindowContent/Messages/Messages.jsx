import CardMessage from 'features/ChatOverView/ChatWindow/WindowContent/Messages/CardMessage/CardMessage';
import React from 'react';

function Messages({ messages, myAccountId }) {
  console.log('🚀 :: file: Messages.jsx :: line 5 :: myAccountId', myAccountId);
  return messages.map((item, index) => (
    <CardMessage
      key={item.MessageId}
      messageId={item.MessageId}
      seenDate={item.seenDate}
      sentDate={item.SentDate}
      name={item.FromAccount === myAccountId ? 'You' : 'Receiver'}
      avatar={item.avatar}
      content={item.Content}
      type={item.Type === 0 ? 'text' : 'image'}
      owner={item.FromAccount === myAccountId}
    />
  ));
}
export default Messages;
