import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import CategoryCard from "./CategoryCard"

const Category = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Category' title='Category -All Category' cover={img} />
        <div className='featured container'>
          <CategoryCard />
        </div>
      </section>
    </>
  )
}

export default Category
