import type { CityContent } from '../../types';

/**
 * München-Inhalt (deutsche Übersetzung) — Stadtseite + 5 Varianten +
 * Ideenseite. Inhaltlich eigenständig gegenüber allen anderen Stadtdateien
 * (G5: keine Vorlagenwiederverwendung). Ehrliche, zeitlose Prosa; keine
 * erfundenen Zahlen oder Mitgliederzahlen.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'de',
  slug: 'munich',
  pageTitles: {
    city: 'Origins in München | JoinOrigin',
    cityDescription:
      'Finde oder gründe Communities in München – Startup, Kreativ, politisch, Meetup und Kleinunternehmen in der bayerischen Landeshauptstadt. JoinOrigin-Warteliste.',
    variants: {
      startup: 'Startup-Communities in München | JoinOrigin',
      creative: 'Kreativ-Communities in München | JoinOrigin',
      political: 'Politische & bürgerschaftliche Communities in München | JoinOrigin',
      meetup: 'Meetup- & soziale Communities in München | JoinOrigin',
      'small-business': 'Kleinunternehmer-Communities in München | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Finde oder gründe Startup-Communities in München – Gründer:innen, Entwickler:innen und Operator:innen rund um UnternehmerTUM, Werksviertel und den Tech-Korridor. JoinOrigin-Warteliste.',
      creative:
        'Finde oder gründe Kreativ-Communities in München – Studios, Galerien und Kollektive in Schwabing, Glockenbach und im Kunstareal. JoinOrigin-Warteliste.',
      political:
        'Finde oder gründe politische und bürgerschaftliche Communities in München – Bürgerinitiativen, Bezirksausschüsse und lokale Kampagnen. JoinOrigin-Warteliste.',
      meetup:
        'Finde oder gründe Meetup- und soziale Communities in München – Biergärten, Stammtische, Wandervereine und Treffen an der Isar. JoinOrigin-Warteliste.',
      'small-business':
        'Finde oder gründe Kleinunternehmer-Communities in München – Händler am Viktualienmarkt, Handwerksbetriebe und Nachbarschafts-Läden. JoinOrigin-Warteliste.',
    },
    ideas: '30 Ideen für Origin-Events in München | JoinOrigin',
    ideasDescription:
      'Entdecke 30 Ideen für Community-Events in München – Networking, Lernen, Draußen, Beruf, Kreativ & Impact. JoinOrigin-Warteliste.',
  },
  intro: [
    'München ist eine Stadt, in der das Community-Leben so sorgfältig konstruiert ist wie ihre Maschinen. Die bayerische Landeshauptstadt verbindet eine tiefe Tradition bürgerschaftlicher Institutionen — Biergärten, Vereine und Stammtische — mit einer modernen Tech-Ökonomie rund um BMW, Siemens und eine dichte Startup-Szene. Das Ergebnis ist ein Ort, an dem der Beitritt zu einer Gruppe kulturell normal ist: Fast jede:r Münchner:in gehört zu mindestens einem Verein, Club oder festen Stammtisch.',
    'Der Biergarten ist der soziale Motor. Der Englische Garten, der Hirschgarten und die Biergärten an der Isar beherbergen alles von Büro-Stammtischen über Familientreffen bis zu Spieleabenden. Die Isar selbst ist im Sommer eine Schwimm- und Grill-Ader, während die Alpen am Horizont die Bewohner:innen in Wander- und Skivereine ziehen, die das Wochenend-Community-Leben verankern. Universitäten wie die TUM und die LMU halten einen steten Strom Studierender im Kreislauf der Szene.',
    'Münchens Wohlstand bedeutet, dass es viele Orte gibt, aber er bedeutet auch, dass die Stadt Organisation belohnt: Gruppen, die einen festen Tisch reservieren, dem richtigen Verein beitreten oder mit einer bestehenden Institution kooperieren, gedeihen. Neuzugezogene, die ein wenig Deutsch sprechen und die Liebe der Stadt zur Struktur aufgreifen, finden leicht Zugehörigkeit.',
  ],
  dataPoints: [
    'Rund 1,5 Millionen Einwohner:innen; Landeshauptstadt von Bayern, Deutschland.',
    'Heimat der TUM, der LMU und vieler Forschungsinstitute.',
    'Konzern-Anker: BMW, Siemens, Allianz und eine tiefe Ingenieursbasis.',
    'Biergarten-Kultur — Englischer Garten, Hirschgarten und Isar-Orte.',
    'Starke Vereins- und Stammtisch-Tradition organisierten Gemeinschaftslebens.',
    'Nähe zu den Alpen — Wander- und Skivereine prägen den Community-Kalender.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Maker- und Event-Flächen der UnternehmerTUM an der TUM',
        'Coworking- und Event-Etagen im Werksviertel',
        'Impact-Hub-Räume nahe dem Hauptbahnhof',
        'Innovationslabore von BMW und Siemens',
        'Tech-Cafés in Schwabing und Maxvorstadt',
        'Biergarten-Tische für entspannte Gründer:innen-Abende',
      ],
      formats: [
        'Gründer:innen-Frühstücke mit kurzen Vorstellungsrunden',
        'Pitch-Abende und Demo-Nights',
        'Deep-Tech- und AI-Builder-Stammtische',
        'Corporate-Startup-Netzwerk-Apéros',
        'Maker- und Hardware-Showcase-Tage',
      ],
      howToStart: [
        'Wähle eine enge Vertikale — Deep Tech, KI, Mobilität oder Klima — und einen englischfreundlichen Namen.',
        'Reserviere einen wöchentlichen Frühstücks- oder Abend-Slot in einer Fläche im Werksviertel oder nahe der UnternehmerTUM.',
        'Veranstalte drei offene Meetups, bitte dann zwei Stammgäste, mitzuorganisieren, und finde einen monatlichen Rhythmus.',
      ],
    },
    creative: {
      venues: [
        'Studio-Höfe in Glockenbach',
        'Galerieräume im Kunstareal',
        'Ateliers und Kaffeehaus-Ecken in Schwabing',
        'Werkstatthallen der AdBK',
        'Proberäume und Musikräume',
        'Druck- und Handwerks-Werkstätten in Haidhausen',
      ],
      formats: [
        'Zweijährliche offene Ateliertage in Glockenbach',
        'Kurator:innengespräche vor Galerie-Eröffnungen',
        'Portfolio-Abende mit eingeladenen lokalen Kritiker:innen',
        'Instrumenten- und Equipment-Tauschabende',
        'Ausstellungsbesuche, die im Kaffeehaus enden',
      ],
      howToStart: [
        'Verankere die Gruppe in einem Handwerk und einem Hof — die Studio-Blöcke in Glockenbach sind dafür perfekt.',
        'Kooperiere mit einer Kunstareal-Galerie oder einer AdBK-Werkstatt, um den ersten Kritikabend auszurichten.',
        'Mache Feedback zum Ritual: Jede Session endet mit drei gesprochenen Kommentaren pro Werk, dann Kaffee.',
      ],
    },
    political: {
      venues: [
        'Sitzungsräume der Bezirksausschüsse',
        'Kampagnenräume von Bürgerbegehren',
        'Nachbarschaftszentren in den 25 Stadtbezirken',
        'Gemeinschaftsgärten und Straßenbibliotheken',
        'Civic-Tech-Coworking-Räume',
        'Kirchen- und Vereinshallen für Versammlungen',
      ],
      formats: [
        'Offene Sitzungen der Bezirksausschüsse',
        'Info-Abende zu Wohnen und Miete',
        'Planungstreffen von Bürgerinitiativen',
        'Freiwilligen-Briefings und erste Schichten',
        'Bürgerbeteiligungs-Workshops in einfacher Sprache',
      ],
      howToStart: [
        'Wähle ein konkretes Thema und eine kleine Geografie — einen Stadtbezirk, eine Straße oder eine Wohnungspolitik-Frage.',
        'Besuche zuerst drei bestehende Initiativen und kooperiere statt Arbeit zu duplizieren.',
        'Veranstalte einen offenen Info-Abend mit einer echten Organisator:in als Co-Gastgeber:in, um eine vertrauenswürdige Basis aufzubauen.',
      ],
    },
    meetup: {
      venues: [
        'Biergärten — Englischer Garten, Hirschgarten',
        'Isar-Ufer zum Schwimmen und Grillen',
        'Kaffeehäuser und Cafés in Schwabing und Glockenbach',
        'Spiele-Cafés in der Maxvorstadt',
        'Hütten und Räume des Alpenvereins',
        'Parks — Olympiapark und Englischer Garten',
      ],
      formats: [
        'Wöchentlicher Stammtisch am selben Tisch',
        'Isar-Schwimm- und Grill-Nachmittage',
        'Tagesausflüge des Wandervereins in die Alpen',
        'Brettspiel- und Spieleabende',
        'Radtouren entlang der Isar und zu den Seen',
      ],
      howToStart: [
        'Wähle ein wiederholbares Format — einen wöchentlichen Stammtisch, eine monatliche Wanderung — und einen festen Ort.',
        'Wähle einen Biergarten, ein Café oder einen Alpenvereins-Raum, der euch jedes Mal aufnimmt.',
        'Veranstalte die ersten drei Sessions zur gleichen Zeit am gleichen Ort und bitte Stammgäste, je eine:n Neuling mitzubringen.',
      ],
    },
    'small-business': {
      venues: [
        'Händlertische am Viktualienmarkt',
        'Handwerker-Höfe in Haidhausen',
        'Brauerei-Taprooms mit langen Tischen',
        'Seminar-Räume der Handwerkskammer',
        'Marktstände bei saisonalen Märkten',
        'Bürgerhaus-Räume für Inhaber:innen-Treffen',
      ],
      formats: [
        'Inhaber:innen-Kaffee vor Marktöffnung',
        'Info-Abende zu Ausbildung und Handwerk',
        'Kammer-Sprechstunden zu MwSt., Rechnungen und digitalen Schaufenstern',
        'Genossenschaften für geteilte Maschinen und Werkzeuge',
        'Planungstreffen für Flohmärkte und Wintermärkte',
      ],
      howToStart: [
        'Starte an einem Viktualienmarkt-Tisch zur Öffnungszeit — Händler:innen sprechen frei, bevor die Menge kommt.',
        'Bitte die Handwerkskammer oder eine lokale Brauerei, den ersten Abend mitzupovern, damit Inhaber:innen der Einladung vertrauen.',
        'Halte einen festen monatlichen Morgen und rotiere ein praktisches Thema — Ausbildung, Miete, Online-Verkauf — bis die Gruppe sich selbst trägt.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Die Münchner Startup-Szene wird von der Ingenieurs-DNA der Stadt angetrieben: der TUM und ihrem UnternehmerTUM-Hub, den Konzernlaboren von BMW und Siemens und einer tiefen Bank von Forschenden in Mobilität, KI und Climate Tech. Das Werksviertel, das umgebaute Industrieviertel nahe dem Ostbahnhof, ist zum kreativen Zuhause der Szene geworden, während Maxvorstadt und Schwabing Coworking-Spaces und Tech-Cafés beherbergen. Die Community ist deutschsprachiger als die Berlins, aber Englisch ist in Deep-Tech- und KI-Kreisen üblich, wo internationale Forschende Seite an Seite mit lokalen Gründer:innen arbeiten. Wiederkehrende Formate sind Gründer:innen-Frühstücke, Pitch-Abende, Demo-Tage und Corporate-Startup-Events, die frühe Teams mit den Industriegiganten von nebenan verbinden. Münchens Kultur belohnt Zuverlässigkeit: Gruppen, die eine feste Zeit buchen, guten Kaffee servieren und auf die Minute beginnen, bauen treue Anhängerschaften auf. Eine Startup-Community hier zu gründen funktioniert am besten mit einer engen Vertikale — Deep Tech, Mobilität oder Klima — und einem regelmäßigen Rhythmus, der der Vorliebe der Stadt für Struktur statt Spontaneität entspricht.',
    creative:
      'Die kreativen Communities Münchens sind ruhiger als die Berlins, aber tief verwurzelt: Die Galerien und Museen des Kunstareals verankern die bildende Kunst, Schwabing trägt ein Jahrhundert Künstler-Cafés und Buchhandlungen, und Glockenbach und Haidhausen beherbergen die dichtesten Cluster an Studios und Projektflächen. Die AdBK und die Design- und Musikhochschulen Münchens speisen einen steten Strom von Absolvent:innen in eine freiberufliche Ökonomie, die auf Empfehlungen und Handwerk basiert. Formate sind offene Studio-Wochenenden, Galerie-Rundgänge, Portfolio-Reviews und Musikproduktions-Zirkel, die sich Proberäume teilen. Der Reichtum der Stadt zeigt sich in den Orten — gut ausgestattete Ateliers, professionelle Druckereien und schöne Kaffeehäuser — und ihre Ordnung zeigt sich darin, wie Communities sich organisieren: feste Abende, klare Strukturen, zuverlässige Gastgeber:innen. Kreativ-Communities hier sind tendenziell kleiner und bedachter, was Macher:innen passt, die Tiefe über Masse stellen. Eine kreative Community in München zu gründen ist realistisch: Wähle ein Handwerk, einen Stadtbezirk und einen regelmäßigen Abend, und die Dichte neugieriger, qualifizierter Menschen in dieser Stadt findet dich.',
    political:
      'Die bürgerschaftliche Landschaft Münchens wird vom Bezirksausschuss geprägt — den Stadtbezirksausschüssen, die jedem der 25 Stadtbezirke eine echte Stimme in der lokalen Planung geben — und von einer starken Tradition des Bürgerbegehrens, bei dem Bürgerinitiativen öffentliche Abstimmungen erzwingen können. Wohnen, Mobilität und Grünflächen sind die Themen, die Bewohner:innen bewegen: Miet- und Dichtedebatten, Rad- und Tramprojekte und der Erhalt der Biergärten und Isar-Wiesen der Stadt haben alle aktive Kampagnen. Nachbarschaftszentren, Gemeinschaftsgärten und Kirchenhallen beherbergen Versammlungen, bei denen Neuzugänge willkommen sind. Die politische Kultur schätzt Kompetenz und Prozess: Münchner:innen reagieren auf gut organisierte Initiativen mit klaren Vorschlägen, und sie belohnen Gruppen, die ihre Hausaufgaben machen. Civic-Tech-Freiwillige bauen Werkzeuge für Bürgerhaushalte und Stadtdaten, während unzählige Freiwilligenprojekte sich um Parks, Bibliotheken und Geflüchtetenhilfe kümmern. Eine politische Community zu gründen bedeutet, ein konkretes Thema und eine kleine Geografie zu wählen und dann mit bestehenden Initiativen zu kooperieren — die Landschaft ist organisiert genug, dass Zusammenarbeit Wettbewerb schlägt.',
    meetup:
      'Die Meetup-Szene Münchens baut auf dem Biergarten, der Isar und dem Alpenverein auf. Die Biergärten der Stadt — der Englische Garten mit seinem Chinesischen Turm, der riesige Hirschgarten und Terrassen an der Isar — sind öffentliche Wohnzimmer, in denen Stammtische, Familientische und spontane Spiele nebeneinander existieren. Im Sommer wird die Isar zu einer Schwimm- und Grill-Ader, die Gruppen von Freund:innen und Neuzugezogenen zu denselben Sandbänken und Wiesen zieht. Der Winter tauscht den Fluss gegen Skiclubs und Indoor-Spieleabende, den deutschen Brettspiel-Abend, der Cafés und Vereinsräume füllt. Die Struktur der Stadt zeigt sich in den Formaten: Wandervereine planen Wochenendausflüge in die Alpen Monate im Voraus, Laufgruppen treffen sich jede Woche am selben Parktor, und Sprachaustausche laufen nach festem Abendplan. Neuzugezogene, die einem Verein beitreten oder einen Stammtisch-Tisch beanspruchen, finden schnell Zugehörigkeit. Ein Meetup in München zu starten bedeutet, ein wiederholbares Format und einen Ort zu wählen, der euch jedes Mal aufnimmt — die Liebe der Stadt zur Regelmäßigkeit erledigt den Rest.',
    'small-business':
      'Münchner Kleinunternehmer-Communities werden vom Viktualienmarkt — dem berühmten täglichen Markt der Stadt — und von der Handwerkstradition verankert, die den bayerischen Handel bis heute prägt. Markthändler:innen, Bäcker:innen, Metzger:innen, Brauer:innen und Werkstattbesitzer:innen bilden enge Netzwerke aus Lieferant:innen, Ausbildungsplätzen und gemeinsamen Kalendern. Stadtbezirke wie Haidhausen und Au bewahren Cluster von Familienbetrieben, deren Inhaber:innen sich beim Namen kennen. Die Handwerkskammer und die Industrie- und Handelskammer bieten strukturierte Ausbildungen, Lehrstellen und Unternehmensberatung, und die Brauerei-Taprooms Münchens beherbergen alles von Lieferanten-Dinners bis zu Branchen-Abenden. Was diese Gruppen verbindet, ist Handwerksstolz und Ort: Eine Markthalle oder eine Werkstattstraße ist eine natürliche Community mit einem gemeinsamen Interesse an Qualität und Laufkundschaft. Neuzugänge schließen sich typischerweise über einen Kammer-Workshop, einen Markttisch oder ein Taproom-Event an. Eine Kleinunternehmer-Community zu gründen ist gut machbar: Ein monatlicher Runder Tisch in einem Bezirks-Café, mit rotierenden Themen wie Ausbildung, Miete und Digitalisierung, zieht zuverlässig Inhaber:innen an, die selten Gleichgesinnte zum Reden haben — und auch Neulinge ohne eigenes Geschäft sind willkommen, denn viele Treffen suchen gezielt Nachbar:innen mit Ideen für den Stadtteil.',
  },
  ideaPage: {
    intro:
      'München ist eine ideale Stadt, um neue Ideen für Community-Events zu testen: Biergärten und Parks sind großzügig, die Isar bietet kostenlose Sommer-Treffpunkte, und die Vereinskultur der Stadt bedeutet, dass Bewohner:innen auftauchen, wenn etwas gut organisiert ist. Die dreißig Ideen unten sind in sechs Kategorien gegliedert — Networking, Lernen, Sozial & Draußen, Beruf & Branche, Kreativ & Machen sowie Impact & Lokal. Jede nennt, für wen sie ist, einen kurzen Pitch und eine vorgeschlagene Ortsart, die es in München wirklich gibt — von Biergarten-Tischen und Kaffeehaus-Hinterzimmern bis zu den Isar-Ufern und Alpenvereins-Hütten. Manche Ideen funktionieren als einmalige Events; andere sind dafür gemacht, zu wiederkehrenden Communities mit Stammtisch-Rhythmus zu werden. Die Ehrlichkeitsregel ist einfach: Jeder Ortsvorschlag ist eine echte Ortsart in dieser Stadt, und jedes Format ist einfach genug, dass eine Erstveranstalter:in es durchziehen kann. Wähle die Idee, die zu deinen Interessen passt, finde einen Ort, der dich aufnimmt, und überlasse den Rest der Struktur Münchens.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Stammtisch am Chinesischen Turm für Neuzugezogene',
            pitch:
              'Ein wöchentlicher Tisch im berühmten Biergarten des Englischen Gartens, an dem Neuzugezogene Einheimische bei einer Maß treffen.',
            audience: 'Neuzugezogene und alle, die gern ungezwungen reden',
            venueType: 'Der Biergarten am Chinesischen Turm',
          },
          {
            title: 'Tech-Frühstück im Werksviertel',
            pitch:
              'Ein frühes Frühstück, bei dem Gründer:innen und Entwickler:innen die Erfolge und Blocker der Woche bei Kaffee teilen.',
            audience: 'Gründer:innen und Operator:innen der Münchner Tech-Szene',
            venueType: 'Ein Café im Werksviertel',
          },
          {
            title: 'Isar-Wiesen-Mixer',
            pitch:
              'Ein entspannter Abend-Picknick an den Ufern mit Namensschildern und der Regel, drei neue Menschen kennenzulernen.',
            audience: 'Sommerliebende Bewohner:innen jeden Alters',
            venueType: 'Die Isar-Wiesen',
          },
          {
            title: 'Vereins-Speed-Dating',
            pitch:
              'Lokale Clubs und Vereine stellen Tische auf und pitchen sich — der schnellste Weg, deine Münchner Community zu finden.',
            audience: 'Neuzugezogene auf der Suche nach einem Verein',
            venueType: 'Ein Bürgerhaus oder eine Vereinshalle',
          },
          {
            title: 'Freelancer-Kaffeehaus-Club',
            pitch:
              'Ein wöchentlicher Morgenkaffee, bei dem Freelancer Leads, Honorare und Kundengeschichten bei richtigem Kaffee teilen.',
            audience: 'Freiberufler:innen aller Disziplinen',
            venueType: 'Ein Kaffeehaus in Schwabing',
          },
        ],
      },
      {
        name: 'Lernen & Workshops',
        ideas: [
          {
            title: 'Deutscher Tisch im Kaffeehaus',
            pitch:
              'Tische nach Niveau mit Muttersprachler:innen, plus die Regel, dass jeder Fehler dem Tisch ein Lachen bringt.',
            audience: 'Expats, die Deutsch lernen',
            venueType: 'Ein Kaffeehaus in Schwabing',
          },
          {
            title: 'Bayerische Bräuche im Schnellkurs',
            pitch:
              'Eine freundliche Einführung in bayerische Traditionen — von der Leonhardifahrt über Dirndl-Etikette bis zum Krampus.',
            audience: 'Neuzugezogene, die das lokale Leben verstehen wollen',
            venueType: 'Ein Museum oder ein Heimatmuseum-Raum',
          },
          {
            title: 'Anmelde- und Steuer-Sprechstunde',
            pitch:
              'Eine praktische Session zu Anmeldung, Steuerklassen und den bürokratischen Basics, vor denen jede:r Neuzugezogene steht.',
            audience: 'Neue Bewohner:innen und Freiberufler:innen',
            venueType: 'Ein Coworking- oder Kammer-Eventraum',
          },
          {
            title: 'Hobbybrau- und Bier-Schule',
            pitch:
              'Lerne die Grundlagen des Brauens mit einem lokalen Hobbybrau-Club — Hopfen, Malz, Hefe und Geduld.',
            audience: 'Bierliebhaber:innen und neugierige Brauer:innen',
            venueType: 'Ein Brauerei-Taproom oder ein Hobbybrau-Laden',
          },
          {
            title: 'Alpensicherheit für Einsteiger:innen',
            pitch:
              'Bergführer:innen lehren Routenplanung, Wetterlesen und die Ausrüstung, die Wanderer:innen in den Alpen sicher hält.',
            audience: 'Anfänger:innen im Wandern und Wochenend-Wanderer:innen',
            venueType: 'Ein Alpenvereins-Raum oder ein Outdoor-Laden',
          },
        ],
      },
      {
        name: 'Sozial & Draußen',
        ideas: [
          {
            title: 'Spiele auf den Wiesen des Englischen Gartens',
            pitch:
              'Frisbee, Badminton und Brettspiele auf der Wiese am Chinesischen Turm, mit einem Potluck-Thema.',
            audience: 'Familien, Paare und Freundesgruppen',
            venueType: 'Die Wiesen des Englischen Gartens',
          },
          {
            title: 'Schwimmtag auf den Isar-Sandbänken',
            pitch:
              'Ein Sommernachmittag mit Schwimmen, Grillen und guter Gesellschaft auf den Sandbänken des Flusses.',
            audience: 'Sommerliebende und Neuzugezogene',
            venueType: 'Die Isar-Sandbänke',
          },
          {
            title: 'Hütten-Wochenend-Planungsabend',
            pitch:
              'Alpenvereins-Mitglieder planen die Hütten-Wochenenden und Tagesausflüge der Saison bei Bier und Karten.',
            audience: 'Wanderer:innen und Bergsteiger:innen',
            venueType: 'Ein Vereinsraum des Alpenvereins',
          },
          {
            title: 'Rooftop-Lauf im Olympiapark',
            pitch:
              'Ein freundlicher Lauf um die Hügel und Türme des Olympiaparks, mit Dehnen und Kaffee danach.',
            audience: 'Läufer:innen jedes Tempos',
            venueType: 'Der Olympiapark',
          },
          {
            title: 'Glühwein-Runde über die Weihnachtsmärkte',
            pitch:
              'Ein geführter Abendspaziergang über die Weihnachtsmärkte der Stadt mit Glühwein- und Lebkuchen-Stopps.',
            audience: 'Winterliebende und Neuzugezogene',
            venueType: 'Ein Münchner Christkindlmarkt',
          },
        ],
      },
      {
        name: 'Beruf & Branche',
        ideas: [
          {
            title: 'Deep-Tech-Runder Tisch',
            pitch:
              'Forschende und Gründer:innen teilen Fortschritte bei Hardware-, KI- und Quantenprojekten bei einem Arbeitssessen.',
            audience: 'Deep-Tech-Gründer:innen und Forschende',
            venueType: 'Ein TUM- oder UnternehmerTUM-Meetingraum',
          },
          {
            title: 'Mobilitäts- und Automobil-Netzwerkabend',
            pitch:
              'Entwickler:innen, Designer:innen und Gründer:innen, die Mobilität gestalten, teilen Trends und vermitteln Kontakte.',
            audience: 'Mobilitätsprofis und Startups',
            venueType: 'Ein Konzern-Innovationslabor oder ein Eventraum',
          },
          {
            title: 'Biotech- und Life-Sciences-Tisch',
            pitch:
              'Wissenschaftler:innen und Unternehmer:innen rund um den Biotech-Campus teilen Updates und Kooperationsideen.',
            audience: 'Biotech- und Life-Science-Profis',
            venueType: 'Ein Eventraum auf dem Labor-Campus',
          },
          {
            title: 'Peer-Kreis für Produktmanager:innen',
            pitch:
              'Ein vertraulicher Kreis, in dem PMs eine monatliche Herausforderung besprechen — Roadmaps, Hiring, Stakeholder-Politik.',
            audience: 'Produktmanager:innen in Tech und Industrie',
            venueType: 'Ein Coworking-Meetingraum im Werksviertel',
          },
          {
            title: 'Hiring-Kreis für frühe Teams',
            pitch:
              'Gründer:innen teilen, wie sie einstellen, halten und gehen lassen — die unbequemen Wahrheiten früher Teamarbeit.',
            audience: 'Frühe Gründer:innen und Teamleads',
            venueType: 'Ein Startup-Büro oder Inkubator',
          },
        ],
      },
      {
        name: 'Kreativ & Machen',
        ideas: [
          {
            title: 'Kunstareal-Galerienacht',
            pitch:
              'Ein geführter Abendspaziergang durch das Museumsviertel mit Gesprächen und Drinks im Galerie-Café.',
            audience: 'Kunstliebhaber:innen und Studierende',
            venueType: 'Das Kunstareal',
          },
          {
            title: 'Offener Studiotag in Glockenbach',
            pitch:
              'Ein Viertel von Studios öffnet einen Nachmittag lang seine Türen für Führungen, Demos und Werke zum Verkauf.',
            audience: 'Kunstliebhaber:innen und neugierige Nachbar:innen',
            venueType: 'Die Studio-Höfe von Glockenbach',
          },
          {
            title: 'Musikproduktions-Zirkel',
            pitch:
              'Produzent:innen teilen unfertige Tracks für Feedback und tauschen Tipps zu Equipment und Software.',
            audience: 'Beatmaker:innen und Schlafzimmer-Produzent:innen',
            venueType: 'Ein Probe- oder Aufnahmestudio',
          },
          {
            title: 'Abend des traditionellen Handwerks',
            pitch:
              'Lerne Stopfen und Pflege für Lederhosen, Dirndl und Trachtenstoffe mit einer Meister:in des Handwerks.',
            audience: 'Handwerksliebende und traditionsneugierige Neuzugezogene',
            venueType: 'Eine Handwerkswerkstatt oder ein Schneider-Atelier',
          },
          {
            title: 'Zine- und Risograph-Abend',
            pitch: 'Ein praktischer Abend des Zine-Machens mit Risodruck und Tausch am Ende.',
            audience: 'Schreibende, Illustrator:innen und Druckbegeisterte',
            venueType: 'Ein Druckstudio oder Kunstraum',
          },
        ],
      },
      {
        name: 'Impact & Lokal',
        ideas: [
          {
            title: 'Mieterschutz-Infoabend',
            pitch:
              'Eine verständliche Session zu Mietregeln, Kautionen und kostenloser Wohnberatung.',
            audience: 'Mieter:innen und Mieterinitiativen',
            venueType: 'Ein Raum eines Mietervereins',
          },
          {
            title: 'Bürgerbegehren-Bootcamp',
            pitch:
              'Lerne, wie Bürgerbegehren in München funktionieren — Unterschriften, Fristen und wie man eine öffentliche Abstimmung gewinnt.',
            audience: 'Neue Aktivist:innen und neugierige Bewohner:innen',
            venueType: 'Ein Bezirksausschuss- oder Initiativenraum',
          },
          {
            title: 'Isar-Wiesen-Reinigung',
            pitch:
              'Ein Morgen, an dem die Ufer von Müll befreit werden, mit Handschuhen, Tüten und Grill danach.',
            audience: 'Flussliebende und Freiwillige',
            venueType: 'Ein Abschnitt der Isar-Wiesen',
          },
          {
            title: 'Arbeitstag im Gemeinschaftsgarten',
            pitch:
              'Nachbar:innen verbringen einen Morgen mit Pflanzen, Gießen und der Planung der Saison in einem geteilten Garten.',
            audience: 'Gärtner:innen und Garteneinsteiger:innen',
            venueType: 'Ein Gemeinschaftsgarten oder eine Kleingartenanlage',
          },
          {
            title: 'Geschichten der Viktualienmarkt-Stände',
            pitch:
              'Erfahrene Händler:innen erzählen Fünf-Minuten-Geschichten hinter ihren Ständen, gefolgt von offenen Fragen.',
            audience: 'Nachbar:innen und Essensliebhaber:innen',
            venueType: 'Der Viktualienmarkt',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Wie wähle ich eine dieser Ideen aus?',
        answer:
          'Passe die Kategorie an deine Interessen und an die Zielgruppe an, die du erreichen kannst. In München bauen wiederkehrende Formate mit festem Ort — ein Stammtisch, ein wöchentlicher Tisch, eine monatliche Wanderung — am schnellsten eine Community auf.',
      },
      {
        question: 'Muss ich Deutsch können, um zu organisieren?',
        answer:
          'Zum Start nicht. Viele Münchner Gruppen laufen auf Englisch oder sind zweisprachig, besonders in Tech- und Kreativ-Szenen. Ein wenig Deutsch kommt bei Biergarten-Stammgästen und den Vereinen weit.',
      },
      {
        question: 'Können aus diesen Events echte Communities werden?',
        answer:
          'Ja — wiederkehrende Formate sind der Weg, auf dem die meisten Münchner Communities starten, und die Vereinskultur liefert ein bewährtes Muster. Die Ratgeber erklären den Weg vom ersten Event zur stabilen Community.',
      },
    ],
  },
  faq: [
    {
      question: 'Wie finde ich eine Community in München?',
      answer:
        'Nutze die Unterseiten für Startup-, Kreativ-, politische, Meetup- und Kleinunternehmer-Communities. Jede beschreibt die echten Stadtbezirke, Orte und Formate, an denen Münchner:innen sich treffen. JoinOrigin ist live — erstelle dein Profil und finde oder gründe noch heute deine Community.',
    },
    {
      question: 'Ist es realistisch, in München eine Community zu gründen?',
      answer:
        'Ja. München hat reichlich Orte, großzügige Parks und Biergärten und eine starke Vereinskultur. Die Ratgeber behandeln Community-Gründung, Meetup-Organisation und die ersten zehn Mitglieder.',
    },
    {
      question: 'Sind die Ortsvorschläge auf dieser Seite echt?',
      answer:
        'Ja. Jede genannte Ortsart — Biergärten, die Isar-Ufer, der Viktualienmarkt, Alpenvereins-Hütten, öffentliche Bibliotheken — gibt es in München. Wir erfinden keine Mitgliederzahlen, Bewertungen oder lokale Büros.',
    },
    {
      question: 'Hat JoinOrigin ein Büro in München?',
      answer:
        'Nein. JoinOrigin hat keine lokalen Büros oder Mitarbeitenden. Alle Community-Beschreibungen spiegeln die echte Stadtlandschaft wider, und die Plattform hilft Münchner:innen, Communities zu finden oder zu gründen.',
    },
  ],
};

export default content;
