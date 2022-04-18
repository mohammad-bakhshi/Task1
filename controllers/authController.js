const jwt = require('jsonwebtoken');

const User = require('../models/user');

//create a new user
const create_user = async (req, res, next) => {
    try {
        const user = await User.findOne({ password: req.body.password }, { cellphone: 1, _id: 0 });
        if (!user) {
            const { fullname, cellphone, password } = req.body;
            const user = await User.create({ fullname, cellphone, password });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return res.status(200).json({ status: 'User created successfully.', data: { user }, token });
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
        const users = await User.find({ cellphone: cellphone });
        if (users.length === 0) {
            return res.status(422).json({ status: "No users found." });
        }
        else {
            for (let index = 0; index < users.length; index++) {
                if (password === users[index].password) {
                    const user = users[index];
                    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(200).json({ status: 'logged in successfully', data: { user }, accessToken });
                }
            }
            return res.status(422).json({ message: "Password was not correct." });
        }
    } catch (error) {
        next(error);
    }
}




module.exports = { create_user, login_user };