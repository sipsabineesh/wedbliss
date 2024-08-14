import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
export default function useSocket(userId) {
    const socketRef = useRef(null);

    useEffect(() => {
      if (userId) {
        socketRef.current = io('http://localhost:3000', {
          query: { userId }
        });
  
        socketRef.current.on('connect', () => {
          console.log('Socket connected:', socketRef.current.id);
        });
  
        socketRef.current.on('disconnect', () => {
          console.log('Socket disconnected');
        });
  
        return () => {
          socketRef.current.disconnect();
        };
      }
    }, [userId]);
  
    return socketRef.current;
}


