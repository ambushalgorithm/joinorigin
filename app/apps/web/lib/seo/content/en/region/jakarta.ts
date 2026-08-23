import type { RegionContent } from '../../types';

/**
 * Jakarta region page content (EN source of truth).
 *
 * Jakarta is a special capital region — the admin-1 region and the city
 * are the same entity. This region page covers the metropolitan
 * landscape; the city page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'jakarta',
  intro:
    "Jakarta is a special capital region, which means the region and the city are the same administrative entity — and the whole national capital functions as one dense urban community landscape. More than ten million people live within the city limits, and the greater metropolitan area extends far beyond into the satellite cities of the surrounding provinces, making Jakarta the undisputed economic and social centre of Indonesia. The city's districts shape its communities in distinct ways: the central business district of Sudirman and Thamrin anchors corporate and financial networks, while South Jakarta — especially Kemang, Senopati, and SCBD — hosts the creative, culinary, and nightlife scenes. The startup ecosystem, one of Southeast Asia's largest, clusters in coworking spaces across the city and in the technology hub of the surrounding areas, with founder meetups, hackathons, and demo days running throughout the year. Indonesian is the working language, and community coordination relies heavily on messaging apps and social media. For anyone building a career or a community in Indonesia, Jakarta is where the country's professional energy concentrates — dense, fast, and full of opportunity for those who show up.",
  dataPoints: [
    'Jakarta is a special capital region (DKI Jakarta) and the national capital.',
    'Population of more than ten million, with a much larger metropolitan area.',
    "Indonesia's economic centre and home to one of Southeast Asia's largest startup ecosystems.",
    'South Jakarta districts such as Kemang and Senopati anchor the creative and culinary scenes.',
  ],
  faq: [
    {
      question: 'Is the Jakarta region different from the Jakarta city scene?',
      answer:
        'No. Jakarta is a special capital region, so the region and city overlap completely. This page covers the metropolitan landscape, while the Jakarta city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Jakarta districts have the most active communities?',
      answer:
        "Sudirman and Thamrin anchor corporate and professional networks; South Jakarta's Kemang, Senopati, and SCBD host creative and culinary communities; and the startup scene clusters in coworking spaces across the city.",
    },
    {
      question: 'Does JoinOrigin operate in Jakarta?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Jakarta, and the Jakarta pages are translated into Indonesian to serve the local audience.',
    },
  ],
};

export default content;
