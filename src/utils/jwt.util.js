import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
}
