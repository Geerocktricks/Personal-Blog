const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../Models/user')

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Profile page')
});


// Dashboard
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('dashboard page')
})

module.exports = router;