import type { CityContent } from '../../types';

/**
 * São Paulo content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about Latin America’s largest city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'sao-paulo',
  intro: [
    'São Paulo is the largest city in Brazil and in the Americas — about 12.4 million people inside the city limits and more than twenty million across the metro — and it is the financial and corporate heart of Latin America. Unlike the beach cities, São Paulo is a city of work, ambition, and culture: skyscrapers along Avenida Paulista and the Faria Lima corridor, a world-class restaurant scene, and neighborhoods like Pinheiros, Vila Madalena, Itaim Bibi, and Jardins that each hold a distinct community life.',
    'The city is Brazil’s startup capital, with a fintech wave — companies like Nubank were born here — and a deep creative economy in design, fashion, film, and music. USP, PUC-SP, FGV, and other universities feed constant flows of students and researchers into the scene. Ibirapuera Park is the great public anchor, the Mercado Municipal and the city’s feiras (street markets) anchor food communities, and the Beco do Batman in Vila Madalena is a world-famous open-air street-art gallery.',
    'São Paulo is dense, humid, and fast, and the traffic is legendary — which shapes community life: groups anchor to neighborhoods and transit lines, and a good venue is worth the commute. For finding or starting an Origin, São Paulo rewards choosing a neighborhood, a clear format, and a venue with Metro access, then building a rhythm that matches the city’s relentless energy.',
  ],
  dataPoints: [
    'About 12.4 million residents; the largest city in the Americas.',
    'Financial and startup capital of Brazil.',
    'Fintech, design, fashion, film, and music clusters.',
    'Anchors: USP, PUC-SP, FGV, UNIFESP.',
    'Public anchors: Ibirapuera Park, Avenida Paulista, Mercado Municipal.',
    'Neighborhood scenes: Pinheiros, Vila Madalena, Itaim Bibi, Jardins, Centro.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Pinheiros and Vila Madalena',
        'Faria Lima corridor startup offices',
        'University incubators near USP and FGV',
        'Fintech and payments office event rooms',
        'Accelerator event rooms in Itaim Bibi',
        'Cafés with founder tables in Pinheiros',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and payments panel evenings',
        'Design and creative-tech meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, marketplaces, or AI builders — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Pinheiros or Faria Lima coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Vila Madalena galleries and studios',
        'Beco do Batman street-art walks',
        'Pinheiros design studios',
        'Centro cultural spaces and theaters',
        'Fashion ateliers in the garment district',
        'Music venues and recording studios',
      ],
      formats: [
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Music production and DJ circles',
        'Fashion and film showcases',
      ],
      howToStart: [
        'Choose one craft — visual art, design, fashion, music — and a neighborhood.',
        'Partner with a gallery, studio, or cultural center that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and municipal chamber rooms',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Housing and tenant advocacy offices',
        'Civic tech meetup spaces in Pinheiros',
        'Park and plaza event spaces',
      ],
      formats: [
        'Housing and rent info evenings',
        'Tenant rights workshops',
        'Transit and bike-lane volunteer briefings',
        'Climate and green-space action circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a block, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Ibirapuera Park lawns and paths',
        'Avenida Paulista weekend closures',
        'Vila Madalena cafés and bars',
        'Mercado Municipal food corners',
        'Neighborhood feiras (street markets)',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunday park runs and picnics',
        'Café socials and language exchanges',
        'Feira walking tours',
        'Board game and trivia evenings',
        'Street-art and architecture walks',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday run, a monthly feira walk — and a fixed meeting point.',
        'Pick a spot like Ibirapuera Park or a Vila Madalena café that is easy to reach by Metro.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Pinheiros and Vila Madalena shop corridors',
        'Mercado Municipal and feira vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and padarias with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Feira and market vendor roundtables',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and delivery apps.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The São Paulo startup scene is the largest in Latin America and one of the most dynamic emerging markets in the world, built on a huge domestic market and a fintech wave that reshaped Brazilian banking. Pinheiros and Vila Madalena hold the densest concentration of coworking spaces and venture-backed startups, the Faria Lima corridor anchors the corporate and financial layer, and universities like USP and FGV feed founders and talent year after year. What makes the scene distinctive is its scale and its consumer focus: Brazilian startups build for a market of over two hundred million people, and fintech, marketplaces, and logistics are especially strong. The city is also a magnet for international founders and remote workers, so a growing layer of the scene runs in English or bilingually. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in São Paulo: pick a vertical, anchor to a neighborhood, and respect the traffic — a consistent weekly event at a Pinheiros coworking space will build a loyal following.',
    creative:
      'São Paulo creative communities are as vast and bold as the city itself: a world-class design scene, a fashion industry that dresses the country, a film and music culture that feeds all of Brazil, and street art that turned whole neighborhoods into open-air galleries. Vila Madalena is the creative heart — the Beco do Batman alley is a global landmark of street art — while Pinheiros holds design studios and galleries, and the Centro’s cultural centers and theaters keep the city’s performing arts alive. The city’s restaurant and café culture is among the best in the world, giving creatives natural places to meet, and USP and the state’s arts institutions feed new talent each year. Because São Paulo is a city of work, its creative communities tend to be serious, professional, and ambitious — people show up to learn, connect, and build careers. Starting a creative Origin here means choosing a discipline and a neighborhood, then using the city’s enormous audience to build something with real reach.',
    political:
      'São Paulo political and civic communities operate at the scale of a megacity: municipal politics, transit, housing, and the environment dominate the agenda, and the city’s 32 districts each have their own organizing traditions. Housing is a defining issue — one of the most unequal cities in the Americas, with powerful housing movements and tenant unions organizing across the center and periphery. Transit and mobility are equally central: the city’s cycling community pushed for bike lanes, and transit advocates fight for better Metro and bus service. Green space and air quality drive volunteer networks that plant trees, clean parks, and push for environmental policy. Civic tech communities build tools for open data and public engagement, and mutual aid networks run through the neighborhoods. The political culture rewards persistence and local knowledge. Starting a civic Origin in São Paulo usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers.',
    meetup:
      'São Paulo meetup culture runs on coffee, parks, and a genuinely sociable population: Sunday runs through Ibirapuera Park, café socials in Vila Madalena, feira walks through neighborhood street markets, and the legendary weekend closure of Avenida Paulista, where the city comes out to walk, cycle, and gather. The Metro makes cross-city gathering practical, though traffic shapes the calendar — locals plan around peak hours and the evening rush. The city’s enormous international population supports language exchanges and newcomer socials, and its food culture makes market walks and tasting tours a genre of their own. Formats with staying power are simple and repeatable: a Sunday park session, a monthly feira walk, a standing trivia night. Honest advice for starting a meetup in São Paulo: pick a neighborhood, a metro-accessible venue, and a format that welcomes newcomers — the city is full of curious, energetic people looking for the group that feels like home.',
    'small-business':
      'São Paulo small business communities are the engine of the city’s streets: the padaria (bakery), the boteco, the feira vendor, the Pinheiros boutique, and the Rua 25 de Março shopkeeper all share practical questions about rent, permits, staffing, and the rhythm of the city. The feiras — the street markets that set up in every neighborhood — are communities in themselves, with vendors coordinating around supplies, permits, and regular customers. Commercial corridors like Rua Oscar Freire in Jardins and the shops of Vila Madalena hold clusters with a shared stake in foot traffic and public space. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling, and the city’s famous entrepreneurial energy keeps new businesses opening daily. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a feira vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café or padaria, with rotating topics like rent, insurance, and digital payments, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'São Paulo’s scale, energy, and culture make it a spectacular place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in São Paulo, from Ibirapuera Park and Avenida Paulista to Vila Madalena cafés, public markets, and cultural centers. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Vila Madalena café crawl',
            pitch:
              'A Saturday stroll through three cafés in Vila Madalena, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Vila Madalena cafés',
          },
          {
            title: 'Founder AMA at a Pinheiros coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Pinheiros coworking space',
          },
          {
            title: 'International newcomer social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over snacks and conversation prompts.',
            audience: 'Newcomers to the city, including expats',
            venueType: 'Community center or café event room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Paulista Avenue weekend mixer',
            pitch:
              'A casual meetup on the car-free stretch of Avenida Paulista, with icebreaker prompts and coffee stands.',
            audience: 'Anyone expanding their local network',
            venueType: 'Avenida Paulista on a closed weekend',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Portuguese-English language exchange',
            pitch: 'Tables by level and language, with a simple rule: mistakes are the point.',
            audience: 'Portuguese and English learners',
            venueType: 'Café or community center in Pinheiros',
          },
          {
            title: 'Small business finance in plain Portuguese',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Feira food and history walk',
            pitch:
              'A guided tasting walk through a neighborhood feira with the stories behind the vendors.',
            audience: 'Food lovers and newcomers',
            venueType: 'A neighborhood feira',
          },
          {
            title: 'Tenant rights workshop',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Coding night for absolute beginners',
            pitch:
              'A guided evening where beginners build their first small project with mentors in the room.',
            audience: 'People switching into tech',
            venueType: 'Coworking space or university lab',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Ibirapuera Sunday picnic',
            pitch:
              'Blankets, music, and a potluck in the city’s great park, with a walk around the lake.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Ibirapuera Park lawns',
          },
          {
            title: 'Sunday run club in the park',
            pitch:
              'A friendly group run of five or ten kilometers, open to every pace, ending with coffee.',
            audience: 'Runners of every level',
            venueType: 'Ibirapuera Park running paths',
          },
          {
            title: 'Beco do Batman street-art walk',
            pitch:
              'A guided walk through the famous alley of murals, with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'Vila Madalena streets',
          },
          {
            title: 'Board game night at a Vila Madalena bar',
            pitch:
              'A monthly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Vila Madalena bar or café',
          },
          {
            title: 'Mercado Municipal tasting tour',
            pitch:
              'A guided tasting walk through the historic market, sampling mortadella sandwiches and more.',
            audience: 'Food lovers and first-time visitors',
            venueType: 'Mercado Municipal',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech and payments roundtable',
            pitch:
              'A monthly discussion for founders and operators working on payments, credit, and financial inclusion.',
            audience: 'Fintech founders and professionals',
            venueType: 'Faria Lima office or coworking event room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Pinheiros',
          },
          {
            title: 'Marketplace and logistics meetup',
            pitch:
              'An informal evening for operators building marketplaces and delivery businesses.',
            audience: 'Marketplace and logistics professionals',
            venueType: 'Startup office or event space',
          },
          {
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where designers, filmmakers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or coworking room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Studio open day in Vila Madalena',
            pitch:
              'Artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Vila Madalena artist studios',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Vila Madalena music venue',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city’s most photogenic streets with prompts and a group share at the end.',
            audience: 'Photographers of every level',
            venueType: 'Centro or Vila Madalena streets',
          },
          {
            title: 'Samba and percussion circle',
            pitch:
              'A friendly evening of rhythm where beginners learn basic samba percussion alongside experienced players.',
            audience: 'Musicians and rhythm-curious beginners',
            venueType: 'Community center or music studio',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Pinheiros',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Park cleanup morning',
            pitch:
              'A Saturday morning cleanup of a neighborhood park, with gloves and coffee supplied.',
            audience: 'Volunteers and park lovers',
            venueType: 'A chosen neighborhood park',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Tenant rights information session',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Tree-planting and green-space circle',
            pitch:
              'A small group that plans and plants trees in local parks while learning about the city’s climate goals.',
            audience: 'Residents concerned about the environment',
            venueType: 'Park pavilion or community center',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and feira owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or feira hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In São Paulo, a neighborhood anchor, a metro-accessible venue, and a format that welcomes newcomers tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Portuguese to organize?',
        answer:
          'No. Many São Paulo events run in English or bilingually, especially in Pinheiros and Vila Madalena. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most São Paulo Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in São Paulo?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where Paulistanos gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in São Paulo?',
      answer:
        'Yes. The city has free public venues, a vast and energetic population, and a rich culture of gathering. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Ibirapuera Park, Avenida Paulista, Vila Madalena cafés, the Mercado Municipal, feiras — exists in São Paulo. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in São Paulo?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Paulistanos find or start Origins.',
    },
  ],
};

export default content;
