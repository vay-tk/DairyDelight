import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import {
  getOrderConfirmationEmail,
  getAdminOrderNotification,
  getOrderStatusUpdateEmail,
} from '../utils/emailTemplates.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Send order confirmation email to customer
  await sendEmail({
    email: req.user.email,
    subject: 'Order Confirmation - DairyDelight',
    html: getOrderConfirmationEmail(createdOrder, req.user),
  });

  // Send notification to admin
  const admins = await User.find({ role: 'admin' });
  for (const admin of admins) {
    await sendEmail({
      email: admin.email,
      subject: 'New Order Received - DairyDelight',
      html: getAdminOrderNotification(createdOrder, req.user),
    });
  }

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Check if the user requesting is admin or the order belongs to the user
    if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error('Not authorized to view this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    const previousStatus = order.status;
    order.status = req.body.status || order.status;
    
    // If status is updated to delivered, set deliveredAt
    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    // Send status update email if status has changed
    if (previousStatus !== updatedOrder.status) {
      await sendEmail({
        email: order.user.email,
        subject: 'Order Status Update - DairyDelight',
        html: getOrderStatusUpdateEmail(updatedOrder, order.user),
      });
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
});

export {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders,
};