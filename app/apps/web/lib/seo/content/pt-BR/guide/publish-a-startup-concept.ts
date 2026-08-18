import type { GuideContent } from '../../types';

/**
 * "Como Publicar um Conceito de Startup" — guia L1 sempre-verde
 * (design §6.1, TASK-353).
 *
 * Escrito contra o fluxo de telas do produto §2, loop central: publicar um
 * conceito de startup → página pública da ideia → Participar via link → sala
 * criada automaticamente AO PUBLICAR → criador controla a sala → crescimento
 * por feed/convites. A página de ideia é a promessa pública do conceito; a
 * sala é onde primeiros crentes, potenciais cofundadores e primeiros
 * testadores se reúnem em torno da startup. A plataforma está no ar: publicar
 * um conceito cria a página e a sala dele agora. "Sala" está ancorada na sala
 * do Matrix (§6.3). A expressão nunca é usada no texto autoral.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'publish-a-startup-concept',
  title: 'Como Publicar um Conceito de Startup: Página de Ideia + Sala | JoinOrigin',
  description:
    'Publique um conceito de startup na JoinOrigin — esteja você na fase de ideia ou já tocando uma empresa — escreva uma página de ideia pública, abra a sala automaticamente e reúna primeiros crentes, cofundadores e primeiros testadores em torno da ideia. Passos práticos da JoinOrigin.',
  intro: [
    'Toda startup — esteja ela ainda um conceito no papel ou já operando com clientes — precisa de pessoas mais do que de capital: um fundador que possa construí-la, uma equipe que possa entregá-la e usuários que possam testá-la. Uma startup que ninguém consegue encontrar não reúne nada disso. Publicar o conceito como uma página de ideia encontrável e depois abrir uma sala onde a conversa possa acontecer é o primeiro passo honesto de construir uma startup — não o deck, não o logotipo, não o pitch — e funciona igualmente bem para uma empresa existente que quer mais crentes, cofundadores e testadores em torno do que está construindo.',
    'O ciclo da JoinOrigin funciona assim: você publica um conceito de startup, a página pública dele aparece e a sala é criada automaticamente no momento da publicação. As pessoas descobrem a página ou seguem um link, participar é um único clique, e elas entram na sala — uma sala Matrix controlada pelo criador, onde primeiros crentes podem fazer perguntas, potenciais cofundadores podem testar o encaixe e primeiros usuários podem dar feedback. O criador é dono da sala desde o segundo zero e decide quem entra e o que acontece dentro dela.',
    'Este guia percorre a publicação de um conceito de startup como um operador — seja o conceito totalmente novo ou a empresa já rodando: comprimir o conceito em uma frase, escrever a página com sinais honestos, publicá-la e abrir a sala, compartilhá-la com comunidades de fundadores, convidar primeiros crentes e testadores, conduzir conversas estruturadas, usar a sala para formar uma equipe de teste e alimentar a sala no feed conforme o conceito é validado.',
  ],
  dataPoints: [
    'Um conceito de startup comprimido em uma frase é mais fácil de compartilhar, testar e compor equipe do que um plano de negócios longo.',
    'Na JoinOrigin, publicar um conceito cria automaticamente a sala dele — a startup tem um lugar para crentes e testadores desde o início.',
    'Um link de participação é o convite mais simples: um link, um clique, e uma pessoa interessada está na sala.',
    'A JoinOrigin é um sistema operacional de comunidades que ajuda as pessoas a encontrar ideias e as pessoas por trás delas — publique seu conceito e a sala dele abre imediatamente.',
  ],
  faq: [
    {
      question:
        'Como um conceito de startup é diferente de uma página de ideia de pequena empresa?',
      answer:
        'O formato da página é o mesmo, mas a ênfase muda: uma ideia de pequena empresa centra-se em um cliente e uma oferta, enquanto um conceito de startup centra-se em um problema ambicioso e na equipe necessária para resolvê-lo. Uma página de startup atrai primeiros crentes, potenciais cofundadores e primeiros testadores em vez de clientes locais.',
    },
    {
      question: 'Quando a sala é criada para meu conceito de startup?',
      answer:
        'A sala é criada automaticamente no momento em que você publica o conceito. O criador é dono da sala desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element. Você também pode abrir uma sala com as ferramentas que já usa e convidar as pessoas que compartilham a ambição.',
    },
    {
      question: 'Quem deve participar da sala de um conceito de startup?',
      answer:
        'Primeiros crentes que compartilham o problema, potenciais cofundadores testando o encaixe e primeiros usuários dispostos a testar uma versão bruta. A sala é onde você encontra as pessoas que transformam um conceito em equipe — as mesmas pessoas que apresentações calorosas levariam meses para alcançar.',
    },
    {
      question: 'O que faz uma boa página de conceito de startup?',
      answer:
        'Uma frase honesta sobre o problema e a abordagem, o estágio do conceito e a ajuda específica que você precisa — um construtor, um designer, um especialista de domínio, primeiros testadores. Honestidade sobre o estágio atrai as pessoas certas; exageros não atraem ninguém.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a publicar um conceito de startup hoje?',
      answer:
        'Sim. Publicar um conceito na JoinOrigin cria a página e a sala dele de forma atômica — a sala abre no momento em que você publica, e você a controla desde o início. Publique o conceito em algum lugar público e abra uma sala para discussão; cada novo membro que você convida amplia seu alcance.',
    },
  ],
  sections: [
    'Comprima o conceito em uma frase. Reduza a startup ao essencial: o problema, a abordagem e para quem é. Se você não consegue dizer em uma frase, o conceito não está pronto para publicar. A JoinOrigin é desenhada em torno de páginas de ideia encontráveis, e uma proposta de uma frase é o núcleo da página. Escreva a frase e teste-a com três pessoas que entendem o problema.',
    'Escreva a página com sinais honestos. Declare o problema, a abordagem, o estágio — ideia, protótipo ou produto — e a ajuda específica que você precisa. Honestidade atrai as pessoas certas. Publicar um conceito na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Rascunhe a página como uma publicação pública curta e itere com feedback.',
    'Publique o conceito e abra a sala dele. Publicar é o momento em que o conceito se torna encontrável. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela. Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Publique o conceito publicamente e abra uma sala para a conversa em torno dele.',
    'Compartilhe o conceito com comunidades de fundadores. Startups crescem por redes de fundadores. Compartilhe a página de ideia com grupos de fundadores, comunidades de startups, aceleradoras e qualquer pessoa que conheça o problema. Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu conceito resolve.',
    'Convide primeiros crentes e testadores. Convide as pessoas que compartilham a ambição: potenciais cofundadores, especialistas de domínio e usuários dispostos a testar uma versão bruta. A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    'Conduza conversas estruturadas na sala. Pergunte aos participantes o que os empolga, o que os preocupa e o que fariam primeiro. Uma sala de startup é uma entrevista contínua — as respostas moldam o conceito. A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá ao conceito uma sala onde o interesse vira percepção, e o criador é dono dessa sala. Conduza as conversas diretamente na sala.',
    'Use a sala para formar uma equipe de teste. Quando as pessoas certas aparecerem, proponha um teste pequeno — um protótipo, uma landing page ou uma sessão de trabalho — e veja como a equipe trabalha junto. A JoinOrigin dá às comunidades uma sala compartilhada para o trabalho e os projetos delas, um lugar natural para um teste aparecer. Um pequeno protótipo real é o teste de encaixe mais confiável.',
    'Alimente a sala no feed enquanto valida. Continue publicando atualizações, mantenha a sala viva e deixe o impulso do conceito se tornar visível para uma rede maior. O feed transforma um conceito em prova de que as pessoas se importam. Na JoinOrigin, atualizações da sala fluem para o feed — o ciclo de crescimento em que cada novo membro amplia a superfície de descoberta. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Comprima o conceito em uma frase',
      body: 'Reduza a startup ao essencial: o problema, a abordagem e para quem é. Se você não consegue dizer em uma frase, o conceito não está pronto para publicar.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de páginas de ideia encontráveis, e uma proposta de uma frase é o núcleo da página. Escreva a frase e teste-a com três pessoas que entendem o problema.',
    },
    {
      title: 'Escreva a página com sinais honestos',
      body: 'Declare o problema, a abordagem, o estágio — ideia, protótipo ou produto — e a ajuda específica que você precisa. Honestidade atrai as pessoas certas.',
      joinOriginNote:
        'Publicar um conceito na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Rascunhe a página como uma publicação pública curta e itere com feedback.',
    },
    {
      title: 'Publique o conceito e abra a sala dele',
      body: 'Publicar é o momento em que o conceito se torna encontrável. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela.',
      joinOriginNote:
        'Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Publique o conceito publicamente e abra uma sala para a conversa em torno dele.',
    },
    {
      title: 'Compartilhe o conceito com comunidades de fundadores',
      body: 'Startups crescem por redes de fundadores. Compartilhe a página de ideia com grupos de fundadores, comunidades de startups, aceleradoras e qualquer pessoa que conheça o problema.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu conceito resolve.',
    },
    {
      title: 'Convide primeiros crentes e testadores',
      body: 'Convide as pessoas que compartilham a ambição: potenciais cofundadores, especialistas de domínio e usuários dispostos a testar uma versão bruta.',
      joinOriginNote:
        'A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    },
    {
      title: 'Conduza conversas estruturadas na sala',
      body: 'Pergunte aos participantes o que os empolga, o que os preocupa e o que fariam primeiro. Uma sala de startup é uma entrevista contínua — as respostas moldam o conceito.',
      joinOriginNote:
        'A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá ao conceito uma sala onde o interesse vira percepção, e o criador é dono dessa sala. Conduza as conversas diretamente na sala.',
    },
    {
      title: 'Use a sala para formar uma equipe de teste',
      body: 'Quando as pessoas certas aparecerem, proponha um teste pequeno — um protótipo, uma landing page ou uma sessão de trabalho — e veja como a equipe trabalha junto.',
      joinOriginNote:
        'A JoinOrigin dá às comunidades uma sala compartilhada para o trabalho e os projetos delas, um lugar natural para um teste aparecer. Um pequeno protótipo real é o teste de encaixe mais confiável.',
    },
    {
      title: 'Alimente a sala no feed enquanto valida',
      body: 'Continue publicando atualizações, mantenha a sala viva e deixe o impulso do conceito se tornar visível para uma rede maior. O feed transforma um conceito em prova de que as pessoas se importam.',
      joinOriginNote:
        'Na JoinOrigin, atualizações da sala fluem para o feed — o ciclo de crescimento em que cada novo membro amplia a superfície de descoberta. Seja descoberto e cresça.',
    },
  ],
};

export default content;
