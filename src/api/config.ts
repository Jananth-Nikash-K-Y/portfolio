import axios from 'axios';

const BASE_URL = 'https://portfolioagent-sklw.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  timeout: 90000, // 90 second timeout to handle Render cold start (up to 60s)
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds between retries

// Add request interceptor
api.interceptors.request.use(
  (config) => {
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

// Add response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    config.retryCount = config.retryCount || 0;

    const shouldRetry =
      config.retryCount < MAX_RETRIES &&
      (error.code === 'ECONNABORTED' ||
        !error.response ||
        error.response.status === 502 ||
        error.response.status === 503 ||
        error.response.status === 504);

    if (shouldRetry) {
      config.retryCount += 1;
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES})...`);
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * config.retryCount)
      );
      return api(config);
    }

    return Promise.reject(error);
  }
);

/**
 * Silently ping the agent backend to wake it up from Render's cold start.
 * Called on page load so the service is warm by the time the user opens the chat.
 */
export async function warmUpAgent(): Promise<void> {
  try {
    await axios.get(`${BASE_URL}/`, { timeout: 90000 });
    console.log('[Agent] Service warmed up.');
  } catch {
    // Ignore — best effort warm-up, don't surface to user
  }
}

export default api;
