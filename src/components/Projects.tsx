import SectionHead from './SectionHead'
import ProjectItem, { type Project } from './ProjectItem'
import './Projects.css'

/* Para trocar um print: substitua o arquivo em public/projects/ mantendo
   o mesmo nome (proporção 16:10, ex.: 1600×1000). */
const PROJECTS: Project[] = [
  {
    name: 'Redaciona AI',
    category: 'SaaS educacional',
    status: 'Em produção',
    description:
      'Plataforma que corrige redações com IA na grade oficial de cada banca. O estudante cola o texto e recebe a nota por competência, os trechos que mais custam pontos e como corrigir cada um.',
    highlights: [
      'Correção por competência para ENEM, FUVEST, UNICAMP, UERJ e Cebraspe',
      'Créditos avulsos e assinatura recorrente com Stripe',
      'Login com Google e SEO voltado para a temporada de provas',
    ],
    stack: ['React', 'Node.js', 'Claude API', 'Supabase', 'Stripe'],
    variant: 'redaciona',
    image: '/projects/redaciona.webp',
    url: 'https://redacionaai.com.br',
    linkLabel: 'redacionaai.com.br',
  },
  {
    name: 'Tarefo',
    category: 'Produtividade · PWA',
    status: 'Em produção',
    description:
      'Gerenciador de tarefas minimalista e 100% local. Roda como PWA offline-first, sem backend e sem cadastro — os dados nunca saem do dispositivo.',
    highlights: [
      'Prioridades, vencimentos e dashboard de progresso',
      'Dados em IndexedDB: funciona sem internet',
      'Mesma base de código na web e no Android, via Capacitor',
    ],
    stack: ['React', 'IndexedDB', 'PWA', 'Capacitor'],
    variant: 'tarefo',
    image: '/projects/tarefo.webp',
    url: 'https://usetarefo.com.br',
    linkLabel: 'usetarefo.com.br',
    reversed: true,
  },
  {
    name: 'Bot de Promoções',
    category: 'Automação · Telegram e WhatsApp',
    status: 'Em produção',
    description:
      'Automação que rastreia ofertas na Amazon, Mercado Livre e Shopee e publica cada uma, já formatada, em canais do Telegram e do WhatsApp.',
    highlights: [
      'Scraping resiliente com sessão autenticada',
      'Mensagem pronta com preço, desconto e link de compra',
      'Rodando 24/7 com deploy contínuo na Railway',
    ],
    stack: ['Node.js', 'Puppeteer', 'Telegram API', 'Railway'],
    variant: 'bot',
    url: 'https://linkme.bio/jardim.dev',
    linkLabel: 'Entrar nos canais',
    displayUrl: 't.me/promocoesdomarcos',
  },
]

export default function Projects({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="projetos" className="projects section">
      <div className="section__inner">
        <SectionHead
          label="Projetos"
          title="Trabalho selecionado"
          lead="Três produtos que idealizei, construí e mantenho no ar — cada um resolvendo um problema diferente, com usuários reais."
        />

        <div className="projects__list">
          {PROJECTS.map((project, i) => (
            <ProjectItem
              key={project.name}
              project={project}
              index={i + 1}
              total={PROJECTS.length}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
