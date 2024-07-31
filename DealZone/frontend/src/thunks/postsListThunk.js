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

export const getIndividualListingAsync = createAsyncThunk(
	postsListActions.GET_INDIVIDUAL_POST,
	async (id) => {
		const response = await postsListService.getIndividualListing(id);
		return response;
	}
);

export const addToPostsListAsync = createAsyncThunk(
	postsListActions.ADD_POST,
	async (value) => {
		return await postsListService.addToPostsList(value);
	}
);

export const queryPostsListAsync = createAsyncThunk(
	postsListActions.QUERY_POSTS,
	async ({query, tags, sortMethod, sortOrder}) => {
		return await postsListService.queryPostsList(query, tags, sortMethod, sortOrder);
	}
)

