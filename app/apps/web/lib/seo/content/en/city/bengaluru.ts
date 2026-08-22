import type { CityContent } from '../../types';

/**
 * Bengaluru content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Bengaluru's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'bengaluru',
  intro: [
    "Bengaluru is India's startup and technology capital, a city where a huge share of the workforce builds software, and where communities form around products, problems, and pub tables. The IT corridors of Whitefield, Electronic City, and Outer Ring Road run on engineering teams, while older neighbourhoods — Indiranagar, Koramangala, HSR Layout, Jayanagar — hold the cafés, breweries, and coworking floors where those teams meet after work.",
    "The city's institutions anchor its community life: IISc, IIM Bangalore, and the many engineering colleges feed a constant stream of students and researchers, while ISRO and public-sector labs give the city a serious scientific culture. Cubbon Park, Lalbagh, and the lake network — Ulsoor, Sankey, Agara — host morning walkers, runners, birdwatchers, and weekend picnics.",
    "For finding or starting a community, Bengaluru rewards specificity and a good venue: choose a neighbourhood that fits your group, pick a format people can attend after work, and the city's density of curious professionals will do the rest.",
  ],
  dataPoints: [
    'Roughly 8.5 million residents; the technology and startup capital of India.',
    'Namma Metro and the ORR connect the main tech corridors.',
    'Districts with distinct scenes: Indiranagar, Koramangala, HSR Layout, Whitefield, Jayanagar.',
    'Home to IISc, IIM Bangalore, and dozens of engineering colleges.',
    'Industries: software, startups, aerospace, biotech, and research.',
    'Public anchors: Cubbon Park, Lalbagh, and the city lake network.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Indiranagar and Koramangala',
        'Startup event floors in HSR Layout and ORR tech parks',
        'Incubator rooms at IISc and IIM Bangalore',
        'Brewery back rooms for founder evenings',
        'Cafés with meeting corners in Indiranagar',
        'Community halls in Whitefield',
      ],
      formats: [
        'Founder breakfasts with rapid round intros',
        'Pitch evenings and demo nights',
        'SaaS and developer-tools builder circles',
        'Angel investor office hours',
        'Weekend hackathons at tech parks',
      ],
      howToStart: [
        'Pick a narrow vertical — SaaS, dev tools, deep tech, or climate — and an English-first name.',
        'Reserve a recurring slot at a Koramangala or HSR coworking space with metro or cab access.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Art galleries in Indiranagar and Lavelle Road',
        'Live-music venues on MG Road and Church Street',
        'Design studios in Koramangala',
        'Independent theatres in Malleshwaram and Basavanagudi',
        'Street-art corners in Chikkpete and Richmond Town',
        'Café stages in Indiranagar',
      ],
      formats: [
        'Open-mic poetry and music nights',
        'Indie film screenings and director Q&As',
        'Design critique evenings',
        'Photography walks through old Bengaluru',
        'Craft and flea market weekends',
      ],
      howToStart: [
        'Choose a craft — music, design, film, writing — and a regular evening slot.',
        'Partner with a gallery, venue, or studio on Church Street or Indiranagar to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Ward committee and BBMP meeting rooms',
        'Lake restoration volunteer points',
        'RWA (resident welfare) halls across the layouts',
        'University seminar rooms at IISc and IIM',
        'NGO offices in Jayanagar and Malleshwaram',
        'Tree-walk and park group meeting spots',
      ],
      formats: [
        'Lake and park restoration planning sessions',
        'Traffic and commute advocacy meetings',
        'Housing and rental rights info evenings',
        'Voter awareness and ward-level drives',
        'Climate action circles with local corporators',
      ],
      howToStart: [
        'Pick one concrete local issue — a lake, a park, a traffic junction, a ward — and keep the geography small.',
        'Partner with an existing lake group, RWA, or NGO instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Cubbon Park lawns and walking paths',
        'Lalbagh gardens and glasshouse grounds',
        'Breweries and taprooms in Indiranagar and Koramangala',
        'Cafés on Church Street and 100 Feet Road',
        'Lakefront paths at Sankey and Agara',
        'Book cafés in Jayanagar',
      ],
      formats: [
        'Morning walking and birdwatching circles in Cubbon Park',
        'Brewery board game nights',
        'Language exchange tables for new arrivals',
        'Weekend cycling rides on quieter roads',
        'Potluck picnics by the lakes',
      ],
      howToStart: [
        'Choose a repeatable format — a morning walk, a brewery game night — and a fixed venue.',
        'Pick a Cubbon Park gate or an Indiranagar brewery that is easy to reach after work.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Boutique and studio circles in Indiranagar and Jayanagar',
        'Brewery and restaurant owner tables',
        'Café back rooms for owner breakfasts',
        'Craft bazaar stalls at community markets',
        'Commercial street merchant association halls',
        'Trade association seminar rooms',
      ],
      formats: [
        'F&B owner breakfasts with no agenda',
        'D2C and retail brand clinics',
        'Digital payments and GST workshops',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one commercial street or café cluster and a venue that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to vent about rent, staff, and delivery platforms.',
        'After three breakfasts, rotate one practical topic per month and let the merchant network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Bengaluru is widely called India's startup capital, and the label fits: the city's IT ecosystem, engineering talent, and venture capital density are unmatched in the country. Founders and engineers cluster in Indiranagar, Koramangala, HSR Layout, and the Outer Ring Road corridor, where coworking spaces, accelerators, and incubators at IISc and IIM Bangalore create a dense loop of talent and capital. The developer culture is a defining feature — Bengaluru is home to some of India's largest developer communities, with regular meetups, conferences, and hackathons around specific languages and tools. The city's famous breweries and cafés double as informal venues where founders and engineers trade war stories after work. The culture is collaborative and technically deep; meetings are practical, and people are generous with introductions. Recurring formats include founder breakfasts, pitch evenings, SaaS and developer-tools circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue; the density of ambitious technical people does the rest.",
    creative:
      "Bengaluru's creative scene has grown far beyond its tech reputation, with a lively independent music, art, and design culture. Church Street and MG Road anchor the live-music circuit — indie bands, jazz nights, and open-mics fill small venues most weeks of the year. Indiranagar's galleries and cafés host art shows, design talks, and poetry nights, while Koramangala's studios feed a fast-growing freelance design and film economy. The city's old neighbourhoods — Malleshwaram, Basavanagudi, Chikkpete — preserve craft traditions and heritage walks that connect new residents with Bengaluru's past. Independent theatres and film collectives screen local and international work, and flea markets in the city parks give makers a stage. Common formats include open-mic nights, screenings, design critiques, and photography walks. Starting a creative community in Bengaluru is realistic: pick a craft and a neighbourhood with an existing audience, and the city's mix of talent and curiosity will pull people in.",
    political:
      "Bengaluru's civic life is defined by growth and its pressures: traffic, lakes, parks, and housing shape the city's political conversations. The city's famous lake restoration movement — citizen groups, residents' welfare associations, and volunteers who adopted dying lakes — is one of India's most visible examples of community-led environmental action. Tree walks, birdwatching groups, and park adoption programmes give residents a practical, non-partisan entry into civic life. Traffic and public transport are constant topics, with commuters organizing carpool circles, metro advocacy, and road-safety campaigns. Housing and rental rights matter in a city where tech workers and migrants push rents up year after year. University campuses and research labs add a policy-savvy layer to the scene. Starting a political community here means choosing one concrete issue and a small geography — a lake, a ward, a junction — then partnering with the RWA and volunteer networks that already exist. Bengaluru rewards visible, consistent action.",
    meetup:
      "Bengaluru's meetup scene is one of India's most active, powered by a young, mobile workforce and a café-and-brewery culture that loves a gathering. Cubbon Park and Lalbagh host morning walking, running, and birdwatching circles that run year round, and the city's lakes — Sankey, Ulsoor, Agara — attract picnic and fitness groups on weekends. The brewery scene is a genuine social anchor: Indiranagar and Koramangala taprooms host board game nights, trivia evenings, and speed-friending events. Book clubs, language exchanges, and freelance coffee mornings fill Church Street cafés, and cycling groups take over quieter roads early on Sunday mornings. Because so many people moved to the city for work, newcomers are common, and groups are used to welcoming them. Groups here tend to be specific and well-run, matching the city's professional culture. Starting a meetup is realistic: pick a repeatable format and a fixed venue reachable by metro or cab, run three sessions at the same time and place, and let Bengaluru's density of curious people take over.",
    'small-business':
      "Bengaluru's small business community has two distinct faces: the city's commercial streets — Commercial Street, Jayanagar's shopping blocks, Indiranagar's 100 Feet Road — and the new economy of breweries, cafés, boutiques, and D2C brands that grew up around the tech workforce. Restaurant and brewery owners form a tight community that swaps landlord stories, staffing playbooks, and delivery-platform strategies over late-night plates. Boutique owners and independent designers in Indiranagar and Jayanagar meet in café back rooms to coordinate festival-season collections and shared sourcing. The city's craft markets — from flea markets in the parks to annual design bazaars — give small makers a low-risk stage. Trade associations and the chamber of commerce run practical clinics on GST, licensing, and digital payments. What holds these groups together is geography: a street or a cluster shares customers, foot traffic, and the same festival calendar. Starting a small business community in Bengaluru is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Bengaluru is an ideal city for testing community event ideas: the workforce is young and mobile, the café and brewery scene is built for gatherings, and parks and lakes give groups free outdoor venues. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Bengaluru, from Cubbon Park lawns and brewery taprooms to coworking floors in Koramangala and Church Street cafés. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Bengaluru's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Cubbon Park morning walk circle',
            pitch:
              'A sunrise walk through the park where newcomers and long-time Bengaluru residents trade city tips and work stories.',
            audience: 'New arrivals and morning people',
            venueType: 'Cubbon Park',
          },
          {
            title: 'Koramangala founder breakfast',
            pitch:
              "A 45-minute breakfast where founders and operators share the week's wins and blockers before the workday.",
            audience: 'Startup founders in Bengaluru',
            venueType: 'A café in Koramangala',
          },
          {
            title: 'Indiranagar brewery meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals in the tech corridors',
            venueType: 'A brewery taproom in Indiranagar',
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
            venueType: 'A café with long tables on Church Street',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Kannada conversation table',
            pitch:
              'Small tables by level, one native speaker per table, and a rule that mistakes are welcome.',
            audience: 'New arrivals learning Kannada',
            venueType: 'A community hall or café',
          },
          {
            title: 'Startup finance in plain language',
            pitch:
              'A practical workshop on unit economics, cap tables, and runway for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking event room',
          },
          {
            title: 'Gardening and balcony farming workshop',
            pitch:
              'Hands-on sessions on growing vegetables and herbs in small Bengaluru balconies.',
            audience: 'Urban gardeners',
            venueType: 'Lalbagh or a community garden',
          },
          {
            title: 'Public speaking and pitching practice',
            pitch:
              'Structured practice rounds with constructive feedback for people who speak at meetups and in meetings.',
            audience: 'Founders, students, and professionals',
            venueType: 'A college hall or library room',
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
            title: 'Lalbagh weekend picnic and games',
            pitch:
              'Blankets, board games, and potluck snacks in the gardens, with a flower-show calendar handy.',
            audience: 'Families and friend groups',
            venueType: 'Lalbagh Botanical Garden',
          },
          {
            title: 'Brewery board game night',
            pitch:
              'A weekly stack of board games at a taproom that welcomes slow evenings and loud laughter.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A brewery taproom in Indiranagar',
          },
          {
            title: 'Sunday morning cycle ride',
            pitch: 'A guided ride on quieter roads with a breakfast stop and a fixed pace.',
            audience: 'Leisure cyclists',
            venueType: 'City cycling routes near Cubbon Park',
          },
          {
            title: 'Lakefront birdwatching walk',
            pitch:
              'A gentle morning walk around a lake with an experienced birder pointing out residents and migrants.',
            audience: 'Beginner birdwatchers',
            venueType: 'Sankey Tank or Agara Lake path',
          },
          {
            title: 'Potluck picnic by the lake',
            pitch: 'A rotating potluck on the grass with games, music, and a sunset view.',
            audience: 'Residents of nearby layouts',
            venueType: 'Ulsoor Lake lawns',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'SaaS founders table',
            pitch:
              'A monthly roundtable for SaaS founders to share product progress, pricing, and growth lessons.',
            audience: 'SaaS founders and operators',
            venueType: 'A coworking floor in HSR Layout',
          },
          {
            title: 'Developer tools builders circle',
            pitch:
              'Engineers building dev tools discuss distribution, documentation, and community-led growth.',
            audience: 'Dev-tool founders and maintainers',
            venueType: 'A tech park event room on ORR',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Angel investing 101 for operators',
            pitch:
              'Experienced angels teach the practical side of early-stage investing to operators who want to back founders.',
            audience: 'Aspiring angel investors',
            venueType: 'A hotel lounge or incubator hall',
          },
          {
            title: 'Aerospace and deep-tech roundtable',
            pitch:
              'Engineers and researchers in aerospace, biotech, and deep tech share progress and funding paths.',
            audience: 'Deep-tech founders and researchers',
            venueType: 'An IISc or innovation centre room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Church Street live-music open night',
            pitch:
              "A monthly open stage for indie bands, solo artists, and first-timers in the city's music district.",
            audience: 'Musicians and music lovers',
            venueType: 'A live-music venue on Church Street',
          },
          {
            title: 'Open-mic poetry night',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Indiranagar',
          },
          {
            title: 'Design critique evening',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in Koramangala',
          },
          {
            title: 'Photography walk through old Bengaluru',
            pitch:
              'A guided photo walk through Malleshwaram and Basavanagudi with tips on light and composition.',
            audience: 'Amateur and professional photographers',
            venueType: 'Old Bengaluru neighbourhoods',
          },
          {
            title: 'Indie film screening and Q&A',
            pitch:
              'Independent filmmakers screen short work and answer audience questions about the craft.',
            audience: 'Film lovers and student filmmakers',
            venueType: 'An indie theatre or screening room',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Lake restoration volunteer morning',
            pitch:
              'A Saturday morning session supporting an adopted lake — planting, cleanup, and simple upkeep.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A chosen lake in the city',
          },
          {
            title: 'Tree walk and canopy mapping',
            pitch:
              "A guided walk that maps and documents old trees, building the city's tree census one street at a time.",
            audience: 'Nature lovers and citizen scientists',
            venueType: 'Cubbon Park or a heritage avenue',
          },
          {
            title: 'Traffic and commute advocacy circle',
            pitch:
              'Commuters share feedback on roads and metro and coordinate polite, constructive advocacy.',
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
          'Match the category to your interests and the audience you can reach. In Bengaluru, recurring formats with a fixed venue — a morning walk, a brewery game night, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Bengalurean to organize?',
        answer:
          'No. Many Bengaluru groups are run by newcomers, and the city is used to welcoming transplants from across India. An announcement in English and Kannada usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Bengaluru communities start, and the café and brewery culture gives you proven venues. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Bengaluru?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Bengalureans gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Bengaluru?',
      answer:
        'Yes. Bengaluru has a young, mobile population, a strong café and brewery culture, and a dense professional network. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Cubbon Park, Lalbagh, brewery taprooms, Church Street cafés, tech park event rooms — exists in Bengaluru. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Bengaluru?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Bengalureans find or start communities.',
    },
  ],
};

export default content;
