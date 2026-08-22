import type { CityContent } from '../../types';

/**
 * Munich content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'munich',
  pageTitles: {
    city: 'Communities in Munich | JoinOrigin',
    cityDescription:
      'Find or start communities in Munich — startup, creative, political, meetup, and small business groups across the Bavarian capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Munich | JoinOrigin',
      creative: 'Creative communities in Munich | JoinOrigin',
      political: 'Political & civic communities in Munich | JoinOrigin',
      meetup: 'Meetup & social communities in Munich | JoinOrigin',
      'small-business': 'Small business communities in Munich | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Munich — founders, engineers, and operators around UnternehmerTUM, Werksviertel, and the tech corridor. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Munich — studios, galleries, and collectives across Schwabing, Glockenbach, and the Kunstareal. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Munich — citizens’ initiatives, district councils, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Munich — beer gardens, Stammtische, hiking clubs, and Isar river gatherings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Munich — Viktualienmarkt traders, craft workshops, and neighbourhood shop networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Munich | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Munich — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Munich is a city where community life is engineered as carefully as its machines. The Bavarian capital balances a deep tradition of civic institutions — beer gardens, clubs, and Vereine — with a modern tech economy built around BMW, Siemens, and a dense startup scene. The result is a place where joining a group is culturally normal: nearly every Munich resident belongs to at least one Verein, club, or regular table.',
    'The beer garden is the social engine. The Englischer Garten, the Hirschgarten, and the riverside beer gardens along the Isar host everything from office Stammtische to family gatherings and board game nights. The Isar itself is a swimming and barbecue artery in summer, while the Alps on the horizon pull residents into hiking and ski clubs that anchor weekend community life. Universities such as TUM and LMU keep a constant stream of students cycling through the scene.',
    'Munich’s prosperity means venues are plentiful, but it also means the city rewards organisation: groups that book a fixed table, join the right Verein, or partner with an existing institution thrive. Newcomers who speak a little German and follow the city’s love of structure will find it easy to belong.',
  ],
  dataPoints: [
    'Roughly 1.5 million residents; the capital of Bavaria, Germany.',
    'Home to TUM, LMU, and many research institutes.',
    'Corporate anchors: BMW, Siemens, Allianz, and a deep engineering base.',
    'Beer garden culture — Englischer Garten, Hirschgarten, and Isar venues.',
    'Strong Vereine and Stammtisch tradition of organised community life.',
    'Close to the Alps — hiking and ski clubs shape the community calendar.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'UnternehmerTUM maker and event spaces at TUM',
        'Coworking and event floors in Werksviertel',
        'Impact hub rooms near the Hauptbahnhof',
        'Corporate innovation labs of BMW and Siemens',
        'Tech cafés in Schwabing and Maxvorstadt',
        'Beer garden tables for relaxed founder evenings',
      ],
      formats: [
        'Founder breakfasts with quick round intros',
        'Pitch evenings and demo nights',
        'Deep-tech and AI builder tables',
        'Corporate–startup networking apéros',
        'Maker and hardware showcase days',
      ],
      howToStart: [
        'Pick a narrow vertical — deep tech, AI, mobility, or climate — and an English-friendly name.',
        'Reserve a weekly breakfast or evening slot at a Werksviertel or UnternehmerTUM-adjacent space.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Glockenbach studio courtyards',
        'Kunstareal gallery rooms',
        'Schwabing ateliers and Kaffeehaus corners',
        'AdBK workshop halls',
        'Rehearsal studios and music rooms',
        'Print and craft workshops in Haidhausen',
      ],
      formats: [
        'Biennial open-studio trails across Glockenbach',
        'Curator talks before gallery openings',
        'Portfolio nights with invited local critics',
        'Instrument and gear share evenings',
        'Exhibition visits that end at a Kaffeehaus',
      ],
      howToStart: [
        'Anchor the group in one craft and one courtyard — Glockenbach’s studio blocks are perfect for this.',
        'Partner with a Kunstareal gallery or an AdBK workshop to host the first critique night.',
        'Make feedback the ritual: every session ends with three spoken comments per work, then coffee.',
      ],
    },
    political: {
      venues: [
        'District committee (Bezirksausschuss) meeting rooms',
        'Citizens’ initiative (Bürgerbegehren) campaign rooms',
        'Neighbourhood centres across the 25 districts',
        'Community gardens and street libraries',
        'Civic tech coworking spaces',
        'Church and club halls used for assemblies',
      ],
      formats: [
        'Open district committee sessions',
        'Housing and rent info evenings',
        'Citizens’ initiative planning meetings',
        'Volunteer briefings and first-shift sessions',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a district, a street, or one housing policy.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organiser as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Beer gardens — Englischer Garten, Hirschgarten',
        'Isar riverbanks for swimming and grilling',
        'Kaffeehäuser and cafés in Schwabing and Glockenbach',
        'Board game cafés in Maxvorstadt',
        'Alpine club (Alpenverein) huts and meeting rooms',
        'Parks — Olympiapark and the English Garden',
      ],
      formats: [
        'Weekly Stammtisch at the same table',
        'Isar swim-and-grill afternoons',
        'Hiking club day trips to the Alps',
        'Board game and Spieleabend evenings',
        'Bike rides along the Isar and to the lakes',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly Stammtisch, a monthly hike — and a fixed venue.',
        'Pick a beer garden, café, or Alpenverein room that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Viktualienmarkt trader tables',
        'Handwerker courtyards in Haidhausen',
        'Brewery taprooms with long tables',
        'Chamber of commerce seminar rooms',
        'Crafts market stalls at seasonal fairs',
        'Bürgerhaus rooms for owner meetings',
      ],
      formats: [
        'Early-market owner coffee before the stalls open',
        'Apprenticeship and Handwerk info evenings',
        'Chamber clinics on VAT, invoices, and digital storefronts',
        'Shared machine and tool cooperatives',
        'Flea-market and winter-fair planning sessions',
      ],
      howToStart: [
        'Start at a Viktualienmarkt table at opening hour — traders talk freely before the crowds arrive.',
        'Ask the Handwerkskammer or a local brewery to co-host the first evening so owners trust the invitation.',
        'Keep a fixed monthly morning and rotate one practical topic — apprenticeships, rent, online selling — until the group runs itself.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Munich’s startup scene is powered by the city’s engineering DNA: TUM and its UnternehmerTUM hub, the corporate laboratories of BMW and Siemens, and a deep bench of researchers in mobility, AI, and climate tech. Werksviertel, the converted industrial quarter near Ostbahnhof, has become the creative home of the scene, while Maxvorstadt and Schwabing host coworking spaces and tech cafés. The community is more German-speaking than Berlin’s, but English is common in deep-tech and AI circles where international researchers work side by side with local founders. Recurring formats include founder breakfasts, pitch evenings, demo days, and corporate–startup events that connect early teams with the industrial giants next door. Munich’s culture rewards reliability: groups that book a fixed time, serve good coffee, and start on the minute build loyal followings. Starting a startup community here works best with a narrow vertical — deep tech, mobility, or climate — and a regular rhythm that matches the city’s preference for structure over spontaneity.',
    creative:
      'Munich’s creative communities are quieter than Berlin’s but deeply rooted: the Kunstareal’s galleries and museums anchor the fine-art scene, Schwabing carries a century of artist cafés and bookshops, and Glockenbach and Haidhausen host the densest clusters of studios and project spaces. The AdBK and Munich’s design and music schools feed a steady stream of graduates into a freelance economy built on referrals and craft. Formats include open studio weekends, gallery walkthroughs, portfolio reviews, and music production circles that share rehearsal space. The city’s wealth shows in the venues — well-equipped ateliers, professional print shops, and beautiful Kaffeehäuser — and its order shows in how communities organise: fixed evenings, clear structures, reliable hosts. Creative communities here tend to be smaller and more deliberate, which suits makers who value depth over scale. Starting a creative community in Munich is realistic: pick a craft, a district, and a regular evening, and the city’s density of curious, skilled people will find you.',
    political:
      'Munich’s civic landscape is defined by the Bezirksausschuss — the district committees that give each of the city’s 25 districts a real voice in local planning — and by a strong tradition of Bürgerbegehren, citizens’ initiatives that can force public votes. Housing, mobility, and green space are the issues that animate residents: rent and density debates, cycling and tram projects, and the preservation of the city’s beer gardens and Isar meadows all have active campaigns. Neighbourhood centres, community gardens, and church halls host assemblies where newcomers are welcome. The political culture values competence and process: Munich residents respond to well-organised initiatives with clear proposals, and they reward groups that do their homework. Civic tech volunteers build tools for participatory budgeting and city data, while countless volunteer projects care for parks, libraries, and refugee support. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing initiatives — the landscape is organised enough that collaboration beats competition.',
    meetup:
      'Munich’s meetup scene is built on the beer garden, the Isar, and the Alpenverein. The city’s beer gardens — the Englischer Garten with its Chinese Tower, the vast Hirschgarten, and riverside terraces — are public living rooms where Stammtische, family tables, and spontaneous games all coexist. In summer the Isar becomes a swimming and grilling artery, drawing groups of friends and new arrivals to the same sandbanks and meadows. Winter swaps the river for ski clubs and indoor Spieleabende, the German board game evening that fills cafés and club rooms. The city’s structure shows in the formats: hiking clubs plan weekend trips to the Alps months ahead, running groups meet at the same park gate every week, and language exchanges run on a fixed evening schedule. Newcomers who join a club or claim a Stammtisch table find belonging fast. Starting a meetup in Munich means choosing a repeatable format and a venue that will host you every time — the city’s love of regularity does the rest.',
    'small-business':
      'Munich small business communities are anchored by the Viktualienmarkt — the city’s famous daily market — and by the craft tradition of Handwerk that still shapes Bavarian commerce. Market traders, bakers, butchers, brewers, and workshop owners form tight networks built on suppliers, apprenticeships, and shared calendars. Districts like Haidhausen and Au retain clusters of family workshops where owners know each other by name. The Handwerkskammer and the chamber of commerce offer structured training, apprenticeships, and business advice, and Munich’s brewery taprooms host everything from supplier dinners to trade nights. What binds these groups is craft pride and place: a market hall or a workshop street is a natural community with a collective stake in quality and foot traffic. Newcomers typically join by attending a chamber workshop, taking a market table, or visiting a taproom event. Starting a small business community is very achievable: a monthly roundtable at a district café, with rotating topics like apprenticeships, rent, and digitalisation, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Munich is an ideal city for testing new community event ideas: beer gardens and parks are generous, the Isar offers free summer gathering spots, and the city’s club culture means residents show up when something is well organised. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Munich, from beer garden tables and Kaffeehaus back rooms to the Isar riverbanks and Alpenverein huts. Some ideas work as one-off events; others are designed to become recurring communities with a Stammtisch rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Munich’s structure do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Chinese Tower Stammtisch for newcomers',
            pitch:
              'A weekly table at the Englischer Garten’s famous beer garden where newcomers meet locals over a Maß.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'The beer garden at the Chinese Tower',
          },
          {
            title: 'Werksviertel tech breakfast',
            pitch:
              'An early breakfast where founders and engineers share the week’s wins and blockers over coffee.',
            audience: 'Founders and operators in Munich tech',
            venueType: 'A café in the Werksviertel quarter',
          },
          {
            title: 'Isar meadow mixer',
            pitch:
              'A relaxed evening picnic on the riverbanks with name cards and a rule that you meet three new people.',
            audience: 'Summer-loving residents of every age',
            venueType: 'The Isar meadows',
          },
          {
            title: 'Verein speed-dating',
            pitch:
              'Local clubs and Vereine set up tables and pitch themselves — the fastest way to find your Munich community.',
            audience: 'Newcomers looking for a club',
            venueType: 'A Bürgerhaus or club hall',
          },
          {
            title: 'Freelancer Kaffeehaus club',
            pitch:
              'A weekly morning coffee where freelancers share leads, rates, and client stories over proper coffee.',
            audience: 'Freelancers of every discipline',
            venueType: 'A Kaffeehaus in Schwabing',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'German table at the Kaffeehaus',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats learning German',
            venueType: 'A Kaffeehaus in Schwabing',
          },
          {
            title: 'Bavarian customs crash course',
            pitch:
              'A friendly introduction to Bavarian traditions — from the Leonhardifahrt to dirndl etiquette and the Krampus.',
            audience: 'Newcomers who want to understand local life',
            venueType: 'A museum or Heimatmuseum meeting room',
          },
          {
            title: 'Anmeldung and tax clinic',
            pitch:
              'A practical session on registration, tax classes, and the bureaucratic basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or chamber event room',
          },
          {
            title: 'Homebrew and beer school',
            pitch:
              'Learn the basics of brewing with a local homebrew club — hops, malt, yeast, and patience.',
            audience: 'Beer lovers and curious brewers',
            venueType: 'A brewery taproom or homebrew supply shop',
          },
          {
            title: 'Alpine safety basics',
            pitch:
              'Mountain guides teach route planning, weather reading, and the gear that keeps hikers safe in the Alps.',
            audience: 'Beginner hikers and weekend wanderers',
            venueType: 'An Alpenverein room or outdoor shop',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'English Garden lawn games',
            pitch:
              'Frisbee, badminton, and board games on the meadow by the Chinese Tower, with a potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'The Englischer Garten lawns',
          },
          {
            title: 'Isar sandbank swimming day',
            pitch:
              'A summer afternoon of swimming, grilling, and good company on the river’s sandbanks.',
            audience: 'Summer lovers and newcomers',
            venueType: 'The Isar sandbanks',
          },
          {
            title: 'Hut weekend planning night',
            pitch:
              'Alpine club members plan the season’s hut weekends and day trips over beer and maps.',
            audience: 'Hikers and mountaineers',
            venueType: 'An Alpenverein club room',
          },
          {
            title: 'Olympiapark rooftop run',
            pitch:
              'A friendly run around the Olympic park’s hills and towers, with stretching and coffee after.',
            audience: 'Runners of every pace',
            venueType: 'The Olympiapark',
          },
          {
            title: 'Christmas market Glühwein crawl',
            pitch:
              'A guided evening tour of the city’s Christmas markets with mulled wine and gingerbread stops.',
            audience: 'Winter lovers and newcomers',
            venueType: 'A Munich Christkindlmarkt',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Deep-tech roundtable',
            pitch:
              'Researchers and founders share progress on hardware, AI, and quantum projects over a working dinner.',
            audience: 'Deep-tech founders and researchers',
            venueType: 'A TUM or UnternehmerTUM meeting room',
          },
          {
            title: 'Mobility and automotive network night',
            pitch:
              'Engineers, designers, and founders shaping mobility share trends and make introductions.',
            audience: 'Mobility professionals and startups',
            venueType: 'A corporate innovation lab or event space',
          },
          {
            title: 'Biotech and life sciences table',
            pitch:
              'Scientists and entrepreneurs around the biotech campus share updates and collaboration ideas.',
            audience: 'Biotech and life science professionals',
            venueType: 'A lab-campus event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech and industry',
            venueType: 'A coworking meeting room in Werksviertel',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'A startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Kunstareal gallery night',
            pitch:
              'A guided evening walk through the museum district with talks and drinks at a gallery café.',
            audience: 'Art lovers and students',
            venueType: 'The Kunstareal district',
          },
          {
            title: 'Glockenbach open studio day',
            pitch:
              'A district of studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio yards of Glockenbach',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A rehearsal or recording studio',
          },
          {
            title: 'Traditional craft night',
            pitch:
              'Learn mending and care for lederhosen, dirndls, and folk textiles with a master craftsperson.',
            audience: 'Craft lovers and tradition-curious newcomers',
            venueType: 'A craft workshop or tailor’s studio',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'A hands-on evening of zine making with risograph printing and trading at the end.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print studio or arts space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Mieterschutz info evening',
            pitch:
              'A plain-language session on rent rules, deposits, and where to get free housing counselling.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association meeting room',
          },
          {
            title: 'Bürgerbegehren bootcamp',
            pitch:
              'Learn how citizens’ initiatives work in Munich — signatures, deadlines, and how to win a public vote.',
            audience: 'New activists and curious residents',
            venueType: 'A district committee or initiative room',
          },
          {
            title: 'Isar meadow cleanup',
            pitch:
              'A morning spent clearing litter from the riverbanks, with gloves, bags, and a grill after.',
            audience: 'River lovers and volunteers',
            venueType: 'A stretch of the Isar meadows',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Viktualienmarkt stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'The Viktualienmarkt',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Munich, recurring formats with a fixed venue — a Stammtisch, a weekly table, a monthly hike — build community fastest.',
      },
      {
        question: 'Do I need to speak German to organise?',
        answer:
          'Not to start. Many Munich groups run in English or are bilingual, especially in tech and creative scenes. A little German goes a long way with beer garden regulars and the Vereine.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Munich communities start, and the club culture gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Munich?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Munich residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Munich?',
      answer:
        'Yes. Munich has abundant venues, generous parks and beer gardens, and a strong Vereine culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — beer gardens, the Isar riverbanks, Viktualienmarkt, Alpenverein huts, public libraries — exists in Munich. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Munich?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Munich residents find or start communities.',
    },
  ],
};

export default content;
