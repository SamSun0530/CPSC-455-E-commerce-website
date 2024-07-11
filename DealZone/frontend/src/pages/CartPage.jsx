import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import '../css/CartPage.css';
import { clearCartAsync, deleteFromCartAsync, getCartAsync } from '../thunks/cartThunk';
import { addToWishlistAsync } from '../thunks/wishlistThunk';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartAsync());
    }, []);

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

    const handleRemoveItem = (id) => {
        dispatch(deleteFromCartAsync(id));
    };

    const handleMoveItemToWishlist = (item) => {
        dispatch(deleteFromCartAsync(item.id));
        dispatch(addToWishlistAsync(item));
    };

    const handleClearCart = () => {
        dispatch(clearCartAsync());
    };

    return (
        <div>
            <Navbar />
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="cart-content">
                    <div className="cart-items-grid">
                        {cartItems.map(item => (
                            <CartItem key={item.id} cartItem={item}
                                remove={() => handleRemoveItem(item.id)}
                                moveToWishlist={() => handleMoveItemToWishlist(item)} />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="cart-summary-card">
                            <h2>Summary</h2>
                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                            <Link to='/checkout'>
                                <button className="cart-item-button move">Buy All Items</button>
                            </Link>
                            <button className="cart-item-button delete" onClick={handleClearCart}>Delete All Items</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
