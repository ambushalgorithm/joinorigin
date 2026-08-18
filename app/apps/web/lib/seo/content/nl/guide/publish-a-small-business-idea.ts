import type { GuideContent } from '../../types';

/**
 * « Hoe publiceer je een klein-bedrijfsidee » — tijdloze L1-handleiding
 * (design §6.1, TASK-353).
 *
 * Nederlandse vertaling van de EN-content. Geschreven tegen de kernloop van
 * het product-schermstroom §2: publiceer een klein-bedrijfsidee → openbare
 * idee-pagina → lid worden via link → kamer automatisch aangemaakt BIJ
 * PUBLICATIE → maker beheert de kamer → groei via feed/uitnodigingen. De
 * idee-pagina is de etalage-belofte; de kamer is waar klanten, samenwerkers
 * en vroege gelovigen zich rond het bedrijf verzamelen. Het platform is
 * live: een idee publiceren maakt nu de pagina en kamer aan. «Kamer»
 * verwijst naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'publish-a-small-business-idea',
  title: 'Hoe publiceer je een klein-bedrijfsidee: idee-pagina + kamer | JoinOrigin',
  description:
    'Publiceer een klein-bedrijfsidee op JoinOrigin — of je nu een nieuw bedrijf lanceert of een bestaand bedrijf deelt wat het biedt — schrijf een openbare idee-pagina, open de kamer automatisch en nodig klanten en samenwerkers uit die het willen zien gebeuren. Praktische stappen van JoinOrigin.',
  intro: [
    'Kleine bedrijven beginnen vaak op dezelfde manier — iemand merkt een echt probleem op in de buurt, op het werk of in een hobby en kan niet stoppen met denken over de oplossing — maar veel andere draaien al: een lopende winkel, een werkende dienst, een product met klanten. Of je bedrijf nu nog een vonk is of al mensen bedient, de volgende stap is hetzelfde: maak van wat je hebt iets dat anderen kunnen zien, waarop ze kunnen reageren en waarbij ze kunnen aansluiten. Een klein bedrijf heeft een openbaar thuis nodig en het heeft mensen eromheen nodig — vóórdat het een etalage nodig heeft, en nog lang daarna.',
    'De JoinOrigin-loop werkt zo: je publiceert een klein-bedrijfsidee, de openbare idee-pagina verschijnt en de kamer wordt automatisch aangemaakt op het moment van publiceren. Mensen ontdekken de pagina of volgen een link, lid worden is één klik en ze komen terecht in de kamer — een door de maker beheerde Matrix-kamer waar klanten, samenwerkers en vroege gelovigen vragen kunnen stellen, feedback kunnen delen en zich kunnen mengen. De maker is vanaf seconde nul eigenaar van de kamer en bepaalt wie aansluit en wat er binnen gebeurt.',
    'Deze handleiding doorloopt het publiceren van een klein-bedrijfsidee zoals je een winkel zou openen: de klant en het probleem benoemen, de idee-pagina als etalage schrijven, publiceren en de kamer openen, de pagina delen met je lokale netwerk, vroege klanten en samenwerkers uitnodigen, luisteren in de kamer, het aanbod aanscherpen op basis van echte feedback en de kamer laten uitgroeien tot je eerste klantenbestand.',
  ],
  dataPoints: [
    'De duidelijkste klein-bedrijfsideeën beginnen bij één benoemde klant en één specifiek probleem, niet bij een algemeen publiek.',
    'Op JoinOrigin maakt het publiceren van een idee automatisch de kamer aan — het bedrijf heeft vanaf het begin een plek voor klanten en samenwerkers.',
    'Een join-link is de eenvoudigste uitnodiging: één link, één klik en een geïnteresseerd persoon zit in de kamer.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt ideeën en de mensen erachter te vinden — publiceer je idee en de kamer opent meteen.',
  ],
  faq: [
    {
      question: 'Hoe verschilt een klein-bedrijfsidee van een gewone idee-pagina?',
      answer:
        'De pagina-indeling is hetzelfde, maar de belofte is scherper: een klant, een probleem en een aanbod. Waar een algemeen idee samenwerkers uitnodigt, nodigt een klein-bedrijfsidee-pagina vroege klanten en lokale gelovigen uit — mensen die daadwerkelijk zouden kopen, doorverwijzen of je zouden helpen starten of groeien wat al draait.',
    },
    {
      question: 'Wanneer wordt de kamer voor mijn bedrijfsidee aangemaakt?',
      answer:
        'De kamer wordt automatisch aangemaakt op het moment dat je het idee publiceert. De maker is vanaf seconde nul eigenaar van de kamer en kan in Element uitnodigen, verwijderen en rollen toewijzen. Je kunt ook een kamer openen met de tools die je al gebruikt en de mensen uitnodigen die zich om het probleem bekommeren.',
    },
    {
      question: 'Wie moet zich bij een klein-bedrijfsidee-kamer aansluiten?',
      answer:
        'Vroege klanten, mensen met de vaardigheid die je mist en lokale mensen die je kunnen doorverwijzen. De kamer is waar je de vraag test, het aanbod aanscherpt en de eerste gelovigen vindt — voordat je geld uitgeeft aan voorraad, huur of marketing.',
    },
    {
      question: 'Wat moet de idee-pagina beloven?',
      answer:
        'Eén benoemde klant, één probleem en wat je van plan bent aan te bieden. Wees eerlijk over de fase — “ik test dit idee en wil praten met mensen die dit probleem voelen” is een sterke belofte. De pagina bepaalt of de juiste mensen op Lid worden klikken.',
    },
    {
      question: 'Kan JoinOrigin mij vandaag helpen een klein-bedrijfsidee te publiceren?',
      answer:
        'Ja. Een idee publiceren op JoinOrigin maakt pagina en kamer atomair aan — de kamer opent op het moment van publiceren en jij beheert hem vanaf het begin. Publiceer het idee ergens openbaar en open een kamer voor discussie; elk nieuw lid dat je uitnodigt vergroot je bereik.',
    },
  ],
  sections: [
    'Benoem de klant en het probleem. Voordat je iets schrijft, benoem je de specifieke persoon die dit probleem voelt en beschrijf je het probleem in hun woorden. Een klein bedrijf slaagt wanneer het één echte behoefte goed bedient. JoinOrigin is ontworpen rond vindbare idee-pagina’s, en de duidelijkste pagina’s beginnen bij een benoemde klant. Schrijf de klant en het probleem op en test ze op drie mensen die passen.',
    'Schrijf de idee-pagina als etalage. De pagina moet laten zien wat je aanbiedt, voor wie het is, wat het kost in tijd of geld en in welke fase het idee zit. Houd het concreet — een pop-up, een product, een dienst, een winkel. Een idee publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Schets de pagina als een kort openbaar bericht en verfijn hem met feedback.',
    'Publiceer het idee en open de kamer. Publiceren is het moment waarop het bedrijfsidee vindbaar wordt. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar. Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Publiceer het idee openbaar en open een kamer voor het gesprek eromheen.',
    'Deel de pagina met je lokale netwerk. Kleine bedrijven groeien via lokaal bereik. Deel de idee-pagina met buren, collega’s, lokale groepen en iedereen die het probleem uit eerste hand kent. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je idee is genoeg.',
    'Nodig vroege klanten en samenwerkers uit. Nodig de mensen uit die daadwerkelijk zouden kopen of helpen: potentiële klanten, iemand met een vaardigheid die je mist, een mentor of een lokale organisator. JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    'Luister in de kamer. Vraag aangeslotenen hoe ze het aanbod zouden gebruiken, wat ze zouden betalen en wat hen tegenhoudt. De kamer is waar echte vraag zichtbaar wordt — of juist niet. JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het bedrijfsidee één kamer waar interesse feedback wordt, en de maker is eigenaar van die kamer. Vraag leden direct in de kamer.',
    'Scherp het aanbod aan op basis van echte feedback. Pas de prijs, de reikwijdte, het kanaal of de belofte aan op wat aangeslotenen zeggen. Kleine bedrijven worden in kleine iteraties gebouwd. JoinOrigin bewaart het gedeelde geheugen van een idee op één plek — notities, beslissingen en feedback in de kamer — zodat aanscherping zichtbaar is in plaats van verloren. Verander één ding tegelijk en kijk naar de reactie.',
    'Laat de kamer uitgroeien tot je eerste klantenbestand. Blijf uitnodigen, blijf updates delen en houd de kamer levend naarmate het aanbod vaste vorm krijgt. De mensen in de kamer zijn je eerste klanten en je eerste promotors. JoinOrigin houdt je idee-pagina en kamer verbonden naarmate het bedrijf groeit — één plek waar de belofte, het gesprek en de mensen zichtbaar zijn. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Benoem de klant en het probleem',
      body: 'Voordat je iets schrijft, benoem je de specifieke persoon die dit probleem voelt en beschrijf je het probleem in hun woorden. Een klein bedrijf slaagt wanneer het één echte behoefte goed bedient.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond vindbare idee-pagina’s, en de duidelijkste pagina’s beginnen bij een benoemde klant. Schrijf de klant en het probleem op en test ze op drie mensen die passen.',
    },
    {
      title: 'Schrijf de idee-pagina als etalage',
      body: 'De pagina moet laten zien wat je aanbiedt, voor wie het is, wat het kost in tijd of geld en in welke fase het idee zit. Houd het concreet — een pop-up, een product, een dienst, een winkel.',
      joinOriginNote:
        'Een idee publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Schets de pagina als een kort openbaar bericht en verfijn hem met feedback.',
    },
    {
      title: 'Publiceer het idee en open de kamer',
      body: 'Publiceren is het moment waarop het bedrijfsidee vindbaar wordt. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar.',
      joinOriginNote:
        'Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Publiceer het idee openbaar en open een kamer voor het gesprek eromheen.',
    },
    {
      title: 'Deel de pagina met je lokale netwerk',
      body: 'Kleine bedrijven groeien via lokaal bereik. Deel de idee-pagina met buren, collega’s, lokale groepen en iedereen die het probleem uit eerste hand kent.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je idee is genoeg.',
    },
    {
      title: 'Nodig vroege klanten en samenwerkers uit',
      body: 'Nodig de mensen uit die daadwerkelijk zouden kopen of helpen: potentiële klanten, iemand met een vaardigheid die je mist, een mentor of een lokale organisator.',
      joinOriginNote:
        'JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    },
    {
      title: 'Luister in de kamer',
      body: 'Vraag aangeslotenen hoe ze het aanbod zouden gebruiken, wat ze zouden betalen en wat hen tegenhoudt. De kamer is waar echte vraag zichtbaar wordt — of juist niet.',
      joinOriginNote:
        'JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het bedrijfsidee één kamer waar interesse feedback wordt, en de maker is eigenaar van die kamer. Vraag leden direct in de kamer.',
    },
    {
      title: 'Scherp het aanbod aan op basis van echte feedback',
      body: 'Pas de prijs, de reikwijdte, het kanaal of de belofte aan op wat aangeslotenen zeggen. Kleine bedrijven worden in kleine iteraties gebouwd.',
      joinOriginNote:
        'JoinOrigin bewaart het gedeelde geheugen van een idee op één plek — notities, beslissingen en feedback in de kamer — zodat aanscherping zichtbaar is in plaats van verloren. Verander één ding tegelijk en kijk naar de reactie.',
    },
    {
      title: 'Laat de kamer uitgroeien tot je eerste klantenbestand',
      body: 'Blijf uitnodigen, blijf updates delen en houd de kamer levend naarmate het aanbod vaste vorm krijgt. De mensen in de kamer zijn je eerste klanten en je eerste promotors.',
      joinOriginNote:
        'JoinOrigin houdt je idee-pagina en kamer verbonden naarmate het bedrijf groeit — één plek waar de belofte, het gesprek en de mensen zichtbaar zijn. Word ontdekt en groei.',
    },
  ],
};

export default content;
