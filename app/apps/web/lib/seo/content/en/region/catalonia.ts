import type { RegionContent } from '../../types';

/**
 * Catalonia region page content — EN source of truth.
 *
 * Catalonia — the northeast Spanish autonomous community — has its own
 * language, culture, and a strong identity. This page covers the regional
 * landscape; the Barcelona city page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'catalonia',
  title: 'Origins in Catalonia | JoinOrigin',
  description:
    'Find or start communities in Catalonia — from Barcelona’s startup and creative scenes to towns across the region. Join Origin and get discovered.',
  intro:
    'Catalonia is a distinct region within Spain with its own language, culture, and a strong tradition of civic association. Barcelona, the regional capital and second-largest city in Spain, anchors the region’s professional and creative scenes — startups, design, architecture, and international communities cluster around coworking spaces, universities, and the city’s iconic neighborhoods. Beyond the capital, the region’s mid-sized cities and towns sustain lively communities of their own: Girona and Tarragona have active local scenes, while smaller towns are organized around the casal, the civic and cultural center that hosts everything from language classes to neighborhood festivals. Catalan civil society has deep roots — from the ateneus (cultural associations) of the 19th century to the modern network of cooperatives and community organizations — and the language itself is a marker of belonging for many groups. The region’s transport links make it easy to connect: the train network ties Barcelona to the rest of the region, so a community anchored in the city can draw members from across Catalonia. Whether you are looking for a tech meetup, a cultural association, or a small business network, Catalonia offers a rich, distinctive landscape.',
  dataPoints: [
    'Catalonia is home to roughly 7.6 million residents in northeastern Spain.',
    'Catalan and Spanish are both official languages.',
    'Regional capital is Barcelona; Girona and Tarragona are major hubs.',
    'Strong civic association and ateneu tradition.',
  ],
  faq: [
    {
      question: 'Is Catalonia different from the rest of Spain?',
      answer:
        'Yes, in important ways: it has its own language (Catalan), a strong regional identity, and a distinctive tradition of civic associations. Many groups operate in Catalan, Spanish, or both, and international communities often use English.',
    },
    {
      question: 'Which parts of Catalonia have active communities?',
      answer:
        'Barcelona is the densest hub for professional and creative groups; Girona, Tarragona, and Lleida host strong local scenes, and towns across the region are organized around their casals and cultural centers.',
    },
    {
      question: 'Does JoinOrigin operate in Catalonia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Catalonia region page is translated into Spanish, and the platform helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
