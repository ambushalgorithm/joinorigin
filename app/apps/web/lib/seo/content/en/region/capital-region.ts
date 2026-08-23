import type { RegionContent } from '../../types';

/**
 * Capital Region of Denmark region page content — EN source of truth.
 *
 * Covers the region around Copenhagen: the ring municipalities, North
 * Zealand, the universities, and the Øresund link to Sweden. The
 * Copenhagen city page covers the urban scene itself.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'capital-region',
  intro:
    "The Capital Region of Denmark is the country's most densely populated region, wrapping the capital city in a ring of connected municipalities — Frederiksberg, Gentofte, Lyngby, and many more — that share its transport, universities, and community life. What makes the region distinct is the mix: Copenhagen's harbour baths and cycling culture blend into North Zealand's forests, castles, and coastal towns within an hour's travel, so a community can be urban one evening and rural the next. The region hosts the country's largest universities — the University of Copenhagen, DTU, and CBS — which feed a constant stream of students and researchers into startup, academic, and hobby communities. It is also the engine of Danish business and science, with biotech, cleantech, and design clusters drawing international talent. The Øresund Bridge connects the region to Sweden, so cross-border communities are common, and the public transport network makes a group in Hillerød, Roskilde, or Køge perfectly able to meet in the centre. For anyone organizing a community, the Capital Region offers density, diversity, and short distances.",
  dataPoints: [
    'The Capital Region is the most densely populated region in Denmark.',
    'Wraps Copenhagen in connected municipalities, from Frederiksberg to North Zealand.',
    "Hosts the country's largest universities — the University of Copenhagen, DTU, and CBS.",
    'The Øresund Bridge links the region to Sweden — cross-border communities are common.',
    'An engine of Danish business, science, and design clusters.',
    'Public transport connects the whole region — a group in Hillerød or Køge can meet in the centre.',
  ],
  faq: [
    {
      question: 'Is the Capital Region different from the Copenhagen city scene?',
      answer:
        'The Capital Region is the administrative region around Copenhagen, including North Zealand and the surrounding municipalities. This page covers the regional landscape, while the Copenhagen city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which parts of the region have the most active communities?',
      answer:
        'Copenhagen itself anchors most activity, with strong startup and design scenes. North Zealand has active outdoor, family, and castle-town communities, while university towns like Lyngby and Roskilde host student and academic groups.',
    },
    {
      question: 'Does JoinOrigin have a presence in the Capital Region?',
      answer:
        'Yes. JoinOrigin has no local offices. The Copenhagen pages describe the real community landscape honestly, and the product helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
