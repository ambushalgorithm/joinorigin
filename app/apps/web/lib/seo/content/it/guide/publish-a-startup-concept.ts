import type { GuideContent } from '../../types';

/**
 * "Come pubblicare un concetto di startup" — guida L1 sempre attuale
 * (design §6.1, TASK-353), traduzione italiana (it).
 *
 * Scritta seguendo il flusso dello schermo prodotto §2: pubblica un concetto
 * di startup → pagina pubblica dell\'idea → Unisciti tramite link → stanza
 * creata automaticamente ALLA PUBBLICAZIONE → il creatore controlla la
 * stanza → crescita tramite feed/inviti. La pagina di idea è la promessa
 * pubblica del concetto; la stanza è dove i primi credenti, i potenziali
 * co-fondatori e i primi tester si riuniscono attorno alla startup. La
 * piattaforma è attiva: pubblicare un concetto crea ora la sua pagina e la
 * sua stanza. "Stanza" è legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'publish-a-startup-concept',
  title: 'Come pubblicare un concetto di startup: pagina di idea + stanza | JoinOrigin',
  description:
    "Pubblica un concetto di startup su JoinOrigin — che tu sia in fase di idea o stia già gestendo un'azienda — scrivi una pagina di idea pubblica, apri la sua stanza automaticamente e riunisci primi credenti, co-fondatori e primi tester attorno all'idea. Passi pratici da JoinOrigin.",
  intro: [
    "Ogni startup — che sia ancora un concetto sulla carta o già operativa con clienti — ha bisogno di persone più che di capitale: un fondatore che possa costruirla, un team che possa consegnarla e utenti che la testino. Una startup che nessuno può trovare non riunisce nessuna di queste cose. Pubblicare il concetto come una pagina di idea trovabile, poi aprire una stanza dove la conversazione può avvenire, è il primo passo onesto per costruire una startup — non la presentazione, non il logo, non il pitch — e funziona altrettanto bene per un'azienda esistente che vuole più credenti, co-fondatori e tester attorno a ciò che sta costruendo.",
    "Il ciclo di JoinOrigin funziona così: pubblichi un concetto di startup, appare la sua pagina di idea pubblica e la sua stanza viene creata automaticamente nel momento della pubblicazione. Le persone scoprono la pagina o seguono un link, l'iscrizione è un singolo clic e arrivano nella stanza — una stanza Matrix controllata dal creatore dove i primi credenti possono fare domande, i potenziali co-fondatori possono testare l'adattamento e i primi utenti possono dare feedback. Il creatore possiede la stanza dal secondo zero e decide chi entra e cosa succede al suo interno.",
    "Questa guida percorre la pubblicazione di un concetto di startup come farebbe un operatore — che il concetto sia completamente nuovo o l'azienda sia già operativa: comprimere il concetto in una frase, scrivere la pagina con segnali onesti, pubblicarla e aprire la stanza, condividerla con le community di fondatori, invitare primi credenti e tester, condurre conversazioni strutturate, usare la stanza per formare un team di prova e far confluire la stanza nel feed mentre il concetto viene validato.",
  ],
  dataPoints: [
    'Un concetto di startup compresso in una frase è più facile da condividere, testare e popolare di un lungo business plan.',
    "Su JoinOrigin, pubblicare un concetto crea automaticamente la sua stanza — la startup ha un posto per credenti e tester dall'inizio.",
    "Un link di invito è l'invito più semplice: un link, un clic e una persona interessata è nella stanza.",
    'JoinOrigin è un sistema operativo di comunità che aiuta le persone a trovare idee e le persone dietro di esse — pubblica il tuo concetto e la sua stanza si apre immediatamente.',
  ],
  faq: [
    {
      question:
        'In cosa un concetto di startup è diverso da una pagina di idea di piccola impresa?',
      answer:
        "Il formato della pagina è lo stesso, ma l'enfasi cambia: un'idea di piccola impresa è centrata su un cliente e un'offerta, mentre un concetto di startup è centrato su un problema ambizioso e sul team necessario a risolverlo. Una pagina di startup attira primi credenti, potenziali co-fondatori e primi tester invece di clienti locali.",
    },
    {
      question: 'Quando viene creata la stanza per il mio concetto di startup?',
      answer:
        "La stanza viene creata automaticamente nel momento in cui pubblichi il concetto. Il creatore possiede la stanza dal secondo zero e può invitare, rimuovere e assegnare ruoli all'interno di Element. Puoi anche aprire una stanza con gli strumenti che già usi e invitare le persone che condividono l'ambizione.",
    },
    {
      question: 'Chi dovrebbe unirsi alla stanza di un concetto di startup?',
      answer:
        "I primi credenti che condividono il problema, i potenziali co-fondatori che testano l'adattamento e i primi utenti disposti a provare una versione grezza. La stanza è dove trovi le persone che trasformano un concetto in un team — le stesse persone che le presentazioni calorose impiegherebbero mesi a raggiungere.",
    },
    {
      question: 'Cosa rende buona una pagina di concetto di startup?',
      answer:
        "Una frase onesta sul problema e sull'approccio, lo stadio del concetto e l'aiuto specifico di cui hai bisogno — un builder, un designer, un esperto di dominio, i primi tester. L'onestà sullo stadio attira le persone giuste; l'esagerazione non attira nessuno.",
    },
    {
      question: 'JoinOrigin può aiutarmi a pubblicare un concetto di startup oggi?',
      answer:
        "Sì. Pubblicare un concetto su JoinOrigin crea la sua pagina e la sua stanza in modo atomico — la stanza si apre nel momento in cui pubblichi e la controlli dall'inizio. Pubblica il concetto in un luogo pubblico e apri una stanza per la discussione; ogni nuovo membro che inviti espande la tua portata.",
    },
  ],
  sections: [
    "Comprimi il concetto in una frase. Riduci la startup al suo nucleo: il problema, l'approccio e a chi è rivolta. Se non riesci a dirlo in una frase, il concetto non è pronto per essere pubblicato. JoinOrigin è progettato attorno a pagine di idea trovabili, e una presentazione in una frase è il cuore della pagina. Scrivi la frase e provala su tre persone che capiscono il problema.",
    "Scrivi la pagina con segnali onesti. Dichiara il problema, l'approccio, lo stadio — idea, prototipo o prodotto — e l'aiuto specifico di cui hai bisogno. L'onestà attira le persone giuste. Pubblicare un concetto su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Prepara la pagina come un breve post pubblico e iterarla con il feedback.",
    "Pubblica il concetto e apri la sua stanza. La pubblicazione è il momento in cui il concetto diventa trovabile. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede. Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Pubblica il concetto pubblicamente e apri una stanza per la conversazione attorno ad esso.",
    "Condividi il concetto con le community di fondatori. Le startup crescono attraverso le reti di fondatori. Condividi la pagina di idea con gruppi di fondatori, community di startup, acceleratori e chiunque conosca il problema. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo concetto fa il lavoro.",
    "Invita primi credenti e tester. Invita le persone che condividono l'ambizione: potenziali co-fondatori, esperti di dominio e utenti disposti a provare una versione grezza. JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    "Conduci conversazioni strutturate nella stanza. Chiedi a chi si è unito cosa li entusiasma, cosa li preoccupa e cosa farebbero per primi. Una stanza di startup è un colloquio continuo — le risposte plasmano il concetto. JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà al concetto una stanza dove l'interesse diventa intuizione, e il creatore possiede quella stanza. Conduci le conversazioni direttamente nella stanza.",
    'Usa la stanza per formare un team di prova. Quando arrivano le persone giuste, proponi una piccola prova — un prototipo, una landing page o una sessione di lavoro — e osserva come il team lavora insieme. JoinOrigin dà alle community una stanza condivisa per il loro lavoro e i loro progetti, che è un luogo naturale dove una prova può emergere. Un piccolo prototipo reale è il test di adattamento più affidabile.',
    'Fai confluire la stanza nel feed mentre valuti. Continua a pubblicare aggiornamenti, mantieni viva la stanza e lascia che lo slancio del concetto diventi visibile a una rete più ampia. Il feed trasforma un concetto in prova che le persone ci tengono. Su JoinOrigin gli aggiornamenti della stanza confluiscono nel feed — il ciclo di crescita in cui ogni nuovo membro espande la superficie di scoperta. Fatti scoprire e cresci.',
  ],
  steps: [
    {
      title: 'Comprimi il concetto in una frase',
      body: "Riduci la startup al suo nucleo: il problema, l'approccio e a chi è rivolta. Se non riesci a dirlo in una frase, il concetto non è pronto per essere pubblicato.",
      joinOriginNote:
        'JoinOrigin è progettato attorno a pagine di idea trovabili, e una presentazione in una frase è il cuore della pagina. Scrivi la frase e provala su tre persone che capiscono il problema.',
    },
    {
      title: 'Scrivi la pagina con segnali onesti',
      body: "Dichiara il problema, l'approccio, lo stadio — idea, prototipo o prodotto — e l'aiuto specifico di cui hai bisogno. L'onestà attira le persone giuste.",
      joinOriginNote:
        "Pubblicare un concetto su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Prepara la pagina come un breve post pubblico e iterarla con il feedback.",
    },
    {
      title: 'Pubblica il concetto e apri la sua stanza',
      body: "La pubblicazione è il momento in cui il concetto diventa trovabile. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede.",
      joinOriginNote:
        "Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Pubblica il concetto pubblicamente e apri una stanza per la conversazione attorno ad esso.",
    },
    {
      title: 'Condividi il concetto con le community di fondatori',
      body: 'Le startup crescono attraverso le reti di fondatori. Condividi la pagina di idea con gruppi di fondatori, community di startup, acceleratori e chiunque conosca il problema.',
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo concetto fa il lavoro.",
    },
    {
      title: 'Invita primi credenti e tester',
      body: "Invita le persone che condividono l'ambizione: potenziali co-fondatori, esperti di dominio e utenti disposti a provare una versione grezza.",
      joinOriginNote:
        "JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un'idea possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni nuovo membro diventa un canale verso la propria rete.",
    },
    {
      title: 'Conduci conversazioni strutturate nella stanza',
      body: 'Chiedi a chi si è unito cosa li entusiasma, cosa li preoccupa e cosa farebbero per primi. Una stanza di startup è un colloquio continuo — le risposte plasmano il concetto.',
      joinOriginNote:
        "JoinOrigin non gestisce queste conversazioni; la stanza è tua da plasmare. La piattaforma dà al concetto una stanza dove l'interesse diventa intuizione, e il creatore possiede quella stanza. Conduci le conversazioni direttamente nella stanza.",
    },
    {
      title: 'Usa la stanza per formare un team di prova',
      body: 'Quando arrivano le persone giuste, proponi una piccola prova — un prototipo, una landing page o una sessione di lavoro — e osserva come il team lavora insieme.',
      joinOriginNote:
        'JoinOrigin dà alle community una stanza condivisa per il loro lavoro e i loro progetti, che è un luogo naturale dove una prova può emergere. Un piccolo prototipo reale è il test di adattamento più affidabile.',
    },
    {
      title: 'Fai confluire la stanza nel feed mentre valuti',
      body: 'Continua a pubblicare aggiornamenti, mantieni viva la stanza e lascia che lo slancio del concetto diventi visibile a una rete più ampia. Il feed trasforma un concetto in prova che le persone ci tengono.',
      joinOriginNote:
        'Su JoinOrigin gli aggiornamenti della stanza confluiscono nel feed — il ciclo di crescita in cui ogni nuovo membro espande la superficie di scoperta. Fatti scoprire e cresci.',
    },
  ],
};

export default content;
