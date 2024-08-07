import React from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from './Post';

export default function ListingRow({ posts }) {
    const loadingSold = useSelector((state) => state.home.loadingSold);
    const navigate = useNavigate();

    const handleCardClick = (post) => {
        navigate(`/listings/${post._id}`);
    };

    return (
        <Box mt={2} position="relative">
            {loadingSold ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>Loading...</Typography>
                </Box>
            ) : (
                <Grid
                    id="listing-row-container"
                    container
                    wrap="nowrap"
                    spacing={2}
                    style={{ overflowX: 'auto', padding: '16px 0' }}
                >
                    {posts.map((post, index) => (
                        <Grid
                            item
                            key={index}
                            style={{ width: 280, flex: '0 0 auto' }}
                        >
                            <Post post={post} onClick={() => handleCardClick(post)} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
