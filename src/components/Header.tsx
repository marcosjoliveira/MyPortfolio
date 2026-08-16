import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './Header.css'

interface HeaderProps {
  scrolled: boolean
}

const NAV_LINKS = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

export default function Header({ scrolled }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`header ${scrolled ? 'header--visible' : ''}`}>
      <div className="header__progress" style={{ width: `${progress}%` }} />

      <a
        href="#top"
        className="header__logo"
        aria-label="Voltar ao topo"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <img src="/jardim-dev-logo-transparent.png" alt="Jardim Dev" />
      </a>

      <nav className="nav">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(link.href)
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          className="nav__cta"
          href="#contato"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#contato')
          }}
        >
          Vamos conversar →
        </a>
      </nav>

      <button
        className={`menuToggle ${menuOpen ? 'menuToggle--open' : ''}`}
        aria-label="Abrir menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {createPortal(
        <div className={`mobileMenu ${menuOpen ? 'mobileMenu--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contato')
            }}
          >
            Vamos conversar →
          </a>
        </div>,
        document.body
      )}
    </header>
  )
}