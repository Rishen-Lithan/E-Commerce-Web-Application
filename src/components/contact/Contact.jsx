import React, { useState } from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  // Sample notifications data
  const [notifications] = useState([
    "Your order #A001 has been shipped.",
    "New product updates are available.",
    "Your password was successfully changed.",
    "Reminder: Complete your profile for more benefits.",
  ])

  return (
    <>
      <section className='contact mb'>
        <Back name='Connect with Us' title='View Your Notifications & Contact Us' cover={img} />
        <div className='container'>
          <div className='content'>
            {/* Notifications Section */}
            <div className='notifications'>
              <h4>Notifications</h4>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            </div>

            {/* Contact Form */}
            <form className='shadow'>
              <h4>Fillup The Form</h4> <br />
              <div>
                <input type='text' placeholder='Name' />
                <input type='text' placeholder='Email' />
              </div>
              <input type='text' placeholder='Subject' />
              <textarea cols='30' rows='10' placeholder='Message'></textarea>
              <button>Submit Request</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
