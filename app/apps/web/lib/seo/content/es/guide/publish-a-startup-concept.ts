import type { GuideContent } from '../../types';

/**
 * «Cómo publicar un concepto de startup» — guía L1 siempre vigente
 * (diseño §6.1, TASK-353).
 *
 * Redactada según el flujo de pantalla del producto §2 (bucle central):
 * publicar un concepto de startup → página pública de la idea → unirse
 * mediante enlace → sala creada automáticamente AL PUBLICAR → el creador
 * controla la sala → crecimiento por feed e invitaciones. La página de
 * idea es la promesa pública del concepto; la sala es donde los primeros
 * creyentes, posibles cofundadores y primeros probadores se reúnen en torno
 * a la startup. La plataforma está en marcha: publicar un concepto crea su
 * página y su sala ahora mismo. «Sala» está anclada a la sala Matrix
 * (§6.3). La frase no se usa en el texto redactado.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'publish-a-startup-concept',
  title: 'Cómo publicar un concepto de startup: página de idea + sala | JoinOrigin',
  description:
    'Publica un concepto de startup en JoinOrigin — ya sea que estés en la etapa de idea o ya tengas una empresa en marcha — escribe una página de idea pública, abre su sala automáticamente y reúne a los primeros creyentes, cofundadores y probadores en torno a la idea. Pasos prácticos de JoinOrigin.',
  intro: [
    'Toda startup — ya sea un concepto todavía sobre el papel o una empresa ya operando con clientes — necesita personas más que capital: un fundador que pueda construirla, un equipo que pueda entregarla y usuarios que la prueben. Una startup que nadie puede encontrar no reúne a ninguno de ellos. Publicar el concepto como una página de idea localizable y luego abrir una sala donde pueda ocurrir la conversación es el primer paso honesto para construir una startup — no la presentación, no el logo, no el discurso — y funciona igual de bien para una empresa existente que quiere más creyentes, cofundadores y probadores en torno a lo que está construyendo.',
    'El bucle de JoinOrigin funciona así: publicas un concepto de startup, aparece su página de idea pública y su sala se crea automáticamente en el momento de publicar. Las personas descubren la página o siguen un enlace, unirse es un solo clic y llegan a la sala: una sala Matrix controlada por el creador donde los primeros creyentes pueden hacer preguntas, los posibles cofundadores pueden probar el encaje y los primeros usuarios pueden dar comentarios. El creador es dueño de la sala desde el segundo cero y decide quién se une y qué ocurre dentro.',
    'Esta guía recorre la publicación de un concepto de startup como un operador — ya sea que el concepto sea totalmente nuevo o la empresa ya esté en marcha: comprimir el concepto en una frase, escribir la página con señales honestas, publicarla y abrir la sala, compartirla con comunidades de fundadores, invitar a los primeros creyentes y probadores, dirigir conversaciones estructuradas, usar la sala para formar un equipo de prueba y alimentar la sala hacia el feed a medida que el concepto se valida.',
  ],
  dataPoints: [
    'Un concepto de startup comprimido en una frase es más fácil de compartir, probar y dotar de personal que un plan de negocio largo.',
    'En JoinOrigin, publicar un concepto crea automáticamente su sala: la startup tiene un lugar para creyentes y probadores desde el inicio.',
    'Un enlace de unión es la invitación más simple: un enlace, un clic y una persona interesada está en la sala.',
    'JoinOrigin es un sistema operativo comunitario que ayuda a las personas a encontrar ideas y a las personas detrás de ellas: publica tu concepto y su sala se abre de inmediato.',
  ],
  faq: [
    {
      question:
        '¿En qué se diferencia un concepto de startup de una página de idea de pequeña empresa?',
      answer:
        'El formato de la página es el mismo, pero el énfasis cambia: una idea de pequeña empresa se centra en un cliente y una oferta, mientras que un concepto de startup se centra en un problema ambicioso y el equipo necesario para resolverlo. Una página de startup atrae a los primeros creyentes, posibles cofundadores y primeros probadores en lugar de a clientes locales.',
    },
    {
      question: '¿Cuándo se crea la sala de mi concepto de startup?',
      answer:
        'La sala se crea automáticamente en el momento en que publicas el concepto. El creador es dueño de la sala desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element. También puedes abrir una sala con las herramientas que ya usas e invitar a las personas que comparten la ambición.',
    },
    {
      question: '¿Quién debería unirse a la sala de un concepto de startup?',
      answer:
        'Los primeros creyentes que comparten el problema, los posibles cofundadores que prueban el encaje y los primeros usuarios dispuestos a probar una versión tosca. La sala es donde encuentras a las personas que convierten un concepto en un equipo: las mismas personas a las que las presentaciones cálidas tardarían meses en llegar.',
    },
    {
      question: '¿Qué hace que una página de concepto de startup sea buena?',
      answer:
        'Una frase honesta sobre el problema y el enfoque, la etapa del concepto y la ayuda específica que necesitas: un constructor, un diseñador, un experto del dominio, los primeros probadores. La honestidad sobre la etapa atrae a las personas adecuadas; la exageración no atrae a nadie.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a publicar un concepto de startup hoy?',
      answer:
        'Sí. Publicar un concepto en JoinOrigin crea su página y su sala de forma atómica: la sala se abre en el momento de publicar y tú la controlas desde el inicio. Publica el concepto en algún lugar público y abre una sala para el debate; cada miembro nuevo que invites amplía tu alcance.',
    },
  ],
  sections: [
    'Comprime el concepto en una frase. Reduce la startup a su núcleo: el problema, el enfoque y para quién es. Si no puedes decirlo en una frase, el concepto no está listo para publicarse. JoinOrigin está diseñado en torno a páginas de idea localizables, y un discurso de una frase es el núcleo de la página. Escribe la frase y pruébala con tres personas que entiendan el problema.',
    'Escribe la página con señales honestas. Indica el problema, el enfoque, la etapa — idea, prototipo o producto — y la ayuda específica que necesitas. La honestidad atrae a las personas adecuadas. Publicar un concepto en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el inicio. Redacta la página como una publicación pública corta e itera con comentarios.',
    'Publica el concepto y abre su sala. Publicar es el momento en que el concepto se vuelve localizable. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño. En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Publica el concepto públicamente y abre una sala para la conversación en torno a él.',
    'Comparte el concepto con comunidades de fundadores. Las startups crecen a través de las redes de fundadores. Comparte la página de idea con grupos de fundadores, comunidades de startups, aceleradoras y cualquiera que conozca el problema. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu concepto hace el trabajo.',
    'Invita a los primeros creyentes y probadores. Invita a las personas que comparten la ambición: posibles cofundadores, expertos del dominio y usuarios dispuestos a probar una versión tosca. JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    'Dirige conversaciones estructuradas en la sala. Pregunta a quienes se unen qué les entusiasma, qué les preocupa y qué harían primero. Una sala de startup es una entrevista continua: las respuestas dan forma al concepto. JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da al concepto una sala donde el interés se convierte en conocimiento, y el creador es dueño de esa sala. Dirige las conversaciones directamente en la sala.',
    'Usa la sala para formar un equipo de prueba. Cuando aparezcan las personas adecuadas, propón una pequeña prueba: un prototipo, una página de aterrizaje o una sesión de trabajo — y observa cómo trabaja el equipo. JoinOrigin da a las comunidades una sala compartida para su trabajo y sus proyectos, un lugar natural para que surja una prueba. Un prototipo real pequeño es la prueba de encaje más fiable.',
    'Alimenta la sala hacia el feed a medida que validas. Sigue publicando novedades, mantén viva la sala y deja que el impulso del concepto sea visible para una red más amplia. El feed convierte un concepto en la prueba de que a las personas les importa. En JoinOrigin, las actualizaciones de la sala fluyen hacia el feed: el bucle de crecimiento donde cada miembro nuevo amplía la superficie de descubrimiento. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Comprime el concepto en una frase',
      body: 'Reduce la startup a su núcleo: el problema, el enfoque y para quién es. Si no puedes decirlo en una frase, el concepto no está listo para publicarse.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a páginas de idea localizables, y un discurso de una frase es el núcleo de la página. Escribe la frase y pruébala con tres personas que entiendan el problema.',
    },
    {
      title: 'Escribe la página con señales honestas',
      body: 'Indica el problema, el enfoque, la etapa — idea, prototipo o producto — y la ayuda específica que necesitas. La honestidad atrae a las personas adecuadas.',
      joinOriginNote:
        'Publicar un concepto en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el inicio. Redacta la página como una publicación pública corta e itera con comentarios.',
    },
    {
      title: 'Publica el concepto y abre su sala',
      body: 'Publicar es el momento en que el concepto se vuelve localizable. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño.',
      joinOriginNote:
        'En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Publica el concepto públicamente y abre una sala para la conversación en torno a él.',
    },
    {
      title: 'Comparte el concepto con comunidades de fundadores',
      body: 'Las startups crecen a través de las redes de fundadores. Comparte la página de idea con grupos de fundadores, comunidades de startups, aceleradoras y cualquiera que conozca el problema.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu concepto hace el trabajo.',
    },
    {
      title: 'Invita a los primeros creyentes y probadores',
      body: 'Invita a las personas que comparten la ambición: posibles cofundadores, expertos del dominio y usuarios dispuestos a probar una versión tosca.',
      joinOriginNote:
        'JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    },
    {
      title: 'Dirige conversaciones estructuradas en la sala',
      body: 'Pregunta a quienes se unen qué les entusiasma, qué les preocupa y qué harían primero. Una sala de startup es una entrevista continua: las respuestas dan forma al concepto.',
      joinOriginNote:
        'JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da al concepto una sala donde el interés se convierte en conocimiento, y el creador es dueño de esa sala. Dirige las conversaciones directamente en la sala.',
    },
    {
      title: 'Usa la sala para formar un equipo de prueba',
      body: 'Cuando aparezcan las personas adecuadas, propón una pequeña prueba: un prototipo, una página de aterrizaje o una sesión de trabajo — y observa cómo trabaja el equipo.',
      joinOriginNote:
        'JoinOrigin da a las comunidades una sala compartida para su trabajo y sus proyectos, un lugar natural para que surja una prueba. Un prototipo real pequeño es la prueba de encaje más fiable.',
    },
    {
      title: 'Alimenta la sala hacia el feed a medida que validas',
      body: 'Sigue publicando novedades, mantén viva la sala y deja que el impulso del concepto sea visible para una red más amplia. El feed convierte un concepto en la prueba de que a las personas les importa.',
      joinOriginNote:
        'En JoinOrigin, las actualizaciones de la sala fluyen hacia el feed: el bucle de crecimiento donde cada miembro nuevo amplía la superficie de descubrimiento. Date a conocer y crece.',
    },
  ],
};

export default content;
