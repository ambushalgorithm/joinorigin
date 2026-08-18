import type { GuideContent } from '../../types';

/**
 * « Hoe maak je een groep » — tijdloze L1-handleiding (design §6.1, TASK-353).
 *
 * Nederlandse vertaling van de EN-content. Geschreven tegen de kernloop van
 * het product-schermstroom §2: publiceer een groep → openbare groeps-pagina
 * → lid worden via link → kamer automatisch aangemaakt BIJ PUBLICATIE →
 * maker beheert de kamer → groei via feed/uitnodigingen. Een groep is een
 * community: de openbare pagina doet de belofte, de kamer is waar leden
 * verbinden en leden sluiten via een link aan. Het platform is live: een
 * groep maken publiceert nu de pagina en opent de kamer. «Kamer» verwijst
 * naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'create-a-group',
  title: 'Hoe maak je een groep: publiceer hem en open de kamer | JoinOrigin',
  description:
    'Maak een groep op JoinOrigin — publiceer een groeps-pagina, open de kamer automatisch en nodig leden uit via een join-link. Praktische stappen van JoinOrigin.',
  intro: [
    'Elke community — of die nu gloednieuw is of al maanden informeel bijeenkomt — draait op dezelfde twee bewegingen: bepalen voor wie hij is, en die mensen één duidelijke plek geven om te verbinden. Een groep zonder thuis vormt zich nooit goed; interesse verspreidt zich over berichten, spreadsheets en losse gesprekken en er blijft niets hangen. De groeps-pagina en de kamer zijn dat thuis, en ze goed maken is het verschil tussen een echte community en een lijst namen.',
    'De JoinOrigin-loop werkt zo: je publiceert een groep, de openbare pagina verschijnt en de kamer wordt automatisch aangemaakt op het moment van publiceren. Mensen ontdekken de groep via Ontdekken of volgen een join-link, lid worden is één klik en ze komen terecht in de kamer — een door de maker beheerde Matrix-kamer waar de community echt leeft. De maker is vanaf seconde nul eigenaar van de kamer en beheert wie aansluit en hoe de groep werkt.',
    'Deze handleiding bestrijkt het hele traject — of de groep nu nieuw is of al op papier bestaat: het publiek en doel kiezen, een groeps-pagina schrijven die mensen kunnen vinden, de groep publiceren en de kamer openen, verwachtingen stellen als maker, de join-link delen, de eerste leden uitnodigen, de eerste gesprekken starten en de kamer actief houden zodat de groep blijft groeien.',
  ],
  dataPoints: [
    'De duidelijkste groepen beginnen met één publiek en één belofte — specificiteit is een groeifunctie.',
    'Op JoinOrigin maakt het publiceren van een groep automatisch de kamer aan — de community heeft vanaf seconde nul een plek om te verbinden.',
    'Een join-link is de eenvoudigste uitnodiging: één link, één klik en een nieuw lid zit in de kamer.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt groepen te vinden, ernaar toe te gaan en ze te starten — publiceer je groep en de kamer opent meteen.',
  ],
  faq: [
    {
      question: 'Wat is het verschil tussen een groep en een community?',
      answer:
        'Op JoinOrigin zijn ze hetzelfde object. Een groep (of community) is een gepubliceerd, aansluitbaar object met een openbare pagina en een kamer. De groeps-pagina doet de belofte; de kamer is waar leden verbinden. Community’s krijgen een Matrix Space die de kamers van de groep bevat, en de hoofd-kamer is waar de groep leeft.',
    },
    {
      question: 'Wanneer wordt de groepskamer aangemaakt?',
      answer:
        'De kamer wordt automatisch aangemaakt op het moment dat je de groep publiceert — er is nooit een aparte stap “de chat later maken”. De maker is vanaf seconde nul eigenaar van de kamer en kan in Element uitnodigen, verwijderen en rollen toewijzen. Je kunt dezelfde opzet ook maken met de tools die je al gebruikt.',
    },
    {
      question: 'Hoe sluiten leden aan bij mijn groep?',
      answer:
        'Lid worden is één actie: klikken op Lid worden op de openbare pagina van de groep, of een directe uitnodigingslink van een lid volgen. Aansluiters komen in de kamer van de groep terecht. De meest betrouwbare vroege groei is persoonlijk — de join-link delen met mensen die bij het publiek passen en hen vragen anderen mee te nemen.',
    },
    {
      question: 'Wat moet de groeps-pagina zeggen?',
      answer:
        'Eén zin over voor wie de groep is, één zin over wat er in de kamer gebeurt en wat een lid krijgt door aan te sluiten. Houd het specifiek — “nieuwe founders in Amsterdam” verslaat “mensen die van ondernemen houden”. De pagina is de belofte die bepaalt of iemand op Lid worden klikt.',
    },
    {
      question: 'Kan JoinOrigin mij vandaag helpen een groep te maken?',
      answer:
        'Ja. Een groep publiceren op JoinOrigin maakt pagina en kamer atomair aan — de kamer opent op het moment van publiceren en jij beheert hem vanaf het begin. Publiceer de groep en open een kamer voor leden; elk nieuw lid dat je uitnodigt vergroot je bereik.',
    },
  ],
  sections: [
    'Kies het publiek en het doel. Bepaal voor wie de groep is en waarvoor hij bestaat — één publiek, één belofte en een succesvol lid dat je kunt beschrijven. JoinOrigin is ontworpen rond vindbare groeps-pagina’s, en de duidelijkste groepen benoemen hun publiek en doel vooraf. Schrijf één zin voor elk op en houd ze voor elke uitnodiging.',
    'Schrijf een groeps-pagina die mensen kunnen vinden. De pagina moet benoemen voor wie de groep is, wat er in de kamer gebeurt en wat leden krijgen door aan te sluiten. Houd het specifiek en eerlijk. Een groep publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Publiceer de beschrijving en test hem op een paar mensen die bij het publiek passen.',
    'Publiceer de groep en open de kamer. Publiceren is het moment waarop de groep echt wordt: een openbare pagina plus een kamer waar leden verbinden. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar. Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Maak de pagina en de kamer ook in de tools die je groep al gebruikt, als je dat liever wilt.',
    'Stel verwachtingen als maker. Als kamereigenaar bepaal je hoe de groep werkt: wat leden kunnen plaatsen, wat de regels zijn en hoe nieuwe mensen worden verwelkomd. Makercontrole is standaard Matrix-kamereigendom — uitnodigen, verwijderen, rollen toewijzen, vastpinnen, archiveren. JoinOrigin stelt je regels niet voor je op; het ontwerp geeft jou de bediening. Schrijf de verwachtingen van de kamer op en pin ze vast waar leden ze kunnen zien.',
    'Deel de join-link. De join-link is de kortste weg van interesse naar lidmaatschap: één link, één klik en een nieuw lid komt in de kamer terecht. Zet hem overal waar de juiste mensen samenkomen. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je groep is genoeg.',
    'Nodig de eerste leden persoonlijk uit. Persoonlijke uitnodigingen converteren veel beter dan openbare berichten. Stuur vrienden, collega’s en kennissen die bij het publiek passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen. JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een groep zoeken de jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elk lid wordt een kanaal naar het eigen netwerk.',
    'Start de eerste gesprekken in de kamer. De eerste gesprekken bepalen de cultuur. Open met een duidelijke vraag — voorstellingen, een gedeeld doel of een eerste onderwerp — en reageer op elk bericht. JoinOrigin voert je gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft de groep één kamer waar leden verbinden, en de maker is eigenaar. Wees de eerste weken het meest actieve lid.',
    'Houd de kamer actief en laat hem groeien. Houd een ritme aan — een wekelijks onderwerp, een terugkerende check-in of een vaste update — zodat leden een reden hebben om terug te komen. Groei stapelt zich op wanneer elk lid de groep in één zin kan beschrijven en de join-link kan delen. JoinOrigin houdt je groeps-pagina en kamer verbonden naarmate de groep groeit — één plek waar de belofte, de kamer en de mensen zichtbaar zijn. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Kies het publiek en het doel',
      body: 'Bepaal voor wie de groep is en waarvoor hij bestaat — één publiek, één belofte en een succesvol lid dat je kunt beschrijven.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond vindbare groeps-pagina’s, en de duidelijkste groepen benoemen hun publiek en doel vooraf. Schrijf één zin voor elk op en houd ze voor elke uitnodiging.',
    },
    {
      title: 'Schrijf een groeps-pagina die mensen kunnen vinden',
      body: 'De pagina moet benoemen voor wie de groep is, wat er in de kamer gebeurt en wat leden krijgen door aan te sluiten. Houd het specifiek en eerlijk.',
      joinOriginNote:
        'Een groep publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Publiceer de beschrijving en test hem op een paar mensen die bij het publiek passen.',
    },
    {
      title: 'Publiceer de groep en open de kamer',
      body: 'Publiceren is het moment waarop de groep echt wordt: een openbare pagina plus een kamer waar leden verbinden. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar.',
      joinOriginNote:
        'Op JoinOrigin zijn de pagina, de kamer en de join-link één publicatie. Maak de pagina en de kamer ook in de tools die je groep al gebruikt, als je dat liever wilt.',
    },
    {
      title: 'Stel verwachtingen als maker',
      body: 'Als kamereigenaar bepaal je hoe de groep werkt: wat leden kunnen plaatsen, wat de regels zijn en hoe nieuwe mensen worden verwelkomd. Makercontrole is standaard Matrix-kamereigendom — uitnodigen, verwijderen, rollen toewijzen, vastpinnen, archiveren.',
      joinOriginNote:
        'JoinOrigin stelt je regels niet voor je op; het ontwerp geeft jou de bediening. Schrijf de verwachtingen van de kamer op en pin ze vast waar leden ze kunnen zien.',
    },
    {
      title: 'Deel de join-link',
      body: 'De join-link is de kortste weg van interesse naar lidmaatschap: één link, één klik en een nieuw lid komt in de kamer terecht. Zet hem overal waar de juiste mensen samenkomen.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je groep is genoeg.',
    },
    {
      title: 'Nodig de eerste leden persoonlijk uit',
      body: 'Persoonlijke uitnodigingen converteren veel beter dan openbare berichten. Stuur vrienden, collega’s en kennissen die bij het publiek passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen.',
      joinOriginNote:
        'JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een groep zoeken de jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elk lid wordt een kanaal naar het eigen netwerk.',
    },
    {
      title: 'Start de eerste gesprekken in de kamer',
      body: 'De eerste gesprekken bepalen de cultuur. Open met een duidelijke vraag — voorstellingen, een gedeeld doel of een eerste onderwerp — en reageer op elk bericht.',
      joinOriginNote:
        'JoinOrigin voert je gesprekken niet; de kamer is van jou om vorm te geven. Het platform geeft de groep één kamer waar leden verbinden, en de maker is eigenaar. Wees de eerste weken het meest actieve lid.',
    },
    {
      title: 'Houd de kamer actief en laat hem groeien',
      body: 'Houd een ritme aan — een wekelijks onderwerp, een terugkerende check-in of een vaste update — zodat leden een reden hebben om terug te komen. Groei stapelt zich op wanneer elk lid de groep in één zin kan beschrijven en de join-link kan delen.',
      joinOriginNote:
        'JoinOrigin houdt je groeps-pagina en kamer verbonden naarmate de groep groeit — één plek waar de belofte, de kamer en de mensen zichtbaar zijn. Word ontdekt en groei.',
    },
  ],
};

export default content;
