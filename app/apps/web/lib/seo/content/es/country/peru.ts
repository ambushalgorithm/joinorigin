import type { CountryContent } from '../../types';

/**
 * Contenido de la página de Perú — traducción al español (archivo de
 * contenido por idioma).
 *
 * Texto para la página `/es/location/peru`. El texto vive AQUÍ, nunca en
 * los JSON de idioma (localización R2/R5). Prosa honesta y perenne sobre
 * la escena comunitaria peruana.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'es',
  slug: 'peru',
  title: 'Comunidades en Perú | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Perú — desde grupos de startups en Lima hasta redes creativas y de pequeñas empresas en la costa, la sierra y la selva. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Perú es un país de geografía dramática — una larga costa del Pacífico, la sierra andina y la cuenca amazónica — y la vida comunitaria sigue esas regiones. Lima, la capital en la costa, concentra la mayor parte de la población y la escena profesional más visible: startups, universidades, estudios creativos y una cultura gastronómica que ha hecho de la ciudad un destino culinario global. En la sierra, ciudades como Cusco, Arequipa y Huancayo conservan tradiciones indígenas y andinas profundas — las faenas comunales (minka y ayni), los ciclos de fiestas y los fuertes lazos con la tierra — mientras que la Amazonía tiene sus propias comunidades ribereñas. Perú es también un país de migración interna, y los distritos de Lima están llenos de asociaciones regionales que mantienen vivas las tradiciones de la sierra y la selva en la capital. El español es el idioma principal, con el quechua y el aimara ampliamente hablados. La escena de startups es joven pero creciente, anclada en los sectores de fintech, comercio electrónico y creativo de Lima. Para quien organiza o se une a una comunidad, Perú premia la paciencia, el respeto por la tradición y la disposición a tender puentes entre la diversidad regional del país.',
  dataPoints: [
    'Población de unos 32 millones en 24 departamentos más la provincia constitucional de Lima.',
    'El español es el idioma principal, con el quechua y el aimara ampliamente hablados.',
    'La capital es Lima.',
    'Fuertes identidades regionales costeña, andina y amazónica.',
  ],
  faq: [
    {
      question: '¿Cómo encuentro comunidades en Perú?',
      answer:
        'Usa el centro de /location para elegir una ciudad y luego explora las páginas por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas. Las universidades, las asociaciones regionales, los mercados y los centros culturales también son buenos puntos de partida.',
    },
    {
      question: '¿Cómo moldean las regiones del Perú la vida comunitaria?',
      answer:
        'La costa, la sierra y la selva tienen tradiciones de reunión distintas. Las comunidades andinas se caracterizan por el trabajo comunal y los ciclos de fiestas, mientras que Lima combina muchas culturas regionales y migrantes en una escena urbana densa.',
    },
    {
      question: '¿JoinOrigin opera en Perú?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Lima están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en cualquier lugar del Perú.',
    },
  ],
};

export default content;
