import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/userRoutes.js"
import websiteRouter from './routes/websiteRoutes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,

}))


const PORT = process.env.PORT || 5000   
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/website', websiteRouter)
app.listen(PORT,()=>
{
    connectDb()
    console.log(`Server is running on port ${PORT}`)
})