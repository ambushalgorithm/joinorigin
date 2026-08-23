import type { RegionContent } from '../../types';

/**
 * Conteúdo da região de Lisboa — tradução em português (arquivo de
 * conteúdo por idioma).
 *
 * Texto da página de região `pt-BR` de Lisboa em
 * `/pt-BR/location/portugal/lisbon`.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'pt-BR',
  slug: 'lisbon',
  title: 'Comunidades em Lisboa | JoinOrigin',
  description:
    'Encontre ou crie comunidades na região de Lisboa — das cenas de startups da capital às associações locais do distrito. Lista de espera da JoinOrigin.',
  intro:
    'O distrito de Lisboa é o centro demográfico e econômico de Portugal, sede da capital e de um anel denso de municípios ao longo do estuário do Tejo. A região abriga as maiores comunidades profissionais e criativas do país: uma cena de startups em rápido crescimento, indústrias criativas e uma grande população internacional se concentram nos bairros centrais de Lisboa, enquanto municípios como Cascais, Oeiras e Sintra mantêm comunidades locais ativas. O clima ameno e a geografia costeira da região sustentam fortes comunidades ao ar livre, do surfe e da vela ao longo da costa às caminhadas nas colinas de Sintra. A tradição portuguesa de associação local — o café, o mercado, a associação — está profundamente enraizada aqui, e as universidades da região, incluindo a Universidade de Lisboa e a NOVA, alimentam um fluxo constante de estudantes para a vida comunitária. As ligações de transporte, incluindo as linhas de trem ao longo da costa e do Tejo, unem a região, de modo que uma comunidade ancorada em Lisboa pode atrair membros de todo o distrito. O inglês é amplamente falado nos círculos profissionais, tornando a região acolhedora para recém-chegados. Esteja você procurando um meetup de tecnologia, um clube de surfe, um comitê de bairro ou uma rede de pequenas empresas, a região de Lisboa oferece uma paisagem calorosa e dinâmica.',
  dataPoints: [
    'O distrito de Lisboa tem aproximadamente 2,3 milhões de habitantes.',
    'Contém Lisboa, a capital, e municípios como Cascais e Sintra.',
    'O centro demográfico e econômico de Portugal.',
    'Clima ameno e litoral sustentam fortes comunidades ao ar livre.',
  ],
  faq: [
    {
      question: 'A região de Lisboa é diferente da cena da cidade?',
      answer:
        'Sim. A região de Lisboa é o distrito mais amplo — a capital mais os municípios ao redor do Tejo. A maioria das comunidades nacionais se reúne na cidade, mas a região tem fortes cenas costeiras e locais.',
    },
    {
      question: 'Quais partes da região de Lisboa têm comunidades ativas?',
      answer:
        'O centro de Lisboa é o polo mais denso para grupos profissionais e criativos; Cascais e Oeiras têm comunidades costeiras ativas, e Sintra apoia grupos de natureza e atividades ao ar livre.',
    },
    {
      question: 'A JoinOrigin opera na região de Lisboa?',
      answer:
        'Sim. A JoinOrigin não tem escritórios locais. A página da região de Lisboa está traduzida para o português, e a plataforma ajuda as pessoas a encontrar ou criar comunidades em qualquer lugar da região.',
    },
  ],
};

export default content;
