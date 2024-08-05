import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { getWishlistAsync, clearWishlistAsync, deleteFromWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
import { truncateTitle } from '../utils/length';
import { useNavigate } from 'react-router-dom';
import '../css/Wishlist.css';

const WishlistPage = () => {
    const { items, loading } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getWishlistAsync());
    }, []);

    const handleRemoveFromWishlist = (id) => {
        dispatch(deleteFromWishlistAsync(id));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlistAsync());
    };

    const handleMoveToCart = (item) => {
        dispatch(deleteFromWishlistAsync(item._id));
        dispatch(addToCartAsync(item));
    };

    const handleMoveAllToCart = () => {
        items.forEach((item) => {
            dispatch(deleteFromWishlistAsync(item._id));
            dispatch(addToCartAsync(item));
        });
    };

    const handleListingClick = (listing_id) => {
        navigate(`/listings/${listing_id}`);
    };

    const maxLength = 50;

    return (
        <>
            <Navbar />
            <Container>
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" gutterBottom>
                        Wishlist
                    </Typography>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                        <Typography ml={2}>Loading...</Typography>
                    </Box>
                ) : (
                    <>
                        <Box my={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                {items.map((item) => (
                                    <div key={item._id} className="cart-item">
                                        <img
                                            onClick={() => handleListingClick(item._id)}
                                            src={item.image}
                                            alt={item.title}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h3 onClick={() => handleListingClick(item._id)} className="cart-item-title">
                                                {truncateTitle(item.title, maxLength)}
                                            </h3>
                                            <p>${item.price}</p>
                                            <button onClick={() => handleMoveToCart(item)} className="cart-item-button move">
                                                Move to Cart
                                            </button>
                                            <button onClick={() => handleRemoveFromWishlist(item._id)} className="cart-item-button delete">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                        <Box my={4} textAlign="center">
                            <Button variant="contained" color="primary" onClick={handleMoveAllToCart} sx={{ mx: 1 }}>
                                Move All To Cart
                            </Button>
                            <Button variant="contained" color="error" onClick={handleClearWishlist} sx={{ mx: 1 }}>
                                Clear Wishlist
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
};

export default WishlistPage;
