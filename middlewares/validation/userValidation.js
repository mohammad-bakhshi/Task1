const createValidator = (req, res, next) => {
    const { fullname, cellphone, password } = req.body;
    let result = {
        message: [],
        status: true
    };
    if (!fullname) {
        result.message.push("Full name is required.");
        result.status = false;
    }
    else if (fullname.length < 2) {
        result.message.push("Full name length must be at least 2.");
        result.status = false;
    }
    else if (fullname.length > 30) {
        result.message.push("Full name length must be at most 30.");
        result.status = false;
    }
    if (!cellphone) {
        result.message.push("Cellphone is required.");
        result.status = false;
    }
    else if (!isCellphone(cellphone)) {
        result.message.push("Cell phone is not valid.");
        result.status = false;
    }
    if (!password) {
        result.message.push("Password is required.");
        result.status = false;
    }
    else if (!isPassword(password)) {
        result.message.push("Password is not valid.");
        result.status = false;
    }
    if (result.status === true) {
        next();
    }
    else {
        return res.status(400).json({ result: false, message: result.message });
    }
}

const loginValidator = (req, res, next) => {
    const { fullname, cellphone, password } = req.body;
    let result = {
        message: [],
        status: true
    };
    if (!cellphone) {
        result.message.push("Cellphone is required.");
        result.status = false;
    }
    else if (!isCellphone(cellphone)) {
        result.message.push("Cell phone is not valid.");
        result.status = false;
    }
    if (!password) {
        result.message.push("Password is required.");
        result.status = false;
    }
    else if (!isPassword(password)) {
        result.message.push("Password is not valid.");
        result.status = false;
    }
    if (result.status === true) {
        next();
    }
    else {
        return res.status(400).json({ result: false, message: result.message });
    }
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function isCellphone(cellphone) {
    return /^(\+98|0)?[9][0-9]{9}$/.test(cellphone);
}

module.exports = { createValidator, loginValidator };