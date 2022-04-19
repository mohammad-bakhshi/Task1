const User = require('../models/user');

//create a new user
const create_user = async (req, res, next) => {
    try {
        const user = await User.findOne({ cellphone: req.body.cellphone }, { cellphone: 1, _id: 0 });
        if (!user) {
            const { fullname, cellphone, password } = req.body;
            const newUser = await User.create({ fullname, cellphone, password });
            return res.status(201).json({ status: 'User created successfully.', data: newUser });
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
                return res.status(200).json({ status: 'logged in successfully', data: user });
            }
            return res.status(401).json({ message: "Password was not correct." });
        }
    } catch (error) {
        next(error);
    }
}




module.exports = { create_user, login_user };