import type { RegionContent } from '../../types';

/**
 * Contenuto della Lombardia — traduzione italiana (file di contenuto per
 * lingua).
 *
 * Testo della pagina regione `it` della Lombardia su
 * `/it/location/italy/lombardy`.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'it',
  slug: 'lombardy',
  title: 'Origins in Lombardia | JoinOrigin',
  description:
    'Trova o crea Origins in Lombardia — dalle scene startup e di design di Milano alle associazioni della regione. Lista d’attesa di JoinOrigin.',
  intro:
    'La Lombardia è la potenza economica dell’Italia, una regione settentrionale che genera una grande fetta della produzione nazionale e ospita le comunità professionali più dense del Paese. Milano, il capoluogo regionale e centro finanziario italiano, è il punto di riferimento della scena: design, moda, finanza e un ecosistema startup in crescita si concentrano intorno a spazi di coworking, università e al celebre distretto del design della città. Oltre Milano, le città e i paesi della regione — Bergamo, Brescia, Como e Monza, tra gli altri — mantengono comunità vivaci tutte loro, legate alle industrie locali, alle università e alla forte tradizione italiana di associazioni e circoli. I laghi e le montagne della regione rendono particolarmente attive le comunità all’aperto e sportive, dai club ciclistici intorno al Lago di Como ai gruppi di escursionismo nelle Alpi. I collegamenti di trasporto — l’alta velocità e una fitta rete regionale — tengono insieme la Lombardia, così una comunità ancorata a Milano può attrarre membri da tutta la regione. La tradizione dell’aperitivo rende facile l’incontro informale, e la ricchezza della regione sostiene una grande varietà di luoghi culturali, dai teatri d’opera agli spazi d’arte contemporanea. Che tu cerchi un meetup di design, un gruppo startup, un club sportivo o una rete di piccole imprese, la Lombardia offre un paesaggio denso e dinamico.',
  dataPoints: [
    'La Lombardia conta circa 10 milioni di abitanti nel nord Italia.',
    'Il capoluogo regionale è Milano; Bergamo, Brescia e Como sono grandi centri.',
    'La potenza economica d’Italia e un centro globale di design e moda.',
    'Forte cultura associativa (circoli) e sport all’aperto.',
  ],
  faq: [
    {
      question: 'La Lombardia è diversa dalla scena di Milano?',
      answer:
        'Sì. La Lombardia è la regione più ampia — Milano più le sue province. La maggior parte delle comunità professionali nazionali si riunisce a Milano, ma le province hanno scene locali forti legate all’industria, alle università e allo sport all’aperto.',
    },
    {
      question: 'Quali zone della Lombardia hanno comunità attive?',
      answer:
        'Milano è il polo più denso per design, finanza e startup; Bergamo, Brescia e Como hanno comunità locali attive, e i laghi e le montagne sostengono forti gruppi all’aperto e sportivi.',
    },
    {
      question: 'JoinOrigin opera in Lombardia?',
      answer:
        'Sì. JoinOrigin non ha uffici locali. La pagina della regione Lombardia è tradotta in italiano, e la piattaforma aiuta le persone a trovare o creare Origins in qualsiasi parte della regione.',
    },
  ],
};

export default content;
