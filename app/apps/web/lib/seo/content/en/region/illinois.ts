import type { RegionContent } from '../../types';

/**
 * Illinois region page content — EN source of truth.
 *
 * Illinois is a Midwestern US state anchored by Chicago. This page
 * covers the statewide landscape; the Chicago city page covers the
 * urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'illinois',
  title: 'Communities in Illinois | JoinOrigin',
  description:
    'Find or start communities in Illinois — from Chicago’s startup and arts scenes to university and small-town networks across the state. Join Origin and get discovered.',
  intro:
    'Illinois is a Midwestern state whose community life is shaped by the contrast between Chicago and the rest of the state. Chicago, the largest city and the only content-rich city in the region, anchors the professional and creative scenes — startups, finance, design, and a famously strong neighborhood culture where block clubs, ward organizations, and local arts groups run deep. Universities such as the University of Chicago, Northwestern, and the University of Illinois at Chicago keep a steady flow of students and researchers moving through the city, while the lakefront parks and the CTA’s elevated trains make cross-neighborhood gathering practical even in winter. Outside Chicago, the state sustains its own communities: the university town of Champaign–Urbana around the University of Illinois, the state capital Springfield with its government and civic groups, and industrial and agricultural centers such as Peoria, Rockford, and Joliet where churches, chambers of commerce, and volunteer organizations provide the social fabric. Downstate Illinois has a deep tradition of county fairs, farmers markets, and small-town festivals that bring neighbors together across the seasons. Whether you are looking for a tech meetup on the North Side or a local history society in a downstate town, Illinois offers a varied landscape of communities built on Midwestern practicality and warmth.',
  dataPoints: [
    'Illinois has roughly 12.7 million residents; it is a major Midwestern state.',
    'State capital is Springfield; largest city is Chicago.',
    'University anchors: University of Chicago, Northwestern, UIUC, UIC.',
    'Chicago neighborhood culture plus strong downstate civic and small-town communities.',
  ],
  faq: [
    {
      question: 'How do Chicago and downstate Illinois differ?',
      answer:
        'Chicago is a dense, walkable, transit-connected metro with a professional and neighborhood-driven community scene. Downstate Illinois is more spread out, with communities organized around universities, state government, and small-town civic institutions.',
    },
    {
      question: 'Which Illinois cities have active communities?',
      answer:
        'Chicago has the densest scene for startup, creative, and professional groups. Champaign–Urbana and Springfield host strong university and government communities, and Peoria, Rockford, and Joliet support active local networks.',
    },
    {
      question: 'Does JoinOrigin operate in Illinois?',
      answer:
        'Yes. JoinOrigin has no local offices. The Illinois region page is in English — the source language — and the platform helps people find or start communities anywhere in the state.',
    },
  ],
};

export default content;
