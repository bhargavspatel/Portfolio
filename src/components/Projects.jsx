const projects = [
  {
    title: 'Financial Transaction Monitoring Platform',
    description:
      'A real-time transaction monitoring platform for business users — processing financial records, applying validation and filtering logic, and surfacing operational data through live dashboards.',
    highlights: [
      'Reduced API response time by 20% through query optimization, indexing, and Redis caching',
      'Built end-to-end ingestion, validation, filtering, and reporting pipeline',
      'Real-time dashboard visualizations for financial record tracking',
    ],
    stack: ['Django', 'PostgreSQL', 'Redis', 'REST APIs', 'React.js'],
    github: 'https://github.com/bhargavspatel',
    demo: null,
  },
  {
    title: 'Microservices-Based Order Management System',
    description:
      'A distributed order management system decomposed into independent services — orders, payments, and notifications — communicating asynchronously over a message broker.',
    highlights: [
      'Decoupled services with RabbitMQ async messaging, eliminating direct service dependencies',
      'Containerized each service with Docker; supported Kubernetes-based deployment',
      'Improved system reliability and deployment consistency across environments',
    ],
    stack: ['Python', 'RabbitMQ', 'Docker', 'Kubernetes', 'PostgreSQL'],
    github: 'https://github.com/bhargavspatel',
    demo: null,
  },
]

function ProjectCard({ title, description, highlights, stack, github, demo }) {
  return (
    <div className="glass rounded-xl p-6 sm:p-8 flex flex-col h-full hover:border-accent/25 transition-colors duration-300 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <div className="flex gap-3 shrink-0 pt-0.5">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-white transition-colors duration-200"
              aria-label="Live demo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-5">{description}</p>

      <ul className="space-y-2 mb-6 flex-1">
        {highlights.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-muted">
            <span className="text-accent shrink-0 mt-0.5">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
        {stack.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded bg-bg border border-border text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-widest mb-4">04 / PROJECTS</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Things I've built
        </h2>
        <p className="text-muted mb-12 max-w-lg">
          Selected personal and professional projects — each with a real problem and a measurable result.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-muted">
          More on{' '}
          <a
            href="https://github.com/bhargavspatel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  )
}
