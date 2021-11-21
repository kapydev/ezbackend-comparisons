import { userController, postController } from "./controllers"
import express from "express"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import pino from 'pino'
import expressPino from 'express-pino-logger'
import mongoose from 'mongoose'

const app = express()

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

//PLUGINS
// app.use(expressPino({logger}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false
}))

app.use('/user', userController)
app.use('/post', postController)

export default app

