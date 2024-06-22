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
        },
        {
            id:125,
            name: 'Post 3',
            price: 40,
            desc: 'This is the description for Post 3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxUGeuodP9ldBqMv_KLjPTocwntmdiQ5kKA&s',
        },
        {
            id:126,
            name: 'Post 4',
            price: 5,
            desc: 'This is the description for Post 4',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pendulum_clock_by_Jacob_Kock%2C_antique_furniture_photography%2C_IMG_0931_edit.jpg/188px-Pendulum_clock_by_Jacob_Kock%2C_antique_furniture_photography%2C_IMG_0931_edit.jpg',
        }
    ]
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
    }
});

export default homeSlice.reducer;
