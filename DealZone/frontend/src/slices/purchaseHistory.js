import { createSlice } from '@reduxjs/toolkit';
import { getPurchaseHistoryAsync, addToPurchaseHistoryAsync } from '../thunks/purchaseHistoryThunk';
import { REQUEST_STATE } from './util';

const initialState = {
    items: [],
    getPurchaseHistory: REQUEST_STATE.IDLE,
    addToPurchaseHistory: REQUEST_STATE.IDLE,
    error: null
};

export const purchaseHistorySlice = createSlice({
    name: 'purchaseHistory',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPurchaseHistoryAsync.pending, (state) => {
                state.getPurchaseHistory = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getPurchaseHistoryAsync.fulfilled, (state, action) => {
                state.getPurchaseHistory = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getPurchaseHistoryAsync.rejected, (state, action) => {
                state.getPurchaseHistory = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addToPurchaseHistoryAsync.pending, (state) => {
                state.addToPurchaseHistory = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addToPurchaseHistoryAsync.fulfilled, (state, action) => {
                state.addToPurchaseHistory = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(addToPurchaseHistoryAsync.rejected, (state, action) => {
                state.addToPurchaseHistory = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export default purchaseHistorySlice.reducer;
