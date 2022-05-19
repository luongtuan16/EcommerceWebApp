import { createSlice } from "@reduxjs/toolkit";

const listUserSlice = createSlice({
    name: 'listUsers',
    initialState: {
        users: [],
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
            state.users = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        addOneUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            //payload is user id
            state.users = state.users.filter((item) => item._id !== action.payload);
            state.isFetching = false;
            state.error = false;
        },
        updateUser: (state, action) => {
            //payload is user {id, info} 
            state.users = state.users.map((item) => {
                if(item._id === action.payload.id)
                    return {...item, ...action.payload.info}
                else return item;
            });
            state.isFetching = false;
            state.error = false;
        },
    },
});

export default listUserSlice.reducer;
export const { start, error, getSuccess, addOneUser, removeUser, updateUser } = listUserSlice.actions;
