import type { GuideContent } from '../../types';

/**
 * «Cómo crear un grupo» — guía L1 siempre vigente (diseño §6.1, TASK-353).
 *
 * Redactada según el flujo de pantalla del producto §2 (bucle central):
 * publicar un grupo → página pública del grupo → unirse mediante enlace →
 * sala creada automáticamente AL PUBLICAR → el creador controla la sala →
 * crecimiento por feed e invitaciones. Un grupo es una comunidad: la página
 * pública expresa la promesa, la sala es donde los miembros se conectan y
 * los miembros se unen mediante un enlace. La plataforma está en marcha:
 * crear un grupo publica su página y abre su sala ahora mismo. «Sala» está
 * anclada a la sala Matrix (§6.3). La frase no se usa en el texto redactado.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'create-a-group',
  title: 'Cómo crear un grupo: publícalo y abre su sala | JoinOrigin',
  description:
    'Crea un grupo en JoinOrigin — publica una página de grupo, abre su sala automáticamente e invita a miembros mediante un enlace de unión. Pasos prácticos de JoinOrigin.',
  intro: [
    'Toda comunidad — ya sea totalmente nueva o lleve meses reuniéndose de manera informal — funciona con los mismos dos movimientos: decidir para quién es y darle a esas personas un lugar claro donde conectarse. Un grupo sin hogar nunca se forma del todo; el interés se dispersa entre mensajes, hojas de cálculo y conversaciones aisladas, y nada perdura. La página del grupo y su sala son ese hogar, y crearlos bien es la diferencia entre una comunidad real y una lista de nombres.',
    'El bucle de JoinOrigin funciona así: publicas un grupo, aparece su página pública y su sala se crea automáticamente en el momento de publicar. Las personas descubren el grupo a través de Explorar o siguen un enlace de unión, unirse es un solo clic y llegan a la sala: una sala Matrix controlada por el creador donde la comunidad realmente vive. El creador es dueño de la sala desde el segundo cero y controla quién se une y cómo funciona el grupo.',
    'Esta guía cubre todo el camino — ya sea que el grupo sea nuevo o ya exista sobre el papel: elegir la audiencia y el propósito, redactar una página de grupo que las personas puedan encontrar, publicar el grupo y abrir su sala, fijar las expectativas como creador, compartir el enlace de unión, invitar a los primeros miembros, iniciar las primeras conversaciones y mantener la sala activa para que el grupo siga creciendo.',
  ],
  dataPoints: [
    'Los grupos más claros empiezan con una audiencia y una promesa: la especificidad es una función de crecimiento.',
    'En JoinOrigin, publicar un grupo crea automáticamente su sala: la comunidad tiene un lugar para conectarse desde el segundo cero.',
    'Un enlace de unión es la invitación más simple: un enlace, un clic y un miembro nuevo está en la sala.',
    'JoinOrigin es un sistema operativo comunitario que ayuda a las personas a encontrar, unirse y crear grupos: publica tu grupo y su sala se abre de inmediato.',
  ],
  faq: [
    {
      question: '¿Cuál es la diferencia entre un grupo y una comunidad?',
      answer:
        'En JoinOrigin son el mismo objeto. Un grupo (o comunidad) es un objeto publicado y al que se puede unir, con una página pública y una sala. La página del grupo expresa la promesa; la sala es donde los miembros se conectan. Las comunidades tienen un Espacio Matrix que contiene las salas del grupo, y la sala principal es donde vive el grupo.',
    },
    {
      question: '¿Cuándo se crea la sala del grupo?',
      answer:
        'La sala se crea automáticamente en el momento en que publicas el grupo: nunca existe un paso aparte de «crear el chat después». El creador es dueño de la sala desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element. También puedes configurar la misma estructura con las herramientas que ya usas.',
    },
    {
      question: '¿Cómo se unen los miembros a mi grupo?',
      answer:
        'Unirse es una sola acción: hacer clic en Unirse en la página pública del grupo o seguir un enlace de invitación directa de un miembro. Quien se une llega a la sala del grupo. El crecimiento temprano más fiable es personal: compartir el enlace de unión con personas que encajen con la audiencia y pedirles que traigan a otras.',
    },
    {
      question: '¿Qué debería decir la página del grupo?',
      answer:
        'Una frase sobre para quién es el grupo, una frase sobre lo que ocurre en la sala y qué obtiene un miembro al unirse. Mantenlo específico: «nuevos fundadores en Brooklyn» supera a «personas a las que les gustan los negocios». La página es la promesa que decide si alguien hace clic en Unirse.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a crear un grupo hoy?',
      answer:
        'Sí. Publicar un grupo en JoinOrigin crea su página y su sala de forma atómica: la sala se abre en el momento de publicar y tú la controlas desde el principio. Publica el grupo y abre una sala para los miembros; cada miembro nuevo que invites amplía tu alcance.',
    },
  ],
  sections: [
    'Elige la audiencia y el propósito. Decide para quién es el grupo y para qué existe: una audiencia, una promesa y un miembro exitoso que puedas describir. JoinOrigin está diseñado en torno a páginas de grupo localizables, y los grupos más claros declaran su audiencia y su propósito desde el principio. Escribe una frase para cada uno y tenlas presentes en cada invitación.',
    'Redacta una página de grupo que las personas puedan encontrar. La página debe indicar para quién es el grupo, qué ocurre en la sala y qué obtienen los miembros al unirse. Mantenla específica y honesta. Publicar un grupo en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el principio. Publica la descripción y pruébala con algunas personas que encajen con la audiencia.',
    'Publica el grupo y abre su sala. Publicar es el momento en que el grupo se vuelve real: una página pública más una sala donde los miembros se conectan. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño. En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Si lo prefieres, crea la página y la sala en las herramientas que tu grupo ya usa.',
    'Fija las expectativas como creador. Como propietario de la sala, decide cómo funciona el grupo: qué pueden publicar los miembros, cuáles son las reglas y cómo se da la bienvenida a las personas nuevas. El control del creador es la propiedad estándar de una sala Matrix: invitar, eliminar, asignar roles, fijar y archivar. JoinOrigin no establece tus reglas por ti; el diseño te da los controles. Escribe las expectativas de la sala y fíjalas donde los miembros puedan verlas.',
    'Comparte el enlace de unión. El enlace de unión es el camino más corto del interés a la pertenencia: un enlace, un clic y un miembro nuevo llega a la sala. Ponlo en todos los lugares donde se reúnen las personas adecuadas. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu grupo hace el trabajo.',
    'Invita a los primeros miembros personalmente. Las invitaciones personales convierten mucho mejor que las publicaciones públicas. Escribe a amigos, colegas y conocidos que encajen con la audiencia, comparte el enlace de unión y pídeles que traigan a otra persona. JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan un grupo pueden encontrar el tuyo y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada miembro se convierte en un canal hacia su propia red.',
    'Inicia las primeras conversaciones en la sala. Las primeras conversaciones definen la cultura. Abre con una indicación clara — presentaciones, un objetivo compartido o un primer tema — y responde a cada mensaje. JoinOrigin no dirige tus conversaciones; la sala es tuya para darle forma. La plataforma da al grupo una sala donde los miembros se conectan y el creador es su dueño. Sé el miembro más activo durante las primeras semanas.',
    'Mantén la sala activa y en crecimiento. Mantén un ritmo — un tema semanal, un punto recurrente o una novedad fija — para que los miembros tengan una razón para volver. El crecimiento se acumula cuando cada miembro puede describir el grupo en una frase y compartir su enlace de unión. JoinOrigin mantiene conectados tu página de grupo y tu sala a medida que el grupo crece: un solo lugar donde la promesa, la sala y las personas son visibles. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Elige la audiencia y el propósito',
      body: 'Decide para quién es el grupo y para qué existe: una audiencia, una promesa y un miembro exitoso que puedas describir.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a páginas de grupo localizables, y los grupos más claros declaran su audiencia y su propósito desde el principio. Escribe una frase para cada uno y tenlas presentes en cada invitación.',
    },
    {
      title: 'Redacta una página de grupo que las personas puedan encontrar',
      body: 'La página debe indicar para quién es el grupo, qué ocurre en la sala y qué obtienen los miembros al unirse. Mantenla específica y honesta.',
      joinOriginNote:
        'Publicar un grupo en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el principio. Publica la descripción y pruébala con algunas personas que encajen con la audiencia.',
    },
    {
      title: 'Publica el grupo y abre su sala',
      body: 'Publicar es el momento en que el grupo se vuelve real: una página pública más una sala donde los miembros se conectan. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño.',
      joinOriginNote:
        'En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Si lo prefieres, crea la página y la sala en las herramientas que tu grupo ya usa.',
    },
    {
      title: 'Fija las expectativas como creador',
      body: 'Como propietario de la sala, decide cómo funciona el grupo: qué pueden publicar los miembros, cuáles son las reglas y cómo se da la bienvenida a las personas nuevas. El control del creador es la propiedad estándar de una sala Matrix: invitar, eliminar, asignar roles, fijar y archivar.',
      joinOriginNote:
        'JoinOrigin no establece tus reglas por ti; el diseño te da los controles. Escribe las expectativas de la sala y fíjalas donde los miembros puedan verlas.',
    },
    {
      title: 'Comparte el enlace de unión',
      body: 'El enlace de unión es el camino más corto del interés a la pertenencia: un enlace, un clic y un miembro nuevo llega a la sala. Ponlo en todos los lugares donde se reúnen las personas adecuadas.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu grupo hace el trabajo.',
    },
    {
      title: 'Invita a los primeros miembros personalmente',
      body: 'Las invitaciones personales convierten mucho mejor que las publicaciones públicas. Escribe a amigos, colegas y conocidos que encajen con la audiencia, comparte el enlace de unión y pídeles que traigan a otra persona.',
      joinOriginNote:
        'JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan un grupo pueden encontrar el tuyo y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada miembro se convierte en un canal hacia su propia red.',
    },
    {
      title: 'Inicia las primeras conversaciones en la sala',
      body: 'Las primeras conversaciones definen la cultura. Abre con una indicación clara — presentaciones, un objetivo compartido o un primer tema — y responde a cada mensaje.',
      joinOriginNote:
        'JoinOrigin no dirige tus conversaciones; la sala es tuya para darle forma. La plataforma da al grupo una sala donde los miembros se conectan y el creador es su dueño. Sé el miembro más activo durante las primeras semanas.',
    },
    {
      title: 'Mantén la sala activa y en crecimiento',
      body: 'Mantén un ritmo — un tema semanal, un punto recurrente o una novedad fija — para que los miembros tengan una razón para volver. El crecimiento se acumula cuando cada miembro puede describir el grupo en una frase y compartir su enlace de unión.',
      joinOriginNote:
        'JoinOrigin mantiene conectados tu página de grupo y tu sala a medida que el grupo crece: un solo lugar donde la promesa, la sala y las personas son visibles. Date a conocer y crece.',
    },
  ],
};

export default content;
