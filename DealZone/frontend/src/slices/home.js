import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { getPostsListAsync, addToPostsListAsync, queryPostsListAsync } from '../thunks/postsListThunk';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        items: [],
        fetchPosts: REQUEST_STATE.IDLE,
        addPost: REQUEST_STATE.IDLE,
        queryPosts: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsListAsync.pending, (state) => {
                state.fetchPosts = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getPostsListAsync.fulfilled, (state, action) => {
                state.fetchPosts = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getPostsListAsync.rejected, (state, action) => {
                state.fetchPosts = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            .addCase(addToPostsListAsync.pending, (state) => {
                state.addPost = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addToPostsListAsync.fulfilled, (state, action) => {
                state.addPost = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(addToPostsListAsync.rejected, (state, action) => {
                state.addPost = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            })
            .addCase(queryPostsListAsync.pending, (state) => {
                state.queryPosts = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(queryPostsListAsync.fulfilled, (state, action) => {
                state.queryPosts = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(queryPostsListAsync.rejected, (state, action) => {
                state.queryPosts = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });

    }
});

export const { addListing } = homeSlice.actions;
export default homeSlice.reducer;
