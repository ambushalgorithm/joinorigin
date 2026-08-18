import type { GuideContent } from '../../types';

/**
 * "Come pubblicare un\'idea di piccola impresa" — guida L1 sempre attuale
 * (design §6.1, TASK-353), traduzione italiana (it).
 *
 * Scritta seguendo il flusso dello schermo prodotto §2: pubblica un\'idea di
 * piccola impresa → pagina pubblica dell\'idea → Unisciti tramite link →
 * stanza creata automaticamente ALLA PUBBLICAZIONE → il creatore controlla
 * la stanza → crescita tramite feed/inviti. La pagina di idea è la promessa
 * della vetrina; la stanza è dove clienti, collaboratori e primi credenti si
 * riuniscono attorno all\'impresa. La piattaforma è attiva: pubblicare
 * un\'idea crea ora la sua pagina e la sua stanza. "Stanza" è legata alla
 * stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'publish-a-small-business-idea',
  title: "Come pubblicare un'idea di piccola impresa: pagina di idea + stanza | JoinOrigin",
  description:
    "Pubblica un'idea di piccola impresa su JoinOrigin — che tu stia lanciando una nuova impresa o sia un'attività esistente che condivide ciò che offre — scrivi una pagina di idea pubblica, apri la sua stanza automaticamente e invita clienti e collaboratori che vogliono vederla realizzata. Passi pratici da JoinOrigin.",
  intro: [
    'Le piccole imprese spesso iniziano allo stesso modo — qualcuno nota un problema reale nel proprio quartiere, sul posto di lavoro o in un hobby, e non smette di pensare alla soluzione — ma molte altre sono già operative: un negozio in funzione, un servizio che lavora, un prodotto con clienti. Che la tua impresa sia ancora una scintilla o serva già persone, il passo successivo è lo stesso: trasformare ciò che hai in qualcosa che le altre persone possano vedere, a cui possano reagire e a cui possano unirsi. Una piccola impresa ha bisogno di una casa pubblica e di persone attorno — prima di avere bisogno di una vetrina, e molto dopo che una esiste.',
    "Il ciclo di JoinOrigin funziona così: pubblichi un'idea di piccola impresa, appare la sua pagina di idea pubblica e la sua stanza viene creata automaticamente nel momento della pubblicazione. Le persone scoprono la pagina o seguono un link, l'iscrizione è un singolo clic e arrivano nella stanza — una stanza Matrix controllata dal creatore dove clienti, collaboratori e primi credenti possono fare domande, condividere feedback e coinvolgersi. Il creatore possiede la stanza dal secondo zero e decide chi entra e cosa succede al suo interno.",
    "Questa guida percorre la pubblicazione di un'idea di piccola impresa come apriresti un negozio: nominare il cliente e il problema, scrivere la pagina di idea come una vetrina, pubblicarla e aprire la stanza, condividere la pagina con la tua rete locale, invitare i primi clienti e collaboratori, ascoltare nella stanza, perfezionare l'offerta dai feedback reali e far crescere la stanza fino a diventare la tua prima base di clienti.",
  ],
  dataPoints: [
    'Le idee di piccola impresa più chiare partono da un cliente specifico e un problema specifico, non da un pubblico generico.',
    "Su JoinOrigin, pubblicare un'idea crea automaticamente la sua stanza — l'impresa ha un posto per clienti e collaboratori dall'inizio.",
    "Un link di invito è l'invito più semplice: un link, un clic e una persona interessata è nella stanza.",
    'JoinOrigin è un sistema operativo di comunità che aiuta le persone a trovare idee e le persone dietro di esse — pubblica la tua idea e la sua stanza si apre immediatamente.',
  ],
  faq: [
    {
      question: "In cosa un'idea di piccola impresa è diversa da una normale pagina di idea?",
      answer:
        "Il formato della pagina è lo stesso, ma la promessa è più netta: un cliente, un problema e un'offerta. Dove un'idea generale invita collaboratori, una pagina di idea di piccola impresa invita i primi clienti e i credenti locali — persone che comprerebbero davvero, farebbero da referenza o ti aiuterebbero a iniziare o far crescere ciò che già opera.",
    },
    {
      question: 'Quando viene creata la stanza per la mia idea di impresa?',
      answer:
        "La stanza viene creata automaticamente nel momento in cui pubblichi l'idea. Il creatore possiede la stanza dal secondo zero e può invitare, rimuovere e assegnare ruoli all'interno di Element. Puoi anche aprire una stanza con gli strumenti che già usi e invitare le persone a cui il problema sta a cuore.",
    },
    {
      question: "Chi dovrebbe unirsi alla stanza di un'idea di piccola impresa?",
      answer:
        "I primi clienti, le persone con la competenza che ti manca e i locali che possono farti da referenza. La stanza è dove testi la domanda, perfezioni l'offerta e trovi i primi credenti — prima di spendere soldi in inventario, affitti o marketing.",
    },
    {
      question: 'Cosa dovrebbe promettere la pagina di idea?',
      answer:
        'Un cliente specifico, un problema e ciò che intendi offrire. Sii onesto sullo stadio — "sto testando questa idea e voglio parlare con persone che sentono questo problema" è una promessa forte. La pagina decide se le persone giuste cliccano su Unisciti.',
    },
    {
      question: "JoinOrigin può aiutarmi a pubblicare un'idea di piccola impresa oggi?",
      answer:
        "Sì. Pubblicare un'idea su JoinOrigin crea la sua pagina e la sua stanza in modo atomico — la stanza si apre nel momento in cui pubblichi e la controlli dall'inizio. Pubblica l'idea in un luogo pubblico e apri una stanza per la discussione; ogni nuovo membro che inviti espande la tua portata.",
    },
  ],
  sections: [
    'Nomina il cliente e il problema. Prima di scrivere qualsiasi cosa, nomina la persona specifica che sente questo problema e descrivilo con le sue parole. Una piccola impresa riesce quando serve bene un bisogno reale. JoinOrigin è progettato attorno a pagine di idea trovabili, e le pagine più chiare partono da un cliente specifico. Scrivi cliente e problema e provali su tre persone che corrispondono.',
    "Scrivi la pagina di idea come una vetrina. La pagina dovrebbe mostrare cosa stai offrendo, a chi è rivolta, quanto costa in tempo o denaro e in quale stadio si trova l'idea. Mantienila concreta — un pop-up, un prodotto, un servizio, un negozio. Pubblicare un'idea su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Prepara la pagina come un breve post pubblico e perfezionala con il feedback.",
    "Pubblica l'idea e apri la sua stanza. La pubblicazione è il momento in cui l'idea di impresa diventa trovabile. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede. Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Pubblica l'idea pubblicamente e apri una stanza per la conversazione attorno ad essa.",
    "Condividi la pagina con la tua rete locale. Le piccole imprese crescono attraverso la portata locale. Condividi la pagina di idea con vicini, colleghi, gruppi locali e chiunque conosca il problema in prima persona. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro alla tua idea fa il lavoro.",
    "Invita i primi clienti e collaboratori. Invita le persone che comprerebbero o aiuterebbero davvero: potenziali clienti, qualcuno con una competenza che ti manca, un mentore o un organizzatore locale. JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    "Ascolta nella stanza. Chiedi a chi si è unito come userebbe l'offerta, quanto pagherebbe e cosa lo ferma. La stanza è dove si mostra la domanda reale — o non si mostra. JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà all'idea di impresa una stanza dove l'interesse diventa feedback, e il creatore possiede quella stanza. Chiedi direttamente ai membri nella stanza.",
    "Perfeziona l'offerta dai feedback reali. Adatta prezzo, ambito, canale o promessa in base a ciò che dicono i membri. Le piccole imprese si costruiscono con piccole iterazioni. JoinOrigin conserva la memoria condivisa di un'idea in un unico posto — note, decisioni e feedback nella stanza — così il perfezionamento è visibile invece di andare perso. Cambia una cosa alla volta e osserva la risposta.",
    "Trasforma la stanza nella tua prima base di clienti. Continua a invitare, a condividere aggiornamenti e a mantenere viva la stanza mentre l'offerta si consolida. Le persone nella stanza sono i tuoi primi clienti e i tuoi primi promotori. JoinOrigin mantiene la tua pagina di idea e la sua stanza collegate mentre l'impresa cresce — un unico posto dove la promessa, la conversazione e le persone sono visibili. Fatti scoprire e cresci.",
  ],
  steps: [
    {
      title: 'Nomina il cliente e il problema',
      body: 'Prima di scrivere qualsiasi cosa, nomina la persona specifica che sente questo problema e descrivilo con le sue parole. Una piccola impresa riesce quando serve bene un bisogno reale.',
      joinOriginNote:
        'JoinOrigin è progettato attorno a pagine di idea trovabili, e le pagine più chiare partono da un cliente specifico. Scrivi cliente e problema e provali su tre persone che corrispondono.',
    },
    {
      title: 'Scrivi la pagina di idea come una vetrina',
      body: "La pagina dovrebbe mostrare cosa stai offrendo, a chi è rivolta, quanto costa in tempo o denaro e in quale stadio si trova l'idea. Mantienila concreta — un pop-up, un prodotto, un servizio, un negozio.",
      joinOriginNote:
        "Pubblicare un'idea su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Prepara la pagina come un breve post pubblico e perfezionala con il feedback.",
    },
    {
      title: "Pubblica l'idea e apri la sua stanza",
      body: "La pubblicazione è il momento in cui l'idea di impresa diventa trovabile. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede.",
      joinOriginNote:
        "Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Pubblica l'idea pubblicamente e apri una stanza per la conversazione attorno ad essa.",
    },
    {
      title: 'Condividi la pagina con la tua rete locale',
      body: 'Le piccole imprese crescono attraverso la portata locale. Condividi la pagina di idea con vicini, colleghi, gruppi locali e chiunque conosca il problema in prima persona.',
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro alla tua idea fa il lavoro.",
    },
    {
      title: 'Invita i primi clienti e collaboratori',
      body: 'Invita le persone che comprerebbero o aiuterebbero davvero: potenziali clienti, qualcuno con una competenza che ti manca, un mentore o un organizzatore locale.',
      joinOriginNote:
        "JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    },
    {
      title: 'Ascolta nella stanza',
      body: "Chiedi a chi si è unito come userebbe l'offerta, quanto pagherebbe e cosa lo ferma. La stanza è dove si mostra la domanda reale — o non si mostra.",
      joinOriginNote:
        "JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà all'idea di impresa una stanza dove l'interesse diventa feedback, e il creatore possiede quella stanza. Chiedi direttamente ai membri nella stanza.",
    },
    {
      title: "Perfeziona l'offerta dai feedback reali",
      body: 'Adatta prezzo, ambito, canale o promessa in base a ciò che dicono i membri. Le piccole imprese si costruiscono con piccole iterazioni.',
      joinOriginNote:
        "JoinOrigin conserva la memoria condivisa di un'idea in un unico posto — note, decisioni e feedback nella stanza — così il perfezionamento è visibile invece di andare perso. Cambia una cosa alla volta e osserva la risposta.",
    },
    {
      title: 'Trasforma la stanza nella tua prima base di clienti',
      body: "Continua a invitare, a condividere aggiornamenti e a mantenere viva la stanza mentre l'offerta si consolida. Le persone nella stanza sono i tuoi primi clienti e i tuoi primi promotori.",
      joinOriginNote:
        "JoinOrigin mantiene la tua pagina di idea e la sua stanza collegate mentre l'impresa cresce — un unico posto dove la promessa, la conversazione e le persone sono visibili. Fatti scoprire e cresci.",
    },
  ],
};

export default content;
