import type { RegionContent } from '../../types';

/**
 * Telangana region page content (EN source of truth).
 *
 * Telangana is the state that hosts Hyderabad, one of India's major
 * technology and pharmaceutical hubs. This region page covers the
 * statewide community landscape around that city.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'telangana',
  intro:
    "Telangana is the youngest state in the current India set — formed in 2014 when it split from Andhra Pradesh — and its capital, Hyderabad, is one of India's most dynamic technology and pharmaceutical hubs. The city's growth has been extraordinary: the IT corridor of HITEC City and the surrounding special economic zones employ hundreds of thousands of engineers and professionals, while the pharmaceutical and biotech industries have made Hyderabad a global centre for life sciences. The community landscape reflects this mix — developer groups, founder meetups, and life-science networks meet in coworking spaces, incubators, and corporate campuses, while the older parts of the city, with the Charminar at their centre, carry a deep culinary, cultural, and civic life rooted in the Deccan's history. Telugu is the state language, and the city's famous café and food culture makes low-pressure gatherings easy to organise. For anyone building a career in technology, research, or business in southern India, Telangana offers a fast-growing, well-organised environment where new communities form quickly and existing ones welcome fresh participation.",
  dataPoints: [
    'Telangana hosts Hyderabad, the state capital.',
    'Hyderabad is a major technology, pharmaceutical, and life-science hub.',
    'Telugu is the state language.',
    "The HITEC City IT corridor anchors the city's professional community landscape.",
  ],
  faq: [
    {
      question: 'How is the Telangana region different from the Hyderabad city scene?',
      answer:
        "This page covers the whole state. The Hyderabad city page covers the capital's specific districts, venues, and group types, including the HITEC City corridor and the historic centre.",
    },
    {
      question: 'Which communities are most active in Telangana?',
      answer:
        "Hyderabad hosts strong developer, startup, and life-science communities around HITEC City and the tech parks, alongside a lively culinary and cultural scene in the old city. The state's universities and research institutions sustain student and academic groups.",
    },
    {
      question: 'Does JoinOrigin operate in Telangana?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in the state, and the Hyderabad pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
