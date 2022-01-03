import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], quantity: 0, changed: false };
//item = { product: {id: "Test", title: "Test", price: 6}, quantity: 3, total: 18 }
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        init(state, action){
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
            state.initialized = true;
        },
        add(state, action) {
            const product = action.payload;
            let cartItem = state.items.find((cartItem) => {
                return product.id === cartItem.product.id;
            });
            if (cartItem) {
                cartItem.quantity++;
                cartItem.total += product.price;
            } else {
                cartItem = { id: product.title, product: product, quantity: 1, total: product.price };
                state.items.push(cartItem);
            }
            state.quantity++;
            state.changed = true;
        },
        increment(state, action) {
            const product = action.payload.product;
            const cartItem = state.items.find((cartItem) => {
                return product.id === cartItem.product.id;
            });
            if (cartItem) {
                cartItem.quantity++;
                cartItem.total += product.price;
            }
            state.quantity++;
            state.changed = true;
        },
        decrement(state, action) {
            const product = action.payload.product;
            const cartItem = state.items.find((cartItem) => {
                return product.id === cartItem.product.id;
            });
            if (cartItem) {
                cartItem.quantity--;
                cartItem.total -= product.price;
            }
            if (cartItem.quantity === 0) {
                state.items = state.items.filter((carItem) => {
                    return carItem.product.id !== product.id;
                });
            }
            state.quantity--;
            state.changed = true;
        },
    },
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
