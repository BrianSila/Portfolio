import { useState, useEffect } from 'react';
import ProjectCard from './components/projects/ProjectCard';
import { getProjects } from './services/projectsService';

/**
 * App Component
 * 
 * Main entry point for the portfolio application.
 * On mount, fetches project data and renders ProjectCard components.
 * Day 1: Displays mock data. Phase C: Swaps to real API calls seamlessly.
 */
function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch projects on component mount
   */
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError(err.message || 'An error occurred while loading projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation Placeholder */}
      <header className="border-b border-gray-200 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Brian's Portfolio</h1>
          <p className="mt-2 text-gray-600">Fullstack Software Developer</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects & Experience</h2>
            <p className="text-gray-600">A selection of recent work showcasing fullstack capabilities</p>
          </section>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
              <h3 className="font-semibold mb-2">Error Loading Projects</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No projects found. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="border-t border-gray-200 py-8 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; 2024 Brian Baraka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
