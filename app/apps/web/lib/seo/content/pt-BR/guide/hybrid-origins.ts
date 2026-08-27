import type { GuideContent } from '../../types';

/**
 * "Comunidades Híbridas" — guia L1 sempre-verde (design §6.1, TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: a sala é o que
 * conecta as partes online e (posteriormente) presencial de uma comunidade
 * híbrida — uma comunidade, uma sala, dois pontos de entrada. O valor da
 * JoinOrigin está tecido na introdução e em cada passo (nota
 * `joinOriginNote` por passo), com enquadramento honesto — a JoinOrigin não
 * fornece ferramentas de evento nem opera eventos híbridos. H1 único,
 * estrutura passo a passo, FAQ espelhada 1:1 no JSON-LD `FAQPage`. "Sala"
 * está ancorada na sala do Matrix (§6.3) — locais físicos são descritos como
 * espaços/locais, nunca "salas".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'hybrid-origins',
  title: 'Comunidades Híbridas: Como Conduzir Presencial + Online Juntos | JoinOrigin',
  description:
    'Conduza uma comunidade híbrida onde a sala conecta membros presenciais e online — esteja você começando do zero ou tornando híbrida uma comunidade existente, escolha as ferramentas certas, projete participação igual e mantenha os dois públicos engajados. Da JoinOrigin.',
  intro: [
    'Uma comunidade híbrida reúne pessoas em dois lugares ao mesmo tempo — fisicamente em um espaço e virtualmente por uma tela — e o desafio real é de novo sobre pessoas: garantir que os dois públicos sintam que pertencem a uma comunidade conectada, e não a duas separadas. A JoinOrigin é construída exatamente com esse objetivo de conectar pessoas, e o modelo funciona tanto para uma comunidade que já existe quanto para uma que está apenas começando — um grupo presencial estabelecido pode adicionar uma metade online, e uma comunidade online pode começar a se reunir localmente.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar, participar e começar comunidades — então um grupo híbrido tem uma sala que conecta as partes online e (posteriormente) presencial: membros locais e remotos veem a mesma comunidade, o mesmo ritmo e os mesmos próximos passos. No modelo digital conectar→participar→sala, a sala é a superfície persistente onde as duas metades da comunidade vivem entre os encontros; o evento presencial é uma consequência posterior que a sala mantém unida antes e depois. A JoinOrigin não fornece ferramentas de evento nem opera eventos híbridos — a plataforma dá a qualquer comunidade — inclusive híbrida — uma sala única onde seus membros permanecem conectados.',
    'Este guia cobre as decisões práticas que fazem comunidades híbridas prosperarem — para grupos novos e existentes igualmente: decidir se híbrido é o modelo certo, construir a sala que os dois públicos compartilham, escolher um formato e ferramentas que se encaixem, projetar o encontro para que membros presenciais e online vivam a mesma experiência, gerir o espaço para que nenhum lado domine e manter uma sala persistente que segure a comunidade entre os encontros. Cada passo mostra onde a JoinOrigin ajuda.',
  ],
  dataPoints: [
    'Uma comunidade híbrida é uma comunidade com dois pontos de entrada, não dois públicos para atender separadamente.',
    'A sala é o tecido conjuntivo: um lugar compartilhado onde os dois públicos veem as mesmas atualizações, anotações e próximos passos.',
    'Ferramentas simples e confiáveis — um link de vídeo, um documento compartilhado — reduzem o atrito que mata encontros híbridos.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar ou começar comunidades; ela não fornece ferramentas de evento nem opera eventos híbridos.',
  ],
  faq: [
    {
      question: 'Quando uma comunidade deve se tornar híbrida?',
      answer:
        'Quando parte do seu público não consegue participar presencialmente — por distância, agenda ou mobilidade — e a comunidade ainda quer uma identidade compartilhada. Se todos podem se encontrar localmente, reunir-se presencialmente é mais simples e muitas vezes melhor.',
    },
    {
      question: 'Qual é a configuração mínima de ferramentas para um encontro híbrido?',
      answer:
        'Um link de videochamada para membros remotos, um documento compartilhado para anotações e uma sala onde os dois públicos permanecem conectados entre os encontros. Mais ferramentas adicionam mais pontos de falha; comece no mínimo e adicione apenas o que a comunidade pedir.',
    },
    {
      question: 'Como evito que membros remotos se sintam espectadores?',
      answer:
        'Projete para participação igual: faça uma rodada de apresentações híbrida, chame membros remotos explicitamente, compartilhe a tela para qualquer visual e use um documento compartilhado onde os dois lados possam escrever. Designe uma pessoa para observar continuamente o lado remoto.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a conduzir uma comunidade híbrida?',
      answer:
        'Sim. A JoinOrigin ajuda as pessoas a encontrar e começar comunidades — uma sala onde membros locais e remotos permanecem conectados. A JoinOrigin não fornece ferramentas de evento, então as práticas híbridas práticas deste guia funcionam com as ferramentas que você já tem.',
    },
  ],
  sections: [
    'Decida se híbrido é o modelo certo. Vá para híbrido quando fizer sentido se encontrar presencialmente. Se a maioria dos membros pode se encontrar localmente, reunir-se presencialmente torna o vínculo mais forte — híbrido permite que a confiança se construa mais rápido e que você leia as pessoas com mais profundidade. A JoinOrigin é desenhada para ajudar qualquer comunidade a encontrar e manter membros, mas a decisão de formato é sua. Vá para híbrido apenas quando fizer sentido se encontrar presencialmente.',
    'Construa a sala que conecta os dois públicos. Antes de qualquer outra coisa, garanta que a comunidade tenha uma sala compartilhada onde membros remotos e locais conversem, compartilhem atualizações e vejam os mesmos próximos passos. A sala é o que faz o híbrido parecer uma comunidade em vez de duas. Na JoinOrigin, todo grupo tem uma sala desde a publicação — a superfície persistente que segura as partes online e presencial juntas. Configure uma sala compartilhada que os dois públicos possam participar.',
    'Escolha uma ferramenta de vídeo confiável e um documento compartilhado. Mantenha a pilha mínima: um link de videochamada para membros remotos, um documento para anotações e links compartilhados e uma entrada de calendário. Complexidade é a inimiga de encontros híbridos consistentes. A JoinOrigin não fornece ferramentas de evento — mantenha a pilha mínima. A plataforma é a sala persistente onde o link e o documento vivem, não a ferramenta de evento em si.',
    'Projete a pauta para dois públicos. Faça uma rodada de apresentações que inclua membros remotos pelo nome, mantenha os visuais em uma tela compartilhada e deixe espaço para o lado online falar. Uma pauta híbrida nomeia os dois públicos explicitamente. Na JoinOrigin, os dois públicos compartilham uma sala de comunidade, o que torna "projetar para dois públicos" um encaixe natural. Nomeie os dois públicos explicitamente na pauta.',
    'Designe uma pessoa ponte. Uma pessoa observa o lado remoto: recebe quem chega atrasado, chama as mãos remotas e repassa o que o espaço presencial perde. Sem uma ponte, o público online vira espectador. A JoinOrigin não opera eventos — a pessoa ponte é uma função humana. A plataforma mantém a comunidade organizada em uma sala, para que a ponte tenha um lugar para ver quem participou e o que foi compartilhado.',
    'Gerencie o espaço para que os dois lados participem. Peça que membros presenciais falem um de cada vez e repitam perguntas para o microfone, posicione as pessoas perto da câmera e alterne as vezes entre o espaço e a chamada — com a sala compartilhada aberta para os dois. A JoinOrigin é desenhada em torno de conexão igual entre membros — o mesmo princípio que faz a discussão híbrida funcionar. Alterne as vezes entre o espaço e a chamada e repita as perguntas para o microfone.',
    'Mantenha a sala viva entre os encontros. A comunidade vive na sala entre os eventos: membros remotos e locais compartilham atualizações, fazem perguntas e planejam juntos ali. Híbrido não é um formato de evento — é um espaço compartilhado contínuo. Este é o passo mais próximo da intenção de design da JoinOrigin: um sistema operacional de comunidades é uma sala persistente onde membros remotos e locais compartilham atualizações e planejam juntos. Uma sala compartilhada funciona — a JoinOrigin é esse espaço.',
    'Capture e compartilhe o resultado na sala. Publique anotações, gravações e próximos passos na sala compartilhada após cada encontro. Um artefato visível mantém os dois públicos conectados e faz a comunidade parecer produtiva. Na JoinOrigin, o resultado de uma comunidade vive em uma sala organizada — anotações, gravações, próximos passos. Publique-os na sala compartilhada após cada encontro.',
  ],
  steps: [
    {
      title: 'Decida se híbrido é o modelo certo',
      body: 'Vá para híbrido quando fizer sentido se encontrar presencialmente. Se a maioria dos membros pode se encontrar localmente, reunir-se presencialmente torna o vínculo mais forte — híbrido permite que a confiança se construa mais rápido e que você leia as pessoas com mais profundidade.',
      joinOriginNote:
        'A JoinOrigin é desenhada para ajudar qualquer comunidade a encontrar e manter membros, mas a decisão de formato é sua. Vá para híbrido apenas quando fizer sentido se encontrar presencialmente.',
    },
    {
      title: 'Construa a sala que conecta os dois públicos',
      body: 'Antes de qualquer outra coisa, garanta que a comunidade tenha uma sala compartilhada onde membros remotos e locais conversem, compartilhem atualizações e vejam os mesmos próximos passos. A sala é o que faz o híbrido parecer uma comunidade em vez de duas.',
      joinOriginNote:
        'Na JoinOrigin, todo grupo tem uma sala desde a publicação — a superfície persistente que segura as partes online e presencial juntas. Configure uma sala compartilhada que os dois públicos possam participar.',
    },
    {
      title: 'Escolha uma ferramenta de vídeo confiável e um documento compartilhado',
      body: 'Mantenha a pilha mínima: um link de videochamada para membros remotos, um documento para anotações e links compartilhados e uma entrada de calendário. Complexidade é a inimiga de encontros híbridos consistentes.',
      joinOriginNote:
        'A JoinOrigin não fornece ferramentas de evento — mantenha a pilha mínima. A plataforma é a sala persistente onde o link e o documento vivem, não a ferramenta de evento em si.',
    },
    {
      title: 'Projete a pauta para dois públicos',
      body: 'Faça uma rodada de apresentações que inclua membros remotos pelo nome, mantenha os visuais em uma tela compartilhada e deixe espaço para o lado online falar. Uma pauta híbrida nomeia os dois públicos explicitamente.',
      joinOriginNote:
        'Na JoinOrigin, os dois públicos compartilham uma sala de comunidade, o que torna "projetar para dois públicos" um encaixe natural. Nomeie os dois públicos explicitamente na pauta.',
    },
    {
      title: 'Designe uma pessoa ponte',
      body: 'Uma pessoa observa o lado remoto: recebe quem chega atrasado, chama as mãos remotas e repassa o que o espaço presencial perde. Sem uma ponte, o público online vira espectador.',
      joinOriginNote:
        'A JoinOrigin não opera eventos — a pessoa ponte é uma função humana. A plataforma mantém a comunidade organizada em uma sala, para que a ponte tenha um lugar para ver quem participou e o que foi compartilhado.',
    },
    {
      title: 'Gerencie o espaço para que os dois lados participem',
      body: 'Peça que membros presenciais falem um de cada vez e repitam perguntas para o microfone, posicione as pessoas perto da câmera e alterne as vezes entre o espaço e a chamada — com a sala compartilhada aberta para os dois.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de conexão igual entre membros — o mesmo princípio que faz a discussão híbrida funcionar. Alterne as vezes entre o espaço e a chamada e repita as perguntas para o microfone.',
    },
    {
      title: 'Mantenha a sala viva entre os encontros',
      body: 'A comunidade vive na sala entre os eventos: membros remotos e locais compartilham atualizações, fazem perguntas e planejam juntos ali. Híbrido não é um formato de evento — é um espaço compartilhado contínuo.',
      joinOriginNote:
        'Este é o passo mais próximo da intenção de design da JoinOrigin: um sistema operacional de comunidades é uma sala persistente onde membros remotos e locais compartilham atualizações e planejam juntos. Uma sala compartilhada funciona — a JoinOrigin é esse espaço.',
    },
    {
      title: 'Capture e compartilhe o resultado na sala',
      body: 'Publique anotações, gravações e próximos passos na sala compartilhada após cada encontro. Um artefato visível mantém os dois públicos conectados e faz a comunidade parecer produtiva.',
      joinOriginNote:
        'Na JoinOrigin, o resultado de uma comunidade vive em uma sala organizada — anotações, gravações, próximos passos. Publique-os na sala compartilhada após cada encontro.',
    },
  ],
};

export default content;
