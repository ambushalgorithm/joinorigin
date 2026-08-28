import type { CountryContent } from '../../types';

/**
 * Conteúdo da página do Brasil (tradução pt-BR) — arquivo de conteúdo
 * por idioma.
 *
 * Texto para a página `/pt-BR/location/brazil`. O texto vive AQUI, nunca
 * nos JSONs de idioma (localização R2/R5). Prosa honesta e perene sobre
 * a cena comunitária brasileira.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'pt-BR',
  slug: 'brazil',
  title: 'Origins no Brasil | JoinOrigin',
  description:
    'Encontre ou comece Origins no Brasil — de grupos de startups em São Paulo a cenas criativas no Rio e redes de pequenas empresas em todo o país. Entre na lista de espera da JoinOrigin.',
  intro:
    'O Brasil é um país do tamanho de um continente, com uma cultura comunitária tão diversa quanto a sua geografia. Da densidade urbana de São Paulo e dos ritmos de praia e samba do Rio de Janeiro às cidades universitárias do Sul e às cidades amazônicas do Norte, as comunidades se formam em torno de vizinhança, fé, música, esporte e profissão de maneiras que variam por região. O país funciona sobre tradições sociais que tornam o encontro natural: rodas de samba e forró, domingos de feijoada, academias de jiu-jitsu, comunidades religiosas e o onipresente café e a lanchonete como pontos de encontro. O português brasileiro é o idioma compartilhado em todos os 26 estados mais o distrito federal, o que dá às comunidades nacionais uma língua comum mesmo com identidades regionais fortes. Nas últimas duas décadas, o ecossistema de startups amadureceu — São Paulo ancora fintechs e marketplaces, enquanto outras capitais têm suas próprias aceleradoras e redes de fundadores — e as comunidades criativas em música, design e cinema estão entre as mais vibrantes da América Latina. Para quem organiza ou participa de um grupo, o Brasil recompensa clareza sobre geografia, horário e cultura: uma comunidade que entende a sua cidade e o seu povo encontra brasileiros calorosos, expressivos e presentes.',
  dataPoints: [
    'População de cerca de 209 milhões em 26 estados mais o distrito federal.',
    'O português (pt-BR) é o idioma principal.',
    'A capital federal é Brasília.',
    'Fortes tradições de samba, forró, feijoada e jiu-jitsu como âncoras sociais.',
  ],
  faq: [
    {
      question: 'Como encontro Origins no Brasil?',
      answer:
        'Use o hub /location para escolher uma cidade e explore as páginas por tipo de grupo: startups, criativos, políticos, encontros e pequenas empresas. Universidades, academias, igrejas e associações de bairro também são bons pontos de partida para grupos presenciais.',
    },
    {
      question: 'Como as diferenças regionais afetam as comunidades no Brasil?',
      answer:
        'Cada região tem o seu ritmo — São Paulo é densa e focada em trabalho, o Rio é social e ao ar livre, o Sul tem forte cultura de clubes de herança europeia e o Nordeste é conhecido pela música e pelas festas. Escolher uma cidade e um local que combinem com o ritmo local ajuda as comunidades a prosperar.',
    },
    {
      question: 'A JoinOrigin opera no Brasil?',
      answer:
        'Sim. A JoinOrigin não tem escritórios locais. As páginas de São Paulo e do Rio de Janeiro estão disponíveis em português, e o produto ajuda as pessoas a encontrar ou começar Origins em qualquer lugar do Brasil.',
    },
  ],
};

export default content;
