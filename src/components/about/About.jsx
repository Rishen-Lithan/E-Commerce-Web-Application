import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            <p>
              At Trend Mark, we are committed to delivering quality products that enhance your lifestyle. With a passion for excellence and a dedication to customer satisfaction, we bring you a diverse range of offerings tailored to meet your needs. Join us on a journey of discovery and innovation.
            </p>
            <p>
              Founded with the belief that shopping should be simple, enjoyable, and personalized, [Your Company Name] strives to create an exceptional e-commerce experience. Our team works tirelessly to source the best products and ensure you receive the best service. We are here to make every purchase a delight.
            </p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
