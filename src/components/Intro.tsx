import Reveal from './Reveal'
import './Intro.css'

export default function Intro() {
  return (
    <section className="intro section">
      <div className="section__inner intro__inner">
        <Reveal as="h2" className="intro__title">
          Eu construo produtos digitais.
        </Reveal>
        <Reveal as="p" className="intro__body" delay={100}>
          Trabalho em todas as camadas de um produto — interface, backend e a lógica que faz
          ele funcionar de verdade em produção. Hoje mantenho três projetos rodando ao mesmo
          tempo, do zero ao usuário final, e é assim que prefiro aprender: construindo.
        </Reveal>
      </div>
    </section>
  )
}
