import type { CityContent } from '../../types';

/**
 * Contenido de Barcelona — traducción al español (archivo de contenido por
 * idioma).
 *
 * Texto para las 7 páginas `es` de Barcelona en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'barcelona',
  title: 'Origins en Barcelona | JoinOrigin',
  description:
    'Encuentra o crea Origins en Barcelona — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital catalana. Lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Origins en Barcelona | JoinOrigin',
    cityDescription:
      'Encuentra o crea Origins en Barcelona — grupos de startups, creativos, políticos, encuentros y pequeñas empresas en la capital catalana. Lista de espera de JoinOrigin.',
    variants: {
      startup: 'Origins de startups en Barcelona | JoinOrigin',
      creative: 'Origins creativos en Barcelona | JoinOrigin',
      political: 'Origins políticos y cívicos en Barcelona | JoinOrigin',
      meetup: 'Origins de encuentros y sociales en Barcelona | JoinOrigin',
      'small-business': 'Origins de pequeñas empresas en Barcelona | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea Origins de startups en Barcelona — fundadores, ingenieros y operadores en torno al 22@, Poblenou y la escena tech. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea Origins creativos en Barcelona — estudios, galerías y colectivos en El Raval, Poblenou y Gràcia. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea Origins políticos y cívicos en Barcelona — asambleas de barrio, activismo por la vivienda y campañas locales. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea Origins de encuentros y sociales en Barcelona — reuniones en plazas, rutas de tapas, sesiones de playa y vida de terraza. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea Origins de pequeñas empresas en Barcelona — comerciantes de mercado, vermuterías y redes de tiendas de barrio. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos de Origins en Barcelona | JoinOrigin',
    ideasDescription:
      'Descubre 30 ideas de eventos de Origins en Barcelona — eventos de networking, aprendizaje, exteriores, profesionales, creativos e impacto. Lista de espera de JoinOrigin.',
  },
  intro: [
    'Barcelona es una ciudad de plazas. Desde las soleadas plazas de Gràcia hasta los patios escondidos de El Born, el espacio público es el escenario de la vida comunitaria: partidos de fútbol improvisados, tardes de vermut, torres de castells y conversaciones nocturnas bajo los plátanos. El clima mediterráneo de la ciudad alarga la temporada de reuniones casi todo el año, y la playa de la Barceloneta la extiende hasta la orilla.',
    'La ciudad es también un denso experimento urbano: la cuadrícula del Eixample, la conversión de fábricas del distrito 22@ de Poblenou y los barrios de montaña de Carmel y Vallcabra tienen cada uno su propio carácter. Universidades como la Universitat de Barcelona, la UPC y la Pompeu Fabra alimentan un flujo constante de estudiantes, mientras que las fuertes tradiciones cooperativas y asociativas de la ciudad — desde asociaciones de vecinos hasta plataformas cívicas — dan a las comunidades una forma reconocida.',
    'La identidad catalana es profunda aquí, y los grupos que respetan la lengua y el ritmo local ganan lealtad rápido. Barcelona recompensa la constancia: una mesa semanal en la misma vermutería o una reunión mensual en la plaza construye una comunidad que sobrevive a cualquier evento puntual.',
  ],
  dataPoints: [
    'Aproximadamente 1,7 millones de habitantes; capital de Cataluña, España.',
    'Universidades: Universitat de Barcelona, UPC y Pompeu Fabra.',
    'El 22@ en Poblenou es el distrito de innovación y tecnología de la ciudad.',
    'Clima mediterráneo: plazas, terrazas y la playa acogen reuniones.',
    'Fuertes tradiciones asociativas y cooperativas, de los castells a los grupos de barrio.',
    'Anclajes públicos: parque de la Ciutadella, Montjuïc, las Ramblas y la playa de la Barceloneta.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Plantas de eventos del distrito de innovación 22@',
        'Espacios de coworking en Poblenou y El Born',
        'Salas de aceleradoras cerca de las torres Glòries',
        'Hubs de emprendimiento universitario en la UPC y la Pompeu Fabra',
        'Cafés de startups por el Eixample',
        'Azoteas para mezcladores nocturnos',
      ],
      formats: [
        'Desayunos de fundadores con presentaciones rápidas',
        'Tardes de pitch y noches de demo',
        'Mesas de fundadores de movilidad, salud y SaaS',
        'Eventos paralelos del Mobile World Congress durante todo el año',
        'Mezcladores de fundadores internacionales (en inglés)',
      ],
      howToStart: [
        'Elige una vertical estrecha — movilidad, salud o SaaS — y un nombre amigable en inglés.',
        'Reserva una franja semanal en un coworking del 22@ o de Poblenou que te acoja.',
        'Haz tres encuentros abiertos, luego pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Estudios y galerías en El Raval y El Born',
        'Espacios maker de Poblenou en fábricas reconvertidas',
        'Estudios de diseño en Gràcia',
        'Salas de talleres de escuelas de arte — EINA, BAU, Massana',
        'Salas de ensayo en el distrito de la música',
        'Azoteas para inauguraciones de exposiciones',
      ],
      formats: [
        'Fines de semana de estudio abierto y noches de portafolio',
        'Visitas guiadas a galerías con charlas de artistas',
        'Noches de crítica de diseño en colectivos de estudio',
        'Círculos de producción musical y noches de micrófono abierto',
        'Caminatas de arte callejero y murales',
      ],
      howToStart: [
        'Elige un oficio, un barrio y una noche regular: la especificidad construye identidad más rápido aquí.',
        'Encuentra un estudio colectivo en El Raval o Poblenou dispuesto a acoger la primera noche.',
        'Haz una primera sesión de estudio abierto, recoge obras en proceso y haz del feedback la agenda fija.',
      ],
    },
    political: {
      venues: [
        'Salas de asociaciones de vecinos',
        'Salas de los consejos de distrito en los diez distritos',
        'Espacios de activismo por la vivienda en el centro',
        'Centros cívicos en cada barrio',
        'Bibliotecas públicas con salas de reuniones',
        'Huertos comunitarios en solares vacíos',
      ],
      formats: [
        'Reuniones de asamblea de barrio',
        'Noches de información sobre vivienda y derechos de alquiler',
        'Talleres de planificación de distrito',
        'Sesiones informativas de voluntariado y primeros turnos',
        'Sesiones de planificación de iniciativas ciudadanas',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña: una cuadra, un barrio o una política de vivienda.',
        'Asiste primero a tres reuniones de asociaciones existentes y alíate en lugar de duplicar trabajo.',
        'Organiza una noche informativa abierta con un organizador real como coanfitrión para construir una base de confianza.',
      ],
    },
    meetup: {
      venues: [
        'Plazas en Gràcia y El Born',
        'Bares de terraza y vermuterías',
        'Playa de la Barceloneta y el paseo marítimo',
        'Parque de la Ciutadella y laderas de Montjuïc',
        'Cafés de juegos de mesa en el centro',
        'Centros cívicos con mesas de patio',
      ],
      formats: [
        'Reunión semanal en la plaza a la misma hora',
        'Tardes de vermut los domingos',
        'Sesiones de vóley playa y pádel',
        'Rutas de tapas por un barrio',
        'Mesas de intercambio de idiomas (catalán, español, inglés)',
      ],
      howToStart: [
        'Elige un formato repetible — un encuentro semanal en la plaza, un vermut dominical — y un lugar fijo.',
        'Elige una plaza, un bar de terraza o un punto de playa que te acoja cada vez.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Mercados: La Boqueria, Mercat de Sant Antoni',
        'Mesas de vermuterías y bodegas',
        'Salas de reuniones de gremios',
        'Asociaciones de comerciantes en el casco antiguo',
        'Salas de seminarios de la cámara de comercio',
        'Puestos de mercados maker en ferias de barrio',
      ],
      formats: [
        'Desayunos de comerciantes de barrio antes de abrir',
        'Planificación de temporada de los puestos del mercado',
        'Talleres de gremios y cámara sobre permisos y digitalización',
        'Círculos de compra compartida de suministros',
        'Sesiones de planificación de las fiestas mayores',
      ],
      howToStart: [
        'Ancla el grupo a una galería de mercado o una calle comercial: el mercado dominical de Sant Antoni es un punto de encuentro probado.',
        'Invita a un puesto veterano o a un representante del gremio a coorganizar el primer desayuno.',
        'Recoge los dolores recurrentes de los dueños — permisos, alquiler, afluencia — y convierte la reunión de cada mes en una sesión práctica de soluciones.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de Barcelona ha crecido en torno al distrito de innovación 22@ en Poblenou, donde antiguas fábricas textiles albergan ahora aceleradoras, fondos de capital de riesgo y miles de startups. Las fortalezas de la ciudad son visibles en sus empresas: movilidad, health tech, SaaS y marketplaces, con una fuerte comunidad internacional de fundadores atraídos por el clima y la calidad de vida. El Mobile World Congress pone a la ciudad en el calendario global cada primavera y mantiene un rumor de eventos paralelos durante todo el año. Los espacios de coworking de Poblenou y El Born acogen desayunos de fundadores, tardes de pitch y días de demo, mientras que la UPC y la Pompeu Fabra aportan graduados a los equipos tempranos. La comunidad es genuinamente internacional: el inglés es común en los encuentros, y el catalán y el español aparecen según la sala. El ritmo mediterráneo da forma a la escena: los eventos son relajados, la puntualidad es flexible y las azoteas son tan importantes como las salas de juntas. Crear un Origin de startups en Barcelona funciona mejor con una vertical estrecha y un ritmo regular: una mesa mensual de fundadores de movilidad o una noche de constructores de IA construye seguidores leales más rápido que un grupo generalista.',
    creative:
      'Las comunidades creativas de Barcelona viven entre el casco antiguo y las fábricas reconvertidas de Poblenou: El Raval y El Born acogen galerías y estudios, Gràcia lleva una tradición bohemia de talleres y artesanía, y el 22@ se ha convertido en el hogar de estudios de diseño y maker en antiguas naves industriales. Escuelas de arte como EINA, BAU y la Massana alimentan un flujo constante de diseñadores, ilustradores y makers en una escena conocida por el diseño gráfico, el arte callejero y la artesanía del mueble. Los formatos incluyen fines de semana de estudio abierto, revisiones de portafolio, críticas de diseño y círculos de producción musical, con azoteas que convierten las inauguraciones de exposiciones en fiestas nocturnas. Los festivales de la ciudad — de La Mercè a las fiestas mayores de barrio — dan a los creativos un calendario natural de plazos y escaparates. La escena es lo bastante compacta como para que la palabra viaje rápido, y la luz y el ritmo mediterráneos impregnan el trabajo. Crear un Origin creativo en Barcelona es realista: elige un oficio, un barrio y una noche regular, y la densidad de personas curiosas y talentosas te encontrará.',
    political:
      'Barcelona tiene una de las tradiciones más fuertes de organización cívica de Europa: las asociaciones de vecinos fueron centrales en la recuperación de la ciudad tras el franquismo y siguen anclando la vida local hoy. La vivienda es el tema definitorio: la economía turística ha exprimido el mercado de alquiler, produciendo sindicatos de inquilinos activos, huelgas de alquiler y campañas por la vivienda pública que atraen atención internacional. La ciudad está dividida en diez distritos con consejos elegidos, y los centros cívicos dan a cada barrio un hogar físico para reuniones, clases y grupos de voluntarios. La movilidad y el espacio público también se disputan: las supermanzanas, las calles peatonales y los corredores verdes se planifican y se defienden en consultas comunitarias reales. La cultura política valora la participación: los residentes esperan ser escuchados, y los grupos bien organizados consiguen resultados. Crear un Origin político significa elegir un tema concreto y una geografía pequeña — una cuadra, un barrio o una política de vivienda — y luego aliarse con las asociaciones existentes en lugar de duplicarlas. El paisaje es lo bastante rico como para que la colaboración supere a la competencia.',
    meetup:
      'La escena de encuentros de Barcelona funciona en la plaza, la terraza y la playa. Barrios como Gràcia y El Born viven al aire libre: las plazas se llenan de familias, amigos y juegos improvisados, mientras que el vermut dominical convierte las terrazas en instituciones sociales. La playa de la Barceloneta y el paseo marítimo acogen vóley, pádel y reuniones al atardecer que atraen a gente de toda la ciudad. El parque de la Ciutadella y Montjuïc ofrecen escapes verdes para picnics y ejercicio al aire libre. Los formatos incluyen encuentros semanales en la plaza, rutas de tapas, intercambios de idiomas (catalán, español, inglés) y noches de juegos de mesa en los muchos cafés de juegos de la ciudad. El clima mediterráneo hace larga la temporada al aire libre, y la densidad de la ciudad significa que un grupo pequeño puede llenar una terraza sin esfuerzo. Los recién llegados son bienvenidos con calidez, aunque un poco de catalán o español abre puertas. Crear un encuentro en Barcelona significa elegir un formato repetible y un lugar fijo — un encuentro semanal en la plaza o un vermut dominical — y el amor de la ciudad por el espacio público hace el resto.',
    'small-business':
      'Las comunidades de pequeñas empresas de Barcelona están ancladas por los mercados, los gremios y las calles de barrio de la ciudad. La Boqueria en las Ramblas y el restaurado Mercat de Sant Antoni no son solo mercados de comida: son comunidades estrechas de puestos que comparten proveedores, horarios y cotilleos. Los gremios, gremios comerciales con siglos de historia, siguen organizando muchos oficios, mientras que las asociaciones de comerciantes del casco antiguo gestionan promociones conjuntas y ferias callejeras. Las fiestas mayores — los festivales anuales de barrio — las planifican comités de comerciantes y vecinos que se conocen por su nombre. La cámara de comercio y los grupos empresariales de distrito ofrecen talleres sobre permisos, digitalización y financiación, a menudo en catalán, español e inglés. Lo que une a estos grupos es el lugar: una galería de mercado, una calle comercial o una plaza es una comunidad natural con un interés colectivo en el tránsito peatonal y la identidad del barrio. Crear un Origin de pequeñas empresas es muy alcanzable: un desayuno mensual de comerciantes en una galería de mercado, con temas rotativos como alquiler, permisos y venta en línea, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'Barcelona es una ciudad ideal para probar nuevas ideas de eventos comunitarios: las plazas y las terrazas son lugares gratuitos, la playa alarga la temporada y la tradición asociativa de la ciudad da a cada grupo una forma reconocida. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada una incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en Barcelona, desde rincones de plaza y vermuterías hasta galerías de mercado y centros cívicos. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la energía al aire libre de Barcelona haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Mesa de vermut dominical para recién llegados',
            pitch:
              'Una mesa dominical fija en la misma vermutería donde los recién llegados y los locales de larga data intercambian consejos de barrio con vermut y aceitunas.',
            audience: 'Nuevos llegados y cualquiera que disfrute de charlas informales',
            venueType: 'Una vermutería en Gràcia o El Born',
          },
          {
            title: 'Paseo y charla de fundadores',
            pitch:
              'Un paseo matutino por el paseo marítimo donde los fundadores comparten los logros y bloqueos de la semana mientras caminan.',
            audience: 'Fundadores y operadores de todas las etapas',
            venueType: 'El paseo marítimo de la Barceloneta',
          },
          {
            title: 'Social de barrio en barrio',
            pitch:
              'Una noche mensual que rota a un barrio distinto cada vez, explorando sus bares y conociendo a sus vecinos.',
            audience: 'Residentes y exploradores de toda la ciudad',
            venueType: 'Un centro cívico distinto cada mes',
          },
          {
            title: 'Círculo de expatriados de startups',
            pitch:
              'Trabajadores internacionales de startups de Barcelona comparten consejos de incorporación, lecciones de visados y etiqueta empresarial local.',
            audience: 'Expatriados que trabajan en tecnología',
            venueType: 'Un café de coworking en el 22@',
          },
          {
            title: 'Noche de intercambio de retratos',
            pitch:
              'Desconocidos se emparejan, se entrevistan durante diez minutos y presentan a su pareja ante toda la sala.',
            audience: 'Cualquiera que quiera conocer gente nueva',
            venueType: 'Una sala de centro cívico o el fondo de un café',
          },
        ],
      },
      {
        name: 'Aprendizaje y talleres',
        ideas: [
          {
            title: 'Taller de catalán de supervivencia',
            pitch:
              'Un curso exprés divertido de las frases en catalán que abren puertas en el mercado, la farmacia y el bar del barrio.',
            audience: 'Recién llegados que quieren integrarse rápido',
            venueType: 'Una biblioteca pública o centro cívico',
          },
          {
            title: 'Clínica fiscal para autónomos',
            pitch:
              'Una sesión práctica sobre el alta de autónomo, las facturas y las declaraciones trimestrales en España.',
            audience: 'Autónomos y residentes internacionales',
            venueType: 'Un coworking o sala de eventos de la cámara',
          },
          {
            title: 'Castells para principiantes',
            pitch:
              'Aprende los fundamentos de construir torres humanas con una colla local — una de las tradiciones más queridas de Cataluña.',
            audience: 'Recién llegados curiosos y familias',
            venueType: 'Un espacio de ensayo de colla o una plaza abierta',
          },
          {
            title: 'Noche de cocina del mercado a la mesa',
            pitch:
              'Compra en el mercado juntos por la mañana y cocina una cena mediterránea compartida en una cocina comunitaria.',
            audience: 'Amantes de la comida y cocineros caseros',
            venueType: 'Una cocina comunitaria cerca de una galería de mercado',
          },
          {
            title: 'Escuela de ajedrez en la plaza',
            pitch:
              'Jugadores locales enseñan a principiantes en el parque, con tableros incluidos y un torneo amistoso al final.',
            audience: 'Jugadores de ajedrez principiantes de todas las edades',
            venueType: 'Mesas de ajedrez en una plaza de barrio',
          },
        ],
      },
      {
        name: 'Sociales y exteriores',
        ideas: [
          {
            title: 'Liga de vóley playa al atardecer',
            pitch:
              'Una tarde semanal de vóley casual en la arena con equipos rotativos y una cena compartida después.',
            audience: 'Jugadores casuales y amantes de la playa',
            venueType: 'Las pistas de vóley de la Barceloneta',
          },
          {
            title: 'Picnic y caminata a los miradores de Montjuïc',
            pitch:
              'Una subida lenta por los jardines con paradas de picnic en los mejores miradores de la ciudad.',
            audience: 'Caminantes y amantes del atardecer',
            venueType: 'La colina de Montjuïc y sus miradores',
          },
          {
            title: 'Noches de pádel para principiantes',
            pitch:
              'Una introducción amigable al pádel — el deporte de raqueta favorito de España — con entrenamiento y pistas.',
            audience: 'Principiantes y deportistas curiosos',
            venueType: 'Pistas de pádel locales',
          },
          {
            title: 'Noche de cine en la azotea',
            pitch:
              'Una proyección veraniega en una azotea residencial, con mantas, palomitas y vistas de la ciudad.',
            audience: 'Amantes del cine y vecinos',
            venueType: 'Una azotea residencial compartida',
          },
          {
            title: 'Escuadrón de voluntarios de la fiesta mayor',
            pitch:
              'Únete al comité que planifica la fiesta mayor de un barrio: música, gigantes y comida callejera para todos.',
            audience: 'Vecinos que quieren devolver algo',
            venueType: 'Una sala de asociación de vecinos',
          },
        ],
      },
      {
        name: 'Profesionales y de industria',
        ideas: [
          {
            title: 'Mesa redonda de movilidad',
            pitch:
              'Fundadores, ingenieros y funcionarios municipales debaten las tendencias de movilidad compartida durante un desayuno de trabajo.',
            audience: 'Profesionales y startups de movilidad',
            venueType: 'Una oficina o espacio de eventos en el 22@',
          },
          {
            title: 'Desayuno de health tech',
            pitch:
              'Un desayuno mensual donde los fundadores de health tech comparten avances, aprendizajes regulatorios y alianzas.',
            audience: 'Fundadores y operadores de health tech',
            venueType: 'Una sala de aceleradora en Poblenou',
          },
          {
            title: 'Clínica de precios SaaS',
            pitch:
              'Los fundadores traen sus páginas de precios y se van con comentarios honestos de operadores que ya lo han hecho.',
            audience: 'Fundadores B2B y SaaS',
            venueType: 'Una sala de reuniones de coworking en el 22@',
          },
          {
            title: 'Noche de profesionales de datos e IA',
            pitch:
              'Profesionales comparten proyectos reales: modelos, pipelines y las lecciones que no llegaron a la entrada del blog.',
            audience: 'Científicos de datos e ingenieros de ML',
            venueType: 'Una sala universitaria o de coworking',
          },
          {
            title: 'Círculo de dueños de estudios',
            pitch:
              'Dueños de estudios creativos se reúnen para comparar gestión de clientes, contratación y precios de proyectos con pares.',
            audience: 'Dueños de pequeños estudios y agencias',
            venueType: 'Un estudio de diseño en Gràcia',
          },
        ],
      },
      {
        name: 'Creativas y maker',
        ideas: [
          {
            title: 'Taller de mosaico trencadís',
            pitch:
              'Prueba la técnica de mosaico de baldosas rotas que hizo famosa Gaudí y vete con tu propia baldosa colorida.',
            audience: 'Amantes de la artesanía y buscadores de recuerdos',
            venueType: 'Un estudio de cerámica o mosaico',
          },
          {
            title: 'Recorrido de arte al aire libre por Poblenou',
            pitch:
              'Una caminata nocturna guiada por los murales y galerías del antiguo distrito fabril, que termina en un bar-estudio.',
            audience: 'Caminantes de arte y fotógrafos',
            venueType: 'Las calles y estudios de Poblenou',
          },
          {
            title: 'Círculo de cerámica',
            pitch:
              'Una sesión semanal donde los ceramistas comparten tornos, hornos y comentarios sobre sus piezas.',
            audience: 'Ceramistas y principiantes curiosos',
            venueType: 'Un estudio de cerámica o taller comunitario',
          },
          {
            title: 'Noche de jam de rumba catalana',
            pitch:
              'Un jam abierto donde los músicos intercambian rumba, flamenco y clásicos del pop en un pequeño local de barrio.',
            audience: 'Músicos y amantes de la música',
            venueType: 'Un pequeño local de música en Gràcia',
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
              'Una sesión en lenguaje sencillo sobre reglas de alquiler, contratos y dónde obtener asesoramiento gratuito sobre vivienda en Barcelona.',
            audience: 'Inquilinos y organizadores de inquilinos',
            venueType: 'Una sala de sindicato de inquilinos o centro cívico',
          },
          {
            title: 'Paseo y charla por la supermanzana',
            pitch:
              'Recorre una supermanzana con sus planificadores y vecinos y aprende cómo se diseñan y se consiguen las plazas sin coches.',
            audience: 'Urbanistas y activistas de barrio',
            venueType: 'Una sala del consejo de distrito o la propia supermanzana',
          },
          {
            title: 'Mañana de limpieza de playa',
            pitch:
              'Una limpieza sabatina de un tramo de costa, con guantes, bolsas y café incluidos.',
            audience: 'Amantes de la playa y voluntarios',
            venueType: 'La playa de la Barceloneta y el paseo',
          },
          {
            title: 'Jornada de huerto comunitario',
            pitch:
              'Los vecinos pasan una mañana plantando, regando y planificando la temporada en un huerto compartido.',
            audience: 'Huerteros y futuros huerteros',
            venueType: 'Un huerto comunitario en un solar vacío',
          },
          {
            title: 'Historias de puestos del mercado',
            pitch:
              'Puestos veteranos comparten historias de cinco minutos detrás de sus mostradores, seguidas de preguntas abiertas.',
            audience: 'Vecinos y amantes de la comida',
            venueType: 'Una galería de mercado como Sant Antoni',
          },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo elijo una de estas ideas?',
        answer:
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En Barcelona, los formatos recurrentes con un lugar fijo — un encuentro semanal en la plaza, un vermut dominical, una caminata mensual — construyen comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español o catalán para organizar?',
        answer:
          'No. Muchos grupos de Barcelona funcionan en inglés o son bilingües, especialmente en las escenas tech y creativas. Un poco de español o catalán abre puertas con los vecinos y los comerciantes del mercado.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de Barcelona, y la tradición asociativa de la ciudad te da un patrón probado. Las guías paso a paso recorren el camino desde el primer evento hasta una comunidad estable.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro un Origin en Barcelona?',
      answer:
        'Usa las páginas de tipos de grupo para Origins de startups, creativos, políticos, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los barceloneses. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu Origin hoy mismo.',
    },
    {
      question: '¿Es realista crear un Origin en Barcelona?',
      answer:
        'Sí. Barcelona tiene plazas, terrazas y la playa como lugares gratuitos, además de una fuerte tradición asociativa. Las guías cubren cómo crear un Origin, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — plazas, vermuterías, galerías de mercado, centros cívicos, la playa — existe en Barcelona. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en Barcelona?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los barceloneses a encontrar o crear Origins.',
    },
  ],
};

export default content;
