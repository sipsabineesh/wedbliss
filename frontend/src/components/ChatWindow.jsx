import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { ChatContext } from '../context/ChatContext.js';
import MessageInput from './MessageInput';

export default function ChatWindow({ contactId }) {
//   const { user } = useContext(AuthContext);
const { messages, setMessages, socket } = useContext(ChatContext);
const [chatMessages, setChatMessages] = useState([]);
const {currentUser} = useSelector(state => state.user)

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/messages/${currentUser._id}/${contactId}`);
      setChatMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMessages();
}, [currentUser, contactId]);

useEffect(() => {
  setChatMessages(messages.filter(
    (msg) => (msg.sender === currentUser._id && msg.receiver === contactId) ||
             (msg.sender === contactId && msg.receiver === currentUser._id)
  ));
}, [messages, currentUser, contactId]);

return (
  <div className="chat-window">
    {chatMessages.map((msg) => (
      <div key={msg._id} className={msg.sender === currentUser._id ? 'sent' : 'received'}>
        <p>{msg.content}</p>
        <span>{new Date(msg.timestamp).toLocaleString()}</span>
      </div>
    ))}
    <MessageInput contactId={contactId} />
  </div>
);
}

