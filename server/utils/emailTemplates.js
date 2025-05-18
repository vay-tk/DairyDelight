import { format } from 'date-fns';

export const getOrderConfirmationEmail = (order, user) => {
  const items = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${(item.qty * item.price).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4295c1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #fff; }
          .footer { text-align: center; padding: 20px; background: #f5f5f5; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #f5f5f5; padding: 10px; text-align: left; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Order #${order._id}</p>
          </div>
          
          <div class="content">
            <h2>Thank you for your order, ${user.name}!</h2>
            <p>Your order has been received and is being processed.</p>
            
            <h3>Order Details</h3>
            <p>Order Date: ${format(new Date(order.createdAt), 'PPP')}</p>
            <p>Status: ${order.status}</p>
            
            <h3>Shipping Address</h3>
            <p>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}<br>
              ${order.shippingAddress.postalCode}<br>
              ${order.shippingAddress.country}
            </p>
            
            <h3>Order Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${items}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
                  <td style="padding: 10px;"><strong>₹${order.totalPrice.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div class="footer">
            <p>Thank you for shopping with DairyDelight!</p>
            <p>If you have any questions, please contact us at support@dairydelight.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const getAdminOrderNotification = (order, user) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4295c1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #fff; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received</h1>
            <p>Order #${order._id}</p>
          </div>
          
          <div class="content">
            <h2>Order Details</h2>
            <p>Date: ${format(new Date(order.createdAt), 'PPP')}</p>
            <p>Customer: ${user.name} (${user.email})</p>
            <p>Total Amount: ₹${order.totalPrice.toFixed(2)}</p>
            <p>Items: ${order.orderItems.length}</p>
            
            <p>Please log in to the admin dashboard to process this order.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const getOrderStatusUpdateEmail = (order, user) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4295c1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #fff; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
            <p>Order #${order._id}</p>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name},</h2>
            <p>Your order status has been updated to: <strong>${order.status}</strong></p>
            
            ${order.status === 'Shipped' ? `
              <p>Your order is on its way! You can expect delivery within 2-3 business days.</p>
            ` : order.status === 'Delivered' ? `
              <p>Your order has been delivered. We hope you enjoy your products!</p>
            ` : ''}
            
            <p>Thank you for shopping with DairyDelight!</p>
          </div>
        </div>
      </body>
    </html>
  `;
};