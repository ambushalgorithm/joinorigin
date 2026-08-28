import type { CountryContent } from '../../types';

/**
 * Contenuto dell’Italia — traduzione italiana (file di contenuto per
 * lingua).
 *
 * Testo della pagina paese `it` dell’Italia su `/it/location/italy`.
 * Il testo vive QUI, mai nei JSON di lingua (localizzazione R2/R5).
 * `title`/`description` portano i titoli/descrizioni SEO in italiano.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'it',
  slug: 'italy',
  title: 'Origins in Italia | JoinOrigin',
  description:
    'Trova o crea Origins in Italia — dalle scene startup di Milano alle associazioni locali, alla cultura del cibo e alle reti di piccole imprese. Lista d’attesa di JoinOrigin.',
  intro:
    'La vita comunitaria italiana si fonda sulla piazza, sull’associazionismo locale e su una cultura del cibo profondamente sociale. Nelle città e nei paesi di tutto il Paese, la piazza è il punto di ritrovo naturale — il luogo dove la gente si incontra dopo il lavoro, dove si svolgono le feste e dove l’identità di quartiere diventa visibile. Associazioni e circoli organizzano da sempre tutto, dallo sport alla musica, dalla politica al volontariato, e la tradizione cooperativa del Paese dà a molte comunità una sede formale. Milano, la capitale economica, ospita le scene professionali più dense: design, moda, finanza e una comunità startup in crescita si concentrano intorno a spazi di coworking e università. Roma, Torino, Bologna e Napoli mantengono scene vivaci tutte loro, con forti identità locali e comunità universitarie. La tradizione dell’aperitivo — un drink di inizio serata con stuzzichini — rende l’incontro informale un rituale quotidiano, mentre sagre e mercati di quartiere riuniscono le persone attorno a tavoli condivisi. L’inglese è sempre più comune negli ambienti professionali e delle startup, soprattutto a Milano. Che tu cerchi un meetup di design, un comitato di quartiere, un club di escursionismo o una rete di piccole imprese, l’Italia offre un paesaggio ricco e accogliente per trovare o creare un Origin.',
  dataPoints: [
    'Popolazione di circa 60,4 milioni in 20 regioni.',
    'L’italiano è la lingua principale, con lingue regionali e il tedesco parlati in alcune aree.',
    'La capitale è Roma; Milano è il polo economico e delle startup.',
    'Cultura della piazza, associazioni (circoli) e tradizione dell’aperitivo in tutto il Paese.',
  ],
  faq: [
    {
      question: 'Come trovo Origins in Italia?',
      answer:
        'Usa l’hub /location per scegliere una città, poi esplora le pagine dei tipi di gruppo: startup, creative, politiche, meetup e piccole imprese. I circoli locali, i gruppi parrocchiali e le associazioni culturali sono anche ottimi punti di partenza.',
    },
    {
      question: 'Posso creare un Origin in una città italiana?',
      answer:
        'Sì. Le città italiane hanno piazze, bar, spazi di coworking e sale associative che ospitano i primi incontri, e la tradizione dell’aperitivo rende facili i meetup informali. Le guide passo-passo coprono i passaggi pratici.',
    },
    {
      question: 'JoinOrigin opera in Italia?',
      answer:
        'Sì. JoinOrigin non ha uffici locali. Le pagine Italia e Milano sono tradotte in italiano, e la piattaforma aiuta le persone a trovare o creare Origins in qualsiasi parte del Paese.',
    },
  ],
};

export default content;
