import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./userSlice";
import listUserReducer from "./listUserSlice";
import listProductReducer from './listProductsSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    user: userReducer,
    listUsers: listUserReducer,
    listProducts: listProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);
export default store;