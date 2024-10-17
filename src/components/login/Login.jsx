import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../../config/config';

const LoginForm = () => {
    // Admin - admin.test@example.com
    // Vendor - vendor.test@gmail.com
    // CSR - abc@gmail.com
    // User - ab@gmail.com
    // Vendor - vendorc@example.com - Password123!
    const [email, setEmail] = useState('vendorc@example.com');
    const [password, setPassword] = useState('Password123!');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const regex_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            toast.error('Please Enter the Email');
            return;
        } else if (!regex_email.test(email)) {
            toast.error('Please Enter a Valid Email');
            return;
        } else if (!password) {
            toast.error('Please Enter the Password');
            return;
        } else if (password.length < 8) {
            toast.error('Password Should have at least 8 Characters');
            return;
        }

        fetch(APP_URL + 'Auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseJson) => {
            console.log('User Login Response: ', responseJson);
            setErrorMessage('');

            localStorage.setItem('token', responseJson.token);
            localStorage.setItem('role', responseJson.role);

            toast.success('User Login Successful');

            setTimeout(() => {
                navigate('/home');
            }, 1000);
            
        })
        .catch((error) => {
            console.log('User Login Failed: ', error);
            toast.error('User Login Failed');
        });
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
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <div className="extra-options">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <p><a href="/forgot-password">Forgot your password?</a></p>
                </div>
            </div>
            <ToastContainer className="toast-container" />
        </div>
    );
};

export default LoginForm;
