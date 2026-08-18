import type { GuideContent } from '../../types';

/**
 * «Cómo crear un proyecto» — guía L1 siempre vigente (diseño §6.1, TASK-353).
 *
 * Redactada según el flujo de pantalla del producto §2 (bucle central): un
 * grupo ya formado pasa de la conversación al trabajo compartido publicando
 * un proyecto; la página del proyecto es pública, su sala se crea
 * automáticamente AL PUBLICAR, el creador controla la sala y el progreso
 * fluye hacia el feed. La plataforma está en marcha: publicar un proyecto
 * abre su página y su sala ahora mismo. «Sala» está anclada a la sala Matrix
 * (§6.3). La frase no se usa en el texto redactado.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'create-a-project',
  title:
    'Cómo crear un proyecto: convierte el impulso de un grupo en trabajo compartido | JoinOrigin',
  description:
    'Crea un proyecto en JoinOrigin — ya sea una idea totalmente nueva o un trabajo que ya está en marcha — publica una página de proyecto compartida, abre su sala automáticamente y convierte la conversación de un grupo en trabajo que se entrega. Pasos prácticos de JoinOrigin.',
  intro: [
    'Un grupo que solo habla termina por estancarse. La diferencia entre una comunidad que se siente viva y una que se desvanece es el trabajo compartido: un proyecto con nombre, objetivo y un lugar donde el progreso sea visible. Convertir una conversación en un proyecto también es un problema de conectar personas: necesitas a las personas adecuadas, el compromiso adecuado y un lugar claro para trabajar juntos. Lo mismo ocurre cuando el proyecto ya existe — disperso entre archivos, mensajes y la lista de tareas de una sola persona —: sigue necesitando un hogar visible y a las personas adecuadas a su alrededor.',
    'El flujo de JoinOrigin resuelve ese movimiento: un grupo ya formado publica un proyecto y la página del proyecto aparece públicamente con su sala creada automáticamente en el momento de publicar. Los miembros se unen a la sala del proyecto a través de un enlace, el creador la controla como propietario de la sala y las actualizaciones de la sala fluyen hacia el feed para que toda la red pueda ver el trabajo. La sala del proyecto se abre en el momento de publicar, sin pasos de configuración intermedios.',
    'Esta guía recorre el camino desde la primera chispa hasta un ritmo de trabajo — ya sea que el proyecto sea nuevo o ya esté en marcha: partir de un grupo existente y su sala, definir un alcance que realmente se pueda entregar, redactar la página del proyecto, publicarla y abrir la sala, invitar al equipo de trabajo, acordar los roles y un primer hito, trasladar el trabajo real a la sala y compartir el progreso para generar impulso.',
  ],
  dataPoints: [
    'Los proyectos con una página pública y un primer hito claro son más fáciles de dotar de personal: las personas se unen al trabajo que pueden ver.',
    'En JoinOrigin, publicar un proyecto crea automáticamente su sala: el espacio de trabajo existe desde el mismo momento que la página.',
    'Una sala de proyecto da al trabajo un solo hogar: decisiones, archivos y progreso visibles para todos los que se unen.',
    'JoinOrigin es un sistema operativo comunitario que ayuda a los grupos formados a convertir conversaciones en proyectos: publica tu proyecto y su sala se abre de inmediato.',
  ],
  faq: [
    {
      question: '¿Qué hace que un grupo esté listo para iniciar un proyecto?',
      answer:
        'Un grupo está listo cuando algunos miembros comparten un resultado concreto y están dispuestos a dedicar tiempo. No necesitas un equipo grande: tres personas comprometidas con un hito claro superan a una docena de miembros curiosos. Publica el proyecto cuando la conversación se repita: «en serio deberíamos hacer esto».',
    },
    {
      question: '¿Cuándo se crea la sala del proyecto?',
      answer:
        'La sala se crea automáticamente en el momento en que publicas el proyecto. El creador es dueño de la sala desde el principio y puede invitar al equipo de trabajo, asignar roles y mantener el trabajo organizado dentro de Element. También puedes crear la misma estructura con las herramientas que tu grupo ya usa.',
    },
    {
      question: '¿En qué se diferencia un proyecto de una idea?',
      answer:
        'Una idea es una propuesta en torno a la cual las personas se reúnen: su sala es donde se ponen a prueba el interés y el encaje. Un proyecto es el trabajo compartido al que un grupo formado se compromete, con página, sala e hito. Publica una idea primero cuando necesites personas; publica un proyecto cuando ya las tengas.',
    },
    {
      question: '¿Cuál debería ser el primer hito?',
      answer:
        'Pequeño y completable: un borrador funcional, un piloto, una primera versión o un entregable terminado en unas semanas. Un primer hito corto genera confianza en el grupo y hace que el proyecto sea real para los nuevos miembros. Siempre puedes ampliar después del primer logro.',
    },
    {
      question: '¿Puede JoinOrigin ayudar a un grupo a iniciar un proyecto hoy?',
      answer:
        'Sí. Publicar un proyecto en JoinOrigin crea su página y su sala de forma atómica: la sala se abre en el momento de publicar y el creador la controla. Elige el objetivo del grupo, crea un hogar de proyecto compartido y abre una sala para el trabajo; cada miembro nuevo que invites amplía tu alcance.',
    },
  ],
  sections: [
    'Parte de un grupo existente y de su sala. Un proyecto crece desde un grupo que ya tiene confianza e impulso. Observa las conversaciones en la sala del grupo y encuentra la necesidad recurrente: aquello que los miembros repiten con «deberíamos hacerlo». JoinOrigin mantiene una comunidad viva en una sala controlada por el creador, y el proyecto es la siguiente capa sobre esa sala. Nombra la necesidad recurrente del grupo y comprueba si alguien quiere actuar sobre ella.',
    'Define un alcance que realmente se pueda entregar. Escribe qué producirá el proyecto, para quién y en qué plazo. Mantén la primera versión lo bastante pequeña como para que el grupo pueda terminarla. JoinOrigin está diseñado en torno a proyectos con páginas públicas: un alcance claro es lo que hace legible la página y enfocada la sala. Una frase que diga qué se entrega y cuándo es suficiente para empezar.',
    'Redacta la página del proyecto. La página debe indicar el objetivo del proyecto, el problema que resuelve, quién trabaja en él y qué necesita. Sé honesto sobre la etapa: un borrador temprano está bien. Publicar un proyecto en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el principio. Publica la descripción del proyecto en algún lugar al que el grupo pueda señalar a las personas.',
    'Publica el proyecto y abre su sala. Publicar es lo que hace real el proyecto: una página pública más una sala donde vive el trabajo. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño. En JoinOrigin, la página, la sala y el equipo de trabajo son una sola publicación. Si lo prefieres, crea la página y la sala en las herramientas que tu grupo ya usa.',
    'Invita al equipo de trabajo a la sala. Invita a las personas que realmente harán el trabajo: un equipo pequeño y comprometido es mejor que una audiencia grande. Comparte el enlace de unión y pide a cada persona que confirme su disponibilidad. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página del proyecto o seguir un enlace de invitación directa de un miembro. Un enlace claro a la sala del proyecto es suficiente.',
    'Acuerda los roles y un primer hito. Nombra quién es dueño de qué, con qué frecuencia el grupo hace el punto y el primer hito hacia el que todos trabajan. Escríbelo donde todo el equipo pueda verlo. JoinOrigin no asigna roles por ti: el control del creador significa que tú decides. La plataforma mantiene los roles y el hito visibles en la sala del proyecto. Un plan escrito corto en la sala es suficiente.',
    'Traslada el trabajo real a la sala. Sustituye «deberíamos» por «aquí está el borrador», «aquí está la decisión» y «aquí está la siguiente tarea». Mantén el progreso en un lugar visible para que todos puedan seguirlo. JoinOrigin mantiene la sala de un proyecto guardando el trabajo — decisiones, archivos y novedades — en lugar de dispersarlo por mensajes privados. Mantén los artefactos de trabajo en la sala compartida desde la primera semana.',
    'Comparte el progreso para generar impulso. Publica novedades a medida que el proyecto avanza, celebra el hito cuando llega e invita al grupo más amplio a unirse o seguir. El progreso en el feed convierte un proyecto en la prueba de que la comunidad entrega. Las actualizaciones de la sala fluyen hacia el feed en JoinOrigin: el bucle de crecimiento donde cada miembro nuevo amplía la superficie de descubrimiento. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Parte de un grupo existente y de su sala',
      body: 'Un proyecto crece desde un grupo que ya tiene confianza e impulso. Observa las conversaciones en la sala del grupo y encuentra la necesidad recurrente: aquello que los miembros repiten con «deberíamos hacerlo».',
      joinOriginNote:
        'JoinOrigin mantiene una comunidad viva en una sala controlada por el creador, y el proyecto es la siguiente capa sobre esa sala. Nombra la necesidad recurrente del grupo y comprueba si alguien quiere actuar sobre ella.',
    },
    {
      title: 'Define un alcance que realmente se pueda entregar',
      body: 'Escribe qué producirá el proyecto, para quién y en qué plazo. Mantén la primera versión lo bastante pequeña como para que el grupo pueda terminarla.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a proyectos con páginas públicas: un alcance claro es lo que hace legible la página y enfocada la sala. Una frase que diga qué se entrega y cuándo es suficiente para empezar.',
    },
    {
      title: 'Redacta la página del proyecto',
      body: 'La página debe indicar el objetivo del proyecto, el problema que resuelve, quién trabaja en él y qué necesita. Sé honesto sobre la etapa: un borrador temprano está bien.',
      joinOriginNote:
        'Publicar un proyecto en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el principio. Publica la descripción del proyecto en algún lugar al que el grupo pueda señalar a las personas.',
    },
    {
      title: 'Publica el proyecto y abre su sala',
      body: 'Publicar es lo que hace real el proyecto: una página pública más una sala donde vive el trabajo. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño.',
      joinOriginNote:
        'En JoinOrigin, la página, la sala y el equipo de trabajo son una sola publicación. Si lo prefieres, crea la página y la sala en las herramientas que tu grupo ya usa.',
    },
    {
      title: 'Invita al equipo de trabajo a la sala',
      body: 'Invita a las personas que realmente harán el trabajo: un equipo pequeño y comprometido es mejor que una audiencia grande. Comparte el enlace de unión y pide a cada persona que confirme su disponibilidad.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página del proyecto o seguir un enlace de invitación directa de un miembro. Un enlace claro a la sala del proyecto es suficiente.',
    },
    {
      title: 'Acuerda los roles y un primer hito',
      body: 'Nombra quién es dueño de qué, con qué frecuencia el grupo hace el punto y el primer hito hacia el que todos trabajan. Escríbelo donde todo el equipo pueda verlo.',
      joinOriginNote:
        'JoinOrigin no asigna roles por ti: el control del creador significa que tú decides. La plataforma mantiene los roles y el hito visibles en la sala del proyecto. Un plan escrito corto en la sala es suficiente.',
    },
    {
      title: 'Traslada el trabajo real a la sala',
      body: 'Sustituye «deberíamos» por «aquí está el borrador», «aquí está la decisión» y «aquí está la siguiente tarea». Mantén el progreso en un lugar visible para que todos puedan seguirlo.',
      joinOriginNote:
        'JoinOrigin mantiene la sala de un proyecto guardando el trabajo — decisiones, archivos y novedades — en lugar de dispersarlo por mensajes privados. Mantén los artefactos de trabajo en la sala compartida desde la primera semana.',
    },
    {
      title: 'Comparte el progreso para generar impulso',
      body: 'Publica novedades a medida que el proyecto avanza, celebra el hito cuando llega e invita al grupo más amplio a unirse o seguir. El progreso en el feed convierte un proyecto en la prueba de que la comunidad entrega.',
      joinOriginNote:
        'Las actualizaciones de la sala fluyen hacia el feed en JoinOrigin: el bucle de crecimiento donde cada miembro nuevo amplía la superficie de descubrimiento. Date a conocer y crece.',
    },
  ],
};

export default content;
