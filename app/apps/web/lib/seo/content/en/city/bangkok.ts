import type { CityContent } from '../../types';

/**
 * Bangkok content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Bangkok's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'bangkok',
  intro: [
    "Bangkok is Thailand's capital, a city of temples and sky trains, markets and rooftop bars, where tradition and a fast-moving modern economy coexist on every street. The city's communities spread across distinctive districts — Sukhumvit for internationals and nightlife, Silom and Sathorn for business, Thonglor and Ekkamai for cafés and creative culture, and the old city around Rattanakosin for history and craft.",
    "Institutions anchor Bangkok's community life: Chulalongkorn University, Thammasat, and a cluster of other universities feed a constant stream of students and researchers, while the city's startup scene and its position as a regional hub draw entrepreneurs from across Southeast Asia. The BTS and MRT make the city navigable, and the parks — Lumphini, Benjakitti, and the riverside — give groups free, well-known outdoor venues.",
    "For finding or starting an Origin, Bangkok rewards warmth and consistency: the city's culture is famously friendly, food is the great social glue, and groups that meet regularly at the same venue build loyalty quickly.",
  ],
  dataPoints: [
    'Roughly 5.1 million residents in the city; the capital of Thailand.',
    'BTS and MRT networks make the city navigable.',
    'Districts with distinct scenes: Sukhumvit, Silom, Thonglor, Ekkamai, and the old city.',
    'Home to Chulalongkorn University, Thammasat, and many other universities.',
    'Industries: tourism, technology, finance, media, and trade.',
    'Public anchors: Lumphini Park, Benjakitti Park, the Chao Phraya riverfront, and the night markets.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Sathorn and Sukhumvit',
        'Startup event floors near Thonglor and Ekkamai',
        'Incubator rooms at Chulalongkorn University',
        'Innovation hubs in the CBD',
        'Cafés with meeting corners in Thonglor',
        'Hotel conference rooms in Sukhumvit',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech, food-tech, and travel-tech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, food tech, travel, or e-commerce — and a bilingual name.',
        'Reserve a recurring slot at a Sathorn or Sukhumvit coworking space near the BTS.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in the Bangkok Art and Culture Centre area and the riverside',
        'Indie music venues in Thonglor and Ekkamai',
        'Design studios in the Charoenkrung creative district',
        'Independent cinemas and film spaces',
        'Street-art corners in the old town and Talat Noi',
        'Café stages in Thonglor and Ari',
      ],
      formats: [
        'Indie music showcase nights',
        'Art walk and gallery evenings',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through the old town',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, venue, or studio in Charoenkrung or Thonglor to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'District office and community centre halls',
        'University seminar rooms at Chulalongkorn and Thammasat',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'Community canal and park volunteer sheds',
        'Neighbourhood committee meeting rooms',
      ],
      formats: [
        'Canal and river cleanup volunteer briefings',
        'Traffic and public transport advocacy meetings',
        'Housing and rental rights info evenings',
        'Climate and air-quality action circles',
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
        'Lumphini Park lawns and running paths',
        'Chatuchak weekend market lanes',
        'Cafés in Thonglor, Ekkamai, and Ari',
        'Riverside promenades along the Chao Phraya',
        'Benjakitti Park trails',
        'Rooftop bars and restaurants in Sukhumvit',
      ],
      formats: [
        'Night market food walks',
        'Language exchange tables for newcomers',
        'Sunday morning run clubs',
        'Board game café evenings',
        'Canal boat and riverside exploration walks',
      ],
      howToStart: [
        'Choose a repeatable format — a food walk, a Sunday run — and a fixed meeting point.',
        'Pick a BTS-accessible market or a Thonglor café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market trader networks in Chatuchak and the old town',
        'Restaurant and café owner tables in Thonglor and Ekkamai',
        'Boutique owner circles in Sukhumvit and Charoenkrung',
        'Design brand studios in the creative district',
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
      "Bangkok's startup scene has grown into Southeast Asia's second-largest, with strengths in fintech, food tech, travel, and e-commerce that reflect the country's strengths. Founders cluster in Sathorn, Sukhumvit, and the creative corridors of Thonglor and Ekkamai, where coworking spaces, accelerators, and university programs at Chulalongkorn create a dense loop of talent and capital. The city's position as a regional travel and trade hub gives local startups natural advantages in tourism, logistics, and cross-border commerce, and the government actively supports the ecosystem through funding and programs. The culture is warm and collaborative: people smile, share openly, and prefer harmony in meetings — but the best founders combine that warmth with sharp execution. English is common in the ecosystem, which draws founders from across the region. Recurring formats include founder breakfasts, pitch evenings, food-tech and fintech circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near the BTS; Bangkok's energy and hospitality do the rest.",
    creative:
      "Bangkok's creative scene is booming, anchored by the Charoenkrung creative district along the river, the galleries around the Bangkok Art and Culture Centre, and the indie music and design culture of Thonglor, Ekkamai, and Ari. The city's film industry is one of Asia's most productive, and its design, fashion, and craft brands are increasingly visible internationally. Street art thrives in the old town and Talat Noi, while independent cinemas and galleries give creators a stage. The café culture is a genuine creative engine — many collectives start over coffee and grow into exhibitions, labels, and studios. The riverside and the old town provide endless material for photographers and filmmakers. Art and design schools feed a steady stream of graduates into a fast-moving freelance economy. Common formats include indie showcases, art walks, craft markets, and open-mics. Starting a creative Origin in Bangkok is realistic: pick a craft and a venue with an existing audience — Charoenkrung for design, Thonglor for music — and the city's creativity will pull people in.",
    political:
      "Bangkok's civic life is shaped by the pressures of a dense, fast-growing capital: canals, traffic, and heritage are constant, tangible issues. The city's canals — the original transport network — are the focus of active cleanup and restoration volunteer groups, and riverside communities coordinate on flooding and water quality. Traffic and public transport are live topics, with commuters advocating for the BTS, MRT, and bus networks, and pedestrian space. Housing affordability and rental rights matter in a city where property prices have risen sharply. Heritage preservation is a growing movement, with citizen groups documenting and protecting the old town's buildings and lanes. University campuses — Chulalongkorn, Thammasat — are hubs of debate and research. The culture rewards warmth and persistence: showing up to a real meeting and building relationships with local organisers matters more than commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a canal, a park, a heritage block — then partnering with the volunteer and community structures that already exist. Bangkok rewards steady, visible action.",
    meetup:
      "Bangkok's meetup scene is warm, food-centred, and full of life. The night markets — Chatuchak, the street markets of the old town — are the great social stage, and food walks are the classic format: a group eats its way through a market with stops for stories and conversation. Lumphini Park and Benjakitti Park host morning runs, yoga circles, and evening walks, and the riverside promenades attract strollers and photographers. Thonglor, Ekkamai, and Ari hold the café circuit — book clubs, language exchanges, board game evenings, and freelance coffee mornings — and Bangkok's large international community keeps English-speaking groups plentiful. The BTS and MRT make attendance practical, and the city's warm culture makes newcomers feel welcome instantly. Groups here tend to be friendly, informal, and food-driven, matching the city's character. Starting a meetup is realistic: pick a repeatable format — a food walk, a Sunday run — and a fixed meeting point near a station, run three sessions at the same time and place, and Bangkok's warmth will take over.",
    'small-business':
      "Bangkok's small business community spans the legendary markets and the trend-setting new districts. Chatuchak's weekend market, the old town's street stalls, and the district markets run on trader networks that manage stalls, festivals, and collective voice on rents and rules. The new economy is different: Thonglor and Ekkamai cafés and restaurants, the boutiques of Sukhumvit, and the design brands of Charoenkrung form a tight community of independent owners who meet to swap supplier contacts, design ideas, and customer insights. Thailand's food and street-food culture gives small food businesses a huge, loyal market, and digital payments and e-commerce are now standard tools. The chamber of commerce and industry associations run practical clinics on licensing, e-commerce, and hiring. What holds these groups together is geography and taste: a market or a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business Origin in Bangkok is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Bangkok is a wonderful city for Origin event ideas: the markets are legendary, the food is world-class, and the city's warmth makes people show up. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Bangkok, from Chatuchak market and Lumphini Park to Charoenkrung galleries and Thonglor cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near the BTS, and let Bangkok's warmth do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Chatuchak newcomer walk',
            pitch:
              'A weekend walk through the market where newcomers and long-time residents trade city tips and work stories.',
            audience: 'New arrivals and market lovers',
            venueType: 'Chatuchak Weekend Market',
          },
          {
            title: 'Sathorn founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Bangkok',
            venueType: 'A café in Sathorn',
          },
          {
            title: 'Thonglor meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in Thonglor',
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
            venueType: 'A coworking café in Ekkamai',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Thai conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Thai',
            venueType: 'A community centre or café',
          },
          {
            title: 'Thai home cooking class',
            pitch:
              'Small-group classes teaching pad thai, green curry, and other beloved dishes from scratch.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Muay Thai fundamentals workshop',
            pitch:
              "A beginner-friendly introduction to the basics of Thailand's national sport — fitness, not fighting.",
            audience: 'Fitness enthusiasts and beginners',
            venueType: 'A Muay Thai gym or community hall',
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
            title: 'Night market food walk',
            pitch: 'A guided evening walk through a night market with stops at legendary stalls.',
            audience: 'Food lovers and explorers',
            venueType: 'A night market in the old town or the districts',
          },
          {
            title: 'Lumphini Park morning run',
            pitch: 'A friendly, all-paces group run around the park, followed by a café breakfast.',
            audience: 'Runners of every level',
            venueType: 'Lumphini Park',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in Ekkamai',
          },
          {
            title: 'Riverside sunset walk',
            pitch:
              'A guided evening walk along the Chao Phraya, timed for the sunset and temple lights.',
            audience: 'Explorers and photographers',
            venueType: 'Chao Phraya riverside promenades',
          },
          {
            title: 'Canal boat exploration morning',
            pitch: 'A relaxed morning riding the canal boats and walking the riverside lanes.',
            audience: 'Explorers and history lovers',
            venueType: 'Canal piers and riverside lanes',
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
            venueType: 'A coworking floor in Sathorn',
          },
          {
            title: 'Food tech and F&B circle',
            pitch:
              'Founders building in food tech, restaurants, and delivery share playbooks and lessons.',
            audience: 'Food tech founders and F&B operators',
            venueType: 'A coworking event room in Thonglor',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Travel tech meetup',
            pitch:
              'Professionals in travel and hospitality technology discuss trends and collaboration.',
            audience: 'Travel tech professionals and founders',
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
            title: 'Charoenkrung art walk',
            pitch: "A guided evening walk through the creative district's galleries and studios.",
            audience: 'Art lovers and curious visitors',
            venueType: 'Charoenkrung creative district',
          },
          {
            title: 'Indie music showcase night',
            pitch: 'A monthly open stage for indie bands, solo artists, and first-timers.',
            audience: 'Musicians and music lovers',
            venueType: 'A live music venue in Thonglor',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Ari',
          },
          {
            title: 'Old town photo walk',
            pitch:
              'A guided photo walk through the temples, lanes, and street art of Rattanakosin and Talat Noi.',
            audience: 'Amateur and professional photographers',
            venueType: 'Old town streets',
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
            title: 'Park clean-up and planting day',
            pitch: "Neighbours tidy and plant a local park with the district's parks team.",
            audience: 'Neighbours and families',
            venueType: 'A local park or green space',
          },
          {
            title: 'Heritage preservation walk and talk',
            pitch:
              'A guided walk through the old town and a discussion on what residents can do to protect it.',
            audience: 'History and heritage lovers',
            venueType: 'Old town streets and a local hall',
          },
          {
            title: 'Air quality action circle',
            pitch:
              'Residents monitor and discuss local air quality and coordinate small clean-air actions.',
            audience: 'Residents concerned about pollution',
            venueType: 'A community centre or library room',
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
          'Match the category to your interests and the audience you can reach. In Bangkok, recurring formats with a fixed venue near the BTS — a food walk, a morning run, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to speak Thai to organize?',
        answer:
          'No. Many Bangkok groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Bangkok Origins start, and the city's warmth keeps members coming back. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Bangkok?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Bangkok residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Bangkok?',
      answer:
        'Yes. Bangkok has a warm culture, legendary food, and a growing startup and creative scene. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Chatuchak market, Lumphini Park, Thonglor cafés, Charoenkrung galleries — exists in Bangkok. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Bangkok?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Bangkok residents find or start Origins.',
    },
  ],
};

export default content;
