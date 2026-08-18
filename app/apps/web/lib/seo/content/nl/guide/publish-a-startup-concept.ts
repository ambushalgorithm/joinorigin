import type { GuideContent } from '../../types';

/**
 * « Hoe publiceer je een startup-concept » — tijdloze L1-handleiding
 * (design §6.1, TASK-353).
 *
 * Nederlandse vertaling van de EN-content. Geschreven tegen de kernloop van
 * het product-schermstroom §2: publiceer een startup-concept → openbare
 * idee-pagina → lid worden via link → kamer automatisch aangemaakt BIJ
 * PUBLICATIE → maker beheert de kamer → groei via feed/uitnodigingen. De
 * idee-pagina is de openbare belofte van het concept; de kamer is waar vroege
 * gelovigen, potentiële medeoprichters en eerste testers zich rond de
 * startup verzamelen. Het platform is live: een concept publiceren maakt nu
 * de pagina en kamer aan. «Kamer» verwijst naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'publish-a-startup-concept',
  title: 'Hoe publiceer je een startup-concept: idee-pagina + kamer | JoinOrigin',
  description:
    'Publiceer een startup-concept op JoinOrigin — of je nu in de idee-fase zit of al een bedrijf runt — schrijf een openbare idee-pagina, open de kamer automatisch en verzamel vroege gelovigen, medeoprichters en eerste testers rond het idee. Praktische stappen van JoinOrigin.',
  intro: [
    'Elke startup — of die nu nog een concept op papier is of al draait met klanten — heeft meer mensen dan kapitaal nodig: een founder die het kan bouwen, een team dat het kan opleveren en gebruikers die het willen testen. Een startup die niemand kan vinden, verzamelt geen van die mensen. Het concept publiceren als vindbare idee-pagina en daarna een kamer openen waar het gesprek kan plaatsvinden, is de eerlijke eerste stap van het bouwen van een startup — niet de pitchdeck, niet het logo, niet de pitch — en het werkt net zo goed voor een bestaand bedrijf dat meer gelovigen, medeoprichters en testers rondom wil hebben wat het bouwt.',
    'De JoinOrigin-loop werkt zo: je publiceert een startup-concept, de openbare idee-pagina verschijnt en de kamer wordt automatisch aangemaakt op het moment van publiceren. Mensen ontdekken de pagina of volgen een link, lid worden is één klik en ze komen terecht in de kamer — een door de maker beheerde Matrix-kamer waar vroege gelovigen vragen kunnen stellen, potentiële medeoprichters de klik kunnen testen en eerste gebruikers feedback kunnen geven. De maker is vanaf seconde nul eigenaar van de kamer en bepaalt wie aansluit en wat er binnen gebeurt.',
    'Deze handleiding doorloopt het publiceren van een startup-concept als een operator — of het concept nu gloednieuw is of het bedrijf al draait: het concept samenvatten in één zin, de pagina schrijven met eerlijke signalen, publiceren en de kamer openen, delen met founder-community’s, vroege gelovigen en testers uitnodigen, gestructureerde gesprekken voeren, de kamer gebruiken om een proefteam te vormen en de kamer de feed in voeden naarmate het concept wordt gevalideerd.',
  ],
  dataPoints: [
    'Een startup-concept dat in één zin is samengevat, is gemakkelijker te delen, te testen en te bemannen dan een lang businessplan.',
    'Op JoinOrigin maakt het publiceren van een concept automatisch de kamer aan — de startup heeft vanaf het begin een plek voor gelovigen en testers.',
    'Een join-link is de eenvoudigste uitnodiging: één link, één klik en een geïnteresseerd persoon zit in de kamer.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt ideeën en de mensen erachter te vinden — publiceer je concept en de kamer opent meteen.',
  ],
  faq: [
    {
      question: 'Hoe verschilt een startup-concept van een klein-bedrijfsidee-pagina?',
      answer:
        'De pagina-indeling is hetzelfde, maar de nadruk verschuift: een klein-bedrijfsidee draait om een klant en een aanbod, terwijl een startup-concept draait om een ambitieus probleem en het team dat het moet oplossen. Een startuppagina trekt vroege gelovigen, potentiële medeoprichters en eerste testers aan in plaats van lokale klanten.',
    },
    {
      question: 'Wanneer wordt de kamer voor mijn startup-concept aangemaakt?',
      answer:
        'De kamer wordt automatisch aangemaakt op het moment dat je het concept publiceert. De maker is vanaf seconde nul eigenaar van de kamer en kan in Element uitnodigen, verwijderen en rollen toewijzen. Je kunt ook een kamer openen met de tools die je al gebruikt en de mensen uitnodigen die de ambitie delen.',
    },
    {
      question: 'Wie moet zich bij een startup-concept-kamer aansluiten?',
      answer:
        'Vroege gelovigen die het probleem delen, potentiële medeoprichters die de klik testen en eerste gebruikers die bereid zijn een ruwe versie te proberen. De kamer is waar je de mensen vindt die van een concept een team maken — dezelfde mensen waar warme introducties maanden over zouden doen.',
    },
    {
      question: 'Wat maakt een goede startup-concept-pagina?',
      answer:
        'Eén eerlijke zin over het probleem en de aanpak, de fase van het concept en de specifieke hulp die je nodig hebt — een bouwer, een ontwerper, een domeinexpert, eerste testers. Eerlijkheid over de fase trekt de juiste mensen aan; overdrijven trekt niemand aan.',
    },
    {
      question: 'Kan JoinOrigin mij vandaag helpen een startup-concept te publiceren?',
      answer:
        'Ja. Een concept publiceren op JoinOrigin maakt pagina en kamer atomair aan — de kamer opent op het moment van publiceren en jij beheert hem vanaf het begin. Publiceer het concept ergens openbaar en open een kamer voor discussie; elk nieuw lid dat je uitnodigt vergroot je bereik.',
    },
  ],
  sections: [
    'Vat het concept samen in één zin. Reduceer de startup tot de kern: het probleem, de aanpak en voor wie het is. Kun je het niet in één zin zeggen, dan is het concept niet klaar om te publiceren. JoinOrigin is ontworpen rond vindbare idee-pagina’s, en een pitch van één zin is de kern van de pagina. Schrijf de zin op en test hem op drie mensen die het probleem begrijpen.',
    'Schrijf de pagina met eerlijke signalen. Benoem het probleem, de aanpak, de fase — idee, prototype of product — en de specifieke hulp die je nodig hebt. Eerlijkheid trekt de juiste mensen aan. Een concept publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Schets de pagina als een kort openbaar bericht en verbeter hem met feedback.',
    'Publiceer het concept en open de kamer. Publiceren is het moment waarop het concept vindbaar wordt. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar. Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Publiceer het concept openbaar en open een kamer voor het gesprek eromheen.',
    'Deel het concept met founder-community’s. Startups groeien via foundernetwerken. Deel de idee-pagina met foundergroepen, startup-community’s, accelerators en iedereen die het probleem kent. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je concept is genoeg.',
    'Nodig vroege gelovigen en testers uit. Nodig de mensen uit die de ambitie delen: potentiële medeoprichters, domeinexperts en gebruikers die bereid zijn een ruwe versie te proberen. JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    'Voer gestructureerde gesprekken in de kamer. Vraag aangeslotenen wat hen enthousiasmeert, wat hen zorgen baart en wat zij als eerste zouden doen. Een startup-kamer is een doorlopend interview — de antwoorden vormen het concept. JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het concept één kamer waar interesse inzicht wordt, en de maker is eigenaar van die kamer. Voer de gesprekken direct in de kamer.',
    'Gebruik de kamer om een proefteam te vormen. Wanneer de juiste mensen opdagen, stel je een klein proefproject voor — een prototype, een landingspagina of een werksessie — en kijk hoe het team samenwerkt. JoinOrigin geeft community’s een gedeelde kamer voor hun werk en projecten, een natuurlijke plek waar een proef naar boven kan komen. Een klein echt prototype is de meest betrouwbare kliktest.',
    'Voed de kamer de feed in terwijl je valideert. Blijf updates plaatsen, houd de kamer levend en laat het momentum van het concept zichtbaar worden voor een breder netwerk. De feed maakt van een concept het bewijs dat mensen zich erom bekommeren. Op JoinOrigin stromen kamertupdates de feed in — de groeiloop waarin elk nieuw lid het ontdekkingsoppervlak vergroot. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Vat het concept samen in één zin',
      body: 'Reduceer de startup tot de kern: het probleem, de aanpak en voor wie het is. Kun je het niet in één zin zeggen, dan is het concept niet klaar om te publiceren.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond vindbare idee-pagina’s, en een pitch van één zin is de kern van de pagina. Schrijf de zin op en test hem op drie mensen die het probleem begrijpen.',
    },
    {
      title: 'Schrijf de pagina met eerlijke signalen',
      body: 'Benoem het probleem, de aanpak, de fase — idee, prototype of product — en de specifieke hulp die je nodig hebt. Eerlijkheid trekt de juiste mensen aan.',
      joinOriginNote:
        'Een concept publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Schets de pagina als een kort openbaar bericht en verbeter hem met feedback.',
    },
    {
      title: 'Publiceer het concept en open de kamer',
      body: 'Publiceren is het moment waarop het concept vindbaar wordt. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar.',
      joinOriginNote:
        'Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Publiceer het concept openbaar en open een kamer voor het gesprek eromheen.',
    },
    {
      title: 'Deel het concept met founder-community’s',
      body: 'Startups groeien via foundernetwerken. Deel de idee-pagina met foundergroepen, startup-community’s, accelerators en iedereen die het probleem kent.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je concept is genoeg.',
    },
    {
      title: 'Nodig vroege gelovigen en testers uit',
      body: 'Nodig de mensen uit die de ambitie delen: potentiële medeoprichters, domeinexperts en gebruikers die bereid zijn een ruwe versie te proberen.',
      joinOriginNote:
        'JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een idee zoeken het jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elke aansluiter wordt een kanaal naar het eigen netwerk.',
    },
    {
      title: 'Voer gestructureerde gesprekken in de kamer',
      body: 'Vraag aangeslotenen wat hen enthousiasmeert, wat hen zorgen baart en wat zij als eerste zouden doen. Een startup-kamer is een doorlopend interview — de antwoorden vormen het concept.',
      joinOriginNote:
        'JoinOrigin voert deze gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft het concept één kamer waar interesse inzicht wordt, en de maker is eigenaar van die kamer. Voer de gesprekken direct in de kamer.',
    },
    {
      title: 'Gebruik de kamer om een proefteam te vormen',
      body: 'Wanneer de juiste mensen opdagen, stel je een klein proefproject voor — een prototype, een landingspagina of een werksessie — en kijk hoe het team samenwerkt.',
      joinOriginNote:
        'JoinOrigin geeft community’s een gedeelde kamer voor hun werk en projecten, een natuurlijke plek waar een proef naar boven kan komen. Een klein echt prototype is de meest betrouwbare kliktest.',
    },
    {
      title: 'Voed de kamer de feed in terwijl je valideert',
      body: 'Blijf updates plaatsen, houd de kamer levend en laat het momentum van het concept zichtbaar worden voor een breder netwerk. De feed maakt van een concept het bewijs dat mensen zich erom bekommeren.',
      joinOriginNote:
        'Op JoinOrigin stromen kamertupdates de feed in — de groeiloop waarin elk nieuw lid het ontdekkingsoppervlak vergroot. Word ontdekt en groei.',
    },
  ],
};

export default content;
