import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "../actions/auth";
import AuthService from '../services/auth';

export const authUserAsync = createAsyncThunk(
    authActions.LOG_IN,
    async ({ email, password }) => {
        const { success, session } = await AuthService.authUser(email, password);
        document.cookie = `sessionToken=${session.session_token}; expires=${new Date(session.expires_on).toUTCString()}; SameSite=Strict; path=/`;
        if (success) {
            return { success };
        } else {
            throw new Error('login failed');
        }
    }
)

export const registerUserAsync = createAsyncThunk(
    authActions.REGISTER,
    async ({ username, email, phone_number, password }) => {
        const { created } = await AuthService.registerUser(username, email, phone_number, password);
        if (created) {
            return { created };
        } else {
            throw new Error('register failed');
        }
    }
)