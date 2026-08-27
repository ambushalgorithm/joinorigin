import type { GuideContent } from '../../types';

/**
 * "Como Começar uma Comunidade" — guia L1 sempre-verde (design §6.1,
 * TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: publicar o grupo
 * → sala criada automaticamente na publicação → membros entram por link;
 * orientação de espaço/formato permanece como consequência posterior, nunca o
 * núcleo. O valor da JoinOrigin está tecido na introdução e em cada passo
 * (nota `joinOriginNote` por passo), com enquadramento honesto — a JoinOrigin
 * não organiza eventos locais. H1 único, estrutura passo a passo, FAQ
 * espelhada 1:1 no JSON-LD `FAQPage`. "Sala" está ancorada na sala do Matrix
 * (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'start-an-origin',
  title: 'Como Começar uma Comunidade: Um Guia Passo a Passo | JoinOrigin',
  description:
    'Aprenda a começar uma comunidade — ou dar a uma existente um único lar digital — publique um grupo, abra a sala dele e traga membros por um link de participação. Passos práticos da JoinOrigin.',
  intro: [
    'A parte mais difícil de começar uma comunidade raramente é o espaço, a pauta ou o orçamento — é encontrar as primeiras pessoas que compartilham seu interesse e dar a elas um lugar claro para se conectar. É exatamente esse o problema que a JoinOrigin resolve.',
    'A JoinOrigin é um sistema operacional de comunidades construído em torno do loop digital: você publica um grupo, a sala dele é criada automaticamente e os membros entram por um link. A sala é onde a comunidade realmente vive — uma sala Matrix controlada pelo criador, onde os membros conversam, compartilham atualizações e planejam juntos desde o primeiro dia, em vez de se espalharem por planilhas, mensagens dispersas e formulários de inscrição. Eventos presenciais existem apenas como consequência posterior: uma vez que um grupo se forma e a sala dele está viva, os membros podem escolher se encontrar presencialmente — e a JoinOrigin não organiza eventos locais. O ponto inteiro da plataforma é conectar pessoas que de outra forma nunca se encontrariam, por isso cada passo deste guia mapeia algo com que a JoinOrigin ajuda.',
    'A abordagem funciona para qualquer tipo de comunidade: um círculo de fundadores, um clube do livro, um grupo local de corrida, uma rede de pequenas empresas ou uma comunidade profissional online — e funciona esteja você começando do zero ou formalizando um grupo que já se reúne informalmente. O princípio central é simples — as pessoas entram por causa de uma promessa clara e ficam porque a experiência cumpre essa promessa de forma confiável. Você não precisa de um grande orçamento, um espaço ou um público existente para começar; precisa de um propósito claro, um primeiro passo realista e a disciplina de repeti-lo.',
  ],
  dataPoints: [
    'A maioria das comunidades bem-sucedidas começa com um público estreito e específico, não com "todos os interessados".',
    'Publicar um grupo cria a sala dele instantaneamente — nunca existe um passo de "criar o chat depois".',
    'Um link de participação é o convite mais simples: um link, um clique, e um novo membro está na sala.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar ou começar comunidades — ela não organiza eventos locais nem afirma ter equipe local.',
  ],
  faq: [
    {
      question: 'Quanto tempo leva para começar uma comunidade?',
      answer:
        'Você pode publicar um grupo e abrir a sala dele em poucas semanas se mantiver o escopo pequeno: um propósito, um link de participação e um fluxo constante de convites pessoais. A comunidade em si leva alguns meses de participação consistente na sala antes de parecer estabelecida.',
    },
    {
      question: 'Preciso de dinheiro ou de um espaço para começar?',
      answer:
        'Não. O núcleo digital de uma comunidade — um grupo publicado e a sala dele — não custa nada e não precisa de espaço. Muitos grupos depois escolhem se encontrar presencialmente; bibliotecas, cafeterias, parques e lounges de coworking recebem primeiros encontros gratuitamente na maioria das cidades.',
    },
    {
      question: 'Qual é o erro mais comum ao começar uma comunidade?',
      answer:
        'Tentar atender a todos. Uma comunidade com propósito vago atrai poucos membros comprometidos. Defina um público específico e um resultado claro, coloque-os na página do grupo e deixe a comunidade evoluir a partir daí.',
    },
    {
      question: 'Como a JoinOrigin pode me ajudar a começar uma comunidade?',
      answer:
        'Publicar um grupo na JoinOrigin cria automaticamente a sala dele e os membros entram por um link — um lar digital organizado para o propósito, as pessoas e a conversa de uma comunidade. A JoinOrigin não organiza eventos locais, então os passos práticos deste guia funcionam na plataforma e com as ferramentas que você já tem.',
    },
  ],
  sections: [
    'Defina um propósito claro. Decida para quem é a comunidade, que problema ela resolve e como é um membro bem-sucedido. Escreva uma missão de uma frase como "um grupo para novos fundadores no Brooklyn compartilharem lições da fase inicial". A JoinOrigin dá um lar ao seu propósito — uma página pública de grupo onde a missão, o público e a promessa são visíveis para qualquer pessoa que procure um grupo como o seu. Escreva a missão e mantenha-a à frente de todo convite.',
    'Publique o grupo e abra a sala dele. O núcleo digital de uma comunidade é um grupo publicado com uma sala onde os membros podem conversar. Na JoinOrigin, publicar um grupo cria automaticamente a sala dele — o criador é dono dela desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element. Na JoinOrigin não existe o passo de "criar o chat depois": publique o grupo e a sala existe imediatamente, com o criador como dono da sala. Configure o lar do grupo e a sala dele nas ferramentas que já usa, se preferir.',
    'Compartilhe seu link de participação. Um link de participação é o convite mais simples que existe: um link, um clique, e um novo membro entra na sala. Coloque o link em todos os lugares — sua página de grupo, mensagens pessoais e os lugares onde seu público já se reúne. Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu grupo resolve.',
    'Convide pessoalmente suas primeiras dez pessoas. Convites pessoais convertem muito melhor do que publicações públicas. Envie mensagem para amigos, colegas e conhecidos que se encaixam no público, compartilhe o link de participação e peça que tragam mais uma pessoa. A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma comunidade podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada membro que você convida vira um canal para a própria rede dele.',
    'Escolha um formato e uma cadência (uma escolha posterior). Quando o grupo começa a se formar, escolha um formato recorrente — uma discussão mensal, uma sessão de trabalho semanal, uma palestra ou uma caminhada social. Recorrente vence avulso porque hábitos são o que transformam estranhos em membros. Essa é uma escolha posterior: o grupo pode se reunir presencialmente depois, mas a sala já é o lar da comunidade. Na JoinOrigin, os organizadores podem descrever seu formato uma vez e os membros podem ver o que esperar antes de participar — o que reduz a hesitação que trava iniciantes. Escolha seu formato e declare-o em todo convite.',
    'Faça um ótimo primeiro encontro. Se os membros escolherem se encontrar presencialmente — chegue cedo, cumprimente cada pessoa, faça uma rodada curta de apresentações e termine com uma próxima data clara. O objetivo do primeiro encontro não é o tamanho; é que todos saiam querendo voltar. A JoinOrigin não opera nem conduz encontros — a experiência é sua para desenhar. A plataforma ajuda a comunidade a se formar em torno dela: uma sala compartilhada onde a data, o resumo e os próximos passos vivem.',
    'Colete feedback e itere. Depois das primeiras semanas, pergunte aos membros o que querem mais ou menos — na sala e nos encontros. Ajuste o formato, o horário ou o espaço com base nas respostas deles, não no que você imaginou. A JoinOrigin mantém a memória compartilhada de uma comunidade em um só lugar — anotações, decisões e o que os membros pediram — para que a iteração seja visível em vez de perdida. Pergunte diretamente aos membros na sala após cada encontro.',
    'Publique um ritmo consistente e cresça devagar. Mantenha o mesmo dia e formato por vários meses antes de expandir. O crescimento se compõe por indicações quando cada membro consegue descrever o que a comunidade é em uma frase e compartilhar o link de participação. A JoinOrigin ajuda sua comunidade a permanecer encontrável e conectada enquanto cresce — um lugar onde o ritmo, a promessa, a sala e as pessoas são visíveis. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Defina um propósito claro',
      body: 'Decida para quem é a comunidade, que problema ela resolve e como é um membro bem-sucedido. Escreva uma missão de uma frase como "um grupo para novos fundadores no Brooklyn compartilharem lições da fase inicial".',
      joinOriginNote:
        'A JoinOrigin dá um lar ao seu propósito — uma página pública de grupo onde a missão, o público e a promessa são visíveis para qualquer pessoa que procure um grupo como o seu. Escreva a missão e mantenha-a à frente de todo convite.',
    },
    {
      title: 'Publique o grupo e abra a sala dele',
      body: 'O núcleo digital de uma comunidade é um grupo publicado com uma sala onde os membros podem conversar. Na JoinOrigin, publicar um grupo cria automaticamente a sala dele — o criador é dono dela desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element.',
      joinOriginNote:
        'Na JoinOrigin não existe o passo de "criar o chat depois": publique o grupo e a sala existe imediatamente, com o criador como dono da sala. Configure o lar do grupo e a sala dele nas ferramentas que já usa, se preferir.',
    },
    {
      title: 'Compartilhe seu link de participação',
      body: 'Um link de participação é o convite mais simples que existe: um link, um clique, e um novo membro entra na sala. Coloque o link em todos os lugares — sua página de grupo, mensagens pessoais e os lugares onde seu público já se reúne.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu grupo resolve.',
    },
    {
      title: 'Convide pessoalmente suas primeiras dez pessoas',
      body: 'Convites pessoais convertem muito melhor do que publicações públicas. Envie mensagem para amigos, colegas e conhecidos que se encaixam no público, compartilhe o link de participação e peça que tragam mais uma pessoa.',
      joinOriginNote:
        'A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram uma comunidade podem encontrar a sua e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada membro que você convida vira um canal para a própria rede dele.',
    },
    {
      title: 'Escolha um formato e uma cadência (uma escolha posterior)',
      body: 'Quando o grupo começa a se formar, escolha um formato recorrente — uma discussão mensal, uma sessão de trabalho semanal, uma palestra ou uma caminhada social. Recorrente vence avulso porque hábitos são o que transformam estranhos em membros. Essa é uma escolha posterior: o grupo pode se reunir presencialmente depois, mas a sala já é o lar da comunidade.',
      joinOriginNote:
        'Na JoinOrigin, os organizadores podem descrever seu formato uma vez e os membros podem ver o que esperar antes de participar — o que reduz a hesitação que trava iniciantes. Escolha seu formato e declare-o em todo convite.',
    },
    {
      title: 'Faça um ótimo primeiro encontro',
      body: 'Se os membros escolherem se encontrar presencialmente — chegue cedo, cumprimente cada pessoa, faça uma rodada curta de apresentações e termine com uma próxima data clara. O objetivo do primeiro encontro não é o tamanho; é que todos saiam querendo voltar.',
      joinOriginNote:
        'A JoinOrigin não opera nem conduz encontros — a experiência é sua para desenhar. A plataforma ajuda a comunidade a se formar em torno dela: uma sala compartilhada onde a data, o resumo e os próximos passos vivem.',
    },
    {
      title: 'Colete feedback e itere',
      body: 'Depois das primeiras semanas, pergunte aos membros o que querem mais ou menos — na sala e nos encontros. Ajuste o formato, o horário ou o espaço com base nas respostas deles, não no que você imaginou.',
      joinOriginNote:
        'A JoinOrigin mantém a memória compartilhada de uma comunidade em um só lugar — anotações, decisões e o que os membros pediram — para que a iteração seja visível em vez de perdida. Pergunte diretamente aos membros na sala após cada encontro.',
    },
    {
      title: 'Publique um ritmo consistente e cresça devagar',
      body: 'Mantenha o mesmo dia e formato por vários meses antes de expandir. O crescimento se compõe por indicações quando cada membro consegue descrever o que a comunidade é em uma frase e compartilhar o link de participação.',
      joinOriginNote:
        'A JoinOrigin ajuda sua comunidade a permanecer encontrável e conectada enquanto cresce — um lugar onde o ritmo, a promessa, a sala e as pessoas são visíveis. Seja descoberto e cresça.',
    },
  ],
};

export default content;
