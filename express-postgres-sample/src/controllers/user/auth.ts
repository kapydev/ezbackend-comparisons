import { Router } from 'express'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import { userModel } from '../../models'
import passport from "passport"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK!,
},
    async function verify(accessToken, refreshToken, profile, done) {
        try {
            let user = await userModel.find({ googleId: profile.id }).exec()
            if (!user) {
                user = await userModel.create({ googleId: profile.id, googleData: profile })
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }
))


export const authController = Router()

authController.get('/google/login', (req, res) => {

})

authController.get('/google/logout', (req, res) => {

})

authController.get('/google/callback', (req, res) => {

})