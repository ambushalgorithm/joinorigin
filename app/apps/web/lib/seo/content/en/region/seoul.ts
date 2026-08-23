import type { RegionContent } from '../../types';

/**
 * Seoul region page content (EN source of truth).
 *
 * Seoul is a special city — the admin-1 region and the city are the same
 * entity. This region page covers the metropolitan landscape; the city
 * page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'seoul',
  intro:
    "Seoul is a special city, which means the region and the city are the same administrative entity — and the page is the story of South Korea's undisputed political, economic, and cultural centre. Nearly ten million people live within the city limits, and the wider Seoul Capital Area, including Incheon and the satellite cities of Gyeonggi-do, holds more than half of the country's population. The city's districts each shape its communities: Gangnam and the tech corridors of Pangyo anchor startups, finance, and media; Hongdae sustains music, design, and creative scenes around its universities; Yongsan and the former military districts host emerging tech communities; and the residential wards of the north run neighbourhood associations and family-oriented groups. Communication in Seoul runs heavily through messaging apps and online communities, where organisers build attendance and keep members connected between in-person events. The subway makes cross-city gatherings practical, and the city's cafés, coworking spaces, parks, and university campuses provide abundant venues. For anyone organising or joining a community in South Korea, Seoul offers the country's densest and most connected environment — a place where a new group can find its audience quickly.",
  dataPoints: [
    "Seoul is a special city and South Korea's capital.",
    'Population of nearly ten million, with a much larger Seoul Capital Area.',
    'Gangnam and Pangyo anchor the startup and tech scene.',
    'The subway network makes cross-city attendance practical.',
  ],
  faq: [
    {
      question: 'Is the Seoul region different from the Seoul city scene?',
      answer:
        'No. Seoul is a special city, so the region and city overlap completely. This page covers the metropolitan landscape, while the Seoul city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Seoul districts have the most active communities?',
      answer:
        'Gangnam and Pangyo anchor startup, finance, and tech communities; Hongdae hosts music, design, and creative scenes; and the residential wards of the north sustain neighbourhood and family-oriented groups.',
    },
    {
      question: 'Does JoinOrigin operate in Seoul?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Seoul, and the Seoul pages are translated into Korean to serve the local audience.',
    },
  ],
};

export default content;
