import React from "react"

const OrderBack = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'>
        <div className='container'>
          <span>{name}</span>
          <h1>{title}</h1>
        </div>
        <img src={cover} alt='' onError={(e) => e.target.style.display = 'none'} />
      </div>
    </>
  )
}

export default OrderBack
