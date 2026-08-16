import { useRef, type MouseEvent } from 'react'
import type { Project } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  /** atraso (em ms) antes da animação de entrada — cria o efeito cascata entre os cards */
  delay: number
}

/**
 * ProjectCard
 * ────────────────────────────────────────────────────────────────────────
 * Um card "estilo catálogo" para cada projeto: de um lado as informações
 * (categoria, título, descrição, funcionalidades, stack técnica e o botão
 * de acesso), do outro um mockup visual em formato de janela de navegador.
 *
 * Efeitos aplicados:
 *  - Entrada suave via scroll (useScrollReveal) com atraso escalonado
 *  - Leve inclinação 3D (tilt) que segue o mouse dentro do card
 *  - Brilho ("glow") que acompanha o cursor, dando profundidade ao hover
 */
export default function ProjectCard({ project, delay }: ProjectCardProps) {
  const [revealRef, isVisible] = useScrollReveal<HTMLElement>(0.15)
  const cardRef = useRef<HTMLElement | null>(null)

  // Move o "glow" e a inclinação 3D do card de acordo com a posição do mouse
  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 a 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5

    card.style.setProperty('--tilt-x', `${relativeY * -4}deg`)
    card.style.setProperty('--tilt-y', `${relativeX * 5}deg`)
    card.style.setProperty('--glow-x', `${(relativeX + 0.5) * 100}%`)
    card.style.setProperty('--glow-y', `${(relativeY + 0.5) * 100}%`)
  }

  // Zera a inclinação quando o mouse sai do card, com transição suave (definida no CSS)
  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <article
      // Combina as duas refs (a do scroll reveal e a local, usada pro tilt) num único callback ref
      ref={(node) => {
        revealRef.current = node
        cardRef.current = node
      }}
      className={`project-card project-card--${project.accent} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nó que se alinha à linha do eixo do tempo (ver Projects.css) */}
      <div className="project-card__node" aria-hidden="true">
        <span>{project.index}</span>
      </div>

      {/* ── Coluna de informações ─────────────────────────────── */}
      <div className="project-card__info">
        <span className="project-card__eyebrow">{project.category}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__description">{project.description}</p>

        <ul className="project-card__features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="project-card__stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__footer">
          <span
            className={`status-badge ${
              project.status === 'Em produção' ? 'status-badge--live' : 'status-badge--progress'
            }`}
          >
            <span className="status-badge__dot" />
            {project.status}
          </span>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__cta"
              data-cursor="link"
            >
              Ver projeto
              <span className="project-card__cta-arrow">↗</span>
            </a>
          ) : (
            <span className="project-card__cta project-card__cta--disabled">Em breve</span>
          )}
        </div>
      </div>

      {/* ── Mockup visual (janela de navegador estilizada) ──────── */}
      <div className="project-card__visual">
        <div className="browser-frame">
          <div className="browser-frame__bar">
            <span />
            <span />
            <span />
          </div>

          <div className="browser-frame__screen">
            {project.image ? (
              // Assim que houver um screenshot real em `project.image`, ele aparece aqui
              <img src={project.image} alt={`Captura de tela do projeto ${project.title}`} />
            ) : (
              // Placeholder abstrato gerado só com CSS — usa a cor "accent" do projeto
              <div className="browser-frame__placeholder">
                <div className="placeholder-bar placeholder-bar--w60" />
                <div className="placeholder-bar placeholder-bar--w40" />
                <div className="placeholder-grid">
                  <div className="placeholder-block" />
                  <div className="placeholder-block" />
                  <div className="placeholder-block" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
