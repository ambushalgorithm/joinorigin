import type { GuideContent } from '../../types';

/**
 * "Moderação de Comunidade" — guia L1 sempre-verde (design §6.1, TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: o controle do
 * criador É a posse de sala do Matrix — convidar/remover membros, atribuir
 * funções, editar configurações da sala, fixar mensagens, arquivar a sala —
 * aplicado nativamente no Element. O valor da JoinOrigin está tecido na
 * introdução e em cada passo (nota `joinOriginNote` por passo), com
 * enquadramento honesto — a JoinOrigin não modera comunidades de terceiros
 * nem fornece equipe de moderação. H1 único, estrutura passo a passo, FAQ
 * espelhada 1:1 no JSON-LD `FAQPage`. "Sala" está ancorada na sala do Matrix
 * (§6.3) — espaços privados/de incidentes são descritos como salas/DMs,
 * nunca "canais".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'moderation',
  title: 'Moderação de Origins: Como Manter Grupos Saudáveis e Acolhedores | JoinOrigin',
  description:
    'Modere uma comunidade com regras claras, ação precoce e redução de conflito — esteja você montando um grupo totalmente novo ou consertando a cultura de um estabelecido, o controle do criador é a posse de sala do Matrix, com funções aplicadas no Element. Passos práticos da JoinOrigin.',
  intro: [
    'Toda comunidade que cresce vai, em algum momento, enfrentar um momento que testa sua cultura — uma discussão acalorada, um spammer, um membro que deixa os outros desconfortáveis ou um mal-entendido que sai do controle. Moderação é a prática de proteger o espaço para que a comunidade possa permanecer acolhedora, e ela só se torna necessária porque comunidades são feitas de pessoas se conectando umas com as outras. Essa conexão é o problema central que a JoinOrigin ajuda a resolver — e as práticas se aplicam tanto a uma comunidade estabelecida consertando sua cultura quanto a um grupo novo definindo expectativas antes de o primeiro membro chegar.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar, começar e organizar Origins — e no modelo digital dela, uma comunidade vive em uma sala controlada pelo criador. O controle do criador é a posse padrão de sala do Matrix: o criador pode convidar e remover membros, atribuir funções, editar configurações da sala, fixar mensagens e arquivar a sala — tudo aplicado nativamente dentro do Element, o cliente de chat padrão, sem sistema de permissão personalizado. Essa posse é a espinha dorsal da moderação na JoinOrigin: o criador decide quem pertence, quais são as regras e o que acontece quando uma regra é quebrada. A JoinOrigin não modera comunidades de terceiros e não fornece equipe de moderação. A plataforma é desenhada em torno de estrutura comunitária saudável, e as práticas deste guia são as práticas humanas que todo organizador precisa.',
    'Este guia apresenta um sistema prático de moderação — esteja seu Origin totalmente novo ou com anos de história para limpar: regras comunitárias escritas, curtas e específicas, um caminho de aplicação claro com avisos antes de remoções, técnicas para reduzir situações tensas e conselhos honestos sobre quando envolver membros e quando agir sozinho. Cada passo mostra onde a JoinOrigin ajuda.',
  ],
  dataPoints: [
    'Regras comunitárias claras e escritas reduzem conflitos ao definir expectativas antes de incidentes acontecerem.',
    'O controle do criador na JoinOrigin é a posse de sala do Matrix: convidar/remover, funções, configurações, fixar, arquivar.',
    'Um caminho de aplicação em etapas — avisar, depois limitar, depois remover — é mais justo e mais fácil de defender do que banimentos instantâneos.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar, começar e organizar Origins; ela não modera comunidades de terceiros nem fornece equipe de moderação.',
  ],
  faq: [
    {
      question: 'Comunidades pequenas realmente precisam de regras de moderação?',
      answer:
        'Sim, e quanto antes melhor. Duas ou três regras curtas escritas antes de um conflito acontecer são muito mais fáceis de aplicar do que regras inventadas depois de um. Comunidades pequenas têm menos incidentes, mas os que têm são igualmente dolorosos.',
    },
    {
      question: 'Os moderadores devem agir publicamente ou em particular?',
      answer:
        'Em particular primeiro. Procure a pessoa individualmente, repita a regra e o impacto e dê a chance de ajustar. Constrangimentos públicos tendem a escalar. Mantenha um registro público das regras, mas aplique-as em particular — em uma DM ou sala privada.',
    },
    {
      question: 'Quando devo remover alguém da comunidade?',
      answer:
        'Depois que avisos claros não funcionaram, ou imediatamente para comportamentos que colocam membros em perigo — assédio, ameaças ou doxxing. O teste é se a pessoa está ativamente tornando o espaço inseguro para outros. Na JoinOrigin, a remoção é o dono da sala removendo um membro da sala.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a moderar meu Origin?',
      answer:
        'Sim. A JoinOrigin é um sistema operacional de comunidades onde o controle do criador é a posse de sala do Matrix — convidar/remover, funções, configurações, fixar e arquivar aplicados no Element. A JoinOrigin não modera comunidades, então as práticas deste guia — regras claras, aplicação em etapas, redução de conflito com calma — são suas para aplicar.',
    },
  ],
  sections: [
    'Escreva três a cinco regras claras. Mantenha-as curtas, específicas e positivas: "Seja respeitoso", "Mantenha-se no tema", "Sem spam ou autopromoção", "Discorde de ideias, não de pessoas". Publique-as onde todo novo membro as verá — idealmente fixadas na sala. Na JoinOrigin, as regras e os valores de uma comunidade são visíveis na sala desde o primeiro dia — novos membros as veem antes de participar. Fixe suas regras curtas onde todo novo membro as verá.',
    'Defina o tom como dono da sala. Modele o comportamento que você quer — receba novos membros, agradeça quem contribui e aborde problemas com calma. O exemplo do criador define o piso cultural da comunidade. A JoinOrigin não policia comunidades — o tom é definido por criadores e membros. A plataforma torna o comportamento acolhedor visível; modele o comportamento que você quer na sala.',
    'Seja dono da sala como o criador que você é. O controle do criador na JoinOrigin é a posse de sala do Matrix: convidar e remover membros, atribuir funções, editar configurações da sala, fixar mensagens e arquivar a sala — aplicados nativamente no Element. Conhecer esses controles é a metade técnica da moderação. A JoinOrigin dá ao criador a posse total da sala desde a publicação, sem sistema de permissão personalizado. Aprenda os controles de moderação da plataforma que você usa e designe um dono claro.',
    'Combinem um caminho de aplicação. Defina uma resposta em etapas: aviso privado, depois limites (silenciado, postagem limitada — geralmente uma mudança de função), depois remoção para violações repetidas ou graves. Escala consistente é mais justa do que improvisação. Na JoinOrigin, as funções são funções padrão do Matrix no Element — silenciar, banir e atribuir funções são ações nativas. Escreva o caminho de aplicação e siga-o.',
    'Aja cedo e com calma. Aborde o primeiro sinal de problema em particular, antes que vire um incidente público. Intervenção precoce e calma é a moderação mais barata que existe. A JoinOrigin não modera por você — intervenção precoce e calma é uma habilidade humana. A plataforma é desenhada para que problemas apareçam visivelmente na sala e sejam pegos cedo. Procure a pessoa em particular ao primeiro sinal.',
    'Aprenda técnicas de redução de conflito. Quando as tensões subirem, desacelere a conversa: reconheça o sentimento, repita o desacordo de forma neutra, pergunte pelo ponto de fundo e sugira uma pausa ou uma sala privada para o calor. A JoinOrigin mantém as interações da comunidade organizadas e calmas por design, mas a redução de conflito continua sendo uma arte humana. Desacelere a conversa e leve o calor para uma sala privada.',
    'Mantenha um registro de incidentes significativos. Anote o que aconteceu, o que você fez e por quê. Um registro simples ajuda você a permanecer consistente, aprender com padrões e defender decisões quando um membro perguntar o porquê. A JoinOrigin é um sistema operacional de comunidades onde a história da comunidade vive em um só lugar — um lar natural para um registro de incidentes. Uma anotação simples do que aconteceu e por quê mantém você consistente.',
    'Compartilhe a carga com comoderadores. Recrute um ou dois membros de confiança e combinem as regras de aplicação. Uma comunidade que depende de um único moderador fica frágil e tendenciosa. A JoinOrigin não fornece equipe de moderação — comoderadores são companheiros de comunidade. Os criadores atribuem funções a comoderadores no Element — funções nativas do Matrix, sem sistema personalizado. Recrute um ou dois membros de confiança e dê a eles funções claras.',
  ],
  steps: [
    {
      title: 'Escreva três a cinco regras claras',
      body: 'Mantenha-as curtas, específicas e positivas: "Seja respeitoso", "Mantenha-se no tema", "Sem spam ou autopromoção", "Discorde de ideias, não de pessoas". Publique-as onde todo novo membro as verá — idealmente fixadas na sala.',
      joinOriginNote:
        'Na JoinOrigin, as regras e os valores de uma comunidade são visíveis na sala desde o primeiro dia — novos membros as veem antes de participar. Fixe suas regras curtas onde todo novo membro as verá.',
    },
    {
      title: 'Defina o tom como dono da sala',
      body: 'Modele o comportamento que você quer — receba novos membros, agradeça quem contribui e aborde problemas com calma. O exemplo do criador define o piso cultural da comunidade.',
      joinOriginNote:
        'A JoinOrigin não policia comunidades — o tom é definido por criadores e membros. A plataforma torna o comportamento acolhedor visível; modele o comportamento que você quer na sala.',
    },
    {
      title: 'Seja dono da sala como o criador que você é',
      body: 'O controle do criador na JoinOrigin é a posse de sala do Matrix: convidar e remover membros, atribuir funções, editar configurações da sala, fixar mensagens e arquivar a sala — aplicados nativamente no Element. Conhecer esses controles é a metade técnica da moderação.',
      joinOriginNote:
        'A JoinOrigin dá ao criador a posse total da sala desde a publicação, sem sistema de permissão personalizado. Aprenda os controles de moderação da plataforma que você usa e designe um dono claro.',
    },
    {
      title: 'Combinem um caminho de aplicação',
      body: 'Defina uma resposta em etapas: aviso privado, depois limites (silenciado, postagem limitada — geralmente uma mudança de função), depois remoção para violações repetidas ou graves. Escala consistente é mais justa do que improvisação.',
      joinOriginNote:
        'Na JoinOrigin, as funções são funções padrão do Matrix no Element — silenciar, banir e atribuir funções são ações nativas. Escreva o caminho de aplicação e siga-o.',
    },
    {
      title: 'Aja cedo e com calma',
      body: 'Aborde o primeiro sinal de problema em particular, antes que vire um incidente público. Intervenção precoce e calma é a moderação mais barata que existe.',
      joinOriginNote:
        'A JoinOrigin não modera por você — intervenção precoce e calma é uma habilidade humana. A plataforma é desenhada para que problemas apareçam visivelmente na sala e sejam pegos cedo. Procure a pessoa em particular ao primeiro sinal.',
    },
    {
      title: 'Aprenda técnicas de redução de conflito',
      body: 'Quando as tensões subirem, desacelere a conversa: reconheça o sentimento, repita o desacordo de forma neutra, pergunte pelo ponto de fundo e sugira uma pausa ou uma sala privada para o calor.',
      joinOriginNote:
        'A JoinOrigin mantém as interações da comunidade organizadas e calmas por design, mas a redução de conflito continua sendo uma arte humana. Desacelere a conversa e leve o calor para uma sala privada.',
    },
    {
      title: 'Mantenha um registro de incidentes significativos',
      body: 'Anote o que aconteceu, o que você fez e por quê. Um registro simples ajuda você a permanecer consistente, aprender com padrões e defender decisões quando um membro perguntar o porquê.',
      joinOriginNote:
        'A JoinOrigin é um sistema operacional de comunidades onde a história da comunidade vive em um só lugar — um lar natural para um registro de incidentes. Uma anotação simples do que aconteceu e por quê mantém você consistente.',
    },
    {
      title: 'Compartilhe a carga com comoderadores',
      body: 'Recrute um ou dois membros de confiança e combinem as regras de aplicação. Uma comunidade que depende de um único moderador fica frágil e tendenciosa.',
      joinOriginNote:
        'A JoinOrigin não fornece equipe de moderação — comoderadores são companheiros de comunidade. Os criadores atribuem funções a comoderadores no Element — funções nativas do Matrix, sem sistema personalizado. Recrute um ou dois membros de confiança e dê a eles funções claras.',
    },
  ],
};

export default content;
