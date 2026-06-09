import Navbar from './components/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="text-xs font-mono text-muted">
        Designed & built by{' '}
        <span className="text-gray-400">Bhargav Patel</span>
        {' '}·{' '}
        <a
          href="https://github.com/bhargavspatel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          github.com/bhargavspatel
        </a>
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
