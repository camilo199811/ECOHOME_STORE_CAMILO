import axios from "axios";

const API = "http://localhost:3000";

export const loginRequest = async (data) => {
  return await axios.post(`${API}/auth/login`, data);
};

export const signupRequest = async (data) => {
  return await axios.post(`${API}/auth/signup`, data);
};