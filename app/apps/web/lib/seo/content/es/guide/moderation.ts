import type { GuideContent } from '../../types';

/**
 * «Moderación de la comunidad» — guía L1 siempre vigente (diseño §6.1,
 * TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: el control del
 * creador ES la propiedad de la sala Matrix — invitar/eliminar miembros,
 * asignar roles, editar la configuración de la sala, fijar mensajes y
 * archivar la sala — aplicado de forma nativa en Element. El valor de
 * JoinOrigin está tejido en la introducción y en cada paso (nota
 * `joinOriginNote` por paso), con un enfoque honesto: JoinOrigin no modera
 * comunidades de terceros ni ofrece personal de moderación. Un solo H1,
 * estructura paso a paso y FAQ reflejada 1:1 en el JSON-LD `FAQPage`.
 * «Sala» está anclada a la sala Matrix (§6.3); los espacios privados o de
 * incidentes se describen como salas/MD, nunca como «canales».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'moderation',
  title: 'Moderación de Origins: cómo mantener grupos sanos y acogedores | JoinOrigin',
  description:
    'Modera una comunidad con reglas claras, acción temprana y desescalada — ya sea que estés configurando un grupo totalmente nuevo o arreglando la cultura de uno consolidado — el control del creador es la propiedad de la sala Matrix, con roles aplicados en Element. Pasos prácticos de JoinOrigin.',
  intro: [
    'Toda comunidad que crece acabará enfrentando un momento que pone a prueba su cultura: una discusión acalorada, un spammer, un miembro que incomoda a otros o un malentendido que escala. La moderación es la práctica de proteger el espacio para que la comunidad pueda seguir siendo acogedora, y solo se vuelve necesaria porque las comunidades están hechas de personas que se conectan entre sí. Esa conexión es el problema central con el que JoinOrigin ayuda — y las prácticas se aplican tanto a una comunidad consolidada que arregla su cultura como a un grupo nuevo que fija expectativas antes de que llegue el primer miembro.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar, crear y organizar Origins — y en su modelo digital, una comunidad vive en una sala controlada por el creador. El control del creador es la propiedad estándar de la sala Matrix: el creador puede invitar y eliminar miembros, asignar roles, editar la configuración de la sala, fijar mensajes y archivar la sala — todo aplicado de forma nativa dentro de Element, el cliente de chat por defecto, sin un sistema de permisos personalizado. Esa propiedad es la columna vertebral de la moderación en JoinOrigin: el creador decide quién pertenece, cuáles son las reglas y qué ocurre cuando se rompe una regla. JoinOrigin no modera comunidades de terceros ni ofrece personal de moderación. La plataforma está diseñada en torno a una estructura comunitaria sana, y las prácticas de esta guía son las prácticas humanas que todo organizador necesita.',
    'Esta guía expone un sistema de moderación práctico — ya sea que tu Origin sea totalmente nuevo o tenga años de historia que limpiar: reglas comunitarias escritas, cortas y específicas, un camino de aplicación claro con advertencias antes de las expulsiones, técnicas para desescalar situaciones tensas y consejo honesto sobre cuándo involucrar a los miembros y cuándo actuar solo. Cada paso muestra dónde ayuda JoinOrigin.',
  ],
  dataPoints: [
    'Las reglas comunitarias claras y escritas reducen los conflictos al fijar expectativas antes de que ocurran los incidentes.',
    'El control del creador en JoinOrigin es la propiedad de la sala Matrix: invitar/eliminar, roles, configuración, fijar y archivar.',
    'Un camino de aplicación por etapas — advertir, luego limitar, luego eliminar — es más justo y más fácil de defender que las expulsiones instantáneas.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar, crear y organizar Origins; no modera comunidades de terceros ni ofrece personal de moderación.',
  ],
  faq: [
    {
      question: '¿Las comunidades pequeñas realmente necesitan reglas de moderación?',
      answer:
        'Sí, y cuanto antes, mejor. Dos o tres reglas cortas escritas antes de que ocurra un conflicto son mucho más fáciles de aplicar que reglas inventadas después de uno. Las comunidades pequeñas tienen menos incidentes, pero los que tienen son igual de dolorosos.',
    },
    {
      question: '¿Deben los moderadores actuar en público o en privado?',
      answer:
        'En privado primero. Contacta uno a uno, replantea la regla y el impacto, y da a la persona la oportunidad de ajustarse. Las llamadas públicas tienden a escalar. Mantén un registro público de las reglas, pero aplícalas en privado: en un mensaje directo o en una sala privada.',
    },
    {
      question: '¿Cuándo debería eliminar a alguien de la comunidad?',
      answer:
        'Después de que las advertencias claras no hayan funcionado, o de inmediato ante comportamientos que pongan en peligro a los miembros: acoso, amenazas o doxing. La prueba es si la persona está haciendo activamente que el espacio sea inseguro para otros. En JoinOrigin, la eliminación es el propietario de la sala eliminando a un miembro de la sala.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a moderar mi Origin?',
      answer:
        'Sí. JoinOrigin es un sistema operativo comunitario donde el control del creador es la propiedad de la sala Matrix: invitar/eliminar, roles, configuración, fijar y archivar, aplicados en Element. JoinOrigin no modera comunidades, por lo que las prácticas de esta guía — reglas claras, aplicación por etapas y desescalada tranquila — son tuyas para aplicarlas.',
    },
  ],
  sections: [
    'Escribe de tres a cinco reglas claras. Mantenlas cortas, específicas y positivas: «Sé respetuoso», «Mantente en el tema», «Sin spam ni autopromoción», «Discrepa con las ideas, no con las personas». Publícalas donde cada miembro nuevo las vea: idealmente fijadas en la sala. En JoinOrigin, las reglas y los valores de una comunidad son visibles en su sala desde el primer día: los miembros nuevos las ven antes de unirse. Fija tus reglas cortas donde cada miembro nuevo las vea.',
    'Marca el tono como propietario de la sala. Modela el comportamiento que quieres: da la bienvenida a los nuevos, agradece a quienes contribuyen y aborda los problemas con calma. El ejemplo del creador fija el piso cultural de la comunidad. JoinOrigin no vigila las comunidades: el tono lo fijan los creadores y los miembros. La plataforma hace visible el comportamiento acogedor; modela el comportamiento que quieres en la sala.',
    'Es dueño de la sala como el creador que eres. El control del creador en JoinOrigin es la propiedad de la sala Matrix: invitar y eliminar miembros, asignar roles, editar la configuración de la sala, fijar mensajes y archivar la sala — aplicado de forma nativa en Element. Conocer estos controles es la mitad técnica de la moderación. JoinOrigin da al creador la propiedad total de la sala desde la publicación, sin un sistema de permisos personalizado. Aprende los controles de moderación de la plataforma que uses y designa a un propietario claro.',
    'Acuerda un camino de aplicación. Define una respuesta por etapas: advertencia privada, luego límites (silenciado, publicación limitada — a menudo un cambio de rol) y luego la eliminación por violaciones repetidas o graves. La escalada constante es más justa que la improvisación. En JoinOrigin, los roles son roles Matrix estándar en Element: silenciar, expulsar y asignar roles son acciones nativas. Escribe el camino de aplicación y mantente en él.',
    'Actúa temprano y con calma. Aborda el primer signo de un problema en privado, antes de que se convierta en un incidente público. La intervención temprana y tranquila es la moderación más barata que existe. JoinOrigin no modera por ti: la intervención temprana y tranquila es una habilidad humana. La plataforma está diseñada para que los problemas salgan a la luz de forma visible en la sala y se detecten temprano. Contacta en privado ante el primer signo.',
    'Aprende técnicas de desescalada. Cuando suban las tensiones, ralentiza la conversación: reconoce el sentimiento, replantea el desacuerdo de forma neutral, pide el punto subyacente y sugiere una pausa o una sala privada para el calor. JoinOrigin mantiene las interacciones de la comunidad organizadas y tranquilas por diseño, pero la desescalada sigue siendo un oficio humano. Ralentiza la conversación y lleva el calor a una sala privada.',
    'Lleva un registro de los incidentes importantes. Anota qué ocurrió, qué hiciste y por qué. Un registro simple te ayuda a mantenerte constante, a aprender de los patrones y a defender las decisiones cuando un miembro pregunta por qué. JoinOrigin es un sistema operativo comunitario donde la historia de la comunidad vive en un solo lugar: un hogar natural para un registro de incidentes. Una nota simple de qué ocurrió y por qué te mantiene constante.',
    'Comparte la carga con co-moderadores. Recluta a uno o dos miembros de confianza y acuerden las reglas de aplicación. Una comunidad que depende de un solo moderador se vuelve frágil y sesgada. JoinOrigin no ofrece personal de moderación: los co-moderadores son otros miembros. Los creadores asignan roles a los co-moderadores en Element: roles Matrix nativos, sin sistema personalizado. Recluta a uno o dos miembros de confianza y dales roles claros.',
  ],
  steps: [
    {
      title: 'Escribe de tres a cinco reglas claras',
      body: 'Mantenlas cortas, específicas y positivas: «Sé respetuoso», «Mantente en el tema», «Sin spam ni autopromoción», «Discrepa con las ideas, no con las personas». Publícalas donde cada miembro nuevo las vea: idealmente fijadas en la sala.',
      joinOriginNote:
        'En JoinOrigin, las reglas y los valores de una comunidad son visibles en su sala desde el primer día: los miembros nuevos las ven antes de unirse. Fija tus reglas cortas donde cada miembro nuevo las vea.',
    },
    {
      title: 'Marca el tono como propietario de la sala',
      body: 'Modela el comportamiento que quieres: da la bienvenida a los nuevos, agradece a quienes contribuyen y aborda los problemas con calma. El ejemplo del creador fija el piso cultural de la comunidad.',
      joinOriginNote:
        'JoinOrigin no vigila las comunidades: el tono lo fijan los creadores y los miembros. La plataforma hace visible el comportamiento acogedor; modela el comportamiento que quieres en la sala.',
    },
    {
      title: 'Es dueño de la sala como el creador que eres',
      body: 'El control del creador en JoinOrigin es la propiedad de la sala Matrix: invitar y eliminar miembros, asignar roles, editar la configuración de la sala, fijar mensajes y archivar la sala — aplicado de forma nativa en Element. Conocer estos controles es la mitad técnica de la moderación.',
      joinOriginNote:
        'JoinOrigin da al creador la propiedad total de la sala desde la publicación, sin un sistema de permisos personalizado. Aprende los controles de moderación de la plataforma que uses y designa a un propietario claro.',
    },
    {
      title: 'Acuerda un camino de aplicación',
      body: 'Define una respuesta por etapas: advertencia privada, luego límites (silenciado, publicación limitada — a menudo un cambio de rol) y luego la eliminación por violaciones repetidas o graves. La escalada constante es más justa que la improvisación.',
      joinOriginNote:
        'En JoinOrigin, los roles son roles Matrix estándar en Element: silenciar, expulsar y asignar roles son acciones nativas. Escribe el camino de aplicación y mantente en él.',
    },
    {
      title: 'Actúa temprano y con calma',
      body: 'Aborda el primer signo de un problema en privado, antes de que se convierta en un incidente público. La intervención temprana y tranquila es la moderación más barata que existe.',
      joinOriginNote:
        'JoinOrigin no modera por ti: la intervención temprana y tranquila es una habilidad humana. La plataforma está diseñada para que los problemas salgan a la luz de forma visible en la sala y se detecten temprano. Contacta en privado ante el primer signo.',
    },
    {
      title: 'Aprende técnicas de desescalada',
      body: 'Cuando suban las tensiones, ralentiza la conversación: reconoce el sentimiento, replantea el desacuerdo de forma neutral, pide el punto subyacente y sugiere una pausa o una sala privada para el calor.',
      joinOriginNote:
        'JoinOrigin mantiene las interacciones de la comunidad organizadas y tranquilas por diseño, pero la desescalada sigue siendo un oficio humano. Ralentiza la conversación y lleva el calor a una sala privada.',
    },
    {
      title: 'Lleva un registro de los incidentes importantes',
      body: 'Anota qué ocurrió, qué hiciste y por qué. Un registro simple te ayuda a mantenerte constante, a aprender de los patrones y a defender las decisiones cuando un miembro pregunta por qué.',
      joinOriginNote:
        'JoinOrigin es un sistema operativo comunitario donde la historia de la comunidad vive en un solo lugar: un hogar natural para un registro de incidentes. Una nota simple de qué ocurrió y por qué te mantiene constante.',
    },
    {
      title: 'Comparte la carga con co-moderadores',
      body: 'Recluta a uno o dos miembros de confianza y acuerden las reglas de aplicación. Una comunidad que depende de un solo moderador se vuelve frágil y sesgada.',
      joinOriginNote:
        'JoinOrigin no ofrece personal de moderación: los co-moderadores son otros miembros. Los creadores asignan roles a los co-moderadores en Element: roles Matrix nativos, sin sistema personalizado. Recluta a uno o dos miembros de confianza y dales roles claros.',
    },
  ],
};

export default content;
