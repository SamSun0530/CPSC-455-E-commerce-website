import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "../actions/auth";
import AuthService from '../services/auth';


export const checkSessionAsync = createAsyncThunk(
    authActions.CHECK_SESSION,
    async () => {
        const { loggedIn } = await AuthService.checkSession();
        if (loggedIn) {
            return { loggedIn };
        } else {
            throw new Error('session invalid');
        }
    }
)

export const authUserAsync = createAsyncThunk(
    authActions.LOG_IN,
    async ({ email, password }) => {
        const { success, session } = await AuthService.authUser(email, password);
        sessionStorage.setItem('sessionToken', session.session_token);
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

export const logOutUserAsync = createAsyncThunk(
    authActions.LOG_OUT,
    async () => {
        await AuthService.logOutUser();
        return;
    }
)