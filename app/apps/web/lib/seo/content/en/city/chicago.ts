import type { CityContent } from '../../types';

/**
 * Chicago content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the lakefront, neighborhood-driven city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'chicago',
  intro: [
    'Chicago is a city of about 2.7 million people built around a lake and a river, with a downtown of skyscrapers and a famously walkable grid of distinct neighborhoods: the Loop and River North for business, Wicker Park and Logan Square for music and creative work, Pilsen for a deep Mexican-American arts scene, Hyde Park for the university, and Bronzeville for a historic Black cultural district.',
    'The lakefront is the city’s great public gift — an eighteen-mile chain of parks, beaches, and trails along Lake Michigan that hosts running clubs, beach volleyball, picnics, and festivals all summer. Millennium Park, Navy Pier, the Art Institute, and the riverwalk draw residents and visitors alike, while the CTA’s elevated trains make cross-neighborhood gathering practical even in winter. Chicago winters are real, which shapes community life: indoor venues matter, and the city has an exceptional stock of libraries, theaters, music clubs, and neighborhood bars that keep groups meeting through January.',
    'The city is a national hub for finance, commodities, law, and logistics, with a growing technology and startup scene, and its universities — the University of Chicago, Northwestern, UIC, and DePaul — feed constant flows of students and researchers into local communities. For finding or starting a community, Chicago rewards choosing a neighborhood and a venue that will host you all year, and building a rhythm that survives the seasons.',
  ],
  dataPoints: [
    'About 2.7 million residents in a lakefront metropolis.',
    'Regional anchors include University of Chicago, Northwestern, UIC, and DePaul.',
    'Finance, commodities, law, logistics, and a growing tech scene.',
    'CTA elevated trains and Metra connect the neighborhoods.',
    'Public anchors: Lake Michigan lakefront, Millennium Park, riverwalk, Navy Pier.',
    'Neighborhood scenes: Loop, Wicker Park, Logan Square, Pilsen, Hyde Park, Bronzeville.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in the Loop and River North',
        'Fulton Market startup offices',
        'University incubators near UChicago and Northwestern',
        'Venture and accelerator event rooms in River North',
        'Wicker Park and Logan Square founder cafés',
        'West Loop event lofts and breweries',
      ],
      formats: [
        'Demo nights and pitch evenings',
        'Founder breakfasts with round intros',
        'Fintech and logistics panel evenings',
        'AI and developer meetups with live builds',
        'Midwest venture happy hours',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, logistics, health tech, or AI builders — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Fulton Market or Loop coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Wicker Park and Logan Square music venues',
        'Pilsen galleries and artist studios',
        'Theater and improv houses in Lincoln Park',
        'Design studios in the West Loop',
        'Print shops and maker spaces in Pilsen',
        'Museum and cultural center event rooms',
      ],
      formats: [
        'Open studio weekends and art walks',
        'Improv and theater showcases',
        'Design critique evenings',
        'Music production and DJ circles',
        'Zine and print nights',
      ],
      howToStart: [
        'Choose one craft and a neighborhood — Pilsen for visual art, Logan Square for music, Lincoln Park for theater.',
        'Partner with a gallery, venue, or theater that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City Hall and ward office rooms',
        'Public library meeting rooms',
        'Community center rooms across the wards',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces in the Loop',
        'Park district field houses',
      ],
      formats: [
        'Ward-level town halls and issue sessions',
        'Tenant rights workshops',
        'Transit and street-safety volunteer briefings',
        'Civic participation workshops in plain language',
        'Volunteer canvassing and phone-banking shifts',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a block, or a single ordinance.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how ward politics works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Lakefront trail paths and beaches',
        'Millennium Park and Grant Park lawns',
        'Logan Square and Wicker Park cafés',
        'Neighborhood breweries and dive bars',
        'Public libraries with community rooms',
        'Park district field houses in winter',
      ],
      formats: [
        'Weekend lakefront bike and run groups',
        'Board game and trivia evenings',
        'Winter indoor socials and game nights',
        'Beach volleyball and pickleball sessions',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a Saturday run, a monthly trivia night — and a fixed venue.',
        'Pick a spot like the lakefront or a Logan Square café that is easy to reach by train.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Neighborhood corridors in Logan Square and Pilsen',
        'Chicago French Market and farmers market stalls',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés and diners with community corners',
        'Food incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Street festival planning for neighborhood fests',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and winter sales.',
        'After three breakfasts, rotate one practical topic per month and let the chamber spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Chicago startup scene is one of the most underrated in the United States: a mature, capital-efficient ecosystem built on the city’s strengths in fintech, logistics, health tech, and B2B software. Fulton Market and the West Loop have become the epicenter, with startup offices and venture funds sitting alongside the food and design scene, while the Loop and River North hold a second layer of corporate-adjacent innovation. Universities like the University of Chicago and Northwestern feed founders and talent, and the city’s deep finance and commodities DNA gives startups unusual access to operators who understand payments, trading, and supply chains. Because the scene is smaller and more collegial than the coasts, newcomers can genuinely meet most of the relevant people within a few months. Established formats include demo nights, founder breakfasts, and industry panels, many of them free and open. Honest advice for starting a startup community in Chicago: pick a vertical, anchor to a neighborhood, and commit to a regular venue — the ecosystem is collaborative enough that a consistent weekly event will quickly become a known fixture.',
    creative:
      'Chicago creative communities run from the blues clubs of the South Side to the improv theaters of Lincoln Park, the indie music scene of Logan Square, and the murals and galleries of Pilsen. The city has a proud history as the birthplace of house music and a home of jazz and blues, and that legacy is alive in venues across the city. Pilsen is the visual arts anchor, with a dense Mexican-American mural tradition and a growing gallery scene, while Wicker Park and Logan Square host musicians, designers, and writers in a more bohemian mode. The theater scene is world-class — the Second City tradition of improvisation shaped generations of comics — and the city’s film and TV production industry keeps growing. Winters push creatives indoors, which builds an intimate club culture: a small venue, a packed room, and a shared season of work. Starting a creative community in Chicago means choosing a discipline and a neighborhood, then using the city’s deep stock of affordable venues and its genuine hunger for live, local culture.',
    political:
      'Chicago political and civic communities are shaped by the city’s ward system, its history of machine politics, and a vigorous tradition of neighborhood organizing. The city is divided into fifty wards, each with an elected alderperson, which keeps local politics accessible: residents can attend ward meetings, testify at city council, and organize around land use, housing, and public safety in their own neighborhood. Housing and displacement are defining issues — tenant unions and community land trusts organize across gentrifying neighborhoods, while transit and street-safety advocates push for better bus and bike infrastructure. Civic tech communities build tools for open data and participatory budgeting, and the city’s parks and libraries anchor countless volunteer efforts. The political culture rewards persistence and local knowledge: the organizers who run block clubs also host newcomer-friendly workshops on how ward politics works. Starting a civic community in Chicago usually means picking a concrete issue and a small geography — a ward, a block, a single ordinance — then partnering with the existing landscape of organizers.',
    meetup:
      'Chicago meetup culture is built around the lakefront and the seasons: in warm months, running clubs, beach volleyball, bike groups, and picnic socials fill the eighteen-mile chain of lakefront parks; in winter, the same communities move indoors to libraries, breweries, and neighborhood bars. The CTA elevated train network makes cross-city gathering genuinely practical, so a group can anchor in Logan Square and still pull members from Hyde Park. The city’s neighborhoods give meetups strong local character — a Pilsen art walk, a Wicker Park trivia night, a Hyde Park book club — and its diverse population supports language exchanges, international food socials, and cultural celebration groups. Chicagoans are famously loyal to their institutions, and that loyalty extends to community: a weekly format with a fixed venue builds a devoted following. Honest advice for starting a meetup here: pick a neighborhood, a repeatable format, and a venue that is open all year, then let the city’s genuine social warmth do the growth work.',
    'small-business':
      'Chicago small business communities are the backbone of the city’s neighborhoods: the corner grocery, the taquería in Pilsen, the Logan Square record shop, the Bronzeville barbershop, and the West Loop bakery all share the same practical questions about rent, permits, staffing, and winter cash flow. Because Chicago is a city of neighborhoods, small business networks form along commercial corridors, and the city’s famous street festivals — Taste of Chicago aside, nearly every neighborhood runs one in summer — give owners natural reasons to coordinate. Chambers of commerce, small business centers, and food incubators offer workshops on licensing, loans, and digital selling, and the city’s deep labor and manufacturing history has left a strong culture of mutual aid among tradespeople and makers. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a farmers market vendor collective. Starting a small business community here is realistic: a monthly roundtable at a neighborhood café, with rotating topics like rent, insurance, and seasonal staffing, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Chicago offers a deep pool of venues, a loyal audience, and four distinct seasons, which makes it a rich place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Chicago, from lakefront parks and Pilsen galleries to Logan Square breweries and public library rooms. Some ideas work as one-off events; others are designed to become recurring communities that survive winter by moving indoors. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Lakefront walk and talk',
            pitch:
              'A slow walk along the lakefront with rotating conversation prompts, ending at a café for coffee.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Lakefront trail and a nearby café',
          },
          {
            title: 'Founder AMA at a Fulton Market coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Fulton Market coworking space',
          },
          {
            title: 'Ward meet-and-greet',
            pitch:
              'A low-pressure social for residents of one ward, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighborhood',
            venueType: 'Ward community center or library',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Midwest founder breakfast',
            pitch:
              'An early breakfast where founders working in the Midwest share the week’s wins and blockers over coffee.',
            audience: 'Founders and operators in Chicago',
            venueType: 'A café with a private corner in River North',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Street fest planning 101',
            pitch:
              'A practical workshop on permits, vendors, and volunteers for the neighborhood festivals that define Chicago summers.',
            audience: 'Neighborhood organizers and small businesses',
            venueType: 'Chamber of commerce or park field house',
          },
          {
            title: 'Small business finance in plain English',
            pitch: 'A session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Deep-dish and hot dog history tour',
            pitch:
              'A guided tasting walk through the city’s signature foods with the stories behind them.',
            audience: 'Food lovers and newcomers',
            venueType: 'A walkable stretch of local restaurants',
          },
          {
            title: 'Civic 101: how ward politics works',
            pitch:
              'A plain-language workshop on alderpersons, ward meetings, and how to influence city decisions.',
            audience: 'New activists and curious residents',
            venueType: 'Public library or ward office',
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
            title: 'Lakefront bike ride for beginners',
            pitch:
              'A slow, friendly ride on the lakefront trail with a mechanic at the back for breakdowns.',
            audience: 'New cyclists and commuters',
            venueType: 'Lakefront trail paths',
          },
          {
            title: 'Millennium Park picnic and games',
            pitch:
              'Blankets, lawn games, and a potluck near the Bean, with live music from the park in the background.',
            audience: 'Friends, families, and newcomers',
            venueType: 'Millennium Park lawns',
          },
          {
            title: 'Beach volleyball pickup',
            pitch: 'A weekly pickup game on the lakefront sand courts, open to every level.',
            audience: 'Volleyball players and beginners',
            venueType: 'Lakefront beach courts',
          },
          {
            title: 'Board game night at a Logan Square brewery',
            pitch:
              'A monthly stack of board games at a neighborhood brewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Logan Square brewery taproom',
          },
          {
            title: 'Winter indoor social',
            pitch:
              'A cozy evening of hot drinks, board games, and conversation designed to beat January.',
            audience: 'Anyone who needs a winter pick-me-up',
            venueType: 'Neighborhood café or field house',
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
            venueType: 'Financial district office space',
          },
          {
            title: 'Logistics and supply chain roundtable',
            pitch:
              'A confidential roundtable where operators discuss a monthly challenge — routing, labor, technology.',
            audience: 'Logistics and supply chain professionals',
            venueType: 'West Loop office or incubator',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Healthcare innovation meetup',
            pitch:
              'An informal evening where clinicians, operators, and builders discuss the local health tech scene.',
            audience: 'Healthtech founders and healthcare professionals',
            venueType: 'Hospital-affiliated innovation space',
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
            title: 'Pilsen mural walking tour',
            pitch:
              'A guided walk through the murals of Pilsen with the stories behind the artists and the neighborhood.',
            audience: 'Art walkers and photographers',
            venueType: 'Pilsen streets and galleries',
          },
          {
            title: 'Open mic at a Logan Square venue',
            pitch:
              'A welcoming open mic with a short feature and a supportive audience of musicians and poets.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Logan Square music venue',
          },
          {
            title: 'Improv workshop for beginners',
            pitch:
              'A fun, low-pressure session learning the basics of improv — yes-and, scene building, and confidence.',
            audience: 'Anyone curious about improv',
            venueType: 'Improv theater or community room',
          },
          {
            title: 'House and blues listening night',
            pitch:
              'A guided listening session tracing the history of Chicago house and blues, with stories and records.',
            audience: 'Music lovers and history buffs',
            venueType: 'Record shop or music venue',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in Pilsen',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Block club kickoff',
            pitch:
              'A neighborhood block club relaunches with a potluck, a safety walk, and a shared project list.',
            audience: 'Neighbors on one block or corridor',
            venueType: 'A neighbor’s porch or park field house',
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
            pitch: 'A plain-language session on rent laws, leases, and free housing counseling.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Lakefront cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of beach or trail, with gloves and coffee supplied.',
            audience: 'Volunteers and lake lovers',
            venueType: 'A chosen beach or lakefront stretch',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop owners share the stories behind their businesses in five-minute talks, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or chamber hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Chicago, a neighborhood anchor and a venue that is open all year are the keys to a thriving group.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, lakefront trails, public libraries, and neighborhood cafés. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Chicago communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Chicago?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Chicagoans gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Chicago?',
      answer:
        'Yes. The city has free public venues, an excellent transit network, and a culture of neighborhood loyalty. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — the lakefront, Millennium Park, neighborhood breweries, public libraries, field houses — exists in Chicago. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Chicago?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Chicagoans find or start communities.',
    },
  ],
};

export default content;
