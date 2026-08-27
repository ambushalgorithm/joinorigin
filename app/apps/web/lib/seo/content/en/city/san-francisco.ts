import type { CityContent } from '../../types';

/**
 * San Francisco content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from the New York City and Berlin flagship files
 * (G5) and grounded in honest Bay Area facts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'san-francisco',
  intro: [
    'San Francisco is a compact city of about 827,000 residents packed onto forty-seven square miles of hills at the edge of the Pacific, and its communities are shaped by that density and geography. The tech economy dominates the conversation — software, artificial intelligence, fintech, and biotech companies anchor the region and draw founders and engineers from around the world — but the city also has deep creative, civic, and neighborhood scenes in the Mission, SoMa, the Castro, North Beach, and the Richmond and Sunset districts.',
    'The Bay Area is one of the most educated and internationally connected metros anywhere, with UC Berkeley and Stanford just across the bay and UCSF, SF State, and the University of San Francisco inside the city limits. BART, Muni, and the famous cable cars make cross-city gathering practical, while public anchors like Golden Gate Park, Dolores Park, the Ferry Building, and the waterfront offer free, well-known places to meet. The fog gives the city a particular rhythm: mornings are often socked in, and golden afternoons pull people outside.',
    'For anyone looking to find or start an Origin, San Francisco rewards specificity and consistency. A group that meets weekly at the same café or park corner builds trust fast in a city where everyone is busy building something, and the Bay Area’s culture of events, talks, and demo nights means new Origins rarely struggle to find an audience.',
  ],
  dataPoints: [
    'About 827,000 residents in a 47-square-mile city.',
    'Regional anchors include UC Berkeley, Stanford, UCSF, and SF State.',
    'Software, AI, fintech, biotech, and clean energy clusters.',
    'BART, Muni, and cable cars connect the city and Bay Area.',
    'Public anchors: Golden Gate Park, Dolores Park, Ferry Building, waterfront.',
    'Neighborhood scenes: Mission, SoMa, Castro, North Beach, Richmond, Sunset.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in SoMa and the Financial District',
        'Mission District startup lofts',
        'University incubators near UCSF and UC Berkeley',
        'Cafés with meeting corners in the Mission',
        'Venture and accelerator event rooms in SoMa',
        'Waterfront event spaces near the Ferry Building',
      ],
      formats: [
        'Demo nights and pitch evenings',
        'Founder breakfasts with round intros',
        'AI and developer meetups with live builds',
        'Biotech and healthtech panel evenings',
        'Cross-bay founder mixers at happy hour',
      ],
      howToStart: [
        'Pick a narrow vertical — AI tooling, climate tech, healthtech, or developer infrastructure — and name the group around it.',
        'Book a recurring weekly slot at a SoMa coworking space or a Mission café that welcomes groups.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm after the launch.',
      ],
    },
    creative: {
      venues: [
        'Mission District murals and gallery spaces',
        'Artist studios in the Dogpatch and Hunters Point',
        'North Beach literary cafés and bookstores',
        'Design studios in SoMa',
        'Theater and music venues in the Mission and Hayes Valley',
        'Craft workshops and maker spaces in the Bayview',
      ],
      formats: [
        'Open studio weekends and art walks',
        'Poetry nights and open mics in North Beach',
        'Design critique evenings',
        'Film and video maker circles',
        'Craft-specific workshops in maker spaces',
      ],
      howToStart: [
        'Choose one craft, neighborhood, or career stage so the group builds a clear identity.',
        'Partner with a gallery, bookstore, or studio that will host a first open event.',
        'Collect works in progress before the second gathering and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'City Hall hearing rooms',
        'Neighborhood center rooms across the districts',
        'Tenant and housing advocacy offices in the Mission',
        'Public library meeting rooms',
        'Community gardens and street-closure event spaces',
        'Civic tech meetup spaces in SoMa',
      ],
      formats: [
        'Housing policy info evenings',
        'Tenant rights workshops',
        'Board of Supervisors hearing prep sessions',
        'Transit and street-safety volunteer briefings',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a block, a district, or a single housing proposal.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how city government works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Dolores Park and Golden Gate Park lawns',
        'Mission District cafés with outdoor tables',
        'North Beach bars and literary haunts',
        'Ferry Building plaza and waterfront paths',
        'Public libraries with community rooms',
        'Neighborhood breweries in the Dogpatch',
      ],
      formats: [
        'Weekly park meetups and picnics',
        'Fog-friendly café socials',
        'Board game and trivia evenings',
        'Weekend bike and hike groups',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly park session, a monthly walk — and a fixed venue.',
        'Pick a spot like Dolores Park or a Mission café that will host you consistently.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Neighborhood shop corridors in the Mission and Noe Valley',
        'Ferry Building merchant spaces',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés with community corners',
        'Sunday farmers market stalls and vendor meetings',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Street festival planning for block parties',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to vent about rent, permits, and delivery theft.',
        'After three breakfasts, rotate one practical topic per month and let the merchant association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The San Francisco startup scene sits at the center of the global technology economy, with software, artificial intelligence, fintech, biotech, and climate tech companies drawing founders, engineers, and investors from every continent. SoMa and the Financial District hold the densest concentration of coworking spaces and venture-backed teams, while the Mission and the East Bay host a grittier, more experimental layer of bootstrapped founders and indie hackers. What makes the scene distinctive is its proximity to research institutions — UCSF anchors healthtech and biotech, UC Berkeley feeds engineering talent, and Stanford is forty minutes down the peninsula — so a weekly meetup can realistically mix a researcher, a product manager, and a first-time founder in one room. Established formats include demo nights, founder breakfasts, and industry-specific happy hours, many of them explicitly welcoming to newcomers and to remote workers who just moved to the city. Honest advice for starting a startup Origin here: narrow your vertical, pick a venue that will host you weekly, and lean into the Bay Area habit of showing up — the audience is enormous, but attention is the scarcest resource.',
    creative:
      'San Francisco creative communities carry a long, proud lineage — from the Beat poets of North Beach to the Mission mural movement, the punk scene of the seventies, and today’s design, film, and maker culture. The Mission is the visual heart: its murals, galleries, and artist lofts draw painters, illustrators, and photographers, while the Dogpatch and Hunters Point hold industrial-scale studios for sculptors, ceramicists, and fabricators. North Beach keeps its literary soul with poetry nights and independent bookstores, and SoMa hosts design studios and game studios working at the intersection of art and technology. The city’s compactness means a creative community can gather at a studio in the morning, a gallery in the afternoon, and a poetry reading in the evening. Common formats include open studio weekends, portfolio nights, and craft-specific workshops where makers share equipment and honest feedback. Because rent is high, many creatives collaborate by necessity — sharing studios, tools, and networks — which makes community membership a practical survival strategy as much as a social one.',
    political:
      'San Francisco has one of the most active civic and political cultures in the United States, shaped by its progressive politics, its housing crisis, and a long history of neighborhood organizing. The Board of Supervisors represents eleven districts, which keeps local government accessible: residents can attend hearing prep sessions, testify at City Hall, and join district-level networks around housing, transit, homelessness, and public safety. Tenant advocacy is a defining thread — rent control, eviction defense, and affordability campaigns keep volunteer-run organizations busy across the city. Civic tech groups build tools for open data and participatory budgeting, while volunteer networks organize street cleanups, community gardens, and mutual aid projects in every neighborhood. The culture rewards directness and follow-through: showing up to a real meeting matters more than online commentary. Starting a political Origin in San Francisco means choosing a concrete issue and a small geography, then partnering with the rich existing landscape of organizers instead of duplicating their work.',
    meetup:
      'San Francisco’s meetup scene is as layered as the city itself: park picnics on Dolores Hill, book clubs in North Beach cafés, board game nights in the Dogpatch breweries, and fog-defying morning walks along the waterfront. The city’s scale is a gift for organizers — most neighborhoods have a café, a library, a park, and a bar within walking distance, so a group can gather without transit planning. Golden Gate Park, Dolores Park, the Ferry Building plaza, and the Embarcadero waterfront are the best-known free anchors, and the year-round mild climate means outdoor formats work in most months. Because the Bay Area is full of newcomers, transplants, and remote workers, meetups that explicitly welcome new people tend to fill quickly. Formats with staying power are simple and repeatable: a weekly park session, a monthly language exchange, a standing trivia night. Honest advice for starting one: pick a format you would attend yourself, lock in the same time and place, and let the city’s density of curious people do the growth work.',
    'small-business':
      'San Francisco small business communities are built on the city’s fiercely independent shop culture: the Mission taqueria, the Noe Valley bookstore, the North Beach café, the Chinatown herbalist, and the Ferry Building food maker all share the same practical questions about rent, permits, staffing, and foot traffic. Merchant corridors act as natural communities of interest, with street festivals, block parties, and shared concerns about sidewalk conditions and public safety bringing owners together. The city’s small business assistance centers and the chamber of commerce offer workshops on licensing, loans, and digital selling, often free or low-cost. What binds these groups together is place: a cluster of shops on one street shares customers, deliveries, and the fate of the public space around them. Newcomers usually connect by attending a corridor meeting, joining a farmers market vendor collective, or taking a city workshop. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent negotiations, insurance, and online ordering, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'San Francisco offers a dense, curious, and well-connected audience for Origin events, which makes it one of the best cities in the world for trying new gathering ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in San Francisco, from Mission cafés and Dolores Park lawns to Ferry Building plazas and neighborhood libraries. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s density of builders and curious people do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Bay Area newcomer coffee crawl',
            pitch:
              'A Saturday stroll through three Mission cafés where newcomers and long-term residents trade city tips, work stories, and contacts.',
            audience: 'New arrivals and remote workers',
            venueType: 'Mission District cafés',
          },
          {
            title: 'Founder AMA at a SoMa coworking space',
            pitch:
              'A founder shares their honest journey for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'SoMa coworking space',
          },
          {
            title: 'Ferry Building waterfront mixer',
            pitch:
              'A low-pressure evening walk along the Embarcadero with icebreaker prompts and a rule that you meet three new people.',
            audience: 'Anyone expanding their local network',
            venueType: 'Ferry Building plaza and waterfront',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Indie hacker breakfast',
            pitch:
              'A weekly early breakfast where bootstrappers and side-project builders share revenue numbers, experiments, and lessons.',
            audience: 'Independent builders and bootstrappers',
            venueType: 'A café with a private corner in the Mission',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'AI tools for non-engineers',
            pitch:
              'A hands-on workshop where non-technical professionals learn practical ways to use AI tools for writing, research, and analysis.',
            audience: 'Marketers, operators, and analysts',
            venueType: 'Coworking space or library classroom',
          },
          {
            title: 'Startup finance in plain English',
            pitch:
              'A practical session covering runways, burn rate, cap tables, and when to raise — led by a local finance professional.',
            audience: 'First-time founders and side-hustlers',
            venueType: 'Fintech office or incubator event room',
          },
          {
            title: 'Fog photography walk',
            pitch:
              'A guided morning walk through the fog with photography prompts, ending at a café for sharing shots.',
            audience: 'Photographers of every level',
            venueType: 'Golden Gate Bridge overlook and waterfront',
          },
          {
            title: 'Tenant rights 101',
            pitch:
              'A plain-language session on rent control, eviction protections, and where to get free housing counseling.',
            audience: 'Renters and housing advocates',
            venueType: 'Neighborhood center or library',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-English guide to district elections, Board of Supervisors hearings, and how to testify on a proposal.',
            audience: 'New activists and curious residents',
            venueType: 'City Hall or district meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Dolores Park picnic and games',
            pitch:
              'Blankets, badminton, and frisbee on the famous hill, with a rotating potluck theme and golden-hour views.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Dolores Park lawns',
          },
          {
            title: 'Golden Gate Park garden stroll',
            pitch:
              'A slow walk through the park’s gardens and meadows, stopping at the Conservatory and bison paddock.',
            audience: 'Sunday explorers',
            venueType: 'Golden Gate Park paths',
          },
          {
            title: 'Waterfront sunrise walk',
            pitch:
              'A gentle early walk along the Embarcadero with a rotating conversation theme, ending with coffee.',
            audience: 'Early risers and walkers',
            venueType: 'Embarcadero waterfront paths',
          },
          {
            title: 'Board game night at a Dogpatch brewery',
            pitch:
              'A weekly stack of board games at a neighborhood brewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Dogpatch brewery taproom',
          },
          {
            title: 'Bike the Wiggle and Panhandle',
            pitch:
              'A relaxed ride on the famously flat route from the Panhandle to the Haight, with café stops.',
            audience: 'Leisure cyclists of every level',
            venueType: 'The Wiggle bike route and Panhandle paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Climate tech founders table',
            pitch:
              'A monthly roundtable for climate tech founders to share progress, partnerships, and policy news.',
            audience: 'Climate tech founders and operators',
            venueType: 'Cleantech office or accelerator room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in SoMa',
          },
          {
            title: 'Biotech and healthtech happy hour',
            pitch:
              'An informal evening where scientists, operators, and investors trade notes on the local life-sciences scene.',
            audience: 'Biotech and healthtech professionals',
            venueType: 'UCSF-affiliated or Mission Bay event space',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'Coworking meeting room in SoMa',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Mission mural walking tour',
            pitch:
              'A guided walk through the murals of the Mission with the stories behind the artists and history.',
            audience: 'Art walkers and photographers',
            venueType: 'Mission District streets and alleyways',
          },
          {
            title: 'North Beach poetry night',
            pitch:
              'A welcoming open mic at a historic literary café with a ten-minute feature and a supportive audience.',
            audience: 'Writers of all levels',
            venueType: 'North Beach literary café or bookstore',
          },
          {
            title: 'Open studio Saturday in the Dogpatch',
            pitch:
              'A neighborhood of studios opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Dogpatch artist studios',
          },
          {
            title: 'Ceramics and pottery circle',
            pitch:
              'A hands-on evening where potters share wheels, kilns, and feedback on works in progress.',
            audience: 'Potters and beginner ceramicists',
            venueType: 'Community pottery studio or maker space',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in the Mission',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Neighborhood cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or park, with gloves and coffee supplied by local shops.',
            audience: 'Neighbors and local business owners',
            venueType: 'A chosen street in any neighborhood',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Mutual aid volunteer briefing',
            pitch:
              'A short orientation plus a first shift for volunteers supporting local mutual aid and food distribution projects.',
            audience: 'First-time volunteers',
            venueType: 'A local mutual aid hub or food pantry',
          },
          {
            title: 'Housing policy book club',
            pitch:
              'A small group reads one housing book or proposal per month and discusses what it means for the city.',
            audience: 'Housing wonks and concerned residents',
            venueType: 'Library or neighborhood center meeting room',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop owners share the stories behind their businesses in five-minute talks, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or merchant hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In San Francisco, recurring formats with a fixed venue — a weekly park session, a monthly founders table, a standing critique night — build community fastest.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: public parks, library meeting rooms, community gardens, and cafés that welcome groups. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most San Francisco Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in San Francisco?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where San Franciscans gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in San Francisco?',
      answer:
        'Yes. The city has free public venues, dense transit, and a culture of attending events. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Dolores Park, Golden Gate Park, Mission cafés, the Ferry Building, neighborhood libraries — exists in San Francisco. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in San Francisco?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps San Franciscans find or start Origins.',
    },
  ],
};

export default content;
