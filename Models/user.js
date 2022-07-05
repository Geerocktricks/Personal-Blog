const mongoose = require('mongoose');
const config = require('../config/database');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;