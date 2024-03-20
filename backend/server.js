import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
 import userRoute from './routes/userRoute.js'
 import authRoute from './routes/authRoute.js'


const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connected to MongoDB')
})

app.use(bodyParser.urlencoded({
    extended: true
  }));
 app.use(express.json())
 app.use('/user',userRoute)
 app.use('/auth',authRoute)


app.listen(3000,() => {
    console.log('Server listening on port 3000')
})