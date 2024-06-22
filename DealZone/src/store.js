import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer from './slices/cart';
import homeReducer from "./slices/home"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		home: homeReducer
	}
});

export default store;