import type { GuideContent } from '../../types';

/**
 * "Como Encontrar um Cofundador" — guia L1 sempre-verde (design §6.1,
 * TASK-326).
 *
 * Recentralizado no modelo digital conectar→participar→sala: uma página de
 * ideia é publicada, a sala dela é criada automaticamente e as conversas de
 * cofundador acontecem nessa sala — o lugar digital onde candidatos podem
 * encontrar a ideia, fazer perguntas e trabalhar juntos. O valor da
 * JoinOrigin está tecido na introdução e em cada passo (nota `joinOriginNote`
 * por passo), com enquadramento honesto — a JoinOrigin não é um serviço de
 * matchmaking e não conecta fundadores. H1 único, estrutura passo a passo,
 * FAQ espelhada 1:1 no JSON-LD `FAQPage`. "Sala" está ancorada na sala do
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'find-a-co-founder',
  title: 'Como Encontrar um Cofundador: Onde Procurar e o Que Perguntar | JoinOrigin',
  description:
    'Encontre um cofundador que complemente suas habilidades — esteja você lançando ou expandindo uma empresa existente, publique uma página de ideia, encontre-se em comunidades e nas salas delas, faça um projeto de teste e faça as perguntas que evitam separações. Da JoinOrigin.',
  intro: [
    'Encontrar um cofundador é uma decisão de relacionamento disfarçada de decisão de contratação e, no fundo, é outro problema de conectar pessoas: a pessoa certa costuma estar a uma apresentação calorosa de distância, em alguma comunidade que você ainda não descobriu. É esse o problema que a JoinOrigin ajuda a resolver — e é o mesmo problema esteja você ainda na fase de ideia ou tocando uma empresa existente que precisa de um parceiro para dar o próximo passo.',
    'A JoinOrigin é um sistema operacional de comunidades construído em torno do loop digital conectar→participar→sala: você publica uma ideia, a sala dela é criada automaticamente e as pessoas que compartilham a ideia podem participar e conversar nessa sala. A página de ideia é a promessa pública, e a sala é onde as conversas de cofundador realmente acontecem — uma sala Matrix controlada pelo criador, onde pessoas interessadas podem fazer perguntas, compartilhar anotações e testar o encaixe antes de qualquer compromisso. A JoinOrigin não é um serviço de matchmaking, não conecta fundadores e não tem escritórios locais. O valor da plataforma — conectar pessoas em torno de interesses compartilhados — mapeia diretamente a forma como a maioria dos fundadores realmente encontra seu cofundador: por comunidades, salas e apresentações calorosas.',
    'Este guia aborda a busca como você abordaria a construção de uma comunidade: comece pela sua rede existente, publique uma ideia que as pessoas possam encontrar, expanda deliberadamente por comunidades e salas, avalie candidatos com conversas estruturadas e um projeto de teste e combine o essencial antes de se comprometer juridicamente. Os passos são práticos e honestos, e cada um mostra onde a JoinOrigin ajuda.',
  ],
  dataPoints: [
    'Apresentações calorosas e trabalho compartilhado produzem as relações de cofundador mais duradouras.',
    'Uma página de ideia publicada com sala dá às pessoas interessadas um lugar real para encontrar a ideia e começar uma conversa.',
    'Um projeto de teste curto — um protótipo, uma landing page ou um piloto pago — testa estilos de trabalho mais rápido do que entrevistas.',
    'A JoinOrigin é um sistema operacional de comunidades desenhado para ajudar as pessoas a encontrar Origins e colaboradores; não é um serviço de matchmaking e não tem escritórios locais.',
  ],
  faq: [
    {
      question: 'Onde a maioria das pessoas encontra seu cofundador?',
      answer:
        'A maioria dos fundadores se conhece por redes calorosas — eventos, comunidades, salas e apresentações de pessoas em quem confiam. Publicar uma ideia que as pessoas possam encontrar e depois aparecer com constância nas mesmas comunidades e salas é o caminho mais confiável para conhecer potenciais cofundadores.',
    },
    {
      question: 'Como sei se alguém é um bom par de cofundador?',
      answer:
        'Façam um pequeno projeto de teste juntos e prestem atenção em três coisas: habilidades complementares, tolerância a risco parecida e comunicação honesta sob prazos. O projeto de teste revela as três mais rápido do que qualquer conversa.',
    },
    {
      question: 'O que devemos combinar antes de começar?',
      answer:
        'Conversem sobre funções, dedicação de tempo, divisão de equity, vesting, tomada de decisão e o que acontece se alguém quiser sair. Colocar isso na mesa cedo evita os desentendimentos que destroem a maioria das equipes iniciais.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a encontrar um cofundador?',
      answer:
        'A JoinOrigin ajuda as pessoas a encontrar Origins e colaboradores — inclusive o tipo de comunidade onde fundadores se encontram — com uma página de ideia e uma sala onde conversas podem acontecer. A JoinOrigin não conecta fundadores, então os passos de networking e projeto de teste deste guia são seu caminho mais confiável.',
    },
  ],
  sections: [
    'Mapeie primeiro suas lacunas de habilidade. Escreva no que você é realmente bom e o que a empresa precisa que você não é. Um cofundador deve fechar sua maior lacuna — técnica, comercial ou operacional — e não duplicar seus pontos fortes. A JoinOrigin é construída em torno de perfis, ideias e comunidades, não de matchmaking — então o conselho honesto é o mesmo de sempre: saiba qual lacuna você precisa fechar antes de procurar. Escreva seus pontos fortes e as necessidades da empresa.',
    'Publique sua ideia e abra a sala dela. Uma ideia que ninguém consegue encontrar não atrai cofundador. Publique uma página de ideia clara — o que você está construindo, por quê e o tipo de pessoa que você precisa — e deixe a sala dela ser criada automaticamente para que pessoas interessadas tenham um lugar para conversar. Publicar uma ideia na JoinOrigin cria automaticamente a sala dela, o lugar onde conversas de cofundador acontecem. Publique sua ideia em algum lugar público e abra uma sala para discussão em torno dela.',
    'Trabalhe sua rede existente em busca de apresentações calorosas. Conte a cinco pessoas em quem você confia o que você está construindo e o tipo de cofundador que você precisa. Peça um nome para cada uma. Apresentações calorosas vencem o contato frio em quase todos os casos. A JoinOrigin torna as comunidades encontráveis, o que amplia sua rede calorosa com o tempo — e cada apresentação pode levar a uma sala onde a conversa real acontece. Conte a cinco pessoas em quem você confia exatamente que tipo de cofundador você precisa.',
    'Apareça com constância em comunidades relevantes e nas salas delas. Participe de eventos e entre em grupos onde o tipo certo de pessoa se reúne: encontros de fundadores, comunidades do setor, espaços de coworking e salas online. A repetição constrói a confiança que leva a apresentações. A JoinOrigin ajuda as pessoas a encontrar as comunidades que combinam com seus objetivos — o tipo de lugar onde fundadores se encontram — e a participar das salas delas. Escolha os encontros e as salas onde as pessoas certas já se reúnem e continue aparecendo.',
    'Tenha primeiras conversas estruturadas. Pergunte sobre habilidades, tolerância a risco, dedicação de tempo e por que querem começar ou expandir algo. Compartilhe suas próprias respostas. É uma entrevista mútua, não um pitch. A JoinOrigin não conecta fundadores nem conduz conversas — a entrevista mútua é sua. A plataforma coloca você nas mesmas comunidades e salas que potenciais colaboradores — o resto é com você.',
    'Façam um projeto de teste juntos. Escolham algo pequeno e real — um protótipo, uma landing page ou um piloto pago — e trabalhem nele por quatro a seis semanas. Observem como dividem o trabalho, lidam com feedback e se comportam sob pressão. A JoinOrigin dá às comunidades uma sala compartilhada para o trabalho e os projetos delas — um lugar natural para um projeto de teste aparecer. Um pequeno protótipo real é o teste mais confiável.',
    'Decida com base no teste, não no potencial. Pergunte se você confiaria sua reputação a essa pessoa, se ela se comunica com honestidade e se trabalhar junto energiza você. Se o teste pareceu forçado, confie nesse sinal. A JoinOrigin não toma a decisão por você. O valor honesto dela é o contexto de comunidade e sala que permite conhecer e trabalhar com candidatos — o teste ainda conta a verdade.',
    'Combine o essencial antes de se comprometer. Escreva funções, dedicação de tempo, divisão de equity, vesting e regras de tomada de decisão. Mesmo um acordo simples de uma página evita a maioria dos mal-entendidos iniciais. A JoinOrigin é um sistema operacional de comunidades — um espaço organizado onde acordos, funções e anotações de projeto podem viver ao lado da sala da ideia. Mesmo um acordo escrito de uma página evita a maioria dos mal-entendidos iniciais.',
  ],
  steps: [
    {
      title: 'Mapeie primeiro suas lacunas de habilidade',
      body: 'Escreva no que você é realmente bom e o que a empresa precisa que você não é. Um cofundador deve fechar sua maior lacuna — técnica, comercial ou operacional — e não duplicar seus pontos fortes.',
      joinOriginNote:
        'A JoinOrigin é construída em torno de perfis, ideias e comunidades, não de matchmaking — então o conselho honesto é o mesmo de sempre: saiba qual lacuna você precisa fechar antes de procurar. Escreva seus pontos fortes e as necessidades da empresa.',
    },
    {
      title: 'Publique sua ideia e abra a sala dela',
      body: 'Uma ideia que ninguém consegue encontrar não atrai cofundador. Publique uma página de ideia clara — o que você está construindo, por quê e o tipo de pessoa que você precisa — e deixe a sala dela ser criada automaticamente para que pessoas interessadas tenham um lugar para conversar.',
      joinOriginNote:
        'Publicar uma ideia na JoinOrigin cria automaticamente a sala dela, o lugar onde conversas de cofundador acontecem. Publique sua ideia em algum lugar público e abra uma sala para discussão em torno dela.',
    },
    {
      title: 'Trabalhe sua rede existente em busca de apresentações calorosas',
      body: 'Conte a cinco pessoas em quem você confia o que você está construindo e o tipo de cofundador que você precisa. Peça um nome para cada uma. Apresentações calorosas vencem o contato frio em quase todos os casos.',
      joinOriginNote:
        'A JoinOrigin torna as comunidades encontráveis, o que amplia sua rede calorosa com o tempo — e cada apresentação pode levar a uma sala onde a conversa real acontece. Conte a cinco pessoas em quem você confia exatamente que tipo de cofundador você precisa.',
    },
    {
      title: 'Apareça com constância em comunidades relevantes e nas salas delas',
      body: 'Participe de eventos e entre em grupos onde o tipo certo de pessoa se reúne: encontros de fundadores, comunidades do setor, espaços de coworking e salas online. A repetição constrói a confiança que leva a apresentações.',
      joinOriginNote:
        'A JoinOrigin ajuda as pessoas a encontrar as comunidades que combinam com seus objetivos — o tipo de lugar onde fundadores se encontram — e a participar das salas delas. Escolha os encontros e as salas onde as pessoas certas já se reúnem e continue aparecendo.',
    },
    {
      title: 'Tenha primeiras conversas estruturadas',
      body: 'Pergunte sobre habilidades, tolerância a risco, dedicação de tempo e por que querem começar ou expandir algo. Compartilhe suas próprias respostas. É uma entrevista mútua, não um pitch.',
      joinOriginNote:
        'A JoinOrigin não conecta fundadores nem conduz conversas — a entrevista mútua é sua. A plataforma coloca você nas mesmas comunidades e salas que potenciais colaboradores — o resto é com você.',
    },
    {
      title: 'Façam um projeto de teste juntos',
      body: 'Escolham algo pequeno e real — um protótipo, uma landing page ou um piloto pago — e trabalhem nele por quatro a seis semanas. Observem como dividem o trabalho, lidam com feedback e se comportam sob pressão.',
      joinOriginNote:
        'A JoinOrigin dá às comunidades uma sala compartilhada para o trabalho e os projetos delas — um lugar natural para um projeto de teste aparecer. Um pequeno protótipo real é o teste mais confiável.',
    },
    {
      title: 'Decida com base no teste, não no potencial',
      body: 'Pergunte se você confiaria sua reputação a essa pessoa, se ela se comunica com honestidade e se trabalhar junto energiza você. Se o teste pareceu forçado, confie nesse sinal.',
      joinOriginNote:
        'A JoinOrigin não toma a decisão por você. O valor honesto dela é o contexto de comunidade e sala que permite conhecer e trabalhar com candidatos — o teste ainda conta a verdade.',
    },
    {
      title: 'Combine o essencial antes de se comprometer',
      body: 'Escreva funções, dedicação de tempo, divisão de equity, vesting e regras de tomada de decisão. Mesmo um acordo simples de uma página evita a maioria dos mal-entendidos iniciais.',
      joinOriginNote:
        'A JoinOrigin é um sistema operacional de comunidades — um espaço organizado onde acordos, funções e anotações de projeto podem viver ao lado da sala da ideia. Mesmo um acordo escrito de uma página evita a maioria dos mal-entendidos iniciais.',
    },
  ],
};

export default content;
