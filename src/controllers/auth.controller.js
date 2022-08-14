import { validationResult } from 'express-validator';
import passport from 'passport';
import { hashOrComparePassword } from '../utils/password.util.js';
import UserModel from '../models/User.js';
import { generateToken } from '../utils/jwt.util.js';


export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            data: errors.array()[0].msg
        });
    }

    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                data: "Email is existed"
            });
        }

        await UserModel.create({
            email,
            password: await hashOrComparePassword(password)
        })

        return res.status(201).json({
            success: true,
            data: "Signup success"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const signin = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                data: info.message
            });
        }

        delete user._doc.password;

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const
                data = {
                    ...user._doc,
                    token: generateToken({ _id: user._id })
                }
            return res.status(200).json({
                success: true,
                data
            });
        });
    })(req, res, next);
}