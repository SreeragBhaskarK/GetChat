import {configureStore  } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminSlice
    }
})

export default store