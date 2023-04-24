import axios from "axios";

const local = import.meta.env.VITE_APP_LOCAL_URL;
const prod = import.meta.env.VITE_APP_PROD_URL;

const api = axios.create({
  baseURL: local,

  withCredentials: true,

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type" : "multipart/form-data",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  },
});

export default api;
