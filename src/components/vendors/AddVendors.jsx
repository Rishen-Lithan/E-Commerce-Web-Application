import React, { useState, useEffect } from 'react';
import './AddVendors.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../config/config';

function AddVendors() {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + 'Category/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Product Categories : ', responseJson);
      setCategories(responseJson);
    })
    .catch(err => console.log('Error getting product categories : ', err));
  }, [setCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (vendorName === '') {
      toast.error('Please Enter Vendors Name');
      return;
    } else if (vendorEmail === '') {
      toast.error('Please Enter Vendors Email');
      return;
    } else if (!regex_email.test(vendorEmail)) {
      toast.error('Please Enter a Valid Email');
      return;
    } else if (vendorPassword === '') {
      toast.error('Please Enter Vendors Password');
      return;
    } else if (vendorPassword.length < 8) {
      toast.error('Password should have at least 8 Characters');
      return;
    } else if (selectedCategory === '') {
      toast.error('Please Select a Category');
      return;
    }

    const token = localStorage.getItem('token');

    console.log('Token : ', token);
    
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + 'Vendor/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        vendorName: vendorName,
        email: vendorEmail,
        password: vendorPassword,
        category: selectedCategory
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create vendor: ' + response.status);
      }
      return response.json();
    })
    .then((responseJson) => {
      console.log('Vendor Create Response : ', responseJson);
      toast.success('Vendor Added Successfully');
      setTimeout(() => {
        navigate('/vendors');
      }, 1000);
    })
    .catch(err => {
      console.error('Error creating vendor : ', err);
      toast.error('Failed to create vendor');
    });
    
  };

  return (
    <div className="add-vendors">
      <h1 className="add-vendors__title">Add Vendors</h1>
      <form onSubmit={handleSubmit} className="add-vendors__form">
        <div className="add-vendors__form-group">
          <label className="add-vendors__label">Vendor Name:</label>
          <input 
            type="text" 
            className="add-vendors__input" 
            value={vendorName} 
            onChange={(e) => setVendorName(e.target.value)}  
          />
        </div>

        <div className="add-vendors__form-group">
          <label className="add-vendors__label">Vendor Email:</label>
          <input 
            type="email" 
            className="add-vendors__input" 
            value={vendorEmail} 
            onChange={(e) => setVendorEmail(e.target.value)}  
          />
        </div>

        <div className="add-vendors__form-group">
          <label className="add-vendors__label">Vendor Password:</label>
          <input 
            type="password" 
            className="add-vendors__input" 
            value={vendorPassword} 
            onChange={(e) => setVendorPassword(e.target.value)}  
          />
        </div>

        <div className="add-vendors__form-group">
          <label className="add-vendors__label">Category:</label>
          <select 
            className="add-vendors__input" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}  
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-vendors__button">Create Vendor</button>
      </form>
      <ToastContainer className="toast-container" />
    </div>
  );
}

export default AddVendors;
