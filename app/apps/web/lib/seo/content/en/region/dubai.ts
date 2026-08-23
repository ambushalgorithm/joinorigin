import type { RegionContent } from '../../types';

/**
 * Dubai region page content — EN source of truth.
 *
 * Covers the Emirate of Dubai, one of seven emirates in the UAE. The
 * emirate is dominated by its capital city of the same name; the city
 * page covers the urban districts, this page the emirate-wide landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'dubai',
  intro:
    'The Emirate of Dubai is one of the seven emirates of the United Arab Emirates and the region’s most international hub, home to roughly 3.8 million residents, more than eight in ten of them born elsewhere. While the emirate’s economy and identity concentrate in the city of Dubai, the emirate-wide landscape shapes how communities form: free zones like DIFC, DMCC, and Internet City draw professionals from every continent; the airport and port make it a global transit and trading point; and the desert hinterland, from the dunes beyond the city to the enclave of Hatta, gives residents an outdoor life that few global cities offer. The emirate is administered as one cohesive city-region, which means a group founded in any district can draw from the same deep, diverse talent pool. Community life here is unusually open — nearly everyone is new, so a consistent monthly event can grow quickly. The weekend runs Friday–Saturday, and most professional groups meet on weekday evenings, often in English. For anyone organizing in Dubai, the emirate’s density and internationalism make specificity and regularity the two habits that reliably build a community.',
  dataPoints: [
    'One of seven emirates in the UAE; the emirate’s capital city is also named Dubai.',
    'Roughly 3.8 million residents; more than 80% are international expatriates.',
    'Free zones anchor the economy: DIFC, DMCC, Internet City, Media City.',
    'Weekend runs Friday–Saturday; most groups meet on weekday evenings.',
    'Desert hinterland and the Hatta enclave extend the emirate beyond the city.',
  ],
  faq: [
    {
      question: 'Is the Dubai region different from the Dubai city scene?',
      answer:
        'The Emirate of Dubai and the city of Dubai overlap almost completely, since the city dominates the emirate. This page covers the emirate-wide landscape, while the Dubai city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Where do communities in the emirate tend to meet?',
      answer:
        'Most communities meet in the city districts — free-zone event floors, Downtown and Business Bay cafés, JLT and Marina venues, and beachfront spots like Kite Beach. The weekend rhythm is Friday–Saturday, with weekday evenings the busiest for professional groups.',
    },
    {
      question: 'Does JoinOrigin operate in Dubai?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the emirate find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
