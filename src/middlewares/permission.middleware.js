import UserModel from "../models/User.js";

export const isLogin = async (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
        const user = await UserModel.findById(req.user._id)
        if (user) {
            return next();
        }
    }
    return res.status(401).send('Unauthorized');
}

export const isAdmin = (req, res, next) => {
    if (req.user.role === 999)
        return next();
    return res.status(403).send('Forbidden');
}