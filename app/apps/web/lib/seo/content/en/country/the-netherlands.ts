import type { CountryContent } from '../../types';

/**
 * The Netherlands country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Dutch community scene — verenigingen,
 * cycling culture, and the Amsterdam hub. The dataset row for the country
 * is "The Netherlands", so the slug is `the-netherlands` (matches the
 * runtime `countrySlug` derivation).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'the-netherlands',
  title: 'Communities in The Netherlands | JoinOrigin',
  description:
    'Find or start communities in The Netherlands — from startup scenes in Amsterdam to local verenigingen, cycling clubs, and small business networks. Join Origin and get discovered.',
  intro:
    'The Netherlands has a compact, well-organized community culture built on a long tradition of voluntary associations. The vereniging — a registered society with members, a board, and regular meetings — is the backbone of Dutch social life, from sports clubs and music societies to neighborhood committees and hobby groups. Because the country is small and densely populated, communities are close to each other: a meetup in Amsterdam and one in Utrecht may be twenty minutes apart by train, and the famous cycling culture means many gatherings are reachable by bike. Amsterdam, the capital and largest city, hosts the country’s densest professional scenes — startups, tech, creative industries, and international communities cluster around coworking spaces, universities, and the city’s canals. Rotterdam, The Hague, Utrecht, and Eindhoven each sustain vibrant scenes of their own, with strong ties to local universities and industries. The Dutch value directness and reliability, which translates into communities that meet on schedule and get things done. English is widely spoken, making the Netherlands especially welcoming to newcomers. Whether you are looking for a tech meetup, a local vereniging, or a small business network, finding or starting a community here is a well-worn path.',
  dataPoints: [
    'Population of roughly 17.2 million across 12 provinces.',
    'Dutch is the primary language, with Frisian co-official in Friesland.',
    'Capital is Amsterdam; Rotterdam and Utrecht are major hubs.',
    'Strong vereniging (registered society) culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find communities in The Netherlands?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local verenigingen and buurthuizen (community centers) are also strong starting points.',
    },
    {
      question: 'Can I start a community in a Dutch city?',
      answer:
        'Yes. Dutch cities have community centers, cafés, coworking spaces, and sports facilities that host first gatherings, and the vereniging model gives new groups a recognized structure. The how-to guides cover the practical steps.',
    },
    {
      question: 'Does JoinOrigin operate in The Netherlands?',
      answer:
        'Yes. JoinOrigin has no local offices. The Netherlands and Amsterdam pages are translated into Dutch, and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
