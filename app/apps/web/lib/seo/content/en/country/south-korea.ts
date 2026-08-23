import type { CountryContent } from '../../types';

/**
 * South Korea country page content (EN source of truth).
 *
 * Honest, evergreen prose about the South Korean community scene — the
 * Seoul-centred professional economy, the digital-first communication
 * culture, and the strong tradition of organised neighbourhood and hobby
 * groups.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'south-korea',
  title: 'Communities in South Korea | JoinOrigin',
  description:
    'Find or start communities in South Korea — from the startup and creative scenes in Seoul to business and civic networks nationwide. JoinOrigin helps you get discovered.',
  intro:
    "South Korea's community life is concentrated and digitally fluent. More than half of the country's roughly 51 million people live in the Seoul Capital Area, making the capital the undisputed centre of professional, creative, and political activity. Startup communities flourish around the tech districts of Gangnam, Pangyo, and the universities of central Seoul, while design, film, and K-culture meetups fill studios and event spaces across the city. Communication runs largely through messaging apps and online communities, where organisers share event details, build attendance, and keep members connected between in-person gatherings — a pattern that makes the digital channel as important as the venue. Beyond the capital, Busan, Daegu, Daejeon, and the provincial cities host their own tight-knit scenes rooted in universities, industry, and local civic life. Korean is the primary language, and the country's culture of hospitality means newcomers who make a small effort to speak and show up are usually welcomed warmly. For anyone building a career or a community, Seoul offers an efficient, well-connected environment where a first meetup can lead quickly to a lasting circle.",
  dataPoints: [
    'Population of roughly 51.6 million.',
    'Korean is the primary language, with English widely studied.',
    'National capital is Seoul.',
    'More than half of the population lives in the Seoul Capital Area.',
  ],
  faq: [
    {
      question: 'How do I find communities in South Korea?',
      answer:
        'Start at the /location hub and choose the Seoul page, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Many groups also coordinate through messaging apps and online communities.',
    },
    {
      question: 'Where do professional meetups usually take place?',
      answer:
        'Coworking spaces, university campuses, and corporate event halls in central Seoul host most professional gatherings. Smaller hobby and social groups often meet in cafés, parks, and community centres, coordinating attendance through messaging channels.',
    },
    {
      question: 'Does JoinOrigin operate in South Korea?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in South Korea, and the Seoul pages are translated into Korean to serve the local audience.',
    },
  ],
};

export default content;
