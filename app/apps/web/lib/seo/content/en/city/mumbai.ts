import type { CityContent } from '../../types';

/**
 * Mumbai content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Mumbai's real districts, industries, and gathering culture. Honest,
 * evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'mumbai',
  intro: [
    "Mumbai is India's financial and entertainment capital, a city that never sleeps and where community life is woven into daily survival. The local train network carries millions across the island city every day, and the pace of life makes people value efficient, reliable gatherings — a Sunday walk on Marine Drive, a street-food crawl in Mohammed Ali Road, or a networking breakfast in Bandra-Kurla Complex.",
    "The city's industries create natural clusters: finance and media in the Fort and Nariman Point area, Bollywood and production houses in Film City and Andheri, startups and tech teams in BKC and Lower Parel, and a dense maker and merchant culture across Dadar and the old city. Universities such as the University of Mumbai, IIT Bombay, and NMIMS keep a steady flow of students and alumni cycling through the scene.",
    "For finding or starting an Origin, Mumbai rewards people who respect the commute: choose a central venue, keep events tight and on time, and lean on the city's famous street food and coastal breeze to build warmth quickly.",
  ],
  dataPoints: [
    'Roughly 12.7 million residents in the city; the financial capital of India.',
    'Local rail network and metro carry millions across the island city daily.',
    'Districts with distinct scenes: Fort, Bandra, Lower Parel, Andheri, Dadar.',
    'Home to the University of Mumbai, IIT Bombay, NMIMS, and multiple colleges.',
    'Industries: finance, media, Bollywood film production, and startups.',
    'Public anchors: Marine Drive, Gateway of India, Juhu Beach, and city gardens.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Bandra-Kurla Complex and Lower Parel',
        'Startup event floors in BKC towers',
        'Incubator rooms at IIT Bombay and NMIMS',
        'Cafés with meeting corners in Bandra',
        'Hotel conference halls near Andheri East',
        'Tech park auditoriums in Powai',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo nights',
        'Fintech and D2C builder circles',
        'Investor office hours at coworking hubs',
        'Weekend hackathons in Powai',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, D2C brands, SaaS, or media tech — and an English-first name.',
        'Reserve a weekly or fortnightly slot at a BKC or Lower Parel coworking space with metro access.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Gallery spaces in Kala Ghoda',
        'Bollywood and production studios in Andheri and Film City',
        'Theatre spaces at Prithvi and NCPA',
        'Photography studios in Lower Parel',
        'Street-art corners in Bandra and Sassoon Dock',
        'Community halls in Dadar and Mahim',
      ],
      formats: [
        'Open-mic poetry and story nights',
        'Screenings and filmmaker feedback circles',
        'Photography walks along Marine Drive',
        'Costume and styling workshops',
        'Art walks through Kala Ghoda and Colaba',
      ],
      howToStart: [
        'Choose a craft — writing, film, theatre, design — and a regular evening slot.',
        'Partner with a gallery, theatre, or studio in Kala Ghoda or Bandra to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Ward committee and municipal hall meeting rooms',
        'Coastal cleanup initiative meeting points',
        'Neighborhood watch rooms in building societies',
        'Student union halls across college campuses',
        'NGO and volunteer centers in the old city',
        'Railway station community kiosks',
      ],
      formats: [
        'Civic issue town halls with local corporators',
        'Coastal and beach cleanup volunteer briefings',
        'Tenant and housing-rights info evenings',
        'Public transport advocacy planning sessions',
        'Voter awareness and registration drives',
      ],
      howToStart: [
        'Pick one concrete local issue — a beach, a station, a ward — and keep the geography small.',
        'Partner with an existing NGO or ward committee instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Marine Drive promenade benches',
        'Juhu and Dadar beaches for sunrise walks',
        'Cafés in Bandra and Colaba with outdoor tables',
        'Rooftop restaurants in Lower Parel',
        'Sassoon Dock and Colaba street-food corners',
        'Book cafés and library halls',
      ],
      formats: [
        'Sunday promenade walks with tea stops',
        'Street-food walks through Mohammed Ali Road',
        'Board game and cards evenings at cafés',
        'Language exchange tables for new arrivals',
        'Monsoon picnics at Powai lakefront',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday walk, a monthly food crawl — and a fixed starting point.',
        'Pick a Marine Drive stretch or a Bandra café that is easy to reach by train or metro.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Bazaar stalls and merchant association halls in Dadar',
        "Kala Ghoda and Colaba boutique owners' circles",
        'Hotel banquet rooms in Bandra East',
        'Craft and textile workshops in the old city',
        'Café back rooms for owner breakfasts',
        'Chamber of commerce seminar rooms in Fort',
      ],
      formats: [
        'Bazaar merchant breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and invoicing clinics',
        'Shared procurement circles for supplies',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, supplies, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the merchant association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Mumbai's startup scene is the densest in India after Bengaluru, with particular strength in fintech, media, and direct-to-consumer brands. Founders cluster in Bandra-Kurla Complex, Lower Parel, and Powai, where coworking spaces, accelerators, and university programs at IIT Bombay and NMIMS create a fast-moving loop of capital and talent. Mumbai money is a real advantage — the city's family offices, venture funds, and angel networks sit close to the startup community and show up at pitch nights. The culture rewards execution over talk: meetings are short, decisions are quick, and events that run late respect the long commute home. Recurring formats include founder breakfasts, pitch evenings, and fintech and D2C circles where operators trade real numbers. International founders also feel at home here, since English is the working language and global firms keep offices in the same towers. Starting a startup Origin here works best with a narrow vertical and a fixed venue near a station or metro stop; the city's hunger for useful, efficient gatherings does the rest.",
    creative:
      "Mumbai's creative communities are powered by the world's largest film industry and a deep bench of writers, musicians, designers, and theatre artists. Bollywood production houses in Andheri and Film City set the tempo, while Kala Ghoda galleries, Prithvi Theatre, and the National Centre for the Performing Arts anchor the cultural calendar. The city's creative economy runs on collaboration — writers' rooms, music production studios, costume workshops, and photography collectives all feed off referrals and shared spaces. Street culture matters too: Sassoon Dock's murals, Bandra's café corners, and Marine Drive's evening promenade are free stages for new voices. Common formats include open-mic nights, screenings, photography walks, and artist talks. Because rent is high and space is precious, communities often meet in cafés, galleries, and studio lobbies rather than dedicated venues. Starting a creative Origin in Mumbai is achievable: pick a craft and a neighbourhood with an existing audience, and the city's hunger for expression will pull people in.",
    political:
      "Mumbai's civic culture is one of India's most organised, shaped by the city's density, its long coastline, and a tradition of resident activism. Housing societies, ward committees, and municipal governance touch every neighbourhood, and issues like coastal protection, public transport, and housing rights produce active volunteer scenes. Beach cleanups along Versova and Dadar draw thousands of residents who treat civic action as a weekend habit rather than a one-off protest. Tenant groups, student unions, and NGO networks host information evenings and planning sessions that are open to newcomers. The city's monsoon flooding makes climate and infrastructure work urgent and tangible, giving political communities a clear focus. Railway commuters and women's safety groups add daily-life issues to the agenda, so there is always a role for new volunteers. Starting a political Origin here means choosing a small, concrete geography — a beach, a station, a ward — and partnering with the resident and NGO networks that already exist. Mumbai rewards consistency and visible action over commentary.",
    meetup:
      "Mumbai's meetup scene is built for people who love the city's energy but need structure to keep showing up. The promenades — Marine Drive, Juhu, Dadar — are the natural venues: sunrise walks, evening strolls, and monsoon picnics cost nothing and feel like a reward. Street food is the great social lubricant, and walks through Mohammed Ali Road, Colaba, or the bazaar districts turn a meetup into an experience. Cafés in Bandra and Colaba host book clubs, language exchanges, board game evenings, and freelance coffee mornings, often with outdoor tables that suit Mumbai's climate. Groups here tend to be practical about timing — Sunday mornings and weekday evenings win over late nights because of the commute. Starting a meetup is realistic: pick a repeatable format and a fixed point that is easy to reach by train, run three sessions at the same time and place, and let Mumbai's density of curious people take over.",
    'small-business':
      "Mumbai's small business community is woven into the city's bazaars and shopping corridors, from Dadar's cloth and gold markets to Colaba's boutiques and Bandra's cafés. Merchant associations in the old city manage festival stalls, shared security, and collective bargaining with landlords and suppliers, giving new owners a ready-made network. The city's hospitality and D2C boom has created a second layer — boutique owners, café founders, and fashion labels who meet in hotel lounges and café back rooms to swap rent advice, supply contacts, and festival-season plans. Trade bodies and the chamber of commerce run practical clinics on digital payments, invoicing, and export paperwork. What holds these groups together is place: a market or a corridor shares customers, foot traffic, and the same monsoon-wear problems. Starting a small business Origin in Mumbai is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Mumbai is a city where good event ideas travel fast — the density is enormous, the venues are real, and people show up when something is practical and fun. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Mumbai, from Marine Drive promenades and street-food lanes to coworking floors in BKC and Kala Ghoda galleries. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue with metro access, and let Mumbai's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Marine Drive sunrise circle',
            pitch:
              'An early morning walk along the promenade where newcomers and long-time Mumbaikars trade city tips, work stories, and contacts.',
            audience: 'New arrivals and early risers',
            venueType: 'Marine Drive promenade',
          },
          {
            title: 'BKC founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Mumbai',
            venueType: 'A café in Bandra-Kurla Complex',
          },
          {
            title: 'Colaba coffee meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents and professionals in south Mumbai',
            venueType: 'A café in Colaba',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A library or community hall',
          },
          {
            title: 'Freelancer work-café morning',
            pitch:
              'A weekly morning where freelancers across industries share leads, rates, and client stories over chai.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café with long tables in Bandra',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Marathi and Hindi conversation tables',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning local languages',
            venueType: 'A community hall or café',
          },
          {
            title: 'Stock market basics for young investors',
            pitch:
              'A practical session on SIPs, mutual funds, and reading company reports before you invest.',
            audience: 'First-time investors',
            venueType: 'A coworking event room',
          },
          {
            title: 'Sewing and tailoring workshop',
            pitch:
              'Local tailors teach basic mending and alteration skills to residents who want to repair clothes.',
            audience: 'Residents and sustainability-minded makers',
            venueType: 'A neighbourhood workshop or society hall',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through Colaba or the bazaar district with tips on composition and light.',
            audience: 'Beginner photographers',
            venueType: 'Kala Ghoda and Colaba streets',
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
            title: 'Juhu beach morning walk and chai',
            pitch:
              'A relaxed beach walk followed by chai and breakfast at a nearby stall, rain or shine.',
            audience: 'Neighbours and newcomers',
            venueType: 'Juhu Beach',
          },
          {
            title: 'Mohammed Ali Road food crawl',
            pitch:
              "A guided evening walk through the old city's street-food lanes with stops at legendary stalls.",
            audience: 'Food lovers and explorers',
            venueType: 'Mohammed Ali Road lanes',
          },
          {
            title: 'Powai lakefront picnic',
            pitch:
              'Blankets, board games, and potluck snacks on the lakefront, with a monsoon-breeze rule.',
            audience: 'Families and friend groups',
            venueType: 'Powai lakefront lawns',
          },
          {
            title: 'Board game night at a Bandra café',
            pitch:
              'A weekly stack of board games at a café that welcomes slow evenings and loud laughter.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A café in Bandra with long tables',
          },
          {
            title: 'Weekend cycle ride through the eastern suburbs',
            pitch: 'A guided morning ride on quieter roads with breakfast stops and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling paths and suburbs',
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
            venueType: 'A coworking floor in BKC',
          },
          {
            title: 'D2C brand founders table',
            pitch:
              'Founders of direct-to-consumer brands discuss sourcing, packaging, and marketplace playbooks.',
            audience: 'D2C founders and operators',
            venueType: 'A hotel lounge or café back room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech and media',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Journalism and media pitch lab',
            pitch:
              'Writers and journalists pitch story ideas and get honest editorial feedback from peers.',
            audience: 'Freelance journalists and media students',
            venueType: 'A newsroom or college classroom',
          },
          {
            title: 'HR and talent leaders roundtable',
            pitch:
              'People leaders share how they hire, retain, and support employees in a high-cost, high-turnover market.',
            audience: 'HR professionals and team leads',
            venueType: 'A hotel conference room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Kala Ghoda gallery walk',
            pitch:
              'A guided evening walk through the art district with stops at galleries and artist talks.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Kala Ghoda galleries',
          },
          {
            title: 'Open-mic poetry night',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café or small theatre space',
          },
          {
            title: 'Short-film screening and feedback circle',
            pitch:
              'Filmmakers screen short works and receive structured, constructive feedback from the audience.',
            audience: 'Student and independent filmmakers',
            venueType: 'A screening room or studio',
          },
          {
            title: 'Photography collective portfolio night',
            pitch:
              'Photographers present a small portfolio and get honest critique from peers and a guest editor.',
            audience: 'Amateur and professional photographers',
            venueType: 'A photo studio or gallery room',
          },
          {
            title: 'Costume and styling workshop',
            pitch:
              'Stylists teach basic costume design and personal styling using thrifted and local fabrics.',
            audience: 'Fashion students and enthusiasts',
            venueType: 'A workshop room in the old city',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a beach stretch, with gloves and tea supplied by local groups.',
            audience: 'Residents and first-time volunteers',
            venueType: 'Versova or Dadar beach',
          },
          {
            title: 'Housing society sustainability circle',
            pitch:
              'Residents plan waste segregation, water saving, and solar projects for their own building or ward.',
            audience: 'Apartment residents and society committee members',
            venueType: 'A society hall or community room',
          },
          {
            title: 'Public transport advocacy meetup',
            pitch:
              'Commuters share feedback on train and metro lines and coordinate polite, constructive advocacy.',
            audience: 'Daily commuters',
            venueType: 'A railway station community room',
          },
          {
            title: 'Street dog care volunteer briefing',
            pitch:
              'An orientation plus first shift for volunteers supporting local animal welfare groups.',
            audience: 'First-time volunteers',
            venueType: 'A rescue centre or volunteer space',
          },
          {
            title: 'Local market storytelling night',
            pitch:
              'Shop and stall owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbours and small business owners',
            venueType: 'A merchant hall or local café',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Mumbai, recurring formats with a fixed venue and metro access — a promenade walk, a weekly breakfast, a monthly food crawl — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Mumbaikar to organize?',
        answer:
          'No. Many Mumbai groups are run by recent arrivals, and the city is used to welcoming newcomers. A bilingual announcement in English and a local language usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          "Yes — recurring formats are how most Mumbai Origins start, and the city's density means a consistent weekly session quickly builds a following. The how-to guides walk through the first event to a stable Origin.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Mumbai?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Mumbaikars gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Mumbai?',
      answer:
        'Yes. Mumbai has huge density, reliable public transport, and a culture of showing up for practical, well-run events. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Marine Drive, Juhu Beach, Kala Ghoda galleries, BKC coworking floors, street-food lanes — exists in Mumbai. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Mumbai?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Mumbaikars find or start Origins.',
    },
  ],
};

export default content;
