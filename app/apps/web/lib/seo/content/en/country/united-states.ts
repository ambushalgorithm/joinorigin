import type { CountryContent } from '../../types';

/**
 * United States country page content (EN source of truth).
 *
 * Honest, evergreen prose about the US community scene — no fabricated
 * member counts or local office claims (design §6.2/§6.4). Data points
 * mirror the committed snapshot (G1).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'united-states',
  title: 'Communities in the United States | JoinOrigin',
  description:
    'Find or start communities in the United States — from startup scenes in New York to small business networks across the country. Join the JoinOrigin waitlist.',
  intro:
    'The United States has one of the most varied community scenes in the world, shaped by a mix of dense coastal metros, sprawling university towns, and mid-sized cities with strong local identities. From startup communities in New York and San Francisco to book clubs in college towns and small business groups in the Midwest, Americans tend to organize around shared interests, professions, and neighborhoods. Coworking spaces, public libraries, coffee shops, and university campuses provide natural homes for meetups. Volunteer culture and civic organizations run deep in many states, while immigrant communities bring their own traditions of gathering and mutual aid. The result is a country where you can usually find a group that matches your interests within a reasonable drive or transit ride. If you cannot find one, starting a community is a realistic option: most cities have venues, event platforms, and existing networks that make the first gathering possible. JoinOrigin exists to make that discovery and creation process easier, with waitlist access for early builders.',
  dataPoints: [
    'Population of roughly 327 million across 50 states.',
    'English is the primary language, with Spanish widely spoken.',
    'Federal capital is Washington, D.C.',
    'Community density concentrates in metros like New York, San Francisco, and Austin.',
  ],
  faq: [
    {
      question: 'How do I find communities near me in the United States?',
      answer:
        'Start at the /location hub, choose your state and city, then browse the group-type pages — startup, creative, political, meetup, and small business communities. JoinOrigin is building the platform that makes discovery easy; joining the waitlist keeps you updated on early access.',
    },
    {
      question: 'Can I start a community in any U.S. city?',
      answer:
        'Yes. Most cities have libraries, coffee shops, coworking spaces, and parks that host first gatherings, and local event platforms make promotion straightforward. The how-to guides cover starting a community from scratch.',
    },
    {
      question: 'Is JoinOrigin available across the whole country?',
      answer:
        'JoinOrigin is a waitlist platform with no local offices yet. Content on this site describes community opportunities in each city honestly, and the platform is designed to help people find or start communities anywhere in the United States.',
    },
  ],
};

export default content;
