import type { RegionContent } from '../../types';

/**
 * Quebec region page content — EN source of truth.
 *
 * Covers Canada's francophone province: Montreal, Quebec City, the
 * regions, and the province-wide community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'quebec',
  title: 'Communities in Quebec | JoinOrigin',
  description:
    'Find or start communities in Quebec — startup, creative, political, meetup, and small business groups across the province. Join Origin and get discovered.',
  intro:
    'Quebec is Canada’s francophone province and one of the most culturally distinct regions in North America. Montreal, the largest city, is a bilingual metropolis known for its AI research scene — anchored by Mila and McGill University — its vibrant festival culture, a storied film and music industry, and a startup ecosystem that has grown rapidly around machine learning and creative industries. Quebec City, the provincial capital, is smaller, historic, and civic-minded, with a strong public-service and university community. Beyond the two cities, the province stretches across the St. Lawrence corridor into the Gaspé, the Laurentians, and the north, where francophone culture, agriculture, and outdoor life shape how communities form. French is the working language of most communities, with English widely understood in Montreal; successful groups in Quebec typically operate bilingually or in French by default. The province also has a distinctive civic culture — strong unions, cooperatives, and community organizations — and a calendar built around festivals, winter sports, and outdoor gatherings. For anyone organizing or joining a community in Quebec, the reward is a rich, distinct culture that rewards authenticity and clear language.',
  dataPoints: [
    'Provincial capital is Quebec City; largest city is Montreal.',
    'French is the primary language; English is widely spoken in Montreal.',
    'Montreal anchors AI research (Mila), festivals, and a growing startup scene.',
    'Strong cooperative, union, and civic-organization culture.',
  ],
  faq: [
    {
      question: 'How do communities differ across Quebec?',
      answer:
        'Montreal is bilingual, festival-driven, and professional; Quebec City is historic and civic; the regions are francophone and community-oriented around agriculture, outdoor life, and local culture. Language choice shapes every group.',
    },
    {
      question: 'What is the best way to start a community in Quebec?',
      answer:
        'Decide on the working language early — French, English, or bilingual — and choose a venue that matches the season: festivals and patios in summer, indoor spaces and winter sports in winter. Consistency and authenticity matter to Quebecers.',
    },
    {
      question: 'Does JoinOrigin operate in Quebec?',
      answer:
        'Yes. JoinOrigin has no local offices. The Montreal pages describe the real community landscape honestly, and the product helps people find or start communities anywhere in Quebec.',
    },
  ],
};

export default content;
