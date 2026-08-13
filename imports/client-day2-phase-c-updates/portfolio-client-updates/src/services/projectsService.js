import api from './api';

/**
 * ProjectsService
 *
 * Phase C: Now fetches from the live Flask API instead of local mock JSON.
 * The function signatures are unchanged from Day 1 — App.jsx and any
 * component consuming these functions needs zero changes.
 *
 * Requests go to `${baseURL}/projects`, where baseURL is '/api' by default
 * (see src/services/api.js). In dev, Vite's proxy forwards '/api/*' to
 * http://localhost:5000, where Flask's projects blueprint is mounted at
 * '/api/projects'.
 */

/**
 * Fetch all projects from the Flask backend.
 *
 * @returns {Promise<Array>} Array of project objects
 * @throws {Error} If the request fails (network error, 4xx/5xx response)
 */
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects. Please try again later.');
  }
};

/**
 * Fetch a single project by slug.
 *
 * Note: the Flask backend doesn't implement this route yet (walking
 * skeleton only covers GET /api/projects) — this is wired up ready for
 * when that endpoint is added.
 *
 * @param {string} slug - The project slug
 * @returns {Promise<Object>} Single project object
 * @throws {Error} If the request fails
 */
export const getProjectBySlug = async (slug) => {
  try {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    throw new Error('Failed to fetch project details. Please try again later.');
  }
};

/**
 * Fetch all reviews from the Flask backend.
 *
 * Note: the Flask backend doesn't implement this route yet — wired up
 * ready for when the reviews blueprint is added.
 *
 * @returns {Promise<Array>} Array of review objects
 * @throws {Error} If the request fails
 */
export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews. Please try again later.');
  }
};
