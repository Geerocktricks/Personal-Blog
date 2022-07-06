const mongoose = require('mongoose');
const config = require('../config/database');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    }
}, { timestamps: true});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
