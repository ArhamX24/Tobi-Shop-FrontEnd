import { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem :(state,action)=> {
            let product = action.payload;
            let pid = product.id;

            let productInCart = state.items.find((item)=> item.data.id == pid);
            if(productInCart){
                productInCart.quantity += 1;
            }
            else{
                let newObj = {data: product, quantity: 1};
                state.items.push(newObj)
                state.total +=1;
            }
        },
        removeItem: (state,action) => {
            let pid = action.payload;
            let pIdx = state.items.findIndex((item)=> item.data.id == pid);
            state.items.splice(pIdx, 1);
            state.total -= 1;
        },
        quantityInc: (state,action)=> {
            let pid = action.payload;
            let pIdx = state.items.findIndex((item)=> item.data.id == pid);
            let product = state.items[pIdx];
            product.quantity += 1;
        },
        quantityDec: (state,action)=> {
            let pid = action.payload;
            let pIdx = state.items.findIndex((item)=> item.data.id == pid);
            let product = state.items[pIdx];
            if(product.quantity > 1){
                product.quantity -= 1;
            }
        },
        clearCart: (state)=> {
            state.items = [];
            state.total = 0;
        },
        ascendingSort: (state,action)=> {
            state.items.sort((a,b)=> a.data.price - b.data.price);
        },
        descendingSort: (state)=> {
            state.items.sort((a,b)=> b.data.price - a.data.price);
        }
    }
});

export const {
    addItem,
    removeItem,
    quantityInc,
    quantityDec,
    clearCart,
    ascendingSort,
    descendingSort
} = CartSlice.actions;

export default CartSlice.reducer
