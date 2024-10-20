import React, { useState, useEffect } from 'react';
import './VendorOrders.css';
import { APP_URL } from '../../config/config';

function VendorOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch( APP_URL + 'Order/vendor-orders', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredOrders = data.filter((order) => order.orderStatus === 0);
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const markAsDelivered = (orderId, productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(`${APP_URL}Order/update-order-item-status/${orderId}/${productId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderStatus: 5,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to mark as delivered');
        }
        return response.json();
      })
      .then((data) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId
              ? {
                  ...order,
                  orderItems: order.orderItems.map((item) =>
                    item.productId === productId
                      ? { ...item, orderItemStatus: 5 }
                      : item
                  ),
                }
              : order
          )
        );
        console.log(`Order ${orderId} for product ${productId} marked as delivered`);
      })
      .catch((error) => {
        console.error('Error marking as delivered:', error);
      });
  };

  return (
    <div className="cards-container">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="card">
            <h3>{order.orderId}</h3>
            <p>Email: {order.email}</p>
            <div className="order-items">
              <h4>Order Items</h4>
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <span>Product: {item.productName}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.unitPrice}</span>
                  <button
                    className="mark-delivered-button"
                    onClick={() => markAsDelivered(order.orderId, item.productId)}
                    disabled={item.orderItemStatus === 5}
                  >
                    {item.orderItemStatus === 5 ? 'Delivered' : 'Mark as Delivered'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
}

export default VendorOrders;
