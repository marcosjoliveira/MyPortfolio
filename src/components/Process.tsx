import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './Process.css'

const STEPS = [
  { n: '01', title: 'Ideia', desc: 'Definição do problema real e do escopo mínimo que já entrega valor.' },
  { n: '02', title: 'Desenvolvimento', desc: 'Construção iterativa, com decisões de arquitetura pensadas para durar.' },
  { n: '03', title: 'Deploy', desc: 'Produto em produção o quanto antes — feedback real vale mais que suposição.' },
  { n: '04', title: 'Evolução', desc: 'Ajuste contínuo com base no uso, nunca uma versão "final".' },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const total = rect.height
      const seen = Math.min(total, Math.max(0, viewportH * 0.75 - rect.top))
      setProgress(Math.min(1, seen / total))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="process section">
      <div className="section__inner">
        <Reveal as="h2" className="process__title">
          Como eu construo
        </Reveal>

        <div className="process__list" ref={containerRef}>
          <div className="process__line">
            <div className="process__lineFill" style={{ height: `${progress * 100}%` }} />
          </div>

          {STEPS.map((step) => (
            <Reveal as="div" className="process__step" key={step.n}>
              <span className="process__num">{step.n}</span>
              <div>
                <h3 className="process__stepTitle">{step.title}</h3>
                <p className="process__stepDesc">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
