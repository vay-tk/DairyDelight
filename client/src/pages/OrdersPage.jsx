import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { FaBox, FaTruck, FaCheck } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaBox className="text-yellow-500" />;
      case 'Shipped':
        return <FaTruck className="text-blue-500" />;
      case 'Delivered':
        return <FaCheck className="text-green-500" />;
      default:
        return null;
    }
  };

  const generateInvoice = async (order) => {
    const element = document.getElementById(`invoice-${order._id}`);
    if (!element) return;

    element.style.display = 'block';

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order._id}.pdf`);

    element.style.display = 'none';
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{message}</Message>;

  return (
    <div className="container-custom pt-24">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 relative">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID:</p>
                  <p className="font-medium">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="font-medium">₹{order.totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium">{order.status}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Items:</h3>
                <div className="space-y-2">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <Link
                          to={`/product/${item.product}`}
                          className="hover:text-primary-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => generateInvoice(order)}
                className="mt-4 btn btn-outline-primary"
              >
                Download Invoice
              </button>

              {/* Printable PDF Invoice */}
              <div
                id={`invoice-${order._id}`}
                style={{
                  display: 'none',
                  width: '800px',
                  padding: '20px',
                  fontFamily: 'Arial',
                  color: '#333',
                  background: '#fff',
                }}
              >
                <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '24px' }}>🧾 Invoice</h2>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>

                <h3 style={{ marginBottom: '5px' }}>Items:</h3> <br />
                <table width="100%" style={{ borderCollapse: 'collapse', marginBottom: '20px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Qty</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.qty}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.price}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{(item.qty * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>Summary:</h3>
                <p><strong>Delivery Charges:</strong> ₹{order.shippingPrice?.toFixed(2) || '50.00'}</p>
                <p><strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>

                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px' }}>
                  Thank you for your purchase!
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
