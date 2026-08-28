import type { RegionContent } from '../../types';

/**
 * Ile-de-France region page content — EN source of truth.
 *
 * Ile-de-France — the admin-1 region around Paris — is the economic and
 * cultural heart of France. This page covers the regional landscape; the
 * Paris city page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'ile-de-france',
  title: 'Origins in Ile-de-France | JoinOrigin',
  description:
    'Find or start communities in Ile-de-France — from Paris’s startup and creative scenes to the surrounding departments. Join Origin and get discovered.',
  intro:
    'Ile-de-France is the French region that contains Paris and its surrounding departments, and it is by far the most densely populated part of the country. The region concentrates France’s economic, political, and cultural life: most major companies, universities, and cultural institutions sit within its borders, which makes it the natural home for the country’s densest professional communities. Paris itself anchors the startup, creative, and civic scenes, while the inner suburbs — Hauts-de-Seine, Seine-Saint-Denis, and Val-de-Marne — host their own lively communities, often tied to universities, business districts like La Défense, and strong local identities. The region’s public transport network, including the RER and the Métro, ties the whole area together, so a community anchored in central Paris can draw members from across the region. Associations loi 1901 are everywhere in Ile-de-France, from neighborhood groups in the banlieues to professional networks in the city. The region’s scale can feel overwhelming, but it also means that whatever your interest — tech, design, politics, sports, small business — there is almost certainly a community nearby, or a clear path to starting one.',
  dataPoints: [
    'Ile-de-France is home to roughly 12.2 million residents.',
    'Contains Paris and the surrounding departments (Hauts-de-Seine, Seine-Saint-Denis, and more).',
    'The economic, political, and cultural center of France.',
    'Dense RER and Métro network ties the region together.',
  ],
  faq: [
    {
      question: 'Is Ile-de-France different from the Paris city scene?',
      answer:
        'Yes. Ile-de-France is the wider region — Paris plus its suburbs. Most national communities meet in central Paris, but the suburbs host strong local scenes of their own, and the region’s transport makes both reachable.',
    },
    {
      question: 'Which parts of Ile-de-France have active communities?',
      answer:
        'Central Paris is the densest hub; La Défense anchors business networks, and the inner suburbs have active neighborhood associations, student communities, and cultural groups.',
    },
    {
      question: 'Does JoinOrigin operate in Ile-de-France?',
      answer:
        'Yes. JoinOrigin has no local offices. The Ile-de-France region page is translated into French, and the platform helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
