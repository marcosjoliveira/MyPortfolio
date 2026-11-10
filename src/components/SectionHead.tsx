import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionHeadProps {
  label: string
  title: ReactNode
  lead?: ReactNode
}

/** Cabeçalho padrão das seções: rótulo pequeno, título e texto de apoio. */
export default function SectionHead({ label, title, lead }: SectionHeadProps) {
  return (
    <div className="sectionHead">
      <Reveal as="span" className="sectionHead__label">
        {label}
      </Reveal>
      <Reveal as="h2" className="sectionHead__title" delay={60}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="sectionHead__lead" delay={120}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
