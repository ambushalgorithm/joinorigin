import type { CountryContent } from '../../types';

/**
 * Conteúdo de Portugal — tradução em português (arquivo de conteúdo por
 * idioma).
 *
 * Texto da página de país `pt-BR` de Portugal em
 * `/pt-BR/location/portugal`. O texto vive AQUI, nunca nos JSONs de idioma
 * (localização R2/R5). `title`/`description` trazem os títulos/descrições
 * SEO em português.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'pt-BR',
  slug: 'portugal',
  title: 'Comunidades em Portugal | JoinOrigin',
  description:
    'Encontre ou crie comunidades em Portugal — das cenas de startups em Lisboa às associações locais, à cultura gastronômica e às redes de pequenas empresas. Lista de espera da JoinOrigin.',
  intro:
    'Portugal tem uma cultura comunitária calorosa e próxima, moldada pelo seu tamanho, pelo seu litoral e por uma forte tradição de associações locais. Nas cidades de todo o país, o café, o mercado e a associação local são os pontos de encontro naturais — onde os vizinhos se encontram, os clubes se formam e as festas acontecem. Lisboa, a capital e maior cidade, abriga as cenas profissionais mais densas do país: uma comunidade de startups em rápido crescimento, indústrias criativas e uma grande população internacional que se concentra em espaços de coworking, incubadoras e nos bairros das colinas da cidade. O Porto, a segunda cidade, mantém uma cena própria e vibrante, e cidades universitárias como Coimbra e Braga carregam fortes comunidades estudantis e acadêmicas. A cultura gastronômica do país — a pastelaria, a tasca, o jantar tardio — torna o encontro casual fácil, enquanto as casas de fado e as festas locais mantêm viva a identidade dos bairros. O inglês é amplamente falado nos círculos profissionais e de startups, o que torna Lisboa especialmente acolhedora para recém-chegados. Esteja você procurando um meetup de tecnologia, um comitê de bairro, um clube de surfe ou uma rede de pequenas empresas, Portugal oferece uma paisagem genuína e amigável para encontrar ou criar uma comunidade.',
  dataPoints: [
    'População de aproximadamente 10,3 milhões, incluindo Açores e Madeira.',
    'O português é a língua principal; o mirandês é reconhecido regionalmente.',
    'A capital é Lisboa; o Porto é o segundo grande centro.',
    'Forte cultura de café, mercado e associações locais em todo o país.',
  ],
  faq: [
    {
      question: 'Como encontro comunidades em Portugal?',
      answer:
        'Use o hub /location para escolher uma cidade e depois explore as páginas de tipos de grupo: startups, criativas, políticas, meetups e pequenas empresas. Associações locais e cafés também são ótimos pontos de partida.',
    },
    {
      question: 'Posso criar uma comunidade em uma cidade portuguesa?',
      answer:
        'Sim. As cidades portuguesas têm cafés, salões comunitários, espaços de coworking e parques que hospedam os primeiros encontros, e a cultura social amigável torna os recém-chegados bem-vindos. Os guias passo a passo cobrem os passos práticos.',
    },
    {
      question: 'A JoinOrigin opera em Portugal?',
      answer:
        'Sim. A JoinOrigin não tem escritórios locais. As páginas de Portugal e Lisboa estão traduzidas para o português, e a plataforma ajuda as pessoas a encontrar ou criar comunidades em qualquer lugar do país.',
    },
  ],
};

export default content;
