import CartPage from './pages/CartPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { IndividualListingPage } from './pages/IndividualListingPage';
import SellerView from './pages/SellerView';
import Homepage from './pages/Homepage';
import CreateListingPage from './pages/CreateListing';
import CheckOutPage from './pages/CheckOutPage';
import Wishlist from './pages/Wishlist'
import PurchaseSuccess from './pages/PurchaseSuccess';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { checkSessionAsync } from './thunks/auth';
import { Typography, Box, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { finishLoading } from './slices/auth';

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    useEffect(() => {
        if (sessionStorage.getItem('sessionToken')) {
            dispatch(checkSessionAsync());
        } else {
            dispatch(finishLoading());
        }
    }, []);

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>Loading...</Typography>
                </Box>
            ) : (
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/account" element={<UserAccountPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                            <Route exact path="/listings/:productId" element={<IndividualListingWrapper />} />
                            <Route path="/checkout" element={<CheckOutPage />} />
                            <Route path="/createListing" element={<CreateListingPage />} />
                            <Route path="/sellerView" element={<SellerView />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/purchased" element={<PurchaseSuccess />} />
                            <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
                        </Routes>
                    </div>
                </Router>
            )}
        </>
    );
};
function IndividualListingWrapper() {
    const items = useSelector((state) => state.home.items);
    const { productId } = useParams();
    const item = items.find((i) => i._id == productId);

    return <IndividualListingPage post={item} />;
}

export default App;