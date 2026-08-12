import axios from 'axios';

/**
 * Axios instance for all API calls.
 * 
 * During development, requests to `/api/*` are proxied to http://localhost:5000 via Vite.
 * In production, `VITE_API_BASE_URL` environment variable determines the target URL.
 * Falls back to `/api` for relative URLs (same-origin proxying).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Optional: Add request/response interceptors for logging, auth tokens, or global error handling.
 * Uncomment and customize as needed for future development.
 */

// api.interceptors.request.use(
//   (config) => {
//     // Add auth token or request logging here
//     console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('[API Error]', error.response?.status, error.message);
//     return Promise.reject(error);
//   }
// );

export default api;
