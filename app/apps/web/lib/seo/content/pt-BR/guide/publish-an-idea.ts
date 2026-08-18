import type { GuideContent } from '../../types';

/**
 * "Como Publicar uma Ideia" — guia L1 sempre-verde (design §6.1, TASK-353).
 *
 * Escrito contra o fluxo de telas do produto §2, loop central: Descobrir →
 * página pública da ideia → Participar via link → Sala criada automaticamente
 * AO PUBLICAR → criador controla a sala → crescimento por feed/convites. A
 * página da ideia é a promessa pública; a sala é onde as pessoas interessadas
 * se reúnem e conversam. A plataforma está no ar: publicar uma ideia cria a
 * página e a sala dela agora. "Sala" está ancorada na sala do Matrix (§6.3).
 * A expressão nunca é usada no texto autoral.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'publish-an-idea',
  title:
    'Como Publicar uma Ideia: Transforme uma Centelha em uma Página de Ideia Encontrável | JoinOrigin',
  description:
    'Publique uma ideia na JoinOrigin — seja ela uma centelha nova ou um projeto existente que você quer que as pessoas encontrem — escreva uma página de ideia pública, deixe a sala abrir automaticamente e convide as pessoas que querem construí-la com você. Passos práticos da JoinOrigin.',
  intro: [
    'A maioria das ideias morre nos rascunhos — uma anotação no celular, uma conversa meio esquecida, um documento que ninguém mais viu. A razão raramente é a ideia ser ruim. É que ninguém conseguia encontrá-la, e encontrar as pessoas certas é o jogo inteiro. Esse problema de conectar pessoas é exatamente o que a JoinOrigin resolve — seja a ideia uma centelha nova ou um projeto existente que vem avançando em silêncio, sem um lar encontrável.',
    'O ciclo da JoinOrigin funciona assim: você publica uma ideia, uma página de ideia pública aparece e a sala dela é criada automaticamente no momento da publicação. As pessoas descobrem a página pelo Explorar ou seguem um link que você compartilhou, e participar é um único clique. Elas entram na sala — uma sala Matrix controlada pelo criador, onde a conversa em torno da ideia realmente acontece. O criador é dono da sala desde o segundo zero e decide quem entra e o que acontece dentro dela.',
    'Este guia percorre o caminho inteiro: comprimir a ideia em uma frase clara, escrever uma página que as pessoas possam encontrar, publicá-la e abrir a sala, compartilhar o link de participação, convidar as primeiras pessoas interessadas, conduzir a primeira conversa, refinar a ideia a partir de feedback real e manter a ideia encontrável enquanto ela cresce. Funciona para qualquer ideia — uma pequena empresa, uma startup, um clube do livro, um projeto comunitário, um produto que ainda não existe ou um projeto que já existe e precisa de mais pessoas em torno dele.',
  ],
  dataPoints: [
    'Uma proposta de ideia em uma frase é mais encontrável do que um documento longo — clareza é um recurso de descoberta.',
    'Na JoinOrigin, publicar uma ideia cria automaticamente a sala dela — nunca existe um passo separado de "criar o chat depois".',
    'Um link de participação é o convite mais simples: um link, um clique, e uma pessoa interessada está na sala.',
    'A JoinOrigin é um sistema operacional de comunidades que ajuda as pessoas a encontrar ideias e as pessoas por trás delas — publique sua ideia e a sala dela abre imediatamente.',
  ],
  faq: [
    {
      question: 'O que exatamente é uma página de ideia?',
      answer:
        'Uma página de ideia é o lar público e indexável de uma ideia na JoinOrigin — uma página clara que diz o que a ideia é, por que ela importa e para quem é, com uma ação de Participar. As pessoas a descobrem pelo Explorar ou por um link compartilhado, e participar as leva à sala da ideia.',
    },
    {
      question: 'Quando a sala é criada?',
      answer:
        'A sala é criada automaticamente no momento em que você publica a ideia. O criador é dono da sala desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element. Você também pode montar a mesma estrutura — uma página pública mais uma sala — com as ferramentas que já usa.',
    },
    {
      question: 'Como as pessoas encontram minha ideia?',
      answer:
        'Por descoberta e compartilhamento: uma página de ideia é indexável e aparece no Explorar, e todo link de participação que você compartilha aponta direto para ela. O tráfego inicial mais confiável é o pessoal — compartilhar a página e o link dela com pessoas que já se importam com o problema.',
    },
    {
      question: 'Qual é a diferença entre uma ideia e um projeto?',
      answer:
        'Uma ideia é uma proposta em torno da qual as pessoas se reúnem — a sala é onde as pessoas interessadas conversam e testam o encaixe. Um projeto é o que um grupo formado começa a fazer junto, com página e sala próprias. Publique primeiro a ideia; o projeto vem quando as pessoas se comprometem.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a publicar uma ideia hoje?',
      answer:
        'Sim. Publicar uma ideia na JoinOrigin cria a página e a sala dela de forma atômica — a sala abre no momento em que você publica, e você a controla desde o início. Publique sua ideia e abra uma sala para discussão; cada novo membro que você convida amplia seu alcance.',
    },
  ],
  sections: [
    'Defina a ideia em uma frase clara. Comprima a ideia em uma única frase: para quem é, o que ela muda e por que importa. Se você não consegue dizer em uma frase, não está pronto para publicá-la. A JoinOrigin é desenhada em torno de páginas de ideia encontráveis — uma proposta de uma frase é o núcleo da página e a frase que as pessoas vão procurar. Escreva a frase e teste-a com três pessoas antes de seguir em frente.',
    'Escreva a página de ideia com uma promessa e uma necessidade. A página deve declarar a ideia, por que ela importa, o que precisa e quem você quer que participe. Seja honesto sobre o estágio da ideia — uma centelha, um protótipo, um produto. A JoinOrigin cria automaticamente a página e a sala quando você publica uma ideia; o criador controla a sala desde o início e pode convidar, remover e atribuir funções dentro do Element. Publique a ideia e abra uma sala para discussão em torno dela.',
    'Publique a ideia e deixe a sala dela abrir. Publicar é o momento em que a ideia se torna encontrável. Na JoinOrigin, publicar cria automaticamente a sala — nunca existe um passo de "criar o chat depois", e o criador é dono da sala desde o segundo zero. Na JoinOrigin, a página de ideia e a sala dela são uma única publicação atômica. Você também pode compartilhar a página publicamente e montar a sala nas ferramentas que já usa.',
    'Compartilhe o link de participação. O link de participação é o caminho mais curto do interesse à conexão: um link, um clique, e uma pessoa interessada entra na sala. Coloque-o em todos os lugares onde as pessoas certas se reúnem. Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para sua ideia resolve.',
    'Convide pessoalmente as primeiras pessoas interessadas. Convites pessoais convertem melhor do que publicações públicas. Envie mensagem para pessoas que se encaixam no público da ideia, compartilhe o link de participação e peça que tragam mais uma pessoa que possa se interessar. A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    'Conduza a primeira conversa na sala. As primeiras conversas decidem se uma ideia tem impulso. Abra a sala com um estímulo claro — qual é o problema, qual é o primeiro passo, o que cada um traz — e deixe as pessoas responderem. A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá à ideia uma sala onde o interesse vira conversa, e o criador é dono dessa sala. Comece a conversa onde suas pessoas já estão.',
    'Colete feedback e refine a ideia. Pergunte aos participantes o que os empolga, o que os preocupa e o que eles fariam primeiro. Ajuste a proposta, o escopo ou o próximo passo com base nas respostas. A JoinOrigin mantém a memória compartilhada de uma ideia em um só lugar — anotações, decisões e feedback na sala — para que o refinamento seja visível em vez de perdido. Pergunte diretamente aos membros na sala após a primeira semana.',
    'Mantenha a ideia encontrável enquanto ela cresce. Revise a página conforme a ideia se desenvolve — atualize a promessa, as necessidades e o próximo passo para que novos participantes sempre vejam a versão atual. O crescimento se compõe quando cada membro consegue descrever a ideia em uma frase e compartilhar o link de participação. A JoinOrigin mantém sua página de ideia e a sala dela conectadas conforme o interesse cresce — um lugar onde a promessa, a conversa e as pessoas são visíveis. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Defina a ideia em uma frase clara',
      body: 'Comprima a ideia em uma única frase: para quem é, o que ela muda e por que importa. Se você não consegue dizer em uma frase, não está pronto para publicá-la.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de páginas de ideia encontráveis — uma proposta de uma frase é o núcleo da página e a frase que as pessoas vão procurar. Escreva a frase e teste-a com três pessoas antes de seguir em frente.',
    },
    {
      title: 'Escreva a página de ideia com uma promessa e uma necessidade',
      body: 'A página deve declarar a ideia, por que ela importa, o que precisa e quem você quer que participe. Seja honesto sobre o estágio da ideia — uma centelha, um protótipo, um produto.',
      joinOriginNote:
        'A JoinOrigin cria automaticamente a página e a sala quando você publica uma ideia; o criador controla a sala desde o início e pode convidar, remover e atribuir funções dentro do Element. Publique a ideia e abra uma sala para discussão em torno dela.',
    },
    {
      title: 'Publique a ideia e deixe a sala dela abrir',
      body: 'Publicar é o momento em que a ideia se torna encontrável. Na JoinOrigin, publicar cria automaticamente a sala — nunca existe um passo de "criar o chat depois", e o criador é dono da sala desde o segundo zero.',
      joinOriginNote:
        'Na JoinOrigin, a página de ideia e a sala dela são uma única publicação atômica. Você também pode compartilhar a página publicamente e montar a sala nas ferramentas que já usa.',
    },
    {
      title: 'Compartilhe o link de participação',
      body: 'O link de participação é o caminho mais curto do interesse à conexão: um link, um clique, e uma pessoa interessada entra na sala. Coloque-o em todos os lugares onde as pessoas certas se reúnem.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para sua ideia resolve.',
    },
    {
      title: 'Convide pessoalmente as primeiras pessoas interessadas',
      body: 'Convites pessoais convertem melhor do que publicações públicas. Envie mensagem para pessoas que se encaixam no público da ideia, compartilhe o link de participação e peça que tragam mais uma pessoa que possa se interessar.',
      joinOriginNote:
        'A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    },
    {
      title: 'Conduza a primeira conversa na sala',
      body: 'As primeiras conversas decidem se uma ideia tem impulso. Abra a sala com um estímulo claro — qual é o problema, qual é o primeiro passo, o que cada um traz — e deixe as pessoas responderem.',
      joinOriginNote:
        'A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá à ideia uma sala onde o interesse vira conversa, e o criador é dono dessa sala. Comece a conversa onde suas pessoas já estão.',
    },
    {
      title: 'Colete feedback e refine a ideia',
      body: 'Pergunte aos participantes o que os empolga, o que os preocupa e o que eles fariam primeiro. Ajuste a proposta, o escopo ou o próximo passo com base nas respostas.',
      joinOriginNote:
        'A JoinOrigin mantém a memória compartilhada de uma ideia em um só lugar — anotações, decisões e feedback na sala — para que o refinamento seja visível em vez de perdido. Pergunte diretamente aos membros na sala após a primeira semana.',
    },
    {
      title: 'Mantenha a ideia encontrável enquanto ela cresce',
      body: 'Revise a página conforme a ideia se desenvolve — atualize a promessa, as necessidades e o próximo passo para que novos participantes sempre vejam a versão atual. O crescimento se compõe quando cada membro consegue descrever a ideia em uma frase e compartilhar o link de participação.',
      joinOriginNote:
        'A JoinOrigin mantém sua página de ideia e a sala dela conectadas conforme o interesse cresce — um lugar onde a promessa, a conversa e as pessoas são visíveis. Seja descoberto e cresça.',
    },
  ],
};

export default content;
