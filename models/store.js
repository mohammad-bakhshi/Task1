const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: [true, "Store name is required."],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required."],
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    user: {
        ref: "user",
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
const Store = mongoose.model("store", StoreSchema);
module.exports = Store;