import { useState } from 'react';
import Navbar from '../components/Navbar';

const UserAccountPage = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    return (
        <div className="App">
            <Navbar />
            <h1>User Account</h1>
            <form>
                <label>Username: </label>
                {isEditingName ? (
                    <input type="text" />
                ) : (
                    <span>John Doe</span>
                )}
                <button
                    type="button"
                    onClick={() => setIsEditingName(!isEditingName)}
                >
                    {isEditingName ? 'Save' : 'Change Username'}
                </button>
            </form>
            <form>
                <label>Password: </label>
                {isEditingPassword ? (
                    <input type="password" />
                ) : (
                    <span>******</span>
                )}
                <button
                    type="button"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                >
                    {isEditingPassword ? 'Save' : 'Change Password'}
                </button>
            </form>
            <form>
                <label>Address: </label>
                {isEditingAddress ? (
                    <input type="text" />
                ) : (
                    <span>123 Main St</span>
                )}
                <button
                    type="button"
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                    {isEditingAddress ? 'Save' : 'Edit Address'}
                </button>
            </form>
        </div>
    );
};

export default UserAccountPage;
