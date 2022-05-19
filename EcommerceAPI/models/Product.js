const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    img: {type: String, required: true},
    desc: String,
    color: { type: Array, required: true},
    size: { type: Array, required: true},
    categories: Array,
    inStock: {type: Boolean, default: true}
}, 
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);