import { useEffect, useRef } from 'react'
import { aboutData, skillsData, experienceData, projectsData, contactData } from '../../data/content'

// Theme-aware style tokens — consumed via CSS variables set by light-theme / dark-theme class
const s = {
  primary:  'var(--text-primary)',
  muted:    'var(--text-muted)',
  faint:    'var(--text-faint)',
  surface:  'var(--surface)',
  border:   'var(--card-border)',
  tag:      'var(--tag-bg)',
}

function Tag({ children }) {
  return (
    <span style={{
      fontSize: '11px',
      fontFamily: 'monospace',
      padding: '2px 8px',
      borderRadius: '4px',
      background: s.tag,
      border: `1px solid ${s.border}`,
      color: s.muted,
      display: 'inline-block',
    }}>
      {children}
    </span>
  )
}

function Bullet({ children, color = '#6366f1' }) {
  return (
    <li style={{ display: 'flex', gap: '8px', fontSize: '13px', color: s.muted, lineHeight: '1.6' }}>
      <span style={{ color, flexShrink: 0, marginTop: '2px' }}>›</span>
      <span>{children}</span>
    </li>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      border: `1px solid ${s.border}`,
      borderRadius: '12px',
      padding: '20px',
      background: s.surface,
      ...style,
    }}>
      {children}
    </div>
  )
}

function Label({ children, color = '#6366f1' }) {
  return (
    <p style={{
      fontSize: '11px',
      fontFamily: 'monospace',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color,
      marginBottom: '8px',
    }}>
      {children}
    </p>
  )
}

// ── Panel content components ────────────────────────────────────────────────

function AboutPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '22px', fontWeight: 700, color: s.primary, marginBottom: '4px' }}>
          {aboutData.title}
        </p>
        <p style={{ fontSize: '13px', color: '#6366f1', fontFamily: 'monospace' }}>
          {aboutData.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {aboutData.bio.map((p, i) => (
          <p key={i} style={{ fontSize: '13px', color: s.muted, lineHeight: '1.7' }}>{p}</p>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {aboutData.stats.map(({ label, value }) => (
          <Card key={label}>
            <p style={{ fontSize: '22px', fontWeight: 700, color: s.primary }}>{value}</p>
            <p style={{ fontSize: '12px', color: s.muted, marginTop: '2px' }}>{label}</p>
          </Card>
        ))}
      </div>

      <div>
        <Label>Core Stack</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['Python','FastAPI','Django','React','PostgreSQL','Docker','Kubernetes','AWS'].map(s => (
            <span key={s} style={{
              fontSize: '12px', fontFamily: 'monospace',
              padding: '3px 10px', borderRadius: '4px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818cf8',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {skillsData.map(({ category, items }) => (
        <div key={category}>
          <Label>{category}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {items.map(skill => <Tag key={skill}>{skill}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperiencePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {experienceData.map((job) => (
        <Card key={job.company}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', color: s.primary }}>{job.company}</p>
              <p style={{ fontSize: '13px', color: job.color, marginTop: '2px' }}>{job.role}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', fontFamily: 'monospace', color: s.muted }}>{job.period}</p>
              <p style={{ fontSize: '11px', color: s.faint, marginTop: '2px' }}>{job.location}</p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {job.bullets.map((b, i) => <Bullet key={i} color={job.color}>{b}</Bullet>)}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {job.stack.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      ))}
    </div>
  )
}

function ProjectsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {projectsData.map((p) => (
        <Card key={p.title}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <p style={{ fontWeight: 600, fontSize: '14px', color: s.primary, lineHeight: '1.4' }}>{p.title}</p>
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                style={{ color: s.faint, flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              </a>
            )}
          </div>
          <p style={{ fontSize: '12px', color: s.muted, lineHeight: '1.6', marginBottom: '10px' }}>{p.description}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {p.bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {p.stack.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      ))}
    </div>
  )
}

function ContactPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '20px', fontWeight: 700, color: s.primary, marginBottom: '8px' }}>
          {contactData.heading}
        </p>
        <p style={{ fontSize: '13px', color: s.muted, lineHeight: '1.7' }}>{contactData.sub}</p>
      </div>

      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px 20px', borderRadius: '8px',
          background: '#6366f1', color: '#ffffff',
          fontSize: '14px', fontWeight: 500, textDecoration: 'none',
        }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Resume
      </a>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {contactData.links.map(({ label, value, href }) => (
          <a key={label} href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '12px 16px', borderRadius: '8px',
              background: s.surface, border: `1px solid ${s.border}`,
              textDecoration: 'none',
            }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: s.faint, width: '60px', flexShrink: 0 }}>
              {label}
            </span>
            <span style={{ fontSize: '13px', color: s.muted }}>{value}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Panel shell ─────────────────────────────────────────────────────────────

const panelComponents = { about: AboutPanel, skills: SkillsPanel, experience: ExperiencePanel, projects: ProjectsPanel, contact: ContactPanel }
const panelTitles = { about: 'About Me', skills: 'Skills', experience: 'Experience', projects: 'Projects', contact: 'Contact' }

export default function ContentPanel({ section, onClose, theme = 'dark' }) {
  const bodyRef = useRef(null)
  const isOpen = Boolean(section)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [section])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const PanelContent = section ? panelComponents[section] : null

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 30,
          background: theme === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Sliding panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100%', zIndex: 40,
        width: 'min(420px, 100vw)',
        display: 'flex', flexDirection: 'column',
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(24px)',
        borderLeft: '1px solid var(--panel-border)',
        color: 'var(--text-secondary)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid var(--panel-header-border)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '5px', height: '20px', borderRadius: '3px', background: '#6366f1' }} />
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              {section ? panelTitles[section] : ''}
            </h2>
          </div>
          <button onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', background: 'transparent', border: 'none',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', overscrollBehavior: 'contain' }}>
          {PanelContent && <PanelContent />}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--panel-footer-border)',
          textAlign: 'center', flexShrink: 0,
        }}>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-faint)' }}>
            Press ESC or click outside to close
          </p>
        </div>
      </div>
    </>
  )
}
