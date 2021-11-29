import { Router } from 'express'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import { userModel } from '../../models'
import passport from "passport"

declare global {
    namespace Express {
        interface User {
            id: string
            googleId: string,
            googleData: any
        }
    }
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/users/auth/google/callback",
},
    async function verify(accessToken, refreshToken, profile, done) {
        try {
            let user = await userModel.findOrCreate({
                where: {
                    googleId: profile.id
                },
                defaults: {
                    googleData: profile
                }
            })
            return done(null, user[0])
        } catch (err) {
            return done(err)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {

    userModel
        .findByPk(id as string)
        .then((user) => {
            //@ts-ignore
            done(null, user)
        })
})


export const authController = Router()

authController.get('/google/login', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

authController.get('/google/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

authController.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
}))