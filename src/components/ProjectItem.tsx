import { useRef } from 'react'
import Reveal from './Reveal'
import './ProjectItem.css'

export interface Project {
  name: string
  description: string
  stack: string[]
  variant: 'redaciona' | 'tarefo' | 'bot'
  url?: string
  linkLabel?: string
  reversed?: boolean
}

interface ProjectItemProps {
  project: Project
  reducedMotion: boolean
}

export default function ProjectItem({ project, reducedMotion }: ProjectItemProps) {
  const visualRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return
    const el = visualRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--px', `${relX * -8}px`)
    el.style.setProperty('--py', `${relY * -8}px`)
  }

  function handleMouseLeave() {
    const el = visualRef.current
    if (!el) return
    el.style.setProperty('--px', '0px')
    el.style.setProperty('--py', '0px')
  }

  return (
    <article className={`project ${project.reversed ? 'project--reversed' : ''}`}>
      <Reveal as="div" className="project__visualWrap">
        <div
          className={`project__visual project__visual--${project.variant}`}
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="project__chrome">
            <span />
            <span />
            <span />
          </div>
          <div className="project__mock" />
        </div>
      </Reveal>

      <Reveal as="div" className="project__content" delay={80}>
        <h3 className="project__name">{project.name}</h3>
        <p className="project__description">{project.description}</p>

        <div className="project__stack">
          <span className="project__stackLabel">Stack</span>
          <span className="project__stackList">{project.stack.join(' · ')}</span>
        </div>

        {project.url ? (
          <a className="project__link" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel ?? 'Ver projeto'} <span>→</span>
          </a>
        ) : (
          <span className="project__link project__link--disabled">
            {project.linkLabel ?? 'Estudo de caso'}
          </span>
        )}
      </Reveal>
    </article>
  )
}
