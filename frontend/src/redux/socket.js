import { io } from 'socket.io-client';
import { store } from './store';
import { addNotification } from './socketSlice';

const socket = io('https://wedbliss.live');

socket.on('subscriptionRenewal', (notification) => {
  store.dispatch(addNotification(notification));
});

export default socket;
