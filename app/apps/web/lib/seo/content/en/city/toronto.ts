import type { CityContent } from '../../types';

/**
 * Toronto content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about Canada’s largest, most multicultural city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'toronto',
  intro: [
    'Toronto is Canada’s largest city, home to about 2.8 million people within the city limits and more than six million in the surrounding region, and it is one of the most multicultural cities on earth — more than half of its residents were born outside Canada. That diversity shapes everything: neighborhoods like Kensington Market, Chinatown, Little Italy, and Scarborough each hold distinct food, language, and community scenes, and the city’s festivals — from TIFF to Pride to the Caribbean Carnival — reflect a population that spans the globe.',
    'The city is Canada’s financial center, and over the past two decades it has also become the country’s tech and film hub: banks and Bay Street anchor downtown, a startup ecosystem thrives around MaRS and King West, and the film industry has earned the city the nickname Hollywood North. The University of Toronto, Toronto Metropolitan University, and York University feed constant flows of students and researchers into the city’s communities. Public anchors include High Park, the Toronto Islands, the waterfront trail, Nathan Phillips Square, and St. Lawrence Market, and the TTC subway and GO Transit make cross-city gathering practical even in winter.',
    'Toronto winters are real but the city has learned to gather indoors: the PATH network, libraries, and a dense stock of cafés, breweries, and community centers keep groups meeting through January. For finding or starting an Origin, Toronto rewards a welcoming, international approach — most groups naturally run in English and welcome newcomers — and a venue that is transit-accessible.',
  ],
  dataPoints: [
    'About 2.8 million residents in the city; 6M+ in the region.',
    'Canada’s financial center and a major tech and film hub.',
    'More than half of residents born outside Canada.',
    'Anchors: University of Toronto, TMU, York University.',
    'Public anchors: High Park, Toronto Islands, waterfront trail, St. Lawrence Market.',
    'Neighborhood scenes: Kensington Market, King West, Liberty Village, Leslieville, Scarborough.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in King West and the downtown core',
        'MaRS Discovery District event rooms',
        'University incubators near U of T and TMU',
        'Liberty Village startup offices',
        'Waterfront innovation spaces',
        'Brewery and café founder evenings in the Distillery District',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Fintech and AI panel evenings',
        'Hollywood North media-tech meetups',
        'Canadian venture happy hours',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, AI, health tech, or media tech — and a downtown anchor.',
        'Book a recurring weekly slot at a King West or MaRS-adjacent coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Distillery District galleries and studios',
        'Queen West and Kensington Market creative shops',
        'Film and post-production studios',
        'Music venues on Queen West and Ossington',
        'OCAD and TMU creative spaces',
        'Gallery and museum event rooms',
      ],
      formats: [
        'Screening nights with director Q&As',
        'Studio open weekends and art walks',
        'Design critique evenings',
        'Music and production circles',
        'Comedy and improv showcases',
      ],
      howToStart: [
        'Choose one craft — film, design, music, visual art — and a neighborhood.',
        'Partner with a gallery, studio, or venue that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City Hall and committee rooms',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces downtown',
        'Park and plaza event spaces',
      ],
      formats: [
        'Housing and rent-control info evenings',
        'Tenant rights workshops',
        'Transit and street-safety volunteer briefings',
        'Budget consultation prep sessions',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a block, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'High Park lawns and trails',
        'Toronto Islands ferry and beaches',
        'Kensington Market cafés and alleys',
        'Waterfront trail paths',
        'Neighborhood breweries and bars',
        'Public libraries with community rooms',
      ],
      formats: [
        'Weekend bike and run groups',
        'Island picnic and beach days',
        'Board game and trivia evenings',
        'Food market and festival walks',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a Saturday ride, a monthly market walk — and a fixed meeting point.',
        'Pick a spot like High Park or a Kensington Market café that is easy to reach by subway.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Kensington Market and Queen West shop corridors',
        'St. Lawrence Market vendor spaces',
        'City small business center workshops',
        'Board of Trade event rooms',
        'Local cafés with community corners',
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
        'After three breakfasts, rotate one practical topic per month and let the local BIA spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Toronto startup scene is Canada’s largest and one of North America’s most dynamic, built on the city’s financial sector, its world-class universities, and a deep pool of engineering and AI talent. King West and the downtown core hold the densest concentration of coworking spaces and venture-backed startups, MaRS Discovery District anchors research commercialization and health tech, and the city’s film and media industries feed a growing layer of media-tech companies. The University of Toronto is a global leader in AI research, and that expertise has spawned one of the strongest AI startup ecosystems anywhere. What makes Toronto distinctive is its international character: founders and engineers come from every continent, and the scene runs comfortably in English while welcoming the city’s enormous diversity. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and open. Honest advice for starting a startup Origin in Toronto: pick a vertical, anchor downtown, and lean into the city’s collaborative, government-supported ecosystem — a consistent weekly event will quickly become a fixture.',
    creative:
      'Toronto creative communities reflect the city’s role as the production capital of English-language Canadian culture: film and television, music, design, publishing, and theater all thrive within a few square kilometers of downtown. The Distillery District and Queen West anchor galleries and studios, Kensington Market holds a bohemian layer of independent shops and makers, and the film industry — the reason Hollywood North is a real nickname — keeps a steady flow of production work and talent in the city. TIFF puts the city on the global cinema map every September, but the everyday scene is smaller and friendlier: screening nights, studio open weekends, design critiques, and open mics in neighborhood venues. OCAD University and Toronto Metropolitan University feed new creative graduates into the scene each year. Starting a creative Origin in Toronto means choosing a discipline and a neighborhood, then using the city’s deep stock of venues and its genuinely multicultural audience to build something with staying power.',
    political:
      'Toronto political and civic communities operate at the municipal level — the city has no provincial or federal seat, so local politics around housing, transit, and public space dominate the agenda. Housing affordability is the defining issue: rent control campaigns, tenant unions, and anti-displacement groups organize across the city, while transit advocates push for better subway, streetcar, and bike infrastructure. The city’s multicultural neighborhoods also generate strong community organizations around settlement, language, and cultural preservation. City Hall committee meetings and budget consultations are genuinely open to the public, and neighborhood associations give blocks a formal voice in planning. Civic tech communities build tools for open data and public engagement. The political culture rewards persistence and local knowledge: organizers who run tenant groups also host newcomer-friendly workshops on how the city works. Starting a civic Origin in Toronto usually means picking a concrete issue and a small geography, then partnering with the rich existing landscape of organizers.',
    meetup:
      'Toronto meetup culture is defined by its diversity, its transit network, and its seasons: in warm months, High Park, the Toronto Islands, and the waterfront trail fill with running clubs, picnic groups, and bike rides; in winter, the same communities move indoors to cafés, breweries, and community centers, and the PATH underground network keeps the downtown core walkable. The city’s immigrant communities make it one of the best places in the world for food-centered meetups — market walks, dumpling crawls, and international potlucks are a genre of their own. The TTC and GO Transit make cross-city gathering practical, so a group can anchor in Leslieville and still pull members from Scarborough. Formats with staying power are simple and repeatable: a Saturday ride, a monthly market walk, a standing trivia night. Honest advice for starting a meetup in Toronto: pick a transit-accessible venue, choose a format that welcomes newcomers, and let the city’s famously polite and open culture do the growth work.',
    'small-business':
      'Toronto small business communities are as diverse as the city: the Kensington Market vintage shop, the Chinatown herbalist, the Little Italy trattoria, the Scarborough family bakery, and the Queen West boutique all share practical questions about rent, permits, staffing, and the high cost of doing business in a global city. Business improvement areas — Toronto’s merchant associations, known as BIAs — organize street festivals, markets, and shared advocacy along every commercial corridor, giving owners a ready-made community. St. Lawrence Market and the city’s many food halls give vendors natural meeting points, and the Board of Trade plus city small business centers offer workshops on licensing, loans, and digital selling. Newcomers typically connect by attending a BIA meeting, taking a city workshop, or joining a market vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and delivery apps, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Toronto’s multicultural population, transit network, and love of festivals make it a rich place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Toronto, from High Park and the Toronto Islands to Kensington Market cafés, St. Lawrence Market, and neighborhood breweries. Some ideas work as one-off events; others are designed to become recurring Origins that survive winter by moving indoors. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s openness do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Waterfront walk and talk',
            pitch:
              'A slow walk along the waterfront trail with rotating conversation prompts, ending at a café for coffee.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Waterfront trail and a nearby café',
          },
          {
            title: 'Founder AMA at a King West coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'King West coworking space',
          },
          {
            title: 'Newcomer welcome social',
            pitch:
              'A low-pressure evening where recent arrivals meet longtime Torontonians over snacks and conversation prompts.',
            audience: 'Newcomers to the city',
            venueType: 'Community center or library event room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Market-to-market networking walk',
            pitch:
              'A guided walk between St. Lawrence Market and Kensington Market with stops to talk with vendors and each other.',
            audience: 'Food lovers and networkers',
            venueType: 'St. Lawrence Market and Kensington Market',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Canadian small business basics',
            pitch:
              'A practical session on business registration, taxes, and funding programs for new owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Tenant rights in Ontario',
            pitch:
              'A plain-language session on rent control, leases, and the Landlord and Tenant Board.',
            audience: 'Renters and tenant advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Island ecology walk',
            pitch:
              'A guided walk on the Toronto Islands learning about the local ecosystem, birds, and history.',
            audience: 'Nature lovers and families',
            venueType: 'Toronto Islands paths',
          },
          {
            title: 'Civic 101: how the city works',
            pitch:
              'A plain-language workshop on council, budget consultations, and how residents can participate.',
            audience: 'New activists and curious residents',
            venueType: 'City Hall or library meeting room',
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
            title: 'High Park picnic and games',
            pitch: 'Blankets, lawn games, and a potluck near the lake in the city’s largest park.',
            audience: 'Friends, families, and newcomers',
            venueType: 'High Park lawns',
          },
          {
            title: 'Toronto Islands beach day',
            pitch: 'A ferry ride and a relaxed day of beach, bikes, and picnics on the islands.',
            audience: 'Anyone who needs a city escape',
            venueType: 'Toronto Islands ferry and beaches',
          },
          {
            title: 'Kensington Market food walk',
            pitch:
              'A guided tasting walk through the market’s alleys with the stories behind its shops.',
            audience: 'Food lovers and first-time visitors',
            venueType: 'Kensington Market alleys and shops',
          },
          {
            title: 'Board game night at a Leslieville brewery',
            pitch:
              'A monthly stack of board games at a neighborhood brewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Leslieville or Dundas West brewery',
          },
          {
            title: 'Winter indoor social',
            pitch:
              'A cozy evening of hot drinks, board games, and conversation designed to beat February.',
            audience: 'Anyone who needs a winter pick-me-up',
            venueType: 'Neighborhood café or community center',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech breakfast briefing',
            pitch:
              'An early-morning talk plus open Q&A on a timely fintech topic, designed to fit before the workday.',
            audience: 'Fintech professionals and investors',
            venueType: 'Bay Street office space',
          },
          {
            title: 'AI builders meetup',
            pitch:
              'Researchers, engineers, and founders share recent work and practical lessons in the local AI scene.',
            audience: 'AI researchers and practitioners',
            venueType: 'MaRS or university event space',
          },
          {
            title: 'Film and television crew mixer',
            pitch:
              'An informal evening where crew and creative professionals in Hollywood North trade notes and contacts.',
            audience: 'Film and TV industry professionals',
            venueType: 'Production studio or industry bar',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
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
            title: 'Short film screening night',
            pitch:
              'Local filmmakers screen short work followed by a director Q&A and constructive conversation.',
            audience: 'Filmmakers and film lovers',
            venueType: 'Independent cinema or gallery screening room',
          },
          {
            title: 'Distillery District studio walk',
            pitch:
              'Artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Distillery District artist studios',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Queen West or Kensington venue',
          },
          {
            title: 'Comedy and improv night',
            pitch:
              'A fun, low-pressure showcase where local comics and improv troupes try new material.',
            audience: 'Comics, improvisers, and comedy fans',
            venueType: 'Comedy club or community theater',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space downtown',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Ravine cleanup morning',
            pitch:
              'A Saturday morning cleanup of one of the city’s ravine trails, with gloves and coffee supplied.',
            audience: 'Volunteers and nature lovers',
            venueType: 'A chosen ravine trail',
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
              'A plain-language session on rent control, leases, and where to get free legal help.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Neighborhood food drive and sorting day',
            pitch:
              'A collection drive and sorting shift for a local food bank, with a thank-you potluck after.',
            audience: 'First-time volunteers and neighbors',
            venueType: 'Local food bank or community center',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop owners share the stories behind their businesses in five-minute talks, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or BIA hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Toronto, transit-accessible venues and formats that welcome newcomers — market walks, welcome socials, language exchanges — tend to fill fastest.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, the waterfront trail, public libraries, and community centers. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Toronto Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Toronto?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where Torontonians gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Toronto?',
      answer:
        'Yes. The city has free public venues, an excellent transit network, and a welcoming multicultural culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — High Park, the Toronto Islands, Kensington Market, St. Lawrence Market, neighborhood breweries — exists in Toronto. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Toronto?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Torontonians find or start Origins.',
    },
  ],
};

export default content;
