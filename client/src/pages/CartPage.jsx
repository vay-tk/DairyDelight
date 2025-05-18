import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(
      addToCart({
        ...item,
        qty: Math.max(1, Math.min(item.countInStock, qty)),
      })
    );
  };

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="container-custom pt-24">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-lg font-medium hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                  <div className="text-primary-600 font-medium">
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQtyHandler(item, item.qty - 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-medium text-lg">{item.qty}</span>
                  <button
                    onClick={() => updateQtyHandler(item, item.qty + 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCartHandler(item.product)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
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

            {shipping > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <button
              onClick={checkoutHandler}
              className="w-full btn btn-primary"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;