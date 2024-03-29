const { verifyAdminToken, verifyTokenAndPermission, verifyToken } = require("./verifyToken");
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = require("express").Router();

//update order
router.put('/:id', verifyToken, async (req, res) => {
    console.log('update order');
    Order.findById(req.params.id).exec((err, order) => {
        if (err || !order)
            return res.status(400).json('Fail to get OrderModel when update Order');

        (order.userId !== req.data.id && !req.data.isAdmin) && res.status(402).json('Not Permit');

        Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, order) => {
                (err || !order) && res.status(400).json('Update Order Failed');
                res.status(200).json(order._doc);
            });
    });
});

//get income
router.get('/income', verifyAdminToken, async (req, res) => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth - 1));

    Order.aggregate([
        { $match: { createdAt: { $gte: prevMonth } } },
        {
            $project: {
                month: { $month: '$createdAt' },
                sales: "$amount",
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ],
        (err, data) => {
            err && res.status(400).json('Get Income Failed' + err.toString());
            res.status(200).json(data);
        });
});

//get order
router.get('/:id', verifyTokenAndPermission, async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);
        (!order) && res.status(401).json('Wrong OrderId');
        (order.userId !== req.data.id && !req.data.isAdmin) && res.status(402).json('Not Permit');
        Order.findById(req.params.id,
            (err, order) => {
                if (err || !order)
                    res.status(400).json('Get Order Failed');
                else {

                    res.status(200).json(order._doc);
                }
            });
    } catch (error) {
        res.status(400).json('Fail to get OrderModel');
    }
});

//get user orders
router.get('/user/:id', verifyTokenAndPermission, async (req, res) => {
    if (!req.query.orderId) {
        const query = req.query.new ? Order.find({ userId: req.params.id }).
            sort({ createdAt: -1 }).limit(5)
            : Order.find({ userId: req.params.id });

        query.exec((err, orders) => {
            if (err) res.status(400).json('Get List Orders Failed');
            else {
                const orderResp = orders.map(order => order._doc);
                res.status(200).json(orderResp);
            }
        });
    } else {
        Order.findById(req.query.orderId).exec((err, order) => {
            if (err)
                res.status(400).json('Get Order Detail Failed');
            else {
                const orderResp = order._doc;

                Promise.all(orderResp?.products?.map(item => Product.findById(item.productId)))
                    .then(products => {
                        const res = orderResp.products.map(p => {
                            const product = products.find(item => item._id === p.productId);
                            if (product)
                                return p;
                        })
                    })
                    .catch(err => console.log(err));
                res.status(200).json(orderResp);
            }
        });
    }
});

//get all orders
router.get('/', verifyAdminToken, async (req, res) => {
    const query = req.query.new ? Order.find({}).sort({ createdAt: -1 }).limit(5) : Order.find();
    query.exec((err, orders) => {
        if (err)
            res.status(400).json('Get List Orders Failed');
        else {
            const orderResp = orders.map(order => order._doc);
            res.status(200).json(orderResp);
        }
    });

});
//create order
router.post('/', verifyToken, (req, res) => {
    //console.log('add order');
    const order = new Order({
        ...req.body,
        userId: req.data.id
    });
    order.save((err, data) => {
        if (err || !data)
            res.status(400).json('Add Order Failed');
        else
            res.status(200).json(data);
    });
});

//cancel order
router.delete('/cancel/:id', verifyTokenAndPermission, (req, res) => {
    if (!req.query.orderId)
        res.status(300).json('Missing Order Id');
    else
        Order.findOneAndDelete({_id: req.query.orderId, status: 'pending'},
            (err, data) => {
                if (err) 
                    res.status(400).json('Cancel Order Failed');
                else
                    res.status(200).json(data);
            })
});
//delete order
router.delete('/:id', verifyAdminToken, (req, res) => {
    Order.findByIdAndDelete(req.params.id,
        (err, data) => {
            if (err || !data) res.status(400).json('Delete Order Failed');
            else
                res.status(200).json(data);
        })
});

module.exports = router;