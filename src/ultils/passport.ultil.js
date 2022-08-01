import passport from "passport";
import localStratery from "passport-local";
const LocalStrategy = localStratery.Strategy;

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => {
    
}))