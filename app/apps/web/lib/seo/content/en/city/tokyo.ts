import type { CityContent } from '../../types';

/**
 * Tokyo content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Tokyo's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'tokyo',
  intro: [
    "Tokyo is one of the world's largest and most organized cities, and its community life runs on a beautiful contradiction: enormous scale, yet a culture of small, reliable rituals. Neighbourhoods have distinct personalities — Shibuya and Shinjuku for tech and nightlife, Kichijoji and Shimokitazawa for indie culture, Akihabara for makers and otaku, and the quiet residential wards for family and hobby groups.",
    "The city's institutions anchor its gatherings: the University of Tokyo, Waseda, Keio, and dozens of other universities feed a constant stream of students and researchers, while the finance, tech, and creative industries cluster in Marunouchi, Roppongi, and the newer hubs of Toranomon and Azabudai. Trains and stations are the social glue — nearly everyone meets at a station, and izakayas, cafés, and event spaces cluster within a short walk of the ticket gates.",
    'For finding or starting an Origin, Tokyo rewards consistency and clear rituals: a nomikai (after-work drink) after a monthly meetup, a fixed café table, a standing time — these small structures make it easy for busy people to show up again and again.',
  ],
  dataPoints: [
    'Roughly 9.7 million residents in the city; the capital of Japan.',
    'Neighbourhoods with distinct scenes: Shibuya, Shinjuku, Kichijoji, Akihabara, Shimokitazawa.',
    'Home to the University of Tokyo, Waseda, Keio, and many other universities.',
    'Industries: finance, technology, media, fashion, and manufacturing.',
    'Train stations double as community anchors across the city.',
    'Public anchors: Yoyogi Park, Ueno Park, the Imperial Palace grounds, and the Sumida riverfront.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Shibuya and Toranomon',
        'Startup event floors near Shibuya Station',
        'Incubator rooms at Tokyo Tech and Waseda',
        'Roppongi and Azabudai innovation hubs',
        'Cafés with meeting corners in Ebisu and Daikanyama',
        'Izakaya tables for relaxed founder evenings',
      ],
      formats: [
        'Founder nomikai with round intros',
        'Pitch evenings and demo nights',
        'Fintech and AI builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at tech campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, AI, climate, or developer tools — and an English-first or bilingual name.',
        'Reserve a weekly or monthly slot at a Shibuya or Toranomon coworking space with train access.',
        'Run three open meetups, then add a nomikai after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in Roppongi and Ginza',
        'Live houses and indie stages in Shimokitazawa and Koenji',
        'Design studios in Aoyama and Daikanyama',
        'Manga and anime culture spaces in Akihabara',
        'Project spaces in Kichijoji',
        'Café stages in Shibuya and Koenji',
      ],
      formats: [
        'Zine and art market days',
        'Indie music showcase nights',
        'Design critique evenings',
        'Comic and illustration drawing circles',
        'Gallery walk and talk evenings',
      ],
      howToStart: [
        'Choose a craft — music, illustration, design, film — and a regular evening slot.',
        'Partner with a live house, gallery, or studio in Shimokitazawa or Kichijoji to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Ward assembly and community centre halls across the 23 wards',
        'Neighbourhood association (chōnaikai) meeting rooms',
        'University seminar rooms at Tokyo Tech and UTokyo',
        'NGO and volunteer centres near the city centre',
        'Public library rooms with civic collections',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Neighbourhood association info sessions',
        'Disaster preparedness drill planning',
        'Climate and clean-energy action circles',
        'Volunteer briefings for city programmes',
        'Public space and park planning meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a ward, a disaster-preparedness block — and keep the geography small.',
        'Introduce yourself to the local chōnaikai or a ward office and partner instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Yoyogi Park lawns and running paths',
        'Izakayas near Shibuya and Shinjuku stations',
        'Cafés in Shimokitazawa and Kichijoji',
        'Ueno Park and the Sumida riverfront',
        'Public bathhouses (sentō) with lounge corners',
        'Community halls in the residential wards',
      ],
      formats: [
        'Language exchange tables for newcomers',
        'Nomikai after-work gatherings',
        'Board game cafés and hobby evenings',
        'Sunday park runs and walking groups',
        'Book clubs in cafés',
      ],
      howToStart: [
        'Choose a repeatable format — a monthly nomikai, a Sunday run — and a fixed venue near a station.',
        'Pick an izakaya or café in Shimokitazawa or Kichijoji that will host you every time.',
        'Run three consistent sessions, then add a small ritual (a photo, a toast) that makes the group feel real.',
      ],
    },
    'small-business': {
      venues: [
        'Shotengai shopping street association halls',
        'Café and restaurant owner tables in Shimokitazawa',
        'Craft and design brand studios in Kichijoji',
        'Makers and repair shops in Akihabara',
        'Boutique owner circles in Daikanyama',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Shopping street association breakfasts',
        'Festival and street market planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and repair circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one shopping street (shotengai) and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about rent, customers, and the festival calendar.',
        'After three breakfasts, rotate one practical topic per month and let the association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Tokyo's startup scene has matured into one of Asia's most active, with real strengths in fintech, AI, robotics, and climate technology. Founders cluster around Shibuya, Toranomon, and Azabudai, where coworking spaces, accelerators, and university programs at Tokyo Tech and Waseda create a dense loop of talent and capital. Large corporations are a distinctive feature: many startups spin out of, partner with, or sell to Japan's giants, and the government's innovation programs actively support new ventures. The culture is polite but serious — meetings are structured, decisions are carefully made, and the nomikai (after-work drinks) tradition smooths relationships that formal meetings leave tense. English is increasingly common, and international founders find a welcoming, if formal, ecosystem. Recurring formats include founder nomikai, pitch evenings, fintech and AI circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near a station; Tokyo's scale and reliability do the rest.",
    creative:
      "Tokyo's creative scene is one of the most varied on earth, from the indie music stages of Shimokitazawa and Koenji to the fashion and design studios of Aoyama and Daikanyama, the anime and otaku culture of Akihabara, and the gallery rows of Roppongi and Ginza. The city's creative communities are famously subcultural — a scene for every niche, from handmade zines to experimental electronic music — and newcomers are welcome to start their own. Universities and art schools feed a steady stream of graduates into a freelance economy built on commissions, festivals, and collaboration. Tokyo's scale means even the smallest niche has enough people to sustain a community, and its culture of craft rewards makers who publish and share their work. Common formats include zine markets, live showcase nights, design critiques, and drawing circles. Starting a creative Origin in Tokyo is realistic: pick a craft and a venue in a creative district, and the city's depth of talent and curiosity will pull people in.",
    political:
      "Tokyo's civic life is anchored by one of the world's most organized systems of neighbourhood association — the chōnaikai — alongside ward assemblies and a dense network of volunteer programmes. Disaster preparedness is the defining civic issue: a city that has lived through earthquakes organizes drills, block-level response plans, and volunteer briefings that are open to every resident. Climate action is growing fast, with ward-level solar, recycling, and green-space programs led by citizens and supported by the city. Park restoration, community gardens, and the care of the city's green corridors give environmental groups concrete projects. International residents are increasingly active in ward councils and volunteer networks. The culture rewards reliability and politeness: showing up to a real meeting and volunteering for a specific role matters more than online commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a park, a ward, a disaster-preparedness block — then partnering with the chōnaikai and ward structures that already exist. Tokyo rewards steady, visible participation.",
    meetup:
      "Tokyo's meetup scene runs on the station: nearly every group meets within a short walk of a ticket gate, then moves to an izakaya, café, or park that anchors the evening. Shimokitazawa and Kichijoji are the classic meetup neighbourhoods — dense with cafés, small venues, and cheap restaurants — while Yoyogi Park and Ueno Park host running, walking, and picnic groups on weekends. Language exchange is one of the city's biggest meetup categories, connecting the huge number of international residents and visitors with Japanese speakers. Board game cafés, hobby circles, and book clubs fill the rest of the calendar. The nomikai tradition gives every group a natural ritual: after the event, a toast, and the real conversation begins. Groups here tend to be well-organised and punctual, matching the city's culture. Starting a meetup is realistic: pick a repeatable format and a fixed venue near a station, run three sessions at the same time and place, and Tokyo's density of curious people will take over.",
    'small-business':
      "Tokyo's small business community runs on the shotengai — the covered shopping streets that anchor almost every neighbourhood. These associations manage festivals, shared signage, street markets, and collective voice on rents and municipal rules, giving small owners a ready-made network the moment they open. The city's café, restaurant, and craft brand scene — especially in Shimokitazawa, Kichijoji, and Daikanyama — adds a newer layer of independent owners who meet in cafés and studios to swap supplier contacts, design ideas, and customer loyalty secrets. Akihabara's makers and repair shops keep the city's craft-and-fix culture alive, and the chamber of commerce runs practical clinics on digital payments, e-commerce, and hiring. What holds these groups together is geography: a shopping street shares customers, foot traffic, and the same festival calendar. Starting a small business Origin in Tokyo is very achievable — a monthly breakfast for owners on one shotengai, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Tokyo rewards event ideas that are specific, reliable, and easy to reach by train — and the city's scale means even a niche format can find an audience. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Tokyo, from Yoyogi Park and Shimokitazawa live houses to Shibuya coworking floors and shotengai community halls. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near a station, and let Tokyo's reliability do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'International newcomer nomikai',
            pitch:
              'A monthly after-work drink where newcomers and long-time residents trade city tips, work stories, and connections.',
            audience: 'International residents and newcomers',
            venueType: 'An izakaya near Shibuya Station',
          },
          {
            title: 'Founder breakfast circle',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Tokyo',
            venueType: 'A café in Ebisu or Daikanyama',
          },
          {
            title: 'Shimokitazawa café meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Creatives and professionals',
            venueType: 'A café in Shimokitazawa',
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
            venueType: 'A coworking café in Kichijoji',
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
            title: 'Japanese business etiquette workshop',
            pitch:
              'A practical session on keigo, business card exchange, and meeting culture for professionals.',
            audience: 'International professionals and newcomers',
            venueType: 'A coworking or community event room',
          },
          {
            title: 'Paper craft and bookbinding circle',
            pitch:
              'Hands-on sessions in traditional and modern paper crafts, with materials provided.',
            audience: 'Craft lovers and beginners',
            venueType: 'A community workshop or studio',
          },
          {
            title: 'Cooking home-style Japanese dishes',
            pitch:
              'Small-group cooking classes teaching everyday dishes like okonomiyaki, curry, and oden.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Disaster preparedness workshop',
            pitch:
              'A plain-language session on earthquake kits, evacuation routes, and ward-level response plans.',
            audience: 'Residents and newcomers',
            venueType: 'A ward community centre',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Yoyogi Park picnic and games',
            pitch: 'Blankets, frisbee, and snacks in the park, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Yoyogi Park lawns',
          },
          {
            title: 'Sunday park run',
            pitch: 'A friendly, all-paces group run around the park, followed by a café breakfast.',
            audience: 'Runners of every level',
            venueType: 'Yoyogi Park or the Imperial Palace loop',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café near Shinjuku',
          },
          {
            title: 'Ueno museum walk and talk',
            pitch:
              "A guided Sunday walk through Ueno's museums and park, with stops for coffee and discussion.",
            audience: 'Culture lovers and explorers',
            venueType: 'Ueno Park and museum district',
          },
          {
            title: 'Sumida riverfront cycle ride',
            pitch: 'A relaxed evening ride along the river with café stops and a sunset view.',
            audience: 'Leisure cyclists',
            venueType: 'Sumida river paths',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech builders circle',
            pitch:
              'A monthly roundtable for fintech builders to share product progress and regulatory lessons.',
            audience: 'Fintech founders and engineers',
            venueType: 'A coworking floor near Toranomon',
          },
          {
            title: 'AI and robotics meetup',
            pitch:
              'Engineers and researchers share work-in-progress and discuss the practical side of AI and robotics products.',
            audience: 'AI and robotics builders',
            venueType: 'A tech campus or innovation hub room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Corporate startup partnership evening',
            pitch:
              'Startup founders and corporate innovation teams discuss how to build honest, useful partnerships.',
            audience: 'Founders and corporate innovation leads',
            venueType: 'A hotel lounge or innovation hub',
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
            title: 'Shimokitazawa live showcase night',
            pitch:
              "A monthly open stage for indie bands, solo artists, and first-timers in the city's music district.",
            audience: 'Musicians and music lovers',
            venueType: 'A live house in Shimokitazawa',
          },
          {
            title: 'Zine and art market day',
            pitch:
              'Creators sell and trade handmade zines, prints, and small objects in a friendly market.',
            audience: 'Makers, artists, and collectors',
            venueType: 'A gallery or community hall in Kichijoji',
          },
          {
            title: 'Drawing circle in a café',
            pitch:
              'A weekly session where illustrators and hobbyists draw together and share techniques.',
            audience: 'Artists of every level',
            venueType: 'A café with long tables in Koenji',
          },
          {
            title: 'Design critique evening',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in Aoyama or Daikanyama',
          },
          {
            title: 'Akihabara maker meetup',
            pitch:
              'Makers, modders, and repair enthusiasts share projects and trade tips on electronics and fabrication.',
            audience: 'Hardware tinkerers and makers',
            venueType: 'A makerspace or hobby shop room in Akihabara',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Park clean-up morning',
            pitch:
              'A Saturday morning cleanup of a local park, with gloves and coffee supplied by neighbours.',
            audience: 'Neighbours and first-time volunteers',
            venueType: 'A local park or green space',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Disaster preparedness block meeting',
            pitch:
              "Neighbours map their block's response plan — assembly points, supplies, and who checks on whom.",
            audience: 'Residents of a single block',
            venueType: "A community centre or neighbour's lounge",
          },
          {
            title: 'Volunteer info session for city programmes',
            pitch:
              'An orientation plus first shift for volunteers supporting parks, libraries, and community programmes.',
            audience: 'First-time volunteers',
            venueType: 'A ward office or community centre',
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
          'Match the category to your interests and the audience you can reach. In Tokyo, recurring formats with a fixed venue near a station — a monthly nomikai, a Sunday run, a café circle — build community fastest.',
      },
      {
        question: 'Do I need to speak Japanese to organize?',
        answer:
          'No. Many Tokyo groups run bilingually or in English, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats and small rituals are how most Tokyo Origins start. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Tokyo?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Tokyoites gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Tokyo?',
      answer:
        'Yes. Tokyo has enormous scale, reliable trains, and a culture of small, repeatable rituals. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — izakayas, Yoyogi Park, Shimokitazawa live houses, shotengai halls — exists in Tokyo. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Tokyo?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Tokyoites find or start Origins.',
    },
  ],
};

export default content;
