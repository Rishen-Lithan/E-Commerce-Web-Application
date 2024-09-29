import React, { useState } from "react";
import { list } from "../../data/Data";
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";

const RecentCard = () => {
  const [role, setRole] = useState('customer');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit-Product');
  };

  const handleDelete = (item) => {
    setSelectedProduct(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleted item:", selectedProduct);
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

  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { cover, category, name, price, type, qty } = val;
          return (
            <div className='box shadow' key={index} onClick={() => handleProductClick(val)}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex mb2'>
                  <span
                    style={{
                      background:
                        category === "In Stock" ? "#25b5791a" :
                        category === "Low Stock" ? "#ff98001a" :
                        "#f1948a1a",
                      color:
                        category === "In Stock" ? "#25b579" :
                        category === "Low Stock" ? "#ff9800" :
                        "#f1948a"
                    }}
                  >
                    {category}
                  </span>

                  {role === 'vendor' ? (
                    <i className="fa-regular fa-pen-to-square" style={{ cursor: 'pointer' }} onClick={handleEdit}></i>
                  ) : (
                    category === 'Out of Stock' ? (
                      null
                    ) : (
                      <i className='fa-solid fa-cart-shopping' style={{ cursor: 'pointer' }} onClick={(e) => addToCart(e, val)}></i>
                    )
                  )}
                </div>

                {role === 'vendor' ? (
                  <div className="flex">
                    <h4>{name}</h4>
                    <i className="fa-solid fa-trash" style={{ color: '#cd6155', cursor: 'pointer' }} onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(val);
                    }}></i>
                  </div>
                ) : (
                  <h4>{name}</h4>
                )}
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/ {qty} Qty.</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <animated.div className="modal-content" style={deleteModalAnimation} onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="confirm-btn">Yes, Delete</button>
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
              <p>{selectedProduct.name}</p>
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
              <p>{selectedProduct.qty}</p>
            </div>
            <div className="text-content">
              <p><strong>Type:</strong></p>
              <p>{selectedProduct.type}</p>
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
              <p>{selectedProduct.name}</p>
            </div>

            <div className="text-content">
              <p><strong>Price:</strong></p>
              <p>{selectedProduct.price}</p>
            </div>
              
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <span>{productQuantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            <button onClick={closeCartModal} className="close-btn" style={{ width: '100%' }}>Add to Cart</button>
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
          .close-btn, .confirm-btn, .cancel-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .confirm-btn {
            background-color: #27ae60;
          }
          .cancel-btn {
            background-color: #FFF;
            color: #27ae60;
            border: 1px solid #27ae60
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
    </>
  );
};

export default RecentCard;
