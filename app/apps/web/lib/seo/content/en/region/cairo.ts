import type { RegionContent } from '../../types';

/**
 * Cairo region page content — EN source of truth.
 *
 * Covers the Cairo Governorate, the political and cultural heart of
 * Egypt. The governorate is dominated by the capital city of the same
 * name; the city page covers the urban districts, this page the
 * governorate-wide landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'cairo',
  intro:
    'The Cairo Governorate is the political, cultural, and demographic heart of Egypt — the seat of government, the center of the country’s media and education, and home to the capital city of the same name, whose metro population is among the largest in the world. The governorate sits on the Nile, with the Pyramids of Giza rising just across the river in the neighboring Giza Governorate, and it concentrates the institutions that shape Egyptian community life: Cairo University, the American University in Cairo, and Ain Shams University feed a constant flow of students and graduates; the ahwa coffeehouse culture anchors neighborhoods; and the startup scene has grown into one of the most active in Africa and the Middle East, with hubs and accelerators across the city. Because the governorate is dense and deeply layered, communities here tend to form around districts and institutions — Downtown and Zamalek for the intellectual scene, Maadi and Heliopolis for families and expats, New Cairo and Nasr City for universities and startups. For anyone looking to find or start a community, the governorate rewards choosing one district, building relationships over tea, and committing to a regular rhythm.',
  dataPoints: [
    'Cairo Governorate is the seat of government and the demographic heart of Egypt.',
    'Sits on the Nile; the Pyramids of Giza rise across the river in Giza Governorate.',
    'Home to Cairo University, the American University in Cairo, and Ain Shams University.',
    'Ahwa (coffeehouse) culture anchors neighborhood social life.',
    'One of the most active startup scenes in Africa and the Middle East.',
  ],
  faq: [
    {
      question: 'Is the Cairo region different from the Cairo city scene?',
      answer:
        'The Cairo Governorate and the city of Cairo overlap heavily, since the city dominates the governorate. This page covers the governorate-wide landscape, while the Cairo city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which districts have the most active communities?',
      answer:
        'Downtown and Zamalek host the intellectual, café, and creative scenes; Maadi and Heliopolis anchor family and expat communities; and New Cairo and Nasr City are home to universities and a growing number of startups.',
    },
    {
      question: 'Does JoinOrigin operate in Cairo?',
      answer:
        'Yes. JoinOrigin has no local offices or staff. The platform helps people anywhere in the governorate find or start communities, and the descriptions on these pages reflect the real landscape.',
    },
  ],
};

export default content;
