require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectdb = require('./db/connectdb');
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const auth = require('./middlewares/auth')
const routes = require('./routes/routes');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
mongoose.set('strictQuery', false);
connectdb(DB_URI)

app.use(session({
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, maxAge: 60000 }
}))

app.use(passport.initialize())
app.use(passport.session())
auth(passport);
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})