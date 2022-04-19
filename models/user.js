const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required."],
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        validate: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
        trim: true
    },
    cellphone: {
        type: String,
        required: true,
        unique: true,
        validate: /^(\+98|0)?[9][0-9]{9}$/,
        trim: true
    }
}, { timestamps: true });
const User = mongoose.model("user", UserSchema);
module.exports = User;