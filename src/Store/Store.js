import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice.js"

const Store = configureStore({
    reducer: {
        cart: CartReducer
    }
});

export default Store