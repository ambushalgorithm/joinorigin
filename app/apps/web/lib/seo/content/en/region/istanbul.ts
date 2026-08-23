import type { RegionContent } from '../../types';

/**
 * Istanbul Province region page content — EN source of truth.
 *
 * Istanbul Province is a continuous metropolitan region spanning two
 * continents. This region page covers the provincial/district landscape;
 * the Istanbul city page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'istanbul',
  intro:
    "Istanbul Province is a single continuous metropolitan region that spans two continents, and nearly all of its community life happens inside that urban fabric. The Bosphorus divides the European and Asian sides, and the ferries that cross it are a daily social ritual — people plan meetings around boat rides, and a community can anchor on one side while drawing members from both. The province's districts each carry distinct identities: Kadıköy and Moda on the Asian side anchor creative and tech scenes, Karaköy and Beyoğlu on the European side hold galleries, design studios, and startup offices, while the historic peninsula, Beşiktaş, and the newer districts to the north host universities, business towers, and family neighbourhoods. Universities such as Boğaziçi, Istanbul University, and ITU feed a constant stream of students, and a booming e-commerce, fintech, and gaming scene has made the city a regional startup capital. Çay culture and the esnaf tradition — bazaars and neighbourhood shops running on personal trust — keep daily life connected at the street level. For community organizers, Istanbul offers density, diversity, and the unique rhythm of a city that commutes across the sea.",
  dataPoints: [
    'Istanbul Province spans two continents — the Bosphorus divides the European and Asian sides.',
    "Roughly 15.7 million residents — Turkey's largest province and city.",
    'Universities include Boğaziçi, Istanbul University, ITU, and Koç.',
    'A regional startup capital — e-commerce, fintech, and gaming are strengths.',
    'Çay culture and the esnaf tradition keep street-level community life connected.',
    'The ferry network makes cross-side meetings a normal part of daily life.',
  ],
  faq: [
    {
      question: 'Is the Istanbul region different from the Istanbul city scene?',
      answer:
        'Istanbul Province is the administrative region that contains the city itself, so the two overlap almost completely. This page covers the provincial and district landscape, while the Istanbul city page dives into neighbourhoods, venues, and group types.',
    },
    {
      question: 'Which districts have the most active communities?',
      answer:
        'Kadıköy and Moda anchor creative and tech communities on the Asian side; Karaköy, Beyoğlu, and Beşiktaş host startup, design, and university scenes on the European side; the historic peninsula and family districts keep traditional mahalle life strong.',
    },
    {
      question: 'Does JoinOrigin have a presence in Istanbul Province?',
      answer:
        'Yes. JoinOrigin has no local offices. The Istanbul pages are available in Turkish, and the product helps people find or start communities anywhere in the province.',
    },
  ],
};

export default content;
