import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

export const getUserAsync = createAsyncThunk(
    'user/getUser',
    async (id) => {
        const response = await userService.getUser(id);
        return response;
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async ({ id, data }) => {
        const response = await userService.updateUser(id, data);
        return response;
    }
);
