import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartActions } from '../actions/cartActions';
import cartService from '../services/cartService';

export const getCartAsync = createAsyncThunk(
    cartActions.GET_CART,
    async () => {
        return await cartService.getCart();
    }
);

export const addToCartAsync = createAsyncThunk(
    cartActions.ADD_TO_CART,
    async (item, { rejectWithValue }) => {
        try {
            return await cartService.addToCart(item);
        } catch (error) {
            return rejectWithValue(error.message);
        }
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

export const purchaseCartAsync = createAsyncThunk(
    cartActions.PURCHASE_CART,
    async ({ cart, details }) => {
        return await cartService.purchaseCart({ cart, details });
    }
);