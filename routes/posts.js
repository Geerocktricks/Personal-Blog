const router = require("express").Router();
const User = require('../Models/user');
const Post = require('../Models/post');

// Create post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.json({ success: true, msg: 'Post created succesfully', user: savedPost})

    } catch(err) {
        res.status(500).json({ success: false, msg: err})
    }
})

// Get post

// Update post

// Delete post

module.exports = router;