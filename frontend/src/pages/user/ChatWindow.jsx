import React from 'react'
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow() {
    const messages = [
        { user: 'Alice', text: 'Hi there!' },
        { user: 'Bob', text: 'Hello!' },
        { user: 'Alice', text: 'How are you?' },
        { user: 'Bob', text: 'I\'m good, thanks!' },
      ];
    const onSendMessage="hello"
  return (
    <>
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
    </>
  )
}
