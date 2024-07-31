import { createSlice } from '@reduxjs/toolkit';
import { getSellerPostAsync, deleteFromSellerPostAsync, updatePostAsync } from '../thunks/sellerPostThunk';
import { REQUEST_STATE } from './util';

export const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        items: [],
        loading: false,
        getSellerPost: REQUEST_STATE.IDLE,
        deleteSellerPost: REQUEST_STATE.IDLE,
        updateSellerPost: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSellerPostAsync.pending, (state) => {
                state.loading = true;
                state.getSellerPost = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getSellerPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.getSellerPost = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getSellerPostAsync.rejected, (state, action) => {
                state.loading = false;
                state.getSellerPost = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteFromSellerPostAsync.pending, (state) => {
                state.loading = true;
                state.deleteSellerPost = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteFromSellerPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteSellerPost = REQUEST_STATE.FULFILLED;
                state.items = state.items.filter(item => item._id !== action.payload.id);
            })
            .addCase(deleteFromSellerPostAsync.rejected, (state, action) => {
                state.loading = false;
                state.deleteSellerPost = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(updatePostAsync.pending, (state) => {
                state.loading = true;
                state.updateSellerPost = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(updatePostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSellerPost = REQUEST_STATE.FULFILLED;
                state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item);
            })
            .addCase(updatePostAsync.rejected, (state, action) => {
                state.loading = false;
                state.updateSellerPost = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export default sellerSlice.reducer;
