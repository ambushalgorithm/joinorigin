import type { RegionContent } from '../../types';

/**
 * Contenido de Cataluña — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para la página de región `es` de Cataluña en
 * `/es/location/spain/catalonia`.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'catalonia',
  title: 'Origins en Cataluña | JoinOrigin',
  description:
    'Encuentra o crea Origins en Cataluña — desde las escenas de startups y creativas de Barcelona hasta los pueblos de la región. Lista de espera de JoinOrigin.',
  intro:
    'Cataluña es una región distinta dentro de España, con lengua, cultura y una fuerte tradición de asociacionismo cívico propios. Barcelona, capital regional y segunda ciudad más grande de España, ancla las escenas profesionales y creativas de la región — startups, diseño, arquitectura y comunidades internacionales se concentran en espacios de coworking, universidades y los barrios icónicos de la ciudad. Más allá de la capital, las ciudades medianas y los pueblos de la región mantienen comunidades locales activas: Girona y Tarragona tienen escenas locales vivas, mientras que los pueblos más pequeños se organizan en torno al casal, el centro cívico y cultural que acoge desde clases de lengua hasta fiestas de barrio. La sociedad civil catalana tiene raíces profundas — desde los ateneos del siglo XIX hasta la red moderna de cooperativas y organizaciones comunitarias — y la propia lengua es una marca de pertenencia para muchos grupos. Los enlaces de transporte de la región facilitan la conexión: la red de trenes une Barcelona con el resto del territorio, de modo que una comunidad anclada en la ciudad puede atraer miembros de toda Cataluña. Tanto si buscas un encuentro tecnológico, una asociación cultural o una red de pequeñas empresas, Cataluña ofrece un paisaje rico y distintivo.',
  dataPoints: [
    'Cataluña tiene aproximadamente 7,6 millones de habitantes en el noreste de España.',
    'El catalán y el español son lenguas oficiales.',
    'La capital regional es Barcelona; Girona y Tarragona son grandes centros.',
    'Fuerte tradición de asociacionismo cívico y ateneos.',
  ],
  faq: [
    {
      question: '¿Cataluña es diferente del resto de España?',
      answer:
        'Sí, en aspectos importantes: tiene lengua propia (el catalán), una identidad regional fuerte y una tradición distintiva de asociaciones cívicas. Muchos grupos funcionan en catalán, en español o en ambos, y las comunidades internacionales suelen usar el inglés.',
    },
    {
      question: '¿Qué zonas de Cataluña tienen comunidades activas?',
      answer:
        'Barcelona es el núcleo más denso para grupos profesionales y creativos; Girona, Tarragona y Lleida acogen escenas locales fuertes, y los pueblos de la región se organizan en torno a sus casales y centros culturales.',
    },
    {
      question: '¿JoinOrigin opera en Cataluña?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. La página de la región de Cataluña está traducida al español, y la plataforma ayuda a la gente a encontrar o crear Origins en cualquier lugar de la región.',
    },
  ],
};

export default content;
