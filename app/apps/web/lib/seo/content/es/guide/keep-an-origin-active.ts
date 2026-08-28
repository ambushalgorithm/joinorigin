import type { GuideContent } from '../../types';

/**
 * «Cómo mantener activa una comunidad» — guía L1 siempre vigente
 * (diseño §6.1, TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: la sala y su
 * actividad (que alimenta el feed) son la superficie de retención — la
 * comunidad vive en la sala entre reuniones, y los eventos presenciales son
 * una consecuencia posterior. El valor de JoinOrigin está tejido en la
 * introducción y en cada paso (nota `joinOriginNote` por paso), con un
 * enfoque honesto: JoinOrigin no gestiona comunidades ni organiza eventos.
 * Un solo H1, estructura paso a paso y FAQ reflejada 1:1 en el JSON-LD
 * `FAQPage`. «Sala» está anclada a la sala Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'keep-an-origin-active',
  title: 'Cómo mantener activo y comprometido un Origin | JoinOrigin',
  description:
    'Mantén activo tu Origin — ya sea que sea nuevo y esté encontrando su ritmo o consolidado y a la deriva — usa la sala y su feed como superficie de retención, construye rituales, comparte la carga del organizador y crea pequeños caminos de contribución. Pasos prácticos de JoinOrigin.',
  intro: [
    'La mayoría de las comunidades no muere por un mal lanzamiento; muere por el silencio: el momento en que las personas dejan de sentirse conectadas y se van en silencio. Mantener activa una comunidad es, por tanto, un problema de conectar personas: las personas se quedan cuando sienten que pertenecen, y sienten que pertenecen cuando hay un lugar visible y organizado donde la comunidad vive. Eso es exactamente lo que es JoinOrigin — y las mismas mecánicas se aplican tanto si la comunidad tiene unas semanas y sigue encontrando su ritmo como si tiene años y se está deslizando hacia el silencio.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar, crear y organizar Origins — y en su modelo digital la sala es la superficie de retención: una sala Matrix controlada por el creador donde los rituales, las novedades y las contribuciones permanecen visibles, y cuya actividad fluye hacia el feed que mantiene conectados a los miembros entre reuniones. Los eventos presenciales siguen siendo una consecuencia posterior de una comunidad formada, nunca el núcleo: la sala y su feed son lo que mantiene viva a la comunidad día a día. JoinOrigin no gestiona comunidades ni organiza eventos: la plataforma mantiene conectadas a las comunidades entre reuniones, y la organización es tuya.',
    'Esta guía cubre las mecánicas prácticas de una comunidad sana y activa — desde las primeras semanas tras el lanzamiento hasta una comunidad que lleva años funcionando: establecer rituales que conviertan la participación en hábito, crear artefactos compartidos en la sala, distribuir la carga del organizador para que ninguna persona se agote, abrir pequeños caminos de contribución para que cada miembro pueda aportar valor y medir las señales que te dicen si la comunidad está realmente viva. Cada paso se corresponde con cómo ayuda JoinOrigin.',
  ],
  dataPoints: [
    'Los rituales recurrentes — un ritmo fijo de sala, un formato regular, un artefacto compartido — convierten el interés en hábito.',
    'La actividad de la sala entre reuniones es lo que mantiene a los miembros conectados; el silencio es lo que los aleja.',
    'Los pequeños caminos de contribución (una nota fijada, un anfitrión rotativo, un foco de miembro) hacen que los miembros sientan propiedad.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar, crear y organizar Origins; no gestiona comunidades ni organiza eventos.',
  ],
  faq: [
    {
      question: '¿Con qué frecuencia debería reunirse una comunidad activa?',
      answer:
        'Lo mensual es la base más sostenible para las reuniones presenciales; la sala debería estar activa semanalmente — puntos de control, novedades y pequeñas conversaciones. La constancia importa más que la frecuencia: un ritmo semanal fiable de sala supera a uno esporádico.',
    },
    {
      question: '¿Qué hago cuando baja el compromiso?',
      answer:
        'No entres en pánico ni lances una gran campaña. Pregunta directamente a los miembros qué necesitan, publica una pregunta simple en la sala, haz una reunión más pequeña y simple y delega un rol en un miembro. Los cambios pequeños y receptivos reavivan el compromiso más rápido que el volumen.',
    },
    {
      question: '¿Cómo mantengo a los miembros comprometidos entre reuniones?',
      answer:
        'Crea puntos de contacto de bajo esfuerzo en la sala: un documento compartido, un foco de miembro, un hilo de control regular o una novedad de «quién trabaja en qué». El objetivo es un latido visible en la sala y su feed, no notificaciones constantes.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a mantener activo mi Origin?',
      answer:
        'Sí. JoinOrigin ayuda a las personas a encontrar, crear y organizar Origins: una sala y un feed donde la comunidad permanece visible entre reuniones. Las prácticas de esta guía — rituales, roles compartidos y pequeñas contribuciones — funcionan en la plataforma y con las herramientas que ya tienes.',
    },
  ],
  sections: [
    'Define un ritual central. Elige una práctica recurrente en la que todos puedan confiar: una reunión mensual, un punto de control semanal, una lectura compartida o una novedad de proyecto. Los rituales crean el latido que mantiene viva a una comunidad — y en una comunidad digital primero, el ritual ocurre en la sala. En JoinOrigin, el ritmo de una comunidad es visible en una sala organizada: los miembros siempre saben cuál es el siguiente ritual. Elige una práctica recurrente y protégela.',
    'Crea un artefacto compartido en la sala. Inicia una nota fijada o un documento que capture lo que hace la comunidad: notas de reunión, presentaciones de miembros, novedades de proyectos. Un artefacto vivo mantiene orientados a los miembros entre reuniones. JoinOrigin es la sala compartida donde las notas, las presentaciones y las novedades viven junto a la comunidad: un artefacto vivo por diseño. Fija un documento compartido simple en la sala.',
    'Distribuye la carga del organizador. Recluta a dos o tres coanfitriones o ayudantes y rota pequeños roles: dar la bienvenida, tomar notas, elegir temas, contactar el espacio. La propiedad compartida es la mejor defensa contra el agotamiento. JoinOrigin no gestiona ni organiza comunidades: la propiedad compartida es tuya para construirla. La plataforma da a los ayudantes y organizadores una sala donde coordinarse. Recluta a dos o tres coanfitriones y rota los roles.',
    'Abre pequeños caminos de contribución. Da a los miembros formas de aportar valor sin grandes compromisos: un foco de miembro, un líder de debate rotativo, una lista de reproducción o lectura compartida o una sección fijada de «se busca ayuda» en la sala. En JoinOrigin, los miembros tienen formas visibles de contribuir: una comunidad donde aportar valor es fácil. Los focos de miembro y los líderes rotativos crean la misma propiedad.',
    'Mantén un ritmo de comunicación predecible en la sala. Envía una novedad corta cada semana o cada mes con un calendario fijo, publicada en la sala y fluyendo hacia el feed. La previsibilidad construye confianza; el silencio construye distancia. JoinOrigin mantiene el latido de la comunidad en una sala: una novedad, con un calendario, donde todos pueden verla. Una novedad semanal corta construye confianza.',
    'Observa las señales de compromiso. Haz seguimiento de la actividad de la sala, la asistencia repetida y la tasa de contribución. Una comunidad sana hace crecer su tasa de repetición antes que su tamaño total: concéntrate en los miembros que vuelven a la sala. En JoinOrigin, los organizadores pueden ver cómo está su comunidad en una sala y un feed organizados. Haz seguimiento de la actividad, la asistencia repetida y la tasa de contribución con una hoja simple.',
    'Pide comentarios con regularidad en la sala. Usa una encuesta simple de una pregunta después de cada reunión: qué te gustó, qué cambiarías. Actúa sobre las respuestas y dile a la comunidad qué cambiaste. JoinOrigin recopila y conserva los comentarios junto a la comunidad a la que pertenecen: en la sala. Una encuesta de una pregunta después de cada reunión funciona — luego actúa sobre las respuestas.',
    'Adapta el formato a medida que la comunidad madura. Lo que funcionó para diez miembros puede no encajar con cincuenta. Revisa el formato, el espacio y la cadencia trimestralmente y evoluciona deliberadamente en lugar de aferrarte por costumbre. JoinOrigin ayuda a las comunidades a evolucionar: una sala donde los cambios de formato y los anuncios llegan a todos. Revisa tu formato y tu espacio trimestralmente, a propósito.',
  ],
  steps: [
    {
      title: 'Define un ritual central',
      body: 'Elige una práctica recurrente en la que todos puedan confiar: una reunión mensual, un punto de control semanal, una lectura compartida o una novedad de proyecto. Los rituales crean el latido que mantiene viva a una comunidad — y en una comunidad digital primero, el ritual ocurre en la sala.',
      joinOriginNote:
        'En JoinOrigin, el ritmo de una comunidad es visible en una sala organizada: los miembros siempre saben cuál es el siguiente ritual. Elige una práctica recurrente y protégela.',
    },
    {
      title: 'Crea un artefacto compartido en la sala',
      body: 'Inicia una nota fijada o un documento que capture lo que hace la comunidad: notas de reunión, presentaciones de miembros, novedades de proyectos. Un artefacto vivo mantiene orientados a los miembros entre reuniones.',
      joinOriginNote:
        'JoinOrigin es la sala compartida donde las notas, las presentaciones y las novedades viven junto a la comunidad: un artefacto vivo por diseño. Fija un documento compartido simple en la sala.',
    },
    {
      title: 'Distribuye la carga del organizador',
      body: 'Recluta a dos o tres coanfitriones o ayudantes y rota pequeños roles: dar la bienvenida, tomar notas, elegir temas, contactar el espacio. La propiedad compartida es la mejor defensa contra el agotamiento.',
      joinOriginNote:
        'JoinOrigin no gestiona ni organiza comunidades: la propiedad compartida es tuya para construirla. La plataforma da a los ayudantes y organizadores una sala donde coordinarse. Recluta a dos o tres coanfitriones y rota los roles.',
    },
    {
      title: 'Abre pequeños caminos de contribución',
      body: 'Da a los miembros formas de aportar valor sin grandes compromisos: un foco de miembro, un líder de debate rotativo, una lista de reproducción o lectura compartida o una sección fijada de «se busca ayuda» en la sala.',
      joinOriginNote:
        'En JoinOrigin, los miembros tienen formas visibles de contribuir: una comunidad donde aportar valor es fácil. Los focos de miembro y los líderes rotativos crean la misma propiedad.',
    },
    {
      title: 'Mantén un ritmo de comunicación predecible en la sala',
      body: 'Envía una novedad corta cada semana o cada mes con un calendario fijo, publicada en la sala y fluyendo hacia el feed. La previsibilidad construye confianza; el silencio construye distancia.',
      joinOriginNote:
        'JoinOrigin mantiene el latido de la comunidad en una sala: una novedad, con un calendario, donde todos pueden verla. Una novedad semanal corta construye confianza.',
    },
    {
      title: 'Observa las señales de compromiso',
      body: 'Haz seguimiento de la actividad de la sala, la asistencia repetida y la tasa de contribución. Una comunidad sana hace crecer su tasa de repetición antes que su tamaño total: concéntrate en los miembros que vuelven a la sala.',
      joinOriginNote:
        'En JoinOrigin, los organizadores pueden ver cómo está su comunidad en una sala y un feed organizados. Haz seguimiento de la actividad, la asistencia repetida y la tasa de contribución con una hoja simple.',
    },
    {
      title: 'Pide comentarios con regularidad en la sala',
      body: 'Usa una encuesta simple de una pregunta después de cada reunión: qué te gustó, qué cambiarías. Actúa sobre las respuestas y dile a la comunidad qué cambiaste.',
      joinOriginNote:
        'JoinOrigin recopila y conserva los comentarios junto a la comunidad a la que pertenecen: en la sala. Una encuesta de una pregunta después de cada reunión funciona — luego actúa sobre las respuestas.',
    },
    {
      title: 'Adapta el formato a medida que la comunidad madura',
      body: 'Lo que funcionó para diez miembros puede no encajar con cincuenta. Revisa el formato, el espacio y la cadencia trimestralmente y evoluciona deliberadamente en lugar de aferrarte por costumbre.',
      joinOriginNote:
        'JoinOrigin ayuda a las comunidades a evolucionar: una sala donde los cambios de formato y los anuncios llegan a todos. Revisa tu formato y tu espacio trimestralmente, a propósito.',
    },
  ],
};

export default content;
