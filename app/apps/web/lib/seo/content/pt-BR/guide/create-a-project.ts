import type { GuideContent } from '../../types';

/**
 * "Como Criar um Projeto" — guia L1 sempre-verde (design §6.1, TASK-353).
 *
 * Escrito contra o fluxo de telas do produto §2, loop central: um grupo
 * formado passa da conversa para o trabalho compartilhado ao publicar um
 * projeto; a página do projeto é pública, a sala é criada automaticamente AO
 * PUBLICAR, o criador controla a sala e o progresso flui para o feed. A
 * plataforma está no ar: publicar um projeto abre a página e a sala dele
 * agora. "Sala" está ancorada na sala do Matrix (§6.3). A expressão nunca é
 * usada no texto autoral.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'create-a-project',
  title:
    'Como Criar um Projeto: Transforme o Impulso do Grupo em Trabalho Compartilhado | JoinOrigin',
  description:
    'Crie um projeto na JoinOrigin — seja uma ideia totalmente nova ou um trabalho que já está em andamento — publique uma página de projeto compartilhada, abra a sala automaticamente e transforme a conversa do grupo em trabalho que sai do papel. Passos práticos da JoinOrigin.',
  intro: [
    'Um grupo que só conversa acaba travando. A diferença entre uma comunidade que parece viva e uma que esmorece é o trabalho compartilhado — um projeto com nome, objetivo e um lugar onde o progresso é visível. Transformar uma conversa em projeto também é um problema de conectar pessoas: você precisa das pessoas certas, do compromisso certo e de um lugar claro para trabalhar junto. O mesmo vale quando o projeto já existe — espalhado por arquivos, mensagens e a lista de tarefas de uma pessoa — ele ainda precisa de um lar visível e das pessoas certas em torno dele.',
    'O fluxo da JoinOrigin cuida dessa transição: um grupo formado publica um projeto, e a página do projeto aparece publicamente com a sala criada automaticamente no momento da publicação. Os membros entram na sala do projeto por um link, o criador a controla como dono da sala, e as atualizações da sala fluem para o feed para que toda a rede veja o trabalho. A sala do projeto abre no momento em que você publica — sem etapa de configuração no meio.',
    'Este guia percorre da primeira centelha a um ritmo de trabalho — seja o projeto totalmente novo ou já em andamento: partir de um grupo existente e da sala dele, definir um escopo que realmente saia do papel, escrever a página do projeto, publicá-la e abrir a sala, convidar a equipe de trabalho, combinar funções e um primeiro marco, levar o trabalho real para a sala e compartilhar o progresso para criar impulso.',
  ],
  dataPoints: [
    'Projetos com página pública e um primeiro marco claro são mais fáceis de compor equipe — as pessoas participam de um trabalho que conseguem ver.',
    'Na JoinOrigin, publicar um projeto cria automaticamente a sala dele — o espaço de trabalho existe desde o mesmo momento da página.',
    'A sala do projeto dá ao trabalho um único lar: decisões, arquivos e progresso visíveis para todos que participam.',
    'A JoinOrigin é um sistema operacional de comunidades que ajuda grupos formados a transformar conversas em projetos — publique seu projeto e a sala dele abre imediatamente.',
  ],
  faq: [
    {
      question: 'O que torna um grupo pronto para começar um projeto?',
      answer:
        'Um grupo está pronto quando alguns membros compartilham um resultado concreto e estão dispostos a dedicar tempo. Você não precisa de uma equipe grande — três pessoas comprometidas com um marco claro vencem uma dúzia de curiosos. Publique o projeto quando a conversa se repetir: "a gente deveria mesmo fazer isso".',
    },
    {
      question: 'Quando a sala do projeto é criada?',
      answer:
        'A sala é criada automaticamente no momento em que você publica o projeto. O criador é dono da sala desde o início e pode convidar a equipe de trabalho, atribuir funções e manter o trabalho organizado dentro do Element. Você também pode criar a mesma estrutura com as ferramentas que seu grupo já usa.',
    },
    {
      question: 'Como um projeto é diferente de uma ideia?',
      answer:
        'Uma ideia é uma proposta em torno da qual as pessoas se reúnem — a sala dela é onde o interesse e o encaixe são testados. Um projeto é o trabalho compartilhado ao qual um grupo formado se compromete, com página, sala e marco. Publique uma ideia primeiro quando precisar de pessoas; publique um projeto quando já as tiver.',
    },
    {
      question: 'Qual deve ser o primeiro marco?',
      answer:
        'Pequeno e concluível — um rascunho funcional, um piloto, uma primeira versão ou uma entrega pronta em poucas semanas. Um primeiro marco curto gera confiança no grupo e torna o projeto real para novos participantes. Você sempre pode expandir depois da primeira vitória.',
    },
    {
      question: 'A JoinOrigin pode ajudar um grupo a começar um projeto hoje?',
      answer:
        'Sim. Publicar um projeto na JoinOrigin cria a página e a sala dele de forma atômica — a sala abre no momento em que você publica, e o criador a controla. Escolha o objetivo do grupo, crie um lar de projeto compartilhado e abra uma sala para o trabalho; cada novo membro que você convida amplia seu alcance.',
    },
  ],
  sections: [
    'Comece de um grupo existente e da sala dele. Um projeto cresce de um grupo que já tem confiança e impulso. Observe as conversas na sala do grupo e encontre a necessidade recorrente — aquilo que os membros ficam dizendo "a gente deveria fazer". A JoinOrigin mantém uma comunidade vivendo em uma sala controlada pelo criador, e o projeto é a próxima camada sobre essa sala. Dê nome à necessidade recorrente do grupo e teste se alguém quer agir sobre ela.',
    'Defina um escopo que realmente saia do papel. Escreva o que o projeto vai produzir, para quem e em que prazo. Mantenha a primeira versão pequena o suficiente para o grupo conseguir terminá-la. A JoinOrigin é desenhada em torno de projetos com páginas públicas — um escopo claro é o que torna a página legível e a sala focada. Uma frase dizendo o que sai e quando é suficiente para começar.',
    'Escreva a página do projeto. A página deve declarar o objetivo do projeto, o problema que ele resolve, quem está trabalhando nele e o que ele precisa. Seja honesto sobre o estágio — um rascunho inicial está ótimo. Publicar um projeto na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Publique a descrição do projeto em algum lugar para onde o grupo possa apontar as pessoas.',
    'Publique o projeto e abra a sala dele. Publicar é o que torna o projeto real: uma página pública mais uma sala onde o trabalho vive. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela. Na JoinOrigin, a página, a sala e a equipe de trabalho são uma única publicação. Crie a página e a sala nas ferramentas que seu grupo já usa, se preferir.',
    'Convide a equipe de trabalho para a sala. Convide as pessoas que realmente farão o trabalho — uma equipe pequena e comprometida é melhor do que uma plateia grande. Compartilhe o link de participação e peça que cada pessoa confirme seu tempo. Participar na JoinOrigin é uma única ação — clicar em Participar na página do projeto ou seguir um link de convite direto de um membro. Um link claro para a sala do projeto resolve.',
    'Combinem funções e um primeiro marco. Defina quem é dono do quê, com que frequência o grupo se reúne e o primeiro marco em que todos estão trabalhando. Escreva em um lugar que toda a equipe possa ver. A JoinOrigin não atribui funções por você — o controle do criador significa que você decide. A plataforma mantém as funções e o marco visíveis na sala do projeto. Um plano curto e escrito na sala é suficiente.',
    'Leve o trabalho real para a sala. Troque "a gente deveria" por "aqui está o rascunho", "aqui está a decisão" e "aqui está a próxima tarefa". Mantenha o progresso em um lugar visível para que todos possam acompanhar. A JoinOrigin mantém a sala de um projeto guardando o trabalho — decisões, arquivos e atualizações — em vez de espalhá-los por mensagens privadas. Mantenha os artefatos de trabalho na sala compartilhada desde a primeira semana.',
    'Compartilhe o progresso para criar impulso. Publique atualizações conforme o projeto avança, comemore o marco quando ele chegar e convide o grupo maior a participar ou acompanhar. O progresso no feed transforma um projeto em prova de que a comunidade entrega. Atualizações da sala fluem para o feed na JoinOrigin — o ciclo de crescimento em que cada novo membro amplia a superfície de descoberta. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Comece de um grupo existente e da sala dele',
      body: 'Um projeto cresce de um grupo que já tem confiança e impulso. Observe as conversas na sala do grupo e encontre a necessidade recorrente — aquilo que os membros ficam dizendo "a gente deveria fazer".',
      joinOriginNote:
        'A JoinOrigin mantém uma comunidade vivendo em uma sala controlada pelo criador, e o projeto é a próxima camada sobre essa sala. Dê nome à necessidade recorrente do grupo e teste se alguém quer agir sobre ela.',
    },
    {
      title: 'Defina um escopo que realmente saia do papel',
      body: 'Escreva o que o projeto vai produzir, para quem e em que prazo. Mantenha a primeira versão pequena o suficiente para o grupo conseguir terminá-la.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de projetos com páginas públicas — um escopo claro é o que torna a página legível e a sala focada. Uma frase dizendo o que sai e quando é suficiente para começar.',
    },
    {
      title: 'Escreva a página do projeto',
      body: 'A página deve declarar o objetivo do projeto, o problema que ele resolve, quem está trabalhando nele e o que ele precisa. Seja honesto sobre o estágio — um rascunho inicial está ótimo.',
      joinOriginNote:
        'Publicar um projeto na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Publique a descrição do projeto em algum lugar para onde o grupo possa apontar as pessoas.',
    },
    {
      title: 'Publique o projeto e abra a sala dele',
      body: 'Publicar é o que torna o projeto real: uma página pública mais uma sala onde o trabalho vive. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela.',
      joinOriginNote:
        'Na JoinOrigin, a página, a sala e a equipe de trabalho são uma única publicação. Crie a página e a sala nas ferramentas que seu grupo já usa, se preferir.',
    },
    {
      title: 'Convide a equipe de trabalho para a sala',
      body: 'Convide as pessoas que realmente farão o trabalho — uma equipe pequena e comprometida é melhor do que uma plateia grande. Compartilhe o link de participação e peça que cada pessoa confirme seu tempo.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página do projeto ou seguir um link de convite direto de um membro. Um link claro para a sala do projeto resolve.',
    },
    {
      title: 'Combinem funções e um primeiro marco',
      body: 'Defina quem é dono do quê, com que frequência o grupo se reúne e o primeiro marco em que todos estão trabalhando. Escreva em um lugar que toda a equipe possa ver.',
      joinOriginNote:
        'A JoinOrigin não atribui funções por você — o controle do criador significa que você decide. A plataforma mantém as funções e o marco visíveis na sala do projeto. Um plano curto e escrito na sala é suficiente.',
    },
    {
      title: 'Leve o trabalho real para a sala',
      body: 'Troque "a gente deveria" por "aqui está o rascunho", "aqui está a decisão" e "aqui está a próxima tarefa". Mantenha o progresso em um lugar visível para que todos possam acompanhar.',
      joinOriginNote:
        'A JoinOrigin mantém a sala de um projeto guardando o trabalho — decisões, arquivos e atualizações — em vez de espalhá-los por mensagens privadas. Mantenha os artefatos de trabalho na sala compartilhada desde a primeira semana.',
    },
    {
      title: 'Compartilhe o progresso para criar impulso',
      body: 'Publique atualizações conforme o projeto avança, comemore o marco quando ele chegar e convide o grupo maior a participar ou acompanhar. O progresso no feed transforma um projeto em prova de que a comunidade entrega.',
      joinOriginNote:
        'Atualizações da sala fluem para o feed na JoinOrigin — o ciclo de crescimento em que cada novo membro amplia a superfície de descoberta. Seja descoberto e cresça.',
    },
  ],
};

export default content;
