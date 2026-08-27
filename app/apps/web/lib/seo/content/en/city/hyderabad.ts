import type { CityContent } from '../../types';

/**
 * Hyderabad content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Hyderabad's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'hyderabad',
  intro: [
    "Hyderabad is a city of two famous faces — a historic old city of Charminar, biryani, and pearl markets, and a modern tech corridor in HITEC City and Gachibowli that hosts global software campuses and India's best-known startup incubator. The contrast is part of its character: engineers and founders gather in Gachibowli's coworking floors by day, while families and food lovers fill the old city's lanes after dark.",
    "The city's institutions anchor its community life: Osmania University, the University of Hyderabad, IIIT Hyderabad, and IIT Hyderabad produce a steady stream of students and researchers, while T-Hub, the startup ecosystem's flagship incubator, draws founders from across the country. Hussain Sagar, Necklace Road, and KBR National Park give groups free, well-known outdoor venues.",
    "For finding or starting an Origin, Hyderabad rewards organizers who respect the city's geography: pick a venue in the corridor for tech audiences and one in the old city for culture and food, and lean on the city's famous hospitality to make newcomers feel welcome.",
  ],
  dataPoints: [
    'Roughly 7 million residents; the capital of Telangana.',
    'Tech corridor: HITEC City, Gachibowli, Madhapur, and Financial District.',
    'Home to T-Hub, Osmania University, IIIT Hyderabad, and IIT Hyderabad.',
    'Industries: IT services, startups, pharma, film (Tollywood), and textiles.',
    'Historic anchors: Charminar, Golconda Fort, and the Hussain Sagar lake.',
    'Public venues: Necklace Road, KBR National Park, and the old city bazaars.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Gachibowli and Madhapur',
        'T-Hub and innovation centre event floors',
        'Tech park auditoriums in HITEC City',
        'Cafés with meeting corners in Kondapur',
        'Incubator rooms at IIIT and IIT Hyderabad',
        'Hotel conference halls near the Financial District',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo days at T-Hub',
        'SaaS and healthtech builder circles',
        'Investor office hours',
        'Weekend hackathons at tech parks',
      ],
      howToStart: [
        'Pick a narrow vertical — healthtech, SaaS, pharma-tech, or deep tech — and an English-first name.',
        'Reserve a recurring slot at a Gachibowli coworking space or a T-Hub community room.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Film studios and post-production houses in Jubilee Hills',
        'Art galleries in Banjara Hills and Madhapur',
        'Theatre and performance spaces in the old city',
        'Design studios in Jubilee Hills',
        'Street-art corners in the old city lanes',
        'Café stages in Jubilee Hills and Gachibowli',
      ],
      formats: [
        'Tollywood industry networking evenings',
        'Short-film screenings and feedback circles',
        'Design and craft market weekends',
        'Photography walks through Charminar lanes',
        'Open-mic poetry and music nights',
      ],
      howToStart: [
        'Choose a craft — film, design, writing, music — and a regular evening slot.',
        'Partner with a gallery, studio, or production house in Jubilee Hills or Madhapur to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'GHMC ward and circle office meeting rooms',
        'Lake restoration volunteer points near Hussain Sagar',
        'RWA halls in the newer residential corridors',
        'University seminar rooms at UoH and Osmania',
        'NGO and volunteer centres in the old city',
        'Public library rooms with civic collections',
      ],
      formats: [
        'Lake and park restoration planning sessions',
        'Heritage conservation town halls',
        'Housing and urban development info evenings',
        'Voter awareness and registration drives',
        'Public transport advocacy meetings',
      ],
      howToStart: [
        'Pick one concrete local issue — a lake, a monument, a ward, a bus route — and keep the geography small.',
        'Partner with an existing RWA, NGO, or heritage group instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Necklace Road promenade and Hussain Sagar lakeside',
        'KBR National Park walking trails',
        'Cafés in Jubilee Hills and Banjara Hills',
        'Old city food lanes near Charminar',
        'Rooftop restaurants in Gachibowli',
        'Public gardens and park lawns',
      ],
      formats: [
        'Lakeside morning walking groups',
        'Hyderabad biryani and street-food crawls',
        'Board game evenings at cafés',
        'Language exchange tables for new arrivals',
        'Weekend cycling rides on quieter roads',
      ],
      howToStart: [
        'Choose a repeatable format — a lakeside walk, a monthly food crawl — and a fixed starting point.',
        'Pick a Necklace Road stretch or a Jubilee Hills café that is easy to reach by cab or metro.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Old city merchant association halls',
        'Pearl market and textile trader circles in Laad Bazaar',
        'Café and restaurant owner tables in Jubilee Hills',
        'Boutique owner circles in Banjara Hills',
        'Craft bazaar stalls in Shilparamam',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Merchant breakfasts in the old city with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and GST clinics',
        'Pearl and textile export workshops',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor — Laad Bazaar, a Banjara Hills block — and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, suppliers, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the merchant association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Hyderabad's startup ecosystem has grown fast around the HITEC City and Gachibowli corridor, with T-Hub acting as the public anchor and global tech campuses providing the talent base. Founders and engineers cluster in Gachibowli, Madhapur, and Kondapur, where coworking spaces, accelerator floors, and incubators at IIIT and IIT Hyderabad create a dense loop of capital and talent. The city's healthtech and pharma heritage gives local startups a distinctive edge — Hyderabad is India's pharma and vaccine hub, and that technical depth feeds into biotech, medtech, and health-tech ventures. The culture is professional and hospitable: meetings are structured, people are direct about numbers, and the city's famously friendly vibe makes networking feel easier than in bigger metros. Recurring formats include founder breakfasts, pitch evenings at T-Hub, SaaS and healthtech circles, and weekend hackathons. Starting a startup Origin here works best with a narrow vertical and a fixed venue in the corridor; the city's mix of corporate depth and startup energy does the rest.",
    creative:
      "Hyderabad's creative scene is anchored by Tollywood — one of the world's largest film industries — and a growing community of designers, musicians, and visual artists in Jubilee Hills and Madhapur. Film studios, post-production houses, and music studios give the city a serious production culture, and industry professionals are used to collaborating across disciplines. Galleries in Banjara Hills and Madhapur host contemporary art shows, while the old city's lanes around Charminar preserve craft traditions — pearls, bangles, textiles — that date back centuries. Independent theatre, open-mic poetry, and indie film screenings have grown steadily in cafés and small venues. The city's design schools and film institutes feed a steady stream of graduates into the freelance economy. Common formats include film screenings, design critiques, craft market weekends, and photography walks through the old city. Starting a creative Origin in Hyderabad is realistic: pick a craft and a neighbourhood with an existing audience, and the city's mix of film glamour and craft tradition will pull people in.",
    political:
      "Hyderabad's civic life is shaped by its dual identity — the heritage old city and the fast-growing tech corridor — and by the shared pressures of lakes, traffic, and housing. Hussain Sagar and the city's other lakes are a constant civic theme: volunteer groups, resident welfare associations, and environmental NGOs run restoration drives, cleanups, and monitoring programs that are open to newcomers. Heritage conservation is a live issue around the old city, with citizen groups documenting monuments, advocating for pedestrian spaces, and organizing heritage walks. Traffic and public transport matter in a city whose office corridors grew faster than its roads, and commuters coordinate carpool and metro advocacy groups. Housing and rental rights are active fronts in the newer suburbs. University campuses and research institutes add a policy-savvy layer. Starting a political Origin here means choosing one concrete issue and a small geography — a lake, a monument, a ward — then partnering with the volunteer and RWA networks that already exist. Hyderabad rewards consistent, visible action.",
    meetup:
      "Hyderabad's meetup scene mixes old-city charm with new-city convenience. Necklace Road along Hussain Sagar is the classic evening venue — families, joggers, and friends fill the promenade as the sun sets — while KBR National Park's trails host morning walking groups. The city's famous food culture makes food crawls a natural format: biryani houses, Irani cafés, and old-city street stalls give groups a delicious route through history. Jubilee Hills and Banjara Hills cafés host book clubs, board game nights, and freelance coffee mornings, and the tech corridor's rooftops and breweries attract the after-work crowd. Because so many residents moved to Hyderabad for work in IT, pharma, and film, newcomers are common and groups are used to welcoming them. Groups here tend to be warm and well-organised, matching the city's hospitality. Starting a meetup is realistic: pick a repeatable format and a fixed venue — a lakeside walk, a food crawl — run three sessions at the same time and place, and let Hyderabad's friendliness take over.",
    'small-business':
      "Hyderabad's small business community spans the old city's bazaars and the new economy of cafés, boutiques, and tech-adjacent brands. Laad Bazaar's pearl and bangle merchants, the textile traders of the old city, and the spice and craft stalls around Charminar operate through merchant associations that manage festival stalls, shared security, and collective bargaining on rent. The new city is different: Jubilee Hills and Banjara Hills boutique owners, café founders, and D2C brands meet in coffee shops and lounges to swap sourcing contacts, influencer tips, and festival-season plans. Shilparamam's craft village gives traditional artisans a stage alongside modern makers. Trade bodies and the chamber of commerce run practical clinics on GST, digital payments, and exports. What holds these groups together is geography: a market or a corridor shares customers, foot traffic, and the same festival calendar. Starting a small business Origin in Hyderabad is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Hyderabad is a great city for testing Origin event ideas — the old city's lanes and the tech corridor's venues give organizers two very different backdrops, and the city's hospitality means people show up when something is real. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Hyderabad, from Necklace Road and Charminar lanes to T-Hub floors and Jubilee Hills cafés. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Hyderabad's hospitality do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Hussain Sagar sunset circle',
            pitch:
              'An evening walk along the lakeside where newcomers and long-time Hyderabadis trade city tips and work stories.',
            audience: 'New arrivals and evening walkers',
            venueType: 'Necklace Road',
          },
          {
            title: 'Gachibowli founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday.",
            audience: 'Startup founders in Hyderabad',
            venueType: 'A café in Gachibowli',
          },
          {
            title: 'Jubilee Hills coffee meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals in the western suburbs',
            venueType: 'A café in Jubilee Hills',
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
              'A weekly morning where freelancers across industries share leads, rates, and client stories over chai.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café with long tables in Madhapur',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Telugu conversation table',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning Telugu',
            venueType: 'A community hall or café',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A T-Hub or coworking event room',
          },
          {
            title: 'Heritage walk leader training',
            pitch:
              'Experienced guides teach the craft of leading Charminar and Golconda heritage tours accurately and engagingly.',
            audience: 'History enthusiasts and tour guides',
            venueType: 'A heritage society meeting room',
          },
          {
            title: 'Digital marketing for small teams',
            pitch:
              'Hands-on sessions on search, social, and email marketing for small businesses and startups.',
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
            title: 'Charminar street-food walk',
            pitch:
              "A guided evening walk through the old city's food lanes with stops at legendary biryani and kebab stalls.",
            audience: 'Food lovers and explorers',
            venueType: 'Old city lanes near Charminar',
          },
          {
            title: 'KBR park morning walk',
            pitch: 'A gentle morning walk through the national park with a resident birdwatcher.',
            audience: 'Nature lovers and early risers',
            venueType: 'KBR National Park trails',
          },
          {
            title: 'Board game night at a Madhapur café',
            pitch:
              'A weekly stack of board games at a café that welcomes slow evenings and loud laughter.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A café in Madhapur',
          },
          {
            title: 'Sunday morning cycle ride',
            pitch: 'A guided ride on quieter roads with a breakfast stop and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling routes near Necklace Road',
          },
          {
            title: 'Lakeside potluck picnic',
            pitch: 'A rotating potluck on the lawns with games, music, and a sunset view.',
            audience: 'Families and friend groups',
            venueType: 'Hussain Sagar lawns',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Healthtech founders table',
            pitch:
              'A monthly roundtable for healthtech and medtech founders to share progress and regulatory lessons.',
            audience: 'Healthtech founders and operators',
            venueType: 'A T-Hub or coworking event room',
          },
          {
            title: 'SaaS founders circle',
            pitch:
              'Founders building SaaS products discuss pricing, distribution, and team building in a confidential circle.',
            audience: 'SaaS founders and operators',
            venueType: 'A coworking floor in Gachibowli',
          },
          {
            title: 'Pharma and biotech network evening',
            pitch:
              'Researchers, founders, and operators in pharma and biotech share trends and collaboration opportunities.',
            audience: 'Pharma and biotech professionals',
            venueType: 'A hotel conference room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Tollywood and media tech meetup',
            pitch:
              'Film industry professionals and media-tech founders discuss distribution, AI tools, and collaboration.',
            audience: 'Film and media professionals',
            venueType: 'A production house or studio lounge',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Charminar photo walk',
            pitch:
              "A guided photo walk through the old city's lanes, markets, and monuments with composition tips.",
            audience: 'Amateur and professional photographers',
            venueType: 'Old city streets near Charminar',
          },
          {
            title: 'Open-mic poetry and music night',
            pitch:
              'A monthly open mic where poets, musicians, and first-timers share five minutes on stage.',
            audience: 'Writers, musicians, and performers',
            venueType: 'A café stage in Jubilee Hills',
          },
          {
            title: 'Short-film screening and feedback circle',
            pitch:
              'Filmmakers screen short works and receive structured, constructive feedback from the audience.',
            audience: 'Student and independent filmmakers',
            venueType: 'A screening room or studio',
          },
          {
            title: 'Pearl and craft workshop',
            pitch:
              'Local artisans teach the basics of pearl stringing, bangle making, and textile craft to curious makers.',
            audience: 'Craft lovers and visitors',
            venueType: 'A workshop in the old city',
          },
          {
            title: 'Design critique evening',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in Madhapur',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Lake restoration volunteer morning',
            pitch:
              'A Saturday morning session supporting a lake — cleanup, planting, and simple upkeep.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A chosen lake in the city',
          },
          {
            title: 'Heritage conservation walk',
            pitch:
              "A guided walk documenting the old city's monuments and a discussion on what residents can do to protect them.",
            audience: 'History and heritage lovers',
            venueType: 'Old city streets near Charminar',
          },
          {
            title: 'Rental rights info evening',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal counselling.',
            audience: 'Renters and tenant organizers',
            venueType: 'An RWA hall or neighbourhood centre',
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
          'Match the category to your interests and the audience you can reach. In Hyderabad, recurring formats with a fixed venue — a lakeside walk, a monthly breakfast, a food crawl — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Hyderabadi to organize?',
        answer:
          'No. Many Hyderabad groups are run by newcomers, and the city is famous for welcoming people from across India. An announcement in English and Telugu usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Hyderabad Origins start, and the city's hospitality makes people come back. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Hyderabad?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Hyderabadis gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Hyderabad?',
      answer:
        'Yes. Hyderabad has a fast-growing tech corridor, a rich heritage culture, and a famously hospitable population. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Necklace Road, Charminar lanes, T-Hub floors, Jubilee Hills cafés — exists in Hyderabad. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Hyderabad?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Hyderabadis find or start Origins.',
    },
  ],
};

export default content;
