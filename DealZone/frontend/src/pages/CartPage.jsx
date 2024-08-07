import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import CartItem from '../components/CartItem';
import { Button, Typography, Box, Container, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartAsync, getCartAsync } from '../thunks/cartThunk';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const loading = useSelector(state => state.cart.loading);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartAsync());
    }, [dispatch]);

    const handleClearCart = () => {
        if (cartItems.length > 0)
            dispatch(clearCartAsync());
    };

    const handleBuyAll = () => {
        if (cartItems.length > 0) {
            navigate('/checkout');
        }
    }

    return (
        <>
            <Navbar />
            <Container>
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" gutterBottom>
                        Shopping Cart
                    </Typography>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                        <Typography ml={2}>Loading...</Typography>
                    </Box>
                ) : (<>
                    <Box my={4}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            {cartItems.map(item => (
                                <CartItem key={item._id} cartItem={item} />
                            ))}
                        </Box>
                    </Box>
                    <Box my={4} textAlign="center">
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            Summary
                        </Typography>
                        <Typography variant="h6" mb={2}>
                            Total Price: ${totalPrice.toFixed(2)}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleBuyAll} sx={{ mx: 1 }}>
                            Checkout
                        </Button>
                        <Button variant="contained" color="error" onClick={handleClearCart} sx={{ mx: 1 }}>
                            Clear Cart
                        </Button>
                    </Box>
                </>)}
            </Container>
        </>
    );
};

export default CartPage;