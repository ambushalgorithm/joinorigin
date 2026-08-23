import type { RegionContent } from '../../types';

/**
 * California region page content — EN source of truth.
 *
 * California is the most populous US state and home to two of the
 * country's biggest community scenes: the Bay Area (San Francisco) and
 * Southern California (Los Angeles). This page covers the statewide
 * landscape; the city pages cover each metro's urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'california',
  title: 'Communities in California | JoinOrigin',
  description:
    'Find or start communities in California — from San Francisco’s startup scene to Los Angeles’ creative and entertainment networks. Join Origin and get discovered.',
  intro:
    'California is the most populous US state and one of the most varied community landscapes anywhere, with two enormous metro scenes separated by hundreds of miles. The San Francisco Bay Area concentrates one of the world’s densest startup and technology ecosystems — founders, engineers, and investors cluster around San Jose, Palo Alto, Oakland, and San Francisco itself — while Los Angeles anchors a sprawling Southern California scene built around entertainment, design, and a federation of distinct neighborhoods from Hollywood to the beach cities. Between them, Sacramento, San Diego, Fresno, and Bakersfield each sustain their own communities around government, biotech and military research, agriculture, and the Central Valley’s farming towns. California’s universities — Stanford, UC Berkeley, UCLA, USC, and the broader UC system — feed a constant stream of students, researchers, and alumni groups, and its geography supports everything from surf and hiking clubs to wine-country and desert gatherings. Because the state is so large and car-oriented, communities usually anchor to a city, a campus, or a neighborhood rather than the state as a whole. Whether you are looking for a startup meetup in the Bay Area, a creative collective in Los Angeles, or a local club in the Central Valley, California offers a deep, diverse range of communities.',
  dataPoints: [
    'California is the most populous US state, with roughly 39 million residents.',
    'State capital is Sacramento; largest cities are Los Angeles and San Diego.',
    'Bay Area tech scene and Southern California entertainment scene are both world-scale.',
    'Home to Stanford, the UC system, and a network of research universities.',
  ],
  faq: [
    {
      question: 'Is California one community scene or several?',
      answer:
        'Several. The Bay Area, Los Angeles, San Diego, and the Central Valley each have their own distinct community landscape, and groups usually anchor to a city or neighborhood rather than the whole state.',
    },
    {
      question: 'Where do tech and creative communities cluster?',
      answer:
        'Startup and engineering communities concentrate in the Bay Area, especially San Francisco and San Jose. Entertainment, design, and music communities anchor in Los Angeles, while San Diego and Sacramento host their own professional scenes.',
    },
    {
      question: 'Does JoinOrigin operate in California?',
      answer:
        'Yes. JoinOrigin has no local offices. The California region page is in English — the source language — and the platform helps people find or start communities anywhere in the state.',
    },
  ],
};

export default content;
