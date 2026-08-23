import type { CountryContent } from '../../types';

/**
 * China country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Chinese community scene — the
 * megacity metros, university networks, and the mix of online-first
 * groups and organised professional communities.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'china',
  title: 'Communities in China | JoinOrigin',
  description:
    'Find or start communities in China — from the startup scene in Shanghai to maker and creative groups across the megacities. JoinOrigin helps you get discovered.',
  intro:
    "China's community landscape is defined by scale: a population of more than 1.4 billion, dozens of cities with millions of residents, and an online-first culture that shapes how nearly every group forms and communicates. In the biggest metros — Shanghai, Beijing, Shenzhen, Guangzhou, and Hangzhou — professional communities cluster around technology, manufacturing, design, and finance, with coworking spaces, university campuses, and innovation districts hosting regular meetups, hackathons, and industry talks. WeChat group chats are the practical backbone of most communities: organisers announce events, share notes, and keep members connected across long commutes, which makes the digital layer as important as any physical venue. Maker culture, film and design collectives, and alumni networks of the major universities all sustain active local scenes, while community sports, music, and volunteer groups gather in parks and public squares. Mandarin is the shared language, with Cantonese and other regional languages strong in their home provinces. For newcomers and long-term residents alike, the fastest route into a community is usually through an existing group's online channel, then a first in-person event.",
  dataPoints: [
    'Population of roughly 1.41 billion, the largest of any country.',
    'Mandarin Chinese is the primary language, with Cantonese and Wu Chinese widely spoken in their regions.',
    'National capital is Beijing.',
    'Shanghai is the largest content-rich hub in the current city set.',
  ],
  faq: [
    {
      question: 'How do I find communities in China?',
      answer:
        'Start at the /location hub and choose a city such as Shanghai, then browse the group-type pages for startup, creative, political, meetup, and small business communities. Most groups also run WeChat channels where organisers post events.',
    },
    {
      question: 'Where do professional meetups usually happen?',
      answer:
        'Coworking spaces, innovation districts, university campuses, and large convention venues host most professional gatherings. Smaller hobby and social groups often meet in parks, cafés, and community centres, and rely on messaging groups for coordination.',
    },
    {
      question: 'Does JoinOrigin operate in China?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in China, and the Shanghai pages describe the local scene honestly.',
    },
  ],
};

export default content;
