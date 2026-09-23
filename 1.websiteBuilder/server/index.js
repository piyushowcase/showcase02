import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/userRoutes.js"
import websiteRouter from './routes/websiteRoutes.js'
import billingRouter from './routes/billingRoutes.js'
import { stripeWebHook } from './controller/stripeWebHook.controller.js'

const app = express()
app.post("/api/stripe/webhook",express.raw({type:"application/json"}),
stripeWebHook)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://showcase02-2.onrender.com/',
    credentials: true,

}))


const PORT = process.env.PORT || 5000   
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/website', websiteRouter)
app.use('/api/billing', billingRouter)

app.listen(PORT,()=>
{
    connectDb()
    console.log(`Server is running on port ${PORT}`)
})
