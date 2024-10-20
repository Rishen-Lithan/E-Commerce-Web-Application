import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Product ' subtitle='Find new & featured products located in our store.' />

          <form className='flex'>
            <div className='box'>
              <span>Product Name</span>
              <input type='text' placeholder='Name' />
            </div>
            <div className='box'>
              <span>Product Category</span>
              <input type='text' placeholder='Product Category' />
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Search Here</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
