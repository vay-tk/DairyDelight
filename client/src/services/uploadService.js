import axios from 'axios';

const API_URL = 'http://localhost:5000/api/upload/';

// Upload product image
const uploadProductImage = async (formData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

const uploadService = {
  uploadProductImage,
};

export default uploadService;