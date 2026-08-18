import type { GuideContent } from '../../types';

/**
 * «Cómo encontrar un cofundador» — guía L1 siempre vigente (diseño §6.1, TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: se publica una
 * página de idea, su sala se crea automáticamente y las conversaciones de
 * cofundación ocurren en esa sala — el lugar digital donde los candidatos
 * pueden encontrar la idea, hacer preguntas y trabajar juntos. El valor de
 * JoinOrigin está tejido en la introducción y en cada paso (nota
 * `joinOriginNote` por paso), con un enfoque honesto: JoinOrigin no es un
 * servicio de emparejamiento y no empareja fundadores. Un solo H1,
 * estructura paso a paso y FAQ reflejada 1:1 en el JSON-LD `FAQPage`.
 * «Sala» está anclada a la sala Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'find-a-co-founder',
  title: 'Cómo encontrar un cofundador: dónde buscar y qué preguntar | JoinOrigin',
  description:
    'Encuentra un cofundador que complemente tus habilidades — ya sea que estés lanzando o haciendo crecer una empresa existente — publica una página de idea, conoce gente en comunidades y sus salas, realiza un proyecto de prueba y haz las preguntas que previenen las rupturas. De JoinOrigin.',
  intro: [
    'Encontrar un cofundador es una decisión de relación disfrazada de decisión de contratación, y en el fondo es otro problema de conectar personas: la persona adecuada suele estar a una presentación cálida de distancia, en alguna comunidad que aún no has descubierto. Ese es el problema con el que JoinOrigin ayuda — y es el mismo problema tanto si todavía estás en la etapa de idea como si diriges una empresa existente que necesita un socio para dar el siguiente paso.',
    'JoinOrigin es un sistema operativo comunitario construido en torno al bucle digital conectar→unirse→sala: publicas una idea, su sala se crea automáticamente y las personas que comparten la idea pueden unirse y hablar en esa sala. La página de idea es la promesa pública y la sala es donde ocurren realmente las conversaciones de cofundación: una sala Matrix controlada por el creador donde las personas interesadas pueden hacer preguntas, compartir notas y poner a prueba el encaje antes de que alguien se comprometa. JoinOrigin no es un servicio de emparejamiento, no empareja fundadores y no tiene oficinas locales. El valor de la plataforma — conectar personas en torno a intereses compartidos — se corresponde directamente con la forma en que la mayoría de los fundadores encuentra a su cofundador: a través de comunidades, salas y presentaciones cálidas.',
    'Esta guía aborda la búsqueda como abordarías la construcción de una comunidad: parte de tu red existente, publica una idea que las personas puedan encontrar, expande deliberadamente a través de comunidades y sus salas, evalúa candidatos con conversaciones estructuradas y un proyecto de prueba, y acuerda los fundamentos antes de comprometerte legalmente. Los pasos son prácticos y honestos, y cada uno muestra dónde ayuda JoinOrigin.',
  ],
  dataPoints: [
    'Las presentaciones cálidas y el trabajo compartido producen las relaciones de cofundación más duraderas.',
    'Una página de idea publicada con su sala da a las personas interesadas un lugar real para encontrar la idea e iniciar una conversación.',
    'Un proyecto de prueba corto — un prototipo, una página de aterrizaje o un piloto pagado — pone a prueba los estilos de trabajo más rápido que las entrevistas.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar comunidades y colaboradores; no es un servicio de emparejamiento y no tiene oficinas locales.',
  ],
  faq: [
    {
      question: '¿Dónde encuentra la mayoría de la gente a su cofundador?',
      answer:
        'La mayoría de los fundadores se conocen a través de redes cálidas: eventos, comunidades, salas y presentaciones de personas de confianza. Publicar una idea que las personas puedan encontrar y luego presentarse con constancia en las mismas comunidades y sus salas es la forma más fiable de conocer a posibles cofundadores.',
    },
    {
      question: '¿Cómo sé si alguien encaja como cofundador?',
      answer:
        'Realiza un pequeño proyecto de prueba juntos y presta atención a tres cosas: habilidades complementarias, tolerancia al riesgo similar y comunicación honesta bajo presión de fechas. El proyecto de prueba revela las tres más rápido que cualquier conversación.',
    },
    {
      question: '¿Qué deberíamos acordar antes de empezar?',
      answer:
        'Habla de roles, dedicación de tiempo, reparto de capital, adquisición gradual de acciones, toma de decisiones y qué ocurre si alguien quiere irse. Poner estos temas sobre la mesa desde el principio previene los desacuerdos que destruyen a la mayoría de los equipos tempranos.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a encontrar un cofundador?',
      answer:
        'JoinOrigin ayuda a las personas a encontrar comunidades y colaboradores — incluido el tipo de comunidades donde se conocen los fundadores — con una página de idea y una sala donde pueden ocurrir conversaciones. JoinOrigin no empareja fundadores, por lo que los pasos de networking y proyecto de prueba de esta guía son tu camino más fiable.',
    },
  ],
  sections: [
    'Primero traza tus carencias de habilidades. Escribe en qué eres genuinamente bueno y qué necesita la empresa que no eres tú. Un cofundador debería cerrar tu mayor carencia — técnica, comercial u operativa —, no duplicar tus fortalezas. JoinOrigin está construido en torno a perfiles, ideas y comunidades, no al emparejamiento — por lo que el consejo honesto es el mismo de siempre: conoce qué carencia necesitas cerrar antes de buscar. Anota tus fortalezas y las necesidades de la empresa.',
    'Publica tu idea y abre su sala. Una idea que nadie puede encontrar no atrae cofundadores. Publica una página de idea clara — qué estás construyendo, por qué y el tipo de persona que necesitas — y deja que su sala se cree automáticamente para que las personas interesadas tengan un lugar para hablar. Publicar una idea en JoinOrigin crea automáticamente su sala, el lugar donde ocurren las conversaciones de cofundación. Publica tu idea en algún lugar público y abre una sala para debatir en torno a ella.',
    'Trabaja tu red existente para conseguir presentaciones cálidas. Di a cinco personas de confianza qué estás construyendo y el tipo de cofundador que necesitas. Pide a cada una un nombre. Las presentaciones cálidas superan a la divulgación en frío en casi todos los casos. JoinOrigin hace localizables las comunidades, lo que expande tu red cálida con el tiempo — y cada presentación puede llevar a una sala donde ocurre la conversación real. Di a cinco personas de confianza exactamente qué tipo de cofundador necesitas.',
    'Preséntate con constancia en las comunidades relevantes y sus salas. Asiste a eventos y únete a grupos donde se reúne el tipo de persona adecuado: encuentros de fundadores, comunidades de la industria, espacios de coworking y salas en línea. La repetición construye la confianza que lleva a las presentaciones. JoinOrigin ayuda a las personas a encontrar las comunidades que coinciden con sus objetivos — el tipo de lugar donde se conocen los fundadores — y a unirse a sus salas. Elige los encuentros y las salas donde las personas adecuadas ya se reúnen y sigue presentándote.',
    'Ten conversaciones estructuradas iniciales. Pregunta por sus habilidades, tolerancia al riesgo, dedicación de tiempo y por qué quieren comenzar o hacer crecer algo. Comparte tus propias respuestas. Esta es una entrevista mutua, no un discurso de venta. JoinOrigin no empareja fundadores ni dirige conversaciones: la entrevista mutua es tuya. La plataforma te pone en las mismas comunidades y salas que los posibles colaboradores: el resto depende de ti.',
    'Realiza un proyecto de prueba juntos. Elige algo pequeño y real — un prototipo, una página de aterrizaje o un piloto pagado — y trabajen en ello durante cuatro a seis semanas. Observa cómo dividen el trabajo, manejan los comentarios y se comportan bajo presión. JoinOrigin da a las comunidades una sala compartida para su trabajo y sus proyectos, un lugar natural para que surja un proyecto de prueba. Un prototipo real pequeño es la prueba más fiable.',
    'Decide según la prueba, no según el potencial. Pregúntate si confiarías a esta persona tu reputación, si se comunica con honestidad y si trabajar juntos te da energía. Si la prueba se sintió tensa, confía en esa señal. JoinOrigin no toma la decisión por ti. Su valor honesto es el contexto de comunidad y sala que te permite conocer y trabajar con candidatos: la prueba sigue diciéndote la verdad.',
    'Acuerda los fundamentos antes de comprometerte. Anota los roles, la dedicación de tiempo, el reparto de capital, la adquisición gradual de acciones y las reglas de toma de decisiones. Incluso un acuerdo simple de una página previene la mayoría de los malentendidos tempranos. JoinOrigin es un sistema operativo comunitario: un espacio organizado donde los acuerdos, los roles y las notas del proyecto pueden convivir junto a la sala de la idea. Incluso un acuerdo escrito de una página previene la mayoría de los malentendidos tempranos.',
  ],
  steps: [
    {
      title: 'Primero traza tus carencias de habilidades',
      body: 'Escribe en qué eres genuinamente bueno y qué necesita la empresa que no eres tú. Un cofundador debería cerrar tu mayor carencia — técnica, comercial u operativa —, no duplicar tus fortalezas.',
      joinOriginNote:
        'JoinOrigin está construido en torno a perfiles, ideas y comunidades, no al emparejamiento — por lo que el consejo honesto es el mismo de siempre: conoce qué carencia necesitas cerrar antes de buscar. Anota tus fortalezas y las necesidades de la empresa.',
    },
    {
      title: 'Publica tu idea y abre su sala',
      body: 'Una idea que nadie puede encontrar no atrae cofundadores. Publica una página de idea clara — qué estás construyendo, por qué y el tipo de persona que necesitas — y deja que su sala se cree automáticamente para que las personas interesadas tengan un lugar para hablar.',
      joinOriginNote:
        'Publicar una idea en JoinOrigin crea automáticamente su sala, el lugar donde ocurren las conversaciones de cofundación. Publica tu idea en algún lugar público y abre una sala para debatir en torno a ella.',
    },
    {
      title: 'Trabaja tu red existente para conseguir presentaciones cálidas',
      body: 'Di a cinco personas de confianza qué estás construyendo y el tipo de cofundador que necesitas. Pide a cada una un nombre. Las presentaciones cálidas superan a la divulgación en frío en casi todos los casos.',
      joinOriginNote:
        'JoinOrigin hace localizables las comunidades, lo que expande tu red cálida con el tiempo — y cada presentación puede llevar a una sala donde ocurre la conversación real. Di a cinco personas de confianza exactamente qué tipo de cofundador necesitas.',
    },
    {
      title: 'Preséntate con constancia en las comunidades relevantes y sus salas',
      body: 'Asiste a eventos y únete a grupos donde se reúne el tipo de persona adecuado: encuentros de fundadores, comunidades de la industria, espacios de coworking y salas en línea. La repetición construye la confianza que lleva a las presentaciones.',
      joinOriginNote:
        'JoinOrigin ayuda a las personas a encontrar las comunidades que coinciden con sus objetivos — el tipo de lugar donde se conocen los fundadores — y a unirse a sus salas. Elige los encuentros y las salas donde las personas adecuadas ya se reúnen y sigue presentándote.',
    },
    {
      title: 'Ten conversaciones estructuradas iniciales',
      body: 'Pregunta por sus habilidades, tolerancia al riesgo, dedicación de tiempo y por qué quieren comenzar o hacer crecer algo. Comparte tus propias respuestas. Esta es una entrevista mutua, no un discurso de venta.',
      joinOriginNote:
        'JoinOrigin no empareja fundadores ni dirige conversaciones: la entrevista mutua es tuya. La plataforma te pone en las mismas comunidades y salas que los posibles colaboradores: el resto depende de ti.',
    },
    {
      title: 'Realiza un proyecto de prueba juntos',
      body: 'Elige algo pequeño y real — un prototipo, una página de aterrizaje o un piloto pagado — y trabajen en ello durante cuatro a seis semanas. Observa cómo dividen el trabajo, manejan los comentarios y se comportan bajo presión.',
      joinOriginNote:
        'JoinOrigin da a las comunidades una sala compartida para su trabajo y sus proyectos, un lugar natural para que surja un proyecto de prueba. Un prototipo real pequeño es la prueba más fiable.',
    },
    {
      title: 'Decide según la prueba, no según el potencial',
      body: 'Pregúntate si confiarías a esta persona tu reputación, si se comunica con honestidad y si trabajar juntos te da energía. Si la prueba se sintió tensa, confía en esa señal.',
      joinOriginNote:
        'JoinOrigin no toma la decisión por ti. Su valor honesto es el contexto de comunidad y sala que te permite conocer y trabajar con candidatos: la prueba sigue diciéndote la verdad.',
    },
    {
      title: 'Acuerda los fundamentos antes de comprometerte',
      body: 'Anota los roles, la dedicación de tiempo, el reparto de capital, la adquisición gradual de acciones y las reglas de toma de decisiones. Incluso un acuerdo simple de una página previene la mayoría de los malentendidos tempranos.',
      joinOriginNote:
        'JoinOrigin es un sistema operativo comunitario: un espacio organizado donde los acuerdos, los roles y las notas del proyecto pueden convivir junto a la sala de la idea. Incluso un acuerdo escrito de una página previene la mayoría de los malentendidos tempranos.',
    },
  ],
};

export default content;
