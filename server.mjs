import express from 'express';
import connectDB from './connections/mongoConnect.mjs';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import corsOptions from './config/cors/corsOptions.mjs';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


import uploadRouter from './routers/upload.router.mjs'


const app = express();


configDotenv()
connectDB(process.env.DATABASE_URI);


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/upload', uploadRouter)



mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, () => console.log(`🌎 - Listening On http://localhost:${process.env.PORT} -🌎`)
    )
})


export default app;