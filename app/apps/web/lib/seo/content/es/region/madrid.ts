import type { RegionContent } from '../../types';

/**
 * Contenido de la Comunidad de Madrid — traducción al español (archivo de
 * contenido por idioma).
 *
 * Texto para la página de región `es` de Madrid en
 * `/es/location/spain/madrid`.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'madrid',
  title: 'Comunidades en Madrid | JoinOrigin',
  description:
    'Encuentra o crea comunidades en la Comunidad de Madrid — desde las escenas de startups y creativas de la capital hasta los pueblos de la región. Lista de espera de JoinOrigin.',
  intro:
    'La Comunidad de Madrid es una de las regiones más pequeñas de España en superficie pero una de las más densamente pobladas, con la capital en su centro y un anillo de ciudades dormitorio que se extiende hacia fuera. Esta combinación hace que el paisaje comunitario regional sea inusualmente concentrado: la mayoría de los grupos que sirven a la región se reúnen dentro de la propia ciudad, mientras que localidades como Alcalá de Henares, Móstoles y Leganés acogen sus propias escenas locales ligadas a universidades y a la vida de barrio. La región es el corazón político, económico y cultural de España, lo que atrae a personas de todas las regiones y de toda América Latina, haciendo la mezcla comunitaria genuinamente diversa. El transporte público — el Metro, los trenes de Cercanías y una densa red de autobuses — conecta la capital con sus suburbios rápidamente, de modo que un grupo anclado en el centro de Madrid puede atraer miembros de toda la región. Universidades como la Complutense y la Autónoma se encuentran en la región y alimentan un flujo constante de estudiantes hacia la vida comunitaria. Para cualquiera que organice o se una a un grupo, la región ofrece la densidad de una capital europea con el alcance de un área metropolitana más amplia.',
  dataPoints: [
    'La Comunidad de Madrid tiene aproximadamente 6,7 millones de habitantes.',
    'Capital de España y centro neurálgico de la región.',
    'El transporte público denso conecta la capital con el cinturón de cercanías.',
    'Acoge las universidades Complutense, Autónoma y Politécnica.',
  ],
  faq: [
    {
      question: '¿La región de Madrid es diferente de la escena de la ciudad?',
      answer:
        'La región se centra en la ciudad, por lo que la mayoría de las comunidades regionales se reúnen dentro de la capital. Esta página cubre la Comunidad de Madrid en su conjunto; la página de la ciudad de Madrid profundiza en distritos, lugares y tipos de grupo.',
    },
    {
      question: '¿Qué zonas de la región tienen comunidades activas?',
      answer:
        'El centro de Madrid es el núcleo más denso; ciudades universitarias como Alcalá de Henares y Getafe acogen comunidades estudiantiles y de investigación, y el cinturón de cercanías tiene asociaciones de vecinos activas.',
    },
    {
      question: '¿JoinOrigin opera en la región de Madrid?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. La página de la región de Madrid está traducida al español, y la plataforma ayuda a la gente a encontrar o crear comunidades en cualquier lugar de la región.',
    },
  ],
};

export default content;
