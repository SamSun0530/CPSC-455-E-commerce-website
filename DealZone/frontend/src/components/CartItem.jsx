import React from 'react';
import '../css/CartItem.css';
import { useDispatch } from 'react-redux';
import { deleteFromCartAsync } from '../thunks/cartThunk';
import { addToWishlistAsync } from '../thunks/wishlistThunk'
import { truncateTitle } from '../utils/length';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = () => {
        dispatch(deleteFromCartAsync(cartItem._id));
    };

    const handleMoveToWishlist = () => {
        dispatch(deleteFromCartAsync(cartItem._id));
        dispatch(addToWishlistAsync(cartItem));
    };

    const handleListingClick = () => {
        navigate(`/listings/${cartItem._id}`);
    }

    const maxLength = 50;

    return (
        <div className="cart-item">
            <img onClick={handleListingClick} src={cartItem.image} alt={cartItem.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 onClick={handleListingClick} className="cart-item-title">{truncateTitle(cartItem.title, maxLength)}</h3>
                <p>${cartItem.price}</p>
                <button onClick={handleRemove} className="cart-item-button delete">Remove</button>
                <button onClick={handleMoveToWishlist} className="cart-item-button move">Move to Wishlist</button>
            </div>
        </div>
    );
};

export default CartItem;