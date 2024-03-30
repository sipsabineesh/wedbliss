import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'


const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connected to MongoDB')
})

app.use(bodyParser.urlencoded({
    extended: true
  }));
 app.use(express.json())
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

app.listen(3000,() => {
    console.log('Server listening on port 3000')
})