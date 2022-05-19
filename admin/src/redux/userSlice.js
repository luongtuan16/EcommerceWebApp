import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        curUser: {},
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: state => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.curUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        logout: state => {
            state.curUser = {};
        },
        loginError: state => {
            state.error = true;
            state.isFetching = false;
        }
    },
});

export default userSlice.reducer;
export const { loginStart, loginError, loginSuccess, logout } = userSlice.actions;
