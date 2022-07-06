const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

// Import user model
const User = require('../Models/user');

// Register
router.post('/register', (req, res)=> {
    // Destructure items from req.body
    let { name, email, username, password } = req.body;
    // check pasword length
    if(req.body.password < 6) {
        res.status(400).json({ success: false, msg: 'Password must be atleast 6 characters' })
    } else {
        // Check if user is already registered
        User.findOne({ email: email })
        .then(
            // Check if username is already used
            User.findOne({ username: username})
            .then(user => {
                if(user) {
                    res.json({ success: false, msg: 'User already registered!'})
                } else {
                    // Create a user object
                    let newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                    });
                    // hash the password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        const { password, ...rest} = req.body

                        // Save user to database
                        newUser.save()
                        res.status(201).json({ success: true, msg: 'Account created successfully', rest})
                    }))
                   
                }
            })
        )
    }
});

// Login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({ success: false, msg: 'User not found'})
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({ data: user}, config.secret, {
                    expiresIn: 604800 //Expires in a week
                });
                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong credentials'})
            }
        })
    })
})

module.exports = router;