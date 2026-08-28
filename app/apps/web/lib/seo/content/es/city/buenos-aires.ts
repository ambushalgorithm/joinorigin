import type { CityContent } from '../../types';

/**
 * Contenido de Buenos Aires — traducción al español (archivo de contenido
 * por idioma).
 *
 * Texto para las 7 páginas `es` de Buenos Aires en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'buenos-aires',
  title: 'Origins en Buenos Aires | JoinOrigin',
  description:
    'Encuentra o crea Origins en Buenos Aires — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Origins en Buenos Aires | JoinOrigin',
    cityDescription:
      'Encuentra o crea Origins en Buenos Aires — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Origins de startups en Buenos Aires | JoinOrigin',
      creative: 'Origins creativos y de diseño en Buenos Aires | JoinOrigin',
      political: 'Origins políticos y cívicos en Buenos Aires | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Buenos Aires | JoinOrigin',
      'small-business': 'Origins de pequeñas empresas en Buenos Aires | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea Origins de startups en Buenos Aires — fundadores, constructores y equipos tempranos en Palermo y Villa Crespo. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea Origins creativos y de diseño en Buenos Aires — estudios, galerías y milongas en San Telmo, Palermo Soho y La Boca. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea Origins políticos y cívicos en Buenos Aires — inquilinos, asambleas barriales y redes de ayuda mutua. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Buenos Aires — caminatas por ferias, rondas de mate y sociales de milonga. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea Origins de pequeñas empresas en Buenos Aires — boutiques de Palermo Soho, anticuarios de San Telmo y feriantes. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos de Origins en Buenos Aires | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Buenos Aires — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'Buenos Aires es la capital de Argentina y una ciudad de unos 2,9 millones de habitantes dentro de sus límites, con más de trece millones en el Gran Buenos Aires. Es una ciudad de amplios bulevares, arquitectura de estilo europeo y una vida social famosamente intensa: la cultura del café, las parrillas, los salones de tango y los estadios de fútbol dan forma a cómo los porteños — como se llama a sus habitantes — se reúnen y conectan.',
    'La ciudad es la capital de las startups y de la creatividad en América Latina: empresas como MercadoLibre nacieron aquí, y la escena de Palermo, Villa Crespo y el Microcentro mezcla fundadores, diseñadores e ingenieros de toda la región. La UBA — una de las universidades públicas más grandes y con más historia del mundo —, la UTN y la Universidad Di Tella alimentan un flujo constante de estudiantes e investigadores hacia las comunidades locales. Los anclajes públicos incluyen los Bosques de Palermo, el mercado de San Telmo, Puerto Madero y las plazas que anclan cada barrio.',
    'Los porteños son famosos por trasnochar, tomar mate y construir amistades profundas: la vida comunitaria funciona con calidez y boca a boca. La economía ha pasado por ciclos duros, lo que ha producido una cultura de ingenio y apoyo mutuo que aparece en todo, desde redes de trueque hasta eventos gratuitos. Para encontrar o crear un Origin, Buenos Aires recompensa la autenticidad, un buen lugar y un grupo que alimente el hambre de conversación de la ciudad.',
  ],
  dataPoints: [
    'Unos 2,9 millones de habitantes en la ciudad; más de 13 millones en el Gran Buenos Aires.',
    'Capital de Argentina; capital de startups y creatividad de la región.',
    'Cultura del tango, la literatura, el diseño y el fútbol.',
    'Anclajes: UBA, UTN, Universidad Di Tella.',
    'Anclajes públicos: Bosques de Palermo, mercado de San Telmo, Puerto Madero.',
    'Escenas de barrio: Palermo, Recoleta, San Telmo, La Boca, Villa Crespo, Belgrano.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en Palermo y Villa Crespo',
        'Oficinas de startups en el Microcentro',
        'Incubadoras universitarias cerca de la UBA y Di Tella',
        'Salas de eventos de oficinas fintech y de e-commerce',
        'Salas de eventos de aceleradoras en Palermo Hollywood',
        'Cafés con mesas de fundadores en Palermo Soho',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de fintech y pagos',
        'Encuentros de expansión regional',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — fintech, e-commerce o tecnología creativa — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de Palermo o Villa Crespo.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Estudios y galerías de diseño en Palermo Soho',
        'Calles de arte y anticuarios en San Telmo',
        'Rincones de artistas en La Boca y Caminito',
        'Salones de tango y milongas',
        'Teatros y centros culturales en el Microcentro',
        'Salas de eventos en bibliotecas y librerías',
      ],
      formats: [
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
        'Sociales de tango y música',
        'Lecturas de literatura y poesía',
      ],
      howToStart: [
        'Elige un oficio — arte visual, diseño, literatura, tango — y un barrio.',
        'Asóciate con una galería, un centro cultural o una milonga que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Legislatura y oficinas de gobierno de la ciudad',
        'Salas de reuniones de bibliotecas públicas',
        'Salas de centros comunitarios de la ciudad',
        'Oficinas de defensa de inquilinos y vivienda',
        'Espacios de civic tech en Palermo',
        'Espacios de eventos en plazas y parques',
      ],
      formats: [
        'Noches de información sobre vivienda y alquileres',
        'Talleres de derechos de inquilinos',
        'Sesiones informativas de voluntariado en transporte y movilidad',
        'Reuniones de redes de ayuda mutua y solidaridad',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — un barrio, una cuadra o una sola política.',
        'Asiste primero a tres reuniones existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Prados y senderos de los Bosques de Palermo',
        'Calles del mercado de San Telmo',
        'Cafés de Palermo con terrazas',
        'Plazas de Recoleta y paseos por el cementerio',
        'Clubes de barrio y centros comunitarios',
        'Bibliotecas públicas con salas comunitarias',
      ],
      formats: [
        'Caminatas dominicales por ferias y mercados',
        'Encuentros de ronda de mate',
        'Noches de juegos de mesa y trivia',
        'Sociales de tango y baile',
        'Intercambios de idiomas y clubes de lectura',
      ],
      howToStart: [
        'Elige un formato repetible — una caminata dominical, una ronda de mate — y un punto de encuentro fijo.',
        'Elige un lugar como los Bosques de Palermo o un café de San Telmo al que se llegue fácil en subte.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en Palermo Soho y San Telmo',
        'Espacios de feriantes en mercados y ferias',
        'Talleres del centro de pequeñas empresas de la ciudad',
        'Salas de eventos de asociaciones comerciales',
        'Cafés y parrillas locales con rincones comunitarios',
        'Espacios de food hall y cocinas de incubadoras',
      ],
      formats: [
        'Desayunos de dueños de tiendas sin agenda',
        'Mesas redondas de feriantes y vendedores de mercado',
        'Clínicas de la agencia de la ciudad sobre permisos y licencias',
        'Círculos de compra compartida de suministros',
        'Caminatas barriales por corredores de tiendas',
      ],
      howToStart: [
        'Elige un corredor y un café que ya alimente a los dueños locales; reclama una mesa fija en la esquina.',
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de alquiler, permisos y la economía.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la asociación comercial corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Buenos Aires es la más madura de América Latina, construida sobre un fondo profundo de talento en ingeniería, una tradición legendaria de resiliencia emprendedora y un mercado regional que comienza en el Río de la Plata. Palermo y Villa Crespo concentran la mayor densidad de espacios de coworking y startups respaldadas por capital de riesgo, el Microcentro ancla la capa corporativa y universidades como la UBA y Di Tella alimentan año tras año a fundadores e ingenieros. Lo que hace distintiva a la escena es su ambición regional: los fundadores argentinos construyeron empresas como MercadoLibre que sirven a todo el continente, y la ciudad sigue siendo la plataforma de lanzamiento de muchas startups regionales. Los ciclos duros de la economía han producido una cultura de ingenio creativo: los fundadores aprenden a arrancar con recursos mínimos, hacer trueque y construir en condiciones difíciles — lo que hace a la comunidad inusualmente práctica. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y paneles de la industria, muchos de ellos gratuitos y abiertos. Consejo honesto para crear un Origin de startups aquí: elige una vertical, ancla a un barrio y respeta la realidad económica: un evento semanal constante en un coworking de Palermo construirá seguidores leales.',
    creative:
      'Las comunidades creativas de Buenos Aires cargan una de las herencias culturales más ricas de América Latina: el tango, la literatura, el diseño, el cine y el teatro viven y respiran en esta ciudad. San Telmo conserva la tradición bohemia — sus mercados de antigüedades y milongas atraen tanto a locales como a visitantes — mientras que Palermo Soho es el corazón del diseño y la moda, y Caminito, en La Boca, mantiene viva la tradición artística colorida y de clase trabajadora. La ciudad es famosa por sus librerías y su cultura de café: los escritores se reúnen en los mismos cafés desde hace un siglo, y la escena literaria de la ciudad es de clase mundial. El teatro está en todas partes — la escena de teatro independiente del Microcentro es de las más intensas del mundo — y el tango, tanto tradicional como contemporáneo, es una forma de arte viva con milongas cada noche. Crear un Origin creativo en Buenos Aires significa elegir una disciplina y un barrio, y luego usar la profunda infraestructura cultural de la ciudad y su audiencia genuinamente apasionada para construir algo con alma real.',
    political:
      'Las comunidades políticas y cívicas de Buenos Aires están moldeadas por el papel de la ciudad como capital nacional y por una historia económica que ha convertido la solidaridad en una habilidad de supervivencia. La vivienda es un tema definitorio: las presiones de los alquileres y el desplazamiento organizan sindicatos de inquilinos y asambleas barriales en toda la ciudad. Los ciclos económicos más amplios han producido una rica cultura de ayuda mutua — comedores comunitarios, cooperativas de trabajadores y redes de solidaridad que intervienen cuando las instituciones fallan — y estas redes son una parte real y respetada de la vida cívica. La ciudad está dividida en comunas, lo que da a los vecinos foros locales para las decisiones sobre uso del suelo, transporte y espacio público. Las comunidades de civic tech construyen herramientas para datos abiertos y participación pública, y los grupos ambientalistas impulsan un transporte más limpio y más espacios verdes. La cultura política recompensa la persistencia, la calidez y las relaciones genuinas. Crear un Origin cívico en Buenos Aires suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con el denso paisaje existente de organizaciones.',
    meetup:
      'La cultura de encuentros de Buenos Aires se alimenta de la famosa energía social de la ciudad: los porteños trasnochan, toman mate y convierten cualquier ocasión en una reunión. Caminatas dominicales por el mercado de San Telmo, rondas de mate en los Bosques de Palermo, sociales de tango en milongas de barrio y lecturas en librerías que se derraman hacia los cafés: la ciudad funciona con estos ritmos. El subte y los colectivos hacen práctico reunirse en toda la ciudad, y la enorme cultura de café significa que siempre hay un lugar que acogerá a un grupo. Como Buenos Aires es un imán para viajeros, expatriados y trabajadores remotos, los encuentros amigables para recién llegados son comunes y muy bienvenidos. Los formatos con poder de permanencia son simples y repetibles: una caminata dominical por el mercado, una ronda de mate semanal, una noche de trivia fija. Consejo honesto para crear un encuentro aquí: elige un barrio, un lugar accesible en subte y un formato que abrace el estilo tardío, cálido y conversador de la ciudad: los porteños aparecerán por un grupo que se sienta real.',
    'small-business':
      'Las comunidades de pequeñas empresas de Buenos Aires son el corazón de las calles de la ciudad: la boutique de Palermo Soho, el anticuario de San Telmo, el artesano de La Boca, la parrilla de barrio y el feriante comparten preguntas prácticas sobre alquiler, permisos, personal y la economía impredecible. Las ferias de la ciudad son comunidades en sí mismas, con vendedores que se coordinan en torno a suministros, permisos y clientes habituales, y corredores comerciales como Palermo Soho y las calles del mercado de San Telmo concentran grupos de tiendas con un interés compartido en el tránsito peatonal. Las asociaciones comerciales y los centros de pequeñas empresas de la ciudad ofrecen talleres sobre licencias, préstamos y venta digital, y los ciclos económicos del país han producido una cultura profunda de ingenio: los dueños están acostumbrados a adaptarse rápido. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de feriantes. Crear un Origin de pequeñas empresas aquí es realista: una mesa redonda mensual en un café de barrio, con temas rotativos como alquiler, seguros y precios en tiempos difíciles, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'La cultura del café, el estilo social cálido y la rica vida cultural de Buenos Aires la convierten en un lugar maravilloso para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Buenos Aires, desde los Bosques de Palermo y el mercado de San Telmo hasta cafés de Palermo, milongas y centros culturales. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la calidez de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Palermo',
            pitch:
              'Un paseo sabatino por tres cafés de Palermo, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Palermo',
          },
          {
            title: 'AMA de fundador en un coworking de Palermo',
            pitch:
              'Un fundador comparte su historia honesta durante treinta minutos y luego responde preguntas abiertas de la sala.',
            audience: 'Fundadores en etapa temprana y emprendedores aspirantes',
            venueType: 'Coworking de Palermo',
          },
          {
            title: 'Ronda de mate para recién llegados',
            pitch:
              'Una reunión relajada en torno a la bebida nacional, donde los recién llegados conocen porteños y practican español o inglés.',
            audience: 'Recién llegados y locales que aman la conversación',
            venueType: 'Prados de los Bosques de Palermo',
          },
          {
            title: 'Círculo de historias de carrera',
            pitch:
              'Seis personas cuentan su historia de carrera en cinco minutos, seguidas de debate grupal y consignas de conexión.',
            audience: 'Buscadores de empleo, personas en cambio de carrera y mentores',
            venueType: 'Sala de reuniones de una biblioteca pública',
          },
          {
            title: 'Caminata y encuentro por el mercado de San Telmo',
            pitch:
              'Un paseo guiado por el mercado dominical con paradas para hablar con artesanos y entre ustedes.',
            audience: 'Amantes de la cultura y networkers',
            venueType: 'Calles del mercado de San Telmo',
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
            venueType: 'Café o centro comunitario en Palermo',
          },
          {
            title: 'Finanzas de pequeña empresa en español sencillo',
            pitch:
              'Una sesión práctica que cubre flujo de caja, impuestos y préstamos para dueños primerizos.',
            audience: 'Nuevos dueños de pequeñas empresas',
            venueType: 'Centro de pequeñas empresas de la ciudad',
          },
          {
            title: 'Taller de bases de tango',
            pitch:
              'Una clase amigable para principiantes que cubre los pasos básicos y el protocolo de la milonga.',
            audience: 'Principiantes curiosos por el tango',
            venueType: 'Milonga o estudio de baile',
          },
          {
            title: 'Habilidades y tradiciones del asado',
            pitch:
              'Una noche práctica para aprender el oficio del asado argentino, del fuego a la mesa.',
            audience: 'Cocineros caseros y amantes de la comida',
            venueType: 'Parrilla comunitaria o patio trasero',
          },
          {
            title: 'Taller de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre contratos, depósitos y dónde obtener ayuda legal gratuita.',
            audience: 'Inquilinos y defensores de la vivienda',
            venueType: 'Centro comunitario o biblioteca',
          },
        ],
      },
      {
        name: 'Sociales y exteriores',
        ideas: [
          {
            title: 'Picnic en los Bosques de Palermo',
            pitch:
              'Mantas, mate y una comida compartida en el gran parque de la ciudad, con un paseo por los lagos.',
            audience: 'Amigos, familias y recién llegados',
            venueType: 'Prados de los Bosques de Palermo',
          },
          {
            title: 'Paseo dominical por el mercado de San Telmo',
            pitch:
              'Una caminata lenta por el famoso mercado con paradas de comida y conversaciones con artesanos.',
            audience: 'Exploradores dominicales',
            venueType: 'Calles del mercado de San Telmo',
          },
          {
            title: 'Noche de juegos de mesa en un bar de Villa Crespo',
            pitch:
              'Una pila mensual de juegos de mesa en un bar de barrio que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Bar o café de Villa Crespo',
          },
          {
            title: 'Social de milonga para principiantes',
            pitch:
              'Un social de tango amigable donde los principiantes pueden bailar, mirar y aprender sin presión.',
            audience: 'Bailarines de todos los niveles',
            venueType: 'Milonga de barrio',
          },
          {
            title: 'Paseo en bicicleta por el río',
            pitch:
              'Un paseo relajado por los senderos costeros del Río de la Plata, con paradas en cafés.',
            audience: 'Ciclistas recreativos',
            venueType: 'Senderos de bicicleta de la Costanera',
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
            title: 'Encuentro de expansión regional',
            pitch:
              'Una noche informal donde los fundadores comparten lecciones sobre llevar productos por toda América Latina.',
            audience: 'Fundadores y operadores que se expanden regionalmente',
            venueType: 'Oficina de startup o espacio de eventos',
          },
          {
            title: 'Noche de crítica de diseño',
            pitch:
              'Diseñadores de producto y marca presentan trabajo real en proceso y reciben comentarios estructurados.',
            audience: 'Diseñadores de producto, marca y UX',
            venueType: 'Estudio de diseño en Palermo Soho',
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
            title: 'Noche de milonga de tango',
            pitch:
              'Una noche de música y baile en vivo en una milonga tradicional, acogedora para los recién llegados.',
            audience: 'Bailarines y amantes del tango',
            venueType: 'Milonga de San Telmo o el Centro',
          },
          {
            title: 'Caminata de arte por La Boca',
            pitch:
              'Un paseo guiado por Caminito y los estudios circundantes, con las historias detrás de los artistas.',
            audience: 'Amantes del arte y fotógrafos',
            venueType: 'Calles y estudios de La Boca',
          },
          {
            title: 'Micrófono abierto para poetas y músicos',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Poetas, músicos y principiantes',
            venueType: 'Café-librería de Palermo o centro cultural',
          },
          {
            title: 'Día de estudio abierto en Palermo Soho',
            pitch:
              'Diseñadores y artistas abren sus estudios durante una tarde de visitas, demos y obras a la venta.',
            audience: 'Amantes del diseño y visitantes curiosos',
            venueType: 'Estudios de Palermo Soho',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en San Telmo',
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
            title: 'Sesión informativa de voluntariado en ayuda mutua',
            pitch:
              'Una orientación corta más un primer turno para voluntarios que apoyan programas locales de ayuda mutua y alimentación.',
            audience: 'Voluntarios primerizos',
            venueType: 'Un centro local de ayuda mutua o comedor',
          },
          {
            title: 'Noche de historias de negocios locales',
            pitch:
              'Dueños de tiendas y ferias comparten las historias detrás de sus negocios en charlas de cinco minutos.',
            audience: 'Vecinos y dueños de pequeñas empresas',
            venueType: 'Una tienda, café o sala comercial local',
          },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo elijo una de estas ideas?',
        answer:
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Buenos Aires, los formatos que abrazan el estilo tardío y conversador de la ciudad — rondas de mate, caminatas por ferias, sociales de milonga — tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de Buenos Aires se hacen en inglés o bilingües, especialmente en Palermo. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Buenos Aires. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro un Origin en Buenos Aires?',
      answer:
        'Empieza por las páginas de tipos de grupo: Origins de startups, creativos, políticos, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los porteños. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu Origin hoy mismo.',
    },
    {
      question: '¿Es realista crear un Origin en Buenos Aires?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, una cultura social cálida y una rica vida de cafés y cultura. Las guías cubren cómo crear un Origin, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — los Bosques de Palermo, el mercado de San Telmo, los cafés de Palermo, las milongas, los centros culturales — existe en Buenos Aires. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Buenos Aires?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los porteños a encontrar o crear Origins.',
    },
  ],
};

export default content;
