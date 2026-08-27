import type { GuideContent } from '../../types';

/**
 * « Hoe houd je een community actief » — tijdloze L1-handleiding
 * (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: de kamer en de activiteit daarin (die de
 * feed voedt) zijn het behoud-oppervlak — de community leeft in de kamer
 * tussen bijeenkomsten, en fysieke evenementen zijn een gevolg. De waarde
 * van JoinOrigin zit in de intro en elke stap (per stap een
 * `joinOriginNote`), met eerlijke framing — JoinOrigin beheert geen
 * community’s en bemant geen evenementen. «Kamer» verwijst naar de
 * Matrix-kamer (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'keep-an-origin-active',
  title: 'Hoe houd je een community actief en betrokken | JoinOrigin',
  description:
    'Houd je community actief — of die nu nieuw is en zijn ritme vindt of gevestigd en aan het wegdrijven is — gebruik de kamer en de feed als behoud-oppervlak, bouw rituelen, deel de organisatorische last en creëer kleine bijdragemogelijkheden. Praktische stappen van JoinOrigin.',
  intro: [
    'De meeste community’s sterven niet door een slechte lancering; ze sterven door stilte — het moment waarop mensen zich niet meer verbonden voelen en stilletjes wegdrijven. Een community actief houden is daarom een mensen-verbinden-probleem: mensen blijven wanneer ze het gevoel hebben dat ze erbij horen, en ze horen erbij wanneer er een zichtbare, georganiseerde plek is waar de community leeft. Dat is precies wat JoinOrigin is — en dezelfde mechanismen gelden of de community nu een paar weken oud is en nog zijn ritme zoekt of jaren oud en in stilte aan het wegdrijven is.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s te vinden, te starten en te organiseren — en in het digitale model is de kamer het behoud-oppervlak: een door de maker beheerde Matrix-kamer waar rituelen, updates en bijdragen zichtbaar blijven, en waarvan de activiteit de feed in stroomt die leden tussen bijeenkomsten verbonden houdt. Fysieke evenementen blijven een gevolg van een gevormde community, nooit de kern — de kamer en de feed zijn wat de community dagelijks levend houdt. JoinOrigin beheert geen community’s en bemant geen evenementen — het platform houdt community’s tussen bijeenkomsten verbonden, en het organiseren is aan jou.',
    'Deze handleiding behandelt de praktische mechanismen van een gezonde, actieve community — van de eerste weken na de lancering tot een community die al jaren draait: rituelen opzetten die van deelname een gewoonte maken, gedeelde artefacten in de kamer creëren, de organisatorische last verdelen zodat niemand opbrandt, kleine bijdragemogelijkheden openen zodat elk lid waarde kan toevoegen en de signalen meten die vertellen of de community echt leeft. Elke stap sluit aan bij hoe JoinOrigin helpt.',
  ],
  dataPoints: [
    'Terugkerende rituelen — een vast kamer-ritme, een regelmatig format, een gedeeld artefact — zetten interesse om in gewoonte.',
    'Kamertactiviteit tussen bijeenkomsten is wat leden verbonden houdt; stilte is wat hen wegjaagt.',
    'Kleine bijdragemogelijkheden (een vastgezette notitie, een roulerende host, een ledenspotlight) geven leden eigenaarschap.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt community’s te vinden, te starten en te organiseren; het beheert geen community’s en bemant geen evenementen.',
  ],
  faq: [
    {
      question: 'Hoe vaak moet een actieve community samenkomen?',
      answer:
        'Maandelijks is het meest duurzame uitgangspunt voor fysieke bijeenkomsten; de kamer moet wekelijks actief zijn — check-ins, updates en kleine gesprekken. Consistentie is belangrijker dan frequentie: een betrouwbaar wekelijks kamer-ritme verslaat een sporadisch ritme.',
    },
    {
      question: 'Wat doe ik wanneer de betrokkenheid zakt?',
      answer:
        'Raak niet in paniek en lanceer geen grote campagne. Vraag leden direct wat ze nodig hebben, plaats één simpele vraag in de kamer, organiseer één kleinere en eenvoudigere bijeenkomst en delegeer één rol aan een lid. Kleine, responsieve veranderingen wekken betrokkenheid sneller weer op dan volume.',
    },
    {
      question: 'Hoe houd ik leden tussen bijeenkomsten betrokken?',
      answer:
        'Creëer laagdrempelige contactpunten in de kamer: een gedeeld document, een ledenspotlight, een regelmatige check-in-thread of een update “wie werkt waaraan”. Het doel is een zichtbare hartslag in de kamer en de feed, geen constante meldingen.',
    },
    {
      question: 'Kan JoinOrigin mij helpen mijn community actief te houden?',
      answer:
        'Ja. JoinOrigin helpt mensen community’s te vinden, te starten en te organiseren — één kamer en feed waar de community tussen bijeenkomsten zichtbaar blijft. De praktijken in deze handleiding — rituelen, gedeelde rollen en kleine bijdragen — werken op het platform en met de tools die je al hebt.',
    },
  ],
  sections: [
    'Definieer een kernritueel. Kies één terugkerende praktijk waar iedereen op kan rekenen: een maandelijkse bijeenkomst, een wekelijkse check-in, een gedeelde leesactiviteit of een projectupdate. Rituelen creëren de hartslag die een community levend houdt — en in een digitaal-eerst community vindt het ritueel plaats in de kamer. Op JoinOrigin is het ritme van een community zichtbaar in één georganiseerde kamer — leden weten altijd wat het volgende ritueel is. Kies één terugkerende praktijk en bescherm haar.',
    'Creëer een gedeeld artefact in de kamer. Start een vastgezette notitie of een document dat vastlegt wat de community doet — notulen, ledenintroducties, projectupdates. Een levend artefact houdt leden tussen bijeenkomsten georiënteerd. JoinOrigin is de gedeelde kamer waar notities, introducties en updates naast de community leven — een levend artefact door ontwerp. Pin een eenvoudig gedeeld document in de kamer.',
    'Verdeel de organisatorische last. Werf twee of drie co-hosts of helpers en laat kleine rollen rouleren: welkom heten, notuleren, onderwerpen kiezen, locatiecontact. Gedeeld eigenaarschap is de beste verdediging tegen opbranden. JoinOrigin bemant of beheert geen community’s — gedeeld eigenaarschap is aan jou om op te bouwen. Het platform geeft helpers en organisatoren één kamer om in te coördineren. Werf twee of drie co-hosts en laat rollen rouleren.',
    'Open kleine bijdragemogelijkheden. Geef leden manieren om waarde toe te voegen zonder grote toezeggingen: een ledenspotlight, een roulerende gespreksleider, een gedeelde afspeellijst of leeslijst, of een vastgezette sectie “hulp gevraagd” in de kamer. Op JoinOrigin hebben leden zichtbare manieren om bij te dragen — een community waar waarde toevoegen gemakkelijk is. Ledenspotlights en roulerende gespreksleiders creëren hetzelfde eigenaarschap.',
    'Houd een voorspelbaar communicatieritme aan in de kamer. Stuur één korte update per week of per maand op een vast schema, geplaatst in de kamer en stromend naar de feed. Voorspelbaarheid bouwt vertrouwen; stilte bouwt wegdriften. JoinOrigin houdt de hartslag van de community in één kamer — één update, op een schema, waar iedereen hem kan zien. Eén korte wekelijkse update bouwt vertrouwen.',
    'Let op de betrokkenheidssignalen. Volg kamertactiviteit, herhaalbezoek en bijdragepercentage. Een gezonde community laat zijn herhaalpercentage groeien vóór zijn totale omvang — focus op de leden die terugkomen in de kamer. Op JoinOrigin kunnen organisatoren zien hoe hun community ervoor staat in één georganiseerde kamer en feed. Volg activiteit, herhaalbezoek en bijdragepercentage met een simpel blad.',
    'Vraag regelmatig om feedback in de kamer. Gebruik na elke bijeenkomst een simpele enquête met één vraag: wat vond je leuk, wat zou je veranderen. Handel naar de antwoorden en vertel de community wat je hebt veranderd. JoinOrigin verzamelt en bewaart feedback bij de community waar hij bij hoort — in de kamer. Een enquête met één vraag na elke bijeenkomst werkt — handel dan naar de antwoorden.',
    'Pas het format aan naarmate de community volwassen wordt. Wat voor tien leden werkte, past misschien niet bij vijftig. Bezoek het format, de locatie en het ritme kwartaal opnieuw en ontwikkel bewust in plaats van uit gewoonte vast te houden. JoinOrigin helpt community’s zich te ontwikkelen — één kamer waar formatwijzigingen en aankondigingen iedereen bereiken. Bezoek je format en locatie kwartaal opnieuw, met opzet.',
  ],
  steps: [
    {
      title: 'Definieer een kernritueel',
      body: 'Kies één terugkerende praktijk waar iedereen op kan rekenen: een maandelijkse bijeenkomst, een wekelijkse check-in, een gedeelde leesactiviteit of een projectupdate. Rituelen creëren de hartslag die een community levend houdt — en in een digitaal-eerst community vindt het ritueel plaats in de kamer.',
      joinOriginNote:
        'Op JoinOrigin is het ritme van een community zichtbaar in één georganiseerde kamer — leden weten altijd wat het volgende ritueel is. Kies één terugkerende praktijk en bescherm haar.',
    },
    {
      title: 'Creëer een gedeeld artefact in de kamer',
      body: 'Start een vastgezette notitie of een document dat vastlegt wat de community doet — notulen, ledenintroducties, projectupdates. Een levend artefact houdt leden tussen bijeenkomsten georiënteerd.',
      joinOriginNote:
        'JoinOrigin is de gedeelde kamer waar notities, introducties en updates naast de community leven — een levend artefact door ontwerp. Pin een eenvoudig gedeeld document in de kamer.',
    },
    {
      title: 'Verdeel de organisatorische last',
      body: 'Werf twee of drie co-hosts of helpers en laat kleine rollen rouleren: welkom heten, notuleren, onderwerpen kiezen, locatiecontact. Gedeeld eigenaarschap is de beste verdediging tegen opbranden.',
      joinOriginNote:
        'JoinOrigin bemant of beheert geen community’s — gedeeld eigenaarschap is aan jou om op te bouwen. Het platform geeft helpers en organisatoren één kamer om in te coördineren. Werf twee of drie co-hosts en laat rollen rouleren.',
    },
    {
      title: 'Open kleine bijdragemogelijkheden',
      body: 'Geef leden manieren om waarde toe te voegen zonder grote toezeggingen: een ledenspotlight, een roulerende gespreksleider, een gedeelde afspeellijst of leeslijst, of een vastgezette sectie “hulp gevraagd” in de kamer.',
      joinOriginNote:
        'Op JoinOrigin hebben leden zichtbare manieren om bij te dragen — een community waar waarde toevoegen gemakkelijk is. Ledenspotlights en roulerende gespreksleiders creëren hetzelfde eigenaarschap.',
    },
    {
      title: 'Houd een voorspelbaar communicatieritme aan in de kamer',
      body: 'Stuur één korte update per week of per maand op een vast schema, geplaatst in de kamer en stromend naar de feed. Voorspelbaarheid bouwt vertrouwen; stilte bouwt wegdriften.',
      joinOriginNote:
        'JoinOrigin houdt de hartslag van de community in één kamer — één update, op een schema, waar iedereen hem kan zien. Eén korte wekelijkse update bouwt vertrouwen.',
    },
    {
      title: 'Let op de betrokkenheidssignalen',
      body: 'Volg kamertactiviteit, herhaalbezoek en bijdragepercentage. Een gezonde community laat zijn herhaalpercentage groeien vóór zijn totale omvang — focus op de leden die terugkomen in de kamer.',
      joinOriginNote:
        'Op JoinOrigin kunnen organisatoren zien hoe hun community ervoor staat in één georganiseerde kamer en feed. Volg activiteit, herhaalbezoek en bijdragepercentage met een simpel blad.',
    },
    {
      title: 'Vraag regelmatig om feedback in de kamer',
      body: 'Gebruik na elke bijeenkomst een simpele enquête met één vraag: wat vond je leuk, wat zou je veranderen. Handel naar de antwoorden en vertel de community wat je hebt veranderd.',
      joinOriginNote:
        'JoinOrigin verzamelt en bewaart feedback bij de community waar hij bij hoort — in de kamer. Een enquête met één vraag na elke bijeenkomst werkt — handel dan naar de antwoorden.',
    },
    {
      title: 'Pas het format aan naarmate de community volwassen wordt',
      body: 'Wat voor tien leden werkte, past misschien niet bij vijftig. Bezoek het format, de locatie en het ritme kwartaal opnieuw en ontwikkel bewust in plaats van uit gewoonte vast te houden.',
      joinOriginNote:
        'JoinOrigin helpt community’s zich te ontwikkelen — één kamer waar formatwijzigingen en aankondigingen iedereen bereiken. Bezoek je format en locatie kwartaal opnieuw, met opzet.',
    },
  ],
};

export default content;
