import type { GuideContent } from '../../types';

/**
 * "Come trovare un co-fondatore" — guida L1 sempre attuale (design §6.1,
 * TASK-326), traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: una pagina di
 * idea viene pubblicata, la sua stanza viene creata automaticamente e le
 * conversazioni sul co-fondatore avvengono in quella stanza — il luogo
 * digitale dove i candidati possono trovare l'idea, fare domande e lavorare
 * insieme. Il valore di JoinOrigin è intrecciato nell'intro e in ogni passo
 * (`joinOriginNote` per passo), con un inquadramento onesto — JoinOrigin non
 * è un servizio di matchmaking e non abbina i fondatori. H1 singolo,
 * struttura passo dopo passo, FAQ rispecchiate 1:1 nel JSON-LD `FAQPage`.
 * "Stanza" è legata alla stanza Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'find-a-co-founder',
  title: 'Come trovare un co-fondatore: dove cercare e cosa chiedere | JoinOrigin',
  description:
    "Trova un co-fondatore che completi le tue competenze — che tu stia lanciando o facendo crescere un'impresa esistente, pubblica una pagina di idea, incontra persone nelle community e nelle loro stanze, porta avanti un progetto di prova e poni le domande che prevengono le rotture. Da JoinOrigin.",
  intro: [
    "Trovare un co-fondatore è una decisione di relazione mascherata da decisione di assunzione, e al suo cuore è un altro problema di connessione tra persone: la persona giusta è spesso a una presentazione calorosa di distanza, da qualche parte in una community che non hai ancora scoperto. È il problema con cui JoinOrigin aiuta — ed è lo stesso problema sia che tu sia ancora in fase di idea sia che tu stia gestendo un'azienda esistente che ha bisogno di un partner per fare il passo successivo.",
    "JoinOrigin è un sistema operativo di comunità costruito attorno al ciclo digitale connetti→unisciti→stanza: pubblichi un'idea, la sua stanza viene creata automaticamente e le persone che condividono l'idea possono unirsi e parlare in quella stanza. La pagina di idea è la promessa pubblica e la stanza è dove avvengono davvero le conversazioni sul co-fondatore — una stanza Matrix controllata dal creatore dove le persone interessate possono fare domande, condividere note e testare l'adattamento prima che qualcuno si impegni. JoinOrigin non è un servizio di matchmaking, non abbina i fondatori e non ha uffici locali. Il valore della piattaforma — connettere le persone attorno a interessi condivisi — corrisponde direttamente al modo in cui la maggior parte dei fondatori trova davvero il proprio co-fondatore: attraverso community, stanze e presentazioni calorose.",
    "Questa guida affronta la ricerca come affronteresti la costruzione di una community: parti dalla tua rete esistente, pubblica un'idea che le persone possano trovare, espandi con intenzione attraverso le community e le loro stanze, valuta i candidati con conversazioni strutturate e un progetto di prova e concorda i fondamentali prima di impegnarti legalmente. I passi sono pratici e onesti, e ognuno mostra dove JoinOrigin aiuta.",
  ],
  dataPoints: [
    'Le presentazioni calorose e il lavoro condiviso producono le relazioni di co-fondazione più durature.',
    "Una pagina di idea pubblicata con una stanza dà alle persone interessate un luogo reale per trovare l'idea e avviare una conversazione.",
    'Un breve progetto di prova — un prototipo, una landing page o un pilota retribuito — testa gli stili di lavoro più velocemente dei colloqui.',
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare Origins e collaboratori; non è un servizio di matchmaking e non ha uffici locali.',
  ],
  faq: [
    {
      question: 'Dove trova il proprio co-fondatore la maggior parte delle persone?',
      answer:
        "La maggior parte dei fondatori si incontra attraverso reti calorose — eventi, community, stanze e presentazioni di persone di cui si fidano. Pubblicare un'idea che le persone possano trovare e poi presentarsi con costanza nelle stesse community e nelle loro stanze è il modo più affidabile per incontrare potenziali co-fondatori.",
    },
    {
      question: 'Come capisco se qualcuno è un buon co-fondatore?',
      answer:
        'Porta avanti un piccolo progetto di prova insieme e presta attenzione a tre cose: competenze complementari, tolleranza al rischio simile e comunicazione onesta sotto scadenza. Il progetto di prova rivela tutte e tre più velocemente di qualsiasi conversazione.',
    },
    {
      question: 'Su cosa dovremmo concordare prima di iniziare?',
      answer:
        'Parlate di ruoli, impegno di tempo, ripartizione delle quote, maturazione dei diritti, processo decisionale e di cosa succede se qualcuno vuole uscire. Mettere queste cose sul tavolo presto previene i disaccordi che distruggono la maggior parte dei team alle prime armi.',
    },
    {
      question: 'JoinOrigin può aiutarmi a trovare un co-fondatore?',
      answer:
        'JoinOrigin aiuta le persone a trovare Origins e collaboratori — inclusi i tipi di community dove i fondatori si incontrano — con una pagina di idea e una stanza dove possono avvenire le conversazioni. JoinOrigin non abbina i fondatori, quindi i passi di networking e progetto di prova di questa guida sono il tuo percorso più affidabile.',
    },
  ],
  sections: [
    "Mappa prima le tue lacune di competenze. Scrivi in cosa sei davvero bravo e di cosa ha bisogno l'impresa che tu non sei. Un co-fondatore dovrebbe colmare la tua lacuna più grande — tecnica, commerciale o operativa — non duplicare i tuoi punti di forza. JoinOrigin è costruito attorno a profili, idee e community, non al matchmaking — quindi il consiglio onesto è lo stesso di sempre: sappi quale lacuna devi colmare prima di cercare. Scrivi i tuoi punti di forza e i bisogni dell'impresa.",
    "Pubblica la tua idea e apri la sua stanza. Un'idea che nessuno può trovare non attira alcun co-fondatore. Pubblica una pagina di idea chiara — cosa stai costruendo, perché e il tipo di persona di cui hai bisogno — e lascia che la sua stanza venga creata automaticamente così le persone interessate hanno un posto per parlare. Pubblicare un'idea su JoinOrigin crea automaticamente la sua stanza, il luogo dove avvengono le conversazioni sul co-fondatore. Pubblica la tua idea in un luogo pubblico e apri una stanza per la discussione attorno ad essa.",
    "Lavora la tua rete esistente per presentazioni calorose. Di' a cinque persone di cui ti fidi cosa stai costruendo e il tipo di co-fondatore di cui hai bisogno. Chiedi a ciascuna un nome. Le presentazioni calorose battono il contatto freddo in quasi tutti i casi. JoinOrigin rende trovabili le community, il che espande la tua rete calorosa nel tempo — e ogni presentazione può portare a una stanza dove avviene la conversazione reale. Di' a cinque persone di cui ti fidi esattamente che tipo di co-fondatore ti serve.",
    'Presentati con costanza nelle community pertinenti e nelle loro stanze. Partecipa agli eventi e unisciti ai gruppi dove si riunisce il tipo giusto di persona: meetup di fondatori, community di settore, spazi di coworking e stanze online. La ripetizione costruisce la fiducia che porta alle presentazioni. JoinOrigin aiuta le persone a trovare le community che corrispondono ai loro obiettivi — il tipo di luogo dove i fondatori si incontrano — e a unirsi alle loro stanze. Scegli i meetup e le stanze dove le persone giuste si riuniscono già e continua a presentarti.',
    'Fai conversazioni strutturate di primo incontro. Chiedi delle loro competenze, tolleranza al rischio, impegno di tempo e perché vogliono iniziare o far crescere qualcosa. Condividi le tue risposte. Questo è un colloquio reciproco, non una presentazione. JoinOrigin non abbina i fondatori né gestisce le conversazioni — il colloquio reciproco è tuo. La piattaforma ti mette nelle stesse community e stanze dei potenziali collaboratori — il resto dipende da te.',
    'Porta avanti un progetto di prova insieme. Scegli qualcosa di piccolo e reale — un prototipo, una landing page o un pilota retribuito — e lavoraci per quattro-sei settimane. Osserva come dividete il lavoro, gestite il feedback e vi comportate sotto pressione. JoinOrigin dà alle community una stanza condivisa per il loro lavoro e i loro progetti — che è un luogo naturale dove un progetto di prova può emergere. Un piccolo prototipo reale è il test più affidabile.',
    'Decidi in base alla prova, non al potenziale. Chiediti se ti fideresti di questa persona con la tua reputazione, se comunica onestamente e se lavorare insieme ti dà energia. Se la prova è stata tesa, fidati di quel segnale. JoinOrigin non prende la decisione al posto tuo. Il suo valore onesto è il contesto di community e stanza che ti permette di incontrare e lavorare con i candidati — la prova continua a dirti la verità.',
    "Concorda i fondamentali prima di impegnarti. Scrivi ruoli, impegno di tempo, ripartizione delle quote, maturazione dei diritti e regole decisionali. Anche un semplice accordo di una pagina previene la maggior parte delle incomprensioni iniziali. JoinOrigin è un sistema operativo di comunità — uno spazio organizzato dove accordi, ruoli e note di progetto possono vivere accanto alla stanza dell'idea. Anche un accordo scritto di una pagina previene la maggior parte delle incomprensioni iniziali.",
  ],
  steps: [
    {
      title: 'Mappa prima le tue lacune di competenze',
      body: "Scrivi in cosa sei davvero bravo e di cosa ha bisogno l'impresa che tu non sei. Un co-fondatore dovrebbe colmare la tua lacuna più grande — tecnica, commerciale o operativa — non duplicare i tuoi punti di forza.",
      joinOriginNote:
        "JoinOrigin è costruito attorno a profili, idee e community, non al matchmaking — quindi il consiglio onesto è lo stesso di sempre: sappi quale lacuna devi colmare prima di cercare. Scrivi i tuoi punti di forza e i bisogni dell'impresa.",
    },
    {
      title: 'Pubblica la tua idea e apri la sua stanza',
      body: "Un'idea che nessuno può trovare non attira alcun co-fondatore. Pubblica una pagina di idea chiara — cosa stai costruendo, perché e il tipo di persona di cui hai bisogno — e lascia che la sua stanza venga creata automaticamente così le persone interessate hanno un posto per parlare.",
      joinOriginNote:
        "Pubblicare un'idea su JoinOrigin crea automaticamente la sua stanza, il luogo dove avvengono le conversazioni sul co-fondatore. Pubblica la tua idea in un luogo pubblico e apri una stanza per la discussione attorno ad essa.",
    },
    {
      title: 'Lavora la tua rete esistente per presentazioni calorose',
      body: "Di' a cinque persone di cui ti fidi cosa stai costruendo e il tipo di co-fondatore di cui hai bisogno. Chiedi a ciascuna un nome. Le presentazioni calorose battono il contatto freddo in quasi tutti i casi.",
      joinOriginNote:
        "JoinOrigin rende trovabili le community, il che espande la tua rete calorosa nel tempo — e ogni presentazione può portare a una stanza dove avviene la conversazione reale. Di' a cinque persone di cui ti fidi esattamente che tipo di co-fondatore ti serve.",
    },
    {
      title: 'Presentati con costanza nelle community pertinenti e nelle loro stanze',
      body: 'Partecipa agli eventi e unisciti ai gruppi dove si riunisce il tipo giusto di persona: meetup di fondatori, community di settore, spazi di coworking e stanze online. La ripetizione costruisce la fiducia che porta alle presentazioni.',
      joinOriginNote:
        'JoinOrigin aiuta le persone a trovare le community che corrispondono ai loro obiettivi — il tipo di luogo dove i fondatori si incontrano — e a unirsi alle loro stanze. Scegli i meetup e le stanze dove le persone giuste si riuniscono già e continua a presentarti.',
    },
    {
      title: 'Fai conversazioni strutturate di primo incontro',
      body: 'Chiedi delle loro competenze, tolleranza al rischio, impegno di tempo e perché vogliono iniziare o far crescere qualcosa. Condividi le tue risposte. Questo è un colloquio reciproco, non una presentazione.',
      joinOriginNote:
        'JoinOrigin non abbina i fondatori né gestisce le conversazioni — il colloquio reciproco è tuo. La piattaforma ti mette nelle stesse community e stanze dei potenziali collaboratori — il resto dipende da te.',
    },
    {
      title: 'Porta avanti un progetto di prova insieme',
      body: 'Scegli qualcosa di piccolo e reale — un prototipo, una landing page o un pilota retribuito — e lavoraci per quattro-sei settimane. Osserva come dividete il lavoro, gestite il feedback e vi comportate sotto pressione.',
      joinOriginNote:
        'JoinOrigin dà alle community una stanza condivisa per il loro lavoro e i loro progetti — che è un luogo naturale dove un progetto di prova può emergere. Un piccolo prototipo reale è il test più affidabile.',
    },
    {
      title: 'Decidi in base alla prova, non al potenziale',
      body: 'Chiediti se ti fideresti di questa persona con la tua reputazione, se comunica onestamente e se lavorare insieme ti dà energia. Se la prova è stata tesa, fidati di quel segnale.',
      joinOriginNote:
        'JoinOrigin non prende la decisione al posto tuo. Il suo valore onesto è il contesto di community e stanza che ti permette di incontrare e lavorare con i candidati — la prova continua a dirti la verità.',
    },
    {
      title: 'Concorda i fondamentali prima di impegnarti',
      body: 'Scrivi ruoli, impegno di tempo, ripartizione delle quote, maturazione dei diritti e regole decisionali. Anche un semplice accordo di una pagina previene la maggior parte delle incomprensioni iniziali.',
      joinOriginNote:
        "JoinOrigin è un sistema operativo di comunità — uno spazio organizzato dove accordi, ruoli e note di progetto possono vivere accanto alla stanza dell'idea. Anche un accordo scritto di una pagina previene la maggior parte delle incomprensioni iniziali.",
    },
  ],
};

export default content;
