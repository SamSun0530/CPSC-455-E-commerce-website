import React, { useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function SellerView() {
    const navigate = useNavigate();

    const handleAddPostClick = () => {
      navigate('/createListing');
    };
  
    const handleViewPostsClick = () => {
      navigate('/sellerposts');
    };

  return (
    <>
    <Navbar />
    <Container>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Seller View
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPostClick}
            sx={{ m: 2 }}
          >
            Add New Post
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewPostsClick}
            sx={{ m: 2 }}
          >
            View Your Posts
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
}
