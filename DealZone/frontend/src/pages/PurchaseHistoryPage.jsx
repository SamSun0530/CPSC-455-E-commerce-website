import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseHistoryAsync } from '../thunks/purchaseHistoryThunk';
import Navbar from '../components/Navbar';
import PurchasedItem from '../components/PurchasedItem';
import '../css/PurchaseHistoryPage.css';

const PurchaseHistoryPage = () => {
    const dispatch = useDispatch();
    const purchaseHistoryItem = useSelector((state) => state.purchaseHistory.items);

    useEffect(() => {
        dispatch(getPurchaseHistoryAsync());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="purchase-history-page">
                <h1>Purchase History</h1>
                <div className="purchase-history-list">
                    {purchaseHistoryItem.map(item => {
                        // console.log(item); 
                        return(
                        <div className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>
                                <p>Purchased on: {new Date(item.purchased_on).toLocaleDateString()}</p>
                            </div>
                        </div>)
                    })}

                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;
