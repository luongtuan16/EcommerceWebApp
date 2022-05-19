import { publicRequest, userRequest } from "../requestMethods"

export const addToCart = async (userId, product) => {
    const cart = await userRequest().get(`/cart/${userId}`);
    //console.log(cart);
    if (cart.data) {
        let index = -1;
        //check if this product already exist in cart
        cart.data.products.forEach((element, i) => {
            if (element.productId === product._id 
                && element.color === product.color
                && element.size === product.size)
                index = i;
        });

        if (index >= 0){
            //just update quantity
            cart.data.products[index].quantity += product.quantity;
            await userRequest().put(`/cart/${userId}`, { 
                products: cart.data.products
            })
        }
        //add product
        else await userRequest().put(`/cart/${userId}`, {
            userId,
            products: [...cart.data.products,
            {
                productId: product._id,
                quantity: product.quantity,
                color: product.color,
                size: product.size
            }]
        })
    } else {
        await userRequest().post('/cart', {
            products: [{
                productId: product._id,
                quantity: product.quantity,
                color: product.color,
                size: product.size
            }]
        })
    }
}

const getProduct = async productId => {
    let product = {}
    await publicRequest.get(`/product/${productId}`)
        .then(res => {
            product.name = res.data.name;
            product.id = res.data._id;
            product.img = res.data.img;
            product.price = res.data.price;
        })
    //console.log(JSON.stringify(product), product.id);
    return product;
}

export const getCart = async (userId, cart) => {
    //const cart = []
    const res = await userRequest().get(`/cart/${userId}`);
    //console.log(res.data)
    for (const item of res.data.products) {
        //console.log(product);
        const product = await getProduct(item.productId)
        product.color = item.color;
        product.size = item.size;
        product.quantity = item.quantity;
        cart.push(product);
    }
    //console.log(cart)
    //return cart;
}

export const updateCart = (userId, products) => {
    return userRequest().put(`/cart/${userId}`, { products: products })
}