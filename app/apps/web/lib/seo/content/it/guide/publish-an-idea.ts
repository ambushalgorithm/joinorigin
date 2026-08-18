import type { GuideContent } from '../../types';

/**
 * "Come pubblicare un'idea" — guida L1 sempre attuale (design §6.1, TASK-353),
 * traduzione italiana (it).
 *
 * Scritta seguendo il flusso dello schermo prodotto §2: Scoperta → pagina
 * pubblica dell'idea → Unisciti tramite link → stanza creata automaticamente
 * ALLA PUBBLICAZIONE → il creatore controlla la stanza → crescita tramite
 * feed/inviti. La pagina dell'idea è la promessa pubblica; la stanza è dove
 * le persone interessate si riuniscono e parlano. La piattaforma è attiva:
 * pubblicare un'idea crea ora la sua pagina e la sua stanza. "Stanza" è
 * legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'publish-an-idea',
  title:
    "Come pubblicare un'idea: trasforma una scintilla in una pagina di idea trovabile | JoinOrigin",
  description:
    "Pubblica un'idea su JoinOrigin — che sia una scintilla nuova o un progetto esistente che vuoi far trovare alle persone — scrivi una pagina di idea pubblica, lascia che la sua stanza si apra automaticamente e invita le persone che vogliono costruirla con te. Passi pratici da JoinOrigin.",
  intro: [
    "La maggior parte delle idee muore nelle bozze — una nota sul telefono, una conversazione ricordata a metà, un documento che nessun altro ha mai visto. Il motivo raramente è che l'idea è brutta: è che nessuno poteva trovarla, e trovare le persone giuste è l'intera partita. È esattamente il problema di connessione tra persone che JoinOrigin risolve — che l'idea sia una scintilla nuova o un progetto esistente che è andato avanti in silenzio senza una casa trovabile.",
    "Il ciclo di JoinOrigin funziona così: pubblichi un'idea, appare una pagina di idea pubblica e la sua stanza viene creata automaticamente nel momento della pubblicazione. Le persone scoprono la pagina tramite Esplora o seguono un link che condividi, e l'iscrizione è un singolo clic. Arrivano nella stanza — una stanza Matrix controllata dal creatore dove avviene davvero la conversazione attorno all'idea. Il creatore possiede la stanza dal secondo zero e decide chi entra e cosa succede al suo interno.",
    "Questa guida percorre l'intero percorso: comprimere l'idea in una frase chiara, scrivere una pagina che le persone possano trovare, pubblicarla e aprire la stanza, condividere il link di invito, invitare le prime persone interessate, ospitare la prima conversazione, perfezionare l'idea in base ai feedback reali e mantenerla trovabile mentre cresce. Funziona per qualsiasi idea — una piccola impresa, una startup, un club del libro, un progetto di community, un prodotto che non esiste ancora o un progetto che esiste già e ha bisogno di più persone attorno.",
  ],
  dataPoints: [
    "Una presentazione dell'idea in una frase è più trovabile di un lungo documento — la chiarezza è una funzione di scoperta.",
    'Su JoinOrigin, pubblicare un\'idea crea automaticamente la sua stanza — non c\'è mai un passaggio separato "crea la chat dopo".',
    "Un link di invito è l'invito più semplice: un link, un clic e una persona interessata è nella stanza.",
    'JoinOrigin è un sistema operativo di comunità che aiuta le persone a trovare idee e le persone dietro di esse — pubblica la tua idea e la sua stanza si apre immediatamente.',
  ],
  faq: [
    {
      question: "Che cos'è esattamente una pagina di idea?",
      answer:
        "Una pagina di idea è la casa pubblica e indicizzabile di un'idea su JoinOrigin — una pagina chiara che dichiara cos'è l'idea, perché conta e a chi è rivolta, con un'azione Unisciti. Le persone la scoprono tramite Esplora o un link condiviso, e l'iscrizione le porta alla stanza dell'idea.",
    },
    {
      question: 'Quando viene creata la stanza?',
      answer:
        "La stanza viene creata automaticamente nel momento in cui pubblichi l'idea. Il creatore possiede la stanza dal secondo zero e può invitare, rimuovere e assegnare ruoli all'interno di Element. Puoi anche impostare la stessa struttura — una pagina pubblica più una stanza — con gli strumenti che già usi.",
    },
    {
      question: 'Come fanno le persone a trovare la mia idea?',
      answer:
        'Tramite la scoperta e la condivisione: una pagina di idea è indicizzabile e appare in Esplora, e ogni link di invito che condividi punta direttamente ad essa. Il traffico iniziale più affidabile è personale — condividere la pagina e il suo link con persone a cui il problema interessa già.',
    },
    {
      question: "Qual è la differenza tra un'idea e un progetto?",
      answer:
        "Un'idea è una proposta attorno alla quale le persone si riuniscono — la stanza è dove le persone interessate parlano e testano l'adattamento. Un progetto è ciò che un gruppo formato inizia a fare insieme, con la propria pagina di progetto e la propria stanza. Pubblica prima l'idea; il progetto segue quando le persone si impegnano.",
    },
    {
      question: "JoinOrigin può aiutarmi a pubblicare un'idea oggi?",
      answer:
        "Sì. Pubblicare un'idea su JoinOrigin crea la sua pagina e la sua stanza in modo atomico — la stanza si apre nel momento in cui pubblichi e la controlli dall'inizio. Pubblica la tua idea e apri una stanza per la discussione; ogni nuovo membro che inviti espande la tua portata.",
    },
  ],
  sections: [
    "Definisci l'idea in una frase chiara. Comprimi l'idea in una sola frase: a chi serve, cosa cambia e perché conta. Se non riesci a dirla in una frase, non sei pronto a pubblicarla. JoinOrigin è progettato attorno a pagine di idea trovabili — una presentazione in una frase è il cuore della pagina e la frase che le persone cercheranno. Scrivi la frase e provala su tre persone prima di andare oltre.",
    "Scrivi la pagina di idea con una promessa e un bisogno. La pagina dovrebbe dichiarare l'idea, perché conta, di cosa ha bisogno e chi vuoi che si unisca. Sii onesto su dove si trova l'idea — una scintilla, un prototipo, un prodotto. JoinOrigin crea automaticamente la pagina e la stanza quando pubblichi un'idea; il creatore controlla la stanza dall'inizio e può invitare, rimuovere e assegnare ruoli all'interno di Element. Pubblica l'idea e apri una stanza per la discussione attorno ad essa.",
    "Pubblica l'idea e lascia che la sua stanza si apra. La pubblicazione è il momento in cui l'idea diventa trovabile. Su JoinOrigin, la pubblicazione crea automaticamente la stanza — non c'è mai un passaggio \"crea la chat dopo\", e il creatore possiede la stanza dal secondo zero. Su JoinOrigin la pagina di idea e la sua stanza sono un'unica pubblicazione atomica. Puoi anche condividere la pagina pubblicamente e impostare la stanza negli strumenti che già usi.",
    "Condividi il link di invito. Il link di invito è il percorso più breve dall'interesse alla connessione: un link, un clic e una persona interessata arriva nella stanza. Mettilo ovunque si riuniscano le persone giuste. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro alla tua idea fa il lavoro.",
    "Invita personalmente le prime persone interessate. Gli inviti personali convertono meglio dei post pubblici. Scrivi a persone che corrispondono al pubblico dell'idea, condividi il link di invito e chiedi loro di portare un'altra persona che potrebbe interessarsi. JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    "Ospita la prima conversazione nella stanza. Le prime conversazioni decidono se un'idea ha slancio. Apri la stanza con una domanda chiara — qual è il problema, qual è il primo passo, cosa porta ciascuno di voi — e lascia che le persone rispondano. JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà all'idea una stanza dove l'interesse diventa conversazione, e il creatore possiede quella stanza. Inizia la conversazione ovunque si trovino già le tue persone.",
    "Raccogli feedback e perfeziona l'idea. Chiedi a chi si è unito cosa li entusiasma, cosa li preoccupa e cosa farebbero per primi. Adatta la presentazione, l'ambito o il passo successivo in base alle loro risposte. JoinOrigin conserva la memoria condivisa di un'idea in un unico posto — note, decisioni e feedback nella stanza — così il perfezionamento è visibile invece di andare perso. Chiedi direttamente ai membri nella stanza dopo la prima settimana.",
    "Mantieni l'idea trovabile mentre cresce. Rivedi la pagina mentre l'idea si sviluppa — aggiorna la promessa, i bisogni e il passo successivo così i nuovi arrivati vedono sempre la versione attuale. La crescita si accumula quando ogni membro può descrivere l'idea in una frase e condividere il suo link di invito. JoinOrigin mantiene la tua pagina di idea e la sua stanza collegate mentre l'interesse cresce — un unico posto dove la promessa, la conversazione e le persone sono visibili. Fatti scoprire e cresci.",
  ],
  steps: [
    {
      title: "Definisci l'idea in una frase chiara",
      body: "Comprimi l'idea in una sola frase: a chi serve, cosa cambia e perché conta. Se non riesci a dirla in una frase, non sei pronto a pubblicarla.",
      joinOriginNote:
        'JoinOrigin è progettato attorno a pagine di idea trovabili — una presentazione in una frase è il cuore della pagina e la frase che le persone cercheranno. Scrivi la frase e provala su tre persone prima di andare oltre.',
    },
    {
      title: 'Scrivi la pagina di idea con una promessa e un bisogno',
      body: "La pagina dovrebbe dichiarare l'idea, perché conta, di cosa ha bisogno e chi vuoi che si unisca. Sii onesto su dove si trova l'idea — una scintilla, un prototipo, un prodotto.",
      joinOriginNote:
        "JoinOrigin crea automaticamente la pagina e la stanza quando pubblichi un'idea; il creatore controlla la stanza dall'inizio e può invitare, rimuovere e assegnare ruoli all'interno di Element. Pubblica l'idea e apri una stanza per la discussione attorno ad essa.",
    },
    {
      title: "Pubblica l'idea e lascia che la sua stanza si apra",
      body: 'La pubblicazione è il momento in cui l\'idea diventa trovabile. Su JoinOrigin, la pubblicazione crea automaticamente la stanza — non c\'è mai un passaggio "crea la chat dopo", e il creatore possiede la stanza dal secondo zero.',
      joinOriginNote:
        "Su JoinOrigin la pagina di idea e la sua stanza sono un'unica pubblicazione atomica. Puoi anche condividere la pagina pubblicamente e impostare la stanza negli strumenti che già usi.",
    },
    {
      title: 'Condividi il link di invito',
      body: "Il link di invito è il percorso più breve dall'interesse alla connessione: un link, un clic e una persona interessata arriva nella stanza. Mettilo ovunque si riuniscano le persone giuste.",
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro alla tua idea fa il lavoro.",
    },
    {
      title: 'Invita personalmente le prime persone interessate',
      body: "Gli inviti personali convertono meglio dei post pubblici. Scrivi a persone che corrispondono al pubblico dell'idea, condividi il link di invito e chiedi loro di portare un'altra persona che potrebbe interessarsi.",
      joinOriginNote:
        "JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    },
    {
      title: 'Ospita la prima conversazione nella stanza',
      body: "Le prime conversazioni decidono se un'idea ha slancio. Apri la stanza con una domanda chiara — qual è il problema, qual è il primo passo, cosa porta ciascuno di voi — e lascia che le persone rispondano.",
      joinOriginNote:
        "JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà all'idea una stanza dove l'interesse diventa conversazione, e il creatore possiede quella stanza. Inizia la conversazione ovunque si trovino già le tue persone.",
    },
    {
      title: "Raccogli feedback e perfeziona l'idea",
      body: "Chiedi a chi si è unito cosa li entusiasma, cosa li preoccupa e cosa farebbero per primi. Adatta la presentazione, l'ambito o il passo successivo in base alle loro risposte.",
      joinOriginNote:
        "JoinOrigin conserva la memoria condivisa di un'idea in un unico posto — note, decisioni e feedback nella stanza — così il perfezionamento è visibile invece di andare perso. Chiedi direttamente ai membri nella stanza dopo la prima settimana.",
    },
    {
      title: "Mantieni l'idea trovabile mentre cresce",
      body: "Rivedi la pagina mentre l'idea si sviluppa — aggiorna la promessa, i bisogni e il passo successivo così i nuovi arrivati vedono sempre la versione attuale. La crescita si accumula quando ogni membro può descrivere l'idea in una frase e condividere il suo link di invito.",
      joinOriginNote:
        "JoinOrigin mantiene la tua pagina di idea e la sua stanza collegate mentre l'interesse cresce — un unico posto dove la promessa, la conversazione e le persone sono visibili. Fatti scoprire e cresci.",
    },
  ],
};

export default content;
