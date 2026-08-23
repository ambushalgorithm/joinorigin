import type { RegionContent } from '../../types';

/**
 * Contenido de la región de la Ciudad Autónoma de Buenos Aires —
 * traducción al español (archivo de contenido por idioma).
 *
 * Texto para la página `/es/location/argentina/buenos-aires-f-d`. La
 * Ciudad de Buenos Aires es el distrito federal capital, por lo que esta
 * página de región cubre el panorama urbano; la página de la ciudad
 * agrega profundidad por tipo de grupo.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'buenos-aires-f-d',
  title: 'Comunidades en Buenos Aires | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Buenos Aires — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital federal. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Buenos Aires es el distrito federal autónomo de Argentina y el centro claro de la vida comunitaria del país. La ciudad está organizada en barrios con personalidades distintas — Palermo y Villa Crespo para el diseño, las startups y los cafés; San Telmo para la tradición bohemia y los mercados de antigüedades; La Boca para su escena artística obrera y colorida; Recoleta para las librerías y las instituciones culturales; y el Microcentro para la vida corporativa y empresarial. Los porteños son famosamente sociables: rondas de mate en los Bosques de Palermo, milongas de tango por toda la ciudad, paseos dominicales por el mercado de San Telmo y una cultura de café donde escritores y fundadores se reúnen desde hace un siglo. La ciudad concentra la escena profesional más densa del país — el ecosistema de startups anclado en Palermo y Villa Crespo, un teatro independiente de clase mundial, una industria editorial de renombre y universidades como la UBA y Di Tella que alimentan a todas las comunidades. El subte y los colectivos hacen práctico reunirse en toda la ciudad, y la enorme red de cafés garantiza que siempre haya un lugar para hospedar a un grupo. Para quien organiza o se une a una comunidad aquí, Buenos Aires premia elegir un barrio y un formato que abrace el estilo tardío, cálido y conversador de la ciudad.',
  dataPoints: [
    'Buenos Aires es el distrito federal capital (Ciudad Autónoma de Buenos Aires).',
    'Unos 3 millones de habitantes en la ciudad; el área metropolitana es mucho mayor.',
    'Identidades de barrio: Palermo, San Telmo, La Boca, Recoleta, Microcentro.',
    'Sede de la UBA, Di Tella y la escena de startups más densa de Argentina.',
  ],
  faq: [
    {
      question:
        '¿La región de Buenos Aires es lo mismo que la escena de la ciudad de Buenos Aires?',
      answer:
        'Sí. Buenos Aires es una ciudad que además funciona como distrito federal capital. Esta página de región cubre el panorama urbano, mientras que la página de la ciudad de Buenos Aires agrega detalle por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas.',
    },
    {
      question: '¿Qué barrios de Buenos Aires tienen las comunidades más activas?',
      answer:
        'Palermo y Villa Crespo anclan las escenas de startups y diseño, San Telmo lleva la tradición bohemia y cultural, Recoleta es fuerte en literatura e instituciones, y el Microcentro concentra la capa corporativa y profesional.',
    },
    {
      question: '¿JoinOrigin opera en Buenos Aires?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Buenos Aires están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en la capital federal y en todo el país.',
    },
  ],
};

export default content;
