import type { CountryContent } from '../../types';

/**
 * Contenido de la página de México — traducción al español (archivo de
 * contenido por idioma).
 *
 * Texto para la página `/es/location/mexico`. El texto vive AQUÍ, nunca
 * en los JSON de idioma (localización R2/R5). Prosa honesta y perenne
 * sobre la escena comunitaria mexicana.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'es',
  slug: 'mexico',
  title: 'Origins en México | JoinOrigin',
  description:
    'Encuentra o crea Origins en México — desde grupos de startups en Ciudad de México hasta escenas creativas y redes de pequeñas empresas en todo el país. Únete a la lista de espera de JoinOrigin.',
  intro:
    'México es uno de los países más comunitarios de las Américas, con un tejido social construido sobre la familia, el barrio y la celebración. La plaza, el mercado, la parroquia y la reunión familiar son los anclajes clásicos de la vida social mexicana, y las fiestas del país — el Día de Muertos, las posadas, las ferias regionales y las celebraciones de los santos patronos — reúnen a la gente a una escala que pocos países pueden igualar. La Ciudad de México es el corazón cultural y económico: una de las ciudades más grandes del mundo, con una escena gastronómica entre las mejores del planeta, más museos que la mayoría de las ciudades y un ecosistema de startups anclado en las fintech y las industrias creativas. Pero el país no es una sola historia: Guadalajara tiene una identidad fuerte en tecnología y diseño, Monterrey es un motor empresarial e industrial, y Oaxaca, Puebla y la península de Yucatán conservan tradiciones indígenas y coloniales profundas que moldean sus propias formas de reunión. El español es el idioma principal, y en todo el país se siguen hablando decenas de lenguas indígenas. Para quien organiza o se une a una comunidad, México premia elegir un barrio y un formato claro — los mexicanos son cálidos, familiares y asisten de manera confiable a los grupos que se sienten genuinos y acogedores.',
  dataPoints: [
    'Población de unos 126 millones en 31 estados más el distrito capital.',
    'El español es el idioma principal, con muchas lenguas indígenas también habladas.',
    'La capital es la Ciudad de México.',
    'Fuerte cultura de reunión en torno a la familia, el barrio, las fiestas y los mercados.',
  ],
  faq: [
    {
      question: '¿Cómo encuentro Origins en México?',
      answer:
        'Usa el centro de /location para elegir una ciudad y luego explora las páginas por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas. Los mercados locales, las parroquias, los centros culturales y los grupos universitarios también son buenos puntos de partida.',
    },
    {
      question: '¿Cómo moldea la identidad regional a las comunidades mexicanas?',
      answer:
        'La Ciudad de México, Guadalajara y Monterrey tienen escenas profesionales distintas, mientras que estados como Oaxaca y Yucatán conservan tradiciones indígenas y coloniales profundas. Las comunidades exitosas adaptan su formato y su sede a la cultura local.',
    },
    {
      question: '¿JoinOrigin opera en México?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de la Ciudad de México están disponibles en español y el producto ayuda a las personas a encontrar o crear Origins en cualquier lugar de México.',
    },
  ],
};

export default content;
