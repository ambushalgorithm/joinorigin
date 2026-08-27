import type { CityContent } from '../../types';

/**
 * Mexico City content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the vast, high-altitude Mexican capital.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'mexico-city',
  intro: [
    'Mexico City is the capital of Mexico and one of the largest cities in the world — about 12.3 million people inside the city limits and more than twenty million across the metro — sitting at 2,240 meters above sea level in a high valley ringed by volcanoes. The city is organized into boroughs and neighborhoods with distinct personalities: Roma and Condesa for cafés and creative work, Polanco for business and fine dining, Coyoacán for history and artists, and Centro Histórico for the deep layers of the past.',
    'The city is a powerhouse of culture, food, and creativity: more museums than most cities, a street-food scene that is among the world’s best, and a growing technology and startup ecosystem anchored in fintech and creative industries. UNAM — one of the largest universities on earth — ITAM, the National Polytechnic, and Tec de Monterrey campuses feed a constant flow of students and researchers into local communities. The Metro, Metrobús, and Ecobici bike-share make cross-city gathering practical, and public anchors like Chapultepec Park, the Zócalo, and the canals of Xochimilco give groups free, iconic places to meet.',
    'The city rewards the confident organizer: it is dense, lively, and full of people who show up — but traffic, altitude, and rain season shape the calendar. For finding or starting an Origin, Mexico City rewards choosing a neighborhood, a clear language (Spanish, English, or both), and a venue with good transit access.',
  ],
  dataPoints: [
    'About 12.3 million residents in the city; 20M+ in the metro.',
    'Capital of Mexico at 2,240 meters altitude.',
    'Fintech, creative, and cultural industry clusters.',
    'Anchors: UNAM, ITAM, IPN, Tec de Monterrey campuses.',
    'Public anchors: Chapultepec Park, Zócalo, Xochimilco canals.',
    'Neighborhood scenes: Roma, Condesa, Polanco, Coyoacán, Centro Histórico.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Roma and Condesa',
        'Polanco startup offices',
        'University incubators near UNAM and ITAM',
        'Fintech and creative-tech offices',
        'Accelerator event rooms in Roma Norte',
        'Cafés with founder tables in Condesa',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and payments panel evenings',
        'Creative and media-tech meetups',
        'English-first international founder mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, creative tech, or AI builders — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Roma or Condesa coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Roma and Condesa galleries and studios',
        'Coyoacán artist houses and markets',
        'Centro Histórico cultural spaces',
        'Mural-covered buildings and art walks',
        'Design studios in Roma Norte',
        'UNAM arts and cultural centers',
      ],
      formats: [
        'Gallery opening nights and art walks',
        'Studio open weekends',
        'Design critique evenings',
        'Music and production circles',
        'Film and documentary screenings',
      ],
      howToStart: [
        'Choose one craft — visual art, design, film, music — and a neighborhood.',
        'Partner with a gallery, studio, or cultural center that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and borough offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces in Roma',
        'Park and plaza event spaces',
      ],
      formats: [
        'Housing and rental info evenings',
        'Tenant rights workshops',
        'Transit and mobility volunteer briefings',
        'Climate and air-quality action circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a borough, a block, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Chapultepec Park lawns and paths',
        'Roma and Condesa cafés with terraces',
        'Coyoacán plazas and markets',
        'Xochimilco trajineras (canal boats)',
        'Centro Histórico courtyards',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunday park picnics and walks',
        'Café socials and language exchanges',
        'Bike rides along closed streets',
        'Board game and trivia evenings',
        'Market and street-food walks',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday walk, a monthly food walk — and a fixed meeting point.',
        'Pick a spot like Chapultepec Park or a Condesa café that is easy to reach by Metro.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Roma and Condesa shop corridors',
        'Mercado (market) vendor spaces',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés and fondas with community corners',
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
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and street sales.',
        'After three breakfasts, rotate one practical topic per month and let the chamber spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Mexico City startup scene is the largest in Latin America, built on a vast domestic market, a strong fintech wave, and a creative economy that is reshaping the city. Roma and Condesa hold the densest concentration of coworking spaces and venture-backed startups, Polanco anchors the corporate and financial layer, and the city’s universities — UNAM, ITAM, the National Polytechnic, Tec de Monterrey — feed founders and talent year after year. What makes the scene distinctive is its scale and its consumer focus: Mexican startups build for a market of over a hundred million people, and the fintech, e-commerce, and media categories are especially strong. The city is also a magnet for international founders and remote workers, so a growing layer of the scene runs in English or bilingually. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in Mexico City: pick a vertical, anchor to a neighborhood, and respect the traffic — a consistent weekly event at a Roma coworking space will build a loyal following.',
    creative:
      'Mexico City creative communities are among the richest in the world, drawing on a muralist tradition that shaped public art across the continent and a contemporary scene that spans design, film, music, and fashion. Roma and Condesa hold galleries, studios, and design offices, Coyoacán carries the artistic legacy of Frida Kahlo and the bohemian spirit of the twentieth century, and Centro Histórico layers colonial architecture with contemporary cultural spaces. The city’s museums — among the most numerous of any city in the world — give creatives constant exposure to art, and UNAM’s cultural programs feed new generations of artists. Street art is everywhere, from monumental murals to the ephemeral works that appear overnight, and the city’s markets, plazas, and pulquerías give makers natural stages to show and sell. Starting a creative Origin in Mexico City means choosing a discipline and a neighborhood, then using the city’s enormous audience and its deep cultural infrastructure to build something with real reach.',
    political:
      'Mexico City political and civic communities are shaped by the city’s role as the national capital and by the energy of a megacity confronting housing, mobility, and climate challenges. The city is divided into boroughs with elected leaders, which keeps local politics accessible: residents can attend borough council sessions and shape land-use, transit, and public-space decisions. Housing affordability is a rising issue, with tenant unions and anti-displacement groups organizing across gentrifying neighborhoods like Roma and Condesa. Mobility is a defining theme — the city’s cycling community has pushed for the Ecobici bike-share and protected lanes, and transit advocates fight for better Metro and bus service. Civic tech communities build tools for open data and public engagement, and volunteer networks organize around air quality, tree planting, and mutual aid. The political culture rewards persistence and neighborhood knowledge. Starting a civic Origin in Mexico City usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers.',
    meetup:
      'Mexico City meetup culture is as vast and varied as the city itself: Sunday picnics in Chapultepec Park, café socials in Roma and Condesa, street-food walks through Centro Histórico, canal rides in Xochimilco, and language exchanges that pair Spanish speakers with the city’s growing international population. The Metro and Metrobús make cross-city gathering practical, though traffic shapes the calendar — locals plan around peak hours and the evening rush. The city’s weather is famously temperate, with a rainy season that runs from late spring through early fall, so outdoor formats thrive most of the year. Formats with staying power are simple and repeatable: a Sunday park session, a monthly food walk, a standing trivia night. Honest advice for starting a meetup in Mexico City: pick a neighborhood, a metro-accessible venue, and a format that welcomes newcomers — the city is full of curious, sociable people looking for the group that feels like home.',
    'small-business':
      'Mexico City small business communities are the heart of the city’s streets: the taquería, the fonda, the mercado vendor, the Roma boutique, and the Coyoacán artesanía shop all share practical questions about rent, permits, staffing, and the ebb and flow of street traffic. The city’s mercados — its public markets — are communities in themselves, with vendors coordinating around supplies, security, and events. Commercial corridors like Roma’s Avenida Álvaro Obregón and Condesa’s Amsterdam hold shop clusters with a shared stake in foot traffic and public space. The chamber of commerce and city small business centers offer workshops on licensing, loans, and digital selling, and the city’s street-food culture gives small operators a famously low barrier to entry. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a market vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café or fonda, with rotating topics like rent, insurance, and digital payments, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Mexico City’s scale, culture, and street life make it a spectacular place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Mexico City, from Chapultepec Park and Xochimilco canals to Roma cafés, public markets, and cultural centers. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Condesa café crawl',
            pitch:
              'A Saturday stroll through three cafés in Condesa, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Condesa cafés',
          },
          {
            title: 'Tlacoyo and torta networking lunch',
            pitch:
              'A weekly lunch at a market food stand where people rotate tables and share what they do over tlacoyos and tortas.',
            audience: 'Professionals and newcomers',
            venueType: 'A mercado or fonda in Roma or Condesa',
          },
          {
            title: 'International newcomer social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime residents over mezcal and conversation prompts.',
            audience: 'Newcomers to the city, including expats',
            venueType: 'Community center or pulquería event room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Día de Muertos altar workshop mixer',
            pitch:
              'People build a community ofrenda together while meeting neighbors, with papel picado and marigolds provided.',
            audience: 'Anyone who loves the holiday',
            venueType: 'Community center or cultural space',
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
            venueType: 'Café or community center in Roma',
          },
          {
            title: 'Chilango food history walk',
            pitch:
              'A guided tasting walk through a neighborhood mercado with the stories behind tamales, elotes, and churros.',
            audience: 'Food lovers and newcomers',
            venueType: 'A public mercado and surrounding streets',
          },
          {
            title: 'Mezcal tasting and tradition night',
            pitch:
              'An honest introduction to agave spirits, with producers explaining regions, varieties, and craft.',
            audience: 'Spirits lovers and curious beginners',
            venueType: 'Mezcalería or cultural center',
          },
          {
            title: 'Tenant rights workshop',
            pitch:
              'A plain-language session on leases, deposits, and where to get free legal help.',
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Lucha libre etiquette night',
            pitch:
              'A fun primer on the masks, heroes, and rituals of lucha libre before a group night at the arena.',
            audience: 'Curious newcomers to lucha',
            venueType: 'Community center or bar with a screen',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Chapultepec Sunday picnic',
            pitch:
              'Blankets, music, and a potluck in the city’s great park, with a walking tour of the lake.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Chapultepec Park lawns',
          },
          {
            title: 'Xochimilco trajinera ride',
            pitch:
              'A relaxed canal ride on a colorfully decorated boat with snacks, music, and new friends.',
            audience: 'Anyone who wants a floating party',
            venueType: 'Xochimilco canal docks',
          },
          {
            title: 'Coyoacán plaza stroll',
            pitch:
              'A slow walk through the historic plaza and markets, with stops for coffee and street food.',
            audience: 'Sunday explorers',
            venueType: 'Coyoacán plazas and market streets',
          },
          {
            title: 'Lucha libre arena night',
            pitch:
              'A group outing to a Friday night lucha show, with newcomers learning the chants and characters.',
            audience: 'Wrestling fans and first-timers',
            venueType: 'Arena México or a neighborhood arena',
          },
          {
            title: 'Cycling Sunday on closed streets',
            pitch:
              'A relaxed ride on the streets closed to cars for the weekly ciclovía, with breakfast stops.',
            audience: 'Leisure cyclists of every level',
            venueType: 'Ciclovía route streets',
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
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where designers, filmmakers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Roma Norte',
          },
          {
            title: 'Mariachi and music business meetup',
            pitch:
              'An informal evening for musicians, producers, and venue owners to talk about the city’s music economy.',
            audience: 'Musicians and music industry professionals',
            venueType: 'Music venue or cultural center',
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
            title: 'Mural walk through the Centro',
            pitch:
              'A guided walk past the great murals of the historic center, with the stories behind the artists.',
            audience: 'Art lovers and history buffs',
            venueType: 'Centro Histórico streets and courtyards',
          },
          {
            title: 'Alebrije and artisan craft session',
            pitch:
              'A hands-on evening learning the painted-paper craft from an artisan, with materials provided.',
            audience: 'Craft lovers and makers',
            venueType: 'Cultural center or artisan workshop',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Roma or Condesa music venue',
          },
          {
            title: 'Cine de barrio screening night',
            pitch:
              'A neighborhood-style outdoor film screening with a community discussion afterward.',
            audience: 'Film lovers and neighbors',
            venueType: 'Community plaza or cultural center',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Roma',
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
            title: 'Chinampa and lake conservation day',
            pitch:
              'A volunteer day in Xochimilco helping with chinampa restoration and learning about the canals.',
            audience: 'Volunteers and nature lovers',
            venueType: 'Xochimilco wetland areas',
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
            title: 'Local business storytelling night',
            pitch:
              'Shop and mercado owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or mercado hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Mexico City, a neighborhood anchor, a metro-accessible venue, and a format that welcomes newcomers tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organize?',
        answer:
          'No. Many Mexico City events run in English or bilingually, especially in Roma and Condesa. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Mexico City Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Mexico City?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Mexico City?',
      answer:
        'Yes. The city has free public venues, a vast and curious population, and a rich culture of gathering. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Chapultepec Park, Xochimilco canals, Roma cafés, public markets, cultural centers — exists in Mexico City. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Mexico City?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps residents find or start Origins.',
    },
  ],
};

export default content;
