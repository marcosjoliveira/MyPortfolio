import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <img src="/jardim-dev-logo-transparent.png" alt="Jardim Dev" className="footer__logo" />
        <span>© {new Date().getFullYear()} Marcos Jardim. Todos os direitos reservados.</span>
        <button
          className="footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Voltar ao topo ↑
        </button>
      </div>
    </footer>
  )
}
