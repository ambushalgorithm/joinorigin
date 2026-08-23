import type { CountryContent } from '../../types';

/**
 * United Arab Emirates country page content (EN source of truth).
 *
 * Evergreen, honest prose about the UAE's community landscape — a
 * seven-emirate federation whose expatriate majority makes community
 * building open, fast, and surprisingly easy to start.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'united-arab-emirates',
  intro:
    'The United Arab Emirates is a federation of seven emirates along the Arabian Gulf — Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah — with Abu Dhabi as the federal capital and Dubai as the region’s most international city. Around nine and a half million people live in the country, and the large majority are expatriates from South Asia, Europe, Africa, the Middle East, and beyond, which makes community life here remarkably open: nearly everyone is new and looking to connect. Arabic is the official language while English serves as the working language of business, and the weekend runs Friday–Saturday. The economy is organized around free zones and global industries — DIFC for finance, DMCC for commodities, and Internet City and Media City for technology and media — each of which creates natural meeting places for professionals. Cultural anchors like Alserkal Avenue in Dubai and the Louvre Abu Dhabi on Saadiyat Island give the creative scene real venues, while malls, parks, beaches, and the long tradition of majlis hospitality host family and social life across all seven emirates. For anyone looking to find or start a community, the UAE rewards choosing an emirate and a district, then committing to a regular rhythm that the country’s dense, international population will amplify.',
  dataPoints: [
    'Federation of seven emirates with Abu Dhabi as the federal capital.',
    'Population of roughly nine and a half million; a large majority are expatriates.',
    'Arabic is the official language; English is the working language of business.',
    'Weekend runs Friday–Saturday.',
    'Free zones anchor the economy: DIFC, DMCC, Internet City, Media City.',
    'Cultural anchors include Alserkal Avenue in Dubai and Louvre Abu Dhabi.',
  ],
  faq: [
    {
      question: 'How do I find communities in the United Arab Emirates?',
      answer:
        'Use the /location hub to pick an emirate or city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. District cafés, free-zone event floors, and community centers are also reliable starting points for offline groups.',
    },
    {
      question: 'Do I need to speak Arabic to join a community?',
      answer:
        'No. English is the working language of business and most international groups in the UAE run in English, while Arabic remains the language of many local and Emirati gatherings. Learning a little Arabic opens doors, but it is not a barrier to joining.',
    },
    {
      question: 'Does JoinOrigin operate in the United Arab Emirates?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the UAE find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
