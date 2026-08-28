import type { RegionContent } from '../../types';

/**
 * Region Berlin — Regions-Seiteninhalt, deutsche Übersetzung (Inhalt pro
 * Sprache).
 *
 * Berlin ist ein Stadtstaat: Die Admin-1-Region und die Stadt sind dieselbe
 * Einheit. Diese Regionsseite deckt die landesweite/bezirkliche Landschaft ab;
 * die Stadtseite (`/location/germany/berlin/berlin`) behandelt das städtische
 * Umfeld. `title`/`description` tragen die deutschen SEO-Titel/-Beschreibungen.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'de',
  slug: 'berlin',
  title: 'Origins in Berlin | JoinOrigin',
  description:
    'Finde oder gründe Origins in Berlin – als Stadtstaat mit zwölf Bezirken, von Tech in Mitte bis Kreativ in Neukölln. Jetzt auf die JoinOrigin-Warteliste.',
  intro:
    'Berlin ist zugleich Stadt und Land, was seine Community-Landschaft ungewöhnlich konzentriert macht. Zwölf Bezirke — von Kreuzberg und Neukölln im Süden über Prenzlauer Berg und Wedding im Norden, Mitte im Zentrum bis Charlottenburg im Westen — tragen jeweils eine eigene Identität, die die Gruppen prägt, die sich dort treffen. Weil das gesamte Land in eine einzige Stadt passt, zersplittern Communities rund um ein Viertel, eine Branche oder ein Hobby selten über weite Distanzen; ein Tech-Meetup in Mitte und eine Klimainitiative in Neukölln liegen nur eine kurze U-Bahn-Fahrt auseinander. Das Land ist außerdem ein Knotenpunkt für öffentliche Einrichtungen, Universitäten und kulturelle Veranstaltungsorte, die jeden Monat tausende Zusammenkünfte beherbergen. Für alle, die eine Community organisieren oder ihr beitreten möchten, bietet Berlin die seltene Kombination aus Dichte, Vielfalt und Erschwinglichkeit im Vergleich zu anderen europäischen Hauptstädten. Die regionale Identität fließt direkt in die Stadtseiten ein: Die meisten Gruppen des Landes treffen sich innerhalb der Stadt selbst, und die Ratgeber hier helfen dir, beides zu navigieren.',
  dataPoints: [
    'Berlin ist ein Stadtstaat (Land) mit rund 3,4 Millionen Einwohner:innen.',
    'Zwölf Bezirke mit jeweils eigener Community-Identität.',
    'Bundeshauptstadt von Deutschland und bedeutendes europäisches Tech-Zentrum.',
    'Dichter öffentlicher Nahverkehr verbindet alle Bezirke miteinander.',
  ],
  faq: [
    {
      question: 'Unterscheidet sich die Region Berlin von der Stadt-Szene Berlins?',
      answer:
        'Berlin ist ein Stadtstaat, daher überlappen sich Region und Stadt vollständig. Diese Seite behandelt die landesweite Landschaft, während die Berliner Stadtseite auf konkrete Bezirke, Orte und Gruppentypen eingeht.',
    },
    {
      question: 'Welche Berliner Bezirke haben die aktivsten Communities?',
      answer:
        'Mitte und Kreuzberg sind die historischen Zentren für Tech- und Kreativ-Gruppen; Neukölln, Friedrichshain und Prenzlauer Berg beherbergen starke Maker-, Kunst- und Familienszenen; Charlottenburg und Schöneberg verankern berufliche Netzwerke.',
    },
    {
      question: 'Ist JoinOrigin in Berlin aktiv?',
      answer:
        'Ja. JoinOrigin hat keine lokalen Büros. Berlin ist eine von zwei Flagship-Städten, und ihre Seiten sind ins Deutsche übersetzt, um das lokale Publikum ehrlich zu bedienen.',
    },
  ],
};

export default content;
