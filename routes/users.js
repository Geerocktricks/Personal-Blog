const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../Models/user')

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user});
});


// Dashboard
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user});
});


// Update user


// Delete User

// Get single user

module.exports = router;