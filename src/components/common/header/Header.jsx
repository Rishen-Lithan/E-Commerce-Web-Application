import React, { useState } from "react";
import "./header.css";
import { nav, adminNav, customerNav } from "../../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated } from "react-spring";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [count, setCount] = useState(4);
  const [role, setRole] = useState("customer"); // vendor
  const [isOpen, setIsOpen] = useState(false);

  const initialOrders = [
    {
      products: [
        {
          productImage: "https://via.placeholder.com/100",
          productName: "Product 1",
          productId: "12345",
          productCategory: "Category A",
          quantity: 2,
        },
      ],
    },
    {
      products: [
        {
          productImage: "https://via.placeholder.com/100",
          productName: "Product 2",
          productId: "67890",
          productCategory: "Category B",
          quantity: 1,
        },
        {
          productImage: "https://via.placeholder.com/100",
          productName: "Product 3",
          productId: "54321",
          productCategory: "Category C",
          quantity: 3,
        },
      ],
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("User Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleModal = () => setIsOpen(!isOpen);

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
              {role === "admin" ? (
                adminNav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              ) : role === "customer" ? (
                customerNav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              ) : (
                nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="button flex">
            {role === "vendor" ? (
              <button className="btn1 my-orders-btn">
                <span>{count}</span> Notifications
              </button>
            ) : null}

            {role === "customer" ? (
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
        <ToastContainer />
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
              {orders.map((order, orderIndex) => (
                <div key={orderIndex} className="order-section">
                  {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="product-item">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="product-image"
                      />
                      <div className="product-details">
                        <p><strong>Name:</strong> {product.productName}</p>
                        <p><strong>Category:</strong> {product.productCategory}</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="purchaseBtn" onClick={toggleModal}>
                Purchase Order
              </button>
            </div>
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
          padding-top: 10px;
          border-top: 1px solid #eee;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .purchaseBtn {
          background: #27ae60;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 5px;
          width: 100%;
        }

        .closeBtn, .close {
          background: #27ae60;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 5px;
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
