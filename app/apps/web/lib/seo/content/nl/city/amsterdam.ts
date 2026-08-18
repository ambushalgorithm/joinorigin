import type { CityContent } from '../../types';

/**
 * Amsterdam-content (Nederlandse vertaling) — stadspagina + 5 varianten +
 * idee-pagina. Verschilt van alle andere stadsbestanden (G5: geen
 * sjabloonhergebruik). Eerlijke, tijdloze proza; geen verzonnen cijfers of
 * ledenaantallen.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'nl',
  slug: 'amsterdam',
  pageTitles: {
    city: 'Community’s in Amsterdam | JoinOrigin',
    cityDescription:
      'Vind of start community’s in Amsterdam — startup-, creatieve, politieke, meetup- en kleine-bedrijfsgroepen in de Nederlandse hoofdstad. Wachtlijst van JoinOrigin.',
    variants: {
      startup: 'Startup-community’s in Amsterdam | JoinOrigin',
      creative: 'Creatieve community’s in Amsterdam | JoinOrigin',
      political: 'Politieke & burgerlijke community’s in Amsterdam | JoinOrigin',
      meetup: 'Meetup- & sociale community’s in Amsterdam | JoinOrigin',
      'small-business': 'Kleine-bedrijven-community’s in Amsterdam | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Vind of start startup-community’s in Amsterdam — founders, engineers en operators rond TQ, de Zuidas en de fintech-scene. Wachtlijst van JoinOrigin.',
      creative:
        'Vind of start creatieve community’s in Amsterdam — studio’s, galeries en collectieven in NDSM, de Jordaan en Oost. Wachtlijst van JoinOrigin.',
      political:
        'Vind of start politieke en burgerlijke community’s in Amsterdam — stadsdeelraden, woonactivism en buurtnetwerken. Wachtlijst van JoinOrigin.',
      meetup:
        'Vind of start meetup- en sociale community’s in Amsterdam — bruine cafés, borrels, fietsgroepen en bijeenkomsten aan de grachten. Wachtlijst van JoinOrigin.',
      'small-business':
        'Vind of start kleine-bedrijven-community’s in Amsterdam — winkels in de Jordaan, marktkooplieden van de Albert Cuyp en buurtnetwerken. Wachtlijst van JoinOrigin.',
    },
    ideas: '30 ideeën voor community-evenementen in Amsterdam | JoinOrigin',
    ideasDescription:
      'Ontdek 30 ideeën voor community-evenementen in Amsterdam — netwerk-, leer-, outdoor-, professionele, creatieve en impactevenementen. Wachtlijst van JoinOrigin.',
  },
  intro: [
    'Amsterdam is een compacte stad waar iedereen wel iemand kent die iemand kent. De grachtengordel, de Jordaan, De Pijp, Oost en Noord hebben elk hun eigen karakter, maar de hele stad staat op menselijke schaal — je fietst in vijftien minuten van de ene community naar de andere. De fiets is het echte sociale netwerk: groepstochten, fietsende ouders die carpoolen en na het werk naar een barbecue in het park fietsen horen bij het dagelijks leven.',
    'Het bruine café — de bruine kroeg met donker hout, kaarsen en vaste gasten — is de klassieke Amsterdamse community-locatie, terwijl de grachten, het Vondelpark en de stranden van de stadsparken zomerbijeenkomsten herbergen. Universiteiten zoals de Universiteit van Amsterdam en de VU houden een constante stroom studenten in stand, en de lange geschiedenis van de stad als handelshaven maakt haar tot een van de meest internationale hoofdsteden van Europa, waar veel Engels wordt gesproken.',
    'Amsterdamse community’s zijn doorgaans pragmatisch en gastvrij: Nederlanders houden van plannen, agenda’s en duidelijke formats, en de dichtheid van de stad betekent dat een kleine groep zonder veel moeite een zaal kan vullen. Nieuwkomers die consequent opdagen en het lokale ritme respecteren, vinden snel hun plek.',
  ],
  dataPoints: [
    'Ongeveer 740.000 inwoners in de gemeente; de hoofdstad van Nederland.',
    'Universiteiten zijn onder andere de Universiteit van Amsterdam en de VU.',
    'Fiets-eerst stad — het fietsnetwerk bepaalt hoe community’s samenkomen.',
    'Openbare ankerpunten: het Vondelpark, de grachten, de NDSM-werf en de stranden.',
    'Sterke bruine-café- en borrelcultuur van informeel samenzijn.',
    'Lange internationale geschiedenis — Engels is in veel groepen gangbaar.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'TQ en andere techhub-verdiepingen in het centrum',
        'Coworking-ruimtes in het Zuidas-zakendistrict',
        'Fintech-evenementzalen bij de Damrak',
        'Startup-cafés in Oost en de Oud-West',
        'Ondernemerschapsruimtes van de universiteiten bij de UvA en de VU',
        'Grachtenpand-kantoren met vergaderhoeken',
      ],
      formats: [
        'Founder-brunches met snelle introducties',
        'Pitch-avonden en demo-nights',
        'Fintech- en scale-up-borrels',
        'Impact- en klimaat-founder-tafels',
        'Internationale founder-mixers (Engels als voertaal)',
      ],
      howToStart: [
        'Kies een smal vertical — fintech, klimaat of marktplaatsen — en een Engels-eerst naam.',
        'Reserveer een wekelijks moment bij een TQ- of Zuidas-coworking-ruimte die je wil huisvesten.',
        'Draai drie open meetups en vraag dan twee vaste gasten om mee te organiseren en een maandelijks ritme in te stellen.',
      ],
    },
    creative: {
      venues: [
        'Studio’s en evenementenzalen op de NDSM-werf',
        'Galeries en ateliers in de Jordaan',
        'Open-dag ruimtes van de Rijksakademie',
        'Designstudio’s in Oost en De Pijp',
        'Repetitieruimtes en kleine podia',
        'Cafés aan de gracht met lange tafels',
      ],
      formats: [
        'Open weekends op de werf met kunstenaarsdemo’s',
        'Galerie-avonden tijdens de Jordaanse kunstroute',
        'Portfolioruil-avonden voor illustratoren',
        'Coworking-ochtenden voor makers die gezelschap zoeken',
        'Print- en posterworkshops in de NDSM-loodsen',
      ],
      howToStart: [
        'Kies één ambacht en één avond — specificiteit aan de gracht verslaat een algemene kunstclub in Amsterdam.',
        'Vraag een collectief in NDSM of de Jordaan om je eerste evenement mede te hosten; de veerboottocht op zich is al een beleving.',
        'Houd het format klein en beloopbaar — twee studio’s, één bar, tien mensen — en laat het woord zich langs de gracht verspreiden.',
      ],
    },
    political: {
      venues: [
        'Zalen van de stadsdeelraden',
        'Wijkcentra en buurthuizen',
        'Vergaderruimtes van wooncoöperaties',
        'Buurtmoestuinen en speelplaatsen',
        'Civic-tech ruimtes in het centrum',
        'Zithoeken van de bibliotheek',
      ],
      formats: [
        'Buurtoverleg — consultatie-avonden op straatniveau',
        'Informatie-avonden over wonen en huren met gratis advies',
        'Ontwerpworkshops voor speelplaatsen en openbare ruimte',
        'Vrijwilligers-intake-avonden met lokale organisaties',
        'Idee-labs voor participatiebudgetten',
      ],
      howToStart: [
        'Kies één kwestie op straatniveau — een speelplaats, een plein, een huurstraat — en breng in kaart wie zich er al om bekommert.',
        'Bezoek het stadsdeelkantoor en vraag naar de buurtagenda; raden publiceren hun plannen openlijk.',
        'Organiseer een avond in buurtoverleg-stijl met thee en taart, nodig de wijkcoördinator uit en laat bewoners de onderwerpen bepalen.',
      ],
    },
    meetup: {
      venues: [
        'Bruine cafés in de Jordaan en De Pijp',
        'Grasvelden van het Vondelpark en de stadsstranden',
        'Kades aan de gracht en bruggen-trappen',
        'Spelletjescafés in het centrum',
        'Buurtmoestuinen en gedeelde tuinen',
        'Verzamelpunten van fietsclubs bij het Museumplein',
      ],
      formats: [
        'Wekelijkse borrel in hetzelfde bruine café',
        'Vrijdagmiddagborrels na het werk',
        'Groepstochten en stadstochten op de fiets',
        'Picknicks en boottochten langs de grachten',
        'Taaluitwisseltafels (Nederlands–Engels)',
      ],
      howToStart: [
        'Kies een herhaalbaar format — een wekelijkse borrel, een maandelijkse tocht — en een vaste locatie.',
        'Kies een bruin café, een parkplek of een clubhuis dat je elke keer wil huisvesten.',
        'Draai de eerste drie sessies op hetzelfde tijdstip en dezelfde plek en vraag vaste gasten daarna elk één nieuwkomer uit te nodigen.',
      ],
    },
    'small-business': {
      venues: [
        'Kraamtafels van de Albert Cuyp-markt',
        'Cafés van winkeliers in de Jordaan',
        'Foodhall-balies bij de Foodhallen',
        'Seminairuimtes van de Kamer van Koophandel',
        'Brouwerij-tastingrooms met lange tafels',
        'Makersmarkt-kramen op weekendmarkten',
      ],
      formats: [
        'Vroege ontbijtjes voor marktkooplieden voordat de markt opent',
        'Leveranciers- en groothandelsavonden in tastingrooms',
        'Etalage- en bewegwijzeringsklinieken door designvrijwilligers',
        'Coöperaties voor gedeelde bezorging en gezamenlijke inkoop',
        'Buurtwinkel-wandelingen gehost door winkeliers',
      ],
      howToStart: [
        'Veranker de groep aan één marktplein of winkelstraat — de Albert Cuyp of de Negen Straatjes zijn bewezen magneetplekken.',
        'Nodig de marktmeester of een ervaren marktkoopman uit om het eerste ontbijt mede te hosten, zodat geloofwaardigheid direct binnenkomt.',
        'Verzamel de terugkerende hoofdpijnen van de ondernemers — vergunningen, bezorging, huur — en maak van elk maandelijks ontbijt een praktische oplossessie.',
      ],
    },
  },
  variantIntros: {
    startup:
      'De startup-scene van Amsterdam is compact, internationaal en verrassend diep voor een stad van deze omvang. Het techkwartier rond TQ in het centrum, het Zuidas-zakendistrict en een sterke fintech-corridor hebben wereldwijde bedrijven voortgebracht terwijl het community-gevoel behouden bleef. De handelsgeschiedenis van de stad is terug te zien in haar founders: marktplaatsen, betalingen, logistiek en reistechnologie zijn terugkerende sterktes, en klimaatttechnologie is snel gegroeid naarmate de Nederlandse duurzaamheidscultuur venture capital ontmoet. Engels is in de meeste groepen de standaardtaal, wat de scene voor internationale founders een van de meest toegankelijke van Europa maakt. Formats omvatten founder-brunches, pitch-avonden, demo-dagen en fintech-borrels die rouleren tussen kantoren in grachtenpanden en startup-cafés. De Nederlandse voorkeur voor directheid en planning geeft de community vorm: evenementen beginnen op tijd, feedback is eerlijk en groepen met een duidelijke agenda floreren. Een startup-community in Amsterdam starten werkt het best met een smal vertical en een vast ritme — een maandelijkse klimaat-founder-tafel of een AI-builders-avond bouwt sneller een trouwe aanhang op dan een generalistische groep.',
    creative:
      'De creatieve community’s van Amsterdam zijn geconcentreerd en beloopbaar: de NDSM-werf op de noordelijke oever huisvest een stad van studio’s, galeries en evenementenzalen in voormalige scheepswerfloodsen, terwijl de Jordaan een eeuwenoude traditie van ateliers en galeries draagt. De Rijksakademie en de Gerrit Rietveld Academie voeden een constante stroom kunstenaars en ontwerpers in een scene die bekendstaat om grafisch ontwerp, fotografie, street art en muziek. Formats omvatten open-studio-weekends, galerierondleidingen, portfoliobesprekingen en designcritiques, waarvan er veel plaatsvinden in studio’s in grachtenpanden die de stad haar bijzondere intimiteit geven. De met graffiti bedekte muren en jaarlijkse street-art-festivals van NDSM maken het tot een magneet voor makers, terwijl Oost en de Pijp een jongere generatie studio’s en collectieven huisvesten. De scene is klein genoeg dat het woord zich snel verspreidt en groot genoeg om niche-community’s te dragen — risoprinters, technoproducers, keramisten. Een creatieve community starten in Amsterdam is realistisch: kies een ambacht, een buurt en een vast avondritme, en de dichtheid van nieuwsgierige, bekwame mensen van de stad zal je vinden.',
    political:
      'Het burgerlijke leven van Amsterdam is gestructureerd rond de zeven stadsdelen, elk met gekozen raden en een echte stem in de lokale planning. Wonen is het dominante thema: de krappe huurmarkt van de stad heeft actieve huurdersorganisaties, een kraakgeschiedenis en doorlopende campagnes voor betaalbare woningen en coöperatief bouwen voortgebracht. De wijkcentra zijn de fysieke thuisbasis van het lokale leven en huisvesten bijeenkomsten, taallessen en vrijwilligersgroepen. Civic-tech-vrijwilligers bouwen tools voor participatiebudgetten en stadsdata, terwijl buurtmoestuinen en gedeelde binnenplaatsen bewoners een tastbaar aandeel in de openbare ruimte geven. Mobiliteitspolitiek is ook levendig — fietslobby, autovrije straten en grachtvergunningen hebben allemaal hun campagnes. De Nederlandse politieke cultuur is raadplegend: bewoners verwachten gehoord te worden in planningsprocessen, en goed georganiseerde buurten behalen resultaten. Een politieke community starten betekent een concreet thema en een kleine geografie kiezen en vervolgens samenwerken met bestaande organisaties — het landschap is georganiseerd genoeg dat samenwerking competitie verslaat, en wie consequent op het buurtoverleg verschijnt wint snel aan invloed.',
    meetup:
      'De meetup-scene van Amsterdam draait op het bruine café, de borrel en de fiets. De bruine kroegen van de Jordaan en De Pijp zijn woonkamers met vaste gasten, kaarsen en donker hout — het natuurlijke thuis van een wekelijkse borrel, het Nederlandse borrelritueel na het werk dat collega’s in vrienden verandert. In de zomer vullen het Vondelpark, de stadsstranden en de grachtenkades zich met picknicks, barbecues en buitenspellen, terwijl boottochten van groepstochten drijvende feesten maken. Fietsen is het verbindende weefsel: groepstochten, weekendritten en de fiets-eerst cultuur van de stad betekenen dat een meetup overal binnen vijftien minuten kan samenkomen. Formats omvatten taaluitwisselingen (Nederlands–Engels), bordspelavonden, wandelingen langs de grachten en vrijdagborrels die nieuwkomers expliciet welkom heten. De schaal van de stad houdt alles menselijk — een groep van twintig is al een levendige avond. Een meetup starten in Amsterdam betekent een herhaalbaar format en een locatie kiezen die je elke keer wil huisvesten; de dichtheid en informele vriendelijkheid van de stad doen de rest.',
    'small-business':
      'De kleine-bedrijven-community’s van Amsterdam worden gevormd door de markten, grachten en buurtstraten van de stad. De Albert Cuyp-markt in De Pijp is een van de drukste dagmarkten van Europa en een hechte gemeenschap van kooplieden die leveranciers, roddels en seizoenskalenders delen. De zelfstandige winkels van de Jordaan — kaas, boeken, vintage, bloemen — vormen een vriendelijk netwerk van eigenaren die elkaar bij naam kennen, en de Foodhallen hebben de foodhall omgevormd tot een community van jonge ondernemers. De Kamer van Koophandel biedt gestructureerde workshops over vergunningen, digitalisering en financiering, terwijl de vele brouwerij-tastingrooms van de stad leveranciersavonden en branche-borrels huisvesten. Wat deze groepen bindt is de plek: een markthal, een winkelstraat of een grachtenblok is een natuurlijke community met een collectief belang bij voetverkeer en de reputatie van de buurt. Nieuwkomers sluiten zich doorgaans aan door een marktbijeenkomst bij te wonen, een workshop van de Kamer van Koophandel te volgen of een evenement in een tastingroom te bezoeken. Een kleine-bedrijven-community starten is zeer haalbaar: een maandelijkse ronde-tafel in een buurtcafé, met wisselende onderwerpen zoals huur, vergunningen en online verkopen, trekt betrouwbaar ondernemers aan die zelden gelijken hebben om mee te praten.',
  },
  ideaPage: {
    intro:
      'Amsterdam is een ideale stad om nieuwe community-evenementideeën te testen: de stad is compact, de parken en grachten zijn royaal en het bruine café geeft elke groep een natuurlijke locatie. De dertig ideeën hieronder zijn gegroepeerd in zes categorieën — netwerken, leren, sociaal en outdoor, professioneel en branche, creatief en maker, en impact en lokaal. Elk omvat voor wie het is, een korte pitch en een voorgestelde locatie die echt in Amsterdam bestaat, van bruine-café-hoeken en spelletjescafés tot NDSM-studio’s en de grasvelden van het Vondelpark. Sommige ideeën werken als eenmalige evenementen; andere zijn ontworpen om terugkerende community’s te worden met een borrelritme. De eerlijkheidsregel is simpel: elke locatiesuggestie is een echt soort plek in deze stad, en elk format is eenvoudig genoeg voor een beginnende organisator. Kies het idee dat bij je interesses past, vind een locatie die je wil huisvesten en laat de schaal van Amsterdam de rest doen.',
    categories: [
      {
        name: 'Netwerken',
        ideas: [
          {
            title: 'Borrel in een bruin café voor nieuwkomers',
            pitch:
              'Een wekelijkse borrel na het werk in dezelfde bruine kroeg, waar nieuwkomers en vaste bewoners buurttips uitwisselen.',
            audience: 'Nieuwkomers en iedereen die van informeel geklets houdt',
            venueType: 'Een bruin café in de Jordaan',
          },
          {
            title: 'Netwerk-cruise op een rondvaartboot',
            pitch:
              'Een rustige boottocht door de grachten met roulerende zitplaatsen zodat iedereen met iedereen praat.',
            audience: 'Professionals en nieuwsgierige nieuwkomers',
            venueType: 'Een rondvaart vanaf een centrale aanlegplaats',
          },
          {
            title: 'Expats en Nederlanders uitwisseling',
            pitch:
              'Gestructureerde één-op-één gesprekken tussen internationals en locals, met stadsgeheimen en taaltips.',
            audience: 'Expats en Nederlandse bewoners',
            venueType: 'Een café met lange tafels in de Oud-West',
          },
          {
            title: 'Wijk-meet-and-greet',
            pitch:
              'Een laagdrempelige avond in één buurt, met naambordjes en de regel dat je drie nieuwe mensen ontmoet.',
            audience: 'Bewoners van één buurt',
            venueType: 'Een wijkcentrum',
          },
          {
            title: 'Zzp-vrijdagochtend',
            pitch:
              'Een wekelijkse koffie waar freelancers leads, tarieven en klantervaringen delen voordat het weekend begint.',
            audience: 'Freelancers van alle disciplines',
            venueType: 'Een coworking-café bij de grachten',
          },
        ],
      },
      {
        name: 'Leren & workshops',
        ideas: [
          {
            title: 'Kletsen — Nederlandse oefentafel',
            pitch:
              'Informeel Nederlands converseren met moedertaalsprekers op jouw niveau, met de regel dat fouten gevierd worden.',
            audience: 'Expats die Nederlands leren',
            venueType: 'Een café in De Pijp',
          },
          {
            title: 'DigiD- en belastingkliniek',
            pitch:
              'Een hands-on sessie over de Nederlandse digitale ID, gemeentelijke registratie en de belastingbasis voor nieuwkomers.',
            audience: 'Nieuwe bewoners en freelancers',
            venueType: 'Een openbare bibliotheek of wijkcentrum',
          },
          {
            title: 'Fietsreparatie basis',
            pitch:
              'Leer lekke banden, remmen en kettingen repareren — de essentiële Nederlandse levensvaardigheid — in een echte werkplaats.',
            audience: 'Fietsers van elk niveau',
            venueType: 'Een buurtwerkplaats of fietscoöperatie',
          },
          {
            title: 'Wandeling door de grachtenpand-geschiedenis',
            pitch:
              'Een wandelcollege door de gevelhuizen van de grachtengordel, met verhalen achter de gevels.',
            audience: 'Geschiedenisliefhebbers en nieuwkomers',
            venueType: 'Een bibliotheek of vergaderruimte van een historische vereniging',
          },
          {
            title: 'Wooncoöperatie-info-avond',
            pitch:
              'Leer hoe coöperatief wonen in Amsterdam werkt en hoe je een wooncoöperatie kunt vervoegen of starten.',
            audience: 'Huurders die geïnteresseerd zijn in coöperatief wonen',
            venueType: 'Een wijkcentrum of ruimte van een wooncoöperatie',
          },
        ],
      },
      {
        name: 'Sociaal & outdoor',
        ideas: [
          {
            title: 'Vondelpark-bootcamp en koffie',
            pitch:
              'Een vriendelijke outdoor-workout in het park, gevolgd door koffie en gebak in een nabijgelegen café.',
            audience: 'Fitnessbeginners en vaste sporters',
            venueType: 'De grasvelden van het Vondelpark',
          },
          {
            title: 'Vrijmarkt-kraam op Koningsdag',
            pitch:
              'Plan een gedeelde vrijmarkt-kraam voor Koningsdag met buren — het grootste straatfeest van de stad.',
            audience: 'Buren en liefhebbers van koopjes',
            venueType: 'Een ruimte van een bewonersvereniging',
          },
          {
            title: 'Stadsstrand-volleybal',
            pitch:
              'Een informele avond beachvolleybal op het stadsstrand, met roulerende teams en een gedeelde borrel daarna.',
            audience: 'Casual spelers en zonliefhebbers',
            venueType: 'Het stadsstrand bij Strand West',
          },
          {
            title: 'Polder-fietstocht',
            pitch:
              'Een weekendrit de stad uit door de polders, langs windmolens en dorpjes, met caféstops.',
            audience: 'Recreatieve fietsers van elk tempo',
            venueType: 'Een verzamelpunt van een fietsclub',
          },
          {
            title: 'Museumplein-picknick en livemuziek',
            pitch:
              'Dekens, snacks en een openlucht-afspeellijst op het museumgrasveld, met spellen voor nieuwkomers.',
            audience: 'Gezinnen, stellen en vriendengroepen',
            venueType: 'Het grasveld van het Museumplein',
          },
        ],
      },
      {
        name: 'Professioneel & branche',
        ideas: [
          {
            title: 'Fintech-founder-tafel',
            pitch:
              'Een maandelijkse ronde-tafel waar fintech-founders voortgang, reguleringslessen en partnerschappen delen.',
            audience: 'Fintech-founders en operators',
            venueType: 'Een fintech-kantoor of vergaderruimte bij TQ',
          },
          {
            title: 'Klimaatttech-ontbijt',
            pitch:
              'Een maandelijks ontbijt waar klimaatttech-founders voortgang en partnerschapskansen delen.',
            audience: 'Klimaatttech-founders en operators',
            venueType: 'Een impacthub of evenementenruimte',
          },
          {
            title: 'Product-trio-kring',
            pitch:
              'Productmanagers, ontwerpers en engineers bespreken hoe geweldige trio’s werken — en wat ze breekt.',
            audience: 'Product-, design- en engineeringleads',
            venueType: 'Een coworking-vergaderruimte op de Zuidas',
          },
          {
            title: 'Uitgevers- en media-avond',
            pitch:
              'Professionals in uitgeverij, media en content delen branchenieuws en leggen contacten.',
            audience: 'Media- en uitgeverijprofessionals',
            venueType: 'Een kantoor van een mediabureau',
          },
          {
            title: 'Wervingskring voor scale-ups',
            pitch:
              'Scale-up-leiders delen hoe ze teams over de grenzen heen werven, behouden en structureren.',
            audience: 'Scale-up-founders en people-leads',
            venueType: 'Een scale-up-kantoor',
          },
        ],
      },
      {
        name: 'Creatief & maker',
        ideas: [
          {
            title: 'NDSM open-studio-wandeling',
            pitch:
              'Een begeleide avond door de studio’s op de werf, waar makers en werk-in-uitvoering worden ontmoet.',
            audience: 'Kunstliefhebbers en nieuwsgierige buren',
            venueType: 'De studio’s op de NDSM-werf',
          },
          {
            title: 'Noord street-art-fietsroute',
            pitch:
              'Een ontspannen fietstocht door de muurschilderingen van Amsterdam-Noord met verhalen achter de kunstenaars.',
            audience: 'Fietsers en kunstfans',
            venueType: 'De straten van Amsterdam-Noord',
          },
          {
            title: 'Riso- en zine-avond',
            pitch: 'Een hands-on avond zines maken met risoprinten en ruilen aan het einde.',
            audience: 'Schrijvers, illustratoren en printliefhebbers',
            venueType: 'Een printstudio of kunstruimte',
          },
          {
            title: 'Nederlands design peer-critique',
            pitch:
              'Ontwerpers presenteren echt werk-in-uitvoering en ontvangen gestructureerde, opbouwende feedback.',
            audience: 'Grafisch- en productontwerpers',
            venueType: 'Een designstudio in Oost',
          },
          {
            title: 'Keramiek-draaiavond',
            pitch:
              'Een wekelijkse sessie waar pottenbakkers wielen, ovens en feedback op hun werk delen.',
            audience: 'Pottenbakkers en nieuwsgierige beginners',
            venueType: 'Een keramiekstudio of buurtwerkplaats',
          },
        ],
      },
      {
        name: 'Impact & lokaal',
        ideas: [
          {
            title: 'Informatie-avond over huurrechten',
            pitch:
              'Een toegankelijke sessie over huurregels, borgsommen en waar je gratis woonadvies krijgt.',
            audience: 'Huurders en huurdersorganisatoren',
            venueType: 'Een wijkcentrum of ruimte van een huurdersorganisatie',
          },
          {
            title: 'Grachten-schoonmaakpeddeltocht',
            pitch:
              'Een ochtend afval uit de grachten vissen in kano’s en kajaks, met koffie daarna.',
            audience: 'Waterliefhebbers en vrijwilligers',
            venueType: 'Een aanlegpunt aan de gracht',
          },
          {
            title: 'Dag in de buurtmoestuin',
            pitch:
              'Buren besteden een ochtend aan planten, water geven en het plannen van het seizoen in een gedeelde tuin.',
            audience: 'Tuinders en aspirant-tuinders',
            venueType: 'Een buurtmoestuin of gedeelde binnenplaats',
          },
          {
            title: 'Vrijwilligersbeurs voor lokale doelen',
            pitch:
              'Lokale goede doelen zetten tafels neer en werven vrijwilligers onder het genot van gratis koffie en appeltaart.',
            audience: 'Eerste-timers vrijwilligers',
            venueType: 'Een wijkcentrum of openbare bibliotheek',
          },
          {
            title: 'Verhalen van Jordaanse winkeliers',
            pitch:
              'Zelfstandige winkeliers delen verhalen van vijf minuten achter hun toonbank, gevolgd door open vragen.',
            audience: 'Buren en kleine-bedrijfseigenaren',
            venueType: 'Een café of winkelruimte in de Jordaan',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Hoe kies ik een van deze ideeën?',
        answer:
          'Stem de categorie af op je interesses en het publiek dat je kunt bereiken. In Amsterdam bouwen terugkerende formats met een vaste locatie — een wekelijkse borrel, een maandelijkse tocht, een vaste cafétafel — het snelst een community op.',
      },
      {
        question: 'Moet ik Nederlands spreken om te organiseren?',
        answer:
          'Nee. Engels wordt veel gesproken en veel groepen draaien in het Engels. Een beetje Nederlands helpt enorm bij buren, maar je kunt vandaag al een community in het Engels starten.',
      },
      {
        question: 'Kunnen deze evenementen echte community’s worden?',
        answer:
          'Ja — terugkerende formats zijn hoe de meeste Amsterdamse community’s beginnen, en de bruine-cafétraditie geeft je een bewezen patroon. De handleidingen doorlopen van het eerste evenement naar een stabiele community.',
      },
    ],
  },
  faq: [
    {
      question: 'Hoe vind ik een community in Amsterdam?',
      answer:
        'Gebruik de groepstype-pagina’s voor startup-, creatieve, politieke, meetup- en kleine-bedrijven-community’s. Elke pagina beschrijft de echte buurten, locaties en formats waar Amsterdammers samenkomen. JoinOrigin is live — maak je profiel aan en vind of start vandaag je community.',
    },
    {
      question: 'Is het realistisch om een community in Amsterdam te starten?',
      answer:
        'Ja. Amsterdam is compact, gastvrij en vol natuurlijke locaties — bruine cafés, parken en buurthuizen. De handleidingen behandelen het starten van een community, het organiseren van een meetup en het binnenhalen van je eerste tien leden.',
    },
    {
      question: 'Zijn de locatiesuggesties op deze pagina echt?',
      answer:
        'Ja. Elk genoemd type locatie — bruine cafés, NDSM-studio’s, het Vondelpark, de Albert Cuyp-markt, openbare bibliotheken — bestaat in Amsterdam. We verzinnen nooit ledenaantallen, beoordelingen of lokale kantoren.',
    },
    {
      question: 'Heeft JoinOrigin een kantoor in Amsterdam?',
      answer:
        'Nee. JoinOrigin heeft geen lokale kantoren of personeel. Alle communitybeschrijvingen weerspiegelen het echte stadslandschap en het platform helpt Amsterdammers community’s te vinden of te starten.',
    },
  ],
};

export default content;
