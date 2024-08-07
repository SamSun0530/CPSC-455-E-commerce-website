import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, updateUserAsync } from '../thunks/userThunk';
import Navbar from '../components/Navbar';
import '../css/UserAccountPage.css';

const UserAccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal, setPostal] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        dispatch(getUserAsync());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setPhoneNumber(user.phone_number || '');
            setStreet(user.street || '');
            setCity(user.city || '');
            setProvince(user.province || '');
            setPostal(user.postal || '');
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateUserAsync({ username, email }));
        setIsEditing(false);
    };

    return (
        <div>
            <Navbar />
            <div className="user-account-page">
                
                <div className="user-info-card">
                    <h1>User Account</h1>

                    <p>Username: {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    ) : (
                        <span>{username}</span>
                    )}</p>

                    <p>Email: {isEditing ? (
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        <span>{email}</span>
                    )}</p>

                    <p>First Name: {isEditing ? (
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    ) : (
                        <span>{first_name}</span>
                    )}</p>

                    <p>Last Name: {isEditing ? (
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    ) : (
                        <span>{last_name}</span>
                    )}</p>

                    <p>Phone Number: {isEditing ? (
                        <input
                            type="text"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    ) : (
                        <span>{phone_number}</span>
                    )}</p>

                    <p>Street: {isEditing ? (
                        <input
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    ) : (
                        <span>{street}</span>
                    )}</p>

                    <p>City: {isEditing ? (
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    ) : (
                        <span>{city}</span>
                    )}</p>

                    <p>Province: {isEditing ? (
                        <input
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        />
                    ) : (
                        <span>{province}</span>
                    )}</p>

                    <p>Postal: {isEditing ? (
                        <input
                            type="text"
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                        />
                    ) : (
                        <span>{postal}</span>
                    )}</p>

                    {isEditing ? (
                        <button onClick={handleSaveClick}>Save</button>
                    ) : (
                        <button onClick={handleEditClick}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;
