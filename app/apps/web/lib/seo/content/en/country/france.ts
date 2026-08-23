import type { CountryContent } from '../../types';

/**
 * France country page content (EN source of truth).
 *
 * Evergreen, honest prose about the French community scene — associations
 * loi 1901, café sociability, and the Paris hub.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'france',
  title: 'Communities in France | JoinOrigin',
  description:
    'Find or start communities in France — from startup scenes in Paris to associations, cafés, and small business networks across the country. Join Origin and get discovered.',
  intro:
    'France organizes community life around a distinctive mix of formal institutions and everyday sociability. Associations loi 1901 — the country’s registered nonprofit structure — make it remarkably easy to form a group with a purpose, from sports clubs to cultural collectives, and millions of French people belong to at least one. The café and the terrace remain the default places where friends, neighbors, and colleagues meet, while the boulangerie, the market, and the mairie anchor village and neighborhood life. Paris concentrates the country’s most visible professional scenes — startups around the Grand Paris innovation districts, creative communities in the Marais and Belleville, and civic groups around neighborhood councils (conseils de quartier). Regional metropolises like Lyon, Marseille, Bordeaux, and Toulouse carry strong local identities with their own universities, coworking spaces, and associative ecosystems. Public libraries, maisons de quartier, and cultural venues host thousands of gatherings each month, and the country’s strong state tradition means civic participation has clear channels. Starting a community in France is straightforward on paper and warm in practice — the association model gives you structure, and the social culture gives you an audience.',
  dataPoints: [
    'Population of roughly 67 million including overseas territories.',
    'French is the primary language, with Breton, Corsican, and Occitan among regional languages.',
    'Capital is Paris; Lyon, Marseille, and Toulouse are major regional hubs.',
    'The association loi 1901 model makes forming a registered group simple.',
  ],
  faq: [
    {
      question: 'How do I find communities in France?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local associations and maisons de quartier are also excellent offline starting points.',
    },
    {
      question: 'What is an association loi 1901 and do I need one?',
      answer:
        'It is the standard French nonprofit structure — two people and a statement of purpose are enough to register. Many communities run informally at first and formalize later when they need a bank account or venue booking.',
    },
    {
      question: 'Does JoinOrigin operate in France?',
      answer:
        'Yes. JoinOrigin has no local offices. The France and Paris pages are translated into French, and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
