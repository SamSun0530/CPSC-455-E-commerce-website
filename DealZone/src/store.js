import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import itemsReducer from "./slices/items";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		items: itemsReducer,
	},
});

export default store;