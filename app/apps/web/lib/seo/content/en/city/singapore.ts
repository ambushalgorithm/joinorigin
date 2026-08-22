import type { CityContent } from '../../types';

/**
 * Singapore content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from every other authored city file (G5): grounded in
 * Singapore's real districts, institutions, and gathering culture.
 * Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'singapore',
  intro: [
    "Singapore is a compact island city-state that packs a global financial hub, a serious tech ecosystem, and a famously multiracial food culture into one small, efficient package. The city's communities spread across distinctive areas — the CBD and Marina Bay for finance and corporate life, Tanjong Pagar and Tiong Bahru for cafés and creative culture, Bugis and Kampong Glam for the arts, and the HDB heartlands of the heartland towns for neighbourhood life.",
    "Institutions anchor Singapore's community life: NUS, NTU, SMU, and a cluster of other universities feed a constant stream of students and researchers, while the government's support for innovation — through agencies and grants — makes the city one of Asia's most startup-friendly. The MRT makes everything reachable, and the island's parks, the Southern Ridges, and the many hawker centres give groups free and easy venues.",
    'For finding or starting a community, Singapore rewards organisation and genuine connection: the city runs on efficiency, so well-planned events win, and the hawker centre — a shared table over good food — is the fastest way to build belonging.',
  ],
  dataPoints: [
    'Roughly 5.6 million residents; a global financial and technology hub.',
    'MRT network and buses make the compact island easy to cross.',
    'Areas with distinct scenes: the CBD, Tanjong Pagar, Tiong Bahru, Kampong Glam, and the HDB heartlands.',
    'Home to NUS, NTU, SMU, and many other universities.',
    'Industries: finance, technology, logistics, and professional services.',
    'Public anchors: Marina Bay, the Southern Ridges, the Botanic Gardens, and the hawker centres.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Tanjong Pagar and Raffles Place',
        'Startup event floors near one-north and the Mapletree Business City',
        'Incubator rooms at NUS and NTU',
        'Block71-style startup hubs in the Ayer Rajah area',
        'Cafés with meeting corners in Tiong Bahru',
        'Hotel conference rooms in Marina Bay',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Pitch evenings and demo nights',
        'Deep-tech and fintech builder circles',
        'Investor office hours at incubators',
        'Weekend hackathons at university campuses',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, deep tech, climate, or logistics — and an English-first name.',
        'Reserve a recurring slot at a Tanjong Pagar or one-north coworking space near the MRT.',
        'Run three open meetups, then add a hawker dinner after each and ask two regulars to co-organize.',
      ],
    },
    creative: {
      venues: [
        'Galleries in Gillman Barracks and Tanjong Pagar',
        'Indie music and art venues in Bugis and Kampong Glam',
        'Design studios in Tiong Bahru and Bras Basah',
        'Independent cinemas at the Oldham Theatre and the Arts House',
        'Performing arts spaces at the Esplanade',
        'Café stages in Tiong Bahru and Jalan Besar',
      ],
      formats: [
        'Art walk and gallery evenings',
        'Indie music showcase nights',
        'Design and craft market days',
        'Open-mic and spoken word evenings',
        'Photography walks through the heritage districts',
      ],
      howToStart: [
        'Choose a craft — music, design, film, photography — and a regular evening slot.',
        'Partner with a gallery, venue, or studio in Gillman Barracks or Kampong Glam to host the first session.',
        'Make the second event a showcase of participant work so the group gains a shared purpose.',
      ],
    },
    political: {
      venues: [
        'Community club halls across the heartlands',
        'GRC and constituency office meeting rooms',
        'University seminar rooms at NUS and SMU',
        'NGO and volunteer centres in the city',
        'Public library rooms with civic collections',
        'Park volunteer sheds and community gardens',
      ],
      formats: [
        'Community garden and park planning sessions',
        'Coastal and mangrove cleanup volunteer briefings',
        'Housing and rental policy info evenings',
        'Climate and sustainability action circles',
        'Volunteer info sessions for community programmes',
      ],
      howToStart: [
        'Pick one concrete local issue — a park, a mangrove, a housing estate — and keep the geography small.',
        'Partner with an existing NGO, community club, or grassroots group instead of duplicating work.',
        'Host an open info session at a community hall and rotate a monthly action plan.',
      ],
    },
    meetup: {
      venues: [
        'Hawker centres across the island',
        'Marina Bay waterfront promenade',
        'The Botanic Gardens and the Southern Ridges trails',
        'Tiong Bahru cafés and the heritage estate',
        'East Coast Park beaches and paths',
        'Community club halls in the heartlands',
      ],
      formats: [
        'Hawker centre food circles',
        'Language exchange tables for newcomers',
        'Sunday morning run clubs',
        'Board game café evenings',
        'Coastal and park walking groups',
      ],
      howToStart: [
        'Choose a repeatable format — a hawker food circle, a Sunday run — and a fixed meeting point.',
        'Pick a MRT-accessible hawker centre or a Tiong Bahru café that will host you every time.',
        'Run three consistent sessions, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Hawker centre vendor networks across the island',
        'Café and restaurant owner tables in Tiong Bahru and Jalan Besar',
        'Boutique owner circles in Orchard and the heritage shops',
        'Design brand studios in Bras Basah and Tiong Bahru',
        'Craft market stalls at city festivals',
        'SME and chamber of commerce seminar rooms',
      ],
      formats: [
        'Hawker vendor breakfasts with no agenda',
        'Festival season vendor planning sessions',
        'Digital payments and e-commerce clinics',
        'Shared sourcing and supplier circles',
        'Shop corridor walking tours',
      ],
      howToStart: [
        'Pick one hawker centre or shopping corridor and a café that already serves the local owners.',
        'Run a no-agenda breakfast first — owners come to talk about customers, rent, and platforms.',
        'After three breakfasts, rotate one practical topic per month and let the vendor network spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      "Singapore's startup ecosystem is one of Asia's most structured and best-supported, with strengths in fintech, deep tech, and logistics that reflect the city's position as a global hub. Founders cluster in Tanjong Pagar, one-north, and the Ayer Rajah startup district, where coworking spaces, accelerators, and university programs at NUS and NTU create a dense loop of talent and capital. The government's active support — grants, talent schemes, and a business-friendly regulatory climate — makes Singapore a natural base for regional expansion, and the city's connectivity to Southeast Asia's markets gives startups real advantages. The culture is professional and international: English is the working language, meetings are efficient, and the ecosystem genuinely welcomes founders from everywhere. Recurring formats include founder breakfasts, pitch evenings, fintech and deep-tech circles, and weekend hackathons. Starting a startup community here works best with a narrow vertical and a fixed venue near the MRT; Singapore's structure and connectivity do the rest.",
    creative:
      "Singapore's creative scene has matured into a serious regional force, anchored by Gillman Barracks' galleries, the performing arts stages of the Esplanade, and the indie music and design culture of Kampong Glam, Bugis, and Tiong Bahru. The city's heritage districts — with their shophouses, hawker culture, and Peranakan craft — give creators a rich visual vocabulary, and its position as a regional media and design hub attracts talent from across Asia. Independent cinema, theatre, and music have devoted audiences, and the café culture of Tiong Bahru and Jalan Besar gives creators a stage every evening. Art and design schools feed a steady stream of graduates into a professional freelance economy. Common formats include gallery walks, indie showcases, craft markets, and open-mics. Starting a creative community in Singapore is realistic: pick a craft and a venue with an existing audience — Gillman for art, Kampong Glam for music — and the city's diversity will pull people in.",
    political:
      "Singapore's civic life is shaped by its small size and careful planning: housing, green space, and climate resilience are the defining local issues. The city's famous public housing — the HDB heartlands — runs through community clubs and grassroots organisations where residents meet, volunteer, and coordinate on everything from gardening to festivals. Climate is a live and urgent topic: coastal and mangrove cleanup volunteer groups are active, and citizens engage on sea-level rise, heat, and sustainability through forums and NGOs. Green space is treasured, and park adoption, community gardens, and tree-planting programmes give residents concrete projects. University campuses and research institutes add an evidence-driven layer, particularly around climate and urban policy. The culture rewards civic participation through established channels: showing up to a community club session and volunteering for a specific role matters more than commentary. Starting a political community here means choosing one concrete issue and a small geography — a park, a mangrove, an estate — then partnering with the community club and grassroots structures that already exist. Singapore rewards consistent, organised participation.",
    meetup:
      "Singapore's meetup scene is as organised and multicultural as the city itself. The hawker centre is the great social anchor — food circles, where a group shares dishes across a table and trades stories, are a beloved format, and every neighbourhood has one that is MRT-accessible. Marina Bay's waterfront and the Botanic Gardens host walking, running, and photography groups, while East Coast Park's beaches and paths are the weekend draw for cyclists and families. Tiong Bahru and Jalan Besar hold the café circuit — book clubs, language exchanges, board game evenings, and freelance coffee mornings — and Singapore's huge international community keeps English-speaking groups plentiful. The Southern Ridges trails connect the green spaces of the south for hiking groups. Groups here tend to be well-organised and punctual, matching the city's culture. Starting a meetup is realistic: pick a repeatable format — a hawker food circle, a Sunday run — and a fixed meeting point near a station, run three sessions at the same time and place, and Singapore's efficiency will take over.",
    'small-business':
      "Singapore's small business community is small but sophisticated, spanning the hawker centres, the heritage shopfronts, and a fast-growing layer of design and F&B brands. Hawker centres run on vendor networks that manage stalls, renovation cycles, and collective voice on rents and rules — and the city's food culture means a good hawker stall has a loyal following for decades. The new economy is different: Tiong Bahru and Jalan Besar cafés and restaurants, the boutiques of the heritage districts, and the design studios of Bras Basah form a tight community of independent owners who meet to swap supplier contacts, design ideas, and customer insights. The government's SME support agencies run practical clinics on digitalisation, e-commerce, and hiring, and the chamber of commerce connects small owners to larger markets. What holds these groups together is geography and taste: a corridor or a hawker centre shares customers, foot traffic, and the same trend cycle. Starting a small business community in Singapore is very achievable — a monthly breakfast for owners on one street or centre, with rotating practical topics, reliably fills a room.",
  },
  ideaPage: {
    intro:
      "Singapore is a wonderful city for community event ideas: the hawker centres make food a natural anchor, the parks are free and beautiful, and the MRT makes everything reachable. The thirty ideas below are grouped into six categories: networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Singapore, from hawker centres and Marina Bay to Gillman Barracks galleries and Tiong Bahru cafés. Some ideas work as one-off events; others are designed to become recurring communities with a fixed day and place. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue near the MRT, and let Singapore's efficiency do the rest.",
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Hawker centre newcomer circle',
            pitch:
              'A shared-table lunch where newcomers and long-time residents trade city tips and work stories over hawker food.',
            audience: 'New arrivals and food lovers',
            venueType: 'A hawker centre near the MRT',
          },
          {
            title: 'Tanjong Pagar founder breakfast',
            pitch:
              "An early breakfast where founders share the week's wins and blockers before the workday starts.",
            audience: 'Startup founders in Singapore',
            venueType: 'A café in Tanjong Pagar',
          },
          {
            title: 'Tiong Bahru meet-and-greet',
            pitch:
              'A low-pressure evening coffee with icebreaker cards and a rule that you meet three new people.',
            audience: 'Professionals and creatives',
            venueType: 'A café in Tiong Bahru',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A community club or library room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A coworking café in Jalan Besar',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Conversational Mandarin and Malay tables',
            pitch:
              'Tables by level, one native speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning local languages',
            venueType: 'A community club or café',
          },
          {
            title: 'Hawker cooking masterclass',
            pitch:
              'Small-group classes where a hawker chef teaches the craft behind a beloved dish.',
            audience: 'Home cooks and food lovers',
            venueType: 'A cooking school or hawker stall kitchen',
          },
          {
            title: 'Startup fundraising basics',
            pitch:
              'A practical session on term sheets, valuations, and pitching for first-time founders.',
            audience: 'New founders and operators',
            venueType: 'A coworking or incubator event room',
          },
          {
            title: 'Urban farming and balcony gardening',
            pitch:
              'Hands-on sessions on growing vegetables and herbs in small spaces, Singapore-style.',
            audience: 'Urban gardeners',
            venueType: 'A community garden or rooftop farm',
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
            title: 'Hawker food circle',
            pitch:
              'A weekly shared table at the same hawker centre, where regulars and newcomers share dishes and stories.',
            audience: 'Food lovers and newcomers',
            venueType: 'A hawker centre near the MRT',
          },
          {
            title: 'Marina Bay sunset walk',
            pitch:
              'A guided evening walk along the waterfront, timed for the sunset and the light show.',
            audience: 'Walkers and photographers',
            venueType: 'Marina Bay waterfront promenade',
          },
          {
            title: 'Botanic Gardens morning run',
            pitch:
              'A friendly, all-paces group run through the gardens, followed by a café breakfast.',
            audience: 'Runners of every level',
            venueType: 'Singapore Botanic Gardens',
          },
          {
            title: 'Board game café evening',
            pitch:
              'A weekly evening at a board game café that welcomes newcomers and quiet strategy.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in Bugis',
          },
          {
            title: 'East Coast Park cycle and picnic',
            pitch:
              'A relaxed weekend ride along the coast with a picnic stop and a swim for the brave.',
            audience: 'Leisure cyclists and families',
            venueType: 'East Coast Park paths',
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
            venueType: 'A coworking floor in Tanjong Pagar',
          },
          {
            title: 'Deep-tech and climate-tech circle',
            pitch:
              'Founders and researchers in deep tech and climate tech share progress and funding paths.',
            audience: 'Deep-tech and climate founders',
            venueType: 'A one-north innovation hub room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss one monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room',
          },
          {
            title: 'Logistics and trade tech meetup',
            pitch:
              'Professionals in logistics, trade, and supply chain technology discuss trends and collaboration.',
            audience: 'Logistics and trade professionals',
            venueType: 'A hotel conference room',
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
            title: 'Gillman Barracks art walk',
            pitch: 'A guided afternoon through the galleries, with artist talks at select stops.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Gillman Barracks galleries',
          },
          {
            title: 'Kampong Glam indie music night',
            pitch:
              'A monthly open stage for indie bands, solo artists, and first-timers in the arts district.',
            audience: 'Musicians and music lovers',
            venueType: 'A live music venue in Kampong Glam',
          },
          {
            title: 'Open-mic and spoken word evening',
            pitch:
              'A monthly open mic where poets, storytellers, and first-timers share five minutes on stage.',
            audience: 'Writers and performers',
            venueType: 'A café stage in Tiong Bahru',
          },
          {
            title: 'Heritage district photo walk',
            pitch:
              'A guided photo walk through the shophouses, murals, and lanes of the heritage districts.',
            audience: 'Amateur and professional photographers',
            venueType: 'Kampong Glam and Jalan Besar streets',
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
            title: 'Coastal cleanup volunteer morning',
            pitch:
              'A Saturday morning cleanup of a beach or mangrove stretch, with gloves and supplies provided.',
            audience: 'Residents and first-time volunteers',
            venueType: 'A coastal or mangrove stretch',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              "Gardeners and neighbours plan the season's planting, events, and shared tools together.",
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or rooftop farm',
          },
          {
            title: 'Park adoption volunteer morning',
            pitch: 'Neighbours help maintain a local park — planting, cleanup, and simple upkeep.',
            audience: 'Neighbours and families',
            venueType: 'A local park or green space',
          },
          {
            title: 'Housing and rental policy info evening',
            pitch:
              'A plain-language session on tenancy rules, deposits, and where to get free advice.',
            audience: 'Renters and young professionals',
            venueType: 'A community club or library room',
          },
          {
            title: 'Hawker storytelling night',
            pitch:
              'Vendors share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A hawker centre or community hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Singapore, recurring formats with a fixed venue near the MRT — a hawker food circle, a Sunday run, a monthly breakfast — build community fastest.',
      },
      {
        question: 'Do I need to speak a local language to organize?',
        answer:
          'No. English is the working language in Singapore, and groups are used to a multicultural mix. A clear announcement in English works for almost every audience.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          "Yes — recurring formats are how most Singapore communities start, and the city's efficiency sustains them. The how-to guides walk through the first event to a stable community.",
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Singapore?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Singaporeans gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Singapore?',
      answer:
        'Yes. Singapore is compact, efficient, and full of well-organised venues, from hawker centres to coworking floors. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — hawker centres, Marina Bay, Gillman Barracks, Tiong Bahru cafés — exists in Singapore. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Singapore?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Singaporeans find or start communities.',
    },
  ],
};

export default content;
