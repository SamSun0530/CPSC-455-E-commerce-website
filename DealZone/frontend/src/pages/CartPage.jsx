import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import CartItem from '../components/CartItem';
import { Button } from 'react-bootstrap';
import '../css/CartPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartAsync, getCartAsync } from '../thunks/cartThunk';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        dispatch(getCartAsync());
    }, [dispatch]);

    const handleClearCart = () => {
        dispatch(clearCartAsync());
    };

    return (
        <div>
            <Navbar />
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="cart-items-grid">
                    {cartItems.map(item => (
                        <CartItem key={item._id} cartItem={item} />
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Summary</h2>
                    <p>Total Price: ${totalPrice}</p>
                    <Link to='/checkout'><Button variant="success" className="action-button">Buy All Items</Button></Link>
                    <Button variant="danger" className="action-button" onClick={handleClearCart}>Delete All Items</Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
