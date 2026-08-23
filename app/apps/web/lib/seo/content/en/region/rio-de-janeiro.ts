import type { RegionContent } from '../../types';

/**
 * Rio de Janeiro region page content — EN source of truth.
 *
 * Covers the state of Rio de Janeiro beyond the capital: the mountain
 * towns, the coastal corridor, and the regional community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'rio-de-janeiro',
  title: 'Communities in Rio de Janeiro | JoinOrigin',
  description:
    'Find or start communities in Rio de Janeiro — startup, creative, political, meetup, and small business groups across the state. Join Origin and get discovered.',
  intro:
    "Rio de Janeiro is a state of striking contrasts, and its community life mirrors that diversity. The capital, Rio de Janeiro city, is one of the most famous cities on earth — the beach culture of Copacabana and Ipanema, the samba schools of the North Zone, the samba-and-bossa heritage, and a creative scene in music, film, and design that has global reach. Around the capital, the state offers a different kind of community life: mountain towns like Petrópolis and Teresópolis, the coastal corridor from Niterói to Búzios, the industrial city of Volta Redonda, and the university towns of the interior. Cariocas — the people of the capital — are known for their warmth and openness, and the state's natural beauty shapes how groups gather: beach volleyball circles, mountain hiking clubs, surf communities, and outdoor festival groups are all common. The city also has a growing startup and creative-tech scene, strong university communities around UFRJ and PUC-Rio, and deep traditions of civic organizing in its neighborhoods and favelas. For anyone organizing or joining a community in Rio de Janeiro state, the reward is a landscape where social connection comes naturally — but timing, transport, and respect for local rhythm matter.",
  dataPoints: [
    'State capital is the city of Rio de Janeiro.',
    'Roughly 6.7 million residents in the capital; the state metro is far larger.',
    'Mountain towns: Petrópolis and Teresópolis; coastal corridor from Niterói to Búzios.',
    'Anchors: UFRJ, PUC-Rio, samba schools, beach and mountain sports culture.',
  ],
  faq: [
    {
      question: 'How do communities differ across the state of Rio de Janeiro?',
      answer:
        'The capital is dense, beach-oriented, and creative; the mountain towns are quieter and family-oriented; the coastal corridor is driven by tourism and outdoor life; and industrial cities like Volta Redonda have their own working-class networks.',
    },
    {
      question: 'What are the best formats for community gatherings in Rio?',
      answer:
        'Outdoor and informal formats work well — beach circles, hiking clubs, samba and music nights, and festival groups. Indoor meetups thrive in the city’s cafés, studios, and university spaces, especially outside peak summer heat.',
    },
    {
      question: 'Does JoinOrigin operate in Rio de Janeiro?',
      answer:
        'Yes. JoinOrigin has no local offices. The Rio de Janeiro pages are available in Portuguese, and the product helps people find or start communities across the state.',
    },
  ],
};

export default content;
