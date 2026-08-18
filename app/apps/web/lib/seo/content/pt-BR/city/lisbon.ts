import type { CityContent } from '../../types';

/**
 * Conteúdo de Lisboa (tradução pt-BR) — página da cidade + 5 variações +
 * página de ideias. Distinto de todos os outros arquivos de cidade (G5: sem
 * reuso de template). Prosa honesta e sempre-verde; sem números ou contagens
 * de membros inventados.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'pt-BR',
  slug: 'lisbon',
  title: 'Comunidades em Lisboa | JoinOrigin',
  description:
    'Encontre ou comece comunidades em Lisboa — grupos de startups, criativos, políticos, encontros e pequenas empresas pela capital portuguesa. Lista de espera da JoinOrigin.',
  pageTitles: {
    city: 'Comunidades em Lisboa | JoinOrigin',
    cityDescription:
      'Encontre ou comece comunidades em Lisboa — grupos de startups, criativos, políticos, encontros e pequenas empresas pela capital portuguesa. Lista de espera da JoinOrigin.',
    variants: {
      startup: 'Comunidades de startups em Lisboa | JoinOrigin',
      creative: 'Comunidades criativas em Lisboa | JoinOrigin',
      political: 'Comunidades políticas e cívicas em Lisboa | JoinOrigin',
      meetup: 'Encontros e comunidades sociais em Lisboa | JoinOrigin',
      'small-business': 'Comunidades de pequenas empresas em Lisboa | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Encontre ou comece comunidades de startups em Lisboa — fundadores, engenheiros e operadores no Príncipe Real, na LX Factory e na cena tech. Lista de espera da JoinOrigin.',
      creative:
        'Encontre ou comece comunidades criativas em Lisboa — estúdios, galerias e coletivos pela Marvila, LX Factory e a cidade velha. Lista de espera da JoinOrigin.',
      political:
        'Encontre ou comece comunidades políticas e cívicas em Lisboa — juntas de freguesia, ativismo de moradia e campanhas locais. Lista de espera da JoinOrigin.',
      meetup:
        'Encontre ou comece comunidades de encontros em Lisboa — piqueniques em miradouros, noites em tascas e dias de praia. Lista de espera da JoinOrigin.',
      'small-business':
        'Encontre ou comece comunidades de pequenas empresas em Lisboa — comerciantes de mercado, donos de pastelarias e lojas de bairro. Lista de espera da JoinOrigin.',
    },
    ideas: '30 ideias de eventos comunitários em Lisboa | JoinOrigin',
    ideasDescription:
      'Descubra 30 ideias de eventos comunitários em Lisboa — eventos de networking, aprendizado, ao ar livre, profissionais, criativos e de impacto. Lista de espera da JoinOrigin.',
  },
  intro: [
    'Lisboa é uma cidade de miradouros. Os terraços que olham por cima dos telhados vermelhos, o rio Tejo e as pontes são onde a cidade se reúne para ver o pôr do sol, partilhar um lanche e conversar. Abaixo deles, as colinas de Alfama, Bairro Alto e Graça guardam uma cultura de tasca — pequenos bares e cozinhas de família — que mantém a vida comunitária íntima e calorosa.',
    'A cidade mudou depressa: empresas de tecnologia, startups internacionais e uma onda de recém-chegados remodelaram bairros como o Príncipe Real e o distrito criativo da LX Factory, enquanto ritmos mais antigos — o fado em Alfama, o elétrico que sobe as colinas com seu barulho, os mercados cobertos — ainda ancoram a vida cotidiana. Universidades como a Universidade de Lisboa, a NOVA e o ISCTE alimentam um fluxo constante de estudantes, e a costa atlântica, com praias em Carcavelos e a floresta de Monsanto, dá aos moradores espaço de encontro ao ar livre gratuito.',
    'As comunidades de Lisboa são famosamente acolhedoras — o hábito português de conversar com estranhos em filas e nos balcões das tascas torna fácil encontrar as suas pessoas. Recém-chegados que escolhem um miradouro, um mercado ou um bar de bairro e aparecem com regularidade vão se sentir em casa rapidamente.',
  ],
  dataPoints: [
    'Cerca de 520 mil moradores na cidade; a capital de Portugal.',
    'Universidades incluem a Universidade de Lisboa, a NOVA e o ISCTE.',
    'Âncoras públicas: os miradouros, a orla do Tejo e o parque florestal de Monsanto.',
    'Polos criativos e de tecnologia na LX Factory e na Marvila.',
    'Fado, azulejo e cultura de tasca definem o ritmo social da cidade velha.',
    'Praias ao alcance — Carcavelos e a Costa da Caparica do outro lado do rio.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworkings no Príncipe Real',
        'Salões de eventos e estúdios da LX Factory',
        'Andares de polos tech perto da orla',
        'Salas de empreendedorismo da NOVA e do ISCTE',
        'Cafés de startups no Cais do Sodré',
        'Terraços de cobertura para mixers à noite',
      ],
      formats: [
        'Caminhadas e conversas de fundadores na orla',
        'Noites de pitch e demo days na LX Factory',
        'Mesas de fundadores de turismo e SaaS B2B',
        'Encontros comunitários da Web Summit entre eventos',
        'Mixers internacionais de fundadores com pastéis',
      ],
      howToStart: [
        'Escolha um vertical estreito — SaaS B2B, tech de turismo ou fintech — e um nome amigável em inglês.',
        'Reserve um horário semanal em um coworking da LX Factory ou do Príncipe Real que receba você.',
        'Faça três encontros abertos, depois peça a dois frequentadores para coorganizar e defina um ritmo mensal.',
      ],
    },
    creative: {
      venues: [
        'Estúdios de artistas da Marvila em antigas fábricas',
        'Galerias e escritórios criativos da LX Factory',
        'Estúdios de design no Príncipe Real',
        'Casas de fado e escolas de música em Alfama',
        'Oficinas de azulejo',
        'Cinemas independentes e livrarias',
      ],
      formats: [
        'Fins de semana de estúdio aberto na Marvila',
        'Visitas guiadas a galerias com conversas de artistas',
        'Noites de crítica de design e ilustração',
        'Noites abertas de música e fado',
        'Caminhadas de arte de rua pela LX Factory',
      ],
      howToStart: [
        'Ancore o grupo em um ofício e um distrito — Marvila para estúdios, Alfama para música.',
        'Faça parceria com um estúdio, galeria ou casa de fado para receber a primeira noite de crítica.',
        'Torne o feedback o ritual: toda sessão termina com três comentários falados por obra, depois uma parada na tasca.',
      ],
    },
    political: {
      venues: [
        'Salas de reunião das juntas de freguesia',
        'Salões de associações de bairro',
        'Espaços de ativismo de moradia no centro',
        'Centros comunitários pela cidade',
        'Bibliotecas públicas com salas de reunião',
        'Salões de mercado usados para assembleias',
      ],
      formats: [
        'Sessões abertas das juntas de freguesia',
        'Noites de informação sobre moradia e direitos de arrendamento',
        'Reuniões de assembleia de bairro',
        'Briefings de voluntários e sessões de primeiro turno',
        'Sessões de planejamento de iniciativas cidadãs',
      ],
      howToStart: [
        'Escolha uma questão concreta e uma geografia pequena — uma rua, uma freguesia ou uma política de moradia.',
        'Entre na associação de bairro que cobre sua área e ofereça-se para coorganizar uma reunião.',
        'Use a agenda pública da freguesia para ancorar seu segundo evento em torno de uma decisão local viva.',
      ],
    },
    meetup: {
      venues: [
        'Miradouros — Graça, Senhora do Monte, Santa Catarina',
        'Tascas e pequenos bares em Alfama e no Bairro Alto',
        'Passeios na orla do Tejo',
        'Parque Eduardo VII e floresta de Monsanto',
        'Praias de Carcavelos e da Costa da Caparica',
        'Hortas comunitárias e cafés de pátio',
      ],
      formats: [
        'Encontro semanal no miradouro ao pôr do sol',
        'Percursos de tasca pela cidade velha',
        'Aventuras de elétrico 28',
        'Dias de praia e manhãs de escola de surf',
        'Mesas de intercâmbio de idiomas (português–inglês)',
      ],
      howToStart: [
        'Escolha um formato repetível — um pôr do sol semanal no miradouro, um dia mensal de praia — e um ponto fixo.',
        'Escolha um miradouro, tasca ou ponto de praia que receba você toda vez.',
        'Faça as três primeiras sessões no mesmo horário e lugar, depois peça aos frequentadores que tragam um recém-chegado cada.',
      ],
    },
    'small-business': {
      venues: [
        'Mercados cobertos — Mercado da Ribeira, mercados municipais',
        'Mesas de donos de pastelarias',
        'Redes de donos de tascas e restaurantes',
        'Salas de seminário da câmara de comércio',
        'Corredores de lojas na cidade velha',
        'Feiras de artesanato e vintage na LX Factory',
      ],
      formats: [
        'Café de donos antes da abertura do mercado',
        'Mesa da manhã de donos de pastelarias e padarias',
        'Oficinas da câmara sobre licenças e digitalização',
        'Círculos de compras compartilhadas de insumos',
        'Sessões de planejamento da temporada de turismo',
      ],
      howToStart: [
        'Ancore o grupo a um mercado ou rua comercial — os comerciantes do Mercado da Ribeira são um ímã comprovado.',
        'Convide um feirante veterano ou um delegado da câmara para coorganizar o primeiro café da manhã.',
        'Colete as dores recorrentes dos donos — licenças, aluguel, equipe sazonal — e transforme a reunião de cada mês em uma sessão prática de resolução.',
      ],
    },
  },
  variantIntros: {
    startup:
      'A cena de startups de Lisboa virou uma das mais comentadas da Europa, impulsionada pelo apelo global da Web Summit, uma onda de fundadores internacionais e uma comunidade local em torno do Príncipe Real, do Cais do Sodré e do bairro criativo da LX Factory. Os pontos fortes da cidade incluem SaaS B2B, marketplaces, tech de turismo e fintech, com uma cena crescente de tech climática em torno do Atlântico. Coworkings e cafés de startups recebem cafés da manhã de fundadores, noites de pitch e demo days, enquanto a NOVA e o ISCTE alimentam recém-formados nas equipes iniciais. O inglês é o padrão na maioria dos grupos internacionais, e a qualidade de vida da cidade — luz, comida e praia — a torna um ímã para trabalhadores remotos e fundadores em série. A comunidade é pequena o suficiente para que reputações viajem rápido e calorosa o suficiente para que apresentações aconteçam facilmente. O ritmo português molda os eventos: relaxado, social e felizmente atrasado. Começar uma comunidade de startups em Lisboa funciona melhor com um vertical estreito e um ritmo regular — uma mesa mensal de SaaS B2B ou uma noite de builders de IA constrói uma base fiel mais rápido do que um grupo generalista.',
    creative:
      'As comunidades criativas de Lisboa estão em expansão: as ruas de azulejos da cidade velha, as casas de fado de Alfama e os espaços de fábricas convertidas da LX Factory e da Marvila dão a artistas, designers e músicos um palco distinto. A Marvila virou a nova fronteira criativa, com estúdios em antigos armazéns, enquanto a LX Factory recebe galerias, escritórios de design e muros de arte de rua sob um mesmo teto industrial. As tradições de ofício da cidade — pintura de azulejo, cerâmica e construção de violas — conectam oficinas antigas com novos fazedores. Formatos incluem fins de semana de estúdio aberto, visitas guiadas a galerias, críticas de design e caminhadas de arte de rua, com pores do sol em miradouros e jantares em tascas como ritual de encerramento natural. Cinemas independentes e livrarias adicionam uma veia literária, e os festivais da cidade — das festas de rua de Santo António ao circuito de verão de música — dão aos criativos um calendário constante. Artistas internacionais e criativos remotos se misturam livremente com fazedores locais, dando à cena um caráter incomumente aberto. Começar uma comunidade criativa em Lisboa é realista: escolha um ofício, um distrito e uma noite regular, e a densidade de pessoas curiosas e habilidosas encontrará você.',
    political:
      'A vida cívica de Lisboa passa pelas freguesias — os pequenos conselhos de paróquia que dão a cada bairro uma voz real no planejamento local. Moradia é a questão definidora: a popularidade da cidade entre turistas e trabalhadores remotos pressionou os aluguéis para cima, produzindo movimentos ativos de inquilinos e campanhas por moradia acessível entre as mais visíveis da Europa. Associações de bairro e plataformas cívicas se organizam em torno de espaço público, patrimônio e do ritmo do desenvolvimento, enquanto centros comunitários recebem reuniões, aulas e grupos de voluntários. A transformação da orla da cidade — de rodovias a passeios — mostra o que moradores organizados podem conquistar, e novos debates sobre turismo, alojamento local e áreas verdes continuam essa tradição. A cultura política é consultiva e paciente: os lisboetas esperam ser ouvidos, e grupos bem organizados obtêm resultados. Começar uma comunidade política significa escolher uma questão concreta e uma geografia pequena e depois fazer parceria com associações existentes — o cenário é rico o suficiente para que colaboração vença competição.',
    meetup:
      'A cena de encontros de Lisboa é construída no miradouro, na tasca e na praia. Os miradouros — Graça, Senhora do Monte, Santa Catarina — enchem todas as noites com casais, famílias e grupos de amigos vendo o sol cair atrás do rio, e um encontro semanal ao pôr do sol é a comunidade mais fácil de começar na cidade. As tascas e pequenos bares da cidade velha recebem noites de fado, jogos de cartas e jantares longos, enquanto os passeios na orla do Tejo são feitos para grupos de caminhada. As praias de Carcavelos e do outro lado do rio reúnem surfistas, nadadores e piqueniqueiros em fins de semana quentes. Formatos incluem piqueniques em miradouros, percursos de tasca, aventuras de elétrico 28, intercâmbios de idiomas (português–inglês) e aulas ao ar livre no Parque Eduardo VII. A cidade é compacta e caminhável, e o amor português pela conversa significa que estranhos viram frequentadores rapidamente. Começar um encontro em Lisboa significa escolher um formato repetível e um ponto fixo — um pôr do sol semanal ou um dia mensal de praia — e o calor da cidade faz o resto.',
    'small-business':
      'As comunidades de pequenas empresas de Lisboa são ancoradas pelos mercados, pastelarias e tascas familiares da cidade. O Mercado da Ribeira — agora o famoso Time Out Market — e os mercados municipais pela cidade recebem comunidades de feirantes que compartilham fornecedores, horários e fofocas. A pastelaria, o café-padaria onde os lisboetas começam cada dia com café e um pastel de nata, é ao mesmo tempo um negócio e um polo social, e os donos formam redes estreitas de confiança. Lojas de família na cidade velha e o comércio criativo mais novo da LX Factory compartilham as mesmas questões práticas sobre aluguel, licenças e equipe sazonal. A câmara de comércio oferece oficinas sobre digitalização e exportação, enquanto os festivais da cidade dão aos comerciantes um calendário compartilhado. O que une esses grupos é lugar e rotina: um mercado coberto ou uma rua de pastelarias é uma comunidade natural com participação coletiva na manhã do bairro. Começar uma comunidade de pequenas empresas é muito viável: um café da manhã mensal de comerciantes em um mercado coberto, com temas rotativos como aluguel, licenças e turismo, atrai de forma confiável donos que raramente têm pares com quem conversar.',
  },
  ideaPage: {
    intro:
      'Lisboa é uma cidade ideal para testar novas ideias de eventos comunitários: os miradouros são locais gratuitos com os melhores pores do sol da Europa, as praias são próximas e a cultura conversacional da cidade transforma estranhos em frequentadores rapidamente. As trinta ideias abaixo estão agrupadas em seis categorias — networking, aprendizado, social e ao ar livre, profissional e de setor, criativo e maker, e impacto e local. Cada uma inclui para quem é, um pitch curto e um tipo de local sugerido que realmente existe em Lisboa, de miradouros e tascas a mercados cobertos e estúdios da LX Factory. Algumas ideias funcionam como eventos avulsos; outras são desenhadas para se tornar comunidades recorrentes com ritmo semanal. A regra de honestidade é simples: toda sugestão de local é um tipo real de lugar nesta cidade, e todo formato é simples o suficiente para um organizador de primeira viagem conduzir. Escolha a ideia que combina com seus interesses, encontre um local que receba você e deixe a luz de Lisboa fazer o resto.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Encontro no miradouro para recém-chegados',
            pitch:
              'Um encontro semanal ao pôr do sol no mesmo miradouro, onde recém-chegados e moradores antigos trocam dicas da cidade com um lanche.',
            audience: 'Recém-chegados e quem gosta de conversas casuais',
            venueType: 'Um miradouro como o da Graça ou de Santa Catarina',
          },
          {
            title: 'Café da manhã de fundadores no Príncipe Real',
            pitch:
              'Um café da manhã cedo em que fundadores compartilham as vitórias e os bloqueios da semana com espresso e pastéis.',
            audience: 'Fundadores e operadores de todos os estágios',
            venueType: 'Um café no Príncipe Real',
          },
          {
            title: 'Meet-and-greet na LX Factory',
            pitch:
              'Uma noite leve no bairro criativo, com cartas quebra-gelo e a regra de conhecer três pessoas novas.',
            audience: 'Criativos, profissionais de tech e recém-chegados',
            venueType: 'Um café ou espaço de eventos na LX Factory',
          },
          {
            title: 'Círculo de expats em Lisboa',
            pitch:
              'Moradores internacionais compartilham dicas de adaptação — burocracia, moradia e onde encontrar as suas pessoas.',
            audience: 'Expats no primeiro ano',
            venueType: 'Um centro cultural ou sala de coworking',
          },
          {
            title: 'Clube de café de freelancers',
            pitch:
              'Um café semanal de manhã em que freelancers de vários setores compartilham leads, preços e histórias de clientes.',
            audience: 'Freelancers de todas as áreas',
            venueType: 'Um café no Cais do Sodré',
          },
        ],
      },
      {
        name: 'Aprendizado e oficinas',
        ideas: [
          {
            title: 'Mesa de português para recém-chegados',
            pitch:
              'Mesas por nível com falantes nativos, mais a regra de que cada erro rende uma risada à mesa.',
            audience: 'Expats e recém-chegados aprendendo português',
            venueType: 'Um café ou centro comunitário em Alfama',
          },
          {
            title: 'Clínica de NIF e impostos',
            pitch:
              'Uma sessão prática sobre o número de contribuinte, o registro e o básico que todo recém-chegado enfrenta.',
            audience: 'Novos moradores e freelancers',
            venueType: 'Uma sala de eventos de coworking ou associação',
          },
          {
            title: 'Aula de pastel de nata',
            pitch:
              'Uma chef pasteleira ensina a torta de creme que move a cidade, da massa folhada ao topo de caramelo perfeito.',
            audience: 'Confeiteiros e recém-chegados de paladar doce',
            venueType: 'Uma cozinha de padaria ou pastelaria',
          },
          {
            title: 'Noite de história do fado e da viola',
            pitch:
              'Uma introdução amigável ao fado — suas histórias, suas vozes e a viola que as acompanha.',
            audience: 'Amantes de música e iniciantes',
            venueType: 'Uma casa de fado ou sala de escola de música',
          },
          {
            title: 'Oficina de pintura de azulejo',
            pitch:
              'Pinte seu próprio azulejo com um artista local e aprenda o ofício que cobre as paredes da cidade.',
            audience: 'Amantes de artesanato e quem procura lembranças',
            venueType: 'Uma oficina de azulejo ou estúdio de cerâmica',
          },
        ],
      },
      {
        name: 'Social e ao ar livre',
        ideas: [
          {
            title: 'Piquenique ao pôr do sol na Senhora do Monte',
            pitch:
              'Cobertores, lanches e a melhor vista da cidade, com um tema rotativo de piquenique colaborativo.',
            audience: 'Famílias, casais e grupos de amigos',
            venueType: 'O Miradouro da Senhora do Monte',
          },
          {
            title: 'Aventura do elétrico 28',
            pitch:
              'Pegue o famoso elétrico amarelo pela cidade velha, descendo para café e miradouros no caminho.',
            audience: 'Exploradores e recém-chegados',
            venueType: 'O percurso do elétrico 28',
          },
          {
            title: 'Percurso de tasca por Alfama',
            pitch:
              'Uma noite guiada por cinco pequenos bares, com um prato compartilhado e uma história em cada um.',
            audience: 'Amantes de gastronomia e recém-chegados',
            venueType: 'As tascas de Alfama',
          },
          {
            title: 'Manhã de escola de surf em Carcavelos',
            pitch:
              'Uma sessão amigável de surf para iniciantes com instrutores, pranchas e um piquenique na praia depois.',
            audience: 'Iniciantes e amantes do oceano',
            venueType: 'Uma escola de surf na praia de Carcavelos',
          },
          {
            title: 'Caminhada na floresta de Monsanto',
            pitch:
              'Uma caminhada guiada pelo grande parque florestal da cidade, dos miradouros às capelas escondidas.',
            audience: 'Caminhantes e amantes da natureza',
            venueType: 'Parque florestal de Monsanto',
          },
        ],
      },
      {
        name: 'Profissional e de setor',
        ideas: [
          {
            title: 'Mesa de fundadores de tech',
            pitch:
              'Uma mesa redonda mensal para fundadores de tech compartilharem progresso, lições de captação e parcerias.',
            audience: 'Fundadores e operadores de tech',
            venueType: 'Uma sala de reunião de coworking na LX Factory',
          },
          {
            title: 'Círculo de tech de turismo',
            pitch:
              'Profissionais que moldam a tech de turismo e hotelaria compartilham tendências e fazem apresentações.',
            audience: 'Profissionais de turismo e hotelaria',
            venueType: 'Uma sala de eventos de hotel ou escritório do setor',
          },
          {
            title: 'Círculo de pares de product managers',
            pitch:
              'Um círculo confidencial em que PMs discutem um desafio mensal — roadmaps, contratação, política interna.',
            audience: 'Product managers de tech',
            venueType: 'Uma sala de reunião de coworking no Cais do Sodré',
          },
          {
            title: 'Noite de crítica de design',
            pitch:
              'Designers apresentam trabalhos reais em andamento e recebem feedback estruturado e construtivo.',
            audience: 'Designers de produto, gráfico e UX',
            venueType: 'Um estúdio de design no Príncipe Real',
          },
          {
            title: 'Círculo de contratação para equipes iniciais',
            pitch:
              'Fundadores compartilham como contratam, retêm e demitem — as verdades desconfortáveis de construir equipes cedo.',
            audience: 'Fundadores em fase inicial e líderes de equipe',
            venueType: 'Um escritório de startup ou incubadora',
          },
        ],
      },
      {
        name: 'Criativo e maker',
        ideas: [
          {
            title: 'Dia de estúdio aberto na Marvila',
            pitch:
              'Um distrito de estúdios de fábrica abre as portas por uma tarde de visitas, demonstrações e obras à venda.',
            audience: 'Amantes de arte e vizinhos curiosos',
            venueType: 'Os estúdios de artistas da Marvila',
          },
          {
            title: 'Caminhada de arte de rua na LX Factory',
            pitch:
              'Uma caminhada guiada pelos murais e instalações do bairro com as histórias por trás dos artistas.',
            audience: 'Quem gosta de caminhadas de arte e fotografia',
            venueType: 'As ruas da LX Factory',
          },
          {
            title: 'Círculo de cerâmica',
            pitch:
              'Uma sessão semanal em que oleiros compartilham rodas, fornos e feedback sobre suas peças.',
            audience: 'Oleiros e iniciantes curiosos',
            venueType: 'Um estúdio de cerâmica ou oficina comunitária',
          },
          {
            title: 'Círculo de produção musical',
            pitch:
              'Produtores compartilham faixas inacabadas para feedback e trocam dicas de equipamento e software.',
            audience: 'Beatmakers e produtores caseiros',
            venueType: 'Um estúdio de gravação ou ensaio',
          },
          {
            title: 'Noite de zine e risografia',
            pitch:
              'Uma noite prática de criação de zines com impressão risográfica e troca no final.',
            audience: 'Escritores, ilustradores e entusiastas de impressão',
            venueType: 'Um estúdio de impressão ou espaço de artes',
          },
        ],
      },
      {
        name: 'Impacto e local',
        ideas: [
          {
            title: 'Noite de informação sobre direitos de inquilinos',
            pitch:
              'Uma sessão em linguagem simples sobre regras de arrendamento, contratos e onde conseguir aconselhamento gratuito de moradia.',
            audience: 'Inquilinos e organizadores de arrendamento',
            venueType: 'Uma associação de inquilinos ou centro comunitário',
          },
          {
            title: 'Caminhada de bairro em Alfama',
            pitch:
              'Moradores antigos conduzem uma caminhada pelas suas ruas, compartilhando histórias antes das multidões chegarem.',
            audience: 'Vizinhos e recém-chegados curiosos',
            venueType: 'As ruas de Alfama',
          },
          {
            title: 'Manhã de limpeza na praia',
            pitch:
              'Uma limpeza de sábado de manhã em um trecho de costa, com luvas, sacos e café fornecidos.',
            audience: 'Amantes de praia e voluntários',
            venueType: 'Praia de Carcavelos',
          },
          {
            title: 'Dia de trabalho na horta comunitária',
            pitch:
              'Vizinhos passam uma manhã plantando, regando e planejando a temporada em uma horta urbana.',
            audience: 'Jardineiros e aspirantes a jardineiros',
            venueType: 'Uma horta comunitária',
          },
          {
            title: 'Histórias de feirantes do mercado',
            pitch:
              'Comerciantes veteranos contam histórias de cinco minutos por trás de suas bancas, seguidas de perguntas abertas.',
            audience: 'Vizinhos e amantes de gastronomia',
            venueType: 'Um mercado coberto como o Mercado da Ribeira',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Como escolho uma dessas ideias?',
        answer:
          'Combine a categoria com seus interesses e o público que você consegue alcançar. Em Lisboa, formatos recorrentes com local fixo — um pôr do sol semanal no miradouro, um dia mensal de praia — constroem comunidade mais rápido.',
      },
      {
        question: 'Preciso falar português para organizar?',
        answer:
          'Não. Muitos grupos de Lisboa acontecem em inglês ou são bilíngues, especialmente nas cenas de tech e criativa. Um pouco de português abre portas com vizinhos e comerciantes de mercado.',
      },
      {
        question: 'Esses eventos podem se tornar comunidades reais?',
        answer:
          'Sim — formatos recorrentes são como a maioria das comunidades de Lisboa começa, e a cultura conversacional da cidade dá a você um padrão comprovado. Os guias práticos percorrem do primeiro evento a uma comunidade estável.',
      },
    ],
  },
  faq: [
    {
      question: 'Como encontro uma comunidade em Lisboa?',
      answer:
        'Use as páginas de tipo de grupo para comunidades de startups, criativas, políticas, de encontros e de pequenas empresas. Cada uma descreve os bairros, locais e formatos reais onde os lisboetas se reúnem. A JoinOrigin está no ar — crie seu perfil e encontre ou comece sua comunidade hoje.',
    },
    {
      question: 'É realista começar uma comunidade em Lisboa?',
      answer:
        'Sim. Lisboa tem miradouros, praias e tascas como locais gratuitos, além de uma cultura famosamente acolhedora. Os guias cobrem como começar uma comunidade, organizar um encontro e conseguir seus primeiros dez membros.',
    },
    {
      question: 'As sugestões de locais nesta página são reais?',
      answer:
        'Sim. Todo tipo de local mencionado — miradouros, tascas, mercados cobertos, LX Factory, praias — existe em Lisboa. Nunca inventamos números de membros, avaliações ou escritórios locais.',
    },
    {
      question: 'A JoinOrigin tem um escritório em Lisboa?',
      answer:
        'Não. A JoinOrigin não tem escritórios nem equipe locais. Todas as descrições de comunidade refletem o cenário real da cidade, e a plataforma ajuda os lisboetas a encontrar ou começar comunidades.',
    },
  ],
};

export default content;
