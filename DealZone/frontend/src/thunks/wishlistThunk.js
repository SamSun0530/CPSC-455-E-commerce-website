import { createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistActions } from '../actions/wishlistActions';
import wishlistService from '../services/wishlistService';

export const getWishlistAsync = createAsyncThunk(
	wishlistActions.GET_WISHLIST,
  async () => {
	return await wishlistService.getWishlist();
  }
);

export const addToWishlistAsync = createAsyncThunk(
	wishlistActions.ADD_TO_WISHLIST,
  async (item) => {
    return await wishlistService.addToWishlist(item);
  }
);

export const deleteFromWishlistAsync = createAsyncThunk(
	wishlistActions.DELETE_FROM_WISHLIST,
  async (id) => {
    return await wishlistService.deleteFromWishlist(id);
  }
);

export const clearWishlistAsync = createAsyncThunk(
	wishlistActions.CLEAR_WISHLIST,
  async () => {
    return await wishlistService.clearWishlist();
  }
);