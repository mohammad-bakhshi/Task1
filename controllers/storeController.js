const Store = require('../models/store');

//Create new store
const create_store = async (req, res, next) => {
    try {
        const { name, address, image, location } = req.body;
        const store = await Store.findOne({ name: name });
        if (!store) {
            // const user = req.user.user._id;
            const newStore = await Store.create({ name, address, image, location });
            return res.status(201).json({ status: 'Store created successfully.', data: newStore });
        }
        return res.status(422).json({ status: 'Store already exists' });
    } catch (error) {
        next(error);
    }
}

//Get store by ID
const get_store = async (req, res, next) => {
    try {
        const storeID = req.params.storeID;
        const store = await Store.findById(storeID);
        if (!store) {
            return res.status(422).json({ status: "Store not found." });
        }
        else {
            return res.status(200).json({ store: store })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { get_store, create_store };