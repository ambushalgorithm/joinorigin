import type { CityContent } from '../../types';

/**
 * Contenido de Lima — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para las 7 páginas `es` de Lima en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'lima',
  title: 'Comunidades en Lima | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Lima — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Comunidades en Lima | JoinOrigin',
    cityDescription:
      'Encuentra o crea comunidades en Lima — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups en Lima | JoinOrigin',
      creative: 'Comunidades creativas y de diseño en Lima | JoinOrigin',
      political: 'Comunidades políticas y cívicas en Lima | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Lima | JoinOrigin',
      'small-business': 'Comunidades de pequeñas empresas en Lima | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea comunidades de startups en Lima — fundadores, constructores y equipos tempranos en Miraflores y San Isidro. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea comunidades creativas y de diseño en Lima — galerías, estudios y peñas en Barranco, Miraflores y el Centro Histórico. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea comunidades políticas y cívicas en Lima — vivienda, movilidad, agua y participación. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Lima — paseos por el Malecón, playas de la Costa Verde y cevicherías. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea comunidades de pequeñas empresas en Lima — cevicherías, bodegas y boutiques de Barranco. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos comunitarios en Lima | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Lima — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'Lima es la capital del Perú y una ciudad de unos 7,7 millones de habitantes — con más de diez millones en el área metropolitana — situada en la costa del Pacífico, donde el océano se encuentra con el desierto. La ciudad es famosa en todo el mundo por su comida: el ceviche, el pisco sour y una escena gastronómica que ha convertido a Lima en una capital culinaria global, con restaurantes, mercados y escuelas de cocina que alimentan una cultura profunda de comer juntos.',
    'La ciudad es el centro económico y de startups del Perú, con una escena fintech y creativa en crecimiento, y sus barrios tienen personalidades distintas: Miraflores y Barranco para los cafés, el arte y los acantilados del océano; San Isidro para los negocios; y el Centro Histórico para las capas profundas de la historia: plazas coloniales, la universidad de San Marcos fundada en 1551 y huacas preincaicas (ruinas antiguas) en medio de las calles modernas. La PUCP, San Marcos y otras universidades alimentan flujos constantes de estudiantes e investigadores hacia las comunidades locales.',
    'El clima de Lima es famosamente gris — una niebla costera llamada garúa cubre el cielo gran parte del año — pero la vida social de la ciudad es cálida y animada: el Malecón, las playas de la Costa Verde, los bares de Barranco y las cevicherías de cada barrio. Para encontrar o crear una comunidad, Lima recompensa elegir un barrio, un buen lugar y un grupo que celebre la comida de la ciudad y su cultura orgullosa y hospitalaria.',
  ],
  dataPoints: [
    'Unos 7,7 millones de habitantes; más de 10 millones en el área metropolitana.',
    'Capital del Perú en la costa del Pacífico.',
    'Capital gastronómica global; cultura del ceviche y el pisco sour.',
    'Clústeres de fintech, industrias creativas y culinarias.',
    'Anclajes: PUCP, San Marcos, UPC, USIL.',
    'Escenas de barrio: Miraflores, Barranco, San Isidro, Centro Histórico.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en Miraflores y San Isidro',
        'Oficinas de startups en el centro',
        'Incubadoras universitarias cerca de la PUCP y San Marcos',
        'Salas de eventos de oficinas fintech y de e-commerce',
        'Salas de eventos de aceleradoras en Miraflores',
        'Cafés con mesas de fundadores en Barranco',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de fintech y pagos',
        'Encuentros de gastronomía y food-tech',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — fintech, food-tech o tecnología creativa — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de Miraflores o San Isidro.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Galerías y estudios de artistas en Barranco',
        'Centros culturales de Miraflores',
        'Museos y patios del Centro Histórico',
        'Estudios de diseño en Barranco',
        'Salas de música y peñas',
        'Caminatas de arte callejero en Barranco',
      ],
      formats: [
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
        'Sociales de música y peña',
        'Lecturas de literatura y poesía',
      ],
      howToStart: [
        'Elige un oficio — arte visual, diseño, música, literatura — y un barrio.',
        'Asóciate con una galería, un centro cultural o una peña que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Alcaldía y oficinas municipales',
        'Salas de reuniones de bibliotecas públicas',
        'Salas de centros comunitarios de la ciudad',
        'Oficinas de defensa de inquilinos y vivienda',
        'Espacios de civic tech en Miraflores',
        'Espacios de eventos en parques y plazas',
      ],
      formats: [
        'Noches de información sobre vivienda y alquileres',
        'Talleres de derechos de inquilinos',
        'Sesiones informativas de voluntariado en transporte y movilidad',
        'Círculos de clima y conciencia del agua',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — un distrito, un barrio o una sola política.',
        'Asiste primero a tres reuniones existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Malecón de Miraflores',
        'Plazas y bares de Barranco',
        'Parque Kennedy y cafés cercanos',
        'Playas de la Costa Verde',
        'Plazas del Centro Histórico',
        'Bibliotecas públicas con salas comunitarias',
      ],
      formats: [
        'Caminatas y carreras por el Malecón',
        'Reuniones de surf y playa',
        'Sociales de café e intercambios de idiomas',
        'Recorridos de ceviche y caminatas gastronómicas',
        'Noches de juegos de mesa y trivia',
      ],
      howToStart: [
        'Elige un formato repetible — una caminata por el Malecón, un recorrido de ceviche — y un punto de encuentro fijo.',
        'Elige un lugar como el Malecón o una plaza de Barranco que sea fácil de encontrar.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en Miraflores y Barranco',
        'Espacios de vendedores en mercados y ferias',
        'Talleres del centro de pequeñas empresas de la ciudad',
        'Salas de eventos de asociaciones comerciales',
        'Cafés y cevicherías locales con rincones comunitarios',
        'Espacios de food hall y cocinas de incubadoras',
      ],
      formats: [
        'Desayunos de dueños de tiendas sin agenda',
        'Mesas redondas de vendedores de mercado',
        'Clínicas de la agencia de la ciudad sobre permisos y licencias',
        'Círculos de compra compartida de suministros',
        'Caminatas barriales por corredores de tiendas',
      ],
      howToStart: [
        'Elige un corredor y un café que ya alimente a los dueños locales; reclama una mesa fija en la esquina.',
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de alquiler, permisos y la economía de la comida.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la asociación comercial corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Lima es la más grande del Perú y una fuerza en ascenso en América Latina, construida sobre un mercado de consumo en crecimiento, una fuerte ola fintech y una cultura alimentaria que está generando su propia industria food-tech. Miraflores y San Isidro concentran la mayor densidad de espacios de coworking y startups respaldadas por capital de riesgo, mientras que universidades como la PUCP y San Marcos alimentan año tras año a ingenieros y fundadores. Lo que hace distintiva a la escena es su conexión con las fortalezas del Perú: la gastronomía está produciendo una capa food-tech de startups de reparto, logística y cocinas, y la brecha de inclusión financiera del país ha hecho del fintech un foco natural. La escena es más pequeña y más colaborativa que la de Ciudad de México o São Paulo, lo que significa que los recién llegados pueden conocer genuinamente a la mayoría de las personas relevantes en unos meses. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y paneles de la industria, muchos de ellos gratuitos y abiertos. Consejo honesto para crear una comunidad de startups en Lima: elige una vertical, ancla en Miraflores o Barranco y apóyate en la calidez de la ciudad: un evento semanal constante construirá seguidores leales.',
    creative:
      'Las comunidades creativas de Lima prosperan en Barranco, el distrito bohemio de la ciudad con galerías, estudios de artistas, bares y acantilados sobre el océano. El barrio ha sido hogar de poetas, pintores y músicos peruanos durante generaciones, y su energía se extiende ahora al diseño, el cine y las artes culinarias en auge de la ciudad. Miraflores añade centros culturales y una escena de galerías sofisticada, mientras que el Centro Histórico superpone arquitectura colonial con museos que cuentan la historia profunda del Perú. Las peñas de la ciudad — espacios para la música tradicional peruana — mantienen viva la cultura andina y criolla, y el auge gastronómico ha convertido a los chefs en celebridades y a las escuelas de cocina en centros comunitarios. La niebla gris costera da a la ciudad una cultura creativa íntima e interior: los cafés, los estudios y las galerías son donde vive la escena. Crear una comunidad creativa en Lima significa elegir una disciplina y un barrio, y luego usar la rica herencia cultural de la ciudad y su audiencia orgullosa y expresiva para construir algo con alma real.',
    political:
      'Las comunidades políticas y cívicas de Lima están moldeadas por la escala de la ciudad, sus desigualdades y su papel como capital nacional: la vivienda, la movilidad, el agua y la seguridad pública son los temas que animan la organización local. La ciudad está dividida en distritos con alcaldes elegidos, lo que mantiene accesible la política local: los vecinos pueden asistir a las sesiones del concejo distrital y dar forma a las decisiones sobre uso del suelo y espacio público en su propio barrio. La asequibilidad de la vivienda y los asentamientos informales organizan grupos de inquilinos y movimientos comunitarios, mientras que los defensores del transporte y la movilidad impulsan un mejor servicio de Metro y buses en una de las ciudades más congestionadas de la región. La conciencia del clima y del agua es una prioridad creciente en una ciudad desértica, y las comunidades de civic tech construyen herramientas para datos abiertos y participación. La cultura política recompensa la persistencia, la construcción de confianza y el conocimiento del barrio. Crear una comunidad cívica en Lima suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con el denso paisaje existente de organizaciones.',
    meetup:
      'La cultura de encuentros de Lima se construye sobre el Malecón, el paseo que corre por los acantilados del océano en Miraflores, y sobre las plazas, los cafés y las cevicherías que anclan la vida diaria. Caminatas y carreras de fin de semana por el Malecón, sesiones de surf en las playas de la Costa Verde, recorridos de ceviche por los mercados de barrio y sociales de café en Barranco: la ciudad funciona con estos ritmos. El clima gris y templado es en realidad un regalo para los organizadores: nunca hace demasiado calor ni demasiado frío, y los formatos al aire libre funcionan todo el año. La cultura alimentaria de la ciudad hace de comer juntos el formato social por defecto, y su creciente población internacional apoya los intercambios de idiomas y los sociales para recién llegados. Los formatos con poder de permanencia son simples y repetibles: una caminata por el Malecón, un recorrido mensual de ceviche, una noche de trivia fija. Consejo honesto para crear un encuentro en Lima: elige un barrio, un punto de encuentro emblemático y un formato que celebre la comida y la calidez de la ciudad: los limeños aparecerán por un grupo que se sienta real.',
    'small-business':
      'Las comunidades de pequeñas empresas de Lima se construyen sobre las calles y los mercados de la ciudad: la cevichería, la bodega, la tienda-galería de Barranco, la boutique de Miraflores y el vendedor de mercado comparten preguntas prácticas sobre alquiler, permisos, personal y el flujo de clientes. Los mercados de la ciudad son comunidades en sí mismos — los vendedores se coordinan en torno a suministros, seguridad y clientes habituales — y los corredores comerciales de Miraflores, Barranco y el Centro concentran grupos de tiendas con un interés compartido en el tránsito peatonal. El auge gastronómico ha creado una poderosa red de negocios de comida: las cevicherías, los restaurantes chifa y las escuelas de cocina se alimentan mutuamente de clientes y talento. Las asociaciones comerciales y los centros de pequeñas empresas de la ciudad ofrecen talleres sobre licencias, préstamos y venta digital. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de vendedores de mercado. Crear una comunidad de pequeñas empresas aquí es realista: una mesa redonda mensual en un café o cevichería de barrio, con temas rotativos como alquiler, seguros y pagos digitales, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'La cultura alimentaria de Lima, sus acantilados costeros y su estilo social cálido la convierten en un lugar maravilloso para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Lima, desde el Malecón de Miraflores y las plazas de Barranco hasta cevicherías, centros culturales y mercados de barrio. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la calidez de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Barranco',
            pitch:
              'Un paseo sabatino por tres cafés del distrito bohemio, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Barranco',
          },
          {
            title: 'AMA de fundador en un coworking de Miraflores',
            pitch:
              'Un fundador comparte su historia honesta durante treinta minutos y luego responde preguntas abiertas de la sala.',
            audience: 'Fundadores en etapa temprana y emprendedores aspirantes',
            venueType: 'Coworking de Miraflores',
          },
          {
            title: 'Social de bienvenida para recién llegados',
            pitch:
              'Una noche de baja presión donde los recién llegados conocen a residentes de larga data con pisco sours y consignas de conversación.',
            audience: 'Recién llegados a la ciudad',
            venueType: 'Bar de Barranco o sala comunitaria',
          },
          {
            title: 'Círculo de historias de carrera',
            pitch:
              'Seis personas cuentan su historia de carrera en cinco minutos, seguidas de debate grupal y consignas de conexión.',
            audience: 'Buscadores de empleo, personas en cambio de carrera y mentores',
            venueType: 'Sala de reuniones de una biblioteca pública',
          },
          {
            title: 'Caminata al atardecer por el Malecón',
            pitch:
              'Un paseo guiado por los acantilados del océano al atardecer, con consignas de conversación y una parada para tomar algo.',
            audience: 'Amantes del atardecer y networkers',
            venueType: 'Malecón de Miraflores',
          },
        ],
      },
      {
        name: 'Aprendizaje y talleres',
        ideas: [
          {
            title: 'Intercambio de idiomas español-inglés',
            pitch: 'Mesas por nivel e idioma, con una regla simple: los errores son el punto.',
            audience: 'Estudiantes de español e inglés',
            venueType: 'Café o centro comunitario en Miraflores',
          },
          {
            title: 'Taller de cocina de ceviche',
            pitch:
              'Una noche práctica para aprender a preparar ceviche de la manera tradicional, con una degustación al final.',
            audience: 'Cocineros caseros y amantes de la comida',
            venueType: 'Escuela de cocina o cocina de cevichería',
          },
          {
            title: 'Finanzas de pequeña empresa en español sencillo',
            pitch:
              'Una sesión práctica que cubre flujo de caja, impuestos y préstamos para dueños primerizos.',
            audience: 'Nuevos dueños de pequeñas empresas',
            venueType: 'Centro de pequeñas empresas de la ciudad',
          },
          {
            title: 'Taller de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre contratos, depósitos y dónde obtener ayuda legal gratuita.',
            audience: 'Inquilinos y defensores de la vivienda',
            venueType: 'Centro comunitario o biblioteca',
          },
          {
            title: 'Noche de programación para principiantes absolutos',
            pitch:
              'Una tarde guiada donde los principiantes construyen su primer proyecto pequeño con mentores en la sala.',
            audience: 'Personas que se pasan a la tecnología',
            venueType: 'Coworking o laboratorio universitario',
          },
        ],
      },
      {
        name: 'Sociales y exteriores',
        ideas: [
          {
            title: 'Club de caminata matutina por el Malecón',
            pitch:
              'Una caminata semanal por los acantilados del océano con un tema de conversación rotativo, que termina con café.',
            audience: 'Caminantes y madrugadores',
            venueType: 'Malecón de Miraflores',
          },
          {
            title: 'Día de surf y playa en la Costa Verde',
            pitch:
              'Un día relajado de surf, juegos de playa y picnics en los acantilados bajo la ciudad.',
            audience: 'Surfistas y amantes de la playa',
            venueType: 'Playas de la Costa Verde',
          },
          {
            title: 'Paseo de arte y bares por Barranco',
            pitch: 'Una caminata nocturna guiada por las galerías y bares del distrito bohemio.',
            audience: 'Amantes de la cultura y noctámbulos',
            venueType: 'Calles y plazas de Barranco',
          },
          {
            title: 'Recorrido de ceviche por un mercado',
            pitch:
              'Una caminata de degustación por un mercado de barrio, probando ceviche de varios vendedores y votando por el mejor.',
            audience: 'Amantes de la comida y exploradores',
            venueType: 'Mercado de barrio',
          },
          {
            title: 'Noche de juegos de mesa en un bar de Miraflores',
            pitch:
              'Una pila mensual de juegos de mesa en un bar de barrio que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Bar o café de Miraflores',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Mesa redonda de fintech y pagos',
            pitch:
              'Un debate mensual para fundadores y operadores que trabajan en pagos, crédito e inclusión financiera.',
            audience: 'Fundadores y profesionales de fintech',
            venueType: 'Oficina fintech o sala de eventos de coworking',
          },
          {
            title: 'Encuentro de food-tech y gastronomía',
            pitch:
              'Una noche informal donde restauradores, operadores de reparto y fundadores food-tech comparten tendencias.',
            audience: 'Profesionales de la industria alimentaria',
            venueType: 'Escuela culinaria o espacio de eventos de un restaurante',
          },
          {
            title: 'Noche de crítica de diseño',
            pitch:
              'Diseñadores de producto y marca presentan trabajo real en proceso y reciben comentarios estructurados.',
            audience: 'Diseñadores de producto, marca y UX',
            venueType: 'Estudio de diseño en Barranco',
          },
          {
            title: 'Mezclador de industrias creativas',
            pitch:
              'Una noche informal donde diseñadores, cineastas y profesionales de medios intercambian notas y contactos.',
            audience: 'Profesionales de industrias creativas',
            venueType: 'Centro cultural o estudio de diseño',
          },
          {
            title: 'Círculo de contratación para equipos tempranos',
            pitch:
              'Los fundadores comparten cómo contratan, retienen y despiden: las verdades incómodas de construir equipos tempranos.',
            audience: 'Fundadores en etapa temprana y líderes de equipo',
            venueType: 'Oficina de startup o sala de coworking',
          },
        ],
      },
      {
        name: 'Creativas y maker',
        ideas: [
          {
            title: 'Caminata de arte callejero por Barranco',
            pitch:
              'Un paseo guiado por los murales y grafitis del distrito, con las historias detrás de los artistas.',
            audience: 'Caminantes de arte y fotógrafos',
            venueType: 'Calles y muros de Barranco',
          },
          {
            title: 'Día de estudio abierto en Barranco',
            pitch:
              'Artistas abren sus estudios durante una tarde de visitas, demos y obras a la venta.',
            audience: 'Amantes del arte y visitantes curiosos',
            venueType: 'Estudios de artistas en Barranco',
          },
          {
            title: 'Noche de peña de música tradicional',
            pitch: 'Una noche acogedora de música y danza peruana en una peña tradicional.',
            audience: 'Amantes de la música y exploradores culturales',
            venueType: 'Peña de barrio',
          },
          {
            title: 'Micrófono abierto para músicos y poetas',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Músicos, poetas y principiantes',
            venueType: 'Lugar en Barranco o centro cultural',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en Barranco',
          },
        ],
      },
      {
        name: 'Impacto y local',
        ideas: [
          {
            title: 'Mañana de limpieza de playa',
            pitch:
              'Una limpieza sabatina de un tramo de la Costa Verde, con guantes y café incluidos.',
            audience: 'Voluntarios y amantes del océano',
            venueType: 'Una playa elegida de la Costa Verde',
          },
          {
            title: 'Jornada de huerta comunitaria',
            pitch:
              'Unas horas de siembra y desmalezado en una huerta comunitaria, seguidas de un refrigerio compartido y un recorrido por la huerta.',
            audience: 'Huerteros, voluntarios y familias',
            venueType: 'Huerta comunitaria de barrio',
          },
          {
            title: 'Caminata patrimonial por la huaca',
            pitch:
              'Una visita guiada a una de las ruinas antiguas en medio de la ciudad, con la historia explicada.',
            audience: 'Amantes de la historia y vecinos curiosos',
            venueType: 'Un sitio huaca como la Huaca Pucllana',
          },
          {
            title: 'Sesión informativa de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre contratos, depósitos y dónde obtener ayuda legal gratuita.',
            audience: 'Inquilinos y organizadores de inquilinos',
            venueType: 'Centro comunitario o biblioteca',
          },
          {
            title: 'Noche de historias de negocios locales',
            pitch:
              'Dueños de tiendas y cevicherías comparten las historias detrás de sus negocios en charlas de cinco minutos.',
            audience: 'Vecinos y dueños de pequeñas empresas',
            venueType: 'Una tienda, café o sala de mercado local',
          },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo elijo una de estas ideas?',
        answer:
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Lima, los formatos centrados en la comida y al aire libre a lo largo del Malecón o en Barranco tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de Lima se hacen en inglés o bilingües, especialmente en Miraflores y Barranco. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Lima. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro una comunidad en Lima?',
      answer:
        'Empieza por las páginas de tipos de grupo: comunidades de startups, creativas, políticas, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los limeños. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu comunidad hoy mismo.',
    },
    {
      question: '¿Es realista crear una comunidad en Lima?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, un clima templado todo el año y una cultura cálida y hospitalaria. Las guías cubren cómo crear una comunidad, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — el Malecón, las plazas de Barranco, las cevicherías, los centros culturales, los mercados — existe en Lima. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Lima?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los limeños a encontrar o crear comunidades.',
    },
  ],
};

export default content;
