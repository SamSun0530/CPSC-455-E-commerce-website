import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import '../css/CartItem.css';

const CartItem = ({ cartItem, onRemove }) => {
    return (
        <div className="cart-item">
            <img src={cartItem.image} alt={cartItem.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h2>{cartItem.name}</h2>
                <span>${cartItem.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-actions">
                <button className="cart-item-button move">Move to Wishlist</button>
                <button className="cart-item-button delete" onClick={onRemove}>Delete</button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    cartItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default CartItem;
