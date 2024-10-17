import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_URL } from '../../config/config';

function EditProducts() {
  const location = useLocation();
  const { product } = location.state || {};

  const [productName, setProductName] = useState('');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }
  
    console.log('Product Details - Category:', product);
    
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
      setCategoryList(responseJson);
      console.log('Category Response : ', responseJson);
  
      if (product && product.category) {
        const matchingCategory = responseJson.find((cat) => {
          console.log('Comparing:', cat.categoryName, 'with', product.category);
          
          return cat.categoryName.toLowerCase().trim() === product.category.toLowerCase().trim();
        });
  
        if (matchingCategory) {
          setSelectedCategory(matchingCategory.categoryName);
          console.log('Matched Category : ', matchingCategory);
        } else {
          console.log('No matching category found.');
        }
      }
    })
    .catch(err => console.log('Error getting product categories : ', err));
  }, [product]);
  
  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setVendor(product.vendorEmail || '');
      setPrice(product.price || '');
      setAvailableQuantity(product.availableQuantity || '');
      setDescription(product.description || '');
      setImage(product.image || '');
      setId(product.id || '');
    }
  }, [product]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + `Product/update-noimage/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productName: productName,
        price: price,
        availableQuantity: availableQuantity,
        category: selectedCategory,
        description: description
      })
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Product Update Response', responseJson);
      toast.success('Product Updated Successfully');
    })
    .catch((error) => {
      console.log('Error updating Product : ', error);
      toast.error(error)
    })

    setTimeout(() => {
      navigate('/blog');
    }, 1000);
    console.log({ productName, vendor, price, availableQuantity, selectedCategory, description, image });
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
          <input 
            type="text" 
            className="add-products__input" 
            value={vendor} 
            onChange={(e) => setVendor(e.target.value)}  
            disabled
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
            <option value="">Select Category</option>
            {categoryList.map(category => (
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

        <button type="submit" className="add-products__button">Edit Product</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProducts;
