import type { GuideContent } from '../../types';

/**
 * "Come creare un gruppo" — guida L1 sempre attuale (design §6.1, TASK-353),
 * traduzione italiana (it).
 *
 * Scritta seguendo il flusso dello schermo prodotto §2: pubblica un gruppo →
 * pagina pubblica del gruppo → Unisciti tramite link → stanza creata
 * automaticamente ALLA PUBBLICAZIONE → il creatore controlla la stanza →
 * crescita tramite feed/inviti. Un gruppo è una community: la pagina pubblica
 * dichiara la promessa, la stanza è dove i membri si connettono e i membri
 * entrano tramite un link. La piattaforma è attiva: creare un gruppo pubblica
 * la sua pagina e apre la sua stanza ora. "Stanza" è legata alla stanza
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'create-a-group',
  title: 'Come creare un gruppo: pubblicalo e apri la sua stanza | JoinOrigin',
  description:
    'Crea un gruppo su JoinOrigin — pubblica una pagina del gruppo, apri la sua stanza automaticamente e invita i membri tramite un link di invito. Passi pratici da JoinOrigin.',
  intro: [
    "Ogni community — che sia completamente nuova o che si incontri informalmente da mesi — si regge sulle stesse due mosse: decidere a chi è rivolta e dare a quelle persone un unico posto chiaro per connettersi. Un gruppo senza una casa non si forma mai davvero; l'interesse si disperde tra messaggi, fogli di calcolo e conversazioni occasionali, e nulla resta. La pagina del gruppo e la sua stanza sono quella casa, e crearle bene è la differenza tra una community reale e un elenco di nomi.",
    "Il ciclo di JoinOrigin funziona così: pubblichi un gruppo, appare la sua pagina pubblica e la sua stanza viene creata automaticamente nel momento della pubblicazione. Le persone scoprono il gruppo tramite Esplora o seguono un link di invito, l'iscrizione è un singolo clic e arrivano nella stanza — una stanza Matrix controllata dal creatore dove la community vive davvero. Il creatore possiede la stanza dal secondo zero e controlla chi entra e come funziona il gruppo.",
    "Questa guida copre l'intero percorso — che il gruppo sia nuovo o esista già sulla carta: scegliere pubblico e scopo, scrivere una pagina del gruppo che le persone possano trovare, pubblicare il gruppo e aprire la sua stanza, impostare le aspettative come creatore, condividere il link di invito, invitare i primi membri, avviare le prime conversazioni e mantenere la stanza attiva così il gruppo continua a crescere.",
  ],
  dataPoints: [
    'I gruppi più chiari partono con un solo pubblico e una sola promessa — la specificità è una funzione di crescita.',
    'Su JoinOrigin, pubblicare un gruppo crea automaticamente la sua stanza — la community ha un posto dove connettersi dal secondo zero.',
    "Un link di invito è l'invito più semplice: un link, un clic e un nuovo membro è nella stanza.",
    'JoinOrigin è un sistema operativo di comunità che aiuta le persone a trovare, unirsi e avviare gruppi — pubblica il tuo gruppo e la sua stanza si apre immediatamente.',
  ],
  faq: [
    {
      question: 'Qual è la differenza tra un gruppo e una community?',
      answer:
        'Su JoinOrigin sono lo stesso oggetto. Un gruppo (o community) è un oggetto pubblicato e a cui si può aderire, con una pagina pubblica e una stanza. La pagina del gruppo dichiara la promessa; la stanza è dove i membri si connettono. Le community hanno uno Spazio Matrix che contiene le stanze del gruppo, e la stanza principale è dove vive il gruppo.',
    },
    {
      question: 'Quando viene creata la stanza del gruppo?',
      answer:
        'La stanza viene creata automaticamente nel momento in cui pubblichi il gruppo — non c\'è mai un passaggio separato "crea la chat dopo". Il creatore possiede la stanza dal secondo zero e può invitare, rimuovere e assegnare ruoli all\'interno di Element. Puoi anche impostare la stessa struttura con gli strumenti che già usi.',
    },
    {
      question: 'Come fanno i membri a unirsi al mio gruppo?',
      answer:
        "L'iscrizione è un'azione singola: cliccare su Unisciti nella pagina pubblica del gruppo o seguire un link di invito diretto da un membro. Chi si iscrive arriva nella stanza del gruppo. La crescita iniziale più affidabile è personale — condividere il link di invito con persone che corrispondono al pubblico e chiedere loro di portarne altre.",
    },
    {
      question: 'Cosa dovrebbe dire la pagina del gruppo?',
      answer:
        'Una frase su chi è il pubblico del gruppo, una frase su cosa succede nella stanza e cosa ottiene un membro iscrivendosi. Mantienila specifica — "nuovi fondatori a Milano" batte "persone a cui piacciono le imprese". La pagina è la promessa che decide se qualcuno clicca su Unisciti.',
    },
    {
      question: 'JoinOrigin può aiutarmi a creare un gruppo oggi?',
      answer:
        "Sì. Pubblicare un gruppo su JoinOrigin crea la sua pagina e la sua stanza in modo atomico — la stanza si apre nel momento in cui pubblichi e la controlli dall'inizio. Pubblica il gruppo e apri una stanza per i membri; ogni nuovo membro che inviti espande la tua portata.",
    },
  ],
  sections: [
    "Scegli pubblico e scopo. Decidi a chi è rivolto il gruppo e a cosa serve — un pubblico, una promessa e un membro di successo che sai descrivere. JoinOrigin è progettato attorno a pagine di gruppo trovabili, e i gruppi più chiari dichiarano pubblico e scopo fin dall'inizio. Scrivi una frase per ciascuno e tienili davanti a ogni invito.",
    "Scrivi una pagina del gruppo che le persone possano trovare. La pagina dovrebbe dichiarare a chi è rivolto il gruppo, cosa succede nella stanza e cosa ottengono i membri iscrivendosi. Mantienila specifica e onesta. Pubblicare un gruppo su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Pubblica la descrizione e provala su alcune persone che corrispondono al pubblico.",
    "Pubblica il gruppo e apri la sua stanza. La pubblicazione è il momento in cui il gruppo diventa reale: una pagina pubblica più una stanza dove i membri si connettono. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede. Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Crea la pagina e la stanza negli strumenti che il tuo gruppo usa già se preferisci.",
    'Imposta le aspettative come creatore. Come proprietario della stanza, decidi come funziona il gruppo: cosa possono pubblicare i membri, quali sono le regole e come vengono accolte le nuove persone. Il controllo del creatore è la proprietà standard della stanza Matrix — invita, rimuovi, assegna ruoli, fissa, archivia. JoinOrigin non imposta le tue regole al posto tuo; il design ti dà i controlli. Scrivi le aspettative della stanza e fissale dove i membri possano vederle.',
    "Condividi il link di invito. Il link di invito è il percorso più breve dall'interesse all'adesione: un link, un clic e un nuovo membro arriva nella stanza. Mettilo ovunque si riuniscano le persone giuste. L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo gruppo fa il lavoro.",
    "Invita personalmente i primi membri. Gli inviti personali convertono molto meglio dei post pubblici. Scrivi ad amici, colleghi e conoscenti che corrispondono al pubblico, condividi il link di invito e chiedi loro di portare un'altra persona. JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un gruppo possono trovare il tuo e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni membro diventa un canale verso la propria rete.",
    'Avvia le prime conversazioni nella stanza. Le prime conversazioni impostano la cultura. Apri con una domanda chiara — presentazioni, un obiettivo condiviso o un primo argomento — e rispondi a ogni messaggio. JoinOrigin non gestisce le tue conversazioni; la stanza è tua da plasmare. La piattaforma dà al gruppo una stanza dove i membri si connettono, e il creatore la possiede. Sii il membro più attivo per le prime settimane.',
    'Mantieni la stanza attiva e in crescita. Mantieni un ritmo — un argomento settimanale, un check-in ricorrente o un aggiornamento costante — così i membri hanno un motivo per tornare. La crescita si accumula quando ogni membro può descrivere il gruppo in una frase e condividere il suo link di invito. JoinOrigin mantiene la pagina del tuo gruppo e la sua stanza collegate mentre il gruppo cresce — un unico posto dove la promessa, la stanza e le persone sono visibili. Fatti scoprire e cresci.',
  ],
  steps: [
    {
      title: 'Scegli pubblico e scopo',
      body: 'Decidi a chi è rivolto il gruppo e a cosa serve — un pubblico, una promessa e un membro di successo che sai descrivere.',
      joinOriginNote:
        "JoinOrigin è progettato attorno a pagine di gruppo trovabili, e i gruppi più chiari dichiarano pubblico e scopo fin dall'inizio. Scrivi una frase per ciascuno e tienili davanti a ogni invito.",
    },
    {
      title: 'Scrivi una pagina del gruppo che le persone possano trovare',
      body: 'La pagina dovrebbe dichiarare a chi è rivolto il gruppo, cosa succede nella stanza e cosa ottengono i membri iscrivendosi. Mantienila specifica e onesta.',
      joinOriginNote:
        "Pubblicare un gruppo su JoinOrigin crea automaticamente la sua pagina e la sua stanza, con il creatore che controlla la stanza dall'inizio. Pubblica la descrizione e provala su alcune persone che corrispondono al pubblico.",
    },
    {
      title: 'Pubblica il gruppo e apri la sua stanza',
      body: "La pubblicazione è il momento in cui il gruppo diventa reale: una pagina pubblica più una stanza dove i membri si connettono. Su JoinOrigin, la stanza viene creata automaticamente nello stesso momento — non c'è un passaggio di configurazione separato, e il creatore la possiede.",
      joinOriginNote:
        "Su JoinOrigin la pagina, la stanza e il link di invito sono un'unica pubblicazione. Crea la pagina e la stanza negli strumenti che il tuo gruppo usa già se preferisci.",
    },
    {
      title: 'Imposta le aspettative come creatore',
      body: 'Come proprietario della stanza, decidi come funziona il gruppo: cosa possono pubblicare i membri, quali sono le regole e come vengono accolte le nuove persone. Il controllo del creatore è la proprietà standard della stanza Matrix — invita, rimuovi, assegna ruoli, fissa, archivia.',
      joinOriginNote:
        'JoinOrigin non imposta le tue regole al posto tuo; il design ti dà i controlli. Scrivi le aspettative della stanza e fissale dove i membri possano vederle.',
    },
    {
      title: 'Condividi il link di invito',
      body: "Il link di invito è il percorso più breve dall'interesse all'adesione: un link, un clic e un nuovo membro arriva nella stanza. Mettilo ovunque si riuniscano le persone giuste.",
      joinOriginNote:
        "L'iscrizione su JoinOrigin è un'azione singola — cliccare su Unisciti nella pagina pubblica o seguire un link di invito diretto da un membro. Un link breve e chiaro al tuo gruppo fa il lavoro.",
    },
    {
      title: 'Invita personalmente i primi membri',
      body: "Gli inviti personali convertono molto meglio dei post pubblici. Scrivi ad amici, colleghi e conoscenti che corrispondono al pubblico, condividi il link di invito e chiedi loro di portare un'altra persona.",
      joinOriginNote:
        'JoinOrigin rende più facile la scoperta — un luogo dove le persone che cercano un gruppo possono trovare il tuo e unirsi tramite un link. Gli inviti personali fanno ancora il lavoro pesante, e ogni membro diventa un canale verso la propria rete.',
    },
    {
      title: 'Avvia le prime conversazioni nella stanza',
      body: 'Le prime conversazioni impostano la cultura. Apri con una domanda chiara — presentazioni, un obiettivo condiviso o un primo argomento — e rispondi a ogni messaggio.',
      joinOriginNote:
        'JoinOrigin non gestisce le tue conversazioni; la stanza è tua da plasmare. La piattaforma dà al gruppo una stanza dove i membri si connettono, e il creatore la possiede. Sii il membro più attivo per le prime settimane.',
    },
    {
      title: 'Mantieni la stanza attiva e in crescita',
      body: 'Mantieni un ritmo — un argomento settimanale, un check-in ricorrente o un aggiornamento costante — così i membri hanno un motivo per tornare. La crescita si accumula quando ogni membro può descrivere il gruppo in una frase e condividere il suo link di invito.',
      joinOriginNote:
        'JoinOrigin mantiene la pagina del tuo gruppo e la sua stanza collegate mentre il gruppo cresce — un unico posto dove la promessa, la stanza e le persone sono visibili. Fatti scoprire e cresci.',
    },
  ],
};

export default content;
