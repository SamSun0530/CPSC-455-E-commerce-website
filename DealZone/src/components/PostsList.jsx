import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from './Post';

export default function PostsList() {

    const listings = useSelector((state) => state.home.items);
    const navigate = useNavigate();

    const handleCardClick = (postId) => {
      navigate(`/listings/${postId}`);
    };

    return (
        <Box mt={2}>
            <Grid container spacing={3}>
                {listings.map((post, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={() => handleCardClick(post.id)}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}