import type { CityContent } from '../../types';

/**
 * Austin content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the live-music, tech-heavy Texas capital.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'austin',
  intro: [
    'Austin is the capital of Texas and a city of nearly a million people that has grown into one of the most distinctive community scenes in the country: a state-government town that became a technology hub and a live-music city at the same time. Downtown, the University of Texas campus, South Congress, East Austin, Hyde Park, and the Domain each host a different layer of the scene, from founders and engineers to musicians, artists, and state workers.',
    'The outdoors are woven into Austin life: Zilker Park and Barton Springs anchor a culture of swimming, running, and picnics, Lady Bird Lake offers a ten-mile trail loop for walkers and cyclists, and the city’s food-truck and barbecue culture means casual gatherings are easy to plan. The music scene is world-famous — the city bills itself as the Live Music Capital of the World, and events like SXSW and the Austin City Limits Festival draw people from everywhere — but the everyday reality is smaller venues, open mics, and porch shows across the city.',
    'The University of Texas at Austin is the intellectual anchor, feeding students, researchers, and alumni into local communities year after year. For finding or starting an Origin, Austin rewards a casual, welcoming format — a Sunday paddle, a porch jam, a taco meetup — and a consistent venue, because the city’s transplants are always looking for the group that feels like home.',
  ],
  dataPoints: [
    'About 974,000 residents; capital of Texas.',
    'Anchor institution: University of Texas at Austin.',
    'Technology, state government, music, film, and gaming clusters.',
    'Public anchors: Zilker Park, Barton Springs, Lady Bird Lake trail.',
    'Famous for live music, SXSW, and the Austin City Limits Festival.',
    'Neighborhood scenes: South Congress, East Austin, Hyde Park, Domain, Mueller.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces downtown and in East Austin',
        'University startup programs near UT Austin',
        'Cafés with founder tables on South Congress',
        'Accelerator event rooms in the Domain area',
        'East Austin creative-tech offices',
        'Brewery and taco-joint founder evenings',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'Demo nights and pitch evenings',
        'Climate and energy tech panels',
        'Music and media-tech meetups',
        'State-capital policy happy hours',
      ],
      howToStart: [
        'Pick a narrow vertical — climate tech, music tech, or AI builders — and a neighborhood anchor.',
        'Book a recurring weekly slot at an East Austin or downtown coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'South Congress and East Austin music venues',
        'Red River district clubs and listening rooms',
        'Artist studios in East Austin',
        'Film and media production spaces',
        'Design studios downtown',
        'Porch and backyard stages for house shows',
      ],
      formats: [
        'Open mic nights and songwriter circles',
        'Studio tours and art walks',
        'Screening nights with director Q&As',
        'Design critique evenings',
        'Porch jams and backyard showcases',
      ],
      howToStart: [
        'Choose one craft — songwriting, film, visual art — and a neighborhood.',
        'Partner with a venue, studio, or porch that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'Texas Capitol hearing rooms',
        'Downtown advocacy and nonprofit offices',
        'Public library meeting rooms',
        'Community center rooms across the city',
        'Civic tech meetup spaces downtown',
        'Park pavilions for issue-based socials',
      ],
      formats: [
        'Legislative session briefings',
        'Housing and transit policy forums',
        'Tenant rights workshops',
        'Volunteer canvassing and phone-banking shifts',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a neighborhood, or a single bill.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how the Texas Capitol works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Zilker Park and Barton Springs',
        'Lady Bird Lake trail and boat docks',
        'South Congress cafés and food-truck courts',
        'Neighborhood breweries and dive bars',
        'Public libraries with community rooms',
        'Greenbelt trailheads and swimming holes',
      ],
      formats: [
        'Sunday paddle and kayak groups',
        'Greenbelt hike and swim meetups',
        'Board game and trivia evenings',
        'Taco crawl and food-truck socials',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday paddle, a monthly trivia night — and a fixed meeting point.',
        'Pick a spot like Zilker Park or a South Congress food-truck court that is easy to find.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'South Congress and East Austin shop corridors',
        'Food-truck courts and trailer parks',
        'Farmers market vendor spaces',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés with community corners',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Food-truck operator roundtables',
        'Street festival planning sessions',
        'City agency clinics on permits and licensing',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and festival crowds.',
        'After three breakfasts, rotate one practical topic per month and let the chamber spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Austin startup scene grew from a university town and a state capital into one of the fastest-growing tech ecosystems in the United States, powered by a wave of corporate relocations and a deep bench of locally founded companies. The city’s startup community clusters in East Austin and downtown, with the Domain area holding a corporate-innovation layer and the University of Texas providing a steady stream of engineers and researchers. Austin’s personality shapes the scene: meetings are casual, barbecue is a legitimate networking venue, and the city’s music culture gives even serious founders a strong sense of place. Climate tech, energy, and music and media tech are natural local strengths, and the presence of state government makes policy-adjacent startups unusually viable. Established formats include founder breakfasts, demo nights, and industry happy hours, many of them friendly to newcomers and to remote workers. Honest advice for starting a startup Origin in Austin: pick a vertical, anchor to a neighborhood, and lean into the city’s casual, welcoming style — a consistent weekly event at a taco joint will build a loyal following faster than a formal conference.',
    creative:
      'Austin creative communities live at the intersection of music, film, art, and technology, and the city’s identity as the Live Music Capital of the World is only the beginning. The Red River district hosts clubs and listening rooms that launch national acts, South Congress and East Austin hold galleries, studios, and boutique fashion, and the film industry keeps a steady production presence in town. SXSW and the Austin City Limits Festival put the city on the world stage every year, but the everyday scene is smaller: songwriter circles, open mics, porch shows, and screening nights in neighborhood venues. East Austin has been the creative heart for decades, and its artists, musicians, and designers form a dense, supportive community. The University of Texas arts programs feed new talent into the scene each year. Starting a creative Origin in Austin means choosing a discipline and a neighborhood, then using the city’s deep stock of small venues and its genuine love of live, local culture to build a loyal following.',
    political:
      'Austin political and civic communities operate in the shadow of the Texas Capitol, which makes them unusually connected to state-level policy: housing, transit, energy, and civil rights debates in Austin often become statewide issues. The city has a long tradition of grassroots organizing — from environmental battles over the aquifer to recent fights over zoning, displacement, and transit funding. Neighborhood associations, housing advocacy groups, and transit and bike advocates keep volunteer networks busy, and the city’s civic tech community builds tools for open data and public engagement. Because the legislature meets in Austin every other year, there are regular opportunities for residents to learn how state government works, testify at hearings, and meet advocates from across Texas. The political culture rewards persistence and local knowledge: organizers who run neighborhood groups also host newcomer-friendly workshops on how the Capitol works. Starting a civic Origin in Austin usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers.',
    meetup:
      'Austin meetup culture is built around the outdoors, the music scene, and a genuinely friendly transplant culture. Zilker Park and Barton Springs anchor a year-round culture of swimming, running, and picnics, the Lady Bird Lake trail gives walkers and cyclists a ten-mile loop through the heart of the city, and the greenbelt offers hike-and-swim adventures that feel a world away from downtown. Food-truck courts and taco joints make casual gatherings effortless, and the city’s live-music venues host everything from songwriter circles to comedy showcases. Because so many residents have moved to Austin from somewhere else, meetups that explicitly welcome newcomers fill quickly. Formats with staying power are simple and repeatable: a Sunday paddle, a monthly trivia night, a weekly run club. Honest advice for starting a meetup here: pick a format you would attend yourself, anchor it to a landmark like Zilker Park or a South Congress food-truck court, and let the city’s friendly, curious culture do the growth work.',
    'small-business':
      'Austin small business communities are as distinctive as the city: food-truck operators, vintage shop owners on South Congress, East Austin taquerías, recording studios, and boutique fitness studios all share practical questions about rent, permits, staffing, and festival season. The food-truck scene is a world of its own, with trailer courts acting as informal incubators and operators trading advice on permitting, commissaries, and health inspections. Neighborhood corridors like South Congress, East Austin, and the Domain host shop clusters with a shared stake in foot traffic and public space. The city’s chambers of commerce and small business centers offer workshops on licensing, loans, and marketing, and the state’s boomtown economy keeps new customers flowing in. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a farmers market vendor collective. Starting a small business Origin here is realistic: a monthly roundtable at a food-truck court or neighborhood café, with rotating topics like rent, insurance, and festival preparation, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Austin’s outdoor culture, live-music scene, and friendly transplant population make it a wonderful place to test new Origin event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Austin, from Zilker Park and Lady Bird Lake to South Congress cafés, food-truck courts, and Red River music clubs. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Lady Bird Lake walk and talk',
            pitch:
              'A slow morning loop around the lake with rotating conversation prompts, ending at a café for coffee.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Lady Bird Lake trail and a nearby café',
          },
          {
            title: 'Founder AMA at an East Austin coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'East Austin coworking space',
          },
          {
            title: 'Taco-truck networking lunch',
            pitch:
              'A weekly lunch at a food-truck court where people rotate tables and share what they do.',
            audience: 'Professionals and newcomers',
            venueType: 'A South Congress or East Austin food-truck court',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Newcomer porch social',
            pitch:
              'A low-pressure backyard gathering where recent arrivals meet longtime Austinites over tacos and lawn games.',
            audience: 'Recent transplants and locals who love the city',
            venueType: 'A host’s backyard or porch',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Texas legislative basics',
            pitch:
              'A plain-language workshop on how the Texas Capitol works, how bills move, and how citizens can participate.',
            audience: 'New activists and curious residents',
            venueType: 'Capitol-area meeting room or library',
          },
          {
            title: 'Small business finance in plain English',
            pitch: 'A session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Hill Country hike and flora walk',
            pitch:
              'A guided walk through the greenbelt identifying native plants and talking about the local ecosystem.',
            audience: 'Hikers and nature lovers',
            venueType: 'Barton Creek Greenbelt trailhead',
          },
          {
            title: 'Songwriting workshop',
            pitch:
              'A hands-on session where writers share a work in progress and get structured feedback.',
            audience: 'Songwriters of every level',
            venueType: 'Music venue or community room',
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
            title: 'Barton Springs morning swim',
            pitch:
              'A sunrise swim at the legendary spring-fed pool, followed by coffee and conversation on the lawn.',
            audience: 'Swimmers and early risers',
            venueType: 'Barton Springs Pool and lawn',
          },
          {
            title: 'Zilker Park picnic and games',
            pitch:
              'Blankets, disc golf, and lawn games in the city’s favorite park, with a rotating potluck theme.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Zilker Park lawns',
          },
          {
            title: 'Sunday paddle on Lady Bird Lake',
            pitch: 'A relaxed kayak and paddleboard outing with a shared takeout lunch afterward.',
            audience: 'Paddlers of every level',
            venueType: 'Lady Bird Lake boat docks',
          },
          {
            title: 'Board game night at a brewery',
            pitch:
              'A monthly stack of board games at a neighborhood brewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A downtown or East Austin brewery',
          },
          {
            title: 'Congress Avenue bat bridge watch',
            pitch:
              'An evening picnic near the bridge to watch the famous bat flight, with naturalists on hand to explain.',
            audience: 'Residents and first-time visitors',
            venueType: 'Congress Avenue bridge and nearby lawns',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Climate and energy tech roundtable',
            pitch:
              'A monthly discussion for founders and operators working on energy, grid, and climate solutions.',
            audience: 'Climate and energy tech professionals',
            venueType: 'Coworking or accelerator event room',
          },
          {
            title: 'Music industry mixer',
            pitch:
              'An informal evening where artists, managers, venues, and producers trade notes on the local scene.',
            audience: 'Music industry professionals',
            venueType: 'Red River music venue or studio',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Film and media makers meetup',
            pitch: 'Local filmmakers and media makers share work, resources, and hiring leads.',
            audience: 'Filmmakers and media professionals',
            venueType: 'Production studio or screening room',
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
            title: 'Songwriter round at a listening room',
            pitch:
              'Three songwriters take turns sharing songs and the stories behind them in an intimate setting.',
            audience: 'Songwriters and music lovers',
            venueType: 'A Red River or South Congress listening room',
          },
          {
            title: 'East Austin studio walk',
            pitch:
              'Artists open their studios for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'East Austin artist studios',
          },
          {
            title: 'Open mic for poetry and prose',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Writers of all levels',
            venueType: 'Bookstore café or community room',
          },
          {
            title: 'Porch jam and backyard showcase',
            pitch:
              'Local musicians play an evening of sets on a host’s porch, with a potluck to follow.',
            audience: 'Musicians, neighbors, and music fans',
            venueType: 'A host’s porch or backyard',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in East Austin',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Greenbelt cleanup morning',
            pitch:
              'A Saturday morning cleanup of a greenbelt trail or swimming hole, with gloves and coffee supplied.',
            audience: 'Volunteers and nature lovers',
            venueType: 'A chosen greenbelt trailhead',
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
            audience: 'Renters and housing advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Neighborhood cleanup and block party',
            pitch:
              'A morning cleanup of one corridor followed by a potluck block party on the same street.',
            audience: 'Neighbors and local business owners',
            venueType: 'A chosen street or corridor',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and food-truck owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or food-truck court',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Austin, casual, outdoor, and food-centered formats — paddles, picnics, taco lunches — tend to fill fastest.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, the lake trail, public libraries, and food-truck courts. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Austin Origins start. The how-to guides walk through the steps from a first event to a stable Origin with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Austin?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where Austinites gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Austin?',
      answer:
        'Yes. The city has free public venues, year-round outdoor weather, and a transplant-friendly culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Zilker Park, Barton Springs, Lady Bird Lake, food-truck courts, Red River clubs — exists in Austin. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Austin?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Austinites find or start Origins.',
    },
  ],
};

export default content;
