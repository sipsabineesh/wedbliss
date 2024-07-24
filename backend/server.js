import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors  from 'cors';
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cloudinary from "cloudinary";
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import conversationRoute from './routes/conversationRoute.js'
import messageRoute from './routes/messageRoute.js'
import subscriptionRenewalNotifier from './tasks/subscriptionRenewalNotifier.js';
import {handleNotificationEvents} from './sockets/notificationSocket.js'

const app = express();
dotenv.config()
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connected to MongoDB')
})

app.use(bodyParser.urlencoded({
    extended: true
  }));
 app.use(express.json())

 cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use((req, res, next) => {console.log('Middleware executed');
req.io = io;
next();
});


subscriptionRenewalNotifier(io);
handleNotificationEvents(io);

 app.use('/api/user',userRoute)
 app.use('/api/auth',authRoute)
 app.use('/api/admin',adminRoute)
 app.use("/api/conversations",conversationRoute);
 app.use("/api/messages", messageRoute);
 

  app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
  })

  let users = [];

  const addUser = (userId, socketId) => {
    console.log(`Adding user: ${userId} with socketId: ${socketId}`);
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
      console.log('User added. Current users:', users);
    }
  };

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log('User removed. Current users:', users);
};
const getUser = (userId) => {
  console.log('Finding user with userId:', userId);
  console.log('Current users:', users);
  const user = users.find((user) => user.userId === userId);
  console.log('Found user:', user);
  return user;
};
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.emit('your-id', socket.id);

  socket.on('joinRoom', (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId);
  });

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("SENDING MESSAGE SOCKET:", senderId, receiverId, text);
    const user = getUser(receiverId);
    if (user && user.socketId) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.error('User not found or user.socketId is undefined');
    }
  });

//   socket.on('reportAbuse', (data, callback) => {
//     console.log('Report Abuse Data:', data);
//     callback({ status: 'success', message: 'Report received successfully' });
// });


socket.on('reportAbuse', (data, callback) => {
  console.log('Report Abuse Data:', data);
  io.emit('abuseReported', data);
  setTimeout(() => {
      callback({ status: 'success', message: 'Report received successfully' });
  }, 1000);
});


socket.on('offer', payload => {
  io.to(payload.target).emit('offer', payload);
});

socket.on('answer', payload => {
  io.to(payload.target).emit('answer', payload);
});

socket.on('ice-candidate', payload => {
  io.to(payload.target).emit('ice-candidate', payload);
});

socket.on('incomingCall', ({ callerId, receiverId }) => {
  console.log("CALLINGGGGGGGGGGGGGGGGGG SOCKET")
  io.to(receiverId).emit('callNotification', { callerId, message: 'You have an incoming call' });
});

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


  
  // const addUser = (userId, socketId) => {
  //   console.log("userId,socketId IN Add User")
  //   console.log(userId,socketId)

  //   !users.some((user) => user.userId === userId) &&
  //     users.push({ userId, socketId });
  // };
  
  // const removeUser = (socketId) => {
  //   users = users.filter((user) => user.socketId !== socketId);
  // };
  
  // const getUser = (userId) => {
  //   console.log("userId & users IN GETuSER")
  //   console.log(userId)
  //   console.log(users)

  //   return users.find((user) => user.userId === userId);
//   // };
  
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);
//   io.emit('welcome', " THIS IS SOCKET");
//   socket.on('joinRoom', (userId) => {
//     console.log(`User ${userId} joined room`);
//     socket.join(userId);
//   });

  
//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//     });

//      //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     console.log("SENDING MESSAGE SOCKET:",senderId,receiverId,text)
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected:', socket.id);
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
  
// });


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});