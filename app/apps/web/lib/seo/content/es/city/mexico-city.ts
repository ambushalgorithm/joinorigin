import type { CityContent } from '../../types';

/**
 * Contenido de Ciudad de México — traducción al español (archivo de
 * contenido por idioma).
 *
 * Texto para las 7 páginas `es` de Ciudad de México en `/es/location/...`.
 * El texto vive AQUÍ, nunca en los JSON de idioma (localización R2/R5).
 * `pageTitles` lleva los títulos/descripciones SEO en español para que el
 * registro y el mapa del sitio sean deterministas para la superficie es.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'es',
  slug: 'mexico-city',
  title: 'Comunidades en Ciudad de México | JoinOrigin',
  description:
    'Encuentra o crea comunidades en Ciudad de México — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
  pageTitles: {
    city: 'Comunidades en Ciudad de México | JoinOrigin',
    cityDescription:
      'Encuentra o crea comunidades en Ciudad de México — grupos de startups, creativos, políticos, encuentros y pequeñas empresas. Únete a la lista de espera de JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups en Ciudad de México | JoinOrigin',
      creative: 'Comunidades creativas y de diseño en Ciudad de México | JoinOrigin',
      political: 'Comunidades políticas y cívicas en Ciudad de México | JoinOrigin',
      meetup: 'Encuentros y eventos comunitarios en Ciudad de México | JoinOrigin',
      'small-business': 'Comunidades de pequeñas empresas en Ciudad de México | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encuentra o crea comunidades de startups en Ciudad de México — fundadores, constructores y equipos tempranos en Roma y Condesa. Lista de espera de JoinOrigin.',
      creative:
        'Encuentra o crea comunidades creativas y de diseño en Ciudad de México — galerías, estudios y murales en Roma, Coyoacán y el Centro Histórico. Lista de espera de JoinOrigin.',
      political:
        'Encuentra o crea comunidades políticas y cívicas en Ciudad de México — vivienda, movilidad y participación en las alcaldías. Lista de espera de JoinOrigin.',
      meetup:
        'Encuentra o crea encuentros y eventos comunitarios en Ciudad de México — picnics en Chapultepec, paseos en trajinera y cafés de Roma. Lista de espera de JoinOrigin.',
      'small-business':
        'Encuentra o crea comunidades de pequeñas empresas en Ciudad de México — taquerías, fondas, mercados y boutiques. Lista de espera de JoinOrigin.',
    },
    ideas: '30 ideas de eventos comunitarios en Ciudad de México | JoinOrigin',
    ideasDescription:
      '30 ideas realistas para eventos comunitarios en Ciudad de México — networking, aprendizaje, sociales y exteriores, profesionales, creativos e impacto. Para tu próximo evento.',
  },
  intro: [
    'La Ciudad de México es la capital de México y una de las ciudades más grandes del mundo: unos 12,3 millones de personas dentro de los límites de la ciudad y más de veinte millones en toda la zona metropolitana — situada a 2.240 metros sobre el nivel del mar en un valle alto rodeado de volcanes. La ciudad está organizada en alcaldías y barrios con personalidades distintas: Roma y Condesa para los cafés y el trabajo creativo, Polanco para los negocios y la gastronomía fina, Coyoacán para la historia y los artistas, y el Centro Histórico para las capas profundas del pasado.',
    'La ciudad es una potencia de cultura, comida y creatividad: más museos que la mayoría de las ciudades, una escena de comida callejera entre las mejores del mundo y un ecosistema de tecnología y startups en crecimiento anclado en las fintech y las industrias creativas. La UNAM — una de las universidades más grandes de la Tierra —, el ITAM, el Politécnico Nacional y los campus del Tec de Monterrey alimentan un flujo constante de estudiantes e investigadores hacia las comunidades locales. El Metro, el Metrobús y el sistema de bicicletas compartidas Ecobici hacen práctico reunirse en toda la ciudad, y los anclajes públicos como el Bosque de Chapultepec, el Zócalo y los canales de Xochimilco dan a los grupos lugares gratuitos e icónicos para encontrarse.',
    'La ciudad recompensa al organizador seguro: es densa, animada y llena de personas que aparecen — pero el tráfico, la altitud y la temporada de lluvias moldean el calendario. Para encontrar o crear una comunidad, la Ciudad de México recompensa elegir un barrio, un idioma claro (español, inglés o ambos) y un lugar con buen acceso de transporte público.',
  ],
  dataPoints: [
    'Unos 12,3 millones de habitantes en la ciudad; más de 20 millones en la zona metropolitana.',
    'Capital de México a 2.240 metros de altitud.',
    'Clústeres de fintech, industrias creativas y culturales.',
    'Anclajes: UNAM, ITAM, IPN, campus del Tec de Monterrey.',
    'Anclajes públicos: Bosque de Chapultepec, Zócalo, canales de Xochimilco.',
    'Escenas de barrio: Roma, Condesa, Polanco, Coyoacán, Centro Histórico.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espacios de coworking en Roma y Condesa',
        'Oficinas de startups en Polanco',
        'Incubadoras universitarias cerca de la UNAM y el ITAM',
        'Oficinas de fintech y creative-tech',
        'Salas de eventos de aceleradoras en Roma Norte',
        'Cafés con mesas de fundadores en Condesa',
      ],
      formats: [
        'Desayunos de fundadores con rondas de presentación',
        'Noches de demo y tardes de pitch',
        'Paneles de fintech y pagos',
        'Encuentros de creative y media-tech',
        'Mezcladores de fundadores internacionales en inglés',
      ],
      howToStart: [
        'Elige una vertical estrecha — fintech, creative tech o constructores de IA — y un ancla de barrio.',
        'Reserva una franja semanal recurrente en un coworking de Roma o Condesa.',
        'Haz tres encuentros abiertos, pide a dos habituales que coorganicen y establece un ritmo mensual.',
      ],
    },
    creative: {
      venues: [
        'Galerías y estudios en Roma y Condesa',
        'Casas de artistas y mercados de Coyoacán',
        'Espacios culturales del Centro Histórico',
        'Edificios con murales y caminatas de arte',
        'Estudios de diseño en Roma Norte',
        'Centros de artes y cultura de la UNAM',
      ],
      formats: [
        'Noches de inauguración de galerías y caminatas de arte',
        'Fines de semana de estudio abierto',
        'Noches de crítica de diseño',
        'Círculos de música y producción',
        'Proyecciones de cine y documental',
      ],
      howToStart: [
        'Elige un oficio — arte visual, diseño, cine, música — y un barrio.',
        'Asóciate con una galería, un estudio o un centro cultural que acoja un primer evento abierto.',
        'Recoge obras en proceso antes del segundo evento y haz del feedback el núcleo de cada sesión.',
      ],
    },
    political: {
      venues: [
        'Alcaldía y oficinas de las alcaldías',
        'Salas de reuniones de bibliotecas públicas',
        'Salas de centros comunitarios de la ciudad',
        'Oficinas de defensa de inquilinos y vivienda',
        'Espacios de civic tech en Roma',
        'Espacios de eventos en parques y plazas',
      ],
      formats: [
        'Noches de información sobre vivienda y alquileres',
        'Talleres de derechos de inquilinos',
        'Sesiones informativas de voluntariado en transporte y movilidad',
        'Círculos de acción por el clima y la calidad del aire',
        'Talleres de participación ciudadana en lenguaje sencillo',
      ],
      howToStart: [
        'Elige un tema concreto y una geografía pequeña — una alcaldía, una cuadra o una sola política.',
        'Asiste primero a tres reuniones existentes y alíate con una organización en lugar de duplicar trabajo.',
        'Organiza un taller amigable para novatos sobre cómo funciona la ciudad para construir una base estable.',
      ],
    },
    meetup: {
      venues: [
        'Prados y senderos del Bosque de Chapultepec',
        'Cafés de Roma y Condesa con terrazas',
        'Plazas y mercados de Coyoacán',
        'Trajineras de Xochimilco (botes de canal)',
        'Patios del Centro Histórico',
        'Bibliotecas públicas con salas comunitarias',
      ],
      formats: [
        'Picnics y caminatas dominicales en el parque',
        'Sociales de café e intercambios de idiomas',
        'Paseos en bicicleta por calles cerradas',
        'Noches de juegos de mesa y trivia',
        'Caminatas por mercados y comida callejera',
      ],
      howToStart: [
        'Elige un formato repetible — una caminata dominical, una caminata mensual de comida — y un punto de encuentro fijo.',
        'Elige un lugar como el Bosque de Chapultepec o un café de Condesa al que se llegue fácil en Metro.',
        'Haz las tres primeras sesiones a la misma hora y en el mismo lugar, y pide a los habituales que inviten a un novato cada uno.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de tiendas en Roma y Condesa',
        'Espacios de vendedores en mercados',
        'Talleres del centro de pequeñas empresas de la ciudad',
        'Salas de eventos de la cámara de comercio',
        'Cafés y fondas locales con rincones comunitarios',
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
        'Haz primero un desayuno sin agenda: los dueños vienen a hablar de renta, permisos y ventas callejeras.',
        'Después de tres desayunos, rota un tema práctico al mes y deja que la cámara corra la voz.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La escena de startups de la Ciudad de México es la más grande de América Latina, construida sobre un vasto mercado interno, una fuerte ola fintech y una economía creativa que está remodelando la ciudad. Roma y Condesa concentran la mayor densidad de espacios de coworking y startups respaldadas por capital de riesgo, Polanco ancla la capa corporativa y financiera, y las universidades de la ciudad — UNAM, ITAM, Politécnico Nacional, Tec de Monterrey — alimentan año tras año a fundadores y talento. Lo que hace distintiva a la escena es su escala y su enfoque en el consumidor: las startups mexicanas construyen para un mercado de más de cien millones de personas, y las categorías de fintech, e-commerce y medios son especialmente fuertes. La ciudad es también un imán para fundadores internacionales y trabajadores remotos, por lo que una capa creciente de la escena funciona en inglés o de forma bilingüe. Los formatos consolidados incluyen desayunos de fundadores, noches de demo y paneles de la industria, muchos de ellos gratuitos y abiertos. Consejo honesto para crear una comunidad de startups en la Ciudad de México: elige una vertical, ancla a un barrio y respeta el tráfico: un evento semanal constante en un coworking de Roma construirá seguidores leales.',
    creative:
      'Las comunidades creativas de la Ciudad de México están entre las más ricas del mundo, apoyadas en una tradición muralista que dio forma al arte público del continente y una escena contemporánea que abarca diseño, cine, música y moda. Roma y Condesa concentran galerías, estudios y oficinas de diseño, Coyoacán lleva el legado artístico de Frida Kahlo y el espíritu bohemio del siglo XX, y el Centro Histórico superpone arquitectura colonial con espacios culturales contemporáneos. Los museos de la ciudad — entre los más numerosos de cualquier ciudad del mundo — dan a los creativos exposición constante al arte, y los programas culturales de la UNAM alimentan nuevas generaciones de artistas. El arte callejero está en todas partes, desde murales monumentales hasta obras efímeras que aparecen de la noche a la mañana, y los mercados, plazas y pulquerías de la ciudad dan a los creadores escenarios naturales para mostrar y vender. Crear una comunidad creativa en la Ciudad de México significa elegir una disciplina y un barrio, y luego usar la enorme audiencia de la ciudad y su profunda infraestructura cultural para construir algo con alcance real.',
    political:
      'Las comunidades políticas y cívicas de la Ciudad de México están moldeadas por el papel de la ciudad como capital nacional y por la energía de una megalópolis que enfrenta retos de vivienda, movilidad y clima. La ciudad está dividida en alcaldías con líderes electos, lo que mantiene accesible la política local: los vecinos pueden asistir a las sesiones de la alcaldía y dar forma a las decisiones sobre uso del suelo, transporte y espacio público. La asequibilidad de la vivienda es un tema creciente, con sindicatos de inquilinos y grupos contra el desplazamiento que se organizan en barrios en gentrificación como Roma y Condesa. La movilidad es un tema definitorio: la comunidad ciclista de la ciudad ha impulsado el sistema Ecobici y los carriles protegidos, y los defensores del transporte luchan por un mejor servicio de Metro y autobuses. Las comunidades de civic tech construyen herramientas para datos abiertos y participación pública, y las redes de voluntarios se organizan en torno a la calidad del aire, la plantación de árboles y la ayuda mutua. La cultura política recompensa la persistencia y el conocimiento del barrio. Crear una comunidad cívica en la Ciudad de México suele significar elegir un tema concreto y una geografía pequeña, y luego aliarse con el denso paisaje existente de organizadores.',
    meetup:
      'La cultura de encuentros de la Ciudad de México es tan vasta y variada como la propia ciudad: picnics dominicales en el Bosque de Chapultepec, sociales de café en Roma y Condesa, caminatas de comida callejera por el Centro Histórico, paseos en trajinera en Xochimilco e intercambios de idiomas que emparejan a hispanohablantes con la creciente población internacional de la ciudad. El Metro y el Metrobús hacen práctico reunirse en toda la ciudad, aunque el tráfico moldea el calendario: los locales planifican en torno a las horas pico y el tráfico vespertino. El clima de la ciudad es famosamente templado, con una temporada de lluvias que va de finales de primavera a principios de otoño, por lo que los formatos al aire libre prosperan la mayor parte del año. Los formatos con poder de permanencia son simples y repetibles: una sesión dominical en el parque, una caminata mensual de comida, una noche de trivia fija. Consejo honesto para crear un encuentro en la Ciudad de México: elige un barrio, un lugar accesible en Metro y un formato que acoja a los recién llegados: la ciudad está llena de personas curiosas y sociables que buscan el grupo que se sienta como en casa.',
    'small-business':
      'Las comunidades de pequeñas empresas de la Ciudad de México son el corazón de sus calles: la taquería, la fonda, el vendedor de mercado, la boutique de Roma y la tienda de artesanías de Coyoacán comparten preguntas prácticas sobre renta, permisos, personal y el flujo del tránsito peatonal. Los mercados de la ciudad — sus mercados públicos — son comunidades en sí mismos, con vendedores que se coordinan en torno a suministros, seguridad y eventos. Los corredores comerciales como la Avenida Álvaro Obregón en Roma y la Avenida Ámsterdam en Condesa concentran grupos de tiendas con un interés compartido en el tránsito peatonal y el espacio público. La cámara de comercio y los centros de pequeñas empresas de la ciudad ofrecen talleres sobre licencias, préstamos y venta digital, y la cultura de comida callejera de la ciudad da a los pequeños operadores una barrera de entrada famosamente baja. Los recién llegados suelen conectarse asistiendo a una reunión de corredor, tomando un taller de la ciudad o uniéndose a un colectivo de vendedores de mercado. Crear una comunidad de pequeñas empresas aquí es realista: una mesa redonda mensual en un café o fonda de barrio, con temas rotativos como renta, seguros y pagos digitales, atrae de forma fiable a dueños que rara vez tienen pares con quienes hablar.',
  },
  ideaPage: {
    intro:
      'La escala, la cultura y la vida callejera de la Ciudad de México la convierten en un lugar espectacular para probar nuevas ideas de eventos comunitarios. Las treinta ideas siguientes están agrupadas en seis categorías: networking, aprendizaje, sociales y exteriores, profesionales y de industria, creativas y maker, e impacto y local. Cada idea incluye para quién es, un discurso corto y un tipo de lugar sugerido que existe de verdad en la Ciudad de México, desde el Bosque de Chapultepec y los canales de Xochimilco hasta cafés de Roma, mercados públicos y centros culturales. Algunas ideas funcionan como eventos puntuales; otras están diseñadas para convertirse en comunidades recurrentes con un ritmo semanal. La regla de honestidad es simple: cada sugerencia de lugar es un tipo real de sitio en esta ciudad, y cada formato es lo bastante simple como para que un organizador primerizo lo dirija. Elige la idea que coincida con tus intereses, encuentra un lugar que te acoja y deja que la energía de la ciudad haga el resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Recorrido de cafés por Condesa',
            pitch:
              'Un paseo sabatino por tres cafés de Condesa, donde la gente rota de mesa y comparte lo que hace.',
            audience: 'Amantes del café y networkers',
            venueType: 'Cafés de Condesa',
          },
          {
            title: 'Comida de networking con tlacoyos y tortas',
            pitch:
              'Una comida semanal en un puesto de mercado donde la gente rota de mesa y comparte lo que hace con tlacoyos y tortas.',
            audience: 'Profesionales y recién llegados',
            venueType: 'Un mercado o fonda en Roma o Condesa',
          },
          {
            title: 'Social internacional para recién llegados',
            pitch:
              'Una noche de baja presión donde los recién llegados conocen a residentes de larga data con mezcal y consignas de conversación.',
            audience: 'Recién llegados a la ciudad, incluidos expatriados',
            venueType: 'Centro comunitario o sala de eventos de una pulquería',
          },
          {
            title: 'Círculo de historias de carrera',
            pitch:
              'Seis personas cuentan su historia de carrera en cinco minutos, seguidas de debate grupal y consignas de conexión.',
            audience: 'Buscadores de empleo, personas en cambio de carrera y mentores',
            venueType: 'Sala de reuniones de una biblioteca pública',
          },
          {
            title: 'Mezclador de altar de Día de Muertos',
            pitch:
              'Las personas construyen una ofrenda comunitaria juntas mientras conocen a sus vecinos, con papel picado y cempasúchil incluidos.',
            audience: 'Cualquiera que ame la celebración',
            venueType: 'Centro comunitario o espacio cultural',
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
            venueType: 'Café o centro comunitario en Roma',
          },
          {
            title: 'Caminata de historia de la comida chilanga',
            pitch:
              'Una caminata guiada de degustación por un mercado de barrio con las historias detrás de los tamales, los elotes y los churros.',
            audience: 'Amantes de la comida y recién llegados',
            venueType: 'Un mercado público y las calles circundantes',
          },
          {
            title: 'Noche de cata y tradición del mezcal',
            pitch:
              'Una introducción honesta a los destilados de agave, con productores que explican regiones, variedades y oficio.',
            audience: 'Amantes de los destilados y principiantes curiosos',
            venueType: 'Mezcalería o centro cultural',
          },
          {
            title: 'Taller de derechos de inquilinos',
            pitch:
              'Una sesión en lenguaje sencillo sobre contratos, depósitos y dónde obtener ayuda legal gratuita.',
            audience: 'Inquilinos y defensores de la vivienda',
            venueType: 'Centro comunitario o biblioteca',
          },
          {
            title: 'Noche de etiqueta de la lucha libre',
            pitch:
              'Una introducción divertida a las máscaras, héroes y rituales de la lucha libre antes de una noche grupal en la arena.',
            audience: 'Recién llegados curiosos por la lucha',
            venueType: 'Centro comunitario o bar con pantalla',
          },
        ],
      },
      {
        name: 'Sociales y exteriores',
        ideas: [
          {
            title: 'Picnic dominical en Chapultepec',
            pitch:
              'Mantas, música y una comida compartida en el gran parque de la ciudad, con un paseo por el lago.',
            audience: 'Amigos, familias y recién llegados',
            venueType: 'Prados del Bosque de Chapultepec',
          },
          {
            title: 'Paseo en trajinera por Xochimilco',
            pitch:
              'Un paseo relajado por los canales en un bote colorido, con bocadillos, música y nuevos amigos.',
            audience: 'Cualquiera que quiera una fiesta flotante',
            venueType: 'Muelles de los canales de Xochimilco',
          },
          {
            title: 'Paseo por la plaza de Coyoacán',
            pitch:
              'Una caminata lenta por la plaza histórica y los mercados, con paradas para café y comida callejera.',
            audience: 'Exploradores dominicales',
            venueType: 'Plazas y calles de mercado de Coyoacán',
          },
          {
            title: 'Noche de arena de lucha libre',
            pitch:
              'Una salida grupal a un espectáculo de lucha libre del viernes por la noche, donde los recién llegados aprenden los cánticos y personajes.',
            audience: 'Fanáticos de la lucha y primerizos',
            venueType: 'Arena México o una arena de barrio',
          },
          {
            title: 'Domingo de ciclismo por calles cerradas',
            pitch:
              'Un paseo relajado por las calles cerradas a los autos para la ciclovía semanal, con paradas de desayuno.',
            audience: 'Ciclistas recreativos de todos los niveles',
            venueType: 'Calles de la ruta de ciclovía',
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
            venueType: 'Estudio de diseño en Roma Norte',
          },
          {
            title: 'Encuentro del negocio de la música y el mariachi',
            pitch:
              'Una noche informal para músicos, productores y dueños de lugares para hablar de la economía musical de la ciudad.',
            audience: 'Músicos y profesionales de la industria musical',
            venueType: 'Lugar de música o centro cultural',
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
            title: 'Caminata de murales por el Centro',
            pitch:
              'Una caminata guiada por los grandes murales del centro histórico, con las historias detrás de los artistas.',
            audience: 'Amantes del arte y aficionados a la historia',
            venueType: 'Calles y patios del Centro Histórico',
          },
          {
            title: 'Sesión de alebrijes y artesanías',
            pitch:
              'Una tarde práctica para aprender el oficio del papel pintado con un artesano, con materiales incluidos.',
            audience: 'Amantes de la artesanía y makers',
            venueType: 'Centro cultural o taller de artesanos',
          },
          {
            title: 'Micrófono abierto para músicos y poetas',
            pitch: 'Un micrófono abierto acogedor con una función corta y una audiencia solidaria.',
            audience: 'Músicos, poetas y principiantes',
            venueType: 'Lugar de música en Roma o Condesa',
          },
          {
            title: 'Noche de proyección de cine de barrio',
            pitch:
              'Una proyección de cine al aire libre estilo barrio con un debate comunitario después.',
            audience: 'Amantes del cine y vecinos',
            venueType: 'Plaza comunitaria o centro cultural',
          },
          {
            title: 'Noche de zine y risografía',
            pitch:
              'Papel, tijeras y una imprenta risográfica: todos se van con un zine pequeño para intercambiar.',
            audience: 'Escritores, artistas y entusiastas de la imprenta',
            venueType: 'Imprenta o espacio de arte en Roma',
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
            title: 'Día de conservación de chinampas y lagos',
            pitch:
              'Un día de voluntariado en Xochimilco ayudando con la restauración de chinampas y aprendiendo sobre los canales.',
            audience: 'Voluntarios y amantes de la naturaleza',
            venueType: 'Zonas de humedal de Xochimilco',
          },
          {
            title: 'Jornada de huerto comunitario',
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
          'Haz coincidir la categoría con tus intereses y la audiencia a la que puedes llegar. En la Ciudad de México, un ancla de barrio, un lugar accesible en Metro y un formato que acoja a los recién llegados tienden a construir comunidad más rápido.',
      },
      {
        question: '¿Necesito hablar español para organizar?',
        answer:
          'No. Muchos eventos de la Ciudad de México se hacen en inglés o bilingües, especialmente en Roma y Condesa. Anunciar en ambos idiomas suele duplicar tu alcance.',
      },
      {
        question: '¿Pueden estos eventos convertirse en comunidades reales?',
        answer:
          'Sí: los formatos recurrentes son como empiezan la mayoría de las comunidades de la Ciudad de México. Las guías paso a paso recorren el camino desde un primer evento hasta una comunidad estable con organizadores y rituales.',
      },
    ],
  },
  faq: [
    {
      question: '¿Cómo encuentro una comunidad en la Ciudad de México?',
      answer:
        'Empieza por las páginas de tipos de grupo: comunidades de startups, creativas, políticas, de encuentros y de pequeñas empresas. Cada una describe los barrios, lugares y formatos reales donde se reúnen los residentes. JoinOrigin está en marcha: crea tu perfil y encuentra o crea tu comunidad hoy mismo.',
    },
    {
      question: '¿Es realista crear una comunidad en la Ciudad de México?',
      answer:
        'Sí. La ciudad tiene lugares públicos gratuitos, una población vasta y curiosa y una rica cultura de reunión. Las guías cubren cómo crear una comunidad, organizar un encuentro y conseguir tus primeros diez miembros.',
    },
    {
      question: '¿Las sugerencias de lugares de esta página son reales?',
      answer:
        'Sí. Cada tipo de lugar mencionado — el Bosque de Chapultepec, los canales de Xochimilco, los cafés de Roma, los mercados públicos, los centros culturales — existe en la Ciudad de México. Nunca inventamos recuentos de miembros, valoraciones ni oficinas locales.',
    },
    {
      question: '¿JoinOrigin tiene una oficina en la Ciudad de México?',
      answer:
        'No. JoinOrigin no tiene oficinas ni personal locales. Todas las descripciones de comunidades reflejan el paisaje real de la ciudad, y la plataforma ayuda a los residentes a encontrar o crear comunidades.',
    },
  ],
};

export default content;
