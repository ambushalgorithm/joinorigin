import type { CountryContent } from '../../types';

/**
 * Contenido de la página de Argentina — traducción al español (archivo
 * de contenido por idioma).
 *
 * Texto para la página `/es/location/argentina`. El texto vive AQUÍ,
 * nunca en los JSON de idioma (localización R2/R5). Prosa honesta y
 * perenne sobre la escena comunitaria argentina.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'es',
  slug: 'argentina',
  title: 'Comunidades en Argentina | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Argentina — desde grupos de startups en Buenos Aires hasta redes provinciales de creadores, cultura y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Argentina tiene una de las tradiciones comunitarias más fuertes de América Latina, moldeada por una cultura que trata la reunión como un hábito cotidiano. El asado, el mate y el barrio son anclas sociales: compartir la carne un domingo, pasar un termo de mate en ronda y detenerse en la plaza o el club del barrio son parte ordinaria de la vida. Buenos Aires concentra la escena profesional más densa del país — startups, estudios creativos, universidades como la UBA y Di Tella, y una tradición editorial y teatral de renombre — mientras que capitales provinciales como Córdoba, Rosario, Mendoza y Salta mantienen sus propias redes vivas en torno a universidades, bodegas e industria regional. El país también tiene una profunda tradición cooperativa y de ayuda mutua, desde empresas recuperadas hasta asambleas vecinales, lo que hace que los grupos cívicos y solidarios sean comunes y respetados. Como la economía ha pasado por ciclos duros, las comunidades aquí tienden a ser prácticas y resilientes, organizadas en torno al apoyo concreto tanto como a los intereses compartidos. Ya sea que llegues al país o que vivas aquí desde siempre, encontrar un grupo — o empezar uno con un primer asado o encuentro sencillo — es un camino muy transitado.',
  dataPoints: [
    'Población de unos 44,5 millones en 23 provincias más la capital federal.',
    'El español es el idioma principal, con comunidades de herencia italiana y alemana.',
    'La capital federal es Buenos Aires.',
    'Fuerte cultura de reunión en torno al asado, el mate y el barrio en todo el país.',
  ],
  faq: [
    {
      question: '¿Cómo encuentro comunidades en Argentina?',
      answer:
        'Usa el centro de /location para elegir una ciudad y luego explora las páginas por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas. Los clubes locales, los carteles universitarios y las asociaciones vecinales también son buenos puntos de partida para grupos presenciales.',
    },
    {
      question: '¿Qué papel juegan el asado y el mate en las comunidades argentinas?',
      answer:
        'Ambos son tecnologías sociales: el asado es una comida compartida que reúne a la gente durante horas, y el mate es una bebida que se pasa en ronda como señal de bienvenida. Muchos grupos los usan como apertura o cierre natural de una reunión.',
    },
    {
      question: '¿JoinOrigin opera en Argentina?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Buenos Aires están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en cualquier lugar de Argentina.',
    },
  ],
};

export default content;
