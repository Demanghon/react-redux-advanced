import cartReducer from './cart-slice';
import uiReducer from './ui-slice';
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
    },
});

export default store;