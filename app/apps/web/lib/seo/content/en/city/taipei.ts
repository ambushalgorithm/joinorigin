import type { CityContent } from '../../types';

/**
 * Taipei content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Taipei's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'taipei',
  intro: [
    "Taipei is a compact, friendly capital where tech innovation, night markets, and a strong civic culture sit side by side. The city's districts have clear personalities — Ximending for youth culture and entertainment, Daan and the east side for tech and dining, Yongkang Street for food and books, and Beitou and the riverside for nature and hot springs.",
    "Institutions anchor Taipei's life: National Taiwan University, National Taiwan Normal University, and a cluster of technical universities feed a constant stream of students and researchers, while the city's hardware heritage — semiconductors, computing, electronics — powers one of Asia's most serious tech and startup scenes. The MRT makes the city easy to cross, and Elephant Mountain, the riverside bike paths, and the city's parks give groups free outdoor venues.",
    "For finding or starting an Origin, Taipei rewards clear purpose and a good venue: the city's civic-tech and social-movement history means people respond to concrete issues and well-run events, and its food culture makes shared meals a natural part of any gathering.",
  ],
  dataPoints: [
    'Roughly 7.9 million residents in the metropolitan area; the capital of Taiwan.',
    'MRT network makes the compact city easy to cross.',
    'Districts with distinct scenes: Ximending, Daan, Yongkang, Beitou, and the east side.',
    'Home to National Taiwan University, NTNU, and many technical universities.',
    'Industries: semiconductors, electronics, tech, design, and food.',
    'Public anchors: Elephant Mountain, the riverside bike paths, Daan Forest Park, and the night markets.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Daan and Zhongshan',
        'Startup event floors near Nangang and the Software Park',
        'Incubator rooms at NTU and NTUST',
        'Innovation hubs in the east side',
        'Cafés with meeting corners in Yongkang',
        'Hotel conference rooms in the Xinyi district',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Semiconductor and hardware-tech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — hardware, SaaS, AI, or climate — and a bilingual name.',
        'Reserve a recurring slot at a Daan or Nangang coworking space near the MRT.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in the Zhongshan and Huashan areas',
        'Live houses and indie stages in Ximending and Gongguan',
        'Design studios in Dadaocheng',
        'Independent cinemas in the west side',
        'Craft and design markets at Huashan and Songshan',
        'Café stages in Yongkang and the east side',
      ],
      formats: [
        'Indie music showcase nights',
        'Open-mic and spoken word evenings',
        'Design and craft market days',
        'Indie film screenings and Q&As',
        'Photography walks through Dadaocheng',
      ],
      howToStart: [
        'Choose a craft — music, design, film, illustration — and a regular evening slot.',
        'Partner with a gallery, live house, or studio in Huashan or Ximending to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'District office and community centre halls',
        'University seminar rooms at NTU',
        'Civic-tech and NGO offices in Zhongzheng',
        'Public library rooms with civic collections',
        'Night market association meeting rooms',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Open-data and civic-tech hack nights',
        'Urban planning and park design workshops',
        'Housing and rent policy info evenings',
        'Volunteer briefings for community programmes',
        'Heritage and Dadaocheng preservation talks',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a heritage block, a housing policy — and keep the geography small.',
        'Partner with an existing civic-tech, NGO, or community group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Night markets — Shilin, Raohe, and Ningxia',
        'Daan Forest Park lawns',
        'Yongkang Street cafés',
        'Riverside bike paths along the Tamsui river',
        'Hot spring cafés in Beitou',
        'Community halls in the residential wards',
      ],
      formats: [
        'Night market food walks',
        'Language exchange tables for newcomers',
        'Sunday bike rides along the river',
        'Board game café evenings',
        'Book clubs in cafés',
      ],
      howToStart: [
        'Choose a repeatable format — a night market walk, a Sunday ride — and a fixed meeting point.',
        'Pick a MRT-accessible night market or a Yongkang café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Night market trader association halls',
        'Dadaocheng craft and textile merchant rooms',
        'Café and restaurant owner tables in Yongkang',
        'Boutique owner circles in the east side',
        'Design brand studios in Huashan and Songshan',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Night market trader breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and e-commerce clinics',
        'Craft and textile sourcing circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Taipei's startup scene runs on the island's technology heritage: Taiwan's semiconductor and hardware strength gives local founders real depth in chips, electronics, and manufacturing, while a fast-growing layer of SaaS, AI, and climate startups builds on the same talent pool. Founders cluster in Daan, Zhongshan, and the Nangang software corridor, where coworking spaces, accelerators, and university programs at NTU and NTUST create a dense loop of talent and capital. The government actively supports startups through funding, visas, and programs, and the city's openness makes it a natural hub for regional and international founders. The culture is collaborative and practical: people share openly, events are well-organised, and the food-and-tea tradition means meetings often end with a meal. English is common in the international founder community. Recurring formats include founder breakfasts, pitch evenings, hardware-tech circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near the MRT; Taipei's compact efficiency does the rest.",
    creative:
      "Taipei's creative scene is dense and playful, anchored by the cultural complexes of Huashan and Songshan — former industrial sites turned into galleries, studios, and event halls — and the indie energy of Ximending and Gongguan. The city's design culture is internationally recognised, with fashion, illustration, and product design feeding a strong freelance and small-brand economy. Dadaocheng preserves the craft and textile traditions of old Taipei, and its shopfronts and tea houses host a growing maker and heritage scene. Indie music thrives in small venues, and independent cinema has a devoted audience. The city's night markets, food culture, and cafe scene give creators an always-available stage for events. Common formats include indie showcase nights, craft markets, open-mics, and photography walks. Starting a creative Origin in Taipei is realistic: pick a craft and a venue with an existing audience — Huashan for design, Ximending for music — and the city's creative energy will pull people in.",
    political:
      "Taipei has one of Asia's most distinctive civic cultures, famous for its open-data and civic-tech movement. Citizen groups like g0v build public-interest tools, hold hack nights, and set a standard for government transparency that few cities match. Beyond tech, the city's politics are shaped by housing affordability, urban renewal, and the preservation of old neighbourhoods like Dadaocheng, with community groups running planning workshops and heritage walks that are open to newcomers. Night market traders and small business owners organize around market regulations and public space. The city's parks and riversides generate constant conversations about public space and climate resilience. The culture rewards competence and open participation: showing up to a real meeting and contributing a useful skill matters more than commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a park, a heritage block, a market — then partnering with the civic-tech, NGO, and community structures that already exist. Taipei rewards thoughtful, consistent action.",
    meetup:
      "Taipei's meetup scene is friendly, food-centred, and remarkably easy to navigate. The night markets — Shilin, Raohe, Ningxia — are the city's great social stage: a food walk is the classic format, and groups eat their way through stalls with stops for history and conversation. Yongkang Street and the east side hold the café circuit — book clubs, language exchanges, board game evenings, and freelance coffee mornings. The riverside bike paths along the Tamsui river are the weekend favourite, with Sunday rides that end at a market or a café. Elephant Mountain and the nearby hills host sunrise and sunset hiking groups, and Beitou's hot springs offer a relaxing post-hike soak. The MRT makes everything accessible, and the city's calm, polite culture keeps groups friendly. Starting a meetup is realistic: pick a repeatable format — a night market walk, a Sunday ride — and a fixed meeting point near a station, run three sessions at the same time and place, and Taipei's warmth will take over.",
    'small-business':
      "Taipei's small business community spans the city's famous night markets and its fast-growing creative economy. Night market traders — Shilin, Raohe, Ningxia — run through associations that manage stall allocations, festival schedules, and collective voice on market rules and rents. Dadaocheng's textile and craft merchants preserve traditions that connect modern brands to old supply chains. The new economy is different: Yongkang Street's cafés and restaurants, the east side's boutiques, and the design studios around Huashan and Songshan form a tight community of independent owners who meet to swap supplier contacts, design ideas, and customer insights. The chamber of commerce and small business networks run practical clinics on digital payments, e-commerce, and hiring. What holds these groups together is geography and taste: a market or a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business Origin in Taipei is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Taipei is a wonderful city for Origin event ideas: the MRT makes everything reachable, the night markets make food a natural anchor, and the city's civic culture means people show up for real events. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Taipei, from Shilin night market and Daan Forest Park to Huashan galleries and Nangang coworking floors. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near the MRT, and let Taipei's warmth do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Yongkang Street newcomer circle',
            pitch:
              'A weekly low-pressure coffee where newcomers and long-time residents trade city tips and work stories.',
            audience: 'New arrivals and internationals',
            venueType: 'A café on Yongkang Street',
          },
          {
            title: 'Daan founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Taipei',
            venueType: 'A café in the Daan district',
          },
          {
            title: 'Ximending meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Young professionals and students',
            venueType: 'A café in Ximending',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A coworking café in the east side',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Mandarin conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Mandarin',
            venueType: 'A community centre or café',
          },
          {
            title: 'Taiwanese cooking home-style class',
            pitch:
              'Small-group classes teaching beef noodles, braised pork rice, and other everyday dishes.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Tea appreciation circle',
            pitch:
              'A guided tasting of Taiwanese oolong and high-mountain teas with a local tea master.',
            audience: 'Tea lovers and beginners',
            venueType: 'A tea house in Dadaocheng or Maokong',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking or incubator event room',
          },
          {
            title: 'CV and interview clinic',
            pitch:
              'Professionals volunteer to review CVs and run mock interviews for job seekers in a structured evening.',
            audience: 'Students and early-career job seekers',
            venueType: 'A college or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Shilin night market food walk',
            pitch:
              "A guided evening walk through the market, tasting iconic snacks with the traders' stories.",
            audience: 'Food lovers and explorers',
            venueType: 'Shilin Night Market',
          },
          {
            title: 'Elephant Mountain sunrise hike',
            pitch: 'A friendly early-morning hike up Elephant Mountain for a view over the city.',
            audience: 'Hikers of every level',
            venueType: 'Elephant Mountain trails',
          },
          {
            title: 'Sunday riverside bike ride',
            pitch: 'A relaxed ride along the Tamsui river paths with a market and café stop.',
            audience: 'Leisure cyclists',
            venueType: 'Riverside bike paths',
          },
          {
            title: 'Daan Forest Park picnic and games',
            pitch: 'Blankets, snacks, and casual games in the park, with a summer-evening breeze.',
            audience: 'Families and friend groups',
            venueType: 'Daan Forest Park lawns',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café near Gongguan',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Hardware and semiconductor circle',
            pitch:
              'Engineers and founders in hardware and chips share progress, suppliers, and collaboration paths.',
            audience: 'Hardware and semiconductor professionals',
            venueType: 'A Nangang innovation hub room',
          },
          {
            title: 'SaaS founders table',
            pitch:
              'Founders building SaaS products discuss pricing, distribution, and team building in a confidential circle.',
            audience: 'SaaS founders and operators',
            venueType: 'A coworking floor in Zhongshan',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Design leaders roundtable',
            pitch:
              'Design heads share how they hire, build teams, and influence product decisions in a structured circle.',
            audience: 'Design leads and senior designers',
            venueType: 'A studio or coworking meeting room',
          },
          {
            title: 'Climate tech network evening',
            pitch:
              'Founders and researchers in energy, mobility, and climate share trends and opportunities.',
            audience: 'Climate tech founders and researchers',
            venueType: 'A university or innovation centre room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Huashan craft and design market',
            pitch:
              'Local designers and makers sell and tell the stories behind their work in a friendly weekend market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'Huashan 1914 Creative Park',
          },
          {
            title: 'Ximending indie music night',
            pitch:
              "A monthly open stage for indie bands, solo artists, and first-timers in the city's youth district.",
            audience: 'Musicians and music lovers',
            venueType: 'A live house in Ximending',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Yongkang',
          },
          {
            title: 'Dadaocheng heritage photo walk',
            pitch:
              "A guided photo walk through the old port district's lanes, shopfronts, and tea houses.",
            audience: 'Photographers and history lovers',
            venueType: 'Dadaocheng streets',
          },
          {
            title: 'Drawing circle in a café',
            pitch:
              'A weekly session where illustrators and hobbyists draw together and share techniques.',
            audience: 'Artists of every level',
            venueType: 'A café with long tables in the east side',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Open-data and civic-tech hack night',
            pitch:
              'Citizens build small public-interest tools with open government data — no coding experience needed.',
            audience: 'Civic-minded developers and citizens',
            venueType: 'A civic-tech or NGO office',
          },
          {
            title: 'Park clean-up and planting day',
            pitch: "Neighbours tidy and plant a local park with the district's parks team.",
            audience: 'Neighbours and families',
            venueType: 'A local park or green space',
          },
          {
            title: 'Heritage preservation talk and walk',
            pitch:
              'A guided walk through Dadaocheng and a discussion on what residents can do to protect old districts.',
            audience: 'History and heritage lovers',
            venueType: 'Dadaocheng streets and a local hall',
          },
          {
            title: 'Housing and rent policy info evening',
            pitch:
              'A plain-language session on deposits, leases, and tenant rights for young residents.',
            audience: 'Renters and young professionals',
            venueType: 'A community centre or university room',
          },
          {
            title: 'Night market storytelling night',
            pitch:
              'Traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall or local café',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Taipei, recurring formats with a fixed venue near the MRT — a night market walk, a Sunday ride, a café circle — build community fastest.',
      },
      {
        question: 'Do I need to speak Mandarin to organize?',
        answer:
          'No. Many Taipei groups run bilingually or in English, and the international community is welcoming. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Taipei Origins start, and the city's warmth keeps members coming back. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Taipei?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Taipei residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Taipei?',
      answer:
        'Yes. Taipei is compact, well-connected by the MRT, and has a strong civic and café culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Shilin night market, Daan Forest Park, Huashan 1914, Yongkang Street cafés — exists in Taipei. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Taipei?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Taipei residents find or start Origins.',
    },
  ],
};

export default content;
