import type { GuideContent } from '../../types';

/**
 * "Moderazione della community" — guida L1 sempre attuale (design §6.1,
 * TASK-326), traduzione italiana (it).
 *
 * Ricentrata sul modello digitale connetti→unisciti→stanza: il controllo del
 * creatore È la proprietà della stanza Matrix — invita/rimuovi membri,
 * assegna ruoli, modifica le impostazioni della stanza, fissa messaggi,
 * archivia la stanza — applicato nativamente in Element. Il valore di
 * JoinOrigin è intrecciato nell'intro e in ogni passo (`joinOriginNote` per
 * passo), con un inquadramento onesto — JoinOrigin non modera community di
 * terze parti né fornisce personale di moderazione. H1 singolo, struttura
 * passo dopo passo, FAQ rispecchiate 1:1 nel JSON-LD `FAQPage`. "Stanza" è
 * legata alla stanza Matrix (§6.3) — gli spazi privati/incidenti sono
 * descritti come stanze/DM, mai "canali".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'it',
  slug: 'moderation',
  title: 'Moderazione della community: come mantenere i gruppi sani e accoglienti | JoinOrigin',
  description:
    'Modera una community con regole chiare, azione precoce e de-escalation — che tu stia impostando un gruppo completamente nuovo o sistemando la cultura di uno consolidato, il controllo del creatore è la proprietà della stanza Matrix, con ruoli applicati in Element. Passi pratici da JoinOrigin.',
  intro: [
    "Ogni community che cresce prima o poi affronta un momento che mette alla prova la sua cultura — una discussione accesa, uno spammer, un membro che mette a disagio gli altri o un malinteso che degenera. La moderazione è la pratica di proteggere lo spazio così la community può restare accogliente, e diventa necessaria solo perché le community sono fatte di persone che si connettono tra loro. Quella connessione è il problema centrale con cui JoinOrigin aiuta — e le pratiche valgono tanto per una community consolidata che sta sistemando la sua cultura quanto per un gruppo nuovo che imposta le aspettative prima dell'arrivo del primo membro.",
    "JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare, avviare e organizzare community — e nel suo modello digitale una community vive in una stanza controllata dal creatore. Il controllo del creatore è la proprietà standard della stanza Matrix: il creatore può invitare e rimuovere membri, assegnare ruoli, modificare le impostazioni della stanza, fissare messaggi e archiviare la stanza — tutto applicato nativamente all'interno di Element, il client di chat predefinito, senza un sistema di permessi personalizzato. Quella proprietà è la spina dorsale della moderazione su JoinOrigin: il creatore decide chi appartiene, quali sono le regole e cosa succede quando una regola viene infranta. JoinOrigin non modera community di terze parti e non fornisce personale di moderazione. La piattaforma è progettata attorno a una struttura comunitaria sana, e le pratiche di questa guida sono le pratiche umane di cui ogni organizzatore ha bisogno.",
    'Questa guida presenta un sistema di moderazione pratico — che la tua community sia completamente nuova o abbia anni di storia da sistemare: regole comunitarie scritte, brevi e specifiche, un percorso di applicazione chiaro con avvertimenti prima delle rimozioni, tecniche per la de-escalation delle situazioni tese e consigli onesti su quando coinvolgere i membri e quando agire da soli. Ogni passo mostra dove JoinOrigin aiuta.',
  ],
  dataPoints: [
    'Regole comunitarie chiare e scritte riducono i conflitti impostando le aspettative prima degli incidenti.',
    'Il controllo del creatore su JoinOrigin è la proprietà della stanza Matrix: invita/rimuovi, ruoli, impostazioni, fissa, archivia.',
    'Un percorso di applicazione a tappe — avverti, poi limita, poi rimuovi — è più equo e più facile da difendere dei ban istantanei.',
    'JoinOrigin è un sistema operativo di comunità progettato per aiutare le persone a trovare, avviare e organizzare community; non modera community di terze parti né fornisce personale di moderazione.',
  ],
  faq: [
    {
      question: 'Le community piccole hanno davvero bisogno di regole di moderazione?',
      answer:
        'Sì, e prima sono meglio è. Due o tre regole brevi scritte prima che un conflitto accada sono molto più facili da applicare delle regole inventate dopo uno. Le community piccole hanno meno incidenti, ma quelli che hanno sono altrettanto dolorosi.',
    },
    {
      question: 'I moderatori dovrebbero agire pubblicamente o privatamente?',
      answer:
        "Privatamente prima. Contatta uno a uno, riformula la regola e l'impatto e dai alla persona la possibilità di adattarsi. Le prese di posizione pubbliche tendono a degenerare. Tieni un registro pubblico delle regole, ma applicale in privato — in un DM o in una stanza privata.",
    },
    {
      question: 'Quando dovrei rimuovere qualcuno dalla community?',
      answer:
        'Dopo che avvertimenti chiari non hanno funzionato, o immediatamente per comportamenti che mettono in pericolo i membri — molestie, minacce o doxxing. Il test è se la persona sta rendendo attivamente lo spazio non sicuro per gli altri. Su JoinOrigin, la rimozione è il proprietario della stanza che rimuove un membro dalla stanza.',
    },
    {
      question: 'JoinOrigin può aiutarmi a moderare la mia community?',
      answer:
        'Sì. JoinOrigin è un sistema operativo di comunità dove il controllo del creatore è la proprietà della stanza Matrix — invita/rimuovi, ruoli, impostazioni, fissa e archivia applicati in Element. JoinOrigin non modera le community, quindi le pratiche di questa guida — regole chiare, applicazione a tappe, de-escalation calma — sono tue da applicare.',
    },
  ],
  sections: [
    'Scrivi da tre a cinque regole chiare. Mantienile brevi, specifiche e positive: "Sii rispettoso", "Resta in tema", "Niente spam o autopromozione", "Disaccordo sulle idee, non sulle persone". Pubblicale dove ogni nuovo membro le vedrà — idealmente fissate nella stanza. Su JoinOrigin le regole e i valori di una community sono visibili nella sua stanza dal primo giorno — i nuovi membri le vedono prima di unirsi. Fissa le tue regole brevi dove ogni nuovo membro le vedrà.',
    "Imposta il tono come proprietario della stanza. Modella il comportamento che vuoi — accogli i nuovi arrivati, ringrazia i contributori e affronta i problemi con calma. L'esempio del creatore imposta il livello culturale della community. JoinOrigin non sorveglia le community — il tono è impostato da creatori e membri. La piattaforma rende visibile il comportamento accogliente; modella il comportamento che vuoi nella stanza.",
    'Possiedi la stanza come il creatore che sei. Il controllo del creatore su JoinOrigin è la proprietà della stanza Matrix: invita e rimuovi membri, assegna ruoli, modifica le impostazioni della stanza, fissa messaggi e archivia la stanza — applicato nativamente in Element. Conoscere questi controlli è la metà tecnica della moderazione. JoinOrigin dà al creatore la piena proprietà della stanza dalla pubblicazione, senza un sistema di permessi personalizzato. Impara i controlli di moderazione della piattaforma che usi e designa un proprietario chiaro.',
    "Concorda un percorso di applicazione. Definisci una risposta a tappe: avvertimento privato, poi limiti (muto, pubblicazione limitata — spesso un cambio di ruolo), poi la rimozione per violazioni ripetute o gravi. Un'escalation coerente è più equa dell'improvvisazione. Su JoinOrigin i ruoli sono i ruoli Matrix standard in Element — muto, ban e assegnazione dei ruoli sono azioni native. Scrivi il percorso di applicazione e rispettalo.",
    "Agisci presto e con calma. Affronta il primo segno di un problema in privato, prima che diventi un incidente pubblico. Un intervento precoce e calmo è la moderazione più economica che esista. JoinOrigin non modera al posto tuo — l'intervento precoce e calmo è una competenza umana. La piattaforma è progettata così i problemi emergono visibilmente nella stanza e vengono colti presto. Contatta in privato al primo segno.",
    "Impara le tecniche di de-escalation. Quando le tensioni salgono, rallenta la conversazione: riconosci l'emozione, riformula il disaccordo in modo neutro, chiedi il punto sottostante e suggerisci una pausa o una stanza privata per il calore. JoinOrigin mantiene le interazioni comunitarie organizzate e calme per design, ma la de-escalation resta un'arte umana. Rallenta la conversazione e sposta il calore in una stanza privata.",
    'Tieni un registro degli incidenti significativi. Annota cosa è successo, cosa hai fatto e perché. Un registro semplice ti aiuta a essere coerente, imparare dai modelli e difendere le decisioni quando un membro chiede perché. JoinOrigin è un sistema operativo di comunità dove la storia della community vive in un unico posto — una casa naturale per un registro degli incidenti. Una semplice nota su cosa è successo e perché ti mantiene coerente.',
    'Condividi il carico con i co-moderatori. Recluta uno o due membri fidati e concorda le regole di applicazione. Una community che dipende da un unico moderatore diventa fragile e di parte. JoinOrigin non fornisce personale di moderazione — i co-moderatori sono membri come gli altri. I creatori assegnano i ruoli ai co-moderatori in Element — ruoli Matrix nativi, nessun sistema personalizzato. Recluta uno o due membri fidati e dai loro ruoli chiari.',
  ],
  steps: [
    {
      title: 'Scrivi da tre a cinque regole chiare',
      body: 'Mantienile brevi, specifiche e positive: "Sii rispettoso", "Resta in tema", "Niente spam o autopromozione", "Disaccordo sulle idee, non sulle persone". Pubblicale dove ogni nuovo membro le vedrà — idealmente fissate nella stanza.',
      joinOriginNote:
        'Su JoinOrigin le regole e i valori di una community sono visibili nella sua stanza dal primo giorno — i nuovi membri le vedono prima di unirsi. Fissa le tue regole brevi dove ogni nuovo membro le vedrà.',
    },
    {
      title: 'Imposta il tono come proprietario della stanza',
      body: "Modella il comportamento che vuoi — accogli i nuovi arrivati, ringrazia i contributori e affronta i problemi con calma. L'esempio del creatore imposta il livello culturale della community.",
      joinOriginNote:
        'JoinOrigin non sorveglia le community — il tono è impostato da creatori e membri. La piattaforma rende visibile il comportamento accogliente; modella il comportamento che vuoi nella stanza.',
    },
    {
      title: 'Possiedi la stanza come il creatore che sei',
      body: 'Il controllo del creatore su JoinOrigin è la proprietà della stanza Matrix: invita e rimuovi membri, assegna ruoli, modifica le impostazioni della stanza, fissa messaggi e archivia la stanza — applicato nativamente in Element. Conoscere questi controlli è la metà tecnica della moderazione.',
      joinOriginNote:
        'JoinOrigin dà al creatore la piena proprietà della stanza dalla pubblicazione, senza un sistema di permessi personalizzato. Impara i controlli di moderazione della piattaforma che usi e designa un proprietario chiaro.',
    },
    {
      title: 'Concorda un percorso di applicazione',
      body: "Definisci una risposta a tappe: avvertimento privato, poi limiti (muto, pubblicazione limitata — spesso un cambio di ruolo), poi la rimozione per violazioni ripetute o gravi. Un'escalation coerente è più equa dell'improvvisazione.",
      joinOriginNote:
        'Su JoinOrigin i ruoli sono i ruoli Matrix standard in Element — muto, ban e assegnazione dei ruoli sono azioni native. Scrivi il percorso di applicazione e rispettalo.',
    },
    {
      title: 'Agisci presto e con calma',
      body: 'Affronta il primo segno di un problema in privato, prima che diventi un incidente pubblico. Un intervento precoce e calmo è la moderazione più economica che esista.',
      joinOriginNote:
        "JoinOrigin non modera al posto tuo — l'intervento precoce e calmo è una competenza umana. La piattaforma è progettata così i problemi emergono visibilmente nella stanza e vengono colti presto. Contatta in privato al primo segno.",
    },
    {
      title: 'Impara le tecniche di de-escalation',
      body: "Quando le tensioni salgono, rallenta la conversazione: riconosci l'emozione, riformula il disaccordo in modo neutro, chiedi il punto sottostante e suggerisci una pausa o una stanza privata per il calore.",
      joinOriginNote:
        "JoinOrigin mantiene le interazioni comunitarie organizzate e calme per design, ma la de-escalation resta un'arte umana. Rallenta la conversazione e sposta il calore in una stanza privata.",
    },
    {
      title: 'Tieni un registro degli incidenti significativi',
      body: 'Annota cosa è successo, cosa hai fatto e perché. Un registro semplice ti aiuta a essere coerente, imparare dai modelli e difendere le decisioni quando un membro chiede perché.',
      joinOriginNote:
        'JoinOrigin è un sistema operativo di comunità dove la storia della community vive in un unico posto — una casa naturale per un registro degli incidenti. Una semplice nota su cosa è successo e perché ti mantiene coerente.',
    },
    {
      title: 'Condividi il carico con i co-moderatori',
      body: 'Recluta uno o due membri fidati e concorda le regole di applicazione. Una community che dipende da un unico moderatore diventa fragile e di parte.',
      joinOriginNote:
        'JoinOrigin non fornisce personale di moderazione — i co-moderatori sono membri come gli altri. I creatori assegnano i ruoli ai co-moderatori in Element — ruoli Matrix nativi, nessun sistema personalizzato. Recluta uno o due membri fidati e dai loro ruoli chiari.',
    },
  ],
};

export default content;
