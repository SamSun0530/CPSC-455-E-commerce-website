import { createSlice } from '@reduxjs/toolkit';
import { getCartAsync, addToCartAsync, deleteFromCartAsync, clearCartAsync } from '../thunks/cartThunk';

const initialState = {
    items: [],
    status: 'idle',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            state.items.push(action.payload);
        },
        removeItemFromCart(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(getCartAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(clearCartAsync.fulfilled, (state) => {
                state.items = [];
            });
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
