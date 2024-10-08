import React, { useState, useEffect } from "react";
import "./header.css";
import { nav, adminNav, customerNav, csrNav } from "../../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [count, setCount] = useState(4);
  const [role, setRole] = useState("");
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isAccessToken = localStorage.getItem('token');
    console.log('Access Token : ', isAccessToken);
    setToken(isAccessToken);

    const isRole = localStorage.getItem('role');
    console.log('User Role : ', isRole);
    setRole(isRole);
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');    
  
    toast.success("User Logout Successfully");
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart Data : ', cart);
    setOrders(cart);
  }, [setOrders]);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const clearCart = () => {
    setOrders([]);
    localStorage.removeItem('cart');
    toast.success('Cart Cleared Successfully');
    console.log('Cart has been cleared and modal closed');
    window.location.reload();
  };
  
  const createOrder = async () => {
    const orderItems = orders.map(order => ({
      productId: order.product.id,           
      productName: order.product.productName,
      quantity: order.quantity,
      unitPrice: order.product.price,
      vendorId: order.product.vendorId,
      vendorEmail: order.product.vendorEmail
    }));
  
    const orderData = {
      paymentMethod: 1,
      note: deliveryNote,
      deliveryAddress: deliveryAddress,
      orderItems: orderItems
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/Order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        const contentType = response.headers.get('content-type');
  
        let result;
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
          toast.success('Order placed successfully!');
        } else {
          result = await response.text();
          toast.success(result);
        }
        
        localStorage.removeItem('cart');
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(`Order failed: ${error.message}`);
      }
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error('An error occurred while placing the order.');
    }
  };

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleDeliveryNote = (e) => {
    setDeliveryNote(e.target.value);
  }
  
  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0%)` : `translateY(-100%)`,
    config: { tension: 200, friction: 15 },
  });

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="Logo" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {role === "Admin" ? (
                adminNav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              ) : role === "User" ? (
                customerNav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              ) : role === "Vendor" ? (
                nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              ) : (
                csrNav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="button flex">
            {role === "User" ? (
              <button className="btn1 my-orders-btn" onClick={toggleModal}>
                My Cart
              </button>
            ) : null}

            <button className="btn1 sign-in-btn" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
        <ToastContainer className="toast-container" />
      </header>

      {/* Modal for Cart Products */}
      {isOpen && (
        <animated.div style={modalAnimation} className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">My Cart</h5>
              <button type="button" className="close" onClick={toggleModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              {orders && orders.length > 0 ? (
                <>
                  {orders.map((order, orderIndex) => {
                    const imageUrl = `http://localhost:8080/images/${order.product.image}`;

                    return (
                      <div key={orderIndex} className="order-section">
                        <div className="product-item">
                          <img
                            src={imageUrl}
                            alt={order.product.productName}
                            className="product-image"
                          />
                          <div className="product-details">
                            <p><strong>Name:</strong> {order.product.productName}</p>
                            <p><strong>Category:</strong> {order.product.category}</p>
                            <p><strong>Price:</strong> ${order.product.price}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <textarea
                    placeholder="Enter Your Delivery Address"
                    className="cancel-note"
                    value={deliveryAddress}
                    onChange={handleAddressChange}
                  />

                  <textarea
                    placeholder="Enter Your Delivery Note"
                    className="cancel-note"
                    value={deliveryNote}
                    onChange={handleDeliveryNote}
                  />
                </>
              ) : (
                <p>No products in the cart.</p>
              )}
            </div>

            {orders && orders.length > 0 && (
              <div className="modal-footer">
                <button className="purchaseBtn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="purchaseBtn" onClick={createOrder}>
                  Purchase Order
                </button>
              </div>
            )}
          </div>
        </animated.div>
      )}

      <style>{`
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .modal-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .modal-body {
          padding: 20px 0;
        }

        .order-section {
          margin-bottom: 15px;
        }

        .product-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          width: 100%;
          height: 100px;
        }

        .product-image {
          width: 80px;
          height: 80px;
          margin-right: 15px;
          border-radius: 5px;
          object-fit: cover;
          margin-top: 20px;
          margin-left: 10px;
        }

        .product-details {
          flex-grow: 1;
        }

        .product-details p {
          margin: 2px 0;
          text-align: left;
        }

        .modal-footer {
          display: flex;
          gap: 10px; /* Adds spacing between buttons */
          padding-top: 10px;
          border-top: 1px solid #eee;
          justify-content: space-between;
        }

        .purchaseBtn, .closeBtn {
          background: #27ae60;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 14px;
          border-radius: 5px;
          padding: 10px 0;
          flex: 1; /* Makes buttons take equal width */
          text-align: center;
        }

        .purchaseBtn {
          background-color: #27ae60; /* Change background color for this button */
        }

        .close {
          background: none;
          font-size: 20px;
          color: #27ae60;
        }
      `}</style>

    </>
  );
};

export default Header;
