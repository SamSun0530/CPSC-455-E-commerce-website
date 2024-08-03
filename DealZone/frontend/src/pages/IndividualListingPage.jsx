import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import '../css/IndividualListingPage.css';
import { addToWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
import { useParams } from 'react-router-dom';
import { getIndividualListingAsync } from '../thunks/postsListThunk';
import { Snackbar, Alert, Typography, Button, Paper, CircularProgress, Box, Modal } from '@mui/material';

export const IndividualListingPage = ({ post }) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const cartError = useSelector(state => state.cart.error);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    let items = useSelector(state => state.individualPost.item);
    const loading = useSelector(state => state.individualPost.loading);
    if (post) {
        items = [post];
    }

    useEffect(() => {
        dispatch(getIndividualListingAsync(productId));
    }, [dispatch, productId]);

    const handleAddToCart = (item) => {
        if (!isLoggedIn) {
            setOpen(true);
            return;
        }
        dispatch(addToCartAsync(item)).then((action) => {
            if (addToCartAsync.fulfilled.match(action)) {
                setSnackbarMessage('Added to Cart!');
                setSnackbarOpen(true);
            } else if (addToCartAsync.rejected.match(action)) {
                setSnackbarMessage(action.payload || 'Failed to add item to cart');
                setSnackbarOpen(true);
            }
        });
    };

    const handleAddToWishlist = (item) => {
        if (!isLoggedIn) {
            setOpen(true);
            return;
        }
        dispatch(addToWishlistAsync(item)).then((action) => {
            if (addToWishlistAsync.fulfilled.match(action)) {
                setSnackbarMessage('Added to Wishlist!');
                setSnackbarOpen(true);
            } else if (addToWishlistAsync.rejected.match(action)) {
                setSnackbarMessage(action.payload || 'Failed to add item to wishlist');
                setSnackbarOpen(true);
            }
        });
    };

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleClose = () => setOpen(false);

    // If listing was posted within 24 hours, return hours elapsed; else return date in mm/dd/yy format
    const handleDatePosted = (date) => {
        const posted_date = new Date(date);
        const curr = new Date();
        const diff = curr.getTime() - posted_date.getTime();
        const hours_diff = Math.round(diff / (1000 * 3600));
        if (hours_diff <= 24) {
            return `${hours_diff}h ago`;
        }
        return `${posted_date.getMonth() + 1}/${posted_date.getDate()}/${posted_date.getFullYear().toString().substring(2)}`;
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>Loading...</Typography>
                </Box>
            ) : (
                <>
                    {items.map((item) => (
                        <div className="product-container" key={item._id}>
                            <div className="product-image-container">
                                <img src={item.image} alt="Item" />
                            </div>
                            <div className="product-details-container">
                                <h2 className='product-name'>{item.title}</h2>
                                <h3 className="product-price">${item.price}</h3>
                                <p className="product-date">{handleDatePosted(item.posted_on)}</p>
                                <p className="product-description">
                                    {item.description}
                                </p>
                                {item.sold && (
                                    <div className="sold-tag">
                                        <Typography variant="h4" component="span">
                                            SOLD
                                        </Typography>
                                    </div>
                                )}

                                {item.tags && item.tags.length > 0 && (
                                    <div className="product-tags">
                                        {item.tags.map((tag, index) => (
                                            <label key={index}>{tag}</label>
                                        ))}
                                    </div>
                                )}
                                {!item.sold && <>
                                    <button
                                        className='add-to-cart-button'
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className='add-to-wishlist-button'
                                        onClick={() => handleAddToWishlist(item)}
                                    >
                                        Add to Wishlist
                                    </button>
                                </>}
                            </div>
                        </div>
                    ))}

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="login-required-title"
                        aria-describedby="login-required-description"
                    >
                        <Paper sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography id="login-required-title" variant="h5" component="h2" gutterBottom>
                                Login Required
                            </Typography>
                            <Typography id="login-required-description" sx={{ mt: 2, mb: 3 }}>
                                Please login or sign up to continue.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                                sx={{ width: '100%' }}
                            >
                                Okay
                            </Button>
                        </Paper>
                    </Modal>
                </>
            )}
        </>
    );
};