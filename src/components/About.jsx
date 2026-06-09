const highlights = [
  { value: '3+', label: 'Years of experience' },
  { value: '2', label: 'Production companies' },
  { value: 'MS', label: 'CS — UT Arlington' },
  { value: 'Full', label: 'Stack + DevOps' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <p className="font-mono text-accent text-xs tracking-widest mb-4">01 / ABOUT</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight">
              Backend engineer.<br />
              Systems thinker.
            </h2>

            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I'm a software engineer who gravitates toward the hard parts of the
                stack — the APIs that handle millions of requests, the pipelines
                that never miss a record, and the microservices migrations that
                happen without downtime.
              </p>
              <p>
                Most recently at <span className="text-gray-200 font-medium">Datadog</span>,
                I've been building platform tools with FastAPI and React, shipping
                async task pipelines with Celery & RabbitMQ, and integrating
                LLM-powered search into internal workflows.
              </p>
              <p>
                Before that, at <span className="text-gray-200 font-medium">Chargebee</span>,
                I worked across the payment and reporting stack — led a monolith-to-microservices
                migration, automated ETL pipelines, and built CI/CD from scratch.
              </p>
              <p>
                I hold a Master's in Computer Science from UT Arlington and a
                Bachelor's in Computer Engineering from India. I'm actively
                looking for my next challenge — ideally on a team that cares
                about correctness and craft.
              </p>
            </div>
          </div>

          {/* Right — stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="glass rounded-xl p-6 hover:border-accent/30 transition-colors duration-300"
              >
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}

            {/* Stack callout */}
            <div className="col-span-2 glass rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
              <p className="text-xs font-mono text-accent tracking-widest mb-3">CURRENT STACK</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Redis'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-1 bg-surface rounded border border-border text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
