import { useEffect, useState } from 'react'
import './App.css'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Process from './components/Process'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    function handleScroll() {
      // Header aparece só depois que a Hero já saiu quase toda de cena —
      // evita ele nascer em cima da Hero enquanto ela ainda está em foco.
      const threshold = (window.innerHeight || 800) * 0.6
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="app">
      <Header scrolled={scrolled} />

      <main>
        <Hero reducedMotion={reducedMotion} />
        <Intro />
        <Projects reducedMotion={reducedMotion} />
        <Process />
        <Stack />
        <About />
        <Contact reducedMotion={reducedMotion} />
      </main>

      <Footer />
    </div>
  )
}

export default App