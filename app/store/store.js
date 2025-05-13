import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from './slices/eventSlice.js';

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})