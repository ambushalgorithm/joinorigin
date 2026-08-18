import type { GuideContent } from '../../types';

/**
 * "Como Organizar um Encontro" — guia L1 sempre-verde (design §6.1,
 * TASK-326).
 *
 * Recentralizado: encontros são o que um grupo faz DEPOIS de se formar — o
 * caminho digital conectar→participar→sala vem primeiro (publicar grupo →
 * sala criada automaticamente → membros entram por link), e o encontro
 * presencial é uma consequência posterior. O valor da JoinOrigin está tecido
 * na introdução e em cada passo (nota `joinOriginNote` por passo), com
 * enquadramento honesto — a JoinOrigin não reserva espaços nem opera eventos.
 * H1 único, estrutura passo a passo, FAQ espelhada 1:1 no JSON-LD `FAQPage`.
 * "Sala" está ancorada na sala do Matrix (§6.3) — locais físicos são
 * descritos como espaços/locais, nunca "salas".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'organize-a-meetup',
  title: 'Como Organizar um Encontro: Espaços, Pauta e Divulgação | JoinOrigin',
  description:
    'Organize um encontro depois que seu grupo se formar — tenha ele sido fundado no mês passado ou se reunindo há anos — escolha um formato, reserve um espaço, monte uma pauta, divulgue e conduza a noite. Uma lista de verificação prática da JoinOrigin.',
  intro: [
    'Um encontro é um evento presencial recorrente em que pessoas se reúnem em torno de um interesse compartilhado — e na JoinOrigin é um próximo passo natural depois de se comunicar na sala. O caminho digital vem primeiro: as pessoas encontram e participam de um grupo por um link, e a sala do grupo vira o lugar onde os membros conversam, planejam e permanecem conectados entre os encontros. O encontro presencial é o próximo passo dessa comunidade formada — tenha o grupo sido fundado no mês passado ou se reunindo informalmente há anos, a sala dá a ele um lar organizado do qual um encontro pode crescer.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar comunidades para participar e começar as próprias — então um encontro tem um lar onde membros interessados podem descobrir o grupo, entrar na sala dele e coordenar a reunião em vez de depender da lista de contatos de uma pessoa. A JoinOrigin não reserva espaços nem opera eventos — o propósito inteiro da plataforma é conectar pessoas que compartilham um interesse, e a reunião em si é sua para conduzir.',
    'Este guia cobre o ciclo de vida completo de um encontro depois que o grupo existe — para um grupo recém-formado e para um que se reúne há anos: escolher um formato que se encaixe no seu público, encontrar e reservar um espaço sem estourar o orçamento, montar uma pauta com início e fim claros, divulgar o evento onde seu público realmente procura e conduzir a noite para que os participantes saiam querendo o próximo. Cada passo inclui uma nota sobre como a JoinOrigin ajuda — e o primeiro passo é sobre o grupo digital, porque sem um grupo e a sala dele não há comunidade para se encontrar.',
  ],
  dataPoints: [
    'Um encontro simples precisa apenas de três coisas: um formato, um espaço e um canal de divulgação.',
    'Encontros noturnos em dias de semana e sessões de manhã de fim de semana são os formatos recorrentes mais comuns.',
    'A maioria dos espaços — bibliotecas, cafés, coworkings — oferece lugares gratuitos ou de baixo custo para eventos comunitários.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar ou começar comunidades; ela não reserva espaços nem opera eventos.',
  ],
  faq: [
    {
      question: 'Com quanto tempo de antecedência devo divulgar um encontro?',
      answer:
        'Duas a três semanas é um bom equilíbrio: cedo o suficiente para as pessoas planejarem, curto o suficiente para manter a urgência. Anuncie primeiro na sala do grupo e depois compartilhe o evento onde seu público se reúne. Envie um lembrete dois dias antes e de novo no dia do evento.',
    },
    {
      question: 'E se só algumas pessoas aparecerem?',
      answer:
        'Isso é normal, especialmente no início. Conduza a sessão para quem estiver lá, colete o feedback delas na sala e use a próxima edição para melhorar a divulgação. Consistência importa mais do que qualquer comparecimento isolado.',
    },
    {
      question: 'Encontros precisam de uma pauta formal?',
      answer:
        'Sim, uma leve. Um início claro, uma rodada curta de apresentações, uma atividade ou fala principal e um horário de término definido fazem os participantes sentirem que seu tempo foi respeitado — e é isso que os traz de volta.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a organizar encontros?',
      answer:
        'Sim. A JoinOrigin ajuda as pessoas a encontrar e começar comunidades — um lar digital organizado onde a sala de um grupo é onde os membros coordenam e onde um encontro pode ser descoberto. A JoinOrigin não organiza eventos em si, então os passos práticos deste guia são seus para conduzir.',
    },
  ],
  sections: [
    'Forme o grupo e abra a sala dele primeiro. Um encontro é o que um grupo faz depois de se formar — então comece pelo núcleo digital: publique o grupo, deixe a sala ser criada automaticamente e convide membros por um link. Publicar um grupo na JoinOrigin cria automaticamente a sala dele, um espaço controlado pelo criador onde os membros planejam e permanecem conectados. Configure seu grupo e a sala dele nas ferramentas que já usa antes de planejar um único evento, se preferir.',
    'Escolha um formato que se encaixe no seu público. Decida entre uma palestra, uma oficina, um círculo de discussão, um encontro social ou uma sessão de trabalho. Combine o formato com o que o público quer — aprendizado, conexão ou progresso em trabalho compartilhado. Na JoinOrigin, os membros podem ver o formato de uma comunidade antes de participar — o que atrai as pessoas certas e define expectativas. Escolha um formato para o qual seu público realmente aparecerá.',
    'Escolha uma data e uma cadência. Noites de dia de semana e manhãs de fim de semana funcionam melhor para a maioria dos públicos. Escolha um horário recorrente — mensal é o padrão — e proteja-o como um compromisso para que as pessoas criem hábito. A JoinOrigin torna o ritmo de uma comunidade visível em um só lugar, para que os membros saibam a próxima data sem procurar. Proteja seu horário recorrente como um compromisso.',
    'Reserve um espaço cedo. Bibliotecas, cafés, lounges de coworking, centros comunitários e parques recebem eventos comunitários a custo baixo ou zero. Confirme a capacidade, o horário de funcionamento e quaisquer requisitos de reserva por escrito. A JoinOrigin não reserva espaços nem coordena lugares físicos — o foco do design dela é conectar pessoas na sala digital. Confirme capacidade e horários diretamente com o espaço, por escrito.',
    'Rascunhe uma pauta leve. Mantenha simples: boas-vindas e apresentação, atividade principal, discussão aberta, encerramento e próxima data. Estime 60–90 minutos no total e publique a pauta com a listagem do evento e na sala. A JoinOrigin é um sistema operacional de comunidades onde artefatos compartilhados como pautas e anotações vivem ao lado da comunidade. Uma pauta simples publicada resolve.',
    'Divulgue onde seu público já está. Compartilhe o evento em grupos de nicho, newsletters locais, quadros comunitários e canais sociais relevantes — e aponte todos para o link de participação do grupo para que os participantes virem membros, não convidados de uma noite. A JoinOrigin é o lugar onde pessoas que procuram uma comunidade a encontram e participam por um link. Divulgue nos grupos de nicho e newsletters onde seu público já se reúne e compartilhe o link de participação com todo participante.',
    'Conduza a noite com um ritmo claro. Comece no horário, receba quem chega atrasado, mantenha a atividade principal no trilho e encerre anunciando a próxima data. Termine no horário — é o sinal mais forte de respeito. A JoinOrigin não opera eventos — a experiência é sua. A plataforma mantém a história da comunidade em uma sala organizada — a promessa, o ritmo e as pessoas. Terminar no horário é o sinal mais forte de respeito.',
    'Faça o acompanhamento em até 24 horas na sala. Agradeça aos participantes, compartilhe links ou anotações e convide feedback onde todo o grupo possa ver. O acompanhamento é o que transforma um evento único em uma comunidade recorrente. A JoinOrigin dá a uma comunidade uma sala persistente onde o resumo, a próxima data e o feedback vivem — transformando um evento único em uma comunidade recorrente. Seja descoberto e mantenha o impulso.',
  ],
  steps: [
    {
      title: 'Forme o grupo e abra a sala dele primeiro',
      body: 'Um encontro é o que um grupo faz depois de se formar — então comece pelo núcleo digital: publique o grupo, deixe a sala ser criada automaticamente e convide membros por um link.',
      joinOriginNote:
        'Publicar um grupo na JoinOrigin cria automaticamente a sala dele, um espaço controlado pelo criador onde os membros planejam e permanecem conectados. Configure seu grupo e a sala dele nas ferramentas que já usa antes de planejar um único evento, se preferir.',
    },
    {
      title: 'Escolha um formato que se encaixe no seu público',
      body: 'Decida entre uma palestra, uma oficina, um círculo de discussão, um encontro social ou uma sessão de trabalho. Combine o formato com o que o público quer — aprendizado, conexão ou progresso em trabalho compartilhado.',
      joinOriginNote:
        'Na JoinOrigin, os membros podem ver o formato de uma comunidade antes de participar — o que atrai as pessoas certas e define expectativas. Escolha um formato para o qual seu público realmente aparecerá.',
    },
    {
      title: 'Escolha uma data e uma cadência',
      body: 'Noites de dia de semana e manhãs de fim de semana funcionam melhor para a maioria dos públicos. Escolha um horário recorrente — mensal é o padrão — e proteja-o como um compromisso para que as pessoas criem hábito.',
      joinOriginNote:
        'A JoinOrigin torna o ritmo de uma comunidade visível em um só lugar, para que os membros saibam a próxima data sem procurar. Proteja seu horário recorrente como um compromisso.',
    },
    {
      title: 'Reserve um espaço cedo',
      body: 'Bibliotecas, cafés, lounges de coworking, centros comunitários e parques recebem eventos comunitários a custo baixo ou zero. Confirme a capacidade, o horário de funcionamento e quaisquer requisitos de reserva por escrito.',
      joinOriginNote:
        'A JoinOrigin não reserva espaços nem coordena lugares físicos — o foco do design dela é conectar pessoas na sala digital. Confirme capacidade e horários diretamente com o espaço, por escrito.',
    },
    {
      title: 'Rascunhe uma pauta leve',
      body: 'Mantenha simples: boas-vindas e apresentação, atividade principal, discussão aberta, encerramento e próxima data. Estime 60–90 minutos no total e publique a pauta com a listagem do evento e na sala.',
      joinOriginNote:
        'A JoinOrigin é um sistema operacional de comunidades onde artefatos compartilhados como pautas e anotações vivem ao lado da comunidade. Uma pauta simples publicada resolve.',
    },
    {
      title: 'Divulgue onde seu público já está',
      body: 'Compartilhe o evento em grupos de nicho, newsletters locais, quadros comunitários e canais sociais relevantes — e aponte todos para o link de participação do grupo para que os participantes virem membros, não convidados de uma noite.',
      joinOriginNote:
        'A JoinOrigin é o lugar onde pessoas que procuram uma comunidade a encontram e participam por um link. Divulgue nos grupos de nicho e newsletters onde seu público já se reúne e compartilhe o link de participação com todo participante.',
    },
    {
      title: 'Conduza a noite com um ritmo claro',
      body: 'Comece no horário, receba quem chega atrasado, mantenha a atividade principal no trilho e encerre anunciando a próxima data. Termine no horário — é o sinal mais forte de respeito.',
      joinOriginNote:
        'A JoinOrigin não opera eventos — a experiência é sua. A plataforma mantém a história da comunidade em uma sala organizada — a promessa, o ritmo e as pessoas. Terminar no horário é o sinal mais forte de respeito.',
    },
    {
      title: 'Faça o acompanhamento em até 24 horas na sala',
      body: 'Agradeça aos participantes, compartilhe links ou anotações e convide feedback onde todo o grupo possa ver. O acompanhamento é o que transforma um evento único em uma comunidade recorrente.',
      joinOriginNote:
        'A JoinOrigin dá a uma comunidade uma sala persistente onde o resumo, a próxima data e o feedback vivem — transformando um evento único em uma comunidade recorrente. Seja descoberto e mantenha o impulso.',
    },
  ],
};

export default content;
