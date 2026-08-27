import type { CityContent } from '../../types';

/**
 * Chennai content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Chennai's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'chennai',
  intro: [
    "Chennai is a coastal city with a deep cultural life and a growing technology economy, where the Marina beach promenade, the classical music season, and the OMR IT corridor shape how people gather. The city's community scenes split naturally: traditional arts and literature thrive in Mylapore and T. Nagar, tech and startup people cluster in Tidel Park and the OMR and Old Mahabalipuram Road corridor, and film and media culture centres around Kodambakkam and the studios of the west.",
    "Institutions anchor the city's life: IIT Madras, Anna University, and the many colleges feed a constant stream of students, while the annual Margazhi music and dance season turns December into a city-wide cultural festival. Marina Beach, Elliot's Beach, and the Theosophical Society gardens give groups free, well-known outdoor venues.",
    "For finding or starting an Origin, Chennai rewards patience and respect for its traditions: learn a little Tamil, schedule around the festival calendar, and the city's warmth and loyalty will keep members coming back for years.",
  ],
  dataPoints: [
    'Roughly 4.7 million residents; the capital of Tamil Nadu.',
    'IT corridor: Tidel Park, OMR, and the Old Mahabalipuram Road stretch.',
    'Home to IIT Madras, Anna University, and many colleges.',
    'Industries: IT services, automobiles, film (Kollywood), and textiles.',
    'Cultural anchors: the Marina beach, Margazhi music season, and the book fairs.',
    'Historic districts: Mylapore, T. Nagar, and Georgetown.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Tidel Park and OMR',
        'Startup event floors in the IT corridor',
        'Incubator rooms at IIT Madras',
        'Cafés with meeting corners in Adyar and Velachery',
        'Tech park auditoriums in Siruseri',
        'Hotel conference halls near the OMR',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo nights',
        'Deep-tech and manufacturing-tech builder circles',
        'Investor office hours',
        'Weekend hackathons at IIT Madras',
      ],
      howToStart: [
        'Pick a narrow vertical — deep tech, manufacturing, SaaS, or climate — and an English-first name.',
        'Reserve a recurring slot at a Tidel Park or OMR coworking space.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Classical music sabhas in Mylapore',
        'Art galleries in Nungambakkam and Adyar',
        'Film studios in Kodambakkam',
        'Theatre spaces at Alliance Française and Ranga Shankara-style halls',
        'Dance schools and rehearsal rooms',
        'Café stages in Besant Nagar',
      ],
      formats: [
        'Margazhi concert discussion circles',
        'Open-mic poetry and music nights',
        'Short-film screenings and feedback circles',
        'Bharatanatyam and music workshops',
        'Photography walks along the Marina',
      ],
      howToStart: [
        'Choose a craft — music, dance, film, writing — and a regular evening slot.',
        'Partner with a sabha, gallery, or studio in Mylapore or Nungambakkam to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Corporation ward offices and community halls',
        'Beach cleanup volunteer points along the Marina',
        'RWA halls in Adyar and Velachery',
        'University seminar rooms at IIT Madras',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
      ],
      formats: [
        'Coastal and beach cleanup volunteer briefings',
        'Lake and wetland restoration planning sessions',
        'Flood preparedness and neighbourhood safety circles',
        'Voter awareness and registration drives',
        'Public transport advocacy meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a beach, a lake, a flood-prone street, a ward — and keep the geography small.',
        'Partner with an existing RWA, NGO, or volunteer network instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Marina Beach promenade',
        "Elliot's Beach in Besant Nagar",
        'Theosophical Society gardens in Adyar',
        'Cafés in Besant Nagar and Nungambakkam',
        'T. Nagar book cafés and library halls',
        'Vandalur and Guindy park lawns',
      ],
      formats: [
        'Sunrise walking groups along the Marina',
        'Beachside board game evenings',
        'Tamil and English language exchange tables',
        'Weekend cycling rides on quieter roads',
        'Margazhi season concert-going circles',
      ],
      howToStart: [
        'Choose a repeatable format — a sunrise walk, a monthly book circle — and a fixed starting point.',
        'Pick a Marina stretch or a Besant Nagar café that is easy to reach by bus or metro.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'T. Nagar and Georgetown merchant association halls',
        'Textile and jewellery trader circles',
        'Café and restaurant owner tables in Besant Nagar',
        'Boutique owner circles in Nungambakkam',
        'Craft bazaar stalls at cultural festivals',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Merchant breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and GST clinics',
        'Garment and textile export workshops',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor — T. Nagar, Georgetown — and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, suppliers, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the merchant association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Chennai's startup scene is quieter than Bengaluru's but distinctive: the city's deep-tech, manufacturing, and enterprise strengths show up in the founders who build here. Tidel Park and the OMR corridor host the main coworking and accelerator floors, with IIT Madras's research park and incubation centres providing a serious technical pipeline. The city's industrial base — automobiles, engineering, chemicals — gives local startups unusual access to manufacturing and hardware expertise, and climate and energy ventures find real partners in the region. The culture is disciplined and relationship-driven: meetings are structured, deals happen after trust is built, and the city's famous loyalty means teams stay together longer. Recurring formats include founder breakfasts, pitch evenings, deep-tech builder circles, and weekend hackathons at IIT Madras. Starting a startup Origin here works best with a narrow vertical and a fixed venue in the IT corridor; Chennai's mix of engineering depth and steady capital does the rest.",
    creative:
      "Chennai's creative life is rooted in one of India's great classical traditions: the annual Margazhi music and dance season, when Mylapore's sabhas host hundreds of concerts and the whole city tunes in. That tradition feeds a broader scene of classical musicians, Bharatanatyam dancers, and teachers who gather in sabhas, dance schools, and rehearsal rooms year round. The city is also home to Kollywood — Tamil cinema is one of the world's largest film industries — with studios and post-production houses in Kodambakkam and the west. Galleries in Nungambakkam and Adyar show contemporary art, while Besant Nagar's cafés host open-mic nights and indie screenings. The Theosophical Society's gardens and the Marina's sunrise attract photographers and nature writers. Common formats include concert discussion circles, film screenings, dance and music workshops, and photography walks. Starting a creative Origin in Chennai is realistic: pick a craft and a venue with an existing audience, and the city's deep respect for art will carry you.",
    political:
      "Chennai's civic life is shaped by the coast and the monsoon: flooding, beach erosion, and water management are constant, tangible issues that bring residents together. Volunteer groups organize beach cleanups along the Marina, wetland restoration at the city's lakes and marshes, and flood preparedness drills in low-lying neighbourhoods. The city's culture of self-help — resident welfare associations are strong, and neighbourhoods famously coordinate during storms — gives political communities a ready-made structure. Public transport and road safety are live topics, with commuters and students organizing advocacy groups. University campuses and research institutes add an evidence-driven layer, particularly around climate and water. The culture rewards dedication and local knowledge: showing up to a real meeting and knowing your ward's details matters more than online commentary. Starting a political Origin here means choosing one concrete issue and a small geography — a beach, a lake, a street — then partnering with the RWA and volunteer networks that already exist. Chennai rewards steady, visible action.",
    meetup:
      "Chennai's meetup scene is built around the sea and the city's long tradition of civic gathering. The Marina — one of the world's longest urban beaches — hosts sunrise walking groups, morning yoga circles, and evening family strolls, while Elliot's Beach in Besant Nagar draws a younger crowd to cafés and open-air evenings. The Theosophical Society's gardens and Guindy park give groups quiet green space in the middle of the city. T. Nagar and Mylapore are the cultural heart: book clubs, Carnatic music listening circles, and language exchange tables fill libraries and community halls, and the December Margazhi season turns concert-going into a social ritual. Besant Nagar's cafés host board game nights and poetry open-mics. Groups here tend to be long-lived and loyal, matching the city's culture. Starting a meetup is realistic: pick a repeatable format and a fixed venue — a sunrise walk, a monthly book circle — run three sessions at the same time and place, and let Chennai's warmth take over.",
    'small-business':
      "Chennai's small business community runs on the city's legendary commercial streets. T. Nagar is one of South India's busiest shopping districts — textiles, gold, and electronics — and its merchant associations manage festival stalls, shared security, and collective voice on rent and regulation. Georgetown's old bazaars serve the same role for hardware, stationery, and wholesale trade, while Besant Nagar and Nungambakkam host a newer layer of cafés, boutiques, and restaurants. The garment and textile export industry gives local small businesses unusual access to global buyers, and trade bodies run practical clinics on GST, digital payments, and export documentation. The city's festival calendar — Pongal, the music season, temple festivals — creates recurring commercial rhythms that communities plan around. What holds these groups together is geography: a market or a corridor shares customers, foot traffic, and the same festival calendar. Starting a small business Origin in Chennai is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Chennai is a wonderful city for Origin event ideas: the beach gives you a free outdoor stage, the classical season gives you a cultural rhythm, and the city's loyalty means people come back. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Chennai, from the Marina promenade and Mylapore sabhas to Tidel Park coworking floors and Besant Nagar cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Chennai's warmth do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Marina sunrise circle',
            pitch:
              'An early morning walk along the beach where newcomers and long-time Chennaites trade city tips and work stories.',
            audience: 'New arrivals and early risers',
            venueType: 'Marina Beach promenade',
          },
          {
            title: 'OMR founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday.",
            audience: 'Startup founders in Chennai',
            venueType: 'A café in the OMR corridor',
          },
          {
            title: 'Besant Nagar coffee meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives in the south',
            venueType: 'A café in Besant Nagar',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A library or community centre room',
          },
          {
            title: 'Freelancer work-café morning',
            pitch:
              'A weekly morning where freelancers across industries share leads, rates, and client stories over filter coffee.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café with long tables in Nungambakkam',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Tamil conversation table',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning Tamil',
            venueType: 'A community hall or café',
          },
          {
            title: 'Classical music appreciation circle',
            pitch:
              'A listening group that explores Carnatic music with a knowledgeable guide, concert recordings included.',
            audience: 'Music lovers and newcomers to Carnatic music',
            venueType: 'A Mylapore sabha or library room',
          },
          {
            title: 'Personal finance for young professionals',
            pitch:
              'A practical session on savings, taxes, and investments for people in their first jobs.',
            audience: 'Early-career professionals',
            venueType: 'A coworking event room',
          },
          {
            title: 'Cooking and filter coffee workshop',
            pitch:
              'Hands-on sessions on classic South Indian dishes and the art of the perfect filter coffee.',
            audience: 'Cooks of every level',
            venueType: 'A community kitchen or cooking school',
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
            title: 'Marina sunrise walk group',
            pitch: 'A weekly sunrise walk along the promenade with chai stops and a fixed pace.',
            audience: 'Residents and early risers',
            venueType: 'Marina Beach promenade',
          },
          {
            title: "Elliot's Beach board game evening",
            pitch: 'A weekly stack of board games at a beachside café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbours',
            venueType: "A café near Elliot's Beach",
          },
          {
            title: 'Theosophical Society garden stroll',
            pitch:
              'A guided Sunday walk through the gardens, with stops for history and birdwatching.',
            audience: 'Nature lovers and history buffs',
            venueType: 'Theosophical Society grounds',
          },
          {
            title: 'Sunday morning cycle ride',
            pitch: 'A guided ride on quieter roads with a breakfast stop and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling routes near Guindy',
          },
          {
            title: 'Margazhi concert-going circle',
            pitch:
              'A group that picks concerts from the December season calendar, goes together, and discusses afterwards.',
            audience: 'Music lovers during the festival season',
            venueType: 'Mylapore sabhas',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Manufacturing-tech founders table',
            pitch:
              'A monthly roundtable for founders building hardware and manufacturing technology to share progress and lessons.',
            audience: 'Hardware and manufacturing founders',
            venueType: 'An IIT Madras research park room',
          },
          {
            title: 'SaaS and enterprise software circle',
            pitch:
              'Founders building enterprise software discuss sales, delivery, and team building in a confidential circle.',
            audience: 'SaaS founders and operators',
            venueType: 'A coworking floor in Tidel Park',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Automotive and EV network evening',
            pitch:
              'Engineers and founders in automotive and electric vehicles share trends and collaboration opportunities.',
            audience: 'Automotive professionals and EV founders',
            venueType: 'A hotel conference room',
          },
          {
            title: 'Film and media tech meetup',
            pitch:
              'Kollywood professionals and media-tech founders discuss distribution, AI tools, and collaboration.',
            audience: 'Film and media professionals',
            venueType: 'A studio or production house lounge',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Marina photo walk',
            pitch:
              'A guided photo walk along the beach and its fishing harbours with tips on light and composition.',
            audience: 'Amateur and professional photographers',
            venueType: 'Marina Beach and harbour area',
          },
          {
            title: 'Open-mic poetry and music night',
            pitch:
              'A monthly open mic where poets, musicians, and first-timers share five minutes on stage.',
            audience: 'Writers, musicians, and performers',
            venueType: 'A café stage in Besant Nagar',
          },
          {
            title: 'Short-film screening and feedback circle',
            pitch:
              'Filmmakers screen short works and receive structured, constructive feedback from the audience.',
            audience: 'Student and independent filmmakers',
            venueType: 'A screening room or studio',
          },
          {
            title: 'Bharatanatyam introduction workshop',
            pitch:
              'An experienced dancer teaches the basics of Bharatanatyam — posture, rhythm, and storytelling — to beginners.',
            audience: 'Dance enthusiasts and beginners',
            venueType: 'A dance school or rehearsal room',
          },
          {
            title: 'Craft and textile market weekend',
            pitch:
              'Local artisans and designers sell and tell the stories behind their craft in a friendly weekend market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'A cultural festival or craft bazaar hall',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a beach stretch, with gloves and chai supplied by local groups.',
            audience: 'Residents and first-time volunteers',
            venueType: "Marina or Elliot's Beach stretch",
          },
          {
            title: 'Lake and wetland restoration session',
            pitch:
              'Volunteers support wetland restoration — planting, cleanup, and monitoring at a local lake.',
            audience: 'Nature lovers and citizen scientists',
            venueType: 'A chosen lake or wetland',
          },
          {
            title: 'Flood preparedness circle',
            pitch:
              'Neighbours map flood-prone streets and coordinate a simple response plan with the local ward office.',
            audience: 'Residents in low-lying areas',
            venueType: 'An RWA hall or community centre',
          },
          {
            title: 'Voter awareness and registration drive',
            pitch:
              'Volunteers help residents check registration and understand the voting process in their ward.',
            audience: 'Civic-minded residents',
            venueType: 'A community centre or college hall',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and café owners share five-minute stories behind their businesses, followed by open questions.',
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
          'Match the category to your interests and the audience you can reach. In Chennai, recurring formats with a fixed venue — a sunrise walk, a monthly book circle, a concert-going group — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Chennaite to organize?',
        answer:
          'No. Many Chennai groups are run by newcomers, and the city is warm to people who make an effort with Tamil and the local calendar. An announcement in English and Tamil usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Chennai Origins start, and the city's loyalty keeps members coming back. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Chennai?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Chennaites gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Chennai?',
      answer:
        'Yes. Chennai has a strong cultural calendar, loyal communities, and a growing tech corridor. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        "Yes. Every venue type mentioned — the Marina, Elliot's Beach, Mylapore sabhas, Tidel Park coworking floors — exists in Chennai. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.",
    },
    {
      question: 'Does JoinOrigin have an office in Chennai?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Chennaites find or start Origins.',
    },
  ],
};

export default content;
