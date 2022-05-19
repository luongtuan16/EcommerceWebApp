import { createSlice } from "@reduxjs/toolkit";

const listProductSlice = createSlice({
    name: 'listProducts',
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    reducers: {
        start: state => {
            state.isFetching = true;
        },
        error: state => {
            state.error = true;
            state.isFetching = false;
        },
        getSuccess: (state, action) => {
            state.products = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        addOneProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            //payload is product id
            state.products = state.products.filter((item) => item._id !== action.payload);
            state.isFetching = false;
            state.error = false;
        },
        updateProduct: (state, action) => {
            //payload is product {id, info} 
            state.products = state.products.map((item) => {
                if(item._id === action.payload.id)
                    return {...item, ...action.payload.info}
                else return item;
            })
            state.isFetching = false;
            state.error = false;
        },

    },
});

export default listProductSlice.reducer;
export const { start, error, getSuccess, addOneProduct, removeProduct, updateProduct } = listProductSlice.actions;
