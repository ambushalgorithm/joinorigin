import type { RegionContent } from '../../types';

/**
 * New South Wales region page content (EN source of truth).
 *
 * The state around Sydney — the largest content-rich city in Australia.
 * Covers the coastal concentration of community life, the state's
 * universities and industries, and the mix of city and regional scenes.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'new-south-wales',
  intro:
    "New South Wales is Australia's most populous state and the anchor of the country's east-coast community life. More than eight million people live here, and the overwhelming majority are concentrated along the coast — most of all in Sydney, the state capital, which is also the largest content-rich city in Australia. The state's community scene splits into two overlapping layers. In Sydney, professional networks, startup communities, and creative collectives meet in coworking spaces around the CBD, Surry Hills, and the inner west, while beach and harbour-side suburbs run their own rhythm of surf clubs, park runs, and weekend markets. Beyond the metro, regional cities such as Newcastle, Wollongong, and the Central Coast host tighter-knit scenes anchored by universities, industry, and local civic groups. The state's universities — the University of Sydney, UNSW, the University of Technology Sydney, and others — feed a steady stream of students and researchers into every type of group, and the state's public libraries, community centres, and coastal parks provide abundant free venues. For anyone organising or joining a community, New South Wales offers the density of a large state with the familiarity of a network that is still small enough to navigate.",
  dataPoints: [
    'The most populous Australian state, with Sydney as its capital.',
    'Home to Sydney, the largest content-rich city in Australia.',
    'Major universities include Sydney, UNSW, and UTS.',
    'Community life concentrates on the coast, from Sydney to Newcastle and Wollongong.',
  ],
  faq: [
    {
      question: 'How is the New South Wales region different from the Sydney city scene?',
      answer:
        'This page covers the whole state, including regional cities and coastal communities. The Sydney city page dives into the specific districts, venues, and group types of the state capital.',
    },
    {
      question: 'Which parts of New South Wales have the most active communities?',
      answer:
        "Sydney's inner suburbs host the densest professional and creative scenes. Newcastle, Wollongong, and the Central Coast have strong university-anchored and civic communities, and coastal towns run active surf, sports, and volunteer groups.",
    },
    {
      question: 'Does JoinOrigin operate in New South Wales?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in the state, and the Sydney pages describe the local scene honestly.',
    },
  ],
};

export default content;
