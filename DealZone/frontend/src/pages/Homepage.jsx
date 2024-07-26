import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import SearchBar from "../components/SearchBar";
import { Container } from '@mui/material';

export default function Homepage() {
  return (
    <>
      <Navbar />
      <Container>
        <SearchBar/>
        <PostsList />
      </Container>
	</>
  );
}
