import User from '../models/User.mjs';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../utils/generateToken.mjs';


export const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(200).json({ message: 'User already exists' })

        const mobileNumberExists = await User.findOne({ phone: phone })
        if (mobileNumberExists) res.status(200).json({ message: 'Mobile number is already taken' })

        const user = await User.create({ name, email, password, phone });
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ accessToken, user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken, user });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Login failed' });
    }
};


export const refreshAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const { userId } = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken(userId);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
