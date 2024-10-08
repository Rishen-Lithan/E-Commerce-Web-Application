import React, { useState, useEffect } from 'react';
import './Orders.css';
import { useSpring, animated } from 'react-spring';
import { APP_URL } from '../../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [role, setRole] = useState('admin');
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [cancellationNote, setCancellationNote] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cancelOrderNote, setCancelOrderNote] = useState('');

  // API GET Request to fetch data
  const fetchOrders = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch(APP_URL + 'Order/user-orders', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('User Orders : ', responseJson);
      setOrders(responseJson);
    })
    .catch(error => console.log('Error getting user orders : ', error));
  };
  
  // useEffect for Fetching
  useEffect(() => {
    fetchOrders();
  }, [setOrders]);
  
  // Modal Functions - I
  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  // Modal Functions - II
  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
    setCancellationNote('');
  };

  // Update Modal Functions - I
  const openUpdateModal = (orderId, quantity, note, address) => {
    setUpdatedQuantity(quantity); 
    setCancellationNote(note || ''); 
    setDeliveryAddress(address || '');
    setSelectedOrderId(orderId);
    setIsUpdateModalOpen(true);
  };
  
  // Update Modal Functions II
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrderId(null);
    setSelectedProductIndex(null);
    setUpdatedQuantity(1);
  };

  // API PUT Request to update functions
  const confirmUpdate = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const orderToUpdate = orders.find((order) => order.id === selectedOrderId);
    if (!orderToUpdate) {
      console.error("Order not found");
      return;
    }
  
    if (!Array.isArray(orderToUpdate.orderItems)) {
      console.error("Order products not found or not an array");
      return;
    }
  
    const updatedOrder = {
      paymentMethod: orderToUpdate.paymentMethod,
      note: cancellationNote || orderToUpdate.note,
      deliveryAddress: deliveryAddress || orderToUpdate.deliveryAddress,
      orderItems: orderToUpdate.orderItems.map((product, index) => ({
        productId: product.productId,
        productName: product.productName,
        quantity: updatedQuantity || product.quantity,
        unitPrice: product.unitPrice,
        vendorId: product.vendorId,
        vendorEmail: product.vendorEmail,
      })),
    };
    
    fetch(APP_URL + `Order/update/${selectedOrderId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order updated:', data);
        fetchOrders();
        closeUpdateModal();
      })
      .catch((error) => {
        console.error('Error updating the order:', error);
      });
  };
  
  // Cancel Modal Function - I
  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };
  
  // Cancel Modal Function - II
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedOrderId(null);
  }

  // Confirm Cancellation
  const confirmCancellation = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === selectedOrderId
          ? { ...order, orderStatus: 'cancelled' }
          : order
      )
    );
    closeModal();
  };

  // Cancel Order Function
  const cancelOrder = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    // Send the POST request to cancel the order
    fetch(`${APP_URL}Order/request-cancel/${selectedOrderId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: cancellationNote // Pass the cancellation note in the body
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to cancel the order');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Order cancelled:', data);
        toast.success(data);
        fetchOrders();
  
        // Close the modal
        closeCancelModal();
      })
      .catch((error) => {
        console.error('Error cancelling the order:', error);
      });
  };
  

  // Modal Animation - I
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

  // Modal Animation - II
  const cancelModalAnimation = useSpring({
    opacity: isCancelModalOpen ? 1 : 0,
    transform: isCancelModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

  // Modal Animation - III
  const updateModalAnimation = useSpring({
    opacity: isUpdateModalOpen ? 1 : 0,
    transform: isUpdateModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

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

  // Status Priority Function
  const getStatusPriority = (status) => {
    switch (status) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      default:
        return 6;
    }
  };

  // Sort Orders by Status
  const sortOrdersByStatus = () => {
    const sortedOrders = [...orders].sort(
      (a, b) => getStatusPriority(a.orderStatus) - getStatusPriority(b.orderStatus)
    );
    setOrders(sortedOrders);
    console.log('Order Status : ', sortedOrders);
  };

  // onChange Function - I
  const handleQuantityChange = (e) => {
    setUpdatedQuantity(parseInt(e.target.value));
  };
  
  // onChange Function - II
  const handleNoteChange = (e) => {
    setCancellationNote(e.target.value);
  };
  
  // onChange Function - III
  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  // onChange Function - IV
  const handleCancelOrderNoteChange = (e) => {
    setCancelOrderNote(e.target.value);
  };

  return (
    <div className="orders-container">
      <p className='notice'>Your Orders which are requested to cancel are still appearing here. When the CSR accept cancellation, it will move to the cancel orders</p>
      <div className="button-container">
        <button onClick={sortOrdersByStatus} className="sort-button">
          Sort by Status
        </button>
      </div>

      {Array.isArray(orders) && orders.length === 0 ? (
        <p className="no-orders-message">No orders available.</p>
      ) : (
        Array.isArray(orders) && orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order ID: {order.orderId}</h2>

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

            {order.orderStatus === 'Request to cancel' && role === 'admin' ? (
              <button
                className='cancel-btn'
                onClick={() => openModal(order.orderId)}
              >
                Confirm Cancellation
              </button>
            ) : null}

            {(order.orderStatus === 0) ? (
              <>
              {order.orderItems.map((product) => (
                <>
                  <button
                    className='update-btn'
                    onClick={() => openUpdateModal(order.id, product.quantity, order.note, order.deliveryAddress)}
                  >
                    Update Order
                  </button>
                  <button className='cancel-btn' onClick={() => openCancelModal(order.id)}>
                    Cancel Order
                  </button>
                </>
              ))}
                
              </>
            ) : null}

            {(order.orderStatus === 'processing' || order.orderStatus === 'delivery') && (role === 'admin' || role === 'CSR') ? (
              <button className='deliver-btn'>
                Mark as Delivered
              </button>
            ) : null}
          </div>
        ))
      )}

      {isModalOpen && (
        <animated.div style={modalAnimation} className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to confirm the order cancellation?</h3>
            <textarea
              placeholder="Leave a note about the cancellation"
              value={cancellationNote}
              onChange={handleNoteChange}
              className="cancel-note"
            />
            <button onClick={confirmCancellation} className="confirm-btn">
              Yes, Cancel
            </button>
            <button onClick={closeModal} className="close-btn">
              No, Go Back
            </button>
          </div>
        </animated.div>
      )}

      {isCancelModalOpen && (
        <animated.div style={cancelModalAnimation} className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to cancel the order?</h3>
            <textarea
              placeholder="Leave a note about the cancellation"
              value={cancelOrderNote}
              onChange={handleCancelOrderNoteChange}
              className="cancel-note"
            />
            <button onClick={cancelOrder} className="confirm-btn">
              Yes, Cancel
            </button>
            <button onClick={closeCancelModal} className="close-btn">
              No, Go Back
            </button>
          </div>
        </animated.div>
      )}

      {isUpdateModalOpen && (
        <animated.div style={updateModalAnimation} className="modal">
          <div className="update-modal-content">
            <h3>Update your Order before dispatch</h3>
            
            <input
              type="number"
              value={updatedQuantity}
              onChange={handleQuantityChange}
              min="1"
              className="quantity-input"
            />

            <textarea
              placeholder="Update Your Delivery Note"
              value={cancellationNote}
              onChange={handleNoteChange}
              className="cancel-note"
            />

            <textarea
              placeholder="Update Your Delivery Address"
              value={deliveryAddress}
              onChange={handleAddressChange}
              className="cancel-note"
            />
            
            <button onClick={confirmUpdate} className="update-confirm-btn">
              Update
            </button>
            <button onClick={closeUpdateModal} className="update-close-btn">
              Cancel
            </button>
          </div>
        </animated.div>
      )}
      
    </div>
  );
}

export default Orders;
