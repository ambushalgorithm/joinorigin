import type { CityContent } from '../../types';

/**
 * Berlin content — German translation (per-locale content file).
 *
 * Body copy for the 7 Berlin `de` pages at `/de/location/germany/berlin/...`.
 * Body copy lives HERE, never in locale JSONs (localization R2/R5).
 * `pageTitles` carries the German SEO titles/descriptions so the registry
 * and sitemap stay deterministic for the de surface.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'de',
  slug: 'berlin',
  title: 'Origins in Berlin | JoinOrigin',
  description:
    'Finde oder gründe Communities in Berlin – Startup, Kreativ, politisch, Meetups und Kleinunternehmen. Jetzt auf die JoinOrigin-Warteliste.',
  pageTitles: {
    city: 'Origins in Berlin | JoinOrigin',
    cityDescription:
      'Finde oder gründe Communities in Berlin – Startup, Kreativ, politisch, Meetups und Kleinunternehmen. Jetzt auf die JoinOrigin-Warteliste.',
    variants: {
      startup: 'Startup-Communities in Berlin | JoinOrigin',
      creative: 'Kreativ- & Design-Communities in Berlin | JoinOrigin',
      political: 'Politische & bürgerschaftliche Communities in Berlin | JoinOrigin',
      meetup: 'Community-Meetups & Veranstaltungen in Berlin | JoinOrigin',
      'small-business': 'Kleinunternehmer-Communities in Berlin | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Finde oder gründe Startup-Communities in Berlin – Gründer:innen, Builders und frühe Teams in Mitte und Kreuzberg. JoinOrigin-Warteliste.',
      creative:
        'Finde oder gründe Kreativ- & Design-Communities in Berlin – Studios, Galerien und Kollektive in Neukölln und Friedrichshain. JoinOrigin-Warteliste.',
      political:
        'Finde oder gründe politische & bürgerschaftliche Communities in Berlin – Mieterinitiativen, Bürgerbeteiligung und Ehrenamt. JoinOrigin-Warteliste.',
      meetup:
        'Finde oder gründe Community-Meetups & Veranstaltungen in Berlin – Stammtische, Biergärten, Spätis und Kieztreffen. JoinOrigin-Warteliste.',
      'small-business':
        'Finde oder gründe Kleinunternehmer-Communities in Berlin – Spätis, Läden, Handwerk und Kiez-Netzwerke. JoinOrigin-Warteliste.',
    },
    ideas: '30 Ideen für Origin-Events in Berlin | JoinOrigin',
    ideasDescription:
      '30 realistische Ideen für Community-Events in Berlin – Networking, Lernen, Draußen, Beruf, Kreativ & Impact. Für dein nächstes Event.',
  },
  intro: [
    'Berlin ist eine Stadt, die von Communities lebt. Ihre Geschichte, ihre im Vergleich zu anderen europäischen Hauptstädten erschwinglichen Preise und ihre zwölf Bezirke mit ganz eigenen Identitäten haben eine der aktivsten Treffkulturen des Kontinents hervorgebracht. Tech- und Startup-Menschen treffen sich in Mitte und Kreuzberg, während Neukölln und Friedrichshain eine dichte Mischung aus Kreativen, Macher:innen und Familien beherbergen, die sich oft dieselben Hinterhöfe und Spätis teilen.',
    'Öffentlicher Raum ist großzügig vorhanden – das Tempelhofer Feld, der Mauerpark, der Tiergarten und die Kanäle von Kreuzberg und Neukölln sind Schauplatz für alles von Drachenfesten bis zu spontanen Fußballspielen. Die Stammtisch-Tradition gibt jeder Community ein natürliches Ritual: ein fester Tisch im Biergarten oder im Kiezlokal, an dem Mitglieder ohne Einladung auftauchen. Universitäten wie die Humboldt-Universität, die TU Berlin und die FU Berlin halten einen steten Strom an Studierenden und Forschenden in Bewegung, und die internationale Bevölkerung macht englischsprachige Gruppen neben deutschsprachigen völlig normal.',
    'Wer in Berlin eine Community sucht oder gründen will, sollte regelmäßig auftauchen und einen Bezirk wählen, der zum Charakter der Gruppe passt.',
  ],
  dataPoints: [
    'Rund 3,4 Millionen Einwohner:innen; Bundeshauptstadt von Deutschland.',
    'Zwölf Bezirke mit jeweils eigener Community-Identität.',
    'Öffentliche Anker: Tempelhofer Feld, Mauerpark, Tiergarten und die Kanäle.',
    'Heimat der Humboldt-Universität, TU Berlin, FU Berlin und UdK Berlin.',
    'Starke Stammtisch- und Späti-Kultur des Zusammenkommens.',
    'Große internationale Bevölkerung – viele Gruppen laufen auf Englisch.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking-Spaces in Mitte und Kreuzberg',
        'Accelerator-Räume nahe dem Rosenthaler Platz',
        'Impact Hubs mit Frühstücks-Ecke für Gründer:innen',
        'Uni-Startup-Räume der TU Berlin und der ESMT',
        'Englischfreundliche Cafés mit Meeting-Ecke',
        'Biergarten-Tische für entspannte Gründer:innen-Abende',
      ],
      formats: [
        'Gründer:innen-Frühstücke mit kurzen Vorstellungsrunden',
        'Pitch-Abende und Demo-Nights',
        'Coworking-Tage der offenen Tür für frühe Teams',
        'Climate-Tech- und AI-Builders-Stammtische',
        'Internationale Gründer:innen-Treffen (auf Englisch)',
      ],
      howToStart: [
        'Wähle einen engen Fokus – Climate Tech, AI Builders oder Marktplätze – und einen englischsprachigen Namen.',
        'Reserviere einen festen Wochentermin in einem Coworking-Space in Mitte oder Kreuzberg.',
        'Veranstalte drei offene Meetups und bitte danach zwei Stammgäste, mitzuorganisieren und einen monatlichen Rhythmus zu finden.',
      ],
    },
    creative: {
      venues: [
        'Ateliers und Projektflächen in Neukölln und Friedrichshain',
        'Galerien und Ausstellungsräume in Mitte',
        'Höfe und Veranstaltungsflächen am RAW-Gelände',
        'Werkstatträume der UdK Berlin und anderer Kunsthochschulen',
        'Proberäume und Tonstudios',
        'Kiez-Cafés mit langen Tischen für Kritikrunden',
      ],
      formats: [
        'Offene Atelierwochenenden und Portfolio-Abende',
        'Design-Kritikabende',
        'Musikproduktions-Zirkel mit geteiltem Equipment',
        'Zine- und Risograph-Druckabende',
        'Künstler:innengespräche in Projektflächen',
      ],
      howToStart: [
        'Wähle ein Handwerk, einen Bezirk und einen festen Abend – Spezifität schafft hier schneller Identität.',
        'Finde ein Kollektivstudio oder eine Projektfläche in Neukölln oder Friedrichshain, die euch aufnimmt.',
        'Starte mit einem offenen Studioabend, sammle Arbeiten in Arbeit und mache Feedback zur festen Tagesordnung.',
      ],
    },
    political: {
      venues: [
        'Sitzungsräume der Bezirksverordnetenversammlungen',
        'Räume von Mieterinitiativen in Neukölln und Kreuzberg',
        'Nachbarschaftszentren und Stadtteilbüros',
        'Gemeinschaftsgärten und BücherboXXen',
        'Civic-Tech-Co-Working-Räume',
        'Freiwilligen-Räume nahe der Geflüchtetenhilfe',
      ],
      formats: [
        'Offene Sitzungen der Bezirksverordnetenversammlungen',
        'Info-Abende zu Mietrecht und Mieterrechten',
        'Planungstreffen von Bürgerinitiativen',
        'Informationsveranstaltungen und erste Schichten für Freiwillige',
        'Workshops zur Bürgerbeteiligung in einfacher Sprache',
      ],
      howToStart: [
        'Wähle ein konkretes Thema und einen überschaubaren Ort – einen Kiez, eine Straße oder eine Wohnungspolitik-Frage.',
        'Besuche zuerst drei bestehende Initiativen und kooperiere statt zu duplizieren.',
        'Veranstalte einen offenen Info-Abend mit einem echten Organisator als Co-Gastgeber, um Vertrauen aufzubauen.',
      ],
    },
    meetup: {
      venues: [
        'Biergärten in Kreuzberg und Neukölln',
        'Cafés in Prenzlauer Berg mit Community-Ecken',
        'Wiesen und Grillflächen auf dem Tempelhofer Feld',
        'Späti-Kneipen und Kiezlokale mit Tischen',
        'Mauerpark und Volkspark Friedrichshain',
        'Öffentliche Bibliotheken mit Besprechungsräumen',
      ],
      formats: [
        'Wöchentlicher Stammtisch am selben Tisch',
        'Monatliche Themen-Spaziergänge und Radtouren',
        'Brettspiel- und Spieleabende',
        'Sprachtandems und Konversationstische',
        'Sonntags-Marktbummel und Picknicks',
      ],
      howToStart: [
        'Wähle ein wiederkehrendes Format – einen wöchentlichen Stammtisch, einen monatlichen Spaziergang – und einen festen Ort.',
        'Suche dir einen Biergarten, eine Späti-Kneipe oder einen Parkplatz, der euch jedes Mal aufnimmt.',
        'Veranstalte die ersten drei Termine zur gleichen Zeit am gleichen Ort und bitte Stammgäste, je einen Neuling mitzubringen.',
      ],
    },
    'small-business': {
      venues: [
        'Räume von Kiez-Gewerbevereinen',
        'Lokale Cafés mit Hinterzimmern für Runde Tische',
        'Späti-eigene Community-Ecken',
        'Maker-Markt-Hallen und Craft-Brauerei-Taprooms',
        'Workshop-Räume der Kammern',
        'Repair-Cafés und Werkstätten',
      ],
      formats: [
        'Monatliche Kiez-Runde Tische für Inhaber:innen',
        'Planungstreffen für Straßenfeste und Märkte',
        'Kammer-Workshops zu Lizenzen und Digitalisierung',
        'Teilnahmetage auf Maker-Märkten',
        'Peer-Gruppen zu Lohnabrechnung, Vermieter:innen und Online-Verkauf',
      ],
      howToStart: [
        'Wähle eine Straße oder einen Kiez und lade die Inhaber:innen von zwölf Läden zu einem ersten Café-Stammtisch ein.',
        'Wechsle praktische Themen – Mietverhandlungen, Lohnabrechnung, Online-Verkauf – damit sich jedes Treffen lohnt.',
        'Kooperiere mit dem Kiez-Gewerbeverein oder der Kammer, um Inhaber:innen jenseits deiner Straße zu erreichen.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Die Berliner Startup-Szene hat sich von einem improvisierten Experiment nach der Wiedervereinigung zu einem der wichtigsten Tech-Ökosysteme Europas entwickelt, mit Stärken in Marktplätzen, Fintech, Climate Tech und Entwickler-Tools. Gründer:innen und Entwickler:innen konzentrieren sich in Mitte und Kreuzberg, wo Coworking-Spaces, Acceleratoren und Universitätsprogramme der TU Berlin und der ESMT einen dichten Kreislauf aus Talent und Kapital erzeugen. Berlins berühmter Pragmatismus prägt die Community: Bei Treffen geht es weniger um Status als ums Liefern, Einstellen und Überleben der nächsten Finanzierungsrunde. Bewährte Formate sind Gründer:innen-Frühstücke, Pitch-Abende und Coworking-Tage der offenen Tür, bei denen frühe Teams ihre ersten Entwickler:innen und Designer:innen finden. Die internationale Szene ist ein echtes Plus – Englisch ist in Meetups üblich, was Gründer:innen hilft, die neu in Deutschland sind. Eine Startup-Community hier zu gründen, funktioniert am besten mit einem engen Fokus und einem festen Rhythmus: Ein monatlicher AI-Builders-Abend oder ein Climate-Tech-Stammtisch baut schneller eine verlässliche Anhängerschaft auf als eine allgemeine Gründer:innen-Gruppe.',
    creative:
      'Die kreativen Communities Berlins sind untrennbar mit der Identität der Stadt verbunden: Kunst-, Musik-, Design- und Mode-Szenen entstanden aus günstigen Räumen, einer Tradition der Selbstorganisation und einem Publikum, das Authentizität über Perfektion stellt. Galerien in Mitte, Studios in Neukölln und Friedrichshain sowie die Techno- und elektronische Musikszene rund um Clubs und Kollektive geben Kreativen echte Orte zum Treffen. Die UdK und die vielen Kunsthochschulen der Stadt speisen einen steten Strom an Absolvent:innen in eine freiberufliche Ökonomie, die auf Zusammenarbeit und Empfehlungen basiert. Übliche Formate sind Tage der offenen Ateliers, Portfolio-Abende, Design-Kritiken und Musikproduktions-Zirkel, die sich Ausrüstung und Feedback teilen. Weil Räume günstiger sind als in London oder Paris, sind Kollektivstudios und Projektflächen verbreitet, und viele Communities entstehen um eine gemeinsame Werkstatt statt um einen Verteiler. Eine kreative Community in Berlin zu gründen ist realistisch: Wähle ein Handwerk, einen Bezirk und einen festen Abend – die Dichte an neugierigen, talentierten Menschen in dieser Stadt findet dich.',
    political:
      'Berlin hat eine tiefe Tradition politischen und bürgerschaftlichen Engagements – von Mieterbewegungen über Klimablockaden bis zu Nachbarschaftsräten und Freiwilligen-Initiativen, die den öffentlichen Raum gestalten. Die Stadt ist in Bezirke mit gewählten Bezirksverordnetenversammlungen gegliedert, was lokale Politik zugänglich macht: Bewohner:innen können an öffentlichen Sitzungen teilnehmen, Bürgerinitiativen gründen und zu Stadtentwicklungsplänen Stellung nehmen. Wohnen ist das bestimmende Thema – Mieterorganisationen in Neukölln, Kreuzberg und Friedrichshain veranstalten Info-Abende, Mietrechts-Workshops und Solidaritätsnetzwerke, die für Neulinge offen sind. Civic-Tech-Gruppen bauen Werkzeuge für Beteiligung, während unzählige Projekte sich um Parks, Geflüchtetenhilfe, Gemeinschaftsgärten und BücherboXXen kümmern. Die Kultur belohnt Geduld und Direktheit: Zu einem echten Treffen zu kommen zählt mehr als Online-Kommentare. Eine politische Community zu gründen bedeutet, ein konkretes Thema und einen überschaubaren Ort zu wählen und mit bestehenden Initiativen zu kooperieren, statt sie zu duplizieren – die Landschaft hier ist reich genug, dass Zusammenarbeit besser funktioniert als Konkurrenz. Wer sich einbringen möchte, findet in fast jedem Bezirk eine passende Initiative mit offenen Terminen.',
    meetup:
      'Die Meetup-Szene Berlins ist bekannt für ihre Gastfreundschaft, angetrieben von der Stammtisch-Tradition und der Liebe der Stadt zu günstigen, verbindenden Formaten. Biergärten in Kreuzberg, Cafés in Prenzlauer Berg und die weiten Wiesen des Tempelhofer Felds beherbergen das ganze Jahr über Buchclubs, Sprachtandems, Laufgruppen, Spieleabende und Hobby-Zirkel. Der Späti – der Eckladen mit langen Öffnungszeiten – ist mehr als ein Gemischtwarenladen: Er ist der Anker des Kiezes, an dem Veranstaltungsflyer, Aushänge und spontane Pläne kursieren. Gruppen hier sind meist locker in der Struktur und ernst in der Beständigkeit; ein wöchentlicher Stammtisch am selben Tisch baut eine Community auf, die jedes einzelne Event überdauert. Viele internationale Bewohner:innen veranstalten englischsprachige Meetups, sodass Neuzugezogene schnell Anschluss finden, bevor ihr Deutsch besser wird. Wenn du ein Meetup gründen willst, wähle ein wiederkehrendes Format – einen monatlichen Spaziergang, einen wöchentlichen Sprachtisch, einen Spieleabend – und einen Ort, der dich jedes Mal aufnimmt. Die Dichte an neugierigen Menschen in Berlin erledigt den Rest.',
    'small-business':
      'Die Berliner Kleinunternehmer-Community ist geprägt von der Unabhängigkeitskultur der Stadt: Spätis, Dönerläden, Boutiquen, Craft-Brauereien, Repair-Cafés und Ateliers werden von Menschen geführt, die Autonomie und lokale Treue schätzen. Die Kieze fungieren als natürliche Interessensgemeinschaften – Gewerbetreibende organisieren Straßenfeste, Märkte und gemeinsame Anliegen rund um Miete und Genehmigungen. Die Kammern und Wirtschaftsförderungen der Stadt bieten praktische Workshops zu Lizenzen, Finanzierung und Digitalisierung an, oft auf Deutsch und Englisch. Was diese Gruppen zusammenhält, ist der Ort: Ein Ladencluster auf einer Straße teilt Kund:innen, Laufkundschaft und das Schicksal des öffentlichen Raums davor. Neue Leute vernetzen sich meist über ein Kiez-Gewerbetreffen, einen Maker-Markt oder einen Workshop. Eine Kleinunternehmer-Community in Berlin zu gründen ist gut machbar: Ein monatlicher Runde Tisch in einem Lokal im Kiez, mit wechselnden Themen wie Lohnabrechnung, Vermieter-Verhandlungen und Online-Verkauf, zieht zuverlässig Inhaber:innen an, die selten Gleichgesinnte zum Reden haben. Auch Neulinge ohne eigenes Geschäft sind willkommen, denn viele Treffen suchen gezielt Nachbar:innen mit Ideen für den Kiez.',
  },
  ideaPage: {
    intro:
      'Berlin ist ideal, um neue Ideen für Community-Events auszuprobieren: Der öffentliche Raum ist großzügig, Veranstaltungsorte sind bezahlbar, und die Menschen kommen, wenn etwas echt ist. Die dreißig Ideen unten sind in sechs Kategorien gegliedert – Networking, Lernen, Draußen & Soziales, Beruf & Branche, Kreativ & Machen sowie Impact & Lokal. Jede Idee nennt die Zielgruppe, einen kurzen Pitch und eine Veranstaltungsart, die es in Berlin wirklich gibt – von Biergärten und Spätis über das Tempelhofer Feld bis zu Gemeinschaftsgärten. Manche Ideen funktionieren als einmalige Events; andere sind dafür gemacht, zu wiederkehrenden Communities mit Stammtisch-Rhythmus zu werden. Die Ehrlichkeitsregel ist einfach: Jede vorgeschlagene Veranstaltungsart ist ein realer Ortstyp in dieser Stadt, und jedes Format ist einfach genug, dass es ein Erstveranstalter durchziehen kann. Wähle die Idee, die zu deinen Interessen passt, finde einen Ort, der dich aufnimmt, und überlasse den Rest der Neugierde Berlins.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Stammtisch für Neuzugezogene',
            pitch:
              'Ein fester Tisch im selben Biergarten, an dem Neuzugezogene und Alteingesessene Stadt-Tipps, Jobgeschichten und Kontakte tauschen.',
            audience: 'Neuzugezogene und alle, die gern ungezwungen reden',
            venueType: 'Ein Biergarten in Kreuzberg',
          },
          {
            title: 'Gründer:innen-Frühstück auf Englisch',
            pitch:
              'Ein frühes Frühstück, bei dem international arbeitende Gründer:innen über Erfolge und Hürden der Woche sprechen.',
            audience: 'Internationale Gründer:innen in Berlin',
            venueType: 'Ein Café mit ruhiger Ecke in Mitte',
          },
          {
            title: 'Kiez-Kennenlernabend',
            pitch:
              'Ein ungezwungener Abend in einem Viertel mit Eisbrecher-Karten und der Regel, drei neue Menschen kennenzulernen.',
            audience: 'Bewohner:innen eines Bezirks',
            venueType: 'Eine Kneipe oder ein Gemeinschaftsraum im Kiez',
          },
          {
            title: 'Karriere-Geschichten-Kreis',
            pitch:
              'Sechs Menschen erzählen ihre Karrieregeschichte in je fünf Minuten, danach Fragen und Vernetzung.',
            audience: 'Berufswechsler:innen, Studierende und Mentor:innen',
            venueType: 'Besprechungsraum in der Bibliothek',
          },
          {
            title: 'Freelancer-Kaffeeclub',
            pitch:
              'Ein wöchentlicher Morgenkaffee, bei dem Freelancer aus allen Branchen Aufträge, Honorare und Klientengeschichten tauschen.',
            audience: 'Freiberufler:innen aller Disziplinen',
            venueType: 'Coworking-Café in Friedrichshain',
          },
        ],
      },
      {
        name: 'Lernen & Workshops',
        ideas: [
          {
            title: 'Deutscher Konversationstisch für Expats',
            pitch:
              'Tische nach Niveau, an jedem Tisch eine deutschsprachige Person – die Regel lautet: Fehler sind der Sinn.',
            audience: 'Expats, die Deutsch lernen',
            venueType: 'Café oder Gemeinschaftszentrum in Prenzlauer Berg',
          },
          {
            title: 'Startup-Buchhaltung auf Klartext-Deutsch',
            pitch:
              'Ein praktischer Workshop zu Rechnungen, Umsatzsteuer und den Grundlagen, die jede:r Gründer:in in Deutschland braucht.',
            audience: 'Neue Gründer:innen und Freiberufler:innen',
            venueType: 'Coworking-Space oder Kammer-Raum',
          },
          {
            title: 'Repair-Café-Workshop',
            pitch:
              'Freiwillige helfen Nachbar:innen, Lampen, Fahrräder und Geräte zu reparieren und zeigen dabei die Grundlagen.',
            audience: 'Bewohner:innen mit kaputten Dingen und Reparatur-Begeisterte',
            venueType: 'Kiezwerkstatt oder Nachbarschaftszentrum',
          },
          {
            title: 'Urban Gardening 101',
            pitch:
              'Ein praktischer Termin zu Balkon- und Gemeinschaftsgarten-Anbau – Samen und Töpfe sind dabei.',
            audience: 'Anfänger:innen im Gärtnern',
            venueType: 'Gemeinschaftsgarten oder Kleingartenverein',
          },
          {
            title: 'Workshop zur Bürgerbeteiligung',
            pitch:
              'Ein verständlicher Leitfaden zu Bezirksverordnetenversammlungen, Bürgerinitiativen und Redebeiträgen.',
            audience: 'Neue Engagierte und neugierige Bewohner:innen',
            venueType: 'Bezirksamt oder Bibliotheksraum',
          },
        ],
      },
      {
        name: 'Draußen & Soziales',
        ideas: [
          {
            title: 'Picknick & Spiele auf dem Tempelhofer Feld',
            pitch:
              'Decken, Badminton und Frisbee auf dem alten Flugfeld – mit wechselndem Potluck-Thema.',
            audience: 'Familien, Paare und Freundesgruppen',
            venueType: 'Wiesen des Tempelhofer Felds',
          },
          {
            title: 'Mauerpark-Marktspaziergang',
            pitch:
              'Ein gemütlicher Sonntagsspaziergang durch den Flohmarkt mit Stopps bei Musik und Streetfood.',
            audience: 'Sonntags-Entdecker:innen',
            venueType: 'Mauerpark und umliegende Straßen',
          },
          {
            title: 'Fahrradtour am Kanal',
            pitch:
              'Eine entspannte Runde entlang des Landwehrkanals mit Café-Stopps und einer Bad-Pause im Sommer.',
            audience: 'Freizeit-Radler:innen',
            venueType: 'Wege am Landwehrkanal',
          },
          {
            title: 'Spieleabend in der Späti-Kneipe',
            pitch:
              'Ein wöchentlicher Brettspiel-Stapel in einer Kiez-Kneipe, die lange Abende willkommen heißt.',
            audience: 'Gelegenheitsspieler:innen und Nachbar:innen',
            venueType: 'Späti-Kneipe mit Tischen in Neukölln',
          },
          {
            title: 'Glühwein-Wintermarkt-Runde',
            pitch:
              'Ein geführter Abendspaziergang über die Weihnachtsmärkte mit Glühwein und warmen Snacks.',
            audience: 'Winterfans und Neuzugezogene',
            venueType: 'Ein Berliner Weihnachtsmarkt',
          },
        ],
      },
      {
        name: 'Beruf & Branche',
        ideas: [
          {
            title: 'Climate-Tech-Gründer:innen-Tisch',
            pitch:
              'Ein monatlicher Runder Tisch, an dem Climate-Tech-Gründer:innen Fortschritte und Partnerschaften teilen.',
            audience: 'Climate-Tech-Gründer:innen und Operator:innen',
            venueType: 'Impact Hub oder Green-Tech-Büro',
          },
          {
            title: 'Peer-Kreis für Produktmanager:innen',
            pitch:
              'Ein vertraulicher Kreis, in dem PMs eine monatliche Herausforderung besprechen – Roadmaps, Hiring, Stakeholder.',
            audience: 'Produktmanager:innen in der Tech-Branche',
            venueType: 'Meetingraum im Coworking-Space in Mitte',
          },
          {
            title: 'Design-Kritikabend',
            pitch:
              'Designer:innen zeigen echte Arbeiten und erhalten strukturiertes, konstruktives Feedback.',
            audience: 'Produkt-, Grafik- und UX-Designer:innen',
            venueType: 'Designstudio oder Kreativagentur-Raum',
          },
          {
            title: 'Pitch-Labor für Journalismus',
            pitch:
              'Journalist:innen pitchen Story-Ideen und bekommen ehrliches redaktionelles Feedback.',
            audience: 'Freie Journalist:innen und Medienstudierende',
            venueType: 'Redaktions- oder Medienseminarraum',
          },
          {
            title: 'Hiring-Kreis für frühe Teams',
            pitch:
              'Gründer:innen teilen, wie sie einstellen, halten und trennen – die unbequemen Wahrheiten früher Teamarbeit.',
            audience: 'Frühe Gründer:innen und Teamleads',
            venueType: 'Startup-Büro oder Inkubator',
          },
        ],
      },
      {
        name: 'Kreativ & Machen',
        ideas: [
          {
            title: 'Offenes Atelier am Samstag',
            pitch:
              'Ein Viertel öffnet einen Nachmittag lang seine Ateliers für Führungen, Demos und Werke zum Verkauf.',
            audience: 'Kunstliebhaber:innen und neugierige Nachbar:innen',
            venueType: 'Ein Atelierhof in Neukölln',
          },
          {
            title: 'Musikproduktions-Zirkel',
            pitch:
              'Produzent:innen teilen unfertige Tracks für Feedback und tauschen Tipps zu Equipment und Software.',
            audience: 'Beatmaker:innen und Schlafzimmer-Produzent:innen',
            venueType: 'Proberaum oder Makerspace',
          },
          {
            title: 'Street-Art-Spaziergang mit Geschichten',
            pitch:
              'Ein geführter Rundgang durch die Murals in Friedrichshain mit den Geschichten hinter den Künstler:innen.',
            audience: 'Kunstspaziergänger:innen und Fotograf:innen',
            venueType: 'Straßen von Friedrichshain nahe dem RAW-Gelände',
          },
          {
            title: 'Zine- und Risograph-Abend',
            pitch:
              'Ein praktischer Abend des Zine-Machens mit Risodruck und Tausch der Ergebnisse.',
            audience: 'Schreibende, Illustrator:innen und Druckbegeisterte',
            venueType: 'Druckerei oder Kunstraum in Kreuzberg',
          },
          {
            title: 'Kreis für Sichtbares Stopfen',
            pitch:
              'Bring kaputte Kleidung mit und lerne sichtbare Reparaturtechniken mit Garn, Flicken und Gesellschaft.',
            audience: 'Nähende und nachhaltigkeitsbewusste Macher:innen',
            venueType: 'Gemeinschaftszentrum oder Repair-Café',
          },
        ],
      },
      {
        name: 'Impact & Lokal',
        ideas: [
          {
            title: 'Info-Abend zu Mieterrechten',
            pitch:
              'Eine verständliche Einführung zu Mietpreisbremse, Verträgen und kostenloser Wohnberatung.',
            audience: 'Mieter:innen und Mieterinitiativen',
            venueType: 'Nachbarschaftszentrum oder Bibliothek',
          },
          {
            title: 'Kiezputz am Morgen',
            pitch:
              'Ein Samstagmorgen-Putz einer Straße oder eines Parks – Handschuhe und Kaffee kommen von lokalen Läden.',
            audience: 'Nachbar:innen und Ladenbesitzer:innen',
            venueType: 'Eine gewählte Straße in jedem Kiez',
          },
          {
            title: 'Willkommens-Einführung für Freiwillige',
            pitch:
              'Eine Orientierung plus erste Schicht für Freiwillige, die lokale Willkommens- und Integrationsprojekte unterstützen.',
            audience: 'Erstmalige Freiwillige',
            venueType: 'Raum einer lokalen Willkommensinitiative',
          },
          {
            title: 'Planungskreis Gemeinschaftsgarten',
            pitch:
              'Gärtner:innen und Nachbar:innen planen gemeinsam Saisonbepflanzung, Events und geteilte Werkzeuge.',
            audience: 'Gärtner:innen und Garteneinsteiger:innen',
            venueType: 'Gemeinschaftsgarten oder Kleingarten',
          },
          {
            title: 'Abend der lokalen Geschichten',
            pitch:
              'Laden- und Späti-Besitzer:innen erzählen in Fünf-Minuten-Geschichten, was hinter ihren Läden steckt.',
            audience: 'Nachbar:innen und Kleinunternehmer:innen',
            venueType: 'Ein lokaler Laden, ein Café oder ein Kiez-Saal',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Wie wähle ich eine dieser Ideen aus?',
        answer:
          'Wähle die Kategorie, die zu deinen Interessen und zu der Zielgruppe passt, die du erreichen kannst. In Berlin bauen wiederkehrende Formate mit festem Ort – ein Stammtisch, ein wöchentlicher Tisch, ein monatlicher Spaziergang – am schnellsten eine Community auf.',
      },
      {
        question: 'Muss ich Deutsch können, um zu organisieren?',
        answer:
          'Nein. Viele Berliner Events laufen auf Englisch oder sind zweisprachig, und die internationale Community ist groß. Eine zweisprachige Ankündigung verdoppelt meist deine Reichweite.',
      },
      {
        question: 'Können aus diesen Events echte Communities werden?',
        answer:
          'Ja – wiederkehrende Formate sind der Weg, auf dem die meisten Berliner Communities starten, und die Stammtisch-Tradition liefert dafür ein bewährtes Muster. Die Ratgeber erklären den Weg vom ersten Event zur stabilen Community.',
      },
    ],
  },
  faq: [
    {
      question: 'Wie finde ich eine Community in Berlin?',
      answer:
        'Nutze die Unterseiten für Startup-, Kreativ-, politische, Meetup- und Kleinunternehmer-Communities. Sie beschreiben die realen Bezirke, Orte und Formate, an denen Berliner:innen sich treffen. JoinOrigin ist eine Wartelisten-Plattform – trage dich ein, um über den frühen Zugang informiert zu werden.',
    },
    {
      question: 'Ist es realistisch, in Berlin eine Community zu gründen?',
      answer:
        'Ja. Berlin hat bezahlbare Orte, großzügigen öffentlichen Raum und eine Kultur des Erscheinens. Die Ratgeber behandeln Community-Gründung, Meetup-Organisation und die ersten zehn Mitglieder.',
    },
    {
      question: 'Sind die Ortsvorschläge auf dieser Seite echt?',
      answer:
        'Ja. Jede genannte Ortsart – Biergärten, Spätis, Tempelhofer Feld, Gemeinschaftsgärten, öffentliche Bibliotheken – gibt es in Berlin. Wir erfinden keine Mitgliederzahlen, Bewertungen oder lokale Büros.',
    },
    {
      question: 'Hat JoinOrigin ein Büro in Berlin?',
      answer:
        'Nein. JoinOrigin ist eine Wartelisten-Plattform ohne lokale Büros oder Mitarbeitende vor Ort. Alle Community-Beschreibungen spiegeln die echte Stadtlandschaft wider, und die Plattform soll Berliner:innen helfen, Communities zu finden oder zu gründen.',
    },
  ],
};

export default content;
