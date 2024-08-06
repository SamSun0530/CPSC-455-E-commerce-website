import { createSlice } from '@reduxjs/toolkit';
import { getUserAsync, updateUserAsync } from '../thunks/userThunk';
import { REQUEST_STATE } from './util';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        status: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                state.status = REQUEST_STATE.PENDING;
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = REQUEST_STATE.FULFILLED;
                state.data = action.payload;
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                state.status = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = REQUEST_STATE.PENDING;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = REQUEST_STATE.FULFILLED;
                state.data = action.payload;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
