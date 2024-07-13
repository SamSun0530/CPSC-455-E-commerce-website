import React from 'react';
import '../css/CartItem.css';
import { useDispatch } from 'react-redux';
import { deleteFromCartAsync } from '../thunks/cartThunk';

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(deleteFromCartAsync(cartItem._id));
    };

    return (
        <div className="cart-item">
            <img src={cartItem.image} alt={cartItem.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{cartItem.title}</h3>
                <p>${cartItem.price}</p>
                <button onClick={handleRemove} className="cart-item-button delete">Remove</button>
                <button className="cart-item-button move">Move to Wishlist</button>
            </div>
        </div>
    );
};

export default CartItem;
