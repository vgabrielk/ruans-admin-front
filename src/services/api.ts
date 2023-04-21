import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_PROD_URL,

  withCredentials: true,

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type" : "multipart/form-data",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  },
});

export default api;
