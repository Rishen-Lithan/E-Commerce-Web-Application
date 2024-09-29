import React from "react"

const TopCard = ({ name, title, cover, button }) => {
  return (
    <>
      <div className='back'>
        <div className='container'>
          <span>{name}</span>
          <h1>{title}</h1>
          {button && <div>{button}</div>}
        </div>
        <img src={cover} alt='' />
      </div>
    </>
  )
}

export default TopCard
