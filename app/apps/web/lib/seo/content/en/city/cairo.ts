import type { CityContent } from '../../types';

/**
 * Cairo content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about Egypt's capital; no fabricated numbers, member
 * counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'cairo',
  intro: [
    'Cairo is Egypt’s capital, the largest city in the Middle East and North Africa, and one of the most layered urban centers on earth — a place where thousands of years of history sit beside a fast-moving startup and creative scene. The Nile cuts through the city, dividing the old center from its newer districts, while the Pyramids of Giza rise on the western edge, visible from whole neighborhoods on a clear day.',
    'Community life in Cairo runs through distinct districts: Downtown and Zamalek host cafés, galleries, and the intellectual scene; Maadi and Heliopolis anchor family and expat communities; and New Cairo and Nasr City are home to universities and a growing number of startups. Cairo University, the American University in Cairo, and Ain Shams University feed a constant flow of students and graduates into the city’s ecosystem, and the Egyptian startup scene has grown into one of the most active in Africa and the Middle East, with hubs and accelerators across the city. Ahwa — the traditional coffeehouse culture — remains the social heart of neighborhoods.',
    'For anyone looking to find or start a community, Cairo rewards choosing a district, building relationships over many cups of tea, and committing to a regular rhythm that the city’s density will amplify.',
  ],
  dataPoints: [
    'Roughly 9.6 million residents; the capital of Egypt.',
    'Largest city in the Middle East and North Africa.',
    'Nile-side districts: Downtown, Zamalek, Maadi, Heliopolis, Nasr City.',
    'Universities: Cairo University, AUC, and Ain Shams University.',
    'One of Africa and MENA’s most active startup ecosystems.',
    'Cultural anchors: Egyptian Museum, Khan el-Khalili, Islamic Cairo, Pyramids of Giza.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in Downtown and Zamalek',
        'Accelerator event floors in New Cairo and Nasr City',
        'University innovation labs at AUC and Cairo University',
        'Cafés in Zamalek with quiet meeting corners',
        'Hotel conference rooms for evening mixers',
        'Tech event venues in Maadi',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and edtech builder tables',
        'Co-working open houses for early teams',
        'Pan-Arab founder mixers (MENA focus)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, edtech, logistics, or e-commerce — and name the group around it.',
        'Reserve a recurring weekly slot at a Downtown, Zamalek, or New Cairo co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Galleries and studios in Zamalek and Downtown',
        'Creative co-working floors in New Cairo',
        'Photography and film studios in Maadi',
        'Music rehearsal rooms and recording studios',
        'Craft spaces around Khan el-Khalili',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Music production and songwriting sessions',
        'Gallery walk groups through Downtown',
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
        'University debating halls at Cairo University and AUC',
        'Civic tech co-working spaces in Downtown',
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
        'Nile-side walkways and parks',
        'Zamalek and Maadi cafés with garden seating',
        'Khan el-Khalili and historic cafés',
        'Rooftop venues overlooking the Nile',
        'Public gardens in Heliopolis and Nasr City',
        'Community halls near Metro stops',
      ],
      formats: [
        'Saturday morning walking groups along the Nile',
        'Monthly picnic and board game afternoons',
        'Language exchange tables (Arabic, English, and more)',
        'Book club evenings in cafés',
        'Sunday market strolls and heritage walks',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly picnic — and a fixed venue.',
        'Pick a park, café, or walkway that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader association halls',
        'Shop owner corners in Downtown and Heliopolis',
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
      'Cairo has one of the most dynamic startup ecosystems in Africa and the Middle East, and its scale makes it a serious force: hundreds of funded companies, active accelerators, and a talent pool fed by Cairo University, AUC, and Ain Shams University. The scene clusters in Downtown, Zamalek, Maadi, and the newer districts of New Cairo and Nasr City, where co-working hubs and accelerator event floors host founder breakfasts, pitch evenings, and demo days on a near-weekly schedule. The ecosystem has strengths in fintech, e-commerce, logistics, and edtech, serving a young, mobile-first population that makes the market enormous. The culture is relationship-driven: deals and advice move through networks built over many meetings and many cups of tea. English is common in the startup community alongside Arabic, which helps international founders plug in. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an edtech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Cairo’s creative community draws on one of the deepest cultural traditions in the world — from the craft heritage of Khan el-Khalili to a modern film, music, and contemporary art scene that reaches across the region. Galleries and studios in Zamalek and Downtown anchor a busy calendar of openings and portfolio nights, while Maadi’s film and photography community and New Cairo’s design schools keep a steady pipeline of emerging talent. The city’s music scene — from classical Arab music to electronic and hip-hop — supports rehearsal rooms, recording studios, and open stages. Because Cairo is huge, a focused group with a regular evening can stand out quickly, and established artists are often generous with newcomers. The ahwa café tradition gives every creative group a natural meeting place. Starting a creative community in Cairo is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s enormous talent pool will find you.',
    political:
      'Cairo has a long and consequential tradition of civic life — from the intellectual salons of the 19th and 20th centuries to the street-level organizing that has shaped modern Egypt. Today, civic engagement runs through district councils, neighborhood meetings, university debating halls, and a growing civic tech scene that builds tools for public participation. Community centers and volunteer networks organize around housing, public services, and heritage, and the city’s informal economy — its markets, workshops, and street life — has its own deep networks of mutual support. Student organizations at Cairo University, AUC, and Ain Shams University keep a steady flow of young organizers involved in local and national issues. The culture rewards patience and relationships: trust is built in person, over tea, and across many meetings. Starting a civic community means choosing a concrete issue and a small geography — a district, a street, or one public service problem — then partnering with existing organizations instead of duplicating them; Cairo’s landscape is rich enough that collaboration beats competition.',
    meetup:
      'Cairo’s meetup culture is built on the ahwa — the traditional coffeehouse that has been the city’s social network for centuries — and on the Nile, the parks, and the city’s extraordinary history. Zamalek and Maadi cafés host book clubs, board game nights, and language exchanges, while Nile-side walkways and gardens anchor morning walking groups and evening socials. Khan el-Khalili and the historic cafés of Downtown are the classic place for heritage walks and cultural meetups, and the Metro makes many meeting points easy to reach. Cairo groups tend to be warm, sociable, and deeply relationship-oriented — a weekly walk or a monthly picnic builds a community that lasts. Many international residents and returning Egyptians run English-first or bilingual meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time.',
    'small-business':
      'Cairo’s small business community is one of the most entrepreneurial in the world, running on the energy of millions of independent shops, workshops, food stalls, and service ventures. The craft and trade heritage of Khan el-Khalili, the market corridors of Downtown and Heliopolis, and the family businesses of every district make place-based networks natural and strong. Digitalization is transforming the scene: clinics on online selling, payments, and social media marketing are in constant demand, and co-working spaces now host solo entrepreneurs who used to work from home. What holds these groups together is place and trust: owners on one street share customers, suppliers, and the fate of the public space around them, and many have known each other for decades. Newcomers usually connect by attending a chamber or market event, joining a maker market, or taking a small business workshop. Starting a small business community in Cairo is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Cairo is an ideal city for testing new community event ideas: the density is enormous, the venues range from Nile-side parks to historic cafés, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Cairo, from Zamalek cafés and Nile walkways to Khan el-Khalili and New Cairo co-working spaces. Some ideas work as one-off events; others are designed to become recurring communities with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Cairo’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Zamalek café with a community corner',
          },
          {
            title: 'Founders circle for startups',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice.',
            audience: 'Early-stage founders in Cairo',
            venueType: 'A Downtown co-working meeting room',
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
            venueType: 'A Maadi co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Egyptian Arabic conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Egyptian Arabic',
            venueType: 'A café or community hall in Zamalek',
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
            title: 'Urban gardening 101',
            pitch:
              'A hands-on session on balcony and container growing along the Nile climate, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to district councils, neighborhood meetings, and how to raise an issue in Cairo.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Nile walkway sunrise stroll',
            pitch: 'A slow early-morning walk along the Nile with a coffee stop before work.',
            audience: 'Early risers and nature lovers',
            venueType: 'Nile-side walkways',
          },
          {
            title: 'Zamalek park picnic and games',
            pitch:
              'Blankets, backgammon, and conversation on the lawns, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Zamalek parks and gardens',
          },
          {
            title: 'Historic Cairo heritage walk',
            pitch:
              'A guided walk through Islamic Cairo and Khan el-Khalili with stories behind the buildings and bazaars.',
            audience: 'History lovers and newcomers',
            venueType: 'Streets around Islamic Cairo',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A Maadi café with long tables',
          },
          {
            title: 'Friday market tour',
            pitch:
              'A slow weekend stroll through the city’s markets and souks, tasting and meeting the vendors.',
            audience: 'Food lovers and curious residents',
            venueType: 'A weekend market or souk',
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
            venueType: 'A New Cairo co-working meeting room',
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
            title: 'Zamalek gallery walk',
            pitch:
              'A guided evening walk through the galleries, with a stop for dinner and conversation.',
            audience: 'Art lovers and newcomers',
            venueType: 'Galleries around Zamalek and Downtown',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Craft night at Khan el-Khalili',
            pitch:
              'A hands-on evening with local artisans learning traditional crafts like metalwork and textiles.',
            audience: 'Craft lovers and makers',
            venueType: 'A craft workshop near Khan el-Khalili',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around Downtown and Islamic Cairo',
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
            title: 'Heritage and conservation info evening',
            pitch:
              'A plain-language session on preserving Cairo’s heritage buildings and how residents can get involved.',
            audience: 'Residents, historians, and organizers',
            venueType: 'A community hall or cultural center',
          },
          {
            title: 'Neighborhood cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or park, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and shop owners',
            venueType: 'A chosen street in any district',
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
          'Match the category to your interests and the audience you can reach. In Cairo, recurring formats with a fixed venue — a weekly walk, a monthly picnic, a founders circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: public parks, Nile walkways, cafés, community halls, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Cairo communities start, and the ahwa tradition gives you a proven pattern of regular gathering. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Cairo?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Cairo residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Cairo?',
      answer:
        'Yes. Cairo has enormous density, a rich café culture, and a strong tradition of self-organized groups. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Nile walkways, Zamalek cafés, Khan el-Khalili, New Cairo co-working spaces — exists in Cairo. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Cairo?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Cairo residents find or start communities.',
    },
  ],
};

export default content;
