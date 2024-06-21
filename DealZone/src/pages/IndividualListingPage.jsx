import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../slices/cart';
import Navbar from '../components/Navbar';
import '../css/IndividualListingPage.css';

export const IndividualListingPage = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    return (
        <>
            <Navbar />
            <div className="product-container">
                <div className="product-image-container">
                    <img src={item.images[0]} alt="Item" />
                    <div className="product-thumbnails">
                        <img src={item.images[0]} alt="Thumbnail 1" />
                        <img src={item.images[1]} alt="Thumbnail 2" />
                        <img src={item.images[2]} alt="Thumbnail 3" />
                        <img src={item.images[3]} alt="Thumbnail 4" />
                    </div>
                </div>
                <div className="product-details-container">
                    <h2 className='product-name'>{item.name}</h2>
                    <h3 className="product-price">${item.price}</h3>
                    <div className="product-rating">
                        <span className="rating-stars">★★★★☆</span> {/* TODO: Add item rating */}
                    </div>
                    <p className="product-description">
                        {item.description}
                    </p>
                    <button 
                        className='add-to-cart-button'
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <div className="product-info-tabs">
                        <div className="tab">Features</div> {/* TODO: Add additional info */}
                        <div className="tab">Shipping</div> {/* TODO: Add shipping info */}
                        <div className="tab">Returns</div> {/* TODO: Add return options */}
                    </div>
                </div>
            </div>
        </>
    );
};
