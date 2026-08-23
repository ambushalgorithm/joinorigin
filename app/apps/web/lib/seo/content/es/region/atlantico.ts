import type { RegionContent } from '../../types';

/**
 * Contenido de la región de Atlántico — traducción al español (archivo
 * de contenido por idioma).
 *
 * Texto para la página `/es/location/colombia/atlantico`. Prosa honesta
 * y perenne sobre la vida comunitaria del departamento caribeño.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'atlantico',
  title: 'Comunidades en Atlántico | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Atlántico — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la costa caribeña de Colombia. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Atlántico es un departamento pequeño pero densamente poblado en la costa caribeña de Colombia, sede de Barranquilla, la cuarta ciudad más grande del país y el corazón industrial y comercial de la costa. Barranquilla es conocida sobre todo por su Carnaval — uno de los carnavales más grandes y coloridos del mundo — y por una cultura cálida, festiva y emprendedora que se derrama en la vida cotidiana. La ciudad se asienta sobre el río Magdalena, cerca del mar Caribe, lo que la convirtió en un puerto histórico y en un crisol de influencias europeas, africanas, indígenas y de Oriente Medio; esa mezcla se nota en la música, la comida y la vida comunitaria de la ciudad. En los últimos años Barranquilla ha invertido fuertemente en infraestructura pública — parques, bibliotecas y el Gran Malecón a orillas del río — creando nuevos espacios públicos donde la gente se reúne. El departamento también incluye el puerto de Puerto Colombia y una serie de municipios más pequeños, donde la vida es más lenta y familiar. Para quien organiza o se une a una comunidad en Atlántico, la recompensa es una cultura cálida y abierta donde la gente se apoya — y donde el espíritu del Carnaval significa que la gente sabe celebrar junta.',
  dataPoints: [
    'La capital del departamento es Barranquilla, en la costa caribeña de Colombia.',
    'Sede del Carnaval de Barranquilla, uno de los más grandes del mundo.',
    'Ciudad puerto sobre el río Magdalena; crisol cultural.',
    'Nuevos espacios públicos: parques, bibliotecas y el Gran Malecón.',
  ],
  faq: [
    {
      question: '¿Cómo son las comunidades en las distintas zonas de Atlántico?',
      answer:
        'Barranquilla es el centro denso, festivo y emprendedor; los municipios más pequeños como Puerto Colombia son más lentos y familiares. La mayoría de las comunidades profesionales y culturales se concentran en la capital, mientras que los grupos regionales se centran en la vida local.',
    },
    {
      question: '¿Cuál es la mejor manera de empezar una comunidad en Atlántico?',
      answer:
        'Elige un barrio o una sede con buen acceso y apóyate en la calidez de la ciudad: la música, la comida y la celebración son formas naturales de reunir a la gente. Los nuevos parques y el Malecón son puntos de encuentro públicos populares.',
    },
    {
      question: '¿JoinOrigin opera en Atlántico?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Barranquilla están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en cualquier lugar del Atlántico.',
    },
  ],
};

export default content;
