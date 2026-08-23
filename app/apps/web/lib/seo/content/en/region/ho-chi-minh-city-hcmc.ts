import type { RegionContent } from '../../types';

/**
 * Ho Chi Minh City region page content (EN source of truth).
 *
 * Ho Chi Minh City is a municipality — the admin-1 region and the city
 * are the same entity. This region page covers the municipal landscape;
 * the city page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'ho-chi-minh-city-hcmc',
  intro:
    "Ho Chi Minh City is a municipality, which means the region and the city are the same administrative entity — and the page is the story of Vietnam's commercial heart and largest city. More than eight million people live within the city limits, and the greater metropolitan area extends into the surrounding provinces of Binh Duong and Dong Nai, making the region the country's engine of business, manufacturing, and innovation. The city's districts each shape its communities: District 1 and District 3 anchor the professional, startup, and expatriate scenes, with coworking spaces, cafés, and event venues clustered around the central streets; the newer eastern districts host technology parks and corporate campuses; and the historic Chinatown of District 5 and the riverside areas sustain long-established trade and family communities. Vietnamese café culture is the social glue of the region — groups of founders, developers, designers, and students meet daily over iced coffee, and a café table is the most common first venue for any new community. For anyone organising or joining a community in Vietnam, Ho Chi Minh City offers the country's most dynamic, fastest-moving environment — a place where energy, openness, and opportunity come together.",
  dataPoints: [
    "Ho Chi Minh City is a municipality and Vietnam's commercial capital.",
    'Population of more than eight million, with a larger metropolitan area.',
    'District 1 and District 3 anchor the startup, professional, and creative scenes.',
    'Vietnamese café culture makes café-based gatherings the default format.',
  ],
  faq: [
    {
      question: 'Is the Ho Chi Minh City region different from the Ho Chi Minh City city scene?',
      answer:
        'No. Ho Chi Minh City is a municipality, so the region and city overlap completely. This page covers the municipal landscape, while the Ho Chi Minh City page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which districts of Ho Chi Minh City have the most active communities?',
      answer:
        'District 1 and District 3 anchor startup, professional, and creative communities; the eastern districts host technology and corporate scenes; and District 5 and the riverside areas sustain long-established trade and family communities.',
    },
    {
      question: 'Does JoinOrigin operate in Ho Chi Minh City?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Ho Chi Minh City, and the city pages are translated into Vietnamese to serve the local audience.',
    },
  ],
};

export default content;
