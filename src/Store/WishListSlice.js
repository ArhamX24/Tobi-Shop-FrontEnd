import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addItemWishlist :(state, action) => {
            let currentProduct = action.payload;
            let isProductInWishlist = state.items.find((product) => product.id === currentProduct.id);
            if (isProductInWishlist) {
                return state;
                }else{
                    let newObj = {data: currentProduct}
                    state.items.push(newObj)
                    state.total += 1
                }

        },
        removeItemWishlist: (state,action) => {
            let pid = action.payload;
            let pIdx = state.items.findIndex((item)=> item.data.id == pid);
            state.items.splice(pIdx, 1);
            if(state.total > 0){
                state.total -= 1
            }
        },
        clearWishlist: (state,action) => {
            state.items = [];
            state.total = 0;
        }
    }
})

export const {
    addItemWishlist,
    removeItemWishlist,
    clearWishlist
} = WishlistSlice.actions;

export default WishlistSlice.reducer;