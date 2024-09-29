import React, { useState } from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const [role, setRole] = useState('customer');

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add-Product');
  }

  const button = <button onClick={handleNavigate}>Add Product</button>;

  return (
    <>
      <section className='blog-out mb'>
        {role === 'vendor' ? (
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
