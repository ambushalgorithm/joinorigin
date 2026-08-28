import type { RegionContent } from '../../types';

/**
 * British Columbia region page content — EN source of truth.
 *
 * Covers Canada's westernmost province: Vancouver, the capital
 * Victoria, the interior, and the regional community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'british-columbia',
  title: 'Origins in British Columbia | JoinOrigin',
  description:
    'Find or start communities in British Columbia — startup, creative, political, meetup, and small business groups across the province. Join Origin and get discovered.',
  intro:
    'British Columbia is Canada’s westernmost province, a landscape of coast, mountains, and rainforest where community life is shaped by the outdoors and by a dense multicultural corridor along the Pacific. Vancouver, the largest city, sits between the ocean and the mountains and is known for its climate-tech, gaming, film, and clean-energy scenes, its high-density urban form, and a population drawn from across Asia and the world. The provincial capital, Victoria, on Vancouver Island, has its own slower-paced community life built around government, universities, and a strong retirement and arts culture. Beyond the coast, the interior cities of Kelowna, Kamloops, and Prince George host agricultural, forestry, and university communities, and the province’s Indigenous nations maintain distinct traditions of gathering and governance that predate everything else. Because much of the province is mountainous, transport and geography strongly shape which communities can realistically meet: many groups organize at the city or regional level rather than province-wide. For anyone organizing or joining a community in British Columbia, the reward is a place where nature, culture, and professional life intersect — and where consistency and good communication go a long way.',
  dataPoints: [
    'Provincial capital is Victoria; largest city is Vancouver.',
    'Strong climate-tech, gaming, film, and clean-energy sectors.',
    'Vancouver Island and the interior (Kelowna, Kamloops) host their own scenes.',
    'Outdoor culture — mountains, coast, and rainforest — shapes how groups gather.',
  ],
  faq: [
    {
      question: 'How do communities differ across British Columbia?',
      answer:
        'Vancouver is dense, multicultural, and professional; Victoria is more laid-back and arts-oriented; the interior is community-driven around agriculture, forestry, and universities; Indigenous nations have their own distinct traditions.',
    },
    {
      question: 'What is the best way to start a community in British Columbia?',
      answer:
        'Choose a city or region, a clear format, and a venue that works year-round — many groups mix indoor meetups with outdoor activities like hikes, beach gatherings, and ski-season events. Clear online communication between gatherings helps keep momentum.',
    },
    {
      question: 'Does JoinOrigin operate in British Columbia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Vancouver pages describe the real community landscape honestly, and the product helps people find or start communities anywhere in British Columbia.',
    },
  ],
};

export default content;
