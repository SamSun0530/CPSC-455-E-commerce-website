import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsListActions } from '../actions/postsListActions';
import postsListService from '../services/postsListService';

export const getPostsListAsync = createAsyncThunk(
	postsListActions.GET_POSTS,
	async () => {
		const response = await postsListService.getPostsList();
		return response;
	}
);

export const addToPostsListAsync = createAsyncThunk(
	postsListActions.ADD_POST,
	async (value) => {
		return await postsListService.addToPostsList(value);
	}
);

export const deleteFromPostsListAsync = createAsyncThunk(
	postsListActions.DELETE_POST,
	async (id) => {
		return await postsListService.deleteFromPostsList(id);
	}
);

