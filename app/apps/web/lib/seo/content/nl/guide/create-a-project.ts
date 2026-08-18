import type { GuideContent } from '../../types';

/**
 * « Hoe maak je een project » — tijdloze L1-handleiding (design §6.1, TASK-353).
 *
 * Nederlandse vertaling van de EN-content. Geschreven tegen de kernloop van
 * het product-schermstroom §2: een gevormde groep gaat van gesprek naar
 * gedeeld werk door een project te publiceren; de projectpagina is openbaar,
 * de kamer wordt automatisch aangemaakt BIJ PUBLICATIE, de maker beheert de
 * kamer en voortgang stroomt de feed in. Het platform is live: een project
 * publiceren opent nu de pagina en kamer. «Kamer» verwijst naar de
 * Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'create-a-project',
  title: 'Hoe maak je een project: zet groepsmomentum om in gedeeld werk | JoinOrigin',
  description:
    'Maak een project op JoinOrigin — of het nu een gloednieuw idee is of werk dat al loopt — publiceer een gedeelde projectpagina, open de kamer automatisch en zet het gesprek van een groep om in werk dat wordt opgeleverd. Praktische stappen van JoinOrigin.',
  intro: [
    'Een groep die alleen praat, komt uiteindelijk tot stilstand. Het verschil tussen een community die levend voelt en een die vervaagt, is gedeeld werk — een project met een naam, een doel en een plek waar voortgang zichtbaar is. Een gesprek omzetten in een project is ook een mensen-verbinden-probleem: je hebt de juiste mensen, de juiste toewijding en één duidelijke plek nodig om samen te werken. Hetzelfde geldt wanneer het project al bestaat — verspreid over bestanden, berichten en de takenlijst van één persoon — ook dan heeft het een zichtbaar thuis en de juiste mensen eromheen nodig.',
    'De JoinOrigin-stroom regelt die overgang: een gevormde groep publiceert een project en de projectpagina verschijnt openbaar met een kamer die automatisch wordt aangemaakt op het moment van publiceren. Leden sluiten via een link bij de projectkamer aan, de maker beheert hem als kamereigenaar en updates uit de kamer stromen de feed in zodat het hele netwerk het werk kan zien. De projectkamer opent op het moment van publiceren — zonder tussenliggende setup-stap.',
    'Deze handleiding loopt van de eerste vonk naar een werkend ritme — of het project nu gloednieuw is of al loopt: starten vanuit een bestaande groep en de kamer, een reikwijdte definiëren die echt kan worden opgeleverd, de projectpagina schrijven, publiceren en de kamer openen, het werktijd uitnodigen, rollen en een eerste mijlpaal afspreken, echt werk de kamer in brengen en voortgang delen om momentum op te bouwen.',
  ],
  dataPoints: [
    'Projecten met een openbare pagina en een duidelijke eerste mijlpaal zijn gemakkelijker te bemannen — mensen sluiten aan bij werk dat ze kunnen zien.',
    'Op JoinOrigin maakt het publiceren van een project automatisch de kamer aan — de werkruimte bestaat vanaf hetzelfde moment als de pagina.',
    'Een projectkamer geeft het werk één thuis: beslissingen, bestanden en voortgang zichtbaar voor iedereen die aansluit.',
    'JoinOrigin is een community-besturingssysteem dat gevormde groepen helpt gesprekken om te zetten in projecten — publiceer je project en de kamer opent meteen.',
  ],
  faq: [
    {
      question: 'Wanneer is een groep klaar om een project te starten?',
      answer:
        'Een groep is klaar wanneer een paar leden een concreet resultaat delen en bereid zijn er tijd in te steken. Je hebt geen groot team nodig — drie toegewijde mensen met één duidelijke mijlpaal verslaan een dozijn nieuwsgierige leden. Publiceer het project wanneer het gesprek zich herhaalt: “we moeten dit echt doen.”',
    },
    {
      question: 'Wanneer wordt de projectkamer aangemaakt?',
      answer:
        'De kamer wordt automatisch aangemaakt op het moment dat je het project publiceert. De maker is vanaf het begin eigenaar van de kamer en kan het werktijd uitnodigen, rollen toewijzen en het werk georganiseerd houden in Element. Je kunt dezelfde opzet ook maken met de tools die je groep al gebruikt.',
    },
    {
      question: 'Hoe verschilt een project van een idee?',
      answer:
        'Een idee is een voorstel waar mensen zich omheen verzamelen — de kamer is waar interesse en klik worden getest. Een project is het gedeelde werk waar een gevormde groep zich aan committeert, met een pagina, een kamer en een mijlpaal. Publiceer eerst een idee wanneer je mensen nodig hebt; publiceer een project wanneer je ze al hebt.',
    },
    {
      question: 'Wat moet de eerste mijlpaal zijn?',
      answer:
        'Klein en haalbaar — een werkende draft, een pilot, een eerste versie of een afgeronde oplevering binnen een paar weken. Een korte eerste mijlpaal bouwt vertrouwen in de groep en maakt het project echt voor nieuwe aansluiters. Je kunt altijd uitbreiden na de eerste winst.',
    },
    {
      question: 'Kan JoinOrigin een groep vandaag helpen een project te starten?',
      answer:
        'Ja. Een project publiceren op JoinOrigin maakt pagina en kamer atomair aan — de kamer opent op het moment van publiceren en de maker beheert hem. Kies het doel van de groep, maak een gedeeld project-thuis en open een kamer voor het werk; elk nieuw lid dat je uitnodigt vergroot je bereik.',
    },
  ],
  sections: [
    'Start vanuit een bestaande groep en de kamer. Een project groeit uit een groep die al vertrouwen en momentum heeft. Bekijk de gesprekken in de kamer van de groep en vind de terugkerende behoefte — het ding waarvan leden blijven zeggen “dat moeten we doen.” JoinOrigin houdt een community levend in een door de maker beheerde kamer, en het project is de volgende laag bovenop die kamer. Benoem de terugkerende behoefte in de groep en test of iemand erop wil acteren.',
    'Definieer een reikwijdte die echt kan worden opgeleverd. Schrijf op wat het project zal opleveren, voor wie en binnen welke termijn. Houd de eerste versie klein genoeg zodat de groep hem kan afmaken. JoinOrigin is ontworpen rond projecten met openbare pagina’s — een duidelijke reikwijdte maakt de pagina leesbaar en de kamer gefocust. Eén zin die zegt wat er wordt opgeleverd en wanneer is genoeg om te starten.',
    'Schrijf de projectpagina. De pagina moet het doel van het project benoemen, het probleem dat het oplost, wie eraan werkt en wat het nodig heeft. Wees eerlijk over de fase — een vroege draft is prima. Een project publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Publiceer de projectbeschrijving ergens waar de groep mensen naartoe kan verwijzen.',
    'Publiceer het project en open de kamer. Publiceren is wat het project echt maakt: een openbare pagina plus een kamer waar het werk leeft. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar. Op JoinOrigin zijn de pagina, de kamer en het werktijd één publicatie. Maak de pagina en de kamer ook in de tools die je groep al gebruikt, als je dat liever wilt.',
    'Nodig het werktijd uit in de kamer. Nodig de mensen uit die het werk echt gaan doen — een klein, toegewijd team is beter dan een groot publiek. Deel de join-link en vraag iedereen hun tijd te bevestigen. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de projectpagina of een directe uitnodigingslink van een lid volgen. Eén duidelijke link naar de projectkamer is genoeg.',
    'Spreek rollen en een eerste mijlpaal af. Benoem wie wat bezit, hoe vaak de groep incheckt en de eerste mijlpaal waar iedereen naartoe werkt. Schrijf het op waar het hele team het kan zien. JoinOrigin wijst geen rollen voor je toe — makercontrole betekent dat jij beslist. Het platform houdt de rollen en mijlpaal zichtbaar in de projectkamer. Een korte schriftelijke planning in de kamer is genoeg.',
    'Breng echt werk de kamer in. Vervang “we zouden moeten” door “hier is de draft”, “hier is de beslissing” en “hier is de volgende taak.” Houd voortgang op één zichtbare plek zodat iedereen kan volgen. JoinOrigin houdt de kamer van een project als thuis voor het werk — beslissingen, bestanden en updates — in plaats van ze over privéberichten te verspreiden. Houd de werkartefacten vanaf de eerste week in de gedeelde kamer.',
    'Deel voortgang om momentum op te bouwen. Plaats updates naarmate het project vordert, vier de mijlpaal wanneer hij binnen is en nodig de bredere groep uit om aan te sluiten of te volgen. Voortgang in de feed maakt van een project het bewijs dat de community dingen oplevert. Kamertupdates stromen op JoinOrigin de feed in — de groeiloop waarin elk nieuw lid het ontdekkingsoppervlak vergroot. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Start vanuit een bestaande groep en de kamer',
      body: 'Een project groeit uit een groep die al vertrouwen en momentum heeft. Bekijk de gesprekken in de kamer van de groep en vind de terugkerende behoefte — het ding waarvan leden blijven zeggen “dat moeten we doen.”',
      joinOriginNote:
        'JoinOrigin houdt een community levend in een door de maker beheerde kamer, en het project is de volgende laag bovenop die kamer. Benoem de terugkerende behoefte in de groep en test of iemand erop wil acteren.',
    },
    {
      title: 'Definieer een reikwijdte die echt kan worden opgeleverd',
      body: 'Schrijf op wat het project zal opleveren, voor wie en binnen welke termijn. Houd de eerste versie klein genoeg zodat de groep hem kan afmaken.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond projecten met openbare pagina’s — een duidelijke reikwijdte maakt de pagina leesbaar en de kamer gefocust. Eén zin die zegt wat er wordt opgeleverd en wanneer is genoeg om te starten.',
    },
    {
      title: 'Schrijf de projectpagina',
      body: 'De pagina moet het doel van het project benoemen, het probleem dat het oplost, wie eraan werkt en wat het nodig heeft. Wees eerlijk over de fase — een vroege draft is prima.',
      joinOriginNote:
        'Een project publiceren op JoinOrigin maakt automatisch pagina en kamer aan, met de maker die de kamer vanaf het begin beheert. Publiceer de projectbeschrijving ergens waar de groep mensen naartoe kan verwijzen.',
    },
    {
      title: 'Publiceer het project en open de kamer',
      body: 'Publiceren is wat het project echt maakt: een openbare pagina plus een kamer waar het werk leeft. Op JoinOrigin wordt de kamer op hetzelfde moment automatisch aangemaakt — er is geen aparte setup-stap en de maker is eigenaar.',
      joinOriginNote:
        'Op JoinOrigin zijn de pagina, de kamer en het werktijd één publicatie. Maak de pagina en de kamer ook in de tools die je groep al gebruikt, als je dat liever wilt.',
    },
    {
      title: 'Nodig het werktijd uit in de kamer',
      body: 'Nodig de mensen uit die het werk echt gaan doen — een klein, toegewijd team is beter dan een groot publiek. Deel de join-link en vraag iedereen hun tijd te bevestigen.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de projectpagina of een directe uitnodigingslink van een lid volgen. Eén duidelijke link naar de projectkamer is genoeg.',
    },
    {
      title: 'Spreek rollen en een eerste mijlpaal af',
      body: 'Benoem wie wat bezit, hoe vaak de groep incheckt en de eerste mijlpaal waar iedereen naartoe werkt. Schrijf het op waar het hele team het kan zien.',
      joinOriginNote:
        'JoinOrigin wijst geen rollen voor je toe — makercontrole betekent dat jij beslist. Het platform houdt de rollen en mijlpaal zichtbaar in de projectkamer. Een korte schriftelijke planning in de kamer is genoeg.',
    },
    {
      title: 'Breng echt werk de kamer in',
      body: 'Vervang “we zouden moeten” door “hier is de draft”, “hier is de beslissing” en “hier is de volgende taak.” Houd voortgang op één zichtbare plek zodat iedereen kan volgen.',
      joinOriginNote:
        'JoinOrigin houdt de kamer van een project als thuis voor het werk — beslissingen, bestanden en updates — in plaats van ze over privéberichten te verspreiden. Houd de werkartefacten vanaf de eerste week in de gedeelde kamer.',
    },
    {
      title: 'Deel voortgang om momentum op te bouwen',
      body: 'Plaats updates naarmate het project vordert, vier de mijlpaal wanneer hij binnen is en nodig de bredere groep uit om aan te sluiten of te volgen. Voortgang in de feed maakt van een project het bewijs dat de community dingen oplevert.',
      joinOriginNote:
        'Kamertupdates stromen op JoinOrigin de feed in — de groeiloop waarin elk nieuw lid het ontdekkingsoppervlak vergroot. Word ontdekt en groei.',
    },
  ],
};

export default content;
