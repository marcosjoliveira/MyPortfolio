import { useEffect, useRef, useState } from 'react'

/**
 * Retorna um ref para anexar a um elemento e um boolean `visible`
 * que vira `true` assim que o elemento entra no viewport.
 * Usado para o text-reveal e image-reveal (clip-path) descritos no briefing.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
