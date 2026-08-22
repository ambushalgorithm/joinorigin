import type { CityContent } from '../../types';

/**
 * Sydney content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Sydney's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'sydney',
  intro: [
    "Sydney is Australia's largest city, built around one of the world's most beautiful harbours, and its community life is shaped by beaches, weather, and a relaxed but ambitious professional culture. The city's scenes spread across distinctive areas — the CBD and Barangaroo for business and tech, Surry Hills and Newtown for cafés and creative culture, the inner west for indie music, and the beaches of the east and northern suburbs for outdoor life.",
    "Institutions anchor Sydney's community life: the University of Sydney, UNSW, UTS, and Macquarie University feed a constant stream of students and researchers, while the city's tech scene — home to global companies like Atlassian and Canva — has made it Australia's startup capital. The harbour, the beaches, and the inner-city parks give groups spectacular free venues, and the ferry network makes the water part of everyday life.",
    "For finding or starting a community, Sydney rewards a clear purpose and a good venue: the city's lifestyle culture means people are busy and selective, but groups that offer genuine value and a welcoming tone build loyal followings quickly.",
  ],
  dataPoints: [
    'Roughly 5.6 million residents; the largest city in Australia.',
    'Ferries, trains, and buses connect the harbour city.',
    'Areas with distinct scenes: the CBD, Surry Hills, Newtown, the inner west, and the beaches.',
    'Home to the University of Sydney, UNSW, UTS, and Macquarie University.',
    'Industries: technology, finance, media, and professional services.',
    'Public anchors: Sydney Harbour, Bondi Beach, Centennial Park, and the inner-city parks.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in the CBD and Surry Hills',
        'Startup event floors near Barangaroo and the Rocks',
        'Incubator rooms at UNSW and the University of Sydney',
        'Innovation hubs in the tech district',
        'Cafés with meeting corners in Surry Hills',
        'Hotel conference rooms near Darling Harbour',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Fintech, SaaS, and climate-tech builder circles',
        'Investor office hours at accelerators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, SaaS, climate tech, or health tech — and an English-first name.',
        'Reserve a recurring slot at a CBD or Surry Hills coworking space near a train station.',
        'Run three open meetups, then add a pub dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in Chippendale and the inner west',
        'Live music venues in Newtown and Marrickville',
        'Design studios in Surry Hills and Redfern',
        'Independent cinemas in Newtown and the city',
        'Street-art corners in the inner west',
        'Café stages in Newtown and Glebe',
      ],
      formats: [
        'Indie music showcase nights',
        'Art walk and gallery evenings',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks along the harbour',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, venue, or studio in Newtown or Chippendale to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Council and community centre halls across the local government areas',
        'University seminar rooms at USyd and UNSW',
        'NGO and volunteer centres in the inner city',
        'Public library rooms with civic collections',
        'Coastal and harbour cleanup volunteer points',
        'Neighbourhood association meeting rooms',
      ],
      formats: [
        'Coastal and harbour cleanup volunteer briefings',
        'Housing and rental rights info evenings',
        'Climate and energy action circles',
        'Heritage and public space planning sessions',
        'Volunteer info sessions for community programmes',
      ],
      howToStart: [
        'Pick one concrete local issue — a beach, a park, a housing block — and keep the geography small.',
        'Partner with an existing NGO, council, or community group instead of duplicating work.',
        'Host an open info session at a community centre and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Bondi and Coogee coastal walks',
        'Centennial Park lawns',
        'Harbour foreshore paths from Circular Quay to the Rocks',
        'Cafés in Newtown, Surry Hills, and Glebe',
        "The inner west's breweries and pubs",
        'Beachside parks in the eastern suburbs',
      ],
      formats: [
        'Coastal walk groups along the cliffs',
        'Language exchange tables for newcomers',
        'Sunday morning run clubs',
        'Board game café evenings',
        'Brewery and pub quiz nights',
      ],
      howToStart: [
        'Choose a repeatable format — a coastal walk, a Sunday run — and a fixed meeting point.',
        'Pick a MRT-free but train-accessible spot at Bondi or a Newtown café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        "Market trader networks in the Sydney Fish Market and the farmers' markets",
        'Café and restaurant owner tables in Surry Hills and Newtown',
        'Boutique owner circles in Paddington and the inner west',
        'Design brand studios in Redfern and Alexandria',
        'Craft market stalls at the Rocks Markets',
        'Chamber of commerce and business association rooms',
      ],
      formats: [
        'Café and restaurant owner breakfasts with no agenda',
        'Market vendor planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one shopping strip or market and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and suppliers.',
        'After three breakfasts, rotate one practical topic per month and let the local business network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Sydney's startup scene is Australia's strongest, home to global successes like Atlassian and Canva and a dense ecosystem of founders building fintech, SaaS, climate tech, and health tech. Founders cluster in the CBD, Surry Hills, and the innovation hubs around Barangaroo and the tech precincts, where coworking spaces, accelerators, and university programs at UNSW and the University of Sydney create a tight loop of talent and capital. The city's lifestyle is both a draw and a discipline: founders build globally ambitious companies while keeping the beach-and-barbecue balance that defines Sydney culture. The investor scene is active and approachable, and the government supports startups through grants and programs. The culture is friendly and direct — meetings are relaxed but serious, and people are generous with introductions. English is the working language, and the ecosystem welcomes founders from around the world. Recurring formats include founder breakfasts, pitch evenings, fintech and climate circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue near a station; Sydney's mix of ambition and balance does the rest.",
    creative:
      "Sydney's creative scene blends the polish of a global city with the grit of the inner west. Newtown and Marrickville are the indie heart — live music venues, galleries, and cafés that host everything from punk bands to poetry nights — while Chippendale and Surry Hills hold galleries, design studios, and fashion ateliers. The city's film and television industry is a serious employer, and its music, theatre, and design scenes are internationally connected. The harbour and the beaches give photographers and filmmakers an endlessly inspiring backdrop, and the inner west's street art is among the best in Australia. Art and design schools feed a steady stream of graduates into a professional freelance economy. Common formats include indie showcases, gallery walks, craft markets, and open-mics. Starting a creative community in Sydney is realistic: pick a craft and a venue with an existing audience — Newtown for music, Chippendale for art — and the city's creative energy will pull people in.",
    political:
      "Sydney's civic life is shaped by its harbour city geography and its pressing urban issues: housing affordability, climate, and the protection of green and coastal space. Housing is the defining issue — one of the world's most expensive cities — and tenant, housing, and planning groups run forums, research, and advocacy that are open to newcomers. Climate and energy action is strong, with citizens engaged on renewables, transport, and coastal resilience. The harbour and the beaches generate constant environmental volunteer work — cleanups, water quality monitoring, and coastal care are well-attended across the city. Heritage and public space planning matter in the inner city, where community groups shape the future of parks and precincts. University campuses and research institutes add an evidence-driven layer. The culture rewards genuine participation: showing up to a real meeting and taking on a role matters more than commentary. Starting a political community here means choosing one concrete issue and a small geography — a beach, a park, a housing block — then partnering with the council, NGO, and community structures that already exist. Sydney rewards consistent, visible action.",
    meetup:
      "Sydney's meetup scene is built around the outdoors. The Bondi-to-Coogee coastal walk is the classic weekend format — a group walking the cliffs with swim and coffee stops — and the harbour foreshore paths from Circular Quay to the Rocks attract walkers and photographers year round. Centennial Park and the inner-city parks host running, yoga, and picnic groups, while Newtown, Surry Hills, and Glebe hold the café circuit: book clubs, language exchanges, board game evenings, and freelance coffee mornings. The inner west's breweries and pubs host quiz nights and socials, and Sydney's large international community keeps English-speaking groups plentiful and welcoming. The weather makes outdoor formats viable most of the year, and the ferry network adds a uniquely Sydney way to gather — a group meeting at a wharf and riding together. Groups here tend to be friendly and balanced, matching the city's lifestyle culture. Starting a meetup is realistic: pick a repeatable format — a coastal walk, a Sunday run — and a fixed meeting point near transport, run three sessions at the same time and place, and Sydney's energy will take over.",
    'small-business':
      "Sydney's small business community spans the city's markets, its café culture, and a fast-growing layer of digital brands. Surry Hills and Newtown cafés and restaurants run on a tight F&B community that swaps landlord stories, staffing playbooks, and supplier contacts — the inner city is one of Australia's densest hospitality scenes. Paddington's boutiques, the design studios of Redfern and Alexandria, and the craft stalls of the Rocks Markets form a creative-retail layer with its own networks. The Sydney Fish Market and the farmers' markets connect food businesses to producers and buyers. The chamber of commerce and business associations run practical clinics on digitalisation, e-commerce, and hiring. What holds these groups together is geography and taste: a strip or a market shares customers, foot traffic, and the same trend cycle. Starting a small business community in Sydney is very achievable — a monthly breakfast for owners on one street, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Sydney is a wonderful city for community event ideas: the harbour and the beaches are free and spectacular, the cafés are everywhere, and the lifestyle culture means people make time for good events. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Sydney, from the Bondi coastal walk and Centennial Park to Newtown cafés and CBD coworking floors. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Sydney's energy do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Harbour foreshore newcomer walk',
            pitch:
              'An afternoon walk from Circular Quay where newcomers and long-time Sydneysiders trade city tips and work stories.',
            audience: 'New arrivals and walkers',
            venueType: 'Harbour foreshore paths',
          },
          {
            title: 'Surry Hills founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Sydney',
            venueType: 'A café in Surry Hills',
          },
          {
            title: 'Newtown meet-and-greet',
            pitch:
              'A low-pressure evening with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in Newtown',
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
            venueType: 'A coworking café in Glebe',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'English conversation table for newcomers',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers building English confidence',
            venueType: 'A community centre or café',
          },
          {
            title: 'Surf skills and ocean safety basics',
            pitch:
              'A friendly introduction to surf awareness, board basics, and ocean safety with experienced surfers.',
            audience: 'Beach lovers and beginners',
            venueType: 'A beachside surf club or community room',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking or incubator event room',
          },
          {
            title: 'Native garden and balcony growing',
            pitch: 'Hands-on sessions on growing native plants and food in small spaces.',
            audience: 'Urban gardeners',
            venueType: 'A community garden or nursery',
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
            title: 'Bondi to Coogee coastal walk',
            pitch: 'A friendly group walk along the cliffs with swim and coffee stops.',
            audience: 'Walkers of every level',
            venueType: 'The Bondi–Coogee coastal path',
          },
          {
            title: 'Centennial Park picnic and games',
            pitch: 'Blankets, frisbee, and snacks in the park, with a rotating potluck theme.',
            audience: 'Families and friend groups',
            venueType: 'Centennial Park lawns',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in Newtown',
          },
          {
            title: 'Sunday morning run club',
            pitch:
              'A friendly, all-paces group run along the harbour or the park, followed by coffee.',
            audience: 'Runners of every level',
            venueType: 'Harbour or Centennial Park paths',
          },
          {
            title: 'Inner west brewery and pub quiz night',
            pitch: 'A monthly pub quiz where regulars and newcomers team up in the inner west.',
            audience: 'Quiz lovers and neighbours',
            venueType: 'A brewery or pub in Marrickville or Newtown',
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
            venueType: 'A coworking floor in the CBD',
          },
          {
            title: 'Climate tech builders circle',
            pitch:
              'Founders building climate and energy products share progress, partnerships, and funding paths.',
            audience: 'Climate tech founders and operators',
            venueType: 'A coworking event room in Surry Hills',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Health tech and medtech meetup',
            pitch:
              'Professionals in health tech and medical technology share trends and collaboration.',
            audience: 'Health tech professionals and founders',
            venueType: 'A university or innovation hub room',
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
            title: 'Newtown indie music night',
            pitch:
              'A monthly open stage for indie bands, solo artists, and first-timers in the inner west.',
            audience: 'Musicians and music lovers',
            venueType: 'A live music venue in Newtown',
          },
          {
            title: 'Chippendale gallery walk',
            pitch:
              'A guided evening walk through the galleries, with artist talks at select stops.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Chippendale and Surry Hills galleries',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Newtown',
          },
          {
            title: 'Harbour photo walk',
            pitch:
              'A guided photo walk around the harbour with tips on light, composition, and the ferry fleet.',
            audience: 'Amateur and professional photographers',
            venueType: 'Harbour foreshore and ferry wharves',
          },
          {
            title: 'Design and craft market day',
            pitch:
              'Local designers and makers sell and tell the stories behind their work at a friendly market.',
            audience: 'Makers, designers, and shoppers',
            venueType: 'The Rocks Markets or a community space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a beach stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A beach in the eastern suburbs or the harbour',
          },
          {
            title: 'Harbour foreshore care day',
            pitch:
              'Volunteers help maintain a harbour foreshore stretch — planting, cleanup, and weeding.',
            audience: 'Neighbours and nature lovers',
            venueType: 'A harbour foreshore reserve',
          },
          {
            title: 'Housing and rental rights info evening',
            pitch:
              'A plain-language session on bonds, leases, and where to get free advice in a tough rental market.',
            audience: 'Renters and young professionals',
            venueType: 'A community centre or library room',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or shared green space',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and café owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbours and small business owners',
            venueType: 'A local café or community hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Sydney, recurring formats with a fixed venue — a coastal walk, a Sunday run, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to be a long-time Sydneysider to organize?',
        answer:
          'No. Many Sydney groups are run by newcomers, and the city welcomes them. A clear announcement with a friendly tone is all you need to start.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Sydney communities start, and the lifestyle culture rewards consistency. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Sydney?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Sydneysiders gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Sydney?',
      answer:
        'Yes. Sydney has a strong startup scene, a deep creative culture, and spectacular free venues. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Bondi coastal walk, Centennial Park, Newtown cafés, the Rocks Markets — exists in Sydney. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Sydney?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Sydneysiders find or start communities.',
    },
  ],
};

export default content;
