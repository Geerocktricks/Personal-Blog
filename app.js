const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require('express-session');

// Multer for images upload
const multer = require('multer');



const app = express();

// DB Config
const db = require('./config/database').MONGO_URI;

// Connect to DB
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// CORS middleware
app.use(cors({
    origin: '*'
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport config
require('./config/passport')(passport);

// Routes
app.use('/authenticate', require('./routes/auth'));
app.use('/users', require('./routes/users'));

app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));


// Static folder(frontend build)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));