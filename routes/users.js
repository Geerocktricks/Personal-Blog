const router = require("express").Router();

// Profile
router.get('/profile', (req, res) => {
    res.send('Profile page')
});


// Dashboard
router.get('/dashboard', (req, res) => {
    res.send('dashboard page')
})

module.exports = router;