import type { CityContent } from '../../types';

/**
 * Shanghai content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Shanghai's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'shanghai',
  intro: [
    "Shanghai is China's commercial capital, a city of skyscrapers and tree-lined lanes where business, fashion, and community life move fast. The city's districts have distinct personalities — Pudong's towers for finance and tech, the French Concession and Xuhui for cafés and creative culture, Jing'an for shopping and nightlife, and the older neighbourhoods along the Huangpu river for history and tradition.",
    "Institutions anchor Shanghai's community life: Fudan University, Shanghai Jiao Tong University, and a cluster of other universities feed a constant stream of students and researchers, while the city's position as a global business hub draws entrepreneurs, designers, and professionals from around the world. The metro — one of the world's largest — makes the city easy to cross, and the Bund, the riverfront parks, and the city's many green spaces give groups free outdoor venues.",
    "For finding or starting an Origin, Shanghai rewards people who understand the city's rhythm: formats are fast, platforms move quickly, and a well-organised event with a clear purpose reliably draws a crowd. The café culture of the French Concession provides natural homes for smaller, more intimate groups.",
  ],
  dataPoints: [
    'Roughly 24.9 million residents; the commercial capital of China.',
    "One of the world's largest metro systems makes the city easy to cross.",
    "Districts with distinct scenes: Pudong, the French Concession, Jing'an, and the Huangpu riverfront.",
    'Home to Fudan University, Shanghai Jiao Tong University, and many more.',
    'Industries: finance, technology, trade, manufacturing, and design.',
    "Public anchors: the Bund, the Huangpu riverfront parks, and the city's gardens.",
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in the French Concession and Lujiazui',
        'Startup event floors near Zhangjiang and Yangpu',
        'Incubator rooms at Fudan and SJTU',
        'Innovation hubs in the Pudong new area',
        'Cafés with meeting corners in Wukang Road and Anfu Road',
        "Hotel conference rooms in Jing'an",
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech, AI, and consumer-tech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — consumer tech, fintech, AI, or manufacturing — and a bilingual name.',
        'Reserve a recurring slot at a French Concession or Lujiazui coworking space near the metro.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in the West Bund and M50',
        'Indie music and art venues in the French Concession and Xintiandi',
        "Design studios in Tianzifang and Jing'an",
        'Independent cinemas in the old city',
        'Fashion and photography studios in Xuhui',
        'Café stages on Anfu Road and Wukang Road',
      ],
      formats: [
        'Gallery walk and talk evenings',
        'Indie music showcase nights',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through the old neighbourhoods',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, studio, or venue in the West Bund or M50 to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Street committee and community centre halls',
        'University seminar rooms at Fudan and SJTU',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'Park volunteer sheds and community gardens',
        'Community green-space planning rooms',
      ],
      formats: [
        'Community garden and green-space planning sessions',
        'River and park cleanup volunteer briefings',
        'Heritage lane preservation talks and walks',
        'Volunteer info sessions for city programmes',
        'Climate and clean-energy action circles',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a heritage lane, a community garden — and keep the geography small.',
        'Partner with the local street committee, NGO, or volunteer group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'The Bund waterfront promenade',
        'French Concession cafés and lanes',
        "Fuxing Park and the city's green spaces",
        'Huangpu riverfront paths',
        'Xintiandi plazas and restaurants',
        'Community halls in the residential districts',
      ],
      formats: [
        'Bund sunset walking groups',
        'Language exchange tables for newcomers',
        'French Concession café-hopping walks',
        'Board game café evenings',
        'Sunday park runs and tai chi circles',
      ],
      howToStart: [
        'Choose a repeatable format — a Bund walk, a café crawl — and a fixed meeting point.',
        'Pick a metro-accessible spot on the Bund or a French Concession café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Traditional market and trader networks in the old city',
        'Restaurant and café owner tables in the French Concession',
        "Boutique owner circles in Jing'an and Xuhui",
        'Design brand studios in Tianzifang',
        'Craft market stalls at city festivals',
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
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and platforms.',
        'After three breakfasts, rotate one practical topic per month and let the trader network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Shanghai's startup scene is one of China's most dynamic, with strengths in consumer tech, fintech, AI, and e-commerce that reflect the city's commercial DNA. Founders cluster in the French Concession, Lujiazui, and the innovation districts of Zhangjiang and Yangpu, where coworking spaces, accelerators, and university programs at Fudan and SJTU create a dense loop of talent and capital. The city's global position means the ecosystem is genuinely international — foreign founders, cross-border teams, and global investors are common, and English works alongside Chinese in many events. The culture is fast and competitive: product cycles are short, platforms move quickly, and successful groups are the ones that keep formats sharp and useful. Recurring formats include founder breakfasts, pitch evenings, consumer-tech and AI circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near the metro; Shanghai's speed and scale do the rest.",
    creative:
      "Shanghai's creative scene is one of Asia's most cosmopolitan, powered by the city's global population and its appetite for the new. The West Bund and M50 anchor the contemporary art world, while Tianzifang and the French Concession hold design studios, indie shops, and cafés that double as galleries. The city's fashion and design industries are internationally connected, with studios in Xuhui and Jing'an showing at global weeks. Indie music, film, and theatre have small but devoted scenes, and the café culture of Anfu Road and Wukang Road gives creators a stage every evening. The old neighbourhoods — the lanes of the former concession, the shikumen houses — provide endless material for photographers and filmmakers. Art and design schools feed a steady stream of graduates into a fast-moving freelance economy. Common formats include gallery walks, indie showcases, craft markets, and open-mics. Starting a creative Origin in Shanghai is realistic: pick a craft and a venue with an existing audience, and the city's taste and energy will pull people in.",
    political:
      "Shanghai's civic life is shaped by the city's scale and its strong community infrastructure. Street committees and community centres organise much of local life, and residents can plug into park restoration, community gardens, and volunteer programmes that are open to newcomers. Heritage is a live issue: the city's famous lanes and shikumen houses are under pressure from redevelopment, and preservation groups organise walks, documentation, and talks to protect them. Green space and climate resilience matter in a dense delta city, and community cleanups of the riverside and parks are common. International residents are increasingly part of civic life, volunteering in schools, parks, and neighbourhood associations. The culture rewards persistence and community ties: showing up to a real meeting and building relationships with local organisers matters more than online commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a park, a heritage lane, a community garden — then partnering with the street committee and volunteer structures that already exist. Shanghai rewards steady, visible participation.",
    meetup:
      "Shanghai's meetup scene is cosmopolitan and fast, with formats for every taste. The Bund is the classic venue — sunset walks along the waterfront are a beloved evening format, with the skyline as a backdrop. The French Concession is the café heart: Anfu Road, Wukang Road, and the maze of lanes hold book clubs, language exchanges, board game evenings, and freelance coffee mornings. Fuxing Park and the city's green spaces host tai chi circles, running groups, and weekend picnics, and the riverside paths attract walkers and cyclists. Shanghai's large international population keeps English-speaking groups plentiful, and newcomers are welcomed quickly. The metro makes everything accessible, and the city's energy means even niche formats find an audience. Groups here tend to be well-organised and trend-aware, matching the city's culture. Starting a meetup is realistic: pick a repeatable format — a Bund walk, a café crawl — and a fixed meeting point near a station, run three sessions at the same time and place, and Shanghai's energy will take over.",
    'small-business':
      "Shanghai's small business community spans the old city's markets and the trend-setting new districts. The traditional markets and street shops run on trader networks that manage stalls, festivals, and collective voice on rents and rules, while the French Concession and Tianzifang hold a newer layer of cafés, boutiques, and design brands that set the city's taste. The digital economy is everywhere — most small businesses sell through platforms, and owners constantly swap notes on algorithms, logistics, and customer retention. Food businesses benefit from the city's huge appetite for new cafés and restaurants, while design brands ride the global interest in Chinese craft and aesthetics. The chamber of commerce and industry associations run practical clinics on licensing, e-commerce, and hiring. What holds these groups together is geography and taste: a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business Origin in Shanghai is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Shanghai is a thrilling city for Origin event ideas: the skyline is free, the cafés are everywhere, and the metro makes everything reachable. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Shanghai, from the Bund waterfront and French Concession cafés to West Bund galleries and Lujiazui coworking floors. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near the metro, and let Shanghai's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Bund newcomer walk',
            pitch:
              'An evening walk along the waterfront where newcomers and long-time residents trade city tips and work stories.',
            audience: 'New arrivals and internationals',
            venueType: 'The Bund promenade',
          },
          {
            title: 'French Concession founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Shanghai',
            venueType: 'A café in the French Concession',
          },
          {
            title: 'Anfu Road meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café on Anfu Road',
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
            venueType: "A coworking café in Jing'an",
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
            title: 'Shanghainese home cooking class',
            pitch:
              'Small-group classes teaching xiaolongbao, red-braised pork, and other local dishes.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Tea culture appreciation circle',
            pitch:
              'A guided tasting of Chinese teas with a local tea master, from green to oolong.',
            audience: 'Tea lovers and beginners',
            venueType: 'A tea house in the old city',
          },
          {
            title: 'Digital marketing for small teams',
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
            title: 'Bund sunset walking group',
            pitch:
              'A weekly evening walk along the waterfront, timed for the sunset and the skyline lights.',
            audience: 'Walkers and newcomers',
            venueType: 'The Bund promenade',
          },
          {
            title: 'French Concession café crawl',
            pitch:
              'A guided evening walk through Anfu Road and Wukang Road, stopping at iconic cafés.',
            audience: 'Café lovers and explorers',
            venueType: 'French Concession lanes',
          },
          {
            title: 'Fuxing Park tai chi and morning circle',
            pitch:
              'A weekly morning session of tai chi and gentle stretching in the park, all levels welcome.',
            audience: 'Residents of all ages',
            venueType: 'Fuxing Park',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: "A board game café in Jing'an",
          },
          {
            title: 'Huangpu riverside bike ride',
            pitch: 'A relaxed ride along the river paths with a skyline stop and a picnic.',
            audience: 'Leisure cyclists',
            venueType: 'Huangpu riverfront paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Consumer-tech founders table',
            pitch:
              'A monthly roundtable for consumer-tech founders to share product progress and growth lessons.',
            audience: 'Consumer-tech founders and operators',
            venueType: 'A coworking floor in Lujiazui',
          },
          {
            title: 'Fintech builders circle',
            pitch:
              'Engineers and founders in payments, lending, and wealth tech share progress and regulatory lessons.',
            audience: 'Fintech founders and engineers',
            venueType: 'A coworking event room in Pudong',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'AI and manufacturing roundtable',
            pitch:
              'Engineers and founders applying AI to manufacturing and industry share progress and paths.',
            audience: 'AI and industrial-tech professionals',
            venueType: 'An innovation hub or university room',
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
            title: 'West Bund gallery walk',
            pitch:
              'A guided afternoon through the riverside galleries, with stops for art talks and coffee.',
            audience: 'Art lovers and curious visitors',
            venueType: 'West Bund galleries',
          },
          {
            title: 'M50 studio open day',
            pitch:
              'Artist studios in the former factory complex open their doors for one afternoon of demos and talks.',
            audience: 'Art lovers and collectors',
            venueType: 'M50 art district',
          },
          {
            title: 'Indie music showcase night',
            pitch: 'A monthly open stage for indie bands, solo artists, and first-timers.',
            audience: 'Musicians and music lovers',
            venueType: 'An indie venue in the French Concession',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage on Anfu Road',
          },
          {
            title: 'Tianzifang design and craft market',
            pitch:
              'Local designers and makers sell and tell the stories behind their work in the lane market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'Tianzifang lanes',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Riverside cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a riverside park stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A Huangpu riverside park stretch',
          },
          {
            title: 'Heritage lane preservation walk',
            pitch:
              'A guided walk through the shikumen lanes and a discussion on what residents can do to protect them.',
            audience: 'History and heritage lovers',
            venueType: 'Old city and concession lanes',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Volunteer info session for city programmes',
            pitch:
              'An orientation plus first shift for volunteers supporting parks, libraries, and community programmes.',
            audience: 'First-time volunteers',
            venueType: 'A street committee or community centre',
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
          'Match the category to your interests and the audience you can reach. In Shanghai, recurring formats with a fixed venue near the metro — a Bund walk, a café circle, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to speak Mandarin to organize?',
        answer:
          'No. Many Shanghai groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Shanghai Origins start, and the city's speed sustains them. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Shanghai?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Shanghainese gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Shanghai?',
      answer:
        'Yes. Shanghai has a huge population, a fast culture, and a welcoming international scene. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Bund, French Concession cafés, West Bund galleries, M50 studios — exists in Shanghai. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Shanghai?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Shanghainese find or start Origins.',
    },
  ],
};

export default content;
