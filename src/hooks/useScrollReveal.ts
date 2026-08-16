import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * ────────────────────────────────────────────────────────────────────────
 * Hook que usa a API nativa `IntersectionObserver` para detectar quando um
 * elemento entra na área visível da tela (viewport) e retorna `true` a
 * partir desse momento — é assim que criamos o efeito de "revelar" seções
 * e cards suavemente conforme o usuário rola a página.
 *
 * O elemento some/aparece uma única vez (não volta a ficar invisível se
 * sair da tela de novo), o que evita que a animação "pisque" ao rolar
 * pra cima e pra baixo.
 *
 * COMO USAR:
 *   const [ref, isVisible] = useScrollReveal<HTMLDivElement>()
 *   <div ref={ref} className={isVisible ? 'reveal is-visible' : 'reveal'}>
 *
 * @param threshold  Porcentagem do elemento que precisa estar visível pra
 *                    disparar a animação (0 = qualquer pixel, 1 = 100% visível)
 * @param rootMargin  Margem extra na área de detecção. Um valor negativo no
 *                     final (ex: "-80px") faz a animação disparar um pouco
 *                     ANTES do elemento tocar a borda da tela, o que fica
 *                     mais natural do que esperar ele aparecer 100%.
 */
export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -80px 0px',
) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback: navegadores muito antigos sem suporte a IntersectionObserver
    // simplesmente mostram o conteúdo direto, sem animação.
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // já revelou, não precisa mais observar
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible] as const
}
