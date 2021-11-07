const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    ProductID: { type: String, required: true },
    unit: { type: Number, required: true, min: [1] },
    unitPrice: {
        type: Number, required: true, min: [1]
    },
    productDescription: { type: String, required: true },
    saleID: {
        type: String, require: true
    }
});

module.exports = model('Cart', CartSchema);