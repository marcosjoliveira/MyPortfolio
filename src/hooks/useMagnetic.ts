import { useEffect, useRef } from 'react'

/**
 * Efeito "magnético" sutil: o elemento se desloca alguns pixels em
 * direção ao cursor quando o mouse passa perto. Movimento máximo de
 * ~10px, desativado em touch e quando prefers-reduced-motion está ativo.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.25,
  max = 10,
  disabled = false,
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    function handleMove(e: MouseEvent) {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)

      const dx = Math.max(-max, Math.min(max, relX * strength))
      const dy = Math.max(-max, Math.min(max, relY * strength))

      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    function handleLeave() {
      if (el) el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength, max, disabled])

  return ref
}
