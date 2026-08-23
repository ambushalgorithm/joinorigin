import type { RegionContent } from '../../types';

/**
 * Contenido de la región de Bogotá D.C. — traducción al español (archivo
 * de contenido por idioma).
 *
 * Texto para la página `/es/location/colombia/bogota-d-c`. Bogotá es el
 * distrito capital de Colombia, por lo que esta página de región cubre
 * el panorama urbano; la página de la ciudad agrega profundidad por tipo
 * de grupo.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'bogota-d-c',
  title: 'Comunidades en Bogotá | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Bogotá — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en el distrito capital. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Bogotá es el distrito capital de Colombia y la ciudad más grande del país, una metrópoli de gran altitud con más de siete millones de personas sobre la sabana, a unos 2.600 metros sobre el nivel del mar. La ciudad es el centro político, financiero y cultural de Colombia, y su vida comunitaria es igualmente densa: un ecosistema de startups grande y creciente, universidades importantes como la Nacional y los Andes, una escena fuerte de arte y diseño en barrios como La Candelaria y Chapinero, y tradiciones profundas de organización cívica en todas sus localidades. Bogotá es una ciudad de contrastes — formal e informal, rica y trabajadora, tradicional y visionaria — y sus habitantes, conocidos como rolos y cachacos, son famosos por su resiliencia y su optimismo creciente. El sistema de buses TransMilenio y la creciente red de ciclovías (los domingos se cierran calles principales a los carros) moldean cómo y dónde se reúne la gente, y los muchos parques y plazas públicas de la ciudad albergan un calendario constante de eventos comunitarios. Para quien organiza o se une a una comunidad en Bogotá, la recompensa es una ciudad con escala, energía y oportunidad — pero también una que premia la paciencia, la comunicación clara y una conexión genuina con el lugar.',
  dataPoints: [
    'Distrito capital de Colombia y la ciudad más grande del país.',
    'Unos 7 millones de habitantes a unos 2.600 metros de altitud.',
    'Anclas: Universidad Nacional, Los Andes y un ecosistema de startups en crecimiento.',
    'El TransMilenio y la red de ciclovías moldean cómo se reúne la gente.',
  ],
  faq: [
    {
      question: '¿La región de Bogotá D.C. es lo mismo que la escena de la ciudad de Bogotá?',
      answer:
        'Sí. Bogotá es un distrito capital, por lo que la región y la ciudad coinciden por completo. Esta página de región cubre el panorama urbano, mientras que la página de la ciudad de Bogotá agrega detalle por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas.',
    },
    {
      question: '¿Qué barrios de Bogotá tienen las comunidades más activas?',
      answer:
        'Chapinero y Usaquén anclan las escenas de startups y creativos, La Candelaria es el centro histórico y cultural, y cada localidad de la ciudad tiene sus propias organizaciones cívicas y vecinales.',
    },
    {
      question: '¿JoinOrigin opera en Bogotá?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Bogotá están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en el distrito capital y en todo el país.',
    },
  ],
};

export default content;
