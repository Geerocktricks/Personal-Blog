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

// Get all posts
router.get('/', async (req, res) => {
    const author = req.query.author;
    const catName = req.query.cat;
    try {
        let posts;
        if(author) {
            posts = await Post.find({ author })
        } else if(catName) {
            posts = await Post.find({ categories: {
                $in: [catName]
            }})
        } else {
            posts = await Post.find()
        }
        res.status(200).json({ success: true, posts})

    } catch(err) {
        res.status(500).json({ success: false, msg: 'Something went wrong. Can\'t fetch posts!'})
    }
})


// Get single post
router.get('/:id',async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json({ success: false, err})
    }
})

// Update post
router.patch('/:id', async (req, res) => {
    try {
        // Find the post
        const post = await Post.findById(req.params.id);
        // I'll change it to if user is logged in
        if(post.author === req.body.author) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true});
                res.status(200).json({ success: true, msg: 'Post updated', updatedPost})
            } catch(err) {
                res.status(500).json({ success: false, msg: err});
            }
        } else {
            res.status(401).json({ success: false, msg: 'You can update only your posts!'});
        }
    } catch(err) {
        res.status(500).json({ success: false, msg: err});
    }
})

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        // Find the post
        const post = await Post.findById(req.params.id);
        // I'll change it to if user is logged in
        if(post.author === req.body.author) {
            try {
                await post.delete();
                res.status(200).json({ success: true, msg: 'Post deleted'})
            } catch(err) {
                res.status(500).json({ success: false, msg: err});
            }
        } else {
            res.status(401).json({ success: false, msg: 'You can delete only your posts!'});
        }
    } catch(err) {
        res.status(500).json({ success: false, msg: err});
    }
})

module.exports = router;