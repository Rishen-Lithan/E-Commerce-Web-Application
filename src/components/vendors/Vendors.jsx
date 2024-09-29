import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import VendorCard from "./VendorCard"
import { useNavigate } from 'react-router-dom'; 

const Vendors = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/add-Vendor');
    }
    const button = <button onClick={handleNavigate}>Add Vendors</button>;
  return (
    <>
      <section className='services mb'>
        <Back name='Vendors' title='Vendors -All Vendors' cover={img} button={button} />
        <div className='featured container'>
          <VendorCard />
        </div>
      </section>
    </>
  )
}

export default Vendors
