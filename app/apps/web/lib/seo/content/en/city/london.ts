import type { CityContent } from '../../types';

/**
 * London content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'london',
  pageTitles: {
    city: 'Communities in London | JoinOrigin',
    cityDescription:
      'Find or start communities in London — startup, creative, political, meetup, and small business groups across the capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in London | JoinOrigin',
      creative: 'Creative communities in London | JoinOrigin',
      political: 'Political & civic communities in London | JoinOrigin',
      meetup: 'Meetup & social communities in London | JoinOrigin',
      'small-business': 'Small business communities in London | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in London — founders, engineers, and operators around Shoreditch, King’s Cross, and the City. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in London — studios, galleries, and collectives across East London, Peckham, and the South Bank. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in London — resident associations, tenants’ unions, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in London — pub groups, book clubs, running clubs, and language exchanges. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in London — market traders, independent shops, and high-street networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in London | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in London — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'London is a capital city built on layers: Roman walls beneath medieval streets, Victorian terraces beside glass towers, and a population drawn from every corner of the world. That density makes it one of the best cities on earth for communities. Whatever you care about — a craft, an industry, a cause, or simply meeting new people — somewhere in the 32 boroughs a group already gathers, and starting a new one is a realistic next step.',
    'Geography shapes how Londoners connect. The Tube and Overground make cross-town attendance ordinary, so communities scale beyond a single neighborhood. Finance and law anchor the City, tech and media fill Shoreditch and King’s Cross, universities like UCL, Imperial, and the LSE feed talent into every scene, and the parks — Hyde Park, Hampstead Heath, Victoria Park — plus the canals give groups free, well-known places to meet.',
    'The pub remains the city’s most reliable community venue, but coworking spaces, libraries, and market halls now host as many gatherings as the corner boozer. Whether you want to find your people or build a community from scratch, London rewards showing up consistently and picking a format that fits the city’s pace.',
  ],
  dataPoints: [
    'Roughly 9 million residents across 32 boroughs plus the City of London.',
    'Capital of the United Kingdom, in the England region.',
    'Universities include UCL, Imperial College London, LSE, and King’s College London.',
    'Finance and legal districts in the City; tech clusters in Shoreditch and King’s Cross.',
    'Public anchors: Hyde Park, Regent’s Park, Hampstead Heath, Victoria Park, and the canals.',
    'Deep pub and market culture — a natural base for meetups and small business communities.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Shoreditch and Old Street',
        'Incubator event rooms near King’s Cross',
        'Fintech office lobbies around Canary Wharf',
        'University startup hubs at UCL and Imperial',
        'Warehouse event spaces in Hackney Wick',
        'Pubs with upstairs rooms for founder socials',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo nights',
        'Industry happy hours — fintech, healthtech, AI',
        'Investor office hours at accelerators',
        'Hackathons and weekend builder jams',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, climate, AI builders, or deep tech — and a name that signals it.',
        'Reserve a recurring weekly slot at a Shoreditch or King’s Cross coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and lock a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Studios and project spaces in Hackney Wick and Peckham',
        'Galleries in Mayfair and the South Bank',
        'Film and fashion studios in Shoreditch',
        'Music rehearsal rooms and small venues in Dalston',
        'Arts colleges — Goldsmiths, UAL, RCA — campus rooms',
        'Markets and arches used as pop-up exhibition space',
      ],
      formats: [
        'Open studio weekends and portfolio nights',
        'Design critique evenings in studio collectives',
        'Music production circles that share gear',
        'Zine and print fairs in market halls',
        'Exhibition walkthroughs with artist talks',
      ],
      howToStart: [
        'Pick a craft, a borough, and a regular evening — specificity builds identity faster in London.',
        'Find a studio collective or gallery in East London or Peckham willing to host the first night.',
        'Run a first open studio session, collect work in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'Borough council chamber rooms across the 32 boroughs',
        'Tenants’ union halls and resident association rooms',
        'Community centres in inner and outer London',
        'Civic tech meetup spaces in the City and Shoreditch',
        'Public libraries with meeting rooms',
        'School halls used for ward-level meetings',
      ],
      formats: [
        'Ward and borough assembly meetings',
        'Tenant rights and rent-law workshops',
        'Resident association planning sessions',
        'Volunteer canvassing and phone-banking evenings',
        'Civic 101 sessions on how councils work',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a housing estate, or a single policy.',
        'Attend three existing meetings in that area and partner instead of duplicating work.',
        'Host a newcomer-friendly session on how local government works to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Pubs with function rooms in every borough',
        'Parks — Hyde Park, Hampstead Heath, Victoria Park',
        'Public libraries and community halls',
        'Canalside cafés along Regent’s Canal',
        'Bookshops with reading rooms',
        'Sports clubs and leisure centres',
      ],
      formats: [
        'Weekly pub quiz or book club',
        'Parkrun and weekend walking groups',
        'Language exchange tables in cafés',
        'Board game evenings in community rooms',
        'Sunday market strolls and canal walks',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly quiz, a monthly walk — and a fixed venue.',
        'Pick a pub, park, or library that will host you every time and announce three dates up front.',
        'Ask every attendee to invite one person; consistency outlasts any single event.',
      ],
    },
    'small-business': {
      venues: [
        'Market halls — Borough, Portobello Road, Columbia Road',
        'High-street cafés with community rooms',
        'Chamber of commerce event spaces',
        'Craft brewery taprooms with long tables',
        'Business improvement district offices',
        'Local library meeting rooms',
      ],
      formats: [
        'Monthly owner roundtables at a local café',
        'Street market and festival planning sessions',
        'Council and chamber workshops on licences and rates',
        'Peer groups for hiring, payroll, and insurance',
        'High-street walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor or market — Portobello, Brick Lane, a suburban high street — and invite owners to a first coffee.',
        'Rotate practical topics like rent, rates, and footfall so every meeting pays for itself.',
        'Partner with the local chamber or business improvement district to reach owners beyond your network.',
      ],
    },
  },
  variantIntros: {
    startup:
      'London’s startup scene is one of Europe’s largest, spanning fintech in the City and Canary Wharf, media and marketplaces around Shoreditch, and a growing deep-tech corridor through King’s Cross. Founders cluster in coworking spaces along Old Street — the old Silicon Roundabout — while UCL, Imperial, and the LSE feed graduates into accelerators and early teams. What distinguishes London is breadth plus access: a founder can meet an investor at breakfast, a designer at lunch, and a regulator at an evening panel without leaving zone one. Community patterns are well established: pitch nights, demo days, founder breakfasts, and industry-specific happy hours run every week of the year. Newcomers usually enter by attending open meetups, joining a coworking community, or volunteering at one of the city’s many conferences. Honest advice for starting a startup community here is to pick a narrow vertical — fintech, climate, AI builders, or healthtech — because generalist groups dilute quickly in a market this dense.',
    creative:
      'London creative communities span fashion, film, music, design, and fine art, and they draw on one of the world’s deepest pools of studios, galleries, and cultural institutions. East London — Hackney Wick, Dalston, Shoreditch — hosts the densest cluster of artist studios and project spaces, while Peckham and Deptford have become the newer creative frontiers. UAL, Goldsmiths, and the RCA graduate thousands of makers into a freelance economy that runs on referrals, making community membership a practical career asset. Meetup patterns include open studio weekends, portfolio reviews, design critiques, and music production circles that share equipment and feedback. Fashion and film workers organise through ateliers and production offices, often sharing casting calls and crew lists within their groups. The scale is enormous, yet scenes stay surprisingly findable because word travels through specific studios, Instagram accounts, and print fairs. Anyone starting a creative community in London should specialise: one craft, one borough, or one career stage builds identity far faster than a general arts club.',
    political:
      'London’s political and civic communities operate at every level, from ward meetings and resident associations to citywide tenants’ unions and campaign groups on housing, transport, climate, and air quality. The city is divided into 32 boroughs, each with its own council, which keeps a surprising amount of power genuinely local — a resident can attend a ward meeting or a tenants’ association gathering a few streets away. Housing is the defining issue: groups like the London Renters Union run workshops, clinics, and campaigns that are open to newcomers. Civic tech volunteers build tools for open data and council transparency, while countless community groups care for parks, estates, and neighbourhood centres. Campaigners also organise around clean-air zones, school streets, and the nightly economy, so there is a cause for almost every interest. The culture rewards persistence and local knowledge — organisers who show up to real meetings. Starting a civic community means picking a concrete issue and a small geography, then partnering with existing organisations rather than duplicating them.',
    meetup:
      'London’s meetup scene is vast and varied, powered by the pub, the park, and the city’s endless supply of curious newcomers. Book clubs meet in pub function rooms, running groups pound the parks at dawn, language exchanges fill cafés in the evening, and board game nights spread across community halls. The Tube makes cross-borough attendance normal, so groups can grow far beyond one neighbourhood without losing their core. Popular formats include weekly pub quizzes, Parkrun and weekend walking groups, canal-side strolls, and low-stakes socials where newcomers are explicitly welcomed. The density means a niche interest — a hobby, a language, a sport — can usually find its people within a couple of evenings out. If you want to start a meetup, choose a repeatable format, lock a venue that will host you every time, and announce the first three dates up front. London’s scale does the rest of the work.',
    'small-business':
      'London’s small business community is a patchwork of market traders, independent shops, restaurateurs, craftspeople, and freelancers who share the same practical questions about rent, rates, licences, and footfall. Markets like Borough, Portobello Road, and Columbia Road are not just places to shop — they are communities with traders’ associations, shared calendars, and a collective stake in the street’s reputation. Business improvement districts and chambers of commerce organise training, networking, and lobbying on behalf of thousands of small firms. What binds these groups together is place: a high street or market corridor forms a natural community where owners know each other’s names. Newcomers typically join by attending a trader’s meeting, taking a council workshop, or visiting a chamber event. Starting a small business community is very achievable: a monthly roundtable at a local café, with rotating topics like payroll, rates, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'London rewards the organiser who picks a real place and a repeatable format. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a venue type that genuinely exists in London, from pub function rooms and market halls to Hampstead Heath and community libraries. Some ideas work as one-off events; others are designed to become recurring communities. The honesty rule is simple: every venue is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let London’s density do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Pub quiz newcomers table',
            pitch:
              'A rotating team at the same weekly pub quiz — turn up, join the table, and leave with new friends.',
            audience: 'Quiz lovers and new residents',
            venueType: 'A pub that runs weekly quizzes',
          },
          {
            title: 'Tube-line coffee crawl',
            pitch:
              'A monthly coffee crawl along one Tube line, visiting a different neighbourhood café each time.',
            audience: 'Coffee lovers and city explorers',
            venueType: 'Cafés along a chosen Tube line',
          },
          {
            title: 'Founder supper club',
            pitch:
              'A small monthly dinner where eight founders share stories and solve each other’s problems over three courses.',
            audience: 'Founders and operators of every stage',
            venueType: 'A private dining room in a pub',
          },
          {
            title: 'Lunchtime walk and talk',
            pitch:
              'A brisk 30-minute networking walk for office workers, swapping names and business cards on the move.',
            audience: 'City workers in zone one',
            venueType: 'A lunchtime walking route through the City',
          },
          {
            title: 'Expat London circle',
            pitch:
              'International newcomers share settling-in tips — bank accounts, visas, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A community centre or café room',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Pub history walk',
            pitch:
              'A guided walk through the city’s oldest pubs, with the stories behind the names and the regulars.',
            audience: 'History lovers and pub fans',
            venueType: 'A historic pub on the route',
          },
          {
            title: 'Family history research club',
            pitch:
              'Learn to trace your family tree using the library’s archives and databases, with expert help.',
            audience: 'Genealogy beginners and curious families',
            venueType: 'A library archive room',
          },
          {
            title: 'Renters rights clinic',
            pitch:
              'A plain-language session on deposits, repairs, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A public library meeting room',
          },
          {
            title: 'Canal ecology walk',
            pitch:
              'Learn about the wildlife of the canals — kingfishers, herons, and hidden history — on a guided towpath walk.',
            audience: 'Nature lovers and families',
            venueType: 'The Regent’s Canal towpath',
          },
          {
            title: 'Pub chat for English practice',
            pitch:
              'A relaxed conversation group in a pub where learners practise English with native speakers.',
            audience: 'Non-native English speakers',
            venueType: 'A quiet pub with a back room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Hampstead Heath ponds swim',
            pitch:
              'A friendly morning of pond swimming on the heath — the city’s most beloved wild swimming spot.',
            audience: 'Swimmers of every level',
            venueType: 'The Hampstead Heath swimming ponds',
          },
          {
            title: 'Sunday roast club',
            pitch:
              'A weekly roast at a different pub each Sunday, with a rotating guest list and a loyalty card.',
            audience: 'Roast lovers and weekend explorers',
            venueType: 'A different pub each week',
          },
          {
            title: 'Borough market food tour',
            pitch:
              'A guided tasting walk through the market’s stalls with stories behind the traders and the ingredients.',
            audience: 'Food lovers and visitors',
            venueType: 'Borough Market',
          },
          {
            title: 'Parkrun cheer and coffee',
            pitch:
              'Meet before the weekly 5k, cheer each other on, and follow with coffee at a nearby café.',
            audience: 'Runners of every pace',
            venueType: 'A Parkrun course in a London park',
          },
          {
            title: 'Kayak paddle on the canal',
            pitch:
              'A guided beginner paddle along a quiet stretch of canal, with boats and safety gear provided.',
            audience: 'Water lovers and beginners',
            venueType: 'A canal-side launch point',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech breakfast at Canary Wharf',
            pitch:
              'A monthly breakfast where fintech founders and operators share progress and regulation learnings.',
            audience: 'Fintech founders and operators',
            venueType: 'An event space near Canary Wharf',
          },
          {
            title: 'Legal tech circle',
            pitch:
              'Lawyers, technologists, and founders discuss how the legal industry is changing — and what to build next.',
            audience: 'Legal and tech professionals',
            venueType: 'A law firm event room',
          },
          {
            title: 'Product manager pub circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge over drinks — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A pub function room in Shoreditch',
          },
          {
            title: 'Media and creative industries night',
            pitch:
              'Publishing, film, music, and advertising professionals share industry news and make introductions.',
            audience: 'Media and creative professionals',
            venueType: 'A media office or agency space',
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
            title: 'Hackney Wick open studios',
            pitch:
              'An evening walk through the studio yards of Hackney Wick, meeting makers and seeing work in progress.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio yards of Hackney Wick',
          },
          {
            title: 'Theatre writers circle',
            pitch:
              'Playwrights and writers share pages in progress and get honest feedback in a rehearsal-room setting.',
            audience: 'Writers for stage and screen',
            venueType: 'A rehearsal room or theatre space',
          },
          {
            title: 'Street-food maker market',
            pitch:
              'Home cooks and small producers test new dishes at a community market with real customer feedback.',
            audience: 'Food entrepreneurs and taste-testers',
            venueType: 'A market hall or community kitchen',
          },
          {
            title: 'Vinyl and beatmakers night',
            pitch:
              'Producers bring records and unfinished tracks, swap samples, and talk gear into the evening.',
            audience: 'DJs, producers, and vinyl fans',
            venueType: 'A record store or small music venue',
          },
          {
            title: 'Zine and print night',
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
            title: 'High-street champion circle',
            pitch:
              'Residents and shop owners team up to support their local high street — events, campaigns, and shared wins.',
            audience: 'Neighbours and independent shop owners',
            venueType: 'A business improvement district office',
          },
          {
            title: 'Friends of the park workday',
            pitch:
              'Join a Friends group for a morning of planting, litter picks, and planning the park’s next season.',
            audience: 'Park users and volunteers',
            venueType: 'A London park and its volunteer shed',
          },
          {
            title: 'Community fridge volunteer night',
            pitch:
              'Help sort and stock a community fridge that shares surplus food with neighbours, followed by tea and cake.',
            audience: 'Food-rescue volunteers',
            venueType: 'A community fridge hub',
          },
          {
            title: 'Neighbourhood litter pick',
            pitch:
              'A Saturday morning cleanup of one street or estate, with gloves and coffee supplied by local shops.',
            audience: 'Neighbours and shop owners',
            venueType: 'A chosen street in any borough',
          },
          {
            title: 'Market trader stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like Borough',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In London, recurring formats with a fixed venue — a weekly pub quiz, a monthly walk, a regular breakfast — build community fastest.',
      },
      {
        question: 'Do I need a big budget to organise in London?',
        answer:
          'No. Pubs, libraries, parks, and community centres host events for the price of a drink or nothing at all. Start with a free public venue and a clear format.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most London communities start. The how-to guides walk through the first event to a stable community, and the venue suggestions here are all real kinds of places in the city.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in London?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real boroughs, venues, and formats where Londoners gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in London?',
      answer:
        'Yes. London has enormous density, free public spaces, and a culture of showing up. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — pub function rooms, market halls, Hampstead Heath, community libraries — exists in London. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in London?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Londoners find or start communities.',
    },
  ],
};

export default content;
