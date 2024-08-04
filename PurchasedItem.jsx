import React from 'react';
import '../css/CartItem.css'; // Reuse CartItem.css for styling


const PurchasedItem = ({ item }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <p>Purchased on: {new Date(item.purchased_on).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default PurchasedItem;