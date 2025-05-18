import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../redux/slices/orderSlice';
import { getProducts } from '../../redux/slices/productSlice';
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBill } from 'react-icons/fa';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  const { orders, isLoading: ordersLoading } = useSelector((state) => state.orders);
  const { products, isLoading: productsLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts({}));
  }, [dispatch]);

  // Calculate statistics
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;
  const totalRevenue = orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;
  const pendingOrders = orders?.filter(order => order.status === 'Processing').length || 0;

  if (ordersLoading || productsLoading) return <Loader />;

  return (
    <div className="container-custom pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <FaShoppingCart className="text-2xl text-primary-600" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{totalOrders}</span>
          </div>
          <h3 className="text-gray-600">Total Orders</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <FaBox className="text-2xl text-secondary-600" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{totalProducts}</span>
          </div>
          <h3 className="text-gray-600">Total Products</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaMoneyBill className="text-2xl text-green-600" />
            </div>
            <span className="text-3xl font-bold text-gray-800">₹{totalRevenue.toFixed(2)}</span>
          </div>
          <h3 className="text-gray-600">Total Revenue</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaShoppingCart className="text-2xl text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{pendingOrders}</span>
          </div>
          <h3 className="text-gray-600">Pending Orders</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
          <p className="text-gray-600">Add, edit, or remove products from your inventory</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Manage Orders</h3>
          <p className="text-gray-600">View and update order status</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.user?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;