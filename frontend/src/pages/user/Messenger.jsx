  import { useState, useEffect, useRef } from 'react';
  import { useSelector } from 'react-redux';
  import axios from 'axios';
  import Header from '../../components/Header';
  import Conversation from '../../components/Conversation';
  import Message from '../../components/Message';
  import { io } from 'socket.io-client';

  export default function Messenger() {
    const [conversations, setConversations] = useState({});
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [unreadConversations, setUnreadConversations] = useState({});
    const socket = useRef();
    const scrollRef = useRef();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
      socket.current = io('http://localhost:3000');
      socket.current.on('getMessage', (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
          read: false,
        });
      setNotifications(prev => [...prev, `New message from ${data.senderId}`]);
      setUnreadConversations(prev => ({
        ...prev,
         [data.conversationId]: (prev[data.conversationId] || 0) + 1
        
      }));
      });
    }, []);

    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
      socket.current.emit('addUser', currentUser._id);
      socket.current.on('getUsers', users => {
        console.log(users);
      });
    }, [currentUser]);

    useEffect(() => {
      const getConversations = async () => {
        try {
          if (currentUser && currentUser._id) {
            const userId = currentUser._id;
            console.log('Fetching conversations for user:', userId);
            const res = await axios.get(`/api/conversations/${userId}`);
            console.log('Server response data:', res.data);

            if (Array.isArray(res.data)) {
              const conversationsObject = res.data.reduce((acc, conversation) => {
                acc[conversation._id] = conversation;
                return acc;
              }, {});
              setConversations(conversationsObject);
              console.log('Conversations set successfully:', conversationsObject);
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
          console.log('currentChat');
          console.log(currentChat);
          const res = await axios.get('/api/messages/' + currentChat?._id);
          console.log(res);
          setMessages(res.data);
          setUnreadConversations(prev => ({ ...prev, [currentChat?._id]: 0 }));
           } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
      e.preventDefault();
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
      });
      try {
        const res = await axios.post('/api/messages', message);
        setMessages([...messages, res.data]);
        setNewMessage('');
      } catch (err) {
        console.log(err);
      }
      // try {
      //   const res = await axios.put('/api/conversations/'+currentChat._id, message);
      //   setMessages([...messages, res.data]);
      //   setNewMessage('');
      // } catch (err) {
      //   console.log(err);
      // }
    };

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

const filteredConversations = Object.values(conversations).filter(conversation =>
  conversation.members.some(member =>
    userDetails[member]?.username.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


    return (
      <>
        {/* <Header/> */}
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search" className="chatMenuInput"
              onChange={(e) => setSearchTerm(e.target.value)} />
              {/* {Object.keys(conversations).length > 0 ? (
                Object.keys(conversations).map(conversationId => (
                  <div key={conversationId} onClick={() => setCurrentChat(conversations[conversationId])}>
                    <Conversation conversation={conversations[conversationId]} currentUser={currentUser} />
                  </div>
                ))
              ) : (
                <p>No conversations found</p>
              )} */}
               {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} currentUser={currentUser}
                  unreadCount={unreadConversations[conversation._id] || 0}/> 
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
                      <div className="unreadHeader">Unread Messages</div>
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
                    <button className="chatSubmitButton"
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
      </>
    );
  }

// import {useState,useEffect,useRef} from 'react'
// import { useSelector } from 'react-redux'
// import axios from "axios"
// import Header from '../../components/Header'
// import Conversation from '../../components/Conversation'
// import Message from '../../components/Message'
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState({});
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   // const [socket, setSocket] = useState(null);
//   const socket = useRef();
//   const scrollRef = useRef();
//   const { currentUser } = useSelector(state => state.user);

//   useEffect(() => {
//     // setSocket(io("http://localhost:3000"));
//     socket.current = io("http://localhost:3000")
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []); 

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

// useEffect(() => {
//   socket.current.emit("addUser",currentUser._id)
//   socket.current.on("getUsers",users =>{
//     console.log(users)
//   })
// },[currentUser])
//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         if (currentUser && currentUser._id) {
//           const userId = currentUser._id;
//           console.log("Fetching conversations for user:", userId);
//           const res = await axios.get(`/api/conversations/${userId}`);
//           console.log("Server response data:", res.data);

//           if (Array.isArray(res.data)) {
//             const conversationsObject = res.data.reduce((acc, conversation) => {
//               acc[conversation._id] = conversation;
//               return acc;
//             }, {});
//             setConversations(conversationsObject);
//             console.log("Conversations set successfully:", conversationsObject);
//           } else {
//             console.error("Expected an array but got:", res.data);
//           }
//         } else {
//           console.warn("currentUser or currentUser._id is not defined");
//         }
//       } catch (err) {
//         console.error("Error fetching conversations:", err);
//       }
//     };

//     getConversations();
//   }, [currentUser]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         console.log("currentChat")
//         console.log(currentChat)
//         const res = await axios.get("/api/messages/" + currentChat?._id);
//         console.log(res)
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: currentUser._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== currentUser._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: currentUser._id,
//       receiverId,
//       text: newMessage,
//     });
//   try {
//     const res = await axios.post("/api/messages", message);
//     setMessages([...messages, res.data]);
//     setNewMessage("");
//   } catch (err) {
//     console.log(err);
//   }
//   }

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//         {/* <Header/> */}
//         <div className="messenger">
//             <div className = "chatMenu">
//             <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//           {Object.keys(conversations).length > 0 ? (
//         Object.keys(conversations).map(conversationId => (
//           // <div onClick={() => setCurrentChat(c)}>
                
//           //     </div>
//           <div key={conversationId} onClick={() => setCurrentChat(conversations[conversationId])}>
//             <Conversation conversation={conversations[conversationId]} currentUser={currentUser} />
//           </div>
//         ))
//       ) : (
//         <p>No conversations found</p>
//       )}
//           </div>
//             </div> 
//             <div className = "chatBox">  
//                  <div className="chatBoxWrapper">
//                  {currentChat ? (
//               <>
//                    <div className="chatBoxTop">
//                    {messages.map((m) => (
//                      <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === currentUser._id} />
//                     </div>
//                   ))}
//                    </div>
//                    <div className="chatBoxBottom">
//                    <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" 
//                   onClick={handleSubmit}
//                   >
//                     Send
//                   </button>
//                    </div>
//                    </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }
