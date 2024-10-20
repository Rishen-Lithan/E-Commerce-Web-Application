import React, { useState, useEffect } from 'react';
import './Orders.css';
import { APP_URL } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    setRole(currentRole);
  }, [setRole]);

  // API GET Request to fetch data
  const fetchOrders = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch(APP_URL + 'Order/all-orders', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
        const dispatchedOrders = responseJson.filter(order => order.orderStatus === 0 && order.delivered === false);
        setOrders(dispatchedOrders);
      
        console.log('Dispatched Orders: ', dispatchedOrders);
    })
    .catch(error => console.log('Error getting user orders: ', error));
  };
  
  useEffect(() => {
    fetchOrders();
  }, [setOrders]);

  // Function to update order as delivered
  const markAsDelivered = (orderId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('No token found');
      return;
    }

    setLoadingOrderId(orderId);

    fetch(`${APP_URL}Order/change-delivered/${orderId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        delivered: true
      })
    })
    .then(response => {
      if (response.ok) {
        toast.success('Order marked as delivered successfully');
        fetchOrders();
      } else {
        toast.error('Failed to update order status');
      }
    })
    .catch(error => {
      console.error('Error updating order:', error);
      toast.error('An error occurred while updating the order');
    })
    .finally(() => {
      setLoadingOrderId(null);
    });
  };

  // Status Color Function
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return '#ff9800';
      case 1:
        return '#4caf50';
      case 2:
        return '#f44336';
      default:
        return '#000';
    }
  };

  return (
    <div className="orders-container">
      {Array.isArray(orders) && orders.length === 0 ? (
        <p className="no-orders-message">No orders available.</p>
      ) : (
        Array.isArray(orders) && orders.map((order, index) => (
          <div key={index} className="order-card">
            <p style={{ color: getStatusColor(order.orderStatus) }}>
              <strong>Status : </strong> 
              {order.orderStatus === 0 ? 'Pending' : 
                order.orderStatus === 1 ? 'Dispatched' : 
                  order.orderStatus === 2 ? 'Completed' : 'Cancelled'}
            </p>

            {order.orderItems.map((product, productIndex) => (
              <div key={productIndex} className="product-card">
                <div className="product-details">
                  <h3 className="product-name">Product Name: {product.productName}</h3>
                  <p><strong>Total Amount:</strong> LKR {Number(product.totalPrice).toFixed(2)}</p>
                  <p><strong>Unit Price:</strong> LKR {Number(product.unitPrice).toFixed(2)}</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
                </div>
                <div className="product-details">
                  <p><strong>Order Date :</strong> {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Vendor :</strong> {product.vendorEmail}</p>
                  <p><strong>Delivery Address :</strong> {order.deliveryAddress}</p>
                  <p><strong>Delivery Note :</strong> {order.note}</p>
                </div>
              </div>
            ))}

            {order.orderStatus === 0 && (role === 'Admin' || role === "Customer Service Representative") ? (
            <button 
              className='deliver-btn' 
              onClick={() => markAsDelivered(order.id)} 
              disabled={loadingOrderId === order.id} 
            >
              {loadingOrderId === order.id ? 'Marking as Delivered...' : 'Mark as Delivered'}
            </button>
            ) : null}

          </div>
        ))
      )}
      <ToastContainer className="toast-container" />
    </div>
  );
}

export default Orders;
