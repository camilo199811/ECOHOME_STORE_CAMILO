import axios from "axios";

const API = "http://localhost:3000";

export const getMeRequest = async (token) => {
  return await axios.get(`${API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyStatsRequest = async (token) => {
  return await axios.get(`${API}/users/me/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};