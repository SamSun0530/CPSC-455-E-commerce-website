import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync } from '../thunks/userThunk';
import Navbar from '../components/Navbar';
import '../css/UserAccountPage.css';

const UserAccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);


    useEffect(() => {

        dispatch(getUserAsync());

    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="user-account-page">
                
                <div className="user-info-card">
                    <h1>User Account</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>First name: {user.first_name}</p>
                    <p>Address: {user.city}</p>
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;
