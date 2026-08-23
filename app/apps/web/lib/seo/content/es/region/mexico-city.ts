import type { RegionContent } from '../../types';

/**
 * Contenido de la región de la Ciudad de México — traducción al español
 * (archivo de contenido por idioma).
 *
 * Texto para la página `/es/location/mexico/mexico-city`. La Ciudad de
 * México es el distrito federal capital, por lo que esta página de
 * región cubre el panorama urbano; la página de la ciudad agrega
 * profundidad por tipo de grupo.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'mexico-city',
  title: 'Comunidades en Ciudad de México | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Ciudad de México — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital. Únete a la lista de espera de JoinOrigin.',
  intro:
    'La Ciudad de México es la capital federal de México y una de las ciudades más grandes del mundo, con unos 12 millones de habitantes en la ciudad y más de veinte millones en toda la zona metropolitana. Se encuentra a 2.240 metros sobre el nivel del mar, en un valle alto rodeado de volcanes, y su vida comunitaria es igualmente vasta y variada. La ciudad está organizada en alcaldías y barrios con personalidades distintas: Roma y Condesa para los cafés y el trabajo creativo, Polanco para los negocios y la gastronomía fina, Coyoacán para la historia y los artistas, y el Centro Histórico para las capas profundas del pasado. La Ciudad de México es una potencia de cultura, comida y creatividad: más museos que la mayoría de las ciudades, una escena de comida callejera entre las mejores del mundo y un ecosistema de tecnología y startups en crecimiento anclado en las fintech y las industrias creativas. La UNAM, el ITAM, el Politécnico Nacional y los campus del Tec de Monterrey alimentan un flujo constante de estudiantes e investigadores hacia las comunidades locales, y anclas públicas como el Bosque de Chapultepec, el Zócalo y los canales de Xochimilco ofrecen a los grupos lugares gratuitos e icónicos para encontrarse. Para quien organiza o se une a una comunidad aquí, la recompensa es una ciudad con una energía enorme — y la necesidad de elegir un barrio, un idioma y una sede con buen acceso al transporte.',
  dataPoints: [
    'Capital federal de México; unos 12 millones de habitantes en la ciudad.',
    'A 2.240 metros de altitud, en un valle alto.',
    'Anclas: UNAM, ITAM, IPN y campus del Tec de Monterrey.',
    'Anclas públicas: Bosque de Chapultepec, Zócalo y canales de Xochimilco.',
  ],
  faq: [
    {
      question: '¿La región de Ciudad de México es lo mismo que la escena de la ciudad?',
      answer:
        'Sí. La Ciudad de México es un distrito federal capital, por lo que la región y la ciudad coinciden por completo. Esta página de región cubre el panorama urbano, mientras que la página de la ciudad agrega detalle por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas.',
    },
    {
      question: '¿Qué barrios de la Ciudad de México tienen las comunidades más activas?',
      answer:
        'Roma y Condesa anclan las escenas de startups y creativos, Polanco es el centro de negocios, Coyoacán y el Centro Histórico llevan las capas culturales e históricas, y cada alcaldía tiene sus propias organizaciones vecinales.',
    },
    {
      question: '¿JoinOrigin opera en la Ciudad de México?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de la Ciudad de México están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en la capital y en todo el país.',
    },
  ],
};

export default content;
