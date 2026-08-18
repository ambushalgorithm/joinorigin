import type { GuideContent } from '../../types';

/**
 * « Hoe start je een community » — tijdloze L1-handleiding (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: publiceer de groep → kamer automatisch
 * aangemaakt bij publicatie → leden sluiten aan via link; locatie- en
 * formatadvies blijft een gevolg, nooit de kern. De waarde van JoinOrigin
 * zit in de intro en elke stap (per stap een `joinOriginNote`), met eerlijke
 * framing — JoinOrigin organiseert geen lokale evenementen. «Kamer» verwijst
 * naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'start-a-community',
  title: 'Hoe start je een community: een stapsgewijze handleiding | JoinOrigin',
  description:
    'Leer hoe je een community start — of een bestaande één digitaal thuis geeft — publiceer een groep, open de kamer en haal leden binnen via een join-link. Praktische stappen van JoinOrigin.',
  intro: [
    'Het moeilijkste aan het starten van een community is zelden de locatie, de agenda of het budget — het is het vinden van de eerste mensen die jouw interesse delen en hen één duidelijke plek geven om te verbinden. Dat is precies het probleem dat JoinOrigin oplost.',
    'JoinOrigin is een community-besturingssysteem dat is gebouwd rond de digitale loop: je publiceert een groep, de kamer wordt automatisch aangemaakt en leden sluiten via een link aan. De kamer is waar de community echt leeft — een door de maker beheerde Matrix-kamer waar leden vanaf dag één praten, updates delen en samen plannen, in plaats van verspreid over spreadsheets, losse berichten en aanmeldformulieren. Fysieke bijeenkomsten bestaan alleen als gevolg: zodra een groep is gevormd en de kamer leeft, kunnen leden ervoor kiezen elkaar fysiek te ontmoeten — en JoinOrigin organiseert geen lokale evenementen. Het hele punt van het platform is mensen verbinden die elkaar anders nooit zouden ontmoeten, daarom sluit elke stap in deze handleiding aan bij iets waar JoinOrigin bij helpt.',
    'De aanpak werkt voor elk communitytype: een founderskring, een boekenclub, een lokale loopgroep, een netwerk van kleine bedrijven of een online professionele community — en hij werkt zowel wanneer je vanaf nul begint als wanneer je een groep formaliseert die al informeel bijeenkomt. Het kernprincipe is simpel — mensen sluiten aan vanwege een duidelijke belofte en blijven omdat de ervaring die belofte betrouwbaar waarmaakt. Je hebt geen groot budget, een locatie of een bestaand publiek nodig om te beginnen; je hebt een duidelijk doel, een realistische eerste stap en de discipline om het te herhalen nodig.',
  ],
  dataPoints: [
    'De meeste succesvolle communities beginnen met een smal, specifiek publiek in plaats van “iedereen die geïnteresseerd is”.',
    'Een groep publiceren maakt de kamer direct aan — er is nooit een stap “de chat later maken”.',
    'Een join-link is de eenvoudigste uitnodiging: één link, één klik en een nieuw lid zit in de kamer.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt communities te vinden of te starten — het organiseert geen lokale evenementen en claimt geen lokaal personeel.',
  ],
  faq: [
    {
      question: 'Hoe lang duurt het om een community te starten?',
      answer:
        'Je kunt binnen een paar weken een groep publiceren en de kamer openen als je de reikwijdte klein houdt: één doel, één join-link en een gestage stroom persoonlijke uitnodigingen. De community zelf kost een paar maanden van consistente deelname in de kamer voordat hij gevestigd voelt.',
    },
    {
      question: 'Heb ik geld of een locatie nodig om te starten?',
      answer:
        'Nee. De digitale kern van een community — een gepubliceerde groep en de kamer — kost niets en heeft geen locatie nodig. Veel groepen kiezen er later voor elkaar fysiek te ontmoeten; bibliotheken, coffeeshops, parken en coworking-lounges bieden in de meeste steden gratis plek voor eerste bijeenkomsten.',
    },
    {
      question: 'Wat is de meest gemaakte fout bij het starten van een community?',
      answer:
        'Iedereen willen bedienen. Een community met een vaag doel trekt weinig toegewijde leden. Definieer één specifiek publiek en één duidelijk resultaat, zet het op de groeps-pagina en laat de community daaruit groeien.',
    },
    {
      question: 'Hoe kan JoinOrigin mij helpen een community te starten?',
      answer:
        'Een groep publiceren op JoinOrigin maakt automatisch de kamer aan en leden sluiten via een link aan — één georganiseerd digitaal thuis voor het doel, de mensen en het gesprek van een community. JoinOrigin organiseert geen lokale evenementen, dus de praktische stappen in deze handleiding werken op het platform en met de tools die je al hebt.',
    },
  ],
  sections: [
    'Definieer een duidelijk doel. Bepaal voor wie de community is, welk probleem hij oplost en hoe een succesvol lid eruitziet. Schrijf een missie van één zin, zoals “een groep voor nieuwe founders in Amsterdam om vroege lessen te delen”. JoinOrigin geeft je doel een thuis — een openbare groeps-pagina waar de missie, het publiek en de belofte zichtbaar zijn voor iedereen die naar een groep zoals de jouwe zoekt. Schrijf de missie op en houd haar voor elke uitnodiging.',
    'Publiceer de groep en open de kamer. De digitale kern van een community is een gepubliceerde groep met een kamer waar leden kunnen praten. Op JoinOrigin maakt het publiceren van een groep automatisch de kamer aan — de maker is vanaf seconde nul eigenaar en kan in Element uitnodigen, verwijderen en rollen toewijzen. Op JoinOrigin is er geen stap “de chat later maken”: publiceer de groep en de kamer bestaat direct, met de maker als kamereigenaar. Richt het groeps-thuis en de kamer ook in de tools die je al gebruikt in, als je dat liever wilt.',
    'Deel je join-link. Een join-link is de eenvoudigste uitnodiging die er is: één link, één klik en een nieuw lid komt in de kamer terecht. Zet de link overal — je groeps-pagina, persoonlijke berichten en de plekken waar je publiek al samenkomt. Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je groep is genoeg.',
    'Nodig je eerste tien mensen persoonlijk uit. Persoonlijke uitnodigingen converteren veel beter dan openbare berichten. Stuur vrienden, collega’s en kennissen die bij het publiek passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen. JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een community zoeken de jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elk lid dat je uitnodigt wordt een kanaal naar het eigen netwerk.',
    'Kies een format en een ritme (een vervolgkeuze). Zodra de groep vorm krijgt, kies je een terugkerend format — een maandelijkse discussie, een wekelijkse werksessie, een praatje of een sociale wandeling. Terugkerend verslaat eenmalig omdat gewoontes vreemden in leden veranderen. Dit is een vervolgkeuze: de groep kan later fysiek samenkomen, maar de kamer is al het thuis van de community. Op JoinOrigin kunnen organisatoren hun format één keer beschrijven en kunnen leden vóór aansluiting zien wat ze kunnen verwachten — wat de aarzeling vermindert die eerste-timers tegenhoudt. Kies je format en benoem het in elke uitnodiging.',
    'Organiseer een geweldige eerste bijeenkomst. Als leden ervoor kiezen elkaar fysiek te ontmoeten — kom dan vroeg, begroet iedereen persoonlijk, houd een korte voorstelronde en eindig met een duidelijke volgende datum. Het doel van de eerste bijeenkomst is geen omvang; het is dat iedereen terug wil komen. JoinOrigin bemant of organiseert geen bijeenkomsten — de ervaring is aan jou om te ontwerpen. Het platform helpt de community eromheen te vormen: één gedeelde kamer waar de datum, de terugblik en de volgende stappen leven.',
    'Verzamel feedback en verbeter. Vraag leden na de eerste weken wat ze meer of minder willen — in de kamer en bij bijeenkomsten. Pas het format, het tijdstip of de locatie aan op hun antwoorden, niet op wat jij je had voorgesteld. JoinOrigin bewaart het gedeelde geheugen van een community op één plek — notities, beslissingen en waar leden om vroegen — zodat verbetering zichtbaar is in plaats van verloren. Vraag leden na elke bijeenkomst direct in de kamer.',
    'Houd een consistent ritme aan en groei langzaam. Houd maandenlang dezelfde dag en hetzelfde format aan voordat je uitbreidt. Groei stapelt zich op via verwijzingen wanneer elk lid in één zin kan beschrijven wat de community is en de join-link kan delen. JoinOrigin helpt je community vindbaar en verbonden te blijven naarmate hij groeit — één plek waar het ritme, de belofte, de kamer en de mensen zichtbaar zijn. Word ontdekt en groei.',
  ],
  steps: [
    {
      title: 'Definieer een duidelijk doel',
      body: 'Bepaal voor wie de community is, welk probleem hij oplost en hoe een succesvol lid eruitziet. Schrijf een missie van één zin, zoals “een groep voor nieuwe founders in Amsterdam om vroege lessen te delen”.',
      joinOriginNote:
        'JoinOrigin geeft je doel een thuis — een openbare groeps-pagina waar de missie, het publiek en de belofte zichtbaar zijn voor iedereen die naar een groep zoals de jouwe zoekt. Schrijf de missie op en houd haar voor elke uitnodiging.',
    },
    {
      title: 'Publiceer de groep en open de kamer',
      body: 'De digitale kern van een community is een gepubliceerde groep met een kamer waar leden kunnen praten. Op JoinOrigin maakt het publiceren van een groep automatisch de kamer aan — de maker is vanaf seconde nul eigenaar en kan in Element uitnodigen, verwijderen en rollen toewijzen.',
      joinOriginNote:
        'Op JoinOrigin is er geen stap “de chat later maken”: publiceer de groep en de kamer bestaat direct, met de maker als kamereigenaar. Richt het groeps-thuis en de kamer ook in de tools die je al gebruikt in, als je dat liever wilt.',
    },
    {
      title: 'Deel je join-link',
      body: 'Een join-link is de eenvoudigste uitnodiging die er is: één link, één klik en een nieuw lid komt in de kamer terecht. Zet de link overal — je groeps-pagina, persoonlijke berichten en de plekken waar je publiek al samenkomt.',
      joinOriginNote:
        'Lid worden op JoinOrigin is één actie — klikken op Lid worden op de openbare pagina of een directe uitnodigingslink van een lid volgen. Eén korte, duidelijke link naar je groep is genoeg.',
    },
    {
      title: 'Nodig je eerste tien mensen persoonlijk uit',
      body: 'Persoonlijke uitnodigingen converteren veel beter dan openbare berichten. Stuur vrienden, collega’s en kennissen die bij het publiek passen een bericht, deel de join-link en vraag hen nog één iemand mee te nemen.',
      joinOriginNote:
        'JoinOrigin maakt ontdekken gemakkelijker — een plek waar mensen die een community zoeken de jouwe kunnen vinden en via een link kunnen aansluiten. Persoonlijke uitnodigingen doen nog steeds het zware werk, en elk lid dat je uitnodigt wordt een kanaal naar het eigen netwerk.',
    },
    {
      title: 'Kies een format en een ritme (een vervolgkeuze)',
      body: 'Zodra de groep vorm krijgt, kies je een terugkerend format — een maandelijkse discussie, een wekelijkse werksessie, een praatje of een sociale wandeling. Terugkerend verslaat eenmalig omdat gewoontes vreemden in leden veranderen. Dit is een vervolgkeuze: de groep kan later fysiek samenkomen, maar de kamer is al het thuis van de community.',
      joinOriginNote:
        'Op JoinOrigin kunnen organisatoren hun format één keer beschrijven en kunnen leden vóór aansluiting zien wat ze kunnen verwachten — wat de aarzeling vermindert die eerste-timers tegenhoudt. Kies je format en benoem het in elke uitnodiging.',
    },
    {
      title: 'Organiseer een geweldige eerste bijeenkomst',
      body: 'Als leden ervoor kiezen elkaar fysiek te ontmoeten — kom dan vroeg, begroet iedereen persoonlijk, houd een korte voorstelronde en eindig met een duidelijke volgende datum. Het doel van de eerste bijeenkomst is geen omvang; het is dat iedereen terug wil komen.',
      joinOriginNote:
        'JoinOrigin bemant of organiseert geen bijeenkomsten — de ervaring is aan jou om te ontwerpen. Het platform helpt de community eromheen te vormen: één gedeelde kamer waar de datum, de terugblik en de volgende stappen leven.',
    },
    {
      title: 'Verzamel feedback en verbeter',
      body: 'Vraag leden na de eerste weken wat ze meer of minder willen — in de kamer en bij bijeenkomsten. Pas het format, het tijdstip of de locatie aan op hun antwoorden, niet op wat jij je had voorgesteld.',
      joinOriginNote:
        'JoinOrigin bewaart het gedeelde geheugen van een community op één plek — notities, beslissingen en waar leden om vroegen — zodat verbetering zichtbaar is in plaats van verloren. Vraag leden na elke bijeenkomst direct in de kamer.',
    },
    {
      title: 'Houd een consistent ritme aan en groei langzaam',
      body: 'Houd maandenlang dezelfde dag en hetzelfde format aan voordat je uitbreidt. Groei stapelt zich op via verwijzingen wanneer elk lid in één zin kan beschrijven wat de community is en de join-link kan delen.',
      joinOriginNote:
        'JoinOrigin helpt je community vindbaar en verbonden te blijven naarmate hij groeit — één plek waar het ritme, de belofte, de kamer en de mensen zichtbaar zijn. Word ontdekt en groei.',
    },
  ],
};

export default content;
