import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend API URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;