import { createSlice } from '@reduxjs/toolkit';
import { getUserAsync, updateUserAsync } from '../thunks/userThunk';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
