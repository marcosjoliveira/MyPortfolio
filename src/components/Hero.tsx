import { useEffect, useRef } from 'react'
import './Hero.css'

interface HeroProps {
  reducedMotion: boolean
}

export default function Hero({ reducedMotion }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) return

    function handleMouseMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    function loop() {
      const LERP = 0.06
      smooth.current.x += (target.current.x - smooth.current.x) * LERP
      smooth.current.y += (target.current.y - smooth.current.y) * LERP

      if (parallaxRef.current) {
        const rotY = smooth.current.x * 8
        const rotX = -smooth.current.y * 6

        parallaxRef.current.style.transform = `
          perspective(700px)
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
        `
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf.current)
    }
  }, [reducedMotion])

  function scrollToProjects() {
    document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero">
      <div className="hero__parallax" ref={parallaxRef}>
        <img src="/jardim-dev-logo-transparent.png" alt="Logo Jardim Dev" className="logo-hero" />

        <div className="hero__text">
          <h1 className="hero__name">Marcos Jardim</h1>
          <p className="hero__tagline">Desenvolvedor &amp; criador de produtos digitais.</p>
        </div>

        <button className="scroll-hint" onClick={scrollToProjects} aria-label="Ver projetos">
          Ver projetos
          <span className="scroll-arrow">↓</span>
        </button>
      </div>
    </section>
  )
}
