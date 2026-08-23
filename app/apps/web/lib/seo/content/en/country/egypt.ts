import type { CountryContent } from '../../types';

/**
 * Egypt country page content (EN source of truth).
 *
 * Evergreen, honest prose about Egypt's community landscape — a
 * civilization-scale history, a young population, and a cafe-driven
 * social culture that makes meeting people part of daily life.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'egypt',
  intro:
    'Egypt is the most populous country in the Arab world and one of the most historically layered places on earth, with a population of roughly 98 million concentrated along the Nile. Cairo, the capital, is a megacity of more than twenty million people, while Alexandria anchors the Mediterranean coast and cities like Giza, Aswan, and Luxor carry deep histories of their own. Arabic is the national language and English is widely used in business and education, which makes international groups common in the major cities. Community life runs through the ahwa — the traditional coffeehouse culture that has organized Egyptian social life for centuries — alongside a young, fast-growing professional scene: the Egyptian startup ecosystem is one of the most active in Africa and the Middle East, with universities like Cairo University and the American University in Cairo feeding a constant flow of students and graduates. Friday is the main day of rest, and the week runs Sunday–Thursday for many institutions. For anyone looking to find or start a community, Egypt rewards patience and relationships: choosing a district, sitting with people over tea, and committing to a regular rhythm will always outlast a one-off event.',
  dataPoints: [
    'Population of roughly 98 million; the most populous country in the Arab world.',
    'Capital is Cairo; Alexandria anchors the Mediterranean coast.',
    'Arabic is the national language; English is widely used in business and education.',
    'Ahwa (coffeehouse) culture is the traditional heart of social life.',
    'Home to one of the most active startup ecosystems in Africa and the Middle East.',
    'Major universities: Cairo University, American University in Cairo, Ain Shams University.',
  ],
  faq: [
    {
      question: 'How do I find communities in Egypt?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Ahwa cafés, university campuses, and cultural centers are also strong starting points for offline groups.',
    },
    {
      question: 'What is the ahwa and why does it matter for communities?',
      answer:
        'The ahwa is the traditional Egyptian coffeehouse — a place where people gather for tea, conversation, and games. Many communities in Egypt naturally form around a regular ahwa table, which gives any new group a familiar, low-cost venue.',
    },
    {
      question: 'Does JoinOrigin operate in Egypt?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in Egypt find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
