import type { RegionContent } from '../../types';

/**
 * Contenido de la región de la Provincia de Lima — traducción al español
 * (archivo de contenido por idioma).
 *
 * Texto para la página `/es/location/peru/lima-province`. La Provincia
 * de Lima es la provincia constitucional que contiene la capital; esta
 * página de región cubre el panorama provincial, mientras que la página
 * de la ciudad agrega profundidad por tipo de grupo.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'lima-province',
  title: 'Comunidades en Lima | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Lima — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en toda la provincia. Únete a la lista de espera de JoinOrigin.',
  intro:
    'La Provincia de Lima es la provincia constitucional del Perú que contiene la capital, Lima, en la costa del Pacífico. Como sede del gobierno nacional y el mayor centro urbano del país — el área metropolitana alberga a unos diez millones de personas — Lima concentra la mayor parte de la vida profesional, cultural e institucional del Perú. La provincia es un conjunto de distritos distintos, desde el centro histórico y el Barranco y Miraflores bohemios en la costa, hasta los conos norte y sur que albergan a las comunidades trabajadoras y migrantes de la ciudad. Lima es una capital culinaria global, con cevicherías y restaurantes de alta cocina que anclan una fuerte comunidad gastronómica, y tiene una escena de startups en crecimiento en fintech, comercio electrónico e industrias creativas, apoyada por universidades como la PUCP, la UNMSM y la Universidad del Pacífico. La ciudad también conserva tradiciones profundas de asociación regional y migrante, con clubes y organizaciones que mantienen vivas las culturas de la sierra y la selva en la capital. Para quien organiza o se une a una comunidad en la Provincia de Lima, la recompensa es una ciudad de escala, calidez y oportunidad — donde el éxito depende de elegir un distrito y un formato que se ajusten al ritmo local.',
  dataPoints: [
    'Provincia constitucional que contiene la capital, Lima.',
    'Área metropolitana de unos diez millones en la costa del Pacífico.',
    'Distritos: centro histórico, Barranco, Miraflores y los conos norte y sur.',
    'Anclas: PUCP, UNMSM, Universidad del Pacífico y una escena de startups en crecimiento.',
  ],
  faq: [
    {
      question: '¿La Provincia de Lima es lo mismo que la escena de la ciudad de Lima?',
      answer:
        'La Provincia de Lima es la provincia constitucional que contiene la ciudad de Lima, por lo que ambas coinciden en gran medida. Esta página de región cubre el panorama provincial, mientras que la página de la ciudad agrega detalle por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas.',
    },
    {
      question: '¿Qué distritos de Lima tienen las comunidades más activas?',
      answer:
        'Miraflores y Barranco anclan las escenas de startups, creativos y gastronomía, el centro histórico alberga instituciones cívicas y culturales, y los conos norte y sur son sede de fuertes organizaciones vecinales y de comunidades migrantes.',
    },
    {
      question: '¿JoinOrigin opera en Lima?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Lima están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en la provincia y en todo el país.',
    },
  ],
};

export default content;
