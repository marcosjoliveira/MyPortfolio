import type { ReactNode } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import './About.css'

const HIGHLIGHTS: { title: string; text: ReactNode }[] = [
  {
    title: 'Formação',
    text: (
      <>
        <strong>Engenharia da Computação</strong> na UFCIRJ (antigo CEFET/RJ), campus Petrópolis.
      </>
    ),
  },
  {
    title: 'Experiência',
    text: (
      <>
        <strong>Instrutor de IA e Empreendedorismo</strong> em curso da Recode, com o Instituto
        Zeca Pagodinho e a SBM Offshore.
      </>
    ),
  },
  {
    title: 'Interesses',
    text: (
      <>
        <strong>Inteligência artificial</strong>, novas tecnologias e criar produtos que resolvem
        problemas reais.
      </>
    ),
  },
]

export default function About() {
  return (
    <section id="sobre" className="about section">
      <div className="section__inner about__inner">
        <SectionHead label="Quem sou" title="Sobre mim" />

        <div className="about__body">
          <Reveal as="p" className="about__lead">
            Tenho <em>20 anos</em>, sou de <em>Duque de Caxias</em> e estudo Engenharia da
            Computação em <em>Petrópolis</em>.
          </Reveal>

          <Reveal as="p" className="about__text" delay={80}>
            Sou <strong>ambicioso</strong> com o que construo e dou valor a{' '}
            <strong>bons relacionamentos</strong>, tanto com quem
            trabalha comigo quanto com quem usa o que eu faço. Também gosto de ensinar e de
            trocar conhecimento com outras pessoas.
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
