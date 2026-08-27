import type { CityContent } from '../../types';

/**
 * Seoul content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Seoul's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'seoul',
  intro: [
    "Seoul is one of Asia's most dynamic cities, where a hyper-connected tech culture meets deep traditions of neighbourhood life. The city's communities spread across distinctive districts — Gangnam for finance and tech, Hongdae for indie music and the arts, Itaewon and Gyeongnidan for internationals, and the university belt of Sinchon and Hyehwa for students and young organizers.",
    "Institutions anchor Seoul's life: Seoul National University, Yonsei, Korea University, and dozens more feed a constant stream of students and researchers, while corporate giants like Samsung, Kakao, and Naver draw talent and spin out startups. The Han River parks, Namsan mountain, and the city's network of hills and streams give groups free, well-known outdoor venues year round.",
    "For finding or starting an Origin, Seoul rewards energy and trend-awareness: formats move fast here, so a clear identity and a consistent weekly rhythm matter more than long-term plans. The city's café culture and 24-hour energy mean venues are almost always available.",
  ],
  dataPoints: [
    'Roughly 10.3 million residents; the capital of South Korea.',
    'Districts with distinct scenes: Gangnam, Hongdae, Itaewon, Sinchon, Hyehwa, and Seongsu.',
    'Home to Seoul National University, Yonsei, Korea University, and many more.',
    'Industries: technology, finance, entertainment (K-pop), and startups.',
    'Café culture is central — Seoul has one of the densest café scenes in the world.',
    'Public anchors: the Han River parks, Namsan, and the Cheonggyecheon stream.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Gangnam and Teheran-ro',
        'Startup event floors near Yangjae and Seongsu',
        'Incubator rooms at SNU and KAIST-affiliated centres',
        'Innovation hubs in Pangyo and the Digital Media City',
        'Cafés with meeting corners in Seongsu',
        'Hotel conference rooms in Gangnam',
      ],
      formats: [
        'Founder breakfasts and networking nom-jips',
        'Pitch evenings and demo nights',
        'Deep-tech and AI builder circles',
        'Investor office hours',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — deep tech, AI, K-content, or fintech — and a bilingual name.',
        'Reserve a recurring slot at a Gangnam or Seongsu coworking space near the subway.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Live houses and indie stages in Hongdae',
        'Galleries in Samcheong-dong and Hannam',
        'Design studios in Seongsu-dong',
        'K-pop and entertainment studios in Gangnam',
        'Indie cinemas in Daehak-ro',
        'Café stages across Hongdae and Yeonnam',
      ],
      formats: [
        'Hongdae indie music showcase nights',
        'Open-mic and spoken word evenings',
        'Design critique circles',
        'Indie film screenings and Q&As',
        'Zine and craft market days',
      ],
      howToStart: [
        'Choose a craft — music, film, design, illustration — and a regular evening slot.',
        'Partner with a live house, gallery, or studio in Hongdae or Seongsu to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'District office and community centre halls',
        'Neighbourhood council meeting rooms',
        'University seminar rooms at SNU and Yonsei',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Air quality and climate action circles',
        'Housing and rent policy info evenings',
        'Youth and education advocacy meetings',
        'Volunteer briefings for city programmes',
        'Public space and park planning meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a housing block, an air-quality ward — and keep the geography small.',
        'Partner with an existing NGO, district office, or university group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Han River parks — Yeouido, Ttukseom, and Banpo',
        'Cafés in Hongdae, Yeonnam, and Seongsu',
        "Namsan hiking trails and the city's hills",
        'Cheonggyecheon stream paths',
        'Book cafés in the university districts',
        'Breweries and pubs in Gyeongnidan and Itaewon',
      ],
      formats: [
        'Han River picnic and barbecue evenings',
        'Language exchange tables for internationals',
        'Hiking groups up Namsan and Bukhansan',
        'Board game café evenings',
        'Sunday park runs and walking groups',
      ],
      howToStart: [
        'Choose a repeatable format — a river picnic, a weekly hike, a café night — and a fixed meeting point.',
        'Pick a Han River park entrance or a Hongdae café that is easy to reach by subway.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Traditional market association halls in Namdaemun and Gwangjang',
        'Café and restaurant owner tables in Seongsu and Yeonnam',
        'Boutique owner circles in Hannam and Garosu-gil',
        'Design and brand studios in Seongsu-dong',
        'Craft market stalls at city festivals',
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
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and trends.',
        'After three breakfasts, rotate one practical topic per month and let the association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Seoul's startup scene is one of Asia's most energetic, powered by world-class tech companies, top universities, and a culture that moves fast. Founders cluster in Gangnam's Teheran-ro, Seongsu-dong, and the startup hubs of Pangyo and the Digital Media City, where coworking spaces, accelerators, and university programs at SNU, KAIST-affiliated centres, and Yonsei create a dense loop of talent and capital. The city's strengths span deep tech, AI, fintech, and K-content — music, film, and game studios that ride Korea's global cultural wave. The culture is intense but friendly: people work hard, share openly, and are quick to try new formats. English is common in the international founder community, and the government actively supports startups with programs and funding. Recurring formats include founder breakfasts, pitch evenings, deep-tech circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near a subway stop; Seoul's speed and energy do the rest.",
    creative:
      "Seoul's creative scene is loud, global, and constantly reinventing itself. Hongdae remains the indie heart — live houses, busking corners, and cafés that host music, art, and spoken word almost every night — while Seongsu-dong's converted factories hold design studios and craft brands, and Samcheong-dong and Hannam host galleries and boutique fashion. The entertainment industry — K-pop, film, and games — is a national engine, and its studios in Gangnam and the surrounding districts pull talent from every creative field. Indie film and theatre thrive in Daehak-ro, and the city's zine, craft, and flea market culture gives makers a stage. Art schools and universities feed a steady stream of graduates into a fast-moving freelance economy. Common formats include indie showcase nights, open-mics, design critiques, and market days. Starting a creative Origin in Seoul is realistic: pick a craft and a district with an existing audience — Hongdae for music, Seongsu for design — and the city's creative energy will pull people in.",
    political:
      "Seoul's civic life is young, organised, and increasingly focused on the quality of urban life. Air quality is a defining issue — citizen groups, universities, and environmental NGOs run monitoring, advocacy, and clean-air campaigns that are open to newcomers. Housing affordability is another live front in a city where jeonse deposits and rents weigh on young people, and tenant networks hold info evenings and policy discussions. The city's parks, hills, and the Han River generate constant planning conversations about public space, and district offices welcome resident input. University campuses — SNU, Yonsei, Korea University — are hubs of debate and activism, with forums that are open to the public. The culture rewards speed and visibility: a clear demand and a visible event matter more than long committee processes. Starting a political Origin here means choosing one concrete issue and a small geography — a park, a housing block, an air-quality ward — then partnering with the NGO and district structures that already exist. Seoul rewards energetic, consistent action.",
    meetup:
      "Seoul's meetup scene is built for social people: the Han River parks host legendary evening picnics and barbecues, the hills offer hiking groups nearly every weekend, and the café districts of Hongdae, Yeonnam, and Seongsu fill with book clubs, board game evenings, and language exchanges. International meetups are especially strong — Seoul's large expat community runs English-speaking groups across every interest, and language exchange is a major category. The city's 24-hour energy means even late-night formats find venues, and the subway makes cross-district attendance easy. Group culture here is fast and fun: formats are casual, people show up consistently, and the city's famous politeness keeps things friendly. Starting a meetup is realistic: pick a repeatable format — a river picnic, a weekly hike, a café night — and a fixed meeting point near a station, run three sessions at the same time and place, and Seoul's social energy will take over.",
    'small-business':
      "Seoul's small business community spans the old markets and the trend-setting new districts. Namdaemun and Gwangjang markets run on trader associations that manage festival stalls, shared security, and collective voice on rents and rules, preserving traditions that go back decades. The new economy is different: Seongsu-dong's design studios and cafés, Garosu-gil's boutiques, and Yeonnam's independent restaurants form a tight community of trend-conscious owners who meet to swap design ideas, supplier contacts, and customer insights. Korea's digital-payments and e-commerce infrastructure gives small businesses powerful tools, and the chamber of commerce runs practical clinics on using them well. Franchise chains dominate many streets, which makes the independent owners' willingness to share local knowledge even more valuable to newcomers. What holds these groups together is geography and taste: a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business Origin in Seoul is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Seoul is made for Origin event ideas: the river parks are free, the cafés are everywhere, and the city's energy makes people show up. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Seoul, from Han River parks and Hongdae live houses to Gangnam coworking floors and Seongsu cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near a subway stop, and let Seoul's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Hongdae newcomer coffee circle',
            pitch:
              'A weekly low-pressure coffee where newcomers and long-time Seoulites trade city tips and work stories.',
            audience: 'New arrivals and internationals',
            venueType: 'A café in Hongdae',
          },
          {
            title: 'Gangnam founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Seoul',
            venueType: 'A café near Gangnam Station',
          },
          {
            title: 'Yeonnam-dong meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Creatives and professionals',
            venueType: 'A café in Yeonnam-dong',
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
            venueType: 'A coworking café in Seongsu',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Korean conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Korean',
            venueType: 'A community centre or café',
          },
          {
            title: 'K-pop dance introduction class',
            pitch:
              'A friendly beginner session learning choreography from popular songs — no experience needed.',
            audience: 'Dance lovers and K-pop fans',
            venueType: 'A dance studio or community hall',
          },
          {
            title: 'Korean cooking home-style class',
            pitch:
              'Small-group classes teaching kimchi, bibimbap, and other everyday dishes from scratch.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking or incubator event room',
          },
          {
            title: 'Public speaking and presentation practice',
            pitch:
              'Structured practice rounds with constructive feedback for people who speak at work and in public.',
            audience: 'Students and professionals',
            venueType: 'A college hall or library room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Han River evening picnic',
            pitch:
              'Blankets, fried chicken, and games at the park, with a sunset view of the bridges.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Yeouido Han River Park',
          },
          {
            title: 'Namsan sunset hike',
            pitch: 'A friendly evening hike up Namsan with a city view from the top.',
            audience: 'Hikers of every level',
            venueType: 'Namsan trails',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café near Hongdae',
          },
          {
            title: 'Sunday morning run along the river',
            pitch:
              'A friendly, all-paces group run along the Han River, followed by a café breakfast.',
            audience: 'Runners of every level',
            venueType: 'Ttukseom or Banpo river paths',
          },
          {
            title: 'Cheonggyecheon evening walk',
            pitch:
              'A guided walk along the restored stream with stops for history and street food.',
            audience: 'Explorers and history lovers',
            venueType: 'Cheonggyecheon stream paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Deep-tech and AI builders circle',
            pitch:
              'Engineers and researchers share work-in-progress and discuss the practical side of AI products.',
            audience: 'AI and deep-tech builders',
            venueType: 'An innovation hub or university room',
          },
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share product progress and regulatory lessons.',
            audience: 'Fintech founders and operators',
            venueType: 'A coworking floor in Gangnam',
          },
          {
            title: 'K-content industry meetup',
            pitch:
              'Professionals in music, film, games, and content platforms discuss trends and collaboration.',
            audience: 'K-content professionals and founders',
            venueType: 'A studio lounge or hotel room',
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
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Hongdae indie showcase night',
            pitch:
              "A monthly open stage for indie bands, solo artists, and first-timers in the city's music district.",
            audience: 'Musicians and music lovers',
            venueType: 'A live house in Hongdae',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Hongdae or Yeonnam',
          },
          {
            title: 'Seongsu design and craft market',
            pitch:
              'Local designers and makers sell and tell the stories behind their work in a friendly weekend market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'A Seongsu studio complex or gallery',
          },
          {
            title: 'Indie film screening and Q&A',
            pitch:
              'Independent filmmakers screen short work and answer audience questions about the craft.',
            audience: 'Film lovers and student filmmakers',
            venueType: 'An indie cinema in Daehak-ro',
          },
          {
            title: 'Drawing circle in a café',
            pitch:
              'A weekly session where illustrators and hobbyists draw together and share techniques.',
            audience: 'Artists of every level',
            venueType: 'A café with long tables in Seongsu',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Han River cleanup morning',
            pitch:
              'A Saturday morning cleanup of a river park stretch, with gloves and coffee supplied by local groups.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A Han River park stretch',
          },
          {
            title: 'Air quality action circle',
            pitch:
              'Residents monitor and discuss local air quality and coordinate small clean-air actions with the district.',
            audience: 'Residents concerned about pollution',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Housing and rent policy info evening',
            pitch:
              'A plain-language session on deposits, leases, and tenant rights for young residents.',
            audience: 'Renters and young professionals',
            venueType: 'A community centre or university room',
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
          'Match the category to your interests and the audience you can reach. In Seoul, recurring formats with a fixed venue near a station — a river picnic, a weekly hike, a café circle — build community fastest.',
      },
      {
        question: 'Do I need to speak Korean to organize?',
        answer:
          'No. Many Seoul groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Seoul Origins start, and the city's energy sustains them. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Seoul?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Seoulites gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Seoul?',
      answer:
        'Yes. Seoul has huge social energy, a dense café culture, and reliable public transport. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Han River parks, Hongdae live houses, Seongsu cafés, Namdaemun markets — exists in Seoul. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Seoul?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Seoulites find or start Origins.',
    },
  ],
};

export default content;
