import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { getTagsAsync, addTagAsync } from '../thunks/tagsThunk';

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        items: [],
        fetchTags: REQUEST_STATE.IDLE,
        addTag: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTagsAsync.pending, (state) => {
                state.fetchTags = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getTagsAsync.fulfilled, (state, action) => {
                state.fetchTags = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
                console.log("fetched tags: ", state.items);
            })
            .addCase(getTagsAsync.rejected, (state, action) => {
                state.fetchTags = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            .addCase(addTagAsync.pending, (state) => {
                state.addTag = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addTagAsync.fulfilled, (state, action) => {
                state.addTag = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(addTagAsync.rejected, (state, action) => {
                state.addTag = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            });
    }
});

export default tagsSlice.reducer;