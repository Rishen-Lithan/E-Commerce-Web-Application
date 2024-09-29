import React, { useState } from 'react';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function EditProducts() {
  const [productName, setProductName] = useState('');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Product Updated Successfully');

    setTimeout(() => {
        navigate('/blog');
    }, 1000);
    console.log({ productName, vendor, price, availableQuantity, category, description });
  };

  return (
    <div className="add-products">
      <h1 className="add-products__title">Edit Product</h1>
      <form onSubmit={handleSubmit} className="add-products__form">
        <div className="add-products__form-group">
          <label className="add-products__label">Product Name:</label>
          <input 
            type="text" 
            className="add-products__input" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)}  
          />
        </div>
        
        <div className="add-products__form-group">
          <label className="add-products__label">Vendor:</label>
          <select 
            className="add-products__select" 
            value={vendor} 
            onChange={(e) => setVendor(e.target.value)} 
          >
            <option value="">Select Vendor</option>
            <option value="vendor1">Vendor 1</option>
            <option value="vendor2">Vendor 2</option>
            <option value="vendor3">Vendor 3</option>
          </select>
        </div>

        <div className="add-products__form-group">
          <label className="add-products__label">Price:</label>
          <input 
            type="number" 
            className="add-products__input" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}  
            min="0" 
          />
        </div>

        <div className="add-products__form-group">
          <label className="add-products__label">Available Quantity:</label>
          <input 
            type="number" 
            className="add-products__input" 
            value={availableQuantity} 
            onChange={(e) => setAvailableQuantity(e.target.value)}  
            min="0" 
          />
        </div>

        <div className="add-products__form-group">
          <label className="add-products__label">Category:</label>
          <select 
            className="add-products__select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>

        <div className="add-products__form-group">
          <label className="add-products__label">Description:</label>
          <textarea 
            className="add-products__textarea" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}  
            rows="4" 
          ></textarea>
        </div>

        <button type="submit" className="add-products__button">Edit Product</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProducts;
