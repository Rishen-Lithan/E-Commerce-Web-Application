import React, { useState } from 'react';
import './RegisterForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        setErrorMessage('');

        setTimeout(() => {
            toast.success('User Registration Successfully')
        }, 2000);
        console.log('Login successful:', { email, password });
    };

  return (
    <div className="login-form">
        <div className="login-container">
            <h2>Register</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            <form onSubmit={handleRegister}>
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
        <ToastContainer />
    </div>

  );
};

export default RegisterForm;
