import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../css/UserAccountPage.css';

const UserAccountPage = () => {
    const initialUser = JSON.parse(localStorage.getItem('user')) || {
        username: 'defaultUsername',
        email: 'defaultEmail@example.com',
        address: 'defaultAddress',
    };

    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState(initialUser);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleSave = () => {
        setEditingField(null);
        localStorage.setItem('user', JSON.stringify(formData));
    };

    return (
        <>
            <Navbar />
            <div className="user-account-page">
                <h1>Account Information</h1>
                <div className="account-info-card">
                    <div className="info-row">
                        <label>Username:</label>
                        {editingField === 'username' ? (
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{formData.username}</span>
                        )}
                        <button
                            onClick={() =>
                                editingField === 'username'
                                    ? handleSave()
                                    : handleEdit('username')
                            }
                        >
                            {editingField === 'username' ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    <div className="info-row">
                        <label>Email:</label>
                        {editingField === 'email' ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{formData.email}</span>
                        )}
                        <button
                            onClick={() =>
                                editingField === 'email'
                                    ? handleSave()
                                    : handleEdit('email')
                            }
                        >
                            {editingField === 'email' ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    <div className="info-row">
                        <label>Address:</label>
                        {editingField === 'address' ? (
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{formData.address}</span>
                        )}
                        <button
                            onClick={() =>
                                editingField === 'address'
                                    ? handleSave()
                                    : handleEdit('address')
                            }
                        >
                            {editingField === 'address' ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAccountPage;
