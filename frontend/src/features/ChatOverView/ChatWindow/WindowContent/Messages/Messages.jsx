import Receiver from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Receiver/Receiver';
import Sender from 'features/ChatOverView/ChatWindow/WindowContent/Messages/Sender/Sender';
import React from 'react';

function Messages({ messages }) {
  return (
    messages &&
    messages?.map((item, index) => (
      <Receiver
        key={index}
        seen={item.seen}
        id={item.id}
        name={item.name}
        avatar={item.avatar}
        message={item.message}
        time={item.time}
        type={item.type}
        owner={item.owner}
      />
    ))
  );
}
export default Messages;
