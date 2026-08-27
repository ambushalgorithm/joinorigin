import type { GuideContent } from '../../types';

/**
 * «Comunidades híbridas» — guía L1 siempre vigente (diseño §6.1, TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: la sala es lo que
 * conecta las partes en línea y (posteriormente) presenciales de una
 * comunidad híbrida: una comunidad, una sala, dos puntos de entrada. El
 * valor de JoinOrigin está tejido en la introducción y en cada paso (nota
 * `joinOriginNote` por paso), con un enfoque honesto: JoinOrigin no ofrece
 * herramientas de eventos ni gestiona eventos híbridos. Un solo H1,
 * estructura paso a paso y FAQ reflejada 1:1 en el JSON-LD `FAQPage`.
 * «Sala» está anclada a la sala Matrix (§6.3); los lugares físicos se
 * describen como lugares/espacios, nunca como «salas».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'hybrid-origins',
  title: 'Comunidades híbridas: cómo gestionar lo presencial y lo en línea juntos | JoinOrigin',
  description:
    'Gestiona una comunidad híbrida donde la sala conecta a los miembros presenciales y en línea — ya sea que estés empezando desde cero o haciendo híbrida una comunidad existente — elige las herramientas adecuadas, diseña la participación equitativa y mantén a ambas audiencias comprometidas. De JoinOrigin.',
  intro: [
    'Una comunidad híbrida reúne a las personas en dos lugares a la vez — físicamente en un espacio y virtualmente a través de una pantalla — y el verdadero reto vuelve a ser de personas: conseguir que ambas audiencias sientan que pertenecen a una sola comunidad conectada, no a dos separadas. JoinOrigin está construido precisamente con ese objetivo de conectar personas, y el modelo funciona tanto para una comunidad que ya existe como para una que apenas comienza: un grupo presencial consolidado puede añadir una mitad en línea, y una comunidad en línea puede empezar a reunirse localmente.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar, unirse y crear comunidades — de modo que un grupo híbrido tiene una sola sala que conecta las partes en línea y (posteriormente) presenciales: los miembros locales y remotos ven la misma comunidad, el mismo ritmo y los mismos siguientes pasos. En el modelo digital conectar→unirse→sala, la sala es la superficie persistente donde viven ambas mitades de la comunidad entre reuniones; el evento presencial es una consecuencia posterior que la sala mantiene unida antes y después. JoinOrigin no ofrece herramientas de eventos ni gestiona eventos híbridos: la plataforma da a cualquier comunidad — híbrida incluida — una sola sala donde sus miembros se mantienen conectados.',
    'Esta guía cubre las decisiones prácticas que hacen que las comunidades híbridas tengan éxito — tanto para grupos nuevos como para los existentes: decidir si el modelo híbrido es el adecuado, construir la sala que ambas audiencias comparten, elegir un formato y herramientas que encajen, diseñar la reunión para que los miembros presenciales y en línea compartan la misma experiencia, gestionar el espacio para que ningún lado domine y mantener una sala persistente que mantenga unida a la comunidad entre reuniones. Cada paso muestra dónde ayuda JoinOrigin.',
  ],
  dataPoints: [
    'Una comunidad híbrida es una comunidad con dos puntos de entrada, no dos audiencias a las que atender por separado.',
    'La sala es el tejido conectivo: un lugar compartido donde ambas audiencias ven las mismas novedades, notas y siguientes pasos.',
    'Las herramientas simples y fiables — un enlace de video, un documento compartido — reducen la fricción que mata las reuniones híbridas.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar o crear comunidades; no ofrece herramientas de eventos ni gestiona eventos híbridos.',
  ],
  faq: [
    {
      question: '¿Cuándo debería una comunidad volverse híbrida?',
      answer:
        'Cuando parte de tu audiencia no puede asistir presencialmente de forma fiable — por distancia, horario o movilidad — y la comunidad aún quiere una identidad compartida. Si todos pueden reunirse localmente, reunirse en persona es más simple y a menudo mejor.',
    },
    {
      question: '¿Cuál es la configuración mínima de herramientas para una reunión híbrida?',
      answer:
        'Un enlace de videollamada para los miembros remotos, un documento compartido para las notas y una sala donde ambas audiencias se mantengan conectadas entre reuniones. Más herramientas añaden más puntos de fallo; empieza mínimo y añade solo lo que la comunidad pida.',
    },
    {
      question: '¿Cómo evito que los miembros remotos se sientan espectadores?',
      answer:
        'Diseña para la participación equitativa: haz una ronda de presentación híbrida, llama explícitamente a los miembros remotos, comparte la pantalla para cualquier contenido visual y usa un documento compartido donde ambos lados puedan escribir. Asigna a una persona que observe continuamente el lado remoto.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a gestionar una comunidad híbrida?',
      answer:
        'Sí. JoinOrigin ayuda a las personas a encontrar y crear comunidades: una sala donde los miembros locales y remotos se mantienen conectados. JoinOrigin no ofrece herramientas de eventos, por lo que las prácticas híbridas prácticas de esta guía funcionan con las herramientas que ya tienes.',
    },
  ],
  sections: [
    'Decide si el modelo híbrido es el adecuado. Ve híbrido cuando tenga sentido reunirse en persona. Si la mayoría de los miembros puede reunirse localmente, reunirse en persona fortalece el vínculo: el híbrido permite que la confianza se construya más rápido y que se lea mejor a las personas. JoinOrigin está diseñado para ayudar a cualquier comunidad a encontrar y conservar miembros, pero la decisión del formato es tuya. Ve híbrido solo cuando tenga sentido reunirse en persona.',
    'Construye la sala que conecta a ambas audiencias. Antes que nada, asegúrate de que la comunidad tenga una sala compartida donde los miembros remotos y locales hablen, compartan novedades y vean los mismos siguientes pasos. La sala es lo que hace que lo híbrido se sienta como una comunidad y no como dos. En JoinOrigin, todo grupo tiene una sala desde la publicación: la superficie persistente que mantiene unidas las partes en línea y presenciales. Configura una sala compartida a la que ambas audiencias puedan unirse.',
    'Elige una herramienta de video fiable y un documento compartido. Mantén el conjunto mínimo: un enlace de videollamada para los miembros remotos, un documento para notas y enlaces compartidos y una entrada de calendario. La complejidad es la enemiga de las reuniones híbridas constantes. JoinOrigin no ofrece herramientas de eventos: mantén el conjunto mínimo. La plataforma es la sala persistente donde viven el enlace y el documento, no la herramienta de eventos en sí.',
    'Diseña la agenda para dos audiencias. Haz una ronda de presentación que incluya a los miembros remotos por su nombre, mantén los contenidos visuales en una pantalla compartida y deja espacio para que hable el lado en línea. Una agenda híbrida nombra explícitamente a ambas audiencias. En JoinOrigin, ambas audiencias comparten una sala de comunidad, lo que hace que «diseñar para dos audiencias» encaje de forma natural. Nombra explícitamente a ambas audiencias en la agenda.',
    'Asigna una persona puente. Una persona observa el lado remoto: saluda a quienes llegan tarde, da la palabra a las manos remotas y transmite lo que el espacio presencial pierde. Sin un puente, la audiencia en línea se convierte en espectadora. JoinOrigin no gestiona eventos: la persona puente es un rol humano. La plataforma mantiene la comunidad organizada en una sala para que el puente tenga un lugar donde ver quién se unió y qué se compartió.',
    'Gestiona el espacio para que ambos lados participen. Pide a los miembros presenciales que hablen de uno en uno y repitan las preguntas para el micrófono, sienta a las personas cerca de la cámara y alterna los turnos entre el espacio y la llamada — con la sala compartida abierta para ambos. JoinOrigin está diseñado en torno a la conexión equitativa entre miembros: el mismo principio que hace funcionar el debate híbrido. Alterna los turnos entre el espacio y la llamada y repite las preguntas para el micrófono.',
    'Mantén la sala viva entre reuniones. La comunidad vive en la sala entre eventos: los miembros remotos y locales comparten novedades, hacen preguntas y planifican juntos allí. Lo híbrido no es un formato de evento: es un espacio compartido continuo. Este es el paso más cercano a la intención de diseño de JoinOrigin: un sistema operativo comunitario es una sala persistente donde los miembros remotos y locales comparten novedades y planifican juntos. Una sala compartida funciona: JoinOrigin es ese espacio.',
    'Captura y comparte los resultados en la sala. Publica notas, grabaciones y siguientes pasos en la sala compartida después de cada reunión. Un artefacto visible mantiene conectadas a ambas audiencias y hace que la comunidad se sienta productiva. En JoinOrigin, los resultados de una comunidad viven en una sala organizada: notas, grabaciones, siguientes pasos. Publícalos en la sala compartida después de cada reunión.',
  ],
  steps: [
    {
      title: 'Decide si el modelo híbrido es el adecuado',
      body: 'Ve híbrido cuando tenga sentido reunirse en persona. Si la mayoría de los miembros puede reunirse localmente, reunirse en persona fortalece el vínculo: el híbrido permite que la confianza se construya más rápido y que se lea mejor a las personas.',
      joinOriginNote:
        'JoinOrigin está diseñado para ayudar a cualquier comunidad a encontrar y conservar miembros, pero la decisión del formato es tuya. Ve híbrido solo cuando tenga sentido reunirse en persona.',
    },
    {
      title: 'Construye la sala que conecta a ambas audiencias',
      body: 'Antes que nada, asegúrate de que la comunidad tenga una sala compartida donde los miembros remotos y locales hablen, compartan novedades y vean los mismos siguientes pasos. La sala es lo que hace que lo híbrido se sienta como una comunidad y no como dos.',
      joinOriginNote:
        'En JoinOrigin, todo grupo tiene una sala desde la publicación: la superficie persistente que mantiene unidas las partes en línea y presenciales. Configura una sala compartida a la que ambas audiencias puedan unirse.',
    },
    {
      title: 'Elige una herramienta de video fiable y un documento compartido',
      body: 'Mantén el conjunto mínimo: un enlace de videollamada para los miembros remotos, un documento para notas y enlaces compartidos y una entrada de calendario. La complejidad es la enemiga de las reuniones híbridas constantes.',
      joinOriginNote:
        'JoinOrigin no ofrece herramientas de eventos: mantén el conjunto mínimo. La plataforma es la sala persistente donde viven el enlace y el documento, no la herramienta de eventos en sí.',
    },
    {
      title: 'Diseña la agenda para dos audiencias',
      body: 'Haz una ronda de presentación que incluya a los miembros remotos por su nombre, mantén los contenidos visuales en una pantalla compartida y deja espacio para que hable el lado en línea. Una agenda híbrida nombra explícitamente a ambas audiencias.',
      joinOriginNote:
        'En JoinOrigin, ambas audiencias comparten una sala de comunidad, lo que hace que «diseñar para dos audiencias» encaje de forma natural. Nombra explícitamente a ambas audiencias en la agenda.',
    },
    {
      title: 'Asigna una persona puente',
      body: 'Una persona observa el lado remoto: saluda a quienes llegan tarde, da la palabra a las manos remotas y transmite lo que el espacio presencial pierde. Sin un puente, la audiencia en línea se convierte en espectadora.',
      joinOriginNote:
        'JoinOrigin no gestiona eventos: la persona puente es un rol humano. La plataforma mantiene la comunidad organizada en una sala para que el puente tenga un lugar donde ver quién se unió y qué se compartió.',
    },
    {
      title: 'Gestiona el espacio para que ambos lados participen',
      body: 'Pide a los miembros presenciales que hablen de uno en uno y repitan las preguntas para el micrófono, sienta a las personas cerca de la cámara y alterna los turnos entre el espacio y la llamada — con la sala compartida abierta para ambos.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a la conexión equitativa entre miembros: el mismo principio que hace funcionar el debate híbrido. Alterna los turnos entre el espacio y la llamada y repite las preguntas para el micrófono.',
    },
    {
      title: 'Mantén la sala viva entre reuniones',
      body: 'La comunidad vive en la sala entre eventos: los miembros remotos y locales comparten novedades, hacen preguntas y planifican juntos allí. Lo híbrido no es un formato de evento: es un espacio compartido continuo.',
      joinOriginNote:
        'Este es el paso más cercano a la intención de diseño de JoinOrigin: un sistema operativo comunitario es una sala persistente donde los miembros remotos y locales comparten novedades y planifican juntos. Una sala compartida funciona: JoinOrigin es ese espacio.',
    },
    {
      title: 'Captura y comparte los resultados en la sala',
      body: 'Publica notas, grabaciones y siguientes pasos en la sala compartida después de cada reunión. Un artefacto visible mantiene conectadas a ambas audiencias y hace que la comunidad se sienta productiva.',
      joinOriginNote:
        'En JoinOrigin, los resultados de una comunidad viven en una sala organizada: notas, grabaciones, siguientes pasos. Publícalos en la sala compartida después de cada reunión.',
    },
  ],
};

export default content;
