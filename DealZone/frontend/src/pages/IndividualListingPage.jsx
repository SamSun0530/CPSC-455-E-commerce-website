import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import '../css/IndividualListingPage.css';
import { addToWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
import { useParams } from 'react-router-dom';
import { getIndividualListingAsync } from '../thunks/postsListThunk';
export const IndividualListingPage = ({post}) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const cartError = useSelector(state => state.cart.error);
    let items = useSelector(state => state.individualPost.item);
    if (post) {
        items = [post];
    }
    
    useEffect(() => {
        dispatch(getIndividualListingAsync(productId));
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCartAsync(item));
    };

    const handleAddToWishlist = (item) => {
        dispatch(addToWishlistAsync(item));
    };

    return (
        <>
            <Navbar />
            {items.map((item) => (
            <div className="product-container" key={item._id}>
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
                    <h2 className='product-name'>{item.title}</h2>
                    <h3 className="product-price">${item.price}</h3>
                    <p className="product-description">
                        {item.description}
                    </p>
                    <button
                        className='add-to-cart-button'
                        onClick={() => handleAddToCart(item)}
                    >
                        Add to Cart
                    </button>
                    {cartError && <p className="error-message">{cartError}</p>}
                    <button
                        className='add-to-wishlist-button'
                        onClick={() => { handleAddToWishlist(item) }}
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
            ))}
        </>
    );
};
