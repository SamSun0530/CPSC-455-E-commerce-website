import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getSoldPostsAsync } from '../thunks/postsListThunk';
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import SearchBar from "../components/SearchBar";
import ListingRow from "../components/ListingRow";

export default function Homepage() {
  const dispatch = useDispatch();
  const soldPosts = useSelector((state) => state.home.soldItems);


  useEffect(() => {
    dispatch(getSoldPostsAsync());
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <SearchBar />
        <PostsList />
        {soldPosts.length > 0 && (
          <>
            <Box mt={4} mb={2}>
              <Typography variant="h4" component="h2" gutterBottom>
                Sold Items
              </Typography>
            </Box>
            <ListingRow posts={soldPosts} />
          </>
        )}
      </Container>
    </>
  );
}
