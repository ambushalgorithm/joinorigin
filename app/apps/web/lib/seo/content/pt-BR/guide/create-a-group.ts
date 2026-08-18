import type { GuideContent } from '../../types';

/**
 * "Como Criar um Grupo" — guia L1 sempre-verde (design §6.1, TASK-353).
 *
 * Escrito contra o fluxo de telas do produto §2, loop central: publicar um
 * grupo → página pública do grupo → Participar via link → sala criada
 * automaticamente AO PUBLICAR → criador controla a sala → crescimento por
 * feed/convites. Um grupo é uma comunidade: a página pública declara a
 * promessa, a sala é onde os membros se conectam e os membros entram por um
 * link. A plataforma está no ar: criar um grupo publica a página dele e abre
 * a sala agora. "Sala" está ancorada na sala do Matrix (§6.3). A expressão
 * nunca é usada no texto autoral.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pt-BR',
  slug: 'create-a-group',
  title: 'Como Criar um Grupo: Publique-o e Abra a Sala Dele | JoinOrigin',
  description:
    'Crie um grupo na JoinOrigin — publique a página do grupo, abra a sala automaticamente e convide membros por um link de participação. Passos práticos da JoinOrigin.',
  intro: [
    'Toda comunidade — seja totalmente nova ou se reunindo informalmente há meses — funciona com os mesmos dois movimentos: decidir para quem ela é e dar a essas pessoas um lugar claro para se conectar. Um grupo sem lar nunca se forma direito; o interesse se espalha por mensagens, planilhas e conversas avulsas, e nada fixa. A página do grupo e a sala dele são esse lar, e criá-los bem é a diferença entre uma comunidade real e uma lista de nomes.',
    'O ciclo da JoinOrigin funciona assim: você publica um grupo, a página pública dele aparece e a sala é criada automaticamente no momento da publicação. As pessoas descobrem o grupo pelo Explorar ou seguem um link de participação, participar é um único clique, e elas entram na sala — uma sala Matrix controlada pelo criador, onde a comunidade realmente vive. O criador é dono da sala desde o segundo zero e controla quem entra e como o grupo funciona.',
    'Este guia cobre o caminho inteiro — seja o grupo novo ou já existente no papel: escolher o público e o propósito, escrever uma página de grupo que as pessoas possam encontrar, publicar o grupo e abrir a sala, definir expectativas como criador, compartilhar o link de participação, convidar os primeiros membros, começar as primeiras conversas e manter a sala ativa para o grupo continuar crescendo.',
  ],
  dataPoints: [
    'Os grupos mais claros começam com um único público e uma única promessa — especificidade é um recurso de crescimento.',
    'Na JoinOrigin, publicar um grupo cria automaticamente a sala dele — a comunidade tem um lugar para se conectar desde o segundo zero.',
    'Um link de participação é o convite mais simples: um link, um clique, e um novo membro está na sala.',
    'A JoinOrigin é um sistema operacional de comunidades que ajuda as pessoas a encontrar, participar e começar grupos — publique seu grupo e a sala dele abre imediatamente.',
  ],
  faq: [
    {
      question: 'Qual é a diferença entre um grupo e uma comunidade?',
      answer:
        'Na JoinOrigin, são o mesmo objeto. Um grupo (ou comunidade) é um objeto publicado e participável, com uma página pública e uma sala. A página do grupo declara a promessa; a sala é onde os membros se conectam. As comunidades ganham um Espaço Matrix que guarda as salas do grupo, e a sala principal é onde o grupo vive.',
    },
    {
      question: 'Quando a sala do grupo é criada?',
      answer:
        'A sala é criada automaticamente no momento em que você publica o grupo — nunca existe um passo separado de "criar o chat depois". O criador é dono da sala desde o segundo zero e pode convidar, remover e atribuir funções dentro do Element. Você também pode montar a mesma estrutura com as ferramentas que já usa.',
    },
    {
      question: 'Como os membros entram no meu grupo?',
      answer:
        'Participar é uma única ação: clicar em Participar na página pública do grupo ou seguir um link de convite direto de um membro. Quem participa entra na sala do grupo. O crescimento inicial mais confiável é o pessoal — compartilhar o link de participação com pessoas que se encaixam no público e pedir que tragam outras.',
    },
    {
      question: 'O que a página do grupo deve dizer?',
      answer:
        'Uma frase sobre para quem é o grupo, uma frase sobre o que acontece na sala e o que um membro ganha ao participar. Seja específico — "novos fundadores no Brooklyn" vence "pessoas que gostam de negócios". A página é a promessa que decide se alguém clica em Participar.',
    },
    {
      question: 'A JoinOrigin pode me ajudar a criar um grupo hoje?',
      answer:
        'Sim. Publicar um grupo na JoinOrigin cria a página e a sala dele de forma atômica — a sala abre no momento em que você publica, e você a controla desde o início. Publique o grupo e abra uma sala para os membros; cada novo membro que você convida amplia seu alcance.',
    },
  ],
  sections: [
    'Escolha o público e o propósito. Decida para quem é o grupo e para que ele existe — um público, uma promessa e um membro bem-sucedido que você consegue descrever. A JoinOrigin é desenhada em torno de páginas de grupo encontráveis, e os grupos mais claros declaram o público e o propósito logo de cara. Escreva uma frase para cada um e mantenha-as à frente de todo convite.',
    'Escreva uma página de grupo que as pessoas possam encontrar. A página deve declarar para quem é o grupo, o que acontece na sala e o que os membros ganham ao participar. Seja específico e honesto. Publicar um grupo na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Publique a descrição e teste-a com algumas pessoas que se encaixam no público.',
    'Publique o grupo e abra a sala dele. Publicar é o momento em que o grupo se torna real: uma página pública mais uma sala onde os membros se conectam. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela. Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Crie a página e a sala nas ferramentas que seu grupo já usa, se preferir.',
    'Defina expectativas como criador. Como dono da sala, decida como o grupo funciona: o que os membros podem publicar, quais são as regras e como novas pessoas são recebidas. O controle do criador é a posse padrão de sala do Matrix — convidar, remover, atribuir funções, fixar, arquivar. A JoinOrigin não define suas regras por você; o design dá a você os controles. Escreva as expectativas da sala e fixe-as onde os membros possam ver.',
    'Compartilhe o link de participação. O link de participação é o caminho mais curto do interesse à associação: um link, um clique, e um novo membro entra na sala. Coloque-o em todos os lugares onde as pessoas certas se reúnem. Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu grupo resolve.',
    'Convide pessoalmente os primeiros membros. Convites pessoais convertem muito melhor do que publicações públicas. Envie mensagem para amigos, colegas e conhecidos que se encaixam no público, compartilhe o link de participação e peça que tragam mais uma pessoa. A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram um grupo podem encontrar o seu e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada membro vira um canal para a própria rede dele.',
    'Comece as primeiras conversas na sala. As primeiras conversas definem a cultura. Abra com um estímulo claro — apresentações, um objetivo compartilhado ou um primeiro tema — e responda a toda mensagem. A JoinOrigin não conduz suas conversas; a sala é sua para moldar. A plataforma dá ao grupo uma sala onde os membros se conectam, e o criador é dono dela. Seja o membro mais ativo nas primeiras semanas.',
    'Mantenha a sala ativa e crescendo. Mantenha um ritmo — um tema semanal, um check-in recorrente ou uma atualização fixa — para que os membros tenham motivo para voltar. O crescimento se compõe quando cada membro consegue descrever o grupo em uma frase e compartilhar o link de participação. A JoinOrigin mantém sua página de grupo e a sala dele conectadas conforme o grupo cresce — um lugar onde a promessa, a sala e as pessoas são visíveis. Seja descoberto e cresça.',
  ],
  steps: [
    {
      title: 'Escolha o público e o propósito',
      body: 'Decida para quem é o grupo e para que ele existe — um público, uma promessa e um membro bem-sucedido que você consegue descrever.',
      joinOriginNote:
        'A JoinOrigin é desenhada em torno de páginas de grupo encontráveis, e os grupos mais claros declaram o público e o propósito logo de cara. Escreva uma frase para cada um e mantenha-as à frente de todo convite.',
    },
    {
      title: 'Escreva uma página de grupo que as pessoas possam encontrar',
      body: 'A página deve declarar para quem é o grupo, o que acontece na sala e o que os membros ganham ao participar. Seja específico e honesto.',
      joinOriginNote:
        'Publicar um grupo na JoinOrigin cria automaticamente a página e a sala dele, com o criador controlando a sala desde o início. Publique a descrição e teste-a com algumas pessoas que se encaixam no público.',
    },
    {
      title: 'Publique o grupo e abra a sala dele',
      body: 'Publicar é o momento em que o grupo se torna real: uma página pública mais uma sala onde os membros se conectam. Na JoinOrigin, a sala é criada automaticamente no mesmo momento — não há etapa de configuração separada, e o criador é dono dela.',
      joinOriginNote:
        'Na JoinOrigin, a página, a sala e o link de participação são uma única publicação. Crie a página e a sala nas ferramentas que seu grupo já usa, se preferir.',
    },
    {
      title: 'Defina expectativas como criador',
      body: 'Como dono da sala, decida como o grupo funciona: o que os membros podem publicar, quais são as regras e como novas pessoas são recebidas. O controle do criador é a posse padrão de sala do Matrix — convidar, remover, atribuir funções, fixar, arquivar.',
      joinOriginNote:
        'A JoinOrigin não define suas regras por você; o design dá a você os controles. Escreva as expectativas da sala e fixe-as onde os membros possam ver.',
    },
    {
      title: 'Compartilhe o link de participação',
      body: 'O link de participação é o caminho mais curto do interesse à associação: um link, um clique, e um novo membro entra na sala. Coloque-o em todos os lugares onde as pessoas certas se reúnem.',
      joinOriginNote:
        'Participar na JoinOrigin é uma única ação — clicar em Participar na página pública ou seguir um link de convite direto de um membro. Um link curto e claro para seu grupo resolve.',
    },
    {
      title: 'Convide pessoalmente os primeiros membros',
      body: 'Convites pessoais convertem muito melhor do que publicações públicas. Envie mensagem para amigos, colegas e conhecidos que se encaixam no público, compartilhe o link de participação e peça que tragam mais uma pessoa.',
      joinOriginNote:
        'A JoinOrigin torna a descoberta mais fácil — um lugar onde pessoas que procuram um grupo podem encontrar o seu e participar por um link. Convites pessoais ainda fazem o trabalho pesado, e cada membro vira um canal para a própria rede dele.',
    },
    {
      title: 'Comece as primeiras conversas na sala',
      body: 'As primeiras conversas definem a cultura. Abra com um estímulo claro — apresentações, um objetivo compartilhado ou um primeiro tema — e responda a toda mensagem.',
      joinOriginNote:
        'A JoinOrigin não conduz suas conversas; a sala é sua para moldar. A plataforma dá ao grupo uma sala onde os membros se conectam, e o criador é dono dela. Seja o membro mais ativo nas primeiras semanas.',
    },
    {
      title: 'Mantenha a sala ativa e crescendo',
      body: 'Mantenha um ritmo — um tema semanal, um check-in recorrente ou uma atualização fixa — para que os membros tenham motivo para voltar. O crescimento se compõe quando cada membro consegue descrever o grupo em uma frase e compartilhar o link de participação.',
      joinOriginNote:
        'A JoinOrigin mantém sua página de grupo e a sala dele conectadas conforme o grupo cresce — um lugar onde a promessa, a sala e as pessoas são visíveis. Seja descoberto e cresça.',
    },
  ],
};

export default content;
