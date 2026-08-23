import type { RegionContent } from '../../types';

/**
 * Bavaria region page content — EN source of truth.
 *
 * Bavaria is Germany's largest state by area and the home of Munich.
 * This page covers the statewide landscape; the Munich city page covers
 * the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'bavaria',
  title: 'Communities in Bavaria | JoinOrigin',
  description:
    'Find or start communities in Bavaria — from Munich’s tech and startup scenes to Vereine, beer gardens, and alpine clubs across the state. Join Origin and get discovered.',
  intro:
    'Bavaria is Germany’s largest state by area and one of its most distinctive, combining a deep tradition of organized community life with a modern economy built around engineering and technology. Munich, the state capital and only content-rich city in the region, anchors the professional scene — startups, corporate innovation, and a dense network of tech meetups around UnternehmerTUM, the Werksviertel, and the universities — while the rest of the state sustains its own strong communities. The Verein remains the backbone of Bavarian social life: sports clubs, music associations, volunteer fire brigades, and the Alpine clubs that organize hiking and ski trips across the Bavarian Alps. Beer gardens and the Stammtisch, a regular table at a local pub, are the informal engines where neighbors, colleagues, and hobbyists keep in touch. Cities such as Nuremberg, Augsburg, Regensburg, and Erlangen each carry their own identity — from Franconian craft and history to dense university and research campuses. Between the cities, towns and villages gather around markets, church festivals, and volunteer associations that have held communities together for generations. Whether you are looking for a founder group in Munich or a local hiking club in the countryside, Bavaria offers a rich, structured landscape for finding or starting a community.',
  dataPoints: [
    'Bavaria is Germany’s largest state by area, with roughly 13 million residents.',
    'State capital is Munich; Nuremberg, Augsburg, and Regensburg are major hubs.',
    'Strong Verein (club) and beer-garden culture statewide.',
    'Home to the Bavarian Alps and a dense network of alpine and hiking clubs.',
  ],
  faq: [
    {
      question: 'Is Bavaria different from the rest of Germany?',
      answer:
        'Yes, in several ways: Bavaria has a strong regional identity, its own dialect, and a particularly deep tradition of Vereine, beer gardens, and church festivals. Many communities operate in German, and international groups in Munich often use English.',
    },
    {
      question: 'Which Bavarian cities have active communities?',
      answer:
        'Munich is the densest hub for tech, startup, and professional groups. Nuremberg, Erlangen, Augsburg, and Regensburg host strong university and industry scenes, while towns across the state are organized around Vereine and local festivals.',
    },
    {
      question: 'Does JoinOrigin operate in Bavaria?',
      answer:
        'Yes. JoinOrigin has no local offices. The Munich pages are translated into German, and the platform helps people find or start communities anywhere in Bavaria.',
    },
  ],
};

export default content;
