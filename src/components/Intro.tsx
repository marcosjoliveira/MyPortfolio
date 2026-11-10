import Reveal from './Reveal'
import './Intro.css'

export default function Intro() {
  return (
    <section id="intro" className="intro section">
      <div className="section__inner intro__inner">
        <Reveal as="h2" className="intro__title">
          Eu construo soluções <span>com IA.</span>
        </Reveal>
        <Reveal as="p" className="intro__body" delay={100}>
          Gosto de programação e de tecnologia e Hoje meu foco é{' '}
          <strong>inteligência artificial</strong>: entender como ela funciona e usar isso para
          criar coisas que as pessoas usam de verdade. Abaixo estão os projetos que{' '}
          <em>criei e mantenho no ar</em>.
        </Reveal>
      </div>
    </section>
  )
}
