const jobs = [
  {
    company: 'Datadog',
    role: 'Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'TX, United States',
    stack: ['FastAPI', 'React.js', 'PostgreSQL', 'Celery', 'RabbitMQ', 'Docker', 'Kubernetes', 'LLM APIs'],
    bullets: [
      'Reduced manual reporting effort by 30% building scalable internal platform tools with FastAPI, React.js, and PostgreSQL.',
      'Cut average API response time by 25% through query optimization, pagination, and Redis caching.',
      'Boosted background job capacity by 40% implementing async task processing with Celery and RabbitMQ.',
      'Deployed an LLM-powered internal support chatbot, cutting repetitive team queries by 25%.',
      'Reduced knowledge lookup time by 30% integrating vector-based search and embeddings for documentation retrieval.',
      'Improved deployment consistency contributing to Docker and Kubernetes workflow improvements.',
    ],
  },
  {
    company: 'Chargebee',
    role: 'Software Engineer',
    period: 'Jan 2022 — Aug 2024',
    location: 'India',
    stack: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions'],
    bullets: [
      'Reduced transaction processing errors by 20% building and optimizing payment, transaction, and reporting modules.',
      'Cut deployment downtime by 35% leading a monolith-to-microservices migration with Docker and Kubernetes.',
      'Reduced release effort by 40% designing and implementing CI/CD pipelines for automated testing and deployment.',
      'Improved API performance by 25% optimizing SQL queries, indexes, and backend logic under high-traffic conditions.',
      'Saved 10+ hours per week automating ETL pipelines for financial data ingestion, validation, and analytics reporting.',
      'Reduced production issue resolution time by 30% improving monitoring, logging, and debugging across services.',
      'Built predictive models for transaction monitoring, fraud detection, and risk analysis using scikit-learn.',
    ],
  },
]

function JobCard({ company, role, period, location, stack, bullets, index }) {
  return (
    <div className="relative pl-8 pb-16 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />
      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-accent" />

      <div className="glass rounded-xl p-6 sm:p-8 hover:border-accent/25 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{company}</h3>
            <p className="text-accent text-sm font-medium mt-0.5">{role}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-gray-400">{period}</p>
            <p className="text-xs text-muted mt-0.5">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {stack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-0.5 rounded bg-bg border border-border text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
              <span className="text-accent mt-1 shrink-0">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-widest mb-4">03 / EXPERIENCE</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Where I've shipped
        </h2>
        <p className="text-muted mb-14 max-w-lg">
          Production work across fintech and observability — with measurable outcomes.
        </p>

        <div>
          {jobs.map((job, i) => (
            <JobCard key={job.company} {...job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
