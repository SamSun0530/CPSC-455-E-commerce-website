import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { getPostsListAsync, addToPostsListAsync, queryPostsListAsync, getSoldPostsAsync } from '../thunks/postsListThunk';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        items: [],
        loading: false,
        loadingSold: false,
        soldItems: [],
        fetchPosts: REQUEST_STATE.IDLE,
        addPost: REQUEST_STATE.IDLE,
        queryPosts: REQUEST_STATE.IDLE,
        fetchSoldPosts: REQUEST_STATE.IDLE,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsListAsync.pending, (state) => {
                state.fetchPosts = REQUEST_STATE.PENDING;
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostsListAsync.fulfilled, (state, action) => {
                state.fetchPosts = REQUEST_STATE.FULFILLED;
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getPostsListAsync.rejected, (state, action) => {
                state.fetchPosts = REQUEST_STATE.REJECTED;
                state.loading = false;
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
            })
            .addCase(getSoldPostsAsync.pending, (state) => {
                state.fetchSoldPosts = REQUEST_STATE.PENDING;
                state.loadingSold = true;
                state.error = null;
            })
            .addCase(getSoldPostsAsync.fulfilled, (state, action) => {
                state.fetchSoldPosts = REQUEST_STATE.FULFILLED;
                state.loadingSold = false;
                state.soldItems = action.payload;
            })
            .addCase(getSoldPostsAsync.rejected, (state, action) => {
                state.fetchSoldPosts = REQUEST_STATE.REJECTED;
                state.loadingSold = false;
                state.error = action.error.message;
            });
    }
});

export default homeSlice.reducer;
