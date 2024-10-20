import React, { useState, useEffect } from "react";
import { list } from "../../data/Data";
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../../../config/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultImage from '../../images/default.jpeg';

const RecentCard = () => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isAccessToken = localStorage.getItem('token');
    console.log('Access Token : ', isAccessToken);
    setToken(isAccessToken);

    const isRole = localStorage.getItem('role');
    console.log('User Role : ', isRole);
    setRole(isRole);
    
  }, [setToken, setRole]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + 'Product/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Products List Response : ', responseJson);
      setProducts(responseJson);
    })
    .catch(err => console.log('Error getting products : ', err));
  }, [setProducts]);

  const navigate = useNavigate();

  const handleEdit = (product) => {
    navigate('/edit-Product', { state: { product } });
  };  

  const handleDelete = (item) => {
    console.log('Selected Product:', item);
    setSelectedProduct(item);
    setIsDeleteModalOpen(true);
  };  

  const confirmDelete = (_id) => {
    fetch(APP_URL + `Product/delete/${_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then((responseJson) => {
      console.log('Product Delete Response : ', responseJson);
      toast.success('Product Deleted Successfully');
      setProducts(products.filter(product => product._id !== _id));
      window.location.reload();
    })
    .catch((err) => {
      console.log('Error deleting product : ', err.message);
      toast.error(err.message);
    });
  
    setIsDeleteModalOpen(false);
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (e, item) => {
    e.stopPropagation();
    setSelectedProduct(item);
    setProductQuantity(1);
    setIsCartModalOpen(true);
    setIsProductModalOpen(false);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
    setSelectedProduct(null);
  };

  const increaseQuantity = () => {
    setProductQuantity(prevQty => prevQty + 1);
  };

  const decreaseQuantity = () => {
    setProductQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
  };

  const deleteModalAnimation = useSpring({
    opacity: isDeleteModalOpen ? 1 : 0,
    transform: isDeleteModalOpen ? `translateY(0)` : `translateY(-50px)`,
    config: { tension: 200, friction: 15 },
  });

  const productModalAnimation = useSpring({
    opacity: isProductModalOpen ? 1 : 0,
    transform: isProductModalOpen ? `translateY(0)` : `translateY(-50px)`,
    config: { tension: 200, friction: 15 },
  });

  const cartModalAnimation = useSpring({
    opacity: isCartModalOpen ? 1 : 0,
    transform: isCartModalOpen ? `translateY(0)` : `translateY(-50px)`,
    config: { tension: 200, friction: 15 },
  });

  const saveToCart = () => {
    const cartItem = {
      product: selectedProduct,
      quantity: productQuantity,
    };
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProductIndex = cart.findIndex(
      (item) => item.product.id === selectedProduct.id
    );
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += productQuantity;
    } else {
      cart.push(cartItem);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product added to cart', cart);
    toast.success('Product Added to Cart Successfully');

    setTimeout(() => {
      window.location.reload();
      closeCartModal();
    }, 1000);
  };

  return (
    <>
      <div className='content grid3 mtop'>
        {products.map((val, index) => {
          const { productName, category, availableQuantity, price, description, image, stockStatus, categoryStatus, cover, _id } = val;
          const imageUrl = `http://localhost:8080/images/${image}`;
          
          return (
            <div className='box shadow' key={index} onClick={() => handleProductClick(val)}>
              <div className='img'>
                <img
                  src={imageUrl}
                  alt='Product Image'
                  className="p-image"
                  onError={(e) => { e.target.src = DefaultImage; }}
                />
              </div>
              <div className='text'>
                <div className='category flex mb2'>
                  <span
                    style={{
                      background:
                        stockStatus === 1 ? "#25b5791a" :
                        stockStatus === 2 ? "#ff98001a" :
                        "#f1948a1a",
                      color:
                        stockStatus === 1 ? "#25b579" :
                        stockStatus === 2 ? "#ff9800" :
                        "#f1948a"
                    }}
                  >
                    {stockStatus === 1 ? "In Stock" : stockStatus === 2 ? 'Low Stock' :  "Out of Stock"}
                  </span>

                  {role === 'Vendor' ? (
                    <i className="fa-regular fa-pen-to-square" style={{ cursor: 'pointer' }} onClick={() => handleEdit(val)}></i>
                  ) : (
                    category === 'Out of Stock' ? (
                      null
                    ) : (
                      <i className='fa-solid fa-cart-shopping' style={{ cursor: 'pointer' }} onClick={(e) => addToCart(e, val)}></i>
                    )
                  )}
                </div>

                {role === 'Vendor' ? (
                  <div className="flex">
                    <h4>{productName}</h4>
                    <i className="fa-solid fa-trash" style={{ color: '#cd6155', cursor: 'pointer' }} onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(val);
                    }}></i>
                  </div>
                ) : (
                  <h4>{productName}</h4>
                )}
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/ {availableQuantity} Qty.</label>
                </div>
                <span>{category}</span>
              </div>
            </div>
          )
        })}
      </div>

      {isDeleteModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <animated.div className="modal-content" style={deleteModalAnimation} onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            
            <div className="modal-actions">
              <button onClick={() => confirmDelete(selectedProduct.id)} className="confirm-btn">
                Yes, Delete
              </button>

              <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
            </div>
          </animated.div>
        </div>
      )}

      {isProductModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <animated.div className="product-modal-content" style={productModalAnimation} onClick={(e) => e.stopPropagation()}>
            <h2>Product Details</h2>
            <img src={selectedProduct.cover} alt={selectedProduct.name} style={{ width: '100%', height: 'auto' }} />
            <div className="text-content">
              <p><strong>Name:</strong></p>
              <p>{selectedProduct.productName}</p>
            </div>
            <div className="text-content">
              <p><strong>Price:</strong></p>
              <p>{selectedProduct.price}</p>
            </div>
            <div className="text-content">
              <p><strong>Category:</strong></p>
              <p>{selectedProduct.category}</p>
            </div>
            <div className="text-content">
              <p><strong>Quantity:</strong></p>
              <p>{selectedProduct.availableQuantity}</p>
            </div>
            <button onClick={closeProductModal} className="close-btn" style={{ width: '100%'}}>Close</button>
          </animated.div>
        </div>
      )}

      {isCartModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeCartModal}>
          <animated.div className="modal-content" style={cartModalAnimation} onClick={(e) => e.stopPropagation()}>
            <h2>Add to Cart</h2>
            <img src={selectedProduct.cover} alt={selectedProduct.name} style={{ width: '100%', height: 'auto' }} />
            <div className="text-content">
              <p><strong>Name:</strong></p>
              <p>{selectedProduct.productName}</p>
            </div>

            <div className="text-content">
              <p><strong>Price:</strong></p>
              <p>{selectedProduct.price}</p>
            </div>
              
              <div className="quantity-controls">
                <button onClick={decreaseQuantity} className="count-btn">-</button>
                <span style={{ marginRight: '10px'}}>{productQuantity}</span>
                <button onClick={increaseQuantity} className="count-btn">+</button>
              </div>
            <button onClick={saveToCart} className="close-btn" style={{ width: '100%' }}>Add to Cart</button>
            <button onClick={closeCartModal} className="cancel-btn" style={{ width: '100%' }}>Close</button>
          </animated.div>
        </div>
      )}

      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            min-width: 300px;
            max-width: 500px;
            margin-top: 70px
          }
          .product-modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            min-width: 300px;
            max-width: 500px;
          }
          .modal-content img {
            margin-bottom: 20px;
            border-radius: 8px;
          }
          .modal-actions {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          .close-btn, .confirm-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .cancel-btn {
            background-color: #FFF;
            color: #27ae60;
            border: 1px solid #27ae60;
            margin-top: 20px;
            padding: 10px 30px;
          }
          .text-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .quantity-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            align-items: center;
          }
          .quantity-controls button {
            padding: 5px 10px;
            font-size: 1.2rem;
            cursor: pointer;
            border: 1px solid #27ae60;
            background-color: #27ae60;
            color: white;
            border-radius: 5px;
          }
          .quantity-controls span {
            font-size: 1.2rem;
            font-weight: bold;
          }
        `}
      </style>
      <ToastContainer className="toast-container" />
    </>
  );
};

export default RecentCard;
