import type { CityContent } from '../../types';

/**
 * Jakarta content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Jakarta's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'jakarta',
  intro: [
    "Jakarta is Indonesia's capital and economic engine, a sprawling, energetic city where startup founders, civil servants, and a famously warm street culture share the same streets. The city's communities spread across distinctive districts — SCBD and Sudirman for business and tech, Kemang and Senopati for nightlife and creative culture, Kota Tua for history, and the vast residential areas of the south and east for family and neighbourhood life.",
    "Institutions anchor Jakarta's community life: the University of Indonesia in Depok, Gadjah Mada's alumni networks, and dozens of campuses feed a constant stream of students and graduates, while the city's startup ecosystem — home to some of Southeast Asia's largest tech companies — draws talent from across the archipelago. Monas, the city's parks, and the malls' event halls give groups free and easy venues, though traffic makes central meeting points important.",
    "For finding or starting an Origin, Jakarta rewards organisers who respect the traffic: choose a venue that is easy to reach, start on time, and build in food and coffee — the city's hospitality culture makes shared meals the fastest way to build belonging.",
  ],
  dataPoints: [
    'Roughly 8.5 million residents in the city; the capital of Indonesia.',
    'Districts with distinct scenes: SCBD, Kemang, Senopati, Kota Tua, and the south residential areas.',
    'Home to the University of Indonesia and many other campuses.',
    'Industries: technology, finance, media, and trade.',
    "Home to one of Southeast Asia's largest startup ecosystems.",
    'Public anchors: Monas, the city parks, and the historic Kota Tua square.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in SCBD and Sudirman',
        'Startup event floors near Senayan and Kuningan',
        'Incubator rooms at the University of Indonesia',
        'Innovation hubs in the CBD',
        'Cafés with meeting corners in Kemang and Senopati',
        'Hotel conference rooms in the Golden Triangle',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech and e-commerce builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, e-commerce, logistics, or creator tools — and a bilingual name.',
        'Reserve a recurring slot at an SCBD or Sudirman coworking space near the MRT.',
        'Run three open meetups, then add a dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in Kemang and the Cipete art district',
        'Indie music venues in Kemang and Blok M',
        'Design studios in Senopati and SCBD',
        'Independent cinemas and film spaces in the city centre',
        'Street-art corners in Kota Tua and the old town',
        'Café stages in Kemang and Senopati',
      ],
      formats: [
        'Indie music showcase nights',
        'Art walk and gallery evenings',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through Kota Tua',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, venue, or studio in Kemang or Senopati to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'City and district office halls',
        'Neighbourhood (RT/RW) meeting rooms',
        'University seminar rooms at UI',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'River and park volunteer sheds',
      ],
      formats: [
        'Flood prevention and river cleanup briefings',
        'Traffic and public transport advocacy meetings',
        'Housing and rental rights info evenings',
        'Volunteer info sessions for city programmes',
        'Climate and air-quality action circles',
      ],
      howToStart: [
        'Pick one concrete local issue — a river stretch, a traffic junction, a neighbourhood — and keep the geography small.',
        'Partner with an existing NGO, RT/RW, or community group instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Monas park and the city centre lawns',
        'Kemang and Senopati cafés and restaurants',
        'Kota Tua square and the old town lanes',
        'Mall event halls and rooftop cafés',
        'City parks in the south and east',
        'Community halls in the residential areas',
      ],
      formats: [
        'Kota Tua heritage walk groups',
        'Language exchange tables for newcomers',
        'Board game café evenings',
        'Sunday morning run clubs',
        'Food walk groups through the old town',
      ],
      howToStart: [
        'Choose a repeatable format — a heritage walk, a Sunday run — and a fixed meeting point.',
        'Pick a Monas corner or a Kemang café that is easy to reach by MRT or ride-hail.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Traditional market trader networks in Tanah Abang and Pasar Baru',
        'Restaurant and café owner tables in Kemang and Senopati',
        'Boutique owner circles in the south',
        'Design brand studios in Senopati',
        'Craft and street food stall communities at city events',
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
      "Jakarta's startup scene is the heart of Indonesia's digital economy, home to some of Southeast Asia's largest tech companies and a deep bench of founders building fintech, e-commerce, and logistics for a country of hundreds of millions. Founders cluster in SCBD, Sudirman, and Kuningan, where coworking spaces, accelerators, and university programs create a dense loop of talent and capital. The market is enormous and fast-growing, which means products that solve local problems — payments, delivery, social commerce — can scale quickly, and the city's proximity to government and regulation makes policy-savvy founders stronger. The culture is collaborative and optimistic: people share openly, events are energetic, and the warmth of Indonesian hospitality shows up even in pitch meetings. English and Bahasa Indonesia both work in the ecosystem. Recurring formats include founder breakfasts, pitch evenings, fintech and e-commerce circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue near the MRT; Jakarta's scale and energy do the rest.",
    creative:
      "Jakarta's creative scene is young, loud, and wonderfully mixed. Kemang and Senopati are the creative heart — galleries, indie music venues, design studios, and cafés that stay alive late into the night. Blok M and the Cipete art district host a growing gallery scene, while Kota Tua's colonial streets are the canvas for street art, photo walks, and heritage events. The city's film and music industries are the largest in Southeast Asia, feeding a constant stream of talent into studios and production houses, and its fashion and design brands are increasingly visible regionally. The café culture is a genuine creative engine — many communities start over coffee and grow into exhibitions, labels, and collectives. Common formats include indie showcases, art walks, craft markets, and open-mics. Starting a creative Origin in Jakarta is realistic: pick a craft and a venue with an existing audience — Kemang for music, Cipete for art — and the city's youthful energy will pull people in.",
    political:
      "Jakarta's civic life is shaped by the pressures of a mega-city: flooding, traffic, and air quality are constant, tangible issues that bring residents together. The city's famous floods have produced active volunteer networks for river cleanup, flood evacuation, and neighbourhood preparedness — the RT/RW system gives every block a ready-made structure for civic action. Traffic and public transport are live topics, with commuters advocating for the MRT, bus rapid transit, and pedestrian space. Housing affordability matters in a city where rents and land prices are high and rising. University campuses and research institutes add an evidence-driven layer. The culture rewards warmth and persistence: showing up to a real meeting, building relationships with neighbours, and taking on visible roles matter more than commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a river stretch, a traffic junction, an RT/RW block — then partnering with the volunteer and community structures that already exist. Jakarta rewards steady, visible action.",
    meetup:
      "Jakarta's meetup scene is warm, food-centred, and built around the city's rhythm. Monas park and the city centre lawns host morning runs, evening walks, and weekend picnics, while Kota Tua's square draws heritage walkers, photographers, and street food lovers. Kemang and Senopati are the café and nightlife heart — book clubs, language exchanges, board game evenings, and live music nights fill the calendar, and the city's famous food culture makes food walks and shared meals a natural format. The malls and rooftops of SCBD and Sudirman host larger events that need air-conditioning and space. Traffic is the great constraint — groups choose venues near the MRT or ride-hail hubs, and punctual organisers earn loyalty. Groups here tend to be friendly, informal, and welcoming, matching the city's hospitality. Starting a meetup is realistic: pick a repeatable format — a heritage walk, a Sunday run — and a fixed meeting point that is easy to reach, run three sessions at the same time and place, and Jakarta's warmth will take over.",
    'small-business':
      "Jakarta's small business community runs on the city's enormous consumer market. The traditional markets — Tanah Abang, Pasar Baru, and the street markets of the districts — run on trader networks that manage stalls, festivals, and collective voice on rents and rules, with Tanah Abang being one of Southeast Asia's largest textile markets. The new economy is different: Kemang and Senopati cafés and restaurants, the boutiques of the south, and a huge layer of online sellers who run brands from home or small studios. Digital payments and e-commerce are everywhere, and owners constantly swap notes on platforms, logistics, and trends. The chamber of commerce and industry associations run practical clinics on licensing, e-commerce, and hiring. What holds these groups together is geography and taste: a market or a corridor shares customers, foot traffic, and the same trend cycle. Starting a small business Origin in Jakarta is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Jakarta is a wonderful city for Origin event ideas: the population is huge, the food is legendary, and the city's warmth makes people show up. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Jakarta, from Monas park and Kota Tua square to SCBD coworking floors and Kemang cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that is easy to reach, and let Jakarta's warmth do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Kota Tua newcomer walk',
            pitch:
              'An afternoon walk through the old town where newcomers and long-time Jakartans trade city tips and work stories.',
            audience: 'New arrivals and history lovers',
            venueType: 'Kota Tua square',
          },
          {
            title: 'SCBD founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Jakarta',
            venueType: 'A café in SCBD',
          },
          {
            title: 'Kemang meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in Kemang',
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
            venueType: 'A coworking café in Senopati',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Bahasa Indonesia conversation table',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning Bahasa Indonesia',
            venueType: 'A community centre or café',
          },
          {
            title: 'Indonesian home cooking class',
            pitch:
              'Small-group classes teaching rendang, soto, and other beloved dishes from scratch.',
            audience: 'Home cooks of every level',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Digital marketing for small brands',
            pitch:
              'Hands-on sessions on platforms, content, and e-commerce for small businesses and startups.',
            audience: 'Small business owners and marketers',
            venueType: 'A coworking event room',
          },
          {
            title: 'Batik and textile appreciation workshop',
            pitch: 'A hands-on introduction to batik, from history to the basics of wax and dye.',
            audience: 'Craft lovers and visitors',
            venueType: 'A textile workshop or community room',
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
            title: 'Monas morning run club',
            pitch:
              'A friendly, all-paces group run around the national monument, followed by breakfast.',
            audience: 'Runners of every level',
            venueType: 'Monas park',
          },
          {
            title: 'Kota Tua heritage walk',
            pitch:
              "A guided evening walk through the old town's streets and museums, with street food stops.",
            audience: 'Explorers and history lovers',
            venueType: 'Kota Tua old town lanes',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in Kemang',
          },
          {
            title: 'Street food walk through the old town',
            pitch:
              'A guided walk through legendary street food lanes with stories behind each stall.',
            audience: 'Food lovers and explorers',
            venueType: 'Old town and Pasar Baru lanes',
          },
          {
            title: 'Sunday cycling group',
            pitch: 'A relaxed morning ride on car-free Sunday streets, with coffee stops.',
            audience: 'Leisure cyclists',
            venueType: 'Sudirman-Thamrin car-free streets',
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
            venueType: 'A coworking floor in SCBD',
          },
          {
            title: 'E-commerce and social commerce circle',
            pitch:
              'Founders and operators in e-commerce and social commerce share platform playbooks and growth lessons.',
            audience: 'E-commerce founders and operators',
            venueType: 'A coworking event room in Kuningan',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Logistics and delivery tech meetup',
            pitch:
              'Professionals in logistics and delivery technology discuss trends and collaboration.',
            audience: 'Logistics professionals and founders',
            venueType: 'A hotel conference room',
          },
          {
            title: 'Creator economy network evening',
            pitch:
              'Creators, agencies, and platform builders discuss trends, tools, and collaboration.',
            audience: 'Creators and media professionals',
            venueType: 'A studio or café event space',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Kemang indie music night',
            pitch:
              'A monthly open stage for indie bands, solo artists, and first-timers in the creative district.',
            audience: 'Musicians and music lovers',
            venueType: 'A live music venue in Kemang',
          },
          {
            title: 'Art walk through Cipete and Kemang',
            pitch:
              'A guided evening walk through the galleries, with artist talks at select stops.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Cipete and Kemang galleries',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Senopati',
          },
          {
            title: 'Kota Tua photo walk',
            pitch:
              'A guided photo walk through the colonial streets, with tips on light and composition.',
            audience: 'Amateur and professional photographers',
            venueType: 'Kota Tua streets',
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
            title: 'River cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a river stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A river stretch in the city',
          },
          {
            title: 'Flood preparedness neighbourhood circle',
            pitch:
              'Neighbours map flood-prone streets and coordinate a simple response plan with local volunteers.',
            audience: 'Residents in flood-prone areas',
            venueType: 'An RT/RW hall or community centre',
          },
          {
            title: 'Air quality action circle',
            pitch:
              'Residents monitor and discuss local air quality and coordinate small clean-air actions.',
            audience: 'Residents concerned about pollution',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Volunteer info session for city programmes',
            pitch:
              'An orientation plus first shift for volunteers supporting parks, schools, and community programmes.',
            audience: 'First-time volunteers',
            venueType: 'A community centre or NGO office',
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
          'Match the category to your interests and the audience you can reach. In Jakarta, recurring formats with a fixed venue that is easy to reach — a morning run, a heritage walk, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to speak Bahasa Indonesia to organize?',
        answer:
          'No. Many Jakarta groups run bilingually or in English, and the startup and creative scenes are international. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Jakarta Origins start, and the city's warmth keeps members coming back. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Jakarta?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Jakartans gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Jakarta?',
      answer:
        'Yes. Jakarta has a huge population, a strong startup scene, and a famously warm culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Monas, Kota Tua, Kemang cafés, SCBD coworking floors — exists in Jakarta. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Jakarta?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Jakartans find or start Origins.',
    },
  ],
};

export default content;
