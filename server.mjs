import express from 'express';
import connectDB from './connections/mongoConnect.mjs';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
// import corsOptions from './config/cors/corsOptions.mjs';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


import authRouter from './routers/auth.router.mjs'
import ordersRouter from './routers/orders.router.mjs'
import uploadRouter from './routers/upload.router.mjs'
import brandRouter from './routers/brands.router.mjs'
import categoriesRouter from './routers/categories.router.mjs'
import productsRouter from './routers/products.router.mjs'
import reviewsRouter from './routers/reviews.router.mjs'
import cartRouter from './routers/cart.router.mjs'


const app = express();


configDotenv()
connectDB(process.env.DATABASE_URI);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/upload', uploadRouter)
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoriesRouter)
app.use('/reviews', reviewsRouter)

app.use('/', (req, res) => res.json('Hello world'))


mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, () => console.log(`🌎 - Listening On http://localhost:${process.env.PORT} -🌎`)
    )
})


export default app;