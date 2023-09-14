import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import messageReducer from './messageSlice'
import videoCallReducer from './callSlice'
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
const persistConfigVideoCall = {
    key: 'video_call',
    storage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedReducerAdmin = persistReducer(persistConfigAdmin, adminReducer)
const persistedReducerMessage = persistReducer(persistConfigMessage, messageReducer)
const persistedReducerVideoCall = persistReducer(persistConfigVideoCall, videoCallReducer)
export const store = configureStore({
    reducer: {
        user: persistedReducer,
        admin: persistedReducerAdmin,
        message:persistedReducerMessage,
        video_call:persistedReducerVideoCall
    }
})

export const persistor = persistStore(store)
