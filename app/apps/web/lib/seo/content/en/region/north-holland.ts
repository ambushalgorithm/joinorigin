import type { RegionContent } from '../../types';

/**
 * North Holland region page content — EN source of truth.
 *
 * North Holland is the Dutch province that contains Amsterdam, the
 * capital. This page covers the provincial landscape; the Amsterdam city
 * page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'north-holland',
  title: 'Origins in North Holland | JoinOrigin',
  description:
    'Find or start communities in North Holland — from Amsterdam’s startup scenes to verenigingen and local groups across the province. Join Origin and get discovered.',
  intro:
    'North Holland is the Dutch province that contains Amsterdam, the capital, along with a ring of commuter towns and a long coastline of beaches, dunes, and polders. The province is one of the most densely populated in the Netherlands, and its community life is anchored by Amsterdam: startups, tech, creative industries, and a large international population cluster in the capital, while the surrounding towns sustain their own local scenes tied to universities, ports, and strong Dutch traditions of association. Haarlem, just west of Amsterdam, is known for its lively cultural scene; Alkmaar and Hoorn in the north have active local communities; and the province’s coastline supports strong beach, water-sports, and nature communities. Cycling is the great connector — most gatherings in the province are reachable by bike, which makes regular meetups easy to sustain. The vereniging model, the Dutch registered society, gives many groups a familiar structure, from sports clubs to neighborhood committees. English is widely spoken, especially in Amsterdam, making the province welcoming to newcomers. Whether you are looking for a tech meetup, a local vereniging, or a small business network, North Holland offers a dense, well-organized landscape.',
  dataPoints: [
    'North Holland is home to roughly 2.9 million residents.',
    'Contains Amsterdam, the capital, and towns like Haarlem and Alkmaar.',
    'Dutch is the primary language; English is widely spoken.',
    'Strong vereniging culture and cycling-friendly geography.',
  ],
  faq: [
    {
      question: 'Is North Holland different from the Amsterdam city scene?',
      answer:
        'Yes. North Holland is the wider province — Amsterdam plus the surrounding towns and coastline. Most national communities meet in the capital, but the province hosts strong local scenes and outdoor communities.',
    },
    {
      question: 'Which parts of North Holland have active communities?',
      answer:
        'Amsterdam is the densest hub for professional and creative groups; Haarlem has a strong cultural scene, and the coast supports beach and water-sports communities.',
    },
    {
      question: 'Does JoinOrigin operate in North Holland?',
      answer:
        'Yes. JoinOrigin has no local offices. The North Holland region page is translated into Dutch, and the platform helps people find or start communities anywhere in the province.',
    },
  ],
};

export default content;
