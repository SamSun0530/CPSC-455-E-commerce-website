import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { IndividualListingPage } from './pages/IndividualListingPage';
import SellerView from './pages/SellerView';
import Homepage from './pages/Homepage';
import CreateListingPage from './pages/CreateListing';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckOutPage from './pages/CheckOutPage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Wishlist from './pages/Wishlist'

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/account" element={<UserAccountPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route exact path="/listings/:productId" element={<IndividualListingWrapper/>} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/createListing" element={<CreateListingPage />} />
                    <Route path="/sellerView" element={<SellerView />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
            </div>
        </Router>
    );
};
function IndividualListingWrapper() {
    const items = useSelector((state) => state.home.items);
    const { productId } = useParams();
    const item = items.find((i) => i._id == productId);
  
    return item ? <IndividualListingPage item={item} /> : <div>Item not found </div>;
  }
  
export default App;