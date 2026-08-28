import type { RegionContent } from '../../types';

/**
 * Gauteng region page content — EN source of truth.
 *
 * Covers the Gauteng province, South Africa's smallest but most populous
 * province and the economic heart of the country, home to Johannesburg,
 * Pretoria, and the East Rand and West Rand cities.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'gauteng',
  intro:
    'Gauteng is South Africa’s smallest but most populous province and the economic heart of the country — home to Johannesburg, the largest city in South Africa and the commercial engine of the continent, and Pretoria, the administrative capital. The province also includes the industrial East Rand, the mining West Rand, and the sprawling southern suburbs, all linked by the dense road and rail network that makes Gauteng feel like one continuous city-region. The province concentrates the institutions that shape South African public and professional life: Wits University and the University of Johannesburg feed a constant flow of students and researchers, the tech and startup ecosystem has grown steadily with hubs like Tshimologong Precinct and the coworking floors of Braamfontein and Rosebank, and landmarks like Constitution Hill and the Apartheid Museum anchor a deep history of civic organizing. Because the province is so dense, communities here tend to form around neighborhoods and industries — Sandton and Rosebank for finance and professional networks, Braamfontein and Maboneng for creative and civic life, Soweto and the southern suburbs for family and local associations. For anyone looking to find or start an Origin, Gauteng rewards joining a neighborhood first: a hyper-local group with a clear purpose can thrive in the country’s most connected province.',
  dataPoints: [
    'Gauteng is South Africa’s smallest but most populous province.',
    'Home to Johannesburg (the largest city) and Pretoria (the administrative capital).',
    'Includes the industrial East Rand and the mining West Rand.',
    'Tech hubs: Tshimologong Precinct, coworking floors in Braamfontein and Rosebank.',
    'Wits University and the University of Johannesburg anchor the student and research scene.',
    'Civic landmarks: Constitution Hill, the Apartheid Museum.',
  ],
  faq: [
    {
      question: 'Is the Gauteng region different from the Johannesburg city scene?',
      answer:
        'Yes. Gauteng also includes Pretoria, the East Rand, the West Rand, and the southern suburbs. This page covers the province-wide landscape, while the Johannesburg city page dives into specific neighborhoods, venues, and group types.',
    },
    {
      question: 'Which parts of Gauteng have the most active communities?',
      answer:
        'Johannesburg’s Sandton and Rosebank anchor professional networks, Braamfontein and Maboneng host creative and civic groups, Pretoria has strong public-sector and academic communities, and the townships and suburbs hold deep local associational life.',
    },
    {
      question: 'Does JoinOrigin operate in Gauteng?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the province find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
