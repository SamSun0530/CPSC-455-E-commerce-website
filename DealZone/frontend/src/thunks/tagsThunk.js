import { createAsyncThunk } from '@reduxjs/toolkit';
import tagService from '../services/tagService';

export const getTagsAsync = createAsyncThunk(
	'tags/getTags',
	async () => {
		const response = await tagService.getTags();
		return response;
	}
);

export const addTagAsync = createAsyncThunk(
	'tags/addTag',
	async (tags) => {
		return await tagService.addTag(tags);
	}
);

