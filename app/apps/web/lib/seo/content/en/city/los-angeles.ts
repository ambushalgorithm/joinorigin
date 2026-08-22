import type { CityContent } from '../../types';

/**
 * Los Angeles content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the spread-out, industry-driven city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'los-angeles',
  intro: [
    'Los Angeles is a vast, spread-out city of about 3.8 million people that behaves less like a single downtown and more like a federation of neighborhoods, each with its own scene: Hollywood and Burbank for entertainment, Venice and Santa Monica for beachside tech, Silver Lake and Echo Park for music and creative work, Koreatown and Pasadena for dense international communities, and Downtown for finance, law, and a growing startup corridor.',
    'The car is the organizing fact of Los Angeles life. Communities form around geography — a neighborhood, a commute corridor, a beach — and events usually anchor to a specific venue because people will drive across town for the right group. That spread is balanced by extraordinary diversity: the city is a global crossroads of Latin American, Asian, and Middle Eastern communities, and its food, language, and cultural scenes reflect that mix. Griffith Park, the beach boardwalks, the Hollywood Sign trails, and the LA River bike paths offer free public gathering places.',
    'Universities like UCLA, USC, CalArts, and ArtCenter keep a constant flow of students and alumni cycling through the scene, and the entertainment industry means everyone from screenwriters to set designers to musicians is used to networking. For finding or starting a community, Los Angeles rewards choosing a clear niche and a consistent venue — a weekly table at the same café, a monthly hike, a standing industry mixer — because consistency is what cuts through the traffic and the noise.',
  ],
  dataPoints: [
    'About 3.8 million residents across a sprawling metro.',
    'Regional anchors include UCLA, USC, CalArts, and ArtCenter.',
    'Entertainment, media, fashion, aerospace, and tech clusters.',
    'Freeway-centric geography — communities anchor to neighborhoods and venues.',
    'Public anchors: Griffith Park, Santa Monica Pier, Venice Beach, LA River paths.',
    'Neighborhood scenes: Hollywood, Silver Lake, Venice, Koreatown, Pasadena, Downtown.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Santa Monica and Playa Vista',
        'Downtown LA startup lofts',
        'Hollywood and Burbank media-tech offices',
        'Venice cafés with founder tables',
        'Accelerator event rooms near UCLA and USC',
        'Culver City creative-tech studios',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Media-tech and entertainment-tech panels',
        'Creator economy and indie hacker meetups',
        'South Bay aerospace-adjacent tech evenings',
      ],
      howToStart: [
        'Pick a narrow vertical — creator tools, media tech, health tech, or defense tech — and an explicit neighborhood anchor.',
        'Reserve a recurring weekly slot at a Santa Monica or Culver City coworking space.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Silver Lake and Echo Park music venues',
        'Hollywood and downtown gallery spaces',
        'Venice artist studios and galleries',
        'Film and design studios in Culver City',
        'Craft workshops and print shops in Atwater Village',
        'Museum and cultural center event rooms',
      ],
      formats: [
        'Screening nights with director Q&As',
        'Studio open weekends and art walks',
        'Pitch rooms for writers and filmmakers',
        'Design and music production circles',
        'Costume, prop, and craft showcases',
      ],
      howToStart: [
        'Choose one craft — screenwriting, music production, painting, costume design — and a neighborhood.',
        'Partner with a gallery, studio, or venue that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City Hall and council district offices',
        'Neighborhood council meeting rooms',
        'Tenant and housing advocacy offices',
        'Public library meeting rooms',
        'Community gardens and park event spaces',
        'Civic tech meetup spaces in Downtown',
      ],
      formats: [
        'Housing and rent-control info evenings',
        'Neighborhood council sessions',
        'Transit and street-safety volunteer briefings',
        'Tenant rights workshops',
        'Volunteer canvassing and phone-banking shifts',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a council district, a corridor, or one housing policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how city government works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Griffith Park trails and picnic areas',
        'Venice Beach boardwalk and skate plazas',
        'Echo Park Lake paths',
        'Neighborhood cafés and breweries',
        'Public libraries with community rooms',
        'Pasadena parks and rose garden lawns',
      ],
      formats: [
        'Weekend hike and trail-run groups',
        'Beach volleyball and paddle sessions',
        'Board game and trivia evenings',
        'Food truck and taco crawl meetups',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a Saturday hike, a monthly taco crawl — and a fixed meeting point.',
        'Pick a landmark like Griffith Park or a Venice café that is easy to find and park near.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Neighborhood shop corridors in Koreatown and the Arts District',
        'Grand Central Market and farmers market vendor spaces',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Street fair and market planning sessions',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and foot traffic.',
        'After three breakfasts, rotate one practical topic per month and let the neighborhood council spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Los Angeles startup scene is the other great American tech hub, distinct from San Francisco in character: more consumer and creator focused, more diverse, and more comfortable with entertainment, media, and lifestyle industries. Santa Monica and Playa Vista anchor a beachside tech cluster, Downtown LA has a growing fintech and logistics corridor, and Culver City has become a creative-tech hub where startups sit alongside film and television studios. The region’s universities — UCLA, USC, CalArts — feed founders and talent, while the entertainment industry gives LA startups an edge in media, gaming, and the creator economy. Because the city is spread out, startup communities tend to anchor to a neighborhood rather than a single downtown: a founder in Santa Monica may rarely cross paths with a founder in Pasadena, which means there is room for many overlapping scenes. Established formats include founder breakfasts, demo nights, and industry-specific panels, many of them friendly to newcomers. Honest advice for starting a startup community in Los Angeles: pick a vertical and a geography, and commit to a regular venue — consistency beats reach in a city where everyone drives.',
    creative:
      'Los Angeles creative communities are the densest in the world in one respect: the entertainment industry concentrates writers, filmmakers, musicians, designers, and visual artists in a single metro. Hollywood, Silver Lake, Echo Park, Venice, and Culver City each host a distinct layer of the scene — from studio professionals to independent artists to a booming TikTok and YouTube creator class. Because the industry runs on relationships, community membership is a practical career asset: a writer’s group, a screening night, or a production circle can directly lead to work. Public anchors like Griffith Park and the beach offer free, iconic gathering places, and the city’s year-round sun supports outdoor art walks, film screenings, and studio open weekends. The creative economy here is honest about its hunger — people show up to meet, pitch, and collaborate — which makes LA one of the easiest places in the world to find peers in your exact craft. Starting a creative community means choosing a discipline and a neighborhood, then making feedback and opportunity the standing agenda.',
    political:
      'Los Angeles political and civic communities operate across an enormous, fragmented city, which makes local organizing both harder and more necessary. The city is divided into council districts and neighborhood councils, giving residents real entry points into land use, housing, and public safety debates. Housing is the defining issue — rent control campaigns, tenant unions, and homelessness response efforts keep volunteer organizations busy across the metro. Transit and street-safety advocacy is also strong, with groups organizing around Metro expansion, bus lanes, and protected bike routes. Civic tech communities build tools for open data and participatory budgeting, while neighborhood councils give blocks and corridors a formal voice in planning. The political culture rewards persistence and local knowledge: the organizers who run tenant unions also host newcomer-friendly workshops on how city government works. Starting a civic community in Los Angeles usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers rather than duplicating their work.',
    meetup:
      'Los Angeles meetup culture is defined by the city’s geography: with people spread across hundreds of square miles, a successful meetup needs a clear format, a memorable meeting point, and a reason to drive. Griffith Park draws hikers and trail runners from across the city, Venice Beach hosts volleyball, skate, and fitness groups, and Echo Park Lake anchors picnics and casual socials. The car culture means events cluster around neighborhoods, so a weekly trivia night in Pasadena and a monthly book club in Venice can both thrive without competing. The city’s diversity shows up in its meetups — taco crawls, Korean barbecue nights, and international food markets double as social events, and language exchanges are common in Koreatown, Little Tokyo, and Thai Town. Weather is a genuine asset: most outdoor formats run year-round. Honest advice for starting a meetup in Los Angeles: choose a specific neighborhood, a repeatable format, and a landmark meeting point, then run it at the same time and place until the group develops its own gravity.',
    'small-business':
      'Los Angeles small business communities are as diverse as the city itself: the Koreatown restaurant owner, the Arts District maker, the Grand Central Market vendor, the Boyle Heights taqueria, and the South Bay surf shop all share practical questions about rent, permits, staffing, and foot traffic. Because the city has no single downtown, small business networks form along corridors — stretches of shops and restaurants that share customers, parking, and public safety concerns. Farmers markets, food halls, and street fairs give vendors natural meeting points, and the city’s small business centers plus chambers of commerce offer workshops on licensing, loans, and digital marketing. Street food culture is a particular strength: taco vendors, food truck operators, and pop-up cooks have built their own mutual-aid networks around permitting and shared commissary kitchens. Starting a small business community in Los Angeles is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, health inspections, and delivery apps, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Los Angeles rewards organizers who pick a clear niche and a consistent venue, and its size, diversity, and weather make it a rich place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Los Angeles, from Griffith Park trails and Venice Beach plazas to Koreatown cafés and Grand Central Market corners. Some ideas work as one-off events; others are designed to become recurring communities with a monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s density of curious people do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'LA newcomer coffee circle',
            pitch:
              'A monthly café meetup where newcomers and long-term Angelenos trade neighborhood tips, industry notes, and contacts.',
            audience: 'New arrivals and anyone expanding their network',
            venueType: 'A Silver Lake or Echo Park café',
          },
          {
            title: 'Industry mixer for creative professionals',
            pitch:
              'A low-pressure evening where writers, producers, and designers meet over drinks with structured conversation prompts.',
            audience: 'Entertainment and creative professionals',
            venueType: 'Hollywood or Culver City venue',
          },
          {
            title: 'Founder AMA at a Santa Monica coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Santa Monica coworking space',
          },
          {
            title: 'Car-free Sunday social',
            pitch:
              'A meetup built around walking, transit, or biking to a brunch spot, with icebreaker prompts along the way.',
            audience: 'Transit fans and walkers',
            venueType: 'Metro station and nearby brunch spot',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Pitch practice for screenwriters',
            pitch:
              'Writers practice one-page pitches in small groups and receive honest, useful feedback.',
            audience: 'Screenwriters and filmmakers',
            venueType: 'Writer’s room or library meeting room',
          },
          {
            title: 'Small business licensing clinic',
            pitch:
              'A practical session covering business licenses, health permits, and insurance for new owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Surf theory and ocean safety talk',
            pitch:
              'A land-based workshop on waves, currents, and etiquette before beginners hit the water.',
            audience: 'Beginner surfers',
            venueType: 'Beach community center',
          },
          {
            title: 'Film production 101',
            pitch:
              'A practical overview of call sheets, permits, and crew roles for people entering the industry.',
            audience: 'Film industry newcomers',
            venueType: 'Studio lot or film school classroom',
          },
          {
            title: 'Urban gardening in LA climate',
            pitch:
              'A hands-on session on drought-tolerant planting, mulch, and drip irrigation for city yards and balconies.',
            audience: 'Home gardeners',
            venueType: 'Community garden or park nursery',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Griffith Park sunset hike',
            pitch:
              'A guided hike timed for sunset over the city, with a rotating theme and a picnic pause at the top.',
            audience: 'Hikers and sunset lovers',
            venueType: 'Griffith Park trails',
          },
          {
            title: 'Venice Beach boardwalk stroll',
            pitch:
              'A slow walk along the boardwalk with stops at the skate plaza, murals, and street performers.',
            audience: 'Sunday explorers and visitors',
            venueType: 'Venice Beach boardwalk',
          },
          {
            title: 'Echo Park Lake picnic and paddle',
            pitch:
              'A relaxed afternoon of picnic blankets, pedal boats, and lawn games by the lake.',
            audience: 'Families and friend groups',
            venueType: 'Echo Park Lake',
          },
          {
            title: 'Taco crawl through Boyle Heights',
            pitch:
              'A guided evening walk through one of the city’s great taco corridors, with a vote for the best bite.',
            audience: 'Food lovers and explorers',
            venueType: 'Boyle Heights taco corridors',
          },
          {
            title: 'Board game afternoon at an Arts District brewery',
            pitch: 'A monthly stack of board games at a brewery that welcomes slow afternoons.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Arts District brewery taproom',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Creator economy roundtable',
            pitch:
              'Content creators and platform professionals discuss a monthly topic — monetization, burnout, algorithm changes.',
            audience: 'YouTubers, podcasters, and creator-adjacent professionals',
            venueType: 'Culver City creative-tech studio',
          },
          {
            title: 'Aerospace and defense tech evening',
            pitch:
              'An informal talk and mixer for engineers and operators in the South Bay aerospace cluster.',
            audience: 'Aerospace and defense tech professionals',
            venueType: 'South Bay coworking or event space',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Gaming industry meetup',
            pitch:
              'Game developers and publishers trade notes on the local scene, hiring, and live-service trends.',
            audience: 'Game developers and industry professionals',
            venueType: 'Game studio office or event space',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Open mic for songwriters',
            pitch:
              'A welcoming open mic at a neighborhood venue with a short feature and a supportive audience.',
            audience: 'Songwriters and musicians',
            venueType: 'Silver Lake or Echo Park music venue',
          },
          {
            title: 'Studio open weekend in the Arts District',
            pitch:
              'Artists open their studios for one weekend of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Arts District artist studios',
          },
          {
            title: 'Short film screening night',
            pitch:
              'Local filmmakers screen short work followed by a director Q&A and constructive conversation.',
            audience: 'Filmmakers and film lovers',
            venueType: 'Independent cinema or gallery screening room',
          },
          {
            title: 'Costume and cosplay workshop',
            pitch:
              'A hands-on evening of foam, fabric, and paint techniques for costume builders of every level.',
            audience: 'Cosplayers and costume makers',
            venueType: 'Maker space or community workshop',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Atwater Village',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Neighborhood council 101',
            pitch:
              'A plain-language workshop on how LA neighborhood councils work and how residents can participate.',
            audience: 'New activists and curious residents',
            venueType: 'Neighborhood council office or library',
          },
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of beach or boardwalk, with gloves and coffee supplied.',
            audience: 'Volunteers and ocean lovers',
            venueType: 'A chosen beach or waterfront',
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
              'A plain-language session on rent control, eviction protections, and free housing counseling.',
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and restaurant owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or food hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Los Angeles, a specific neighborhood, a repeatable format, and a landmark meeting point are the keys to a thriving group.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, library meeting rooms, community gardens, and cafés that welcome groups. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Los Angeles communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Los Angeles?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Angelenos gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Los Angeles?',
      answer:
        'Yes. The city has free public venues, year-round outdoor weather, and a culture of networking. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Griffith Park, Venice Beach, Echo Park Lake, neighborhood cafés, public libraries — exists in Los Angeles. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Los Angeles?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Angelenos find or start communities.',
    },
  ],
};

export default content;
