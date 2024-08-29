import { io } from 'socket.io-client';
import { store } from './store';
import { addNotification } from './socketSlice';

const socket = io('http://localhost:3000');

socket.on('subscriptionRenewal', (notification) => {
  store.dispatch(addNotification(notification));
});

export default socket;
