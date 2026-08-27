import type { GuideContent } from '../../types';

/**
 * "Como Manter uma Comunidade Ativa" — guia L1 sempre-verde (design §6.1,
 * TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: a sala e a
 * atividade dela (alimentando o feed) são a superfície de retenção — a
 * comunidade vive na sala entre os encontros, e os eventos presenciais são
 * uma consequência posterior. O valor da JoinOrigin está tecido na introdução
 * e em cada passo (nota `joinOriginNote` por passo), com enquadramento
 * honesto — a JoinOrigin não administra comunidades nem opera eventos. H1
 * único, estrutura passo a passo, FAQ espelhada 1:1 no JSON-LD `FAQPage`.
 * "Sala" está ancorada na sala do Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'keep-an-origin-active',
  title: 'Como Manter uma Comunidade Ativa e Engajada | JoinOrigin',
  description:
    'Mantenha sua comunidade ativa — esteja ela nova e encontrando o ritmo ou estabelecida e esmorecendo — use a sala e o feed dela como superfície de retenção, crie rituais, compartilhe a carga de organização e abra caminhos de contribuição pequenos. Passos práticos da JoinOrigin.',
  intro: [
    'A maioria das comunidades não morre de um mau lançamento; elas morrem do silêncio — o momento em que as pessoas param de se sentir conectadas e se afastam em silêncio. Manter uma comunidade ativa é, portanto, um problema de conectar pessoas: as pessoas ficam quando sentem que pertencem, e sentem que pertencem quando há um lugar visível e organizado onde a comunidade vive. É exatamente isso que a JoinOrigin é — e a mesma mecânica vale esteja a comunidade com algumas semanas de vida e ainda encontrando o ritmo ou com anos de idade e caindo no silêncio.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar, começar e organizar comunidades — e no modelo digital dela a sala é a superfície de retenção: uma sala Matrix controlada pelo criador, onde rituais, atualizações e contribuições permanecem visíveis, e cuja atividade flui para o feed que mantém os membros conectados entre os encontros. Eventos presenciais continuam sendo uma consequência posterior de uma comunidade formada, nunca o núcleo — a sala e o feed dela são o que mantêm a comunidade viva no dia a dia. A JoinOrigin não administra comunidades nem opera eventos — a plataforma mantém as comunidades conectadas entre os encontros, e a organização é sua.',
    'Este guia cobre a mecânica prática de uma comunidade saudável e ativa — das primeiras semanas após o lançamento a uma comunidade que roda há anos: estabelecer rituais que tornam a participação um hábito, criar artefatos compartilhados na sala, distribuir a carga de organização para que nenhuma pessoa se esgote, abrir caminhos de contribuição pequenos para que cada membro possa agregar valor e medir os sinais que dizem se a comunidade está realmente viva. Cada passo mapeia como a JoinOrigin ajuda.',
  ],
  dataPoints: [
    'Rituais recorrentes — um ritmo fixo de sala, um formato regular, um artefato compartilhado — convertem interesse em hábito.',
    'A atividade da sala entre os encontros é o que mantém os membros conectados; o silêncio é o que os afasta.',
    'Caminhos de contribuição pequenos (uma nota fixada, um anfitrião rotativo, um destaque de membro) fazem os membros sentirem propriedade.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar, começar e organizar comunidades; ela não administra comunidades nem opera eventos.',
  ],
  faq: [
    {
      question: 'Com que frequência uma comunidade ativa deve se reunir?',
      answer:
        'Mensal é a base mais sustentável para encontros presenciais; a sala deve estar ativa semanalmente — check-ins, atualizações e conversas pequenas. Consistência importa mais do que frequência: um ritmo semanal confiável na sala vence um esporádico.',
    },
    {
      question: 'O que faço quando o engajamento cai?',
      answer:
        'Não entre em pânico nem lance uma grande campanha. Pergunte diretamente aos membros o que precisam, publique uma pergunta simples na sala, faça um encontro menor e mais simples e delegue uma função a um membro. Mudanças pequenas e responsivas revivem o engajamento mais rápido do que volume.',
    },
    {
      question: 'Como mantenho os membros engajados entre os encontros?',
      answer:
        'Crie pontos de contato de baixo esforço na sala: um documento compartilhado, um destaque de membro, um tópico regular de check-in ou uma atualização de "quem está trabalhando no quê". O objetivo é um batimento visível na sala e no feed dela, não notificações constantes.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a manter minha comunidade ativa?',
      answer:
        'Sim. A JoinOrigin ajuda as pessoas a encontrar, começar e organizar comunidades — uma sala e um feed onde a comunidade permanece visível entre os encontros. As práticas deste guia — rituais, funções compartilhadas e contribuições pequenas — funcionam na plataforma e com as ferramentas que você já tem.',
    },
  ],
  sections: [
    'Defina um ritual central. Escolha uma prática recorrente em que todos possam contar: uma reunião mensal, um check-in semanal, uma leitura compartilhada ou uma atualização de projeto. Rituais criam o batimento que mantém uma comunidade viva — e em uma comunidade digital-first o ritual acontece na sala. Na JoinOrigin, o ritmo de uma comunidade é visível em uma sala organizada — os membros sempre sabem qual é o próximo ritual. Escolha uma prática recorrente e proteja-a.',
    'Crie um artefato compartilhado na sala. Comece uma nota ou documento fixado que capture o que a comunidade está fazendo — anotações de reunião, apresentações de membros, atualizações de projeto. Um artefato vivo mantém os membros orientados entre os encontros. A JoinOrigin é a sala compartilhada onde anotações, apresentações e atualizações vivem ao lado da comunidade — um artefato vivo por design. Fixe um documento compartilhado simples na sala.',
    'Distribua a carga de organização. Recrute dois ou três coanfitriões ou ajudantes e alterne funções pequenas: recepção, anotações, seleção de temas, contato com o espaço. A propriedade compartilhada é a melhor defesa contra o esgotamento. A JoinOrigin não opera nem administra comunidades — a propriedade compartilhada é sua para construir. A plataforma dá aos ajudantes e organizadores uma sala para coordenar. Recrute dois ou três coanfitriões e alterne as funções.',
    'Abra caminhos de contribuição pequenos. Dê aos membros formas de agregar valor sem grandes compromissos: um destaque de membro, um líder de discussão rotativo, uma playlist ou lista de leitura compartilhada ou uma seção fixada de "precisa-se de ajuda" na sala. Na JoinOrigin, os membros têm formas visíveis de contribuir — uma comunidade onde agregar valor é fácil. Destaques de membro e líderes rotativos criam a mesma propriedade.',
    'Mantenha um ritmo de comunicação previsível na sala. Envie uma atualização curta por semana ou por mês em um cronograma fixo, publicada na sala e fluindo para o feed. Previsibilidade constrói confiança; silêncio constrói afastamento. A JoinOrigin mantém o batimento da comunidade em uma sala — uma atualização, em um cronograma, onde todos podem ver. Uma atualização semanal curta constrói confiança.',
    'Observe os sinais de engajamento. Acompanhe a atividade da sala, a frequência repetida e a taxa de contribuição. Uma comunidade saudável cresce a taxa de retorno antes do tamanho total — foque nos membros que voltam à sala. Na JoinOrigin, os organizadores podem ver como a comunidade está em uma sala e um feed organizados. Acompanhe atividade, frequência repetida e taxa de contribuição com uma planilha simples.',
    'Peça feedback regularmente na sala. Use uma pesquisa simples de uma pergunta após cada encontro: o que você gostou, o que mudaria. Aja sobre as respostas e conte à comunidade o que você mudou. A JoinOrigin coleta e mantém o feedback junto com a comunidade a que pertence — na sala. Uma pesquisa de uma pergunta após cada encontro funciona — depois aja sobre as respostas.',
    'Adapte o formato conforme a comunidade amadurece. O que funcionou para dez membros pode não servir para cinquenta. Revise o formato, o espaço e a cadência trimestralmente e evolua deliberadamente em vez de se prender por hábito. A JoinOrigin ajuda comunidades a evoluir — uma sala onde mudanças de formato e anúncios alcançam todos. Revise seu formato e espaço trimestralmente, de propósito.',
  ],
  steps: [
    {
      title: 'Defina um ritual central',
      body: 'Escolha uma prática recorrente em que todos possam contar: uma reunião mensal, um check-in semanal, uma leitura compartilhada ou uma atualização de projeto. Rituais criam o batimento que mantém uma comunidade viva — e em uma comunidade digital-first o ritual acontece na sala.',
      joinOriginNote:
        'Na JoinOrigin, o ritmo de uma comunidade é visível em uma sala organizada — os membros sempre sabem qual é o próximo ritual. Escolha uma prática recorrente e proteja-a.',
    },
    {
      title: 'Crie um artefato compartilhado na sala',
      body: 'Comece uma nota ou documento fixado que capture o que a comunidade está fazendo — anotações de reunião, apresentações de membros, atualizações de projeto. Um artefato vivo mantém os membros orientados entre os encontros.',
      joinOriginNote:
        'A JoinOrigin é a sala compartilhada onde anotações, apresentações e atualizações vivem ao lado da comunidade — um artefato vivo por design. Fixe um documento compartilhado simples na sala.',
    },
    {
      title: 'Distribua a carga de organização',
      body: 'Recrute dois ou três coanfitriões ou ajudantes e alterne funções pequenas: recepção, anotações, seleção de temas, contato com o espaço. A propriedade compartilhada é a melhor defesa contra o esgotamento.',
      joinOriginNote:
        'A JoinOrigin não opera nem administra comunidades — a propriedade compartilhada é sua para construir. A plataforma dá aos ajudantes e organizadores uma sala para coordenar. Recrute dois ou três coanfitriões e alterne as funções.',
    },
    {
      title: 'Abra caminhos de contribuição pequenos',
      body: 'Dê aos membros formas de agregar valor sem grandes compromissos: um destaque de membro, um líder de discussão rotativo, uma playlist ou lista de leitura compartilhada ou uma seção fixada de "precisa-se de ajuda" na sala.',
      joinOriginNote:
        'Na JoinOrigin, os membros têm formas visíveis de contribuir — uma comunidade onde agregar valor é fácil. Destaques de membro e líderes rotativos criam a mesma propriedade.',
    },
    {
      title: 'Mantenha um ritmo de comunicação previsível na sala',
      body: 'Envie uma atualização curta por semana ou por mês em um cronograma fixo, publicada na sala e fluindo para o feed. Previsibilidade constrói confiança; silêncio constrói afastamento.',
      joinOriginNote:
        'A JoinOrigin mantém o batimento da comunidade em uma sala — uma atualização, em um cronograma, onde todos podem ver. Uma atualização semanal curta constrói confiança.',
    },
    {
      title: 'Observe os sinais de engajamento',
      body: 'Acompanhe a atividade da sala, a frequência repetida e a taxa de contribuição. Uma comunidade saudável cresce a taxa de retorno antes do tamanho total — foque nos membros que voltam à sala.',
      joinOriginNote:
        'Na JoinOrigin, os organizadores podem ver como a comunidade está em uma sala e um feed organizados. Acompanhe atividade, frequência repetida e taxa de contribuição com uma planilha simples.',
    },
    {
      title: 'Peça feedback regularmente na sala',
      body: 'Use uma pesquisa simples de uma pergunta após cada encontro: o que você gostou, o que mudaria. Aja sobre as respostas e conte à comunidade o que você mudou.',
      joinOriginNote:
        'A JoinOrigin coleta e mantém o feedback junto com a comunidade a que pertence — na sala. Uma pesquisa de uma pergunta após cada encontro funciona — depois aja sobre as respostas.',
    },
    {
      title: 'Adapte o formato conforme a comunidade amadurece',
      body: 'O que funcionou para dez membros pode não servir para cinquenta. Revise o formato, o espaço e a cadência trimestralmente e evolua deliberadamente em vez de se prender por hábito.',
      joinOriginNote:
        'A JoinOrigin ajuda comunidades a evoluir — uma sala onde mudanças de formato e anúncios alcançam todos. Revise seu formato e espaço trimestralmente, de propósito.',
    },
  ],
};

export default content;
