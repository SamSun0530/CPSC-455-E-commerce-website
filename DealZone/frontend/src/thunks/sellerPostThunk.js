import { createAsyncThunk } from '@reduxjs/toolkit';
import { sellerPostActions } from '../actions/sellerPostActions';
import sellerService from '../services/sellerPostService';

export const getSellerPostAsync = createAsyncThunk(
    sellerPostActions.GET_SELLER_POSTS,
    async () => {
        const response = await sellerService.getSellerPost();
        return response;
    }
);

export const deleteFromSellerPostAsync = createAsyncThunk(
    sellerPostActions.DELETE_SELLER_POST,
    async (id) => {
        return await sellerService.deleteSellerPost(id);
    }
);

export const updatePostAsync = createAsyncThunk(
    sellerPostActions.UPDATE_SELLER_POST,
    async (updatedPost) => {
        return await sellerService.updateSellerPost(updatedPost);
    }
);