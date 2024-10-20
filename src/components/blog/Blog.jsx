import React, { useState, useEffect } from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const isAccessToken = localStorage.getItem('token');
    console.log('Access Token : ', isAccessToken);
    setToken(isAccessToken);

    const isRole = localStorage.getItem('role');
    console.log('User Role : ', isRole);
    setRole(isRole);
    
  }, []);

  const handleNavigate = () => {
    navigate('/add-Product');
  }

  const button = <button onClick={handleNavigate}>Add Product</button>;

  return (
    <>
      <section className='blog-out mb'>
        {role === 'Vendor' ? (
          <Back name='Product' title='Product Grid - Our Products' cover={img} button={button}  />
        ) : 
          <Back name='Product' title='Product Grid - Our Products' cover={img} /> 
        }
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Blog
