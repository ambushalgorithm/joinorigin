import type { CountryContent } from '../../types';

/**
 * India country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Indian community scene — the
 * multilingual metros, the startup corridors, and the deep traditions of
 * neighbourhood, festival, and professional association life.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'india',
  title: 'Communities in India | JoinOrigin',
  description:
    'Find or start communities in India — startup hubs in Bengaluru, Delhi, Mumbai, and Hyderabad, plus creative, civic, and small business networks. JoinOrigin helps you get discovered.',
  intro:
    "India's community life is extraordinarily layered. More than 1.3 billion people speak hundreds of languages and follow distinct regional cultures, yet a handful of metropolitan regions carry most of the professional and creative energy: Bengaluru, Delhi and the National Capital Region, Mumbai and Pune in Maharashtra, Chennai in Tamil Nadu, and Hyderabad in Telangana. These cities host one of the world's most active startup ecosystems, with founder meetups, hackathons, investor office hours, and developer communities meeting in coworking spaces and incubators every week. Alongside this, neighbourhood life remains powerful — residential welfare associations, festival committees, religious gatherings, and volunteer groups organise continuously, and community service is a respected part of urban life. Hindi and English connect much of the country, while regional languages such as Tamil, Telugu, Kannada, and Marathi anchor community life in their home states. For anyone looking to build a professional network or a neighbourhood project, India rewards initiative: there is almost always an existing group to join or a clear path to start a new one.",
  dataPoints: [
    'Population of roughly 1.35 billion across 28 states and 8 union territories.',
    'Hindi and English are widely used, alongside hundreds of regional languages.',
    'National capital is New Delhi.',
    'Content-rich hubs include Bengaluru, Delhi, Mumbai, Hyderabad, Chennai, and Pune.',
  ],
  faq: [
    {
      question: 'How do I find communities in India?',
      answer:
        'Start at the /location hub and choose a city such as Bengaluru or Delhi, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Professional groups also post regularly on LinkedIn and messaging platforms.',
    },
    {
      question: 'Which Indian cities have the most active startup communities?',
      answer:
        'Bengaluru is the largest technology hub, followed by Delhi NCR and Mumbai. Hyderabad, Chennai, and Pune each have strong and growing startup scenes with regular founder meetups and incubator programmes.',
    },
    {
      question: 'Does JoinOrigin operate in India?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in India, and the Indian city pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
