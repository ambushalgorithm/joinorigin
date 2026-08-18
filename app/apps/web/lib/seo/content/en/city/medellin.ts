import type { CityContent } from '../../types';

/**
 * Medellín content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the transformed Colombian valley city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'medellin',
  intro: [
    'Medellín is the capital of Antioquia and a city of about 2 million people — with nearly four million across the Aburrá Valley — set in a narrow Andean valley that gives it the mild, flower-filled climate that earned it the nickname the City of Eternal Spring. The city’s transformation from the violence of the 1980s and 1990s into a global model of urban innovation is one of the most famous urban stories of our time, and it shapes how the city sees itself and how its communities organize.',
    'That transformation was built on real infrastructure: the Metro and Metrocable cable cars that connect the hillside comunas to the valley floor, the outdoor escalators of Comuna 13, the public library parks, and the bike network. El Poblado and Laureles hold the cafés, coworking spaces, and startups; Ciudad del Río anchors the creative and innovation district; and the comunas hold a powerful culture of community organization, street art, and hip-hop. Universidad de Antioquia, EAFIT, and other universities feed a constant flow of students and researchers into the scene.',
    'Medellín is proud of its paisa identity — the friendly, hardworking, entrepreneurial culture of the region — and of its flowers: the Feria de las Flores is the city’s biggest celebration. For finding or starting a community, Medellín rewards showing up with genuine commitment, building trust with existing organizations, and choosing a neighborhood — the city’s communities are strong, and they welcome people who respect that strength.',
  ],
  dataPoints: [
    'About 2 million residents; nearly 4M in the Aburrá Valley.',
    'Capital of Antioquia; the City of Eternal Spring.',
    'Metro, Metrocable, and outdoor escalators connect the comunas.',
    'Anchors: Universidad de Antioquia, EAFIT, UPB.',
    'Public anchors: Botanical Garden, Parque Arví, Plaza Botero, Comuna 13.',
    'Neighborhood scenes: El Poblado, Laureles, Comuna 13, Ciudad del Río, Envigado.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in El Poblado and Ciudad del Río',
        'Innovation district offices in Ciudad del Río',
        'University incubators near EAFIT and Antioquia',
        'Accelerator event rooms in El Poblado',
        'Ruta N innovation center event rooms',
        'Cafés with founder tables in Laureles',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and logistics panel evenings',
        'Innovation ecosystem showcases',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, creative tech, or social impact — and a neighborhood anchor.',
        'Book a recurring weekly slot at an El Poblado or Ciudad del Río coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Ciudad del Río creative district studios',
        'Comuna 13 street-art routes',
        'Museum of Antioquia and Plaza Botero spaces',
        'El Poblado galleries',
        'Botanical Garden event spaces',
        'Music venues and salsa clubs',
      ],
      formats: [
        'Street-art walks through Comuna 13',
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Salsa and music socials',
      ],
      howToStart: [
        'Choose one craft — street art, design, music, visual art — and a neighborhood.',
        'Partner with a gallery, cultural center, or community group that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and municipal offices',
        'Public library park meeting rooms',
        'Community center rooms in the comunas',
        'Neighborhood association halls',
        'Civic tech meetup spaces in Ciudad del Río',
        'Park and plaza event spaces',
      ],
      formats: [
        'Neighborhood assembly meetings',
        'Housing and public-space info evenings',
        'Youth and community program briefings',
        'Peace and reconciliation circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a comuna, a barrio, or a single project.',
        'Attend three existing community meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Botanical Garden lawns',
        'Parque Arví trails (by Metrocable)',
        'El Poblado and Laureles cafés',
        'Plaza Botero and city center plazas',
        'Comuna 13 viewpoints and art routes',
        'Public library parks with community rooms',
      ],
      formats: [
        'Sunday park picnics and walks',
        'Metrocable adventure meetups',
        'Café socials and language exchanges',
        'Board game and trivia evenings',
        'Salsa and dance socials',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday walk, a monthly park picnic — and a fixed meeting point.',
        'Pick a spot like the Botanical Garden or a Laureles café that is easy to reach by Metro.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'El Poblado and Laureles shop corridors',
        'Mercado and feria vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and areperías with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Market vendor roundtables',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and tourism.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Medellín startup scene is one of Latin America’s most inspiring, built on a deliberate public investment in innovation: Ruta N, the city’s innovation center, has made entrepreneurship a civic priority, and the city is now a genuine hub for fintech, creative tech, and social-impact startups. El Poblado holds coworking spaces and venture-backed teams, Ciudad del Río anchors the innovation district, and universities like EAFIT and Universidad de Antioquia feed founders and engineers year after year. What makes the scene distinctive is its origin story: a city that transformed itself through public-private collaboration now exports that model, and its startups often carry a social mission. The mild climate and lower costs make Medellín a magnet for international founders and remote workers, which adds a growing English-speaking layer to the community. Established formats include founder breakfasts, demo nights, and innovation showcases at Ruta N, many of them free and open. Honest advice for starting a startup community in Medellín: pick a vertical, anchor to El Poblado or Ciudad del Río, and embrace the city’s collaborative spirit — a consistent weekly event will build a loyal following.',
    creative:
      'Medellín creative communities are inseparable from the city’s transformation: the street art of Comuna 13 tells the story of a community that turned its walls into canvases and its history into art, and the neighborhood’s graffiti tours are now world-famous. Ciudad del Río anchors the contemporary creative district, with design studios, galleries, and innovation spaces in converted industrial buildings, while the Museum of Antioquia and Plaza Botero bring world-class art to the city center. The Botanical Garden hosts concerts and events, and the city’s salsa and music scenes give creatives a natural social rhythm — every neighborhood has its own dance school and every weekend brings live music somewhere in the valley. The annual Feria de las Flores celebrates the region’s flower culture with parades, exhibitions, and silletero displays that are a creative industry of their own. Starting a creative community in Medellín means choosing a discipline and a neighborhood, then using the city’s powerful story of transformation and its proud, expressive culture to build something with real meaning.',
    political:
      'Medellín political and civic communities are shaped by the city’s extraordinary transformation and by the strength of its neighborhood organizations, especially in the comunas. The city’s famous urban innovations — the Metrocable, the outdoor escalators, the library parks — were themselves the result of community organizing and public participation, and that legacy lives on in active neighborhood assemblies and community associations. Housing, public space, and youth programs are defining issues, and the city’s peace-building history means reconciliation and memory are respected parts of civic life. The municipal government maintains open channels for citizen participation, and civic tech communities build tools for transparency and engagement. The political culture rewards trust, consistency, and genuine commitment — organizers who show up to neighborhood meetings for years are the ones who move things forward. Starting a civic community in Medellín usually means picking a concrete issue and a small geography, then partnering with the strong existing network of community organizations.',
    meetup:
      'Medellín meetup culture is powered by the eternal-spring climate and the city’s beloved Metro: the Botanical Garden hosts picnics and walks, Parque Arví offers forest trails reached by Metrocable, and the cafés of El Poblado and Laureles anchor the city’s social life. The city’s transformation story has made it a magnet for visitors, remote workers, and international students, so newcomer-friendly meetups are common and warmly welcomed. Comuna 13’s viewpoints and street-art routes draw both locals and visitors, and the city’s salsa clubs keep the dance scene alive. Because the Metro makes the valley easy to cross, a group can anchor in one neighborhood and still pull members from across the city. Formats with staying power are simple and repeatable: a Sunday park picnic, a monthly Metrocable adventure, a standing trivia night. Honest advice for starting a meetup in Medellín: pick a neighborhood, a Metro-accessible venue, and a format that celebrates the city’s warmth — Paisas will show up for a group that feels real.',
    'small-business':
      'Medellín small business communities are built on the city’s entrepreneurial paisa culture — the region’s nickname for its hardworking, enterprising people — and on the streets of El Poblado, Laureles, and the city center: the café, the arepería, the boutique, the flower shop, and the mercado vendor all share practical questions about rent, permits, staffing, and the flow of customers. The city’s mercados and ferias give vendors natural communities, and commercial corridors hold shop clusters with a shared stake in foot traffic. The tourism and innovation booms have brought new customers and new competition, and the city’s small business centers plus commercial associations offer workshops on licensing, loans, and digital selling. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a feria vendor collective. Starting a small business community here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and serving international customers, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Medellín’s eternal-spring climate, its beloved Metro, and its proud transformation story make it a wonderful place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Medellín, from the Botanical Garden and Parque Arví to El Poblado cafés, Comuna 13 viewpoints, and library parks. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Laureles café crawl',
            pitch:
              'A Saturday stroll through three cafés in the leafy district, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Laureles cafés',
          },
          {
            title: 'Founder AMA at an El Poblado coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'El Poblado coworking space',
          },
          {
            title: 'Newcomer welcome social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over coffee and conversation prompts.',
            audience: 'Newcomers, remote workers, and students',
            venueType: 'Community center or café event room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library park meeting room',
          },
          {
            title: 'Metro adventure mixer',
            pitch:
              'A group ride on the Metrocable to a viewpoint, with conversation prompts along the way.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Metro and Metrocable stations',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Spanish-English language exchange',
            pitch: 'Tables by level and language, with a simple rule: mistakes are the point.',
            audience: 'Spanish and English learners',
            venueType: 'Café or community center in El Poblado',
          },
          {
            title: 'Coffee region tasting workshop',
            pitch:
              'A hands-on session learning about Colombian coffee from the Antioquia region, with a cupping to follow.',
            audience: 'Coffee lovers and home brewers',
            venueType: 'Café or roastery workshop space',
          },
          {
            title: 'Small business finance in plain Spanish',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Tenant rights workshop',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Coding night for absolute beginners',
            pitch:
              'A guided evening where beginners build their first small project with mentors in the room.',
            audience: 'People switching into tech',
            venueType: 'Coworking space or university lab',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Botanical Garden picnic',
            pitch:
              'Blankets, music, and a potluck in the city’s green heart, with a walk through the butterfly house.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Botanical Garden lawns',
          },
          {
            title: 'Parque Arví trail day',
            pitch:
              'A Metrocable ride up to the forest park for a guided hike and picnic among the trees.',
            audience: 'Hikers and nature lovers',
            venueType: 'Parque Arví trails',
          },
          {
            title: 'Comuna 13 street-art walk',
            pitch:
              'A guided walk through the famous escalators and murals, with local guides telling the story.',
            audience: 'Culture lovers and first-time visitors',
            venueType: 'Comuna 13 streets and escalators',
          },
          {
            title: 'Board game night at an El Poblado bar',
            pitch:
              'A monthly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'El Poblado bar or café',
          },
          {
            title: 'Salsa night for beginners',
            pitch:
              'A fun evening where beginners learn basic salsa steps alongside experienced dancers.',
            audience: 'Dancers of every level',
            venueType: 'Salsa club or dance studio',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Innovation ecosystem showcase',
            pitch:
              'A monthly evening where startups, universities, and city programs present what they are building.',
            audience: 'Founders, investors, and ecosystem builders',
            venueType: 'Ruta N innovation center',
          },
          {
            title: 'Fintech and payments roundtable',
            pitch:
              'A monthly discussion for founders and operators working on payments, credit, and financial inclusion.',
            audience: 'Fintech founders and professionals',
            venueType: 'Coworking or office event room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Ciudad del Río',
          },
          {
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where designers, filmmakers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or coworking room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Gallery walk through Ciudad del Río',
            pitch:
              'A guided evening walk through the galleries and studios of the creative district.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Ciudad del Río studios and galleries',
          },
          {
            title: 'Flower arranging workshop',
            pitch:
              'A hands-on session learning the floral craft the city is famous for, with materials provided.',
            audience: 'Flower lovers and makers',
            venueType: 'Flower market or workshop space',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'El Poblado or Laureles venue',
          },
          {
            title: 'Studio open day in Ciudad del Río',
            pitch:
              'Artists and designers open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Ciudad del Río artist studios',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in El Poblado',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Neighborhood park cleanup',
            pitch:
              'A Saturday morning cleanup of a neighborhood park or viewpoint, with gloves and coffee supplied.',
            audience: 'Volunteers and neighbors',
            venueType: 'A chosen neighborhood park',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Youth mentorship evening',
            pitch:
              'Professionals share their career paths with local students in a friendly, informal setting.',
            audience: 'Professionals and students',
            venueType: 'Community center or library park',
          },
          {
            title: 'Tenant rights information session',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and market owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or market hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Medellín, outdoor formats in the eternal-spring climate — park picnics, Metrocable adventures, salsa nights — tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Medellín events run in English or bilingually, especially in El Poblado and Laureles. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Medellín communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Medellín?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Medellín?',
      answer:
        'Yes. The city has free public venues, a year-round mild climate, and a strong culture of community organization. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Botanical Garden, Parque Arví, El Poblado cafés, Comuna 13, library parks — exists in Medellín. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Medellín?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps residents find or start communities.',
    },
  ],
};

export default content;
