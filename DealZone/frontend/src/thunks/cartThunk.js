import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartActions } from '../actions/cartActions';
import cartService from '../services/cartService';

export const getCartAsync = createAsyncThunk(
    cartActions.GET_CART,
    async () => {
        const response = await cartService.getCart();
        return response;
    }
);

export const addToCartAsync = createAsyncThunk(
    cartActions.ADD_TO_CART,
    async (item) => {
        return await cartService.addToCart(item);
    }
);

export const deleteFromCartAsync = createAsyncThunk(
    cartActions.DELETE_FROM_CART,
    async (id) => {
        return await cartService.deleteFromCart(id);
    }
);

export const clearCartAsync = createAsyncThunk(
    cartActions.CLEAR_CART,
    async () => {
        return await cartService.clearCart();
    }
);