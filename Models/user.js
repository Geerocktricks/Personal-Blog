const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

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

// Get user by id
module.exports.getUserByID = (id, callback) => {
    User.findById(id, callback);
}

// Get user by username
module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username}
    User.findOne(query, callback)
}

// Compare passwords
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch)
    })
}