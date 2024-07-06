import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ChatContext } from '../context/ChatContext.js';


export default function ChatList({ setContactId }) {
    const [contacts, setContacts] = useState([]);
  const { messages } = useContext(ChatContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`/api/users/`);
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
  }, []);

  const getUnreadCount = (contactId) => {
    return messages.filter(
      (msg) => msg.sender === contactId && msg.receiver === user._id && !msg.read
    ).length;
  };


  return (
    <div className="chat-list">
      {contacts.map((contact) => (
        <div key={contact._id} onClick={() => setContactId(contact._id)}>
          {contact.username} ({getUnreadCount(contact._id)})
        </div>
      ))}
    </div>
  
  )
}
