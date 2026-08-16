import Reveal from './Reveal'
import ProjectItem, { type Project } from './ProjectItem'
import './Projects.css'

const PROJECTS: Project[] = [
  {
    name: 'Redaciona AI',
    description:
      'Plataforma que corrige redações do ENEM com IA, seguindo as competências oficiais do INEP. Feita para o estudante entender exatamente onde perder menos pontos.',
    stack: ['React', 'Node.js', 'Claude API', 'Supabase', 'Stripe'],
    variant: 'redaciona',
    url: 'https://redacionaai.com.br',
    image: '/projects/redaciona.png', // coloque o arquivo em public/projects/
    linkLabel: 'redacionaai.com.br',
  },
  {
    name: 'Tarefo',
    description:
      'Gerenciador de tarefas minimalista, 100% local — roda como PWA offline-first, sem backend, sem fricção. Seus dados nunca saem do dispositivo.',
    stack: ['React', 'IndexedDB', 'PWA', 'Capacitor'],
    variant: 'tarefo',
    image: '/projects/tarefo.png',
    url: 'https://usetarefo.com.br',
    linkLabel: 'usetarefo.com.br',
    reversed: true,
  },
  {
    name: 'Bot de Promoções para Telegram e WhatsApp',
    description:
      'Automação que rastreia ofertas na Amazon, Mercado Livre e Shopee e distribui no Telegram. Scraping resiliente, sessão autenticada e deploy contínuo em produção.',
    stack: ['Node.js', 'Puppeteer', 'Telegram API', 'Railway'],
    variant: 'bot',
    image: '/projects/bot-promocoes.png',
    url: 'https://linkme.bio/jardim.dev',
    linkLabel: 'Telegram e WhatsApp',
  },
]

export default function Projects({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="projetos" className="projects section">
      <div className="section__inner">
        <Reveal as="h2" className="projects__title">
          Projetos selecionados
        </Reveal>

        <div className="projects__list">
          {PROJECTS.map((project) => (
            <ProjectItem key={project.name} project={project} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
