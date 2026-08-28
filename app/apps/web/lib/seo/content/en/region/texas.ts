import type { RegionContent } from '../../types';

/**
 * Texas region page content — EN source of truth.
 *
 * Texas is the second-largest US state by population and area, and home
 * to Austin, the content-rich city that anchors this region. This page
 * covers the statewide landscape; the Austin city page covers the urban
 * scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'texas',
  title: 'Origins in Texas | JoinOrigin',
  description:
    'Find or start communities in Texas — from Austin’s tech and live-music scenes to business, university, and local networks across the state. Join Origin and get discovered.',
  intro:
    'Texas is the second-largest US state by both population and area, and its community landscape is really a collection of distinct regional scenes. Austin, the state capital and the only content-rich city in the region, is a state-government town that grew into a technology and live-music hub at the same time — founders, musicians, and university researchers from UT Austin gather around downtown, South Congress, and the lakefront parks. Houston anchors the Gulf Coast with energy, medicine, and a famously international population, while the Dallas–Fort Worth metroplex concentrates corporate, finance, and entrepreneurial networks, and San Antonio sustains a deep community rooted in its military, tourism, and historic districts. Beyond the big metros, Texas communities form around the state’s universities — Texas A&M, Rice, and the University of Houston among them — as well as churches, chambers of commerce, rodeo and livestock culture, barbecue pits, and high-school football on Friday nights. Because distances are so large and the state is so car-oriented, most groups anchor to a city or neighborhood rather than the whole state. Whether you are looking for a startup meetup in Austin, an energy-industry network in Houston, or a small business group in a mid-sized Texas city, the state offers a warm, expansive range of communities.',
  dataPoints: [
    'Texas has roughly 29 million residents; it is the second-most-populous US state.',
    'State capital is Austin; largest cities are Houston, San Antonio, and Dallas.',
    'Major university anchors: UT Austin, Texas A&M, Rice, and the University of Houston.',
    'Distinct regional scenes: Austin tech and music, Houston energy, DFW corporate, San Antonio civic.',
  ],
  faq: [
    {
      question: 'Is Texas one community scene or several?',
      answer:
        'Several. Austin, Houston, Dallas–Fort Worth, and San Antonio each have their own community landscape, and groups usually anchor to a city or neighborhood rather than the state as a whole.',
    },
    {
      question: 'Where do startup and tech communities cluster in Texas?',
      answer:
        'Austin is the best-known startup and technology hub, with a strong live-music and creative scene alongside it. Dallas and Houston also host growing entrepreneurial and corporate innovation communities.',
    },
    {
      question: 'Does JoinOrigin operate in Texas?',
      answer:
        'Yes. JoinOrigin has no local offices. The Texas region page is in English — the source language — and the platform helps people find or start communities anywhere in the state.',
    },
  ],
};

export default content;
