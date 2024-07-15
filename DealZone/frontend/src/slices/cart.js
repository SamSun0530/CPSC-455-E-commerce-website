import { createSlice } from '@reduxjs/toolkit';
import { getCartAsync, addToCartAsync, deleteFromCartAsync, clearCartAsync } from '../thunks/cartThunk';
import { REQUEST_STATE } from './util';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        getCart: REQUEST_STATE.IDLE,
        addToCart: REQUEST_STATE.IDLE,
        deleteFromCart: REQUEST_STATE.IDLE,
        clearCart: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartAsync.pending, (state) => {
                state.getCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getCartAsync.fulfilled, (state, action) => {
                state.getCart = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getCartAsync.rejected, (state, action) => {
                state.getCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addToCartAsync.pending, (state) => {
                state.addToCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.addToCart = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.addToCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteFromCartAsync.pending, (state) => {
                state.deleteFromCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
                state.deleteFromCart = REQUEST_STATE.FULFILLED;
                state.items = state.items.filter(item => item._id !== action.payload.id);
            })
            .addCase(deleteFromCartAsync.rejected, (state, action) => {
                state.deleteFromCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(clearCartAsync.pending, (state) => {
                state.clearCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(clearCartAsync.fulfilled, (state, action) => {
                state.clearCart = REQUEST_STATE.FULFILLED;
                state.items = [];
            })
            .addCase(clearCartAsync.rejected, (state, action) => {
                state.clearCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export default cartSlice.reducer;
