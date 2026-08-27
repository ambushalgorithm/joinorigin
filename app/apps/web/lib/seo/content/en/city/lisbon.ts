import type { CityContent } from '../../types';

/**
 * Lisbon content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'lisbon',
  pageTitles: {
    city: 'Origins in Lisbon | JoinOrigin',
    cityDescription:
      'Find or start Origins in Lisbon — startup, creative, political, meetup, and small business groups across the Portuguese capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup Origins in Lisbon | JoinOrigin',
      creative: 'Creative Origins in Lisbon | JoinOrigin',
      political: 'Political & civic Origins in Lisbon | JoinOrigin',
      meetup: 'Meetup & social Origins in Lisbon | JoinOrigin',
      'small-business': 'Small business Origins in Lisbon | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup Origins in Lisbon — founders, engineers, and operators around Príncipe Real, LX Factory, and the tech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative Origins in Lisbon — studios, galleries, and collectives across Marvila, LX Factory, and the old town. JoinOrigin waitlist.',
      political:
        'Find or start political and civic Origins in Lisbon — freguesia councils, housing activism, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social Origins in Lisbon — miradouro picnics, tasca evenings, and beach days. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business Origins in Lisbon — market traders, pastelaria owners, and neighbourhood shops. JoinOrigin waitlist.',
    },
    ideas: '30 Origin event ideas in Lisbon | JoinOrigin',
    ideasDescription:
      'Discover 30 Origin event ideas in Lisbon — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Lisbon is a city of viewpoints. The miradouros — the terraces that overlook the red rooftops, the Tagus river, and the bridges — are where the city gathers to watch the sun set, share a snack, and talk. Below them, the hills of Alfama, Bairro Alto, and Graça hold a tasca culture of small bars and family kitchens that keeps community life intimate and warm.',
    'The city has changed quickly: tech companies, international startups, and a wave of newcomers have reshaped neighbourhoods like Príncipe Real and the LX Factory creative district, while older rhythms — fado in Alfama, the tram that rattles up the hills, the market halls — still anchor daily life. Universities such as the University of Lisbon, NOVA, and ISCTE feed a constant stream of students, and the Atlantic coast, with its beaches at Carcavelos and the forest of Monsanto, gives residents free outdoor gathering space.',
    'Lisbon’s communities are famously welcoming — the Portuguese habit of talking to strangers in queues and at tasca counters makes finding your people easy. Newcomers who pick a miradouro, a market, or a neighbourhood bar and show up regularly will feel at home quickly.',
  ],
  dataPoints: [
    'Roughly 520,000 residents in the city proper; the capital of Portugal.',
    'Universities include the University of Lisbon, NOVA, and ISCTE.',
    'Public anchors: the miradouros, the Tagus riverfront, and Monsanto forest park.',
    'Creative and tech hubs at LX Factory and in Marvila.',
    'Fado, azulejo, and tasca culture define the old-town social rhythm.',
    'Beaches within reach — Carcavelos and the Costa da Caparica across the river.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Príncipe Real',
        'LX Factory event halls and studios',
        'Tech hub floors near the riverfront',
        'NOVA and ISCTE entrepreneurship rooms',
        'Startup cafés in Cais do Sodré',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Riverside founder walks and talks',
        'Pitch evenings and demo days at LX Factory',
        'Tourism and B2B SaaS founder tables',
        'Web Summit community meetups between events',
        'International founder mixers over pastéis',
      ],
      howToStart: [
        'Pick a narrow vertical — B2B SaaS, tourism tech, or fintech — and an English-friendly name.',
        'Reserve a weekly slot at an LX Factory or Príncipe Real coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Marvila artist studios in former factories',
        'LX Factory galleries and creative offices',
        'Design studios in Príncipe Real',
        'Fado houses and music schools in Alfama',
        'Azulejo tile workshops',
        'Independent cinemas and bookshops',
      ],
      formats: [
        'Open studio weekends in Marvila',
        'Gallery walkthroughs with artist talks',
        'Design and illustration critique evenings',
        'Music and fado open nights',
        'Street-art walks through LX Factory',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Marvila for studios, Alfama for music.',
        'Partner with a studio, gallery, or fado house to host the first critique night.',
        'Make feedback the ritual: every session ends with three spoken comments per work, then a tasca stop.',
      ],
    },
    political: {
      venues: [
        'Freguesia (parish) council meeting rooms',
        'Neighbourhood association halls',
        'Housing activist spaces in the centre',
        'Community centres across the city',
        'Public libraries with meeting rooms',
        'Mercado halls used for assemblies',
      ],
      formats: [
        'Open freguesia council sessions',
        'Housing and rent-rights info evenings',
        'Neighbourhood assembly meetings',
        'Volunteer briefings and first-shift sessions',
        'Citizen initiative planning sessions',
      ],
      howToStart: [
        'Pick one concrete issue and a small geography — a street, a freguesia, or one housing policy.',
        'Join the neighbourhood association that covers your area and offer to co-run one meeting.',
        'Use the freguesia’s public agenda to anchor your second event around a live local decision.',
      ],
    },
    meetup: {
      venues: [
        'Miradouros — Graça, Senhora do Monte, Santa Catarina',
        'Tascas and small bars in Alfama and Bairro Alto',
        'The Tagus riverfront promenades',
        'Parque Eduardo VII and Monsanto forest',
        'Beaches at Carcavelos and the Costa da Caparica',
        'Community gardens and courtyard cafés',
      ],
      formats: [
        'Weekly miradouro sunset gathering',
        'Tasca crawls through the old town',
        'Tram-28 adventure rides',
        'Beach days and surf school mornings',
        'Language exchange tables (Portuguese–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly miradouro sunset, a monthly beach day — and a fixed spot.',
        'Pick a viewpoint, tasca, or beach point that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market halls — Mercado da Ribeira, mercados municipais',
        'Pastelaria owners’ tables',
        'Tasca and restaurant owner networks',
        'Chamber of commerce seminar rooms',
        'Shop corridors in the old town',
        'Craft and vintage fairs in LX Factory',
      ],
      formats: [
        'Early-market owner coffee before opening',
        'Pastelaria and bakery owners’ morning table',
        'Chamber workshops on permits and digitalisation',
        'Shared buying circles for supplies',
        'Tourism-season planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market or shopping street — the Mercado da Ribeira’s traders are a proven magnet.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — permits, rent, seasonal staff — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Lisbon’s startup scene has become one of Europe’s most talked-about, powered by the Web Summit’s global draw, a wave of international founders, and a home-grown community around Príncipe Real, Cais do Sodré, and the LX Factory creative quarter. The city’s strengths include B2B SaaS, marketplaces, tourism tech, and fintech, with a growing climate-tech scene around the Atlantic. Coworking spaces and startup cafés host founder breakfasts, pitch evenings, and demo days, while NOVA and ISCTE feed graduates into early teams. English is the default in most international groups, and the city’s quality of life — light, food, and beach — makes it a magnet for remote workers and serial founders. The community is small enough that reputations travel fast and warm enough that introductions happen easily. The Portuguese rhythm shapes events: relaxed, social, and happily late. Starting a startup Origin in Lisbon works best with a narrow vertical and a regular rhythm — a monthly B2B SaaS table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Lisbon’s creative communities are booming: the old town’s azulejo-tiled streets, the fado houses of Alfama, and the converted factory spaces of LX Factory and Marvila give artists, designers, and musicians a distinctive stage. Marvila has become the new creative frontier, with studios in former warehouses, while LX Factory hosts galleries, design offices, and street-art walls under one industrial roof. The city’s craft traditions — tile painting, ceramics, and guitar-making — connect old workshops with new makers. Formats include open studio weekends, gallery walkthroughs, design critiques, and street-art walks, with miradouro sunsets and tasca dinners providing the natural closing ritual. Independent cinemas and bookshops add a literary thread, and the city’s festivals — from Santo António’s street parties to the summer music circuit — give creatives a steady calendar. International artists and remote creatives mix freely with local makers, giving the scene an unusually open character. Starting a creative Origin in Lisbon is realistic: pick a craft, a district, and a regular evening, and the density of curious, skilled people will find you.',
    political:
      'Lisbon’s civic life runs through the freguesias — the small parish councils that give each neighbourhood a real voice in local planning. Housing is the defining issue: the city’s popularity with tourists and remote workers has pushed rents up sharply, producing active tenant movements and campaigns for affordable housing that are among Europe’s most visible. Neighbourhood associations and civic platforms organise around public space, heritage, and the pace of development, while community centres host meetings, classes, and volunteer groups. The city’s riverside transformation — from highways to promenades — shows what organised residents can achieve, and new debates about tourism, short-term lets, and green space continue that tradition. The political culture is consultative and patient: Lisboetas expect to be heard, and well-organised groups get results. Starting a political Origin means choosing a concrete issue and a small geography, then partnering with existing associations — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Lisbon’s meetup scene is built on the miradouro, the tasca, and the beach. The viewpoints — Graça, Senhora do Monte, Santa Catarina — fill every evening with couples, families, and groups of friends watching the sun drop behind the river, and a weekly sunset gathering is the easiest Origin to start in the city. The old town’s tascas and small bars host fado nights, card games, and long dinners, while the Tagus riverfront promenades are made for walking groups. The beaches at Carcavelos and across the river bring surfers, swimmers, and picnickers together on warm weekends. Formats include miradouro picnics, tasca crawls, tram-28 adventures, language exchanges (Portuguese–English), and outdoor classes in Parque Eduardo VII. The city is compact and walkable, and the Portuguese love of conversation means strangers become regulars quickly. Starting a meetup in Lisbon means choosing a repeatable format and a fixed spot — a weekly sunset or a monthly beach day — and the city’s warmth does the rest.',
    'small-business':
      'Lisbon small business communities are anchored by the city’s markets, pastelarias, and family-run tascas. Mercado da Ribeira — now the famous Time Out Market — and the municipal markets across the city host communities of stallholders who share suppliers, schedules, and gossip. The pastelaria, the bakery-café where Lisboetas start every day with coffee and a pastel de nata, is both a business and a social hub, and owners form tight networks of trust. Family shops in the old town and the newer creative commerce of LX Factory share the same practical questions about rent, permits, and seasonal staff. The chamber of commerce offers workshops on digitalisation and exporting, while the city’s festivals give traders a shared calendar. What binds these groups is place and routine: a market hall or a pastelaria street is a natural community with a collective stake in the neighbourhood’s morning. Starting a small business Origin is very achievable: a monthly trader breakfast at a market hall, with rotating topics like rent, permits, and tourism, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Lisbon is an ideal city for testing new Origin event ideas: the miradouros are free venues with the best sunsets in Europe, the beaches are close, and the city’s conversational culture makes strangers into regulars quickly. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Lisbon, from viewpoints and tascas to market halls and LX Factory studios. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Lisbon’s light do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Miradouro meet for newcomers',
            pitch:
              'A weekly sunset gathering at the same viewpoint where newcomers and long-term residents trade city tips over a snack.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A miradouro like Graça or Santa Catarina',
          },
          {
            title: 'Founder breakfast in Príncipe Real',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over espresso and pastéis.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in Príncipe Real',
          },
          {
            title: 'LX Factory meet-and-greet',
            pitch:
              'A low-pressure evening in the creative quarter, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Creatives, tech workers, and newcomers',
            venueType: 'A café or event space in LX Factory',
          },
          {
            title: 'Expat Lisbon circle',
            pitch:
              'International residents share settling-in tips — paperwork, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in Cais do Sodré',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Portuguese table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Portuguese',
            venueType: 'A café or community centre in Alfama',
          },
          {
            title: 'NIF and tax clinic',
            pitch:
              'A practical session on the tax number, registration, and the basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Pastel de nata baking class',
            pitch:
              'A pastry chef teaches the custard tart that fuels the city, from puff pastry to the perfect caramel top.',
            audience: 'Bakers and sweet-toothed newcomers',
            venueType: 'A bakery or pastelaria kitchen',
          },
          {
            title: 'Fado history and guitar evening',
            pitch:
              'A friendly introduction to fado — its stories, its voices, and the guitar that accompanies them.',
            audience: 'Music lovers and first-timers',
            venueType: 'A fado house or music school room',
          },
          {
            title: 'Azulejo tile painting workshop',
            pitch:
              'Paint your own azulejo tile with a local artist and learn the craft that covers the city’s walls.',
            audience: 'Craft lovers and souvenir seekers',
            venueType: 'A tile workshop or ceramics studio',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Senhora do Monte sunset picnic',
            pitch:
              'Blankets, snacks, and the best view in the city, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'The Miradouro da Senhora do Monte',
          },
          {
            title: 'Tram-28 adventure',
            pitch:
              'Ride the famous yellow tram through the old town, hopping off for coffee and viewpoints along the way.',
            audience: 'Explorers and newcomers',
            venueType: 'The tram-28 route',
          },
          {
            title: 'Tasca crawl through Alfama',
            pitch:
              'A guided evening crawl through five small bars, with one shared plate and story at each.',
            audience: 'Food lovers and newcomers',
            venueType: 'The tascas of Alfama',
          },
          {
            title: 'Surf school morning at Carcavelos',
            pitch:
              'A friendly beginner surf session with instructors, boards, and a beach picnic after.',
            audience: 'Beginners and ocean lovers',
            venueType: 'A surf school at Carcavelos beach',
          },
          {
            title: 'Monsanto forest hike',
            pitch:
              'A guided walk through the city’s great forest park, from its viewpoints to its hidden chapels.',
            audience: 'Walkers and nature lovers',
            venueType: 'Monsanto forest park',
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
            venueType: 'A coworking meeting room in LX Factory',
          },
          {
            title: 'Tourism tech circle',
            pitch:
              'Professionals shaping tourism and hospitality tech share trends and make introductions.',
            audience: 'Tourism and hospitality professionals',
            venueType: 'A hotel event room or industry office',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Cais do Sodré',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in Príncipe Real',
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
            title: 'Marvila open studio day',
            pitch:
              'A district of factory studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The artist studios of Marvila',
          },
          {
            title: 'LX Factory street-art walk',
            pitch:
              'A guided walk through the quarter’s murals and installations with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'The streets of LX Factory',
          },
          {
            title: 'Ceramics circle',
            pitch:
              'A weekly session where potters share wheels, kilns, and feedback on their pieces.',
            audience: 'Potters and curious beginners',
            venueType: 'A ceramics studio or community workshop',
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
            title: 'Renters rights info evening',
            pitch:
              'A plain-language session on rent rules, leases, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association or community centre',
          },
          {
            title: 'Alfama neighbourhood walk',
            pitch:
              'Long-time residents lead a walk through their streets, sharing stories before the crowds arrive.',
            audience: 'Neighbours and curious newcomers',
            venueType: 'The streets of Alfama',
          },
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of coastline, with gloves, bags, and coffee supplied.',
            audience: 'Beach lovers and volunteers',
            venueType: 'Carcavelos beach',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in an urban garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Mercado stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like Mercado da Ribeira',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Lisbon, recurring formats with a fixed venue — a weekly miradouro sunset, a monthly beach day — build community fastest.',
      },
      {
        question: 'Do I need to speak Portuguese to organise?',
        answer:
          'No. Many Lisbon groups run in English or are bilingual, especially in tech and creative scenes. A little Portuguese opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Lisbon Origins start, and the city’s conversational culture gives you a proven pattern. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Lisbon?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real neighbourhoods, venues, and formats where Lisboetas gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Lisbon?',
      answer:
        'Yes. Lisbon has viewpoints, beaches, and tascas as free venues, plus a famously welcoming culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — miradouros, tascas, market halls, LX Factory, beaches — exists in Lisbon. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Lisbon?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Lisboetas find or start Origins.',
    },
  ],
};

export default content;
