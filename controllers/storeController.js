const Store = require('../models/store');

//Create new store
const create_store = async (req, res, next) => {
    try {
        const { name, address, image, location } = req.body;
        const user = req.user.user._id;
        const store = await Store.create({ name, address, image, location, user });
        return res.status(200).json({ status: 'Store created successfully.', data: store });
    } catch (error) {
        next(error);
    }
}

//Get store by ID
const get_store = async (req, res, next) => {
    try {
        const storeID = req.params.storeID;
        const store = await Store.findById(storeID).populate('user');
        if (!store) {
            return res.status(422).json({ status: "Store not found." });
        }
        else {
            return res.status(422).json({ store: store })
        }
    } catch (error) {
        next(error);
    }
}

//Get store of the user
const get_User_Store = async (req, res, next) => {
    try {
        const stores = await Store.find({ user: req.user.user._id });
        return res.status(200).json({ data: stores });
    } catch (error) {
        next(error)
    }
}


module.exports = { get_store, create_store, get_User_Store };