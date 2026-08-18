import type { GuideContent } from '../../types';

/**
 * « Hoe publiceer je een idee » — tijdloze L1-handleiding (design §6.1, TASK-353).
 *
 * Nederlandse vertaling van de EN-content. Geschreven tegen de kernloop van
 * het product-schermstroom §2: Ontdekken → openbare idee-pagina → lid worden
 * via link → kamer automatisch aangemaakt BIJ PUBLICATIE → maker beheert de
 * kamer → groei via feed/uitnodigingen. De idee-pagina is de openbare belofte;
 * de kamer is waar geïnteresseerden samenkomen en praten. Het platform is
 * live: een idee publiceren maakt nu de pagina en kamer aan. «Kamer» verwijst
 * naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'publish-an-idea',
  title: 'Hoe publiceer je een idee: maak van een vonk een vindbare idee-pagina | JoinOrigin',
  description:
    'Publiceer een idee op JoinOrigin — of het nu een nieuw vonkje is of een bestaand project dat je vindbaar wilt maken — schrijf een openbare idee-pagina, laat de kamer automatisch openen en nodig de mensen uit die het met jou willen bouwen. Praktische stappen van JoinOrigin.',
  intro: [
    'De meeste ideeën sterven in concepten — een notitie op je telefoon, een halfvergeten gesprek, een document dat niemand ooit heeft gezien. De reden is zelden dat het idee slecht is. Het is dat niemand het kon vinden, en de juiste mensen vinden is het hele spel. Dat verbindingsprobleem is precies wat JoinOrigin oplost — of het idee nu een gloednieuw vonkje is of een bestaand project dat stilletjes doorgaat zonder vindbaar thuis.',
    'De JoinOrigin-loop werkt zo: je publiceert een idee, er verschijnt een openbare idee-pagina en de kamer wordt automatisch aangemaakt op het moment van publiceren. Mensen ontdekken de pagina via Ontdekken of volgen een link die je deelt, en lid worden is één klik. Ze komen terecht in de kamer — een door de maker beheerde Matrix-kamer waar het gesprek over het idee echt plaatsvindt. De maker is vanaf seconde nul eigenaar van de kamer en bepaalt wie erbij komt en wat er binnen gebeurt.',
    'Deze handleiding doorloopt het hele traject: het idee samenvatten in één duidelijke zin, een pagina schrijven die mensen kunnen vinden, publiceren en de kamer openen, de join-link delen, de eerste geïnteresseerden uitnodigen, het eerste gesprek begeleiden, het idee aanscherpen op basis van echte feedback en het idee vindbaar houden terwijl het groeit. Het werkt voor elk idee — een klein bedrijf, een startup, een boekenclub, een community-project, een product dat nog niet bestaat, of een project dat al bestaat en meer mensen eromheen nodig heeft.',
  ],
  dataPoints: [
    'Een idee in één zin is vindbaarder dan een lang document — helderheid is een ontdekkingsfunctie.',
    'Op JoinOrigin maakt het publiceren van een idee automatisch de kamer aan — er is nooit een aparte stap “de chat later maken”.',
    'Een join-link is de eenvoudigste uitnodiging: één link, één klik en een geïnteresseerd persoon zit in de kamer.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt ideeën en de mensen erachter te vinden — publiceer je idee en de kamer opent meteen.',
  ],
  faq: [
    {
      question: 'Wat is een idee-pagina precies?',
      answer:
        'Een idee-pagina is het openbare, vindbare thuis van een idee op JoinOrigin — een duidelijke pagina die vertelt wat het idee is, waarom het ertoe doet en voor wie het bedoeld is, met een actie Lid worden. Mensen ontdekken hem via Ontdekken of een gedeelde link, en lid worden leidt hen naar de kamer van het idee.',
    },
    {
      question: 'Wanneer wordt de kamer aangemaakt?',
      answer:
        'De kamer wordt automatisch aangemaakt op het moment dat je het idee publiceert. De maker is vanaf seconde nul eigenaar van de kamer en kan in Element uitnodigen, verwijderen en rollen toewijzen. Je kunt dezelfde opzet — een openbare pagina plus een kamer — ook maken met tools die je al gebruikt.',
    },
    {
      question: 'Hoe vinden mensen mijn idee?',
      answer:
        'Via ontdekking en delen: een idee-pagina is indexeerbaar en verschijnt in Ontdekken, en elke join-link die je deelt wijst er direct naartoe. Het meest betrouwbare vroege verkeer is persoonlijk — de pagina en de link delen met mensen die zich al om het probleem bekommeren.',
    },
    {
      question: 'Wat is het verschil tussen een idee en een project?',
      answer:
        'Een idee is een voorstel waar mensen zich omheen verzamelen — de kamer is waar geïnteresseerden praten en de klik testen. Een project is wat een gevormde groep samen gaat doen, met een eigen projectpagina en kamer. Publiceer eerst het idee; het project volgt wanneer mensen zich committeren.',
    },
    {
      question: 'Kan JoinOrigin mij vandaag helpen een idee te publiceren?',
      answer:
        'Ja. Een idee publiceren op JoinOrigin maakt pagina en kamer atomair aan — de kamer opent op het moment van publiceren en jij beheert hem vanaf het begin. Publiceer je idee en open een kamer voor discussie; elk nieuw lid dat je uitnodigt vergroot je bereik.',
    },
  ],
  sections: [
    'Definieer het idee in één duidelijke zin. Druk het idee samen tot één zin: voor wie het is, wat het verandert en waarom het ertoe doet. Kun je het niet in één zin zeggen, dan ben je niet klaar om te publiceren. JoinOrigin is ontworpen rond vindbare idee-pagina’s — een pitch van één zin is de kern van de pagina en de zin waar mensen op zullen zoeken. Schrijf de zin op en test hem op drie mensen voordat je verder gaat.',
    'Schrijf de idee-pagina met een belofte en een behoefte. De pagina moet het idee benoemen, waarom het ertoe doet, wat het nodig heeft en wie je wilt laten aansluiten. Wees eerlijk over waar het idee staat — een vonk, een prototype, een product. JoinOrigin maakt de pagina en kamer automatisch aan wanneer je een idee publiceert; de maker beheert de kamer vanaf het begin en kan in Element uitnodigen, verwijderen en rollen toewijzen. Publiceer het idee en open een kamer voor de discussie eromheen.',
    'Publiceer het idee en laat de kamer openen. Publiceren is het moment waarop het idee vindbaar wordt. Op JoinOrigin maakt publiceren automatisch de kamer aan — er is nooit een stap “de chat later maken” en de maker is vanaf seconde nul eigenaar. Op JoinOrigin zijn de idee-pagina en de kamer één atomair gepubliceerd geheel. Je kunt de pagina ook openbaar delen en de kamer opzetten in de tools die je al gebruikt.',
    'Deel de join-link. De join-link is de kortste weg van interesse naar verbinding: één link, één klik en een geïnteresseerd persoon komt in de kamer terecht. Zet hem overal waar de juiste mensen samenkomen. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je idee is genoeg.',
    'Nodig de eerste geïnteresseerden persoonlijk uit. Persoonlijke uitnodigingen converteren beter dan openbare berichten. Stuur mensen die bij het publiek van het idee passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen die het mogelijk interessant vindt. JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    'Begeleid het eerste gesprek in de kamer. De eerste gesprekken bepalen of een idee momentum krijgt. Open de kamer met een duidelijke vraag — wat is het probleem, wat is de eerste stap, wat brengt ieder van jullie mee — en laat mensen reageren. JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het idee één kamer waar interesse een gesprek wordt, en de maker is eigenaar van die kamer. Begin het gesprek waar jouw mensen al zijn.',
    'Verzamel feedback en scherp het idee aan. Vraag aangeslotenen wat hen enthousiasmeert, wat hen zorgen baart en wat zij als eerste zouden doen. Pas de pitch, de reikwijdte of de volgende stap aan op basis van hun antwoorden. JoinOrigin bewaart het gedeelde geheugen van een idee op één plek — notities, beslissingen en feedback in de kamer — zodat aanscherping zichtbaar is in plaats van verloren. Vraag leden na de eerste week direct in de kamer.',
    'Houd het idee vindbaar terwijl het groeit. Bezoek de pagina opnieuw naarmate het idee zich ontwikkelt — werk de belofte, de behoeften en de volgende stap bij, zodat nieuwe aansluiters altijd de huidige versie zien. Groei stapelt zich op wanneer elk lid het idee in één zin kan beschrijven en de join-link kan delen. JoinOrigin houdt je idee-pagina en kamer verbonden naarmate de interesse groeit — één plek waar de belofte, het gesprek en de mensen zichtbaar zijn. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Definieer het idee in één duidelijke zin',
      body: 'Druk het idee samen tot één zin: voor wie het is, wat het verandert en waarom het ertoe doet. Kun je het niet in één zin zeggen, dan ben je niet klaar om te publiceren.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond vindbare idee-pagina’s — een pitch van één zin is de kern van de pagina en de zin waar mensen op zullen zoeken. Schrijf de zin op en test hem op drie mensen voordat je verder gaat.',
    },
    {
      title: 'Schrijf de idee-pagina met een belofte en een behoefte',
      body: 'De pagina moet het idee benoemen, waarom het ertoe doet, wat het nodig heeft en wie je wilt laten aansluiten. Wees eerlijk over waar het idee staat — een vonk, een prototype, een product.',
      joinOriginNote:
        'JoinOrigin maakt de pagina en kamer automatisch aan wanneer je een idee publiceert; de maker beheert de kamer vanaf het begin en kan in Element uitnodigen, verwijderen en rollen toewijzen. Publiceer het idee en open een kamer voor de discussie eromheen.',
    },
    {
      title: 'Publiceer het idee en laat de kamer openen',
      body: 'Publiceren is het moment waarop het idee vindbaar wordt. Op JoinOrigin maakt publiceren automatisch de kamer aan — er is nooit een stap “de chat later maken” en de maker is vanaf seconde nul eigenaar.',
      joinOriginNote:
        'Op JoinOrigin zijn de idee-pagina en de kamer één atomair gepubliceerd geheel. Je kunt de pagina ook openbaar delen en de kamer opzetten in de tools die je al gebruikt.',
    },
    {
      title: 'Deel de join-link',
      body: 'De join-link is de kortste weg van interesse naar verbinding: één link, één klik en een geïnteresseerd persoon komt in de kamer terecht. Zet hem overal waar de juiste mensen samenkomen.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je idee is genoeg.',
    },
    {
      title: 'Nodig de eerste geïnteresseerden persoonlijk uit',
      body: 'Persoonlijke uitnodigingen converteren beter dan openbare berichten. Stuur mensen die bij het publiek van het idee passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen die het mogelijk interessant vindt.',
      joinOriginNote:
        'JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    },
    {
      title: 'Begeleid het eerste gesprek in de kamer',
      body: 'De eerste gesprekken bepalen of een idee momentum krijgt. Open de kamer met een duidelijke vraag — wat is het probleem, wat is de eerste stap, wat brengt ieder van jullie mee — en laat mensen reageren.',
      joinOriginNote:
        'JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het idee één kamer waar interesse een gesprek wordt, en de maker is eigenaar van die kamer. Begin het gesprek waar jouw mensen al zijn.',
    },
    {
      title: 'Verzamel feedback en scherp het idee aan',
      body: 'Vraag aangeslotenen wat hen enthousiasmeert, wat hen zorgen baart en wat zij als eerste zouden doen. Pas de pitch, de reikwijdte of de volgende stap aan op basis van hun antwoorden.',
      joinOriginNote:
        'JoinOrigin bewaart het gedeelde geheugen van een idee op één plek — notities, beslissingen en feedback in de kamer — zodat aanscherping zichtbaar is in plaats van verloren. Vraag leden na de eerste week direct in de kamer.',
    },
    {
      title: 'Houd het idee vindbaar terwijl het groeit',
      body: 'Bezoek de pagina opnieuw naarmate het idee zich ontwikkelt — werk de belofte, de behoeften en de volgende stap bij, zodat nieuwe aansluiters altijd de huidige versie zien. Groei stapelt zich op wanneer elk lid het idee in één zin kan beschrijven en de join-link kan delen.',
      joinOriginNote:
        'JoinOrigin houdt je idee-pagina en kamer verbonden naarmate de interesse groeit — één plek waar de belofte, het gesprek en de mensen zichtbaar zijn. Word ontdekt en groei.',
    },
  ],
};

export default content;
