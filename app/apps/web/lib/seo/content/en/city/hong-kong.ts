import type { CityContent } from '../../types';

/**
 * Hong Kong content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Hong Kong's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'hong-kong',
  intro: [
    'Hong Kong is a dense, vertical city where finance, tech, and a fierce community spirit coexist in a small geographic area. Its districts have sharply different personalities — Central and Admiralty for finance and law, Causeway Bay and Mong Kok for shopping and street life, Tsim Sha Tsui and the harbourfront for views and events, and the New Territories and outlying islands for hiking and village life.',
    "Institutions anchor Hong Kong's community life: the University of Hong Kong, CUHK, HKUST, and a cluster of other universities feed a constant stream of students and researchers, while Cyberport and the Hong Kong Science Park anchor the tech and startup scene. The MTR makes the city easy to cross, and Victoria Harbour, the Peak, and hundreds of kilometres of country trails give groups spectacular free venues.",
    "For finding or starting a community, Hong Kong rewards efficiency and authenticity: spaces are expensive, so formats that are well-organised and genuinely useful win, and the city's dim sum and tea culture makes shared meals a natural part of building trust.",
  ],
  dataPoints: [
    'Roughly 7.4 million residents; a global financial hub.',
    'MTR network and ferries connect the islands and mainland.',
    'Districts with distinct scenes: Central, Causeway Bay, Mong Kok, Tsim Sha Tsui, and the New Territories.',
    'Home to HKU, CUHK, HKUST, and many other universities.',
    'Industries: finance, technology, trade, and professional services.',
    'Public anchors: Victoria Harbour, the Peak, and the country park trails.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Sheung Wan and Causeway Bay',
        'Cyberport event floors in Pok Fu Lam',
        'HKSTP science park rooms in the New Territories',
        'Incubator rooms at HKU and HKUST',
        'Cafés with meeting corners in Sheung Wan and Kennedy Town',
        'Hotel conference rooms in Admiralty',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech and deep-tech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, deep tech, climate, or logistics — and a bilingual name.',
        'Reserve a recurring slot at a Sheung Wan or Cyberport coworking space near the MTR.',
        'Run three open meetups, then add a dim sum lunch after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in Central and Sheung Wan',
        'Indie music and art venues in Mong Kok and Wong Chuk Hang',
        'Design studios in PMQ and Sai Ying Pun',
        'Independent cinemas in Central and the New Territories',
        'Street-art corners in Sheung Wan and Kwun Tong',
        'Café stages in Sai Ying Pun and Kennedy Town',
      ],
      formats: [
        'Art walk and gallery evenings',
        'Indie music showcase nights',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through the old districts',
      ],
      howToStart: [
        'Choose a craft — music, design, film, illustration — and a regular evening slot.',
        'Partner with a gallery, studio, or venue in PMQ, Sheung Wan, or Wong Chuk Hang to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'District council and community centre halls',
        'University seminar rooms at HKU and CUHK',
        'NGO and social enterprise offices in Kennedy Town and Yau Ma Tei',
        'Public library rooms with civic collections',
        'Housing estate community halls',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Urban planning and housing policy forums',
        'Harbour and beach cleanup volunteer briefings',
        'Social enterprise and community economy circles',
        'Heritage preservation talks and walks',
        'Climate and air-quality action meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a heritage block, a housing policy — and keep the geography small.',
        'Partner with an existing NGO, social enterprise, or district group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Victoria Harbour waterfront and the Tsim Sha Tsui promenade',
        "Country parks and trails — Dragon's Back, Lantau, and the New Territories",
        'Dim sum restaurants in Mong Kok and Central',
        'Cafés in Sai Ying Pun and Kennedy Town',
        'Beaches on Lamma and Cheung Chau',
        'Community halls in the housing estates',
      ],
      formats: [
        'Sunday hiking groups on the country trails',
        'Dim sum lunch circles',
        'Harbourfront walking groups',
        'Language exchange tables for newcomers',
        'Board game café evenings',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday hike, a dim sum circle — and a fixed meeting point.',
        'Pick a MTR-accessible trailhead or a dim sum restaurant that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Old market and wet market trader networks in Mong Kok and Sham Shui Po',
        'Restaurant and café owner tables in Sai Ying Pun and Central',
        'Boutique owner circles in Central and Causeway Bay',
        'Design brand studios in PMQ and Kwun Tong',
        'Factory building maker studios in Wong Chuk Hang',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Trader breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about rent, customers, and the festival calendar.',
        'After three breakfasts, rotate one practical topic per month and let the trader network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Hong Kong's startup scene is compact but globally connected, with real strengths in fintech, deep tech, and logistics — natural outgrowths of the city's financial and trade heritage. Founders cluster in Sheung Wan, Causeway Bay, Cyberport, and the Hong Kong Science Park, where coworking spaces, accelerators, and university programs at HKU and HKUST create a dense loop of capital and talent. The city's position as a gateway between China and global markets gives local startups unusual advantages in cross-border finance, supply chains, and regional expansion, and the government supports the ecosystem through funding and talent schemes. The culture is fast, professional, and pragmatic: meetings are efficient, people are direct, and the city's density means opportunities travel quickly. English and Cantonese both work in the ecosystem. Recurring formats include founder breakfasts, pitch evenings, fintech and deep-tech circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue near the MTR; Hong Kong's speed and connectivity do the rest.",
    creative:
      "Hong Kong's creative scene lives in the gaps between skyscrapers: PMQ's design studios, Sheung Wan's galleries and street art, Wong Chuk Hang's converted factory studios, and the indie music and art venues of Mong Kok and Kwun Tong. The city's film heritage — Hong Kong cinema is world-famous — feeds a serious community of filmmakers, while its design and fashion brands compete globally. The old districts of Sham Shui Po and Tai O preserve craft and street culture that creators love to document and rework. Independent cinema, theatre, and music have devoted audiences, and the city's café culture gives creators a stage in Sai Ying Pun and Kennedy Town. Art and design schools feed a steady stream of graduates into a fast-moving freelance economy. Common formats include art walks, indie showcases, craft markets, and open-mics. Starting a creative community in Hong Kong is realistic: pick a craft and a venue with an existing audience, and the city's density and taste will pull people in.",
    political:
      "Hong Kong's civic life is intense and organised, shaped by the city's dense geography and its history of social movements. Housing affordability is the defining issue — one of the world's most expensive property markets — and tenant, housing, and urban-planning groups run forums, research, and advocacy that are open to newcomers. The harbour, beaches, and country parks generate environmental work: cleanup drives, beach restoration, and climate action circles are common. Social enterprises and community economy projects — from co-ops to neighbourhood networks — have a strong presence, especially in Yau Ma Tei, Sham Shui Po, and Kennedy Town. University campuses are hubs of debate and research. The culture rewards precision and persistence: well-researched positions and visible, consistent action matter more than commentary. Starting a political community here means choosing one concrete issue and a small geography — a park, a heritage block, a housing estate — then partnering with the NGO, social enterprise, and district structures that already exist. Hong Kong rewards serious, consistent participation.",
    meetup:
      "Hong Kong's meetup scene is built for people who love both the city's energy and its escapes. The harbourfront — Tsim Sha Tsui promenade, the Central waterfront — is the classic evening venue, with walking groups, sunset photo circles, and weekend events along the water. The country parks are the great weekend draw: Dragon's Back, Lantau, and the New Territories trails host hiking groups that are famously welcoming to beginners. Dim sum is the great social ritual — a group of strangers around a table of steamed baskets becomes friends fast — and lunch circles are a beloved format. Sai Ying Pun and Kennedy Town cafés host book clubs, language exchanges, and board game evenings, while the outlying islands of Lamma and Cheung Chau offer beach picnics and lazy afternoons. The MTR and ferries make everything accessible. Groups here tend to be well-organised and warm, matching the city's efficiency. Starting a meetup is realistic: pick a repeatable format — a Sunday hike, a dim sum circle — and a fixed meeting point, run three sessions at the same time and place, and Hong Kong's energy will take over.",
    'small-business':
      "Hong Kong's small business community runs on density and tradition. The old markets — Mong Kok, Sham Shui Po, and the wet markets of the districts — run on trader networks that manage stalls, festivals, and collective voice on rents and regulations. The new economy is different: Sai Ying Pun and Kennedy Town cafés and restaurants, Central boutiques, and the design studios of PMQ and Kwun Tong form a tight community of independent owners who meet to swap supplier contacts, design ideas, and customer insights. The city's factory buildings in Wong Chuk Hang and Kwun Tong now hold maker studios and small brands that export globally. Trade bodies and the chamber of commerce run practical clinics on digital payments, e-commerce, and licensing. What holds these groups together is geography and taste: a market or a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business community in Hong Kong is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Hong Kong is a wonderful city for community event ideas: the harbour and country parks give you spectacular venues, the MTR makes everything reachable, and the city's energy makes people show up. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Hong Kong, from the Tsim Sha Tsui promenade and Dragon's Back trail to Cyberport floors and Sai Ying Pun cafés. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near the MTR, and let Hong Kong's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Harbourfront newcomer circle',
            pitch:
              'An evening walk along the waterfront where newcomers and long-time residents trade city tips and work stories.',
            audience: 'New arrivals and internationals',
            venueType: 'Tsim Sha Tsui promenade',
          },
          {
            title: 'Sheung Wan founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Hong Kong',
            venueType: 'A café in Sheung Wan',
          },
          {
            title: 'Sai Ying Pun meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in Sai Ying Pun',
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
            venueType: 'A coworking café in Kennedy Town',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Cantonese conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Cantonese',
            venueType: 'A community centre or café',
          },
          {
            title: 'Dim sum appreciation and food history walk',
            pitch:
              'A guided walk through the old tea houses and a tasting class on the craft of dim sum.',
            audience: 'Food lovers and history buffs',
            venueType: 'A dim sum restaurant in Mong Kok or Central',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking or incubator event room',
          },
          {
            title: 'Hiking skills and trail safety',
            pitch:
              'Experienced hikers teach route planning, gear basics, and safety for the country trails.',
            audience: 'Beginner hikers',
            venueType: 'A hiking club or outdoor shop room',
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
            title: "Dragon's Back Sunday hike",
            pitch: 'A friendly group hike along the famous ridge with a beach finish and a picnic.',
            audience: 'Hikers of every level',
            venueType: "Dragon's Back trail",
          },
          {
            title: 'Victoria Harbour sunset walk',
            pitch:
              'A guided evening walk along the waterfront, timed for the light show and sunset.',
            audience: 'Explorers and photographers',
            venueType: 'Tsim Sha Tsui promenade',
          },
          {
            title: 'Dim sum lunch circle',
            pitch:
              'A weekly lunch at the same restaurant where newcomers and regulars share baskets and stories.',
            audience: 'Food lovers and newcomers',
            venueType: 'A dim sum restaurant in Mong Kok',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in Causeway Bay',
          },
          {
            title: 'Lamma Island beach picnic',
            pitch:
              'A ferry ride to the island for a lazy afternoon of swimming, food, and conversation.',
            audience: 'Beach lovers and weekenders',
            venueType: 'Lamma Island beaches',
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
            venueType: 'A coworking floor in Sheung Wan',
          },
          {
            title: 'Deep-tech and science park circle',
            pitch:
              'Researchers and founders in biotech, materials, and deep tech share progress and funding paths.',
            audience: 'Deep-tech founders and researchers',
            venueType: 'HKSTP or a university event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Logistics and trade tech meetup',
            pitch:
              'Professionals in shipping, supply chains, and trade technology discuss trends and collaboration.',
            audience: 'Logistics and trade professionals',
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
            title: 'PMQ design and craft market',
            pitch:
              'Local designers and makers sell and tell the stories behind their work in a friendly weekend market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'PMQ in Central',
          },
          {
            title: 'Sheung Wan art walk',
            pitch:
              'A guided evening walk through the galleries and street art of the old district.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Sheung Wan streets and galleries',
          },
          {
            title: 'Indie music showcase night',
            pitch: 'A monthly open stage for indie bands, solo artists, and first-timers.',
            audience: 'Musicians and music lovers',
            venueType: 'An indie venue in Wong Chuk Hang',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Kennedy Town',
          },
          {
            title: 'Factory studio open night',
            pitch:
              'Maker studios in a converted factory building open their doors for one evening of demos and talks.',
            audience: 'Makers, collectors, and curious neighbours',
            venueType: 'A factory building studio in Kwun Tong or Wong Chuk Hang',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a beach or harbour stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A beach or harbourfront stretch',
          },
          {
            title: 'Housing and rent policy forum',
            pitch:
              "A plain-language forum on deposits, leases, and tenant rights in Hong Kong's housing market.",
            audience: 'Renters and young professionals',
            venueType: 'A community centre or university room',
          },
          {
            title: 'Heritage preservation walk and talk',
            pitch:
              'A guided walk through an old district and a discussion on what residents can do to protect it.',
            audience: 'History and heritage lovers',
            venueType: 'Old district streets and a local hall',
          },
          {
            title: 'Social enterprise circle',
            pitch:
              'Founders and volunteers in social enterprises share models, funding, and collaboration paths.',
            audience: 'Social entrepreneurs and changemakers',
            venueType: 'A social enterprise or NGO office',
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
          'Match the category to your interests and the audience you can reach. In Hong Kong, recurring formats with a fixed venue near the MTR — a Sunday hike, a dim sum circle, a café evening — build community fastest.',
      },
      {
        question: 'Do I need to speak Cantonese to organize?',
        answer:
          'No. Many Hong Kong groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          "Yes — recurring formats are how most Hong Kong communities start, and the city's density sustains them. The how-to guides walk through the first event to a stable community.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Hong Kong?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Hongkongers gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Hong Kong?',
      answer:
        'Yes. Hong Kong has huge density, excellent transport, and a culture that values well-organised events. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        "Yes. Every venue type mentioned — the harbourfront, Dragon's Back, PMQ, Cyberport floors, Sai Ying Pun cafés — exists in Hong Kong. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.",
    },
    {
      question: 'Does JoinOrigin have an office in Hong Kong?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Hongkongers find or start communities.',
    },
  ],
};

export default content;
