import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import CartItem from '../components/CartItem';
import { Button, Card } from 'react-bootstrap';
import '../css/CartPage.css';

const CartPage = () => {
    const cartItems = [
        // Your cart items here
        { id: 1, name: 'Item 1', price: '$10', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Item 2', price: '$20', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Item 3', price: '$30', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Item 4', price: '$40', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Item 5', price: '$50', image: 'https://via.placeholder.com/150' },
    ];

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

    return (
        <div>
            <Navbar />
            <div className="cart-page">
                <h1>Shopping Cart</h1>

                <div className="cart-content">
                    <div className="cart-items-grid">
                        {cartItems.map(item => (
                            <CartItem key={item.id} cartItem={item} />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <Card className="cart-summary-card">
                            <Card.Body>
                                <Card.Text>Total Price: ${totalPrice.toFixed(2)}</Card.Text>
                                <Link to='/checkout'>
                                    <Button variant="success" className="action-button">Buy All Items</Button>
                                </Link>
                                <Button variant="danger" className="action-button">Delete All Items</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
