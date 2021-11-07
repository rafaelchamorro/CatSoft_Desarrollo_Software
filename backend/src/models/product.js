const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    description: { type: String, required: true},
    price: { type: Number, require: true},
    stock: { type: String, require: true}
});

module.exports = model('Product', ProductSchema);
