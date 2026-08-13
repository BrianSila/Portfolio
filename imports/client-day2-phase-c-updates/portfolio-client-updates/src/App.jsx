import { useState, useEffect } from 'react';
import ProjectCard from './components/projects/ProjectCard';
import { getProjects } from './services/projectsService';

/**
 * App Component
 *
 * Phase C: Now fetches live data from the Flask API (via projectsService).
 *
 * Async safety notes:
 * - `isMounted` guards against setting state after the component has
 *   unmounted (e.g. if the user navigates away before the request
 *   resolves) — prevents the classic "Can't perform a React state
 *   update on an unmounted component" warning/crash.
 * - The container keeps a stable `min-h-[400px]` on the projects region
 *   so the loading → loaded transition doesn't cause a layout jump.
 */
function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjectsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();

        if (isMounted) {
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
        if (isMounted) {
          setError(err.message || 'An error occurred while loading projects.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjectsData();

    // Cleanup: flips the flag so any in-flight response is ignored
    // if this component unmounts before the request resolves.
    return () => {
      isMounted = false;
    };
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

          {/* Projects Region — min-height keeps layout stable across loading/loaded/error states */}
          <div className="min-h-[400px]">
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
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
                <h3 className="font-semibold mb-2">Error Loading Projects</h3>
                <p>{error}</p>
                <p className="mt-2 text-sm text-red-600">
                  Make sure the Flask server is running on http://localhost:5000
                </p>
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
