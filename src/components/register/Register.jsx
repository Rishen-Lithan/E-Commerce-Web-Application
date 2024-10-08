import React, { useState } from 'react';
import './RegisterForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
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

        fetch(APP_URL + 'Auth/register', {
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
            console.log('User Registration Response: ', responseJson);
            setErrorMessage('');

            toast.success('User Registration Successful');
            
            setTimeout(() => {
                navigate('/')
            }, 2000);
        })
        .catch((error) => {
            console.log('User Registration Failed: ', error);
            toast.error('User Registration Failed');
        });
        
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
                type="text" 
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
