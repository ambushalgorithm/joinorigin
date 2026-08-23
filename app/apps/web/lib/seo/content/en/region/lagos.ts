import type { RegionContent } from '../../types';

/**
 * Lagos region page content — EN source of truth.
 *
 * Covers Lagos State, Nigeria's commercial and cultural powerhouse. The
 * state and the megacity of Lagos are effectively the same entity; this
 * page covers the state-wide landscape, the city page the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'lagos',
  intro:
    'Lagos State is Nigeria’s commercial and cultural powerhouse — a coastal state of more than fifteen million people where the state and the megacity of Lagos are effectively the same entity. The state is split between the Island (Victoria Island, Ikoyi, Lekki) and the Mainland (Yaba, Surulere, Ikeja), connected by bridges that double as the daily rhythm of millions of commuters. Lagos anchors the Nigerian economy and the country’s creative exports: Yaba — nicknamed Yabacon Valley — hosts the coworking hubs, accelerators, and fintech companies that make Lagos one of Africa’s leading innovation centers, while Nollywood and Afrobeats have turned the state into a global cultural engine. Institutions like the University of Lagos, LASU, and Pan-Atlantic University feed a steady stream of students into every scene, and public anchors include the National Theatre, Lekki Conservation Centre, Tarkwa Bay, and the Atlantic beaches. Because the state is so large and dense, communities here succeed by being hyper-local — a group built around one neighborhood, one street, or one industry finds its people fast. For anyone looking to find or start a community, Lagos rewards boldness, consistency, and knowing your immediate surroundings.',
  dataPoints: [
    'Lagos State and the megacity of Lagos are effectively the same entity.',
    'More than fifteen million people; the commercial and cultural powerhouse of Nigeria.',
    'Island (Victoria Island, Ikoyi, Lekki) and Mainland (Yaba, Surulere, Ikeja) are linked by bridges.',
    'Yaba — Yabacon Valley — is one of Africa’s leading innovation hubs.',
    'Home to the University of Lagos, LASU, and Pan-Atlantic University.',
    'Public anchors: National Theatre, Lekki Conservation Centre, Tarkwa Bay.',
  ],
  faq: [
    {
      question: 'Is Lagos State different from the Lagos city scene?',
      answer:
        'Lagos State and the city of Lagos overlap almost completely, since the city dominates the state. This page covers the state-wide landscape, while the Lagos city page dives into specific neighborhoods, venues, and group types.',
    },
    {
      question: 'Which parts of the state have the most active communities?',
      answer:
        'Yaba anchors the tech and startup scene, Victoria Island and Ikoyi host professional and business groups, Lekki has a fast-growing family and creative community, and the Mainland neighborhoods like Surulere and Ikeja anchor strong local and creative communities.',
    },
    {
      question: 'Does JoinOrigin operate in Lagos?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the state find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
