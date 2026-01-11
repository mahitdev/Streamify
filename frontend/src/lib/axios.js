import axios from "axios";

// REPLACE "https://your-render-url.onrender.com" WITH YOUR ACTUAL RENDER LINK
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://streamify-backend-qj9s.onrender.com/api"; 

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});