import Reveal from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'
import './Contact.css'

const EMAIL = 'marcosjardim.oliveira@gmail.com'

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: 'marcosjoliveira', href: 'https://github.com/marcosjoliveira' },
  { label: 'LinkedIn', handle: 'marcosjoliveira11', href: 'https://linkedin.com/in/marcosjoliveira11' },
  { label: 'Instagram', handle: '@jardim.dev', href: 'https://instagram.com/jardim.dev' },
]

export default function Contact({ reducedMotion }: { reducedMotion: boolean }) {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25, 12, reducedMotion)

  return (
    <section id="contato" className="contact section">
      <div className="section__inner">
        <div className="contact__card">
          <Reveal as="span" className="sectionHead__label">
            Contato
          </Reveal>

          <Reveal as="h2" className="contact__title" delay={60}>
            Vamos
            <br />
            <span>conversar?</span>
          </Reveal>

          <Reveal as="p" className="contact__lead" delay={120}>
            Seja um <strong>projeto</strong>, uma <strong>vaga</strong> ou só uma troca de ideias,
            me chama no WhatsApp ou por e-mail.
          </Reveal>

          <Reveal as="div" className="contact__actions" delay={180}>
            <a
              ref={ctaRef}
              className="btn btn--primary contact__cta"
              href="https://wa.me/5521996189304"
              target="_blank"
              rel="noreferrer"
            >
              Chamar no WhatsApp <span className="btn__arrow">→</span>
            </a>
            <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </Reveal>

          <Reveal as="ul" className="contact__links" delay={240}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  <span className="contact__linkLabel">{link.label}</span>
                  <span className="contact__linkHandle">{link.handle}</span>
                  <span className="contact__linkArrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
