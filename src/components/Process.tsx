import Reveal from './Reveal'
import SectionHead from './SectionHead'
import './Process.css'

const STEPS = [
  { n: '01', title: 'Ideia', desc: 'Definição do problema real e do escopo mínimo que já entrega valor.' },
  { n: '02', title: 'Desenvolvimento', desc: 'Construção iterativa, com decisões de arquitetura pensadas para durar.' },
  { n: '03', title: 'Deploy', desc: 'Produto em produção o quanto antes — feedback real vale mais que suposição.' },
  { n: '04', title: 'Evolução', desc: 'Ajuste contínuo com base no uso, nunca uma versão "final".' },
]

export default function Process() {
  return (
    <section className="process section">
      <div className="section__inner">
        <SectionHead
          label="Processo"
          title="Como eu construo"
          lead="O mesmo caminho em todo projeto: do problema ao produto no ar, e depois melhorando com uso real."
        />

        <ol className="process__grid">
          {STEPS.map((step, i) => (
            <Reveal as="li" className="process__step" key={step.n} delay={i * 80}>
              <span className="process__num">{step.n}</span>
              <h3 className="process__stepTitle">{step.title}</h3>
              <p className="process__stepDesc">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
