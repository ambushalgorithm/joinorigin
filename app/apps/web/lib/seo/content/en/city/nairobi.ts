import type { CityContent } from '../../types';

/**
 * Nairobi content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about Kenya's capital; no fabricated numbers, member
 * counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'nairobi',
  intro: [
    'Nairobi is East Africa’s most connected city — a place where a young, multilingual population, a growing tech economy, and a strong tradition of self-organized mutual aid meet. Kenya’s capital is the heart of the "Silicon Savannah": M-Pesa built a mobile-money culture that shaped fintech startups across the continent, and hubs around Westlands, Kilimani, and the Nairobi CBD host thousands of founders, engineers, and creatives.',
    'The city’s community life is anchored by visible, walkable places: Karura Forest and Uhuru Park for outdoor gatherings, University of Nairobi, Strathmore, and JKUAT for student energy, and a dense network of cafés, co-working spaces, and matatu-linked neighborhoods that make meeting up surprisingly practical. Chama culture — the rotating savings groups that have long organized families and coworkers — means Kenyans already run disciplined, trust-based communities, and newcomers can build on that habit.',
    'For anyone looking to find or start a community, Nairobi rewards specificity, consistency, and a willingness to meet people where they already are.',
  ],
  dataPoints: [
    'Roughly 4.4 million residents; the capital of Kenya.',
    'Kenya’s primary tech hub — known as the Silicon Savannah.',
    'Public anchors: Karura Forest, Uhuru Park, and the Nairobi Arboretum.',
    'Home to the University of Nairobi, Strathmore University, and JKUAT.',
    'Strong chama (savings circle) and matatu-linked gathering culture.',
    'M-Pesa and mobile-first fintech shaped the local startup scene.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in Westlands and Kilimani',
        'Incubator event floors near the Nairobi CBD',
        'University innovation labs at Strathmore and JKUAT',
        'Cafés in Lavington with quiet meeting corners',
        'Accelerator demo rooms in Ngong Road corridor',
        'Hotel conference spaces for evening mixers',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo nights',
        'Fintech and agritech builder tables',
        'Co-working open houses for early teams',
        'Cross-border founder mixers (East Africa focus)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, agritech, logistics, or edtech — and name the group around it.',
        'Reserve a recurring weekly slot at a Westlands or Kilimani co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Artist studios in Kilimani and Lang’ata',
        'Galleries and project spaces in the CBD and Yaya',
        'Creative co-working floors in Westlands',
        'Craft markets and design fairs in Karen',
        'Film and photography studios in South B',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Zine and print-making nights',
        'Afrobeat and spoken-word open stages',
      ],
      howToStart: [
        'Pick a craft, a neighborhood, and a regular evening — specificity builds identity fast here.',
        'Find a studio or creative hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'County assembly public sessions',
        'Community halls in Eastlands and Kangemi',
        'Neighborhood civic-tech co-working spaces',
        'Youth and women’s group meeting rooms',
        'Volunteer project rooms near informal settlements',
        'University debating halls and seminar rooms',
      ],
      formats: [
        'County budget and ward-level info sessions',
        'Youth and women’s civic participation workshops',
        'Tenant and land-rights information evenings',
        'Volunteer orientation and first-shift briefings',
        'Civic tech meetups for open data projects',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a market, or one land dispute.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Karura Forest entrances and picnic lawns',
        'Uhuru Park fields and jogging paths',
        'Cafés in Kilimani and Lavington with garden seating',
        'Rooftop bars and hotel terraces in Westlands',
        'City park grounds and the Arboretum',
        'Community halls near matatu stages',
      ],
      formats: [
        'Saturday morning jogging and walking groups',
        'Monthly picnic and board game afternoons',
        'Language exchange tables (Swahili, English, others)',
        'Book club evenings in cafés',
        'Sunday market strolls and craft fair meetups',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly picnic — and a fixed venue.',
        'Pick a park, café, or community hall that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader association halls in Eastlands',
        'Kiosk and shop owner corners in residential estates',
        'Maker market stalls at weekend fairs',
        'Chamber of commerce seminar rooms',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a chama-style table',
      ],
      formats: [
        'Trader breakfast tables with no agenda',
        'Chama-style savings and business planning circles',
        'Digital skills clinics (mobile money, online selling)',
        'Shared buying circles for supplies and stock',
        'Neighborhood business walking tours',
      ],
      howToStart: [
        'Choose one estate or market and a café that already feeds local traders; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about suppliers and permits.',
        'After three breakfasts, rotate one practical topic per month and let the trader group spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Nairobi’s startup scene grew out of a mobile-first experiment that became a regional standard: M-Pesa proved that financial services could run on feature phones, and that foundation launched fintech, agritech, logistics, and edtech companies that serve all of East Africa. Founders cluster in Westlands, Kilimani, and along the Ngong Road corridor, where co-working hubs, accelerators, and university programs at Strathmore and JKUAT keep talent and capital circulating. The community is younger and more multilingual than many European scenes — meetings run in English, Swahili, and sometimes Sheng — and the tone is practical: conversations focus on distribution, regulations, and the next funding round. Recurring formats include founder breakfasts, pitch evenings, and co-working open houses where early teams meet their first engineers and designers. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an agritech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Nairobi’s creative scene is one of the most energetic on the continent, powered by the storytelling muscle of Kenyan film, music, and design and by a young audience that shows up. Artists and makers cluster in Kilimani, Lang’ata, and Karen, with studios, galleries, and creative co-working floors hosting portfolio nights, open studio weekends, and design critiques. The city’s music culture — from afrobeat and benga to gengetone — keeps a steady calendar of open stages and producer circles, and photographers and filmmakers regularly form gear-sharing collectives. Craft markets, fashion fairs, and the growing contemporary art scene give creatives real venues to sell and to meet. Because the community is still relatively small compared to London or New York, there is genuine openness: established artists mentor newcomers, and a good idea with a visible first event can build a following quickly. Starting a creative community in Nairobi is realistic: pick a craft, a neighborhood, and a regular evening, and the city’s curiosity will find you.',
    political:
      'Nairobi has a deep tradition of civic engagement, from county-level budget advocacy to youth and women’s movements that shape public policy. The county devolution system keeps politics accessible: residents can attend ward-level public sessions, join county assembly budget forums, and organize around land, housing, and service delivery issues. Community halls in Eastlands, Kangemi, and the informal settlements host tenant meetings, women’s group gatherings, and youth empowerment sessions that are open to newcomers. Civic tech groups build tools around open data and citizen reporting, while countless volunteer projects care for schools, water points, and neighborhood security. Universities and colleges add a steady stream of student organizers who keep issues like employment, safety, and public transport on the agenda. The culture rewards directness and showing up — a real meeting matters more than an online post. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing initiatives instead of duplicating them; Nairobi’s landscape is rich enough that collaboration beats competition.',
    meetup:
      'Nairobi’s meetup culture is practical, social, and built around the city’s real geography. Karura Forest, Uhuru Park, and the Arboretum anchor outdoor gatherings — jogging clubs, picnic groups, and walking clubs are common and welcoming. Kilimani and Lavington cafés host book clubs, language exchange tables, and board game evenings, while Westlands rooftop bars and hotel terraces are favorite spots for after-work socials. The matatu network shapes how groups gather: choosing a meeting point near a major stage makes attendance easy for people who do not drive. Nairobi groups tend to be warm with newcomers and serious about consistency — a weekly jog or a monthly picnic builds a community that outlasts any single event. Many international residents and returning Kenyans run English-first meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time.',
    'small-business':
      'Nairobi’s small business community is built on the city’s chama culture: Kenyans have long organized rotating savings groups, and that habit of trust-based mutual support now shapes how shop owners, market traders, and service providers cooperate. Eastlands markets, kiosk corridors in residential estates, and weekend maker fairs are natural hubs where owners already know each other. The city’s business development agencies and chambers run practical clinics on mobile-money payments, licensing, and online selling, often in both English and Swahili. What holds these groups together is place — a cluster of stalls on one market lane shares customers, suppliers, and the fate of the public space around them. Newcomers usually connect by attending a trader association meeting, joining a maker market, or taking a small business workshop. Starting a small business community in Nairobi is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Nairobi is a great city for testing new community event ideas: public space is generous, cafés and hubs are affordable, and residents show up when something feels real and useful. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Nairobi, from Karura Forest and Uhuru Park to Westlands co-working hubs and Eastlands community halls. Some ideas work as one-off events; others are designed to become recurring communities with a chama-style rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Nairobi’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections over coffee and mandazi.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Kilimani café with garden seating',
          },
          {
            title: 'Chama-style founders circle',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice like a savings circle for startups.',
            audience: 'Early-stage founders in Nairobi',
            venueType: 'A Westlands co-working meeting room',
          },
          {
            title: 'Estate meet-and-greet',
            pitch:
              'A low-pressure evening in one neighborhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single estate',
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
            venueType: 'A Lavington co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Swahili conversation table for newcomers',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Expats and newcomers learning Swahili',
            venueType: 'A café or community hall in Kilimani',
          },
          {
            title: 'Mobile money and online selling clinic',
            pitch:
              'A practical workshop on M-Pesa for business, digital payments, and selling online safely.',
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
              'A plain-language guide to county assembly sessions, ward forums, and how to raise an issue locally.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Karura Forest sunrise walk',
            pitch:
              'A slow early-morning walk through Karura’s trails, with a coffee stop before work.',
            audience: 'Early risers and nature lovers',
            venueType: 'Karura Forest entrances',
          },
          {
            title: 'Uhuru Park picnic and games',
            pitch: 'Blankets, badminton, and frisbee on the lawns, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Uhuru Park fields',
          },
          {
            title: 'Arboretum weekend jogging club',
            pitch: 'A relaxed Saturday jog through the Arboretum with a pace group for everyone.',
            audience: 'Leisure runners',
            venueType: 'Nairobi Arboretum paths',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A Lavington café with long tables',
          },
          {
            title: 'Matatu art and street walk',
            pitch:
              'A guided walk through the city’s matatu culture, street art, and design, stopping for stories along the way.',
            audience: 'Design lovers and newcomers',
            venueType: 'Streets around the CBD and Yaya',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share progress, regulation learnings, and partnership opportunities.',
            audience: 'Fintech founders and operators',
            venueType: 'A Westlands co-working meeting room',
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
            title: 'Journalism and media pitch lab',
            pitch:
              'Journalists and media makers pitch story ideas and get honest editorial feedback.',
            audience: 'Freelance journalists and media students',
            venueType: 'A newsroom or media school classroom',
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
            venueType: 'Artist studios in Kilimani or Lang’ata',
          },
          {
            title: 'Afrobeats producer circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Kenyan street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around the CBD and Eastlands',
          },
          {
            title: 'Zine and print-making night',
            pitch: 'A hands-on evening of zine making with print and trading.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print shop or arts space',
          },
          {
            title: 'Mending and visible mending circle',
            pitch:
              'Bring torn clothes and learn visible mending techniques with thread, patches, and company.',
            audience: 'Sewers and sustainability-minded makers',
            venueType: 'A community center or repair café',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Ward-level budget info evening',
            pitch:
              'A plain-language session on how the county budget works and where residents can have a say.',
            audience: 'Residents and community organizers',
            venueType: 'A ward community hall',
          },
          {
            title: 'Estate cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or market, with gloves and coffee supplied by local shops.',
            audience: 'Neighbors and shop owners',
            venueType: 'A chosen street in any estate',
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
              'Shop and kiosk owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or trader hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Nairobi, recurring formats with a fixed venue — a weekly jog, a monthly picnic, a chama-style circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: public parks, community halls, cafés, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Nairobi communities start, and the chama tradition gives you a proven pattern of trust and consistency. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Nairobi?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Nairobi residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Nairobi?',
      answer:
        'Yes. Nairobi has affordable venues, generous public green space, and a strong culture of self-organized groups. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Karura Forest, Uhuru Park, Westlands co-working hubs, Kilimani cafés, community halls — exists in Nairobi. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Nairobi?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Nairobi residents find or start communities.',
    },
  ],
};

export default content;
