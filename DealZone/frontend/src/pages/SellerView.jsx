import React, { useEffect } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSellerPostAsync } from '../thunks/sellerPostThunk';
import Post from '../components/Post';

export default function SellerView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sellerPosts = useSelector((state) => state.seller.items);

    useEffect(() => {
        dispatch(getSellerPostAsync());
    }, []);

    const handleAddPostClick = () => {
        navigate('/createListing');
    };

    return (
        <>
            <Navbar />
            <Container>
                <Box mt={4} textAlign="center">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome to the Seller View
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddPostClick}
                        sx={{ m: 2 }}
                    >
                        Add New Post
                    </Button>
                </Box>
                <Box mt={4}>
                    <Grid container spacing={3}>
                        {sellerPosts.map((post, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Post post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}