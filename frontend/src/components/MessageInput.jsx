import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ChatContext } from '../context/ChatContext';

export default function MessageInput({ contactId }) {
  const { socket } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const {currentUser} = useSelector(state => state.user)

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: currentUser._id,
      receiver: contactId,
      content: message,
    };

    try {
      const res = await axios.post('/api/messages', newMessage);
      socket.emit('sendMessage', res.data);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={sendMessage} className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );

}
