
const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyAdminToken, verifyTokenAndPermission } = require('./verifyToken');

//get stats number of accounts which was grouped by month
router.get('/stats', verifyAdminToken, async (req, res) => {

    const date = new Date();

    //a year before now
    date.setFullYear(date.getFullYear() - 1);

    //console.log(date);

    User.aggregate([
        { $match: { createdAt: { $gte: date } } },
        {
            $project: {
                month: { $month: '$createdAt' },
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ],
        (err, data) => {
            err && res.status(400).json('Get Stats Failed' + err.toString());
            res.status(200).json(data);
        });
});

//update user info
router.put('/:id', verifyTokenAndPermission, (req, res) => {

    if (req.body.password)
        req.body.password = CryptoJs.AES.
            encrypt(req.body.password, process.env.SECRET_KEY).toString();

    User.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true },
        (err, user) => {
            err && res.status(400).json('Update failed');
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        });

});


//get user info
router.get('/:id', verifyTokenAndPermission, (req, res) => {

    User.findById(req.params.id,
        (err, user) => {
            err && res.status(400).json('Get User Failed');

            const { password, ...others } = user._doc;

            res.status(200).json(others);
        });

});

//get all user info
router.get('/', verifyAdminToken, async (req, res) => {
    //console.log(req);
    const query = req.query.new ? User.find({}).sort({ _id: -1 }).limit(5) : User.find();

    query.exec((err, users) => {
        err && res.status(400).json('Get Users Failed');
        const usersResp = users.map(user => {
            const { password, ...others } = user._doc;
            return others;
        });
        res.status(200).json(usersResp);
    });

});
//delete user
router.delete('/:id', verifyAdminToken, (req, res) => {
    User.findByIdAndDelete(req.params.id,
        (err, data) => {
            err && res.status(400).json('Delete User Failed');
            res.status(200).json(data);
        })
});

module.exports = router;