import React, { useState, useEffect } from 'react';
import './CancelRequests.css'; // Optional CSS for styling
import { APP_URL } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancelRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(null); // Loading state to track request progress

  // Function to fetch cancel requests
  const fetchCancelRequests = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('No token found');
      return;
    }

    fetch(`${APP_URL}Notification/cancel-requests`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
        console.log('Cancel Requests:', data);
      })
      .catch((error) => {
        console.error('Error fetching cancel requests:', error);
        toast.error('Error fetching cancel requests');
      });
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchCancelRequests();
  }, []);

  // Function to confirm cancellation
  const confirmCancellation = (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found');
      return;
    }

    // Set loading to the orderId to indicate it's being processed
    setLoading(orderId);

    console.log('Order ID : ', orderId);
    

    fetch(`${APP_URL}Order/cancel-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: "Your Order Cancelled Successfully", // Add note attribute in the body
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success(`Cancellation confirmed for Order ID: ${orderId}`);
          fetchCancelRequests(); // Refresh the list after successful cancellation
        } else {
          toast.error('Failed to confirm cancellation');
        }
      })
      .catch((error) => {
        console.error('Error confirming cancellation:', error);
        toast.error('An error occurred while confirming cancellation');
      })
      .finally(() => {
        setLoading(null); // Reset loading state after the request completes
      });
  };

  return (
    <div className="cancel-requests-container">
      <h1>Cancel Requests</h1>
      {requests.length === 0 ? (
        <p>No cancel requests available.</p>
      ) : (
        <div className="cancel-requests-list">
          {requests.map((request) => (
            <div key={request.id} className="cancel-request-card">
              <p><strong>User ID:</strong> {request.userId}</p>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Order ID:</strong> {request.orderId}</p>
              <p><strong>Message:</strong> {request.message}</p>
              <button
                className="confirm-btn"
                onClick={() => confirmCancellation(request.orderId)}
                disabled={loading === request.orderId} 
              >
                {loading === request.orderId ? 'Processing...' : 'Confirm Cancellation'}
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer className="toast-container" />
    </div>
  );
}

export default CancelRequests;
