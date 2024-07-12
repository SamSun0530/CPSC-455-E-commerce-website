import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { getPostsListAsync, addToPostsListAsync, deleteFromPostsListAsync } from '../thunks/postsListThunk';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        items: [],
        fetchPosts: REQUEST_STATE.IDLE,
        addPost: REQUEST_STATE.IDLE,
        deletePost: REQUEST_STATE.IDLE,
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
            .addCase(deleteFromPostsListAsync.pending, (state) => {
                state.deletePost = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteFromPostsListAsync.fulfilled, (state, action) => {
                state.deletePost = REQUEST_STATE.FULFILLED;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromPostsListAsync.rejected, (state, action) => {
                state.deletePost = REQUEST_STATE.REJECTED;
                state.error = action.error.message;
            });
    }
});

export const { addListing } = homeSlice.actions;
export default homeSlice.reducer;
