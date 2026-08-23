import type { RegionContent } from '../../types';

/**
 * Contenido de la región de Antioquia — traducción al español (archivo
 * de contenido por idioma).
 *
 * Texto para la página `/es/location/colombia/antioquia`. Prosa honesta
 * y perenne sobre la vida comunitaria del departamento.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'es',
  slug: 'antioquia',
  title: 'Comunidades en Antioquia | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Antioquia — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en todo el departamento. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Antioquia es un departamento en los Andes colombianos conocido por su geografía montañosa, su cultura emprendedora y su transformación en las últimas dos décadas. Medellín, la capital, está en un valle rodeado de montañas y se ha convertido en uno de los polos de innovación más visibles de América Latina — la ciudad es conocida por sus cables aéreos del metro, sus bibliotecas y parques públicos, sus universidades y un ecosistema de startups construido en torno a la tecnología, la educación y el diseño urbano. Los paisas, como se conoce a la gente de Antioquia, tienen fama de trabajadores, con instinto para los negocios y calidez, y esa cultura se refleja en la vida comunitaria: coworkings, incubadoras universitarias y organizaciones vecinales están todos activos. Más allá de Medellín, el departamento incluye pueblos de montaña como Santa Fe de Antioquia, Rionegro y las zonas cafeteras, donde la vida comunitaria es más lenta y familiar. El departamento también tiene tradiciones profundas de solidaridad y organización cívica, moldeadas por una historia que incluye tanto grandes dificultades como una notable renovación. Para quien organiza o se une a una comunidad en Antioquia, la recompensa es un lugar donde la innovación y la tradición se encuentran — y donde las relaciones genuinas abren puertas.',
  dataPoints: [
    'La capital del departamento es Medellín, en un valle de los Andes colombianos.',
    'Reconocido por la innovación urbana: cables aéreos del metro, bibliotecas públicas, universidades.',
    'Ecosistema de startups en tecnología, educación y diseño urbano.',
    'Pueblos de montaña: Santa Fe de Antioquia, Rionegro y zonas cafeteras.',
  ],
  faq: [
    {
      question: '¿Cómo son las comunidades en las distintas zonas de Antioquia?',
      answer:
        'Medellín es densa, innovadora y profesional; los pueblos de montaña y las zonas cafeteras son más lentos, familiares y orientados a la comunidad. Los grupos de la capital tienden a organizarse por industria, mientras que los regionales se centran en la vida local.',
    },
    {
      question: '¿Cuál es la mejor manera de empezar una comunidad en Antioquia?',
      answer:
        'Elige un barrio o un pueblo, un formato claro y una sede con buen acceso al transporte — el metro y los cables aéreos de Medellín hacen práctico reunirse en toda la ciudad. La calidez y las relaciones genuinas son centrales en la cultura paisa.',
    },
    {
      question: '¿JoinOrigin opera en Antioquia?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Medellín están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en cualquier lugar de Antioquia.',
    },
  ],
};

export default content;
