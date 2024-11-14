import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice.js"
import WishlistReducer from './WishListSlice.js'

const Store = configureStore({
    reducer: {
        cart: CartReducer,
        wishlist: WishlistReducer
    }
});

export default Store