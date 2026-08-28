import type { CountryContent } from '../../types';

/**
 * Iran country page content (EN source of truth).
 *
 * Evergreen, honest prose about Iran's community landscape — a
 * Persian culture with deep traditions of gathering, a young educated
 * population, and a resilient tech scene centered on Tehran.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'iran',
  intro:
    'Iran is a country of roughly 82 million people in West Asia, where a deep Persian cultural tradition meets one of the most resilient tech ecosystems in the Middle East. Persian (Farsi) is the national language, and the culture of hospitality and gathering — from the traditional house gatherings of the Nowruz season to the coffeehouses and parks of the capital — makes community life both familiar and warm. Tehran, the capital and largest city, concentrates universities, startups, and cultural institutions, while cities like Isfahan, Shiraz, and Mashhad carry their own distinct scenes rooted in history, art, and religion. Iranian universities, including the University of Tehran, Sharif University of Technology, and Amirkabir University, produce a large pool of engineers and graduates, and the domestic startup ecosystem — home to companies like Digikala and Snapp — has grown into one of the most active in the region. The weekend runs Thursday–Friday, which shapes when groups meet, and social life often happens in private spaces and parks as much as in public venues. For anyone looking to find or start an Origin, Iran rewards building trust through repeated gatherings and choosing a district or university circle where people already know each other.',
  dataPoints: [
    'Population of roughly 82 million in West Asia.',
    'Capital is Tehran; Isfahan, Shiraz, and Mashhad anchor distinct regional scenes.',
    'Persian (Farsi) is the national language.',
    'Weekend runs Thursday–Friday.',
    'Home to a resilient domestic startup ecosystem, including Digikala and Snapp.',
    'Major universities: University of Tehran, Sharif University of Technology, Amirkabir University.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Iran?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. University circles, parks, and coffeehouses are also strong starting points for offline groups.',
    },
    {
      question: 'Do communities in Iran mostly meet online or in person?',
      answer:
        'Both. In-person gatherings in parks, cafés, and private spaces remain important, while messaging apps and online groups are widely used to organize and stay connected — especially in a young, internet-savvy population.',
    },
    {
      question: 'Does JoinOrigin operate in Iran?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in Iran find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
