import type { GuideContent } from '../../types';

/**
 * "Como Publicar uma Ideia de Pequena Empresa" — guia L1 sempre-verde
 * (design §6.1, TASK-353).
 *
 * Escrito contra o fluxo de telas do produto §2, loop central: publicar uma
 * ideia de pequena empresa → página pública da ideia → Participar via link →
 * sala criada automaticamente AO PUBLICAR → criador controla a sala →
 * crescimento por feed/convites. A página da ideia é a promessa da vitrine; a
 * sala é onde clientes, colaboradores e primeiros crentes se reúnem em torno
 * do negócio. A plataforma está no ar: publicar uma ideia cria a página e a
 * sala dela agora. "Sala" está ancorada na sala do Matrix (§6.3). A expressão
 * nunca é usada no texto autoral.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'publish-a-small-business-idea',
  title: 'Como Publicar uma Ideia de Pequena Empresa: Página de Ideia + Sala | JoinOrigin',
  description:
    'Publique uma ideia de pequena empresa na JoinOrigin — esteja você lançando um novo negócio ou um negócio existente compartilhando o que oferece — escreva uma página de ideia pública, abra a sala automaticamente e convide clientes e colaboradores que querem vê-la acontecer. Passos práticos da JoinOrigin.',
  intro: [
    'Pequenas empresas muitas vezes começam da mesma forma — alguém nota um problema real no bairro, no trabalho ou no hobby e não consegue parar de pensar na solução — mas muitas outras já estão operando: uma loja em funcionamento, um serviço ativo, um produto com clientes. Esteja seu negócio ainda uma centelha ou já atendendo pessoas, o próximo passo é o mesmo: transformar o que você tem em algo que outras pessoas possam ver, reagir e participar. Uma pequena empresa precisa de um lar público e de pessoas em torno dela — antes de precisar de uma vitrine e muito depois de uma existir.',
    'O ciclo da JoinOrigin funciona assim: você publica uma ideia de pequena empresa, a página pública dela aparece e a sala é criada automaticamente no momento da publicação. As pessoas descobrem a página ou seguem um link, participar é um único clique, e elas entram na sala — uma sala Matrix controlada pelo criador, onde clientes, colaboradores e primeiros crentes podem fazer perguntas, compartilhar feedback e se envolver. O criador é dono da sala desde o segundo zero e decide quem entra e o que acontece dentro dela.',
    'Este guia percorre a publicação de uma ideia de pequena empresa como você abriria uma loja: nomear o cliente e o problema, escrever a página de ideia como uma vitrine, publicá-la e abrir a sala, compartilhar a página com sua rede local, convidar primeiros clientes e colaboradores, ouvir na sala, refinar a oferta a partir de feedback real e transformar a sala na sua primeira base de clientes.',
  ],
  dataPoints: [
    'As ideias de pequena empresa mais claras começam de um cliente nomeado e um problema específico, não de um público geral.',
    'Na JoinOrigin, publicar uma ideia cria automaticamente a sala dela — o negócio tem um lugar para clientes e colaboradores desde o início.',
    'Um link de participação é o convite mais simples: um link, um clique, e uma pessoa interessada está na sala.',
    'A JoinOrigin é um sistema operacional de comunidades que ajuda as pessoas a encontrar ideias e as pessoas por trás delas — publique sua ideia e a sala dela abre imediatamente.',
  ],
  faq: [
    {
      question: 'Como uma ideia de pequena empresa é diferente de uma página de ideia comum?',
      answer:
        'O formato da página é o mesmo, mas a promessa é mais afiada: um cliente, um problema e uma oferta. Onde uma ideia geral convida colaboradores, uma página de ideia de pequena empresa convida primeiros clientes e crentes locais — pessoas que realmente comprariam, indicariam ou ajudariam você a começar ou crescer o que já está rodando.',
    },
    {
      question: 'Quando a sala é criada para minha ideia de negócio?',
      answer:
        'A sala é criada automaticamente no momento em que você publica a ideia. O criador é dono da sala desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element. Você também pode abrir uma sala com as ferramentas que já usa e convidar as pessoas que se importam com o problema.',
    },
    {
      question: 'Quem deve participar da sala de uma ideia de pequena empresa?',
      answer:
        'Primeiros clientes, pessoas com a habilidade que falta a você e locais que possam indicar você. A sala é onde você testa a demanda, refina a oferta e encontra os primeiros crentes — antes de gastar dinheiro com estoque, aluguel ou marketing.',
    },
    {
      question: 'O que a página de ideia deve prometer?',
      answer:
        'Um cliente nomeado, um problema e o que você planeja oferecer. Seja honesto sobre o estágio — "estou testando essa ideia e quero falar com pessoas que sentem esse problema" é uma promessa forte. A página decide se as pessoas certas clicam em Participar.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a publicar uma ideia de pequena empresa hoje?',
      answer:
        'Sim. Publicar uma ideia na JoinOrigin cria a página e a sala dela de forma atômica — a sala abre no momento em que você publica, e você a controla desde o início. Publique a ideia em algum lugar público e abra uma sala para discussão; cada novo membro que você convida amplia seu alcance.',
    },
  ],
  sections: [
    'Nomeie o cliente e o problema. Antes de escrever qualquer coisa, nomeie a pessoa específica que sente esse problema e descreva o problema nas palavras dela. Uma pequena empresa prospera quando atende bem a uma necessidade real. A JoinOrigin é desenhada em torno de páginas de ideia encontráveis, e as páginas mais claras começam de um cliente nomeado. Escreva o cliente e o problema e teste-os com três pessoas que se encaixam.',
    'Escreva a página de ideia como uma vitrine. A página deve mostrar o que você está oferecendo, para quem é, o que custa em tempo ou dinheiro e em que estágio a ideia está. Mantenha concreto — um pop-up, um produto, um serviço, uma loja. Publicar uma ideia na JoinOrigin cria automaticamente a página e a sala dela, com o criador controlando a sala desde o início. Rascunhe a página como uma publicação pública curta e refine-a com feedback.',
    'Publique a ideia e abra a sala dela. Publicar é o momento em que a ideia de negócio se torna encontrável. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela. Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Publique a ideia publicamente e abra uma sala para a conversa em torno dela.',
    'Compartilhe a página com sua rede local. Pequenas empresas crescem pelo alcance local. Compartilhe a página de ideia com vizinhos, colegas, grupos locais e qualquer pessoa que conheça o problema em primeira mão. Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para sua ideia resolve.',
    'Convide primeiros clientes e colaboradores. Convide as pessoas que realmente comprariam ou ajudariam: clientes em potencial, alguém com uma habilidade que falta a você, um mentor ou um organizador local. A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    'Ouça na sala. Pergunte aos participantes como usariam a oferta, quanto pagariam e o que os impede. A sala é onde a demanda real aparece — ou não. A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá à ideia de negócio uma sala onde o interesse vira feedback, e o criador é dono dessa sala. Pergunte diretamente aos membros na sala.',
    'Refine a oferta a partir de feedback real. Ajuste o preço, o escopo, o canal ou a promessa com base no que os participantes dizem. Pequenas empresas são construídas em pequenas iterações. A JoinOrigin mantém a memória compartilhada de uma ideia em um só lugar — anotações, decisões e feedback na sala — para que o refinamento seja visível em vez de perdido. Mude uma coisa de cada vez e observe a resposta.',
    'Transforme a sala na sua primeira base de clientes. Continue convidando, continue compartilhando atualizações e mantenha a sala viva enquanto a oferta se consolida. As pessoas na sala são seus primeiros clientes e seus primeiros promotores. A JoinOrigin mantém sua página de ideia e a sala dela conectadas conforme o negócio cresce — um lugar onde a promessa, a conversa e as pessoas são visíveis. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Nomeie o cliente e o problema',
      body: 'Antes de escrever qualquer coisa, nomeie a pessoa específica que sente esse problema e descreva o problema nas palavras dela. Uma pequena empresa prospera quando atende bem a uma necessidade real.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de páginas de ideia encontráveis, e as páginas mais claras começam de um cliente nomeado. Escreva o cliente e o problema e teste-os com três pessoas que se encaixam.',
    },
    {
      title: 'Escreva a página de ideia como uma vitrine',
      body: 'A página deve mostrar o que você está oferecendo, para quem é, o que custa em tempo ou dinheiro e em que estágio a ideia está. Mantenha concreto — um pop-up, um produto, um serviço, uma loja.',
      joinOriginNote:
        'Publicar uma ideia na JoinOrigin cria automaticamente a página e a sala dela, com o criador controlando a sala desde o início. Rascunhe a página como uma publicação pública curta e refine-a com feedback.',
    },
    {
      title: 'Publique a ideia e abra a sala dela',
      body: 'Publicar é o momento em que a ideia de negócio se torna encontrável. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela.',
      joinOriginNote:
        'Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Publique a ideia publicamente e abra uma sala para a conversa em torno dela.',
    },
    {
      title: 'Compartilhe a página com sua rede local',
      body: 'Pequenas empresas crescem pelo alcance local. Compartilhe a página de ideia com vizinhos, colegas, grupos locais e qualquer pessoa que conheça o problema em primeira mão.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para sua ideia resolve.',
    },
    {
      title: 'Convide primeiros clientes e colaboradores',
      body: 'Convide as pessoas que realmente comprariam ou ajudariam: clientes em potencial, alguém com uma habilidade que falta a você, um mentor ou um organizador local.',
      joinOriginNote:
        'A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma ideia podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada pessoa que entra vira um canal para a própria rede dela.',
    },
    {
      title: 'Ouça na sala',
      body: 'Pergunte aos participantes como usariam a oferta, quanto pagariam e o que os impede. A sala é onde a demanda real aparece — ou não.',
      joinOriginNote:
        'A JoinOrigin não conduz essas conversas; a sala é sua para moldar. A plataforma dá à ideia de negócio uma sala onde o interesse vira feedback, e o criador é dono dessa sala. Pergunte diretamente aos membros na sala.',
    },
    {
      title: 'Refine a oferta a partir de feedback real',
      body: 'Ajuste o preço, o escopo, o canal ou a promessa com base no que os participantes dizem. Pequenas empresas são construídas em pequenas iterações.',
      joinOriginNote:
        'A JoinOrigin mantém a memória compartilhada de uma ideia em um só lugar — anotações, decisões e feedback na sala — para que o refinamento seja visível em vez de perdido. Mude uma coisa de cada vez e observe a resposta.',
    },
    {
      title: 'Transforme a sala na sua primeira base de clientes',
      body: 'Continue convidando, continue compartilhando atualizações e mantenha a sala viva enquanto a oferta se consolida. As pessoas na sala são seus primeiros clientes e seus primeiros promotores.',
      joinOriginNote:
        'A JoinOrigin mantém sua página de ideia e a sala dela conectadas conforme o negócio cresce — um lugar onde a promessa, a conversa e as pessoas são visíveis. Seja descoberto e cresça.',
    },
  ],
};

export default content;
