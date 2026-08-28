import type { CountryContent } from '../../types';

/**
 * Morocco country page content (EN source of truth).
 *
 * Evergreen, honest prose about Morocco's community landscape — a
 * North African country where Arabic, Amazigh, and French mix, and where
 * cafés, medinas, and a growing startup scene shape how people gather.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'morocco',
  intro:
    'Morocco is a North African country of roughly 36 million people, where Arabic, Amazigh (Berber), and French mix in daily life and shape a layered, multilingual community culture. Rabat is the capital, while Casablanca is the economic engine and largest city, and Fes, Marrakesh, and Tangier carry deep histories as centers of craft, trade, and hospitality. Community life runs through the café — the daily ritual of coffee, tea, and conversation that anchors neighborhoods from the medina to the modern boulevards — alongside the souks, mosques, and hammams that have organized social life for centuries. The country’s startup scene has grown steadily, centered on Casablanca’s Technopark and a spreading network of coworking hubs and accelerators, and universities including Hassan II University and Université Mohammed VI supply a young, educated workforce. Darija, the Moroccan Arabic dialect, and French mix freely in professional life, which makes the country’s groups naturally bilingual. For anyone looking to find or start an Origin, Morocco rewards choosing a district, respecting the café rhythm, and committing to a regular event — the country’s culture of hospitality makes newcomers welcome quickly.',
  dataPoints: [
    'Population of roughly 36 million in North Africa.',
    'Capital is Rabat; Casablanca is the economic capital and largest city.',
    'Arabic, Amazigh (Berber), and French are spoken; Darija and French mix in daily life.',
    'Café culture is the social heart of neighborhoods across the country.',
    'Casablanca Technopark anchors a growing startup ecosystem.',
    'Major universities: Hassan II University, Université Mohammed VI.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Morocco?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Neighborhood cafés, cultural centers, and coworking hubs are also strong starting points for offline groups.',
    },
    {
      question: 'Which languages do communities in Morocco use?',
      answer:
        'Most groups mix Darija (Moroccan Arabic) and French in professional and creative settings, with Arabic and Amazigh dominant in more traditional gatherings. English is increasingly common in the startup and student scenes.',
    },
    {
      question: 'Does JoinOrigin operate in Morocco?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in Morocco find or start communities, and the descriptions on these pages reflect the real country landscape.',
    },
  ],
};

export default content;
