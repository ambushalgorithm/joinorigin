import type { CountryContent } from '../../types';

/**
 * Vietnam country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Vietnamese community scene — the
 * dynamic energy of Ho Chi Minh City and Hanoi, the café culture that
 * anchors gatherings, and the strong local tradition of collective
 * effort.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'vietnam',
  title: 'Origins in Vietnam | JoinOrigin',
  description:
    'Find or start communities in Vietnam — from the startup and creative scenes in Ho Chi Minh City to civic and small business networks nationwide. JoinOrigin helps you get discovered.',
  intro:
    "Vietnam's community scene is young, fast-moving, and concentrated in two giant urban poles: Ho Chi Minh City in the south and Hanoi in the north. Ho Chi Minh City, the country's commercial heart, hosts the most active startup ecosystem — founder meetups, developer communities, and design collectives fill coworking spaces and cafés across District 1, District 3, and the newer districts of the east. The Vietnamese café culture is the social glue: countless groups simply meet at a familiar coffee shop, where a table becomes a standing meeting place for the week. Community life also draws on deep local traditions — the neighbourhood mutual-aid culture (tình làng nghĩa xóm) and the festival calendar of Tết and other celebrations keep people connected beyond professional circles. Vietnamese is the primary language, with English common among the young professionals and international community. For anyone building a career or a community, Vietnam rewards energy and consistency: the scene is open, the cost of a first gathering is low, and people respond well to genuine enthusiasm.",
  dataPoints: [
    'Population of roughly 95.5 million.',
    'Vietnamese is the primary language, with English widely studied.',
    'National capital is Hanoi; Ho Chi Minh City is the commercial centre.',
    'Ho Chi Minh City is the dominant content-rich hub in the current city set.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Vietnam?',
      answer:
        'Start at the /location hub and choose the Ho Chi Minh City page, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Many groups also coordinate through messaging apps and social media.',
    },
    {
      question: 'What is tình làng nghĩa xóm?',
      answer:
        'It is the Vietnamese tradition of neighbourhood solidarity — helping neighbours with weddings, funerals, and daily needs, and sharing the collective spirit of village life. It makes local projects and mutual-aid groups a natural part of community participation.',
    },
    {
      question: 'Does JoinOrigin operate in Vietnam?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Vietnam, and the Ho Chi Minh City pages are translated into Vietnamese to serve the local audience.',
    },
  ],
};

export default content;
