import CardMessage from 'features/ChatOverView/ChatWindow/WindowContent/Messages/CardMessage/CardMessage';
import React from 'react';
import { getAuth } from 'app/selectors/login';
import { useSelector } from 'react-redux';

function Messages({ messages, partner }) {
  const myAccountId = useSelector(getAuth)?.accountId;

  return messages.map((item, index) => (
    <CardMessage
      key={item.MessageId}
      messageId={item.MessageId}
      seenDate={item.seenDate}
      sentDate={item.SentDate}
      name={partner.Name}
      avatar={item.avatar}
      content={item.Content}
      type={item.Type === 0 ? 'text' : 'image'}
      owner={item.FromAccount === myAccountId}
    />
  ));
}
export default Messages;
