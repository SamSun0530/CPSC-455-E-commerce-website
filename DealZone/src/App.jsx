import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import UserAccountPage from './pages/UserAccountPage';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/account" element={<UserAccountPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
