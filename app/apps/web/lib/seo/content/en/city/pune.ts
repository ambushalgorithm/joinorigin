import type { CityContent } from '../../types';

/**
 * Pune content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Pune's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'pune',
  intro: [
    "Pune is known as the Oxford of the East for good reason — the city's colleges and universities dominate its identity, and a young, educated population keeps its community scene lively. The city balances tradition and new economy: FC Road and Deccan Gymkhana buzz with students and cafés, Koregaon Park and Viman Nagar host restaurants and startup evenings, while Hinjewadi's IT park anchors a fast-growing professional class.",
    "Institutions anchor Pune's life: Savitribai Phule Pune University, Fergusson College, and a long list of engineering and management schools feed a constant stream of students, while the National Defence Academy and the city's auto and manufacturing plants give it a serious industrial character. Hills and open spaces — Sinhagad, the Khadakwasla backwaters, the city's gardens — provide weekend escapes that groups plan around.",
    "For finding or starting a community, Pune rewards organizers who tap into the student energy and the city's tradition of intellectual clubs: choose a venue near a college or a café district, keep formats simple and affordable, and the city's enthusiasm will sustain the group.",
  ],
  dataPoints: [
    'Roughly 3.1 million residents; known as the Oxford of the East.',
    'IT corridor in Hinjewadi and the broader Pimpri-Chinchwad belt.',
    'Home to Savitribai Phule Pune University, Fergusson College, and many engineering schools.',
    'Industries: education, IT, automobiles, manufacturing, and defence.',
    'Cultural anchors: FC Road, Koregaon Park, and the annual Ganesh festival.',
    'Outdoor anchors: Sinhagad fort, Khadakwasla backwaters, and city gardens.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Koregaon Park and Viman Nagar',
        'Startup event floors in Hinjewadi',
        'Incubator rooms at Pune University and COEP',
        'Cafés with meeting corners on FC Road',
        'Tech park auditoriums in Hinjewadi',
        'Hotel conference halls in Koregaon Park',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo nights',
        'SaaS and edtech builder circles',
        'Investor office hours',
        'Weekend hackathons at college campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — edtech, SaaS, manufacturing tech, or climate — and an English-first name.',
        'Reserve a recurring slot at a Koregaon Park or Viman Nagar coworking space.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Theatre halls in the Deccan and Shivajinagar areas',
        'Art galleries in Koregaon Park and Kothrud',
        'Marathi theatre and music venues in the old city',
        'Design studios in Viman Nagar',
        'Café stages on FC Road',
        'Film and photography studios in the east',
      ],
      formats: [
        'Open-mic poetry and music nights',
        'Marathi theatre discussion circles',
        'Short-film screenings and feedback sessions',
        'Photography walks through old Pune',
        'Design critique evenings',
      ],
      howToStart: [
        'Choose a craft — theatre, writing, music, film — and a regular evening slot.',
        'Partner with a theatre hall, gallery, or studio in the Deccan or Koregaon Park area to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'PMC ward offices and community halls',
        'River and hill cleanup volunteer points',
        'RWA halls across the new suburbs',
        'University seminar rooms at SPPU',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
      ],
      formats: [
        'River and lake cleanup volunteer briefings',
        'Traffic and road-safety advocacy meetings',
        'Housing and rental rights info evenings',
        'Voter awareness and registration drives',
        'Climate action circles with local councillors',
      ],
      howToStart: [
        'Pick one concrete local issue — a river stretch, a hill, a traffic junction, a ward — and keep the geography small.',
        'Partner with an existing RWA, NGO, or student group instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'FC Road cafés and Deccan gymkhana grounds',
        'Koregaon Park lanes and restaurants',
        'Sinhagad foothills and Khadakwasla backwaters',
        'City gardens and park lawns',
        'Book cafés in Kothrud',
        'Cafés and breweries in Viman Nagar',
      ],
      formats: [
        'Weekend trek groups to Sinhagad',
        'Café board game evenings',
        'Language exchange tables for students',
        'Sunday morning cycling rides',
        'Book clubs in the college districts',
      ],
      howToStart: [
        'Choose a repeatable format — a weekend trek, a weekly café night — and a fixed starting point.',
        'Pick an FC Road café or a Sinhagad meeting point that students can reach easily.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market association halls in Tulsi Baug and the old city',
        'Restaurant and café owner tables in Koregaon Park',
        'Boutique owner circles in Viman Nagar',
        'Manufacturing association rooms in Pimpri-Chinchwad',
        'Craft bazaar stalls at city festivals',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Merchant breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and GST clinics',
        'Manufacturing and export workshops',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, suppliers, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the merchant association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Pune's startup scene runs on the city's education system: thousands of engineering and management graduates stay in the city after college, and many start companies close to where they studied. Hinjewadi's IT park anchors the professional side, while Koregaon Park and Viman Nagar host the coworking floors, accelerators, and café meetings where founders actually connect. The city's industrial base — automobiles, manufacturing, defence — gives local startups real depth in hardware, enterprise software, and factory automation, and Pune's edtech scene is one of India's strongest, a natural outgrowth of the university town. The culture is studious and collaborative: founders share knowledge freely, events are practical, and the city's relatively low costs let teams run longer on less. Recurring formats include founder breakfasts, pitch evenings, SaaS and edtech circles, and weekend hackathons on college campuses. Starting a startup community here works best with a narrow vertical and a fixed venue near the student and professional corridors; Pune's energy does the rest.",
    creative:
      "Pune's creative scene is powered by its students and its deep Marathi cultural tradition. The city is a centre of Marathi theatre, with a passionate audience for plays, music, and poetry in the old city and the Deccan area, and the annual Ganesh festival turns the whole city into a stage. The art college and design schools feed a steady stream of graduates into design, film, and illustration, and Koregaon Park's galleries and cafés host contemporary shows and open-mics. The indie music and film scene is growing fast — small venues on FC Road and in Viman Nagar host gigs, screenings, and poetry nights most weeks. The city's mix of students, freelancers, and cultural traditionalists gives creators an unusually receptive audience. Common formats include open-mic nights, theatre discussion circles, film screenings, and photography walks through old Pune. Starting a creative community in Pune is realistic: pick a craft and a venue with an existing audience, and the city's youthful energy will pull people in.",
    political:
      "Pune's civic life is active and issue-driven, shaped by the city's fast growth and its green surroundings. The Mula-Mutha river, the hills of Sinhagad, and the Khadakwasla backwaters give environmental groups tangible projects: cleanup drives, tree-planting sessions, and river monitoring programs are common and well-attended. Traffic and road safety are constant topics in a city that grew faster than its roads, and commuters, students, and RWAs organize advocacy groups. Housing and rental rights matter in a city with a huge student and migrant population, and tenant networks hold info evenings and legal clinics. University campuses and research institutes add a policy-savvy layer. The culture rewards persistence and local knowledge: showing up to a real meeting and knowing your ward's details matters more than online commentary. Starting a political community here means choosing one concrete issue and a small geography — a river stretch, a hill, a junction — then partnering with the RWA and volunteer networks that already exist. Pune rewards visible, consistent action.",
    meetup:
      "Pune's meetup scene is young, friendly, and affordable, powered by the city's student population. FC Road and the Deccan area are the classic hangouts — cafés, bookshops, and cheap food make it easy to host a low-budget gathering. Koregaon Park and Viman Nagar offer the newer, slightly plusher side: breweries, restaurants, and lounges that attract the professional crowd. The hills are the great weekend draw — Sinhagad treks, Khadakwasla picnics, and cycling rides up the ghat roads give groups an outdoor rhythm that Pune is famous for. Book clubs, board game nights, and language exchanges fill the café circuit, and the city's colleges produce a constant stream of first-time organizers. Groups here tend to be casual, low-pressure, and welcoming, matching the city's student energy. Starting a meetup is realistic: pick a repeatable format and a fixed venue — a weekly café night, a weekend trek — run three sessions at the same time and place, and let Pune's enthusiasm take over.",
    'small-business':
      "Pune's small business community combines the old city's markets and the new economy's cafés, restaurants, and brands. Tulsi Baug and the old city bazaars run on merchant associations that manage festival stalls, shared security, and collective voice on rent and regulation. Koregaon Park's restaurants and cafés form a tight F&B community that swaps landlord stories, staffing playbooks, and delivery-platform strategies. The Pimpri-Chinchwad manufacturing belt gives the city a distinctive layer of small engineering and auto-component businesses with their own trade networks. The student population supports a lively economy of cafés, bookshops, and service startups, and trade bodies run practical clinics on GST, digital payments, and exports. What holds these groups together is geography: a market or a corridor shares customers, foot traffic, and the same festival calendar. Starting a small business community in Pune is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Pune is a perfect city for community event ideas: the student energy is huge, the cafés are affordable, and the hills give you a natural weekend rhythm. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Pune, from FC Road cafés and Koregaon Park lounges to Sinhagad foothills and Hinjewadi tech parks. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Pune's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'FC Road café circle',
            pitch:
              'A weekly low-pressure coffee where students, freelancers, and newcomers trade city tips and work stories.',
            audience: 'Students and new arrivals',
            venueType: 'A café on FC Road',
          },
          {
            title: 'Koregaon Park founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday.",
            audience: 'Startup founders in Pune',
            venueType: 'A café in Koregaon Park',
          },
          {
            title: 'Deccan meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Young professionals and students',
            venueType: 'A café near Deccan Gymkhana',
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
            venueType: 'A café with long tables in Viman Nagar',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Marathi conversation table',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning Marathi',
            venueType: 'A community hall or café',
          },
          {
            title: 'Study group skills workshop',
            pitch:
              'A practical session on how to run effective study groups, peer reviews, and exam preparation circles.',
            audience: 'College students',
            venueType: 'A college hall or library room',
          },
          {
            title: 'Personal finance for students',
            pitch:
              'A friendly session on budgeting, savings, and avoiding debt traps for people in their first years of earning.',
            audience: 'Students and early-career earners',
            venueType: 'A coworking or community event room',
          },
          {
            title: 'Trek safety and outdoor skills',
            pitch:
              'Experienced trekkers teach route planning, gear basics, and safety for the Sinhagad trails.',
            audience: 'Beginner trekkers and outdoor lovers',
            venueType: 'A trek club or adventure shop room',
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
            title: 'Sinhagad sunrise trek',
            pitch:
              'A guided weekend trek to the fort for sunrise, with an optional breakfast at the top.',
            audience: 'Trekkers of every level',
            venueType: 'Sinhagad foothills',
          },
          {
            title: 'FC Road board game night',
            pitch:
              'A weekly stack of board games at a café that welcomes slow evenings and loud laughter.',
            audience: 'Casual gamers and students',
            venueType: 'A café on FC Road',
          },
          {
            title: 'Khadakwasla backwater picnic',
            pitch:
              'Blankets, snacks, and conversation by the backwaters, with a swimming-weather rule.',
            audience: 'Families and friend groups',
            venueType: 'Khadakwasla backwaters',
          },
          {
            title: 'Sunday morning cycle ride',
            pitch: 'A guided ride on quieter roads with a breakfast stop and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling routes near the university',
          },
          {
            title: 'Garden yoga circle',
            pitch: 'A weekly sunrise yoga session in a city garden, beginner-friendly and free.',
            audience: 'Residents of all fitness levels',
            venueType: 'A city garden or park lawn',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Edtech founders table',
            pitch:
              'A monthly roundtable for edtech founders to share product progress, distribution, and pedagogy lessons.',
            audience: 'Edtech founders and operators',
            venueType: 'A coworking floor in Viman Nagar',
          },
          {
            title: 'Manufacturing tech builders circle',
            pitch:
              'Engineers building factory automation and manufacturing software share progress and collaboration paths.',
            audience: 'Hardware and manufacturing-tech founders',
            venueType: 'A Hinjewadi tech park event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Auto component supplier network evening',
            pitch:
              'Small suppliers and manufacturers in the Pimpri-Chinchwad belt share trends and partnership opportunities.',
            audience: 'Auto-component and manufacturing owners',
            venueType: 'A hotel conference room',
          },
          {
            title: 'Defence tech and aerospace roundtable',
            pitch:
              'Engineers and founders in defence and aerospace share progress and funding paths.',
            audience: 'Deep-tech founders and researchers',
            venueType: 'An innovation centre or institute room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Open-mic poetry and music night',
            pitch:
              'A monthly open mic where poets, musicians, and first-timers share five minutes on stage.',
            audience: 'Writers, musicians, and performers',
            venueType: 'A café stage on FC Road',
          },
          {
            title: 'Marathi theatre discussion circle',
            pitch:
              'A group that watches plays together and discusses the craft, themes, and performances afterwards.',
            audience: 'Theatre lovers and students',
            venueType: 'A theatre hall or rehearsal room',
          },
          {
            title: 'Photography walk through old Pune',
            pitch:
              "A guided photo walk through the old city's lanes, markets, and heritage buildings.",
            audience: 'Amateur and professional photographers',
            venueType: 'Old Pune streets near Tulsi Baug',
          },
          {
            title: 'Short-film screening and feedback circle',
            pitch:
              'Filmmakers screen short works and receive structured, constructive feedback from the audience.',
            audience: 'Student and independent filmmakers',
            venueType: 'A screening room or studio',
          },
          {
            title: 'Design critique evening',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in Viman Nagar',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'River cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a river stretch, with gloves and chai supplied by local groups.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A Mula-Mutha river stretch',
          },
          {
            title: 'Hill conservation trek',
            pitch:
              'A guided trek that combines a Sinhagad walk with light trail maintenance and litter collection.',
            audience: 'Trekkers and nature lovers',
            venueType: 'Sinhagad and the surrounding trails',
          },
          {
            title: 'Traffic and road-safety circle',
            pitch:
              'Commuters and residents share feedback on junctions and bus routes and coordinate constructive advocacy.',
            audience: 'Daily commuters',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Housing and rental rights info evening',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal counselling.',
            audience: 'Renters and tenant organizers',
            venueType: 'An RWA hall or neighbourhood centre',
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
          'Match the category to your interests and the audience you can reach. In Pune, recurring formats with a fixed venue — a café night, a weekend trek, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Punekar to organize?',
        answer:
          'No. Many Pune groups are run by students and newcomers, and the city is famously welcoming. An announcement in English and Marathi usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Pune communities start, and the student energy sustains them. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Pune?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Punekars gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Pune?',
      answer:
        'Yes. Pune has a huge student population, affordable venues, and a strong tradition of clubs and societies. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — FC Road cafés, Koregaon Park, Sinhagad foothills, Hinjewadi tech parks — exists in Pune. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Pune?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Punekars find or start communities.',
    },
  ],
};

export default content;
