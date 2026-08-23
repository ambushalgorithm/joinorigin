import type { CountryContent } from '../../types';

/**
 * Turkey country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Turkish community scene — çay
 * culture, the mahalle, the esnaf tradition, and the modern startup hubs.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'turkey',
  intro:
    "Turkey's community life is built on hospitality and the mahalle — the neighbourhood — where shopkeepers, tea houses, and family networks keep daily life connected. The çay ritual is the social glue: tea is served at every shop, office, and gathering, and an invitation for tea is how strangers become regulars. In the cities, this tradition meets a modern scene: university campuses in Istanbul, Ankara, and İzmir host dense student communities; a booming e-commerce, fintech, and gaming sector has made Istanbul a regional startup capital; and the esnaf culture of bazaars and neighbourhood shops keeps small-business communities strong. Regional festivals, charitable networks, and family gatherings tie the country together across its regions, while volunteer groups and foundations are active in social aid and disaster response. Newcomers who embrace the çay ritual, learn a few words of Turkish, and show up consistently will find doors open widely — hospitality is not just a cliché here, it is the operating system of community life.",
  dataPoints: [
    'Population of roughly 82 million; the capital is Ankara.',
    'Turkish is the primary language, with Kurdish and other regional languages spoken.',
    'Çay culture — tea gardens and street tea shops anchor daily community life.',
    'Bazaar and esnaf tradition — the Grand Bazaar and neighbourhood shops run on personal trust.',
    'A regional startup capital — e-commerce, fintech, and gaming are strengths.',
    'Universities include Boğaziçi, Istanbul University, ITU, and Ankara University.',
  ],
  faq: [
    {
      question: 'How do I find communities in Turkey?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Tea houses, university clubs, and local foundations are also good starting points for offline groups.',
    },
    {
      question: 'What is the esnaf tradition and how does it shape communities?',
      answer:
        'Esnaf refers to the tradespeople and small shopkeepers who run bazaars and neighbourhood shops on personal trust. Esnaf networks form natural small-business communities — a shared street, market, or trade ties owners together, and they are among the most accessible groups to join or start.',
    },
    {
      question: 'Does JoinOrigin operate in Turkey?',
      answer:
        'Yes. JoinOrigin has no local offices. The Istanbul pages are available in Turkish, and the product helps people find or start communities anywhere in Turkey.',
    },
  ],
};

export default content;
