import type { RegionContent } from '../../types';

/**
 * Central and Western region page content (EN source of truth).
 *
 * Central and Western is the historic core of Hong Kong Island and the
 * region that hosts the Hong Kong city page — the territory's
 * professional, financial, and administrative heart.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'central-and-western',
  intro:
    "Central and Western is the historic heart of Hong Kong Island and, in many ways, the origin of the territory's community life. The district runs from the waterfront of Central — the global financial centre with its towers along the harbour — through Sheung Wan, Sai Ying Pun, and Kennedy Town, and up to the quieter residential slopes of the Mid-Levels and the Peak. Because the Hong Kong city page lives in this region, the district's professional scene is the anchor of the territory's community landscape: banking, legal, and professional networks meet in Central's clubs and towers, while Sheung Wan and Sai Ying Pun host a dense mix of startup studios, design offices, and creative collectives in converted shophouses and coworking spaces. The district also has a strong civic layer — the temples of Sheung Wan, the neighbourhood associations of the older streets, and the volunteer groups that run along the waterfront promenades all draw regular participants. The MTR and trams make every part of the district minutes apart, so a group can gather at lunch in Central, after work in Sheung Wan, or on a weekend at the Peak without much planning. For newcomers to Hong Kong, Central and Western is usually the easiest place to start building a professional and social network.",
  dataPoints: [
    "The historic core of Hong Kong Island and the territory's financial centre.",
    'Hosts the Hong Kong content-rich city page.',
    'Districts include Central, Sheung Wan, Sai Ying Pun, Kennedy Town, and the Mid-Levels.',
    'Well served by the MTR, trams, and ferries.',
  ],
  faq: [
    {
      question: 'Is the Central and Western region the same as the Hong Kong city scene?',
      answer:
        'Central and Western is one district of Hong Kong Island and the region that hosts the Hong Kong city page. This page covers the district landscape; the city page covers the territory-level scene across the island, Kowloon, and the New Territories.',
    },
    {
      question: 'Which parts of Central and Western have the most active communities?',
      answer:
        'Central anchors professional and financial networks; Sheung Wan and Sai Ying Pun host startup, design, and creative communities; the Mid-Levels and the Peak have quieter neighbourhood and family-oriented groups.',
    },
    {
      question: 'Does JoinOrigin operate in Central and Western?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Hong Kong, and the Hong Kong pages are translated into Traditional Chinese to serve the local audience.',
    },
  ],
};

export default content;
