import type { GuideContent } from '../../types';

/**
 * "Come creare un progetto" — guida L1 sempre attuale (design §6.1, TASK-353),
 * traduzione italiana (it).
 *
 * Scritta seguendo il flusso dello schermo prodotto §2: un gruppo formato
 * passa dalla conversazione al lavoro condiviso pubblicando un progetto; la
 * pagina del progetto è pubblica, la sua stanza viene creata automaticamente
 * ALLA PUBBLICAZIONE, il creatore controlla la stanza e i progressi confluiscono
 * nel feed. La piattaforma è attiva: pubblicare un progetto apre ora la sua
 * pagina e la sua stanza. "Stanza" è legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'create-a-project',
  title:
    'Come creare un progetto: trasforma lo slancio del gruppo in lavoro condiviso | JoinOrigin',
  description:
    "Crea un progetto su JoinOrigin — che sia un'idea completamente nuova o un lavoro già in corso — pubblica una pagina di progetto condivisa, apri la sua stanza automaticamente e trasforma la conversazione di un gruppo in lavoro che viene consegnato. Passi pratici da JoinOrigin.",
  intro: [
    "Un gruppo che si limita a parlare prima o poi si ferma. La differenza tra una community che sembra viva e una che svanisce è il lavoro condiviso — un progetto con un nome, un obiettivo e un luogo dove i progressi sono visibili. Trasformare una conversazione in un progetto è anche un problema di connessione tra persone: ti servono le persone giuste, l'impegno giusto e un unico posto chiaro per lavorare insieme. Lo stesso vale quando il progetto esiste già — disperso tra file, messaggi e la lista di cose da fare di una persona — ha comunque bisogno di una casa visibile e delle persone giuste attorno.",
    "Il flusso di JoinOrigin gestisce questo passaggio: un gruppo formato pubblica un progetto e la pagina del progetto appare pubblicamente con la sua stanza creata automaticamente nel momento della pubblicazione. I membri entrano nella stanza del progetto tramite un link, il creatore la controlla come proprietario della stanza e gli aggiornamenti dalla stanza confluiscono nel feed così l'intera rete può vedere il lavoro. La stanza del progetto si apre nel momento in cui pubblichi — nessun passaggio di configurazione in mezzo.",
    'Questa guida va dalla prima scintilla a un ritmo di lavoro funzionante — che il progetto sia completamente nuovo o già in corso: partire da un gruppo esistente e dalla sua stanza, definire un ambito che possa davvero essere consegnato, scrivere la pagina del progetto, pubblicarla e aprire la stanza, invitare il team di lavoro, concordare ruoli e una prima tappa, portare il lavoro reale nella stanza e condividere i progressi per creare slancio.',
  ],
  dataPoints: [
    'I progetti con una pagina pubblica e una prima tappa chiara sono più facili da popolare — le persone si uniscono al lavoro che possono vedere.',
    'Su JoinOrigin, pubblicare un progetto crea automaticamente la sua stanza — lo spazio di lavoro esiste dallo stesso momento della pagina.',
    'Una stanza di progetto dà al lavoro una sola casa: decisioni, file e progressi visibili a tutti coloro che si uniscono.',
    'JoinOrigin è un sistema operativo di comunità che aiuta i gruppi formati a trasformare le conversazioni in progetti — pubblica il tuo progetto e la sua stanza si apre immediatamente.',
  ],
  faq: [
    {
      question: 'Cosa rende un gruppo pronto ad avviare un progetto?',
      answer:
        'Un gruppo è pronto quando alcuni membri condividono un risultato concreto e sono disposti a impegnare tempo. Non serve una grande squadra — tre persone impegnate con una tappa chiara battono una dozzina di membri curiosi. Pubblica il progetto quando la conversazione si ripete: "dovremmo davvero farlo".',
    },
    {
      question: 'Quando viene creata la stanza del progetto?',
      answer:
        "La stanza viene creata automaticamente nel momento in cui pubblichi il progetto. Il creatore possiede la stanza dall'inizio e può invitare il team di lavoro, assegnare ruoli e mantenere il lavoro organizzato all'interno di Element. Puoi anche creare la stessa struttura con gli strumenti che il tuo gruppo usa già.",
    },
    {
      question: "In cosa un progetto è diverso da un'idea?",
      answer:
        "Un'idea è una proposta attorno alla quale le persone si riuniscono — la sua stanza è dove si testano interesse e adattamento. Un progetto è il lavoro condiviso a cui un gruppo formato si impegna, con una pagina, una stanza e una tappa. Pubblica un'idea prima quando ti servono persone; pubblica un progetto quando le hai già.",
    },
    {
      question: 'Quale dovrebbe essere la prima tappa?',
      answer:
        'Piccola e completabile — una bozza funzionante, un pilota, una prima versione o un risultato finito entro poche settimane. Una prima tappa breve costruisce fiducia nel gruppo e rende il progetto reale per i nuovi arrivati. Puoi sempre espandere dopo la prima vittoria.',
    },
    {
      question: 'JoinOrigin può aiutare un gruppo ad avviare un progetto oggi?',
      answer:
        "Sì. Pubblicare un progetto su JoinOrigin crea la sua pagina e la sua stanza in modo atomico — la stanza si apre nel momento in cui pubblichi e il creatore la controlla. Scegli l'obiettivo del gruppo, crea una casa di progetto condivisa e apri una stanza per il lavoro; ogni nuovo membro che inviti espande la tua portata.",
    },
  ],
  sections: [
    'Parti da un gruppo esistente e dalla sua stanza. Un progetto cresce da un gruppo che ha già fiducia e slancio. Osserva le conversazioni nella stanza del gruppo e trova il bisogno ricorrente — la cosa che i membri continuano a dire "dovremmo farla". JoinOrigin mantiene una community viva in una stanza controllata dal creatore, e il progetto è il livello successivo sopra quella stanza. Dai un nome al bisogno ricorrente nel gruppo e verifica se qualcuno vuole agire.',
    'Definisci un ambito che possa davvero essere consegnato. Scrivi cosa produrrà il progetto, per chi e in quale arco di tempo. Mantieni la prima versione abbastanza piccola perché il gruppo possa finirla. JoinOrigin è progettato attorno a progetti con pagine pubbliche — un ambito chiaro è ciò che rende la pagina leggibile e la stanza focalizzata. Una frase che dice cosa viene consegnato e quando basta per iniziare.',
    "Scrivi la pagina del progetto. La pagina dovrebbe dichiarare l'obiettivo del progetto, il problema che risolve, chi ci sta lavorando e di cosa ha bisogno. Sii onesto sullo stadio — una bozza iniziale va bene. Pubblicare un progetto su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Pubblica la descrizione del progetto in un luogo a cui il gruppo possa indirizzare le persone.",
    "Pubblica il progetto e apri la sua stanza. La pubblicazione è ciò che rende reale il progetto: una pagina pubblica più una stanza dove vive il lavoro. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede. Su JoinOrigin la pagina, la stanza e il team di lavoro sono un'unica pubblicazione. Crea la pagina e la stanza negli strumenti che il tuo gruppo usa già se preferisci.",
    "Invita il team di lavoro nella stanza. Invita le persone che faranno davvero il lavoro — una squadra piccola e impegnata è meglio di un vasto pubblico. Condividi il link di invito e chiedi a ciascuno di confermare il proprio tempo. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina del progetto o seguire un link di invito diretto da un membro. Un link chiaro alla stanza del progetto fa il lavoro.",
    "Concorda ruoli e una prima tappa. Dai un nome a chi possiede cosa, con quale frequenza il gruppo si confronta e quale prima tappa tutti stanno perseguendo. Scrivilo dove l'intero team possa vederlo. JoinOrigin non assegna i ruoli al posto tuo — il controllo del creatore significa che decidi tu. La piattaforma mantiene ruoli e tappa visibili nella stanza del progetto. Un breve piano scritto nella stanza basta.",
    'Porta il lavoro reale nella stanza. Sostituisci "dovremmo" con "ecco la bozza", "ecco la decisione" e "ecco il prossimo compito". Tieni i progressi in un unico posto visibile così tutti possono seguirli. JoinOrigin mantiene la stanza di un progetto a custodire il lavoro — decisioni, file e aggiornamenti — invece di disperderli tra messaggi privati. Tieni gli artefatti di lavoro nella stanza condivisa dalla prima settimana.',
    'Condividi i progressi per creare slancio. Pubblica aggiornamenti mentre il progetto avanza, celebra la tappa quando arriva e invita il gruppo più ampio a unirsi o seguire. I progressi nel feed trasformano un progetto in prova che la community consegna. Gli aggiornamenti della stanza confluiscono nel feed su JoinOrigin — il ciclo di crescita in cui ogni nuovo membro espande la superficie di scoperta. Fatti scoprire e cresci.',
  ],
  steps: [
    {
      title: 'Parti da un gruppo esistente e dalla sua stanza',
      body: 'Un progetto cresce da un gruppo che ha già fiducia e slancio. Osserva le conversazioni nella stanza del gruppo e trova il bisogno ricorrente — la cosa che i membri continuano a dire "dovremmo farla".',
      joinOriginNote:
        'JoinOrigin mantiene una community viva in una stanza controllata dal creatore, e il progetto è il livello successivo sopra quella stanza. Dai un nome al bisogno ricorrente nel gruppo e verifica se qualcuno vuole agire.',
    },
    {
      title: 'Definisci un ambito che possa davvero essere consegnato',
      body: 'Scrivi cosa produrrà il progetto, per chi e in quale arco di tempo. Mantieni la prima versione abbastanza piccola perché il gruppo possa finirla.',
      joinOriginNote:
        'JoinOrigin è progettato attorno a progetti con pagine pubbliche — un ambito chiaro è ciò che rende la pagina leggibile e la stanza focalizzata. Una frase che dice cosa viene consegnato e quando basta per iniziare.',
    },
    {
      title: 'Scrivi la pagina del progetto',
      body: "La pagina dovrebbe dichiarare l'obiettivo del progetto, il problema che risolve, chi ci sta lavorando e di cosa ha bisogno. Sii onesto sullo stadio — una bozza iniziale va bene.",
      joinOriginNote:
        "Pubblicare un progetto su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Pubblica la descrizione del progetto in un luogo a cui il gruppo possa indirizzare le persone.",
    },
    {
      title: 'Pubblica il progetto e apri la sua stanza',
      body: "La pubblicazione è ciò che rende reale il progetto: una pagina pubblica più una stanza dove vive il lavoro. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede.",
      joinOriginNote:
        "Su JoinOrigin la pagina, la stanza e il team di lavoro sono un'unica pubblicazione. Crea la pagina e la stanza negli strumenti che il tuo gruppo usa già se preferisci.",
    },
    {
      title: 'Invita il team di lavoro nella stanza',
      body: 'Invita le persone che faranno davvero il lavoro — una squadra piccola e impegnata è meglio di un vasto pubblico. Condividi il link di invito e chiedi a ciascuno di confermare il proprio tempo.',
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina del progetto o seguire un link di invito diretto da un membro. Un link chiaro alla stanza del progetto fa il lavoro.",
    },
    {
      title: 'Concorda ruoli e una prima tappa',
      body: "Dai un nome a chi possiede cosa, con quale frequenza il gruppo si confronta e quale prima tappa tutti stanno perseguendo. Scrivilo dove l'intero team possa vederlo.",
      joinOriginNote:
        'JoinOrigin non assegna i ruoli al posto tuo — il controllo del creatore significa che decidi tu. La piattaforma mantiene ruoli e tappa visibili nella stanza del progetto. Un breve piano scritto nella stanza basta.',
    },
    {
      title: 'Porta il lavoro reale nella stanza',
      body: 'Sostituisci "dovremmo" con "ecco la bozza", "ecco la decisione" e "ecco il prossimo compito". Tieni i progressi in un unico posto visibile così tutti possono seguirli.',
      joinOriginNote:
        'JoinOrigin mantiene la stanza di un progetto a custodire il lavoro — decisioni, file e aggiornamenti — invece di disperderli tra messaggi privati. Tieni gli artefatti di lavoro nella stanza condivisa dalla prima settimana.',
    },
    {
      title: 'Condividi i progressi per creare slancio',
      body: 'Pubblica aggiornamenti mentre il progetto avanza, celebra la tappa quando arriva e invita il gruppo più ampio a unirsi o seguire. I progressi nel feed trasformano un progetto in prova che la community consegna.',
      joinOriginNote:
        'Gli aggiornamenti della stanza confluiscono nel feed su JoinOrigin — il ciclo di crescita in cui ogni nuovo membro espande la superficie di scoperta. Fatti scoprire e cresci.',
    },
  ],
};

export default content;
