import type { CityContent } from '../../types';

/**
 * Lima content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the Pacific coast Peruvian capital.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'lima',
  intro: [
    'Lima is the capital of Peru and a city of about 7.7 million people — with more than ten million across the metro — set on the Pacific coast where the ocean meets the desert. The city is famous around the world for its food: ceviche, pisco sour, and a gastronomy scene that has made Lima a global culinary capital, with restaurants, markets, and cooking schools feeding a deep culture of eating together.',
    'The city is Peru’s economic and startup center, with a growing fintech and creative scene, and its neighborhoods have distinct personalities: Miraflores and Barranco for cafés, art, and the ocean cliffs, San Isidro for business, and the Centro Histórico for the deep layers of history — colonial plazas, the San Marcos university founded in 1551, and pre-Inca huacas (ancient ruins) standing in the middle of modern streets. PUCP, San Marcos, and other universities feed constant flows of students and researchers into local communities.',
    'Lima’s weather is famously gray — a coastal fog called garúa covers the sky for much of the year — but the city’s social life is warm and lively: the Malecón boardwalk, the beaches of the Costa Verde, the bars of Barranco, and the cevicherías of every neighborhood. For finding or starting an Origin, Lima rewards choosing a neighborhood, a good venue, and a group that celebrates the city’s food and its proud, hospitable culture.',
  ],
  dataPoints: [
    'About 7.7 million residents; 10M+ in the metro.',
    'Capital of Peru on the Pacific coast.',
    'Global gastronomy capital; ceviche and pisco sour culture.',
    'Fintech, creative, and culinary industry clusters.',
    'Anchors: PUCP, San Marcos, UPC, USIL.',
    'Neighborhood scenes: Miraflores, Barranco, San Isidro, Centro Histórico.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Miraflores and San Isidro',
        'Centro startup offices',
        'University incubators near PUCP and San Marcos',
        'Fintech and e-commerce office event rooms',
        'Accelerator event rooms in Miraflores',
        'Cafés with founder tables in Barranco',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and payments panel evenings',
        'Gastronomy and food-tech meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, food tech, or creative tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Miraflores or San Isidro coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Barranco galleries and artist studios',
        'Miraflores cultural centers',
        'Centro Histórico museums and courtyards',
        'Design studios in Barranco',
        'Music venues and peñas',
        'Street-art walks in Barranco',
      ],
      formats: [
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Music and peña socials',
        'Literature and poetry readings',
      ],
      howToStart: [
        'Choose one craft — visual art, design, music, literature — and a neighborhood.',
        'Partner with a gallery, cultural center, or peña that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and municipal offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces in Miraflores',
        'Park and plaza event spaces',
      ],
      formats: [
        'Housing and rental info evenings',
        'Tenant rights workshops',
        'Transit and mobility volunteer briefings',
        'Climate and water-awareness circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a neighborhood, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Miraflores Malecón boardwalk',
        'Barranco plazas and bars',
        'Parque Kennedy and nearby cafés',
        'Costa Verde beaches',
        'Centro Histórico plazas',
        'Public libraries with community rooms',
      ],
      formats: [
        'Malecón walks and runs',
        'Surf and beach gatherings',
        'Café socials and language exchanges',
        'Ceviche crawl and food walks',
        'Board game and trivia evenings',
      ],
      howToStart: [
        'Choose a repeatable format — a boardwalk walk, a ceviche crawl — and a fixed meeting point.',
        'Pick a spot like the Malecón or a Barranco plaza that is easy to find.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Miraflores and Barranco shop corridors',
        'Mercado and feria vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and cevicherías with community corners',
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
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and the food economy.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Lima startup scene is the largest in Peru and a rising force in Latin America, built on a growing consumer market, a strong fintech wave, and a food culture that is generating its own food-tech industry. Miraflores and San Isidro hold the densest concentration of coworking spaces and venture-backed startups, while universities like PUCP and San Marcos feed engineers and founders year after year. What makes the scene distinctive is its connection to Peru’s strengths: gastronomy is producing a food-tech layer of delivery, logistics, and kitchen startups, and the country’s financial inclusion gap has made fintech a natural focus. The scene is smaller and more collaborative than Mexico City or São Paulo, which means newcomers can genuinely meet most of the relevant people within a few months. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in Lima: pick a vertical, anchor to Miraflores or Barranco, and lean into the city’s warmth — a consistent weekly event will build a loyal following.',
    creative:
      'Lima creative communities are thriving in Barranco, the city’s bohemian district of galleries, artist studios, bars, and ocean cliffs. The neighborhood has been home to Peruvian poets, painters, and musicians for generations, and its energy now extends to design, film, and the city’s booming culinary arts. Miraflores adds cultural centers and a sophisticated gallery scene, while the Centro Histórico layers colonial architecture with museums that tell Peru’s deep history. The city’s peñas — venues for traditional Peruvian music — keep Andean and criollo culture alive, and the gastronomy boom has turned chefs into celebrities and cooking schools into community hubs. The gray coastal fog gives the city an intimate, indoor creative culture: cafés, studios, and galleries are where the scene lives. Starting a creative Origin in Lima means choosing a discipline and a neighborhood, then using the city’s rich cultural inheritance and its proud, expressive audience to build something with real soul.',
    political:
      'Lima political and civic communities are shaped by the city’s scale, its inequalities, and its role as the national capital: housing, mobility, water, and public safety are the issues that animate local organizing. The city is divided into districts with elected mayors, which keeps local politics accessible — residents can attend district council sessions and shape land-use and public-space decisions in their own neighborhood. Housing affordability and informal settlements organize tenant groups and community movements, while transit and mobility advocates push for better Metro and bus service in one of the most congested cities in the region. Climate and water awareness are growing priorities in a desert city, and civic tech communities build tools for open data and participation. The political culture rewards persistence, trust-building, and neighborhood knowledge. Starting a civic Origin in Lima usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizations.',
    meetup:
      'Lima meetup culture is built on the Malecón, the boardwalk that runs along the ocean cliffs of Miraflores, and on the plazas, cafés, and cevicherías that anchor daily life. Weekend walks and runs along the Malecón, surf sessions on the Costa Verde beaches, ceviche crawls through neighborhood markets, and café socials in Barranco — the city runs on these rhythms. The gray, mild weather is actually a gift for organizers: it never gets too hot or too cold, and outdoor formats run all year. The city’s food culture makes eating together the default social format, and its growing international population supports language exchanges and newcomer socials. Formats with staying power are simple and repeatable: a boardwalk walk, a monthly ceviche crawl, a standing trivia night. Honest advice for starting a meetup in Lima: pick a neighborhood, a landmark meeting point, and a format that celebrates the city’s food and warmth — Limaños will show up for a group that feels real.',
    'small-business':
      'Lima small business communities are built on the city’s streets and markets: the cevichería, the bodega (corner store), the Barranco gallery-shop, the Miraflores boutique, and the mercado vendor all share practical questions about rent, permits, staffing, and the flow of customers. The city’s mercados are communities in themselves — vendors coordinate around supplies, security, and regular customers — and commercial corridors in Miraflores, Barranco, and the Centro hold shop clusters with a shared stake in foot traffic. The gastronomy boom has created a powerful food-business network: cevicherías, chifa restaurants, and cooking schools feed each other customers and talent. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a mercado vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café or cevichería, with rotating topics like rent, insurance, and digital payments, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Lima’s food culture, coastal cliffs, and warm social style make it a wonderful place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Lima, from the Miraflores Malecón and Barranco plazas to cevicherías, cultural centers, and neighborhood markets. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Barranco café crawl',
            pitch:
              'A Saturday stroll through three cafés in the bohemian district, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Barranco cafés',
          },
          {
            title: 'Founder AMA at a Miraflores coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Miraflores coworking space',
          },
          {
            title: 'Newcomer welcome social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over pisco sours and conversation prompts.',
            audience: 'Newcomers to the city',
            venueType: 'Barranco bar or community room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Malecón sunset walk and meet',
            pitch:
              'A guided walk along the ocean cliffs at sunset, with conversation prompts and a drink stop.',
            audience: 'Sunset lovers and networkers',
            venueType: 'Miraflores Malecón boardwalk',
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
            venueType: 'Café or community center in Miraflores',
          },
          {
            title: 'Ceviche cooking workshop',
            pitch:
              'A hands-on evening learning to prepare ceviche the traditional way, with a tasting to follow.',
            audience: 'Home cooks and food lovers',
            venueType: 'Cooking school or cevichería kitchen',
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
            title: 'Malecón morning walk club',
            pitch:
              'A weekly walk along the ocean cliffs with a rotating conversation theme, ending with coffee.',
            audience: 'Walkers and early risers',
            venueType: 'Miraflores Malecón boardwalk',
          },
          {
            title: 'Surf and beach day at the Costa Verde',
            pitch:
              'A relaxed day of surfing, beach games, and picnics on the cliffs below the city.',
            audience: 'Surfers and beach lovers',
            venueType: 'Costa Verde beaches',
          },
          {
            title: 'Barranco art and bar stroll',
            pitch: 'A guided evening walk through the galleries and bars of the bohemian district.',
            audience: 'Culture lovers and night owls',
            venueType: 'Barranco streets and plazas',
          },
          {
            title: 'Ceviche crawl through a mercado',
            pitch:
              'A tasting walk through a neighborhood market, sampling ceviche from several vendors and voting for the best.',
            audience: 'Food lovers and explorers',
            venueType: 'Neighborhood mercado',
          },
          {
            title: 'Board game night at a Miraflores bar',
            pitch:
              'A monthly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Miraflores bar or café',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech and payments roundtable',
            pitch:
              'A monthly discussion for founders and operators working on payments, credit, and financial inclusion.',
            audience: 'Fintech founders and professionals',
            venueType: 'Fintech office or coworking event room',
          },
          {
            title: 'Food-tech and gastronomy meetup',
            pitch:
              'An informal evening where restaurateurs, delivery operators, and food-tech founders share trends.',
            audience: 'Food industry professionals',
            venueType: 'Culinary school or restaurant event space',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Barranco',
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
            title: 'Barranco street-art walk',
            pitch:
              'A guided walk past the district’s murals and graffiti, with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'Barranco streets and walls',
          },
          {
            title: 'Studio open day in Barranco',
            pitch:
              'Artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Barranco artist studios',
          },
          {
            title: 'Peña night for traditional music',
            pitch: 'A welcoming evening of Peruvian music and dance at a traditional peña.',
            audience: 'Music lovers and culture explorers',
            venueType: 'Neighborhood peña',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Barranco venue or cultural center',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Barranco',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of the Costa Verde, with gloves and coffee supplied.',
            audience: 'Volunteers and ocean lovers',
            venueType: 'A chosen Costa Verde beach',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Huaca heritage walk',
            pitch:
              'A guided visit to one of the ancient ruins in the middle of the city, with the history explained.',
            audience: 'History lovers and curious residents',
            venueType: 'A huaca site like Huaca Pucllana',
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
              'Shop and cevichería owners share the stories behind their businesses in five-minute talks.',
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
          'Match the category to your interests and the audience you can reach. In Lima, food-centered and outdoor formats along the Malecón or in Barranco tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Lima events run in English or bilingually, especially in Miraflores and Barranco. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Lima Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Lima?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where Limaños gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Lima?',
      answer:
        'Yes. The city has free public venues, a mild year-round climate, and a warm, hospitable culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Malecón, Barranco plazas, cevicherías, cultural centers, mercados — exists in Lima. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Lima?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Limaños find or start Origins.',
    },
  ],
};

export default content;
