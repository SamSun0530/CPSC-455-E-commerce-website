import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';

const CartPage = () => {
    return (
        <div className="App">
            <Navbar />
            <h1>Cart</h1>
            <CartItem />
            {/* Add more CartItem components as needed */}
            <button className="delete-all-button">Delete All</button>
            <button className="view-details-button">Buy</button>
        </div>
    );
};

export default CartPage;
