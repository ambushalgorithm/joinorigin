import type { CountryContent } from '../../types';

/**
 * South Africa country page content (EN source of truth).
 *
 * Evergreen, honest prose about South Africa's community landscape — a
 * country of eleven official languages, three capitals, and a deep
 * history of civic organizing that still shapes how people come together.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'south-africa',
  intro:
    'South Africa is a country of roughly 58 million people with eleven official languages and a history of civic organizing that is woven into its identity. The country has three capitals — Pretoria as the administrative and executive seat, Cape Town as the legislative capital, and Bloemfontein as the judicial seat — while Johannesburg is the largest city and the economic heart of the continent. Community life runs through a dense network of churches, schools, sports clubs, stokvels (community savings clubs), and neighborhood associations, alongside a mature creative and tech scene concentrated in Johannesburg and Cape Town. Universities including Wits, the University of Cape Town, Stellenbosch, and the University of Pretoria supply a constant flow of students and researchers, and the startup ecosystems of Gauteng and the Western Cape — with hubs like Tshimologong Precinct and the Silicon Cape community — have grown steadily. English is the most widely used language in public life, while isiZulu, isiXhosa, Afrikaans, and other languages anchor regional communities. For anyone looking to find or start an Origin, South Africa rewards joining a neighborhood first: the country is too diverse for generic groups, but a hyper-local one with a clear purpose can thrive.',
  dataPoints: [
    'Population of roughly 58 million with eleven official languages.',
    'Three capitals: Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial).',
    'Johannesburg is the largest city and the economic heart of the continent.',
    'Strong associational life: churches, stokvels, sports clubs, neighborhood associations.',
    'Tech hubs include Tshimologong Precinct (Johannesburg) and Silicon Cape (Cape Town).',
    'Major universities: Wits, University of Cape Town, Stellenbosch, University of Pretoria.',
  ],
  faq: [
    {
      question: 'How do I find Origins in South Africa?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Churches, stokvels, sports clubs, and coworking spaces are also reliable starting points for offline groups.',
    },
    {
      question: 'What is a stokvel and why does it matter for communities?',
      answer:
        'A stokvel is a community savings and investment club run by its members with clear rules, common throughout South Africa. Stokvels demonstrate a strong national habit of self-organized, trust-based groups that new communities can learn from.',
    },
    {
      question: 'Does JoinOrigin operate in South Africa?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in South Africa find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
