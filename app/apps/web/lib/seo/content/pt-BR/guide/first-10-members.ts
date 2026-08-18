import type { GuideContent } from '../../types';

/**
 * "Como Conseguir Seus Primeiros 10 Membros" — guia L1 sempre-verde
 * (design §6.1, TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: a sala é a
 * superfície de participação — os membros entram por links de convite e
 * participam da sala do grupo, onde a comunidade realmente vive. O valor da
 * JoinOrigin está tecido na introdução e em cada passo (nota `joinOriginNote`
 * por passo), com enquadramento honesto — a JoinOrigin não recruta membros
 * nem organiza eventos. H1 único, estrutura passo a passo, FAQ espelhada 1:1
 * no JSON-LD `FAQPage`. "Sala" está ancorada na sala do Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'first-10-members',
  title:
    'Como Conseguir Seus Primeiros 10 Membros para uma Comunidade Nova ou em Crescimento | JoinOrigin',
  description:
    'Consiga seus primeiros 10 membros sem um grande orçamento — esteja você lançando uma comunidade nova ou reenergizando uma existente, comece pela sua rede pessoal, compartilhe links de convite e faça da sala o lugar onde as pessoas querem entrar. Passos práticos da JoinOrigin.',
  intro: [
    'Os dez primeiros membros são os mais difíceis de conseguir e os mais importantes, porque definem a cultura de uma comunidade antes de ela ter qualquer reputação para atrair estranhos — e eles são igualmente valiosos quando uma comunidade existente está parada ou recomeçando, porque um núcleo comprometido é o que transforma um grupo silencioso em um grupo vivo. Esse problema dos primeiros dez é, no fundo, um problema de conectar pessoas, e é o problema central que a JoinOrigin resolve.',
    'A JoinOrigin é um sistema operacional de comunidades construído em torno do loop digital conectar→participar→sala: você publica um grupo, a sala dele é criada automaticamente e os membros entram por um link. A sala é a superfície de participação — toda pessoa que clica em Participar ou segue um link de convite entra na sala do grupo, o único lugar onde a comunidade vive e onde novos membros se sentem imediatamente conectados. A JoinOrigin não recruta membros nem organiza eventos — essa parte é sua. A plataforma torna a descoberta e a participação drasticamente mais fáceis; o crescimento inicial ainda vem do alcance pessoal: as pessoas que você convida diretamente com um link, as que elas trazem e as que ficam porque a sala parece viva.',
    'Este guia divide o problema dos primeiros dez membros em passos concretos — esteja você começando uma comunidade nova ou revivendo uma existente: partir das pessoas que você já conhece, publicar seu grupo para que ele tenha uma sala para participar, convidar pessoalmente com links, fazer um primeiro encontro que converta participantes em promotores e construir um hábito simples de indicação para que cada membro traga o próximo — e cada passo mostra onde a JoinOrigin ajuda.',
  ],
  dataPoints: [
    'Convites pessoais convertem a uma taxa muito maior do que publicações públicas ou anúncios pagos.',
    'Um link de convite remove todas as barreiras: um clique e um novo membro está na sala.',
    'Dez membros ativos são prova social suficiente para a maioria das pessoas sentir que um grupo é real e vale participar.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar ou começar comunidades — ela não recruta membros nem organiza eventos.',
  ],
  faq: [
    {
      question: 'Por que especificamente dez membros?',
      answer:
        'Dez é um ponto de virada: com dez frequentadores você tem uma sala animada, um núcleo confiável para discussão e prova social suficiente para atrair recém-chegados que hesitariam. Abaixo de dez, a sala parece frágil.',
    },
    {
      question: 'Quanto tempo leva para conseguir os primeiros dez membros?',
      answer:
        'Com convites pessoais consistentes e um bom primeiro encontro, a maioria dos organizadores chega a dez membros comprometidos em três a seis semanas. A chave é convidar toda semana — compartilhar links, acompanhar e manter a sala ativa — e não esperar por um grande lançamento.',
    },
    {
      question: 'E se eu não tiver uma rede pessoal grande?',
      answer:
        'Comece menor: convide cinco pessoas que você conhece, peça que cada uma traga uma pessoa e publique em dois grupos de nicho onde seu público já se reúne. Cada membro que você mantém vira um canal para a própria rede dele — e cada convite pode ser um link simples para a sala.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a encontrar membros?',
      answer:
        'Sim. A JoinOrigin ajuda as pessoas a descobrir e começar comunidades — um lugar onde pessoas que procuram um grupo podem encontrar o seu e entrar na sala por um link. Os passos deste guia — convites pessoais e um ótimo primeiro encontro — são os caminhos mais confiáveis para encontrar seus primeiros membros.',
    },
  ],
  sections: [
    'Liste cinquenta pessoas que você já conhece. Escreva qualquer pessoa que se encaixe no propósito da comunidade: amigos, colegas, colegas de turma, ex-companheiros de trabalho, vizinhos e conhecidos online. Você precisa de cerca de cinco vezes mais nomes do que os dez que quer. A JoinOrigin dá à sua comunidade um lar visível e uma sala que as pessoas podem encontrar — mas os primeiros nomes ainda vêm de pessoas que você conhece. Liste cinquenta e trate cada um como uma apresentação pessoal.',
    'Publique seu grupo e abra a sala dele. Uma comunidade para a qual você não consegue apontar ainda não existe — e uma cujo lar está espalhado por chats e listas é quase tão difícil de crescer. Publique o grupo com uma missão clara e deixe a sala ser criada automaticamente para que haja um lugar real para os membros entrarem. Publicar um grupo na JoinOrigin cria automaticamente a sala dele — a sala é a superfície de participação, e o criador é dono dela desde o início. Configure seu grupo e a sala dele nas ferramentas que já usa antes de convidar alguém, se preferir.',
    'Convide pessoalmente com um pedido específico e um link. Envie uma mensagem curta nomeando a comunidade, a primeira data ou a primeira conversa e por que você acha que a pessoa vai gostar — e inclua o link de participação. Mensagens pessoais vencem publicações genéricas, e uma data específica vence uma promessa vaga. A JoinOrigin remove o atrito de participar quando as pessoas encontram você — um link, um clique, dentro da sala. Uma mensagem pessoal curta com uma data específica e um link converte melhor do que qualquer publicação pública.',
    'Peça a cada convidado para trazer uma pessoa. Torne isso uma parte normal do pedido: "Traga um amigo que possa gostar disso." Convites por indicação são como redes pequenas se compõem em comunidades reais. A JoinOrigin dá aos membros um lar compartilhável para a comunidade — então conversas de indicação apontam para um link real e uma sala real. Torne "traga um amigo" parte do pedido e dê a eles o link para compartilhar.',
    'Faça um primeiro encontro genuinamente bom. Gaste sua energia na experiência, não na contagem: uma recepção calorosa, um formato claro e um horário de término definido. Pessoas que gostam do primeiro encontro trarão os próximos dez. A JoinOrigin não organiza eventos — a experiência é sua. A plataforma ajuda a comunidade a se formar em torno dela: uma sala para onde os membros podem apontar depois e manter a conexão.',
    'Convide todo participante para a sala. No fim do encontro, compartilhe o link de participação e adicione quem quiser ficar. A sala é onde a comunidade vive entre os encontros — um membro que entrou na sala é um membro com probabilidade de voltar. A JoinOrigin mantém a associação e a comunicação da sua comunidade em uma sala organizada, em vez de uma planilha de inscrição. Um link simples para a sala mantém o acompanhamento possível.',
    'Faça o acompanhamento em até 24 horas com uma próxima data. Agradeça a cada participante, compartilhe um resumo de um parágrafo e confirme o próximo encontro — na sala, onde todos podem ver. O acompanhamento é onde um participante avulso se torna membro. Na JoinOrigin, um acompanhamento tem um lar natural — um lugar onde o resumo e a próxima data vivem. Um agradecimento pessoal em até 24 horas é o que converte um participante em membro.',
    'Torne trivialmente fácil convidar outras pessoas. Dê aos membros uma frase que possam repetir e um link que possam compartilhar: "É um encontro mensal para novos fundadores compartilharem lições — entre aqui." Uma descrição clara e curta é a ferramenta de recrutamento mais eficaz. A JoinOrigin permite que uma comunidade seja descrita, encontrada e participada em um só lugar — os membros podem apontar as pessoas para a sala em vez de explicá-la. Dê aos membros uma frase e um link que possam repetir.',
  ],
  steps: [
    {
      title: 'Liste cinquenta pessoas que você já conhece',
      body: 'Escreva qualquer pessoa que se encaixe no propósito da comunidade: amigos, colegas, colegas de turma, ex-companheiros de trabalho, vizinhos e conhecidos online. Você precisa de cerca de cinco vezes mais nomes do que os dez que quer.',
      joinOriginNote:
        'A JoinOrigin dá à sua comunidade um lar visível e uma sala que as pessoas podem encontrar — mas os primeiros nomes ainda vêm de pessoas que você conhece. Liste cinquenta e trate cada um como uma apresentação pessoal.',
    },
    {
      title: 'Publique seu grupo e abra a sala dele',
      body: 'Uma comunidade para a qual você não consegue apontar ainda não existe — e uma cujo lar está espalhado por chats e listas é quase tão difícil de crescer. Publique o grupo com uma missão clara e deixe a sala ser criada automaticamente para que haja um lugar real para os membros entrarem.',
      joinOriginNote:
        'Publicar um grupo na JoinOrigin cria automaticamente a sala dele — a sala é a superfície de participação, e o criador é dono dela desde o início. Configure seu grupo e a sala dele nas ferramentas que já usa antes de convidar alguém, se preferir.',
    },
    {
      title: 'Convide pessoalmente com um pedido específico e um link',
      body: 'Envie uma mensagem curta nomeando a comunidade, a primeira data ou a primeira conversa e por que você acha que a pessoa vai gostar — e inclua o link de participação. Mensagens pessoais vencem publicações genéricas, e uma data específica vence uma promessa vaga.',
      joinOriginNote:
        'A JoinOrigin remove o atrito de participar quando as pessoas encontram você — um link, um clique, dentro da sala. Uma mensagem pessoal curta com uma data específica e um link converte melhor do que qualquer publicação pública.',
    },
    {
      title: 'Peça a cada convidado para trazer uma pessoa',
      body: 'Torne isso uma parte normal do pedido: "Traga um amigo que possa gostar disso." Convites por indicação são como redes pequenas se compõem em comunidades reais.',
      joinOriginNote:
        'A JoinOrigin dá aos membros um lar compartilhável para a comunidade — então conversas de indicação apontam para um link real e uma sala real. Torne "traga um amigo" parte do pedido e dê a eles o link para compartilhar.',
    },
    {
      title: 'Faça um primeiro encontro genuinamente bom',
      body: 'Gaste sua energia na experiência, não na contagem: uma recepção calorosa, um formato claro e um horário de término definido. Pessoas que gostam do primeiro encontro trarão os próximos dez.',
      joinOriginNote:
        'A JoinOrigin não organiza eventos — a experiência é sua. A plataforma ajuda a comunidade a se formar em torno dela: uma sala para onde os membros podem apontar depois e manter a conexão.',
    },
    {
      title: 'Convide todo participante para a sala',
      body: 'No fim do encontro, compartilhe o link de participação e adicione quem quiser ficar. A sala é onde a comunidade vive entre os encontros — um membro que entrou na sala é um membro com probabilidade de voltar.',
      joinOriginNote:
        'A JoinOrigin mantém a associação e a comunicação da sua comunidade em uma sala organizada, em vez de uma planilha de inscrição. Um link simples para a sala mantém o acompanhamento possível.',
    },
    {
      title: 'Faça o acompanhamento em até 24 horas com uma próxima data',
      body: 'Agradeça a cada participante, compartilhe um resumo de um parágrafo e confirme o próximo encontro — na sala, onde todos podem ver. O acompanhamento é onde um participante avulso se torna membro.',
      joinOriginNote:
        'Na JoinOrigin, um acompanhamento tem um lar natural — um lugar onde o resumo e a próxima data vivem. Um agradecimento pessoal em até 24 horas é o que converte um participante em membro.',
    },
    {
      title: 'Torne trivialmente fácil convidar outras pessoas',
      body: 'Dê aos membros uma frase que possam repetir e um link que possam compartilhar: "É um encontro mensal para novos fundadores compartilharem lições — entre aqui." Uma descrição clara e curta é a ferramenta de recrutamento mais eficaz.',
      joinOriginNote:
        'A JoinOrigin permite que uma comunidade seja descrita, encontrada e participada em um só lugar — os membros podem apontar as pessoas para a sala em vez de explicá-la. Dê aos membros uma frase e um link que possam repetir.',
    },
  ],
};

export default content;
