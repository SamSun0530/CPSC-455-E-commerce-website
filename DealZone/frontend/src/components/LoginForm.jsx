import React, { useState, useEffect } from 'react';
import '../css/LoginPage.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { authUserAsync } from '../thunks/auth';
import { clearAPIStatus } from '../slices/auth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authState = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('login button form', email, password);
        dispatch(authUserAsync({email, password}));
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
		dispatch(clearAPIStatus());
	}, []);

    useEffect(() => {
        console.log("login state?", authState.isLoggedIn);
        if (authState.isLoggedIn) {
            navigate('/');
        }
    }, [authState.isLoggedIn]);

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 id="loginHeading">Welcome to DealZone</h2>
                    <label>
                        Email
                    </label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>
                        Password
                    </label>
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {authState.authUser === 'REJECTED' && <p className="p-error">Login Failed</p>}
                    <button id='loginSubmitbtn' className="button" type="submit">Login</button>

                    <p>Not registered yet? <Link to="/register">Register</Link> with us.</p>
                    <p>Continue as <a href="">Guest</a>?</p>
                </form>
            </div>
        </>

    );
};

export default LoginForm;
