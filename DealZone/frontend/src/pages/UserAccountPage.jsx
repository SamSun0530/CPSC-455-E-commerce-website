import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPencilAlt } from 'react-icons/fa';
import '../css/UserAccountPage.css';

const UserAccountPage = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="user-account-container">
                <div className="user-account-card">
                    <h1>User Account</h1>
                    <div className="user-account-item">
                        <label>Username:</label>
                        {isEditingName ? (
                            <input type="text" defaultValue="John Doe" />
                        ) : (
                            <span>John Doe</span>
                        )}
                        <FaPencilAlt
                            className="edit-icon"
                            onClick={() => setIsEditingName(!isEditingName)}
                        />
                    </div>
                    <div className="user-account-item">
                        <label>Password:</label>
                        {isEditingPassword ? (
                            <input type="password" defaultValue="******" />
                        ) : (
                            <span>******</span>
                        )}
                        <FaPencilAlt
                            className="edit-icon"
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                        />
                    </div>
                    <div className="user-account-item">
                        <label>Address:</label>
                        {isEditingAddress ? (
                            <input type="text" defaultValue="123 Main St" />
                        ) : (
                            <span>123 Main St</span>
                        )}
                        <FaPencilAlt
                            className="edit-icon"
                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;