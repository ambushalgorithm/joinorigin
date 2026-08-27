import type { CityContent } from '../../types';

/**
 * Dubai content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about the UAE's most populous city; no fabricated
 * numbers, member counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'dubai',
  intro: [
    'Dubai is the most populous city in the United Arab Emirates and one of the world’s most international urban centers — more than eight in ten residents come from somewhere else, which makes community building here both necessary and surprisingly easy. The city runs on a collection of distinct districts: Deira and Bur Dubai along the Creek, the Downtown and Business Bay skyline, the Marina and Palm, and Jumeirah’s beachside neighborhoods, each with its own rhythm.',
    'The economy is organized around free zones and global industries — DIFC for finance, DMCC for commodities, Dubai Internet City and Media City for tech and media — and those districts create natural meeting places for professionals. Universities including the American University of Dubai, University of Wollongong in Dubai, and Heriot-Watt University supply students from dozens of countries, and the startup ecosystem has grown fast, with hubs, accelerators, and co-working spaces across the city. Cultural anchors like Alserkal Avenue and the Dubai Design District give the creative scene real venues, while malls, parks, and beaches host the city’s family and social life.',
    'For anyone looking to find or start an Origin, Dubai rewards choosing a district and a weekday rhythm — the expat culture is open, and a consistent monthly event can grow quickly.',
  ],
  dataPoints: [
    'Roughly 3.8 million residents; the most populous city in the UAE.',
    'More than 80% of residents are international expatriates.',
    'Global districts: DIFC (finance), DMCC, Internet City, Media City.',
    'Universities: American University of Dubai, Wollongong, Heriot-Watt.',
    'Cultural anchors: Alserkal Avenue, Dubai Design District (d3), Dubai Opera.',
    'Beach and marina life: Jumeirah, Dubai Marina, Palm Jumeirah.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in Internet City and Media City',
        'DIFC event floors for fintech mixers',
        'Accelerator demo rooms in the free zones',
        'University startup spaces at AUD and Wollongong',
        'Cafés in Downtown and Business Bay with meeting corners',
        'Hotel boardrooms in the Marina for evening events',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and proptech builder tables',
        'Co-working open houses for early teams',
        'International founder mixers (diverse nationalities)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, proptech, logistics, or SaaS — and name the group around it.',
        'Reserve a recurring weekly slot at a free-zone co-working hub or a Downtown café.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Alserkal Avenue galleries and studios',
        'Dubai Design District (d3) creative floors',
        'Art and design schools in the city',
        'Photography and film studios in the Media City area',
        'Music rehearsal rooms and recording studios',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Art gallery walk groups',
        'Music production and songwriting sessions',
      ],
      howToStart: [
        'Pick a craft, a district, and a regular evening — specificity builds identity fast here.',
        'Find a gallery, studio, or creative hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'Community and cultural center event rooms',
        'Consulate and community association halls',
        'Majlis-style gathering spaces in neighborhoods',
        'Volunteer project rooms near community initiatives',
        'University debate halls and seminar rooms',
        'Public library meeting rooms',
      ],
      formats: [
        'Community town-hall style info sessions',
        'Resident and neighborhood association meetings',
        'Volunteer orientation and first-shift briefings',
        'Cultural exchange evenings with embassies',
        'Youth civic participation workshops',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a school, or one resident group.',
        'Attend three existing community or volunteer meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Beaches — Jumeirah, Kite Beach, and the Marina',
        'Parks and green spaces in residential districts',
        'Cafés in Downtown, JLT, and the Marina with community corners',
        'Rooftop and beach club venues',
        'Mall-adjacent community spaces',
        'Community halls near Metro stops',
      ],
      formats: [
        'Weekend beach and walking groups',
        'Monthly picnic and board game afternoons',
        'Language exchange tables (Arabic, English, and more)',
        'Book club evenings in cafés',
        'Sunday market strolls and food tours',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly beach picnic — and a fixed venue.',
        'Pick a beach, park, café, or community space that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Free-zone business centers',
        'Shop owner corners in Deira and Bur Dubai',
        'SME association and chamber event rooms',
        'Maker market stalls at weekend fairs',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a founder-style table',
      ],
      formats: [
        'Owner breakfast tables with no agenda',
        'SME referral and planning circles',
        'Digital skills clinics (online selling, licensing)',
        'Shared buying circles for supplies and stock',
        'Neighborhood business walking tours',
      ],
      howToStart: [
        'Choose one district and a café that already feeds local owners; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about licensing and suppliers.',
        'After three breakfasts, rotate one practical topic per month and let the SME group spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Dubai has built one of the world’s most active startup ecosystems in a single generation, and its international population makes it a natural meeting point for founders from Europe, Asia, Africa, and the Middle East. The free-zone model is the engine: DIFC for finance, DMCC for trade, and Internet City and Media City for tech, each with accelerators, event floors, and a constant flow of investor meetups and demo days. The startup community clusters around these zones and the cafés of Downtown and Business Bay, where founder breakfasts and pitch evenings run almost weekly. Universities including AUD, Wollongong, and Heriot-Watt supply graduates from dozens of countries, and the city’s startup support infrastructure — incubators, co-working hubs, government programs — is unusually developed. The culture is fast-moving and international: meetings happen in English, on weekdays (the weekend is Friday–Saturday), and often over coffee at a co-working space or hotel lobby. Starting a startup Origin here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or a proptech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Dubai’s creative community is young, international, and expanding quickly. Alserkal Avenue — a former industrial district converted into galleries and studios — anchors the contemporary art scene, while the Dubai Design District (d3) hosts fashion, design, and architecture studios that show and sell to the region. The city’s film, photography, and music scenes draw talent from across the Middle East and South Asia, and creative co-working floors and school programs keep a steady pipeline of emerging makers. Because the population is so international, groups often mix languages and styles, which makes the community unusually open to newcomers. The weekend calendar is full of openings, exhibitions, and design fairs that pull people from across the city and beyond, giving new groups ready-made moments to gather. Recurring formats include gallery walk groups, portfolio nights, and production circles that share gear and feedback. Starting a creative Origin in Dubai is realistic: pick a craft, a district, and a repeatable format, and the city’s diverse talent pool will find you.',
    political:
      'Dubai’s political and civic life is shaped by its structure as part of the UAE federation and by the strong tradition of community association that expatriate and local residents bring from their home countries. The emirate provides formal channels for public participation — community forums, government feedback programs, and municipal consultations — while neighborhood life runs through resident associations, cultural centers, and volunteer networks that organize around schools, parks, and community needs. Majlis culture, the traditional gathering space for consultation and hospitality, still shapes how Emirati and Arab communities convene, and international residents organize their own associations around embassies, schools, and faith groups. The culture rewards courtesy and relationship-building: a real meeting over coffee or a community event matters more than online commentary. Starting a civic Origin means choosing a concrete issue and a small geography — a district, a school, or one resident group — then partnering with existing associations instead of duplicating them.',
    meetup:
      'Dubai’s meetup culture is built on its beaches, malls, cafés, and the simple fact that nearly everyone is new and looking to connect. Kite Beach, Jumeirah, and the Marina anchor weekend groups — beach volleyball, running clubs, and picnic crews all have regular slots. Downtown, JLT, and Marina cafés host book clubs, board game nights, and language exchanges, while rooftop and beach club venues are the classic after-work social spots. The Metro and the city’s grid of districts make meeting points easy to reach, and the weekend runs Friday–Saturday, so Thursday evenings are the popular night for socials. Dubai groups tend to be open, friendly, and used to newcomers — a weekly walk or a monthly beach picnic builds a community fast. Many groups run in English, which makes it easy for residents from any country to join. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a beach sports morning — and a venue that will host you every time.',
    'small-business':
      'Dubai’s small business community is one of the most diverse in the world, spanning Deira trading houses, Bur Dubai retail corridors, free-zone service firms, and a growing number of boutique cafés, studios, and makers. The emirate’s licensing and free-zone systems make it relatively easy to register a company, which attracts entrepreneurs from across the globe and keeps the small business scene in constant motion. SME support organizations, chambers, and business centers run practical clinics on licensing, online selling, and digital marketing, while weekend markets give artisans and food entrepreneurs real venues to sell. What holds these groups together is place and shared experience: owners on one trading street or in one district face the same landlords, suppliers, and customers. Newcomers usually connect by attending a chamber or SME event, joining a market, or taking a small business workshop. Starting a small business Origin in Dubai is very achievable: a monthly roundtable at a local café, with rotating topics like licensing, stock, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Dubai is an ideal city for testing new Origin event ideas: the population is international and open, the venues range from beaches to free-zone event floors, and a consistent monthly event can grow fast. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Dubai, from Kite Beach and Alserkal Avenue to DIFC event floors and district cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Dubai’s openness do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Downtown café with a community corner',
          },
          {
            title: 'Founders circle for expats',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice.',
            audience: 'Early-stage founders in Dubai',
            venueType: 'A free-zone co-working meeting room',
          },
          {
            title: 'Neighborhood meet-and-greet',
            pitch:
              'A low-pressure evening in one district, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single district',
            venueType: 'A community hall or local café',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by group questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A university seminar room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A JLT co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Arabic conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Arabic',
            venueType: 'A café or community center',
          },
          {
            title: 'Business licensing clinic',
            pitch:
              'A practical workshop on choosing a free zone, licensing, and getting a business started in the UAE.',
            audience: 'New entrepreneurs and freelancers',
            venueType: 'A co-working space or chamber room',
          },
          {
            title: 'Repair café workshop',
            pitch:
              'Volunteers help neighbors fix lamps, bikes, and appliances while teaching basic repair skills.',
            audience: 'Residents with broken things and repair-minded volunteers',
            venueType: 'A community workshop or neighborhood hall',
          },
          {
            title: 'Desert and urban gardening 101',
            pitch:
              'A hands-on session on growing herbs and vegetables in the desert climate, with pots and seeds provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or nursery',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to community forums, federal programs, and how to raise an issue in the UAE.',
            audience: 'New residents and curious locals',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Kite Beach sunrise walk',
            pitch: 'A slow early-morning walk along the beach with a coffee stop before work.',
            audience: 'Early risers and beach lovers',
            venueType: 'Kite Beach',
          },
          {
            title: 'Marina jogging and walking group',
            pitch:
              'A relaxed evening jog or walk along the Marina promenade with a pace group for everyone.',
            audience: 'Leisure runners and walkers',
            venueType: 'Dubai Marina promenade',
          },
          {
            title: 'Weekend desert picnic and stargazing',
            pitch:
              'A guided evening trip to the desert for a picnic, sunset, and stargazing with a telescope.',
            audience: 'Nature lovers and newcomers',
            venueType: 'A desert camp outside the city',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A JLT café with long tables',
          },
          {
            title: 'Friday food market tour',
            pitch:
              'A slow weekend stroll through the city’s markets, tasting and meeting the vendors.',
            audience: 'Food lovers and curious residents',
            venueType: 'A weekend food market or souk',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share progress, regulation learnings, and partnerships.',
            audience: 'Fintech founders and operators',
            venueType: 'A DIFC event floor or meeting room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'An incubator meeting room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio or agency space in d3',
          },
          {
            title: 'Media and journalism pitch lab',
            pitch:
              'Journalists and media makers pitch story ideas and get honest editorial feedback.',
            audience: 'Freelance journalists and media students',
            venueType: 'A Media City event room',
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
            title: 'Alserkal Avenue gallery walk',
            pitch:
              'A guided evening walk through the galleries, with a stop for dinner and conversation.',
            audience: 'Art lovers and newcomers',
            venueType: 'Alserkal Avenue',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Photography walk at sunset',
            pitch:
              'A guided walk with prompts for capturing the skyline and coast at golden hour, followed by a review.',
            audience: 'Photographers of every level',
            venueType: 'Streets and viewpoints around the Marina',
          },
          {
            title: 'Design open studio Saturday',
            pitch:
              'A cluster of studios in d3 opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Design lovers and curious neighbors',
            venueType: 'Dubai Design District studios',
          },
          {
            title: 'Mending and upcycling circle',
            pitch:
              'Bring torn clothes and learn mending and upcycling techniques with thread, patches, and company.',
            audience: 'Sewers and sustainability-minded makers',
            venueType: 'A community center or craft space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Volunteer orientation evening',
            pitch:
              'An orientation plus first shift for residents supporting local community and social programs.',
            audience: 'First-time volunteers',
            venueType: 'A community or charity initiative space',
          },
          {
            title: 'Neighborhood cleanup morning',
            pitch:
              'A Saturday morning cleanup of one beach, park, or street, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and residents',
            venueType: 'A chosen beach, park, or district',
          },
          {
            title: 'Cultural exchange evening',
            pitch:
              'Residents from different countries share food, music, and stories from home in a welcoming evening.',
            audience: 'International residents and locals',
            venueType: 'A community hall or cultural center',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              'Gardeners and neighbors plan the season’s planting, events, and shared tools together.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and café owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or business center',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Dubai, recurring formats with a fixed venue — a weekly walk, a monthly beach picnic, a founders circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Many of these formats work in free or low-cost venues: beaches, public parks, community spaces, cafés, and co-working floors. Some venues may charge, but there is usually a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Dubai Origins start, and the expat culture is open to new groups. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Dubai?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Dubai residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Dubai?',
      answer:
        'Yes. Dubai has an international population, abundant venues, and a culture of people actively looking to connect. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Kite Beach, Alserkal Avenue, d3 studios, DIFC event floors, district cafés — exists in Dubai. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Dubai?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Dubai residents find or start Origins.',
    },
  ],
};

export default content;
