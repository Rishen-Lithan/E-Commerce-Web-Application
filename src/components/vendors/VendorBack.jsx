import React from "react"

const Back = ({ name, title, cover, children }) => {
    return (
      <div className="back">
        <div className='container'>
          <span>{name}</span>
          <h1>{title}</h1>
          {children}
        </div>
        <img src={cover} alt={name} />
      </div>
    );
  };
  
  export default Back;
  