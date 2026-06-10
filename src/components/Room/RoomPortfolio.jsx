import { Suspense, useState, lazy, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import ContentPanel from './ContentPanel'

const RoomScene = lazy(() => import('./RoomScene'))

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4"
      style={{ background: 'var(--panel-bg)' }}>
      <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      <p className="font-mono text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
        LOADING ENVIRONMENT
      </p>
    </div>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      style={{
        background: theme === 'dark'
          ? 'rgba(99,102,241,0.2)'
          : 'rgba(251,191,36,0.2)',
        border: theme === 'dark'
          ? '1px solid rgba(99,102,241,0.4)'
          : '1px solid rgba(251,191,36,0.5)',
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] select-none">🌙</span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] select-none">☀️</span>

      {/* Sliding thumb */}
      <span
        className="absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs shadow-md"
        style={{
          left: theme === 'dark' ? '2px' : 'calc(100% - 26px)',
          background: theme === 'dark' ? '#6366f1' : '#f59e0b',
        }}
      />
    </button>
  )
}

function UIOverlay({ theme, onToggle, activeSection, onSectionClick }) {
  return (
    <>
      {/* Branding top-left */}
      <div className="absolute top-5 left-7 z-20 pointer-events-none select-none">
        <p className="font-mono text-sm font-bold tracking-wider text-indigo-500">BP</p>
      </div>

      {/* Top-right controls */}
      <div className="absolute top-4 right-7 z-20 flex items-center gap-3">
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono px-4 py-2 rounded border border-indigo-500/35 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
        >
          Resume
        </a>
      </div>

      {/* Bottom navigation */}
      {!activeSection && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5">
          <div className="flex gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onSectionClick(id)}
                className="text-xs font-mono px-3 py-1.5 rounded border border-transparent hover:border-indigo-500/30 hover:text-indigo-400 transition-all duration-200"
                style={{ color: 'var(--nav-btn-color)' }}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs font-mono" style={{ color: 'var(--hint-color)' }}>
            Click objects in the room · or use buttons above
          </p>
        </div>
      )}
    </>
  )
}

export default function RoomPortfolio() {
  const [theme, setTheme] = useState('dark')
  const [activeSection, setActiveSection] = useState(null)

  // Apply theme class to root so CSS variables switch globally
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light-theme')
    } else {
      root.classList.remove('light-theme')
    }
    // Also update body background for the HTML layer
    document.body.style.background = theme === 'dark' ? '#060e06' : '#c8e0c0'
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          camera={{ fov: 55, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          style={{ position: 'absolute', inset: 0 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <RoomScene
              theme={theme}
              activeSection={activeSection}
              onSectionClick={setActiveSection}
            />
          </Suspense>
        </Canvas>
      </Suspense>

      <UIOverlay
        theme={theme}
        onToggle={toggleTheme}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />

      <ContentPanel
        theme={theme}
        section={activeSection}
        onClose={() => setActiveSection(null)}
      />
    </div>
  )
}
