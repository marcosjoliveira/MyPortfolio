import Reveal from './Reveal'
import './About.css'

const HIGHLIGHTS = [
  'Estudante de Engenharia da Computação, construindo produtos em paralelo às aulas.',
  'Prefiro aprender construindo — cada projeto novo é uma desculpa pra estudar algo diferente.',
  'Gosto de levar ideia até produção rápido, e só depois refinar com uso real.',
]

export default function About() {
  return (
    <section id="sobre" className="about section">
      <div className="section__inner about__inner">
        <Reveal as="h2" className="about__title">
          Por trás do código.
        </Reveal>

        <Reveal as="p" className="about__body" delay={80}>
          Comecei mexendo em código por curiosidade e virou o jeito que eu resolvo praticamente
          tudo hoje. Gosto de transformar ideia em produto real — do primeiro commit até alguém
          de verdade usando.
        </Reveal>

        <ul className="about__highlights">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal as="li" key={h} delay={160 + i * 80}>
              {h}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
