import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import CartItem from '../components/CartItem';
import { Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../slices/cart';
import '../css/CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
            <Navbar />
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="cart-content">
                    <div className="cart-items-grid">
                        {cartItems.map(item => (
                            <CartItem key={item.id} cartItem={item} onRemove={() => handleRemoveItem(item.id)} />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <Card className="cart-summary-card">
                            <Card.Body>
                                <Card.Title>Summary</Card.Title>
                                <Card.Text>Total Price: ${totalPrice.toFixed(2)}</Card.Text>
                                <Link to='/checkout'>
                                    <button className="cart-item-button move">Buy All Items</button>
                                </Link>
                                <button className="cart-item-button delete" onClick={handleClearCart}>Delete All Items</button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
