import type { GuideContent } from '../../types';

/**
 * «Cómo publicar una idea de pequeña empresa» — guía L1 siempre vigente
 * (diseño §6.1, TASK-353).
 *
 * Redactada según el flujo de pantalla del producto §2 (bucle central):
 * publicar una idea de pequeña empresa → página pública de la idea →
 * unirse mediante enlace → sala creada automáticamente AL PUBLICAR → el
 * creador controla la sala → crecimiento por feed e invitaciones. La
 * página de idea es la promesa de la tienda; la sala es donde los clientes,
 * colaboradores y primeros creyentes se reúnen en torno al negocio. La
 * plataforma está en marcha: publicar una idea crea su página y su sala
 * ahora mismo. «Sala» está anclada a la sala Matrix (§6.3). La frase no se
 * usa en el texto redactado.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'es',
  slug: 'publish-a-small-business-idea',
  title: 'Cómo publicar una idea de pequeña empresa: página de idea + sala | JoinOrigin',
  description:
    'Publica una idea de pequeña empresa en JoinOrigin — ya sea que estés lanzando un negocio nuevo o que un negocio existente comparta lo que ofrece — escribe una página de idea pública, abre su sala automáticamente e invita a clientes y colaboradores que quieran verlo realidad. Pasos prácticos de JoinOrigin.',
  intro: [
    'Las pequeñas empresas suelen empezar de la misma manera: alguien nota un problema real en su barrio, su trabajo o su afición, y no puede dejar de pensar en la solución — pero muchas otras ya están en marcha: una tienda en funcionamiento, un servicio activo, un producto con clientes. Tanto si tu negocio es todavía una chispa como si ya atiende a personas, el siguiente paso es el mismo: convertir lo que tienes en algo que otras personas puedan ver, reaccionar y unirse. Una pequeña empresa necesita un hogar público y necesita personas a su alrededor — antes de necesitar una tienda, y mucho después de que exista una.',
    'El bucle de JoinOrigin funciona así: publicas una idea de pequeña empresa, aparece su página de idea pública y su sala se crea automáticamente en el momento de publicar. Las personas descubren la página o siguen un enlace, unirse es un solo clic y llegan a la sala: una sala Matrix controlada por el creador donde los clientes, colaboradores y primeros creyentes pueden hacer preguntas, compartir comentarios e involucrarse. El creador es dueño de la sala desde el segundo cero y decide quién se une y qué ocurre dentro.',
    'Esta guía recorre la publicación de una idea de pequeña empresa como abrirías una tienda: nombrar al cliente y el problema, escribir la página de idea como un escaparate, publicarla y abrir la sala, compartir la página con tu red local, invitar a los primeros clientes y colaboradores, escuchar en la sala, refinar la oferta a partir de comentarios reales y hacer crecer la sala hasta convertirla en tu primera base de clientes.',
  ],
  dataPoints: [
    'Las ideas de pequeña empresa más claras empiezan con un cliente nombrado y un problema específico, no con una audiencia general.',
    'En JoinOrigin, publicar una idea crea automáticamente su sala: el negocio tiene un lugar para clientes y colaboradores desde el inicio.',
    'Un enlace de unión es la invitación más simple: un enlace, un clic y una persona interesada está en la sala.',
    'JoinOrigin es un sistema operativo comunitario que ayuda a las personas a encontrar ideas y a las personas detrás de ellas: publica tu idea y su sala se abre de inmediato.',
  ],
  faq: [
    {
      question: '¿En qué se diferencia una idea de pequeña empresa de una página de idea normal?',
      answer:
        'El formato de la página es el mismo, pero la promesa es más nítida: un cliente, un problema y una oferta. Donde una idea general invita a colaboradores, una página de idea de pequeña empresa invita a los primeros clientes y creyentes locales: personas que realmente comprarían, recomendarían o ayudarían a empezar o a hacer crecer lo que ya está en marcha.',
    },
    {
      question: '¿Cuándo se crea la sala de mi idea de negocio?',
      answer:
        'La sala se crea automáticamente en el momento en que publicas la idea. El creador es dueño de la sala desde el segundo cero y puede invitar, eliminar y asignar roles dentro de Element. También puedes abrir una sala con las herramientas que ya usas e invitar a las personas a las que les importa el problema.',
    },
    {
      question: '¿Quién debería unirse a la sala de una idea de pequeña empresa?',
      answer:
        'Los primeros clientes, las personas con la habilidad que te falta y los locales que puedan recomendarte. La sala es donde pruebas la demanda, refinas la oferta y encuentras a los primeros creyentes — antes de gastar dinero en inventario, alquileres o marketing.',
    },
    {
      question: '¿Qué debería prometer la página de idea?',
      answer:
        'Un cliente nombrado, un problema y lo que planeas ofrecer. Sé honesto sobre la etapa: «Estoy probando esta idea y quiero hablar con personas que sienten este problema» es una promesa fuerte. La página decide si las personas adecuadas hacen clic en Unirse.',
    },
    {
      question: '¿Puede JoinOrigin ayudarme a publicar una idea de pequeña empresa hoy?',
      answer:
        'Sí. Publicar una idea en JoinOrigin crea su página y su sala de forma atómica: la sala se abre en el momento de publicar y tú la controlas desde el inicio. Publica la idea en algún lugar público y abre una sala para el debate; cada miembro nuevo que invites amplía tu alcance.',
    },
  ],
  sections: [
    'Nombra al cliente y el problema. Antes de escribir nada, nombra a la persona específica que siente este problema y describe el problema con sus palabras. Una pequeña empresa triunfa cuando sirve bien una necesidad real. JoinOrigin está diseñado en torno a páginas de idea localizables, y las páginas más claras parten de un cliente nombrado. Escribe al cliente y el problema y pruébalos con tres personas que encajen.',
    'Escribe la página de idea como un escaparate. La página debe mostrar qué ofreces, para quién es, qué cuesta en tiempo o dinero y en qué etapa está la idea. Mantenla concreta: un puesto temporal, un producto, un servicio, una tienda. Publicar una idea en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el inicio. Redacta la página como una publicación pública corta y refínala con comentarios.',
    'Publica la idea y abre su sala. Publicar es el momento en que la idea de negocio se vuelve localizable. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño. En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Publica la idea públicamente y abre una sala para la conversación en torno a ella.',
    'Comparte la página con tu red local. Las pequeñas empresas crecen gracias al alcance local. Comparte la página de idea con vecinos, colegas, grupos locales y cualquiera que conozca el problema de primera mano. Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu idea hace el trabajo.',
    'Invita a los primeros clientes y colaboradores. Invita a las personas que realmente comprarían o ayudarían: posibles clientes, alguien con una habilidad que te falta, un mentor o un organizador local. JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    'Escucha en la sala. Pregunta a quienes se unen cómo usarían la oferta, cuánto pagarían y qué les frena. La sala es donde aparece la demanda real — o no aparece. JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da a la idea de negocio una sala donde el interés se convierte en comentarios, y el creador es dueño de esa sala. Pregunta directamente a los miembros en la sala.',
    'Refina la oferta a partir de comentarios reales. Ajusta el precio, el alcance, el canal o la promesa según lo que digan quienes se unen. Las pequeñas empresas se construyen con pequeñas iteraciones. JoinOrigin mantiene la memoria compartida de una idea en un solo lugar: notas, decisiones y comentarios en la sala — de modo que el refinamiento es visible en lugar de perderse. Cambia una cosa a la vez y observa la respuesta.',
    'Haz crecer la sala hasta convertirla en tu primera base de clientes. Sigue invitando, sigue compartiendo novedades y mantén viva la sala a medida que la oferta se consolida. Las personas de la sala son tus primeros clientes y tus primeros promotores. JoinOrigin mantiene conectados tu página de idea y su sala a medida que el negocio crece: un solo lugar donde la promesa, la conversación y las personas son visibles. Date a conocer y crece.',
  ],
  steps: [
    {
      title: 'Nombra al cliente y el problema',
      body: 'Antes de escribir nada, nombra a la persona específica que siente este problema y describe el problema con sus palabras. Una pequeña empresa triunfa cuando sirve bien una necesidad real.',
      joinOriginNote:
        'JoinOrigin está diseñado en torno a páginas de idea localizables, y las páginas más claras parten de un cliente nombrado. Escribe al cliente y el problema y pruébalos con tres personas que encajen.',
    },
    {
      title: 'Escribe la página de idea como un escaparate',
      body: 'La página debe mostrar qué ofreces, para quién es, qué cuesta en tiempo o dinero y en qué etapa está la idea. Mantenla concreta: un puesto temporal, un producto, un servicio, una tienda.',
      joinOriginNote:
        'Publicar una idea en JoinOrigin crea automáticamente su página y su sala, con el creador controlando la sala desde el inicio. Redacta la página como una publicación pública corta y refínala con comentarios.',
    },
    {
      title: 'Publica la idea y abre su sala',
      body: 'Publicar es el momento en que la idea de negocio se vuelve localizable. En JoinOrigin, la sala se crea automáticamente al mismo tiempo: no hay un paso de configuración aparte y el creador es su dueño.',
      joinOriginNote:
        'En JoinOrigin, la página, la sala y el enlace de unión son una sola publicación. Publica la idea públicamente y abre una sala para la conversación en torno a ella.',
    },
    {
      title: 'Comparte la página con tu red local',
      body: 'Las pequeñas empresas crecen gracias al alcance local. Comparte la página de idea con vecinos, colegas, grupos locales y cualquiera que conozca el problema de primera mano.',
      joinOriginNote:
        'Unirse en JoinOrigin es una sola acción: hacer clic en Unirse en la página pública o seguir un enlace de invitación directa de un miembro. Un enlace corto y claro a tu idea hace el trabajo.',
    },
    {
      title: 'Invita a los primeros clientes y colaboradores',
      body: 'Invita a las personas que realmente comprarían o ayudarían: posibles clientes, alguien con una habilidad que te falta, un mentor o un organizador local.',
      joinOriginNote:
        'JoinOrigin facilita el descubrimiento: un lugar donde las personas que buscan una idea pueden encontrar la tuya y unirse mediante un enlace. Las invitaciones personales siguen haciendo el trabajo pesado, y cada persona que se une se convierte en un canal hacia su propia red.',
    },
    {
      title: 'Escucha en la sala',
      body: 'Pregunta a quienes se unen cómo usarían la oferta, cuánto pagarían y qué les frena. La sala es donde aparece la demanda real — o no aparece.',
      joinOriginNote:
        'JoinOrigin no dirige estas conversaciones; la sala es tuya para darle forma. La plataforma da a la idea de negocio una sala donde el interés se convierte en comentarios, y el creador es dueño de esa sala. Pregunta directamente a los miembros en la sala.',
    },
    {
      title: 'Refina la oferta a partir de comentarios reales',
      body: 'Ajusta el precio, el alcance, el canal o la promesa según lo que digan quienes se unen. Las pequeñas empresas se construyen con pequeñas iteraciones.',
      joinOriginNote:
        'JoinOrigin mantiene la memoria compartida de una idea en un solo lugar: notas, decisiones y comentarios en la sala — de modo que el refinamiento es visible en lugar de perderse. Cambia una cosa a la vez y observa la respuesta.',
    },
    {
      title: 'Haz crecer la sala hasta convertirla en tu primera base de clientes',
      body: 'Sigue invitando, sigue compartiendo novedades y mantén viva la sala a medida que la oferta se consolida. Las personas de la sala son tus primeros clientes y tus primeros promotores.',
      joinOriginNote:
        'JoinOrigin mantiene conectados tu página de idea y su sala a medida que el negocio crece: un solo lugar donde la promesa, la conversación y las personas son visibles. Date a conocer y crece.',
    },
  ],
};

export default content;
