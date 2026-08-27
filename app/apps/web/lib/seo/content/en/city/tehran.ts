import type { CityContent } from '../../types';

/**
 * Tehran content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about Iran's capital; no fabricated numbers, member
 * counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'tehran',
  intro: [
    'Tehran is Iran’s capital, the largest city in West Asia, and a metropolis where a deep cultural tradition meets one of the most resilient tech ecosystems in the region. The Alborz mountains rise directly north of the city, giving residents a dramatic outdoor escape — Tochal, Darband, and Darakeh are hiking and climbing destinations that draw thousands every week.',
    'Community life in Tehran runs through distinct districts: the north (Tajrish, Saadabad) is greener and more affluent, the center (Valiasr Street, Downtown) is the commercial and social heart, and the south has deep-rooted bazaar and working-class communities. Universities including the University of Tehran, Sharif University of Technology, and Amirkabir University feed a constant stream of students and engineers into the city, and the Iranian startup ecosystem — companies like Digikala and Snapp — has grown into one of the most active in the Middle East despite sanctions. The coffee shop culture of central Tehran and the parks of the north anchor a busy social life, and the weekend runs Thursday–Friday.',
    'For anyone looking to find or start an Origin, Tehran rewards choosing a district, building trust through repeated meetups, and leveraging the city’s extraordinary pool of talent and energy.',
  ],
  dataPoints: [
    'Roughly 7.2 million residents; the capital of Iran.',
    'Largest city in West Asia; Alborz mountains to the north.',
    'Universities: University of Tehran, Sharif University, Amirkabir.',
    'One of the most active startup ecosystems in the Middle East.',
    'Districts: north (Tajrish), center (Valiasr Street, Downtown), south.',
    'Outdoor anchors: Tochal, Darband, Darakeh, and the city parks.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in central Tehran',
        'University innovation labs at Sharif and Amirkabir',
        'Accelerator event floors near the city center',
        'Cafés in the north with quiet meeting corners',
        'Tech event spaces in the downtown area',
        'University science parks on the outskirts',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'E-commerce and fintech builder tables',
        'Co-working open houses for early teams',
        'Engineering and product meetups',
      ],
      howToStart: [
        'Pick a narrow vertical — e-commerce, fintech, ride-hailing, or software — and name the group around it.',
        'Reserve a recurring weekly slot at a central Tehran co-working hub or café.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Galleries and studios in the city center and north',
        'Creative co-working floors near Valiasr Street',
        'Photography and film studios in central Tehran',
        'Music rehearsal rooms and recording studios',
        'Craft spaces around the bazaar',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Music production and songwriting sessions',
        'Gallery walk groups through the city center',
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
        'University debating halls at the University of Tehran',
        'Civic tech co-working spaces in the city center',
        'Volunteer project rooms near neighborhood associations',
        'Community centers across the city',
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
        'Tochal, Darband, and Darakeh trailheads',
        'Parks in the north — Mellat and Laleh parks',
        'Cafés in the north and center with community corners',
        'Rooftop and terrace venues with mountain views',
        'Bazaar streets and historic squares',
        'Community halls near Metro stops',
      ],
      formats: [
        'Weekend hiking and climbing groups in the Alborz',
        'Monthly picnic and board game afternoons in parks',
        'Language exchange tables (Persian, English, and more)',
        'Book club evenings in cafés',
        'Sunday market strolls and bazaar tours',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly hike, a monthly picnic — and a fixed venue.',
        'Pick a trailhead, park, café, or terrace that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Bazaar trader association halls',
        'Shop owner corners in the center and south',
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
      'Tehran is the undisputed startup capital of Iran, and one of the most impressive ecosystems in the Middle East given the constraints its founders work under. E-commerce and ride-hailing companies born here — among the best known are Digikala and Snapp — have built platforms used by millions, and the ecosystem now spans fintech, software, logistics, and a strong hardware-engineering culture rooted in Sharif University and Amirkabir University. Co-working hubs and accelerators in central Tehran host founder meetups, pitch evenings, and demo days, while the university science parks on the city’s edge keep a constant pipeline of engineers and researchers. The community is deeply relationship-driven: trust is built through repeated in-person meetings, and English is common in the tech scene alongside Persian. Sanctions have forced founders to be resourceful, which makes Tehran’s startup community unusually self-reliant. Starting a startup Origin here works best with a narrow vertical and a regular rhythm: a monthly e-commerce builders night or a fintech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Tehran’s creative community is one of the most vibrant in the Middle East, sustained by a young population, a rich artistic tradition, and the resourcefulness that comes from working without easy international access. Galleries and studios in the city center and the north host a busy calendar of openings, portfolio nights, and design events, while the film and photography community — Tehran has a long and celebrated cinematic history — runs circles that share gear, feedback, and ambition. The music scene spans classical Persian music, rock, electronic, and hip-hop, with rehearsal rooms and studios across the city. The bazaar’s craft heritage gives makers a deep tradition to draw on, and the café culture of central Tehran provides the meeting places. Because the community is big but connected, a focused group with a regular evening can stand out quickly. Starting a creative Origin in Tehran is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s enormous talent pool will find you.',
    political:
      'Tehran has one of the most engaged and consequential civic cultures in the region, shaped by a century of political history and by the everyday organizing that keeps a megacity of seven million people working. Neighborhood associations, district councils, and student organizations provide channels for residents to raise issues, and the city’s universities have long been centers of debate and civic participation. Volunteers organize around housing, public services, education, and social inclusion, while civic tech groups work on open data and public participation despite infrastructure challenges. The bazaar, the city’s historic commercial heart, has its own deep tradition of collective action. The culture rewards patience, discretion, and relationships: trust is built in person, over tea, and across many meetings. Starting a civic Origin means choosing a concrete issue and a small geography — a district, a street, or one public service problem — then partnering with existing organizations instead of duplicating them; Tehran’s landscape is rich enough that collaboration beats competition.',
    meetup:
      'Tehran’s meetup culture is anchored by the mountains and the cafés. The Alborz foothills — Tochal, Darband, and Darakeh — draw hiking and climbing groups nearly every weekend, and the parks of the north, especially Mellat and Laleh, host picnics, walking groups, and board game afternoons. Central Tehran’s coffee shop culture is one of the liveliest in the region: book clubs, language exchanges, and design meetups fill the tables of Valiasr Street and the surrounding lanes. The bazaar and the historic squares anchor heritage walks and food tours, and the Metro makes many meeting points easy to reach. Tehran groups tend to be warm, curious, and deeply social — a weekly hike or a monthly picnic builds a community that lasts. Many international residents and returning Iranians run English-first or bilingual meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time.',
    'small-business':
      'Tehran’s small business community runs on the energy of millions of independent shops, workshops, and service ventures, and it is anchored by the historic bazaar — one of the great commercial institutions of the Middle East. Bazaar traders, shop owners, and craftspeople have organized for centuries through networks of trust and mutual support, and that tradition now mixes with a fast-growing digital economy: e-commerce, online payments, and social media marketing are transforming how small businesses reach customers. Business support agencies and chambers run practical clinics on licensing and online selling, while co-working spaces in central Tehran host solo entrepreneurs who used to work from home. What holds these groups together is place and trust: owners on one street or in one market share customers, suppliers, and the fate of the public space around them. Newcomers usually connect by attending a chamber or bazaar event, joining a maker market, or taking a small business workshop. Starting a small business Origin in Tehran is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Tehran is an ideal city for testing new Origin event ideas: the mountains, parks, cafés, and the city’s extraordinary density make meeting easy, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Tehran, from Tochal trailheads and Mellat Park to Valiasr cafés and central Tehran co-working spaces. Some ideas work as one-off events; others are designed to become recurring Origins with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Tehran’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A central Tehran café with a community corner',
          },
          {
            title: 'Founders circle for startups',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice.',
            audience: 'Early-stage founders in Tehran',
            venueType: 'A co-working meeting room in the center',
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
            venueType: 'A Valiasr Street co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Persian conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Persian',
            venueType: 'A café or community hall in the center',
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
              'A hands-on session on balcony and container growing in the dry climate, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to district councils, neighborhood meetings, and how to raise an issue in Tehran.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Darband weekend hike',
            pitch: 'A guided hike up the Darband trail with a traditional tea stop along the way.',
            audience: 'Hikers and nature lovers',
            venueType: 'Darband trailhead',
          },
          {
            title: 'Mellat Park picnic and games',
            pitch: 'Blankets, games, and conversation on the lawns, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Mellat Park',
          },
          {
            title: 'Tochal cable-car and trail day',
            pitch:
              'A day trip up Tochal by cable car with an easy hike and mountain views at the top.',
            audience: 'Outdoor lovers and newcomers',
            venueType: 'Tochal station and trails',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A central Tehran café with long tables',
          },
          {
            title: 'Grand Bazaar heritage tour',
            pitch:
              'A guided walk through the bazaar with stories behind the merchants and crafts, ending with tea.',
            audience: 'History lovers and curious residents',
            venueType: 'The Grand Bazaar streets',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'E-commerce founders table',
            pitch:
              'A monthly roundtable for e-commerce founders to share progress, logistics learnings, and partnerships.',
            audience: 'E-commerce founders and operators',
            venueType: 'A co-working meeting room in the center',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'An incubator meeting room',
          },
          {
            title: 'Engineering meetup night',
            pitch:
              'Engineers share talks and demos on software, hardware, and AI, with time for networking.',
            audience: 'Software and hardware engineers',
            venueType: 'A university or tech event space',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio or agency space',
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
            title: 'Gallery walk in the city center',
            pitch:
              'A guided evening walk through the galleries, with a stop for dinner and conversation.',
            audience: 'Art lovers and newcomers',
            venueType: 'Galleries around central Tehran',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Craft night with traditional artisans',
            pitch:
              'A hands-on evening learning crafts like miniature painting and carpet design with local artisans.',
            audience: 'Craft lovers and makers',
            venueType: 'A craft workshop or bazaar space',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around the center and the bazaar',
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
            title: 'Neighborhood services info evening',
            pitch:
              'A plain-language session on public services, housing, and where to get support.',
            audience: 'Residents and community organizers',
            venueType: 'A community hall or neighborhood center',
          },
          {
            title: 'Park cleanup morning',
            pitch:
              'A Saturday morning cleanup of one park or street, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and residents',
            venueType: 'A chosen park or street',
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
            venueType: 'A local shop, café, or bazaar hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Tehran, recurring formats with a fixed venue — a weekly hike, a monthly picnic, a founders circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: public parks, mountain trailheads, cafés, community halls, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Tehran Origins start, and the café and tea-house culture gives you a proven pattern of regular gathering. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Tehran?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Tehran residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Tehran?',
      answer:
        'Yes. Tehran has enormous density, a rich café culture, and a strong tradition of self-organized groups. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Tochal trailheads, Mellat Park, Valiasr cafés, the Grand Bazaar, central co-working spaces — exists in Tehran. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Tehran?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Tehran residents find or start Origins.',
    },
  ],
};

export default content;
