import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../config/config';

function AddProducts() {
  const [productName, setProductName] = useState('');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [image, setImage] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + 'Vendor/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Vendors List : ', responseJson);
      setVendors(responseJson);
    })
    .catch(err => console.log('Error getting vendors list : ', err));
  }, [setVendors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('availableQuantity', availableQuantity);
    formData.append('category', selectedCategory);
    formData.append('description', description);
    if (image) {
      formData.append('imageFile', image);
    }

    try {
      const response = await fetch(APP_URL + 'Product/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add product:', errorText);
        toast.error(`Failed to add product: ${response.statusText}`);
        return;
      }

      const result = await response.json();
      toast.success('Product Added Successfully');
      setTimeout(() => {
          navigate('/blog');
      }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error occurred while adding product');
    }
};

  return (
    <div className="add-products">
      <h1 className="add-products__title">Add Products</h1>
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
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
          >
            {categories.map(category => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
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

        <div className="add-products__form-group">
          <label className="add-products__label">Product Image:</label>
          <input 
            type="file" 
            className="add-products__input" 
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="add-products__button">Add Product</button>
      </form>
      <ToastContainer className="toast-container"/>
    </div>
  );
}

export default AddProducts;
