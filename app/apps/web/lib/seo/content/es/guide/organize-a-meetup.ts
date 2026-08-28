import type { GuideContent } from '../../types';

/**
 * «Cómo organizar un encuentro» — guía L1 siempre vigente (diseño §6.1,
 * TASK-326).
 *
 * Recentrada: los encuentros son lo que un grupo hace DESPUÉS de formarse —
 * primero va el camino digital conectar→unirse→sala (publicar grupo → sala
 * creada automáticamente → miembros que se unen mediante enlace), y el
 * encuentro presencial es una consecuencia posterior. El valor de JoinOrigin
 * está tejido en la introducción y en cada paso (nota `joinOriginNote` por
 * paso), con un enfoque honesto: JoinOrigin no reserva lugares ni organiza
 * eventos. Un solo H1, estructura paso a paso y FAQ reflejada 1:1 en el
 * JSON-LD `FAQPage`. «Sala» está anclada a la sala Matrix (§6.3); los
 * lugares físicos se describen como lugares/espacios, nunca como «salas».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'organize-a-meetup',
  title: 'Cómo organizar un encuentro: lugares, agenda y promoción | JoinOrigin',
  description:
    'Organiza un encuentro una vez que tu grupo se ha formado — ya sea que se fundó el mes pasado o lleve años reuniéndose — elige un formato, reserva un lugar, construye una agenda, promuévelo y dirige la noche. Una lista práctica de JoinOrigin.',
  intro: [
    'Un encuentro es un evento presencial recurrente donde las personas se reúnen en torno a un interés compartido — y en JoinOrigin es un paso natural después de comunicarse en la sala. El camino digital viene primero: las personas encuentran y se unen a un grupo mediante un enlace, y la sala del grupo se convierte en el lugar donde los miembros hablan, planifican y se mantienen conectados entre reuniones. El encuentro presencial es el siguiente paso de esa comunidad formada — ya sea que el grupo se fundó el mes pasado o lleve años reuniéndose de manera informal, la sala le da un hogar organizado desde el que puede crecer un encuentro.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar Origins a los que unirse y a crear los suyos propios — de modo que un encuentro tiene un hogar donde los miembros interesados pueden descubrir el grupo, unirse a su sala y coordinar la reunión en lugar de depender de la lista de contactos de una sola persona. JoinOrigin no reserva lugares ni organiza eventos: el propósito completo de la plataforma es conectar a personas que comparten un interés, y la reunión en sí es tuya para dirigirla.',
    'Esta guía cubre el ciclo de vida completo de un encuentro después de que el grupo existe — tanto para un grupo recién formado como para uno que lleva años reuniéndose: elegir un formato que encaje con tu audiencia, encontrar y reservar un lugar sin romper el presupuesto, construir una agenda con un inicio y un final claros, promocionar el evento donde tu audiencia realmente mira y dirigir la noche para que los asistentes se vayan queriendo el siguiente. Cada paso incluye una nota sobre cómo ayuda JoinOrigin — y el primer paso trata del grupo digital, porque sin un grupo y su sala no hay comunidad que reunir.',
  ],
  dataPoints: [
    'Un encuentro simple solo necesita tres cosas: un formato, un lugar y un canal de promoción.',
    'Los encuentros nocturnos entre semana y las sesiones de fin de semana por la mañana son los formatos recurrentes más comunes.',
    'La mayoría de los lugares — bibliotecas, cafés, espacios de coworking — ofrecen espacios gratuitos o de bajo coste para eventos comunitarios.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar o crear Origins; no reserva lugares ni organiza eventos.',
  ],
  faq: [
    {
      question: '¿Con cuánta antelación debería promocionar un encuentro?',
      answer:
        'Dos a tres semanas es un buen equilibrio: con tiempo suficiente para que la gente planifique, y lo bastante corto para mantener la urgencia. Anúncialo primero en la sala del grupo y luego comparte el evento donde se reúne tu audiencia. Envía un recordatorio dos días antes y otro el mismo día del evento.',
    },
    {
      question: '¿Qué pasa si solo aparecen unas pocas personas?',
      answer:
        'Es normal, especialmente al principio. Dirige la sesión para quienes estén, recoge sus comentarios en la sala y usa la siguiente edición para mejorar la promoción. La constancia importa más que cualquier asistencia puntual.',
    },
    {
      question: '¿Los encuentros necesitan una agenda formal?',
      answer:
        'Sí, una ligera. Un inicio claro, una ronda de presentación corta, una actividad o charla principal y una hora de finalización definida hacen que los asistentes sientan que se respetó su tiempo — que es lo que los hace volver.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a organizar encuentros?',
      answer:
        'Sí. JoinOrigin ayuda a las personas a encontrar y crear Origins: un hogar digital organizado donde la sala de un grupo es el lugar donde los miembros se coordinan y donde un encuentro puede descubrirse. JoinOrigin no organiza eventos por sí mismo, por lo que los pasos prácticos de esta guía son tuyos para ejecutarlos.',
    },
  ],
  sections: [
    'Primero forma el grupo y abre su sala. Un encuentro es lo que un grupo hace después de formarse — así que empieza por el núcleo digital: publica el grupo, deja que su sala se cree automáticamente e invita a los miembros mediante un enlace. Publicar un grupo en JoinOrigin crea automáticamente su sala, un espacio controlado por el creador donde los miembros planifican y se mantienen conectados. Si lo prefieres, configura tu grupo y su sala en las herramientas que ya usas antes de planificar un solo evento.',
    'Elige un formato que encaje con tu audiencia. Decide entre una charla, un taller, un círculo de debate, un mezclador social o una sesión de trabajo. Haz coincidir el formato con lo que la audiencia quiere: aprendizaje, conexión o progreso en trabajo compartido. En JoinOrigin, los miembros pueden ver el formato de una comunidad antes de unirse, lo que atrae a las personas adecuadas y fija expectativas. Elige un formato por el que tu audiencia realmente aparezca.',
    'Elige una fecha y una cadencia. Las noches entre semana y las mañanas de fin de semana funcionan mejor para la mayoría de las audiencias. Elige una franja recurrente — lo mensual es lo estándar — y protégela como una cita para que las personas puedan crear un hábito. JoinOrigin hace visible el ritmo de una comunidad en un solo lugar, de modo que los miembros saben la próxima fecha sin tener que buscarla. Protege tu franja recurrente como una cita.',
    'Reserva un lugar con antelación. Las bibliotecas, los cafés, las salas de coworking, los centros comunitarios y los parques albergan eventos comunitarios a bajo coste o gratis. Confirma la capacidad, el horario y cualquier requisito de reserva por escrito. JoinOrigin no reserva lugares ni coordina espacios físicos: su enfoque de diseño es conectar personas en la sala digital. Confirma la capacidad y el horario directamente con el lugar, por escrito.',
    'Redacta una agenda ligera. Mantenla simple: bienvenida y presentación, actividad principal, debate abierto, cierre y próxima fecha. Estima 60–90 minutos en total y publica la agenda con el listado del evento y en la sala. JoinOrigin es un sistema operativo comunitario donde los artefactos compartidos, como agendas y notas, viven junto a la comunidad. Una agenda simple publicada hace el trabajo.',
    'Promociona donde tu audiencia ya está. Comparte el evento en grupos de nicho, boletines locales, tablones comunitarios y canales sociales relevantes — y apunta a todos al enlace de unión del grupo para que los asistentes se conviertan en miembros, no en invitados de una noche. JoinOrigin es el lugar donde las personas que buscan un Origin lo encuentran y se unen mediante un enlace. Promociona en los grupos de nicho y boletines donde tu audiencia ya se reúne y comparte el enlace de unión con cada asistente.',
    'Dirige la noche con un ritmo claro. Abre puntual, saluda a los que llegan tarde, mantén la actividad principal en curso y cierra anunciando la próxima fecha. Termina a tiempo: es la señal más fuerte de respeto. JoinOrigin no organiza eventos: la experiencia es tuya. La plataforma mantiene la historia de la comunidad en una sala organizada: la promesa, el ritmo y las personas. Terminar a tiempo es la señal más fuerte de respeto.',
    'Haz seguimiento en 24 horas en la sala. Agradece a los asistentes, comparte enlaces o notas e invita a dar comentarios donde todo el grupo pueda verlos. El seguimiento es lo que convierte un evento puntual en una comunidad recurrente. JoinOrigin da a una comunidad una sala persistente donde viven el resumen, la próxima fecha y los comentarios: convertir un evento puntual en una comunidad recurrente. Date a conocer y mantén el impulso.',
  ],
  steps: [
    {
      title: 'Primero forma el grupo y abre su sala',
      body: 'Un encuentro es lo que un grupo hace después de formarse — así que empieza por el núcleo digital: publica el grupo, deja que su sala se cree automáticamente e invita a los miembros mediante un enlace.',
      joinOriginNote:
        'Publicar un grupo en JoinOrigin crea automáticamente su sala, un espacio controlado por el creador donde los miembros planifican y se mantienen conectados. Si lo prefieres, configura tu grupo y su sala en las herramientas que ya usas antes de planificar un solo evento.',
    },
    {
      title: 'Elige un formato que encaje con tu audiencia',
      body: 'Decide entre una charla, un taller, un círculo de debate, un mezclador social o una sesión de trabajo. Haz coincidir el formato con lo que la audiencia quiere: aprendizaje, conexión o progreso en trabajo compartido.',
      joinOriginNote:
        'En JoinOrigin, los miembros pueden ver el formato de una comunidad antes de unirse, lo que atrae a las personas adecuadas y fija expectativas. Elige un formato por el que tu audiencia realmente aparezca.',
    },
    {
      title: 'Elige una fecha y una cadencia',
      body: 'Las noches entre semana y las mañanas de fin de semana funcionan mejor para la mayoría de las audiencias. Elige una franja recurrente — lo mensual es lo estándar — y protégela como una cita para que las personas puedan crear un hábito.',
      joinOriginNote:
        'JoinOrigin hace visible el ritmo de una comunidad en un solo lugar, de modo que los miembros saben la próxima fecha sin tener que buscarla. Protege tu franja recurrente como una cita.',
    },
    {
      title: 'Reserva un lugar con antelación',
      body: 'Las bibliotecas, los cafés, las salas de coworking, los centros comunitarios y los parques albergan eventos comunitarios a bajo coste o gratis. Confirma la capacidad, el horario y cualquier requisito de reserva por escrito.',
      joinOriginNote:
        'JoinOrigin no reserva lugares ni coordina espacios físicos: su enfoque de diseño es conectar personas en la sala digital. Confirma la capacidad y el horario directamente con el lugar, por escrito.',
    },
    {
      title: 'Redacta una agenda ligera',
      body: 'Mantenla simple: bienvenida y presentación, actividad principal, debate abierto, cierre y próxima fecha. Estima 60–90 minutos en total y publica la agenda con el listado del evento y en la sala.',
      joinOriginNote:
        'JoinOrigin es un sistema operativo comunitario donde los artefactos compartidos, como agendas y notas, viven junto a la comunidad. Una agenda simple publicada hace el trabajo.',
    },
    {
      title: 'Promociona donde tu audiencia ya está',
      body: 'Comparte el evento en grupos de nicho, boletines locales, tablones comunitarios y canales sociales relevantes — y apunta a todos al enlace de unión del grupo para que los asistentes se conviertan en miembros, no en invitados de una noche.',
      joinOriginNote:
        'JoinOrigin es el lugar donde las personas que buscan un Origin lo encuentran y se unen mediante un enlace. Promociona en los grupos de nicho y boletines donde tu audiencia ya se reúne y comparte el enlace de unión con cada asistente.',
    },
    {
      title: 'Dirige la noche con un ritmo claro',
      body: 'Abre puntual, saluda a los que llegan tarde, mantén la actividad principal en curso y cierra anunciando la próxima fecha. Termina a tiempo: es la señal más fuerte de respeto.',
      joinOriginNote:
        'JoinOrigin no organiza eventos: la experiencia es tuya. La plataforma mantiene la historia de la comunidad en una sala organizada: la promesa, el ritmo y las personas. Terminar a tiempo es la señal más fuerte de respeto.',
    },
    {
      title: 'Haz seguimiento en 24 horas en la sala',
      body: 'Agradece a los asistentes, comparte enlaces o notas e invita a dar comentarios donde todo el grupo pueda verlos. El seguimiento es lo que convierte un evento puntual en una comunidad recurrente.',
      joinOriginNote:
        'JoinOrigin da a una comunidad una sala persistente donde viven el resumen, la próxima fecha y los comentarios: convertir un evento puntual en una comunidad recurrente. Date a conocer y mantén el impulso.',
    },
  ],
};

export default content;
