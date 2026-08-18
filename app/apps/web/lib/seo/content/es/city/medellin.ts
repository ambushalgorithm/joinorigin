import type { CityContent } from '../../types';

/**
 * Contenido de Medellín — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para las 7 páginas `es` de Medellín en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'medellin',
  title: 'Comunidades en Medellín | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Medellín — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Comunidades en Medellín | JoinOrigin',
    cityDescription:
      'Encuentra o crea comunidades en Medellín — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups en Medellín | JoinOrigin',
      creative: 'Comunidades creativas y de diseño en Medellín | JoinOrigin',
      political: 'Comunidades políticas y cívicas en Medellín | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Medellín | JoinOrigin',
      'small-business': 'Comunidades de pequeñas empresas en Medellín | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea comunidades de startups en Medellín — fundadores, constructores y equipos tempranos en El Poblado y Ciudad del Río. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea comunidades creativas y de diseño en Medellín — arte callejero, estudios y galerías en Ciudad del Río y Comuna 13. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea comunidades políticas y cívicas en Medellín — asambleas de barrio, vivienda y participación en las comunas. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Medellín — picnics en el Jardín Botánico, aventuras en Metrocable y noches de salsa. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea comunidades de pequeñas empresas en Medellín — cafés, areperías y boutiques de El Poblado y Laureles. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos comunitarios en Medellín | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Medellín — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'Medellín es la capital de Antioquia y una ciudad de unos 2 millones de habitantes — con casi cuatro millones en el Valle de Aburrá — situada en un estrecho valle andino que le da el clima templado y florido que le valió el sobrenombre de Ciudad de la Eterna Primavera. La transformación de la ciudad desde la violencia de los años 80 y 90 hasta convertirse en un modelo global de innovación urbana es una de las historias urbanas más famosas de nuestro tiempo, y da forma a cómo la ciudad se ve a sí misma y a cómo se organizan sus comunidades.',
    'Esa transformación se construyó sobre infraestructura real: el Metro y los cables del Metrocable que conectan las comunas de las laderas con el fondo del valle, las escaleras eléctricas al aire libre de la Comuna 13, los parques biblioteca y la red de bicicletas. El Poblado y Laureles concentran los cafés, los espacios de coworking y las startups; Ciudad del Río ancla el distrito creativo y de innovación; y las comunas albergan una poderosa cultura de organización comunitaria, arte callejero y hip-hop. La Universidad de Antioquia, la EAFIT y otras universidades alimentan un flujo constante de estudiantes e investigadores hacia la escena.',
    'Medellín está orgullosa de su identidad paisa — la cultura amable, trabajadora y emprendedora de la región — y de sus flores: la Feria de las Flores es la celebración más grande de la ciudad. Para encontrar o crear una comunidad, Medellín recompensa presentarse con compromiso genuino, construir confianza con las organizaciones existentes y elegir un barrio: las comunidades de la ciudad son fuertes y acogen a las personas que respetan esa fortaleza.',
  ],
  dataPoints: [
    'Unos 2 millones de habitantes; casi 4 millones en el Valle de Aburrá.',
    'Capital de Antioquia; la Ciudad de la Eterna Primavera.',
    'El Metro, el Metrocable y las escaleras eléctricas al aire libre conectan las comunas.',
    'Anclajes: Universidad de Antioquia, EAFIT, UPB.',
    'Anclajes públicos: Jardín Botánico, Parque Arví, Plaza Botero, Comuna 13.',
    'Escenas de barrio: El Poblado, Laureles, Comuna 13, Ciudad del Río, Envigado.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en El Poblado y Ciudad del Río',
        'Oficinas del distrito de innovación en Ciudad del Río',
        'Incubadoras universitarias cerca de la EAFIT y Antioquia',
        'Salas de eventos de aceleradoras en El Poblado',
        'Salas de eventos del centro de innovación Ruta N',
        'Cafés con mesas de fundadores en Laureles',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de fintech y logística',
        'Muestras del ecosistema de innovación',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — fintech, tecnología creativa o impacto social — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de El Poblado o Ciudad del Río.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Estudios del distrito creativo de Ciudad del Río',
        'Rutas de arte callejero en la Comuna 13',
        'Espacios del Museo de Antioquia y la Plaza Botero',
        'Galerías de El Poblado',
        'Espacios de eventos del Jardín Botánico',
        'Salas de música y clubes de salsa',
      ],
      formats: [
        'Caminatas de arte callejero por la Comuna 13',
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
        'Sociales de salsa y música',
      ],
      howToStart: [
        'Elige un oficio — arte callejero, diseño, música, arte visual — y un barrio.',
        'Asóciate con una galería, un centro cultural o un grupo comunitario que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Alcaldía y oficinas municipales',
        'Salas de reuniones de los parques biblioteca',
        'Salas de centros comunitarios en las comunas',
        'Salas de juntas de acción comunal',
        'Espacios de civic tech en Ciudad del Río',
        'Espacios de eventos en parques y plazas',
      ],
      formats: [
        'Reuniones de asamblea de barrio',
        'Noches de información sobre vivienda y espacio público',
        'Sesiones informativas de programas juveniles y comunitarios',
        'Círculos de paz y reconciliación',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — una comuna, un barrio o un solo proyecto.',
        'Asiste primero a tres reuniones comunitarias existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Prados del Jardín Botánico',
        'Senderos del Parque Arví (en Metrocable)',
        'Cafés de El Poblado y Laureles',
        'Plaza Botero y plazas del centro',
        'Miradores y rutas de arte de la Comuna 13',
        'Parques biblioteca con salas comunitarias',
      ],
      formats: [
        'Picnics y caminatas dominicales en el parque',
        'Encuentros de aventura en Metrocable',
        'Sociales de café e intercambios de idiomas',
        'Noches de juegos de mesa y trivia',
        'Sociales de salsa y baile',
      ],
      howToStart: [
        'Elige un formato repetible — una caminata dominical, un picnic mensual en el parque — y un punto de encuentro fijo.',
        'Elige un lugar como el Jardín Botánico o un café de Laureles al que se llegue fácil en Metro.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en El Poblado y Laureles',
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
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de alquiler, permisos y turismo.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la asociación comercial corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Medellín es una de las más inspiradoras de América Latina, construida sobre una inversión pública deliberada en innovación: Ruta N, el centro de innovación de la ciudad, ha convertido el emprendimiento en una prioridad cívica, y la ciudad es ahora un hub genuino para startups de fintech, tecnología creativa e impacto social. El Poblado concentra espacios de coworking y equipos respaldados por capital de riesgo, Ciudad del Río ancla el distrito de innovación y universidades como la EAFIT y la Universidad de Antioquia alimentan año tras año a fundadores e ingenieros. Lo que hace distintiva a la escena es su historia de origen: una ciudad que se transformó mediante la colaboración público-privada ahora exporta ese modelo, y sus startups suelen llevar una misión social. El clima templado y los costos más bajos hacen de Medellín un imán para fundadores internacionales y trabajadores remotos, lo que añade una capa creciente de hablantes de inglés a la comunidad. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y muestras de innovación en Ruta N, muchos de ellos gratuitos y abiertos. Consejo honesto para crear una comunidad de startups en Medellín: elige una vertical, ancla en El Poblado o Ciudad del Río y abraza el espíritu colaborativo de la ciudad: un evento semanal constante construirá seguidores leales.',
    creative:
      'Las comunidades creativas de Medellín son inseparables de la transformación de la ciudad: el arte callejero de la Comuna 13 cuenta la historia de una comunidad que convirtió sus paredes en lienzos y su historia en arte, y los recorridos de grafiti del barrio son ahora mundialmente famosos. Ciudad del Río ancla el distrito creativo contemporáneo, con estudios de diseño, galerías y espacios de innovación en edificios industriales reconvertidos, mientras que el Museo de Antioquia y la Plaza Botero llevan arte de clase mundial al centro de la ciudad. El Jardín Botánico acoge conciertos y eventos, y las escenas de salsa y música de la ciudad dan a los creativos un ritmo social natural: cada barrio tiene su propia escuela de baile y cada fin de semana hay música en vivo en algún lugar del valle. La Feria de las Flores anual celebra la cultura floral de la región con desfiles, exposiciones y muestras de silleteros que son una industria creativa en sí misma. Crear una comunidad creativa en Medellín significa elegir una disciplina y un barrio, y luego usar la poderosa historia de transformación de la ciudad y su cultura orgullosa y expresiva para construir algo con significado real.',
    political:
      'Las comunidades políticas y cívicas de Medellín están moldeadas por la extraordinaria transformación de la ciudad y por la fortaleza de sus organizaciones de barrio, especialmente en las comunas. Las famosas innovaciones urbanas de la ciudad — el Metrocable, las escaleras eléctricas al aire libre, los parques biblioteca — fueron en sí mismas el resultado de la organización comunitaria y la participación pública, y ese legado vive en activas asambleas de barrio y asociaciones comunitarias. La vivienda, el espacio público y los programas juveniles son temas definitorios, y la historia de construcción de paz de la ciudad hace que la reconciliación y la memoria sean partes respetadas de la vida cívica. El gobierno municipal mantiene canales abiertos de participación ciudadana, y las comunidades de civic tech construyen herramientas para la transparencia y el compromiso. La cultura política recompensa la confianza, la constancia y el compromiso genuino: los organizadores que acuden a las reuniones de barrio durante años son quienes mueven las cosas. Crear una comunidad cívica en Medellín suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con la fuerte red existente de organizaciones comunitarias.',
    meetup:
      'La cultura de encuentros de Medellín se impulsa con el clima de eterna primavera y el querido Metro de la ciudad: el Jardín Botánico acoge picnics y caminatas, el Parque Arví ofrece senderos de bosque a los que se llega en Metrocable, y los cafés de El Poblado y Laureles anclan la vida social de la ciudad. La historia de transformación de la ciudad la ha convertido en un imán para visitantes, trabajadores remotos y estudiantes internacionales, por lo que los encuentros amigables para recién llegados son comunes y muy bienvenidos. Los miradores y las rutas de arte de la Comuna 13 atraen tanto a locales como a visitantes, y los clubes de salsa de la ciudad mantienen viva la escena del baile. Como el Metro hace fácil cruzar el valle, un grupo puede anclarse en un barrio y aun así atraer miembros de toda la ciudad. Los formatos con poder de permanencia son simples y repetibles: un picnic dominical en el parque, una aventura mensual en Metrocable, una noche de trivia fija. Consejo honesto para crear un encuentro en Medellín: elige un barrio, un lugar accesible en Metro y un formato que celebre la calidez de la ciudad: los paisas aparecerán por un grupo que se sienta real.',
    'small-business':
      'Las comunidades de pequeñas empresas de Medellín se construyen sobre la cultura emprendedora paisa de la ciudad — el apodo de la región para su gente trabajadora y emprendedora — y sobre las calles de El Poblado, Laureles y el centro: el café, la arepería, la boutique, la florería y el vendedor de mercado comparten preguntas prácticas sobre alquiler, permisos, personal y el flujo de clientes. Los mercados y ferias de la ciudad dan a los vendedores comunidades naturales, y los corredores comerciales concentran grupos de tiendas con un interés compartido en el tránsito peatonal. Los auges del turismo y la innovación han traído nuevos clientes y nueva competencia, y los centros de pequeñas empresas de la ciudad más las asociaciones comerciales ofrecen talleres sobre licencias, préstamos y venta digital. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de feriantes. Crear una comunidad de pequeñas empresas aquí es realista: una mesa redonda mensual en un café de barrio, con temas rotativos como alquiler, seguros y atención a clientes internacionales, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'El clima de eterna primavera de Medellín, su querido Metro y su orgullosa historia de transformación la convierten en un lugar maravilloso para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Medellín, desde el Jardín Botánico y el Parque Arví hasta cafés de El Poblado, miradores de la Comuna 13 y parques biblioteca. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la calidez de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Laureles',
            pitch:
              'Un paseo sabatino por tres cafés del frondoso distrito, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Laureles',
          },
          {
            title: 'AMA de fundador en un coworking de El Poblado',
            pitch:
              'Un fundador comparte su historia honesta durante treinta minutos y luego responde preguntas abiertas de la sala.',
            audience: 'Fundadores en etapa temprana y emprendedores aspirantes',
            venueType: 'Coworking de El Poblado',
          },
          {
            title: 'Social de bienvenida para recién llegados',
            pitch:
              'Una noche de baja presión donde los recién llegados conocen a residentes de larga data con café y consignas de conversación.',
            audience: 'Recién llegados, trabajadores remotos y estudiantes',
            venueType: 'Centro comunitario o sala de eventos de un café',
          },
          {
            title: 'Círculo de historias de carrera',
            pitch:
              'Seis personas cuentan su historia de carrera en cinco minutos, seguidas de debate grupal y consignas de conexión.',
            audience: 'Buscadores de empleo, personas en cambio de carrera y mentores',
            venueType: 'Sala de reuniones de un parque biblioteca',
          },
          {
            title: 'Mezclador de aventura en Metro',
            pitch:
              'Un paseo grupal en Metrocable hasta un mirador, con consignas de conversación por el camino.',
            audience: 'Recién llegados y cualquiera que amplíe su red',
            venueType: 'Estaciones de Metro y Metrocable',
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
            venueType: 'Café o centro comunitario en El Poblado',
          },
          {
            title: 'Taller de cata de la región cafetera',
            pitch:
              'Una sesión práctica para aprender sobre el café colombiano de la región de Antioquia, con una cata al final.',
            audience: 'Amantes del café y preparadores caseros',
            venueType: 'Espacio de taller de un café o tostaduría',
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
            title: 'Picnic en el Jardín Botánico',
            pitch:
              'Mantas, música y una comida compartida en el corazón verde de la ciudad, con un paseo por el mariposario.',
            audience: 'Amigos, familias y recién llegados',
            venueType: 'Prados del Jardín Botánico',
          },
          {
            title: 'Día de senderos en el Parque Arví',
            pitch:
              'Un paseo en Metrocable hasta el parque de bosque para una caminata guiada y un picnic entre los árboles.',
            audience: 'Caminantes y amantes de la naturaleza',
            venueType: 'Senderos del Parque Arví',
          },
          {
            title: 'Caminata de arte callejero por la Comuna 13',
            pitch:
              'Una caminata guiada por las famosas escaleras y murales, con guías locales que cuentan la historia.',
            audience: 'Amantes de la cultura y visitantes primerizos',
            venueType: 'Calles y escaleras de la Comuna 13',
          },
          {
            title: 'Noche de juegos de mesa en un bar de El Poblado',
            pitch:
              'Una pila mensual de juegos de mesa en un bar de barrio que recibe noches tranquilas.',
            audience: 'Jugadores casuales y vecinos',
            venueType: 'Bar o café de El Poblado',
          },
          {
            title: 'Noche de salsa para principiantes',
            pitch:
              'Una noche divertida donde los principiantes aprenden pasos básicos de salsa junto a bailarines experimentados.',
            audience: 'Bailarines de todos los niveles',
            venueType: 'Club de salsa o estudio de baile',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Muestra del ecosistema de innovación',
            pitch:
              'Una noche mensual donde startups, universidades y programas de la ciudad presentan lo que están construyendo.',
            audience: 'Fundadores, inversionistas y constructores de ecosistema',
            venueType: 'Centro de innovación Ruta N',
          },
          {
            title: 'Mesa redonda de fintech y pagos',
            pitch:
              'Un debate mensual para fundadores y operadores que trabajan en pagos, crédito e inclusión financiera.',
            audience: 'Fundadores y profesionales de fintech',
            venueType: 'Coworking o sala de eventos de oficina',
          },
          {
            title: 'Noche de crítica de diseño',
            pitch:
              'Diseñadores de producto y marca presentan trabajo real en proceso y reciben comentarios estructurados.',
            audience: 'Diseñadores de producto, marca y UX',
            venueType: 'Estudio de diseño en Ciudad del Río',
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
            title: 'Caminata por las galerías de Ciudad del Río',
            pitch:
              'Una caminata nocturna guiada por las galerías y estudios del distrito creativo.',
            audience: 'Amantes del arte y visitantes curiosos',
            venueType: 'Estudios y galerías de Ciudad del Río',
          },
          {
            title: 'Taller de arreglos florales',
            pitch:
              'Una sesión práctica para aprender el oficio floral por el que la ciudad es famosa, con materiales incluidos.',
            audience: 'Amantes de las flores y makers',
            venueType: 'Mercado de flores o espacio de taller',
          },
          {
            title: 'Micrófono abierto para músicos y poetas',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Músicos, poetas y principiantes',
            venueType: 'Lugar en El Poblado o Laureles',
          },
          {
            title: 'Día de estudio abierto en Ciudad del Río',
            pitch:
              'Artistas y diseñadores abren sus estudios durante una tarde de visitas, demos y obras a la venta.',
            audience: 'Amantes del arte y visitantes curiosos',
            venueType: 'Estudios de artistas en Ciudad del Río',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en El Poblado',
          },
        ],
      },
      {
        name: 'Impacto y local',
        ideas: [
          {
            title: 'Limpieza de parque de barrio',
            pitch:
              'Una limpieza sabatina de un parque o mirador de barrio, con guantes y café incluidos.',
            audience: 'Voluntarios y vecinos',
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
            title: 'Noche de mentoría juvenil',
            pitch:
              'Profesionales comparten sus trayectorias de carrera con estudiantes locales en un ambiente amigable e informal.',
            audience: 'Profesionales y estudiantes',
            venueType: 'Centro comunitario o parque biblioteca',
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
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Medellín, los formatos al aire libre con el clima de eterna primavera — picnics en el parque, aventuras en Metrocable, noches de salsa — tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de Medellín se hacen en inglés o bilingües, especialmente en El Poblado y Laureles. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Medellín. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro una comunidad en Medellín?',
      answer:
        'Empieza por las páginas de tipos de grupo: comunidades de startups, creativas, políticas, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los residentes. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu comunidad hoy mismo.',
    },
    {
      question: '¿Es realista crear una comunidad en Medellín?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, un clima templado todo el año y una fuerte cultura de organización comunitaria. Las guías cubren cómo crear una comunidad, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — el Jardín Botánico, el Parque Arví, los cafés de El Poblado, la Comuna 13, los parques biblioteca — existe en Medellín. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Medellín?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los residentes a encontrar o crear comunidades.',
    },
  ],
};

export default content;
