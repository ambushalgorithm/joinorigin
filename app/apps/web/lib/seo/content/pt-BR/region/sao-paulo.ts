import type { RegionContent } from '../../types';

/**
 * Conteúdo da região de São Paulo (tradução pt-BR) — arquivo de
 * conteúdo por idioma.
 *
 * Texto para a página `/pt-BR/location/brazil/sao-paulo`. Prosa honesta
 * e perene sobre a vida comunitária do estado.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'pt-BR',
  slug: 'sao-paulo',
  title: 'Origins em São Paulo | JoinOrigin',
  description:
    'Encontre ou comece Origins em São Paulo — grupos de startups, criativos, políticos, encontros e pequenas empresas em todo o estado. Entre na lista de espera da JoinOrigin.',
  intro:
    'O estado de São Paulo é o motor econômico do Brasil e uma das regiões com maior densidade de comunidades da América Latina. A capital, a cidade de São Paulo, é a maior cidade das Américas, com cerca de 12 milhões de habitantes, e ancora o ecossistema de startups do país — fintechs, marketplaces e tecnologia empresarial se concentram ao redor da Avenida Faria Lima, de Pinheiros e da Vila Madalena — ao lado de uma das grandes cenas gastronômicas do mundo, um importante circuito de artes e cultura e universidades como a USP, a Unicamp e a Fundação Getulio Vargas. Além da capital, o estado é cheio de cidades médias: Campinas, Sorocaba, Ribeirão Preto, São José dos Campos e Santos têm cada uma as suas próprias redes universitárias, industriais ou portuárias. Os paulistas são conhecidos por trabalhar duro e comer bem, e a enorme herança de café e agricultura do estado é profunda no interior. A vida comunitária em São Paulo recompensa organização: os locais lotam rápido, o trânsito molda o calendário e os grupos de sucesso tendem a ser específicos sobre bairro, formato e horário. Para quem organiza ou participa de uma comunidade, o estado oferece a rara combinação de escala, densidade e oportunidade profissional.',
  dataPoints: [
    'A capital do estado é a cidade de São Paulo, a maior das Américas.',
    'Cerca de 12 milhões de habitantes na capital; o estado é o mais populoso do Brasil.',
    'Polos do interior: Campinas, Sorocaba, Ribeirão Preto, São José dos Campos, Santos.',
    'Âncoras: USP, Unicamp, corredor da Faria Lima e a cena de startups mais densa do Brasil.',
  ],
  faq: [
    {
      question: 'Como as comunidades diferem pelo estado de São Paulo?',
      answer:
        'A capital é densa, acelerada e profissional; as cidades do interior são mais tranquilas e orientadas à comunidade, em torno de universidades e indústrias; o litoral acrescenta vida de praia e de porto. Os formatos devem combinar com o ritmo local.',
    },
    {
      question: 'Qual é a melhor maneira de começar um Origin em São Paulo?',
      answer:
        'Escolha um bairro, um idioma claro (português, inglês ou ambos) e um local com bom acesso ao transporte. Consistência importa: um evento semanal ou mensal recorrente no mesmo lugar fideliza mais rápido do que eventos pontuais.',
    },
    {
      question: 'A JoinOrigin opera em São Paulo?',
      answer:
        'Sim. A JoinOrigin não tem escritórios locais. As páginas de São Paulo estão disponíveis em português, e o produto ajuda as pessoas a encontrar ou começar Origins em todo o estado.',
    },
  ],
};

export default content;
