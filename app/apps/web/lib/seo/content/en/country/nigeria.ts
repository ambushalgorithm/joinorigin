import type { CountryContent } from '../../types';

/**
 * Nigeria country page content (EN source of truth).
 *
 * Evergreen, honest prose about Nigeria's community landscape — Africa's
 * most populous country, where energy, hustle, and creativity meet in a
 * culture of strong associational life.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'nigeria',
  intro:
    'Nigeria is the most populous country in Africa, with roughly 196 million people, and one of the most dynamic community landscapes on the continent. English is the official language and the lingua franca of professional life, while Hausa, Yoruba, and Igbo — among hundreds of other languages — anchor vibrant regional cultures. Abuja is the federal capital, while Lagos is the commercial and cultural engine: a megacity of more than fifteen million people where finance, Nollywood, Afrobeats, and a fast-growing tech scene meet. The country’s associational culture runs deep — from the age-grade societies and market associations of traditional life to the churches, mosques, alumni networks, and professional bodies that organize daily life in every city. Universities including the University of Lagos, the University of Ibadan, and Obafemi Awolowo University feed a huge pool of students and graduates into every sector, and the startup ecosystem, centered on Yaba in Lagos, has made Nigeria one of Africa’s leading innovation hubs. For anyone looking to find or start a community, Nigeria rewards boldness, consistency, and hyper-local focus — a group built around one neighborhood or one industry can thrive in a country where people already gather constantly.',
  dataPoints: [
    'Population of roughly 196 million; the most populous country in Africa.',
    'Capital is Abuja; Lagos is the commercial and cultural engine.',
    'English is the official language; Hausa, Yoruba, and Igbo anchor regional cultures.',
    'Strong associational life: churches, mosques, alumni networks, market and age-grade societies.',
    'Lagos’s Yaba district is one of Africa’s leading innovation hubs.',
    'Major universities: University of Lagos, University of Ibadan, Obafemi Awolowo University.',
  ],
  faq: [
    {
      question: 'How do I find communities in Nigeria?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Churches, mosques, alumni networks, and coworking hubs are also strong starting points for offline groups.',
    },
    {
      question: 'Is it realistic to start a community in Nigeria?',
      answer:
        'Yes. Nigerians already organize constantly — through associations, churches, and professional bodies — so a new group with a clear purpose and a regular meeting point can grow quickly, especially when it is focused on one neighborhood or industry.',
    },
    {
      question: 'Does JoinOrigin operate in Nigeria?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in Nigeria find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
