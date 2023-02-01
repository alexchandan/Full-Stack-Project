require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const connectdb = require('./db/connectdb');
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const routes = require('./routes/routes');
const auth = require('./routes/auth')
const session = require('express-session');
const passport = require('passport');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(process.cwd(), 'public')))

app.use(session({ secret: 'mysecretkey', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
auth(passport);
app.use('/', routes)
app.set('view engine', 'ejs');
mongoose.set('strictQuery', false);
connectdb(DB_URI)


// Listening port
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})