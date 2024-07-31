import { createSlice } from '@reduxjs/toolkit';
import { getCartAsync, addToCartAsync, deleteFromCartAsync, clearCartAsync, purchaseCartAsync } from '../thunks/cartThunk';
import { REQUEST_STATE } from './util';

const initialState = {
    items: [],
    getCart: REQUEST_STATE.IDLE,
    addToCart: REQUEST_STATE.IDLE,
    deleteFromCart: REQUEST_STATE.IDLE,
    clearCart: REQUEST_STATE.IDLE,
    purchaseCart: REQUEST_STATE.IDLE,
    purchaseStatus: null,
    error: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearAPIStatus: (state) => {
            state.getCart = REQUEST_STATE.IDLE,
            state.addToCart = REQUEST_STATE.IDLE,
            state.deleteFromCart = REQUEST_STATE.IDLE,
            state.clearCart = REQUEST_STATE.IDLE,
            state.purchaseCart = REQUEST_STATE.IDLE,
            state.purchaseStatus = null,
            state.error = null;
        },
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
                state.error = action.payload;
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
            })
            .addCase(purchaseCartAsync.pending, (state) => {
                state.purchaseCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(purchaseCartAsync.fulfilled, (state, action) => {
                state.purchaseCart = REQUEST_STATE.FULFILLED;
                switch (action.payload) {
                    case 200:
                        state.items = [];
                        state.purchaseStatus = "success";
                        break;
                    case 400:
                        state.purchaseStatus = "Invalid Payment Method";
                        break;
                    case 409:
                        state.purchaseStatus = "Item(s) in cart not availible"
                        break;
                    default:
                        console.log('Unrecognized purchase cart status');
                        console.log(action.payload);
                };
            })
            .addCase(purchaseCartAsync.rejected, (state, action) => {
                state.purchaseCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});
export const { clearAPIStatus } = cartSlice.actions;

export default cartSlice.reducer;
