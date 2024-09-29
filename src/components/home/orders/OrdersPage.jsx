import React from 'react'
import img from "../../images/services.jpg"
import Back from "../../common/Back"
import Orders from './Orders'

function OrdersPage() {
  return (
    <>
      <section className='services mb'>
        <Back name='Orders' title='Orders -See All Your Orders' cover={img} />
        <div className='featured container'>
          <Orders />
        </div>
      </section>
    </>
  )
}

export default OrdersPage
