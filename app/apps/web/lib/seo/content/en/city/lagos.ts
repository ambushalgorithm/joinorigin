import type { CityContent } from '../../types';

/**
 * Lagos content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about Nigeria's commercial capital; no fabricated
 * numbers, member counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'lagos',
  intro: [
    'Lagos is Nigeria’s most populous city and its commercial engine — a megacity of more than fifteen million people where energy, hustle, and creativity meet. The city is split between the Island (Victoria Island, Ikoyi, Lekki) and the Mainland (Yaba, Surulere, Ikeja), connected by bridges that double as the city’s daily rhythm. Lagosians move through markets, offices, and studios with an intensity that makes community organizing both urgent and rewarding.',
    'The creative and tech economy is unmistakable: Yaba — nicknamed Yabacon Valley — hosts co-working hubs, accelerators, and the fintech and startup companies that make Lagos one of Africa’s leading innovation centers. Nollywood and Afrobeats have turned the city into a cultural export machine, and institutions like the University of Lagos, LASU, and Pan-Atlantic University feed a steady stream of students into every scene. Public anchors include the National Theatre, Lekki Conservation Centre, Tarkwa Bay, and the beaches of the Atlantic coast.',
    'For anyone looking to find or start a community, Lagos rewards boldness, consistency, and knowing your neighborhood — the city is large enough that a hyper-local group can thrive.',
  ],
  dataPoints: [
    'Roughly 15.4 million residents; Nigeria’s commercial capital.',
    'Island–Mainland split: Victoria Island, Lekki, Yaba, Surulere, Ikeja.',
    'Tech hub — Yaba is nicknamed Yabacon Valley.',
    'Home to the University of Lagos, LASU, and Pan-Atlantic University.',
    'Creative anchors: Nollywood, Afrobeats, National Theatre.',
    'Public anchors: Lekki Conservation Centre, Tarkwa Bay, Bar Beach.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in Yaba',
        'Incubator event floors near Victoria Island',
        'University innovation labs at UNILAG and LASU',
        'Lagos Business School event rooms',
        'Cafés in Lekki with meeting corners',
        'Hotel conference rooms for evening mixers',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and logistics builder tables',
        'Co-working open houses for early teams',
        'Pan-African founder mixers (Nigeria-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, logistics, agritech, or media — and name the group around it.',
        'Reserve a recurring weekly slot at a Yaba or Victoria Island co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Film and photography studios in Surulere and Ikeja',
        'Galleries and project spaces on Victoria Island',
        'Creative co-working floors in Yaba',
        'Art and design fairs in Lekki',
        'Music production and rehearsal studios',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film production circles that share gear',
        'Afrobeats production and songwriting sessions',
        'Nollywood screening and talk events',
      ],
      howToStart: [
        'Pick a craft, a neighborhood, and a regular evening — specificity builds identity fast here.',
        'Find a studio or creative hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'Local government meeting halls',
        'Market association spaces in Balogun and Mile 12',
        'Community halls in Surulere and Ajah',
        'Civic tech co-working spaces in Yaba',
        'University debating halls',
        'Volunteer project rooms near neighborhood associations',
      ],
      formats: [
        'Local government and ward info sessions',
        'Market trader rights meetings',
        'Youth and civic participation workshops',
        'Tenant and land rights information evenings',
        'Civic tech meetups for open data projects',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a market, a ward, or one transport corridor.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Lekki Conservation Centre grounds',
        'Beaches — Tarkwa Bay, Elegushi, and Bar Beach',
        'Cafés in Yaba and Lekki with community corners',
        'Rooftop bars on Victoria Island',
        'Public parks in Ikeja and Surulere',
        'Community halls near BRT stops',
      ],
      formats: [
        'Saturday beach and jogging groups',
        'Monthly picnic and board game afternoons',
        'Language exchange tables (Yoruba, English, Pidgin)',
        'Book club evenings in cafés',
        'Sunday market strolls and art walk meetups',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly picnic — and a fixed venue.',
        'Pick a beach, park, café, or rooftop that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader association halls',
        'Shop owner corners in Surulere and Ikeja',
        'Maker market stalls at weekend fairs',
        'Chamber of commerce seminar rooms',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a trader-style table',
      ],
      formats: [
        'Trader breakfast tables with no agenda',
        'Esusu-style savings and business planning circles',
        'Digital skills clinics (online selling, mobile money)',
        'Shared buying circles for supplies and stock',
        'Neighborhood business walking tours',
      ],
      howToStart: [
        'Choose one market or neighborhood and a café that already feeds local traders; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about suppliers and permits.',
        'After three breakfasts, rotate one practical topic per month and let the trader group spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Lagos is the undisputed startup capital of West Africa, and the energy is visible the moment you enter a Yaba co-working floor. The city’s tech scene grew out of the same hustle that powers its markets: founders here are used to building with limited infrastructure and scaling fast, and fintech, logistics, and media companies born in Lagos now serve the whole continent. Victoria Island and Ikoyi host the corporate and venture side of the ecosystem, while Yaba’s hubs, accelerators, and university programs at UNILAG and LASU supply a constant stream of engineers and designers. Meetings tend to be direct and outcome-focused — conversations move quickly from introductions to distribution, regulation, and the next round. Recurring formats include founder breakfasts, pitch evenings, and demo days that attract investors from across Africa. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an agritech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Lagos has one of the most influential creative industries in the world: Nollywood produces thousands of films a year, Afrobeats dominates global playlists, and fashion, photography, and design talent from the city are in constant demand. That commercial energy shapes the community scene — creatives in Lagos are ambitious, collaborative, and used to turning art into business. Studios and production houses cluster in Surulere and Ikeja, galleries and project spaces sit on Victoria Island, and creative co-working floors in Yaba host everything from portfolio nights to songwriting camps. The city’s craft tradition — from adire textiles to contemporary sculpture — gives makers real venues to sell and to meet. Because the scene is large and fast-moving, a focused group with a regular evening can stand out quickly. Starting a creative community in Lagos is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s enormous talent pool will find you.',
    political:
      'Lagosians are famously outspoken, and the city’s political and civic scene reflects that: market associations, resident groups, and youth movements organize around everything from transport fares to land rights and public health. The local government structure keeps politics accessible at the ward level, and markets like Balogun and Mile 12 have long traditions of trader associations that protect members and negotiate with officials. Community halls across Surulere, Ajah, and the Mainland host tenant meetings, youth civic workshops, and volunteer briefings that welcome newcomers. Civic tech groups in Yaba build tools for open data, citizen reporting, and public service feedback. The culture rewards persistence and direct action — showing up to a real meeting and speaking plainly matters more than online commentary. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing associations instead of duplicating them; the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Lagos is a city that socializes hard, and its meetup culture is built around beaches, food, music, and movement. Tarkwa Bay, Elegushi, and Bar Beach anchor weekend groups — joggers, football players, and picnic crews all claim their patches of sand. Yaba and Lekki cafés host book clubs, board game nights, and language exchanges where Yoruba, English, and Pidgin mix freely, while Victoria Island rooftops are the classic spot for after-work socials. The BRT, danfo, and okada network shapes how groups gather: meeting near a major stop makes attendance practical for people who do not drive. Lagos groups tend to be loud, warm, and punctual about fun — a weekly jog or a monthly beach picnic builds a community fast. Many international residents and returning Nigerians run English-first meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a beach football morning — and a venue that will host you every time.',
    'small-business':
      'Lagos is built on small business: markets, shops, food stalls, and service ventures employ millions, and the city’s trader culture has deep roots in the esusu and ajo savings traditions that still organize communities today. Market associations in places like Balogun, Mile 12, and Tejuosho are powerful, well-organized networks where owners share information, negotiate collectively, and support members in hard times. Digitalization is spreading fast — clinics on online selling, mobile money, and social media marketing are in constant demand, and co-working spaces now host solo entrepreneurs who used to work alone at home. What holds these groups together is place: a cluster of stalls on one market lane shares customers, suppliers, and the fate of the public space around them. Newcomers usually connect by attending a trader association meeting, joining a maker market, or taking a small business workshop. Starting a small business community in Lagos is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Lagos is an ideal city for testing new community event ideas: the energy is high, the venues range from beaches to co-working floors, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Lagos, from Tarkwa Bay and Lekki Conservation Centre to Yaba co-working hubs and market halls. Some ideas work as one-off events; others are designed to become recurring communities with a trader-style rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Lagos’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Yaba or Lekki café',
          },
          {
            title: 'Esusu-style founders circle',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice like a savings circle.',
            audience: 'Early-stage founders in Lagos',
            venueType: 'A co-working meeting room on Victoria Island',
          },
          {
            title: 'Neighborhood meet-and-greet',
            pitch:
              'A low-pressure evening in one neighborhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighborhood',
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
            venueType: 'A Yaba co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Pidgin and Yoruba conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Pidgin or Yoruba',
            venueType: 'A café or community hall in Yaba',
          },
          {
            title: 'Online selling and mobile money clinic',
            pitch:
              'A practical workshop on selling online, mobile money, and digital payments for small businesses.',
            audience: 'Small business owners and freelancers',
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
            title: 'Urban gardening 101',
            pitch:
              'A hands-on session on balcony, sack, and community-garden growing, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to local government, ward meetings, and how to raise an issue in Lagos.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Tarkwa Bay beach morning',
            pitch:
              'A slow ferry-and-beach morning with games, music, and a rotating potluck theme.',
            audience: 'Beach lovers and newcomers',
            venueType: 'Tarkwa Bay',
          },
          {
            title: 'Lekki Conservation Centre walk',
            pitch:
              'A guided walk along the canopy walkway and nature trails, ending with a picnic.',
            audience: 'Nature lovers and families',
            venueType: 'Lekki Conservation Centre',
          },
          {
            title: 'Elegushi weekend jogging club',
            pitch: 'A relaxed Saturday jog along the beach with a pace group for everyone.',
            audience: 'Leisure runners',
            venueType: 'Elegushi beach front',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A Lekki café with long tables',
          },
          {
            title: 'Art walk on Victoria Island',
            pitch:
              'A slow evening stroll through galleries and public art, stopping for stories and food along the way.',
            audience: 'Art lovers and curious residents',
            venueType: 'Galleries around Victoria Island',
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
            venueType: 'A Yaba co-working meeting room',
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
            venueType: 'A creative studio or agency space',
          },
          {
            title: 'Nollywood pitch lab',
            pitch:
              'Screenwriters and producers pitch story ideas and get honest editorial feedback.',
            audience: 'Screenwriters, producers, and actors',
            venueType: 'A film studio or media school classroom',
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
            title: 'Studio open Saturday',
            pitch:
              'A cluster of studios opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Artist studios in Surulere or Lekki',
          },
          {
            title: 'Afrobeats production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Adire and textile craft night',
            pitch:
              'A hands-on evening of adire dyeing, fabric printing, and design ideas, with materials shared.',
            audience: 'Textile lovers and fashion students',
            venueType: 'A craft studio or design space',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around Yaba and the island',
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
            title: 'Market trader rights info evening',
            pitch:
              'A plain-language session on trader rights, market fees, and where to get free support.',
            audience: 'Market traders and small business owners',
            venueType: 'A market association hall',
          },
          {
            title: 'Neighborhood cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or market, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and shop owners',
            venueType: 'A chosen street in any neighborhood',
          },
          {
            title: 'Youth volunteer briefing',
            pitch:
              'An orientation plus first shift for young people supporting local mentorship and skills programs.',
            audience: 'First-time volunteers',
            venueType: 'A local youth initiative space',
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
              'Shop and food stall owners share five-minute stories behind their businesses, followed by open questions.',
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
          'Match the category to your interests and the audience you can reach. In Lagos, recurring formats with a fixed venue — a weekly jog, a monthly picnic, an esusu-style circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: beaches, public parks, community halls, cafés, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Lagos communities start, and the trader and esusu traditions give you proven patterns of trust and consistency. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Lagos?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Lagosians gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Lagos?',
      answer:
        'Yes. Lagos has abundant energy, active markets, beaches, and a strong culture of self-organized groups. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Tarkwa Bay, Lekki Conservation Centre, Yaba co-working hubs, Victoria Island rooftops, market halls — exists in Lagos. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Lagos?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Lagos residents find or start communities.',
    },
  ],
};

export default content;
