import React from 'react'
import Back from '../common/Back'
import VendorOrders from './VendorOrders'
import "../home/recent/recent.css"
import img from "../images/about.jpg"

function VendorOrdersView() {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='' title='Order Grid - All Your Current Orders' cover={img} /> 
        <div className='container recent'>
          <VendorOrders />
        </div>
      </section>
    </>
  )
}

export default VendorOrdersView
