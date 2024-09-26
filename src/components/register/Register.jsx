import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        setErrorMessage('');
        console.log('Login successful:', { email, password });
    };

  return (
    <div className="login-form">
        <div className="login-container">
            <h2>Register</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email Address</label>
                <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
            </div>

            <button type="submit" className="login-btn">Register</button>
            </form>

            <div className="extra-options">
            <p>Already have an account? <a href="/">Login</a></p>
            </div>
        </div>
    </div>

  );
};

export default RegisterForm;
