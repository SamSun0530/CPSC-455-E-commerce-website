import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import UserAccountPage from './pages/UserAccountPage';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<div><Navbar /><h1>Welcome to the Shop</h1></div>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/account" element={<UserAccountPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;