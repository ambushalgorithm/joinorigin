import type { RegionContent } from '../../types';

/**
 * Western Cape region page content — EN source of truth.
 *
 * Covers the Western Cape province of South Africa, home to the
 * legislative capital Cape Town and a landscape of mountains, coastline,
 * and winelands that shapes the province's strong outdoor and creative
 * community culture.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'western-cape',
  intro:
    'The Western Cape is South Africa’s southernmost province and home to the legislative capital Cape Town, a city shaped by two dramatic features: the mountains that rise directly from the city bowl and the ocean that wraps around the peninsula. Table Mountain, Lion’s Head, and Signal Hill give residents world-class hiking at their doorstep, while beaches from Camps Bay to Muizenberg anchor surf, swim, and picnic cultures that run year-round. Beyond the city, the province holds the winelands of Stellenbosch and Franschhoek, the whale coast of Hermanus, and the garden route towns of George and Knysna, each with its own community life. The province mixes a mature creative and tech scene — Woodstock, Observatory, and the City Bowl host galleries, studios, and coworking spaces, and the Silicon Cape community organizes meetups, founder breakfasts, and demo nights — with the deep associational life of its diverse neighborhoods, from the Southern Suburbs to Khayelitsha and other townships. Universities including UCT, CPUT, and Stellenbosch supply students and researchers, and the province’s outdoor culture means many communities meet outside. For anyone looking to find or start an Origin, the Western Cape rewards showing up outdoors and building on the province’s habit of mixing business with beauty.',
  dataPoints: [
    'Western Cape is South Africa’s southernmost province and home to the legislative capital Cape Town.',
    'Table Mountain, Lion’s Head, and Signal Hill anchor an outdoor community culture.',
    'Winelands (Stellenbosch, Franschhoek), whale coast (Hermanus), and garden route towns beyond the city.',
    'Silicon Cape community organizes the regional tech and startup scene.',
    'Universities: UCT, CPUT, and Stellenbosch.',
    'Neighborhoods from the Southern Suburbs to Khayelitsha hold deep associational life.',
  ],
  faq: [
    {
      question: 'Is the Western Cape region different from the Cape Town city scene?',
      answer:
        'Yes. The province is much larger than the city — it includes the winelands, the whale coast, and the garden route towns. This page covers the province-wide landscape, while the Cape Town city page dives into specific neighborhoods, venues, and group types.',
    },
    {
      question: 'Where do communities in the province tend to gather?',
      answer:
        'Cape Town’s City Bowl, Woodstock, and Observatory anchor creative and tech groups; beaches, mountains, and parks host outdoor communities; and the winelands and coastal towns have their own strong local scenes. The Silicon Cape community is a good entry point for the tech scene.',
    },
    {
      question: 'Does JoinOrigin operate in the Western Cape?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the province find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
