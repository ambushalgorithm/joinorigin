import type { CityContent } from '../../types';

/**
 * Kyiv content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'kyiv',
  pageTitles: {
    city: 'Communities in Kyiv | JoinOrigin',
    cityDescription:
      'Find or start communities in Kyiv — startup, creative, political, meetup, and small business groups across the Ukrainian capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Kyiv | JoinOrigin',
      creative: 'Creative communities in Kyiv | JoinOrigin',
      political: 'Political & civic communities in Kyiv | JoinOrigin',
      meetup: 'Meetup & social communities in Kyiv | JoinOrigin',
      'small-business': 'Small business communities in Kyiv | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Kyiv — founders, engineers, and operators around Unit.City, Podil, and the IT scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Kyiv — studios, galleries, and collectives across Podil, the art factories, and the centre. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Kyiv — volunteer networks, hromada initiatives, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Kyiv — Dnipro embankment evenings, café culture, and park life. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Kyiv — market traders, café owners, and neighbourhood shops. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Kyiv | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Kyiv — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Kyiv is a city with an extraordinary capacity for community. Its modern history — the Maidan protests, the volunteer movements that followed, and the resilience demanded since 2022 — has produced a civil society that organises fast and helps neighbours first. Volunteer networks, community kitchens, and support groups are woven into everyday life, and the city’s famous café culture keeps conversations flowing between them.',
    'The Dnipro river divides the city and connects it: the left-bank districts and the right-bank centre face each other across parks, embankments, and beaches like Hydropark. Universities such as Taras Shevchenko University, KPI, and the Kyiv-Mohyla Academy feed a constant stream of students, and a vast IT sector has made Kyiv one of Europe’s largest tech talent pools. Unit.City, the innovation park, anchors the startup scene, while Podil and the old centre hold the creative energy.',
    'Kyiv life today balances normality and caution: communities gather when it is safe, and the culture of checking on neighbours is second nature. Newcomers who are patient, respectful of safety guidance, and open to the city’s warmth will find deep, genuine communities here.',
  ],
  dataPoints: [
    'Roughly 2.9 million residents; the capital of Ukraine.',
    'Universities include Taras Shevchenko University, KPI, and the Kyiv-Mohyla Academy.',
    'One of Europe’s largest IT talent pools, anchored by Unit.City and the tech sector.',
    'Public anchors: the Dnipro river, Mariinskyi Park, Hydropark, and Podil.',
    'A strong volunteer and civil-society culture built over the last decade.',
    'Café and specialty-coffee culture — a natural base for meetups and communities.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Unit.City innovation park halls',
        'Coworking floors in Podil and the centre',
        'IT office event rooms in the left-bank districts',
        'KPI and Mohyla Academy entrepreneurship spaces',
        'Startup cafés along the embankment',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'IT outsourcing and product founder tables',
        'Game dev and AI builder nights',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — B2B SaaS, game dev, or AI — and an English-friendly name.',
        'Reserve a weekly slot at a Unit.City or Podil coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Podil studios and galleries',
        'Art factories — Platforma, the former workshops',
        'Street-art walls across the centre',
        'Art school and academy workshop rooms',
        'Theatre and rehearsal spaces',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Podil studio open days with live demos',
        'Mural walks with artist talks',
        'Illustration and poster critique evenings',
        'Electronic and folk-fusion jam nights',
        'Independent press and zine swaps',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Podil for studios, the art factories for events.',
        'Ask a Platforma collective or an art-school workshop to host your opening session.',
        'End every gathering with a public walk-through of the night’s work — Kyiv makers love an audience.',
      ],
    },
    political: {
      venues: [
        'City council and district administration rooms',
        'Volunteer hub spaces across the city',
        'Hromada (community) initiative rooms',
        'Community centres in every district',
        'Public libraries with meeting rooms',
        'Parks and squares used for gatherings',
      ],
      formats: [
        'Volunteer network briefing evenings',
        'Housing and utility-rights info sessions',
        'Neighbourhood initiative planning meetings',
        'First-aid and safety trainings',
        'Civic participation workshops',
      ],
      howToStart: [
        'Start with one concrete issue — a park, a shelter, a street — and map who already cares about it.',
        'Join an established volunteer hub first; trust and coordination are everything in Kyiv.',
        'Hold your first meeting with coffee and clear roles — Kyiv organisers value action over talk.',
      ],
    },
    meetup: {
      venues: [
        'Cafés and specialty-coffee bars in Podil',
        'The Dnipro embankment and its parks',
        'Hydropark beaches and riverbanks',
        'Mariinskyi Park and Holosiivskyi Park',
        'Board game cafés in the centre',
        'Community centres with café corners',
      ],
      formats: [
        'Weekly café table at the same spot',
        'Dnipro embankment walks and runs',
        'Hydropark beach days in summer',
        'Board game and quiz evenings',
        'Language exchange tables (Ukrainian–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly café meet, a monthly embankment walk — and a fixed spot.',
        'Pick a café, park, or riverbank that will host you every time, and check safety guidance first.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Bessarabskyi Market and food halls',
        'Café and roastery owners’ tables',
        'IT and creative small-shop corridors',
        'Chamber of commerce seminar rooms',
        'Neighbourhood shop streets in Podil',
        'Craft and makers’ market stalls',
      ],
      formats: [
        'Early-morning trader coffee before opening',
        'Café owner roundtables on sourcing and seasonality',
        'Chamber clinics on registration and digitalisation',
        'Shared supplier and delivery cooperatives',
        'Street festival and market planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market or café street — Bessarabskyi Market’s traders are a proven meeting point.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first coffee meeting.',
        'Collect the owners’ recurring headaches — registration, rent, delivery — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Kyiv’s startup and IT scene is one of Europe’s largest, built on a deep engineering talent pool and a culture of shipping software for global markets. Unit.City, the innovation park on the left bank, anchors the ecosystem with offices, events, and accelerators, while coworking floors across Podil and the centre host a dense community of product teams, outsourcing companies, and founders. KPI and the Kyiv-Mohyla Academy feed graduates into early teams, and strengths include B2B SaaS, game development, AI, and cybersecurity. Formats include founder breakfasts, pitch evenings, demo days, and IT networking nights that connect startups with the outsourcing giants of the local economy. The community is internationally oriented — English is common in product groups — and remarkably resilient: projects continue across borders and time zones. Starting a startup community in Kyiv works best with a narrow vertical and a regular rhythm — a monthly B2B SaaS table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Kyiv’s creative communities are as bold as the city’s murals: Podil’s studios and galleries, the converted workshops of Art-Zavod Platforma, and the street-art walls that cover whole buildings give artists, designers, and musicians a distinctive stage. The city’s traditions — embroidery, ceramics, and folk illustration — connect old workshops with contemporary makers, while the Academy and the art schools feed a steady stream of graduates into a scene known for graphic design, music, and cinema. Formats include open studio weekends in Podil, mural walks with artist talks, design critiques, and music production circles, with the city’s cafés providing the natural meeting point after every event. The scene is compact and connected, and Ukrainian creativity — honed by history — is taken seriously internationally. Starting a creative community in Kyiv is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Kyiv’s civic life runs on volunteer energy and a powerful sense of hromada — community. The Maidan protests of 2013–14 and the full-scale war since 2022 forged a civil society that organises quickly and helps neighbours first: volunteer hubs coordinate aid, community kitchens feed those in need, and support networks check on the vulnerable. City councils and district administrations keep local decisions close, and residents regularly organise around parks, utilities, and housing. The political culture values action and trust: Kyiv residents respect organisers who deliver, and newcomers are welcomed into networks that take care of each other. Safety comes first — gatherings follow official guidance — but the community spirit is constant, from small street initiatives to citywide campaigns. Starting a political or civic community means choosing a concrete issue and a small geography, then partnering with an established volunteer hub — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Kyiv’s meetup scene runs on café culture, the Dnipro, and the city’s warm social rhythm. Podil’s cafés and specialty-coffee bars fill with friends and strangers alike, and a weekly table at the same spot becomes a community in itself. The Dnipro embankment is the city’s great outdoor stage — walks, runs, and bike rides stretch along the water, while Hydropark’s beaches and riverbanks host summer days. Mariinskyi Park and Holosiivskyi Park offer green escapes for picnics and games, and board game cafés carry the winter evenings. Language exchanges (Ukrainian–English) run across the centre, and the city’s volunteer culture means even casual meetups often end with someone organizing help for someone in need. The rhythm is genuine and direct — Kyiv people say what they think and mean what they say. Starting a meetup in Kyiv means choosing a repeatable format and a fixed venue, following safety guidance, and letting the city’s warmth do the rest.',
    'small-business':
      'Kyiv small business communities are anchored by the city’s markets, cafés, and neighbourhood streets. Bessarabskyi Market, the historic covered market in the centre, hosts a community of stallholders who share suppliers, schedules, and gossip, while the food halls and farmers’ markets of the left bank add a modern layer. The city’s famous café scene — roasters, specialty bars, and family coffee shops — forms a tight network of owners who compare notes on sourcing, staff, and seasonality. The chamber of commerce offers workshops on registration and digitalisation, and the city’s festivals give traders a shared calendar. What binds these groups is place and craft: a market hall or a café street is a natural community with a collective stake in the neighbourhood’s life. Starting a small business community is very achievable: a monthly trader coffee at a market hall, with rotating topics like registration, rent, and delivery, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Kyiv is a city where communities form fast and care deeply: the café culture gives every group a venue, the Dnipro embankment gives summer gatherings a stage, and the volunteer spirit means people show up. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Kyiv, from cafés and markets to parks and art factories. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Organisers should always follow official safety guidance. Pick the idea that matches your interests, find a venue that will host you, and let Kyiv’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Café table for newcomers',
            pitch:
              'A weekly gathering at the same Podil café where newcomers and long-term residents trade city tips over coffee.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A café in Podil',
          },
          {
            title: 'Founder breakfast at Unit.City',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and syrnyky.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café at Unit.City',
          },
          {
            title: 'Embankment meet-and-greet',
            pitch:
              'A low-pressure evening walk on the Dnipro embankment, with a rule that you meet three new people.',
            audience: 'Walkers and newcomers',
            venueType: 'The Dnipro embankment',
          },
          {
            title: 'Expat Kyiv circle',
            pitch:
              'International residents share settling-in tips — registration, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A specialty-coffee bar in the centre',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Ukrainian table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Ukrainian',
            venueType: 'A café or community centre in Podil',
          },
          {
            title: 'Registration and tax clinic',
            pitch:
              'A practical session on registration, tax basics, and the administrative steps every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'IT industry open night',
            pitch:
              'A friendly introduction to Kyiv’s tech sector — roles, companies, and how newcomers can break in.',
            audience: 'Career changers and new graduates',
            venueType: 'An IT office or coworking hall',
          },
          {
            title: 'Varenyky making class',
            pitch:
              'A hands-on evening of folding varenyky with a grandmother-chef, followed by a shared dinner.',
            audience: 'Home cooks and curious newcomers',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'First aid and safety training',
            pitch:
              'A practical session run by certified instructors on first aid, fire safety, and emergency readiness.',
            audience: 'Residents and volunteers of every background',
            venueType: 'A volunteer training centre',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Mariinskyi Park picnic',
            pitch:
              'Blankets, frisbee, and river views in the city’s elegant park, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Mariinskyi Park',
          },
          {
            title: 'Hydropark beach day',
            pitch:
              'A summer afternoon of swimming, volleyball, and picnicking on the Dnipro’s beaches.',
            audience: 'Summer lovers and newcomers',
            venueType: 'Hydropark beaches',
          },
          {
            title: 'Embankment bike ride',
            pitch:
              'A relaxed ride along the Dnipro’s cycle paths, with coffee and river-view stops.',
            audience: 'Leisure cyclists of every pace',
            venueType: 'The Dnipro embankment cycle paths',
          },
          {
            title: 'Board game evening at a café',
            pitch: 'A weekly stack of board games at a café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in the centre',
          },
          {
            title: 'Podil street-food walk',
            pitch:
              'A guided evening crawl through the neighbourhood’s food spots, with one shared plate at each.',
            audience: 'Food lovers and newcomers',
            venueType: 'The food streets of Podil',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Tech founders table',
            pitch:
              'A monthly roundtable for tech founders to share progress, fundraising lessons, and partnerships.',
            audience: 'Tech founders and operators',
            venueType: 'A coworking meeting room at Unit.City',
          },
          {
            title: 'Game dev night',
            pitch:
              'Game developers share projects, engines, and lessons from Ukraine’s proud game industry.',
            audience: 'Game developers and enthusiasts',
            venueType: 'A game studio or tech event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Podil',
          },
          {
            title: 'Creative industries night',
            pitch:
              'Design, film, and music professionals share industry news and make introductions.',
            audience: 'Creative industry professionals',
            venueType: 'An art factory or creative agency space',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'A startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Podil open studio day',
            pitch:
              'A district of studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio streets of Podil',
          },
          {
            title: 'Mural walk through the centre',
            pitch:
              'A guided walk past the city’s giant murals, with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'The mural streets of the centre',
          },
          {
            title: 'Vyshyvanka embroidery workshop',
            pitch:
              'Learn the stitches of traditional Ukrainian embroidery with a master craftsperson.',
            audience: 'Craft lovers and culture-curious newcomers',
            venueType: 'A craft workshop or cultural centre',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'A hands-on evening of zine making with risograph printing and trading at the end.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print studio or arts space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Volunteer hub briefing',
            pitch:
              'An orientation at an established volunteer hub, followed by a first shift with a real team.',
            audience: 'First-time volunteers',
            venueType: 'A volunteer hub or community centre',
          },
          {
            title: 'Neighbourhood help map night',
            pitch:
              'Neighbours gather to map who on the street needs support — the elderly, new families, the ill — and plan help.',
            audience: 'Neighbours who want to help',
            venueType: 'A community centre or local café',
          },
          {
            title: 'Park cleanup morning',
            pitch:
              'A Saturday morning cleanup of a park or riverbank, with gloves, bags, and coffee supplied.',
            audience: 'Park lovers and volunteers',
            venueType: 'A Kyiv park or the Dnipro banks',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'Bessarabskyi Market',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Kyiv, recurring formats with a fixed venue — a weekly café table, a monthly embankment walk — build community fastest.',
      },
      {
        question: 'Do I need to speak Ukrainian to organise?',
        answer:
          'No. Many Kyiv groups run in English or are bilingual, especially in tech and creative scenes. A little Ukrainian opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Kyiv communities start, and the city’s volunteer spirit gives you a proven pattern. Always follow official safety guidance, and the how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Kyiv?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Kyiv residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Kyiv?',
      answer:
        'Yes. Kyiv has cafés, parks, and the Dnipro embankment as venues, plus a deeply rooted volunteer culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — cafés, market halls, parks, art factories, volunteer hubs — exists in Kyiv. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Kyiv?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Kyiv residents find or start communities.',
    },
  ],
};

export default content;
