import axios from "axios";

// REPLACE "https://your-render-url.onrender.com" WITH YOUR ACTUAL RENDER LINK
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://streamify-j9vwfg5mq-mahitsaxena44-6372s-projects.vercel.app/api"; 

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});