import type { GuideContent } from '../../types';

/**
 * "Community ibride" — guida L1 sempre attuale (design §6.1, TASK-326),
 * traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: la stanza è ciò
 * che collega le parti online e (a valle) in presenza di una community
 * ibrida — una community, una stanza, due punti di ingresso. Il valore di
 * JoinOrigin è intrecciato nell'intro e in ogni passo (`joinOriginNote` per
 * passo), con un inquadramento onesto — JoinOrigin non fornisce strumenti
 * per eventi né gestisce eventi ibridi. H1 singolo, struttura passo dopo
 * passo, FAQ rispecchiate 1:1 nel JSON-LD `FAQPage`. "Stanza" è legata alla
 * stanza Matrix (§6.3) — i luoghi fisici sono descritti come sedi/spazi,
 * mai "stanze".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'hybrid-communities',
  title: 'Community ibride: come gestire insieme in presenza e online | JoinOrigin',
  description:
    'Gestisci una community ibrida dove la stanza collega i membri in presenza e online — che tu stia iniziando da zero o rendendo ibrida una community esistente, scegli gli strumenti giusti, progetta una partecipazione paritaria e mantieni coinvolti entrambi i pubblici. Da JoinOrigin.',
  intro: [
    "Una community ibrida riunisce le persone in due luoghi contemporaneamente — fisicamente in una sede e virtualmente attraverso uno schermo — e la vera sfida è di nuovo sulle persone: assicurarsi che entrambi i pubblici sentano di appartenere a un'unica community connessa, non a due separate. JoinOrigin è costruito proprio con quell'obiettivo di connessione tra persone, e il modello funziona tanto per una community che esiste già quanto per una che sta iniziando — un gruppo in presenza consolidato può aggiungere una metà online, e una community online può iniziare a riunirsi localmente.",
    "JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare, unirsi e avviare community — quindi un gruppo ibrido ha un'unica stanza che collega le parti online e (a valle) in presenza: i membri locali e remoti vedono la stessa community, lo stesso ritmo e gli stessi passi successivi. Nel modello digitale connetti→unisciti→stanza, la stanza è la superficie persistente dove vivono entrambe le metà della community tra un incontro e l'altro; l'evento in presenza è una conseguenza a valle che la stanza tiene insieme prima e dopo. JoinOrigin non fornisce strumenti per eventi né gestisce eventi ibridi — la piattaforma dà a qualsiasi community — ibrida inclusa — un'unica stanza dove i suoi membri restano connessi.",
    "Questa guida copre le decisioni pratiche che fanno riuscire le community ibride — per gruppi nuovi ed esistenti allo stesso modo: decidere se l'ibrido è il modello giusto, costruire la stanza che entrambi i pubblici condividono, scegliere un formato e strumenti adatti, progettare l'incontro così i membri in presenza e online vivono la stessa esperienza, gestire lo spazio così nessuna parte domina e mantenere una stanza persistente che tiene unita la community tra gli incontri. Ogni passo mostra dove JoinOrigin aiuta.",
  ],
  dataPoints: [
    'Una community ibrida è una community con due punti di ingresso, non due pubblici da servire separatamente.',
    'La stanza è il tessuto connettivo: un unico luogo condiviso dove entrambi i pubblici vedono gli stessi aggiornamenti, note e passi successivi.',
    "Strumenti semplici e affidabili — un link video, un documento condiviso — riducono l'attrito che uccide gli incontri ibridi.",
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare o avviare community; non fornisce strumenti per eventi né gestisce eventi ibridi.',
  ],
  faq: [
    {
      question: 'Quando una community dovrebbe diventare ibrida?',
      answer:
        "Quando parte del tuo pubblico non può affidabilmente partecipare in presenza — per distanza, impegni o mobilità — e la community vuole comunque un'identità condivisa. Se tutti possono incontrarsi localmente, incontrarsi in presenza è più semplice e spesso migliore.",
    },
    {
      question: 'Qual è la configurazione minima di strumenti per un incontro ibrido?',
      answer:
        'Un link per la videochiamata per i membri remoti, un documento condiviso per le note e una stanza dove entrambi i pubblici restano connessi tra gli incontri. Più strumenti aggiungono più punti di rottura; inizia minimalista e aggiungi solo ciò che la community chiede.',
    },
    {
      question: 'Come evito che i membri remoti si sentano spettatori?',
      answer:
        'Progetta per una partecipazione paritaria: fai un giro di presentazioni ibrido, chiama esplicitamente i membri remoti, condividi lo schermo per i contenuti visivi e usa un documento condiviso dove entrambe le parti possono scrivere. Assegna una persona a monitorare continuamente il lato remoto.',
    },
    {
      question: 'JoinOrigin può aiutarmi a gestire una community ibrida?',
      answer:
        "Sì. JoinOrigin aiuta le persone a trovare e avviare community — un'unica stanza dove i membri locali e remoti restano connessi. JoinOrigin non fornisce strumenti per eventi, quindi le pratiche ibride concrete di questa guida funzionano con gli strumenti che già possiedi.",
    },
  ],
  sections: [
    "Decidi se l'ibrido è il modello giusto. Scegli l'ibrido quando ha senso incontrarsi di persona. Se la maggior parte dei membri può incontrarsi localmente, incontrarsi in presenza rende il legame più forte — l'ibrido permette di costruire fiducia più velocemente e leggere le persone più a fondo. JoinOrigin è progettato per aiutare qualsiasi community a trovare e trattenere membri, ma la decisione sul formato è tua. Scegli l'ibrido solo quando ha senso incontrarsi di persona.",
    "Costruisci la stanza che collega entrambi i pubblici. Prima di ogni altra cosa, assicurati che la community abbia una stanza condivisa dove i membri remoti e locali parlano, condividono aggiornamenti e vedono gli stessi passi successivi. La stanza è ciò che rende l'ibrido una community unica invece di due. Su JoinOrigin ogni gruppo ha una stanza dalla pubblicazione — la superficie persistente che tiene insieme le parti online e in presenza. Imposta una stanza condivisa a cui entrambi i pubblici possano unirsi.",
    'Scegli uno strumento video affidabile e un documento condiviso. Mantieni lo stack minimale: un link per la videochiamata per i membri remoti, un documento per note e link condivisi e una voce di calendario. La complessità è la nemica degli incontri ibridi costanti. JoinOrigin non fornisce strumenti per eventi — mantieni lo stack minimale. La piattaforma è la stanza persistente dove vivono il link e il documento, non lo strumento per eventi in sé.',
    "Progetta l'agenda per due pubblici. Fai un giro di presentazioni che includa per nome i membri remoti, tieni i contenuti visivi su uno schermo condiviso e lascia spazio al lato online per parlare. Un'agenda ibrida nomina esplicitamente entrambi i pubblici. Su JoinOrigin entrambi i pubblici condividono una stanza di community, il che rende \"progettare per due pubblici\" un adattamento naturale. Nomi esplicitamente entrambi i pubblici nell'agenda.",
    'Assegna una persona ponte. Una persona monitora il lato remoto: saluta chi arriva in ritardo, dà la parola alle mani remote e trasmette ciò che la sede non coglie. Senza un ponte, il pubblico online diventa spettatore. JoinOrigin non fornisce personale per gli eventi — la persona ponte è un ruolo umano. La piattaforma mantiene la community organizzata in una stanza così il ponte ha un unico posto per vedere chi si è unito e cosa è stato condiviso.',
    'Gestisci lo spazio così entrambe le parti partecipano. Chiedi ai membri in presenza di parlare uno alla volta e di ripetere le domande per il microfono, fai sedere le persone vicino alla telecamera e alterna i turni tra sede e chiamata — con la stanza condivisa aperta per entrambi. JoinOrigin è progettato attorno a una connessione paritaria tra membri — lo stesso principio che fa funzionare la discussione ibrida. Alterna i turni tra sede e chiamata e ripeti le domande per il microfono.',
    "Mantieni viva la stanza tra gli incontri. La community vive nella stanza tra gli eventi: i membri remoti e locali condividono aggiornamenti, fanno domande e pianificano insieme lì. L'ibrido non è un formato di evento — è uno spazio condiviso continuo. Questo è il passo più vicino all'intento di design di JoinOrigin: un sistema operativo di comunità è una stanza persistente dove i membri remoti e locali condividono aggiornamenti e pianificano insieme. Una stanza condivisa funziona — JoinOrigin è quello spazio.",
    'Cattura e condividi il risultato nella stanza. Pubblica note, registrazioni e passi successivi nella stanza condivisa dopo ogni incontro. Un artefatto visibile mantiene connessi entrambi i pubblici e rende la community produttiva. Su JoinOrigin il risultato di una community vive in una stanza organizzata — note, registrazioni, passi successivi. Pubblicali nella stanza condivisa dopo ogni incontro.',
  ],
  steps: [
    {
      title: "Decidi se l'ibrido è il modello giusto",
      body: "Scegli l'ibrido quando ha senso incontrarsi di persona. Se la maggior parte dei membri può incontrarsi localmente, incontrarsi in presenza rende il legame più forte — l'ibrido permette di costruire fiducia più velocemente e leggere le persone più a fondo.",
      joinOriginNote:
        "JoinOrigin è progettato per aiutare qualsiasi community a trovare e trattenere membri, ma la decisione sul formato è tua. Scegli l'ibrido solo quando ha senso incontrarsi di persona.",
    },
    {
      title: 'Costruisci la stanza che collega entrambi i pubblici',
      body: "Prima di ogni altra cosa, assicurati che la community abbia una stanza condivisa dove i membri remoti e locali parlano, condividono aggiornamenti e vedono gli stessi passi successivi. La stanza è ciò che rende l'ibrido una community unica invece di due.",
      joinOriginNote:
        'Su JoinOrigin ogni gruppo ha una stanza dalla pubblicazione — la superficie persistente che tiene insieme le parti online e in presenza. Imposta una stanza condivisa a cui entrambi i pubblici possano unirsi.',
    },
    {
      title: 'Scegli uno strumento video affidabile e un documento condiviso',
      body: 'Mantieni lo stack minimale: un link per la videochiamata per i membri remoti, un documento per note e link condivisi e una voce di calendario. La complessità è la nemica degli incontri ibridi costanti.',
      joinOriginNote:
        'JoinOrigin non fornisce strumenti per eventi — mantieni lo stack minimale. La piattaforma è la stanza persistente dove vivono il link e il documento, non lo strumento per eventi in sé.',
    },
    {
      title: "Progetta l'agenda per due pubblici",
      body: "Fai un giro di presentazioni che includa per nome i membri remoti, tieni i contenuti visivi su uno schermo condiviso e lascia spazio al lato online per parlare. Un'agenda ibrida nomina esplicitamente entrambi i pubblici.",
      joinOriginNote:
        'Su JoinOrigin entrambi i pubblici condividono una stanza di community, il che rende "progettare per due pubblici" un adattamento naturale. Nomi esplicitamente entrambi i pubblici nell\'agenda.',
    },
    {
      title: 'Assegna una persona ponte',
      body: 'Una persona monitora il lato remoto: saluta chi arriva in ritardo, dà la parola alle mani remote e trasmette ciò che la sede non coglie. Senza un ponte, il pubblico online diventa spettatore.',
      joinOriginNote:
        'JoinOrigin non fornisce personale per gli eventi — la persona ponte è un ruolo umano. La piattaforma mantiene la community organizzata in una stanza così il ponte ha un unico posto per vedere chi si è unito e cosa è stato condiviso.',
    },
    {
      title: 'Gestisci lo spazio così entrambe le parti partecipano',
      body: 'Chiedi ai membri in presenza di parlare uno alla volta e di ripetere le domande per il microfono, fai sedere le persone vicino alla telecamera e alterna i turni tra sede e chiamata — con la stanza condivisa aperta per entrambi.',
      joinOriginNote:
        'JoinOrigin è progettato attorno a una connessione paritaria tra membri — lo stesso principio che fa funzionare la discussione ibrida. Alterna i turni tra sede e chiamata e ripeti le domande per il microfono.',
    },
    {
      title: 'Mantieni viva la stanza tra gli incontri',
      body: "La community vive nella stanza tra gli eventi: i membri remoti e locali condividono aggiornamenti, fanno domande e pianificano insieme lì. L'ibrido non è un formato di evento — è uno spazio condiviso continuo.",
      joinOriginNote:
        "Questo è il passo più vicino all'intento di design di JoinOrigin: un sistema operativo di comunità è una stanza persistente dove i membri remoti e locali condividono aggiornamenti e pianificano insieme. Una stanza condivisa funziona — JoinOrigin è quello spazio.",
    },
    {
      title: 'Cattura e condividi il risultato nella stanza',
      body: 'Pubblica note, registrazioni e passi successivi nella stanza condivisa dopo ogni incontro. Un artefatto visibile mantiene connessi entrambi i pubblici e rende la community produttiva.',
      joinOriginNote:
        'Su JoinOrigin il risultato di una community vive in una stanza organizzata — note, registrazioni, passi successivi. Pubblicali nella stanza condivisa dopo ogni incontro.',
    },
  ],
};

export default content;
