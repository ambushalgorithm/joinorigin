import type { CountryContent } from '../../types';

/**
 * Brazil country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Brazilian community scene — the
 * country's size, its urban density, samba and jiu-jitsu traditions,
 * the startup and creative hubs, and the regional differences that
 * shape how communities form.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'brazil',
  title: 'Communities in Brazil | JoinOrigin',
  description:
    'Find or start communities in Brazil — from São Paulo startup groups to Rio creative and cultural scenes and small business networks nationwide. Join Origin and get discovered.',
  intro:
    'Brazil is a continent-sized country with a community culture as diverse as its geography. From the urban density of São Paulo and the beach-and-samba rhythms of Rio de Janeiro to the university cities of the south and the Amazonian towns of the north, communities form around neighborhood, faith, music, sport, and profession in ways that vary by region. The country runs on social traditions that make gathering natural: samba and forró circles, feijoada Sundays, jiu-jitsu academies, church communities, and the ubiquitous café and lanchonete as meeting points. Brazilian Portuguese is the shared language across all 26 states plus the federal district, which gives national communities a common tongue even as regional identities stay strong. In the past two decades, the startup ecosystem has matured — São Paulo anchors fintech and marketplaces, while other capitals host their own accelerators and founder networks — and creative communities in music, design, and film are among the most vibrant in Latin America. For anyone organizing or joining a group, Brazil rewards clarity about geography, timing, and culture: a community that understands its city and its people will find Brazilians to be warm, expressive, and reliable attendees.',
  dataPoints: [
    'Population of roughly 209 million across 26 states plus the federal district.',
    'Portuguese (pt-BR) is the primary language.',
    'Federal capital is Brasília.',
    'Strong traditions in samba, forró, feijoada, and jiu-jitsu as social anchors.',
  ],
  faq: [
    {
      question: 'How do I find communities in Brazil?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local universities, academies, churches, and neighborhood associations are also good starting points for offline groups.',
    },
    {
      question: 'How do regional differences affect communities in Brazil?',
      answer:
        'Each region has its own rhythm — São Paulo is dense and work-focused, Rio is social and outdoors, the south has strong European-heritage club culture, and the northeast is known for music and festivals. Choosing a city and a venue that match the local rhythm helps communities thrive.',
    },
    {
      question: 'Does JoinOrigin operate in Brazil?',
      answer:
        'Yes. JoinOrigin has no local offices. The São Paulo and Rio de Janeiro pages are available in Portuguese, and the product helps people find or start communities anywhere in Brazil.',
    },
  ],
};

export default content;
