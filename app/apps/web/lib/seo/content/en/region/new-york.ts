import type { RegionContent } from '../../types';

/**
 * New York region (state) page content — EN source of truth.
 *
 * Covers the state beyond the flagship city: upstate metros, universities,
 * and the statewide community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'new-york',
  intro:
    'New York State offers two very different community landscapes under one roof. New York City anchors the southern end with one of the densest networks of startup, creative, and professional communities anywhere, while upstate cities such as Buffalo, Rochester, Syracuse, and Albany sustain their own tight-knit scenes built around universities, healthcare systems, manufacturing heritage, and local arts. State universities including SUNY and private campuses like Cornell, Rochester, and Syracuse mean student communities, research groups, and alumni networks thrive well beyond the metro area. Between the cities, small towns rely on libraries, volunteer fire departments, churches, and local chambers of commerce as the social fabric. The geography rewards intentional gathering: communities in the Hudson Valley and Finger Lakes often organize around seasonal festivals, farmers markets, and outdoor recreation. Whether you live in a Brooklyn coworking space or a house near the Adirondacks, there is a realistic path to finding people who share your interests — or to starting a community that brings them together.',
  dataPoints: [
    'State capital is Albany.',
    'Largest city is New York City; other metros include Buffalo and Rochester.',
    'Home to the SUNY system and major private universities.',
    'Dense urban networks in the south, small-town fabric upstate.',
  ],
  faq: [
    {
      question: 'How do I find communities across New York State?',
      answer:
        'The city pages for New York City and the regional hub describe the main scenes. Outside the metro, check local libraries, chambers of commerce, and university event boards for meetups near you.',
    },
    {
      question: 'Are there startup communities outside New York City?',
      answer:
        'Yes. Buffalo and Rochester have growing startup ecosystems with incubators and university partnerships, and Albany hosts state-government tech and cleantech communities. The startup variant pages describe each scene in more detail.',
    },
    {
      question: 'Does JoinOrigin have a presence in New York State?',
      answer:
        'JoinOrigin is a waitlist platform without local offices or staff. All presence claims on these pages describe the real community landscape honestly, and the product is designed to help New Yorkers find or start communities.',
    },
  ],
};

export default content;
