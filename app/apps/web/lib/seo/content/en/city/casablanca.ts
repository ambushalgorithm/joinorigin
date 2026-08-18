import type { CityContent } from '../../types';

/**
 * Casablanca content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about Morocco's economic capital; no fabricated
 * numbers, member counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'casablanca',
  intro: [
    'Casablanca is Morocco’s largest city and its economic capital — a coastal metropolis where finance, industry, and a fast-growing creative and tech scene meet. The city is famous for its striking contrast: the Hassan II Mosque, one of the largest mosques in the world, stands beside the Atlantic, while the downtown is a living museum of Art Deco architecture built during the French protectorate.',
    'Community life in Casablanca runs through distinct districts: Maarif and Gauthier for cafés, shops, and the professional scene; Anfa and the Corniche for the beachside social life; and the old medina for craft and tradition. Hassan II University, Université Mohammed VI, and other institutions supply students and graduates, and the city is the center of Morocco’s startup ecosystem, with the Technopark and a growing network of co-working hubs and accelerators. French and Darija mix freely in daily life, which makes the city’s groups naturally bilingual.',
    'For anyone looking to find or start a community, Casablanca rewards choosing a district, respecting the café rhythm, and committing to a regular event — the city’s size and energy will do the rest.',
  ],
  dataPoints: [
    'Roughly 3.7 million residents; Morocco’s largest city and economic capital.',
    'Atlantic coast city with a famous Art Deco downtown.',
    'Landmark: the Hassan II Mosque and the Corniche.',
    'Universities: Hassan II University and Université Mohammed VI.',
    'Morocco’s startup hub — the Technopark and co-working network.',
    'Districts: Maarif, Gauthier, Anfa, and the old medina.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'The Technopark event floors',
        'Co-working hubs in Maarif and Gauthier',
        'University innovation labs at Hassan II University',
        'Accelerator demo rooms in the city center',
        'Cafés in Maarif with quiet meeting corners',
        'Hotel conference rooms for evening mixers',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and agritech builder tables',
        'Co-working open houses for early teams',
        'Franco-Arab founder mixers (Morocco focus)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, agritech, logistics, or tourism tech — and name the group around it.',
        'Reserve a recurring weekly slot at the Technopark or a Maarif co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Galleries and studios in the city center',
        'Creative co-working floors in Maarif',
        'Design and fashion spaces in Gauthier',
        'Photography and film studios near the Corniche',
        'Music rehearsal rooms and recording studios',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Music production and songwriting sessions',
        'Art and architecture walk groups',
      ],
      howToStart: [
        'Pick a craft, a neighborhood, and a regular evening — specificity builds identity fast here.',
        'Find a gallery, studio, or creative hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'District council and neighborhood meeting halls',
        'Community centers across the city',
        'University debating halls at Hassan II University',
        'Civic tech co-working spaces in the city center',
        'Volunteer project rooms near neighborhood associations',
        'Public library meeting rooms',
      ],
      formats: [
        'Neighborhood and district info sessions',
        'Housing and public services information evenings',
        'Youth and civic participation workshops',
        'Volunteer orientation and first-shift briefings',
        'Civic tech meetups for open data projects',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a street, or one public service problem.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Corniche beaches and the Atlantic shore',
        'Cafés in Maarif and Gauthier with community corners',
        'Parks in the city center and residential districts',
        'Rooftop and terrace venues overlooking the sea',
        'The old medina streets and squares',
        'Community halls near tram stops',
      ],
      formats: [
        'Weekend beach and walking groups',
        'Monthly picnic and board game afternoons',
        'Language exchange tables (Darija, French, Arabic, English)',
        'Book club evenings in cafés',
        'Sunday market strolls and heritage walks',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly beach picnic — and a fixed venue.',
        'Pick a beach, park, café, or terrace that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader association halls',
        'Shop owner corners in Maarif and the medina',
        'Craft and maker market stalls',
        'Chamber of commerce seminar rooms',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a founder-style table',
      ],
      formats: [
        'Owner breakfast tables with no agenda',
        'Small business planning and referral circles',
        'Digital skills clinics (online selling, payments)',
        'Shared buying circles for supplies and stock',
        'Neighborhood business walking tours',
      ],
      howToStart: [
        'Choose one district and a café that already feeds local owners; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about suppliers and permits.',
        'After three breakfasts, rotate one practical topic per month and let the local business group spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Casablanca is Morocco’s startup capital, and the ecosystem has grown steadily into one of the most active in North Africa. The Technopark — the country’s first technology park — anchors the scene, with event floors, incubators, and a community of founders, engineers, and designers working side by side. Co-working hubs in Maarif and Gauthier host the younger side of the ecosystem, while universities like Hassan II University and Université Mohammed VI supply a steady stream of graduates. The startup community has strengths in fintech, agritech, logistics, and tourism tech, and it serves both the domestic market and French-speaking Africa. Meetings tend to be professional and bilingual — French and Darija mix freely, and English is increasingly common in the tech scene. Recurring formats include founder breakfasts, pitch evenings, and demo days that attract investors from Morocco and Europe. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an agritech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Casablanca’s creative community is one of the most distinctive in North Africa, shaped by the city’s Art Deco architecture, its Atlantic setting, and a cultural scene that mixes Moroccan tradition with French influence. Galleries and studios in the city center host a busy calendar of openings and portfolio nights, while design and fashion spaces in Gauthier and Maarif keep the commercial side of the scene moving. The film and photography community is strong — Casablanca has long been a center for Moroccan cinema — and the music scene runs from traditional Gnawa and chaabi to electronic and hip-hop. The Corniche anchors the social side of the creative world, with beachside venues hosting events year-round. Because the community is connected and the city is compact, a focused group with a regular evening can stand out quickly. Starting a creative community in Casablanca is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s talent pool will find you.',
    political:
      'Casablanca has a vibrant civic life, shaped by its role as Morocco’s economic engine and by the social movements that have organized around housing, workers’ rights, and public services for generations. District councils and neighborhood associations provide accessible channels for residents to raise issues, and community centers across the city host meetings on housing, transport, and public space. Universities contribute to the civic scene through debating societies and student organizations, while civic tech groups work on open data and public participation. The informal economy — markets, workshops, and street life — has its own deep networks of mutual support, and volunteer projects around education, health, and social inclusion welcome newcomers. The culture rewards patience and relationships: trust is built in person, over coffee, and across many meetings. Starting a civic community means choosing a concrete issue and a small geography — a district, a street, or one public service problem — then partnering with existing organizations instead of duplicating them.',
    meetup:
      'Casablanca’s meetup culture is anchored by the Atlantic and the café. The Corniche beaches are the weekend home of walking groups, jogging clubs, and picnic crews, while the cafés of Maarif and Gauthier host book clubs, board game nights, and language exchanges that mix Darija, French, Arabic, and English. The old medina and the city’s Art Deco streets are the classic setting for heritage walks, and rooftop and terrace venues overlooking the sea are the favorite after-work social spots. The tram network makes many meeting points easy to reach, and the city’s compact size means a group can gather in one district without much travel. Casablanca groups tend to be warm, sociable, and open to newcomers — a weekly walk or a monthly beach picnic builds a community fast. Many international residents and returning Moroccans run bilingual meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time.',
    'small-business':
      'Casablanca is Morocco’s business capital, and its small business community is the backbone of the economy — from the traders of the old medina and the market corridors of Maarif to the service firms and ateliers that fill the city’s streets. The city’s chambers and business support agencies run practical clinics on licensing, online selling, and digital marketing, while the Technopark and co-working network help solo entrepreneurs professionalize. What holds these groups together is place and trust: owners on one street or in one market share customers, suppliers, and the fate of the public space around them, and many have known each other for decades. Newcomers usually connect by attending a chamber or market event, joining a maker market, or taking a small business workshop. Starting a small business community in Casablanca is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Casablanca is an ideal city for testing new community event ideas: the Atlantic coast, the cafés, and the compact districts make meeting easy, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Casablanca, from Corniche beaches and old medina streets to Technopark event floors and Maarif cafés. Some ideas work as one-off events; others are designed to become recurring communities with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Casablanca’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Maarif café with a community corner',
          },
          {
            title: 'Founders circle for startups',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice.',
            audience: 'Early-stage founders in Casablanca',
            venueType: 'A Technopark co-working meeting room',
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
            venueType: 'A Gauthier co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Darija conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Darija',
            venueType: 'A café or community hall in Maarif',
          },
          {
            title: 'Online selling and payments clinic',
            pitch:
              'A practical workshop on selling online, digital payments, and marketing for small businesses.',
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
            title: 'Coastal and urban gardening 101',
            pitch:
              'A hands-on session on growing herbs and vegetables in the coastal climate, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to district councils, neighborhood meetings, and how to raise an issue in Casablanca.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Corniche sunrise walk',
            pitch: 'A slow early-morning walk along the coast with a coffee stop before work.',
            audience: 'Early risers and nature lovers',
            venueType: 'Corniche beachfront',
          },
          {
            title: 'Beach picnic and games afternoon',
            pitch: 'Blankets, games, and conversation on the sand, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'A city beach along the Corniche',
          },
          {
            title: 'Art Deco architecture walk',
            pitch:
              'A guided walk through the city center with stories behind the buildings and their history.',
            audience: 'Architecture lovers and newcomers',
            venueType: 'Streets around the city center',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A Maarif café with long tables',
          },
          {
            title: 'Sunday medina market tour',
            pitch: 'A slow weekend stroll through the old medina, tasting and meeting the vendors.',
            audience: 'Food lovers and curious residents',
            venueType: 'The old medina streets',
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
            venueType: 'A Technopark meeting room',
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
            venueType: 'A design studio or agency space',
          },
          {
            title: 'Media and journalism pitch lab',
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
            title: 'City center gallery walk',
            pitch:
              'A guided evening walk through the galleries, with a stop for dinner and conversation.',
            audience: 'Art lovers and newcomers',
            venueType: 'Galleries around the city center',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Craft night with local artisans',
            pitch:
              'A hands-on evening learning traditional Moroccan crafts like zellige tilework and leather.',
            audience: 'Craft lovers and makers',
            venueType: 'A craft workshop in the medina',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around the medina and Corniche',
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
            title: 'Housing and services info evening',
            pitch:
              'A plain-language session on housing rights, tenant protections, and where to get free support.',
            audience: 'Tenants, homeowners, and organizers',
            venueType: 'A community hall or social enterprise space',
          },
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of one stretch of coast, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and residents',
            venueType: 'A chosen beach along the Corniche',
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
              'Shop and café owners share five-minute stories behind their businesses, followed by open questions.',
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
          'Match the category to your interests and the audience you can reach. In Casablanca, recurring formats with a fixed venue — a weekly walk, a monthly beach picnic, a founders circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: beaches, public parks, cafés, community halls, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Casablanca communities start, and the café culture gives you a proven pattern of regular gathering. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Casablanca?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Casablanca residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Casablanca?',
      answer:
        'Yes. Casablanca has a compact city center, a rich café culture, and a strong tradition of self-organized groups. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Corniche beaches, Maarif cafés, the Technopark, the old medina — exists in Casablanca. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Casablanca?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Casablanca residents find or start communities.',
    },
  ],
};

export default content;
