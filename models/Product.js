const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, trim: true },
    addedAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model('product', productSchema)