import type { GuideContent } from '../../types';

/**
 * "Come avviare una community" — guida L1 sempre attuale (design §6.1,
 * TASK-326), traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: pubblica il
 * gruppo → stanza creata automaticamente alla pubblicazione → i membri
 * entrano tramite link; le indicazioni su sedi/formati restano come
 * conseguenza a valle, mai il nucleo. Il valore di JoinOrigin è intrecciato
 * nell'intro e in ogni passo (`joinOriginNote` per passo), con un
 * inquadramento onesto — JoinOrigin non gestisce eventi locali. H1 singolo,
 * struttura passo dopo passo, FAQ rispecchiate 1:1 nel JSON-LD `FAQPage`.
 * "Stanza" è legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'start-a-community',
  title: 'Come avviare una community: una guida passo dopo passo | JoinOrigin',
  description:
    "Impara come avviare una community — o dare a una esistente un'unica casa digitale — pubblica un gruppo, apri la sua stanza e porta i membri tramite un link di invito. Passi pratici da JoinOrigin.",
  intro: [
    "La parte più difficile dell'avviare una community raramente è la sede, l'agenda o il budget — è trovare le prime persone che condividono il tuo interesse e dare loro un unico posto chiaro per connettersi. È esattamente il problema che JoinOrigin risolve.",
    "JoinOrigin è un sistema operativo di comunità costruito attorno al ciclo digitale: pubblichi un gruppo, la sua stanza viene creata automaticamente e i membri entrano tramite un link. La stanza è dove la community vive davvero — una stanza Matrix controllata dal creatore dove i membri parlano, condividono aggiornamenti e pianificano insieme dal primo giorno, invece di disperdersi tra fogli di calcolo, messaggi sparsi e moduli di iscrizione. Gli eventi in presenza esistono solo come conseguenza a valle: una volta che un gruppo si forma e la sua stanza è viva, i membri possono scegliere di incontrarsi di persona — e JoinOrigin non gestisce eventi locali. L'intero scopo della piattaforma è connettere persone che altrimenti non si incontrerebbero mai, motivo per cui ogni passo di questa guida corrisponde a qualcosa con cui JoinOrigin aiuta.",
    "L'approccio funziona per qualsiasi tipo di community: un circolo di fondatori, un club del libro, un gruppo di corsa locale, una rete di piccole imprese o una community professionale online — e funziona sia che tu stia partendo da zero sia che stia formalizzando un gruppo che si incontra già informalmente. Il principio centrale è semplice — le persone si uniscono per una promessa chiara e restano perché l'esperienza mantiene affidabilmente quella promessa. Non ti serve un grande budget, una sede o un pubblico esistente per iniziare; ti servono uno scopo chiaro, un primo passo realistico e la disciplina di ripeterlo.",
  ],
  dataPoints: [
    'La maggior parte delle community di successo inizia con un pubblico ristretto e specifico, non "tutti gli interessati".',
    'Pubblicare un gruppo crea la sua stanza all\'istante — non c\'è mai un passaggio "crea la chat dopo".',
    "Un link di invito è l'invito più semplice: un link, un clic e un nuovo membro è nella stanza.",
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare o avviare community — non gestisce eventi locali né dichiara personale locale.',
  ],
  faq: [
    {
      question: 'Quanto tempo serve per avviare una community?',
      answer:
        "Puoi pubblicare un gruppo e aprire la sua stanza entro poche settimane se mantieni l'ambito piccolo: uno scopo, un link di invito e un flusso costante di inviti personali. La community stessa richiede alcuni mesi di partecipazione costante nella stanza prima di sentirsi consolidata.",
    },
    {
      question: 'Mi servono soldi o una sede per iniziare?',
      answer:
        'No. Il nucleo digitale di una community — un gruppo pubblicato e la sua stanza — non costa nulla e non richiede una sede. Molti gruppi scelgono poi di incontrarsi di persona; biblioteche, caffè, parchi e lounge di coworking ospitano i primi incontri gratuitamente nella maggior parte delle città.',
    },
    {
      question: "Qual è l'errore più comune quando si avvia una community?",
      answer:
        'Cercare di servire tutti. Una community con uno scopo vago attira pochi membri impegnati. Definisci un pubblico specifico e un risultato chiaro, mettilo sulla pagina del gruppo e lascia che la community si evolva da lì.',
    },
    {
      question: 'Come può JoinOrigin aiutarmi ad avviare una community?',
      answer:
        'Pubblicare un gruppo su JoinOrigin crea automaticamente la sua stanza e i membri entrano tramite un link — una casa digitale organizzata per lo scopo, le persone e la conversazione di una community. JoinOrigin non gestisce eventi locali, quindi i passi pratici di questa guida funzionano sulla piattaforma e con gli strumenti che già possiedi.',
    },
  ],
  sections: [
    'Definisci uno scopo chiaro. Decidi a chi è rivolta la community, quale problema risolve e come appare un membro di successo. Scrivi una missione di una frase come "un gruppo per nuovi fondatori a Milano per condividere lezioni della fase iniziale". JoinOrigin dà al tuo scopo una casa — una pagina pubblica del gruppo dove missione, pubblico e promessa sono visibili a chiunque cerchi un gruppo come il tuo. Scrivi la missione e tienila davanti a ogni invito.',
    'Pubblica il gruppo e apri la sua stanza. Il nucleo digitale di una community è un gruppo pubblicato con una stanza dove i membri possono parlare. Su JoinOrigin, pubblicare un gruppo crea automaticamente la sua stanza — il creatore la possiede dal secondo zero e può invitare, rimuovere e assegnare ruoli all\'interno di Element. Su JoinOrigin non c\'è un passaggio "crea la chat dopo": pubblica il gruppo e la stanza esiste immediatamente, con il creatore come proprietario. Se preferisci, imposta la casa del gruppo e la sua stanza negli strumenti che già usi.',
    "Condividi il tuo link di invito. Un link di invito è l'invito più semplice che esista: un link, un clic e un nuovo membro arriva nella stanza. Metti il link ovunque — la pagina del tuo gruppo, i messaggi personali e i luoghi dove il tuo pubblico si riunisce già. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo gruppo fa il lavoro.",
    "Invita personalmente le prime dieci persone. Gli inviti personali convertono molto meglio dei post pubblici. Scrivi ad amici, colleghi e conoscenti che corrispondono al pubblico, condividi il link di invito e chiedi loro di portare un'altra persona. JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano una community possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni membro che inviti diventa un canale verso la propria rete.",
    "Scegli un formato e una cadenza (una scelta a valle). Una volta che il gruppo si sta formando, scegli un formato ricorrente — una discussione mensile, una sessione di lavoro settimanale, un intervento o una passeggiata sociale. Il ricorrente batte l'una tantum perché le abitudini trasformano gli estranei in membri. Questa è una scelta a valle: il gruppo può incontrarsi di persona più tardi, ma la stanza è già la casa della community. Su JoinOrigin gli organizzatori possono descrivere il loro formato una volta e i membri possono vedere cosa aspettarsi prima di unirsi — il che riduce l'esitazione che ferma i principianti. Scegli il tuo formato e dichiaralo in ogni invito.",
    "Organizza un ottimo primo incontro. Se i membri scelgono di incontrarsi di persona — arriva presto, saluta ogni persona, fai un breve giro di presentazioni e chiudi con una data successiva chiara. L'obiettivo del primo incontro non è la dimensione; è che tutti se ne vadano volendo tornare. JoinOrigin non fornisce personale né gestisce gli incontri — l'esperienza è tua da progettare. La piattaforma aiuta la community a formarsi attorno ad essa: una stanza condivisa dove vivono data, riepilogo e passi successivi.",
    "Raccogli feedback e itera. Dopo le prime settimane, chiedi ai membri cosa vogliono di più o di meno — nella stanza e agli incontri. Adatta formato, orario o sede in base alle loro risposte, non a ciò che avevi immaginato. JoinOrigin conserva la memoria condivisa di una community in un unico posto — note, decisioni e ciò che i membri hanno chiesto — così l'iterazione è visibile invece di andare persa. Chiedi direttamente ai membri nella stanza dopo ogni incontro.",
    "Pubblica un ritmo costante e cresci lentamente. Mantieni lo stesso giorno e formato per diversi mesi prima di espandere. La crescita si accumula attraverso le segnalazioni quando ogni membro può descrivere cos'è la community in una frase e condividere il suo link di invito. JoinOrigin aiuta la tua community a restare trovabile e connessa mentre cresce — un unico posto dove ritmo, promessa, stanza e persone sono visibili. Fatti scoprire e cresci.",
  ],
  steps: [
    {
      title: 'Definisci uno scopo chiaro',
      body: 'Decidi a chi è rivolta la community, quale problema risolve e come appare un membro di successo. Scrivi una missione di una frase come "un gruppo per nuovi fondatori a Milano per condividere lezioni della fase iniziale".',
      joinOriginNote:
        'JoinOrigin dà al tuo scopo una casa — una pagina pubblica del gruppo dove missione, pubblico e promessa sono visibili a chiunque cerchi un gruppo come il tuo. Scrivi la missione e tienila davanti a ogni invito.',
    },
    {
      title: 'Pubblica il gruppo e apri la sua stanza',
      body: "Il nucleo digitale di una community è un gruppo pubblicato con una stanza dove i membri possono parlare. Su JoinOrigin, pubblicare un gruppo crea automaticamente la sua stanza — il creatore la possiede dal secondo zero e può invitare, rimuovere e assegnare ruoli all'interno di Element.",
      joinOriginNote:
        'Su JoinOrigin non c\'è un passaggio "crea la chat dopo": pubblica il gruppo e la stanza esiste immediatamente, con il creatore come proprietario. Se preferisci, imposta la casa del gruppo e la sua stanza negli strumenti che già usi.',
    },
    {
      title: 'Condividi il tuo link di invito',
      body: "Un link di invito è l'invito più semplice che esista: un link, un clic e un nuovo membro arriva nella stanza. Metti il link ovunque — la pagina del tuo gruppo, i messaggi personali e i luoghi dove il tuo pubblico si riunisce già.",
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo gruppo fa il lavoro.",
    },
    {
      title: 'Invita personalmente le prime dieci persone',
      body: "Gli inviti personali convertono molto meglio dei post pubblici. Scrivi ad amici, colleghi e conoscenti che corrispondono al pubblico, condividi il link di invito e chiedi loro di portare un'altra persona.",
      joinOriginNote:
        'JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano una community possono trovare la tua e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni membro che inviti diventa un canale verso la propria rete.',
    },
    {
      title: 'Scegli un formato e una cadenza (una scelta a valle)',
      body: "Una volta che il gruppo si sta formando, scegli un formato ricorrente — una discussione mensile, una sessione di lavoro settimanale, un intervento o una passeggiata sociale. Il ricorrente batte l'una tantum perché le abitudini trasformano gli estranei in membri. Questa è una scelta a valle: il gruppo può incontrarsi di persona più tardi, ma la stanza è già la casa della community.",
      joinOriginNote:
        "Su JoinOrigin gli organizzatori possono descrivere il loro formato una volta e i membri possono vedere cosa aspettarsi prima di unirsi — il che riduce l'esitazione che ferma i principianti. Scegli il tuo formato e dichiaralo in ogni invito.",
    },
    {
      title: 'Organizza un ottimo primo incontro',
      body: "Se i membri scelgono di incontrarsi di persona — arriva presto, saluta ogni persona, fai un breve giro di presentazioni e chiudi con una data successiva chiara. L'obiettivo del primo incontro non è la dimensione; è che tutti se ne vadano volendo tornare.",
      joinOriginNote:
        "JoinOrigin non fornisce personale né gestisce gli incontri — l'esperienza è tua da progettare. La piattaforma aiuta la community a formarsi attorno ad essa: una stanza condivisa dove vivono data, riepilogo e passi successivi.",
    },
    {
      title: 'Raccogli feedback e itera',
      body: 'Dopo le prime settimane, chiedi ai membri cosa vogliono di più o di meno — nella stanza e agli incontri. Adatta formato, orario o sede in base alle loro risposte, non a ciò che avevi immaginato.',
      joinOriginNote:
        "JoinOrigin conserva la memoria condivisa di una community in un unico posto — note, decisioni e ciò che i membri hanno chiesto — così l'iterazione è visibile invece di andare persa. Chiedi direttamente ai membri nella stanza dopo ogni incontro.",
    },
    {
      title: 'Pubblica un ritmo costante e cresci lentamente',
      body: "Mantieni lo stesso giorno e formato per diversi mesi prima di espandere. La crescita si accumula attraverso le segnalazioni quando ogni membro può descrivere cos'è la community in una frase e condividere il suo link di invito.",
      joinOriginNote:
        'JoinOrigin aiuta la tua community a restare trovabile e connessa mentre cresce — un unico posto dove ritmo, promessa, stanza e persone sono visibili. Fatti scoprire e cresci.',
    },
  ],
};

export default content;
