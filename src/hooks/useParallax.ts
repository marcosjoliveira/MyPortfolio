import { useEffect, useRef } from 'react'

/**
 * useParallax
 * ────────────────────────────────────────────────────────────────────────
 * Cria uma sensação de profundidade: enquanto a página rola, o elemento se
 * move numa velocidade DIFERENTE da velocidade normal do scroll. Isso é o
 * clássico efeito "parallax" (elementos de fundo parecem mais distantes,
 * elementos de destaque parecem "flutuar" por cima do resto).
 *
 * Internamente ele calcula a distância do centro do elemento até o centro
 * da tela e aplica esse valor, multiplicado pela `speed`, numa variável CSS
 * (`--parallax-y`). O CSS de cada componente decide o que fazer com ela,
 * geralmente algo como: transform: translateY(var(--parallax-y, 0px));
 *
 * @param speed  Intensidade e direção do movimento:
 *                 0     → elemento não se move (sem parallax)
 *                 0.15  → movimento sutil (bom pra textos/orbes de fundo)
 *                 0.4+  → movimento mais perceptível (bom pra elementos decorativos)
 *                 valor negativo → move na direção CONTRÁRIA ao scroll
 */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeita quem prefere menos animação nas configurações do sistema
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    let raf = 0

    function update() {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2

      // Distância (em px) do centro do elemento até o centro da tela.
      // Quanto mais longe do centro, mais deslocado o elemento fica.
      const distanceFromCenter = elementCenter - viewportCenter
      const offset = distanceFromCenter * speed * -0.15

      el.style.setProperty('--parallax-y', `${offset}px`)
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return ref
}
