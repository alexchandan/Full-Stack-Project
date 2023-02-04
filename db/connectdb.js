const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');

const connectdb = catchAsync(async (DB_URI) => {
    DB_OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.dbName
    }
    await mongoose.connect(DB_URI, DB_OPTIONS);
    console.log(`${process.env.dbName} Connected Successfully!`)
})

module.exports = connectdb