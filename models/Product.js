const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, trim: true },
    addedAt: { type: Date, default: Date.now() },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = Product = new mongoose.model('product', productSchema)