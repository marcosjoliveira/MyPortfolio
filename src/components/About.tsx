import Reveal from './Reveal'
import SectionHead from './SectionHead'
import './About.css'

const HIGHLIGHTS = [
  {
    title: 'Engenharia da Computação',
    text: 'Estudante, construindo produtos em paralelo às aulas.',
  },
  {
    title: 'Aprender construindo',
    text: 'Cada projeto novo é uma desculpa pra estudar algo diferente.',
  },
  {
    title: 'Produção primeiro',
    text: 'Levo a ideia até o ar rápido, e só depois refino com uso real.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="about section">
      <div className="section__inner about__inner">
        <SectionHead label="Sobre" title="Por trás do código." />

        <div className="about__body">
          <Reveal as="p" className="about__lead">
            Comecei mexendo em código por curiosidade e virou o jeito que eu resolvo praticamente
            tudo hoje. Gosto de transformar ideia em produto real — do primeiro commit até alguém
            de verdade usando.
          </Reveal>

          <Reveal as="p" className="about__text" delay={80}>
            Trabalho em todas as camadas de um produto: interface, backend e a lógica que faz ele
            funcionar de verdade em produção. Hoje mantenho três projetos rodando ao mesmo tempo,
            do zero ao usuário final.
          </Reveal>

          <ul className="about__highlights">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h.title} delay={160 + i * 80}>
                <strong>{h.title}</strong>
                <span>{h.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
