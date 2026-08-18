import type { CityContent } from '../../types';

/**
 * Conteúdo do Rio de Janeiro (tradução pt-BR) — página da cidade + 5
 * variações + página de ideias. Distinto dos outros arquivos de cidade (G5)
 * e ancorado em fatos honestos sobre a cidade brasileira entre praia e
 * montanha.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'pt-BR',
  slug: 'rio-de-janeiro',
  title: 'Comunidades no Rio de Janeiro | JoinOrigin',
  description:
    'Encontre ou comece comunidades no Rio de Janeiro — grupos de startups, criativos, políticos, encontros e pequenas empresas. Lista de espera da JoinOrigin.',
  pageTitles: {
    city: 'Comunidades no Rio de Janeiro | JoinOrigin',
    cityDescription:
      'Encontre ou comece comunidades no Rio de Janeiro — grupos de startups, criativos, políticos, encontros e pequenas empresas. Lista de espera da JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups no Rio de Janeiro | JoinOrigin',
      creative: 'Comunidades criativas no Rio de Janeiro | JoinOrigin',
      political: 'Comunidades políticas e cívicas no Rio de Janeiro | JoinOrigin',
      meetup: 'Encontros e comunidades sociais no Rio de Janeiro | JoinOrigin',
      'small-business': 'Comunidades de pequenas empresas no Rio de Janeiro | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encontre ou comece comunidades de startups no Rio de Janeiro — fundadores, engenheiros e operadores em Botafogo, Ipanema e no Centro. Lista de espera da JoinOrigin.',
      creative:
        'Encontre ou comece comunidades criativas no Rio de Janeiro — estúdios, escolas de samba e coletivos em Lapa, Santa Teresa e no Centro. Lista de espera da JoinOrigin.',
      political:
        'Encontre ou comece comunidades políticas e cívicas no Rio de Janeiro — moradia, transporte e participação comunitária. Lista de espera da JoinOrigin.',
      meetup:
        'Encontre ou comece comunidades de encontros no Rio de Janeiro — praia, trilhas na floresta e rodas de samba. Lista de espera da JoinOrigin.',
      'small-business':
        'Encontre ou comece comunidades de pequenas empresas no Rio de Janeiro — quiosques, feirantes e lojas de bairro. Lista de espera da JoinOrigin.',
    },
    ideas: '30 ideias de eventos comunitários no Rio de Janeiro | JoinOrigin',
    ideasDescription:
      'Descubra 30 ideias de eventos comunitários no Rio de Janeiro — eventos de networking, aprendizado, ao ar livre, profissionais, criativos e de impacto. Lista de espera da JoinOrigin.',
  },
  intro: [
    'O Rio de Janeiro é a segunda maior cidade do Brasil — cerca de 6,7 milhões de pessoas dentro dos limites da cidade e mais de treze milhões na região metropolitana — situada entre o oceano, as montanhas e a Floresta da Tijuca de um jeito que molda todas as partes da sua vida. As praias de Copacabana, Ipanema e Leblon são as salas de estar da cidade: vôlei, futevôlei, corrida e encontros casuais acontecem lá todos os dias do ano.',
    'O Rio é a capital cultural da música e do carnaval brasileiros: as escolas de samba se preparam o ano todo para os desfiles, o bairro da Lapa abriga uma vida noturna lendária e rodas de samba, e os blocos de rua transformam bairros inteiros em festivais. Marcos como o Pão de Açúcar, o Cristo Redentor, o Jardim Botânico e a Escadaria Selarón atraem visitantes, mas também são partes reais da vida cotidiana. UFRJ, PUC-Rio e UERJ alimentam fluxos constantes de estudantes e pesquisadores nas comunidades da cidade, e a cidade também é um polo crescente de trabalho criativo, tecnologia e economia do oceano.',
    'O Rio é uma cidade de forte sentimento comunitário — a palavra comunidade é usada com orgulho — e sua geografia cria lugares de encontro naturais. Para encontrar ou começar uma comunidade, o Rio recompensa um formato casual e caloroso: uma sessão de praia, uma roda de samba, uma visita guiada a uma favela com um guia local, uma trilha na floresta. A cidade funciona por relacionamentos e boca a boca, então um evento semanal consistente com boas-vindas calorosas vai se espalhar rápido.',
  ],
  dataPoints: [
    'Cerca de 6,7 milhões de moradores; mais de 13 milhões na região metropolitana.',
    'Cidade de praia entre oceano, montanhas e Floresta da Tijuca.',
    'Clusters de samba, carnaval, música e indústria criativa.',
    'Âncoras: UFRJ, PUC-Rio, UERJ, UNIRIO.',
    'Âncoras públicas: praias de Copacabana e Ipanema, Pão de Açúcar, Jardim Botânico.',
    'Cenas de bairro: Ipanema, Copacabana, Botafogo, Santa Teresa, Lapa, Centro.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworkings em Botafogo e Ipanema',
        'Escritórios de startups no Centro',
        'Incubadoras universitárias perto da UFRJ e da PUC-Rio',
        'Escritórios de tech criativa em Laranjeiras',
        'Salas de eventos de aceleradoras em Botafogo',
        'Cafés com mesas de fundadores em Ipanema',
      ],
      formats: [
        'Cafés da manhã de fundadores com rodadas de apresentação',
        'Noites de demo e pitches',
        'Painéis de economia do oceano e do clima',
        'Encontros de criativos e media tech',
        'Encontros de fundadores na praia',
      ],
      howToStart: [
        'Escolha um vertical estreito — tech do oceano, tech criativa ou tech de turismo — e um bairro-âncora.',
        'Reserve um horário semanal recorrente em um coworking de Botafogo ou Ipanema.',
        'Faça três encontros abertos, peça a dois frequentadores para coorganizar e defina um ritmo mensal.',
      ],
    },
    creative: {
      venues: [
        'Casas de música e rodas de samba da Lapa',
        'Estúdios de artistas em Santa Teresa',
        'Espaços culturais do Centro',
        'Estúdios de design em Botafogo',
        'Caminhadas de arte de rua na zona portuária',
        'Salões de ensaio de escolas de samba',
      ],
      formats: [
        'Noites de roda de samba',
        'Fins de semana de estúdio aberto',
        'Noites de exibição com Q&A de diretores',
        'Noites de crítica de design',
        'Caminhadas de arte de rua e fotografia',
      ],
      howToStart: [
        'Escolha um ofício — música, artes visuais, design, cinema — e um bairro.',
        'Faça parceria com um centro cultural, estúdio ou escola de samba que receba um primeiro evento aberto.',
        'Colete trabalhos em andamento antes do segundo evento e torne o feedback o núcleo de cada sessão.',
      ],
    },
    political: {
      venues: [
        'Salas da prefeitura e da câmara',
        'Salas de reunião de bibliotecas públicas',
        'Salas de centros comunitários pela cidade',
        'Salões de associações de moradores de favelas',
        'Espaços de tech cívica no Centro',
        'Espaços de eventos em parques e na orla',
      ],
      formats: [
        'Noites de informação sobre moradia e direito à terra',
        'Reuniões de associações de moradores',
        'Briefings de voluntários de transporte e mobilidade',
        'Círculos de clima e preparação para enchentes',
        'Oficinas de participação cidadã em linguagem simples',
      ],
      howToStart: [
        'Escolha uma questão concreta e uma geografia pequena — um bairro, uma comunidade ou uma política específica.',
        'Participe primeiro de três reuniões existentes e faça parceria com uma organização em vez de duplicar trabalho.',
        'Faça uma oficina amigável para iniciantes sobre como a cidade funciona para construir uma base constante.',
      ],
    },
    meetup: {
      venues: [
        'Trechos de praia de Copacabana e Ipanema',
        'Praia de Botafogo e alamedas da Urca',
        'Trilhas de entrada da Floresta da Tijuca',
        'Bares e rodas de samba da Lapa',
        'Ruas e escadarias de Santa Teresa',
        'Bibliotecas públicas com salas comunitárias',
      ],
      formats: [
        'Vôlei de praia e futevôlei racha',
        'Trilhas de domingo na floresta',
        'Encontros na praia ao pôr do sol',
        'Noites de jogos de tabuleiro e trivia',
        'Encontros de samba e dança',
      ],
      howToStart: [
        'Escolha um formato repetível — uma sessão de praia, uma trilha de domingo — e um ponto de encontro fixo.',
        'Escolha um local como um quiosque da praia de Copacabana ou uma entrada de trilha da Tijuca que seja fácil de achar.',
        'Faça as três primeiras sessões no mesmo horário e lugar, depois peça aos frequentadores que tragam um recém-chegado cada.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de lojas de Copacabana e Ipanema',
        'Espaços de feirantes do mercado',
        'Oficinas do centro de pequenas empresas da cidade',
        'Salas de eventos de associações comerciais',
        'Cafés e quiosques locais com cantos comunitários',
        'Espaços de food halls e cozinhas de incubadoras',
      ],
      formats: [
        'Cafés da manhã de lojistas sem pauta',
        'Mesas redondas de feirantes',
        'Clínicas de órgãos municipais sobre licenças e alvarás',
        'Círculos de compras compartilhadas de insumos',
        'Caminhadas de bairro pelos corredores de lojas',
      ],
      howToStart: [
        'Escolha um corredor e um café que já atenda os donos locais; garanta uma mesa fixa.',
        'Faça primeiro um café da manhã sem pauta — os donos vêm para falar de aluguel, licenças e temporadas de turismo.',
        'Depois de três cafés da manhã, alterne um tema prático por mês e deixe a associação comercial espalhar a notícia.',
      ],
    },
  },
  variantIntros: {
    startup:
      'A cena de startups do Rio de Janeiro é menor do que a de São Paulo, mas distinta, construída sobre os pontos fortes da cidade na economia do oceano, nas indústrias criativas, no turismo e na tecnologia climática. Botafogo e Ipanema abrigam coworkings e escritórios de startups, o Centro ancora a camada corporativa, e universidades como UFRJ e PUC-Rio alimentam talento em engenharia e pesquisa. O que torna o Rio diferente é a qualidade de vida: fundadores trabalham na praia, investidores fazem reuniões com vista para o mar, e a cena funciona por relacionamentos e boca a boca em vez de instituições formais. A cidade é um polo natural para tech do oceano e do clima — energia das ondas, resiliência costeira, turismo sustentável — e sua economia criativa dá às startups acesso incomum a designers, cineastas e músicos. Formatos estabelecidos incluem cafés da manhã de fundadores, noites de demo e painéis do setor, muitos amigáveis para iniciantes. Conselho honesto para começar uma comunidade de startups no Rio: escolha um vertical, ancore-se a um bairro e abrace o estilo caloroso e informal da cidade — um evento semanal consistente na praia construirá uma base fiel.',
    creative:
      'As comunidades criativas do Rio de Janeiro são inseparáveis da identidade da cidade: samba, bossa nova, carnaval, cinema e arte de rua cresceram dos bairros desta cidade e permanecem vivos em locais por todo o Rio. A Lapa é o coração musical — seus bares e rodas de samba atraem locais e visitantes todas as noites da semana — enquanto Santa Teresa abriga estúdios de artistas e cafés boêmios em suas ruas de encosta. A cultura do carnaval da cidade é uma indústria criativa o ano todo: escolas de samba, costureiras de fantasia e músicos se preparam por meses, e os blocos de rua transformam bairros em palcos. Os murais da zona portuária e a Escadaria Selarón adicionam uma camada de arte de rua famosa no mundo. A UFRJ e as instituições de artes da cidade alimentam novos talentos a cada ano. Começar uma comunidade criativa no Rio significa escolher uma disciplina e um bairro e depois usar a profunda cultura musical e visual da cidade para construir algo com alma genuína.',
    political:
      'As comunidades políticas e cívicas do Rio de Janeiro são moldadas pela geografia dramática da cidade e por suas desigualdades profundas: favelas, bairros formais e ativos ambientais existem lado a lado, e as associações de moradores são uma força poderosa na vida local. Moradia e direito à terra são questões definidoras — muitas comunidades se organizam em torno de posse, melhorias e serviços públicos — e as favelas da cidade têm uma forte tradição de autoorganização e ajuda mútua. Enchentes, risco de deslizamento e mudança climática movem redes de preparação e ativismo ambiental, enquanto grupos de transporte e mobilidade pressionam por melhor serviço de metrô e ônibus. Comunidades de tech cívica constroem ferramentas para dados abertos e participação pública, e redes de voluntários organizam limpezas de praia, plantio de árvores e programas sociais. A cultura política recompensa persistência, confiança comunitária e construção genuína de relacionamentos — organizadores que vivem nas e com as comunidades são os que movem as coisas para frente. Começar uma comunidade cívica no Rio geralmente significa escolher uma questão concreta e uma geografia pequena e depois fazer parceria com o rico cenário de associações existente.',
    meetup:
      'A cultura de encontros do Rio de Janeiro é construída na praia e nas colinas: vôlei de praia e futevôlei racha em Copacabana, encontros ao pôr do sol em Ipanema, trilhas de domingo pela Floresta da Tijuca e rodas de samba na Lapa. A geografia da cidade cria pontos de encontro naturais — um quiosque de praia, uma entrada de trilha, uma praça de bairro — e o clima tropical significa que formatos ao ar livre rodam o ano todo. O Rio também é uma cidade de festivais: os blocos da temporada de carnaval e as muitas celebrações de bairro dão aos grupos ocasiões prontas para se reunir. O estilo social caloroso e informal da cidade significa que recém-chegados são recebidos rápido e o boca a boca espalha eventos depressa. Formatos com poder de permanência são simples e repetíveis: uma sessão semanal de praia, uma trilha mensal, uma noite fixa de samba. Conselho honesto para começar um encontro no Rio: escolha um ponto de encontro marcante, um formato que combine com a energia casual da cidade e deixe o calor das pessoas fazer o trabalho de crescimento.',
    'small-business':
      'As comunidades de pequenas empresas do Rio de Janeiro são construídas nas ruas, praias e mercados da cidade: o dono do quiosque na praia de Copacabana, o dono de bar da Lapa, o ateliê de Santa Teresa, o feirante e a boutique de Ipanema compartilham todas as questões práticas sobre aluguel, licenças, equipe e o ritmo das temporadas de turismo. Os mercados e feiras da cidade dão aos feirantes comunidades naturais, e corredores comerciais em Copacabana, Ipanema e no Centro reúnem clusters de lojas com interesse compartilhado em movimento de pedestres. Associações comerciais e centros de pequenas empresas da cidade oferecem oficinas sobre licenciamento, crédito e venda digital, e a enorme economia de turismo da cidade significa que muitos pequenos negócios vivem e morrem pelo planejamento sazonal. Os quiosques de praia são uma instituição única do Rio — pequenos negócios licenciados que ancoram a vida na praia. Novos participantes normalmente se conectam participando de uma reunião de corredor, fazendo uma oficina municipal ou entrando em um coletivo de feirantes. Começar uma comunidade de pequenas empresas aqui é realista: uma mesa redonda mensal em um café de bairro, com temas rotativos como aluguel, seguro e planejamento da temporada de carnaval, atrai de forma confiável donos que raramente têm pares com quem conversar.',
  },
  ideaPage: {
    intro:
      'As praias, colinas, a música e a cultura social calorosa do Rio de Janeiro fazem dele um lugar espetacular para testar novas ideias de eventos comunitários. As trinta ideias abaixo estão agrupadas em seis categorias — networking, aprendizado, social e ao ar livre, profissional e de setor, criativo e maker, e impacto e local. Cada ideia inclui para quem é, um pitch curto e um tipo de local sugerido que realmente existe no Rio, de quiosques da praia de Copacabana e trilhas da Floresta da Tijuca a rodas de samba na Lapa e centros culturais de bairro. Algumas ideias funcionam como eventos avulsos; outras são desenhadas para se tornar comunidades recorrentes com ritmo semanal. A regra de honestidade é simples: toda sugestão de local é um tipo real de lugar nesta cidade, e todo formato é simples o suficiente para um organizador de primeira viagem conduzir. Escolha a ideia que combina com seus interesses, encontre um local que receba você e deixe o calor da cidade fazer o resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Caminhada e conversa na praia',
            pitch:
              'Uma caminhada lenta pelo calçadão de Copacabana com perguntas de conversa rotativas, terminando em um quiosque para uma água de coco.',
            audience: 'Recém-chegados e qualquer pessoa expandindo sua rede',
            venueType: 'Calçadão da praia de Copacabana',
          },
          {
            title: 'AMA de fundador em um coworking de Botafogo',
            pitch:
              'Um fundador conta sua história honesta por trinta minutos e depois responde perguntas abertas da sala.',
            audience: 'Fundadores em fase inicial e aspirantes a empreendedores',
            venueType: 'Coworking em Botafogo',
          },
          {
            title: 'Encontro social de recém-chegados ao pôr do sol',
            pitch:
              'Um encontro leve ao pôr do sol em que recém-chegados conhecem cariocas antigos com petiscos e perguntas de conversa.',
            audience: 'Recém-chegados à cidade, incluindo expats',
            venueType: 'Praia de Ipanema ou uma praça de bairro',
          },
          {
            title: 'Círculo de histórias de carreira',
            pitch:
              'Seis pessoas contam sua história de carreira em cinco minutos, seguidas de discussão em grupo e perguntas de conexão.',
            audience: 'Quem procura emprego, quem muda de carreira e mentores',
            venueType: 'Sala de reunião de biblioteca pública',
          },
          {
            title: 'Visita aos bastidores de uma escola de samba',
            pitch:
              'Uma visita guiada a um ensaio de escola de samba, seguida de um mixer em que visitantes conhecem os membros.',
            audience: 'Amantes de cultura e quem quer fazer networking',
            venueType: 'Salão de ensaio de escola de samba',
          },
        ],
      },
      {
        name: 'Aprendizado e oficinas',
        ideas: [
          {
            title: 'Intercâmbio de português-inglês',
            pitch: 'Mesas por nível e idioma, com uma regra simples: errar é o objetivo.',
            audience: 'Quem aprende português e inglês',
            venueType: 'Café ou centro comunitário em Botafogo',
          },
          {
            title: 'Finanças de pequenas empresas em português simples',
            pitch:
              'Uma sessão prática sobre fluxo de caixa, impostos e crédito para donos de primeira viagem.',
            audience: 'Novos donos de pequenas empresas',
            venueType: 'Centro de pequenas empresas da cidade',
          },
          {
            title: 'Percussão de samba para iniciantes',
            pitch:
              'Uma noite prática em que iniciantes aprendem ritmos básicos de samba ao lado de músicos experientes.',
            audience: 'Músicos e iniciantes curiosos por ritmo',
            venueType: 'Centro comunitário ou estúdio de música',
          },
          {
            title: 'Caminhada de ecologia na Floresta da Tijuca',
            pitch:
              'Uma trilha guiada pela floresta urbana aprendendo sobre suas plantas, animais e história.',
            audience: 'Amantes da natureza e trilheiros',
            venueType: 'Entrada da trilha da Floresta da Tijuca',
          },
          {
            title: 'Oficina de direitos de inquilinos',
            pitch:
              'Uma sessão em linguagem simples sobre contratos, depósitos e onde conseguir ajuda jurídica gratuita.',
            audience: 'Inquilinos e ativistas de moradia',
            venueType: 'Centro comunitário ou biblioteca',
          },
        ],
      },
      {
        name: 'Social e ao ar livre',
        ideas: [
          {
            title: 'Racha de vôlei de praia',
            pitch:
              'Um racha semanal na areia de Copacabana, aberto a todos os níveis, com um lanche em grupo depois.',
            audience: 'Jogadores de vôlei e iniciantes',
            venueType: 'Quadras de areia de Copacabana',
          },
          {
            title: 'Encontro ao pôr do sol no Arpoador',
            pitch:
              'Um encontro semanal ao pôr do sol na famosa pedra, com música, petiscos e novos amigos.',
            audience: 'Amantes de pôr do sol e recém-chegados',
            venueType: 'Pedra do Arpoador e praia de Ipanema',
          },
          {
            title: 'Trilha de domingo na Floresta da Tijuca',
            pitch:
              'Uma trilha amigável para iniciantes pela floresta urbana, com paradas em cachoeiras e um piquenique.',
            audience: 'Trilheiros de todos os níveis',
            venueType: 'Trilhas da Floresta da Tijuca',
          },
          {
            title: 'Noite de roda de samba',
            pitch:
              'Uma noite acolhedora de samba ao vivo em círculo, em que recém-chegados são convidados a entrar na roda.',
            audience: 'Amantes de música e dançarinos',
            venueType: 'Bar da Lapa ou espaço de roda de samba',
          },
          {
            title: 'Noite de jogos de tabuleiro em um bar de bairro',
            pitch: 'Uma pilha mensal de jogos de tabuleiro em um bar que recebe noites tranquilas.',
            audience: 'Jogadores casuais e vizinhos',
            venueType: 'Bar de Botafogo ou da Lapa',
          },
        ],
      },
      {
        name: 'Profissional e de setor',
        ideas: [
          {
            title: 'Mesa redonda de economia do oceano e do clima',
            pitch:
              'Uma discussão mensal para fundadores e operadores que trabalham com resiliência costeira, tech do oceano e sustentabilidade.',
            audience: 'Profissionais de tech do oceano e do clima',
            venueType: 'Sala de eventos de coworking ou universidade',
          },
          {
            title: 'Mixer de indústrias criativas',
            pitch:
              'Uma noite informal em que cineastas, designers e profissionais de mídia trocam notas e contatos.',
            audience: 'Profissionais de indústrias criativas',
            venueType: 'Centro cultural ou estúdio de design',
          },
          {
            title: 'Noite de crítica de design',
            pitch:
              'Designers de produto e marca apresentam trabalhos reais em andamento e recebem feedback estruturado.',
            audience: 'Designers de produto, marca e UX',
            venueType: 'Estúdio de design em Botafogo',
          },
          {
            title: 'Encontro de turismo e hotelaria',
            pitch:
              'Uma noite informal para operadores da economia de turismo da cidade compartilharem tendências e contatos.',
            audience: 'Profissionais de turismo e hotelaria',
            venueType: 'Sala de eventos de hotel ou escritório de turismo',
          },
          {
            title: 'Círculo de contratação para equipes iniciais',
            pitch:
              'Fundadores compartilham como contratam, retêm e demitem — as verdades desconfortáveis de construir equipes cedo.',
            audience: 'Fundadores em fase inicial e líderes de equipe',
            venueType: 'Escritório de startup ou sala de coworking',
          },
        ],
      },
      {
        name: 'Criativo e maker',
        ideas: [
          {
            title: 'Caminhada de arte de rua pela zona portuária',
            pitch:
              'Uma caminhada guiada pelos murais do distrito portuário revitalizado, com as histórias por trás dos artistas.',
            audience: 'Quem gosta de caminhadas de arte e fotografia',
            venueType: 'Ruas e murais da zona portuária',
          },
          {
            title: 'Dia de estúdio aberto em Santa Teresa',
            pitch:
              'Artistas abrem seus estúdios de encosta por uma tarde de visitas, demonstrações e obras à venda.',
            audience: 'Amantes de arte e visitantes curiosos',
            venueType: 'Estúdios de artistas de Santa Teresa',
          },
          {
            title: 'Open mic para músicos e poetas',
            pitch: 'Um open mic acolhedor com uma atração curta e um público que apoia.',
            audience: 'Músicos, poetas e iniciantes',
            venueType: 'Espaço na Lapa ou em Santa Teresa',
          },
          {
            title: 'Oficina de fantasias de carnaval',
            pitch:
              'Uma noite prática aprendendo técnicas de fantasia e adereços com um fazedor de carnaval.',
            audience: 'Amantes do carnaval e fazedores',
            venueType: 'Escola de samba ou oficina comunitária',
          },
          {
            title: 'Noite de zine e risografia',
            pitch:
              'Papel, tesoura e uma impressora risográfica: todo mundo sai com um zine pequeno para trocar.',
            audience: 'Escritores, artistas e entusiastas de impressão',
            venueType: 'Gráfica ou espaço de artes no Centro',
          },
        ],
      },
      {
        name: 'Impacto e local',
        ideas: [
          {
            title: 'Manhã de limpeza na praia',
            pitch:
              'Uma limpeza de sábado de manhã em um trecho de praia, com luvas e café fornecidos.',
            audience: 'Voluntários e amantes do oceano',
            venueType: 'Um trecho de praia escolhido',
          },
          {
            title: 'Dia de trabalho na horta comunitária',
            pitch:
              'Algumas horas de plantio e capina em uma horta comunitária, seguidas de um lanche compartilhado e um tour pela horta.',
            audience: 'Jardineiros, voluntários e famílias',
            venueType: 'Horta comunitária de bairro',
          },
          {
            title: 'Círculo de preparação para enchentes e chuvas',
            pitch:
              'Um grupo de bairro que mapeia riscos, compartilha recursos e se planeja para a temporada de chuvas fortes.',
            audience: 'Moradores preocupados com clima e segurança',
            venueType: 'Centro comunitário ou salão de associação',
          },
          {
            title: 'Dia aberto da associação de moradores',
            pitch:
              'Uma associação de bairro recebe uma noite aberta para que os moradores conheçam os projetos locais e participem.',
            audience: 'Moradores de um bairro',
            venueType: 'Salão da associação de moradores',
          },
          {
            title: 'Noite de histórias de negócios locais',
            pitch:
              'Donos de lojas e quiosques contam as histórias por trás dos seus negócios em palestras de cinco minutos.',
            audience: 'Vizinhos e donos de pequenas empresas',
            venueType: 'Uma loja, café ou salão comercial local',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Como escolho uma dessas ideias?',
        answer:
          'Combine a categoria com seus interesses e o público que você consegue alcançar. No Rio, formatos de praia, música e ao ar livre com boas-vindas calorosas tendem a construir comunidade mais rápido.',
      },
      {
        question: 'Preciso falar português para organizar?',
        answer:
          'Não. Muitos eventos do Rio acontecem em inglês ou bilíngues, especialmente nos bairros de praia. Anunciar nos dois idiomas geralmente dobra seu alcance.',
      },
      {
        question: 'Esses eventos podem se tornar comunidades reais?',
        answer:
          'Sim — formatos recorrentes são como a maioria das comunidades do Rio começa. Os guias práticos percorrem os passos de um primeiro evento a uma comunidade estável com organizadores e rituais.',
      },
    ],
  },
  faq: [
    {
      question: 'Como encontro uma comunidade no Rio de Janeiro?',
      answer:
        'Comece pelas páginas de tipo de grupo: comunidades de startups, criativas, políticas, de encontros e de pequenas empresas. Cada uma descreve os bairros, locais e formatos reais onde os cariocas se reúnem. A JoinOrigin está no ar — crie seu perfil e encontre ou comece sua comunidade hoje.',
    },
    {
      question: 'É realista começar uma comunidade no Rio de Janeiro?',
      answer:
        'Sim. A cidade tem locais públicos gratuitos, uma cultura social calorosa e uma vida musical rica. Os guias cobrem como começar uma comunidade, organizar um encontro e conseguir seus primeiros dez membros.',
    },
    {
      question: 'As sugestões de locais nesta página são reais?',
      answer:
        'Sim. Todo tipo de local mencionado — quiosques da praia de Copacabana, trilhas da Floresta da Tijuca, rodas de samba na Lapa, estúdios de Santa Teresa — existe no Rio de Janeiro. Nunca inventamos números de membros, avaliações ou escritórios locais.',
    },
    {
      question: 'A JoinOrigin tem um escritório no Rio de Janeiro?',
      answer:
        'Não. A JoinOrigin não tem escritórios nem equipe locais. Todas as descrições de comunidade refletem o cenário real da cidade, e a plataforma ajuda os cariocas a encontrar ou começar comunidades.',
    },
  ],
};

export default content;
