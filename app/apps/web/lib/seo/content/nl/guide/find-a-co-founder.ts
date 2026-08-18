import type { GuideContent } from '../../types';

/**
 * « Hoe vind je een medeoprichter » — tijdloze L1-handleiding
 * (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: een idee-pagina wordt gepubliceerd, de
 * kamer wordt automatisch aangemaakt en medeoprichter-gesprekken vinden
 * plaats in die kamer — de digitale plek waar kandidaten het idee kunnen
 * vinden, vragen kunnen stellen en samen kunnen werken. De waarde van
 * JoinOrigin zit in de intro en elke stap (per stap een `joinOriginNote`),
 * met eerlijke framing — JoinOrigin is geen datingservice en matcht geen
 * founders. «Kamer» verwijst naar de Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'find-a-co-founder',
  title: 'Hoe vind je een medeoprichter: waar te zoeken en wat te vragen | JoinOrigin',
  description:
    'Vind een medeoprichter die jouw vaardigheden aanvult — of je nu een nieuw bedrijf lanceert of een bestaand bedrijf laat groeien — publiceer een idee-pagina, ontmoet mensen in community’s en hun kamers, doe een proefproject en stel de vragen die breuken voorkomen. Van JoinOrigin.',
  intro: [
    'Een medeoprichter vinden is een relatiebeslissing vermomd als een aanneembeslissing, en in de kern is het weer een mensen-verbinden-probleem: de juiste persoon is vaak één warme introductie verwijderd, ergens in een community die je nog niet hebt ontdekt. Dat is het probleem waar JoinOrigin bij helpt — en het is hetzelfde probleem of je nu nog in de idee-fase zit of een bestaand bedrijf runt dat een partner nodig heeft voor de volgende stap.',
    'JoinOrigin is een community-besturingssysteem dat is gebouwd rond de digitale verbind→sluit-aan→kamer-loop: je publiceert een idee, de kamer wordt automatisch aangemaakt en mensen die het idee delen kunnen in die kamer aansluiten en praten. De idee-pagina is de openbare belofte en de kamer is waar medeoprichter-gesprekken echt plaatsvinden — een door de maker beheerde Matrix-kamer waar geïnteresseerden vragen kunnen stellen, notities kunnen delen en de klik kunnen testen voordat iemand zich committeert. JoinOrigin is geen datingservice, matcht geen founders en heeft geen lokale kantoren. De waarde van het platform — mensen verbinden rond gedeelde interesses — sluit direct aan op de manier waarop de meeste founders hun medeoprichter daadwerkelijk vinden: via community’s, kamers en warme introducties.',
    'Deze handleiding benadert de zoektocht zoals je het bouwen van een community zou benaderen: start vanuit je bestaande netwerk, publiceer een idee dat mensen kunnen vinden, breid bewust uit via community’s en hun kamers, beoordeel kandidaten met gestructureerde gesprekken en een proefproject en spreek de fundamenten af voordat je juridisch iets aangaat. De stappen zijn praktisch en eerlijk, en elke stap laat zien waar JoinOrigin helpt.',
  ],
  dataPoints: [
    'Warme introducties en gedeeld werk leveren de meest duurzame medeoprichter-relaties op.',
    'Een gepubliceerde idee-pagina met een kamer geeft geïnteresseerden een echte plek om het idee te vinden en een gesprek te beginnen.',
    'Een kort proefproject — een prototype, een landingspagina of een betaalde pilot — test werkstijlen sneller dan sollicitatiegesprekken.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s en samenwerkers te vinden; het is geen datingservice en heeft geen lokale kantoren.',
  ],
  faq: [
    {
      question: 'Waar vinden de meeste mensen hun medeoprichter?',
      answer:
        'De meeste founders ontmoeten elkaar via warme netwerken — evenementen, community’s, kamers en introducties van mensen die ze vertrouwen. Een idee publiceren dat mensen kunnen vinden en vervolgens consistent opdagen in dezelfde community’s en hun kamers, is de meest betrouwbare manier om potentiële medeoprichters te ontmoeten.',
    },
    {
      question: 'Hoe weet ik of iemand een goede medeoprichter-match is?',
      answer:
        'Doe samen een klein proefproject en let op drie dingen: aanvullende vaardigheden, vergelijkbare risicobereidheid en eerlijke communicatie onder deadlines. Het proefproject onthult alle drie sneller dan welk gesprek dan ook.',
    },
    {
      question: 'Wat moeten we afspreken voordat we beginnen?',
      answer:
        'Praat over rollen, tijdsinvestering, aandelenverdeling, vesting, besluitvorming en wat er gebeurt als iemand wil stoppen. Deze zaken vroeg op tafel leggen voorkomt de meningsverschillen die de meeste vroege teams vernietigen.',
    },
    {
      question: 'Kan JoinOrigin mij helpen een medeoprichter te vinden?',
      answer:
        'JoinOrigin helpt mensen community’s en samenwerkers te vinden — inclusief het soort community’s waar founders elkaar ontmoeten — met een idee-pagina en een kamer waar gesprekken kunnen plaatsvinden. JoinOrigin matcht geen founders, dus de netwerk- en proefprojectstappen in deze handleiding zijn je meest betrouwbare pad.',
    },
  ],
  sections: [
    'Breng eerst je vaardigheidsgaten in kaart. Schrijf op waar je echt goed in bent en wat het bedrijf nodig heeft dat jij niet bent. Een medeoprichter moet je grootste gat dichten — technisch, commercieel of operationeel — en niet je sterktes dupliceren. JoinOrigin is gebouwd rond profielen, ideeën en community’s, niet rond matchen — dus het eerlijke advies is hetzelfde als altijd: weet welk gat je moet dichten voordat je gaat zoeken. Schrijf je sterktes en de behoeften van het bedrijf op.',
    'Publiceer je idee en open de kamer. Een idee dat niemand kan vinden, trekt geen medeoprichter aan. Publiceer een duidelijke idee-pagina — wat je bouwt, waarom en het soort persoon dat je nodig hebt — en laat de kamer automatisch aanmaken zodat geïnteresseerden een plek hebben om te praten. Een idee publiceren op JoinOrigin maakt automatisch de kamer aan, de plek waar medeoprichter-gesprekken plaatsvinden. Publiceer je idee ergens openbaar en open een kamer voor de discussie eromheen.',
    'Werk je bestaande netwerk af voor warme introducties. Vertel vijf mensen die je vertrouwt wat je bouwt en het soort medeoprichter dat je nodig hebt. Vraag elk van hen om één naam. Warme introducties verslaan koude benadering in bijna elk geval. JoinOrigin maakt community’s vindbaar, waardoor je warme netwerk na verloop van tijd groeit — en elke introductie kan leiden naar een kamer waar het echte gesprek plaatsvindt. Vertel vijf mensen die je vertrouwt precies wat voor medeoprichter je nodig hebt.',
    'Dag consistent op in relevante community’s en hun kamers. Bezoek evenementen en sluit je aan bij groepen waar het juiste soort persoon samenkomt: founder-meetups, branche-community’s, coworking-ruimtes en online kamers. Herhaling bouwt het vertrouwen dat tot introducties leidt. JoinOrigin helpt mensen de community’s te vinden die bij hun doelen passen — het soort plek waar founders elkaar ontmoeten — en aan te sluiten bij hun kamers. Kies de meetups en kamers waar de juiste mensen al samenkomen en blijf opdagen.',
    'Voer gestructureerde eerste gesprekken. Vraag naar hun vaardigheden, risicobereidheid, tijdsinvestering en waarom ze iets willen starten of laten groeien. Deel je eigen antwoorden. Dit is een wederzijds interview, geen pitch. JoinOrigin matcht geen founders en voert geen gesprekken — het wederzijdse interview is aan jou. Het platform plaatst je in dezelfde community’s en kamers als potentiële samenwerkers — de rest is aan jou.',
    'Doe samen een proefproject. Kies iets kleins en echts — een prototype, een landingspagina of een betaalde pilot — en werk er vier tot zes weken aan. Kijk hoe jullie werk verdelen, met feedback omgaan en ons gedragen onder druk. JoinOrigin geeft community’s een gedeelde kamer voor hun werk en projecten — een natuurlijke plek waar een proefproject naar boven kan komen. Een klein echt prototype is de meest betrouwbare test.',
    'Beslis op basis van het proefproject, niet op basis van het potentieel. Vraag of je deze persoon je reputatie zou toevertrouwen, of ze eerlijk communiceren en of samenwerken je energie geeft. Voelde het proefproject gespannen, vertrouw dan op dat signaal. JoinOrigin neemt de beslissing niet voor je. De eerlijke waarde is de community- en kamercontext waarin je kandidaten kunt ontmoeten en met hen kunt werken — het proefproject vertelt je nog steeds de waarheid.',
    'Spreek de fundamenten af voordat je je committeert. Schrijf rollen, tijdsinvestering, aandelenverdeling, vesting en besluitvormingsregels op. Zelfs een simpele eenpagina-overeenkomst voorkomt de meeste vroege misverstanden. JoinOrigin is een community-besturingssysteem — één georganiseerde ruimte waar overeenkomsten, rollen en projectnotities naast de idee-kamer kunnen leven. Zelfs een schriftelijke eenpagina-overeenkomst voorkomt de meeste vroege misverstanden.',
  ],
  steps: [
    {
      title: 'Breng eerst je vaardigheidsgaten in kaart',
      body: 'Schrijf op waar je echt goed in bent en wat het bedrijf nodig heeft dat jij niet bent. Een medeoprichter moet je grootste gat dichten — technisch, commercieel of operationeel — en niet je sterktes dupliceren.',
      joinOriginNote:
        'JoinOrigin is gebouwd rond profielen, ideeën en community’s, niet rond matchen — dus het eerlijke advies is hetzelfde als altijd: weet welk gat je moet dichten voordat je gaat zoeken. Schrijf je sterktes en de behoeften van het bedrijf op.',
    },
    {
      title: 'Publiceer je idee en open de kamer',
      body: 'Een idee dat niemand kan vinden, trekt geen medeoprichter aan. Publiceer een duidelijke idee-pagina — wat je bouwt, waarom en het soort persoon dat je nodig hebt — en laat de kamer automatisch aanmaken zodat geïnteresseerden een plek hebben om te praten.',
      joinOriginNote:
        'Een idee publiceren op JoinOrigin maakt automatisch de kamer aan, de plek waar medeoprichter-gesprekken plaatsvinden. Publiceer je idee ergens openbaar en open een kamer voor de discussie eromheen.',
    },
    {
      title: 'Werk je bestaande netwerk af voor warme introducties',
      body: 'Vertel vijf mensen die je vertrouwt wat je bouwt en het soort medeoprichter dat je nodig hebt. Vraag elk van hen om één naam. Warme introducties verslaan koude benadering in bijna elk geval.',
      joinOriginNote:
        'JoinOrigin maakt community’s vindbaar, waardoor je warme netwerk na verloop van tijd groeit — en elke introductie kan leiden naar een kamer waar het echte gesprek plaatsvindt. Vertel vijf mensen die je vertrouwt precies wat voor medeoprichter je nodig hebt.',
    },
    {
      title: 'Dag consistent op in relevante community’s en hun kamers',
      body: 'Bezoek evenementen en sluit je aan bij groepen waar het juiste soort persoon samenkomt: founder-meetups, branche-community’s, coworking-ruimtes en online kamers. Herhaling bouwt het vertrouwen dat tot introducties leidt.',
      joinOriginNote:
        'JoinOrigin helpt mensen de community’s te vinden die bij hun doelen passen — het soort plek waar founders elkaar ontmoeten — en aan te sluiten bij hun kamers. Kies de meetups en kamers waar de juiste mensen al samenkomen en blijf opdagen.',
    },
    {
      title: 'Voer gestructureerde eerste gesprekken',
      body: 'Vraag naar hun vaardigheden, risicobereidheid, tijdsinvestering en waarom ze iets willen starten of laten groeien. Deel je eigen antwoorden. Dit is een wederzijds interview, geen pitch.',
      joinOriginNote:
        'JoinOrigin matcht geen founders en voert geen gesprekken — het wederzijdse interview is aan jou. Het platform plaatst je in dezelfde community’s en kamers als potentiële samenwerkers — de rest is aan jou.',
    },
    {
      title: 'Doe samen een proefproject',
      body: 'Kies iets kleins en echts — een prototype, een landingspagina of een betaalde pilot — en werk er vier tot zes weken aan. Kijk hoe jullie werk verdelen, met feedback omgaan en ons gedragen onder druk.',
      joinOriginNote:
        'JoinOrigin geeft community’s een gedeelde kamer voor hun werk en projecten — een natuurlijke plek waar een proefproject naar boven kan komen. Een klein echt prototype is de meest betrouwbare test.',
    },
    {
      title: 'Beslis op basis van het proefproject, niet op basis van het potentieel',
      body: 'Vraag of je deze persoon je reputatie zou toevertrouwen, of ze eerlijk communiceren en of samenwerken je energie geeft. Voelde het proefproject gespannen, vertrouw dan op dat signaal.',
      joinOriginNote:
        'JoinOrigin neemt de beslissing niet voor je. De eerlijke waarde is de community- en kamercontext waarin je kandidaten kunt ontmoeten en met hen kunt werken — het proefproject vertelt je nog steeds de waarheid.',
    },
    {
      title: 'Spreek de fundamenten af voordat je je committeert',
      body: 'Schrijf rollen, tijdsinvestering, aandelenverdeling, vesting en besluitvormingsregels op. Zelfs een simpele eenpagina-overeenkomst voorkomt de meeste vroege misverstanden.',
      joinOriginNote:
        'JoinOrigin is een community-besturingssysteem — één georganiseerde ruimte waar overeenkomsten, rollen en projectnotities naast de idee-kamer kunnen leven. Zelfs een schriftelijke eenpagina-overeenkomst voorkomt de meeste vroege misverstanden.',
    },
  ],
};

export default content;
