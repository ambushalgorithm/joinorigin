import type { RegionContent } from '../../types';

/**
 * Kyiv City region page content — EN source of truth.
 *
 * Kyiv is a special-status municipality — a city and a region in its own
 * right. This region page covers the citywide landscape; the Kyiv city
 * page dives into districts, venues, and group types.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'kyiv-city',
  intro:
    "Kyiv City is a special-status municipality — the capital of Ukraine and a region in its own right, so the city and the region are the same entity. This makes the community landscape unusually concentrated: much of the country's civic, tech, and creative life happens within one dense city. The Dnipro river divides the city into left and right banks, each with its own character, and the parks, embankments, and beaches along the water — from Mariinskyi Park to Hydropark — host the city's outdoor and social life. Volunteer networks and community kitchens are woven into daily life, and the city's famous café culture keeps conversations flowing between them. Universities such as Taras Shevchenko University, KPI, and the Kyiv-Mohyla Academy feed a constant stream of students, while the innovation park Unit.City anchors a startup scene that draws on one of Europe's largest IT talent pools. Gatherings follow official safety guidance, and the habit of checking on neighbours is second nature. For anyone organizing a community, Kyiv City offers the density of a capital with the warmth of a neighbourhood.",
  dataPoints: [
    'Kyiv City is a special-status municipality — the capital and a region in its own right.',
    'Roughly 2.9 million residents; the Dnipro river divides the left and right banks.',
    'Universities include Taras Shevchenko University, KPI, and the Kyiv-Mohyla Academy.',
    "One of Europe's largest IT talent pools, anchored by Unit.City and the tech sector.",
    'Public anchors: the Dnipro embankments, Mariinskyi Park, Hydropark, and Podil.',
    'A strong volunteer and civil-society culture built over the last decade.',
  ],
  faq: [
    {
      question: 'Is the Kyiv City region different from the Kyiv city scene?',
      answer:
        'Kyiv City is both a city and a special-status region, so the two overlap completely. This page covers the citywide landscape, while the Kyiv city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which districts have the most active communities?',
      answer:
        'Podil and the old centre anchor creative and café life, the left-bank districts around Unit.City host much of the tech scene, and parks and embankments along the Dnipro support outdoor and volunteer communities across the city.',
    },
    {
      question: 'Does JoinOrigin have a presence in Kyiv City?',
      answer:
        'Yes. JoinOrigin has no local offices. The Kyiv pages are available in Ukrainian and English, and the product helps people find or start communities anywhere in the city.',
    },
  ],
};

export default content;
