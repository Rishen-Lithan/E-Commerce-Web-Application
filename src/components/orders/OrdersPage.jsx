import React from 'react'
import img from "../images/services.jpg"
import Back from "../common/Back"
import Orders from './Orders'
import { useNavigate } from 'react-router-dom'; 

function OrdersPage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/cancel-requests');
      }
    const button = <button onClick={handleNavigate}>Cancel Requests</button>;
  return (
    <>
      <section className='services mb'>
        <Back name='Orders' title='Orders -See All Your Orders' cover={img} button={button} />
        <div className='featured container'>
          <Orders />
        </div>
      </section>
    </>
  )
}

export default OrdersPage
