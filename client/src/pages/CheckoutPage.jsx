import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaTruck, FaMoneyBill } from 'react-icons/fa';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    postalCode: user?.address?.postalCode || '',
    country: 'India',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      toast.error('Please fill in all shipping details');
      return;
    }

    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: 'Cash On Delivery',
        totalPrice: total,
      })
    )
      .unwrap()
      .then((order) => {
        dispatch(clearCart());
        navigate(`/orders`);
        toast.success('Order placed successfully!');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container-custom pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaTruck className="mr-2" /> Shipping Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label" htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  className="input"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, address: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="input"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  className="input"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  className="input"
                  value={shippingAddress.country}
                  disabled
                />
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaMoneyBill className="mr-2" /> Payment Method
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Cash On Delivery</p>
              <p className="text-sm text-gray-600">Pay when you receive your order</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full btn btn-primary mt-6"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;