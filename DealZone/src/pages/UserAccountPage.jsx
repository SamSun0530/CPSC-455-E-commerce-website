import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/UserAccountPage.css';

const UserAccountPage = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="user-account-container">
                <h1>User Account</h1>
                <div>
                    <label>Username: </label>
                    {isEditingName ? (
                        <input type="text" />
                    ) : (
                        <span>John Doe</span>
                    )}
                    <button
                        type="button"
                        className="view-details-button"
                        onClick={() => setIsEditingName(!isEditingName)}
                    >
                        {isEditingName ? 'Save' : 'Change Username'}
                    </button>
                </div>
                <div>
                    <label>Password: </label>
                    {isEditingPassword ? (
                        <input type="password" />
                    ) : (
                        <span>******</span>
                    )}
                    <button
                        type="button"
                        className="view-details-button"
                        onClick={() => setIsEditingPassword(!isEditingPassword)}
                    >
                        {isEditingPassword ? 'Save' : 'Change Password'}
                    </button>
                </div>
                <div>
                    <label>Address: </label>
                    {isEditingAddress ? (
                        <input type="text" />
                    ) : (
                        <span>123 Main St</span>
                    )}
                    <button
                        type="button"
                        className="view-details-button"
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                    >
                        {isEditingAddress ? 'Save' : 'Edit Address'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;
