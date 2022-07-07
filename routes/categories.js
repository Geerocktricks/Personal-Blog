const router = require('express').Router();
const Category = require('../Models/category');

// Create new category route
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    
    try {
        const savedCat = await newCat.save();
        res.status(200).json({ success: true, msg: 'New category created and saved', savedCat})

    } catch(err) {
        res.status(500).json({ success: false, err})
    }
})

// Get all categories
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json({ success: true, cats})

    } catch(err) {
        res.status(500).json({ success: false, err})
    }

})

module.exports = router