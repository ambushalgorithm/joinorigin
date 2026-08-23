import type { RegionContent } from '../../types';

/**
 * Osaka region page content (EN source of truth).
 *
 * Osaka Prefecture hosts the Osaka city page — the commercial heart of
 * the Kansai region. Covers the prefectural landscape around the city's
 * dense mercantile and food culture.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'osaka',
  intro:
    "Osaka Prefecture is the compact but enormously energetic home of Osaka city, the commercial heart of Japan's Kansai region. With more than eight million people across the prefecture and its surrounding urban area, Osaka runs on a culture that is famously direct, friendly, and food-obsessed — traits that shape how its communities form and grow. The city's districts each carry a distinct community identity: Umeda and the business districts anchor corporate and professional networks, Namba and Dotonbori host the entertainment, food, and nightlife scenes, and the residential wards of the east and south sustain neighbourhood associations and family-oriented groups. Osaka's mercantile history gives its professional community a practical, deal-making flavour, and the city's many universities — Osaka University, Kansai University, and others — keep a steady flow of students and young organisers in the mix. Because Kyoto, Kobe, and Nara are all within an hour by rail, communities in Osaka regularly draw members from across Kansai. For anyone organising or joining a community in western Japan, Osaka offers the energy of a great commercial city with a warmth that makes first gatherings feel approachable.",
  dataPoints: [
    'Osaka Prefecture hosts Osaka, the commercial heart of Kansai.',
    'Population of more than eight million across the prefecture and urban area.',
    'Culture is famously direct, friendly, and food-centred.',
    'Universities including Osaka University and Kansai University feed the local scene.',
  ],
  faq: [
    {
      question: 'Is the Osaka region different from the Osaka city scene?',
      answer:
        'This page covers Osaka Prefecture as a whole. The Osaka city page dives into the specific districts, venues, and group types of the prefectural capital.',
    },
    {
      question: 'Which Osaka districts have the most active communities?',
      answer:
        'Umeda and the business districts anchor professional networks; Namba and Dotonbori host entertainment, food, and nightlife communities; the residential wards sustain neighbourhood associations and family-oriented groups.',
    },
    {
      question: 'Does JoinOrigin operate in Osaka?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Osaka, and the Osaka pages are translated into Japanese to serve the local audience.',
    },
  ],
};

export default content;
