import type { CountryContent } from '../../types';

/**
 * Deutschland — Länder-Seiteninhalt, deutsche Übersetzung (Inhalt pro Sprache).
 *
 * Zeitloser, ehrlicher Text über die deutsche Community-Landschaft — Vereine,
 * Stammtische, Universitätsstädte und die Startup-/Metropol-Hubs.
 * `title`/`description` tragen die deutschen SEO-Titel/-Beschreibungen.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'de',
  slug: 'germany',
  title: 'Origins in Deutschland | JoinOrigin',
  description:
    'Finde oder gründe Communities in Deutschland – Startup, Kreativ, politisch, Meetups und Kleinunternehmen. Jetzt auf die JoinOrigin-Warteliste.',
  intro:
    'Deutschland verbindet eine tiefe Tradition organisierten Gemeinschaftslebens mit einer schnell wachsenden modernen Szene aus Meetups und Startup-Communities. Der Verein — ein eingetragener Club mit regelmäßigen Treffen, Mitgliedschaft und oft einem gemeinsamen Hobby oder bürgerschaftlichen Zweck — bleibt zentral für das deutsche Zusammenleben, von Sport- und Musikvereinen bis zu Freiwilligen Feuerwehren. Parallel dazu beherbergen Städte wie Berlin, München, Hamburg und Köln lebendige berufliche Communities: Tech-Meetups, Design-Kollektive, Klimainitiativen und Co-Founder-Matching-Events füllen jede Woche Coworking-Spaces und Universitätsauditorien. Der Stammtisch — ein regelmäßiger informeller Tisch in einer lokalen Bar oder einem Café — ist eine soziale Technik, die Deutsche seit Jahrhunderten praktizieren und die heute Netzwerkgruppen in allen Branchen antreibt. Deutsche Universitäten sind gebührenfrei und zahlreich, sodass Studierenden-Communities, Forschungsgruppen und Alumni-Netzwerke auch in den meisten mittelgroßen Städten dicht vertreten sind. Ob du neu im Land bist oder dein Leben lang hier lebst: Eine Gruppe zu finden — oder mit einem einfachen ersten Meetup eine eigene zu gründen — ist ein wohlgegangener Weg.',
  dataPoints: [
    'Rund 83 Millionen Einwohner:innen in 16 Bundesländern.',
    'Deutsch ist die Hauptsprache.',
    'Die Bundeshauptstadt ist Berlin.',
    'Starke Vereins- und Ehrenamtskultur im ganzen Land.',
  ],
  faq: [
    {
      question: 'Wie finde ich Communities in Deutschland?',
      answer:
        'Nutze den /location-Bereich, um eine Stadt zu wählen, und erkunde dann die Gruppentyp-Seiten für Startup-, Kreativ-, politische, Meetup- und Kleinunternehmer-Communities. Lokale Vereine und Veranstaltungsplattformen sind ebenfalls gute Ausgangspunkte für Offline-Gruppen.',
    },
    {
      question: 'Was ist ein Stammtisch und wie schließe ich mich einem an?',
      answer:
        'Ein Stammtisch ist ein regelmäßiges informelles Treffen an einem festen Tisch in einer Bar oder einem Café. Viele berufliche und Hobby-Communities veranstalten einen; zu fragen oder die Community-Seiten der Stadt zu prüfen, reicht meistens zum Mitmachen.',
    },
    {
      question: 'Ist JoinOrigin in Deutschland aktiv?',
      answer:
        'Ja. JoinOrigin hat keine lokalen Büros. Die Berlin-Seiten sind ins Deutsche übersetzt, und das Produkt hilft Menschen, überall in Deutschland Communities zu finden oder zu gründen.',
    },
  ],
};

export default content;
