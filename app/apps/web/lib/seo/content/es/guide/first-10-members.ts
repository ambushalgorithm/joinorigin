import type { GuideContent } from '../../types';

/**
 * «Cómo conseguir tus primeros 10 miembros» — guía L1 siempre vigente
 * (diseño §6.1, TASK-326).
 *
 * Recentrada en el modelo digital conectar→unirse→sala: la sala es la
 * superficie de unión — los miembros entran mediante enlaces de invitación
 * y se unen a la sala del grupo, donde la comunidad realmente vive. El
 * valor de JoinOrigin está tejido en la introducción y en cada paso (nota
 * `joinOriginNote` por paso), con un enfoque honesto: JoinOrigin no recluta
 * miembros ni organiza eventos. Un solo H1, estructura paso a paso y FAQ
 * reflejada 1:1 en el JSON-LD `FAQPage`. «Sala» está anclada a la sala
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'first-10-members',
  title:
    'Cómo conseguir tus primeros 10 miembros para un Origin nuevo o en crecimiento | JoinOrigin',
  description:
    'Consigue tus primeros 10 miembros sin un gran presupuesto — ya sea que estés lanzando un Origin nuevo o revitalizando uno existente — parte de tu red personal, comparte enlaces de invitación y haz que la sala sea el lugar al que las personas quieran unirse. Pasos prácticos de JoinOrigin.',
  intro: [
    'Los primeros diez miembros son los más difíciles de conseguir y los más importantes, porque definen la cultura de una comunidad antes de que tenga reputación para atraer desconocidos — y son igual de valiosos cuando una comunidad existente está estancada o reiniciándose, porque un núcleo comprometido es lo que convierte un grupo tranquilo en uno vivo. Ese problema de los primeros diez es, en el fondo, un problema de conectar personas, y es el problema central que resuelve JoinOrigin.',
    'JoinOrigin es un sistema operativo comunitario construido en torno al bucle digital conectar→unirse→sala: publicas un grupo, su sala se crea automáticamente y los miembros se unen mediante un enlace. La sala es la superficie de unión: cada persona que hace clic en Unirse o sigue un enlace de invitación llega a la sala del grupo, el único lugar donde la comunidad vive y donde los miembros nuevos se sienten conectados de inmediato. JoinOrigin no recluta miembros ni organiza eventos: esa parte es tuya. La plataforma hace muchísimo más fácil el descubrimiento y la unión; el crecimiento temprano sigue viniendo del alcance personal: las personas a las que invitas directamente con un enlace, las que ellas traen y las que se quedan porque la sala se siente viva.',
    'Esta guía divide el problema de los primeros diez miembros en pasos concretos — ya sea que estés comenzando un Origin nuevo o reactivando uno existente: partir de las personas que ya conoces, publicar tu grupo para que tenga una sala a la que unirse, invitar personalmente con enlaces, realizar una primera reunión que convierta a los asistentes en promotores y construir un hábito simple de recomendación para que cada miembro traiga al siguiente — y cada paso muestra dónde ayuda JoinOrigin.',
  ],
  dataPoints: [
    'Las invitaciones personales convierten a una tasa mucho más alta que las publicaciones públicas o los anuncios pagados.',
    'Un enlace de invitación elimina todas las barreras: un clic y un miembro nuevo está en la sala.',
    'Diez miembros activos son suficiente prueba social para que la mayoría de las personas sienta que un grupo es real y vale la pena unirse.',
    'JoinOrigin es un sistema operativo comunitario diseñado para ayudar a las personas a encontrar o crear Origins: no recluta miembros ni organiza eventos.',
  ],
  faq: [
    {
      question: '¿Por qué diez miembros específicamente?',
      answer:
        'Diez es un punto de inflexión: con diez habituales tienes una sala animada, un núcleo fiable para el debate y suficiente prueba social para atraer a quienes de otro modo dudarían. Por debajo de diez, la sala se siente frágil.',
    },
    {
      question: '¿Cuánto se tarda en conseguir los primeros diez miembros?',
      answer:
        'Con invitaciones personales constantes y una buena primera reunión, la mayoría de los organizadores llega a diez miembros comprometidos en tres a seis semanas. La clave es invitar cada semana — compartir enlaces, hacer seguimiento y mantener la sala activa —, no esperar a un gran lanzamiento.',
    },
    {
      question: '¿Qué pasa si no tengo una red personal grande?',
      answer:
        'Empieza más pequeño: invita a cinco personas que conozcas, pide a cada una que traiga a una y publica en dos grupos de nicho donde tu audiencia ya se reúne. Cada miembro que conservas se convierte en un canal hacia su propia red — y cada invitación puede ser un simple enlace hacia la sala.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a encontrar miembros?',
      answer:
        'Sí. JoinOrigin ayuda a las personas a descubrir y crear Origins: un lugar donde las personas que buscan un grupo pueden encontrar el tuyo y unirse a su sala mediante un enlace. Los pasos de esta guía — invitaciones personales y una gran primera reunión — son las formas más fiables de encontrar tus primeros miembros.',
    },
  ],
  sections: [
    'Haz una lista de cincuenta personas que ya conoces. Anota a cualquiera que encaje con el propósito de la comunidad: amigos, colegas, compañeros de clase, excompañeros de trabajo, vecinos y conocidos en línea. Necesitas unas cinco veces más nombres que los diez que quieres. JoinOrigin da a tu Origin un hogar visible y una sala que las personas pueden encontrar — pero los primeros nombres siguen viniendo de personas que conoces. Haz la lista de cincuenta y trata a cada uno como una presentación personal.',
    'Publica tu grupo y abre su sala. Una comunidad a la que no puedes señalar todavía no existe — y una cuyo hogar está disperso entre chats y listas es casi tan difícil de hacer crecer. Publica el grupo con una misión clara y deja que su sala se cree automáticamente para que haya un lugar real donde los miembros lleguen. Publicar un grupo en JoinOrigin crea automáticamente su sala: la sala es la superficie de unión y el creador es su dueño desde el principio. Si lo prefieres, configura tu grupo y su sala en las herramientas que ya usas antes de invitar a nadie.',
    'Invita personalmente con una petición específica y un enlace. Envía un mensaje corto que nombre la comunidad, la primera fecha o la primera conversación y por qué crees que la disfrutarían — e incluye el enlace de unión. Los mensajes personales superan a las publicaciones genéricas, y una fecha específica supera a una promesa vaga. JoinOrigin elimina la fricción de unirse una vez que las personas te encuentran: un enlace, un clic, dentro de la sala. Un mensaje personal corto con una fecha específica y un enlace convierte mejor que cualquier publicación pública.',
    'Pide a cada invitado que traiga a una persona. Hazlo parte normal de la petición: «Trae a un amigo al que le pueda gustar esto». Las invitaciones por recomendación son la forma en que las redes pequeñas se convierten en comunidades reales. JoinOrigin da a los miembros un hogar compartible para la comunidad, de modo que las conversaciones de recomendación apunten a un enlace real y a una sala real. Haz que «trae a un amigo» sea parte de la petición y dales el enlace para compartir.',
    'Realiza una primera reunión genuinamente buena. Gasta tu energía en la experiencia, no en el número de asistentes: una bienvenida cálida, un formato claro y una hora de finalización definida. Las personas que disfrutan la primera reunión traerán a los siguientes diez. JoinOrigin no organiza eventos: la experiencia es tuya. La plataforma ayuda a que la comunidad se forme en torno a ella: una sala a la que los miembros puedan señalar después y mantener la conexión.',
    'Invita a todos los asistentes a la sala. Al final de la reunión, comparte el enlace de unión y agrega a cualquiera que quiera quedarse. La sala es donde la comunidad vive entre reuniones: un miembro que se unió a la sala es un miembro que probablemente volverá. JoinOrigin mantiene la membresía y la comunicación de tu Origin en una sala organizada en lugar de en una hoja de registro. Un enlace simple hacia la sala hace posible el seguimiento.',
    'Haz seguimiento en 24 horas con una próxima fecha. Agradece a cada asistente, comparte un resumen de un párrafo y confirma la próxima reunión — en la sala, donde todos puedan verla. El seguimiento es donde un asistente de una sola vez se convierte en miembro. En JoinOrigin, un seguimiento tiene un hogar natural: un solo lugar donde viven el resumen y la próxima fecha. Un agradecimiento personal en 24 horas es lo que convierte a un asistente en miembro.',
    'Haz que invitar a otros sea trivialmente fácil. Da a los miembros una frase que puedan repetir y un enlace que puedan compartir: «Es un encuentro mensual para nuevos fundadores donde compartir lecciones — únete aquí». Una descripción corta y clara es la herramienta de reclutamiento más eficaz. JoinOrigin permite que una comunidad sea descrita, encontrada y unida en un solo lugar: los miembros pueden señalar a las personas hacia la sala en lugar de explicarla. Da a los miembros una frase y un enlace que puedan repetir.',
  ],
  steps: [
    {
      title: 'Haz una lista de cincuenta personas que ya conoces',
      body: 'Anota a cualquiera que encaje con el propósito de la comunidad: amigos, colegas, compañeros de clase, excompañeros de trabajo, vecinos y conocidos en línea. Necesitas unas cinco veces más nombres que los diez que quieres.',
      joinOriginNote:
        'JoinOrigin da a tu Origin un hogar visible y una sala que las personas pueden encontrar — pero los primeros nombres siguen viniendo de personas que conoces. Haz la lista de cincuenta y trata a cada uno como una presentación personal.',
    },
    {
      title: 'Publica tu grupo y abre su sala',
      body: 'Una comunidad a la que no puedes señalar todavía no existe — y una cuyo hogar está disperso entre chats y listas es casi tan difícil de hacer crecer. Publica el grupo con una misión clara y deja que su sala se cree automáticamente para que haya un lugar real donde los miembros lleguen.',
      joinOriginNote:
        'Publicar un grupo en JoinOrigin crea automáticamente su sala: la sala es la superficie de unión y el creador es su dueño desde el principio. Si lo prefieres, configura tu grupo y su sala en las herramientas que ya usas antes de invitar a nadie.',
    },
    {
      title: 'Invita personalmente con una petición específica y un enlace',
      body: 'Envía un mensaje corto que nombre la comunidad, la primera fecha o la primera conversación y por qué crees que la disfrutarían — e incluye el enlace de unión. Los mensajes personales superan a las publicaciones genéricas, y una fecha específica supera a una promesa vaga.',
      joinOriginNote:
        'JoinOrigin elimina la fricción de unirse una vez que las personas te encuentran: un enlace, un clic, dentro de la sala. Un mensaje personal corto con una fecha específica y un enlace convierte mejor que cualquier publicación pública.',
    },
    {
      title: 'Pide a cada invitado que traiga a una persona',
      body: 'Hazlo parte normal de la petición: «Trae a un amigo al que le pueda gustar esto». Las invitaciones por recomendación son la forma en que las redes pequeñas se convierten en comunidades reales.',
      joinOriginNote:
        'JoinOrigin da a los miembros un hogar compartible para la comunidad, de modo que las conversaciones de recomendación apunten a un enlace real y a una sala real. Haz que «trae a un amigo» sea parte de la petición y dales el enlace para compartir.',
    },
    {
      title: 'Realiza una primera reunión genuinamente buena',
      body: 'Gasta tu energía en la experiencia, no en el número de asistentes: una bienvenida cálida, un formato claro y una hora de finalización definida. Las personas que disfrutan la primera reunión traerán a los siguientes diez.',
      joinOriginNote:
        'JoinOrigin no organiza eventos: la experiencia es tuya. La plataforma ayuda a que la comunidad se forme en torno a ella: una sala a la que los miembros puedan señalar después y mantener la conexión.',
    },
    {
      title: 'Invita a todos los asistentes a la sala',
      body: 'Al final de la reunión, comparte el enlace de unión y agrega a cualquiera que quiera quedarse. La sala es donde la comunidad vive entre reuniones: un miembro que se unió a la sala es un miembro que probablemente volverá.',
      joinOriginNote:
        'JoinOrigin mantiene la membresía y la comunicación de tu Origin en una sala organizada en lugar de en una hoja de registro. Un enlace simple hacia la sala hace posible el seguimiento.',
    },
    {
      title: 'Haz seguimiento en 24 horas con una próxima fecha',
      body: 'Agradece a cada asistente, comparte un resumen de un párrafo y confirma la próxima reunión — en la sala, donde todos puedan verla. El seguimiento es donde un asistente de una sola vez se convierte en miembro.',
      joinOriginNote:
        'En JoinOrigin, un seguimiento tiene un hogar natural: un solo lugar donde viven el resumen y la próxima fecha. Un agradecimiento personal en 24 horas es lo que convierte a un asistente en miembro.',
    },
    {
      title: 'Haz que invitar a otros sea trivialmente fácil',
      body: 'Da a los miembros una frase que puedan repetir y un enlace que puedan compartir: «Es un encuentro mensual para nuevos fundadores donde compartir lecciones — únete aquí». Una descripción corta y clara es la herramienta de reclutamiento más eficaz.',
      joinOriginNote:
        'JoinOrigin permite que una comunidad sea descrita, encontrada y unida en un solo lugar: los miembros pueden señalar a las personas hacia la sala en lugar de explicarla. Da a los miembros una frase y un enlace que puedan repetir.',
    },
  ],
};

export default content;
