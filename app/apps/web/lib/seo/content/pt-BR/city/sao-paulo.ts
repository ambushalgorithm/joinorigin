import type { CityContent } from '../../types';

/**
 * Conteúdo de São Paulo (tradução pt-BR) — página da cidade + 5 variações +
 * página de ideias. Distinto dos outros arquivos de cidade (G5) e ancorado
 * em fatos honestos sobre a maior cidade da América Latina.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'pt-BR',
  slug: 'sao-paulo',
  title: 'Comunidades em São Paulo | JoinOrigin',
  description:
    'Encontre ou comece comunidades em São Paulo — grupos de startups, criativos, políticos, encontros e pequenas empresas. Lista de espera da JoinOrigin.',
  pageTitles: {
    city: 'Comunidades em São Paulo | JoinOrigin',
    cityDescription:
      'Encontre ou comece comunidades em São Paulo — grupos de startups, criativos, políticos, encontros e pequenas empresas. Lista de espera da JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups em São Paulo | JoinOrigin',
      creative: 'Comunidades criativas em São Paulo | JoinOrigin',
      political: 'Comunidades políticas e cívicas em São Paulo | JoinOrigin',
      meetup: 'Encontros e comunidades sociais em São Paulo | JoinOrigin',
      'small-business': 'Comunidades de pequenas empresas em São Paulo | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encontre ou comece comunidades de startups em São Paulo — fundadores, engenheiros e operadores em Pinheiros, Vila Madalena e no corredor da Faria Lima. Lista de espera da JoinOrigin.',
      creative:
        'Encontre ou comece comunidades criativas em São Paulo — estúdios, galerias e coletivos em Vila Madalena, Pinheiros e no Centro. Lista de espera da JoinOrigin.',
      political:
        'Encontre ou comece comunidades políticas e cívicas em São Paulo — moradia, transporte e participação cidadã. Lista de espera da JoinOrigin.',
      meetup:
        'Encontre ou comece comunidades de encontros em São Paulo — piqueniques no Ibirapuera, cafés e caminhadas. Lista de espera da JoinOrigin.',
      'small-business':
        'Encontre ou comece comunidades de pequenas empresas em São Paulo — lojistas, feirantes e empreendedores locais. Lista de espera da JoinOrigin.',
    },
    ideas: '30 ideias de eventos comunitários em São Paulo | JoinOrigin',
    ideasDescription:
      'Descubra 30 ideias de eventos comunitários em São Paulo — eventos de networking, aprendizado, ao ar livre, profissionais, criativos e de impacto. Lista de espera da JoinOrigin.',
  },
  intro: [
    'São Paulo é a maior cidade do Brasil e das Américas — cerca de 12,4 milhões de pessoas dentro dos limites da cidade e mais de vinte milhões na região metropolitana — e é o coração financeiro e corporativo da América Latina. Diferente das cidades de praia, São Paulo é uma cidade de trabalho, ambição e cultura: arranha-céus ao longo da Avenida Paulista e do corredor da Faria Lima, uma gastronomia de classe mundial e bairros como Pinheiros, Vila Madalena, Itaim Bibi e Jardins, cada um com uma vida comunitária própria.',
    'A cidade é a capital brasileira de startups, com uma onda fintech — empresas como o Nubank nasceram aqui — e uma economia criativa profunda em design, moda, cinema e música. USP, PUC-SP, FGV e outras universidades alimentam fluxos constantes de estudantes e pesquisadores na cena. O Parque Ibirapuera é o grande âncora público, o Mercado Municipal e as feiras de rua ancoram as comunidades gastronômicas, e o Beco do Batman, na Vila Madalena, é uma galeria de arte de rua a céu aberto famosa no mundo.',
    'São Paulo é densa, úmida e rápida, e o trânsito é lendário — o que molda a vida comunitária: grupos se ancoram em bairros e linhas de metrô, e um bom local vale a viagem. Para encontrar ou começar uma comunidade, São Paulo recompensa escolher um bairro, um formato claro e um local com acesso ao metrô, e depois construir um ritmo que combine com a energia implacável da cidade.',
  ],
  dataPoints: [
    'Cerca de 12,4 milhões de moradores; a maior cidade das Américas.',
    'Capital financeira e de startups do Brasil.',
    'Clusters de fintech, design, moda, cinema e música.',
    'Âncoras: USP, PUC-SP, FGV, UNIFESP.',
    'Âncoras públicas: Parque Ibirapuera, Avenida Paulista, Mercado Municipal.',
    'Cenas de bairro: Pinheiros, Vila Madalena, Itaim Bibi, Jardins, Centro.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworkings em Pinheiros e Vila Madalena',
        'Escritórios de startups no corredor da Faria Lima',
        'Incubadoras universitárias perto da USP e da FGV',
        'Salas de eventos de escritórios de fintech e pagamentos',
        'Salas de eventos de aceleradoras no Itaim Bibi',
        'Cafés com mesas de fundadores em Pinheiros',
      ],
      formats: [
        'Cafés da manhã de fundadores com rodadas de apresentação',
        'Noites de demo e pitches',
        'Painéis de fintech e pagamentos',
        'Encontros de design e tech criativa',
        'Mixers internacionais de fundadores em inglês',
      ],
      howToStart: [
        'Escolha um vertical estreito — fintech, marketplaces ou builders de IA — e um bairro-âncora.',
        'Reserve um horário semanal recorrente em um coworking de Pinheiros ou da Faria Lima.',
        'Faça três encontros abertos, peça a dois frequentadores para coorganizar e defina um ritmo mensal.',
      ],
    },
    creative: {
      venues: [
        'Galérias e estúdios da Vila Madalena',
        'Caminhadas de arte de rua no Beco do Batman',
        'Estúdios de design em Pinheiros',
        'Espaços culturais e teatros do Centro',
        'Ateliês de moda no distrito de confecções',
        'Casas de música e estúdios de gravação',
      ],
      formats: [
        'Aberturas de galeria e caminhadas de arte',
        'Fins de semana de estúdio aberto',
        'Noites de crítica de design',
        'Círculos de produção musical e DJ',
        'Mostras de moda e cinema',
      ],
      howToStart: [
        'Escolha um ofício — artes visuais, design, moda, música — e um bairro.',
        'Faça parceria com uma galeria, estúdio ou centro cultural que receba um primeiro evento aberto.',
        'Colete trabalhos em andamento antes do segundo evento e torne o feedback o núcleo de cada sessão.',
      ],
    },
    political: {
      venues: [
        'Salas da prefeitura e da câmara municipal',
        'Salas de reunião de bibliotecas públicas',
        'Salas de centros comunitários pela cidade',
        'Escritórios de moradia e de direitos de inquilinos',
        'Espaços de tech cívica em Pinheiros',
        'Espaços de eventos em parques e praças',
      ],
      formats: [
        'Noites de informação sobre moradia e aluguel',
        'Oficinas de direitos de inquilinos',
        'Briefings de voluntários de transporte e ciclovias',
        'Círculos de ação climática e áreas verdes',
        'Oficinas de participação cidadã em linguagem simples',
      ],
      howToStart: [
        'Escolha uma questão concreta e uma geografia pequena — um distrito, uma quadra ou uma política específica.',
        'Participe primeiro de três reuniões existentes e faça parceria com uma organização em vez de duplicar trabalho.',
        'Faça uma oficina amigável para iniciantes sobre como a cidade funciona para construir uma base constante.',
      ],
    },
    meetup: {
      venues: [
        'Gramados e alamedas do Parque Ibirapuera',
        'Fechamentos de fim de semana da Avenida Paulista',
        'Cafés e bares da Vila Madalena',
        'Cantos gastronômicos do Mercado Municipal',
        'Feiras de rua de bairro',
        'Bibliotecas públicas com salas comunitárias',
      ],
      formats: [
        'Corridas e piqueniques de domingo no parque',
        'Encontros em cafés e intercâmbios de idiomas',
        'Caminhadas guiadas pelas feiras',
        'Noites de jogos de tabuleiro e trivia',
        'Caminhadas de arte de rua e arquitetura',
      ],
      howToStart: [
        'Escolha um formato repetível — uma corrida de domingo, uma caminhada mensal pela feira — e um ponto de encontro fixo.',
        'Escolha um local como o Parque Ibirapuera ou um café da Vila Madalena de fácil acesso por metrô.',
        'Faça as três primeiras sessões no mesmo horário e lugar, depois peça aos frequentadores que tragam um recém-chegado cada.',
      ],
    },
    'small-business': {
      venues: [
        'Corredores de lojas de Pinheiros e Vila Madalena',
        'Espaços de feirantes do Mercado Municipal e das feiras',
        'Oficinas do centro de pequenas empresas da cidade',
        'Salas de eventos de associações comerciais',
        'Cafés e padarias locais com cantos comunitários',
        'Espaços de food halls e cozinhas de incubadoras',
      ],
      formats: [
        'Cafés da manhã de lojistas sem pauta',
        'Mesas redondas de feirantes e comerciantes',
        'Clínicas de órgãos municipais sobre licenças e alvarás',
        'Círculos de compras compartilhadas de insumos',
        'Caminhadas de bairro pelos corredores de lojas',
      ],
      howToStart: [
        'Escolha um corredor e um café que já atenda os donos locais; garanta uma mesa fixa.',
        'Faça primeiro um café da manhã sem pauta — os donos vêm para falar de aluguel, licenças e apps de entrega.',
        'Depois de três cafés da manhã, alterne um tema prático por mês e deixe a associação comercial espalhar a notícia.',
      ],
    },
  },
  variantIntros: {
    startup:
      'A cena de startups de São Paulo é a maior da América Latina e um dos mercados emergentes mais dinâmicos do mundo, construída sobre um enorme mercado doméstico e uma onda fintech que remodelou a banca brasileira. Pinheiros e Vila Madalena concentram a maior densidade de coworkings e startups com capital de risco, o corredor da Faria Lima ancora a camada corporativa e financeira, e universidades como USP e FGV alimentam fundadores e talentos ano após ano. O que torna a cena distinta é a escala e o foco no consumidor: startups brasileiras constroem para um mercado de mais de duzentos milhões de pessoas, e fintech, marketplaces e logística são especialmente fortes. A cidade também é um ímã para fundadores internacionais e trabalhadores remotos, então uma camada crescente da cena roda em inglês ou bilíngue. Formatos estabelecidos incluem cafés da manhã de fundadores, noites de demo e painéis do setor, muitos gratuitos e abertos. Conselho honesto para começar uma comunidade de startups em São Paulo: escolha um vertical, ancore-se a um bairro e respeite o trânsito — um evento semanal consistente em um coworking de Pinheiros construirá uma base fiel.',
    creative:
      'As comunidades criativas de São Paulo são tão vastas e ousadas quanto a própria cidade: uma cena de design de classe mundial, uma indústria da moda que veste o país, uma cultura de cinema e música que alimenta todo o Brasil e uma arte de rua que transformou bairros inteiros em galerias a céu aberto. A Vila Madalena é o coração criativo — o Beco do Batman é um marco global da arte de rua — enquanto Pinheiros abriga estúdios de design e galerias, e os centros culturais e teatros do Centro mantêm as artes cênicas da cidade vivas. A cultura de restaurantes e cafés da cidade está entre as melhores do mundo, dando aos criativos lugares naturais para se encontrar, e a USP e as instituições de artes do estado alimentam novos talentos a cada ano. Como São Paulo é uma cidade de trabalho, suas comunidades criativas tendem a ser sérias, profissionais e ambiciosas — as pessoas aparecem para aprender, se conectar e construir carreiras. Começar uma comunidade criativa aqui significa escolher uma disciplina e um bairro e depois usar o enorme público da cidade para construir algo com alcance real.',
    political:
      'As comunidades políticas e cívicas de São Paulo operam na escala de uma megacidade: política municipal, transporte, moradia e meio ambiente dominam a pauta, e cada um dos 32 distritos da cidade tem suas próprias tradições de organização. Moradia é uma questão definidora — uma das cidades mais desiguais das Américas, com movimentos de moradia poderosos e sindicatos de inquilinos organizados pelo centro e pela periferia. Transporte e mobilidade são igualmente centrais: a comunidade ciclística da cidade pressionou por ciclovias, e ativistas de transporte lutam por melhor serviço de metrô e ônibus. Áreas verdes e qualidade do ar movem redes de voluntários que plantam árvores, limpam parques e pressionam por política ambiental. Comunidades de tech cívica constroem ferramentas para dados abertos e participação pública, e redes de ajuda mútua atravessam os bairros. A cultura política recompensa persistência e conhecimento local. Começar uma comunidade cívica em São Paulo geralmente significa escolher uma questão concreta e uma geografia pequena e depois fazer parceria com o denso cenário de organizadores existente.',
    meetup:
      'A cultura de encontros de São Paulo roda em café, parques e uma população genuinamente sociável: corridas de domingo pelo Parque Ibirapuera, encontros em cafés na Vila Madalena, caminhadas pelas feiras de rua de bairro e o lendário fechamento de fim de semana da Avenida Paulista, onde a cidade sai para caminhar, pedalar e se reunir. O metrô torna prático se reunir pela cidade, embora o trânsito molde o calendário — os locais planejam em torno dos horários de pico e do rush da noite. A enorme população internacional da cidade sustenta intercâmbios de idiomas e encontros para recém-chegados, e a cultura gastronômica transforma caminhadas por mercados e tours de degustação em um gênero próprio. Formatos com poder de permanência são simples e repetíveis: uma sessão de domingo no parque, uma caminhada mensal pela feira, uma noite fixa de trivia. Conselho honesto para começar um encontro em São Paulo: escolha um bairro, um local acessível por metrô e um formato que receba recém-chegados — a cidade está cheia de pessoas curiosas e energéticas procurando o grupo que pareça um lar.',
    'small-business':
      'As comunidades de pequenas empresas de São Paulo são o motor das ruas da cidade: a padaria, o boteco, o feirante, a boutique de Pinheiros e o lojista da Rua 25 de Março compartilham todas as questões práticas sobre aluguel, licenças, equipe e o ritmo da cidade. As feiras — os mercados de rua que montam em todo bairro — são comunidades em si, com feirantes coordenando insumos, licenças e clientes regulares. Corredores comerciais como a Rua Oscar Freire, nos Jardins, e as lojas da Vila Madalena reúnem clusters com interesse compartilhado em movimento de pedestres e espaço público. Associações comerciais e centros de pequenas empresas da cidade oferecem oficinas sobre licenciamento, crédito e venda digital, e a famosa energia empreendedora da cidade mantém novos negócios abrindo diariamente. Novos participantes normalmente se conectam participando de uma reunião de corredor, fazendo uma oficina municipal ou entrando em um coletivo de feirantes. Começar uma comunidade de pequenas empresas aqui é realista: uma mesa redonda mensal em um café ou padaria de bairro, com temas rotativos como aluguel, seguro e pagamentos digitais, atrai de forma confiável donos que raramente têm pares com quem conversar.',
  },
  ideaPage: {
    intro:
      'A escala, a energia e a cultura de São Paulo fazem dela um lugar espetacular para testar novas ideias de eventos comunitários. As trinta ideias abaixo estão agrupadas em seis categorias — networking, aprendizado, social e ao ar livre, profissional e de setor, criativo e maker, e impacto e local. Cada ideia inclui para quem é, um pitch curto e um tipo de local sugerido que realmente existe em São Paulo, do Parque Ibirapuera e da Avenida Paulista a cafés da Vila Madalena, mercados públicos e centros culturais. Algumas ideias funcionam como eventos avulsos; outras são desenhadas para se tornar comunidades recorrentes com ritmo semanal. A regra de honestidade é simples: toda sugestão de local é um tipo real de lugar nesta cidade, e todo formato é simples o suficiente para um organizador de primeira viagem conduzir. Escolha a ideia que combina com seus interesses, encontre um local que receba você e deixe a energia da cidade fazer o resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Caminhada de cafés na Vila Madalena',
            pitch:
              'Um passeio de sábado por três cafés da Vila Madalena, onde as pessoas trocam de mesa e contam o que fazem.',
            audience: 'Amantes de café e quem quer fazer networking',
            venueType: 'Cafés da Vila Madalena',
          },
          {
            title: 'AMA de fundador em um coworking de Pinheiros',
            pitch:
              'Um fundador conta sua história honesta por trinta minutos e depois responde perguntas abertas da sala.',
            audience: 'Fundadores em fase inicial e aspirantes a empreendedores',
            venueType: 'Coworking em Pinheiros',
          },
          {
            title: 'Encontro social para recém-chegados internacionais',
            pitch:
              'Uma noite leve em que recém-chegados conhecem moradores antigos com petiscos e perguntas de conversa.',
            audience: 'Recém-chegados à cidade, incluindo expats',
            venueType: 'Centro comunitário ou sala de eventos de café',
          },
          {
            title: 'Círculo de histórias de carreira',
            pitch:
              'Seis pessoas contam sua história de carreira em cinco minutos, seguidas de discussão em grupo e perguntas de conexão.',
            audience: 'Quem procura emprego, quem muda de carreira e mentores',
            venueType: 'Sala de reunião de biblioteca pública',
          },
          {
            title: 'Mixer de fim de semana na Avenida Paulista',
            pitch:
              'Um encontro casual no trecho sem carros da Avenida Paulista, com perguntas de quebra-gelo e quiosques de café.',
            audience: 'Qualquer pessoa expandindo sua rede local',
            venueType: 'Avenida Paulista em um fim de semana fechado',
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
            venueType: 'Café ou centro comunitário em Pinheiros',
          },
          {
            title: 'Finanças de pequenas empresas em português simples',
            pitch:
              'Uma sessão prática sobre fluxo de caixa, impostos e crédito para donos de primeira viagem.',
            audience: 'Novos donos de pequenas empresas',
            venueType: 'Centro de pequenas empresas da cidade',
          },
          {
            title: 'Caminhada gastronômica e histórica pela feira',
            pitch:
              'Uma caminhada guiada de degustação por uma feira de bairro com as histórias por trás dos feirantes.',
            audience: 'Amantes de gastronomia e recém-chegados',
            venueType: 'Uma feira de bairro',
          },
          {
            title: 'Oficina de direitos de inquilinos',
            pitch:
              'Uma sessão em linguagem simples sobre contratos, depósitos e onde conseguir ajuda jurídica gratuita.',
            audience: 'Inquilinos e ativistas de moradia',
            venueType: 'Centro comunitário ou biblioteca',
          },
          {
            title: 'Noite de programação para iniciantes absolutos',
            pitch:
              'Uma noite guiada em que iniciantes constroem seu primeiro pequeno projeto com mentores na sala.',
            audience: 'Pessoas migrando para a área de tecnologia',
            venueType: 'Coworking ou laboratório universitário',
          },
        ],
      },
      {
        name: 'Social e ao ar livre',
        ideas: [
          {
            title: 'Piquenique de domingo no Ibirapuera',
            pitch:
              'Cobertores, música e um piquenique colaborativo no grande parque da cidade, com uma caminhada ao redor do lago.',
            audience: 'Amigos, famílias e recém-chegados',
            venueType: 'Gramados do Parque Ibirapuera',
          },
          {
            title: 'Clube de corrida de domingo no parque',
            pitch:
              'Uma corrida amigável em grupo de cinco ou dez quilômetros, aberta a todos os ritmos, terminando com café.',
            audience: 'Corredores de todos os níveis',
            venueType: 'Alamedas de corrida do Parque Ibirapuera',
          },
          {
            title: 'Caminhada de arte de rua no Beco do Batman',
            pitch:
              'Uma caminhada guiada pelo famoso beco dos murais, com as histórias por trás dos artistas.',
            audience: 'Quem gosta de caminhadas de arte e fotografia',
            venueType: 'Ruas da Vila Madalena',
          },
          {
            title: 'Noite de jogos de tabuleiro em um bar da Vila Madalena',
            pitch:
              'Uma pilha mensal de jogos de tabuleiro em um bar de bairro que recebe noites tranquilas.',
            audience: 'Jogadores casuais e vizinhos',
            venueType: 'Bar ou café da Vila Madalena',
          },
          {
            title: 'Tour de degustação no Mercado Municipal',
            pitch:
              'Uma caminhada guiada de degustação pelo mercado histórico, provando sanduíches de mortadela e muito mais.',
            audience: 'Amantes de gastronomia e visitantes de primeira viagem',
            venueType: 'Mercado Municipal',
          },
        ],
      },
      {
        name: 'Profissional e de setor',
        ideas: [
          {
            title: 'Mesa redonda de fintech e pagamentos',
            pitch:
              'Uma discussão mensal para fundadores e operadores que trabalham com pagamentos, crédito e inclusão financeira.',
            audience: 'Fundadores e profissionais de fintech',
            venueType: 'Escritório da Faria Lima ou sala de eventos de coworking',
          },
          {
            title: 'Noite de crítica de design',
            pitch:
              'Designers de produto e marca apresentam trabalhos reais em andamento e recebem feedback estruturado.',
            audience: 'Designers de produto, marca e UX',
            venueType: 'Estúdio de design em Pinheiros',
          },
          {
            title: 'Encontro de marketplaces e logística',
            pitch:
              'Uma noite informal para operadores que constroem negócios de marketplace e entrega.',
            audience: 'Profissionais de marketplace e logística',
            venueType: 'Escritório de startup ou espaço de eventos',
          },
          {
            title: 'Mixer de indústrias criativas',
            pitch:
              'Uma noite informal em que designers, cineastas e profissionais de mídia trocam notas e contatos.',
            audience: 'Profissionais de indústrias criativas',
            venueType: 'Centro cultural ou estúdio de design',
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
            title: 'Dia de estúdio aberto na Vila Madalena',
            pitch:
              'Artistas abrem seus estúdios por uma tarde de visitas, demonstrações e obras à venda.',
            audience: 'Amantes de arte e vizinhos curiosos',
            venueType: 'Estúdios de artistas da Vila Madalena',
          },
          {
            title: 'Open mic para músicos e poetas',
            pitch: 'Um open mic acolhedor com uma atração curta e um público que apoia.',
            audience: 'Músicos, poetas e iniciantes',
            venueType: 'Casa de música da Vila Madalena',
          },
          {
            title: 'Caminhada de fotografia de rua',
            pitch:
              'Uma caminhada guiada pelas ruas mais fotogênicas da cidade, com desafios e um compartilhamento em grupo no final.',
            audience: 'Fotógrafos de todos os níveis',
            venueType: 'Ruas do Centro ou da Vila Madalena',
          },
          {
            title: 'Círculo de samba e percussão',
            pitch:
              'Uma noite amigável de ritmo em que iniciantes aprendem percussão básica de samba ao lado de músicos experientes.',
            audience: 'Músicos e iniciantes curiosos por ritmo',
            venueType: 'Centro comunitário ou estúdio de música',
          },
          {
            title: 'Noite de zine e risografia',
            pitch:
              'Papel, tesoura e uma impressora risográfica: todo mundo sai com um zine pequeno para trocar.',
            audience: 'Escritores, artistas e entusiastas de impressão',
            venueType: 'Gráfica ou espaço de artes em Pinheiros',
          },
        ],
      },
      {
        name: 'Impacto e local',
        ideas: [
          {
            title: 'Manhã de limpeza no parque',
            pitch:
              'Uma limpeza de sábado de manhã em um parque de bairro, com luvas e café fornecidos.',
            audience: 'Voluntários e amantes de parques',
            venueType: 'Um parque de bairro escolhido',
          },
          {
            title: 'Dia de trabalho na horta comunitária',
            pitch:
              'Algumas horas de plantio e capina em uma horta comunitária, seguidas de um lanche compartilhado e um tour pela horta.',
            audience: 'Jardineiros, voluntários e famílias',
            venueType: 'Horta comunitária de bairro',
          },
          {
            title: 'Sessão de informação sobre direitos de inquilinos',
            pitch:
              'Uma sessão em linguagem simples sobre contratos, depósitos e onde conseguir ajuda jurídica gratuita.',
            audience: 'Inquilinos e organizadores de moradia',
            venueType: 'Centro comunitário ou biblioteca',
          },
          {
            title: 'Círculo de plantio de árvores e áreas verdes',
            pitch:
              'Um grupo pequeno que planeja e planta árvores em parques locais enquanto aprende sobre as metas climáticas da cidade.',
            audience: 'Moradores preocupados com o meio ambiente',
            venueType: 'Quiosque de parque ou centro comunitário',
          },
          {
            title: 'Noite de histórias de negócios locais',
            pitch:
              'Donos de lojas e feirantes contam as histórias por trás dos seus negócios em palestras de cinco minutos.',
            audience: 'Vizinhos e donos de pequenas empresas',
            venueType: 'Uma loja, café ou salão de feira local',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Como escolho uma dessas ideias?',
        answer:
          'Combine a categoria com seus interesses e o público que você consegue alcançar. Em São Paulo, uma âncora de bairro, um local acessível por metrô e um formato que receba recém-chegados tendem a construir comunidade mais rápido.',
      },
      {
        question: 'Preciso falar português para organizar?',
        answer:
          'Não. Muitos eventos de São Paulo acontecem em inglês ou bilíngues, especialmente em Pinheiros e na Vila Madalena. Anunciar nos dois idiomas geralmente dobra seu alcance.',
      },
      {
        question: 'Esses eventos podem se tornar comunidades reais?',
        answer:
          'Sim — formatos recorrentes são como a maioria das comunidades de São Paulo começa. Os guias práticos percorrem os passos de um primeiro evento a uma comunidade estável com organizadores e rituais.',
      },
    ],
  },
  faq: [
    {
      question: 'Como encontro uma comunidade em São Paulo?',
      answer:
        'Comece pelas páginas de tipo de grupo: comunidades de startups, criativas, políticas, de encontros e de pequenas empresas. Cada uma descreve os bairros, locais e formatos reais onde os paulistanos se reúnem. A JoinOrigin está no ar — crie seu perfil e encontre ou comece sua comunidade hoje.',
    },
    {
      question: 'É realista começar uma comunidade em São Paulo?',
      answer:
        'Sim. A cidade tem locais públicos gratuitos, uma população vasta e energética e uma cultura rica de encontro. Os guias cobrem como começar uma comunidade, organizar um encontro e conseguir seus primeiros dez membros.',
    },
    {
      question: 'As sugestões de locais nesta página são reais?',
      answer:
        'Sim. Todo tipo de local mencionado — Parque Ibirapuera, Avenida Paulista, cafés da Vila Madalena, Mercado Municipal, feiras — existe em São Paulo. Nunca inventamos números de membros, avaliações ou escritórios locais.',
    },
    {
      question: 'A JoinOrigin tem um escritório em São Paulo?',
      answer:
        'Não. A JoinOrigin não tem escritórios nem equipe locais. Todas as descrições de comunidade refletem o cenário real da cidade, e a plataforma ajuda os paulistanos a encontrar ou começar comunidades.',
    },
  ],
};

export default content;
