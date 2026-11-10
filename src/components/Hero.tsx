import { useEffect, useRef } from 'react'
import './Hero.css'

interface HeroProps {
  reducedMotion: boolean
}

function scrollTo(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero({ reducedMotion }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    function handleMouseMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    let last = performance.now()

    function loop(now: number) {
      // Suavização independente da taxa de quadros (60 Hz, 120 Hz...)
      const dt = Math.min(64, now - last)
      last = now
      const k = 1 - Math.pow(1 - 0.05, dt / 16.67)
      smooth.current.x += (target.current.x - smooth.current.x) * k
      smooth.current.y += (target.current.y - smooth.current.y) * k

      if (parallaxRef.current) {
        const rotY = smooth.current.x * 8
        const rotX = -smooth.current.y * 6
        parallaxRef.current.style.transform = `perspective(700px) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg)`
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

  return (
    <section className="hero" id="top">
      <div className="hero__inner" ref={parallaxRef}>
        <div className="hero__logoWrap">
          <img src="/jardim-dev-logo-transparent.png" alt="Jardim Dev" className="hero__logo" />
        </div>

        <p className="hero__eyebrow">Desenvolvedor · Engenharia da Computação</p>

        <h1 className="hero__title">
          Marcos <span>Jardim</span>
        </h1>

        <p className="hero__tagline">Crio produtos digitais com código e inteligência artificial.</p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo('#projetos')}>
            Ver projetos <span className="btn__arrow">→</span>
          </button>
          <button className="btn btn--ghost" onClick={() => scrollTo('#contato')}>
            Entrar em contato
          </button>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollTo('#intro')}>
        Role para conhecer
        <span className="hero__scrollArrow" aria-hidden="true">↓</span>
      </button>
    </section>
  )
}
