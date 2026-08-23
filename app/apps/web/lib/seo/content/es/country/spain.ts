import type { CountryContent } from '../../types';

/**
 * Contenido de España — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para la página de país `es` de España en `/es/location/spain`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `title`/`description` llevan los títulos/descripciones SEO en español.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'es',
  slug: 'spain',
  title: 'Comunidades en España | JoinOrigin',
  description:
    'Encuentra o crea comunidades en España — desde escenas de startups en Madrid y Barcelona hasta asociaciones de vecinos y redes de pequeñas empresas. Lista de espera de JoinOrigin.',
  intro:
    'España combina una fuerte tradición de vida social pública con una escena profesional en rápida maduración. El día suele empezar y terminar al aire libre — terrazas de café, plazas y bares que se llenan hasta tarde — lo que hace que reunirse resulte natural en lugar de organizado. Las asociaciones de vecinos tienen raíces profundas en la vida cívica española, mientras que las identidades regionales, de Cataluña a Andalucía, moldean la forma de organizarse de cada ciudad. Madrid y Barcelona anclan la escena de startups y creativa del país, con espacios de coworking, programas universitarios y una comunidad creciente de fundadores que se conectan en español e inglés. Universidades como la Complutense y la Pompeu Fabra alimentan un flujo constante de estudiantes a la vida urbana, y el ritmo nocturno del país hace que un encuentro semanal pueda empezar a las nueve de la noche sin que nadie se sorprenda. Las comunidades de inmigrantes de América Latina y otros lugares añaden capas de grupos de ayuda mutua, asociaciones culturales y comunidades de comida. Tanto si buscas un encuentro tecnológico, una asamblea de barrio, un club de senderismo o una red de pequeñas empresas, la mayoría de las ciudades españolas ofrecen un camino — y empezar algo nuevo es realista porque abundan tanto los lugares como la curiosidad.',
  dataPoints: [
    'Población de aproximadamente 46,7 millones en 17 comunidades autónomas.',
    'El español es la lengua principal; el catalán, el gallego y el euskera son cooficiales en sus regiones.',
    'La capital es Madrid; Barcelona es el segundo gran centro.',
    'Fuerte cultura de terrazas, plazas y reuniones al anochecer en todo el país.',
  ],
  faq: [
    {
      question: '¿Cómo encuentro comunidades en España?',
      answer:
        'Usa el centro /location para elegir una ciudad y explora las páginas de tipos de grupo: startups, creativas, políticas, de encuentros y pequeñas empresas. Las asociaciones de vecinos y culturales locales también son excelentes puntos de partida.',
    },
    {
      question: '¿Puedo crear una comunidad en una ciudad española?',
      answer:
        'Sí. Las ciudades españolas tienen espacio público abundante — terrazas, plazas y parques — y una cultura social cálida que facilita las primeras reuniones. Las guías paso a paso cubren cómo crear una comunidad desde la primera idea hasta un ritmo estable.',
    },
    {
      question: '¿JoinOrigin opera en España?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de España y Madrid están traducidas al español, y la plataforma ayuda a la gente a encontrar o crear comunidades en cualquier lugar del país.',
    },
  ],
};

export default content;
