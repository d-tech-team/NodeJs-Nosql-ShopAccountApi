import passport from "passport";
import localStratery from "passport-local";
const LocalStrategy = localStratery.Strategy;
import UserModel from "../models/User.js";
import { hashOrComparePassword } from './password.util.js'

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Email is not existed" });
        }
        const isMatch = await hashOrComparePassword(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (user, done) => {
    try {
        const data = await UserModel.findById({ _id: user }).select('-password');
        done(null, data);
    } catch (error) {
        done(error);
    }
})


export default passport;