import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header';
import Conversation from '../../components/Conversation';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

export default function Messenger() {
  const { state } = useLocation();
  const [conversations, setConversations] = useState({});
  const [currentChat, setCurrentChat] = useState(state?.conversation || null); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadConversations,setUnreadConversations] = useState({});
  const [unreadCurrentConversations, setUnreadCurrentConversations] = useState({});
  const socket = useRef();
  const scrollRef = useRef();
  const userDetailsRef = useRef({});
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsMap = {};
        const memberIds = [...new Set(Object.values(conversations).flatMap(conversation => conversation.members))];
        for (const memberId of memberIds) {
          if (!userDetails[memberId]) {
            const res = await axios.get(`/api/user/userDetails?userId=${memberId}`);
            userDetailsMap[memberId] = res.data;
          }
        }
        setUserDetails(prevDetails => ({ ...prevDetails, ...userDetailsMap }));
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    if (Object.keys(conversations).length > 0) {
      fetchUserDetails();
    }
  }, [conversations]);

  useEffect(() => {
    // Update the ref with the latest userDetails
    userDetailsRef.current = userDetails;
  }, [userDetails]);
  
  useEffect(() => {
     socket.current = io('http://localhost:3000');
     let senderId = ''
     socket.current.on('getMessage', (data) => {
       senderId = data.senderId;
       const senderDetails = userDetailsRef.current[senderId];
       const senderUsername = senderDetails ? senderDetails.username : 'Unknown User';
       toast.success(`New Message from ${senderUsername}`)
            setArrivalMessage({
            sender: senderId,
            text: data.text,
            conversationId: data.conversationId,
            createdAt: Date.now(),
            read: false,
        });
       
  
        // Set the notification with the username
        setNotifications(prev => [...prev, `New message from ${senderUsername}`]);

        setUnreadCurrentConversations(prev => ({
            ...prev,
            [data.conversationId]: (prev[data.conversationId] || 0) + 1
        }));
    });
}, [userDetails]); 


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', currentUser._id);
    socket.current.on('getUsers', users => {
    });
  }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (currentUser && currentUser._id) {
          const userId = currentUser._id;
          const res = await axios.get(`/api/conversations/${userId}`);

          if (Array.isArray(res.data)) {
            const conversationsObject = res.data.reduce((acc, conversation) => {
              acc[conversation._id] = conversation;
              return acc;
            }, {});
            setConversations(conversationsObject);
          } else {
            console.error('Expected an array but got:', res.data);
          }
        } else {
          console.warn('currentUser or currentUser._id is not defined');
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };

    getConversations();
  }, [currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        
        const res = await axios.get('/api/messages/' + currentChat?._id);
        setMessages(res.data);
        setUnreadCurrentConversations(prev => ({ ...prev, [currentChat?._id]: 0 }));
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit('sendMessage', {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
      conversationId: currentChat._id,
    });
    try {
      const res = await axios.post('/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
      setConversations((prevConversations) => ({
        ...prevConversations,
        [currentChat._id]: {
          ...prevConversations[currentChat._id],
          updatedAt: new Date().toISOString(),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state && state.conversation) {
      setCurrentChat(state.conversation);
    }
  }, [state]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`/api/messages/${currentChat?._id}`);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (err) {
      console.error("Failed to mark message as read", err);
    }
  };

  const unreadMessages = messages.filter((msg) => !msg.read && msg.sender !== currentUser._id);
  const readMessages = messages.filter((msg) => msg.read || msg.sender === currentUser._id);
  const groupedMessages = groupMessagesByDate(readMessages);

  const clearNotifications = () => {
    setNotifications([]);
  };

 
  const filteredConversations = Object.values(conversations)
    .filter(conversation =>
      conversation.members.some(member =>
        userDetails[member]?.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); 

  const getChatUserName = () => {
    if (!currentChat) return '';
    const chatUserId = currentChat.members.find(member => member !== currentUser._id);
    return userDetails[chatUserId]?.username || '';
  };

  return (
    <>
      <Header/>
      <div className="messenger mt-5">
      {/* {notifications.length > 0 && (
          <div className="notificationBar">
            <div className="notifications">
              {notifications.map((notification, index) => (
                <div key={index} className="notification">
                  {notification}
                </div>
              ))}
            </div>
            <button onClick={clearNotifications} className="clearNotificationsButton">
              Clear Notifications
            </button>
          </div>
        )} */}
        <div className="chatContainer">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search"
              className="chatMenuInput"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                  <Conversation
                    conversation={conversation}
                    currentUser={currentUser}
                    unreadCount={unreadCurrentConversations[conversation._id] || 0}
                  />
                </div>
              ))
            ) : (
              <p>No conversations found</p>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxHeader">
                  <h4>{getChatUserName()}</h4>
                </div>
                <div className="chatBoxTop">
                  {Object.keys(groupedMessages).map(date => (
                    <div key={date}>
                      <div className="dateSeparator"><span className="middleText">{date}</span></div>
                      {groupedMessages[date].map((m) => (
                        <div ref={scrollRef} key={m._id}>
                          <Message message={m} own={m.sender === currentUser._id} />
                        </div>
                      ))}
                    </div>
                  ))}
                  {unreadMessages.length > 0 && (
                    <div className="unreadMessages">
                      <div className="unreadHeader">{unreadMessages.length} Unread Messages</div>
                      {unreadMessages.map((m) => (
                        <div
                          key={m._id}
                          ref={scrollRef}
                          onClick={() => markAsRead(m._id)}
                        >
                          <Message message={m} own={m.sender === currentUser._id} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

