import type { CityContent } from '../../types';

/**
 * Contenuto di Milano (traduzione italiana) — pagina città + 5 varianti +
 * pagina idee. Traduzione del file EN di riferimento; prosa onesta e sempre
 * attuale; nessun numero o conteggio di membri inventato.
 * `pageTitles` porta i titoli/descrizioni SEO in italiano così il registro
 * e la sitemap restano deterministici per la superficie it.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'it',
  slug: 'milan',
  title: 'Origins a Milano | JoinOrigin',
  description:
    "Trova o avvia Origins a Milano — gruppi di startup, creativi, politici, meetup e piccole imprese nella capitale lombarda. Lista d'attesa di JoinOrigin.",
  pageTitles: {
    city: 'Origins a Milano | JoinOrigin',
    cityDescription:
      "Trova o avvia Origins a Milano — gruppi di startup, creativi, politici, meetup e piccole imprese nella capitale lombarda. Lista d'attesa di JoinOrigin.",
    variants: {
      startup: 'Origins di startup a Milano | JoinOrigin',
      creative: 'Origins creativi a Milano | JoinOrigin',
      political: 'Origins politici e civici a Milano | JoinOrigin',
      meetup: 'Meetup e Origins sociali a Milano | JoinOrigin',
      'small-business': 'Origins di piccole imprese a Milano | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        "Trova o avvia Origins di startup a Milano — fondatori, ingegneri e operatori attorno a Porta Nuova, Isola e la scena fintech. Lista d'attesa di JoinOrigin.",
      creative:
        "Trova o avvia Origins creativi a Milano — studi di design, atelier di moda e gallerie tra Brera, Navigli e Lambrate. Lista d'attesa di JoinOrigin.",
      political:
        "Trova o avvia Origins politici e civici a Milano — comitati di quartiere, attivismo per la casa e campagne di rigenerazione urbana. Lista d'attesa di JoinOrigin.",
      meetup:
        "Trova o avvia meetup e Origins sociali a Milano — aperitivi serali, ritrovi sui Navigli e vita nei parchi. Lista d'attesa di JoinOrigin.",
      'small-business':
        "Trova o avvia Origins di piccole imprese a Milano — commercianti di mercato, atelier e reti di negozi di famiglia. Lista d'attesa di JoinOrigin.",
    },
    ideas: '30 idee per eventi Origin a Milano | JoinOrigin',
    ideasDescription:
      "Scopri 30 idee per eventi Origin a Milano — eventi di networking, apprendimento, all'aperto, professionali, creativi e di impatto. Lista d'attesa di JoinOrigin.",
  },
  intro: [
    "Milano è il motore dell'Italia — la capitale della moda, del design e della finanza — ma le sue community girano su un carburante molto più antico: l'aperitivo. Ogni sera, i bar della città servono drink con generosi buffet, e il rituale di stare al bancone con colleghi, vicini e sconosciuti è la colla sociale della città. I canali dei Navigli, le strade acciottolate di Brera e le torri di Porta Nuova ospitano ciascuno la propria versione di questo appuntamento serale.",
    "L'identità della città è plasmata da due eventi globali: la Settimana della Moda e il Salone del Mobile, che insieme portano a Milano ogni anno i professionisti creativi del mondo. Eppure la città di tutti i giorni è un patchwork di cortili, mercati e laboratori di famiglia. Università come il Politecnico e la Bocconi alimentano un flusso costante di talenti, e la geografia pianeggiante della città rende bici e passeggiate modi naturali per spostarsi tra le community.",
    "La cultura milanese è educata ma riservata — le community si formano attraverso presentazioni e costanza. I nuovi arrivati che si presentano allo stesso aperitivo, si uniscono a un'associazione locale o prendono posto a un mercato di quartiere scopriranno che la città si apre rapidamente.",
  ],
  dataPoints: [
    'Circa 1,4 milioni di abitanti; capitale della Lombardia, in Italia.',
    "Le università includono il Politecnico di Milano, la Bocconi e l'Università degli Studi.",
    'Hub globale per moda e design — Settimana della Moda e Salone del Mobile.',
    "Ancoraggi pubblici: i canali dei Navigli, il Parco Sempione e il lago dell'Idroscalo.",
    "Cultura dell'aperitivo — il drink serale con buffet è il rituale sociale della città.",
    'Distretto degli affari a Porta Nuova; distretti creativi a Brera, Navigli e Lambrate.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Piani di coworking e acceleratori a Porta Nuova',
        'Hub di innovazione a Isola',
        'Sale eventi fintech vicino alle torri Garibaldi',
        'Spazi di imprenditoria della Bocconi e del Politecnico',
        'Caffè per startup lungo i Navigli',
        'Terrazze sui tetti per i mixer serali',
      ],
      formats: [
        'Colazioni tra fondatori con presentazioni rapide',
        'Serate di pitch e demo day',
        'Tavoli di fondatori fashion-tech e design-tech',
        'Happy hour fintech e pagamenti',
        'Mixer tra fondatori internazionali (in inglese)',
      ],
      howToStart: [
        'Scegli una verticale ristretta — fashion tech, fintech o design tech — e un nome in stile internazionale.',
        'Prenota uno slot settimanale in uno spazio di coworking di Porta Nuova o Isola che ti ospiti.',
        'Organizza tre meetup aperti, poi chiedi a due frequentatori di co-organizzare e imposta un ritmo mensile.',
      ],
    },
    creative: {
      venues: [
        'Studi di design a Brera e nel distretto di Tortona',
        'Atelier di moda vicino al Quadrilatero della Moda',
        'Gallerie lungo i Navigli',
        'Spazi maker a Lambrate in ex fabbriche',
        "Aule di laboratorio delle scuole d'arte",
        'Librerie-caffè con angoli di lettura',
      ],
      formats: [
        'Open day degli studi durante il Salone del Mobile',
        'Visite guidate alle gallerie con interventi degli artisti',
        'Serate di critica del design e della moda',
        'Notti di laboratorio maker a Lambrate',
        'Sessioni di revisione dei portfolio con i titolari degli studi',
      ],
      howToStart: [
        'Ancora il gruppo a un mestiere e a un distretto — Brera per il design, Lambrate per il making.',
        'Collabora con uno studio o una galleria per ospitare la prima serata di critica; la settimana del Salone è un debutto naturale.',
        "Rendi il feedback il rituale: ogni sessione si chiude con tre commenti parlati per opera, poi l'aperitivo.",
      ],
    },
    political: {
      venues: [
        'Sale del consiglio comunale e dei consigli di zona',
        'Sale dei comitati di quartiere',
        'Spazi delle associazioni di inquilini e per la casa',
        'Centri comunitari in tutta la città',
        'Spazi di incontro civic tech',
        'Biblioteche pubbliche con sale riunioni',
      ],
      formats: [
        'Sessioni aperte dei consigli di zona',
        'Serate informative su casa e affitti',
        'Passeggiate-parlato di rigenerazione urbana',
        'Briefing per volontari e sessioni di primo turno',
        'Laboratori di bilancio partecipativo',
      ],
      howToStart: [
        'Scegli una questione concreta e una piccola geografia — una piazza, uno scalo ferroviario o una singola politica abitativa.',
        'Unisciti al comitato di quartiere della tua zona e offriti di gestire una riunione insieme a loro.',
        'Usa il calendario di consultazione pubblica della città per ancorare il tuo secondo evento attorno a una decisione in corso.',
      ],
    },
    meetup: {
      venues: [
        "Bar dell'aperitivo lungo i Navigli",
        'Prati del Parco Sempione',
        'Caffè e cortili di Brera',
        'Caffè con giochi da tavolo in centro',
        "Lago e parco dell'Idroscalo",
        'Centri comunitari con tavoli nei cortili',
      ],
      formats: [
        'Aperitivo settimanale allo stesso bar',
        'Passeggiate al tramonto sui Navigli',
        'Gite in bici verso la campagna',
        'Serate di giochi da tavolo e trivia',
        'Tavoli di scambio linguistico (italiano–inglese)',
      ],
      howToStart: [
        'Scegli un formato ripetibile — un aperitivo settimanale, una gita mensile — e una sede fissa.',
        'Scegli un bar sui Navigli, un angolo del parco o un punto del lago che ti ospiti ogni volta.',
        'Organizza le prime tre sessioni nello stesso orario e luogo, poi chiedi ai frequentatori di invitare un nuovo arrivato ciascuno.',
      ],
    },
    'small-business': {
      venues: [
        'Mercati coperti — Via Fauche, viale Papiniano',
        'Atelier e botteghe a Brera e Porta Genova',
        "Tavoli dei titolari di bar dell'aperitivo",
        'Sale seminariali della camera di commercio',
        'Corridoi di negozi di famiglia in centro',
        "Fiere dell'artigianato e stand dei mercati di design",
      ],
      formats: [
        "Caffè dei titolari al mercato prima dell'apertura",
        'Serate aperte di botteghe e atelier',
        'Workshop della camera su permessi e digitalizzazione',
        'Circoli di acquisto condiviso per le forniture',
        'Sessioni di pianificazione di eventi per le vie dello shopping',
      ],
      howToStart: [
        'Ancora il gruppo a un mercato o a una via dello shopping — il mercato del sabato di viale Papiniano è una calamita comprovata.',
        'Invita un titolare veterano o un delegato della camera a co-ospitare la prima colazione.',
        'Raccogli i problemi ricorrenti dei titolari — permessi, affitti, pagamenti digitali — e trasforma la riunione di ogni mese in una sessione pratica di risoluzione.',
      ],
    },
  },
  variantIntros: {
    startup:
      "La scena startup di Milano è diventata la più attiva d'Italia, ancorata al distretto degli affari di Porta Nuova, dove torri di vetro ospitano acceleratori, fondi di venture capital e aziende tech internazionali. Il patrimonio industriale e creativo della città dà al suo ecosistema un sapore distintivo: fashion tech, design tech e fintech sono punti di forza ricorrenti, e Politecnico e Bocconi alimentano un bacino profondo di ingegneri e laureati in economia. Isola, un tempo quartiere operaio, ora ospita hub di innovazione e caffè per startup, mentre i Navigli portano l'energia serale. I formati includono colazioni tra fondatori, serate di pitch, demo day e happy hour fintech che ruotano tra terrazze d'ufficio e bar lungo i canali. La community è internazionale — l'inglese è comune nei meetup, mentre l'italiano resta il default per molti gruppi locali. La cultura di Milano è più formale di quella di Roma: le presentazioni contano, e una referenza calorosa apre le porte. Avviare qui un Origin di startup funziona meglio con una verticale ristretta e un ritmo regolare — un tavolo mensile fashion-tech o una serata di builder di IA costruisce un seguito fedele più velocemente di un gruppo generalista.",
    creative:
      "Milano è la capitale del design in Italia e probabilmente nel mondo: il Salone del Mobile e la Settimana della Moda portano in città professionisti creativi da ogni continente, e gli studi, gli atelier e le gallerie della città lavorano a standard globali tutto l'anno. Brera è il cuore del distretto dell'arte e del design, l'area di Tortona ospita le mostre più famose della settimana del design e le ex fabbriche di Lambrate sono diventate spazi maker dove vengono prototipati mobili, oggetti e tecnologia. Il sistema della moda attorno al Quadrilatero della Moda collega atelier, modellisti e designer emergenti in una rete stretta guidata dalle referenze. I formati includono open day degli studi, visite alle gallerie, revisioni dei portfolio e serate di critica del design, con l'aperitivo come rituale di chiusura naturale. La scena è compatta e connessa — un buon progetto può viaggiare da un laboratorio di Lambrate a una galleria di Brera in una settimana. Avviare un Origin creativo a Milano è realistico: scegli un mestiere, un distretto e una serata regolare, e la densità di persone qualificate e ambiziose ti troverà.",
    political:
      "La vita civica di Milano è plasmata dalla trasformazione della città da potenza industriale a città globale dei servizi — e dalle battaglie su chi ne beneficia. I grattacieli di Porta Nuova simboleggiano il boom, mentre i comitati di quartiere di Isola, Scalo Farini e della periferia fanno campagna per alloggi a prezzi accessibili, spazi verdi e una giusta quota della rigenerazione. La casa è una questione definitoria: gli affitti sono saliti con le fortune della città, e le associazioni di inquilini organizzano serate informative e cliniche legali aperte ai nuovi arrivati. I processi di bilancio partecipativo e consultazione pubblica della città danno ai residenti organizzati un'influenza reale su parchi, strade ed edifici civici. I centri comunitari di tutta la città ospitano riunioni, corsi di lingua e gruppi di volontariato. La cultura politica premia la preparazione e la cortesia: gli attivisti milanesi sono organizzati, e i gruppi ben preparati vengono presi sul serio. Avviare un Origin politico significa scegliere una questione concreta e una piccola geografia, poi collaborare con i comitati esistenti — il panorama è abbastanza ricco che la collaborazione batte la competizione.",
    meetup:
      "La scena dei meetup di Milano è costruita sull'aperitivo, sui Navigli e sul parco. Il drink serale con buffet è il grande livellatore sociale della città: impiegati, studenti e pensionati stanno agli stessi banconi, e un gruppo che adotta un bar regolare diventa presto parte dell'arredamento. I canali dei Navigli sono la destinazione classica — passeggiate al tramonto, bar lungo i canali e barche che trasformano le uscite di gruppo in feste galleggianti. Il Parco Sempione offre prati verdi all'ombra del castello, e il lago dell'Idroscalo attira nuotatori, canottieri e pic-nic in estate. I formati includono aperitivi settimanali, serate di giochi da tavolo e trivia, gite in bici nella campagna lombarda pianeggiante e scambi linguistici (italiano–inglese). Il ritmo serale della città è perfetto per i meetup — un gruppo che inizia alle sette e si sposta a cena segue il copione locale. Avviare un meetup a Milano significa scegliere un formato ripetibile e una sede fissa, e l'amore della città per la buona compagnia fa il resto.",
    'small-business':
      "Le community di piccole imprese di Milano sono ancorate dai mercati, dagli atelier e dai laboratori di famiglia della città. I mercati coperti come Via Fauche e viale Papiniano non sono solo luoghi dove fare la spesa — sono community di banchisti che condividono fornitori, turni e pettegolezzi. Le botteghe — laboratori artigianali che fanno scarpe, cornici, lampade e gioielli — si concentrano a Brera e Porta Genova, dove i titolari si conoscono da decenni. L'economia dell'aperitivo aggiunge uno strato di titolari di bar e ristoranti che coordinano fornitori e logistica notturna. La camera di commercio offre workshop su permessi, digitalizzazione ed export, mentre le fiere dell'artigianato e i mercati del design danno ai maker un calendario condiviso. Ciò che lega questi gruppi è l'orgoglio del mestiere e il luogo: una galleria del mercato o una via di laboratori è una community naturale con un interesse collettivo nella qualità e nel passaggio di clienti. Avviare un Origin di piccole imprese è molto realizzabile: una colazione mensile dei commercianti in una galleria del mercato, con argomenti a rotazione come affitti, permessi e vendita online, attira in modo affidabile titolari che raramente hanno pari con cui parlare.",
  },
  ideaPage: {
    intro:
      "Milano è una città ideale per testare nuove idee di eventi comunitari: i bar dell'aperitivo danno a ogni gruppo una sede naturale, i parchi e l'Idroscalo sono punti d'incontro gratuiti e la cultura del design della città premia gli eventi ben fatti. Le trenta idee qui sotto sono raggruppate in sei categorie — networking, apprendimento, sociali e all'aperto, professionali e di settore, creative e maker, e impatto e locale. Ognuna include a chi è rivolta, una breve presentazione e un tipo di sede suggerito che esiste davvero a Milano, dai bar dei Navigli e i mercati coperti agli spazi maker di Lambrate e al Parco Sempione. Alcune idee funzionano come eventi una tantum; altre sono progettate per diventare community ricorrenti con un ritmo da aperitivo. La regola di onestà è semplice: ogni suggerimento di sede è un tipo reale di luogo in questa città, e ogni formato è abbastanza semplice da essere gestito da un organizzatore alle prime armi. Scegli l'idea che corrisponde ai tuoi interessi, trova una sede che ti ospiti e lascia che lo stile di Milano faccia il resto.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Aperitivo per nuovi arrivati',
            pitch:
              'Un drink serale settimanale allo stesso bar dei Navigli dove nuovi arrivati e residenti di lunga data si scambiano consigli sulla città davanti a uno Spritz.',
            audience: 'Nuovi arrivati e chiunque ami le chiacchiere informali',
            venueType: "Un bar dell'aperitivo sui Navigli",
          },
          {
            title: 'Colazione tra fondatori vicino a Porta Nuova',
            pitch:
              'Una colazione presto dove i fondatori condividono vittorie e blocchi della settimana davanti a espresso e cornetti.',
            audience: 'Fondatori e operatori di ogni fase',
            venueType: 'Un caffè nel distretto di Porta Nuova',
          },
          {
            title: 'Incontro informale a Brera',
            pitch:
              "Una serata a bassa pressione nel distretto dell'arte, con carte rompighiaccio e la regola di incontrare tre persone nuove.",
            audience: 'Residenti e professionisti creativi',
            venueType: 'Un caffè o un cortile di Brera',
          },
          {
            title: 'Circolo degli expat a Milano',
            pitch:
              "I residenti internazionali condividono consigli per l'insediamento — burocrazia, casa e dove trovare le proprie persone.",
            audience: 'Expat al primo anno',
            venueType: 'Un centro culturale o una sala di coworking',
          },
          {
            title: 'Club del caffè per freelance',
            pitch:
              'Un caffè mattutino settimanale dove i freelance di ogni settore condividono contatti, tariffe e storie di clienti.',
            audience: 'Freelance di ogni disciplina',
            venueType: 'Un caffè a Isola',
          },
        ],
      },
      {
        name: 'Apprendimento e workshop',
        ideas: [
          {
            title: 'Tavolo di italiano per nuovi arrivati',
            pitch:
              'Tavoli per livello con madrelingua, più la regola che ogni errore regala una risata al tavolo.',
            audience: "Expat e nuovi arrivati che imparano l'italiano",
            venueType: 'Un caffè o un centro comunitario a Brera',
          },
          {
            title: 'Clinica su codice fiscale e tasse',
            pitch:
              'Una sessione pratica su registrazione, codice fiscale e le basi fiscali che ogni nuovo arrivato affronta.',
            audience: 'Nuovi residenti e freelance',
            venueType: 'Una sala eventi di coworking o associazione',
          },
          {
            title: 'Scuola di espresso e cultura del caffè',
            pitch:
              'Un torrefattore ti guida tra chicchi, miscele e il modo giusto di ordinare al banco.',
            audience: 'Amanti del caffè e nuovi curiosi',
            venueType: 'Una torrefazione',
          },
          {
            title: 'Workshop di design thinking',
            pitch:
              "Un'introduzione pratica ai metodi di design che hanno reso famosa Milano, insegnata da designer in attività.",
            audience: 'Professionisti e principianti curiosi',
            venueType: 'Una scuola di design o una sala di studio',
          },
          {
            title: 'Serata Opera 101',
            pitch:
              "Un'introduzione amichevole all'opera — storie, arie e cosa aspettarsi alla tua prima visita al teatro.",
            audience: 'Amanti della cultura e principianti',
            venueType: "Una scuola d'opera o un centro culturale",
          },
        ],
      },
      {
        name: "Sociali e all'aperto",
        ideas: [
          {
            title: 'Passeggiata al tramonto sui Navigli',
            pitch:
              "Una lenta passeggiata serale lungo i canali con tappe per l'aperitivo ai ponti più noti.",
            audience: 'Amanti del tramonto e nuovi arrivati',
            venueType: 'Le rive e i ponti dei Navigli',
          },
          {
            title: 'Pic-nic al Parco Sempione',
            pitch:
              "Coperte, frisbee e giochi da tavolo all'ombra del castello, con un tema di potluck a rotazione.",
            audience: 'Famiglie, coppie e gruppi di amici',
            venueType: 'I prati del Parco Sempione',
          },
          {
            title: "Giro dell'aperitivo attraverso Brera",
            pitch:
              'Un giro serale guidato attraverso cinque bar, con un piatto condiviso e una storia in ciascuno.',
            audience: 'Amanti del cibo e nuovi arrivati',
            venueType: 'I bar del distretto di Brera',
          },
          {
            title: 'Giro in bici verso la campagna',
            pitch:
              'Una gita rilassata nel weekend fuori città verso la campagna lombarda, con tappe al caffè e un pic-nic.',
            audience: 'Ciclisti amatoriali di ogni ritmo',
            venueType: 'Un punto di ritrovo di un club ciclistico',
          },
          {
            title: "Giornata al lago dell'Idroscalo",
            pitch: 'Un pomeriggio estivo di nuoto, paddleboarding e pic-nic al lago della città.',
            audience: "Amanti dell'acqua e famiglie",
            venueType: "Il lago e il parco dell'Idroscalo",
          },
        ],
      },
      {
        name: 'Professionali e di settore',
        ideas: [
          {
            title: 'Circolo fashion tech',
            pitch:
              'Professionisti della moda e tecnologi discutono sostenibilità, negozi digitali e nuovi materiali.',
            audience: 'Professionisti di moda e tech',
            venueType: 'Uno showroom del distretto della moda o uno spazio eventi',
          },
          {
            title: 'Serata dei titolari di studi di design',
            pitch:
              'I titolari di studio confrontano gestione dei clienti, assunzioni e prezzi dei progetti con i pari davanti a un drink.',
            audience: 'Titolari di piccoli studi di design',
            venueType: 'Uno studio di design a Tortona',
          },
          {
            title: 'Tavolo dei fondatori fintech',
            pitch:
              'Una tavola rotonda mensile per fondatori fintech per condividere progressi, apprendimenti normativi e partnership.',
            audience: 'Fondatori e operatori fintech',
            venueType: 'Un ufficio o uno spazio eventi a Porta Nuova',
          },
          {
            title: 'Circolo dei product manager',
            pitch:
              'Un circolo confidenziale dove i PM discutono una sfida mensile — roadmap, assunzioni, politica interna.',
            audience: 'Product manager nel tech',
            venueType: 'Una sala riunioni di coworking a Isola',
          },
          {
            title: 'Circolo delle assunzioni per team alle prime armi',
            pitch:
              'I fondatori condividono come assumono, trattengono e lasciano andare — le verità scomode della costruzione dei primi team.',
            audience: 'Fondatori in fase iniziale e team lead',
            venueType: 'Un ufficio di startup o un incubatore',
          },
        ],
      },
      {
        name: 'Creative e maker',
        ideas: [
          {
            title: 'Serata delle gallerie di Brera',
            pitch:
              "Una passeggiata serale guidata attraverso le gallerie del distretto dell'arte, con interventi e un aperitivo finale.",
            audience: "Amanti dell'arte e studenti",
            venueType: 'Le gallerie di Brera',
          },
          {
            title: 'Visita al laboratorio maker di Lambrate',
            pitch:
              'Una serata guidata nei laboratori del distretto maker, vedendo mobili e oggetti in fase di prototipazione.',
            audience: 'Maker e appassionati di design',
            venueType: 'I laboratori maker di Lambrate',
          },
          {
            title: 'Serata di upcycling della moda in atelier',
            pitch:
              "Uno scambio di vestiti seguito da una sessione di redesign con macchine da cucire e una sarta d'atelier.",
            audience: 'Amanti della moda e maker',
            venueType: 'Un atelier di moda o un laboratorio di cucito',
          },
          {
            title: 'Circolo di produzione musicale',
            pitch:
              'I producer condividono tracce non finite per il feedback e si scambiano consigli su attrezzatura e software.',
            audience: 'Beatmaker e producer da camera',
            venueType: 'Uno studio di registrazione o prove',
          },
          {
            title: 'Serata zine e risograph',
            pitch: 'Una serata pratica di creazione di zine con stampa risograph e scambio finale.',
            audience: 'Scrittori, illustratori e appassionati di stampa',
            venueType: 'Uno studio di stampa o uno spazio artistico',
          },
        ],
      },
      {
        name: 'Impatto e locale',
        ideas: [
          {
            title: 'Serata informativa sui diritti degli inquilini',
            pitch:
              'Una sessione in linguaggio semplice su regole degli affitti, contratti e dove ottenere consulenza gratuita sulla casa.',
            audience: 'Inquilini e organizzatori di inquilini',
            venueType: "Un'associazione di inquilini o un centro comunitario",
          },
          {
            title: 'Passeggiata di rigenerazione del quartiere',
            pitch:
              'Visita un distretto in trasformazione con residenti e urbanisti e impara come viene decisa la rigenerazione.',
            audience: 'Urbanisti e attivisti di quartiere',
            venueType: 'Una sala di zona o il quartiere stesso',
          },
          {
            title: "Giornata di lavoro nell'orto comunitario",
            pitch:
              'I vicini passano una mattina a piantare, innaffiare e pianificare la stagione in un orto urbano.',
            audience: 'Giardinieri e aspiranti giardinieri',
            venueType: 'Un orto urbano comunitario',
          },
          {
            title: 'Fiera dei volontari per cause locali',
            pitch:
              'Le associazioni locali allestiscono tavoli e reclutano volontari davanti a caffè e paste gratuiti.',
            audience: 'Volontari alla prima esperienza',
            venueType: 'Un centro comunitario o una biblioteca',
          },
          {
            title: 'Storie dei banchisti del mercato',
            pitch:
              'I commercianti veterani raccontano storie di cinque minuti dietro i loro banchi, seguite da domande aperte.',
            audience: 'Vicini e amanti del cibo',
            venueType: 'Un mercato coperto come viale Papiniano',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Come scelgo una di queste idee?',
        answer:
          'Abbina la categoria ai tuoi interessi e al pubblico che puoi raggiungere. A Milano, i formati ricorrenti con una sede fissa — un aperitivo settimanale, una gita mensile — costruiscono community più velocemente.',
      },
      {
        question: 'Devo parlare italiano per organizzare?',
        answer:
          "No. Molti gruppi milanesi operano in inglese o sono bilingui, soprattutto nel tech, nel design e nella moda. Un po' di italiano apre porte con vicini e commercianti del mercato.",
      },
      {
        question: 'Questi eventi possono diventare community reali?',
        answer:
          "Sì — i formati ricorrenti sono il modo in cui la maggior parte delle community milanesi inizia, e la tradizione dell'aperitivo ti dà un modello comprovato. Le guide pratiche accompagnano dal primo evento a una community stabile.",
      },
    ],
  },
  faq: [
    {
      question: 'Come trovo un Origin a Milano?',
      answer:
        'Usa le pagine dei tipi di gruppo per gli Origins di startup, creativi, politici, meetup e piccole imprese. Ognuna descrive i distretti, le sedi e i formati reali dove i milanesi si riuniscono. JoinOrigin è attivo — crea il tuo profilo e trova o avvia il tuo Origin oggi.',
    },
    {
      question: 'È realistico avviare un Origin a Milano?',
      answer:
        "Sì. Milano ha bar dell'aperitivo ovunque, parchi generosi e una forte cultura associativa. Le guide coprono l'avvio di una community, l'organizzazione di un meetup e l'ottenimento dei primi dieci membri.",
    },
    {
      question: 'I suggerimenti di sede in questa pagina sono reali?',
      answer:
        'Sì. Ogni tipo di sede menzionato — bar dei Navigli, mercati coperti, Parco Sempione, laboratori maker, centri comunitari — esiste a Milano. Non inventiamo mai conteggi di membri, valutazioni o uffici locali.',
    },
    {
      question: 'JoinOrigin ha un ufficio a Milano?',
      answer:
        'No. JoinOrigin non ha uffici locali né personale locale. Tutte le descrizioni delle community riflettono il paesaggio urbano reale, e la piattaforma aiuta i milanesi a trovare o avviare Origins.',
    },
  ],
};

export default content;
