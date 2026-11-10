import type { ReactNode } from 'react'
import Reveal from './Reveal'
import ProjectPreview from './ProjectPreview'
import './ProjectItem.css'

export interface Project {
  name: string
  category: string
  status: string
  description: ReactNode
  highlights: ReactNode[]
  stack: string[]
  variant: 'redaciona' | 'tarefo' | 'bot'
  /** Print da página inteira, ex: "/projects/redaciona-full.webp".
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
  const frame = (
    <div className={`project__visual project__visual--${project.variant}`}>
      <ProjectPreview
        name={project.name}
        address={project.displayUrl ?? project.linkLabel ?? ''}
        image={project.image}
        reducedMotion={reducedMotion}
      />
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
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
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
