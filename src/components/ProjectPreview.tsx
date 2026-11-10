import { useEffect, useRef, useState } from 'react'
import BotPreview from './BotPreview'
import './ProjectPreview.css'

/**
 * Janela de navegador que "abre" o projeto quando entra na tela:
 * digita o endereço, mostra a barra de carregamento e o esqueleto da página,
 * e então pinta o print de cima para baixo. Com o mouse em cima, a página
 * inteira rola sozinha, como se alguém estivesse navegando nela.
 */

type Phase = 'waiting' | 'typing' | 'loading' | 'ready'

interface ProjectPreviewProps {
  name: string
  address: string
  /** Print da página inteira (largura fixa, altura livre). Sem ele, desenha o bot. */
  image?: string
  reducedMotion: boolean
}

const TYPE_SPEED = 32 // ms por caractere
const MIN_LOADING = 950 // tempo mínimo da barra de carregamento
// Rolagem no hover: começa devagar e vai acelerando enquanto o mouse fica em
// cima. Valores em px/s para uma janela de 640 px de largura (escala com ela).
const SCROLL_START = 45 // velocidade inicial
const SCROLL_ACCEL = 120 // quanto acelera por segundo
const SCROLL_MAX = 620 // velocidade máxima
const SCROLL_BRAKE = 900 // frenagem suave ao chegar no fim da página

export default function ProjectPreview({ name, address, image, reducedMotion }: ProjectPreviewProps) {
  const [phase, setPhase] = useState<Phase>(reducedMotion ? 'ready' : 'waiting')
  const [typed, setTyped] = useState(reducedMotion ? address.length : 0)
  const [imageLoaded, setImageLoaded] = useState(!image)
  const [scrollable, setScrollable] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const loadingSince = useRef(0)

  // 1. Começa a "abrir" quando a janela aparece na tela
  useEffect(() => {
    if (reducedMotion) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((p) => (p === 'waiting' ? 'typing' : p))
          observer.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  // 2. Digita o endereço
  useEffect(() => {
    if (phase !== 'typing') return
    if (typed >= address.length) {
      const t = setTimeout(() => {
        loadingSince.current = performance.now()
        setPhase('loading')
      }, 180)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 260 : TYPE_SPEED)
    return () => clearTimeout(t)
  }, [phase, typed, address.length])

  // 3. Carrega: espera o tempo mínimo da barra E a imagem de verdade
  useEffect(() => {
    if (phase !== 'loading' || !imageLoaded) return
    const left = Math.max(0, MIN_LOADING - (performance.now() - loadingSince.current))
    const t = setTimeout(() => setPhase('ready'), left)
    return () => clearTimeout(t)
  }, [phase, imageLoaded])

  // Mede se o print é maior que a janela (dá pra rolar)
  useEffect(() => {
    if (!image || !imageLoaded) return
    function measure() {
      const screen = screenRef.current
      const page = pageRef.current
      if (!screen || !page) return
      setScrollable(page.offsetHeight - screen.clientHeight > 8)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [image, imageLoaded])

  // 4. Rolagem da página inteira, quadro a quadro
  const hovering = useRef(false)
  const scroll = useRef({ pos: 0, vel: 0, raf: 0, last: 0 })

  function renderScroll(distance: number, viewH: number, thumbH: number) {
    const { pos } = scroll.current
    if (pageRef.current) pageRef.current.style.transform = `translate3d(0, ${-pos.toFixed(2)}px, 0)`
    if (thumbRef.current) {
      const top = distance ? (pos / distance) * (viewH - thumbH) : 0
      thumbRef.current.style.transform = `translate3d(0, ${top.toFixed(2)}px, 0)`
    }
  }

  function startScrollLoop() {
    const st = scroll.current
    if (st.raf) return
    const screen = screenRef.current
    const page = pageRef.current
    if (!screen || !page) return

    st.last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - st.last) / 1000)
      st.last = now

      const viewH = screen.clientHeight
      const distance = Math.max(0, page.offsetHeight - viewH)
      const scale = screen.clientWidth / 640
      const thumbH = Math.max(24, (viewH / page.offsetHeight) * viewH)
      if (thumbRef.current) thumbRef.current.style.height = `${thumbH}px`

      if (hovering.current) {
        // acelera aos poucos, e freia suave perto do fim
        st.vel = Math.max(st.vel, SCROLL_START * scale)
        st.vel = Math.min(SCROLL_MAX * scale, st.vel + SCROLL_ACCEL * scale * dt)
        const remaining = distance - st.pos
        st.vel = Math.min(st.vel, Math.sqrt(2 * SCROLL_BRAKE * scale * Math.max(0, remaining)))
        st.pos = Math.min(distance, st.pos + st.vel * dt)
      } else {
        // soltou o mouse: volta ao topo deslizando
        st.vel = 0
        st.pos += (0 - st.pos) * (1 - Math.exp(-dt * 5))
        if (st.pos < 0.5) st.pos = 0
      }

      renderScroll(distance, viewH, thumbH)

      const settled = hovering.current ? st.pos >= distance : st.pos === 0
      if (settled) {
        st.raf = 0
        return
      }
      st.raf = requestAnimationFrame(tick)
    }
    st.raf = requestAnimationFrame(tick)
  }

  function setHover(on: boolean) {
    hovering.current = on
    startScrollLoop()
  }

  useEffect(() => () => cancelAnimationFrame(scroll.current.raf), [])

  // Em telas de toque não existe hover: faz uma demonstração única ao carregar
  useEffect(() => {
    if (phase !== 'ready' || !scrollable || reducedMotion) return
    if (!window.matchMedia('(hover: none)').matches) return
    const down = setTimeout(() => setHover(true), 700)
    const up = setTimeout(() => setHover(false), 700 + 4500)
    return () => {
      clearTimeout(down)
      clearTimeout(up)
    }
    // setHover só mexe em refs; não precisa reexecutar o efeito por causa dele
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, scrollable, reducedMotion])

  const canScroll = phase === 'ready' && scrollable && !reducedMotion

  return (
    <div
      ref={rootRef}
      className={`preview preview--${phase}${scrollable ? ' preview--scrollable' : ''}`}
      onMouseEnter={() => canScroll && setHover(true)}
      onMouseLeave={() => canScroll && setHover(false)}
    >
      <div className="preview__chrome">
        <div className="preview__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="preview__address">
          {phase === 'loading' ? (
            <span className="preview__spinner" aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M5 7V5a3 3 0 0 1 6 0v2m-7 0h8v6H4z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="preview__url">
            {address.slice(0, typed)}
            {phase === 'typing' && <i className="preview__caret" aria-hidden="true" />}
          </span>
        </div>
      </div>

      <div className="preview__progress" aria-hidden="true">
        <span />
      </div>

      <div className="preview__screen" ref={screenRef}>
        {/* Esqueleto exibido enquanto a "página" carrega */}
        <div className="preview__skeleton" aria-hidden="true">
          <div className="sk__nav">
            <i className="sk sk--logo" />
            <i className="sk sk--link" />
            <i className="sk sk--link" />
            <i className="sk sk--link" />
            <i className="sk sk--btn" />
          </div>
          <div className="sk__hero">
            <div className="sk__col">
              <i className="sk sk--title" />
              <i className="sk sk--title sk--short" />
              <i className="sk sk--text" />
              <i className="sk sk--text sk--short" />
              <i className="sk sk--cta" />
            </div>
            <i className="sk sk--card" />
          </div>
        </div>

        <div className="preview__viewport">
          <div className={`preview__page${image ? '' : ' preview__page--fill'}`} ref={pageRef}>
            {image ? (
              <img
                className="preview__shot"
                src={image}
                alt={`Página do projeto ${name}`}
                loading="lazy"
                decoding="async"
                ref={(img) => {
                  if (img?.complete && img.naturalWidth) setImageLoaded(true)
                }}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <BotPreview />
            )}
          </div>
        </div>

        <span className="preview__scan" aria-hidden="true" />

        {image && (
          <div className="preview__scrollbar" aria-hidden="true">
            <span ref={thumbRef} />
          </div>
        )}

        {canScroll && (
          <span className="preview__hint" aria-hidden="true">
            <span className="preview__hintIcon" />
            Passe o mouse para navegar
          </span>
        )}
      </div>
    </div>
  )
}
