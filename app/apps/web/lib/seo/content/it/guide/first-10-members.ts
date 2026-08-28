import type { GuideContent } from '../../types';

/**
 * "Come ottenere i tuoi primi 10 membri" — guida L1 sempre attuale
 * (design §6.1, TASK-326), traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: la stanza è la
 * superficie di adesione — i membri entrano tramite link di invito e si
 * uniscono alla stanza del gruppo, dove la community vive davvero. Il valore
 * di JoinOrigin è intrecciato nell'intro e in ogni passo (`joinOriginNote`
 * per passo), con un inquadramento onesto — JoinOrigin non recluta membri né
 * gestisce eventi. H1 singolo, struttura passo dopo passo, FAQ rispecchiate
 * 1:1 nel JSON-LD `FAQPage`. "Stanza" è legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'first-10-members',
  title: 'Come ottenere i tuoi primi 10 membri per un Origin nuovo o in crescita | JoinOrigin',
  description:
    'Ottieni i tuoi primi 10 membri senza un grande budget — che tu stia lanciando un Origin nuovo o rivitalizzandone una esistente, parti dalla tua rete personale, condividi link di invito e rendi la stanza il posto dove le persone vogliono entrare. Passi pratici da JoinOrigin.',
  intro: [
    'I primi dieci membri sono i più difficili da ottenere e i più importanti, perché definiscono la cultura di una community prima che abbia una reputazione per attrarre estranei — e sono altrettanto preziosi quando un Origin esistente è fermo o riparte, perché un nucleo impegnato è ciò che trasforma un gruppo silenzioso in uno vivo. Quel problema dei primi dieci è fondamentalmente un problema di connessione tra persone, ed è il problema centrale che JoinOrigin risolve.',
    "JoinOrigin è un sistema operativo di comunità costruito attorno al ciclo digitale connetti→unisciti→stanza: pubblichi un gruppo, la sua stanza viene creata automaticamente e i membri entrano tramite un link. La stanza è la superficie di adesione — ogni persona che clicca su Unisciti o segue un link di invito arriva nella stanza del gruppo, l'unico luogo dove la community vive e dove i nuovi membri si sentono subito connessi. JoinOrigin non recluta membri né gestisce eventi — quella parte è tua. La piattaforma rende scoperta e adesione molto più facili; la crescita iniziale arriva comunque dalla portata personale: le persone che inviti direttamente con un link, quelle che portano loro e quelle che restano perché la stanza sembra viva.",
    'Questa guida scompone il problema dei primi dieci membri in passi concreti — che tu stia iniziando un Origin nuovo o rivitalizzandone una esistente: partire dalle persone che già conosci, pubblicare il tuo gruppo così ha una stanza a cui unirsi, invitare personalmente con link, organizzare un primo incontro che trasformi i partecipanti in promotori e costruire una semplice abitudine di segnalazione così ogni membro porta il successivo — e ogni passo mostra dove JoinOrigin aiuta.',
  ],
  dataPoints: [
    'Gli inviti personali convertono a un tasso molto più alto dei post pubblici o degli annunci a pagamento.',
    'Un link di invito rimuove ogni barriera: un clic e un nuovo membro è nella stanza.',
    'Dieci membri attivi sono una prova sociale sufficiente perché la maggior parte delle persone senta che un gruppo è reale e vale la pena unirsi.',
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare o avviare Origins — non recluta membri né gestisce eventi.',
  ],
  faq: [
    {
      question: 'Perché proprio dieci membri?',
      answer:
        'Dieci è un punto di svolta: con dieci frequentatori hai una stanza vivace, un nucleo affidabile per la discussione e abbastanza prova sociale per attrarre nuovi arrivati che altrimenti esiterebbero. Sotto i dieci, la stanza sembra fragile.',
    },
    {
      question: 'Quanto tempo serve per ottenere i primi dieci membri?',
      answer:
        'Con inviti personali costanti e un buon primo incontro, la maggior parte degli organizzatori raggiunge dieci membri impegnati entro tre-sei settimane. La chiave è invitare ogni settimana — condividere link, seguire e mantenere la stanza attiva — non aspettare un grande lancio.',
    },
    {
      question: 'E se non ho una grande rete personale?',
      answer:
        'Inizia più piccolo: invita cinque persone che conosci, chiedi a ciascuna di portare una persona e pubblica in due gruppi di nicchia dove il tuo pubblico si riunisce già. Ogni membro che trattieni diventa un canale verso la propria rete — e ogni invito può essere un semplice link alla stanza.',
    },
    {
      question: 'JoinOrigin può aiutarmi a trovare membri?',
      answer:
        'Sì. JoinOrigin aiuta le persone a scoprire e avviare Origins — un luogo dove le persone che cercano un gruppo possono trovare il tuo e unirsi alla sua stanza tramite un link. I passi di questa guida — inviti personali e un ottimo primo incontro — sono i modi più affidabili per trovare i tuoi primi membri.',
    },
  ],
  sections: [
    'Elenca cinquanta persone che già conosci. Scrivi chiunque corrisponda allo scopo della community: amici, colleghi, compagni di classe, ex colleghi, vicini e conoscenti online. Ti servono circa cinque volte più nomi dei dieci che vuoi. JoinOrigin dà al tuo Origin una casa visibile e una stanza che le persone possono trovare — ma i primi nomi arrivano comunque dalle persone che conosci. Elenca cinquanta e tratta ognuno come una presentazione personale.',
    "Pubblica il tuo gruppo e apri la sua stanza. Una community a cui non puoi indicare non esiste ancora — e una la cui casa è dispersa tra chat ed elenchi è quasi altrettanto difficile da far crescere. Pubblica il gruppo con una missione chiara e lascia che la sua stanza venga creata automaticamente così c'è un luogo reale dove i membri possano arrivare. Pubblicare un gruppo su JoinOrigin crea automaticamente la sua stanza — la stanza è la superficie di adesione e il creatore la possiede dall'inizio. Se preferisci, imposta il tuo gruppo e la sua stanza negli strumenti che già usi prima di invitare chiunque.",
    "Invita personalmente con una richiesta specifica e un link. Invia un messaggio breve che nomina la community, la prima data o la prima conversazione e perché pensi che la apprezzerà — e includi il link di invito. I messaggi personali battono i post generici, e una data specifica batte una promessa vaga. JoinOrigin rimuove l'attrito dell'adesione una volta che le persone ti trovano — un link, un clic, dentro la stanza. Un messaggio personale breve con una data specifica e un link converte meglio di qualsiasi post pubblico.",
    'Chiedi a ogni invitato di portare una persona. Rendilo una parte normale della richiesta: "Porta un amico a cui potrebbe piacere". Gli inviti di segnalazione sono il modo in cui le piccole reti si compongono in community reali. JoinOrigin dà ai membri una casa condivisibile per la community — così le conversazioni di segnalazione puntano a un link reale e a una stanza reale. Rendi "porta un amico" parte della richiesta e dai loro il link da condividere.',
    "Organizza un primo incontro davvero buono. Spendi la tua energia sull'esperienza, non sul numero di partecipanti: un benvenuto caloroso, un formato chiaro e un'ora di fine definita. Le persone che godono del primo incontro porteranno i prossimi dieci. JoinOrigin non gestisce eventi — l'esperienza è tua. La piattaforma aiuta la community a formarsi attorno ad essa: una stanza dove i membri possono indicare dopo e mantenere viva la connessione.",
    "Invita ogni partecipante nella stanza. Alla fine dell'incontro, condividi il link di invito e aggiungi chiunque voglia restare. La stanza è dove la community vive tra un incontro e l'altro — un membro che si è unito alla stanza è un membro che probabilmente tornerà. JoinOrigin mantiene l'adesione e la comunicazione del tuo Origin in una stanza organizzata invece di un foglio di iscrizioni. Un semplice link alla stanza mantiene possibile il follow-up.",
    'Segui entro 24 ore con una prossima data. Ringrazia ogni partecipante, condividi un riepilogo di un paragrafo e conferma il prossimo incontro — nella stanza, dove tutti possono vederlo. Il follow-up è dove un partecipante occasionale diventa membro. Su JoinOrigin un follow-up ha una casa naturale — un unico posto dove vivono il riepilogo e la prossima data. Un ringraziamento personale entro 24 ore è ciò che converte un partecipante in membro.',
    'Rendi banale invitare gli altri. Dai ai membri una frase che possono ripetere e un link che possono condividere: "È un meetup mensile per nuovi fondatori per condividere lezioni — unisciti qui". Una descrizione breve e chiara è lo strumento di reclutamento più efficace. JoinOrigin permette a una community di essere descritta, trovata e raggiunta in un unico posto — i membri possono indicare le persone alla stanza invece di spiegarla. Dai ai membri una frase e un link che possono ripetere.',
  ],
  steps: [
    {
      title: 'Elenca cinquanta persone che già conosci',
      body: 'Scrivi chiunque corrisponda allo scopo della community: amici, colleghi, compagni di classe, ex colleghi, vicini e conoscenti online. Ti servono circa cinque volte più nomi dei dieci che vuoi.',
      joinOriginNote:
        'JoinOrigin dà al tuo Origin una casa visibile e una stanza che le persone possono trovare — ma i primi nomi arrivano comunque dalle persone che conosci. Elenca cinquanta e tratta ognuno come una presentazione personale.',
    },
    {
      title: 'Pubblica il tuo gruppo e apri la sua stanza',
      body: "Una community a cui non puoi indicare non esiste ancora — e una la cui casa è dispersa tra chat ed elenchi è quasi altrettanto difficile da far crescere. Pubblica il gruppo con una missione chiara e lascia che la sua stanza venga creata automaticamente così c'è un luogo reale dove i membri possano arrivare.",
      joinOriginNote:
        "Pubblicare un gruppo su JoinOrigin crea automaticamente la sua stanza — la stanza è la superficie di adesione e il creatore la possiede dall'inizio. Se preferisci, imposta il tuo gruppo e la sua stanza negli strumenti che già usi prima di invitare chiunque.",
    },
    {
      title: 'Invita personalmente con una richiesta specifica e un link',
      body: 'Invia un messaggio breve che nomina la community, la prima data o la prima conversazione e perché pensi che la apprezzerà — e includi il link di invito. I messaggi personali battono i post generici, e una data specifica batte una promessa vaga.',
      joinOriginNote:
        "JoinOrigin rimuove l'attrito dell'adesione una volta che le persone ti trovano — un link, un clic, dentro la stanza. Un messaggio personale breve con una data specifica e un link converte meglio di qualsiasi post pubblico.",
    },
    {
      title: 'Chiedi a ogni invitato di portare una persona',
      body: 'Rendilo una parte normale della richiesta: "Porta un amico a cui potrebbe piacere". Gli inviti di segnalazione sono il modo in cui le piccole reti si compongono in community reali.',
      joinOriginNote:
        'JoinOrigin dà ai membri una casa condivisibile per la community — così le conversazioni di segnalazione puntano a un link reale e a una stanza reale. Rendi "porta un amico" parte della richiesta e dai loro il link da condividere.',
    },
    {
      title: 'Organizza un primo incontro davvero buono',
      body: "Spendi la tua energia sull'esperienza, non sul numero di partecipanti: un benvenuto caloroso, un formato chiaro e un'ora di fine definita. Le persone che godono del primo incontro porteranno i prossimi dieci.",
      joinOriginNote:
        "JoinOrigin non gestisce eventi — l'esperienza è tua. La piattaforma aiuta la community a formarsi attorno ad essa: una stanza dove i membri possono indicare dopo e mantenere viva la connessione.",
    },
    {
      title: 'Invita ogni partecipante nella stanza',
      body: "Alla fine dell'incontro, condividi il link di invito e aggiungi chiunque voglia restare. La stanza è dove la community vive tra un incontro e l'altro — un membro che si è unito alla stanza è un membro che probabilmente tornerà.",
      joinOriginNote:
        "JoinOrigin mantiene l'adesione e la comunicazione del tuo Origin in una stanza organizzata invece di un foglio di iscrizioni. Un semplice link alla stanza mantiene possibile il follow-up.",
    },
    {
      title: 'Segui entro 24 ore con una prossima data',
      body: 'Ringrazia ogni partecipante, condividi un riepilogo di un paragrafo e conferma il prossimo incontro — nella stanza, dove tutti possono vederlo. Il follow-up è dove un partecipante occasionale diventa membro.',
      joinOriginNote:
        'Su JoinOrigin un follow-up ha una casa naturale — un unico posto dove vivono il riepilogo e la prossima data. Un ringraziamento personale entro 24 ore è ciò che converte un partecipante in membro.',
    },
    {
      title: 'Rendi banale invitare gli altri',
      body: 'Dai ai membri una frase che possono ripetere e un link che possono condividere: "È un meetup mensile per nuovi fondatori per condividere lezioni — unisciti qui". Una descrizione breve e chiara è lo strumento di reclutamento più efficace.',
      joinOriginNote:
        'JoinOrigin permette a una community di essere descritta, trovata e raggiunta in un unico posto — i membri possono indicare le persone alla stanza invece di spiegarla. Dai ai membri una frase e un link che possono ripetere.',
    },
  ],
};

export default content;
