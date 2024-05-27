import React, { useState } from 'react';

export default function MessageInput({ onSendMessage }) {
    const [text, setText] = useState('');

    const handleChange = e => {
      setText(e.target.value);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      if (text.trim() !== '') {
        onSendMessage(text);
        setText('');
      }
    };
  return (
    <>  
     <form onSubmit={handleSubmit} className="message-input-form">
    <input
      type="text"
      placeholder="Type your message..."
      value={text}
      onChange={handleChange}
    />
    <button type="submit">Send</button>
  </form>
  </>
  )
}

