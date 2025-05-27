import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { format } from 'date-fns';
import {
  getProductDetails,
  createProductReview,
  resetProductDetails,
} from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    navigate('/cart');
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    dispatch(createProductReview({ id, rating, comment }))
      .unwrap()
      .then(() => {
        toast.success('Review submitted successfully');
        setRating(0);
        setComment('');
        setShowReviewForm(false);
        dispatch(getProductDetails(id));
      })
      .catch((err) => toast.error(err));
  };

  const alreadyReviewed = product.reviews?.find(
    (review) => review.user.toString() === user?._id
  );

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{message}</Message>;

  return (
    <div className="container-custom pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <StarRatings
              rating={product.rating}
              starRatedColor="#f59e0b"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
            />
            <span className="text-gray-600">
              {product.numReviews} reviews
            </span>
          </div>

          <div className="text-2xl font-bold text-primary-600">
            ₹{product.price?.toFixed(2)}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Status:</span>
              <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-medium text-lg">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full btn btn-primary flex items-center justify-center space-x-2"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>

            {user && !alreadyReviewed && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="btn btn-primary mb-6"
              >
                Write a Review
              </button>
            )}

            {showReviewForm && (
              <form onSubmit={submitReviewHandler} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#f59e0b"
                    changeRating={setRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="2px"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {product.reviews?.length === 0 ? (
              <Message>No Reviews Yet</Message>
            ) : (
              <div className="space-y-6">
                {product.reviews?.map((review) => (
                  <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-gray-500 text-sm">
                        {format(new Date(review.createdAt), 'PPP')}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#f59e0b"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="2px"
                      />
                    </div>
                    
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;