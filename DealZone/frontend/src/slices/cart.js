import { createSlice } from '@reduxjs/toolkit';
import { getCartAsync, addToCartAsync, deleteFromCartAsync, clearCartAsync } from '../thunks/cartThunk';

const initialState = {
    items: [
        { id: 1, name: 'This is a test of long title product should not cause the alignment problem, image, title and buttons should not interfere each other', price: 10, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Item 2', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Item 3', price: 30, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Item 4', price: 40, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Item 5', price: 50, image: 'https://via.placeholder.com/150' }
    ],
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
