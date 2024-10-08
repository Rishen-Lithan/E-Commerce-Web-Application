import React, { useState, useEffect } from "react";
import img from "../images/services.jpg";
import Back from "./VendorBack";
import "../home/featured/Featured.css";
import VendorCard from "./VendorCard";
import { useNavigate } from 'react-router-dom';

const Vendors = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add-Vendor');
  }

  const navigateToVendorList = () => {
    navigate('/list-Vendors');
  }

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (!storedRole) {
      console.error('No role found');
      return;
    }
    setRole(storedRole);
  }, []);

  return (
    <>
      <section className='services mb'>
        <Back 
          name='Vendors' 
          title='Vendors - All Vendors' 
          cover={img}
        >
          {role === 'User' && (
            <button onClick={navigateToVendorList}>View Vendors</button>
          )}

          {role !== 'User' && (
            <button onClick={handleNavigate}>Add Vendors</button>
          )}
        </Back>

        <div className='featured container'>
          <VendorCard />
        </div>
      </section>
    </>
  );
}

export default Vendors;
