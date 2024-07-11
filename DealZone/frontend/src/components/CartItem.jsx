import React from 'react';
import PropTypes from 'prop-types';
import '../css/CartItem.css';

const CartItem = ({ cartItem, remove, moveToWishlist }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-image-container">
                <img src={cartItem.image} alt={cartItem.name} className="cart-item-image" />
            </div>
            <div className="cart-item-details">
                <h2>{cartItem.name}</h2>
                <span>${cartItem.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-actions">
                <button className="cart-item-button move" onClick={moveToWishlist}>Move to Wishlist</button>
                <button className="cart-item-button delete" onClick={remove}>Delete</button>
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
