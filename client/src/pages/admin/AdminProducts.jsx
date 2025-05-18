import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../redux/slices/productSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: 'milk',
    countInStock: '',
    description: '',
    image: '',
    isFeatured: false,
  });

  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await dispatch(
          updateProduct({
            id: editProduct._id,
            productData: formData,
          })
        ).unwrap();
        toast.success('Product updated successfully');
      } else {
        await dispatch(createProduct(formData)).unwrap();
        toast.success('Product created successfully');
      }
      setShowModal(false);
      setEditProduct(null);
      setFormData({
        name: '',
        price: '',
        brand: '',
        category: 'milk',
        countInStock: '',
        description: '',
        image: '',
        isFeatured: false,
      });
      dispatch(getProducts({}));
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      image: product.image,
      isFeatured: product.isFeatured,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success('Product deleted successfully');
        dispatch(getProducts({}));
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{message}</Message>;

  return (
    <div className="container-custom pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => {
            setEditProduct(null);
            setFormData({
              name: '',
              price: '',
              brand: '',
              category: 'milk',
              countInStock: '',
              description: '',
              image: '',
              isFeatured: false,
            });
            setShowModal(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.countInStock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.countInStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editProduct ? 'Edit Product' : 'Add Product'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="input"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label" htmlFor="brand">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="input"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    className="input"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="milk">Milk</option>
                    <option value="cheese">Cheese</option>
                    <option value="butter">Butter</option>
                    <option value="curd">Curd</option>
                    <option value="yogurt">Yogurt</option>
                    <option value="paneer">Paneer</option>
                    <option value="ghee">Ghee</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label" htmlFor="countInStock">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="countInStock"
                    className="input"
                    value={formData.countInStock}
                    onChange={(e) =>
                      setFormData({ ...formData, countInStock: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="input"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label" htmlFor="image">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    className="input"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    className="mr-2"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                  />
                  <label htmlFor="isFeatured">Featured Product</label>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  {editProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;