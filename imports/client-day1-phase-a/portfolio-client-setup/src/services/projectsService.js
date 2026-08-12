import api from './api';

/**
 * ProjectsService
 * 
 * Abstracts data fetching logic for projects. During Day 1, this imports mock JSON.
 * In Phase C (Day 2), swap the dynamic import for an API call to `GET /api/projects`.
 * The component layer doesn't change — only this service swaps data sources.
 */

/**
 * Fetch all published projects.
 * 
 * Currently: Dynamically imports from mock JSON (simulates async API behavior).
 * Phase C: Uncomment the API call below and remove the mock import.
 * 
 * @returns {Promise<Array>} Array of project objects
 * @throws {Error} If fetch fails
 */
export const getProjects = async () => {
  try {
    // DAY 1 (MOCK DATA):
    // Import mock projects and simulate a network delay for realistic testing
    const projectsModule = await import('../data/projects.json');
    const projects = projectsModule.default;
    
    // Simulate network latency (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    return projects;

    // PHASE C (REAL API):
    // Uncomment below and remove the mock import above once Flask backend is ready
    // const response = await api.get('/projects');
    // return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects. Please try again later.');
  }
};

/**
 * Fetch a single project by slug.
 * 
 * @param {string} slug - The project slug (e.g., "ecommerce-platform-redesign")
 * @returns {Promise<Object>} Single project object
 * @throws {Error} If project not found or fetch fails
 */
export const getProjectBySlug = async (slug) => {
  try {
    // DAY 1 (MOCK DATA):
    const projectsModule = await import('../data/projects.json');
    const projects = projectsModule.default;
    const project = projects.find((p) => p.slug === slug);
    
    if (!project) {
      throw new Error(`Project with slug "${slug}" not found.`);
    }
    
    await new Promise((resolve) => setTimeout(resolve, 200));
    return project;

    // PHASE C (REAL API):
    // const response = await api.get(`/projects/${slug}`);
    // return response.data;
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    throw error;
  }
};

/**
 * Fetch all published reviews.
 * Included here for convenience; could live in a separate reviewsService.js.
 * 
 * @returns {Promise<Array>} Array of review objects
 * @throws {Error} If fetch fails
 */
export const getReviews = async () => {
  try {
    // DAY 1 (MOCK DATA):
    const reviewsModule = await import('../data/reviews.json');
    const reviews = reviewsModule.default;
    
    await new Promise((resolve) => setTimeout(resolve, 250));
    return reviews;

    // PHASE C (REAL API):
    // const response = await api.get('/reviews');
    // return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews. Please try again later.');
  }
};
