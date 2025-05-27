import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

// Create product review
const createProductReview = async (productId, reviewData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + productId + '/reviews',
    reviewData,
    config
  );
  return response.data;
};

// Get all products
const getProducts = async (keyword = '', pageNumber = '', category = '', minPrice = '', maxPrice = '') => {
  let url = API_URL + `?keyword=${keyword}&pageNumber=${pageNumber}`;
  
  if (category) {
    url += `&category=${category}`;
  }
  
  if (minPrice) {
    url += `&minPrice=${minPrice}`;
  }
  
  if (maxPrice) {
    url += `&maxPrice=${maxPrice}`;
  }
  
  const response = await axios.get(url);
  return response.data;
};

// Get product details
const getProductDetails = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Get top rated products
const getTopProducts = async () => {
  const response = await axios.get(API_URL + 'top');
  return response.data;
};

// Get featured products
const getFeaturedProducts = async () => {
  const response = await axios.get(API_URL + 'featured');
  return response.data;
};

// Create new product (Admin)
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

// Update product (Admin)
const updateProduct = async (id, productData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, productData, config);
  return response.data;
};

// Delete product (Admin)
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return id;
};

const productService = {
  getProducts,
  getProductDetails,
  getTopProducts,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};

export default productService;