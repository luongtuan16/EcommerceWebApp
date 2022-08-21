const { verifyAdminToken, verifyTokenAndPermission, verifyToken } = require("./verifyToken");
const Cart = require('../models/Cart');
const router = require("express").Router();


//update user cart - userId
router.put('/:id', verifyTokenAndPermission, (req, res) => {
    //console.log('update cart');
    Cart.findOneAndUpdate(
        { userId: req.params.id },
        { $set: req.body },
        { new: true },
        (err, cart) => {
            if (err || !cart){
                console.log(err);
                res.status(400).json('Update Cart Failed');
            }
            else
                res.status(200).json(cart._doc);
        });
});


//get user cart - userId
router.get('/:id', verifyTokenAndPermission, (req, res) => {
    //console.log('get-cart');
    Cart.findOne({ userId: req.params.id },
        (err, cart) => {
            if (err)
                res.status(400).json('Get Cart Failed');
            else if (!cart)
                res.status(200).json({});
            else
                res.status(200).json(cart._doc);
        });

});

//get all carts
router.get('/', verifyAdminToken, async (req, res) => {

    const query = req.query.new ? Cart.find({}).sort({ createdAt: -1 }).limit(5) : Cart.find();

    query.exec((err, carts) => {
        err && res.status(400).json('Get List Carts Failed');
        const cartResp = carts.map(cart => cart._doc);
        res.status(200).json(cartResp);
    });

});

//create cart
router.post('/', verifyToken, (req, res) => {
    //console.log('add cart');
    const cart = new Cart({
        ...req.body,
        userId: req.data.id
    });
    cart.save((err, data) => {
        err && res.status(400).json('Add Cart Failed');
        res.status(200).json(data);
    });
});

//delete user cart
router.delete('/:id', verifyTokenAndPermission, (req, res) => {
    Cart.findOneAndDelete({ userId: req.params.id },
        (err, data) => {
            err && res.status(400).json('Delete Cart Failed');
            res.status(200).json(data);
        })
});

module.exports = router;