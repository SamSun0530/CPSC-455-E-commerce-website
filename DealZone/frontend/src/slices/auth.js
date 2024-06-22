import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './util';
import { authUserAsync, registerUserAsync } from '../thunks/auth';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        authUser: REQUEST_STATE.IDLE,
        registerUser: REQUEST_STATE.IDLE,
        error: null
    },
    reducers: {
        logOut: (state, action) => {
            state.isLoggedIn = false;
        },
        clearAPIStatus: (state) => {
            state.authUser = REQUEST_STATE.IDLE,
            state.registerUser = REQUEST_STATE.IDLE,
            state.error = null;
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
            });
    }
});

export const { clearAPIStatus, logOut } = authSlice.actions;

export default authSlice.reducer;