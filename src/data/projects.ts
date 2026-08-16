/**
 * projects.ts
 * ────────────────────────────────────────────────────────────────────────
 * 📌 ESTE É O ARQUIVO QUE VOCÊ EDITA PRA MUDAR O CATÁLOGO.
 *
 * Cada objeto abaixo vira um card na seção "Catálogo de Projetos".
 * Pra adicionar um projeto novo, copie um bloco inteiro `{ ... }`, cole no
 * final do array e ajuste os campos. Pra remover, apague o bloco.
 * A ORDEM da lista é a ordem de exibição (o primeiro item aparece no topo).
 *
 * CAMPOS:
 * - id           → identificador único (sem espaços/acentos), usado internamente pelo React
 * - index        → número de exibição do projeto (ex: "01", "02"...)
 * - category     → rótulo pequeno acima do título (ex: "SAAS", "AUTOMAÇÃO")
 * - title        → nome do projeto
 * - tagline      → frase curta de efeito (1 linha)
 * - description  → parágrafo descrevendo o projeto com mais detalhes
 * - stack        → lista de tecnologias usadas (aparecem como "pills")
 * - features     → lista de destaques/funcionalidades (aparecem com ✓)
 * - link         → URL pública do projeto. Deixe "" (vazio) se ainda não tiver link —
 *                   o card mostra "Em breve" automaticamente no lugar do botão.
 * - status       → 'Em produção' | 'Em desenvolvimento' | 'MVP'
 * - accent       → 'mint' | 'cyan' — alterna a cor de destaque de cada card
 * - image        → (opcional) caminho de um screenshot real, ex: '/projects/redaciona.png'.
 *                   Coloque o arquivo dentro da pasta `public/projects/` e informe o caminho aqui.
 *                   Se deixar undefined, o card mostra um mockup abstrato gerado só com CSS.
 */

export interface Project {
  id: string
  index: string
  category: string
  title: string
  tagline: string
  description: string
  stack: string[]
  features: string[]
  link: string
  status: 'Em produção' | 'Em desenvolvimento' | 'MVP'
  accent: 'mint' | 'cyan'
  image?: string
}

export const projects: Project[] = [
  {
    id: 'redaciona-ai',
    index: '01',
    category: 'SaaS Educacional',
    title: 'Redaciona AI',
    tagline: 'Correção de redações do ENEM com IA, em segundos.',
    description:
      'Plataforma que usa IA para corrigir redações seguindo os 5 critérios oficiais do ENEM, ' +
      'com devolutiva detalhada por competência. Construída de ponta a ponta: autenticação, ' +
      'cobrança recorrente e avulsa, e uma arquitetura pensada pra escalar no período de provas.',
    stack: ['React', 'Vite', 'Express', 'Supabase', 'Claude AI', 'Stripe', 'Google OAuth'],
    features: [
      'Correção automática nos 5 critérios oficiais do ENEM',
      'Créditos avulsos + assinatura recorrente via Stripe',
      'Login social com Google e política de privacidade LGPD',
      'SEO otimizado para captar tráfego orgânico na época de provas',
    ],
    // TODO: confirme se este é o link definitivo antes de publicar
    link: 'https://redacionaai.com.br',
    status: 'Em produção',
    accent: 'mint',
  },
  {
    id: 'whatsapp-bot',
    index: '02',
    category: 'Automação & Growth',
    title: 'Bot de Ofertas via WhatsApp',
    tagline: 'Raspagem de preços 24/7, direto pro bolso de quem compra.',
    description:
      'Bot que monitora Amazon, Mercado Livre e Shopee em múltiplos nichos e envia promoções com ' +
      'link de afiliado para grupos de WhatsApp automaticamente, com histórico de preços pra provar ' +
      'quando uma oferta é realmente boa.',
    stack: ['Node.js', 'Baileys', 'Puppeteer', 'Railway'],
    features: [
      'Selo "menor preço em 30 dias" calculado a partir do histórico',
      'Textos de divulgação variados gerados automaticamente',
      'Dashboard de cliques para medir performance por oferta',
      'Deploy 24/7 na Railway com QR Code de pareamento via HTTP',
    ],
    // TODO: troque pelo link do grupo/canal de exemplo ou pelo repositório
    link: 'https://chat.whatsapp.com/HViMq9bjDQa3hVooY2eF5o',
    status: 'Em produção',
    accent: 'mint',
  },
  {
    id: 'tarefo',
    index: '03',
    category: 'Produtividade',
    title: 'Tarefo',
    tagline: 'Gerenciador de tarefas simples, rápido e no bolso.',
    description:
      'App de tarefas pessoais com frontend web e versão Android nativa a partir da mesma base de ' +
      'código, com verificação de e-mail, tema escuro e uma API própria cuidando dos dados.',
    stack: ['React', 'Vite', 'Capacitor', 'Express', 'PostgreSQL'],
    features: [
      'App Android gerado a partir da mesma base React via Capacitor',
      'Verificação de e-mail transacional via Resend',
      'Tema claro/escuro com persistência de preferência',
      'Domínio próprio configurado (usetarefo.com.br)',
    ],
    link: 'https://usetarefo.com.br',
    status: 'Em produção',
    accent: 'mint',
  },
  {
    id: 'barberos',
    index: '04',
    category: 'SaaS Multi-tenant',
    title: 'BarberOS',
    tagline: 'Sistema de gestão para barbearias, pensado para escalar.',
    description:
      'Plataforma multi-tenant para redes de barbearias administrarem agenda, equipe e faturamento ' +
      'em um só lugar. Nasceu de um Documento de Design de Software completo, com isolamento de ' +
      'dados por barbearia desde a primeira linha de código.',
    stack: ['Next.js', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
    features: [
      'Arquitetura multi-tenant com isolamento por barbershop_id',
      'Documento de design completo antes da primeira linha de código',
      'Modelagem pensada para múltiplas unidades e equipes',
    ],
    // TODO: adicione o link assim que o MVP estiver publicado
    link: '',
    status: 'Em desenvolvimento',
    accent: 'cyan',
  },
  {
    id: 'estoque-pocket',
    index: '05',
    category: 'Gestão de Estoque',
    title: 'Estoque Pocket',
    tagline: 'Controle de estoque enxuto para pequenos vendedores.',
    description:
      'Aplicação leve para pequenos sellers controlarem entrada, saída e nível de estoque sem ' +
      'planilha, com um modo de demonstração para testar antes de conectar o banco de dados real.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    features: [
      'Modo demo funcional sem precisar configurar backend',
      'Caminho direto de migração para Supabase em produção',
      'Interface enxuta pensada para uso no dia a dia do lojista',
    ],
    // TODO: adicione o link assim que publicar uma instância de demonstração
    link: '',
    status: 'MVP',
    accent: 'mint',
  },
]
