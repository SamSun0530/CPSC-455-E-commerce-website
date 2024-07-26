import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSellerPostAsync, updatePostAsync, deleteFromSellerPostAsync } from '../thunks/sellerPostThunk';
import Post from '../components/Post';
import EditPost from '../components/EditPost';

export default function SellerView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sellerPosts = useSelector((state) => state.seller.items);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        dispatch(getSellerPostAsync());
    }, [dispatch]);

    const handleAddPostClick = () => {
        navigate('/createListing');
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleCloseEdit = () => {
        setSelectedPost(null);
    };

    const handleSaveEdit = (updatedPost) => {
        dispatch(updatePostAsync(updatedPost));
        handleCloseEdit();
    };

    const handleDelete = (postId) => {
        dispatch(deleteFromSellerPostAsync(postId));
        handleCloseEdit();
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
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={() => handlePostClick(post)}>
                                <Post key={post._id} post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {selectedPost && (
                    <EditPost 
                        post={selectedPost} 
                        onClose={handleCloseEdit} 
                        onSave={handleSaveEdit} 
                        onDelete={handleDelete}
                    />
                )}
            </Container>
        </>
    );
}
