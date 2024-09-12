import { useState,useEffect } from 'react';
import axios from "axios";

export default function Conversation({ conversation, currentUser, unreadCount }) {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const memberId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`/api/user/userDetails?userId=${memberId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  

  return (
    <>
      <div className="conversation">
      <img
        className="conversationImg"
        src= {user ? `${user.profilePhoto}` : "Loading..."}
        alt=""
      />
       
      <span className="conversationName"> {user ? `${user.username}` : "Loading..."}</span>
      {unreadCount > 0 && <span className="unreadBadge">{unreadCount}</span>}
    </div>
    </>
  )
}
