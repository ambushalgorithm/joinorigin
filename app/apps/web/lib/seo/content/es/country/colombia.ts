import type { CountryContent } from '../../types';

/**
 * Contenido de la página de Colombia — traducción al español (archivo
 * de contenido por idioma).
 *
 * Texto para la página `/es/location/colombia`. El texto vive AQUÍ,
 * nunca en los JSON de idioma (localización R2/R5). Prosa honesta y
 * perenne sobre la escena comunitaria colombiana.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'es',
  slug: 'colombia',
  title: 'Comunidades en Colombia | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Colombia — desde grupos de startups en Bogotá hasta escenas de innovación en Medellín y redes de pequeñas empresas en todo el país. Únete a la lista de espera de JoinOrigin.',
  intro:
    'Colombia es un país de identidades regionales fuertes, y la vida comunitaria refleja esa diversidad. Desde las capitales andinas de Bogotá y Medellín hasta el calor caribeño de Barranquilla y Cartagena, la región cafetera y los territorios del Pacífico y la Amazonía, cada región tiene su propia música, su comida y su manera de reunirse. Los lazos familiares y de barrio son la columna vertebral de la vida social colombiana, y las comunidades religiosas, los clubes de fútbol y los festivales culturales — del Carnaval de Barranquilla a la Feria de las Flores — reúnen a la gente a gran escala durante todo el año. En las últimas dos décadas, Colombia se ha convertido en uno de los polos de innovación más visibles de América Latina: Medellín se reinventó en torno a la tecnología, la educación y el diseño urbano, mientras que Bogotá consolidó un ecosistema de startups denso con aceleradoras, espacios de coworking y programas universitarios. La respuesta comunitaria a la larga historia de conflicto del país también produjo una cultura profunda de solidaridad y construcción de paz, con muchos grupos de sociedad civil y reconciliación todavía activos. El español es el idioma principal en los 32 departamentos más el distrito capital. Para quien organiza o se une a una comunidad, Colombia premia la calidez, la persistencia y una conexión genuina con el lugar.',
  dataPoints: [
    'Población de unos 49,6 millones en 32 departamentos más el distrito capital.',
    'El español es el idioma principal.',
    'La capital es Bogotá.',
    'Fuerte cultura de familia, barrio, festivales y solidaridad comunitaria.',
  ],
  faq: [
    {
      question: '¿Cómo encuentro comunidades en Colombia?',
      answer:
        'Usa el centro de /location para elegir una ciudad y luego explora las páginas por tipo de grupo: startups, creativos, políticos, encuentros y pequeñas empresas. Las universidades, los centros culturales y las asociaciones vecinales también son buenos puntos de partida.',
    },
    {
      question: '¿Qué hace distintiva a la cultura comunitaria colombiana?',
      answer:
        'La identidad regional, los lazos familiares y de barrio y un calendario de festivales muy intenso moldean cómo se reúne la gente. El país también tiene una cultura profunda de solidaridad y construcción de paz, por lo que los grupos cívicos y de ayuda mutua son comunes y respetados.',
    },
    {
      question: '¿JoinOrigin opera en Colombia?',
      answer:
        'Sí. JoinOrigin no tiene oficinas locales. Las páginas de Bogotá, Medellín y Barranquilla están disponibles en español y el producto ayuda a las personas a encontrar o crear comunidades en cualquier lugar de Colombia.',
    },
  ],
};

export default content;
