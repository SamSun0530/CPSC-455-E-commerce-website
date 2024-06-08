import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { IndividualListingPage } from './pages/IndividualListingPage';
import Homepage from './pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Route exact path="/listings/:productId" element={<IndividualListingPage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;