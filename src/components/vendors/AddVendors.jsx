import React, { useState } from 'react';
import './AddVendors.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddVendors() {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Vendor Added Successfully');

    setTimeout(() => {
        navigate('/vendors');
    }, 1000);
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
            min="0" 
          />
        </div>

        <div className="add-vendors__form-group">
          <label className="add-vendors__label">Vendor Password:</label>
          <input 
            type="password" 
            className="add-vendors__input" 
            value={vendorPassword} 
            onChange={(e) => setVendorPassword(e.target.value)}  
            min="0" 
          />
        </div>

        <button type="submit" className="add-vendors__button">Create Vendor</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddVendors;
