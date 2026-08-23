import type { CountryContent } from '../../types';

/**
 * Thailand country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Thai community scene — the
 * Bangkok-centred professional economy, the temple and festival
 * traditions that anchor neighbourhood life, and the warm hospitality
 * that makes joining groups easy.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'thailand',
  title: 'Communities in Thailand | JoinOrigin',
  description:
    'Find or start communities in Thailand — from the startup and creative scenes in Bangkok to civic and small business networks nationwide. JoinOrigin helps you get discovered.',
  intro:
    "Thailand's community life blends a deeply rooted local culture with a fast-moving urban economy centred on Bangkok. The capital region is home to the bulk of the country's professional activity — startup events, design collectives, and corporate networking fill coworking spaces and hotel venues across Sukhumvit, Siam, and the newer business districts — while the rest of the country runs on a different rhythm of temple fairs, market days, and neighbourhood festivals. The Thai tradition of hospitality, or nam jai, shapes how groups form: people are quick to offer help, share food, and welcome newcomers, which makes a first visit to any gathering feel low-risk. Thai is the primary language, and English is common in international and professional circles, especially in Bangkok. Community coordination leans heavily on messaging apps and social media, where organisers post events and keep members connected. For anyone looking to build a professional network or join a local project, Thailand rewards friendliness and consistency: show up, be curious, and the community will usually meet you halfway.",
  dataPoints: [
    'Population of roughly 69.4 million.',
    'Thai is the primary language, with English widely used in professional circles.',
    'National capital is Bangkok.',
    'Bangkok is the dominant content-rich hub in the current city set.',
  ],
  faq: [
    {
      question: 'How do I find communities in Thailand?',
      answer:
        'Start at the /location hub and choose the Bangkok page, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Many groups also coordinate through messaging apps and social media.',
    },
    {
      question: 'What role do temples and festivals play in community life?',
      answer:
        'Temples (wat) have historically served as community centres, hosting festivals, markets, and merit-making events that draw the whole neighbourhood. Festivals such as Songkran and Loy Krathong are natural occasions for communities to gather and celebrate together.',
    },
    {
      question: 'Does JoinOrigin operate in Thailand?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Thailand, and the Bangkok pages are translated into Thai to serve the local audience.',
    },
  ],
};

export default content;
