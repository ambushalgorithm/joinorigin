import type { CityContent } from '../../types';

/**
 * Contenido de Madrid — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para las 7 páginas `es` de Madrid en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'madrid',
  title: 'Comunidades en Madrid | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Madrid — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital española. Lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Comunidades en Madrid | JoinOrigin',
    cityDescription:
      'Encuentra o crea comunidades en Madrid — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital española. Lista de espera de JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups en Madrid | JoinOrigin',
      creative: 'Comunidades creativas en Madrid | JoinOrigin',
      political: 'Comunidades políticas y cívicas en Madrid | JoinOrigin',
      meetup: 'Comunidades de encuentros y sociales en Madrid | JoinOrigin',
      'small-business': 'Comunidades de pequeñas empresas en Madrid | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea comunidades de startups en Madrid — fundadores, ingenieros y operadores en torno a Malasaña, Gran Vía y los hubs tech. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea comunidades creativas en Madrid — estudios, galerías y colectivos en Lavapiés, Matadero y Malasaña. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea comunidades políticas y cívicas en Madrid — juntas de distrito, asociaciones de vecinos y campañas locales. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea comunidades de encuentros y sociales en Madrid — rutas de tapas, vida de terraza, el parque del Retiro y reuniones de barrio. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea comunidades de pequeñas empresas en Madrid — comerciantes de mercado, tiendas familiares y redes de barrio. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos comunitarios en Madrid | JoinOrigin',
    ideasDescription:
      'Descubre 30 ideas de eventos comunitarios en Madrid — eventos de networking, aprendizaje, exteriores, profesionales, creativos e impacto. Lista de espera de JoinOrigin.',
  },
  intro: [
    'Madrid es una ciudad que vive al aire libre y hasta tarde. El día empieza con un café en una terraza, fluye por el rastro del domingo y termina con tapas en La Latina o Chueca mucho después de medianoche. Este ritmo hace fácil la vida comunitaria: casi toda reunión tiene un lugar natural — una terraza de bar, una plaza, un rincón del parque del Retiro — y casi todo el mundo está abierto a una conversación.',
    'Los barrios de la ciudad tienen cada uno una personalidad distinta: Malasaña para la cultura indie, Lavapiés por su mezcla multicultural, Salamanca por sus tiendas de lujo y La Latina por sus callejones de tapas. Universidades como la Complutense y la Autónoma alimentan un flujo constante de estudiantes, mientras que el estatus de la ciudad como capital atrae a personas de todas las regiones españolas y de gran parte de América Latina.',
    'Las tradiciones políticas y asociativas de Madrid son fuertes — desde las asociaciones de vecinos que reconstruyeron la vida de barrio tras los años del franquismo hasta las plataformas cívicas del movimiento 15-M. Las comunidades aquí recompensan la calidez y la constancia: preséntate en la misma terraza, la misma plaza, el mismo puesto del mercado, y la ciudad te tratará como a la familia.',
  ],
  dataPoints: [
    'Aproximadamente 3,3 millones de habitantes; capital de España.',
    'Universidades: Complutense, Autónoma y Politécnica.',
    'Anclajes públicos: parque del Retiro, el Rastro, Gran Vía y la ribera de Madrid Río.',
    'Barrios con identidades distintas: Malasaña, Chueca, Lavapiés, La Latina.',
    'Fuerte cultura de terraza, tapas y rastro para reunirse al aire libre.',
    'Hogar de grandes museos: el Prado, la Reina Sofía y el Thyssen.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Hubs tech y plantas de coworking en Malasaña',
        'Salas de incubadoras cerca de Gran Vía',
        'Cafés de startups en Salamanca y Chamberí',
        'Espacios de emprendimiento universitario en la Politécnica',
        'Azoteas para mezcladores nocturnos',
        'Salas de eventos en bancos reconvertidos del centro',
      ],
      formats: [
        'Desayunos de fundadores con presentaciones rápidas',
        'Tardes de pitch y días de demo',
        'Mesas de fundadores de SaaS y marketplaces',
        'Mezcladores de fundadores internacionales (en inglés)',
        'Hackatones y jam de constructores de fin de semana',
      ],
      howToStart: [
        'Elige una vertical estrecha — SaaS, marketplaces o IA — y un nombre amigable en inglés.',
        'Reserva una franja semanal en un coworking de Malasaña o un hub tech que te acoja.',
        'Haz tres encuentros abiertos, luego pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Estudios y galerías en Lavapiés',
        'Naves de la fábrica creativa de Matadero Madrid',
        'Estudios de diseño en Malasaña',
        'Salas de talleres de escuelas de arte y academias',
        'Cines independientes y salas de música',
        'Cafés de librería con rincones de lectura',
      ],
      formats: [
        'Fines de semana de estudio abierto y noches de portafolio',
        'Visitas guiadas a galerías con charlas de artistas',
        'Noches de crítica de diseño e ilustración',
        'Círculos de producción musical y noches de micrófono abierto',
        'Ferias de fanzines e imprenta en Lavapiés',
      ],
      howToStart: [
        'Elige un oficio, un barrio y una noche regular: la especificidad construye identidad más rápido aquí.',
        'Encuentra un estudio colectivo en Lavapiés o una nave de Matadero dispuesta a acoger la primera noche.',
        'Haz una primera sesión de estudio abierto, recoge obras en proceso y haz del feedback la agenda fija.',
      ],
    },
    political: {
      venues: [
        'Salas de reuniones de las juntas municipales de distrito',
        'Salas de asociaciones de vecinos en los barrios',
        'Centros comunitarios en cada distrito',
        'Espacios de civic tech en el centro',
        'Bibliotecas públicas con salas de reuniones',
        'Plazas usadas para asambleas y concentraciones',
      ],
      formats: [
        'Sesiones abiertas de las juntas de distrito',
        'Noches de información sobre vivienda y derechos de alquiler',
        'Asambleas de asociaciones de vecinos',
        'Sesiones informativas de voluntariado y primeros turnos',
        'Reuniones de planificación de iniciativas ciudadanas',
      ],
      howToStart: [
        'Empieza con una preocupación a pie de calle — un mercado, una plaza, una batalla por el alquiler — e invita a la manzana a una primera asamblea.',
        'Encuentra la asociación de vecinos que ya cubre tu barrio y ofrece coorganizar una reunión con ellos.',
        'Usa la agenda pública de la junta de distrito para anclar tu segundo evento en torno a una decisión viva que los vecinos puedan influir.',
      ],
    },
    meetup: {
      venues: [
        'Bares de terraza en Malasaña y La Latina',
        'Prados del parque del Retiro y orillas de Madrid Río',
        'Bares de tapas a lo largo de la Cava Baja',
        'Cafés de juegos de mesa en el centro',
        'Centros comunitarios con patios',
        'Calles del rastro dominical',
      ],
      formats: [
        'Reunión semanal de terraza a la misma hora',
        'Ruta de tapas por un barrio',
        'Picnics y juegos al aire libre en el Retiro',
        'Mesas de intercambio de idiomas (español–inglés)',
        'Paseos nocturnos por el casco antiguo',
      ],
      howToStart: [
        'Elige un formato repetible — un encuentro semanal de terraza, una ruta mensual de tapas — y un lugar fijo.',
        'Elige un bar de terraza, una plaza o un rincón del parque que te acoja cada vez.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Mercados: San Miguel, San Antón, Vallehermoso',
        'Calles de puestos del Rastro',
        'Corredores de tiendas familiares en Salamanca y Chamberí',
        'Salas de seminarios de la cámara de comercio',
        'Mesas de dueños de bares de tapas',
        'Salas de reuniones de gremios y asociaciones',
      ],
      formats: [
        'Desayunos de dueños de barrio antes de abrir',
        'Planificación de temporada de los puestos del mercado',
        'Talleres de la cámara sobre permisos y digitalización',
        'Círculos de compra compartida de suministros',
        'Sesiones de planificación de paseos comerciales de barrio',
      ],
      howToStart: [
        'Ancla el grupo a una galería de mercado o una calle comercial: los comerciantes de fin de semana de Vallehermoso son un imán probado.',
        'Invita a un puesto veterano o a un delegado de la cámara a coorganizar el primer desayuno.',
        'Recoge los dolores recurrentes de los dueños — permisos, alquiler, afluencia — y convierte la reunión de cada mes en una sesión práctica de soluciones.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Madrid ha madurado rápidamente hasta convertirse en la más grande de España, anclada por sedes corporativas, grandes universidades y una comunidad de capital de riesgo en crecimiento en torno a Malasaña y Gran Vía. La ciudad combina la estabilidad de una capital con la informalidad de un barrio: los fundadores se reúnen en espacios de coworking y hubs tech durante el día y continúan las conversaciones en azoteas por la noche. Las fortalezas incluyen SaaS, marketplaces, fintech y una escena de IA en rápido crecimiento, con fuertes lazos con América Latina que hacen de Madrid un puente natural para los fundadores hispanohablantes. Los formatos incluyen desayunos de fundadores, tardes de pitch, días de demo y happy hours de la industria que rotan entre salas de bancos reconvertidos y cafés de startups. La escena es genuinamente internacional: el inglés es común en los encuentros, mientras que el español sigue siendo el idioma por defecto de muchos grupos locales. El ritmo tardío de la ciudad da forma a los eventos: las cenas se alargan y el networking suele continuar en una terraza. Crear una comunidad de startups en Madrid funciona mejor con una vertical estrecha y un ritmo regular: una mesa mensual de fundadores de SaaS o una noche de constructores de IA construye seguidores leales más rápido que un grupo generalista.',
    creative:
      'Las comunidades creativas de Madrid están ancladas por el Triángulo del Arte de los museos — el Prado, la Reina Sofía y el Thyssen — y se energizan con los barrios que los rodean. Lavapiés se ha convertido en la frontera creativa, con estudios, galerías y artistas internacionales, mientras que Matadero Madrid, un antiguo matadero reconvertido, acoge un programa anual de exposiciones, residencias y eventos maker. Malasaña lleva el espíritu indie de la movida, la explosión cultural que siguió a los años del franquismo, y todavía alberga estudios de diseño, tiendas de discos y cultura del fanzine. Los formatos incluyen fines de semana de estudio abierto, visitas guiadas a galerías, noches de portafolio y círculos de producción musical, con las horas tardías de la ciudad convirtiendo las críticas nocturnas en conversaciones de madrugada. Los cines independientes y los cafés de librería añaden un hilo literario que conecta a escritores, traductores y editores. La escena es lo bastante grande para sostener comunidades de nicho y lo bastante compacta para que la palabra viaje rápido. Crear una comunidad creativa en Madrid es realista: elige un oficio, un barrio y una noche regular, y la densidad de personas curiosas y talentosas te encontrará.',
    political:
      'El paisaje cívico de Madrid está definido por sus asociaciones de vecinos, asociaciones de barrio que fueron centrales en la recuperación de la democracia tras los años del franquismo y que todavía gestionan la vida local hoy. La ciudad está dividida en distritos con juntas elegidas, y las plataformas cívicas nacidas del movimiento 15-M siguen dando forma a los debates sobre vivienda, movilidad y espacio público. La vivienda es el tema definitorio: la economía turística ha subido los alquileres, produciendo sindicatos de inquilinos y campañas por la vivienda pública y asequible que atraen atención nacional. El proyecto Madrid Río — una autopista convertida en parque fluvial — es la prueba más visible de que los vecinos organizados pueden ganar grandes transformaciones. Los centros comunitarios de cada distrito acogen reuniones, clases y grupos de voluntarios. La cultura política recompensa la persistencia y la presencia: los vecinos que acuden a las asambleas y hablan con claridad consiguen resultados. Crear una comunidad política significa elegir un tema concreto y una geografía pequeña, y luego aliarse con las asociaciones existentes — el paisaje es lo bastante rico como para que la colaboración supere a la competencia.',
    meetup:
      'La escena de encuentros de Madrid se construye sobre la terraza, el bar de tapas y la noche. Barrios como Malasaña, Chueca y La Latina viven al aire libre: las terrazas se llenan desde el café de la mañana hasta los tragos de medianoche, y los callejones de tapas de la Cava Baja convierten comer en un deporte social. El parque del Retiro y las orillas de Madrid Río ofrecen escapes verdes para picnics, juegos y clases al aire libre, mientras que el rastro del domingo convierte las calles de La Latina en una fiesta en movimiento. Los formatos incluyen reuniones semanales de terraza, rutas de tapas, intercambios de idiomas (español–inglés), noches de juegos de mesa y paseos nocturnos por el casco antiguo. Las horas de la ciudad son generosas: un encuentro que empieza a las nueve de la noche es perfectamente normal. Los recién llegados son bienvenidos con calidez, y la densidad de la ciudad significa que un grupo pequeño puede llenar una terraza sin esfuerzo. Crear un encuentro en Madrid significa elegir un formato repetible y un lugar fijo — un encuentro semanal de terraza o una ruta mensual de tapas — y el amor de la ciudad por la compañía hace el resto.',
    'small-business':
      'Las comunidades de pequeñas empresas de Madrid están ancladas por los mercados, el rastro y la tradición de tienda familiar de la ciudad. Galerías de mercado como San Miguel, San Antón y Vallehermoso no son solo destinos gastronómicos: son comunidades de puestos que comparten proveedores, horarios y cotilleos. El rastro, el mercado de pulgas dominical, lleva siglos funcionando y todavía acoge comerciantes que se conocen entre generaciones. Las tiendas familiares de Salamanca, Chamberí y los barrios forman redes amistosas de dueños que comparan notas sobre alquiler, personal y afluencia. La cámara de comercio ofrece talleres sobre permisos, digitalización y financiación, mientras que las asociaciones comerciales de barrio organizan promociones conjuntas y eventos callejeros. Lo que une a estos grupos es el lugar: una galería de mercado o una calle comercial es una comunidad natural con un interés colectivo en la vida del barrio. Crear una comunidad de pequeñas empresas es muy alcanzable: un desayuno mensual de comerciantes en una galería de mercado, con temas rotativos como alquiler, permisos y venta en línea, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'Madrid es una ciudad ideal para probar nuevas ideas de eventos comunitarios: las terrazas y las plazas son lugares gratuitos, las horas son largas y la tradición asociativa de la ciudad da a cada grupo una forma reconocida. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada una incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Madrid, desde bares de terraza y galerías de mercado hasta el parque del Retiro y las naves creativas de Matadero. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la energía al aire libre de Madrid haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Encuentro de terraza para recién llegados',
            pitch:
              'Una reunión semanal en la misma terraza donde los recién llegados y los residentes de larga data intercambian consejos de barrio con cañas.',
            audience: 'Nuevos llegados y cualquiera que disfrute de charlas informales',
            venueType: 'Un bar de terraza en Malasaña o La Latina',
          },
          {
            title: 'Desayuno de fundadores en una azotea',
            pitch:
              'Un desayuno temprano en una terraza de azotea donde los fundadores comparten los logros y bloqueos de la semana con café y tostadas.',
            audience: 'Fundadores y operadores de todas las etapas',
            venueType: 'Un café de azotea en el centro',
          },
          {
            title: 'Conoce tu barrio',
            pitch:
              'Una noche de baja presión en un barrio, con tarjetas rompehielos y la regla de conocer a tres personas nuevas.',
            audience: 'Residentes de un solo barrio',
            venueType: 'Un centro comunitario o sala de café',
          },
          {
            title: 'Noche de red Latinoamérica',
            pitch:
              'Profesionales de toda América Latina y España comparten contactos, oportunidades y un sentido de hogar.',
            audience: 'Profesionales latinoamericanos en Madrid',
            venueType: 'Una sala de coworking o centro cultural',
          },
          {
            title: 'Club de café de autónomos',
            pitch:
              'Un café matutino semanal donde los autónomos de todas las industrias comparten contactos, tarifas e historias de clientes.',
            audience: 'Autónomos de todas las disciplinas',
            venueType: 'Un café de coworking en Chamberí',
          },
        ],
      },
      {
        name: 'Aprendizaje y talleres',
        ideas: [
          {
            title: 'Mesa de español para recién llegados',
            pitch:
              'Mesas por nivel con hablantes nativos, más la regla de que cada error se celebra con una risa en la mesa.',
            audience: 'Expatriados y recién llegados que aprenden español',
            venueType: 'Un café o centro comunitario en Lavapiés',
          },
          {
            title: 'Clínica de empadronamiento e impuestos',
            pitch:
              'Una sesión práctica sobre el registro, el padrón y los conceptos básicos de impuestos que enfrenta todo recién llegado.',
            audience: 'Nuevos residentes y autónomos',
            venueType: 'Un coworking o sala de eventos de asociación',
          },
          {
            title: 'Historia del flamenco y bases de guitarra',
            pitch:
              'Una introducción amigable al flamenco: su historia, sus palos y los primeros acordes de guitarra.',
            audience: 'Amantes de la música y principiantes curiosos',
            venueType: 'Una peña flamenca o sala de escuela de música',
          },
          {
            title: 'Hallazgos del Rastro y valoración de vintage',
            pitch:
              'Anticuarios comparten cómo detectar tesoros en el mercado dominical y cuánto valen.',
            audience: 'Cazadores de gangas y amantes del vintage',
            venueType: 'Una tienda cerca del Rastro',
          },
          {
            title: 'Taller de participación ciudadana',
            pitch:
              'Una guía en lenguaje sencillo de las juntas de distrito, las asociaciones de vecinos y cómo hacer oír tu voz.',
            audience: 'Nuevos activistas y vecinos curiosos',
            venueType: 'Una sala de junta de distrito o biblioteca',
          },
        ],
      },
      {
        name: 'Sociales y exteriores',
        ideas: [
          {
            title: 'Picnic y juegos en el Retiro',
            pitch:
              'Mantas, frisbee y bromas sobre las barcas en el parque, con un tema rotativo de comida compartida.',
            audience: 'Familias, parejas y grupos de amigos',
            venueType: 'Los prados del parque del Retiro',
          },
          {
            title: 'Ruta de tapas por la Cava Baja',
            pitch:
              'Una ruta nocturna guiada por cinco bares de tapas, con un plato compartido y una historia en cada uno.',
            audience: 'Amantes de la comida y recién llegados',
            venueType: 'Los bares de tapas de la Cava Baja',
          },
          {
            title: 'Paseo en bici por Madrid Río',
            pitch:
              'Un paseo relajado en bici o patinete por el parque fluvial, con paradas de baño y café en verano.',
            audience: 'Ciclistas recreativos de todos los ritmos',
            venueType: 'Los caminos de la ribera de Madrid Río',
          },
          {
            title: 'Noche de juegos de mesa en un café',
            pitch: 'Una pila semanal de juegos de mesa en un café que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Un café de juegos de mesa en el centro',
          },
          {
            title: 'Paseo nocturno por el casco antiguo',
            pitch:
              'Una caminata guiada a última hora por las calles históricas, que termina con churros y chocolate.',
            audience: 'Noctámbulos y recién llegados',
            venueType: 'Las calles del casco antiguo cerca de la Plaza Mayor',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Mesa de fundadores de SaaS',
            pitch:
              'Una mesa redonda mensual para fundadores de SaaS que comparten avances, lecciones de precios y alianzas.',
            audience: 'Fundadores y operadores de SaaS',
            venueType: 'Una sala de reuniones de hub tech en Malasaña',
          },
          {
            title: 'Círculo de marketplaces y e-commerce',
            pitch:
              'Operadores comparan notas sobre logística, crecimiento y el manual de expansión en América Latina.',
            audience: 'Operadores de e-commerce y marketplaces',
            venueType: 'Una sala de eventos de coworking cerca de Gran Vía',
          },
          {
            title: 'Círculo de pares de product managers',
            pitch:
              'Un círculo confidencial donde los PM debaten un reto mensual: hojas de ruta, contratación, política de stakeholders.',
            audience: 'Product managers en tecnología',
            venueType: 'Una sala de reuniones de coworking en Chamberí',
          },
          {
            title: 'Noche de gastro-emprendedores',
            pitch:
              'Chefs, fundadores de comida y puestos de mercado comparten tendencias y prueban nuevos productos.',
            audience: 'Emprendedores de comida y dueños de hostelería',
            venueType: 'Una galería de mercado o cocina de food-lab',
          },
          {
            title: 'Círculo de contratación para equipos tempranos',
            pitch:
              'Los fundadores comparten cómo contratan, retienen y despiden: las verdades incómodas de construir equipos tempranos.',
            audience: 'Fundadores en etapa temprana y líderes de equipo',
            venueType: 'Una oficina de startup o incubadora',
          },
        ],
      },
      {
        name: 'Creativas y maker',
        ideas: [
          {
            title: 'Tarde de estudio abierto en Lavapiés',
            pitch:
              'Un grupo de estudios abre sus puertas para una tarde de visitas, demos y obras a la venta.',
            audience: 'Amantes del arte y vecinos curiosos',
            venueType: 'Las calles de estudios de Lavapiés',
          },
          {
            title: 'Visita maker a Matadero',
            pitch:
              'Una visita guiada a los talleres y residencias de la fábrica creativa, con charla de un artista residente.',
            audience: 'Makers y amantes del arte',
            venueType: 'Matadero Madrid',
          },
          {
            title: 'Noche de fanzines y risografía',
            pitch:
              'Una tarde práctica de creación de fanzines con impresión risográfica e intercambio al final.',
            audience: 'Escritores, ilustradores y entusiastas de la imprenta',
            venueType: 'Un estudio de imprenta o espacio de arte en Malasaña',
          },
          {
            title: 'Noche de micrófono abierto musical',
            pitch:
              'Un micrófono abierto semanal donde músicos nuevos y veteranos comparten dos canciones cada uno en un local pequeño.',
            audience: 'Músicos y amantes de la música',
            venueType: 'Un pequeño local de música en Malasaña',
          },
          {
            title: 'Noche de upcycling de moda',
            pitch:
              'Un intercambio de ropa seguido de una sesión práctica de rediseño con máquinas de coser y ayuda de una costurera.',
            audience: 'Amantes de la moda y makers',
            venueType: 'Un taller o sala de costura comunitaria',
          },
        ],
      },
      {
        name: 'Impacto y local',
        ideas: [
          {
            title: 'Noche informativa de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre reglas de alquiler, contratos y dónde obtener asesoramiento gratuito sobre vivienda.',
            audience: 'Inquilinos y organizadores de inquilinos',
            venueType: 'Un sindicato de inquilinos o centro comunitario',
          },
          {
            title: 'Noche abierta de la asociación de vecinos',
            pitch:
              'Una noche abierta en la asociación de vecinos donde los residentes fijan la agenda del próximo mes.',
            audience: 'Vecinos que quieren involucrarse',
            venueType: 'Una sala de asociación de vecinos',
          },
          {
            title: 'Mañana de limpieza de barrio',
            pitch:
              'Una limpieza sabatina de una calle o plaza, con guantes y café aportados por las tiendas locales.',
            audience: 'Vecinos y dueños de tiendas',
            venueType: 'Una calle elegida en cualquier barrio',
          },
          {
            title: 'Jornada de huerto comunitario',
            pitch:
              'Los vecinos pasan una mañana plantando, regando y planificando la temporada en un huerto compartido.',
            audience: 'Huerteros y futuros huerteros',
            venueType: 'Un huerto comunitario o frutal urbano',
          },
          {
            title: 'Historias de puestos del mercado',
            pitch:
              'Comerciantes veteranos comparten historias de cinco minutos detrás de sus puestos, seguidas de preguntas abiertas.',
            audience: 'Vecinos y amantes de la comida',
            venueType: 'Una galería de mercado como Vallehermoso',
          },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo elijo una de estas ideas?',
        answer:
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Madrid, los formatos recurrentes con un lugar fijo — un encuentro semanal de terraza, una ruta mensual de tapas — construyen comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos grupos de Madrid funcionan en inglés o son bilingües, especialmente en las escenas tech y creativas. Un poco de español abre puertas con los vecinos y los comerciantes del mercado.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Madrid, y la tradición asociativa de la ciudad te da un patrón probado. Las guías paso a paso recorren el camino desde el primer evento hasta una comunidad estable.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro una comunidad en Madrid?',
      answer:
        'Usa las páginas de tipos de grupo para comunidades de startups, creativas, políticas, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los madrileños. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu comunidad hoy mismo.',
    },
    {
      question: '¿Es realista crear una comunidad en Madrid?',
      answer:
        'Sí. Madrid tiene terrazas y plazas por todas partes, generoso espacio de parques y una fuerte tradición asociativa. Las guías cubren cómo crear una comunidad, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — bares de terraza, galerías de mercado, el Retiro, Matadero, centros comunitarios — existe en Madrid. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Madrid?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los madrileños a encontrar o crear comunidades.',
    },
  ],
};

export default content;
