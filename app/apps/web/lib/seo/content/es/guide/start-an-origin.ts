import type { GuideContent } from '../../types';

/**
 * «Cómo crear un Origin» — guía L1 siempre vigente (diseño §6.1,
 * TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: publicar el grupo →
 * sala creada automáticamente al publicar → miembros que se unen mediante
 * enlace; la orientación sobre lugares/formato se mantiene como una
 * consecuencia posterior, nunca el núcleo. El valor de JoinOrigin está
 * tejido en la introducción y en cada paso (nota `joinOriginNote` por
 * paso), con un enfoque honesto: JoinOrigin no organiza eventos locales.
 * Un solo H1, estructura paso a paso y FAQ reflejada 1:1 en el JSON-LD
 * `FAQPage`. «Sala» está anclada a la sala Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'start-an-origin',
  title: 'Cómo crear un Origin: guía paso a paso | JoinOrigin',
  description:
    'Aprende a crear un Origin — o a dar a uno existente un único hogar digital — publica un grupo, abre su sala y trae a los miembros mediante un enlace de unión. Pasos prácticos de JoinOrigin.',
  intro: [
    'La parte más difícil de crear un Origin rara vez es el lugar, la agenda o el presupuesto: es encontrar a las primeras personas que comparten tu interés y darles un lugar claro donde conectarse. Ese es exactamente el problema que resuelve JoinOrigin.',
    'JoinOrigin es un sistema operativo comunitario construido en torno al bucle digital: publicas un grupo, su sala se crea automáticamente y los miembros se unen mediante un enlace. La sala es donde la comunidad realmente vive: una sala Matrix controlada por el creador donde los miembros hablan, comparten novedades y planifican juntos desde el primer día, en lugar de dispersarse entre hojas de cálculo, mensajes dispersos y formularios de registro. Los eventos presenciales existen solo como consecuencia posterior: una vez que un grupo se forma y su sala está viva, los miembros pueden optar por reunirse en persona — y JoinOrigin no organiza eventos locales. El propósito completo de la plataforma es conectar a personas que de otro modo nunca se conocerían, por eso cada paso de esta guía se corresponde con algo con lo que JoinOrigin ayuda.',
    'El enfoque funciona para cualquier tipo de comunidad: un círculo de fundadores, un club de lectura, un grupo local de running, una red de pequeñas empresas o una comunidad profesional en línea — y funciona tanto si empiezas desde cero como si formalizas un grupo que ya se reúne de manera informal. El principio central es simple: las personas se unen por una promesa clara y se quedan porque la experiencia cumple esa promesa de forma fiable. No necesitas un gran presupuesto, un lugar ni una audiencia existente para empezar; necesitas un propósito claro, un primer paso realista y la disciplina de repetirlo.',
  ],
  dataPoints: [
    'La mayoría de las comunidades exitosas comienza con una audiencia estrecha y específica, no con «todo el que esté interesado».',
    'Publicar un grupo crea su sala al instante: nunca existe un paso de «crear el chat después».',
    'Un enlace de unión es la invitación más simple: un enlace, un clic y un miembro nuevo está en la sala.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar o crear Origins: no organiza eventos locales ni reclama personal local.',
  ],
  faq: [
    {
      question: '¿Cuánto se tarda en crear un Origin?',
      answer:
        'Puedes publicar un grupo y abrir su sala en unas pocas semanas si mantienes el alcance pequeño: un propósito, un enlace de unión y un flujo constante de invitaciones personales. La comunidad en sí tarda unos meses de participación constante en la sala antes de sentirse consolidada.',
    },
    {
      question: '¿Necesito dinero o un lugar para empezar?',
      answer:
        'No. El núcleo digital de una comunidad — un grupo publicado y su sala — no cuesta nada y no necesita un lugar. Muchos grupos eligen más tarde reunirse en persona; las bibliotecas, los cafés, los parques y las salas de coworking acogen primeras reuniones gratis en la mayoría de las ciudades.',
    },
    {
      question: '¿Cuál es el error más común al crear un Origin?',
      answer:
        'Intentar servir a todos. Una comunidad con un propósito vago atrae a pocos miembros comprometidos. Define una audiencia específica y un resultado claro, ponlo en la página del grupo y deja que la comunidad evolucione a partir de ahí.',
    },
    {
      question: '¿Cómo puede ayudarme JoinOrigin a crear un Origin?',
      answer:
        'Publicar un grupo en JoinOrigin crea automáticamente su sala y los miembros se unen mediante un enlace: un hogar digital organizado para el propósito, las personas y la conversación de una comunidad. JoinOrigin no organiza eventos locales, por lo que los pasos prácticos de esta guía funcionan en la plataforma y con las herramientas que ya tienes.',
    },
  ],
  sections: [
    'Define un propósito claro. Decide para quién es la comunidad, qué problema resuelve y cómo es un miembro exitoso. Escribe una misión de una frase como «un grupo para nuevos fundadores en Brooklyn que comparten lecciones de etapa temprana». JoinOrigin da a tu propósito un hogar: una página de grupo pública donde la misión, la audiencia y la promesa son visibles para cualquiera que busque un grupo como el tuyo. Escribe la misión y tenla presente en cada invitación.',
    'Publica el grupo y abre su sala. El núcleo digital de una comunidad es un grupo publicado con una sala donde los miembros puedan hablar. En JoinOrigin, publicar un grupo crea automáticamente su sala: el creador es su dueño desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element. En JoinOrigin no existe el paso de «crear el chat después»: publica el grupo y la sala existe de inmediato, con el creador como propietario de la sala. Si lo prefieres, configura el hogar del grupo y su sala en las herramientas que ya usas.',
    'Comparte tu enlace de unión. Un enlace de unión es la invitación más simple que existe: un enlace, un clic y un miembro nuevo llega a la sala. Pon el enlace en todas partes: tu página de grupo, mensajes personales y los lugares donde tu audiencia ya se reúne. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu grupo hace el trabajo.',
    'Invita personalmente a tus primeros diez miembros. Las invitaciones personales convierten mucho mejor que las publicaciones públicas. Escribe a amigos, colegas y conocidos que encajen con la audiencia, comparte el enlace de unión y pídeles que traigan a otra persona. JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan un Origin pueden encontrar el tuyo y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada miembro que invitas se convierte en un canal hacia su propia red.',
    'Elige un formato y una cadencia (una decisión posterior). Una vez que el grupo se está formando, elige un formato recurrente: un debate mensual, una sesión de trabajo semanal, una charla o un paseo social. Lo recurrente supera a lo puntual porque los hábitos son lo que convierte a los desconocidos en miembros. Esta es una decisión posterior: el grupo puede reunirse en persona más tarde, pero la sala ya es el hogar de la comunidad. En JoinOrigin, los organizadores pueden describir su formato una vez y los miembros pueden ver qué esperar antes de unirse, lo que reduce la vacilación que frena a los primerizos. Elige tu formato y decláralo en cada invitación.',
    'Organiza una gran primera reunión. Si los miembros eligen reunirse en persona — llega temprano, saluda a cada persona, haz una ronda de presentación corta y termina con una próxima fecha clara. El objetivo de la primera reunión no es el tamaño; es que todos se vayan queriendo volver. JoinOrigin no gestiona ni organiza reuniones: la experiencia es tuya para diseñarla. La plataforma ayuda a que la comunidad se forme en torno a ella: una sala compartida donde viven la fecha, el resumen y los siguientes pasos.',
    'Recoge comentarios e itera. Después de las primeras semanas, pregunta a los miembros qué quieren más o menos — en la sala y en las reuniones. Ajusta el formato, la hora o el lugar según sus respuestas, no según lo que imaginaste. JoinOrigin mantiene la memoria compartida de una comunidad en un solo lugar: notas, decisiones y lo que pidieron los miembros — de modo que la iteración es visible en lugar de perderse. Pregunta directamente a los miembros en la sala después de cada reunión.',
    'Publica un ritmo constante y crece despacio. Mantén el mismo día y formato durante varios meses antes de expandirte. El crecimiento se acumula mediante referencias cuando cada miembro puede describir qué es la comunidad en una frase y compartir su enlace de unión. JoinOrigin ayuda a tu Origin a seguir siendo localizable y conectado a medida que crece: un solo lugar donde el ritmo, la promesa, la sala y las personas son visibles. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Define un propósito claro',
      body: 'Decide para quién es la comunidad, qué problema resuelve y cómo es un miembro exitoso. Escribe una misión de una frase como «un grupo para nuevos fundadores en Brooklyn que comparten lecciones de etapa temprana».',
      joinOriginNote:
        'JoinOrigin da a tu propósito un hogar: una página de grupo pública donde la misión, la audiencia y la promesa son visibles para cualquiera que busque un grupo como el tuyo. Escribe la misión y tenla presente en cada invitación.',
    },
    {
      title: 'Publica el grupo y abre su sala',
      body: 'El núcleo digital de una comunidad es un grupo publicado con una sala donde los miembros puedan hablar. En JoinOrigin, publicar un grupo crea automáticamente su sala: el creador es su dueño desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element.',
      joinOriginNote:
        'En JoinOrigin no existe el paso de «crear el chat después»: publica el grupo y la sala existe de inmediato, con el creador como propietario de la sala. Si lo prefieres, configura el hogar del grupo y su sala en las herramientas que ya usas.',
    },
    {
      title: 'Comparte tu enlace de unión',
      body: 'Un enlace de unión es la invitación más simple que existe: un enlace, un clic y un miembro nuevo llega a la sala. Pon el enlace en todas partes: tu página de grupo, mensajes personales y los lugares donde tu audiencia ya se reúne.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu grupo hace el trabajo.',
    },
    {
      title: 'Invita personalmente a tus primeros diez miembros',
      body: 'Las invitaciones personales convierten mucho mejor que las publicaciones públicas. Escribe a amigos, colegas y conocidos que encajen con la audiencia, comparte el enlace de unión y pídeles que traigan a otra persona.',
      joinOriginNote:
        'JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan un Origin pueden encontrar el tuyo y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada miembro que invitas se convierte en un canal hacia su propia red.',
    },
    {
      title: 'Elige un formato y una cadencia (una decisión posterior)',
      body: 'Una vez que el grupo se está formando, elige un formato recurrente: un debate mensual, una sesión de trabajo semanal, una charla o un paseo social. Lo recurrente supera a lo puntual porque los hábitos son lo que convierte a los desconocidos en miembros. Esta es una decisión posterior: el grupo puede reunirse en persona más tarde, pero la sala ya es el hogar de la comunidad.',
      joinOriginNote:
        'En JoinOrigin, los organizadores pueden describir su formato una vez y los miembros pueden ver qué esperar antes de unirse, lo que reduce la vacilación que frena a los primerizos. Elige tu formato y decláralo en cada invitación.',
    },
    {
      title: 'Organiza una gran primera reunión',
      body: 'Si los miembros eligen reunirse en persona — llega temprano, saluda a cada persona, haz una ronda de presentación corta y termina con una próxima fecha clara. El objetivo de la primera reunión no es el tamaño; es que todos se vayan queriendo volver.',
      joinOriginNote:
        'JoinOrigin no gestiona ni organiza reuniones: la experiencia es tuya para diseñarla. La plataforma ayuda a que la comunidad se forme en torno a ella: una sala compartida donde viven la fecha, el resumen y los siguientes pasos.',
    },
    {
      title: 'Recoge comentarios e itera',
      body: 'Después de las primeras semanas, pregunta a los miembros qué quieren más o menos — en la sala y en las reuniones. Ajusta el formato, la hora o el lugar según sus respuestas, no según lo que imaginaste.',
      joinOriginNote:
        'JoinOrigin mantiene la memoria compartida de una comunidad en un solo lugar: notas, decisiones y lo que pidieron los miembros — de modo que la iteración es visible en lugar de perderse. Pregunta directamente a los miembros en la sala después de cada reunión.',
    },
    {
      title: 'Publica un ritmo constante y crece despacio',
      body: 'Mantén el mismo día y formato durante varios meses antes de expandirte. El crecimiento se acumula mediante referencias cuando cada miembro puede describir qué es la comunidad en una frase y compartir su enlace de unión.',
      joinOriginNote:
        'JoinOrigin ayuda a tu Origin a seguir siendo localizable y conectado a medida que crece: un solo lugar donde el ritmo, la promesa, la sala y las personas son visibles. Date a conocer y crece.',
    },
  ],
};

export default content;
