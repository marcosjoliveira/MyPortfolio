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

    function loop() {
      const LERP = 0.06
      smooth.current.x += (target.current.x - smooth.current.x) * LERP
      smooth.current.y += (target.current.y - smooth.current.y) * LERP

      if (parallaxRef.current) {
        const rotY = smooth.current.x * 5
        const rotX = -smooth.current.y * 4
        parallaxRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
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
      <div className="hero__inner">
        <div className="hero__logoWrap" ref={parallaxRef}>
          <img src="/jardim-dev-logo-transparent.png" alt="Jardim Dev" className="hero__logo" />
        </div>

        <p className="hero__eyebrow">Marcos Jardim · Desenvolvedor full stack</p>

        <h1 className="hero__title">
          Produtos digitais, <span>do zero à produção.</span>
        </h1>

        <p className="hero__tagline">
          Construo aplicações web completas — interface, backend, pagamentos e IA — e mantenho
          cada uma rodando para usuários reais.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo('#projetos')}>
            Ver projetos <span className="btn__arrow">→</span>
          </button>
          <button className="btn btn--ghost" onClick={() => scrollTo('#contato')}>
            Entrar em contato
          </button>
        </div>

        <ul className="hero__facts">
          <li>
            <strong>3</strong> produtos em produção
          </li>
          <li>
            <strong>Web · PWA · Android</strong>
          </li>
          <li>
            <strong>React · Node.js · IA</strong>
          </li>
        </ul>
      </div>

      <button className="hero__scroll" onClick={() => scrollTo('#projetos')} aria-label="Rolar até os projetos">
        <span />
      </button>
    </section>
  )
}
