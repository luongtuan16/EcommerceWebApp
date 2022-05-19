import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        amount: 0,
    },
    reducers: {
        increase: (state) => {
            state.amount += 1;
        },
        decrease: (state) => {
            state.amount -= 1;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        }
    },
});

export default cartSlice.reducer;
export const { increase, decrease, setAmount } = cartSlice.actions;
export const selectAmount = state => state.cart.amount;