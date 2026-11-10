import { useRef } from 'react'
import Reveal from './Reveal'
import BotPreview from './BotPreview'
import './ProjectItem.css'

export interface Project {
  name: string
  category: string
  status: string
  description: string
  highlights: string[]
  stack: string[]
  variant: 'redaciona' | 'tarefo' | 'bot'
  /** Caminho pro print do projeto, ex: "/projects/redaciona.webp".
   *  Sem imagem, a variante "bot" desenha a prévia do canal em código. */
  image?: string
  url?: string
  linkLabel?: string
  /** Endereço mostrado na barra do navegador da prévia (padrão: linkLabel). */
  displayUrl?: string
  reversed?: boolean
}

interface ProjectItemProps {
  project: Project
  index: number
  total: number
  reducedMotion: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function ProjectItem({ project, index, total, reducedMotion }: ProjectItemProps) {
  const visualRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return
    const el = visualRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--px', `${relX * -6}px`)
    el.style.setProperty('--py', `${relY * -6}px`)
  }

  function handleMouseLeave() {
    const el = visualRef.current
    if (!el) return
    el.style.setProperty('--px', '0px')
    el.style.setProperty('--py', '0px')
  }

  const frame = (
    <div
      className={`project__visual project__visual--${project.variant}`}
      ref={visualRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project__chrome">
        <div className="project__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="project__address">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M5 7V5a3 3 0 0 1 6 0v2m-7 0h8v6H4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          {project.displayUrl ?? project.linkLabel}
        </div>
      </div>

      <div className="project__screen">
        {project.image ? (
          <img
            className="project__shot"
            src={project.image}
            alt={`Tela do projeto ${project.name}`}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <BotPreview />
        )}
      </div>
    </div>
  )

  return (
    <article className={`project ${project.reversed ? 'project--reversed' : ''}`}>
      <Reveal as="div" className="project__visualWrap">
        {project.url ? (
          <a
            className="project__visualLink"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${project.name} em nova aba`}
          >
            {frame}
          </a>
        ) : (
          frame
        )}
      </Reveal>

      <Reveal as="div" className="project__content" delay={80}>
        <div className="project__meta">
          <span className="project__index">
            {pad(index)} <i>/ {pad(total)}</i>
          </span>
          <span className="project__status">{project.status}</span>
        </div>

        <p className="project__category">{project.category}</p>
        <h3 className="project__name">{project.name}</h3>
        <p className="project__description">{project.description}</p>

        <ul className="project__highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <ul className="project__stack" aria-label="Tecnologias">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        {project.url && (
          <a className="project__link" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel ?? 'Ver projeto'}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </Reveal>
    </article>
  )
}
