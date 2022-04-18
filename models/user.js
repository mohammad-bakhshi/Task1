const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required."],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        unique: true,
        trim: true
    },
    cellphone: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
const User = mongoose.model("user", UserSchema);
module.exports = User;