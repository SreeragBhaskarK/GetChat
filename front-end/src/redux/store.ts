import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import messageReducer from './messageSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'user',
    storage,
}
const persistConfigAdmin = {
    key: 'admin',
    storage,
}
const persistConfigMessage = {
    key: 'message',
    storage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedReducerAdmin = persistReducer(persistConfigAdmin, adminReducer)
const persistedReducerMessage = persistReducer(persistConfigMessage, messageReducer)
export const store = configureStore({
    reducer: {
        user: persistedReducer,
        admin: persistedReducerAdmin,
        message:persistedReducerMessage
    }
})

export const persistor = persistStore(store)
