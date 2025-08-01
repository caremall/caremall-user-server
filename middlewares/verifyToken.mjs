import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded?.userId).select('-password');
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token expired or invalid' });
    }
};
