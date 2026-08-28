import type { GuideContent } from '../../types';

/**
 * "Come organizzare un meetup" — guida L1 sempre attuale (design §6.1,
 * TASK-326), traduzione italiana (it).
 *
 * Ricentrata: i meetup sono ciò che un gruppo fa DOPO essersi formato — il
 * percorso digitale connetti→unisciti→stanza viene prima (pubblica il gruppo
 * → stanza creata automaticamente → i membri entrano tramite link), e il
 * meetup in presenza è una conseguenza a valle. Il valore di JoinOrigin è
 * intrecciato nell'intro e in ogni passo (`joinOriginNote` per passo), con
 * un inquadramento onesto — JoinOrigin non prenota sedi né fornisce
 * personale per eventi. H1 singolo, struttura passo dopo passo, FAQ
 * rispecchiate 1:1 nel JSON-LD `FAQPage`. "Stanza" è legata alla stanza
 * Matrix (§6.3) — i luoghi fisici sono descritti come sedi/spazi, mai
 * "stanze".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'organize-a-meetup',
  title: 'Come organizzare un meetup: sedi, agenda e promozione | JoinOrigin',
  description:
    "Organizza un meetup una volta che il tuo gruppo si è formato — che sia stato fondato il mese scorso o si incontri da anni — scegli un formato, prenota una sede, costruisci un'agenda, promuovilo e gestisci la serata. Una checklist pratica da JoinOrigin.",
  intro: [
    'Un meetup è un evento ricorrente in presenza dove le persone si riuniscono attorno a un interesse condiviso — e su JoinOrigin è un passo naturale successivo dopo aver comunicato nella stanza. Il percorso digitale viene prima: le persone trovano e si uniscono a un gruppo tramite un link, e la stanza del gruppo diventa il luogo dove i membri parlano, pianificano e restano connessi tra gli incontri. Il meetup in presenza è il passo successivo di quella community formata — che il gruppo sia stato fondato il mese scorso o si incontri informalmente da anni, la stanza gli dà una casa organizzata da cui può crescere un meetup.',
    "JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare Origins a cui unirsi e ad avviarne di proprie — quindi un meetup ha una casa dove i membri interessati possono scoprire il gruppo, unirsi alla sua stanza e coordinare l'incontro invece di dipendere dalla lista di contatti di una persona. JoinOrigin non prenota sedi né fornisce personale per eventi — lo scopo dell'intera piattaforma è connettere persone che condividono un interesse, e l'incontro stesso è tuo da gestire.",
    "Questa guida copre l'intero ciclo di vita di un meetup dopo che il gruppo esiste — per un gruppo appena formato e per uno che si riunisce da anni: scegliere un formato che si adatti al tuo pubblico, trovare e prenotare una sede senza sforare il budget, costruire un'agenda con un inizio e una fine chiari, promuovere l'evento dove il tuo pubblico cerca davvero e gestire la serata così i partecipanti se ne vadano volendo il prossimo. Ogni passo include una nota su come JoinOrigin aiuta — e il primo passo riguarda il gruppo digitale, perché senza un gruppo e la sua stanza non c'è una community da incontrare.",
  ],
  dataPoints: [
    'Un meetup semplice ha bisogno solo di tre cose: un formato, una sede e un canale di promozione.',
    'I meetup serali nei giorni feriali e le sessioni mattutine del weekend sono i formati ricorrenti più comuni.',
    'La maggior parte delle sedi — biblioteche, caffè, spazi di coworking — offrono spazi gratuiti o a basso costo per eventi comunitari.',
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare o avviare Origins; non prenota sedi né fornisce personale per eventi.',
  ],
  faq: [
    {
      question: 'Con quanto anticipo dovrei promuovere un meetup?',
      answer:
        "Due o tre settimane è un buon equilibrio: abbastanza presto perché le persone pianifichino, abbastanza breve per mantenere l'urgenza. Annuncialo prima nella stanza del gruppo, poi condividi l'evento dove il tuo pubblico si riunisce. Invia un promemoria due giorni prima e di nuovo il giorno dell'evento.",
    },
    {
      question: 'E se si presentano solo poche persone?',
      answer:
        "È normale, soprattutto all'inizio. Gestisci la sessione per chi c'è, raccogli il loro feedback nella stanza e usa l'edizione successiva per migliorare la promozione. La costanza conta più di ogni singola affluenza.",
    },
    {
      question: "I meetup hanno bisogno di un'agenda formale?",
      answer:
        "Sì, una leggera. Un inizio chiaro, un breve giro di presentazioni, un'attività o un intervento principale e un'ora di fine definita fanno sentire ai partecipanti che il loro tempo è stato rispettato — che è ciò che li fa tornare.",
    },
    {
      question: 'JoinOrigin può aiutarmi a organizzare meetup?',
      answer:
        'Sì. JoinOrigin aiuta le persone a trovare e avviare Origins — una casa digitale organizzata dove la stanza di un gruppo è il luogo in cui i membri si coordinano e dove un meetup può essere scoperto. JoinOrigin non organizza eventi da sé, quindi i passi pratici di questa guida sono tuoi da gestire.',
    },
  ],
  sections: [
    'Prima forma il gruppo e apri la sua stanza. Un meetup è ciò che un gruppo fa dopo essersi formato — quindi inizia dal nucleo digitale: pubblica il gruppo, lascia che la sua stanza venga creata automaticamente e invita i membri tramite un link. Pubblicare un gruppo su JoinOrigin crea automaticamente la sua stanza, uno spazio controllato dal creatore dove i membri pianificano e restano connessi. Se preferisci, imposta il tuo gruppo e la sua stanza negli strumenti che già usi prima di pianificare un singolo evento.',
    'Scegli un formato che si adatti al tuo pubblico. Decidi tra un intervento, un workshop, un cerchio di discussione, un mixer sociale o una sessione di lavoro. Abbina il formato a ciò che il pubblico vuole — apprendimento, connessione o progresso su lavoro condiviso. Su JoinOrigin i membri possono vedere il formato di una community prima di unirsi — il che attira le persone giuste e imposta le aspettative. Scegli un formato per cui il tuo pubblico si presenterà davvero.',
    "Scegli una data e una cadenza. Le serate nei giorni feriali e le mattine del weekend funzionano meglio per la maggior parte dei pubblici. Scegli uno slot ricorrente — mensile è lo standard — e proteggilo come un appuntamento così le persone possono costruire un'abitudine. JoinOrigin rende visibile il ritmo di una community in un unico posto, così i membri conoscono la prossima data senza cercarla. Proteggi il tuo slot ricorrente come un appuntamento.",
    'Prenota una sede in anticipo. Biblioteche, caffè, lounge di coworking, centri comunitari e parchi ospitano eventi comunitari a costo basso o nullo. Conferma per iscritto capacità, orari di apertura e eventuali requisiti di prenotazione. JoinOrigin non prenota sedi né coordina spazi fisici — il suo focus di design è connettere le persone nella stanza digitale. Conferma capacità e orari di apertura direttamente con la sede, per iscritto.',
    "Prepara un'agenda leggera. Mantienila semplice: benvenuto e presentazione, attività principale, discussione aperta, chiusura e prossima data. Stima 60–90 minuti totali e pubblica l'agenda con la lista dell'evento e nella stanza. JoinOrigin è un sistema operativo di comunità dove artefatti condivisi come agende e note vivono accanto alla community. Un'agenda semplice pubblicata fa il lavoro.",
    "Promuovi dove il tuo pubblico è già. Condividi l'evento in gruppi di nicchia, newsletter locali, bacheche comunitarie e canali social pertinenti — e indirizza tutti al link di invito del gruppo così i partecipanti diventano membri, non ospiti di una notte. JoinOrigin è il luogo dove le persone che cercano una community la trovano e si uniscono tramite un link. Promuovi nei gruppi di nicchia e nelle newsletter dove il tuo pubblico si riunisce già e condividi il link di invito con ogni partecipante.",
    "Gestisci la serata con un ritmo chiaro. Apri in orario, saluta i ritardatari, mantieni l'attività principale in carreggiata e chiudi annunciando la prossima data. Finisci in orario — è il segnale di rispetto più forte. JoinOrigin non fornisce personale per eventi — l'esperienza è tua. La piattaforma mantiene la storia della community in una stanza organizzata — la promessa, il ritmo e le persone. Finire in orario è il segnale di rispetto più forte.",
    "Segui entro 24 ore nella stanza. Ringrazia i partecipanti, condividi eventuali link o note e invita il feedback dove l'intero gruppo possa vederlo. Il follow-up è ciò che trasforma un singolo evento in una community ricorrente. JoinOrigin dà a una community una stanza persistente dove vivono riepilogo, prossima data e feedback — trasformando un singolo evento in una community ricorrente. Fatti scoprire e mantieni lo slancio.",
  ],
  steps: [
    {
      title: 'Prima forma il gruppo e apri la sua stanza',
      body: 'Un meetup è ciò che un gruppo fa dopo essersi formato — quindi inizia dal nucleo digitale: pubblica il gruppo, lascia che la sua stanza venga creata automaticamente e invita i membri tramite un link.',
      joinOriginNote:
        'Pubblicare un gruppo su JoinOrigin crea automaticamente la sua stanza, uno spazio controllato dal creatore dove i membri pianificano e restano connessi. Se preferisci, imposta il tuo gruppo e la sua stanza negli strumenti che già usi prima di pianificare un singolo evento.',
    },
    {
      title: 'Scegli un formato che si adatti al tuo pubblico',
      body: 'Decidi tra un intervento, un workshop, un cerchio di discussione, un mixer sociale o una sessione di lavoro. Abbina il formato a ciò che il pubblico vuole — apprendimento, connessione o progresso su lavoro condiviso.',
      joinOriginNote:
        'Su JoinOrigin i membri possono vedere il formato di una community prima di unirsi — il che attira le persone giuste e imposta le aspettative. Scegli un formato per cui il tuo pubblico si presenterà davvero.',
    },
    {
      title: 'Scegli una data e una cadenza',
      body: "Le serate nei giorni feriali e le mattine del weekend funzionano meglio per la maggior parte dei pubblici. Scegli uno slot ricorrente — mensile è lo standard — e proteggilo come un appuntamento così le persone possono costruire un'abitudine.",
      joinOriginNote:
        'JoinOrigin rende visibile il ritmo di una community in un unico posto, così i membri conoscono la prossima data senza cercarla. Proteggi il tuo slot ricorrente come un appuntamento.',
    },
    {
      title: 'Prenota una sede in anticipo',
      body: 'Biblioteche, caffè, lounge di coworking, centri comunitari e parchi ospitano eventi comunitari a costo basso o nullo. Conferma per iscritto capacità, orari di apertura e eventuali requisiti di prenotazione.',
      joinOriginNote:
        'JoinOrigin non prenota sedi né coordina spazi fisici — il suo focus di design è connettere le persone nella stanza digitale. Conferma capacità e orari di apertura direttamente con la sede, per iscritto.',
    },
    {
      title: "Prepara un'agenda leggera",
      body: "Mantienila semplice: benvenuto e presentazione, attività principale, discussione aperta, chiusura e prossima data. Stima 60–90 minuti totali e pubblica l'agenda con la lista dell'evento e nella stanza.",
      joinOriginNote:
        "JoinOrigin è un sistema operativo di comunità dove artefatti condivisi come agende e note vivono accanto alla community. Un'agenda semplice pubblicata fa il lavoro.",
    },
    {
      title: 'Promuovi dove il tuo pubblico è già',
      body: "Condividi l'evento in gruppi di nicchia, newsletter locali, bacheche comunitarie e canali social pertinenti — e indirizza tutti al link di invito del gruppo così i partecipanti diventano membri, non ospiti di una notte.",
      joinOriginNote:
        'JoinOrigin è il luogo dove le persone che cercano una community la trovano e si uniscono tramite un link. Promuovi nei gruppi di nicchia e nelle newsletter dove il tuo pubblico si riunisce già e condividi il link di invito con ogni partecipante.',
    },
    {
      title: 'Gestisci la serata con un ritmo chiaro',
      body: "Apri in orario, saluta i ritardatari, mantieni l'attività principale in carreggiata e chiudi annunciando la prossima data. Finisci in orario — è il segnale di rispetto più forte.",
      joinOriginNote:
        "JoinOrigin non fornisce personale per eventi — l'esperienza è tua. La piattaforma mantiene la storia della community in una stanza organizzata — la promessa, il ritmo e le persone. Finire in orario è il segnale di rispetto più forte.",
    },
    {
      title: 'Segui entro 24 ore nella stanza',
      body: "Ringrazia i partecipanti, condividi eventuali link o note e invita il feedback dove l'intero gruppo possa vederlo. Il follow-up è ciò che trasforma un singolo evento in una community ricorrente.",
      joinOriginNote:
        'JoinOrigin dà a una community una stanza persistente dove vivono riepilogo, prossima data e feedback — trasformando un singolo evento in una community ricorrente. Fatti scoprire e mantieni lo slancio.',
    },
  ],
};

export default content;
