import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
 import userRoute from './routes/userRoute.js'

const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connected to MongoDB')
})

 app.use('/user',userRoute)

app.listen(3000,() => {
    console.log('Server listening on port 3000')
})