import type { CityContent } from '../../types';

/**
 * Bogotá content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the high-altitude Colombian capital.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'bogota',
  intro: [
    'Bogotá is the capital of Colombia and a city of about 7.7 million people — with more than ten million across the metro — sitting at 2,640 meters above sea level on a high Andean plateau. The altitude shapes daily life: the air is thin, the sun is strong, and the rain arrives in sharp afternoon bursts, so locals plan gatherings around the weather and the city’s famously efficient TransMilenio bus system.',
    'Bogotá is Colombia’s economic and startup capital: companies like Rappi were born here, and the scene in Chapinero, Zona G, and the city center mixes founders, engineers, and designers from across the country. The city is also a cultural powerhouse — the Gold Museum, the Botero Museum, the graffiti of La Candelaria, and the Sunday ciclovía, when a hundred kilometers of streets close to cars for cyclists and walkers. Universidad de los Andes, Javeriana, and the National University feed constant flows of students and researchers into local communities.',
    'The city has transformed itself over the past decades, and its residents are proud of that story: bike lanes, public libraries, and community programs are real parts of daily life. For finding or starting an Origin, Bogotá rewards showing up consistently, choosing a neighborhood, and building a group that matches the city’s energy and its warm, direct social style.',
  ],
  dataPoints: [
    'About 7.7 million residents; 10M+ in the metro.',
    'Capital of Colombia at 2,640 meters altitude.',
    'Startup, finance, and creative industry clusters.',
    'Anchors: Universidad de los Andes, Javeriana, National University.',
    'Public anchors: Monserrate, Simón Bolívar Park, the Sunday ciclovía.',
    'Neighborhood scenes: Chapinero, Usaquén, La Candelaria, Zona G, Teusaquillo.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Chapinero and Zona G',
        'Centro startup offices',
        'University incubators near Los Andes and Javeriana',
        'Fintech and e-commerce office event rooms',
        'Accelerator event rooms in Chapinero Alto',
        'Cafés with founder tables in Parque 93',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and logistics panel evenings',
        'Regional expansion meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, logistics, or creative tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Chapinero or Zona G coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'La Candelaria galleries and graffiti streets',
        'Chapinero design studios',
        'Usaquén artisan markets and plazas',
        'Teusaquillo cultural centers',
        'Music venues and salsa clubs',
        'Museum and cultural center event rooms',
      ],
      formats: [
        'Graffiti tour and street-art walks',
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Salsa and music socials',
      ],
      howToStart: [
        'Choose one craft — visual art, design, music, street art — and a neighborhood.',
        'Partner with a gallery, cultural center, or club that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City council and district offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces in Chapinero',
        'Park and plaza event spaces',
      ],
      formats: [
        'Housing and rental info evenings',
        'Tenant rights workshops',
        'Transit and mobility volunteer briefings',
        'Peace and community reconciliation circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a neighborhood, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Simón Bolívar Park lawns',
        'Ciclovía routes on Sundays',
        'Usaquén plaza and artisan market',
        'La Candelaria cafés and courtyards',
        'Parque 93 and Zona G restaurants',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunday ciclovía bike rides',
        'Park picnics and runs',
        'Café socials and language exchanges',
        'Board game and trivia evenings',
        'Artisan market walks',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday ride, a monthly market walk — and a fixed meeting point.',
        'Pick a spot like Simón Bolívar Park or an Usaquén café that is easy to reach by TransMilenio.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Chapinero and Usaquén shop corridors',
        'Artisan market vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and panaderías with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Market vendor roundtables',
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
      'The Bogotá startup scene is the largest in Colombia and one of the most dynamic in Latin America, built on a growing consumer market and a wave of fintech, logistics, and marketplace companies — including Rappi, which was born here. Chapinero and Zona G hold the densest concentration of coworking spaces and venture-backed startups, the Centro anchors the corporate layer, and universities like Los Andes and Javeriana feed founders and engineers year after year. What makes the scene distinctive is its resilience and its regional ambition: Colombian startups think about the whole continent early, and the city’s improving infrastructure and growing middle class support consumer-focused companies. The city is also a magnet for talent from across Colombia, making it a genuine national hub. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in Bogotá: pick a vertical, anchor to a neighborhood, and plan around the traffic and the rain — a consistent weekly event at a Chapinero coworking space will build a loyal following.',
    creative:
      'Bogotá creative communities are powered by the city’s extraordinary public art culture: La Candelaria’s walls are a canvas for some of the world’s best street artists, and the city’s graffiti scene has earned international recognition. The historic center holds galleries, museums, and cultural centers — the Gold Museum and Botero Museum anchor a serious art scene — while Chapinero and Teusaquillo host studios, design offices, and independent theaters. Usaquén’s artisan market and plazas keep traditional crafts alive, and the city’s salsa and music scenes give creatives a natural social rhythm. The Sunday ciclovía turns the city into a stage, and festivals like the international theater festival draw artists from everywhere. Universities like Los Andes and the National University feed new talent each year. Starting a creative Origin in Bogotá means choosing a discipline and a neighborhood, then using the city’s deep cultural infrastructure and its proud, expressive audience to build something with real impact.',
    political:
      'Bogotá political and civic communities are shaped by Colombia’s recent history and the city’s own transformation: peace-building, memory, housing, and mobility are the issues that animate local organizing. The city has a strong tradition of civic participation — from the famous 1990s citizen movements to today’s neighborhood assemblies — and the district government has invested heavily in public libraries, parks, and bike infrastructure, which gives organizers real assets to work with. Housing affordability and displacement organize tenant groups and community land trusts, while transit and mobility advocates push to extend the TransMilenio and bike network. The city’s universities give civic life an intellectual energy, and civic tech communities build tools for open data and participation. The political culture rewards persistence, trust-building, and a genuine commitment to community. Starting a civic Origin in Bogotá usually means picking a concrete issue and a small geography, then partnering with the rich existing landscape of organizations.',
    meetup:
      'Bogotá meetup culture is built around the Sunday ciclovía — when a hundred kilometers of streets close to cars and the city fills with cyclists, runners, and walkers — and around the parks, plazas, and markets that anchor daily life. Simón Bolívar Park hosts picnics and runs, Usaquén’s plaza fills with an artisan market on weekends, and La Candelaria’s cafés and courtyards hold the city’s most charming gatherings. The TransMilenio makes cross-city travel practical, and the city’s young, energetic population means there is always demand for new groups. Bogotá’s weather — sunny mornings, rainy afternoons — shapes the calendar: morning and evening formats work best, and a good plan for rain keeps groups loyal. Formats with staying power are simple and repeatable: a Sunday ride, a monthly market walk, a standing trivia night. Honest advice for starting a meetup here: pick a neighborhood, a TransMilenio-accessible venue, and a rain plan, and the city’s warm, sociable energy will do the growth work.',
    'small-business':
      'Bogotá small business communities are the texture of the city’s streets: the panadería, the café, the Usaquén artisan, the Chapinero boutique, and the La Candelaria shopkeeper all share practical questions about rent, permits, staffing, and the flow of customers. The city’s artisan markets and neighborhood plazas give vendors natural communities, and commercial corridors in Chapinero, Zona G, and Usaquén hold shop clusters with a shared stake in foot traffic. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling, and the city’s growing tourism and food culture keeps new businesses opening — from specialty coffee roasters to craft breweries that have turned Bogotá into a destination for food-minded visitors. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining an artisan market collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and digital payments, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Bogotá’s energy, public art, and Sunday ciclovía culture make it a wonderful place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Bogotá, from Simón Bolívar Park and the ciclovía routes to La Candelaria cafés, Usaquén plazas, and cultural centers. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Usaquén café crawl',
            pitch:
              'A Saturday stroll through three cafés in the old colonial neighborhood, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Usaquén cafés',
          },
          {
            title: 'Founder AMA at a Chapinero coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Chapinero coworking space',
          },
          {
            title: 'Newcomer welcome social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over coffee and conversation prompts.',
            audience: 'Newcomers to the city',
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
            title: 'Ciclovía networking ride',
            pitch:
              'A friendly Sunday ride along the car-free streets, with stops to talk and a coffee finish.',
            audience: 'Cyclists and networkers',
            venueType: 'Ciclovía routes and a café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Spanish-English language exchange',
            pitch: 'Tables by level and language, with a simple rule: mistakes are the point.',
            audience: 'Spanish and English learners',
            venueType: 'Café or community center in Chapinero',
          },
          {
            title: 'Small business finance in plain Spanish',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Coffee tasting and history workshop',
            pitch:
              'A hands-on session learning about Colombian coffee regions, roasting, and brewing.',
            audience: 'Coffee lovers and home brewers',
            venueType: 'Café or roastery workshop space',
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
            title: 'Simón Bolívar Park picnic',
            pitch:
              'Blankets, music, and a potluck in the city’s great park, with a walk around the lake.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Simón Bolívar Park lawns',
          },
          {
            title: 'Sunday ciclovía ride',
            pitch:
              'A relaxed ride on the car-free streets with breakfast stops and a friendly pace.',
            audience: 'Cyclists of every level',
            venueType: 'Ciclovía route streets',
          },
          {
            title: 'Monserrate sunrise walk',
            pitch:
              'An early hike or cable-car ride to the mountain shrine for sunrise over the city.',
            audience: 'Early risers and hikers',
            venueType: 'Monserrate trail and cable car',
          },
          {
            title: 'Board game night at a Chapinero bar',
            pitch:
              'A monthly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Chapinero bar or café',
          },
          {
            title: 'Usaquén artisan market stroll',
            pitch:
              'A slow walk through the weekend market with food stops and conversations with artisans.',
            audience: 'Sunday explorers',
            venueType: 'Usaquén plaza and market',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech and logistics roundtable',
            pitch:
              'A monthly discussion for founders and operators working on payments, delivery, and financial inclusion.',
            audience: 'Fintech and logistics professionals',
            venueType: 'Coworking or office event room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Chapinero',
          },
          {
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where designers, filmmakers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Coffee industry meetup',
            pitch:
              'An informal evening for roasters, café owners, and exporters to share trends and contacts.',
            audience: 'Coffee industry professionals',
            venueType: 'Roastery or café event space',
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
            title: 'La Candelaria graffiti walk',
            pitch:
              'A guided walk past the historic center’s murals with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'La Candelaria streets and walls',
          },
          {
            title: 'Studio open day in Teusaquillo',
            pitch:
              'Artists and designers open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Teusaquillo studios',
          },
          {
            title: 'Salsa night for beginners',
            pitch:
              'A fun evening where beginners learn basic salsa steps alongside experienced dancers.',
            audience: 'Dancers of every level',
            venueType: 'Salsa club or dance studio',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'La Candelaria or Chapinero venue',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Chapinero',
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
            title: 'Peace and memory community circle',
            pitch:
              'A respectful gathering where residents share stories and learn about the city’s history of peace-building.',
            audience: 'Residents interested in reconciliation',
            venueType: 'Community center or cultural space',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and market owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or market hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Bogotá, morning and evening formats with a rain plan — Sunday rides, market walks, café socials — tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Bogotá events run in English or bilingually, especially in Chapinero and Zona G. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Bogotá Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Bogotá?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Bogotá?',
      answer:
        'Yes. The city has free public venues, a young and energetic population, and a strong civic culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Simón Bolívar Park, the ciclovía routes, Usaquén plaza, La Candelaria cafés, cultural centers — exists in Bogotá. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Bogotá?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps residents find or start Origins.',
    },
  ],
};

export default content;
