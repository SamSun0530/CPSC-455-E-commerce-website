import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer from './slices/cart';
import itemsReducer from "./slices/items";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		items: itemsReducer,
	},
});

export default store;