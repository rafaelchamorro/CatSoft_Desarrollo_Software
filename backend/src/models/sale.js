const { Schema, model } = require('mongoose');

const SaleSchema = new Schema({
    saleDate: { type: Date, default: Date.now },
    clientID: { type: Number },
    clientName: { type: String },
    seller: { type: String },
    saleState: { type: String, default: "en proceso" },
    total: { type: Number }
});

module.exports = model('Sale', SaleSchema);