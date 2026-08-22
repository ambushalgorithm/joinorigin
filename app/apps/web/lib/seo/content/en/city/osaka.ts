import type { CityContent } from '../../types';

/**
 * Osaka content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Osaka's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'osaka',
  intro: [
    "Osaka is Japan's merchant city — a place where commerce, food, and a famously direct sense of humour shape every part of life. The city's energy concentrates around Namba, Dotonbori, and Umeda, where restaurants, arcades, and entertainment venues draw crowds late into the night, while quieter neighbourhoods like Tennoji and the riverside wards hold family and hobby communities.",
    "Institutions anchor Osaka's life: Osaka University, Kansai University, and a cluster of colleges feed a constant stream of students, while the city's long merchant tradition shows up in everything from Kuromon Market's traders to the region's manufacturing strength in electronics and machinery. Osaka Castle park, the Yodo riverbank, and the bay area give groups free, well-known outdoor venues.",
    "For finding or starting a community, Osaka rewards personality and warmth: be direct, bring food, and keep the tone friendly — the city's culture of kuidaore (eat till you drop) makes shared meals the fastest way to build belonging.",
  ],
  dataPoints: [
    'Roughly 2.8 million residents in the city; the commercial heart of the Kansai region.',
    'Districts with distinct scenes: Namba, Dotonbori, Umeda, Tennoji, and the bay area.',
    'Home to Osaka University, Kansai University, and many colleges.',
    'Industries: manufacturing, electronics, food, entertainment, and startups.',
    "Food culture is central — Kuromon Market and Dotonbori anchor the city's identity.",
    'Public anchors: Osaka Castle park, the Yodo riverbank, and the bay waterfront.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Umeda and Namba',
        'Startup event floors near Osaka Station',
        'Incubator rooms at Osaka University',
        'Innovation hubs in the bay area',
        'Cafés with meeting corners in Nakazakicho',
        'Izakaya tables for relaxed founder evenings',
      ],
      formats: [
        'Founder nomikai with round intros',
        'Pitch evenings and demo nights',
        'Manufacturing-tech and medtech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — manufacturing tech, medtech, food tech, or SaaS — and a bilingual name.',
        'Reserve a recurring slot at an Umeda or Namba coworking space with train access.',
        'Run three open meetups, then add a nomikai after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Live houses in America-mura and Umeda',
        'Galleries in Nakazakicho and the riverside',
        'Comedy and rakugo theatres in the entertainment districts',
        'Design studios in Minami',
        'Indie shops and project spaces in the Shinsaibashi area',
        'Café stages in Nakazakicho',
      ],
      formats: [
        'Comedy and rakugo open nights',
        'Zine and indie art markets',
        'Indie music showcase nights',
        'Design and craft workshops',
        'Gallery walk and talk evenings',
      ],
      howToStart: [
        'Choose a craft — comedy, music, illustration, design — and a regular evening slot.',
        'Partner with a live house, gallery, or café stage in America-mura or Nakazakicho to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Ward office and community centre halls',
        'Neighbourhood association (chōnaikai) meeting rooms',
        'University seminar rooms at Osaka University',
        'NGO and volunteer centres near the city centre',
        'Public library rooms with civic collections',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Neighbourhood association info sessions',
        'Disaster preparedness drill planning',
        'Bay and river cleanup volunteer briefings',
        'Climate and clean-energy action circles',
        'Public space and park planning meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a river stretch, a ward — and keep the geography small.',
        'Introduce yourself to the local chōnaikai or a ward office and partner instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Osaka Castle park lawns',
        'Dotonbori and Namba food lanes',
        'Cafés in Nakazakicho and Shinsaibashi',
        'Yodo riverbank paths',
        'Kuromon Market corners for food walks',
        'Community halls in the residential wards',
      ],
      formats: [
        'Food walk groups through Dotonbori and Kuromon',
        'Language exchange tables for newcomers',
        'Board game café evenings',
        'Sunday park runs and walking groups',
        'Nomikai after-work gatherings',
      ],
      howToStart: [
        'Choose a repeatable format — a food walk, a monthly nomikai — and a fixed starting point.',
        'Pick a Dotonbori corner or a Nakazakicho café that is easy to reach by train.',
        'Run three consistent sessions, then add a small ritual that makes the group feel real.',
      ],
    },
    'small-business': {
      venues: [
        'Kuromon Market trader association halls',
        'Shotengai shopping street association rooms',
        'Restaurant and café owner tables in Minami',
        'Craft and design brand studios in Shinsaibashi',
        'Manufacturing network rooms in the bay area',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Market trader breakfasts with no agenda',
        'Shopping street festival planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one shopping street or market and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Osaka's startup scene is smaller than Tokyo's but distinctively practical, rooted in the Kansai region's manufacturing strength. Founders cluster around Umeda, Namba, and the bay area, where coworking spaces, incubators, and university programs at Osaka University create a solid base of talent and capital. The city's manufacturing heritage — electronics, machinery, precision components — gives local startups unusual depth in hardware, medtech, and factory automation, and Osaka's food industry fuels a growing food-tech corner. The culture is direct and deal-oriented: people say what they mean, negotiations are quick, and the merchant instinct shows up in how founders think about margins and customers. The region's corporate giants are close, creating genuine partnership paths that founders elsewhere envy. Recurring formats include founder nomikai, pitch evenings, manufacturing-tech circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue near a station; Osaka's pragmatism and warmth do the rest.",
    creative:
      "Osaka's creative scene is loud, funny, and wonderfully independent. The city is Japan's comedy capital — manzai and rakugo traditions run deep, and America-mura's live houses, Shinsaibashi's indie shops, and Nakazakicho's galleries give creators a dense stage. Indie music thrives in Umeda and America-mura, with small venues hosting rock, jazz, and electronic nights most weeks of the year. The city's zine and art market culture is strong, and its craftspeople — knife makers, textile dyers, furniture builders — keep the region's making traditions alive. Design schools and art universities feed a steady stream of graduates into the freelance economy. Osaka's sense of humour shapes the scene: events are playful, audiences are warm, and creators are encouraged to take risks on stage. Common formats include comedy open nights, zine markets, indie showcases, and craft workshops. Starting a creative community in Osaka is realistic: pick a craft and a venue with an existing audience, and the city's playful energy will pull people in.",
    political:
      "Osaka's civic life blends the region's merchant pragmatism with a strong tradition of neighbourhood organizing. The chōnaikai — neighbourhood associations — are active across the city, running festivals, cleaning streets, and organizing disaster preparedness in a city that remembers earthquakes and typhoons. The bay and rivers give environmental groups concrete projects: cleanup drives, river monitoring, and green-space restoration are common and open to newcomers. Osaka's history of industrial growth left a legacy of environmental and health concerns that citizen groups still track and advocate on. University campuses and research institutes add an evidence-driven layer, particularly around urban and climate policy. The culture rewards directness and reliability: showing up to a real meeting and taking on a specific job matters more than online commentary. Starting a political community here means choosing one concrete issue and a small geography — a park, a river stretch, a ward — then partnering with the chōnaikai and ward structures that already exist. Osaka rewards steady, visible participation.",
    meetup:
      "Osaka's meetup scene is built around the city's two great loves: food and fun. Dotonbori's neon lanes, Kuromon Market's food stalls, and the backstreets of Namba are the natural stage for the city's favourite format — the food walk, where a group eats its way through a neighbourhood with stops for history and conversation. Nakazakicho and Shinsaibashi hold the café circuit: book clubs, language exchanges, board game evenings, and freelance coffee mornings. Osaka Castle park and the Yodo riverbank host running, walking, and picnic groups, and the city's famous warmth makes newcomers feel welcome immediately. The nomikai is a beloved institution — after any event, a drink and a shared meal, and the real conversation begins. Groups here tend to be casual and quick to laugh, matching the city's culture. Starting a meetup is realistic: pick a repeatable format — a food walk, a monthly nomikai — and a fixed venue near a station, run three sessions at the same time and place, and Osaka's friendliness will take over.",
    'small-business':
      "Osaka is Japan's merchant city, and its small business community reflects that heritage in every district. Kuromon Market's traders, the shotengai shopping streets of the residential wards, and the restaurant rows of Minami all run through associations that manage festivals, shared security, and collective voice on rent and rules. The city's manufacturing network — small precision, electronics, and machinery firms — is famous for its collaborative subcontracting culture, where small shops share orders, know-how, and capacity. A newer layer of cafés, boutiques, and craft brands in Nakazakicho and Shinsaibashi adds creative energy, and the chamber of commerce runs practical clinics on digital payments, e-commerce, and hiring. What holds these groups together is geography and craft: a market or a corridor shares customers, foot traffic, and the same festival calendar. Starting a small business community in Osaka is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Osaka is a wonderful city for community event ideas: the food is famous, the comedy culture is welcoming, and the city's warmth makes people come back. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Osaka, from Dotonbori food lanes and Kuromon Market corners to Nakazakicho cafés and Osaka Castle park lawns. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near a station, and let Osaka's warmth do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Dotonbori newcomer nomikai',
            pitch:
              'A monthly after-work drink where newcomers and long-time residents trade city tips, food secrets, and connections.',
            audience: 'Newcomers and curious locals',
            venueType: 'An izakaya near Dotonbori',
          },
          {
            title: 'Umeda founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Osaka',
            venueType: 'A café near Umeda Station',
          },
          {
            title: 'Nakazakicho café meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Creatives and professionals',
            venueType: 'A café in Nakazakicho',
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
            venueType: 'A coworking café in Shinsaibashi',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Japanese conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Japanese',
            venueType: 'A community centre or café',
          },
          {
            title: 'Kansai dialect crash course',
            pitch:
              "A fun session on Osaka-ben — the region's famous dialect — for newcomers who want to fit in.",
            audience: 'Newcomers and language lovers',
            venueType: 'A café or community room',
          },
          {
            title: 'Home-style Kansai cooking class',
            pitch:
              'Small-group classes teaching okonomiyaki, takoyaki, and other local dishes from scratch.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Manufacturing craft workshop',
            pitch:
              'Hands-on sessions with local makers — knife sharpening, leatherwork, or electronics basics.',
            audience: 'Makers and craft lovers',
            venueType: 'A workshop in the bay area or craft district',
          },
          {
            title: 'Disaster preparedness workshop',
            pitch:
              'A plain-language session on earthquake and typhoon kits, evacuation routes, and ward plans.',
            audience: 'Residents and newcomers',
            venueType: 'A ward community centre',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Dotonbori food walk',
            pitch:
              'A guided evening walk through the neon lanes and food alleys with stops at legendary stalls.',
            audience: 'Food lovers and explorers',
            venueType: 'Dotonbori and Namba lanes',
          },
          {
            title: 'Kuromon Market breakfast tour',
            pitch:
              "A morning walk through the market, tasting fresh seafood and street food with the traders' stories.",
            audience: 'Food lovers and early risers',
            venueType: 'Kuromon Market',
          },
          {
            title: 'Osaka Castle park picnic and games',
            pitch:
              'Blankets, snacks, and casual games in the castle grounds, with a cherry-blossom calendar handy.',
            audience: 'Families and friend groups',
            venueType: 'Osaka Castle park lawns',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café near Namba',
          },
          {
            title: 'Yodo riverbank cycle ride',
            pitch: 'A relaxed evening ride along the river with café stops and a sunset view.',
            audience: 'Leisure cyclists',
            venueType: 'Yodo river paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Manufacturing-tech builders circle',
            pitch:
              'A monthly roundtable for founders building hardware and factory technology to share progress and lessons.',
            audience: 'Hardware and manufacturing-tech founders',
            venueType: 'A bay-area innovation hub room',
          },
          {
            title: 'Medtech and healthtech network evening',
            pitch:
              'Engineers, clinicians, and founders in medical technology share trends and collaboration paths.',
            audience: 'Medtech professionals and founders',
            venueType: 'A hospital or university event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Food tech founders table',
            pitch:
              'Founders building in food tech — kitchens, delivery, ingredients — share progress and lessons.',
            audience: 'Food tech founders and operators',
            venueType: 'A coworking floor near Namba',
          },
          {
            title: 'Corporate partnership evening',
            pitch:
              'Startup founders and corporate innovation teams discuss how to build honest, useful partnerships.',
            audience: 'Founders and corporate innovation leads',
            venueType: 'A hotel lounge or innovation hub',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Comedy and rakugo open night',
            pitch:
              'A monthly open stage for stand-up, manzai, and rakugo storytellers — beginners warmly welcome.',
            audience: 'Comedians, storytellers, and audiences',
            venueType: 'A comedy or rakugo theatre in Minami',
          },
          {
            title: 'America-mura indie music night',
            pitch:
              "A monthly open stage for indie bands and solo artists in the city's creative district.",
            audience: 'Musicians and music lovers',
            venueType: 'A live house in America-mura',
          },
          {
            title: 'Zine and art market day',
            pitch:
              'Creators sell and trade handmade zines, prints, and small objects in a friendly market.',
            audience: 'Makers, artists, and collectors',
            venueType: 'A gallery or community hall in Nakazakicho',
          },
          {
            title: 'Drawing circle in a café',
            pitch:
              'A weekly session where illustrators and hobbyists draw together and share techniques.',
            audience: 'Artists of every level',
            venueType: 'A café with long tables in Shinsaibashi',
          },
          {
            title: 'Craft knife and tool workshop',
            pitch:
              'Local craftspeople teach the basics of knife sharpening and tool care, Osaka-style.',
            audience: 'Cooks and makers',
            venueType: 'A craft shop or workshop room',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'River cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a river stretch, with gloves and coffee supplied by local groups.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A Yodo river stretch',
          },
          {
            title: 'Park clean-up and planting day',
            pitch: "Neighbours tidy and plant a local park with the ward's parks team.",
            audience: 'Neighbours and families',
            venueType: 'A local park or green space',
          },
          {
            title: 'Disaster preparedness block meeting',
            pitch:
              "Neighbours map their block's response plan — assembly points, supplies, and who checks on whom.",
            audience: 'Residents of a single block',
            venueType: "A community centre or neighbour's lounge",
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Shotengai storytelling night',
            pitch:
              'Shop owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbours and small business owners',
            venueType: 'A shopping street hall or local café',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Osaka, recurring formats with a fixed venue near a station — a food walk, a monthly nomikai, a café circle — build community fastest.',
      },
      {
        question: 'Do I need to speak Japanese to organize?',
        answer:
          'No. Many Osaka groups run bilingually or in English, and the international community is growing. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats and shared meals are how most Osaka communities start. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Osaka?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Osakans gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Osaka?',
      answer:
        'Yes. Osaka has a warm, direct culture, famous food, and reliable trains. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Dotonbori lanes, Kuromon Market, Nakazakicho cafés, Osaka Castle park — exists in Osaka. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Osaka?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Osakans find or start communities.',
    },
  ],
};

export default content;
