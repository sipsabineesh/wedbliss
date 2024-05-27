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

 app.use('/api/user',userRoute)
 app.use('/api/auth',authRoute)
 app.use('/api/admin',adminRoute)
 

  app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
  })


  
  
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});