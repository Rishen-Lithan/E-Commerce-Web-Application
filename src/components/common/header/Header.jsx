import React, { useState } from "react"
import "./header.css"
import { nav, adminNav } from "../../data/Data"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [count, setCount] = useState(4);
  const [role, setRole] = useState(''); // vendor
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate(); // Update usage here

  const handleLogout = () => {
    toast.success('User Logout Successfully')
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }

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
            <ul className={navList ? 'small' : 'flex'}>
              {role === 'vendor' ? (
                adminNav.map((list, index) => (
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
            {role === 'vendor' ? (
              <button className="btn1 my-orders-btn">
                <span>{count}</span> Notifications
              </button>
            ) : (
              <button className="btn1 my-orders-btn" onClick={toggleModal}>
                <span>{count}</span> My Orders
              </button>
            )}

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

        {isOpen && (
          <animated.div style={modalAnimation} className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Orders</h5>
                <button type="button" className="close" onClick={toggleModal}>
                 X
                </button>
              </div>
              <div className="modal-body">
                <p>Here are your recent orders:</p>
                <ul>
                  <li>Order #1</li>
                  <li>Order #2</li>
                  <li>Order #3</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="closeBtn" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </div>
          </animated.div>
        )}
      </header>

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
        }

        .modal-title {
          margin: 0;
        }

        .modal-body {
          padding: 10px 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
        }

        .close {
          background: #FFF;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #27ae60
        }
      `}</style>
    </>
  )
}

export default Header
