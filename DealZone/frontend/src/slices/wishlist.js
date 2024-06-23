import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: 123,
            name: 'Post 1',
            price: 20,
            desc: 'This is the description for Post 1',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaTEG_xpBkCdkRDedJ1ei1BoVjqD3J5muqhQ&s',
        },
        {
            id:124,
            name: 'Post 2',
            price: 30,
            desc: 'This is the description for Post 2',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmj0wqdcbsV4OHlipy3rxoZDk_YPFhKUmtHg&s',
        }
    ],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action) => {
            state.items.push(action.payload);
        },
        removeItemFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
