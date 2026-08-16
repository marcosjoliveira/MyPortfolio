import { useEffect, useRef } from 'react'
import './Cursor.css'

/**
 * Cursor
 * ────────────────────────────────────────────────────────────────────────
 * Substitui o cursor padrão do sistema por uma experiência customizada,
 * feita de 3 camadas:
 *
 *  1. Um PONTINHO que segue o mouse 1:1 (sem atraso) — dá precisão.
 *  2. Um ANEL que segue o mouse com suavização (lerp) — dá a sensação de
 *     "arrasto"/peso, e cresce (efeito "magnético") ao passar sobre
 *     qualquer elemento marcado com `data-cursor="link"` (links, botões).
 *  3. Um rastro de PARTÍCULAS tipo pólen/vaga-lume, disparado quando o
 *     mouse se move rápido — uma referência sutil ao "Jardim" da marca.
 *
 * Em dispositivos touch (celular/tablet) o cursor customizado não faz
 * sentido, então o componente simplesmente não roda nada nesse caso.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Dispositivos touch não têm mouse de verdade: não faz sentido customizar o cursor ──
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Posição real do mouse (atualizada a cada mousemove)
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    // Posição suavizada do anel (persegue `mouse` com atraso)
    const ring = { x: mouse.x, y: mouse.y }

    let lastX = mouse.x
    let lastY = mouse.y
    let lastSpawnTime = 0
    let isHoveringLink = false
    let raf = 0

    // Pool de partículas ativas na tela no momento
    type Particle = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number; life: number }
    const particles: Particle[] = []

    function spawnParticle(x: number, y: number) {
      const container = particlesRef.current
      if (!container) return

      const el = document.createElement('div')
      el.className = 'cursor-particle'
      container.appendChild(el)

      // Direção aleatória com leve tendência de subir, como pólen flutuando no ar
      const angle = Math.random() * Math.PI * 2
      const velocity = 0.5 + Math.random() * 0.7

      particles.push({
        el,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 0.4,
        life: 1, // 1 = recém-nascida, 0 = morta (some da tela)
      })

      // Limite de segurança: evita acumular partículas demais se o mouse não parar
      if (particles.length > 36) {
        const oldest = particles.shift()
        oldest?.el.remove()
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY

      if (!prefersReducedMotion) {
        // Só cria partícula nova se o mouse estiver se movendo rápido o
        // suficiente e já tiver passado um pequeno intervalo — isso evita
        // gerar dezenas de elementos por segundo em movimentos lentos.
        const dx = mouse.x - lastX
        const dy = mouse.y - lastY
        const speed = Math.hypot(dx, dy)
        const now = performance.now()

        if (speed > 14 && now - lastSpawnTime > 45) {
          lastSpawnTime = now
          spawnParticle(mouse.x, mouse.y)
        }
      }

      lastX = mouse.x
      lastY = mouse.y

      // Verifica se o elemento sob o cursor pede o efeito "magnético"
      const target = e.target as HTMLElement | null
      isHoveringLink = !!target?.closest('[data-cursor="link"]')
    }

    function loop() {
      // O ponto central segue o mouse imediatamente (sem lerp)
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      }

      // O anel externo persegue o mouse suavemente (efeito de "arrasto")
      const lerpFactor = prefersReducedMotion ? 1 : 0.16
      ring.x += (mouse.x - ring.x) * lerpFactor
      ring.y += (mouse.y - ring.y) * lerpFactor

      if (ringRef.current) {
        const scale = isHoveringLink ? 2.4 : 1
        ringRef.current.style.transform =
          `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
        ringRef.current.classList.toggle('cursor-ring--active', isHoveringLink)
      }

      // Atualiza posição/vida de cada partícula e remove as que já morreram
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.018

        if (p.life <= 0) {
          p.el.remove()
          particles.splice(i, 1)
          continue
        }

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.life})`
        p.el.style.opacity = `${p.life}`
      }

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
      particles.forEach((p) => p.el.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={particlesRef} className="cursor-particles" aria-hidden="true" />
    </>
  )
}
