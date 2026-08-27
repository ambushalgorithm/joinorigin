import type { CityContent } from '../../types';

/**
 * Buenos Aires content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the tango-and-café Argentine capital.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'buenos-aires',
  intro: [
    'Buenos Aires is the capital of Argentina and a city of about 2.9 million people inside the city limits, with more than thirteen million across Greater Buenos Aires. It is a city of wide boulevards, European-style architecture, and a famously intense social life: the café culture, the parrillas (steakhouses), the tango halls, and the football stadiums all shape how porteños — as residents are called — gather and connect.',
    'The city is Latin America’s startup and creative capital: companies like MercadoLibre were born here, and the scene in Palermo, Villa Crespo, and the Microcentro mixes founders, designers, and engineers from across the region. UBA — one of the largest and most storied public universities in the world — UTN, and Universidad Di Tella feed a constant flow of students and researchers into local communities. Public anchors include the Bosques de Palermo, the San Telmo market, Puerto Madero, and the plazas that anchor every neighborhood.',
    'Porteños are famous for staying out late, drinking mate, and building deep friendships — community life runs on warmth and word of mouth. The economy has been through hard cycles, which has produced a culture of resourcefulness and mutual support that shows up in everything from barter networks to free events. For finding or starting an Origin, Buenos Aires rewards authenticity, a good venue, and a group that feeds the city’s hunger for conversation.',
  ],
  dataPoints: [
    'About 2.9 million residents in the city; 13M+ in Greater Buenos Aires.',
    'Capital of Argentina; startup and creative capital of the region.',
    'Tango, literature, design, and football culture.',
    'Anchors: UBA, UTN, Universidad Di Tella.',
    'Public anchors: Bosques de Palermo, San Telmo market, Puerto Madero.',
    'Neighborhood scenes: Palermo, Recoleta, San Telmo, La Boca, Villa Crespo, Belgrano.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Palermo and Villa Crespo',
        'Microcentro startup offices',
        'University incubators near UBA and Di Tella',
        'Fintech and e-commerce office event rooms',
        'Accelerator event rooms in Palermo Hollywood',
        'Cafés with founder tables in Palermo Soho',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and payments panel evenings',
        'Regional expansion meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, e-commerce, or creative tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Palermo or Villa Crespo coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Palermo Soho design studios and galleries',
        'San Telmo art and antique streets',
        'La Boca and Caminito artist corners',
        'Tango halls and milongas',
        'Teatro and cultural centers in the Microcentro',
        'Biblioteca and bookstore event rooms',
      ],
      formats: [
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Tango and music socials',
        'Literature and poetry readings',
      ],
      howToStart: [
        'Choose one craft — visual art, design, literature, tango — and a neighborhood.',
        'Partner with a gallery, cultural center, or milonga that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City legislature and government offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces in Palermo',
        'Plaza and park event spaces',
      ],
      formats: [
        'Housing and rental info evenings',
        'Tenant rights workshops',
        'Transit and mobility volunteer briefings',
        'Mutual aid and solidarity network meetings',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a neighborhood, a block, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Bosques de Palermo lawns and paths',
        'San Telmo market streets',
        'Palermo cafés with terraces',
        'Recoleta plazas and cemetery walks',
        'Neighborhood clubs and community centers',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunday market walks',
        'Mate circle meetups',
        'Board game and trivia evenings',
        'Tango and dance socials',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday walk, a mate circle — and a fixed meeting point.',
        'Pick a spot like the Bosques de Palermo or a San Telmo café that is easy to reach by subway.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Palermo Soho and San Telmo shop corridors',
        'Mercado and feria vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and parrillas with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Feria and market vendor roundtables',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and the economy.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Buenos Aires startup scene is the most mature in Latin America, built on a deep pool of engineering talent, a storied tradition of entrepreneurial resilience, and a regional market that starts at the Rio de la Plata. Palermo and Villa Crespo hold the densest concentration of coworking spaces and venture-backed startups, the Microcentro anchors the corporate layer, and universities like UBA and Di Tella feed founders and engineers year after year. What makes the scene distinctive is its regional ambition: Argentine founders built companies like MercadoLibre that serve the whole continent, and the city remains the launchpad for many regional startups. The economy’s hard cycles have produced a culture of creative resourcefulness — founders learn to bootstrap, barter, and build in difficult conditions — which makes the community unusually practical. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin here: pick a vertical, anchor to a neighborhood, and respect the economic reality — a consistent weekly event at a Palermo coworking space will build a loyal following.',
    creative:
      'Buenos Aires creative communities carry one of the richest cultural inheritances in Latin America: tango, literature, design, film, and theater all live and breathe in this city. San Telmo holds the bohemian tradition — its antique markets and milongas draw locals and visitors alike — while Palermo Soho is the design and fashion heart, and La Boca’s Caminito keeps the colorful, working-class art tradition alive. The city is famous for its bookstores and café culture: writers have gathered in the same cafés for a century, and the city’s literary scene is world-class. Theater is everywhere — the Microcentro’s independent theater scene is among the most intense in the world — and tango, both traditional and contemporary, is a living art form with milongas every night. Starting a creative Origin in Buenos Aires means choosing a discipline and a neighborhood, then using the city’s deep cultural infrastructure and its genuinely passionate audience to build something with real soul.',
    political:
      'Buenos Aires political and civic communities are shaped by the city’s role as the national capital and by an economic history that has made solidarity a survival skill. Housing is a defining issue: rent pressures and displacement organize tenant unions and neighborhood assemblies across the city. The broader economic cycles have produced a rich culture of mutual aid — community kitchens, worker cooperatives, and solidarity networks that step in when institutions struggle — and these networks are a real and respected part of civic life. The city is divided into communes (comunas), which gives residents local forums for land use, transit, and public-space decisions. Civic tech communities build tools for open data and public engagement, and environmental groups push for cleaner transit and more green space. The political culture rewards persistence, warmth, and genuine relationships. Starting a civic Origin in Buenos Aires usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizations.',
    meetup:
      'Buenos Aires meetup culture is fueled by the city’s famous social energy: porteños stay out late, drink mate, and turn any occasion into a gathering. Sunday walks through the San Telmo market, mate circles in the Bosques de Palermo, tango socials in neighborhood milongas, and bookstore readings that spill into cafés — the city runs on these rhythms. The subway and buses make cross-city gathering practical, and the city’s enormous café culture means there is always a venue that will host a group. Because Buenos Aires is a magnet for travelers, expats, and remote workers, newcomer-friendly meetups are common and warmly welcomed. Formats with staying power are simple and repeatable: a Sunday market walk, a weekly mate circle, a standing trivia night. Honest advice for starting a meetup here: pick a neighborhood, a subway-accessible venue, and a format that embraces the city’s late, warm, conversational style — porteños will show up for a group that feels real.',
    'small-business':
      'Buenos Aires small business communities are the heart of the city’s streets: the Palermo Soho boutique, the San Telmo antiques dealer, the La Boca artisan, the neighborhood parrilla, and the feria vendor all share practical questions about rent, permits, staffing, and the unpredictable economy. The city’s ferias (open-air markets) are communities in themselves, with vendors coordinating around supplies, permits, and regular customers, and commercial corridors like Palermo Soho and the San Telmo market streets hold shop clusters with a shared stake in foot traffic. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling, and the country’s economic cycles have produced a deep culture of resourcefulness — owners are used to adapting fast. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a feria vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and pricing in difficult times, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Buenos Aires’ café culture, warm social style, and rich cultural life make it a wonderful place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Buenos Aires, from the Bosques de Palermo and San Telmo market to Palermo cafés, milongas, and cultural centers. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Palermo café crawl',
            pitch:
              'A Saturday stroll through three cafés in Palermo, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Palermo cafés',
          },
          {
            title: 'Founder AMA at a Palermo coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Palermo coworking space',
          },
          {
            title: 'Mate circle for newcomers',
            pitch:
              'A relaxed gathering around the national drink, where newcomers meet porteños and practice Spanish or English.',
            audience: 'Newcomers and locals who love conversation',
            venueType: 'Bosques de Palermo lawns',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'San Telmo market walk and meet',
            pitch:
              'A guided walk through the Sunday market with stops to talk with artisans and each other.',
            audience: 'Culture lovers and networkers',
            venueType: 'San Telmo market streets',
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
            venueType: 'Café or community center in Palermo',
          },
          {
            title: 'Small business finance in plain Spanish',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Tango basics workshop',
            pitch:
              'A beginner-friendly class covering the basic steps and etiquette of the milonga.',
            audience: 'Tango-curious beginners',
            venueType: 'Milonga or dance studio',
          },
          {
            title: 'Asado skills and traditions',
            pitch:
              'A hands-on evening learning the craft of the Argentine barbecue, from fire to table.',
            audience: 'Home cooks and food lovers',
            venueType: 'Community parrilla or backyard',
          },
          {
            title: 'Tenant rights workshop',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Bosques de Palermo picnic',
            pitch:
              'Blankets, mate, and a potluck in the city’s great park, with a walk around the lakes.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Bosques de Palermo lawns',
          },
          {
            title: 'Sunday San Telmo market stroll',
            pitch:
              'A slow walk through the famous market with food stops and conversations with artisans.',
            audience: 'Sunday explorers',
            venueType: 'San Telmo market streets',
          },
          {
            title: 'Board game night at a Villa Crespo bar',
            pitch:
              'A monthly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Villa Crespo bar or café',
          },
          {
            title: 'Milonga social for beginners',
            pitch:
              'A friendly tango social where beginners can dance, watch, and learn without pressure.',
            audience: 'Dancers of every level',
            venueType: 'Neighborhood milonga',
          },
          {
            title: 'Bike ride along the river',
            pitch:
              'A relaxed ride along the waterfront paths of the Rio de la Plata, with café stops.',
            audience: 'Leisure cyclists',
            venueType: 'Costanera bike paths',
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
            venueType: 'Fintech office or coworking event room',
          },
          {
            title: 'Regional expansion meetup',
            pitch:
              'An informal evening where founders share lessons on taking products across Latin America.',
            audience: 'Founders and operators expanding regionally',
            venueType: 'Startup office or event space',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Palermo Soho',
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
            title: 'Tango milonga night',
            pitch:
              'A live music and dance evening at a traditional milonga, welcoming to newcomers.',
            audience: 'Dancers and tango lovers',
            venueType: 'San Telmo or Centro milonga',
          },
          {
            title: 'La Boca art walk',
            pitch:
              'A guided walk through Caminito and the surrounding studios, with the stories behind the artists.',
            audience: 'Art lovers and photographers',
            venueType: 'La Boca streets and studios',
          },
          {
            title: 'Open mic for poets and musicians',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Poets, musicians, and beginners',
            venueType: 'Palermo bookstore café or cultural center',
          },
          {
            title: 'Studio open day in Palermo Soho',
            pitch:
              'Designers and artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Design lovers and curious visitors',
            venueType: 'Palermo Soho studios',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in San Telmo',
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
            title: 'Mutual aid volunteer briefing',
            pitch:
              'A short orientation plus a first shift for volunteers supporting local mutual aid and food programs.',
            audience: 'First-time volunteers',
            venueType: 'A local mutual aid hub or comedor',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and feria owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or commercial hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Buenos Aires, formats that embrace the city’s late, conversational style — mate circles, market walks, milonga socials — tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Buenos Aires events run in English or bilingually, especially in Palermo. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Buenos Aires Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Buenos Aires?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where porteños gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Buenos Aires?',
      answer:
        'Yes. The city has free public venues, a warm social culture, and a rich café and cultural life. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Bosques de Palermo, San Telmo market, Palermo cafés, milongas, cultural centers — exists in Buenos Aires. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Buenos Aires?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps porteños find or start Origins.',
    },
  ],
};

export default content;
