import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Update import here

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Update usage here

    const handleLogin = (e) => {
        e.preventDefault();

        setErrorMessage('');
        console.log('Login successful:', { email, password });

        setTimeout(() => {
            navigate('/home'); // Use navigate instead of history.push
        }, 1000);
    };

    return (
        <div className="login-form">
            <div className="login-container">
                <h2>Login</h2>
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

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <div className="extra-options">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <p><a href="/forgot-password">Forgot your password?</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
