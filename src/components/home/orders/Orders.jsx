import React, { useState } from 'react';
import './Orders.css';
import { useSpring, animated } from 'react-spring';

function Orders() {
  const initialOrders = [
    {
      orderId: 'A001',
      orderStatus: 'processing',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 1',
          productId: '12345',
          productCategory: 'Category A',
          quantity: 2,
        },
      ],
    },
    {
      orderId: 'A002',
      orderStatus: 'delivery',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 2',
          productId: '67890',
          productCategory: 'Category B',
          quantity: 1,
        },
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 3',
          productId: '54321',
          productCategory: 'Category C',
          quantity: 3,
        },
      ],
    },
    {
      orderId: 'A003',
      orderStatus: 'cancelled',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 1',
          productId: '12345',
          productCategory: 'Category A',
          quantity: 2,
        },
      ],
    },
    {
      orderId: 'A004',
      orderStatus: 'dispatch',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 1',
          productId: '12345',
          productCategory: 'Category A',
          quantity: 2,
        },
      ],
    },
    {
      orderId: 'A005',
      orderStatus: 'Request to cancel',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 1',
          productId: '12345',
          productCategory: 'Category A',
          quantity: 2,
        },
      ],
    },
    {
      orderId: 'A005',
      orderStatus: 'Request to cancel',
      products: [
        {
          productImage: 'https://via.placeholder.com/100',
          productName: 'Product 1',
          productId: '12345',
          productCategory: 'Category A',
          quantity: 2,
        },
      ],
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null); // Track the selected product
  const [updatedQuantity, setUpdatedQuantity] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancellationNote, setCancellationNote] = useState('');
  const [role, setRole] = useState('admin');

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
    setCancellationNote('');
  };

  const openUpdateModal = (orderId, productIndex, currentQuantity) => {
    setSelectedOrderId(orderId);
    setSelectedProductIndex(productIndex);
    setUpdatedQuantity(currentQuantity); // Set the current quantity in state
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrderId(null);
    setSelectedProductIndex(null);
    setUpdatedQuantity(1);
  };

  const confirmUpdate = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === selectedOrderId) {
          const updatedProducts = [...order.products];
          updatedProducts[selectedProductIndex].quantity = updatedQuantity;
          return { ...order, products: updatedProducts };
        }
        return order;
      })
    );
    closeUpdateModal();
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId); // Correct line
    setIsCancelModalOpen(true);
  };
  

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedOrderId(null);
  }

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

  const cancelOrder = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === selectedOrderId
          ? {
              ...order,
              orderStatus: order.orderStatus === 'processing' ? 'delivery' : 'processing',
            }
          : order
      )
    );
    closeCancelModal();
};


  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

  const cancelModalAnimation = useSpring({
    opacity: isCancelModalOpen ? 1 : 0,
    transform: isCancelModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

  const updateModalAnimation = useSpring({
    opacity: isUpdateModalOpen ? 1 : 0,
    transform: isUpdateModalOpen ? `translateY(0%)` : `translateY(-50%)`,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#ff9800';
      case 'delivery':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      case 'dispatch':
        return '#2196f3';
      case 'Request to cancel':
        return '#db665a';
      default:
        return '#000';
    }
  };

  const getStatusPriority = (status) => {
    switch (status) {
      case 'processing':
        return 1;
      case 'dispatch':
        return 2;
      case 'request to dispatch':
        return 3;
      case 'delivery':
        return 4;
      case 'cancelled':
        return 5;
      default:
        return 6;
    }
  };

  const sortOrdersByStatus = () => {
    const sortedOrders = [...orders].sort(
      (a, b) => getStatusPriority(a.orderStatus) - getStatusPriority(b.orderStatus)
    );
    setOrders(sortedOrders);
    console.log('Order Status : ', sortedOrders);
  };

  const handleNoteChange = (e) => {
    setCancellationNote(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setUpdatedQuantity(parseInt(e.target.value));
  };

  return (
    <div className="orders-container">
      <div className="button-container">
        <button onClick={sortOrdersByStatus} className="sort-button">
          Sort by Status
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders-message">No orders available.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order ID: {order.orderId}</h2>

            <p style={{ color: getStatusColor(order.orderStatus) }}>
              <strong>Status:</strong> {order.orderStatus}
            </p>

            {order.products.map((product, productIndex) => (
              <div key={productIndex} className="product-card">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-name">{product.productName}</h3>
                  <p><strong>Product ID:</strong> {product.productId}</p>
                  <p><strong>Category:</strong> {product.productCategory}</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
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

            {order.orderStatus === 'processing' || order.orderStatus === 'delivery' ? (
              <>
                <button
                  className='update-btn'
                  onClick={() => openUpdateModal(order.orderId, index, order.products[0].quantity)}
                >
                  Update Order
                </button>
                <button className='cancel-btn' onClick={() => openCancelModal(order.orderId)}>
                  Cancel Order
                </button>
              </>
            ) : null }

            {order.orderStatus === 'processing' || order.orderStatus === 'delivery' && role === 'admin' || role === 'CSR' ? (
              <button className='deliver-btn'>
                Mark as Delivered
              </button>
            ) : null}
          </div>
        ))
      )}

      {/* Cancellation Confirmation Modal */}
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

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <animated.div style={cancelModalAnimation} className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to cancel the order?</h3>
            <textarea
              placeholder="Leave a note about the cancellation"
              value={cancellationNote}
              onChange={handleNoteChange}
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
            <h3>Update Quantity for Order {selectedOrderId}</h3>
            <input
              type="number"
              value={updatedQuantity}
              onChange={handleQuantityChange}
              min="1"
              className="quantity-input"
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
