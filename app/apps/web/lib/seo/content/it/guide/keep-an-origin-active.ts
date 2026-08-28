import type { GuideContent } from '../../types';

/**
 * "Come mantenere attiva una community" — guida L1 sempre attuale
 * (design §6.1, TASK-326), traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: la stanza e la
 * sua attività (che alimenta il feed) sono la superficie di retention — la
 * community vive nella stanza tra gli incontri, e gli eventi in presenza
 * sono una conseguenza a valle. Il valore di JoinOrigin è intrecciato
 * nell'intro e in ogni passo (`joinOriginNote` per passo), con un
 * inquadramento onesto — JoinOrigin non gestisce community né fornisce
 * personale per eventi. H1 singolo, struttura passo dopo passo, FAQ
 * rispecchiate 1:1 nel JSON-LD `FAQPage`. "Stanza" è legata alla stanza
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'keep-an-origin-active',
  title: 'Come mantenere attivo e coinvolto un Origin | JoinOrigin',
  description:
    'Mantieni attivo il tuo Origin — che sia nuovo e stia trovando il suo ritmo o consolidato e in deriva — usa la stanza e il suo feed come superficie di retention, costruisci rituali, condividi il carico organizzativo e crea piccoli percorsi di contributo. Passi pratici da JoinOrigin.',
  intro: [
    "La maggior parte delle community non muore per un brutto lancio; muore di silenzio — il momento in cui le persone smettono di sentirsi connesse e si allontanano in silenzio. Mantenere attiva una community è quindi un problema di connessione tra persone: le persone restano quando sentono di appartenere, e sentono di appartenere quando c'è un luogo visibile e organizzato dove la community vive. È esattamente ciò che è JoinOrigin — e le stesse meccaniche valgono sia che la community abbia poche settimane e stia ancora trovando il suo ritmo sia che abbia anni e stia scivolando nel silenzio.",
    "JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare, avviare e organizzare Origins — e nel suo modello digitale la stanza è la superficie di retention: una stanza Matrix controllata dal creatore dove rituali, aggiornamenti e contributi restano visibili, e la cui attività confluisce nel feed che mantiene i membri connessi tra gli incontri. Gli eventi in presenza restano una conseguenza a valle di una community formata, mai il nucleo — la stanza e il suo feed sono ciò che mantiene viva la community giorno per giorno. JoinOrigin non gestisce community né fornisce personale per eventi — la piattaforma mantiene le community connesse tra gli incontri, e l'organizzazione è tua.",
    "Questa guida copre le meccaniche pratiche di una community sana e attiva — dalle prime settimane dopo il lancio a una community che esiste da anni: stabilire rituali che rendono la partecipazione un'abitudine, creare artefatti condivisi nella stanza, distribuire il carico organizzativo così nessuna singola persona si esaurisce, aprire piccoli percorsi di contributo così ogni membro può aggiungere valore e misurare i segnali che ti dicono se la community è davvero viva. Ogni passo si mappa su come JoinOrigin aiuta.",
  ],
  dataPoints: [
    "I rituali ricorrenti — un ritmo fisso nella stanza, un formato regolare, un artefatto condiviso — convertono l'interesse in abitudine.",
    "L'attività nella stanza tra gli incontri è ciò che mantiene i membri connessi; il silenzio è ciò che li allontana.",
    'I piccoli percorsi di contributo (una nota fissata, un ospite a rotazione, un riflettore sui membri) fanno sentire ai membri il senso di proprietà.',
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare, avviare e organizzare Origins; non gestisce community né fornisce personale per eventi.',
  ],
  faq: [
    {
      question: 'Con quale frequenza dovrebbe riunirsi una community attiva?',
      answer:
        'Mensile è la base più sostenibile per gli incontri in presenza; la stanza dovrebbe essere attiva settimanalmente — check-in, aggiornamenti e piccole conversazioni. La costanza conta più della frequenza: un ritmo settimanale affidabile nella stanza batte uno sporadico.',
    },
    {
      question: 'Cosa faccio quando il coinvolgimento cala?',
      answer:
        'Non farti prendere dal panico e non lanciare una grande campagna. Chiedi direttamente ai membri di cosa hanno bisogno, pubblica una semplice domanda nella stanza, organizza un incontro più piccolo e semplice e delega un ruolo a un membro. Piccoli cambiamenti reattivi rilanciano il coinvolgimento più velocemente del volume.',
    },
    {
      question: 'Come mantengo i membri coinvolti tra gli incontri?',
      answer:
        'Crea punti di contatto a basso sforzo nella stanza: un documento condiviso, un riflettore sui membri, un thread di check-in regolare o un aggiornamento "chi sta lavorando a cosa". L\'obiettivo è un battito visibile nella stanza e nel suo feed, non notifiche costanti.',
    },
    {
      question: 'JoinOrigin può aiutarmi a mantenere attiva il mio Origin?',
      answer:
        'Sì. JoinOrigin aiuta le persone a trovare, avviare e organizzare Origins — una stanza e un feed dove la community resta visibile tra gli incontri. Le pratiche di questa guida — rituali, ruoli condivisi e piccoli contributi — funzionano sulla piattaforma e con gli strumenti che già possiedi.',
    },
  ],
  sections: [
    'Definisci un rituale centrale. Scegli una pratica ricorrente su cui tutti possano contare: una riunione mensile, un check-in settimanale, una lettura condivisa o un aggiornamento di progetto. I rituali creano il battito che mantiene viva una community — e in una community digitale-first il rituale avviene nella stanza. Su JoinOrigin il ritmo di una community è visibile in una stanza organizzata — i membri sanno sempre qual è il prossimo rituale. Scegli una pratica ricorrente e proteggila.',
    'Crea un artefatto condiviso nella stanza. Avvia una nota fissata o un documento che cattura ciò che la community sta facendo — note delle riunioni, presentazioni dei membri, aggiornamenti di progetto. Un artefatto vivo mantiene i membri orientati tra gli incontri. JoinOrigin è la stanza condivisa dove note, presentazioni e aggiornamenti vivono accanto alla community — un artefatto vivo per design. Fissa un semplice documento condiviso nella stanza.',
    "Distribuisci il carico organizzativo. Recluta due o tre co-ospiti o aiutanti e ruota i piccoli ruoli: accoglienza, presa di note, scelta degli argomenti, contatto con la sede. La proprietà condivisa è la migliore difesa contro il burnout. JoinOrigin non fornisce personale né gestisce community — la proprietà condivisa è tua da costruire. La piattaforma dà ad aiutanti e organizzatori un'unica stanza per coordinarsi. Recluta due o tre co-ospiti e ruota i ruoli.",
    'Apri piccoli percorsi di contributo. Dai ai membri modi per aggiungere valore senza grandi impegni: un riflettore sui membri, un moderatore di discussione a rotazione, una playlist o una lista di letture condivisa o una sezione fissata "cerchiamo aiuto" nella stanza. Su JoinOrigin i membri hanno modi visibili per contribuire — una community dove aggiungere valore è facile. I riflettori sui membri e i moderatori a rotazione creano lo stesso senso di proprietà.',
    'Mantieni un ritmo di comunicazione prevedibile nella stanza. Invia un aggiornamento breve ogni settimana o ogni mese con un programma fisso, pubblicato nella stanza e che confluisce nel feed. La prevedibilità costruisce fiducia; il silenzio costruisce deriva. JoinOrigin mantiene il battito della community in una stanza — un aggiornamento, con un programma, dove tutti possono vederlo. Un aggiornamento settimanale breve costruisce fiducia.',
    "Osserva i segnali di coinvolgimento. Tieni traccia dell'attività nella stanza, della partecipazione ripetuta e del tasso di contributo. Una community sana fa crescere il suo tasso di ritorno prima della sua dimensione totale — concentrati sui membri che tornano nella stanza. Su JoinOrigin gli organizzatori possono vedere come sta andando la loro community in una stanza e un feed organizzati. Tieni traccia di attività, partecipazione ripetuta e tasso di contributo con un semplice foglio.",
    "Chiedi feedback regolarmente nella stanza. Usa un semplice sondaggio a una domanda dopo ogni incontro: cosa ti è piaciuto, cosa cambieresti. Agisci sulle risposte e di' alla community cosa hai cambiato. JoinOrigin raccoglie e conserva il feedback insieme alla community a cui appartiene — nella stanza. Un sondaggio a una domanda dopo ogni incontro funziona — poi agisci sulle risposte.",
    'Adatta il formato mentre la community matura. Ciò che funzionava per dieci membri potrebbe non andare bene per cinquanta. Rivedi formato, sede e cadenza ogni trimestre ed evolvi con intenzione invece di aggrapparti per abitudine. JoinOrigin aiuta le community a evolversi — una stanza dove i cambiamenti di formato e gli annunci raggiungono tutti. Rivedi il tuo formato e la tua sede ogni trimestre, di proposito.',
  ],
  steps: [
    {
      title: 'Definisci un rituale centrale',
      body: 'Scegli una pratica ricorrente su cui tutti possano contare: una riunione mensile, un check-in settimanale, una lettura condivisa o un aggiornamento di progetto. I rituali creano il battito che mantiene viva una community — e in una community digitale-first il rituale avviene nella stanza.',
      joinOriginNote:
        'Su JoinOrigin il ritmo di una community è visibile in una stanza organizzata — i membri sanno sempre qual è il prossimo rituale. Scegli una pratica ricorrente e proteggila.',
    },
    {
      title: 'Crea un artefatto condiviso nella stanza',
      body: 'Avvia una nota fissata o un documento che cattura ciò che la community sta facendo — note delle riunioni, presentazioni dei membri, aggiornamenti di progetto. Un artefatto vivo mantiene i membri orientati tra gli incontri.',
      joinOriginNote:
        'JoinOrigin è la stanza condivisa dove note, presentazioni e aggiornamenti vivono accanto alla community — un artefatto vivo per design. Fissa un semplice documento condiviso nella stanza.',
    },
    {
      title: 'Distribuisci il carico organizzativo',
      body: 'Recluta due o tre co-ospiti o aiutanti e ruota i piccoli ruoli: accoglienza, presa di note, scelta degli argomenti, contatto con la sede. La proprietà condivisa è la migliore difesa contro il burnout.',
      joinOriginNote:
        "JoinOrigin non fornisce personale né gestisce community — la proprietà condivisa è tua da costruire. La piattaforma dà ad aiutanti e organizzatori un'unica stanza per coordinarsi. Recluta due o tre co-ospiti e ruota i ruoli.",
    },
    {
      title: 'Apri piccoli percorsi di contributo',
      body: 'Dai ai membri modi per aggiungere valore senza grandi impegni: un riflettore sui membri, un moderatore di discussione a rotazione, una playlist o una lista di letture condivisa o una sezione fissata "cerchiamo aiuto" nella stanza.',
      joinOriginNote:
        'Su JoinOrigin i membri hanno modi visibili per contribuire — una community dove aggiungere valore è facile. I riflettori sui membri e i moderatori a rotazione creano lo stesso senso di proprietà.',
    },
    {
      title: 'Mantieni un ritmo di comunicazione prevedibile nella stanza',
      body: 'Invia un aggiornamento breve ogni settimana o ogni mese con un programma fisso, pubblicato nella stanza e che confluisce nel feed. La prevedibilità costruisce fiducia; il silenzio costruisce deriva.',
      joinOriginNote:
        'JoinOrigin mantiene il battito della community in una stanza — un aggiornamento, con un programma, dove tutti possono vederlo. Un aggiornamento settimanale breve costruisce fiducia.',
    },
    {
      title: 'Osserva i segnali di coinvolgimento',
      body: "Tieni traccia dell'attività nella stanza, della partecipazione ripetuta e del tasso di contributo. Una community sana fa crescere il suo tasso di ritorno prima della sua dimensione totale — concentrati sui membri che tornano nella stanza.",
      joinOriginNote:
        'Su JoinOrigin gli organizzatori possono vedere come sta andando la loro community in una stanza e un feed organizzati. Tieni traccia di attività, partecipazione ripetuta e tasso di contributo con un semplice foglio.',
    },
    {
      title: 'Chiedi feedback regolarmente nella stanza',
      body: "Usa un semplice sondaggio a una domanda dopo ogni incontro: cosa ti è piaciuto, cosa cambieresti. Agisci sulle risposte e di' alla community cosa hai cambiato.",
      joinOriginNote:
        'JoinOrigin raccoglie e conserva il feedback insieme alla community a cui appartiene — nella stanza. Un sondaggio a una domanda dopo ogni incontro funziona — poi agisci sulle risposte.',
    },
    {
      title: 'Adatta il formato mentre la community matura',
      body: 'Ciò che funzionava per dieci membri potrebbe non andare bene per cinquanta. Rivedi formato, sede e cadenza ogni trimestre ed evolvi con intenzione invece di aggrapparti per abitudine.',
      joinOriginNote:
        'JoinOrigin aiuta le community a evolversi — una stanza dove i cambiamenti di formato e gli annunci raggiungono tutti. Rivedi il tuo formato e la tua sede ogni trimestre, di proposito.',
    },
  ],
};

export default content;
