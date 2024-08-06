import React from 'react';
import '../css/CartItem.css'; // Reuse CartItem.css for styling


const PurchasedItem = ({ purchasedItem }) => {

    return (
        <div className="cart-item">
            <img src={purchasedItem.image} alt={purchasedItem.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{purchasedItem.title}</h3>
                <p>${purchasedItem.price}</p>
                <p>Purchased on: {new Date(purchasedItem.purchased_on).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default PurchasedItem;