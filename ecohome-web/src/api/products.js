import axios from "axios";

const API = "http://localhost:3000";

export const getProductsRequest = async () => {
  return await axios.get(`${API}/products`);
};

export const createProductRequest = async (product, token) => {
  return await axios.post(`${API}/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProductRequest = async (id, product, token) => {
  return await axios.put(`${API}/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProductRequest = async (id, token) => {
  return await axios.delete(`${API}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};