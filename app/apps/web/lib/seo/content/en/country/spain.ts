import type { CountryContent } from '../../types';

/**
 * Spain country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Spanish community scene — terrace
 * culture, asociaciones de vecinos, and the Madrid/Barcelona hubs.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'spain',
  title: 'Origins in Spain | JoinOrigin',
  description:
    'Find or start communities in Spain — from startup scenes in Madrid and Barcelona to neighborhood associations and small business networks. Join Origin and get discovered.',
  intro:
    'Spain combines a strong tradition of public social life with a rapidly maturing professional scene. The day often begins and ends outdoors — café terraces, plazas, and bars that fill late — which makes gathering feel natural rather than organized. Neighborhood associations (asociaciones de vecinos) have deep roots in Spanish civic life, while regional identities from Catalonia to Andalusia shape how each city organizes. Madrid and Barcelona anchor the country’s startup and creative scenes, hosting coworking spaces, university programs, and a growing community of founders who connect across Spanish and English. Universities such as the Complutense and Pompeu Fabra feed a steady stream of students into city life, and the country’s late-night rhythm means a weekly meetup can start at nine in the evening without anyone blinking. Immigrant communities from Latin America and elsewhere add layers of mutual-aid groups, cultural associations, and food communities. Whether you are looking for a tech meetup, a neighborhood assembly, a hiking club, or a small business network, most Spanish cities offer a path in — and starting something new is realistic because venues and curiosity are both abundant.',
  dataPoints: [
    'Population of roughly 46.7 million across 17 autonomous communities.',
    'Spanish is the primary language, with Catalan, Galician, and Basque co-official in their regions.',
    'Capital is Madrid; Barcelona is the second major hub.',
    'Strong terrace, plaza, and late-evening gathering culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Spain?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local asociaciones de vecinos and cultural associations are also strong starting points for offline groups.',
    },
    {
      question: 'Can I start a community in a Spanish city?',
      answer:
        'Yes. Spanish cities have abundant public space — terraces, plazas, and parks — plus a warm social culture that makes first gatherings easy. The how-to guides cover starting a community from the first idea to a steady rhythm.',
    },
    {
      question: 'Does JoinOrigin operate in Spain?',
      answer:
        'Yes. JoinOrigin has no local offices. The Spain and Madrid pages are translated into Spanish, and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
