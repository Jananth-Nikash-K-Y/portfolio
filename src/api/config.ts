import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://portfolioagent-sklw.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  timeout: 60000, // 60 second timeout
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // Ensure we're sending the correct data format
    if (config.data && typeof config.data === 'object') {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling and retries
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Initialize retry count if not set
    config.retryCount = config.retryCount || 0;
    
    // Check if we should retry the request
    if (config.retryCount < MAX_RETRIES && (
      error.code === 'ECONNABORTED' || // Timeout
      !error.response || // No response
      error.response.status === 502 || // Bad Gateway
      error.response.status === 503 || // Service Unavailable
      error.response.status === 504    // Gateway Timeout
    )) {
      config.retryCount += 1;
      
      // Log retry attempt
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES})...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * config.retryCount));
      
      // Retry the request
      return api(config);
    }
    
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
      } else if (error.response.status === 502) {
        // Handle bad gateway
        console.error('Agent service is temporarily unavailable');
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