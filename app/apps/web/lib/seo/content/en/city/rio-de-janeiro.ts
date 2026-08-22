import type { CityContent } from '../../types';

/**
 * Rio de Janeiro content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the beach-and-mountain Brazilian city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'rio-de-janeiro',
  intro: [
    'Rio de Janeiro is Brazil’s second-largest city — about 6.7 million people inside the city limits and more than thirteen million across the metro — set between the ocean, the mountains, and the Tijuca Forest in a way that shapes every part of its life. The beaches of Copacabana, Ipanema, and Leblon are the living rooms of the city: volleyball, footvolley, running, and casual gatherings happen there every day of the year.',
    'Rio is the cultural capital of Brazilian music and carnival: samba schools prepare all year for the parades, the Lapa neighborhood holds legendary nightlife and roda de samba circles, and the city’s street parties (blocos) turn entire neighborhoods into festivals. Landmarks like Sugarloaf, Christ the Redeemer, the Botanical Garden, and the Escadaria Selarón draw visitors, but they are also real parts of daily life. UFRJ, PUC-Rio, and UERJ feed constant flows of students and researchers into the city’s communities, and the city is also a growing hub for creative work, tech, and the ocean economy.',
    'Rio is a city of strong community feeling — the word comunidade is used with pride — and its geography creates natural gathering places. For finding or starting a community, Rio rewards a casual, warm format: a beach session, a roda de samba, a favela tour with a local guide, a hike in the forest. The city runs on relationships and word of mouth, so a consistent weekly event with a warm welcome will spread quickly.',
  ],
  dataPoints: [
    'About 6.7 million residents; 13M+ in the metro.',
    'Beach city between ocean, mountains, and Tijuca Forest.',
    'Samba, carnival, music, and creative industry clusters.',
    'Anchors: UFRJ, PUC-Rio, UERJ, UNIRIO.',
    'Public anchors: Copacabana and Ipanema beaches, Sugarloaf, Botanical Garden.',
    'Neighborhood scenes: Ipanema, Copacabana, Botafogo, Santa Teresa, Lapa, Centro.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Botafogo and Ipanema',
        'Centro startup offices',
        'University incubators near UFRJ and PUC-Rio',
        'Creative-tech offices in Laranjeiras',
        'Accelerator event rooms in Botafogo',
        'Cafés with founder tables in Ipanema',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Ocean and climate economy panels',
        'Creative and media-tech meetups',
        'Beach-side founder socials',
      ],
      howToStart: [
        'Pick a narrow vertical — ocean tech, creative tech, or tourism tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Botafogo or Ipanema coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Lapa music venues and samba circles',
        'Santa Teresa artist studios',
        'Centro cultural spaces',
        'Botafogo design studios',
        'Street-art walks in the port area',
        'Samba school rehearsal halls',
      ],
      formats: [
        'Roda de samba evenings',
        'Studio open weekends',
        'Screening nights with director Q&As',
        'Design critique evenings',
        'Street-art and photography walks',
      ],
      howToStart: [
        'Choose one craft — music, visual art, design, film — and a neighborhood.',
        'Partner with a cultural center, studio, or samba school that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City hall and council chambers',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Favela community association halls',
        'Civic tech meetup spaces in Centro',
        'Park and beach-side event spaces',
      ],
      formats: [
        'Housing and land-rights info evenings',
        'Community association meetings',
        'Transit and mobility volunteer briefings',
        'Climate and flood-preparedness circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a neighborhood, a community, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Copacabana and Ipanema beach stretches',
        'Botafogo beach and Urca paths',
        'Tijuca Forest trailheads',
        'Lapa bars and samba circles',
        'Santa Teresa streets and stairs',
        'Public libraries with community rooms',
      ],
      formats: [
        'Beach volleyball and footvolley pickup',
        'Sunday trail hikes in the forest',
        'Sunset beach gatherings',
        'Board game and trivia evenings',
        'Samba and dance socials',
      ],
      howToStart: [
        'Choose a repeatable format — a beach session, a Sunday hike — and a fixed meeting point.',
        'Pick a spot like a Copacabana beach kiosk or a Tijuca trailhead that is easy to find.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Copacabana and Ipanema shop corridors',
        'Mercado vendor spaces',
        'City small business center workshops',
        'Commercial association event rooms',
        'Local cafés and quiosques with community corners',
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
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and tourism seasons.',
        'After three breakfasts, rotate one practical topic per month and let the commercial association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Rio de Janeiro startup scene is smaller than São Paulo’s but distinctive, built on the city’s strengths in the ocean economy, creative industries, tourism, and climate technology. Botafogo and Ipanema hold coworking spaces and startup offices, Centro anchors the corporate layer, and universities like UFRJ and PUC-Rio feed engineering and research talent. What makes Rio different is its quality of life: founders work by the beach, investors hold meetings with ocean views, and the scene runs on relationships and word of mouth rather than formal institutions. The city is a natural hub for ocean and climate tech — wave energy, coastal resilience, sustainable tourism — and its creative economy gives startups unusual access to designers, filmmakers, and musicians. Established formats include founder breakfasts, demo nights, and industry panels, many of them friendly to newcomers. Honest advice for starting a startup community in Rio: pick a vertical, anchor to a neighborhood, and embrace the city’s warm, informal style — a consistent weekly event by the beach will build a loyal following.',
    creative:
      'Rio de Janeiro creative communities are inseparable from the city’s identity: samba, bossa nova, carnival, film, and street art all grew from the neighborhoods of this city, and they remain alive in venues across Rio. Lapa is the musical heart — its bars and samba circles draw locals and visitors every night of the week — while Santa Teresa holds artist studios and bohemian cafés in its hillside streets. The city’s carnival culture is a year-round creative industry: samba schools, costume makers, and musicians prepare for months, and the street parties (blocos) turn neighborhoods into stages. The port area’s murals and the Escadaria Selarón add a world-famous layer of street art. UFRJ and the city’s arts institutions feed new talent each year. Starting a creative community in Rio means choosing a discipline and a neighborhood, then using the city’s deep musical and visual culture to build something with genuine soul.',
    political:
      'Rio de Janeiro political and civic communities are shaped by the city’s dramatic geography and its deep inequalities: favelas, formal neighborhoods, and environmental assets exist side by side, and community associations are a powerful force in local life. Housing and land rights are defining issues — many communities organize around tenure, upgrading, and public services — and the city’s favelas have a strong tradition of self-organization and mutual aid. Flooding, landslide risk, and climate change drive preparedness networks and environmental advocacy, while transit and mobility groups push for better Metro and bus service. Civic tech communities build tools for open data and public engagement, and volunteer networks organize beach cleanups, tree planting, and social programs. The political culture rewards persistence, community trust, and genuine relationship-building — organizers who live in and with their communities are the ones who move things forward. Starting a civic community in Rio usually means picking a concrete issue and a small geography, then partnering with the rich existing landscape of associations.',
    meetup:
      'Rio de Janeiro meetup culture is built on the beach and the hills: beach volleyball and footvolley pickup games on Copacabana, sunset gatherings on Ipanema, Sunday hikes through the Tijuca Forest, and roda de samba circles in Lapa. The city’s geography creates natural meeting points — a beach kiosk, a trailhead, a neighborhood square — and its tropical climate means outdoor formats run all year. Rio is also a festival city: the street parties of carnival season, the blocos, and the many neighborhood celebrations give groups ready-made occasions to gather. The city’s warm, informal social style means newcomers are welcomed quickly, and word of mouth spreads events fast. Formats with staying power are simple and repeatable: a weekly beach session, a monthly hike, a standing samba night. Honest advice for starting a meetup in Rio: pick a landmark meeting point, choose a format that matches the city’s casual energy, and let the warmth of the people do the growth work.',
    'small-business':
      'Rio de Janeiro small business communities are built on the city’s streets, beaches, and markets: the quiosque owner on Copacabana beach, the Lapa bar owner, the Santa Teresa atelier, the feira vendor, and the Ipanema boutique all share practical questions about rent, permits, staffing, and the rhythm of tourism seasons. The city’s markets and feiras give vendors natural communities, and commercial corridors in Copacabana, Ipanema, and the Centro hold shop clusters with a shared stake in foot traffic. Commercial associations and city small business centers offer workshops on licensing, loans, and digital selling, and the city’s huge tourism economy means many small businesses live and die by seasonal planning. The quiosques (beach kiosks) are a uniquely Rio institution — small licensed businesses that anchor beach life. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a feira vendor collective. Starting a small business community here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and carnival-season planning, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Rio de Janeiro’s beaches, hills, music, and warm social culture make it a spectacular place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Rio, from Copacabana beach kiosks and Tijuca Forest trails to Lapa samba circles and neighborhood cultural centers. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Beach walk and talk',
            pitch:
              'A slow walk along the Copacabana promenade with rotating conversation prompts, ending at a kiosk for coconut water.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Copacabana beach promenade',
          },
          {
            title: 'Founder AMA at a Botafogo coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Botafogo coworking space',
          },
          {
            title: 'Newcomer sunset social',
            pitch:
              'A low-pressure gathering at sunset where recent arrivals meet longtime Cariocas over snacks and conversation prompts.',
            audience: 'Newcomers to the city, including expats',
            venueType: 'Ipanema beach or a neighborhood square',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Samba school behind-the-scenes visit',
            pitch:
              'A guided visit to a samba school’s rehearsal, followed by a mixer where visitors meet members.',
            audience: 'Culture lovers and networkers',
            venueType: 'Samba school rehearsal hall',
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
            venueType: 'Café or community center in Botafogo',
          },
          {
            title: 'Small business finance in plain Portuguese',
            pitch:
              'A practical session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Samba percussion for beginners',
            pitch:
              'A hands-on evening where beginners learn basic samba rhythms alongside experienced players.',
            audience: 'Musicians and rhythm-curious beginners',
            venueType: 'Community center or music studio',
          },
          {
            title: 'Tijuca Forest ecology walk',
            pitch:
              'A guided hike through the urban forest learning about its plants, animals, and history.',
            audience: 'Nature lovers and hikers',
            venueType: 'Tijuca Forest trailhead',
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
            title: 'Beach volleyball pickup',
            pitch:
              'A weekly pickup game on the Copacabana sand, open to every level, with a group snack after.',
            audience: 'Volleyball players and beginners',
            venueType: 'Copacabana beach courts',
          },
          {
            title: 'Sunset gathering at Arpoador',
            pitch:
              'A weekly sunset meetup on the famous rock, with music, snacks, and new friends.',
            audience: 'Sunset lovers and newcomers',
            venueType: 'Arpoador rock and Ipanema beach',
          },
          {
            title: 'Tijuca Forest Sunday hike',
            pitch:
              'A beginner-friendly hike through the urban forest, with waterfall stops and a picnic.',
            audience: 'Hikers of every level',
            venueType: 'Tijuca Forest trails',
          },
          {
            title: 'Roda de samba night',
            pitch:
              'A welcoming evening of live samba in a circle, where newcomers are invited to join in.',
            audience: 'Music lovers and dancers',
            venueType: 'Lapa bar or samba circle venue',
          },
          {
            title: 'Board game night at a neighborhood bar',
            pitch: 'A monthly stack of board games at a bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Botafogo or Lapa bar',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Ocean and climate economy roundtable',
            pitch:
              'A monthly discussion for founders and operators working on coastal resilience, ocean tech, and sustainability.',
            audience: 'Ocean and climate tech professionals',
            venueType: 'Coworking or university event room',
          },
          {
            title: 'Creative industries mixer',
            pitch:
              'An informal evening where filmmakers, designers, and media professionals trade notes and contacts.',
            audience: 'Creative industry professionals',
            venueType: 'Cultural center or design studio',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio in Botafogo',
          },
          {
            title: 'Tourism and hospitality meetup',
            pitch:
              'An informal evening for operators in the city’s tourism economy to share trends and contacts.',
            audience: 'Tourism and hospitality professionals',
            venueType: 'Hotel or tourism office event space',
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
            title: 'Street-art walk through the port area',
            pitch:
              'A guided walk past the murals of the revitalized port district, with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'Port area streets and murals',
          },
          {
            title: 'Studio open day in Santa Teresa',
            pitch:
              'Artists open their hillside studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious visitors',
            venueType: 'Santa Teresa artist studios',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Lapa or Santa Teresa venue',
          },
          {
            title: 'Carnival costume workshop',
            pitch:
              'A hands-on evening learning costume and headdress techniques from a carnival maker.',
            audience: 'Carnival lovers and makers',
            venueType: 'Samba school or community workshop',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Centro',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of beach, with gloves and coffee supplied.',
            audience: 'Volunteers and ocean lovers',
            venueType: 'A chosen beach stretch',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Flood and rain-preparedness circle',
            pitch:
              'A neighborhood group that maps risks, shares resources, and plans for heavy rain season.',
            audience: 'Residents concerned about climate and safety',
            venueType: 'Community center or association hall',
          },
          {
            title: 'Community association open house',
            pitch:
              'A neighborhood association hosts an open evening so residents can learn about local projects and join in.',
            audience: 'Residents of one neighborhood',
            venueType: 'Community association hall',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and quiosque owners share the stories behind their businesses in five-minute talks.',
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
          'Match the category to your interests and the audience you can reach. In Rio, beach, music, and outdoor formats with a warm welcome tend to build community fastest.',
      },
      {
        question: 'Do I need to speak Portuguese to organize?',
        answer:
          'No. Many Rio events run in English or bilingually, especially in beach neighborhoods. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Rio communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Rio de Janeiro?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Cariocas gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Rio de Janeiro?',
      answer:
        'Yes. The city has free public venues, a warm social culture, and a rich musical life. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Copacabana beach kiosks, Tijuca Forest trails, Lapa samba circles, Santa Teresa studios — exists in Rio de Janeiro. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Rio de Janeiro?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Cariocas find or start communities.',
    },
  ],
};

export default content;
