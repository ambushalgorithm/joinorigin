import type { GuideContent } from '../../types';

/**
 * « Origin-moderatie » — tijdloze L1-handleiding (design §6.1, TASK-326).
 *
 * Nederlandse vertaling van de EN-content, herijkt op het digitale
 * verbind→sluit-aan→kamer-model: makercontrole IS Matrix-kamereigendom —
 * leden uitnodigen/verwijderen, rollen toewijzen, kamerinstellingen
 * bewerken, berichten vastpinnen, de kamer archiveren — natieve handhaving
 * in Element. De waarde van JoinOrigin zit in de intro en elke stap (per
 * stap een `joinOriginNote`), met eerlijke framing — JoinOrigin modereert
 * geen externe community’s en levert geen moderatiepersoneel. «Kamer»
 * verwijst naar de Matrix-kamer (§6.3) — privé-/incidentruimtes worden
 * beschreven als kamers/DM’s, nooit als «kanalen».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'nl',
  slug: 'moderation',
  title: 'Origin-moderatie: hoe houd je groepen gezond en gastvrij | JoinOrigin',
  description:
    'Modereer een community met duidelijke regels, vroeg ingrijpen en de-escalatie — of je nu een gloednieuwe groep opzet of de cultuur van een gevestigde repareert, makercontrole is Matrix-kamereigendom, met rollen die in Element worden gehandhaafd. Praktische stappen van JoinOrigin.',
  intro: [
    'Elke community die groeit krijgt uiteindelijk te maken met een moment dat de cultuur op de proef stelt — een verhitte ruzie, een spammer, een lid dat anderen ongemakkelijk maakt of een misverstand dat escaleert. Moderatie is de praktijk van het beschermen van de ruimte zodat de community gastvrij kan blijven, en die wordt alleen nodig omdat community’s bestaan uit mensen die met elkaar verbinden. Dat verbinden is het kernprobleem waar JoinOrigin bij helpt — en de praktijken gelden net zo goed voor een gevestigde community die haar cultuur repareert als voor een nieuwe groep die verwachtingen stelt voordat het eerste lid arriveert.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt Origins te vinden, te starten en te organiseren — en in het digitale model leeft een community in een door de maker beheerde kamer. Makercontrole is standaard Matrix-kamereigendom: de maker kan leden uitnodigen en verwijderen, rollen toewijzen, kamerinstellingen bewerken, berichten vastpinnen en de kamer archiveren — allemaal natieve handhaving binnen Element, de standaardchatclient, zonder aangepast machtigingssysteem. Dat eigenaarschap is de ruggengraat van moderatie op JoinOrigin: de maker bepaalt wie erbij hoort, wat de regels zijn en wat er gebeurt wanneer een regel wordt overtreden. JoinOrigin modereert geen externe community’s en levert geen moderatiepersoneel. Het platform is ontworpen rond gezonde community-structuur, en de praktijken in deze handleiding zijn de menselijke praktijken die elke organisator nodig heeft.',
    'Deze handleiding zet een praktisch moderatiesysteem uiteen — of je Origin nu gloednieuw is of jaren geschiedenis heeft om op te ruimen: geschreven community-regels die kort en specifiek zijn, een duidelijk handhavingstraject met waarschuwingen vóór verwijdering, technieken om gespannen situaties te de-escaleren en eerlijk advies over wanneer je leden betrekt en wanneer je alleen handelt. Elke stap laat zien waar JoinOrigin helpt.',
  ],
  dataPoints: [
    'Duidelijke, geschreven community-regels verminderen conflicten door verwachtingen te stellen voordat incidenten gebeuren.',
    'Makercontrole op JoinOrigin is Matrix-kamereigendom: uitnodigen/verwijderen, rollen, instellingen, vastpinnen, archiveren.',
    'Een gefaseerd handhavingstraject — eerst waarschuwen, dan beperken, dan verwijderen — is eerlijker en beter te verdedigen dan directe bans.',
    'JoinOrigin is een community-besturingssysteem dat mensen helpt Origins te vinden, te starten en te organiseren; het modereert geen externe community’s en levert geen moderatiepersoneel.',
  ],
  faq: [
    {
      question: 'Hebben kleine community’s echt moderatieregels nodig?',
      answer:
        'Ja, en hoe eerder hoe beter. Twee of drie korte regels die vóór een conflict zijn geschreven, zijn veel gemakkelijker toe te passen dan regels die na één zijn verzonnen. Kleine community’s hebben minder incidenten, maar de incidenten die ze hebben zijn net zo pijnlijk.',
    },
    {
      question: 'Moeten moderatoren publiekelijk of privé handelen?',
      answer:
        'Eerst privé. Benader iemand één-op-één, herhaal de regel en de impact en geef de persoon de kans om zich aan te passen. Publieke oproepen hebben de neiging te escaleren. Houd een openbaar verslag van de regels, maar pas ze privé toe — in een DM of een privékamer.',
    },
    {
      question: 'Wanneer moet ik iemand uit de community verwijderen?',
      answer:
        'Nadat duidelijke waarschuwingen niet hebben gewerkt, of direct bij gedrag dat leden in gevaar brengt — intimidatie, bedreigingen of doxxing. De test is of de persoon de ruimte actief onveilig maakt voor anderen. Op JoinOrigin is verwijderen het verwijderen van een lid uit de kamer door de kamereigenaar.',
    },
    {
      question: 'Kan JoinOrigin mij helpen mijn Origin te modereren?',
      answer:
        'Ja. JoinOrigin is een community-besturingssysteem waar makercontrole Matrix-kamereigendom is — uitnodigen/verwijderen, rollen, instellingen, vastpinnen en archiveren, gehandhaafd in Element. JoinOrigin modereert geen community’s, dus de praktijken in deze handleiding — duidelijke regels, gefaseerde handhaving, kalme de-escalatie — zijn aan jou om toe te passen.',
    },
  ],
  sections: [
    'Schrijf drie tot vijf duidelijke regels. Houd ze kort, specifiek en positief: “Wees respectvol”, “Blijf bij het onderwerp”, “Geen spam of zelfpromotie”, “Bespreek ideeën, geen personen”. Plaats ze waar elk nieuw lid ze kan zien — idealiter vastgepind in de kamer. Op JoinOrigin zijn de regels en waarden van een community vanaf dag één zichtbaar in de kamer — nieuwe leden zien ze voordat ze aansluiten. Pin je korte regels waar elk nieuw lid ze kan zien.',
    'Zet de toon als kamereigenaar. Laat het gedrag zien dat je wilt — verwelkom nieuwkomers, bedank bijdragers en pak problemen kalm aan. Het voorbeeld van de maker bepaalt de culturele ondergrens van de community. JoinOrigin bewaakt geen community’s — de toon wordt gezet door makers en leden. Het platform maakt gastvrij gedrag zichtbaar; laat het gedrag zien dat je wilt in de kamer.',
    'Beheer de kamer als de maker die je bent. Makercontrole op JoinOrigin is Matrix-kamereigendom: leden uitnodigen en verwijderen, rollen toewijzen, kamerinstellingen bewerken, berichten vastpinnen en de kamer archiveren — natieve handhaving in Element. Deze bediening kennen is de technische helft van moderatie. JoinOrigin geeft de maker vanaf publicatie volledig eigenaarschap over de kamer, zonder aangepast machtigingssysteem. Leer de moderatiebediening van het platform dat je gebruikt en wijs één duidelijke eigenaar aan.',
    'Spreek een handhavingstraject af. Definieer een gefaseerde reactie: privéwaarschuwing, dan beperkingen (gedempt, beperkt plaatsen — vaak een rolwijziging), dan verwijdering bij herhaalde of ernstige overtredingen. Consistent escaleren is eerlijker dan improviseren. Op JoinOrigin zijn rollen standaard Matrix-rollen in Element — dempen, verbannen en rollen toewijzen zijn natieve acties. Schrijf het handhavingstraject op en houd je eraan.',
    'Handel vroeg en kalm. Pak het eerste teken van een probleem privé aan, voordat het een publiek incident wordt. Vroeg, kalm ingrijpen is de goedkoopste moderatie die er is. JoinOrigin modereert niet voor je — vroeg, kalm ingrijpen is een menselijke vaardigheid. Het platform is zo ontworpen dat problemen zichtbaar in de kamer naar boven komen en vroeg worden opgepakt. Neem bij het eerste teken privé contact op.',
    'Leer de-escalatietechnieken. Wanneer spanningen oplopen, vertraag het gesprek: erken het gevoel, herhaal het meningsverschil neutraal, vraag naar het onderliggende punt en stel een pauze of een privékamer voor de hitte voor. JoinOrigin houdt community-interacties door ontwerp georganiseerd en kalm, maar de-escalatie blijft een menselijk ambacht. Vertraag het gesprek en verplaats de hitte naar een privékamer.',
    'Houd een verslag bij van belangrijke incidenten. Noteer wat er is gebeurd, wat je hebt gedaan en waarom. Een simpel logboek helpt je consistent te blijven, van patronen te leren en beslissingen te verdedigen wanneer een lid vraagt waarom. JoinOrigin is een community-besturingssysteem waar de geschiedenis van de community op één plek leeft — een natuurlijk thuis voor een incidentlogboek. Een simpele notitie van wat er is gebeurd en waarom houdt je consistent.',
    'Deel de last met co-moderatoren. Werf één of twee vertrouwde leden en spreek de regels van handhaving af. Een community die van één moderator afhangt, wordt fragiel en bevooroordeeld. JoinOrigin levert geen moderatiepersoneel — co-moderatoren zijn medeleden. Makers wijzen rollen toe aan co-moderatoren in Element — natieve Matrix-rollen, geen aangepast systeem. Werf één of twee vertrouwde leden en geef hen duidelijke rollen.',
  ],
  steps: [
    {
      title: 'Schrijf drie tot vijf duidelijke regels',
      body: 'Houd ze kort, specifiek en positief: “Wees respectvol”, “Blijf bij het onderwerp”, “Geen spam of zelfpromotie”, “Bespreek ideeën, geen personen”. Plaats ze waar elk nieuw lid ze kan zien — idealiter vastgepind in de kamer.',
      joinOriginNote:
        'Op JoinOrigin zijn de regels en waarden van een community vanaf dag één zichtbaar in de kamer — nieuwe leden zien ze voordat ze aansluiten. Pin je korte regels waar elk nieuw lid ze kan zien.',
    },
    {
      title: 'Zet de toon als kamereigenaar',
      body: 'Laat het gedrag zien dat je wilt — verwelkom nieuwkomers, bedank bijdragers en pak problemen kalm aan. Het voorbeeld van de maker bepaalt de culturele ondergrens van de community.',
      joinOriginNote:
        'JoinOrigin bewaakt geen community’s — de toon wordt gezet door makers en leden. Het platform maakt gastvrij gedrag zichtbaar; laat het gedrag zien dat je wilt in de kamer.',
    },
    {
      title: 'Beheer de kamer als de maker die je bent',
      body: 'Makercontrole op JoinOrigin is Matrix-kamereigendom: leden uitnodigen en verwijderen, rollen toewijzen, kamerinstellingen bewerken, berichten vastpinnen en de kamer archiveren — natieve handhaving in Element. Deze bediening kennen is de technische helft van moderatie.',
      joinOriginNote:
        'JoinOrigin geeft de maker vanaf publicatie volledig eigenaarschap over de kamer, zonder aangepast machtigingssysteem. Leer de moderatiebediening van het platform dat je gebruikt en wijs één duidelijke eigenaar aan.',
    },
    {
      title: 'Spreek een handhavingstraject af',
      body: 'Definieer een gefaseerde reactie: privéwaarschuwing, dan beperkingen (gedempt, beperkt plaatsen — vaak een rolwijziging), dan verwijdering bij herhaalde of ernstige overtredingen. Consistent escaleren is eerlijker dan improviseren.',
      joinOriginNote:
        'Op JoinOrigin zijn rollen standaard Matrix-rollen in Element — dempen, verbannen en rollen toewijzen zijn natieve acties. Schrijf het handhavingstraject op en houd je eraan.',
    },
    {
      title: 'Handel vroeg en kalm',
      body: 'Pak het eerste teken van een probleem privé aan, voordat het een publiek incident wordt. Vroeg, kalm ingrijpen is de goedkoopste moderatie die er is.',
      joinOriginNote:
        'JoinOrigin modereert niet voor je — vroeg, kalm ingrijpen is een menselijke vaardigheid. Het platform is zo ontworpen dat problemen zichtbaar in de kamer naar boven komen en vroeg worden opgepakt. Neem bij het eerste teken privé contact op.',
    },
    {
      title: 'Leer de-escalatietechnieken',
      body: 'Wanneer spanningen oplopen, vertraag het gesprek: erken het gevoel, herhaal het meningsverschil neutraal, vraag naar het onderliggende punt en stel een pauze of een privékamer voor de hitte voor.',
      joinOriginNote:
        'JoinOrigin houdt community-interacties door ontwerp georganiseerd en kalm, maar de-escalatie blijft een menselijk ambacht. Vertraag het gesprek en verplaats de hitte naar een privékamer.',
    },
    {
      title: 'Houd een verslag bij van belangrijke incidenten',
      body: 'Noteer wat er is gebeurd, wat je hebt gedaan en waarom. Een simpel logboek helpt je consistent te blijven, van patronen te leren en beslissingen te verdedigen wanneer een lid vraagt waarom.',
      joinOriginNote:
        'JoinOrigin is een community-besturingssysteem waar de geschiedenis van de community op één plek leeft — een natuurlijk thuis voor een incidentlogboek. Een simpele notitie van wat er is gebeurd en waarom houdt je consistent.',
    },
    {
      title: 'Deel de last met co-moderatoren',
      body: 'Werf één of twee vertrouwde leden en spreek de regels van handhaving af. Een community die van één moderator afhangt, wordt fragiel en bevooroordeeld.',
      joinOriginNote:
        'JoinOrigin levert geen moderatiepersoneel — co-moderatoren zijn medeleden. Makers wijzen rollen toe aan co-moderatoren in Element — natieve Matrix-rollen, geen aangepast systeem. Werf één of twee vertrouwde leden en geef hen duidelijke rollen.',
    },
  ],
};

export default content;
