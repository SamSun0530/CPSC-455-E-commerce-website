import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { authUserAsync, checkSessionAsync, registerUserAsync, logOutUserAsync } from '../thunks/auth';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        authUser: REQUEST_STATE.IDLE,
        registerUser: REQUEST_STATE.IDLE,
        checkSession: REQUEST_STATE.IDLE,
        logOutUser: REQUEST_STATE.IDLE,
        loading: true,
        error: null
    },
    reducers: {
        logOut: (state, action) => {
            state.isLoggedIn = false;
        },
        clearAPIStatus: (state) => {
            state.authUser = REQUEST_STATE.IDLE,
            state.registerUser = REQUEST_STATE.IDLE,
            state.checkSession = REQUEST_STATE.IDLE,
            state.error = null;
        },
        finishLoading: (state) => {
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUserAsync.pending, (state) => {
                state.authUser = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(authUserAsync.fulfilled, (state, action) => {
                state.authUser = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
            })
            .addCase(authUserAsync.rejected, (state, action) => {
                state.authUser = REQUEST_STATE.REJECTED;
                state.isLoggedIn = false;
                state.error = action.error;
            })
            .addCase(registerUserAsync.pending, (state) => {
                state.registerUser = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(registerUserAsync.fulfilled, (state) => {
                state.registerUser = REQUEST_STATE.FULFILLED;
                state.error = null;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.registerUser = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(checkSessionAsync.pending, (state) => {
                state.checkSession = REQUEST_STATE.PENDING;
                state.error = null;
                state.loading = true;
            })
            .addCase(checkSessionAsync.fulfilled, (state) => {
                state.checkSession = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(checkSessionAsync.rejected, (state, action) => {
                state.checkSession = REQUEST_STATE.REJECTED;
                state.error = action.error;
                state.loading = false;
            })
            .addCase(logOutUserAsync.pending, (state) => {
                state.logOutUser = REQUEST_STATE.PENDING;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(logOutUserAsync.fulfilled, (state) => {
                state.logOutUser = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = false;
            })
            .addCase(logOutUserAsync.rejected, (state, action) => {
                state.logOutUser = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export const { clearAPIStatus, logOut, finishLoading } = authSlice.actions;

export default authSlice.reducer;