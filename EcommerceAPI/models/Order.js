const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    products: [{
        productId: String,
        quantity: {type: Number, default: 1}
    }],
    amount: {type: Number, require: true},
    address: {type: Object, required: true},
    status: {type: String, default: "pending"},
}, 
{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);