import type { GuideContent } from '../../types';

/**
 * « Hoe organiseer je een meetup » — tijdloze L1-handleiding
 * (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt: meetups zijn wat een
 * groep NA het vormen doet — het digitale verbind→sluit-aan→kamer-traject
 * komt eerst (publiceer groep → kamer automatisch aangemaakt → leden sluiten
 * via link aan), en de fysieke meetup is een gevolg. De waarde van
 * JoinOrigin zit in de intro en elke stap (per stap een `joinOriginNote`),
 * met eerlijke framing — JoinOrigin boekt geen locaties en bemant geen
 * evenementen. «Kamer» verwijst naar de Matrix-kamer (§6.3) — fysieke
 * locaties worden beschreven als locaties/ruimtes, nooit als «kamers».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'organize-a-meetup',
  title: 'Hoe organiseer je een meetup: locaties, agenda en promotie | JoinOrigin',
  description:
    'Organiseer een meetup zodra je groep is gevormd — of die nu vorige maand is opgericht of al jaren bijeenkomt — kies een format, boek een locatie, bouw een agenda, promoot hem en run de avond. Een praktische checklist van JoinOrigin.',
  intro: [
    'Een meetup is een terugkerend fysiek evenement waar mensen rond een gedeelde interesse samenkomen — en op JoinOrigin is het een natuurlijke volgende stap na het communiceren in de kamer. Het digitale traject komt eerst: mensen vinden en voegen zich via een link bij een groep, en de kamer van de groep wordt de plek waar leden praten, plannen en tussen bijeenkomsten verbonden blijven. De fysieke meetup is de volgende stap van die gevormde community — of de groep nu vorige maand is opgericht of al jaren informeel bijeenkomt, de kamer geeft haar één georganiseerd thuis waaruit een meetup kan groeien.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt Origins te vinden om aan deel te nemen en zelf te starten — dus een meetup heeft een thuis waar geïnteresseerde leden de groep kunnen ontdekken, bij de kamer kunnen aansluiten en de bijeenkomst kunnen coördineren in plaats van afhankelijk te zijn van de contactlijst van één persoon. JoinOrigin boekt geen locaties en bemant geen evenementen — het hele doel van het platform is mensen verbinden die een interesse delen, en de bijeenkomst zelf is aan jou om te runnen.',
    'Deze handleiding behandelt de volledige levenscyclus van een meetup nadat de groep bestaat — voor een nieuw gevormde groep en voor een die al jaren bijeenkomt: een format kiezen dat bij je publiek past, een locatie vinden en boeken zonder het budget te breken, een agenda bouwen met een duidelijk begin en einde, het evenement promoten waar je publiek daadwerkelijk kijkt en de avond runnen zodat bezoekers de volgende willen. Elke stap bevat een notitie over hoe JoinOrigin helpt — en de eerste stap gaat over de digitale groep, want zonder groep en kamer is er geen community om te ontmoeten.',
  ],
  dataPoints: [
    'Een simpele meetup heeft maar drie dingen nodig: een format, een locatie en een promotiekanaal.',
    'Avond-meetups op doordeweekse dagen en zaterdagochtendsessies zijn de meest voorkomende terugkerende formats.',
    'De meeste locaties — bibliotheken, cafés, coworking-ruimtes — bieden gratis of goedkope ruimte voor community-evenementen.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt Origins te vinden of te starten; het boekt geen locaties en bemant geen evenementen.',
  ],
  faq: [
    {
      question: 'Hoe ver van tevoren moet ik een meetup promoten?',
      answer:
        'Twee tot drie weken is een goede balans: vroeg genoeg om te plannen, kort genoeg om urgentie te houden. Kondig hem eerst aan in de kamer van de groep en deel het evenement dan waar je publiek samenkomt. Stuur twee dagen van tevoren een herinnering en nog één op de dag zelf.',
    },
    {
      question: 'Wat als er maar een paar mensen komen?',
      answer:
        'Dat is normaal, vooral in het begin. Draai de sessie voor wie er is, verzamel hun feedback in de kamer en gebruik de volgende editie om de promotie te verbeteren. Consistentie is belangrijker dan welke enkele opkomst dan ook.',
    },
    {
      question: 'Hebben meetups een formele agenda nodig?',
      answer:
        'Ja, een lichte. Een duidelijk begin, een korte voorstelronde, één hoofdactiviteit of praatje en een vast eindtijdstip laten bezoekers voelen dat hun tijd is gerespecteerd — dat is wat hen terugbrengt.',
    },
    {
      question: 'Kan JoinOrigin mij helpen meetups te organiseren?',
      answer:
        'Ja. JoinOrigin helpt mensen Origins te vinden en te starten — één georganiseerd digitaal thuis waar de kamer van een groep de plek is waar leden coördineren en waar een meetup kan worden ontdekt. JoinOrigin organiseert zelf geen evenementen, dus de praktische stappen in deze handleiding zijn aan jou om te runnen.',
    },
  ],
  sections: [
    'Vorm eerst de groep en open de kamer. Een meetup is wat een groep doet nadat hij is gevormd — dus begin met de digitale kern: publiceer de groep, laat de kamer automatisch aanmaken en nodig leden via een link uit. Een groep publiceren op JoinOrigin maakt automatisch de kamer aan, een door de maker beheerde ruimte waar leden plannen en verbonden blijven. Richt je groep en kamer ook in de tools die je al gebruikt in, voordat je één evenement plant, als je dat liever wilt.',
    'Kies een format dat bij je publiek past. Kies tussen een praatje, een workshop, een discussiekring, een sociale mixer of een werksessie. Stem het format af op wat het publiek wil — leren, verbinding of voortgang op gedeeld werk. Op JoinOrigin kunnen leden het format van een community zien voordat ze aansluiten — wat de juiste mensen aantrekt en verwachtingen stelt. Kies een format waar je publiek daadwerkelijk voor komt opdagen.',
    'Kies een datum en een ritme. Doordeweekse avonden en weekendochtenden werken het best voor de meeste doelgroepen. Kies een terugkerende plek — maandelijks is standaard — en bescherm haar als een afspraak zodat mensen een gewoonte kunnen opbouwen. JoinOrigin maakt het ritme van een community op één plek zichtbaar, zodat leden de volgende datum weten zonder te zoeken. Bescherm je terugkerende plek als een afspraak.',
    'Boek vroeg een locatie. Bibliotheken, cafés, coworking-lounges, buurthuizen en parken huisvesten community-evenementen tegen lage of geen kosten. Bevestig de capaciteit, openingstijden en boekingsvoorwaarden schriftelijk. JoinOrigin boekt geen locaties en coördineert geen fysieke ruimtes — de ontwerpfocus ligt op mensen verbinden in de digitale kamer. Bevestig capaciteit en openingstijden schriftelijk rechtstreeks met de locatie.',
    'Stel een lichte agenda op. Houd het simpel: welkom en intro, hoofdactiviteit, open discussie, afsluiting en volgende datum. Schat 60–90 minuten totaal en publiceer de agenda bij de evenementenlijst en in de kamer. JoinOrigin is een community-besturingssysteem waar gedeelde artefacten zoals agenda’s en notities naast de community leven. Een simpele gepubliceerde agenda is genoeg.',
    'Promoot waar je publiek al is. Deel het evenement in niche-groepen, lokale nieuwsbrieven, community-prikborden en relevante sociale kanalen — en wijs iedereen naar de join-link van de groep zodat bezoekers leden worden, geen eenmalige gasten. JoinOrigin is de plek waar mensen die een community zoeken haar vinden en via een link aansluiten. Promoot in de niche-groepen en nieuwsbrieven waar je publiek al samenkomt en deel de join-link met elke bezoeker.',
    'Run de avond met een duidelijk ritme. Open op tijd, begroet laatkomers, houd de hoofdactiviteit op koers en sluit af door de volgende datum aan te kondigen. Eindig op tijd — het is het sterkste teken van respect. JoinOrigin bemant geen evenementen — de ervaring is aan jou. Het platform houdt het verhaal van de community in één georganiseerde kamer — de belofte, het ritme en de mensen. Op tijd eindigen is het sterkste teken van respect.',
    'Volg binnen 24 uur op in de kamer. Bedank bezoekers, deel links of notities en nodig feedback uit waar de hele groep het kan zien. De opvolging is wat van een eenmalig evenement een terugkerende community maakt. JoinOrigin geeft een community een blijvende kamer waar de terugblik, de volgende datum en feedback leven — waardoor een eenmalig evenement een terugkerende community wordt. Word ontdekt en houd het momentum vast.',
  ],
  steps: [
    {
      title: 'Vorm eerst de groep en open de kamer',
      body: 'Een meetup is wat een groep doet nadat hij is gevormd — dus begin met de digitale kern: publiceer de groep, laat de kamer automatisch aanmaken en nodig leden via een link uit.',
      joinOriginNote:
        'Een groep publiceren op JoinOrigin maakt automatisch de kamer aan, een door de maker beheerde ruimte waar leden plannen en verbonden blijven. Richt je groep en kamer ook in de tools die je al gebruikt in, voordat je één evenement plant, als je dat liever wilt.',
    },
    {
      title: 'Kies een format dat bij je publiek past',
      body: 'Kies tussen een praatje, een workshop, een discussiekring, een sociale mixer of een werksessie. Stem het format af op wat het publiek wil — leren, verbinding of voortgang op gedeeld werk.',
      joinOriginNote:
        'Op JoinOrigin kunnen leden het format van een community zien voordat ze aansluiten — wat de juiste mensen aantrekt en verwachtingen stelt. Kies een format waar je publiek daadwerkelijk voor komt opdagen.',
    },
    {
      title: 'Kies een datum en een ritme',
      body: 'Doordeweekse avonden en weekendochtenden werken het best voor de meeste doelgroepen. Kies een terugkerende plek — maandelijks is standaard — en bescherm haar als een afspraak zodat mensen een gewoonte kunnen opbouwen.',
      joinOriginNote:
        'JoinOrigin maakt het ritme van een community op één plek zichtbaar, zodat leden de volgende datum weten zonder te zoeken. Bescherm je terugkerende plek als een afspraak.',
    },
    {
      title: 'Boek vroeg een locatie',
      body: 'Bibliotheken, cafés, coworking-lounges, buurthuizen en parken huisvesten community-evenementen tegen lage of geen kosten. Bevestig de capaciteit, openingstijden en boekingsvoorwaarden schriftelijk.',
      joinOriginNote:
        'JoinOrigin boekt geen locaties en coördineert geen fysieke ruimtes — de ontwerpfocus ligt op mensen verbinden in de digitale kamer. Bevestig capaciteit en openingstijden schriftelijk rechtstreeks met de locatie.',
    },
    {
      title: 'Stel een lichte agenda op',
      body: 'Houd het simpel: welkom en intro, hoofdactiviteit, open discussie, afsluiting en volgende datum. Schat 60–90 minuten totaal en publiceer de agenda bij de evenementenlijst en in de kamer.',
      joinOriginNote:
        'JoinOrigin is een community-besturingssysteem waar gedeelde artefacten zoals agenda’s en notities naast de community leven. Een simpele gepubliceerde agenda is genoeg.',
    },
    {
      title: 'Promoot waar je publiek al is',
      body: 'Deel het evenement in niche-groepen, lokale nieuwsbrieven, community-prikborden en relevante sociale kanalen — en wijs iedereen naar de join-link van de groep zodat bezoekers leden worden, geen eenmalige gasten.',
      joinOriginNote:
        'JoinOrigin is de plek waar mensen die een community zoeken haar vinden en via een link aansluiten. Promoot in de niche-groepen en nieuwsbrieven waar je publiek al samenkomt en deel de join-link met elke bezoeker.',
    },
    {
      title: 'Run de avond met een duidelijk ritme',
      body: 'Open op tijd, begroet laatkomers, houd de hoofdactiviteit op koers en sluit af door de volgende datum aan te kondigen. Eindig op tijd — het is het sterkste teken van respect.',
      joinOriginNote:
        'JoinOrigin bemant geen evenementen — de ervaring is aan jou. Het platform houdt het verhaal van de community in één georganiseerde kamer — de belofte, het ritme en de mensen. Op tijd eindigen is het sterkste teken van respect.',
    },
    {
      title: 'Volg binnen 24 uur op in de kamer',
      body: 'Bedank bezoekers, deel links of notities en nodig feedback uit waar de hele groep het kan zien. De opvolging is wat van een eenmalig evenement een terugkerende community maakt.',
      joinOriginNote:
        'JoinOrigin geeft een community een blijvende kamer waar de terugblik, de volgende datum en feedback leven — waardoor een eenmalig evenement een terugkerende community wordt. Word ontdekt en houd het momentum vast.',
    },
  ],
};

export default content;
