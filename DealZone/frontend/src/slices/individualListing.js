import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { getIndividualListingAsync } from '../thunks/postsListThunk';

const individualListingSlice = createSlice({
    name: 'individualListing',
    initialState: {
        item: [],
        fetchPost: REQUEST_STATE.IDLE,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIndividualListingAsync.pending, (state) => {
                state.fetchPost = REQUEST_STATE.PENDING;
                state.loading = true;
                state.error = null;
            })
            .addCase(getIndividualListingAsync.fulfilled, (state, action) => {
                state.fetchPost = REQUEST_STATE.FULFILLED;
                state.loading = false;
                state.item = [action.payload];
            })
            .addCase(getIndividualListingAsync.rejected, (state, action) => {
                state.fetchPost = REQUEST_STATE.REJECTED;
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export default individualListingSlice.reducer;
