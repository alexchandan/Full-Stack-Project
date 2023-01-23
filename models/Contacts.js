const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = new mongoose.model('contacts', contactSchema)