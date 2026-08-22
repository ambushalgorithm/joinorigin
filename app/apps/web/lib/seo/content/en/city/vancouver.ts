import type { CityContent } from '../../types';

/**
 * Vancouver content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the outdoors-first Pacific city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'vancouver',
  intro: [
    'Vancouver is a Pacific coast city of about 662,000 people inside the city limits and more than two and a half million across the metro, set between the ocean and the mountains in a way that shapes almost every part of its community life. The Sea Wall around Stanley Park, the beaches of Kitsilano, Granville Island’s markets, and the trails of Grouse Mountain and the North Shore are not tourist backdrops — they are where locals run, paddle, picnic, and gather all year.',
    'The city is a major Canadian tech and film hub: video game studios, clean-tech companies, and the film industry known as Hollywood North anchor a scene that mixes engineers, artists, and filmmakers. UBC and SFU feed constant flows of students and researchers, while Emily Carr University feeds the design and creative economy. The SkyTrain and SeaBus make cross-city gathering practical, and the city’s famously diverse food scene — especially its Asian restaurants, from Richmond to the West End — gives communities natural places to meet.',
    'The rain is real, and so is the outdoor culture: Vancouverites own rain jackets, commute by bike, and schedule hikes around weather windows. For finding or starting a community, Vancouver rewards formats that work in any weather — a seawall walk with umbrellas, a covered market stall, a café table — and a group that respects the balance between ambition and the mountains that everyone secretly wants to be on.',
  ],
  dataPoints: [
    'About 662,000 residents in the city; 2.6M+ in the metro.',
    'Major Canadian tech and film hub (Hollywood North).',
    'Anchors: UBC, SFU, Emily Carr University.',
    'Public anchors: Stanley Park Sea Wall, Granville Island, Kitsilano Beach.',
    'SkyTrain and SeaBus connect the city and region.',
    'Neighborhood scenes: Gastown, Yaletown, Kitsilano, Commercial Drive, Mount Pleasant.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in Gastown and Yaletown',
        'Mount Pleasant startup offices',
        'University incubators near UBC and SFU',
        'Clean-tech and gaming office event rooms',
        'Waterfront innovation spaces in False Creek',
        'Brewery and café founder evenings on Main Street',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Gaming industry meetups',
        'Climate and clean-tech panels',
        'West Coast venture happy hours',
      ],
      howToStart: [
        'Pick a narrow vertical — climate tech, gaming, or AI builders — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Gastown or Mount Pleasant coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Granville Island studios and maker spaces',
        'Commercial Drive music and art venues',
        'Mount Pleasant artist studios',
        'Film and animation production spaces',
        'Design studios in Gastown',
        'Emily Carr University event rooms',
      ],
      formats: [
        'Studio open weekends and art walks',
        'Screening nights with director Q&As',
        'Animation and game-art critique circles',
        'Design critique evenings',
        'Comedy and improv showcases',
      ],
      howToStart: [
        'Choose one craft — film, animation, visual art, design — and a neighborhood.',
        'Partner with a Granville Island studio or gallery that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City Hall and council chambers',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces downtown',
        'Park and seawall event spaces',
      ],
      formats: [
        'Housing and rental info evenings',
        'Tenant rights workshops',
        'Transit and bike-lane volunteer briefings',
        'Climate action planning circles',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a neighborhood, a corridor, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the city works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Stanley Park Sea Wall paths',
        'Kitsilano and Jericho beaches',
        'Granville Island public market areas',
        'Commercial Drive cafés and bars',
        'Grouse Grind and North Shore trailheads',
        'Public libraries with community rooms',
      ],
      formats: [
        'Seawall run and walk clubs',
        'Weekend hike and trail-run groups',
        'Kayak and paddleboard meetups',
        'Board game and trivia evenings',
        'Farmers market and food socials',
      ],
      howToStart: [
        'Choose a repeatable format — a Saturday hike, a seawall walk — and a fixed meeting point.',
        'Pick a spot like the Sea Wall or a Commercial Drive café that is easy to reach by SkyTrain.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Commercial Drive and Main Street shop corridors',
        'Granville Island market vendor spaces',
        'City small business center workshops',
        'Board of Trade event rooms',
        'Local cafés and breweries with community corners',
        'Farmers market vendor spaces',
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
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and rain-season sales.',
        'After three breakfasts, rotate one practical topic per month and let the local business association spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Vancouver startup scene is smaller and more outdoorsy than its Canadian cousin in Toronto, but it is a genuine tech hub in its own right: video game studios, clean-tech companies, and a growing layer of AI and health tech startups anchor an ecosystem that runs from Gastown to Mount Pleasant. The city’s proximity to the mountains and ocean shapes the culture — founders are as likely to schedule around a dawn hike as a late-night pitch — and the scene rewards balance as much as hustle. UBC and SFU feed engineering and research talent, while the film industry brings production skills that startups borrow for marketing, content, and animation. Established formats include founder breakfasts, demo nights, and industry panels, many of them free and friendly to newcomers. What makes the scene distinctive is its international reach: Vancouver sits on Pacific time, close to Asia, and its startup community genuinely spans North America and the Pacific Rim. Honest advice for starting a startup community here: pick a vertical, anchor to a neighborhood, and respect the city’s balance — a consistent weekly event at a Mount Pleasant brewery will build a loyal following.',
    creative:
      'Vancouver creative communities thrive at the intersection of film, animation, games, design, and a strong visual-arts scene, all set against one of the most photogenic cities in the world. The film and television industry — the reason Vancouver is sometimes called Hollywood North — employs a huge creative workforce, and the city’s animation and game studios make it a global hub for digital art. Granville Island holds studios, galleries, and maker spaces where artists work in public, while Commercial Drive and Mount Pleasant host a bohemian layer of musicians, writers, and independent shops. Emily Carr University feeds new designers and artists into the scene each year. Because the creative industries here are production-heavy, community membership is a practical career asset: a portfolio critique, an animation jam, or a screening night can directly lead to work. Starting a creative community in Vancouver means choosing a discipline and a neighborhood, then using the city’s deep stock of studios and its beautiful public spaces to build something with real gravity.',
    political:
      'Vancouver political and civic communities are shaped by two forces: the housing crisis and the climate emergency. Housing affordability is the defining issue — one of the highest-cost cities in North America — and tenant unions, anti-displacement groups, and housing advocates organize constantly across the city. Climate action is equally central: the city has aggressive emissions targets, and transit, bike-lane, and building-efficiency debates are a regular part of civic life. The city’s neighborhoods each have strong community associations that shape land-use decisions, and the provincial and municipal governments both offer open consultation processes. Civic tech communities build tools for open data and public engagement, and volunteer networks organize shoreline cleanups, food programs, and mutual aid. The political culture rewards persistence and local knowledge: organizers who run housing groups also host newcomer-friendly workshops on how the city works. Starting a civic community in Vancouver usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers.',
    meetup:
      'Vancouver meetup culture is powered by the outdoors: the Sea Wall around Stanley Park, the beaches of Kitsilano, the trails of the North Shore, and the islands and mountains that define the city. Running clubs, hike groups, kayak meetups, and bike rides are the lifeblood of the scene, and the rain is simply a reason to buy better gear. Granville Island gives the city a covered, walkable gathering heart, and Commercial Drive holds a café culture where groups meet year-round. The city’s diverse Asian communities make it one of the best places in North America for food-centered meetups, from Richmond dim sum crawls to evening market walks. The SkyTrain and SeaBus make cross-city gathering practical. Formats with staying power are simple and repeatable: a Saturday hike, a seawall walk, a standing trivia night. Honest advice for starting a meetup in Vancouver: pick a format that works in any weather, anchor it to a landmark like the Sea Wall or Granville Island, and let the city’s active, friendly culture do the growth work.',
    'small-business':
      'Vancouver small business communities are built around the city’s neighborhoods and its love of food and craft: the Commercial Drive café, the Main Street vintage shop, the Granville Island maker, the West End bakery, and the Richmond family restaurant all share practical questions about rent, permits, staffing, and the high cost of the city. Commercial corridors like Main Street, Commercial Drive, and the Drive act as natural communities of interest, with shop owners coordinating around street festivals, public space, and shared concerns. Granville Island’s market gives vendors a famous stage and a built-in community of makers, and the city’s business associations plus small business centers offer workshops on licensing, loans, and digital selling. The craft-beer and coffee culture adds another layer: breweries and roasteries double as gathering places for owners and customers alike. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a market vendor collective. Starting a small business community here is realistic: a monthly roundtable at a neighborhood café or brewery, with rotating topics like rent, insurance, and seasonal sales, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Vancouver’s outdoor culture, food scene, and friendly tech-and-film community make it a wonderful place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Vancouver, from the Stanley Park Sea Wall and Granville Island to Commercial Drive cafés and North Shore trailheads. Some ideas work as one-off events; others are designed to become recurring communities that survive the rain. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s active, welcoming culture do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Seawall walk and talk',
            pitch:
              'A slow walk around the Stanley Park Sea Wall with rotating conversation prompts, ending at a café for coffee.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Stanley Park Sea Wall and a nearby café',
          },
          {
            title: 'Founder AMA at a Gastown coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Gastown coworking space',
          },
          {
            title: 'Granville Island mixer',
            pitch:
              'A low-pressure evening at the market with icebreaker prompts and a rule that you meet three new people.',
            audience: 'Anyone expanding their local network',
            venueType: 'Granville Island market area',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Coffee crawl on Commercial Drive',
            pitch:
              'A Saturday stroll through three cafés on the Drive, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Commercial Drive cafés',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Backcountry basics workshop',
            pitch:
              'A practical session on trip planning, weather, and gear for people new to the North Shore backcountry.',
            audience: 'Beginner hikers and skiers',
            venueType: 'Outdoor store event room or community center',
          },
          {
            title: 'Small business finance in plain English',
            pitch: 'A session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Film industry 101',
            pitch:
              'A practical overview of crew roles, permits, and how the local industry works for newcomers.',
            audience: 'Film industry newcomers',
            venueType: 'Production studio or film school classroom',
          },
          {
            title: 'Tenant rights in BC',
            pitch:
              'A plain-language session on rent control, leases, and the Residential Tenancy Branch.',
            audience: 'Renters and tenant advocates',
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
            title: 'Saturday hike and coffee',
            pitch:
              'A beginner-friendly hike on the North Shore followed by coffee and pastries at a trailhead café.',
            audience: 'Hikers of every level',
            venueType: 'North Shore trailhead and nearby café',
          },
          {
            title: 'Kitsilano beach picnic and games',
            pitch:
              'Blankets, beach volleyball, and a potluck on one of the city’s favorite beaches.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Kitsilano Beach',
          },
          {
            title: 'Kayak and paddleboard social',
            pitch:
              'A relaxed paddle in False Creek with a shared takeout lunch on the water or shore.',
            audience: 'Paddlers of every level',
            venueType: 'False Creek launch points',
          },
          {
            title: 'Board game night at a Mount Pleasant brewery',
            pitch:
              'A monthly stack of board games at a neighborhood brewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Mount Pleasant brewery taproom',
          },
          {
            title: 'Rain-friendly market walk',
            pitch:
              'A covered walk through Granville Island’s market with food stops and umbrella-friendly routes.',
            audience: 'Food lovers and Sunday explorers',
            venueType: 'Granville Island public market',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Gaming industry meetup',
            pitch:
              'Game developers and artists trade notes on the local scene, hiring, and live-service trends.',
            audience: 'Game developers and industry professionals',
            venueType: 'Game studio office or event space',
          },
          {
            title: 'Climate tech founders table',
            pitch:
              'A monthly roundtable for clean-tech founders to share progress, partnerships, and policy news.',
            audience: 'Climate and clean-tech founders',
            venueType: 'Clean-tech office or accelerator room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Film and animation mixer',
            pitch:
              'An informal evening where crew, animators, and creative professionals trade notes and contacts.',
            audience: 'Film and animation professionals',
            venueType: 'Production studio or industry bar',
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
            title: 'Studio open day at Granville Island',
            pitch:
              'Artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Granville Island artist studios',
          },
          {
            title: 'Animation jam',
            pitch:
              'A fun, low-pressure weekend where animators form small teams and make a short piece together.',
            audience: 'Animators and motion designers',
            venueType: 'Studio or university lab',
          },
          {
            title: 'Open mic at a Commercial Drive venue',
            pitch:
              'A welcoming open mic with a short feature and a supportive audience of musicians and poets.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Commercial Drive music venue',
          },
          {
            title: 'Sketching the Sea Wall',
            pitch:
              'A guided sketching session along the seawall with prompts for people and landscapes.',
            audience: 'Illustrators and sketchers',
            venueType: 'Stanley Park Sea Wall benches',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Mount Pleasant',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Shoreline cleanup morning',
            pitch:
              'A Saturday morning cleanup of a beach or shoreline stretch, with gloves and coffee supplied.',
            audience: 'Volunteers and ocean lovers',
            venueType: 'A chosen beach or shoreline',
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
            title: 'Climate action planning circle',
            pitch:
              'A small group workshop turning climate concern into a concrete neighborhood project plan.',
            audience: 'Residents concerned about climate',
            venueType: 'Library or community center meeting room',
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
          'Match the category to your interests and the audience you can reach. In Vancouver, outdoor formats with a rain plan — seawall walks, covered markets, trailhead cafés — tend to fill fastest.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, the Sea Wall, public libraries, and neighborhood cafés. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Vancouver communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Vancouver?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Vancouverites gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Vancouver?',
      answer:
        'Yes. The city has free public venues, spectacular outdoor gathering places, and an active, welcoming culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the Sea Wall, Granville Island, Kitsilano Beach, Commercial Drive cafés, North Shore trailheads — exists in Vancouver. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Vancouver?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Vancouverites find or start communities.',
    },
  ],
};

export default content;
