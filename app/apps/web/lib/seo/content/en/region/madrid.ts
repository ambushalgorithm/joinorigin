import type { RegionContent } from '../../types';

/**
 * Madrid region page content — EN source of truth.
 *
 * The Community of Madrid — the admin-1 region hosting the capital — is
 * small in area but dense in population and community life. This page
 * covers the regional landscape; the Madrid city page covers the urban
 * scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'madrid',
  title: 'Communities in Madrid | JoinOrigin',
  description:
    'Find or start communities in the Community of Madrid — from the capital’s startup and creative scenes to towns across the region. Join Origin and get discovered.',
  intro:
    'The Community of Madrid is one of Spain’s smallest regions by area yet one of its most densely populated, with the capital at its center and a ring of commuter towns extending outward. This combination means the regional community landscape is unusually concentrated: most groups that serve the region meet within the city itself, while towns like Alcalá de Henares, Móstoles, and Leganés host their own local scenes tied to universities and neighborhood life. The region is the political, economic, and cultural heart of Spain, which attracts people from every region and from across Latin America, making the community mix genuinely diverse. Public transport — the Metro, Cercanías trains, and a dense bus network — links the capital to its suburbs quickly, so a group anchored in central Madrid can draw members from across the region. Universities including the Complutense and the Autónoma sit within the region and feed a constant stream of students into community life. For anyone organizing or joining a group, the region offers the density of a European capital with the reach of a wider metro area.',
  dataPoints: [
    'The Community of Madrid is home to roughly 6.7 million residents.',
    'Capital of Spain and the region’s central hub.',
    'Dense public transport links the capital to the commuter belt.',
    'Hosts the Complutense, Autónoma, and Politécnica universities.',
  ],
  faq: [
    {
      question: 'Is the Madrid region different from the Madrid city scene?',
      answer:
        'The region is centered on the city, so most regional communities meet inside the capital. This page covers the wider Community of Madrid, while the Madrid city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which parts of the region have active communities?',
      answer:
        'Central Madrid is the densest hub; university towns like Alcalá de Henares and Getafe host strong student and research communities, and the commuter belt has active neighborhood associations.',
    },
    {
      question: 'Does JoinOrigin operate in the Madrid region?',
      answer:
        'Yes. JoinOrigin has no local offices. The Madrid region page is translated into Spanish, and the platform helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
