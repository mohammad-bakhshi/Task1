const createError = require('http-errors');
const User = require('../models/user');
const { signAccessToken, signRefreshToken, verifyRefreshToken, redisClient } = require('../utils/jwt_helper');

//create a new user
const create_user = async (req, res, next) => {
    try {
        const user = await User.findOne({ cellphone: req.body.cellphone }, { cellphone: 1, _id: 0 });
        if (!user) {
            const { fullname, cellphone, password } = req.body;
            const newUser = await User.create({ fullname, cellphone, password });
            const accessToken = await signAccessToken(newUser._id.toString());
            const refreshToken = await signRefreshToken(newUser._id.toString());
            return res.status(201).json({ status: 'User created successfully.', accessToken, refreshToken });
        } else {
            return res.status(422).json({ message: "User already exists." });
        }
    } catch (error) {
        return next(error)
    }
}

//Login user
const login_user = async (req, res, next) => {
    try {
        const { cellphone, password } = req.body;
        const user = await User.findOne({ cellphone: cellphone });
        if (!user) {
            return res.status(422).json({ status: "No user found." });
        }
        else {
            if (password === user.password) {
                const accessToken = await signAccessToken(user._id.toString());
                const refreshToken = await signRefreshToken(user._id.toString());
                return res.status(200).json({ status: 'logged in successfully', accessToken, refreshToken });
            }
            return res.status(401).json({ message: "Password was not correct." });
        }
    } catch (error) {
        next(error);
    }
}

//refresh token
const refresh_token = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);
        return res.status(200).json({ accessToken, refreshToken: refToken });
    } catch (error) {
        next(error);
    }
}

//logout
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        redisClient.DEL(userId, (err, val) => {
            if (err) {
                console.log(err.message)
                throw createError.InternalServerError()
            }
            console.log(val)
            return res.sendStatus(204)
        })
    } catch (error) {
        next(error)
    }
}


module.exports = { create_user, login_user, refresh_token, logout };