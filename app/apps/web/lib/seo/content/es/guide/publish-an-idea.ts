import type { GuideContent } from '../../types';

/**
 * «Cómo publicar una idea» — guía L1 siempre vigente (diseño §6.1, TASK-353).
 *
 * Redactada según el flujo de pantalla del producto §2 (bucle central):
 * Descubrir → Página pública de la idea → Unirse mediante enlace → Sala
 * creada automáticamente AL PUBLICAR → el creador controla la sala →
 * crecimiento por feed e invitaciones. La página de idea es la promesa
 * pública; la sala es donde las personas interesadas se reúnen y hablan.
 * La plataforma está en marcha: publicar una idea crea su página y su sala
 * ahora mismo. «Sala» está anclada a la sala Matrix (§6.3). La frase no se
 * usa en el texto redactado.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'publish-an-idea',
  title:
    'Cómo publicar una idea: convierte una chispa en una página de idea localizable | JoinOrigin',
  description:
    'Publica una idea en JoinOrigin — ya sea una chispa nueva o un proyecto existente que quieres que la gente encuentre — escribe una página de idea pública, deja que su sala se abra automáticamente e invita a las personas que quieran construirla contigo. Pasos prácticos de JoinOrigin.',
  intro: [
    'La mayoría de las ideas mueren en borradores: una nota en el teléfono, una conversación a medio recordar, un documento que nadie más ha visto. La razón rara vez es que la idea sea mala. Es que nadie podía encontrarla, y encontrar a las personas adecuadas es todo el juego. Ese problema de conectar personas es exactamente lo que JoinOrigin resuelve — tanto si la idea es una chispa nueva como un proyecto existente que ha avanzado en silencio sin un hogar localizable.',
    'El bucle de JoinOrigin funciona así: publicas una idea, aparece una página de idea pública y su sala se crea automáticamente en el momento de publicar. Las personas descubren la página a través de Explorar o siguen un enlace que compartes, y unirse es un solo clic. Llegan a la sala: una sala Matrix controlada por el creador donde ocurre realmente la conversación en torno a la idea. El creador es dueño de la sala desde el segundo cero y decide quién se une y qué ocurre dentro.',
    'Esta guía recorre todo el camino: comprimir la idea en una frase clara, escribir una página que las personas puedan encontrar, publicarla y abrir la sala, compartir el enlace de unión, invitar a las primeras personas interesadas, organizar la primera conversación, refinar la idea a partir de comentarios reales y mantener la idea localizable a medida que crece. Funciona para cualquier idea: una pequeña empresa, una startup, un club de lectura, un proyecto comunitario, un producto que aún no existe o un proyecto que ya existe y necesita más personas a su alrededor.',
  ],
  dataPoints: [
    'Un discurso de idea de una frase es más localizable que un documento largo: la claridad es una función de descubrimiento.',
    'En JoinOrigin, publicar una idea crea automáticamente su sala: nunca existe un paso aparte de «crear el chat después».',
    'Un enlace de unión es la invitación más simple: un enlace, un clic y una persona interesada está en la sala.',
    'JoinOrigin es un sistema operativo comunitario que ayuda a las personas a encontrar ideas y a las personas detrás de ellas: publica tu idea y su sala se abre de inmediato.',
  ],
  faq: [
    {
      question: '¿Qué es exactamente una página de idea?',
      answer:
        'Una página de idea es el hogar público e indexable de una idea en JoinOrigin: una página clara que indica qué es la idea, por qué importa y para quién es, con una acción de Unirse. Las personas la descubren a través de Explorar o de un enlace compartido, y unirse las lleva a la sala de la idea.',
    },
    {
      question: '¿Cuándo se crea la sala?',
      answer:
        'La sala se crea automáticamente en el momento en que publicas la idea. El creador es dueño de la sala desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element. También puedes configurar la misma estructura — una página pública más una sala — con las herramientas que ya usas.',
    },
    {
      question: '¿Cómo encuentran las personas mi idea?',
      answer:
        'Mediante el descubrimiento y el intercambio: una página de idea es indexable y aparece en Explorar, y cada enlace de unión que compartes apunta directamente a ella. El tráfico temprano más fiable es personal: compartir la página y su enlace con personas a las que ya les importa el problema.',
    },
    {
      question: '¿Cuál es la diferencia entre una idea y un proyecto?',
      answer:
        'Una idea es una propuesta en torno a la cual las personas se reúnen: la sala es donde las personas interesadas hablan y prueban el encaje. Un proyecto es lo que un grupo formado empieza a hacer juntos, con su propia página y sala de proyecto. Publica primero la idea; el proyecto llega cuando las personas se comprometen.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a publicar una idea hoy?',
      answer:
        'Sí. Publicar una idea en JoinOrigin crea su página y su sala de forma atómica: la sala se abre en el momento de publicar y tú la controlas desde el inicio. Publica tu idea y abre una sala para el debate; cada miembro nuevo que invites amplía tu alcance.',
    },
  ],
  sections: [
    'Define la idea en una frase clara. Comprime la idea en una sola frase: para quién es, qué cambia y por qué importa. Si no puedes decirlo en una frase, no estás listo para publicarla. JoinOrigin está diseñado en torno a páginas de idea localizables: un discurso de una frase es el núcleo de la página y la frase que la gente buscará. Escribe la frase y pruébala con tres personas antes de seguir.',
    'Escribe la página de idea con una promesa y una necesidad. La página debe indicar la idea, por qué importa, qué necesita y a quién quieres que se una. Sé honesto sobre dónde está la idea: una chispa, un prototipo, un producto. JoinOrigin crea automáticamente la página y la sala cuando publicas una idea; el creador controla la sala desde el inicio y puede invitar, eliminar y asignar roles dentro de Element. Publica la idea y abre una sala para debatir en torno a ella.',
    'Publica la idea y deja que su sala se abra. Publicar es el momento en que la idea se vuelve localizable. En JoinOrigin, publicar crea automáticamente la sala: nunca existe un paso de «crear el chat después» y el creador es dueño de la sala desde el segundo cero. En JoinOrigin, la página de idea y su sala son una sola publicación atómica. También puedes compartir la página públicamente y configurar la sala en las herramientas que ya usas.',
    'Comparte el enlace de unión. El enlace de unión es el camino más corto del interés a la conexión: un enlace, un clic y una persona interesada llega a la sala. Ponlo en todos los lugares donde se reúnen las personas adecuadas. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu idea hace el trabajo.',
    'Invita personalmente a las primeras personas interesadas. Las invitaciones personales convierten mejor que las publicaciones públicas. Escribe a personas que encajen con la audiencia de la idea, comparte el enlace de unión y pídeles que traigan a otra persona a la que le pueda importar. JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    'Organiza la primera conversación en la sala. Las primeras conversaciones deciden si una idea tiene impulso. Abre la sala con una indicación clara — cuál es el problema, cuál es el primer paso, qué aporta cada uno — y deja que las personas respondan. JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da a la idea una sala donde el interés se convierte en conversación, y el creador es dueño de esa sala. Empieza la conversación donde tus personas ya están.',
    'Recoge comentarios y refina la idea. Pregunta a quienes se unen qué les entusiasma, qué les preocupa y qué harían primero. Ajusta el discurso, el alcance o el siguiente paso según sus respuestas. JoinOrigin mantiene la memoria compartida de una idea en un solo lugar: notas, decisiones y comentarios en la sala — de modo que el refinamiento es visible en lugar de perderse. Pregunta directamente a los miembros en la sala después de la primera semana.',
    'Mantén la idea localizable a medida que crece. Revisa la página a medida que la idea se desarrolla: actualiza la promesa, las necesidades y el siguiente paso para que los nuevos miembros vean siempre la versión actual. El crecimiento se acumula cuando cada miembro puede describir la idea en una frase y compartir su enlace de unión. JoinOrigin mantiene conectados tu página de idea y su sala a medida que crece el interés: un solo lugar donde la promesa, la conversación y las personas son visibles. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Define la idea en una frase clara',
      body: 'Comprime la idea en una sola frase: para quién es, qué cambia y por qué importa. Si no puedes decirlo en una frase, no estás listo para publicarla.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a páginas de idea localizables: un discurso de una frase es el núcleo de la página y la frase que la gente buscará. Escribe la frase y pruébala con tres personas antes de seguir.',
    },
    {
      title: 'Escribe la página de idea con una promesa y una necesidad',
      body: 'La página debe indicar la idea, por qué importa, qué necesita y a quién quieres que se una. Sé honesto sobre dónde está la idea: una chispa, un prototipo, un producto.',
      joinOriginNote:
        'JoinOrigin crea automáticamente la página y la sala cuando publicas una idea; el creador controla la sala desde el inicio y puede invitar, eliminar y asignar roles dentro de Element. Publica la idea y abre una sala para debatir en torno a ella.',
    },
    {
      title: 'Publica la idea y deja que su sala se abra',
      body: 'Publicar es el momento en que la idea se vuelve localizable. En JoinOrigin, publicar crea automáticamente la sala: nunca existe un paso de «crear el chat después» y el creador es dueño de la sala desde el segundo cero.',
      joinOriginNote:
        'En JoinOrigin, la página de idea y su sala son una sola publicación atómica. También puedes compartir la página públicamente y configurar la sala en las herramientas que ya usas.',
    },
    {
      title: 'Comparte el enlace de unión',
      body: 'El enlace de unión es el camino más corto del interés a la conexión: un enlace, un clic y una persona interesada llega a la sala. Ponlo en todos los lugares donde se reúnen las personas adecuadas.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu idea hace el trabajo.',
    },
    {
      title: 'Invita personalmente a las primeras personas interesadas',
      body: 'Las invitaciones personales convierten mejor que las publicaciones públicas. Escribe a personas que encajen con la audiencia de la idea, comparte el enlace de unión y pídeles que traigan a otra persona a la que le pueda importar.',
      joinOriginNote:
        'JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    },
    {
      title: 'Organiza la primera conversación en la sala',
      body: 'Las primeras conversaciones deciden si una idea tiene impulso. Abre la sala con una indicación clara — cuál es el problema, cuál es el primer paso, qué aporta cada uno — y deja que las personas respondan.',
      joinOriginNote:
        'JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da a la idea una sala donde el interés se convierte en conversación, y el creador es dueño de esa sala. Empieza la conversación donde tus personas ya están.',
    },
    {
      title: 'Recoge comentarios y refina la idea',
      body: 'Pregunta a quienes se unen qué les entusiasma, qué les preocupa y qué harían primero. Ajusta el discurso, el alcance o el siguiente paso según sus respuestas.',
      joinOriginNote:
        'JoinOrigin mantiene la memoria compartida de una idea en un solo lugar: notas, decisiones y comentarios en la sala — de modo que el refinamiento es visible en lugar de perderse. Pregunta directamente a los miembros en la sala después de la primera semana.',
    },
    {
      title: 'Mantén la idea localizable a medida que crece',
      body: 'Revisa la página a medida que la idea se desarrolla: actualiza la promesa, las necesidades y el siguiente paso para que los nuevos miembros vean siempre la versión actual. El crecimiento se acumula cuando cada miembro puede describir la idea en una frase y compartir su enlace de unión.',
      joinOriginNote:
        'JoinOrigin mantiene conectados tu página de idea y su sala a medida que crece el interés: un solo lugar donde la promesa, la conversación y las personas son visibles. Date a conocer y crece.',
    },
  ],
};

export default content;
