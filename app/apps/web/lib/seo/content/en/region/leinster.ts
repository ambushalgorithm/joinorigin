import type { RegionContent } from '../../types';

/**
 * Leinster region page content — EN source of truth.
 *
 * Leinster is the eastern province of Ireland, home to Dublin and the
 * densest concentration of the country's population and community life.
 * This page covers the provincial landscape; the Dublin city page covers
 * the capital.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'leinster',
  title: 'Communities in Leinster | JoinOrigin',
  description:
    'Find or start communities in Leinster — from Dublin’s startup scenes to local clubs and associations across the province. Join Origin and get discovered.',
  intro:
    'Leinster is Ireland’s eastern province and by far its most populous, anchored by Dublin, the capital. Roughly half of Ireland’s people live in the province, and the Greater Dublin Area concentrates the country’s professional, creative, and international communities: startups, tech companies, universities, and coworking spaces cluster in the capital and its suburbs. Beyond Dublin, the province’s towns and counties — from Kilkenny and Wexford in the south to Meath and Louth in the north — sustain lively local communities organized around sports clubs, the GAA, community centers, and the strong Irish tradition of volunteering and local festivals. The province’s small scale means communities are close-knit: organizers often know each other, and a committed founder can build a real group quickly. Public transport and the motorway network tie the province together, so a community anchored in Dublin can draw members from across Leinster. English is the everyday language, and the friendliness of Irish social life makes first gatherings easy. Whether you are looking for a startup meetup in Dublin, a sports club in a county town, or a small business network, Leinster offers a rich, welcoming landscape.',
  dataPoints: [
    'Leinster is home to roughly 2.8 million residents, about half of Ireland’s population.',
    'Contains Dublin, the capital, and 11 other counties.',
    'English is the primary language; Irish is the official first language.',
    'Strong GAA club and local festival culture.',
  ],
  faq: [
    {
      question: 'Is Leinster different from the Dublin city scene?',
      answer:
        'Yes. Leinster is the wider province — Dublin plus eleven counties. Most national communities meet in the capital, but the counties host strong local scenes tied to sports clubs, community centers, and festivals.',
    },
    {
      question: 'Which parts of Leinster have active communities?',
      answer:
        'Dublin and its suburbs are the densest hub for professional and creative groups; county towns like Kilkenny, Wexford, and Drogheda have active local communities organized around the GAA, community centers, and festivals.',
    },
    {
      question: 'Does JoinOrigin operate in Leinster?',
      answer:
        'Yes. JoinOrigin has no local offices. The Leinster region page is in English — the source language — and the platform helps people find or start communities anywhere in the province.',
    },
  ],
};

export default content;
