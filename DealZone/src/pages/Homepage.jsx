import Navbar from "../components/Navbar"
import PostsList from "../components/PostsList"
import SearchBar from "../components/SearchBar"
//import '../css/Homepage.css'
export default function Homepage() {
	return (
		<>
			<Navbar />
			<SearchBar/>
			<PostsList />
		</>
	)
}