export const aboutData = {
  title: 'Bhargav Patel',
  subtitle: 'Software Engineer',
  bio: [
    "I'm a backend-focused engineer who gravitates toward the hard parts of the stack — APIs that handle millions of requests, pipelines that never miss a record, and the microservices migrations that happen without downtime.",
    "At Datadog I build platform tooling with FastAPI and React, ship async pipelines with Celery & RabbitMQ, and integrate LLM-powered search. Before that at Chargebee I led payment infrastructure and CI/CD.",
    "MS Computer Science — UT Arlington. Open to relocate. Currently in Texas.",
  ],
  stats: [
    { label: 'Years experience', value: '3+' },
    { label: 'Companies', value: '2' },
    { label: 'Education', value: 'MS CS' },
    { label: 'Location', value: 'TX, US' },
  ],
}

export const skillsData = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    category: 'Backend',
    items: ['Django', 'Flask', 'FastAPI', 'DRF', 'REST APIs', 'GraphQL', 'gRPC', 'Microservices'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Material UI'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'AWS EC2/S3/Lambda', 'Terraform', 'GitHub Actions', 'Jenkins'],
  },
  {
    category: 'Messaging',
    items: ['RabbitMQ', 'Kafka', 'Celery', 'Airflow', 'ETL Pipelines'],
  },
  {
    category: 'AI / ML',
    items: ['OpenAI APIs', 'LangChain', 'RAG', 'Embeddings', 'FAISS', 'Pinecone', 'scikit-learn', 'PyTorch'],
  },
]

export const experienceData = [
  {
    company: 'Datadog',
    role: 'Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'TX, United States',
    color: '#6366f1',
    bullets: [
      'Reduced manual reporting effort 30% building FastAPI + React internal platform tools',
      'Cut API response time 25% via query optimization, pagination, and Redis caching',
      'Boosted async job capacity 40% with Celery & RabbitMQ pipelines',
      'Deployed LLM support chatbot — reduced repetitive team queries 25%',
      'Vector search & embeddings reduced knowledge lookup time 30%',
    ],
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Celery', 'RabbitMQ', 'Docker', 'K8s'],
  },
  {
    company: 'Chargebee',
    role: 'Software Engineer',
    period: 'Jan 2022 — Aug 2024',
    location: 'India',
    color: '#8b5cf6',
    bullets: [
      'Reduced transaction processing errors 20% improving payment & reporting modules',
      'Cut deployment downtime 35% leading monolith → microservices migration',
      'Reduced release effort 40% implementing CI/CD from scratch',
      'Improved API performance 25% optimizing SQL queries and backend logic',
      'Saved 10+ hrs/week automating ETL pipelines for financial data',
    ],
    stack: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
  },
]

export const projectsData = [
  {
    title: 'ISEMS — Intelligent Student Evaluation & Mastery System',
    description: 'Production-deployed AI-powered learning analytics platform that evaluates student performance, computes skill mastery, and generates structured AI feedback.',
    bullets: [
      'Skill-based weighted mastery engine with AI-generated structured recommendations via OpenAI API',
      'JWT auth with Student / Instructor roles, analytics dashboard with charts',
      'Deployed on Render (FastAPI backend + PostgreSQL) and Vercel (React frontend)',
    ],
    stack: ['FastAPI', 'React', 'PostgreSQL', 'SQLAlchemy', 'OpenAI API', 'TailwindCSS', 'Recharts'],
    github: 'https://github.com/bhargavspatel/ISEMS',
    demo: 'https://isems.onrender.com/docs',
  },
  {
    title: 'Financial Transaction Monitoring Platform',
    description: 'Real-time transaction monitoring for business users — financial record processing, validation, filtering, and live dashboards.',
    bullets: [
      'Reduced API response time 20% via query optimization, indexing, Redis caching',
      'Built full ingestion → validation → filtering → reporting pipeline',
      'Real-time dashboards with drill-down capabilities',
    ],
    stack: ['Django', 'PostgreSQL', 'REST APIs', 'React.js', 'Redis'],
    github: null,
    demo: null,
  },
  {
    title: 'Microservices Order Management',
    description: 'Distributed order management system — separate services for orders, payments, and notifications with async messaging.',
    bullets: [
      'RabbitMQ async messaging eliminated direct service dependencies',
      'Each service containerized with Docker, deployed on Kubernetes',
      'Improved reliability and deployment consistency across environments',
    ],
    stack: ['Python', 'RabbitMQ', 'Docker', 'Kubernetes', 'PostgreSQL'],
    github: null,
    demo: null,
  },
]

export const contactData = {
  heading: "Let's work together",
  sub: "Actively looking for my next backend/platform engineering role. If you have an interesting problem, I'd like to hear about it.",
  links: [
    { label: 'Email', value: 'bspatel2134@gmail.com', href: 'mailto:bspatel2134@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/bhargav-patel', href: 'https://www.linkedin.com/in/bhargav-patel-b51707323' },
    { label: 'GitHub', value: 'github.com/bhargavspatel', href: 'https://github.com/bhargavspatel' },
  ],
}
