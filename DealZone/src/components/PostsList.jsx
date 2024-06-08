import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Post from './Post';

export default function PostsList() {
    const testListings = [
        {
        name: 'Post 1',
        price: 20,
        desc: 'This is the description for Post 1',
        image: 'https://via.placeholder.com/150',
        },
        {
        name: 'Post 2',
        price: 30,
        desc: 'This is the description for Post 2',
        image: 'https://via.placeholder.com/150',
        },
        {
        name: 'Post 3',
        price: 40,
        desc: 'This is the description for Post 3',
        image: 'https://via.placeholder.com/150',
        },
        {
        name: 'Post 4',
        price: 5,
        desc: 'This is the description for Post 4',
        image: 'https://via.placeholder.com/150',
        }
    ];

    const [listings, setListings] = useState(testListings);

    return (
        <Box mt={2}>
        <Grid container spacing={3}>
            {listings.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Post post={post} />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
}