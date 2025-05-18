import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders/';

// Create new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get order details
const getOrderDetails = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Get logged in user's orders
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'myorders', config);
  return response.data;
};

// Get all orders (admin)
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update order status (admin)
const updateOrderStatus = async (id, status, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + id + '/status',
    { status },
    config
  );
  return response.data;
};

const orderService = {
  createOrder,
  getOrderDetails,
  getMyOrders,
  getOrders,
  updateOrderStatus,
};

export default orderService;