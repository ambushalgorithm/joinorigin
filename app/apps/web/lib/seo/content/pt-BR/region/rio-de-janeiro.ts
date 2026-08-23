import type { RegionContent } from '../../types';

/**
 * Conteúdo da região do Rio de Janeiro (tradução pt-BR) — arquivo de
 * conteúdo por idioma.
 *
 * Texto para a página `/pt-BR/location/brazil/rio-de-janeiro`. Prosa
 * honesta e perene sobre a vida comunitária do estado.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'pt-BR',
  slug: 'rio-de-janeiro',
  title: 'Comunidades no Rio de Janeiro | JoinOrigin',
  description:
    'Encontre ou comece comunidades no Rio de Janeiro — grupos de startups, criativos, políticos, encontros e pequenas empresas em todo o estado. Entre na lista de espera da JoinOrigin.',
  intro:
    'O Rio de Janeiro é um estado de contrastes marcantes, e a sua vida comunitária reflete essa diversidade. A capital, a cidade do Rio de Janeiro, é uma das mais famosas do mundo — a cultura de praia de Copacabana e Ipanema, as escolas de samba da Zona Norte, a herança de samba e bossa nova e uma cena criativa em música, cinema e design com alcance global. Ao redor da capital, o estado oferece outro tipo de vida comunitária: cidades serranas como Petrópolis e Teresópolis, o corredor litorâneo de Niterói a Búzios, a cidade industrial de Volta Redonda e as cidades universitárias do interior. Os cariocas, como são conhecidos os habitantes da capital, são famosos pela calidez e abertura, e a beleza natural do estado molda como os grupos se reúnem: rodas de vôlei de praia, clubes de trilha na montanha, comunidades de surf e grupos de festivais ao ar livre são comuns. A cidade também tem uma cena crescente de startups e criativos, fortes comunidades universitárias em torno da UFRJ e da PUC-Rio e profundas tradições de organização cívica nos bairros e favelas. Para quem organiza ou participa de uma comunidade no estado do Rio de Janeiro, a recompensa é uma paisagem onde a conexão social acontece naturalmente — mas onde horário, transporte e respeito ao ritmo local importam.',
  dataPoints: [
    'A capital do estado é a cidade do Rio de Janeiro.',
    'Cerca de 6,7 milhões de habitantes na capital; a região metropolitana é bem maior.',
    'Cidades serranas: Petrópolis e Teresópolis; corredor litorâneo de Niterói a Búzios.',
    'Âncoras: UFRJ, PUC-Rio, escolas de samba e cultura de praia e montanha.',
  ],
  faq: [
    {
      question: 'Como as comunidades diferem pelo estado do Rio de Janeiro?',
      answer:
        'A capital é densa, voltada para a praia e criativa; as cidades serranas são mais tranquilas e familiares; o corredor litorâneo é movido por turismo e vida ao ar livre; e cidades industriais como Volta Redonda têm as suas próprias redes de classe trabalhadora.',
    },
    {
      question: 'Quais são os melhores formatos para encontros comunitários no Rio?',
      answer:
        'Formatos ao ar livre e informais funcionam bem — rodas de praia, clubes de trilha, noites de samba e música e grupos de festivais. Encontros internos prosperam nos cafés, estúdios e espaços universitários da cidade, especialmente fora do calor do auge do verão.',
    },
    {
      question: 'A JoinOrigin opera no Rio de Janeiro?',
      answer:
        'Sim. A JoinOrigin não tem escritórios locais. As páginas do Rio de Janeiro estão disponíveis em português, e o produto ajuda as pessoas a encontrar ou começar comunidades em todo o estado.',
    },
  ],
};

export default content;
