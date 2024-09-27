import React from 'react'

const Modal = ({ show, handleClose, children }) => {
  return (
    <>
      {show && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <span className='close-btn' onClick={handleClose}>&times;</span>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
