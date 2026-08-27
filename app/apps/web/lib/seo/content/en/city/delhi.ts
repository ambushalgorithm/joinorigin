import type { CityContent } from '../../types';

/**
 * Delhi content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Delhi's real districts, institutions, and gathering culture. Honest,
 * evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'delhi',
  intro: [
    "Delhi is the national capital and a city of layered histories, where medieval monuments sit beside modern malls and a vast metro system ties the region together. The city's social energy is spread across distinct pockets — Connaught Place and Hauz Khas Village for cafes and startups, Shahpur Jat and Lado Sarai for designers and artisans, and the university hubs of North and South Campus for students and young organizers.",
    "Delhi's institutions shape its community life: Delhi University, JNU, IIT Delhi, and Jamia Millia Islamia produce a constant stream of students, researchers, and activists, while government, media, and NGO work draw people with a civic purpose. The city's parks — Lodhi Garden, Nehru Park, the Yamuna floodplain — host morning walking groups, yoga circles, and weekend picnics.",
    "For finding or starting an Origin, Delhi rewards organizers who pick a clear neighbourhood and a clear purpose. The metro makes cross-city attendance easier than it looks, and the city's culture of debate means a well-framed topic reliably fills a room.",
  ],
  dataPoints: [
    'Roughly 11 million residents in the city; the national capital of India.',
    'Metro network connects most neighbourhoods and extends into the NCR.',
    'Districts with distinct scenes: Connaught Place, Hauz Khas, Shahpur Jat, Lajpat Nagar.',
    'Home to Delhi University, JNU, IIT Delhi, and Jamia Millia Islamia.',
    'Industries: government, media, tech, design, and NGOs.',
    'Public anchors: Lodhi Garden, India Gate, Nehru Park, and the Yamuna riverfront.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Connaught Place and Nehru Place',
        'Incubator rooms at IIT Delhi and NSUT',
        'Cafés with meeting corners in Hauz Khas Village',
        'Accelerator event floors in Cyber City and Gurugram',
        'Hotel conference halls in Aerocity',
        'Tech park auditoriums in Noida and Gurugram',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo nights',
        'Deep-tech and AI builder circles',
        'Government policy and startup regulation talks',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — deep tech, edtech, AI builders, or policy — and a clear English-first name.',
        'Reserve a recurring slot at a Connaught Place or Hauz Khas coworking space with metro access.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Design studios in Shahpur Jat and Lado Sarai',
        'Galleries in Hauz Khas Village',
        'Theatre spaces at Mandi House and Shri Ram Centre',
        'Artist residencies in Khirki and Okhla',
        'Craft workshops in Dilli Haat',
        'Café stages in Humayunpur and Green Park',
      ],
      formats: [
        'Open-mic poetry and spoken word nights',
        'Design and craft market weekends',
        'Theatre workshops and staged readings',
        'Photography walks through Old Delhi',
        'Artist talks in gallery courtyards',
      ],
      howToStart: [
        'Choose a craft — writing, theatre, design, film — and a regular evening slot.',
        'Partner with a gallery, theatre, or studio in Hauz Khas or Shahpur Jat to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Community centre halls across the districts',
        'University seminar rooms at JNU and DU',
        'RWA (resident welfare) meeting halls',
        'NGO and activist offices in Lajpat Nagar and Jangpura',
        'Protest sites and park corners with a history of assembly',
        'Library reading rooms with civic collections',
      ],
      formats: [
        'Issue-based town halls with local councillors',
        'Air quality and environment planning sessions',
        'Housing and tenant rights info evenings',
        'Voter awareness and registration drives',
        'Public space and park restoration planning',
      ],
      howToStart: [
        'Pick one concrete local issue — air quality, a park, a street, a ward — and keep the geography small.',
        'Partner with an existing RWA, NGO, or university group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Lodhi Garden lawns and walking paths',
        'Cafés in Hauz Khas Village with outdoor terraces',
        'India Gate lawns for evening picnics',
        'Dilli Haat food and craft corners',
        'Book cafés and library halls in South Delhi',
        'Yamuna riverfront green areas',
      ],
      formats: [
        'Morning walking and yoga circles in Lodhi Garden',
        'Old Delhi heritage food walks',
        'Board game and cards evenings at cafés',
        'Language exchange tables for new arrivals',
        'Weekend cycling rides on quieter roads',
      ],
      howToStart: [
        'Choose a repeatable format — a morning walk, a monthly food walk — and a fixed starting point.',
        'Pick a Lodhi Garden gate or a Hauz Khas café that is easy to reach by metro.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market association halls in Chandni Chowk and Karol Bagh',
        'Boutique and designer studio circles in Shahpur Jat',
        'Café back rooms for owner breakfasts',
        'Trade association rooms in Lajpat Nagar',
        'Craft bazaar stalls at Dilli Haat',
        'Chamber of commerce seminar rooms',
      ],
      formats: [
        'Market merchant breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and GST clinics',
        'Shared procurement circles for supplies',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one market or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, taxes, and festivals.',
        'After three breakfasts, rotate one practical topic per month and let the market association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Delhi's startup scene has grown into one of India's most significant, with particular strength in edtech, consumer brands, and enterprise software, and a long tail of deep-tech and AI builders around IIT Delhi. Founders cluster in Connaught Place, Nehru Place, and the wider NCR corridor — Gurugram and Noida — where coworking spaces, accelerators, and university programs create a dense loop of talent and capital. Being the capital has advantages: policy makers, media, and large enterprise buyers are all nearby, and events regularly mix startup pitches with government and regulation conversations. The culture is fast and confident — meetings are direct, ambition is loud, and founders are comfortable telling you how big they plan to be. Recurring formats include founder breakfasts, pitch evenings, and deep-tech builder circles. Starting a startup Origin here works best with a narrow vertical and a fixed venue with metro access; Delhi's density of ambitious operators does the rest.",
    creative:
      "Delhi's creative scene blends tradition and experiment: Old Delhi's craft bazaars, Dilli Haat's artisans, and the designer studios of Shahpur Jat and Lado Sarai sit alongside a restless generation of writers, filmmakers, and theatre makers. Mandi House is the city's theatre district, while Hauz Khas Village and Humayunpur host galleries, open-mics, and café stages. The city's design schools and universities feed a steady pipeline of graduates into a freelance economy built on commissions, festivals, and collaboration. Street culture is visible too — poetry open-mics, indie film screenings, and craft markets fill the calendar year round. Common formats include open-mic nights, staged readings, photography walks, and craft market weekends. Because rent varies hugely across the city, communities often meet in cafés, gallery courtyards, and college halls rather than dedicated studios. Starting a creative Origin in Delhi is realistic: pick a craft and a neighbourhood with an existing audience, and the city's appetite for expression will pull people in.",
    political:
      "Delhi is India's political capital, and its civic life reflects that — resident welfare associations, university activism, NGO networks, and issue-based movements all operate within a few kilometres of each other. Air quality is the defining local issue: citizen groups, university researchers, and environment NGOs hold planning sessions, monitor pollution data, and push for park restoration and clean-energy policies. Housing and tenant rights are active fronts in a city with high rents and complex land records, and RWAs run everything from park maintenance to security coordination. University campuses — JNU, Delhi University, Jamia — host debates, seminars, and campaigns that are open to the public. The culture rewards articulation and persistence: showing up to a real meeting and making a clear argument matters more than online commentary. Starting a political Origin means choosing one concrete issue and a small geography, then partnering with the RWA and NGO networks that already exist. Delhi's density of engaged people makes it one of the easiest Indian cities to start a civic group.",
    meetup:
      "Delhi's meetup scene is diverse and surprisingly warm once you find your pocket. Lodhi Garden and Nehru Park host morning walking, running, and yoga circles that run year round; India Gate's lawns fill with families and friends on weekend evenings. Old Delhi is the food walk capital of the city — spice markets, paranthe lanes, and sweets shops make a perfect guided route. South Delhi's cafés in Hauz Khas Village, Green Park, and Humayunpur host book clubs, language exchanges, board game evenings, and freelance coffee mornings. The metro has transformed attendance — groups that used to be local now draw from across the NCR. Groups here tend to be intentional: they choose a topic, a venue, and a time and stick with it, because the commute rewards reliability. Starting a meetup is realistic: pick a repeatable format and a fixed point reachable by metro, run three sessions at the same time and place, and let Delhi's density of curious people take over.",
    'small-business':
      "Delhi's small business community spans centuries-old bazaars and a fast-growing new economy of boutiques, cafés, and D2C brands. Chandni Chowk and Karol Bagh merchant associations manage festival stalls, shared logistics, and collective voice on rent and regulation, giving new owners a ready-made network. South Delhi's designer studios in Shahpur Jat and Lajpat Nagar's boutiques form a second layer of creative entrepreneurs who meet to swap sourcing contacts, influencer tips, and festival-season plans. The city's craft ecosystem — Dilli Haat, Dastkar, export houses — connects artisans with designers and buyers in a way few Indian cities can match. Trade bodies and the chamber of commerce run practical clinics on GST, digital payments, and exports. What holds these groups together is market geography: a corridor shares customers, foot traffic, and the same festival calendar. Starting a small business Origin in Delhi is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Delhi rewards event ideas that are specific and well-planned — the metro makes cross-city attendance easy, and residents show up when something is real. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Delhi, from Lodhi Garden lawns and Old Delhi food lanes to Hauz Khas Village cafés and Mandi House theatres. Some ideas work as one-off events; others are designed to become recurring Origins with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue with metro access, and let Delhi's appetite for conversation do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Lodhi Garden morning circle',
            pitch:
              'A sunrise walk through the gardens where newcomers and long-time Delhi residents trade city tips and work stories.',
            audience: 'New arrivals and morning people',
            venueType: 'Lodhi Garden',
          },
          {
            title: 'Connaught Place founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday.",
            audience: 'Startup founders in Delhi',
            venueType: 'A café near Connaught Place',
          },
          {
            title: 'Hauz Khas Village meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives in South Delhi',
            venueType: 'A café terrace in Hauz Khas Village',
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
            venueType: 'A café with long tables in Green Park',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Hindi conversation table',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning Hindi',
            venueType: 'A community hall or café',
          },
          {
            title: 'Personal finance and taxation basics',
            pitch:
              'A practical session on income tax filing, investments, and reading payslips for young professionals.',
            audience: 'First-time earners and freelancers',
            venueType: 'A coworking event room',
          },
          {
            title: 'Public speaking and debate workshop',
            pitch:
              "Structured practice rounds with constructive feedback, building on Delhi's culture of debate.",
            audience: 'Students and young professionals',
            venueType: 'A college hall or library room',
          },
          {
            title: 'Heritage walk leader training',
            pitch:
              'Experienced walk leaders teach the craft of guiding Old Delhi heritage tours accurately and engagingly.',
            audience: 'History enthusiasts and tour guides',
            venueType: 'A heritage society meeting room',
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
            title: 'India Gate evening picnic',
            pitch: 'Blankets, snacks, and conversation on the lawns as the city lights come up.',
            audience: 'Families, couples, and friend groups',
            venueType: 'India Gate lawns',
          },
          {
            title: 'Old Delhi heritage food walk',
            pitch:
              'A guided walk through spice markets, paranthe lanes, and sweets shops with the stories behind each stop.',
            audience: 'Food lovers and history buffs',
            venueType: 'Old Delhi lanes near Chandni Chowk',
          },
          {
            title: 'Weekend cycling ride',
            pitch: 'A guided morning ride on quieter roads with breakfast stops and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling routes and park paths',
          },
          {
            title: 'Board game night at a South Delhi café',
            pitch:
              'A weekly stack of board games at a café that welcomes slow evenings and loud laughter.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A café in Hauz Khas or Green Park',
          },
          {
            title: 'Yoga in the park',
            pitch: 'A weekly sunrise yoga session on the lawns, beginner-friendly and free.',
            audience: 'Residents of all fitness levels',
            venueType: 'Lodhi Garden or Nehru Park',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Edtech founders table',
            pitch:
              'A monthly roundtable for edtech founders to share product progress and regulatory lessons.',
            audience: 'Edtech founders and operators',
            venueType: 'A coworking floor near Nehru Place',
          },
          {
            title: 'Deep-tech and AI builders circle',
            pitch:
              'Engineers and researchers share work-in-progress and discuss the practical side of building AI products.',
            audience: 'AI and deep-tech builders',
            venueType: 'An IIT Delhi or coworking event room',
          },
          {
            title: 'Policy meets startup evening',
            pitch:
              'Founders, policy researchers, and government technologists discuss regulation and innovation over dinner.',
            audience: 'Founders and policy professionals',
            venueType: 'A hotel lounge or institute hall',
          },
          {
            title: 'Journalism and media pitch lab',
            pitch:
              'Writers and journalists pitch story ideas and get honest editorial feedback from peers.',
            audience: 'Freelance journalists and media students',
            venueType: 'A newsroom or college classroom',
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
            title: 'Hauz Khas gallery walk',
            pitch:
              "A guided evening walk through the village's galleries with artist talks at select stops.",
            audience: 'Art lovers and curious visitors',
            venueType: 'Hauz Khas Village galleries',
          },
          {
            title: 'Open-mic poetry night',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage or small theatre space',
          },
          {
            title: 'Craft market weekend',
            pitch:
              'Local designers and artisans sell and tell the stories behind their work in a friendly weekend market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'Dilli Haat or a gallery courtyard',
          },
          {
            title: 'Staged reading circle',
            pitch:
              'Playwrights and actors read new scripts aloud and workshop them with audience feedback.',
            audience: 'Theatre makers and writers',
            venueType: 'Mandi House or a rehearsal room',
          },
          {
            title: 'Photography walk through Old Delhi',
            pitch:
              "A guided photo walk through the old city's lanes, markets, and monuments with composition tips.",
            audience: 'Amateur and professional photographers',
            venueType: 'Old Delhi streets near Chandni Chowk',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Air quality action circle',
            pitch:
              'Residents plan park restoration, tree planting, and clean-air advocacy for their own neighbourhood.',
            audience: 'Residents concerned about pollution',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Park restoration volunteer morning',
            pitch:
              'A Saturday morning session restoring a local park — planting, cleanup, and simple repairs.',
            audience: 'Neighbours and first-time volunteers',
            venueType: 'A local park or green space',
          },
          {
            title: 'Housing and tenant rights info evening',
            pitch:
              'A plain-language session on leases, rent agreements, and where to get free legal counselling.',
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
          'Match the category to your interests and the audience you can reach. In Delhi, recurring formats with a fixed venue and metro access — a morning walk, a weekly breakfast, a monthly food walk — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Delhiite to organize?',
        answer:
          "No. Many Delhi groups are run by recent arrivals, and the city's universities and workplaces welcome newcomers. A bilingual announcement in English and Hindi usually doubles your reach.",
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Delhi Origins start, and the metro makes it easy for people to commit to a weekly session. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Delhi?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real districts, venues, and formats where Delhiites gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Delhi?',
      answer:
        'Yes. Delhi has deep social energy, a strong culture of debate, and a metro that makes cross-city events practical. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Lodhi Garden, Hauz Khas Village, Dilli Haat, Old Delhi lanes, community centres — exists in Delhi. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Delhi?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Delhiites find or start Origins.',
    },
  ],
};

export default content;
