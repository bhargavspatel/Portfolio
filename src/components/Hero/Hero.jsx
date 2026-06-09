import { Suspense, lazy } from 'react'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D canvas — fills the full section */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Radial gradient overlay so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(10,10,15,0.0) 0%, rgba(10,10,15,0.7) 60%, rgba(10,10,15,0.95) 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <p className="font-mono text-accent text-sm tracking-widest mb-6 opacity-0 animate-fade-up"
             style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Software Engineer
          </p>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <span className="text-white">I build systems</span>
            <br />
            <span className="text-gradient">that scale.</span>
          </h1>

          <p
            className="text-lg text-muted leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
          >
            Backend-focused engineer with 3+ years shipping REST APIs,
            microservices, and cloud infrastructure — from transaction
            processing at Chargebee to platform tooling at Datadog.
          </p>

          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-accent hover:bg-accent-dim text-white text-sm font-medium rounded transition-colors duration-200"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border hover:border-accent/50 text-gray-300 hover:text-white text-sm font-medium rounded transition-all duration-200"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs text-muted tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
