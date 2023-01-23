require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const connectdb = require('./db/connectdb');
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const routes = require('./routes/routes')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
mongoose.set('strictQuery', false);
connectdb(DB_URI)

app.use('/', routes)

// Listening port
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})