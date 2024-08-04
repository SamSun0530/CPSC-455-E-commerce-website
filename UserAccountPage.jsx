import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync } from '../thunks/userThunk';
import Navbar from '../components/Navbar';

const UserAccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.username);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            dispatch(getUserAsync(userId));
        }
    }, [dispatch, userId]);

    return (
        <div>
            <Navbar />
            <div className="user-account-page">
                <h1>User Account</h1>
                <div className="user-info-card">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;
