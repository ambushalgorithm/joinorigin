import type { RegionContent } from '../../types';

/**
 * Nairobi region page content — EN source of truth.
 *
 * Covers Nairobi County, the capital county of Kenya and the economic
 * heart of East Africa. The county and the city of Nairobi are the same
 * entity; this page covers the county-wide landscape, the city page the
 * urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'nairobi-county',
  intro:
    'Nairobi County is the capital of Kenya and the economic heart of East Africa — a compact county where the city and the county are the same entity, which makes its community landscape unusually concentrated. The county is home to roughly 4.4 million people and anchors the Silicon Savannah: M-Pesa built a mobile-money culture that shaped fintech across the continent, and hubs around Westlands, Kilimani, and the Nairobi CBD host thousands of founders, engineers, and creatives. Because everything fits inside one county, communities built around a neighborhood, an industry, or a hobby rarely fragment across long distances — a founder breakfast in Westlands and a chama meeting in South B are a short ride apart. The county is also the seat of national government and home to the University of Nairobi, Strathmore University, and JKUAT, which keep a constant flow of students and graduates in the scene. Public anchors like Karura Forest, Uhuru Park, and the city’s cafés and coworking spaces give groups real places to meet. For anyone organizing or joining a community, Nairobi County offers density, youth, and a strong national habit of self-organized mutual aid to build on.',
  dataPoints: [
    'Nairobi County is the capital of Kenya and the city-county covers roughly 4.4 million people.',
    'Anchors the Silicon Savannah tech ecosystem built on the mobile-money culture of M-Pesa.',
    'Hubs cluster around Westlands, Kilimani, and the Nairobi CBD.',
    'Seat of national government; home to the University of Nairobi, Strathmore, and JKUAT.',
    'Public anchors: Karura Forest, Uhuru Park, and a dense network of cafés and coworking spaces.',
  ],
  faq: [
    {
      question: 'Is Nairobi County different from the Nairobi city scene?',
      answer:
        'Nairobi County and the city of Nairobi are the same entity — the county is a city-county. This page covers the county-wide landscape, while the Nairobi city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which parts of the county have the most active communities?',
      answer:
        'Westlands and Kilimani anchor the tech and startup scene, the CBD hosts professional and political groups, and the suburbs and neighborhoods south and east of the center are strong for chamas, churches, and local associations.',
    },
    {
      question: 'Does JoinOrigin operate in Nairobi?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the county find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
