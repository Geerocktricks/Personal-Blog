const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

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

// Routes
app.use('/authenticate', require('./routes/auth'));
app.use('/users', require('./routes/users'));


// Static folder(frontend build)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));