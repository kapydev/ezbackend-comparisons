import { userController, postController } from "./controllers"
import express from "express"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

const app = express()

//PLUGINS
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', userController)
app.use('/posts', postController)

export default app

