import type { RegionContent } from '../../types';

/**
 * Casablanca-Settat region page content — EN source of truth.
 *
 * Covers the Casablanca-Settat region, Morocco's economic heartland.
 * The region contains the economic capital Casablanca and the cities of
 * Mohammedia, Settat, and El Jadida; the city page covers the urban
 * scene, this page the region-wide landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'casablanca-settat',
  intro:
    'The Casablanca-Settat region is Morocco’s economic heartland — the most populous region in the country and home to the economic capital Casablanca, the port city of Mohammedia, and the inland cities of Settat and El Jadida on the Atlantic coast. The region concentrates the industries, banks, and port operations that drive the Moroccan economy, and it is the center of the country’s startup scene, anchored by Casablanca’s Technopark and a growing network of coworking hubs and accelerators. Casablanca itself, with roughly 3.7 million people, gives the region its density and its famous contrast: the Hassan II Mosque beside the Atlantic, Art Deco streets downtown, and the café rhythm that organizes social life across the city. Universities including Hassan II University and Université Mohammed VI keep a young, educated workforce flowing into the region, and French and Darija mix freely in daily life, which makes the region’s communities naturally bilingual. For anyone looking to find or start an Origin, the region rewards choosing a city and a district, respecting the café rhythm, and committing to a regular event — the density of the economic capital will amplify any consistent group.',
  dataPoints: [
    'Casablanca-Settat is Morocco’s most populous region and economic heartland.',
    'Contains Casablanca (roughly 3.7 million people), Mohammedia, Settat, and El Jadida.',
    'Casablanca Technopark anchors the national startup ecosystem.',
    'Home to Hassan II University and Université Mohammed VI.',
    'French and Darija mix in daily life; communities are naturally bilingual.',
  ],
  faq: [
    {
      question: 'Is the Casablanca-Settat region different from the Casablanca city scene?',
      answer:
        'The region is larger than the city: it also includes Mohammedia, Settat, and El Jadida. This page covers the region-wide landscape, while the Casablanca city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which cities in the region have active communities?',
      answer:
        'Casablanca is the clear center, with the strongest startup, creative, and professional scenes. Mohammedia and El Jadida have growing coastal and family communities, and Settat anchors the region’s inland university life.',
    },
    {
      question: 'Does JoinOrigin operate in Casablanca-Settat?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the region find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
