
import { userRequest } from "../requestMethods";
import {
    updateProduct,
    start as startp, error as errorp,
    getSuccess as getSuccessp,
    removeProduct,
    addOneProduct
} from "./listProductsSlice";
import { error, getSuccess, start, removeUser, updateUser, addOneUser } from "./listUserSlice";

//user
export const getListUsers = (dispatch, token) => {
    dispatch(start());
    userRequest(token).get('/user')
        .then(res => {
            dispatch(getSuccess(res.data));

        }).catch(err => {
            dispatch(error());
            console.log('Get users fail ', err);
        });
}

export const createUser = async (dispatch, info,token) => {
    let err;
    dispatch(start());
    await userRequest(token).post('/auth/register', info)
        .then(res => {
            //push new user info to list user state
            dispatch(addOneUser(res.data));
        }).catch(e => {
            //console.log(e);
            dispatch(error());
            err = e;
        });
    return new Promise((resolve, reject) => {
        if (err)
            reject(err);
        resolve('Success');
    })
}
export const deleteUser = (dispatch, id, token) => {
    dispatch(start());
    userRequest(token).delete(`/user/${id}`)
        .then(res => {
            dispatch(removeUser(id));
        }).catch(err => {
            dispatch(error());
            console.log('Delete user fail ', err);
        });
}

export const updateUserInfo = (dispatch, id, info, token) => {
    dispatch(start());
    userRequest(token).put(`/user/${id}`, {
        ...info
    }).then(res => {
        dispatch(updateUser({ id, info }));
    }).catch(err => {
        dispatch(error());
        console.log('Update user fail ', err);
    });
}

//product
export const getListProducts = (dispatch, token) => {
    dispatch(startp());
    userRequest(token).get('/product')
        .then(res => {
            dispatch(getSuccessp(res.data));
        }).catch(err => {
            dispatch(errorp());
            console.log('Get products fail ', err);
        });
}
export const createProduct = async (dispatch, info, token) => {
    let err='';
    dispatch(startp());
    await userRequest(token).post('/product', info)
        .then(res => {
            //push new user info to list product state
            console.log(res);
            dispatch(addOneProduct(res.data));
        }).catch(e => {
            console.log(e, 'apicalls');
            dispatch(errorp());
            err = e;
        });
    return new Promise((resolve, reject) => {
        if (err)
            reject(err);
        resolve('Success');
    })
}
export const deleteProduct = (dispatch, id, token) => {
    dispatch(startp());
    userRequest(token).delete(`/product/${id}`)
        .then(res => {
            dispatch(removeProduct(id));
        }).catch(err => {
            dispatch(errorp());
            console.log('Delete product fail ', err);
        });
}

export const updateProductInfo = (dispatch, id, info, token) => {
    dispatch(startp());
    userRequest(token).put(`/product/${id}`, {
        ...info
    }).then(res => {
        dispatch(updateProduct({ id, info }));
    }).catch(err => {
        dispatch(errorp());
        console.log('Update product fail ', err);
    });
}
