import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Connected to MongoDB')
})

app.listen(3000,() => {
    console.log('Server listening on port 3000')
})