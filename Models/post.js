const mongoose = require('mongoose');
const config = require('../config/database');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    }
}, { timestamps: true});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
