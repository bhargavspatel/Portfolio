const groups = [
  {
    label: 'Languages',
    icon: '{ }',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3', 'Bash'],
  },
  {
    label: 'Backend',
    icon: '⚙',
    skills: ['Django', 'Flask', 'FastAPI', 'DRF', 'REST APIs', 'GraphQL', 'gRPC', 'Microservices', 'Event-Driven Architecture'],
  },
  {
    label: 'Frontend',
    icon: '◻',
    skills: ['React.js', 'Next.js', 'Angular', 'Redux', 'Tailwind CSS', 'Material UI', 'Bootstrap'],
  },
  {
    label: 'Databases & Caching',
    icon: '▦',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Oracle DB', 'Elasticsearch'],
  },
  {
    label: 'DevOps & Cloud',
    icon: '☁',
    skills: ['Docker', 'Kubernetes', 'AWS EC2', 'S3', 'Lambda', 'Terraform', 'GitHub Actions', 'Jenkins', 'Nginx'],
  },
  {
    label: 'Messaging & Pipelines',
    icon: '→',
    skills: ['RabbitMQ', 'Kafka', 'Celery', 'Airflow', 'ETL Pipelines'],
  },
  {
    label: 'AI / ML',
    icon: '◈',
    skills: ['scikit-learn', 'PyTorch', 'TensorFlow', 'Hugging Face', 'OpenAI APIs', 'LangChain', 'RAG', 'Embeddings', 'FAISS', 'Pinecone'],
  },
  {
    label: 'Testing & Tools',
    icon: '✓',
    skills: ['PyTest', 'Selenium', 'Postman', 'Swagger/OpenAPI', 'SonarQube', 'JIRA', 'Git'],
  },
]

function SkillGroup({ label, icon, skills }) {
  return (
    <div className="glass rounded-xl p-6 hover:border-accent/25 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-accent text-sm">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">{label}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-mono px-2.5 py-1 rounded bg-bg border border-border text-muted hover:text-gray-200 hover:border-accent/30 transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-widest mb-4">02 / SKILLS</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Tools of the trade
        </h2>
        <p className="text-muted mb-12 max-w-lg">
          A working toolkit built across production systems — not a certifications list.
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {groups.map((g) => (
            <SkillGroup key={g.label} {...g} />
          ))}
        </div>
      </div>
    </section>
  )
}
