import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer from './slices/cart';
import homeReducer from "./slices/home"
import wishlistReducer from "./slices/wishlist";
import sellerReducer from "./slices/seller";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		home: homeReducer,
		wishlist: wishlistReducer,
		seller: sellerReducer
	}
});

export default store;