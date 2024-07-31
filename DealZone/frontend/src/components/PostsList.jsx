import React, { useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { getPostsListAsync } from '../thunks/postsListThunk';

export default function PostsList() {
    const listings = useSelector((state) => state.home.items);
    const loading = useSelector((state) => state.home.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsListAsync());
    }, []);

    const handleCardClick = (postId) => {
        navigate(`/listings/${postId}`);
    };

    return (
        <Box mt={2}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>Loading...</Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {listings.map((post, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Post post={post} onClick={() => handleCardClick(post._id)} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}