import type { CityContent } from '../../types';

/**
 * Contenido de Bogotá — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para las 7 páginas `es` de Bogotá en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'bogota',
  title: 'Comunidades en Bogotá | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Bogotá — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Comunidades en Bogotá | JoinOrigin',
    cityDescription:
      'Encuentra o crea comunidades en Bogotá — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups en Bogotá | JoinOrigin',
      creative: 'Comunidades creativas y de diseño en Bogotá | JoinOrigin',
      political: 'Comunidades políticas y cívicas en Bogotá | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Bogotá | JoinOrigin',
      'small-business': 'Comunidades de pequeñas empresas en Bogotá | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea comunidades de startups en Bogotá — fundadores, constructores y equipos tempranos en Chapinero y Zona G. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea comunidades creativas y de diseño en Bogotá — estudios, galerías y arte callejero en La Candelaria, Chapinero y Teusaquillo. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea comunidades políticas y cívicas en Bogotá — vivienda, movilidad, paz y memoria. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Bogotá — paseos en ciclovía, picnics en el parque y sociales de café. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea comunidades de pequeñas empresas en Bogotá — panaderías, cafés, artesanos de Usaquén y boutiques de Chapinero. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos comunitarios en Bogotá | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Bogotá — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'Bogotá es la capital de Colombia y una ciudad de unos 7,7 millones de habitantes — con más de diez millones en el área metropolitana — situada a 2.640 metros sobre el nivel del mar en una altiplanicie andina. La altitud moldea la vida diaria: el aire es fino, el sol es fuerte y la lluvia llega en ráfagas agudas por la tarde, por lo que los locales planifican las reuniones en torno al clima y al famosamente eficiente sistema de buses TransMilenio de la ciudad.',
    'Bogotá es la capital económica y de startups de Colombia: empresas como Rappi nacieron aquí, y la escena de Chapinero, la Zona G y el centro de la ciudad mezcla fundadores, ingenieros y diseñadores de todo el país. La ciudad es también una potencia cultural: el Museo del Oro, el Museo Botero, el grafiti de La Candelaria y la ciclovía dominical, cuando cien kilómetros de calles se cierran a los autos para ciclistas y caminantes. La Universidad de los Andes, la Javeriana y la Universidad Nacional alimentan flujos constantes de estudiantes e investigadores hacia las comunidades locales.',
    'La ciudad se ha transformado en las últimas décadas y sus habitantes están orgullosos de esa historia: los carriles de bicicleta, las bibliotecas públicas y los programas comunitarios son partes reales de la vida diaria. Para encontrar o crear una comunidad, Bogotá recompensa presentarse con constancia, elegir un barrio y construir un grupo que coincida con la energía de la ciudad y su estilo social cálido y directo.',
  ],
  dataPoints: [
    'Unos 7,7 millones de habitantes; más de 10 millones en el área metropolitana.',
    'Capital de Colombia a 2.640 metros de altitud.',
    'Clústeres de startups, finanzas e industrias creativas.',
    'Anclajes: Universidad de los Andes, Javeriana, Universidad Nacional.',
    'Anclajes públicos: Monserrate, parque Simón Bolívar, la ciclovía dominical.',
    'Escenas de barrio: Chapinero, Usaquén, La Candelaria, Zona G, Teusaquillo.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en Chapinero y Zona G',
        'Oficinas de startups en el centro',
        'Incubadoras universitarias cerca de Los Andes y la Javeriana',
        'Salas de eventos de oficinas fintech y de e-commerce',
        'Salas de eventos de aceleradoras en Chapinero Alto',
        'Cafés con mesas de fundadores en el Parque 93',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de fintech y logística',
        'Encuentros de expansión regional',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — fintech, logística o tecnología creativa — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de Chapinero o Zona G.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Galerías y calles de grafiti en La Candelaria',
        'Estudios de diseño en Chapinero',
        'Mercados de artesanos y plazas de Usaquén',
        'Centros culturales de Teusaquillo',
        'Salas de música y clubes de salsa',
        'Salas de eventos de museos y centros culturales',
      ],
      formats: [
        'Recorridos de grafiti y caminatas de arte callejero',
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
        'Sociales de salsa y música',
      ],
      howToStart: [
        'Elige un oficio — arte visual, diseño, música, arte callejero — y un barrio.',
        'Asóciate con una galería, un centro cultural o un club que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Oficinas del concejo y de las localidades',
        'Salas de reuniones de bibliotecas públicas',
        'Salas de centros comunitarios de la ciudad',
        'Oficinas de defensa de inquilinos y vivienda',
        'Espacios de civic tech en Chapinero',
        'Espacios de eventos en parques y plazas',
      ],
      formats: [
        'Noches de información sobre vivienda y alquileres',
        'Talleres de derechos de inquilinos',
        'Sesiones informativas de voluntariado en transporte y movilidad',
        'Círculos de paz y reconciliación comunitaria',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — una localidad, un barrio o una sola política.',
        'Asiste primero a tres reuniones existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Prados del parque Simón Bolívar',
        'Rutas de ciclovía los domingos',
        'Plaza y mercado de artesanos de Usaquén',
        'Cafés y patios de La Candelaria',
        'Restaurantes del Parque 93 y la Zona G',
        'Bibliotecas públicas con salas comunitarias',
      ],
      formats: [
        'Paseos en bicicleta por la ciclovía dominical',
        'Picnics y carreras en el parque',
        'Sociales de café e intercambios de idiomas',
        'Noches de juegos de mesa y trivia',
        'Caminatas por mercados de artesanos',
      ],
      howToStart: [
        'Elige un formato repetible — un paseo dominical, una caminata mensual por el mercado — y un punto de encuentro fijo.',
        'Elige un lugar como el parque Simón Bolívar o un café de Usaquén al que se llegue fácil en TransMilenio.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en Chapinero y Usaquén',
        'Espacios de vendedores en mercados de artesanos',
        'Talleres del centro de pequeñas empresas de la ciudad',
        'Salas de eventos de asociaciones comerciales',
        'Cafés y panaderías locales con rincones comunitarios',
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
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de alquiler, permisos y apps de reparto.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la asociación comercial corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Bogotá es la más grande de Colombia y una de las más dinámicas de América Latina, construida sobre un mercado de consumo en crecimiento y una ola de empresas de fintech, logística y marketplaces — incluida Rappi, que nació aquí. Chapinero y la Zona G concentran la mayor densidad de espacios de coworking y startups respaldadas por capital de riesgo, el centro ancla la capa corporativa y universidades como Los Andes y la Javeriana alimentan año tras año a fundadores e ingenieros. Lo que hace distintiva a la escena es su resiliencia y su ambición regional: las startups colombianas piensan en todo el continente desde temprano, y la mejora de la infraestructura y la clase media creciente de la ciudad respaldan a las empresas orientadas al consumo. La ciudad es también un imán para el talento de toda Colombia, lo que la convierte en un auténtico hub nacional. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y paneles de la industria, muchos de ellos gratuitos y abiertos. Consejo honesto para crear una comunidad de startups en Bogotá: elige una vertical, ancla a un barrio y planifica en torno al tráfico y la lluvia: un evento semanal constante en un coworking de Chapinero construirá seguidores leales.',
    creative:
      'Las comunidades creativas de Bogotá se impulsan con la extraordinaria cultura de arte público de la ciudad: las paredes de La Candelaria son un lienzo para algunos de los mejores artistas callejeros del mundo, y la escena de grafiti de la ciudad ha logrado reconocimiento internacional. El centro histórico alberga galerías, museos y centros culturales — el Museo del Oro y el Museo Botero anclan una escena artística seria — mientras que Chapinero y Teusaquillo acogen estudios, oficinas de diseño y teatros independientes. El mercado de artesanos y las plazas de Usaquén mantienen vivas las artesanías tradicionales, y las escenas de salsa y música de la ciudad dan a los creativos un ritmo social natural. La ciclovía dominical convierte la ciudad en un escenario, y festivales como el Festival Iberoamericano de Teatro atraen artistas de todas partes. Universidades como Los Andes y la Nacional aportan nuevo talento cada año. Crear una comunidad creativa en Bogotá significa elegir una disciplina y un barrio, y luego usar la profunda infraestructura cultural de la ciudad y su audiencia orgullosa y expresiva para construir algo con impacto real.',
    political:
      'Las comunidades políticas y cívicas de Bogotá están moldeadas por la historia reciente de Colombia y por la propia transformación de la ciudad: la construcción de paz, la memoria, la vivienda y la movilidad son los temas que animan la organización local. La ciudad tiene una fuerte tradición de participación ciudadana — desde los famosos movimientos ciudadanos de los años 90 hasta las asambleas barriales de hoy — y el gobierno distrital ha invertido mucho en bibliotecas públicas, parques e infraestructura de bicicletas, lo que da a los organizadores activos reales con los que trabajar. La asequibilidad de la vivienda y el desplazamiento organizan grupos de inquilinos y fideicomisos de tierra comunitarios, mientras que los defensores del transporte y la movilidad impulsan la extensión del TransMilenio y la red de bicicletas. Las universidades de la ciudad dan a la vida cívica una energía intelectual, y las comunidades de civic tech construyen herramientas para datos abiertos y participación. La cultura política recompensa la persistencia, la construcción de confianza y un compromiso genuino con la comunidad. Crear una comunidad cívica en Bogotá suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con el rico paisaje existente de organizaciones.',
    meetup:
      'La cultura de encuentros de Bogotá se construye en torno a la ciclovía dominical — cuando cien kilómetros de calles se cierran a los autos y la ciudad se llena de ciclistas, corredores y caminantes — y en torno a los parques, plazas y mercados que anclan la vida diaria. El parque Simón Bolívar acoge picnics y carreras, la plaza de Usaquén se llena de un mercado de artesanos los fines de semana, y los cafés y patios de La Candelaria albergan las reuniones más encantadoras de la ciudad. El TransMilenio hace práctico viajar por toda la ciudad, y la población joven y enérgica de la ciudad significa que siempre hay demanda de nuevos grupos. El clima de Bogotá — mañanas soleadas, tardes lluviosas — da forma al calendario: los formatos de mañana y noche funcionan mejor, y un buen plan para la lluvia mantiene leales a los grupos. Los formatos con poder de permanencia son simples y repetibles: un paseo dominical, una caminata mensual por el mercado, una noche de trivia fija. Consejo honesto para crear un encuentro aquí: elige un barrio, un lugar accesible en TransMilenio y un plan para la lluvia, y la energía cálida y sociable de la ciudad hará el trabajo de crecimiento.',
    'small-business':
      'Las comunidades de pequeñas empresas de Bogotá son la textura de las calles de la ciudad: la panadería, el café, el artesano de Usaquén, la boutique de Chapinero y el tendero de La Candelaria comparten preguntas prácticas sobre alquiler, permisos, personal y el flujo de clientes. Los mercados de artesanos y las plazas de barrio dan a los vendedores comunidades naturales, y los corredores comerciales de Chapinero, la Zona G y Usaquén concentran grupos de tiendas con un interés compartido en el tránsito peatonal. Las asociaciones comerciales y los centros de pequeñas empresas de la ciudad ofrecen talleres sobre licencias, préstamos y venta digital, y la creciente cultura turística y gastronómica de la ciudad mantiene la apertura de nuevos negocios — desde tostadores de café de especialidad hasta cervecerías artesanales que han convertido a Bogotá en un destino para visitantes amantes de la comida. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de mercado de artesanos. Crear una comunidad de pequeñas empresas aquí es realista: una mesa redonda mensual en un café de barrio, con temas rotativos como alquiler, seguros y pagos digitales, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'La energía de Bogotá, su arte público y su cultura de ciclovía dominical la convierten en un lugar maravilloso para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Bogotá, desde el parque Simón Bolívar y las rutas de ciclovía hasta cafés de La Candelaria, plazas de Usaquén y centros culturales. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la energía de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Usaquén',
            pitch:
              'Un paseo sabatino por tres cafés del antiguo barrio colonial, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Usaquén',
          },
          {
            title: 'AMA de fundador en un coworking de Chapinero',
            pitch:
              'Un fundador comparte su historia honesta durante treinta minutos y luego responde preguntas abiertas de la sala.',
            audience: 'Fundadores en etapa temprana y emprendedores aspirantes',
            venueType: 'Coworking de Chapinero',
          },
          {
            title: 'Social de bienvenida para recién llegados',
            pitch:
              'Una noche de baja presión donde los recién llegados conocen a residentes de larga data con café y consignas de conversación.',
            audience: 'Recién llegados a la ciudad',
            venueType: 'Centro comunitario o sala de eventos de un café',
          },
          {
            title: 'Círculo de historias de carrera',
            pitch:
              'Seis personas cuentan su historia de carrera en cinco minutos, seguidas de debate grupal y consignas de conexión.',
            audience: 'Buscadores de empleo, personas en cambio de carrera y mentores',
            venueType: 'Sala de reuniones de una biblioteca pública',
          },
          {
            title: 'Paseo de networking por la ciclovía',
            pitch:
              'Un paseo dominical amigable por las calles sin autos, con paradas para conversar y un café de cierre.',
            audience: 'Ciclistas y networkers',
            venueType: 'Rutas de ciclovía y un café',
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
            venueType: 'Café o centro comunitario en Chapinero',
          },
          {
            title: 'Finanzas de pequeña empresa en español sencillo',
            pitch:
              'Una sesión práctica que cubre flujo de caja, impuestos y préstamos para dueños primerizos.',
            audience: 'Nuevos dueños de pequeñas empresas',
            venueType: 'Centro de pequeñas empresas de la ciudad',
          },
          {
            title: 'Taller de cata e historia del café',
            pitch:
              'Una sesión práctica para aprender sobre las regiones cafeteras de Colombia, el tostado y la preparación.',
            audience: 'Amantes del café y preparadores caseros',
            venueType: 'Espacio de taller de un café o tostaduría',
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
            title: 'Picnic en el parque Simón Bolívar',
            pitch:
              'Mantas, música y una comida compartida en el gran parque de la ciudad, con un paseo por el lago.',
            audience: 'Amigos, familias y recién llegados',
            venueType: 'Prados del parque Simón Bolívar',
          },
          {
            title: 'Paseo dominical por la ciclovía',
            pitch:
              'Un paseo relajado por las calles sin autos con paradas de desayuno y un ritmo amigable.',
            audience: 'Ciclistas de todos los niveles',
            venueType: 'Calles de la ruta de ciclovía',
          },
          {
            title: 'Caminata al amanecer en Monserrate',
            pitch:
              'Una caminata temprana o un paseo en teleférico al santuario de la montaña para ver el amanecer sobre la ciudad.',
            audience: 'Madrugadores y caminantes',
            venueType: 'Sendero y teleférico de Monserrate',
          },
          {
            title: 'Noche de juegos de mesa en un bar de Chapinero',
            pitch:
              'Una pila mensual de juegos de mesa en un bar de barrio que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Bar o café de Chapinero',
          },
          {
            title: 'Paseo por el mercado de artesanos de Usaquén',
            pitch:
              'Una caminata lenta por el mercado de fin de semana con paradas de comida y conversaciones con artesanos.',
            audience: 'Exploradores dominicales',
            venueType: 'Plaza y mercado de Usaquén',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Mesa redonda de fintech y logística',
            pitch:
              'Un debate mensual para fundadores y operadores que trabajan en pagos, reparto e inclusión financiera.',
            audience: 'Profesionales de fintech y logística',
            venueType: 'Coworking o sala de eventos de oficina',
          },
          {
            title: 'Noche de crítica de diseño',
            pitch:
              'Diseñadores de producto y marca presentan trabajo real en proceso y reciben comentarios estructurados.',
            audience: 'Diseñadores de producto, marca y UX',
            venueType: 'Estudio de diseño en Chapinero',
          },
          {
            title: 'Mezclador de industrias creativas',
            pitch:
              'Una noche informal donde diseñadores, cineastas y profesionales de medios intercambian notas y contactos.',
            audience: 'Profesionales de industrias creativas',
            venueType: 'Centro cultural o estudio de diseño',
          },
          {
            title: 'Encuentro de la industria del café',
            pitch:
              'Una noche informal para tostadores, dueños de cafés y exportadores que comparten tendencias y contactos.',
            audience: 'Profesionales de la industria del café',
            venueType: 'Tostaduría o espacio de eventos de un café',
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
            title: 'Caminata de grafiti por La Candelaria',
            pitch:
              'Un paseo guiado por los murales del centro histórico con las historias detrás de los artistas.',
            audience: 'Caminantes de arte y fotógrafos',
            venueType: 'Calles y muros de La Candelaria',
          },
          {
            title: 'Día de estudio abierto en Teusaquillo',
            pitch:
              'Artistas y diseñadores abren sus estudios durante una tarde de visitas, demos y obras a la venta.',
            audience: 'Amantes del arte y visitantes curiosos',
            venueType: 'Estudios de Teusaquillo',
          },
          {
            title: 'Noche de salsa para principiantes',
            pitch:
              'Una noche divertida donde los principiantes aprenden pasos básicos de salsa junto a bailarines experimentados.',
            audience: 'Bailarines de todos los niveles',
            venueType: 'Club de salsa o estudio de baile',
          },
          {
            title: 'Micrófono abierto para músicos y poetas',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Músicos, poetas y principiantes',
            venueType: 'Lugar en La Candelaria o Chapinero',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en Chapinero',
          },
        ],
      },
      {
        name: 'Impacto y local',
        ideas: [
          {
            title: 'Mañana de limpieza de parque',
            pitch: 'Una limpieza sabatina de un parque de barrio, con guantes y café incluidos.',
            audience: 'Voluntarios y amantes de los parques',
            venueType: 'Un parque de barrio elegido',
          },
          {
            title: 'Jornada de huerta comunitaria',
            pitch:
              'Unas horas de siembra y desmalezado en una huerta comunitaria, seguidas de un refrigerio compartido y un recorrido por la huerta.',
            audience: 'Huerteros, voluntarios y familias',
            venueType: 'Huerta comunitaria de barrio',
          },
          {
            title: 'Sesión informativa de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre contratos, depósitos y dónde obtener ayuda legal gratuita.',
            audience: 'Inquilinos y organizadores de inquilinos',
            venueType: 'Centro comunitario o biblioteca',
          },
          {
            title: 'Círculo comunitario de paz y memoria',
            pitch:
              'Una reunión respetuosa donde los vecinos comparten historias y aprenden sobre la historia de construcción de paz de la ciudad.',
            audience: 'Vecinos interesados en la reconciliación',
            venueType: 'Centro comunitario o espacio cultural',
          },
          {
            title: 'Noche de historias de negocios locales',
            pitch:
              'Dueños de tiendas y mercados comparten las historias detrás de sus negocios en charlas de cinco minutos.',
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
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Bogotá, los formatos de mañana y noche con un plan para la lluvia — paseos dominicales, caminatas por mercados, sociales de café — tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de Bogotá se hacen en inglés o bilingües, especialmente en Chapinero y la Zona G. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Bogotá. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro una comunidad en Bogotá?',
      answer:
        'Empieza por las páginas de tipos de grupo: comunidades de startups, creativas, políticas, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los residentes. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu comunidad hoy mismo.',
    },
    {
      question: '¿Es realista crear una comunidad en Bogotá?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, una población joven y enérgica y una fuerte cultura cívica. Las guías cubren cómo crear una comunidad, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — el parque Simón Bolívar, las rutas de ciclovía, la plaza de Usaquén, los cafés de La Candelaria, los centros culturales — existe en Bogotá. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Bogotá?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los residentes a encontrar o crear comunidades.',
    },
  ],
};

export default content;
