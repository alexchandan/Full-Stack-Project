const mongoose = require('mongoose');

const connectdb = async (DB_URI) => {
    try {
        DB_OPTIONS = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.dbName
        }

        await mongoose.connect(DB_URI, DB_OPTIONS);
        console.log(`${process.env.dbName} Connected Successfully!`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb