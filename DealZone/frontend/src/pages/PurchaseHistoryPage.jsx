import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseHistoryAsync } from '../thunks/purchaseHistoryThunk';
import Navbar from '../components/Navbar';
import PurchasedItem from '../components/PurchasedItem';
import '../css/PurchaseHistoryPage.css';
import { Typography, Box, Container } from '@mui/material';

const PurchaseHistoryPage = () => {
    const dispatch = useDispatch();
    let purchaseHistoryItem = useSelector((state) => state.purchaseHistory.items);
    purchaseHistoryItem = JSON.parse(JSON.stringify(purchaseHistoryItem)).reverse();

    useEffect(() => {
        dispatch(getPurchaseHistoryAsync());
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" gutterBottom>
                        Purchase History
                    </Typography>
                </Box>
                <div className="purchase-history-list">
                    {purchaseHistoryItem.map(item => (
                        <PurchasedItem key={item._id} purchasedItem={item} />
                    ))}
                </div>

            </Container>
        </>
    );
};

export default PurchaseHistoryPage;
