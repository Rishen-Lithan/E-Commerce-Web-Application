import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../config/config';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../../firebase';

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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // Fetch categories
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
      setCategories(responseJson);
    })
    .catch(err => console.log('Error getting product categories : ', err));
  }, []);

  // Fetch vendors
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
      setVendors(responseJson);
    })
    .catch(err => console.log('Error getting vendors list : ', err));
  }, []);

  // Function to store image in Firebase Storage
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    if (!imageFile) {
      toast.error('Please upload a product image.');
      return;
    }

    try {
      setUploading(true);

      const imageUrl = await storeImage(imageFile);
      setUploading(false);

      const response = await fetch(APP_URL + 'Product/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          price: price,
          availableQuantity: availableQuantity,
          category: selectedCategory,
          description: description,
          ImageUrl: imageUrl
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add product:', errorText);
        toast.error(`Failed to add product: ${response.statusText}`);
        return;
      }

      const result = await response.json();

      console.log('Result : ', result);
      
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
            onChange={(e) => setImageFile(e.target.files[0])}
            accept='image/*'
          />
        </div>

        <button type="submit" className="add-products__button">Add Product</button>
      </form>
      <ToastContainer className="toast-container"/>
    </div>
  );
}

export default AddProducts;
