import SectionHead from './SectionHead'
import ProjectItem, { type Project } from './ProjectItem'
import './Projects.css'

/* Para trocar um print: substitua o arquivo em public/projects/ mantendo o
   mesmo nome. É o print da página inteira (1400 px de largura, altura livre):
   a prévia rola por ele quando o mouse passa por cima. */
const PROJECTS: Project[] = [
  {
    name: 'Redaciona AI',
    category: 'SaaS educacional',
    status: 'Em produção',
    description: (
      <>
        Corrige redações com <strong>IA</strong> seguindo os critérios de cada vestibular. O
        estudante envia o texto e recebe a <strong>nota por competência</strong> e o que melhorar.
      </>
    ),
    highlights: [
      <>
        <strong>ENEM, FUVEST, UNICAMP, UERJ e Cebraspe</strong>
      </>,
      'Pagamento por créditos ou assinatura',
    ],
    stack: ['React', 'Node.js', 'Claude API', 'Supabase', 'Stripe'],
    variant: 'redaciona',
    image: '/projects/redaciona-full.webp',
    url: 'https://redacionaai.com.br',
    linkLabel: 'redacionaai.com.br',
  },
  {
    name: 'Tarefo',
    category: 'Produtividade · PWA',
    status: 'Em produção',
    description: (
      <>
        Lista de tarefas simples, <strong>sem cadastro</strong>. Funciona{' '}
        <strong>sem internet</strong> e os dados ficam só no seu aparelho.
      </>
    ),
    highlights: [
      'Prioridades, prazos e acompanhamento do progresso',
      <>
        Disponível na <strong>web</strong> e no <strong>Android</strong>
      </>,
    ],
    stack: ['React', 'IndexedDB', 'PWA', 'Capacitor'],
    variant: 'tarefo',
    image: '/projects/tarefo-full.webp',
    url: 'https://usetarefo.com.br',
    linkLabel: 'usetarefo.com.br',
    reversed: true,
  },
  {
    name: 'Bot de Promoções',
    category: 'Automação · Telegram e WhatsApp',
    status: 'Em produção',
    description: (
      <>
        Busca ofertas na <strong>Amazon</strong>, no <strong>Mercado Livre</strong> e na{' '}
        <strong>Shopee</strong> e publica automaticamente nos meus canais do Telegram e do
        WhatsApp.
      </>
    ),
    highlights: [
      'Cada post sai com preço, desconto e link de compra',
      <>
        Funciona <strong>24 horas por dia</strong>, sem intervenção
      </>,
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
          title="O que eu construí"
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
