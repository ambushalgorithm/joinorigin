import type { CityContent } from '../../types';

/**
 * Ho Chi Minh City content (EN source of truth) — city page + 5 variants
 * + idea page. Distinct from every other authored city file (G5):
 * grounded in Ho Chi Minh City's real districts, institutions, and
 * gathering culture. Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'ho-chi-minh-city',
  intro: [
    "Ho Chi Minh City is Vietnam's commercial engine, a fast-moving city of motorbikes, coffee shops, and a young population that is building the country's future. The city's energy concentrates in District 1 and District 3 — cafés, coworking spaces, and restaurants cluster around the old French quarters — while the newer districts of the east and south hold tech parks and manufacturing.",
    "Institutions anchor the city's community life: the Vietnam National University campuses, the University of Social Sciences and Humanities, and a growing list of international programs feed a constant stream of students, while the startup scene — one of Southeast Asia's most dynamic — draws founders from across the country and the region. Ben Thanh market, the riverside, and the city's parks give groups free, well-known outdoor venues.",
    "For finding or starting a community, Ho Chi Minh City rewards energy and authenticity: the city's culture is fast, young, and optimistic, and groups that meet regularly over coffee or street food build loyalty quickly.",
  ],
  dataPoints: [
    'Roughly 14 million residents in the metropolitan area; the commercial capital of Vietnam.',
    'Districts with distinct scenes: District 1, District 3, District 5, and the new east and south districts.',
    'Home to Vietnam National University, the University of Social Sciences and Humanities, and many programs.',
    'Industries: technology, manufacturing, trade, and media.',
    "One of Southeast Asia's most dynamic startup ecosystems.",
    'Public anchors: Ben Thanh market, the riverside promenades, and the city parks.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in District 1 and District 3',
        'Startup event floors near the central business district',
        'Incubator rooms at Vietnam National University',
        'Innovation hubs in the east and south districts',
        'Cafés with meeting corners in District 3',
        'Hotel conference rooms in District 1',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech, edtech, and logistics builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, edtech, logistics, or consumer apps — and a bilingual name.',
        'Reserve a recurring slot at a District 1 or District 3 coworking space.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in District 3 and the Thao Dien area',
        'Indie music and art venues in District 1 and District 3',
        'Design studios in the creative quarters',
        'Independent cinemas and film spaces',
        'Street-art corners in District 5 and the old quarters',
        'Café stages in District 3 and Thao Dien',
      ],
      formats: [
        'Indie music showcase nights',
        'Art walk and gallery evenings',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through the old quarters',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, venue, or studio in District 3 or Thao Dien to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'District office and community centre halls',
        'University seminar rooms at VNU',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'Canal and park volunteer sheds',
        'Neighbourhood committee meeting rooms',
      ],
      formats: [
        'Canal and river cleanup volunteer briefings',
        'Traffic and public transport advocacy meetings',
        'Housing and rental rights info evenings',
        'Climate and flood-resilience action circles',
        'Heritage preservation talks and walks',
      ],
      howToStart: [
        'Pick one concrete local issue — a canal, a park, a heritage block — and keep the geography small.',
        'Partner with an existing NGO, community group, or university club instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Ben Thanh market lanes',
        'Cafés in District 3 and Thao Dien',
        'Riverside promenades along the Saigon river',
        'Tao Dan Park lawns',
        'Street food corners in District 1 and District 5',
        'Rooftop cafés and restaurants in the centre',
      ],
      formats: [
        'Street food walks through the districts',
        'Language exchange tables for newcomers',
        'Sunday morning run clubs',
        'Board game café evenings',
        'Riverside morning walks',
      ],
      howToStart: [
        'Choose a repeatable format — a food walk, a Sunday run — and a fixed meeting point.',
        'Pick a District 1 market corner or a District 3 café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader networks in Ben Thanh and Binh Tay',
        'Restaurant and café owner tables in District 1 and Thao Dien',
        'Boutique owner circles in the centre',
        'Design brand studios in the creative quarters',
        'Street food stall communities at city markets',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Market trader breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and platforms.',
        'After three breakfasts, rotate one practical topic per month and let the trader network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Ho Chi Minh City's startup scene is one of Southeast Asia's most dynamic, powered by a young, ambitious population and the country's fast-growing digital economy. Founders cluster in District 1 and District 3, where coworking spaces, accelerators, and university programs at Vietnam National University create a dense loop of talent and capital. The city's strengths span fintech, edtech, logistics, and consumer apps that serve Vietnam's large domestic market and increasingly export regionally. The culture is young and optimistic: meetings are energetic, people are eager to learn, and successful founders are generous with advice. English is common in the ecosystem, and international talent is drawn by the city's energy and cost of living. Recurring formats include founder breakfasts, pitch evenings, fintech and edtech circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue in the central districts; the city's momentum does the rest.",
    creative:
      "Ho Chi Minh City's creative scene is young and fast-moving, with galleries, indie music, and design studios multiplying across District 3, Thao Dien, and the old quarters. The city's film industry is growing rapidly, its design and fashion brands are gaining regional attention, and its street-food and café culture give creators an always-available stage. Street art flourishes in District 5 and the old quarters, and independent cinemas and galleries in the centre host regular screenings and openings. The café culture is the city's creative engine — many collectives and communities start over coffee and grow into exhibitions, labels, and studios. Art and design schools feed a steady stream of graduates into a fast-moving freelance economy. Common formats include indie showcases, art walks, craft markets, and open-mics. Starting a creative community in Ho Chi Minh City is realistic: pick a craft and a venue with an existing audience, and the city's youthful creativity will pull people in.",
    political:
      "Ho Chi Minh City's civic life is shaped by rapid growth: traffic, canals, flooding, and heritage are constant, tangible issues. The city's canal network — the drainage and transport arteries of the old city — is the focus of cleanup and restoration volunteer groups, and residents coordinate on flood resilience in low-lying neighbourhoods. Traffic and public transport are live topics, with commuters advocating for metro, bus, and pedestrian space. Heritage preservation is a growing movement around the old quarters and the French-era buildings of the centre. Housing affordability and rental rights matter in a city where young people pour in for work and study. University campuses and research institutes add an evidence-driven layer. The culture rewards energy and persistence: showing up to a real meeting and taking on visible roles matter more than commentary. Starting a political community here means choosing one concrete issue and a small geography — a canal, a park, a heritage block — then partnering with the volunteer and community structures that already exist. Ho Chi Minh City rewards steady, visible action.",
    meetup:
      "Ho Chi Minh City's meetup scene runs on two great local institutions: coffee and street food. The cafés of District 3 and Thao Dien host book clubs, language exchanges, board game evenings, and freelance coffee mornings, while the street food corners of District 1 and District 5 are the stage for the city's favourite format — the food walk, where a group eats its way through a district with stops for stories. Ben Thanh market and Binh Tay market draw market lovers, and Tao Dan Park and the riverside promenades host morning runs, walks, and picnics. The city's young population and large international community keep English-speaking groups plentiful, and newcomers are welcomed quickly. Groups here tend to be energetic, informal, and food-driven, matching the city's character. Starting a meetup is realistic: pick a repeatable format — a food walk, a Sunday run — and a fixed meeting point in the central districts, run three sessions at the same time and place, and the city's energy will take over.",
    'small-business':
      "Ho Chi Minh City's small business community spans the legendary markets and the fast-growing new economy. Ben Thanh and Binh Tay markets run on trader networks that manage stalls, festivals, and collective voice on rents and rules, serving both locals and the city's huge tourist trade. The new economy is different: District 1 and Thao Dien cafés and restaurants, the boutiques of the centre, and a booming layer of online sellers who run brands from small studios. Vietnam's coffee and street-food culture gives small food businesses a huge, loyal market, and digital payments and e-commerce are now standard tools. The chamber of commerce and industry associations run practical clinics on licensing, e-commerce, and hiring. What holds these groups together is geography and taste: a market or a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business community in Ho Chi Minh City is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Ho Chi Minh City is a wonderful city for community event ideas: the food is legendary, the coffee culture is world-class, and the young population makes people show up. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Ho Chi Minh City, from Ben Thanh market and District 3 cafés to the riverside promenades and central coworking floors. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue in the central districts, and let the city's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Ben Thanh newcomer walk',
            pitch:
              'A market walk where newcomers and long-time residents trade city tips and work stories.',
            audience: 'New arrivals and market lovers',
            venueType: 'Ben Thanh market lanes',
          },
          {
            title: 'District 1 founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Ho Chi Minh City',
            venueType: 'A café in District 1',
          },
          {
            title: 'District 3 meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in District 3',
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
            venueType: 'A coworking café in Thao Dien',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Vietnamese conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Vietnamese',
            venueType: 'A community centre or café',
          },
          {
            title: 'Vietnamese home cooking class',
            pitch:
              'Small-group classes teaching pho, banh xeo, and other beloved dishes from scratch.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Coffee brewing and tasting circle',
            pitch:
              'A hands-on session on phin brewing, espresso, and the art of Vietnamese coffee culture.',
            audience: 'Coffee lovers and home brewers',
            venueType: 'A specialty coffee shop or roastery',
          },
          {
            title: 'Digital marketing for small brands',
            pitch:
              'Hands-on sessions on platforms, content, and e-commerce for small businesses and startups.',
            audience: 'Small business owners and marketers',
            venueType: 'A coworking event room',
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
            title: 'Street food walk through District 1',
            pitch:
              'A guided evening walk through legendary street food corners with stories behind each stall.',
            audience: 'Food lovers and explorers',
            venueType: 'District 1 street food corners',
          },
          {
            title: 'Tao Dan Park morning run',
            pitch: 'A friendly, all-paces group run around the park, followed by a café breakfast.',
            audience: 'Runners of every level',
            venueType: 'Tao Dan Park',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in District 3',
          },
          {
            title: 'Riverside sunset walk',
            pitch:
              'A guided evening walk along the Saigon river, timed for the sunset and city lights.',
            audience: 'Explorers and photographers',
            venueType: 'Saigon riverside promenades',
          },
          {
            title: 'Sunday cycling group',
            pitch:
              'A relaxed morning ride through quieter streets and the riverside, with coffee stops.',
            audience: 'Leisure cyclists',
            venueType: 'City streets and riverside paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share product progress and regulatory lessons.',
            audience: 'Fintech founders and operators',
            venueType: 'A coworking floor in District 1',
          },
          {
            title: 'Edtech builders circle',
            pitch:
              'Founders building education products share pedagogy, distribution, and growth lessons.',
            audience: 'Edtech founders and operators',
            venueType: 'A coworking event room in District 3',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Logistics and supply chain meetup',
            pitch:
              'Professionals in logistics and supply chain technology discuss trends and collaboration.',
            audience: 'Logistics professionals and founders',
            venueType: 'A hotel conference room',
          },
          {
            title: 'Design leaders roundtable',
            pitch:
              'Design heads share how they hire, build teams, and influence product decisions in a structured circle.',
            audience: 'Design leads and senior designers',
            venueType: 'A studio or coworking meeting room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'District 3 gallery walk',
            pitch:
              'A guided evening walk through the galleries, with artist talks at select stops.',
            audience: 'Art lovers and curious visitors',
            venueType: 'District 3 galleries',
          },
          {
            title: 'Indie music showcase night',
            pitch: 'A monthly open stage for indie bands, solo artists, and first-timers.',
            audience: 'Musicians and music lovers',
            venueType: 'A live music venue in District 1',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Thao Dien',
          },
          {
            title: 'Old quarters photo walk',
            pitch:
              "A guided photo walk through District 5 and the old quarters' lanes, markets, and street art.",
            audience: 'Amateur and professional photographers',
            venueType: 'District 5 and old quarter streets',
          },
          {
            title: 'Design and craft market day',
            pitch:
              'Local designers and makers sell and tell the stories behind their work in a friendly market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'A gallery or community event space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Canal cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a canal stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A canal stretch in the city',
          },
          {
            title: 'Flood resilience neighbourhood circle',
            pitch:
              'Neighbours map flood-prone streets and coordinate a simple response plan with local volunteers.',
            audience: 'Residents in low-lying areas',
            venueType: 'A community centre or neighbourhood hall',
          },
          {
            title: 'Heritage preservation walk and talk',
            pitch:
              'A guided walk through the French-era quarters and a discussion on what residents can do to protect them.',
            audience: 'History and heritage lovers',
            venueType: 'Central quarter streets and a local hall',
          },
          {
            title: 'Park clean-up and planting day',
            pitch: "Neighbours tidy and plant a local park with the district's parks team.",
            audience: 'Neighbours and families',
            venueType: 'A local park or green space',
          },
          {
            title: 'Market storytelling night',
            pitch:
              'Traders and shop owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbours and small business owners',
            venueType: 'A market hall or local café',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Ho Chi Minh City, recurring formats with a fixed venue — a food walk, a Sunday run, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to speak Vietnamese to organize?',
        answer:
          'No. Many Ho Chi Minh City groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          "Yes — recurring formats are how most Ho Chi Minh City communities start, and the city's energy sustains them. The how-to guides walk through the first event to a stable community.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Ho Chi Minh City?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Ho Chi Minh City?',
      answer:
        'Yes. The city has a young population, a booming startup scene, and a legendary food and coffee culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Ben Thanh market, Tao Dan Park, District 3 cafés, riverside promenades — exists in Ho Chi Minh City. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Ho Chi Minh City?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps residents find or start communities.',
    },
  ],
};

export default content;
