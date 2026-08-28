import type { CountryContent } from '../../types';

/**
 * Ireland country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Irish community scene — local clubs,
 * the pub tradition, and the Dublin hub.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'ireland',
  title: 'Origins in Ireland | JoinOrigin',
  description:
    'Find or start communities in Ireland — from startup scenes in Dublin to local clubs, sports, and small business networks across the country. Join Origin and get discovered.',
  intro:
    'Ireland has a warm, small-scale community culture built on local clubs, the pub, and a strong tradition of helping neighbors. Towns across the country are anchored by sports clubs — especially the Gaelic Athletic Association, whose local branches are central to parish life — alongside music sessions, voluntary groups, and community festivals. Dublin, the capital and home to roughly a quarter of the population, hosts the country’s densest professional scenes: startup and creative communities cluster around coworking spaces, universities, and the tech companies that have made the city an international hub. Cork, Galway, and Limerick each carry lively communities of their own, often with strong ties to their universities. The country’s small size means that communities are close-knit: organizers often know each other, word travels fast, and a committed founder can build a real group within months. English is the everyday language, and the friendliness of Irish social life makes first gatherings easy. Whether you are new to Ireland or returning home, finding a group — or starting one with a simple first meetup — is a natural part of how the country works.',
  dataPoints: [
    'Population of roughly 4.85 million on the island of Ireland.',
    'English is the primary language; Irish (Gaeilge) is the official first language.',
    'Capital is Dublin; Cork, Galway, and Limerick are major regional hubs.',
    'Strong local club culture, especially around the Gaelic Athletic Association.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Ireland?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local sports clubs, community centers, and the pub are also natural starting points.',
    },
    {
      question: 'Can I start a community in an Irish town?',
      answer:
        'Yes. Irish towns have clubs, halls, and pubs that host gatherings, and the country’s word-of-mouth culture means a first meetup can grow quickly. The how-to guides cover the practical steps.',
    },
    {
      question: 'Does JoinOrigin operate in Ireland?',
      answer:
        'Yes. JoinOrigin has no local offices. The Ireland and Dublin pages are in English — the source language — and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
