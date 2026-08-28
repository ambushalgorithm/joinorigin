import type { CityContent } from '../../types';

/**
 * Contenido de Barranquilla — traducción al español (archivo de contenido
 * por idioma).
 *
 * Texto para las 7 páginas `es` de Barranquilla en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'barranquilla',
  title: 'Origins en Barranquilla | JoinOrigin',
  description:
    'Encuentra o crea Origins en Barranquilla — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Origins en Barranquilla | JoinOrigin',
    cityDescription:
      'Encuentra o crea Origins en Barranquilla — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Origins de startups en Barranquilla | JoinOrigin',
      creative: 'Origins creativos y de diseño en Barranquilla | JoinOrigin',
      political: 'Origins políticos y cívicos en Barranquilla | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Barranquilla | JoinOrigin',
      'small-business': 'Origins de pequeñas empresas en Barranquilla | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea Origins de startups en Barranquilla — fundadores, constructores y equipos tempranos en Riomar y El Prado. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea Origins creativos y de diseño en Barranquilla — artes del carnaval, música y estudios en Barrio Abajo y el Centro Histórico. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea Origins políticos y cívicos en Barranquilla — río, manglares, vivienda y participación. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Barranquilla — paseos por el Gran Malecón, rutas de arepas y sociales de carnaval. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea Origins de pequeñas empresas en Barranquilla — areperías, boutiques de Riomar y cafés de El Prado. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos de Origins en Barranquilla | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Barranquilla — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'Barranquilla es la capital del Atlántico y una ciudad de unos 1,2 millones de habitantes — con alrededor de dos millones en su área metropolitana — situada en la orilla occidental del delta del río Magdalena, donde Colombia se encuentra con el mar Caribe. Es la gran ciudad portuaria e industrial del país, y también la capital del carnaval de Colombia: el Carnaval de Barranquilla, Patrimonio Cultural Inmaterial de la UNESCO, es el segundo carnaval más grande del mundo, y su música, sus disfraces y sus fiestas callejeras definen la identidad de la ciudad.',
    'La ciudad es conocida por su apodo, La Arenosa, y por la calidez de su cultura costeña: el ritmo caribeño de la cumbia, el vallenato y el porro; el olor de las arepas de huevo y el bollo de los vendedores callejeros; y una hospitalidad que hace sentir bienvenidos a los recién llegados muy rápido. El puerto y el río son la columna vertebral económica — la logística, la manufactura y el comercio anclan la economía local — mientras que Uninorte, la Universidad del Atlántico y otras universidades alimentan una capa creciente de profesionales, ingenieros y emprendedores. El Gran Malecón, el paseo junto al río, se ha convertido en la gran sala de estar pública de la ciudad, llena de familias, corredores y ciclistas por las noches.',
    'El calor tropical moldea la vida diaria: la ciudad se despierta temprano en la mañana y después del atardecer, y los lugares con aire acondicionado importan por la tarde. Para encontrar o crear un Origin, Barranquilla recompensa un enfoque cálido y festivo: un grupo que mezcle música, comida y conversación genuina encajará perfectamente con el espíritu carnavalero de la ciudad.',
  ],
  dataPoints: [
    'Unos 1,2 millones de habitantes; alrededor de 2 millones en el área metropolitana.',
    'Capital del Atlántico; gran ciudad portuaria de Colombia.',
    'Hogar del Carnaval de Barranquilla (patrimonio UNESCO).',
    'Clústeres de logística, manufactura y comercio.',
    'Anclajes: Uninorte, Universidad del Atlántico.',
    'Anclajes públicos: Gran Malecón, Plaza de la Paz, Paseo Bolívar.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en Riomar y El Prado',
        'Oficinas de logística y cercanas al puerto',
        'Incubadoras universitarias cerca de Uninorte y Atlántico',
        'Salas del centro de eventos Puerta de Oro',
        'Salas de eventos de aceleradoras en Riomar',
        'Cafés con mesas de fundadores en Altos del Prado',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de logística y port-tech',
        'Encuentros creativos y de media-tech',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — logística tech, tecnología creativa o turismo tech — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de Riomar o El Prado.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Talleres de disfraces de carnaval',
        'Espacios culturales de Barrio Abajo',
        'Galerías y patios del Centro Histórico',
        'Estudios de diseño en El Prado',
        'Salas de música y clubes de salsa',
        'Escenarios de eventos del Gran Malecón',
      ],
      formats: [
        'Sesiones de disfraces y artesanías de carnaval',
        'Sociales de música de cumbia y vallenato',
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
      ],
      howToStart: [
        'Elige un oficio — artes del carnaval, música, arte visual, diseño — y un barrio.',
        'Asóciate con un centro cultural, un taller de disfraces o un lugar que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Alcaldía y oficinas municipales',
        'Salas de reuniones de bibliotecas públicas',
        'Salas de centros comunitarios de la ciudad',
        'Salas de juntas de acción comunal',
        'Espacios de civic tech en Riomar',
        'Espacios de eventos en parques y el Malecón',
      ],
      formats: [
        'Reuniones de asamblea de barrio',
        'Noches de información sobre vivienda y espacio público',
        'Sesiones informativas de limpieza del río y manglares',
        'Sesiones de programas juveniles y culturales',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — un barrio, un corredor o un solo proyecto.',
        'Asiste primero a tres reuniones comunitarias existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Paseo y escenarios del Gran Malecón',
        'Paseo Bolívar y Plaza de la Paz',
        'Calles culturales de Barrio Abajo',
        'Senderos del Jardín Botánico',
        'Cafés y restaurantes de Riomar',
        'Bibliotecas públicas con salas comunitarias',
      ],
      formats: [
        'Caminatas y carreras al atardecer por el Malecón',
        'Sociales de música y baile de carnaval',
        'Sociales de café e intercambios de idiomas',
        'Rutas de arepas y comida callejera',
        'Noches de juegos de mesa y trivia',
      ],
      howToStart: [
        'Elige un formato repetible — una caminata al atardecer, una ruta de comida callejera — y un punto de encuentro fijo.',
        'Elige un lugar como el Gran Malecón o un rincón cultural de Barrio Abajo que sea fácil de encontrar.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en Riomar y El Prado',
        'Espacios de vendedores en mercados y ferias',
        'Talleres del centro de pequeñas empresas de la ciudad',
        'Salas de eventos de asociaciones comerciales',
        'Cafés y areperías locales con rincones comunitarios',
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
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de alquiler, permisos y temporada de carnaval.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la asociación comercial corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Barranquilla es más pequeña que la de Bogotá o Medellín, pero distintiva, construida sobre las fortalezas de la ciudad en logística, operaciones portuarias y la economía creativa de la costa caribeña. Riomar y El Prado concentran espacios de coworking y una capa creciente de equipos respaldados por capital de riesgo, mientras que el puerto y el río Magdalena anclan un clúster natural de logística tech: las startups de transporte marítimo, comercio y cadena de suministro encuentran aquí terreno fértil. Universidades como Uninorte y la Universidad del Atlántico alimentan el ecosistema con ingenieros, graduados de negocios y diseñadores, y la posición de la ciudad como puerta de entrada al Caribe le da una perspectiva internacional. Lo que hace distintiva a la escena es la cultura costeña: cálida, social y orientada a las relaciones, lo que hace que construir comunidad se sienta natural. La ciudad también está invirtiendo en su infraestructura de innovación, con centros de eventos y espacios de coworking que atraen trabajadores remotos y visitantes internacionales. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y paneles de la industria, muchos de ellos gratuitos y abiertos. Consejo honesto para crear un Origin de startups en Barranquilla: elige una vertical, ancla en Riomar o El Prado y trae la energía del carnaval: un evento semanal constante con música y calidez construirá seguidores leales.',
    creative:
      'Las comunidades creativas de Barranquilla son inseparables del carnaval: durante meses cada año, los creadores de disfraces, músicos, bailarines y artistas callejeros de la ciudad preparan el Carnaval de Barranquilla, y ese motor creativo funciona todo el año en talleres, centros culturales y los barrios de Barrio Abajo y el Centro Histórico. La cultura musical de la ciudad — cumbia, vallenato, porro y los sonidos caribeños modernos que crecieron de ellos — da a los creativos una banda sonora constante y un ritmo social natural. El Gran Malecón se ha convertido en un escenario para conciertos y eventos culturales, y los museos y galerías de la ciudad mantienen vivas las artes visuales. Uninorte y las instituciones artísticas de la región aportan nuevo talento cada año. Como la cultura del carnaval se construye sobre la creatividad colectiva — la comparsa de disfraces de un barrio, el grupo de baile de una familia — la pertenencia comunitaria está tejida en el propio proceso artístico. Crear un Origin creativo en Barranquilla significa elegir una disciplina y un barrio, y luego usar la extraordinaria energía festiva de la ciudad para construir algo con alma real.',
    political:
      'Las comunidades políticas y cívicas de Barranquilla están moldeadas por el rápido crecimiento de la ciudad, su geografía fluvial y costera y una fuerte tradición de organización de barrio. La ciudad ha invertido mucho en espacio público — el Gran Malecón y la ribera revitalizada son resultados de una política pública deliberada — y los residentes están orgullosos de esa transformación. La vivienda, los servicios públicos y la resiliencia climática son temas definitorios: la ciudad está en el delta, y las inundaciones, la subida del nivel del mar y la gestión del agua son preocupaciones reales que organizan tanto a funcionarios como a comunidades. La salud del río Magdalena — su contaminación, sus manglares, su papel en la identidad de la ciudad — impulsa la defensa ambiental y las limpiezas voluntarias. Las asociaciones de vecinos siguen siendo poderosas, y el gobierno municipal mantiene canales abiertos de participación ciudadana. La cultura política recompensa la calidez, la persistencia y los lazos comunitarios genuinos. Crear un Origin cívico en Barranquilla suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con la fuerte red existente de organizaciones de barrio.',
    meetup:
      'La cultura de encuentros de Barranquilla está definida por el calor y el carnaval: la ciudad se despierta temprano en la mañana y después del atardecer, y el Gran Malecón — el paseo junto al río — es la gran sala de estar pública donde familias, corredores, ciclistas y músicos se reúnen por las noches. Las rutas de comida callejera por las areperías y los puestos de bollo de los barrios, los sociales de salsa y cumbia y las reuniones de café en Riomar y El Prado anclan la vida social de la ciudad. La hospitalidad costeña hace que los recién llegados se sientan bienvenidos de inmediato, y la temporada de carnaval añade un ritmo de desfiles, música y fiestas de disfraces que convierte a toda la ciudad en una celebración. El clima tropical significa que los formatos al aire libre funcionan mejor en las horas más frescas, y los lugares con aire acondicionado son el refugio de la tarde. Los formatos con poder de permanencia son simples y repetibles: una caminata al atardecer por el Malecón, una ruta mensual de comida callejera, una noche de música fija. Consejo honesto para crear un encuentro en Barranquilla: elige un formato de horas frescas, anclalo al Malecón o a un rincón cultural de barrio y deja que la calidez de la ciudad haga el trabajo de crecimiento.',
    'small-business':
      'Las comunidades de pequeñas empresas de Barranquilla se construyen sobre el comercio y la cultura alimentaria de la ciudad: la arepería, el vendedor de bollo, la boutique de Riomar, el café de El Prado y el puesto de mercado comparten preguntas prácticas sobre alquiler, permisos, personal y el ritmo de la ciudad portuaria. Los mercados y ferias de la ciudad dan a los vendedores comunidades naturales, y los corredores comerciales de Riomar, El Prado y el Centro concentran grupos de tiendas con un interés compartido en el tránsito peatonal. El puerto y el río anclan una cultura empresarial práctica y orientada al comercio, y el carnaval crea una economía estacional de disfraces, comida y eventos en torno a la cual planifican las pequeñas empresas. Las asociaciones comerciales y los centros de pequeñas empresas de la ciudad ofrecen talleres sobre licencias, préstamos y venta digital. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de feriantes. Crear un Origin de pequeñas empresas aquí es realista: una mesa redonda mensual en un café de barrio, con temas rotativos como alquiler, seguros y planificación de la temporada de carnaval, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'El espíritu carnavalero de Barranquilla, la calidez caribeña y su cultura junto al río la convierten en un lugar maravilloso para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Barranquilla, desde el Gran Malecón y la Plaza de la Paz hasta cafés de Riomar, espacios culturales de Barrio Abajo y mercados de barrio. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la calidez de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Riomar',
            pitch:
              'Un paseo sabatino por tres cafés del moderno distrito, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Riomar',
          },
          {
            title: 'AMA de fundador en un coworking',
            pitch:
              'Un fundador comparte su historia honesta durante treinta minutos y luego responde preguntas abiertas de la sala.',
            audience: 'Fundadores en etapa temprana y emprendedores aspirantes',
            venueType: 'Coworking de Riomar o El Prado',
          },
          {
            title: 'Social de bienvenida para recién llegados',
            pitch:
              'Una noche de baja presión donde los recién llegados conocen a residentes de larga data con música y consignas de conversación.',
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
            title: 'Mezclador al atardecer en el Malecón',
            pitch:
              'Una caminata casual por el paseo fluvial al atardecer con consignas rompehielos y la regla de conocer a tres personas nuevas.',
            audience: 'Cualquiera que amplíe su red local',
            venueType: 'Paseo del Gran Malecón',
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
            venueType: 'Café o centro comunitario en Riomar',
          },
          {
            title: 'Taller de artesanía de disfraces de carnaval',
            pitch:
              'Una sesión práctica para aprender técnicas de máscaras y disfraces de un artista del carnaval.',
            audience: 'Amantes del carnaval y makers',
            venueType: 'Taller de disfraces o centro cultural',
          },
          {
            title: 'Charla de historia de la cumbia y el vallenato',
            pitch:
              'Una noche que recorre las raíces de la música de la región, con grabaciones y demostración en vivo.',
            audience: 'Amantes de la música y exploradores culturales',
            venueType: 'Centro cultural o sala de música',
          },
          {
            title: 'Finanzas de pequeña empresa en español sencillo',
            pitch:
              'Una sesión práctica que cubre flujo de caja, impuestos y préstamos para dueños primerizos.',
            audience: 'Nuevos dueños de pequeñas empresas',
            venueType: 'Centro de pequeñas empresas de la ciudad',
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
            title: 'Club de caminata al atardecer por el Malecón',
            pitch:
              'Una caminata semanal por el paseo fluvial cuando baja el calor, con un tema de conversación rotativo.',
            audience: 'Caminantes y amantes del atardecer',
            venueType: 'Paseo del Gran Malecón',
          },
          {
            title: 'Ruta de arepas y comida callejera',
            pitch:
              'Una caminata de degustación guiada por los puestos del barrio, probando arepas de huevo, bollos y más.',
            audience: 'Amantes de la comida y exploradores',
            venueType: 'Puestos de comida callejera del barrio',
          },
          {
            title: 'Paseo matutino por el Jardín Botánico',
            pitch:
              'Una caminata guiada por el jardín en las horas frescas de la mañana, aprendiendo sobre la flora caribeña.',
            audience: 'Amantes de la naturaleza y familias',
            venueType: 'Senderos del Jardín Botánico',
          },
          {
            title: 'Social de música y baile de carnaval',
            pitch:
              'Una noche acogedora de música de cumbia y vallenato donde los principiantes aprenden pasos básicos.',
            audience: 'Bailarines de todos los niveles',
            venueType: 'Espacio cultural o club de Barrio Abajo',
          },
          {
            title: 'Noche de juegos de mesa en un café de El Prado',
            pitch:
              'Una pila mensual de juegos de mesa en un café de barrio que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Café de El Prado',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Mesa redonda de logística y port-tech',
            pitch:
              'Un debate mensual para operadores que trabajan en transporte marítimo, comercio y tecnología cercana al puerto.',
            audience: 'Profesionales de logística y comercio',
            venueType: 'Oficina cercana al puerto o espacio de eventos',
          },
          {
            title: 'Mezclador de industrias creativas',
            pitch:
              'Una noche informal donde diseñadores, cineastas y profesionales de medios intercambian notas y contactos.',
            audience: 'Profesionales de industrias creativas',
            venueType: 'Centro cultural o estudio de diseño',
          },
          {
            title: 'Noche de crítica de diseño',
            pitch:
              'Diseñadores de producto y marca presentan trabajo real en proceso y reciben comentarios estructurados.',
            audience: 'Diseñadores de producto, marca y UX',
            venueType: 'Estudio de diseño en El Prado',
          },
          {
            title: 'Encuentro de la industria del turismo y los eventos',
            pitch:
              'Una noche informal para operadores de la economía del carnaval, el turismo y los eventos de la ciudad.',
            audience: 'Profesionales del turismo y los eventos',
            venueType: 'Puerta de Oro o lugar de eventos',
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
            title: 'Estudio abierto de disfraces de carnaval',
            pitch:
              'Un taller de disfraces abre sus puertas para que los visitantes vean el oficio detrás del desfile.',
            audience: 'Amantes del carnaval y visitantes curiosos',
            venueType: 'Taller de disfraces en Barrio Abajo',
          },
          {
            title: 'Caminata cultural por Barrio Abajo',
            pitch:
              'Una caminata guiada por los espacios culturales, murales y salas de música del barrio.',
            audience: 'Amantes de la cultura y visitantes primerizos',
            venueType: 'Calles y espacios culturales de Barrio Abajo',
          },
          {
            title: 'Micrófono abierto para músicos y poetas',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Músicos, poetas y principiantes',
            venueType: 'Lugar en El Prado o el Centro',
          },
          {
            title: 'Círculo de percusión de cumbia',
            pitch:
              'Una noche amigable de ritmo donde los principiantes aprenden percusión básica de cumbia junto a músicos experimentados.',
            audience: 'Músicos y principiantes curiosos por el ritmo',
            venueType: 'Centro comunitario o estudio de música',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en el Centro',
          },
        ],
      },
      {
        name: 'Impacto y local',
        ideas: [
          {
            title: 'Limpieza del río y los manglares',
            pitch:
              'Una limpieza sabatina de un tramo de ribera o manglar, con guantes y café incluidos.',
            audience: 'Voluntarios y amantes del río',
            venueType: 'Una ribera o zona de manglar elegida',
          },
          {
            title: 'Limpieza de parque de barrio',
            pitch: 'Una limpieza sabatina de un parque de barrio, con guantes y café incluidos.',
            audience: 'Voluntarios y vecinos',
            venueType: 'Un parque de barrio elegido',
          },
          {
            title: 'Círculo de herencia del carnaval',
            pitch:
              'Una reunión respetuosa donde figuras mayores del carnaval comparten historias con las generaciones más jóvenes.',
            audience: 'Residentes interesados en la herencia local',
            venueType: 'Centro cultural o museo',
          },
          {
            title: 'Noche de mentoría juvenil',
            pitch:
              'Profesionales comparten sus trayectorias de carrera con estudiantes locales en un ambiente amigable e informal.',
            audience: 'Profesionales y estudiantes',
            venueType: 'Centro comunitario o biblioteca',
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
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Barranquilla, los formatos de horas frescas y centrados en la música — caminatas al atardecer por el Malecón, rutas de comida callejera, sociales de carnaval — tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de Barranquilla se hacen en inglés o bilingües, especialmente entre los profesionales y estudiantes de la ciudad. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Barranquilla. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro un Origin en Barranquilla?',
      answer:
        'Empieza por las páginas de tipos de grupo: Origins de startups, creativos, políticos, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los residentes. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu Origin hoy mismo.',
    },
    {
      question: '¿Es realista crear un Origin en Barranquilla?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, una cultura costeña cálida y una vida social festiva. Las guías cubren cómo crear un Origin, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — el Gran Malecón, la Plaza de la Paz, los cafés de Riomar, los espacios culturales de Barrio Abajo, los mercados de barrio — existe en Barranquilla. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Barranquilla?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los residentes a encontrar o crear Origins.',
    },
  ],
};

export default content;
