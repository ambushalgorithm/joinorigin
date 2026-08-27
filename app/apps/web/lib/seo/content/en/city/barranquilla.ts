import type { CityContent } from '../../types';

/**
 * Barranquilla content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the Caribbean carnival city of Colombia.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'barranquilla',
  intro: [
    'Barranquilla is the capital of Atlántico and a city of about 1.2 million people — with around two million across its metro area — sitting on the western bank of the Magdalena River delta where Colombia meets the Caribbean Sea. It is the country’s great port city and industrial center, and it is also the carnival capital of Colombia: the Barranquilla Carnival, a UNESCO Intangible Cultural Heritage, is the second-largest carnival in the world, and its music, costumes, and street parties define the city’s identity.',
    'The city is known by its nickname, La Arenosa — the Sandy One — and by the warmth of its costeño culture: the Caribbean rhythm of cumbia, vallenato, and porro; the smell of arepas de huevo and bollo from street vendors; and a hospitality that makes newcomers feel welcome fast. The port and the river are the economic spine — logistics, manufacturing, and trade anchor the local economy — while Uninorte, Universidad del Atlántico, and other universities feed a growing layer of professionals, engineers, and entrepreneurs. The Gran Malecón, the riverfront boardwalk, has become the city’s great public living room, packed with families, runners, and cyclists in the evenings.',
    'The tropical heat shapes daily life: the city comes alive in the early morning and after sunset, and air-conditioned venues matter in the afternoon. For finding or starting an Origin, Barranquilla rewards a warm, festive approach — a group that mixes music, food, and genuine conversation will fit right in with the city’s carnival spirit.',
  ],
  dataPoints: [
    'About 1.2 million residents; ~2M in the metro.',
    'Capital of Atlántico; Colombia’s great port city.',
    'Home of the Barranquilla Carnival (UNESCO heritage).',
    'Logistics, manufacturing, and trade clusters.',
    'Anchors: Uninorte, Universidad del Atlántico.',
    'Public anchors: Gran Malecón, Plaza de la Paz, Paseo Bolívar.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Riomar and El Prado',
        'Logistics and port-adjacent offices',
        'University incubators near Uninorte and Atlántico',
        'Puerta de Oro event center rooms',
        'Accelerator event rooms in Riomar',
        'Cafés with founder tables in Altos del Prado',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Logistics and port-tech panel evenings',
        'Creative and media-tech meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — logistics tech, creative tech, or tourism tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Riomar or El Prado coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Carnival costume workshops',
        'Barrio Abajo cultural spaces',
        'Centro Histórico galleries and courtyards',
        'El Prado design studios',
        'Music venues and salsa clubs',
        'Gran Malecón event stages',
      ],
      formats: [
        'Carnival costume and craft sessions',
        'Cumbia and vallenato music socials',
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
      ],
      howToStart: [
        'Choose one craft — carnival arts, music, visual art, design — and a neighborhood.',
        'Partner with a cultural center, costume workshop, or venue that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and municipal offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Neighborhood association halls',
        'Civic tech meetup spaces in Riomar',
        'Park and Malecón event spaces',
      ],
      formats: [
        'Neighborhood assembly meetings',
        'Housing and public-space info evenings',
        'River and mangrove cleanup briefings',
        'Youth and culture program sessions',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a neighborhood, a corridor, or a single project.',
        'Attend three existing community meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Gran Malecón boardwalk and stages',
        'Paseo Bolívar and Plaza de la Paz',
        'Barrio Abajo cultural streets',
        'Botanical Garden paths',
        'Riomar cafés and restaurants',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunset Malecón walks and runs',
        'Carnival music and dance socials',
        'Café socials and language exchanges',
        'Arepa and street-food crawls',
        'Board game and trivia evenings',
      ],
      howToStart: [
        'Choose a repeatable format — a sunset walk, a street-food crawl — and a fixed meeting point.',
        'Pick a spot like the Gran Malecón or a Barrio Abajo cultural corner that is easy to find.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Riomar and El Prado shop corridors',
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
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and carnival season.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Barranquilla startup scene is smaller than Bogotá’s or Medellín’s but distinctive, built on the city’s strengths in logistics, port operations, and the creative economy of the Caribbean coast. Riomar and El Prado hold coworking spaces and a growing layer of venture-backed teams, while the port and the Magdalena River anchor a natural logistics-tech cluster — shipping, trade, and supply-chain startups find fertile ground here. Universities like Uninorte and Universidad del Atlántico feed engineers, business graduates, and designers into the ecosystem, and the city’s position as the gateway to the Caribbean gives it an international outlook. What makes the scene distinctive is the costeño culture: warm, social, and relationship-driven, which makes community building feel natural. The city is also investing in its innovation infrastructure, with event centers and coworking spaces drawing remote workers and international visitors. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in Barranquilla: pick a vertical, anchor to Riomar or El Prado, and bring the carnival energy — a consistent weekly event with music and warmth will build a loyal following.',
    creative:
      'Barranquilla creative communities are inseparable from the carnival: for months every year, the city’s costume makers, musicians, dancers, and street artists prepare for the Barranquilla Carnival, and that creative engine runs year-round in workshops, cultural centers, and the neighborhoods of Barrio Abajo and the Centro Histórico. The city’s music culture — cumbia, vallenato, porro, and the modern Caribbean sounds that grew from them — gives creatives a constant soundtrack and a natural social rhythm. The Gran Malecón has become a stage for concerts and cultural events, and the city’s museums and galleries keep the visual arts alive. Uninorte and the region’s arts institutions feed new talent each year. Because the carnival culture is built on collective creativity — a neighborhood’s costume troupe, a family’s dance group — community membership is woven into the artistic process itself. Starting a creative Origin in Barranquilla means choosing a discipline and a neighborhood, then using the city’s extraordinary festive energy to build something with real soul.',
    political:
      'Barranquilla political and civic communities are shaped by the city’s rapid growth, its river and coastal geography, and a strong tradition of neighborhood organization. The city has invested heavily in public space — the Gran Malecón and the revitalized riverfront are results of deliberate public policy — and residents are proud of that transformation. Housing, public services, and climate resilience are defining issues: the city sits on the delta, and flooding, sea-level rise, and water management are real concerns that organize both officials and communities. The Magdalena River’s health — its pollution, its mangroves, its role in the city’s identity — drives environmental advocacy and volunteer cleanups. Neighborhood associations remain powerful, and the municipal government holds open channels for citizen participation. The political culture rewards warmth, persistence, and genuine community ties. Starting a civic Origin in Barranquilla usually means picking a concrete issue and a small geography, then partnering with the strong existing network of neighborhood organizations.',
    meetup:
      'Barranquilla meetup culture is defined by the heat and the carnival: the city comes alive in the early morning and after sunset, and the Gran Malecón — the riverfront boardwalk — is the great public living room where families, runners, cyclists, and musicians gather in the evenings. Street-food crawls through the areperías and bollo stands of the neighborhoods, salsa and cumbia socials, and café gatherings in Riomar and El Prado anchor the city’s social life. The city’s costeño hospitality makes newcomers feel welcome immediately, and the carnival season adds a rhythm of parades, music, and costume parties that turns the whole city into a celebration. The tropical climate means outdoor formats work best in the cooler hours, and air-conditioned venues are the afternoon refuge. Formats with staying power are simple and repeatable: a sunset Malecón walk, a monthly street-food crawl, a standing music night. Honest advice for starting a meetup in Barranquilla: pick a cool-hour format, anchor it to the Malecón or a neighborhood cultural corner, and let the city’s warmth do the growth work.',
    'small-business':
      'Barranquilla small business communities are built on the city’s commerce and its food culture: the arepería, the bollo vendor, the Riomar boutique, the El Prado café, and the mercado stall all share practical questions about rent, permits, staffing, and the rhythm of the port city. The city’s mercados and ferias give vendors natural communities, and commercial corridors in Riomar, El Prado, and the Centro hold shop clusters with a shared stake in foot traffic. The port and the river anchor a business culture that is practical and trade-minded, and the carnival creates a seasonal economy of costumes, food, and events that small businesses plan around. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a feria vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and carnival-season planning, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Barranquilla’s carnival spirit, Caribbean warmth, and riverfront culture make it a wonderful place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Barranquilla, from the Gran Malecón and Plaza de la Paz to Riomar cafés, Barrio Abajo cultural spaces, and neighborhood markets. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Riomar café crawl',
            pitch:
              'A Saturday stroll through three cafés in the modern district, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Riomar cafés',
          },
          {
            title: 'Founder AMA at a coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Riomar or El Prado coworking space',
          },
          {
            title: 'Newcomer welcome social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over music and conversation prompts.',
            audience: 'Newcomers to the city',
            venueType: 'Community center or café event room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Malecón sunset mixer',
            pitch:
              'A casual walk along the riverfront at sunset with icebreaker prompts and a rule that you meet three new people.',
            audience: 'Anyone expanding their local network',
            venueType: 'Gran Malecón boardwalk',
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
            venueType: 'Café or community center in Riomar',
          },
          {
            title: 'Carnival costume craft workshop',
            pitch:
              'A hands-on session learning mask-making and costume techniques from a carnival artist.',
            audience: 'Carnival lovers and makers',
            venueType: 'Costume workshop or cultural center',
          },
          {
            title: 'Cumbia and vallenato history talk',
            pitch:
              'An evening tracing the roots of the region’s music, with recordings and live demonstration.',
            audience: 'Music lovers and culture explorers',
            venueType: 'Cultural center or music venue',
          },
          {
            title: 'Small business finance in plain Spanish',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
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
            title: 'Sunset Malecón walk club',
            pitch:
              'A weekly walk along the riverfront as the heat breaks, with a rotating conversation theme.',
            audience: 'Walkers and sunset lovers',
            venueType: 'Gran Malecón boardwalk',
          },
          {
            title: 'Arepa and street-food crawl',
            pitch:
              'A guided tasting walk through the neighborhood stands, sampling arepas de huevo, bollos, and more.',
            audience: 'Food lovers and explorers',
            venueType: 'Neighborhood street-food spots',
          },
          {
            title: 'Botanical Garden morning stroll',
            pitch:
              'A guided walk through the garden in the cool morning hours, learning about Caribbean flora.',
            audience: 'Nature lovers and families',
            venueType: 'Botanical Garden paths',
          },
          {
            title: 'Carnival music and dance social',
            pitch:
              'A welcoming evening of cumbia and vallenato music where beginners learn basic steps.',
            audience: 'Dancers of every level',
            venueType: 'Barrio Abajo cultural space or club',
          },
          {
            title: 'Board game night at an El Prado café',
            pitch:
              'A monthly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'El Prado café',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Logistics and port-tech roundtable',
            pitch:
              'A monthly discussion for operators working in shipping, trade, and port-adjacent technology.',
            audience: 'Logistics and trade professionals',
            venueType: 'Port-adjacent office or event space',
          },
          {
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where designers, filmmakers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in El Prado',
          },
          {
            title: 'Tourism and events industry meetup',
            pitch:
              'An informal evening for operators in the city’s carnival, tourism, and events economy.',
            audience: 'Tourism and events professionals',
            venueType: 'Puerta de Oro or event venue',
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
            title: 'Carnival costume open studio',
            pitch:
              'A costume workshop opens its doors so visitors can see the craft behind the parade.',
            audience: 'Carnival lovers and curious visitors',
            venueType: 'Costume workshop in Barrio Abajo',
          },
          {
            title: 'Barrio Abajo cultural walk',
            pitch:
              'A guided walk through the neighborhood’s cultural spaces, murals, and music venues.',
            audience: 'Culture lovers and first-time visitors',
            venueType: 'Barrio Abajo streets and cultural spaces',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'El Prado or Centro venue',
          },
          {
            title: 'Cumbia percussion circle',
            pitch:
              'A friendly evening of rhythm where beginners learn basic cumbia percussion alongside experienced players.',
            audience: 'Musicians and rhythm-curious beginners',
            venueType: 'Community center or music studio',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in the Centro',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'River and mangrove cleanup',
            pitch:
              'A Saturday morning cleanup of a stretch of riverbank or mangrove, with gloves and coffee supplied.',
            audience: 'Volunteers and river lovers',
            venueType: 'A chosen riverbank or mangrove area',
          },
          {
            title: 'Neighborhood park cleanup',
            pitch:
              'A Saturday morning cleanup of a neighborhood park, with gloves and coffee supplied.',
            audience: 'Volunteers and neighbors',
            venueType: 'A chosen neighborhood park',
          },
          {
            title: 'Carnival heritage circle',
            pitch:
              'A respectful gathering where older carnival figures share stories with younger generations.',
            audience: 'Residents interested in local heritage',
            venueType: 'Cultural center or museum',
          },
          {
            title: 'Youth mentorship evening',
            pitch:
              'Professionals share their career paths with local students in a friendly, informal setting.',
            audience: 'Professionals and students',
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
          'Match the category to your interests and the audience you can reach. In Barranquilla, cool-hour and music-centered formats — sunset Malecón walks, street-food crawls, carnival socials — tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Barranquilla events run in English or bilingually, especially among the city’s professionals and students. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Barranquilla Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Barranquilla?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Barranquilla?',
      answer:
        'Yes. The city has free public venues, a warm costeño culture, and a festive social life. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Gran Malecón, Plaza de la Paz, Riomar cafés, Barrio Abajo cultural spaces, neighborhood markets — exists in Barranquilla. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Barranquilla?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps residents find or start Origins.',
    },
  ],
};

export default content;
