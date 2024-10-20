import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Products Listed' subtitle='"Explore our wide range of products and find the perfect fit for your needs!"' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
