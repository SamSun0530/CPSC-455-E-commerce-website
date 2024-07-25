import { createSlice } from '@reduxjs/toolkit';
import { getSellerPostAsync, deleteFromSellerPostAsync } from '../thunks/sellerPostThunk';
import { REQUEST_STATE } from './util';

export const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        items: [],
        getSellerPost: REQUEST_STATE.IDLE,
        deleteSellerPost: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSellerPostAsync.pending, (state) => {
                state.getCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getSellerPostAsync.fulfilled, (state, action) => {
                state.getCart = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getSellerPostAsync.rejected, (state, action) => {
                state.getCart = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteFromSellerPostAsync.pending, (state) => {
                state.addToCart = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteFromSellerPostAsync.fulfilled, (state, action) => {
                state.addToCart = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(deleteFromSellerPostAsync.rejected, (state, action) => {
                state.addToCart = REQUEST_STATE.REJECTED;
                state.error = action.payload;
            });
    }
});

export default sellerSlice.reducer;
