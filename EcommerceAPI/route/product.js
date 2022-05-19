const { verifyAdminToken, verifyTokenAndPermission } = require("./verifyToken");
const Product = require('../models/Product');
const router = require("express").Router();


//update product
router.put('/:id', verifyAdminToken, (req, res) => {

    Product.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true },
        (err, product) => {
            err && res.status(400).json('Update Product Failed');
            res.status(200).json(product._doc);
        });

});

//search product
router.get('/search', (req, res) => {
    //standardize keyword
    const keyword = req.query.keyword.trim().toLowerCase()
                .split(' ').map(word => word.trim())
                .filter(word => word !== '').join(' ');

    Product.find({},
        (err, products) => {
            if (err || !products) 
                res.status(400).json('Search Product Failed');
            else{
                res.status(200).json(products.filter(product => 
                    product.name.toLowerCase().indexOf(keyword) >= 0
                ));
            }
        });
    
});

//get product
router.get('/:id', (req, res) => {

    Product.findById(req.params.id,
        (err, product) => {
            if (err || !product) 
                res.status(400).json('Get Product Failed');
            else
                res.status(200).json(product._doc);
        });

});

//get all products
router.get('/', async (req, res) => {

    const qCategory = req.query.category;
    const qNew = req.query.new;
    let query;
    if (qCategory) {
        query = Product.find({
            categories: { $in: [qCategory] }
        });
    } else
        query = Product.find();
    query = query.sort({ createdAt: -1 });
    if (qNew)
        query = query.limit(5);
    query.exec((err, products) => {
        err && res.status(400).json('Get List Products Failed');

        const productResp = products.map(product => product._doc);

        res.status(200).json(productResp);
    });

});

//create product
router.post('/', verifyAdminToken, (req, res) => {
    //console.log('add product');
    const product = new Product(req.body);
    product.save((err, data) => {
        err && res.status(400).json('Add Product Failed');
        res.status(200).json(data);
    });
});

//delete product
router.delete('/:id', verifyAdminToken, (req, res) => {
    Product.findByIdAndDelete(req.params.id,
        (err, data) => {
            err && res.status(400).json('Delete Product Failed');
            res.status(200).json(data);
        })
});
module.exports = router;