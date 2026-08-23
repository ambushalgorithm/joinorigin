import type { RegionContent } from '../../types';

/**
 * Lisbon region page content — EN source of truth.
 *
 * The Lisbon district — the admin-1 region containing the Portuguese
 * capital — is the country's demographic and economic center. This page
 * covers the regional landscape; the Lisbon city page covers the urban
 * scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'lisbon',
  title: 'Communities in Lisbon | JoinOrigin',
  description:
    'Find or start communities in the Lisbon region — from the capital’s startup scenes to local associations across the district. Join Origin and get discovered.',
  intro:
    'The Lisbon district is the demographic and economic center of Portugal, home to the capital and a dense ring of municipalities along the Tagus estuary. The region hosts the country’s largest professional and creative communities: a fast-growing startup scene, creative industries, and a large international population cluster in Lisbon’s central neighborhoods, while municipalities like Cascais, Oeiras, and Sintra sustain active local communities of their own. The region’s mild climate and coastal geography support strong outdoor communities, from surfing and sailing along the coast to hiking in the Sintra hills. The Portuguese tradition of local association — the café, the mercado, the associação — runs deep here, and the region’s universities, including the University of Lisbon and NOVA, feed a constant stream of students into community life. Transport links, including the train lines along the coast and the Tagus, tie the region together, so a community anchored in Lisbon can draw members from across the district. English is widely spoken in professional circles, making the region welcoming to newcomers. Whether you are looking for a tech meetup, a surf club, a neighborhood committee, or a small business network, the Lisbon region offers a warm, dynamic landscape.',
  dataPoints: [
    'The Lisbon district is home to roughly 2.3 million residents.',
    'Contains Lisbon, the capital, and municipalities like Cascais and Sintra.',
    'The demographic and economic center of Portugal.',
    'Mild climate and coastline support strong outdoor communities.',
  ],
  faq: [
    {
      question: 'Is the Lisbon region different from the Lisbon city scene?',
      answer:
        'Yes. The Lisbon region is the wider district — the capital plus surrounding municipalities along the Tagus. Most national communities meet in the city, but the region hosts strong coastal and local scenes.',
    },
    {
      question: 'Which parts of the Lisbon region have active communities?',
      answer:
        'Central Lisbon is the densest hub for professional and creative groups; Cascais and Oeiras have active coastal communities, and Sintra supports outdoor and nature groups.',
    },
    {
      question: 'Does JoinOrigin operate in the Lisbon region?',
      answer:
        'Yes. JoinOrigin has no local offices. The Lisbon region page is translated into Portuguese, and the platform helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
