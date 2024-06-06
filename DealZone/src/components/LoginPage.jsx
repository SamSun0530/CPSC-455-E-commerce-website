import React, { useState } from 'react';
import '../css/LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Will add functionality later
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
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
            <button id='loginSubmitbtn' className="button" type="submit">Login</button>
        
            <p>Not registered yet? <Link to="/register">Register</Link> with us.</p>
            <p>Continue as <a href="">Guest</a>?</p>
        </form>
        </div>
        
    );
};

export default LoginPage;
