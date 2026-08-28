import type { RegionContent } from '../../types';

/**
 * Tehran region page content — EN source of truth.
 *
 * Covers Tehran Province, the political, economic, and cultural heart
 * of Iran. The province is dominated by the capital city of the same
 * name; the city page covers the urban districts, this page the
 * province-wide landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'tehran',
  intro:
    'Tehran Province is the political, economic, and cultural heart of Iran — the seat of the national government, the headquarters of most major companies, and the home of the capital city of the same name, with a metro population of more than seven million. The province stretches from the foothills of the Alborz mountains in the north — where Tochal, Darband, and Darakeh draw hikers and climbers every week — across the dense urban center to the southern plains, and it concentrates the institutions that shape Iranian community life: the University of Tehran, Sharif University of Technology, and Amirkabir University feed a vast pool of students and engineers; the coffeehouse culture of central Tehran anchors social life; and the domestic startup ecosystem, home to companies like Digikala and Snapp, is one of the most active in the Middle East. Because the province is dense and its districts distinct — the greener north, the commercial center along Valiasr Street, the bazaar-rooted south — communities tend to form around districts and universities. The weekend runs Thursday–Friday. For anyone looking to find or start an Origin, the province rewards building trust through repeated gatherings and choosing a circle where people already know each other.',
  dataPoints: [
    'Tehran Province is the seat of government and the economic heart of Iran.',
    'Alborz mountain foothills — Tochal, Darband, Darakeh — anchor the northern edge.',
    'Metro population of the capital exceeds seven million.',
    'Home to the University of Tehran, Sharif University of Technology, and Amirkabir University.',
    'Domestic startup ecosystem includes Digikala and Snapp.',
    'Weekend runs Thursday–Friday.',
  ],
  faq: [
    {
      question: 'Is the Tehran region different from the Tehran city scene?',
      answer:
        'Tehran Province and the city of Tehran overlap heavily, since the city dominates the province. This page covers the province-wide landscape, while the Tehran city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Where do communities in the province tend to gather?',
      answer:
        'Parks and hiking trails in the northern foothills, coffeehouses along Valiasr Street and in the center, and university campuses host many gatherings. Private spaces and messaging apps also play a large role in organizing.',
    },
    {
      question: 'Does JoinOrigin operate in Tehran?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the province find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
