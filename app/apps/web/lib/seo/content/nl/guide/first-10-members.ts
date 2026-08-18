import type { GuideContent } from '../../types';

/**
 * « Hoe haal je je eerste 10 leden binnen » — tijdloze L1-handleiding
 * (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: de kamer is het aansluit-oppervlak — leden
 * komen binnen via uitnodigingslinks en sluiten aan bij de kamer van de
 * groep, waar de community echt leeft. De waarde van JoinOrigin zit in de
 * intro en elke stap (per stap een `joinOriginNote`), met eerlijke framing —
 * JoinOrigin werft geen leden en organiseert geen evenementen. «Kamer»
 * verwijst naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'first-10-members',
  title:
    'Hoe haal je je eerste 10 leden binnen voor een nieuwe of groeiende community | JoinOrigin',
  description:
    'Haal je eerste 10 leden binnen zonder groot budget — of je nu een nieuwe community lanceert of een bestaande nieuw leven inblaast — start vanuit je persoonlijke netwerk, deel uitnodigingslinks en maak van de kamer de plek waar mensen zich willen aansluiten. Praktische stappen van JoinOrigin.',
  intro: [
    'De eerste tien leden zijn het moeilijkst te krijgen en het belangrijkst, omdat ze de cultuur van een community bepalen voordat die enige reputatie heeft om vreemden aan te trekken — en ze zijn net zo waardevol wanneer een bestaande community stagneert of opnieuw begint, omdat een toegewijde kern is wat van een stille groep een levende maakt. Dat eerste-tien-probleem is fundamenteel een mensen-verbinden-probleem, en het is het kernprobleem dat JoinOrigin oplost.',
    'JoinOrigin is een community-besturingssysteem dat is gebouwd rond de digitale verbind→sluit-aan→kamer-loop: je publiceert een groep, de kamer wordt automatisch aangemaakt en leden sluiten via een link aan. De kamer is het aansluit-oppervlak — elke persoon die op Lid worden klikt of een uitnodigingslink volgt, komt in de kamer van de groep terecht, de enige plek waar de community leeft en waar nieuwe leden zich direct verbonden voelen. JoinOrigin werft geen leden en organiseert geen evenementen — dat deel is aan jou. Het platform maakt ontdekken en aansluiten aanzienlijk gemakkelijker; vroege groei komt nog steeds uit persoonlijk bereik: de mensen die je direct met een link uitnodigt, degenen die zij meenemen en degenen die blijven omdat de kamer levend voelt.',
    'Deze handleiding breekt het eerste-tien-leden-probleem op in concrete stappen — of je nu een nieuwe community start of een bestaande nieuw leven inblaast: beginnen bij de mensen die je al kent, je groep publiceren zodat er een kamer is om aan te sluiten, persoonlijk met links uitnodigen, een eerste bijeenkomst organiseren die bezoekers in promotors verandert en een simpele verwijzingsgewoonte opbouwen zodat elk lid de volgende meebrengt — en elke stap laat zien waar JoinOrigin helpt.',
  ],
  dataPoints: [
    'Persoonlijke uitnodigingen converteren veel beter dan openbare berichten of betaalde advertenties.',
    'Een uitnodigingslink verwijdert elke barrière: één klik en een nieuw lid zit in de kamer.',
    'Tien actieve leden is genoeg sociaal bewijs voor de meeste mensen om een groep echt en de moeite waard te vinden.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s te vinden of te starten — het werft geen leden en organiseert geen evenementen.',
  ],
  faq: [
    {
      question: 'Waarom specifiek tien leden?',
      answer:
        'Tien is een kantelpunt: met tien vaste deelnemers heb je een levendige kamer, een betrouwbare kern voor discussie en genoeg sociaal bewijs om nieuwkomers aan te trekken die anders zouden aarzelen. Onder de tien voelt de kamer fragiel.',
    },
    {
      question: 'Hoe lang duurt het om de eerste tien leden te krijgen?',
      answer:
        'Met consistente persoonlijke uitnodigingen en een goede eerste bijeenkomst bereiken de meeste organisatoren binnen drie tot zes weken tien toegewijde leden. De sleutel is elke week uitnodigen — links delen, opvolgen en de kamer actief houden — niet wachten op een grote lancering.',
    },
    {
      question: 'Wat als ik geen groot persoonlijk netwerk heb?',
      answer:
        'Begin kleiner: nodig vijf mensen uit die je kent, vraag elk van hen één persoon mee te nemen en plaats berichten in twee niche-groepen waar je publiek al samenkomt. Elk lid dat je behoudt wordt een kanaal naar het eigen netwerk — en elke uitnodiging kan een simpele link naar de kamer zijn.',
    },
    {
      question: 'Kan JoinOrigin mij helpen leden te vinden?',
      answer:
        'Ja. JoinOrigin helpt mensen community’s te ontdekken en te starten — een plek waar mensen die een groep zoeken de jouwe kunnen vinden en via een link bij de kamer kunnen aansluiten. De stappen in deze handleiding — persoonlijke uitnodigingen en een geweldige eerste bijeenkomst — zijn de meest betrouwbare manieren om je eerste leden te vinden.',
    },
  ],
  sections: [
    'Maak een lijst van vijftig mensen die je al kent. Schrijf iedereen op die bij het doel van de community past: vrienden, collega’s, klasgenoten, oud-collega’s, buren en online kennissen. Je hebt ongeveer vijf keer meer namen nodig dan de tien die je wilt. JoinOrigin geeft je community een zichtbaar thuis en een kamer die mensen kunnen vinden — maar de eerste namen komen nog steeds uit mensen die je kent. Maak een lijst van vijftig en behandel elke naam als een persoonlijke introductie.',
    'Publiceer je groep en open de kamer. Een community waar je niet naar kunt wijzen bestaat nog niet — en een community waarvan het thuis over chats en lijsten verspreid is, is bijna even moeilijk te laten groeien. Publiceer de groep met een duidelijke missie en laat de kamer automatisch aanmaken zodat er een echte plek is waar leden kunnen landen. Een groep publiceren op JoinOrigin maakt automatisch de kamer aan — de kamer is het aansluit-oppervlak en de maker is er vanaf het begin eigenaar van. Richt je groep en kamer ook in de tools die je al gebruikt in, voordat je iemand uitnodigt, als je dat liever wilt.',
    'Nodig persoonlijk uit met een specifieke vraag en een link. Stuur een kort bericht met daarin de community, de eerste datum of het eerste gesprek en waarom je denkt dat ze het leuk zouden vinden — en voeg de join-link toe. Persoonlijke berichten verslaan generieke berichten, en een specifieke datum verslaat een vage belofte. JoinOrigin verwijdert de frictie van aansluiten zodra mensen je vinden — één link, één klik, de kamer in. Een kort persoonlijk bericht met een specifieke datum en een link converteert beter dan welk openbaar bericht dan ook.',
    'Vraag elke genodigde één persoon mee te nemen. Maak het een normaal onderdeel van de vraag: “Neem een vriend mee die dit misschien leuk vindt.” Verwijzingsuitnodigingen zijn hoe kleine netwerken uitgroeien tot echte community’s. JoinOrigin geeft leden één deelbaar thuis voor de community — zodat verwijzingsgesprekken naar een echte link en een echte kamer wijzen. Maak “neem een vriend mee” onderdeel van de vraag en geef hen de link om te delen.',
    'Organiseer één echt goede eerste bijeenkomst. Besteed je energie aan de ervaring, niet aan het aantal: een warm welkom, een duidelijk format en een vast eindtijdstip. Mensen die genieten van de eerste bijeenkomst brengen de volgende tien mee. JoinOrigin organiseert geen evenementen — de ervaring is aan jou. Het platform helpt de community eromheen te vormen: één kamer waar leden achteraf naar kunnen wijzen en de verbinding kunnen vasthouden.',
    'Nodig elke bezoeker uit in de kamer. Aan het einde van de bijeenkomst deel je de join-link en voeg je iedereen toe die wil blijven. De kamer is waar de community tussen bijeenkomsten leeft — een lid dat in de kamer is aangesloten, is een lid dat waarschijnlijk terugkomt. JoinOrigin houdt het lidmaatschap en de communicatie van je community in één georganiseerde kamer in plaats van een aanmeldlijst. Een simpele link naar de kamer houdt de opvolging mogelijk.',
    'Volg binnen 24 uur op met een volgende datum. Bedank elke bezoeker, deel een terugblik van één alinea en bevestig de volgende bijeenkomst — in de kamer, waar iedereen het kan zien. De opvolging is waar een eenmalige bezoeker een lid wordt. Op JoinOrigin heeft een opvolging een natuurlijk thuis — één plek waar de terugblik en de volgende datum leven. Een persoonlijk bedankje binnen 24 uur is wat een bezoeker in een lid verandert.',
    'Maak het triviaal gemakkelijk om anderen uit te nodigen. Geef leden één zin die ze kunnen herhalen en één link die ze kunnen delen: “Het is een maandelijkse meetup voor nieuwe founders om lessen te delen — doe hier mee.” Een duidelijke, korte beschrijving is het meest effectieve wervingsmiddel. JoinOrigin laat een community op één plek beschrijven, vinden en aansluiten — leden kunnen mensen naar de kamer wijzen in plaats van hem uit te leggen. Geef leden één zin en één link die ze kunnen herhalen.',
  ],
  steps: [
    {
      title: 'Maak een lijst van vijftig mensen die je al kent',
      body: 'Schrijf iedereen op die bij het doel van de community past: vrienden, collega’s, klasgenoten, oud-collega’s, buren en online kennissen. Je hebt ongeveer vijf keer meer namen nodig dan de tien die je wilt.',
      joinOriginNote:
        'JoinOrigin geeft je community een zichtbaar thuis en een kamer die mensen kunnen vinden — maar de eerste namen komen nog steeds uit mensen die je kent. Maak een lijst van vijftig en behandel elke naam als een persoonlijke introductie.',
    },
    {
      title: 'Publiceer je groep en open de kamer',
      body: 'Een community waar je niet naar kunt wijzen bestaat nog niet — en een community waarvan het thuis over chats en lijsten verspreid is, is bijna even moeilijk te laten groeien. Publiceer de groep met een duidelijke missie en laat de kamer automatisch aanmaken zodat er een echte plek is waar leden kunnen landen.',
      joinOriginNote:
        'Een groep publiceren op JoinOrigin maakt automatisch de kamer aan — de kamer is het aansluit-oppervlak en de maker is er vanaf het begin eigenaar van. Richt je groep en kamer ook in de tools die je al gebruikt in, voordat je iemand uitnodigt, als je dat liever wilt.',
    },
    {
      title: 'Nodig persoonlijk uit met een specifieke vraag en een link',
      body: 'Stuur een kort bericht met daarin de community, de eerste datum of het eerste gesprek en waarom je denkt dat ze het leuk zouden vinden — en voeg de join-link toe. Persoonlijke berichten verslaan generieke berichten, en een specifieke datum verslaat een vage belofte.',
      joinOriginNote:
        'JoinOrigin verwijdert de frictie van aansluiten zodra mensen je vinden — één link, één klik, de kamer in. Een kort persoonlijk bericht met een specifieke datum en een link converteert beter dan welk openbaar bericht dan ook.',
    },
    {
      title: 'Vraag elke genodigde één persoon mee te nemen',
      body: 'Maak het een normaal onderdeel van de vraag: “Neem een vriend mee die dit misschien leuk vindt.” Verwijzingsuitnodigingen zijn hoe kleine netwerken uitgroeien tot echte community’s.',
      joinOriginNote:
        'JoinOrigin geeft leden één deelbaar thuis voor de community — zodat verwijzingsgesprekken naar een echte link en een echte kamer wijzen. Maak “neem een vriend mee” onderdeel van de vraag en geef hen de link om te delen.',
    },
    {
      title: 'Organiseer één echt goede eerste bijeenkomst',
      body: 'Besteed je energie aan de ervaring, niet aan het aantal: een warm welkom, een duidelijk format en een vast eindtijdstip. Mensen die genieten van de eerste bijeenkomst brengen de volgende tien mee.',
      joinOriginNote:
        'JoinOrigin organiseert geen evenementen — de ervaring is aan jou. Het platform helpt de community eromheen te vormen: één kamer waar leden achteraf naar kunnen wijzen en de verbinding kunnen vasthouden.',
    },
    {
      title: 'Nodig elke bezoeker uit in de kamer',
      body: 'Aan het einde van de bijeenkomst deel je de join-link en voeg je iedereen toe die wil blijven. De kamer is waar de community tussen bijeenkomsten leeft — een lid dat in de kamer is aangesloten, is een lid dat waarschijnlijk terugkomt.',
      joinOriginNote:
        'JoinOrigin houdt het lidmaatschap en de communicatie van je community in één georganiseerde kamer in plaats van een aanmeldlijst. Een simpele link naar de kamer houdt de opvolging mogelijk.',
    },
    {
      title: 'Volg binnen 24 uur op met een volgende datum',
      body: 'Bedank elke bezoeker, deel een terugblik van één alinea en bevestig de volgende bijeenkomst — in de kamer, waar iedereen het kan zien. De opvolging is waar een eenmalige bezoeker een lid wordt.',
      joinOriginNote:
        'Op JoinOrigin heeft een opvolging een natuurlijk thuis — één plek waar de terugblik en de volgende datum leven. Een persoonlijk bedankje binnen 24 uur is wat een bezoeker in een lid verandert.',
    },
    {
      title: 'Maak het triviaal gemakkelijk om anderen uit te nodigen',
      body: 'Geef leden één zin die ze kunnen herhalen en één link die ze kunnen delen: “Het is een maandelijkse meetup voor nieuwe founders om lessen te delen — doe hier mee.” Een duidelijke, korte beschrijving is het meest effectieve wervingsmiddel.',
      joinOriginNote:
        'JoinOrigin laat een community op één plek beschrijven, vinden en aansluiten — leden kunnen mensen naar de kamer wijzen in plaats van hem uit te leggen. Geef leden één zin en één link die ze kunnen herhalen.',
    },
  ],
};

export default content;
