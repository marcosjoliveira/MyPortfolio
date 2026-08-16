import Reveal from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'
import './Contact.css'

// TODO(Marcos): substitua os placeholders abaixo pelos seus links reais.
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/marcosjoliveira' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/marcosjoliveira11' },
  { label: 'Instagram', href: 'https://instagram.com/jardim.dev' },
  { label: 'E-mail', href: 'mailto:marcosjardim.oliveira@gmail.com' },
]

export default function Contact({ reducedMotion }: { reducedMotion: boolean }) {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25, 12, reducedMotion)

  return (
    <section id="contato" className="contact section">
      <div className="section__inner contact__inner">
        <Reveal as="h2" className="contact__title">
          Tem uma ideia?
          <br />
          Vamos construir.
        </Reveal>

        <Reveal delay={100}>
          <a ref={ctaRef} className="contact__cta" href="https://w.app/rhizch" target="_blank" rel="noreferrer">
            Entrar em contato <span>→</span>
          </a>
        </Reveal>

        <Reveal as="div" className="contact__links" delay={180}>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
