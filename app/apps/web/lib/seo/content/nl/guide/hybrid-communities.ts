import type { GuideContent } from '../../types';

/**
 * « Hybride community’s » — tijdloze L1-handleiding (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: de kamer is wat de online en (als gevolg)
 * fysieke delen van een hybride community verbindt — één community, één
 * kamer, twee ingangen. De waarde van JoinOrigin zit in de intro en elke
 * stap (per stap een `joinOriginNote`), met eerlijke framing — JoinOrigin
 * biedt geen eventtools en bemant geen hybride evenementen. «Kamer»
 * verwijst naar de Matrix-kamer (§6.3) — fysieke locaties worden beschreven
 * als locaties/ruimtes, nooit als «kamers».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'hybrid-communities',
  title: 'Hybride community’s: hoe je fysiek en online samen laat draaien | JoinOrigin',
  description:
    'Draai een hybride community waarin de kamer fysieke en online leden verbindt — of je nu vers start of een bestaande community hybride maakt, kies de juiste tools, ontwerp gelijkwaardige deelname en houd beide doelgroepen betrokken. Van JoinOrigin.',
  intro: [
    'Een hybride community brengt mensen op twee plekken tegelijk samen — fysiek in een locatie en virtueel achter een scherm — en de echte uitdaging gaat weer over mensen: ervoor zorgen dat beide doelgroepen het gevoel hebben bij één verbonden community te horen, niet bij twee losse. JoinOrigin is gebouwd met precies dat mensen-verbinden-doel, en het model werkt net zo goed voor een community die al bestaat als voor een die net begint — een gevestigde fysieke groep kan een online helft toevoegen, en een online community kan lokaal beginnen samenkomen.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s te vinden, ernaar toe te gaan en te starten — dus een hybride groep heeft één kamer die de online en (als gevolg) fysieke delen verbindt: lokale en externe leden zien dezelfde community, hetzelfde ritme en dezelfde volgende stappen. In het digitale verbind→sluit-aan→kamer-model is de kamer het blijvende oppervlak waar beide helften van de community tussen bijeenkomsten leven; het fysieke evenement is een gevolg dat de kamer voor en na bijeenhoudt. JoinOrigin biedt geen eventtools en bemant geen hybride evenementen — het platform geeft elke community — hybride of niet — één kamer waar leden verbonden blijven.',
    'Deze handleiding behandelt de praktische beslissingen die hybride community’s laten slagen — voor nieuwe en bestaande groepen: beslissen of hybride het juiste model is, de kamer bouwen die beide doelgroepen delen, een format en tools kiezen die passen, de bijeenkomst zo ontwerpen dat fysieke en online leden dezelfde ervaring delen, de ruimte beheren zodat geen kant domineert en een blijvende kamer houden die de community tussen bijeenkomsten bijeenhoudt. Elke stap laat zien waar JoinOrigin helpt.',
  ],
  dataPoints: [
    'Een hybride community is één community met twee ingangen, geen twee doelgroepen die apart bediend moeten worden.',
    'De kamer is het verbindende weefsel: één gedeelde plek waar beide doelgroepen dezelfde updates, notities en volgende stappen zien.',
    'Eenvoudige, betrouwbare tools — één videolink, één gedeeld document — verminderen de frictie die hybride bijeenkomsten doet mislukken.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s te vinden of te starten; het biedt geen eventtools en bemant geen hybride evenementen.',
  ],
  faq: [
    {
      question: 'Wanneer moet een community hybride worden?',
      answer:
        'Wanneer een deel van je publiek betrouwbaar niet fysiek kan komen — door afstand, planning of mobiliteit — en de community nog steeds één gedeelde identiteit wil. Kan iedereen lokaal samenkomen, dan is fysiek samenkomen eenvoudiger en vaak beter.',
    },
    {
      question: 'Wat is de minimale tools-opzet voor een hybride bijeenkomst?',
      answer:
        'Eén videobel-link voor externe leden, één gedeeld document voor notities en één kamer waar beide doelgroepen tussen bijeenkomsten verbonden blijven. Meer tools voegen meer faalpunten toe; begin minimaal en voeg alleen toe waar de community om vraagt.',
    },
    {
      question: 'Hoe voorkom ik dat externe leden zich toeschouwers voelen?',
      answer:
        'Ontwerp voor gelijkwaardige deelname: houd een hybride voorstelronde, noem externe leden expliciet, deel het scherm voor visuals en gebruik een gedeeld document waar beide kanten kunnen schrijven. Wijs één persoon aan die continu op de externe kant let.',
    },
    {
      question: 'Kan JoinOrigin mij helpen een hybride community te draaien?',
      answer:
        'Ja. JoinOrigin helpt mensen community’s te vinden en te starten — één kamer waar lokale en externe leden verbonden blijven. JoinOrigin biedt geen eventtools, dus de praktische hybride praktijken in deze handleiding werken met tools die je al hebt.',
    },
  ],
  sections: [
    'Beslis of hybride het juiste model is. Ga hybride wanneer het zin heeft elkaar fysiek te ontmoeten. Kunnen de meeste leden lokaal samenkomen, dan maakt fysiek samenkomen de band sterker — hybride laat vertrouwen sneller opbouwen en mensen grondiger lezen. JoinOrigin is ontworpen om elke community te helpen leden te vinden en te behouden, maar de formatbeslissing is aan jou. Ga alleen hybride wanneer het zin heeft elkaar fysiek te ontmoeten.',
    'Bouw de kamer die beide doelgroepen verbindt. Zorg er vóór alles voor dat de community een gedeelde kamer heeft waar externe en lokale leden praten, updates delen en dezelfde volgende stappen zien. De kamer is wat hybride als één community laat voelen in plaats van twee. Op JoinOrigin heeft elke groep vanaf publicatie een kamer — het blijvende oppervlak dat de online en fysieke delen bijeenhoudt. Zet één gedeelde kamer op waar beide doelgroepen kunnen aansluiten.',
    'Kies één betrouwbaar videotool en één gedeeld document. Houd de stack minimaal: een videobel-link voor externe leden, een document voor notities en gedeelde links en één agenda-item. Complexiteit is de vijand van consistente hybride bijeenkomsten. JoinOrigin biedt geen eventtools — houd de stack minimaal. Het platform is de blijvende kamer waar de link en het document leven, niet de eventtool zelf.',
    'Ontwerp de agenda voor twee doelgroepen. Houd een voorstelronde die externe leden bij naam meeneemt, houd visuals op een gedeeld scherm en laat ruimte voor de online kant om te spreken. Een hybride agenda benoemt beide doelgroepen expliciet. Op JoinOrigin delen beide doelgroepen één community-kamer, waardoor “ontwerpen voor twee doelgroepen” natuurlijk past. Benoem beide doelgroepen expliciet in de agenda.',
    'Wijs een brugpersoon aan. Eén persoon let op de externe kant: begroet late aansluiters, geef externe handopstekers het woord en geeft door wat de locatie mist. Zonder brug wordt het online publiek toeschouwer. JoinOrigin bemant geen evenementen — de brugpersoon is een menselijke rol. Het platform houdt de community in één kamer georganiseerd, zodat de brug één plek heeft om te zien wie erbij is gekomen en wat er is gedeeld.',
    'Beheer de ruimte zodat beide kanten meedoen. Vraag fysieke leden één voor één te spreken en vragen voor de microfoon te herhalen, plaats mensen dicht bij de camera en wissel beurten af tussen de locatie en de bel — met de gedeelde kamer die voor beide openblijft. JoinOrigin is ontworpen rond gelijkwaardige verbinding tussen leden — hetzelfde principe dat hybride discussie laat werken. Wissel beurten af tussen de locatie en de bel en herhaal vragen voor de microfoon.',
    'Houd de kamer tussen bijeenkomsten levend. De community leeft in de kamer tussen evenementen: externe en lokale leden delen daar updates, stellen vragen en plannen samen. Hybride is niet één eventformat — het is een doorlopende gedeelde ruimte. Dit is de stap die het dichtst bij de ontwerpintentie van JoinOrigin ligt: een community-besturingssysteem is een blijvende kamer waar externe en lokale leden updates delen en samen plannen. Een gedeelde kamer werkt — JoinOrigin is die ruimte.',
    'Leg de output vast en deel die in de kamer. Plaats na elke bijeenkomst notities, opnames en volgende stappen in de gedeelde kamer. Een zichtbaar artefact houdt beide doelgroepen verbonden en laat de community productief voelen. Op JoinOrigin leeft de output van een community in één georganiseerde kamer — notities, opnames, volgende stappen. Plaats ze na elke bijeenkomst in de gedeelde kamer.',
  ],
  steps: [
    {
      title: 'Beslis of hybride het juiste model is',
      body: 'Ga hybride wanneer het zin heeft elkaar fysiek te ontmoeten. Kunnen de meeste leden lokaal samenkomen, dan maakt fysiek samenkomen de band sterker — hybride laat vertrouwen sneller opbouwen en mensen grondiger lezen.',
      joinOriginNote:
        'JoinOrigin is ontworpen om elke community te helpen leden te vinden en te behouden, maar de formatbeslissing is aan jou. Ga alleen hybride wanneer het zin heeft elkaar fysiek te ontmoeten.',
    },
    {
      title: 'Bouw de kamer die beide doelgroepen verbindt',
      body: 'Zorg er vóór alles voor dat de community een gedeelde kamer heeft waar externe en lokale leden praten, updates delen en dezelfde volgende stappen zien. De kamer is wat hybride als één community laat voelen in plaats van twee.',
      joinOriginNote:
        'Op JoinOrigin heeft elke groep vanaf publicatie een kamer — het blijvende oppervlak dat de online en fysieke delen bijeenhoudt. Zet één gedeelde kamer op waar beide doelgroepen kunnen aansluiten.',
    },
    {
      title: 'Kies één betrouwbaar videotool en één gedeeld document',
      body: 'Houd de stack minimaal: een videobel-link voor externe leden, een document voor notities en gedeelde links en één agenda-item. Complexiteit is de vijand van consistente hybride bijeenkomsten.',
      joinOriginNote:
        'JoinOrigin biedt geen eventtools — houd de stack minimaal. Het platform is de blijvende kamer waar de link en het document leven, niet de eventtool zelf.',
    },
    {
      title: 'Ontwerp de agenda voor twee doelgroepen',
      body: 'Houd een voorstelronde die externe leden bij naam meeneemt, houd visuals op een gedeeld scherm en laat ruimte voor de online kant om te spreken. Een hybride agenda benoemt beide doelgroepen expliciet.',
      joinOriginNote:
        'Op JoinOrigin delen beide doelgroepen één community-kamer, waardoor “ontwerpen voor twee doelgroepen” natuurlijk past. Benoem beide doelgroepen expliciet in de agenda.',
    },
    {
      title: 'Wijs een brugpersoon aan',
      body: 'Eén persoon let op de externe kant: begroet late aansluiters, geef externe handopstekers het woord en geeft door wat de locatie mist. Zonder brug wordt het online publiek toeschouwer.',
      joinOriginNote:
        'JoinOrigin bemant geen evenementen — de brugpersoon is een menselijke rol. Het platform houdt de community in één kamer georganiseerd, zodat de brug één plek heeft om te zien wie erbij is gekomen en wat er is gedeeld.',
    },
    {
      title: 'Beheer de ruimte zodat beide kanten meedoen',
      body: 'Vraag fysieke leden één voor één te spreken en vragen voor de microfoon te herhalen, plaats mensen dicht bij de camera en wissel beurten af tussen de locatie en de bel — met de gedeelde kamer die voor beide openblijft.',
      joinOriginNote:
        'JoinOrigin is ontworpen rond gelijkwaardige verbinding tussen leden — hetzelfde principe dat hybride discussie laat werken. Wissel beurten af tussen de locatie en de bel en herhaal vragen voor de microfoon.',
    },
    {
      title: 'Houd de kamer tussen bijeenkomsten levend',
      body: 'De community leeft in de kamer tussen evenementen: externe en lokale leden delen daar updates, stellen vragen en plannen samen. Hybride is niet één eventformat — het is een doorlopende gedeelde ruimte.',
      joinOriginNote:
        'Dit is de stap die het dichtst bij de ontwerpintentie van JoinOrigin ligt: een community-besturingssysteem is een blijvende kamer waar externe en lokale leden updates delen en samen plannen. Een gedeelde kamer werkt — JoinOrigin is die ruimte.',
    },
    {
      title: 'Leg de output vast en deel die in de kamer',
      body: 'Plaats na elke bijeenkomst notities, opnames en volgende stappen in de gedeelde kamer. Een zichtbaar artefact houdt beide doelgroepen verbonden en laat de community productief voelen.',
      joinOriginNote:
        'Op JoinOrigin leeft de output van een community in één georganiseerde kamer — notities, opnames, volgende stappen. Plaats ze na elke bijeenkomst in de gedeelde kamer.',
    },
  ],
};

export default content;
