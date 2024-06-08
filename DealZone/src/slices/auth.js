import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        logIn: (state, action) => {
            // auth service here to verify credentials, dummy for now
            state.isLoggedIn = true;
            console.log("logged in");
            console.log(state.isLoggedIn);
        },
        logOut: (state, action) => {
            state.isLoggedIn = false;
        },
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;