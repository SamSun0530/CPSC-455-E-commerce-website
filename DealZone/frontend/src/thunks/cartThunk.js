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
        const response = await cartService.addToCart(item);
        return response;
    }
);

export const deleteFromCartAsync = createAsyncThunk(
    cartActions.DELETE_FROM_CART,
    async (id) => {
        const response = await cartService.deleteFromCart(id);
        return response;
    }
);

export const clearCartAsync = createAsyncThunk(
    cartActions.CLEAR_CART,
    async () => {
        const response = await cartService.clearCart();
        return response;
    }
);
