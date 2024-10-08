import React, { useState, useEffect } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import { APP_URL } from '../../config/config';
import './contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch notifications
  const fetchNotifications = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('No token found');
      return;
    }

    fetch(`${APP_URL}CancelNotification/user-notifications`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        toast.error('Error fetching notifications');
        setLoading(false);
      });
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <section className='contact mb'>
        <Back name='Connect with Us' title='View Your Notifications & Contact Us' cover={img} />
        <div className='container'>
          <div className='content'>
            {/* Notifications Section */}
            <div className='notifications'>
              <h4>Notifications</h4>
              {loading ? (
                <p>Loading notifications...</p>
              ) : (
                <div className='notifications-list'>
                  {notifications.length === 0 ? (
                    <p>No notifications available.</p>
                  ) : (
                    notifications.map(notification => (
                      <div key={notification.id} className='notification-card'>
                        <p><strong>Order ID:</strong> {notification.orderId}</p>
                        <p><strong>Message:</strong> {notification.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
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
        <ToastContainer />
      </section>
    </>
  );
};

export default Contact;
