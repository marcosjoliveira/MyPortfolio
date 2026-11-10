import Reveal from './Reveal'
import SectionHead from './SectionHead'
import './Stack.css'

const CATEGORIES: { label: string; items: string[] }[] = [
  { label: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'APIs REST'] },
  { label: 'Dados', items: ['Supabase', 'PostgreSQL', 'SQLite', 'IndexedDB'] },
  { label: 'Infra', items: ['Vercel', 'Railway', 'GitHub'] },
  { label: 'Pagamentos', items: ['Stripe'] },
  { label: 'IA', items: ['Claude API'] },
]

export default function Stack() {
  return (
    <section className="stack section">
      <div className="section__inner">
        <SectionHead
          label="Stack"
          title="Tecnologias que uso"
        />

        <div className="stack__grid">
          {CATEGORIES.map((cat, i) => (
            <Reveal as="div" className="stack__category" key={cat.label} delay={i * 60}>
              <span className="stack__label">{cat.label}</span>
              <ul className="stack__items">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
