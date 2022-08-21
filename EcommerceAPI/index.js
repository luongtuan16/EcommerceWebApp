const express = require("express");
const mongoose = require('mongoose');

const userRoute = require('./route/user');
const authRoute = require('./route/auth');
const orderRoute = require('./route/order');
const cartRoute = require('./route/cart');
const productRoute = require('./route/product');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connect successfully');
    })
    .catch(error => {
        console.log(error);
    })

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})