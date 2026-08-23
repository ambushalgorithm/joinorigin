import type { RegionContent } from '../../types';

/**
 * Bangkok region page content (EN source of truth).
 *
 * Bangkok is a special administrative area — the admin-1 region and the
 * city are the same entity. This region page covers the metropolitan
 * landscape; the city page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'bangkok',
  intro:
    "Bangkok is a special administrative area, which means the region and the city are the same administrative entity — and the page is the story of Thailand's capital and by far its largest city. More than eight million people live within the city limits, and the greater metropolitan area extends well beyond, making Bangkok the undisputed centre of the country's professional, creative, and political life. The city's districts each shape its communities: Sukhumvit and the central business areas anchor international business, startups, and expatriate networks; Siam and the surrounding malls host retail, media, and youth culture; the riverside and Rattanakosin areas sustain heritage, temple, and tourism-related communities; and the residential districts of the north and east run neighbourhood and family-oriented groups. Community coordination in Bangkok leans heavily on messaging apps and social media, and the city's famous food culture makes casual gatherings — over a shared meal at a market or street-side restaurant — the most natural format. The BTS Skytrain and MRT make cross-city attendance practical, and the city's cafés, coworking spaces, universities, and parks provide abundant venues. For anyone organising or joining a community in Thailand, Bangkok offers the country's densest, most international, and most welcoming environment.",
  dataPoints: [
    "Bangkok is a special administrative area and Thailand's capital.",
    'Population of more than eight million, with a much larger metropolitan area.',
    'Sukhumvit and the central business areas anchor international and startup scenes.',
    'The BTS Skytrain and MRT connect most districts.',
  ],
  faq: [
    {
      question: 'Is the Bangkok region different from the Bangkok city scene?',
      answer:
        'No. Bangkok is a special administrative area, so the region and city overlap completely. This page covers the metropolitan landscape, while the Bangkok city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Bangkok districts have the most active communities?',
      answer:
        'Sukhumvit and the central business areas anchor international business and startup communities; Siam hosts retail, media, and youth culture; and the riverside and residential districts sustain heritage, neighbourhood, and family-oriented groups.',
    },
    {
      question: 'Does JoinOrigin operate in Bangkok?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Bangkok, and the Bangkok pages are translated into Thai to serve the local audience.',
    },
  ],
};

export default content;
