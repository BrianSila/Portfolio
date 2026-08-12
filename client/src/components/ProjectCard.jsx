/**
 * ProjectCard Component
 * 
 * Displays a single project with title, description, and tech stack tags.
 * Raw structure focused on content hierarchy and semantic HTML.
 * Animations and hover effects will be added in Sprint 2.
 * 
 * @param {Object} project - Project object containing:
 *   - id {number}
 *   - title {string}
 *   - slug {string}
 *   - description {string}
 *   - tech_stack {Array<{id, name, category}>}
 *   - demo_url {string}
 *   - repo_url {string}
 *   - featured {boolean}
 */
const ProjectCard = ({ project }) => {
  if (!project) {
    return (
      <div className="p-8 bg-gray-100 rounded-lg text-center text-gray-600">
        No project data available
      </div>
    );
  }

  const { title, description, tech_stack, demo_url, repo_url, featured } = project;

  return (
    <article
      className={`
        rounded-lg border border-gray-200 bg-white p-6 shadow-sm
        transition-shadow duration-300 hover:shadow-md
        ${featured ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      {/* Header Section */}
      <div className="mb-4">
        {featured && (
          <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 rounded-full">
            Featured
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h3>
      </div>

      {/* Description Section */}
      <p className="mb-6 text-gray-700 leading-relaxed text-base">
        {description}
      </p>

      {/* Tech Stack Tags */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Technology
        </p>
        <div className="flex flex-wrap gap-2">
          {tech_stack && tech_stack.length > 0 ? (
            tech_stack.map((tech) => (
              <span
                key={`${project.id}-${tech.id}`}
                className={`
                  px-3 py-1 text-xs font-medium rounded-full transition-colors
                  ${
                    tech.category === 'frontend'
                      ? 'bg-blue-100 text-blue-700'
                      : tech.category === 'backend'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }
                `}
              >
                {tech.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm italic">No technologies listed</span>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        {demo_url && (
          <a
            href={demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Demo
          </a>
        )}
        {repo_url && (
          <a
            href={repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-center text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Code
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
