import type { RegionContent } from '../../types';

/**
 * Region Bayern — Regions-Seiteninhalt, deutsche Übersetzung (Inhalt pro
 * Sprache).
 *
 * Bayern ist der flächenmäßig größte Freistaat Deutschlands und beherbergt
 * München, die bayerische Landeshauptstadt. Diese Regionsseite deckt die
 * landesweite Landschaft vom Alpenrand bis Franken ab; die Stadtseite
 * (`/location/germany/bavaria/munich`) behandelt das städtische Umfeld
 * Münchens. `title`/`description` tragen die deutschen SEO-Titel/-Beschreibungen.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'de',
  slug: 'bavaria',
  title: 'Communities in Bayern | JoinOrigin',
  description:
    'Finde oder gründe Communities in Bayern – von München über Nürnberg und Augsburg bis in die Alpen. Vereine, Stammtische, Startup-Meetups. Jetzt auf die JoinOrigin-Warteliste.',
  intro:
    'Bayern ist das flächenmäßig größte Bundesland Deutschlands und ein Freistaat, dessen Community-Landschaft weit über die Landeshauptstadt hinausreicht. Die Region verbindet eine tiefe Tradition organisierten Gemeinschaftslebens — Vereine, Trachten- und Schützenvereine, Blaskapellen und Stammtische — mit einer der stärksten Volkswirtschaften Europas. München als Landeshauptstadt ist der unbestrittene Mittelpunkt: Hier treffen sich Tech-Gründer:innen rund um die TUM und UnternehmerTUM, Wissenschaftler:innen der LMU und Kreativschaffende aus Schwabing und Glockenbach, während Biergärten wie der Englische Garten und der Hirschgarten das soziale Leben im Sommer verankern. Aber auch Nürnberg, Augsburg, Regensburg und Würzburg tragen dichte Universitäts- und Kulturszenen, und die Alpen an der Südgrenze formen Wander- und Skivereine, die das Wochenendleben prägen. Das Oktoberfest zieht jährlich Millionen Besucher an, doch der Alltag der Communities spielt sich in den Wirtshäusern, Vereinsheimen und Markthallen der Städte und Gemeinden ab. Wer in Bayern eine Community sucht oder gründen möchte, profitiert von einer der dichtesten Vereinsstrukturen Europas: Vereine, Stammtische und Initiativen gibt es praktisch in jedem Ort des Freistaats.',
  dataPoints: [
    'Rund 13 Millionen Einwohner:innen; das flächenmäßig größte Bundesland Deutschlands.',
    'Landeshauptstadt ist München mit rund 1,5 Millionen Einwohner:innen.',
    'Starke Vereins- und Stammtisch-Kultur, von Trachten- und Schützenvereinen bis zu Blaskapellen.',
    'Heimat der TUM, der LMU und weiterer Universitäten in Nürnberg, Augsburg und Regensburg.',
    'Die Alpen an der Südgrenze prägen Wander- und Skivereine im Community-Kalender.',
  ],
  faq: [
    {
      question: 'Wie unterscheidet sich die Region Bayern von der Münchner Stadt-Szene?',
      answer:
        'Diese Seite behandelt die landesweite Landschaft des Freistaats, während die Münchner Stadtseite auf konkrete Stadtbezirke, Orte und Gruppentypen eingeht. Bayern umfasst weit mehr als die Landeshauptstadt — von Franken über Schwaben bis zu den Alpen.',
    },
    {
      question: 'Welche bayerischen Städte haben die aktivsten Communities?',
      answer:
        'München ist das Zentrum für Tech-, Wissenschafts- und Startup-Gruppen; Nürnberg, Augsburg, Regensburg und Würzburg beherbergen starke Universitäts- und Kulturszenen; und in praktisch jeder Gemeinde tragen Vereine und Stammtische das Gemeinschaftsleben.',
    },
    {
      question: 'Ist JoinOrigin in Bayern aktiv?',
      answer:
        'Ja. JoinOrigin hat keine lokalen Büros. Die Plattform hilft Menschen überall im Freistaat, Communities zu finden oder zu gründen, und die Beschreibungen auf diesen Seiten spiegeln die echte Landschaft wider.',
    },
  ],
};

export default content;
