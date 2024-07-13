import React from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import '../css/IndividualListingPage.css';
import { addToWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
export const IndividualListingPage = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCartAsync(item));
    };

    const handleAddToWishlist = (item) => {
        dispatch(addToWishlistAsync(item));
    };

    return (
        <>
            <Navbar />
            <div className="product-container">
                <div className="product-image-container">
                    <img src={item.image} alt="Item" />
                    {item.images && item.images.length > 0 && (
                        <div className="product-thumbnails">
                            {item.images.map((image, index) => (
                                <img key={index} src={image} alt={`Thumbnail ${index + 1}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="product-details-container">
                    <h2 className='product-name'>{item.name}</h2>
                    <h3 className="product-price">${item.price}</h3>
                    <p className="product-description">
                        {item.description}
                    </p>
                    <button
                        className='add-to-cart-button'
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        className='add-to-wishlist-button'
                        onClick={() => { handleAddToWishlist(item) }}
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </>
    );
};
