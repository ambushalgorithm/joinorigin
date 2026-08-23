import type { CountryContent } from '../../types';

/**
 * Kenya country page content (EN source of truth).
 *
 * Evergreen, honest prose about Kenya's community landscape — a young,
 * multilingual population, a strong tradition of self-organized mutual
 * aid, and a tech economy that made Nairobi famous as the Silicon
 * Savannah.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'kenya',
  intro:
    'Kenya is an East African country of roughly 51 million people, where a young, multilingual population meets a strong tradition of self-organized mutual aid. English and Swahili are the official languages, and community life runs through visible, practical institutions: chamas — the rotating savings groups that have long organized families, coworkers, and neighbors — are a national habit of trust and discipline that any new community can build on. Nairobi, the capital, is the economic and tech heart, home to the mobile-money culture that M-Pesa created and the hubs of the Silicon Savannah, while Mombasa anchors the coast and cities like Kisumu, Nakuru, and Eldoret carry strong regional scenes. The country’s universities, including the University of Nairobi, Strathmore University, and JKUAT, feed a steady stream of graduates into every sector, and community organizing is deeply embedded in civic life, from neighborhood associations to the harambee tradition of pulling resources together for a shared goal. For anyone looking to find or start a community, Kenya rewards specificity, consistency, and meeting people where they already are — a regular meeting at a familiar place grows quickly in a culture that already knows how to show up for each other.',
  dataPoints: [
    'Population of roughly 51 million in East Africa.',
    'Capital is Nairobi; Mombasa anchors the coast.',
    'English and Swahili are the official languages.',
    'Chama culture — rotating savings groups — is a national tradition of self-organization.',
    'Home to the Silicon Savannah tech ecosystem, built on the mobile-money culture of M-Pesa.',
    'Major universities: University of Nairobi, Strathmore University, JKUAT.',
  ],
  faq: [
    {
      question: 'How do I find communities in Kenya?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Chamas, churches, sports clubs, and coworking spaces are also reliable starting points for offline groups.',
    },
    {
      question: 'What is a chama and how do communities relate to it?',
      answer:
        'A chama is a rotating savings and investment group that members run with clear rules and mutual accountability. Chamas show how deeply Kenyans trust small groups of peers, and many professional and social communities borrow the same disciplined, regular rhythm.',
    },
    {
      question: 'Does JoinOrigin operate in Kenya?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in Kenya find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
