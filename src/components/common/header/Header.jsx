import React, { useState } from "react"
import "./header.css"
import { nav, adminNav } from "../../data/Data"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [count, setCount] = useState(4);
  const [role, setRole] = useState('vendor');

  const navigate = useNavigate(); // Update usage here

  const handleLogout = () => {
    toast.success('User Logout Successfully')
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo.png' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
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

          <div className='button flex'>
            {role === 'vendor' ? (
                <button className="btn1 my-orders-btn">
                  <span>{count}</span>Notifications
                </button>
            ) : (
              <button className="btn1 my-orders-btn">
                <span>{count}</span> My Orders
              </button>
            )}
            
            
            <button className='btn1 sign-in-btn' onClick={handleLogout}>
              <i className='fa fa-sign-out'></i> Sign Out
            </button>
          </div>
          
          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
        <ToastContainer />
      </header>
    </>
  )
}

export default Header
