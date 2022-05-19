
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {
    const userModel = new User({
        // userName: req.body.userName,
        // email: req.body.email,
        ...req.body,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY)
    });

    try {
        const savedUser = await userModel.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // .catch((err) =>{
        //     res.status(400).json('Account doesn\'t exist');
        // });

        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        
        try {      
            originalPassword !== req.body.password && res.status(500).json('Wrong password');     
        } catch (error) {
            console.log('Exception when comparing password');
            res.status(500).json('Wrong password');
        }

        const {password, ...others} = user._doc;

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY,
        {expiresIn: '3d'});

        res.status(200).json({...others, token: accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;