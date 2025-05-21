import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://portfolioagent-yjrz.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Disable credentials since we're using a separate domain
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      if (error.response.status === 401) {
        // Handle unauthorized
        console.error('Unauthorized access');
      } else if (error.response.status === 404) {
        // Handle not found
        console.error('Resource not found');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response received');
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 