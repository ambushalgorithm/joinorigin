import type { CityContent } from '../../types';

/**
 * Copenhagen content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'copenhagen',
  pageTitles: {
    city: 'Communities in Copenhagen | JoinOrigin',
    cityDescription:
      'Find or start communities in Copenhagen — startup, creative, political, meetup, and small business groups across the Danish capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Copenhagen | JoinOrigin',
      creative: 'Creative communities in Copenhagen | JoinOrigin',
      political: 'Political & civic communities in Copenhagen | JoinOrigin',
      meetup: 'Meetup & social communities in Copenhagen | JoinOrigin',
      'small-business': 'Small business communities in Copenhagen | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Copenhagen — founders, engineers, and operators around the sustainability, gaming, and biotech scenes. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Copenhagen — studios, galleries, and collectives across Refshaleøen, Nørrebro, and the design district. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Copenhagen — co-housing, cycling advocacy, and neighbourhood initiatives. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Copenhagen — harbour baths, park picnics, and hygge evenings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Copenhagen — Torvehallerne traders, craft breweries, and design shops. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Copenhagen | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Copenhagen — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Copenhagen is a city built on trust and bicycles. Nearly everyone cycles, most people swim in the harbour, and the Danish concept of hygge — the art of cozy, meaningful togetherness — makes community life a deliberate practice. Neighbourhoods like Nørrebro, Vesterbro, and Østerbro each have their own cafés, parks, and rhythm, and the harbour baths turn the water itself into a summer social venue.',
    'The city is also a laboratory for how communities can shape a place: co-housing (bofællesskaber) is a respected housing form, cycling advocacy has transformed the streets, and Christiania — the famous free town — has been an intentional community for decades. Universities such as the University of Copenhagen, DTU, and CBS feed a constant stream of students, and a thriving sustainability and gaming scene has made the city a magnet for international talent.',
    'Copenhageners are polite, planful, and quietly warm: communities form through shared activities — running clubs, sailing schools, repair cafés — and the city’s small scale means a group of twenty is already a lively evening. Newcomers who join an activity and respect the Danish love of punctuality and consensus will find belonging fast.',
  ],
  dataPoints: [
    'Roughly 1.2 million residents in the capital region; the capital of Denmark.',
    'Universities include the University of Copenhagen, DTU, and CBS.',
    'A global leader in sustainability — cycling, renewable energy, and green design.',
    'Public anchors: the harbour baths, Fælledparken, Reffen, and Refshaleøen.',
    'Co-housing and Christiania reflect a deep tradition of intentional communities.',
    'Hygge culture — the art of cozy gathering — is the social glue.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Sustainability hub offices near the harbour',
        'Game studio offices in the city centre',
        'Biotech campus event rooms at DTU',
        'CBS and university entrepreneurship spaces',
        'Startup cafés in Nørrebro and Vesterbro',
        'Rooftop terraces with harbour views',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'Climate and sustainability founder tables',
        'Game dev and creative-tech nights',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — climate tech, gaming, or biotech — and an English-friendly name.',
        'Reserve a weekly slot at a harbour-side hub or startup café that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Refshaleøen studios in former shipyard halls',
        'Galleries and design studios in the centre',
        'Nørrebro ateliers and project spaces',
        'Art school and academy workshop rooms',
        'Rehearsal and recording studios',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Refshaleøen open studio days',
        'Danish design walking tours',
        'Design and illustration critique evenings',
        'Music production circles and jam nights',
        'Independent zine and print fairs',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Refshaleøen for studios, the centre for design.',
        'Partner with a gallery, atelier, or studio to host the first event.',
        'Make the ritual count: every session ends with a shared review of the night’s work, then coffee.',
      ],
    },
    political: {
      venues: [
        'City council and district committee rooms',
        'Co-housing common houses',
        'Cycling advocacy organisation rooms',
        'Community centres in every district',
        'Public libraries with meeting rooms',
        'Harbour and park volunteer sheds',
      ],
      formats: [
        'Neighbourhood council consultations',
        'Co-housing and housing cooperative info evenings',
        'Cycling and street-design workshops',
        'Harbour and beach cleanup days',
        'Citizen assembly practice sessions',
      ],
      howToStart: [
        'Pick one concrete issue — a bike lane, a harbour bath, a playground — and find the existing campaign.',
        'Join the district’s community centre or housing cooperative first; local legitimacy opens doors.',
        'Use the municipality’s public consultation calendar to anchor your first event around a live decision.',
      ],
    },
    meetup: {
      venues: [
        'Harbour baths at Islands Brygge and Refshaleøen',
        'Fælledparken and the King’s Garden',
        'Cafés in Nørrebro and Vesterbro',
        'Reffen street-food stalls',
        'Community centres with café corners',
        'Sailing and kayak clubhouses',
      ],
      formats: [
        'Harbour swim mornings with coffee after',
        'Fælledparken picnics and games',
        'Weekly café table at the same spot',
        'Cycling club rides and city tours',
        'Language exchange tables (Danish–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly swim, a monthly picnic — and a fixed spot.',
        'Pick a harbour bath, park, or café that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Torvehallerne market counters',
        'Craft brewery taprooms',
        'Design shop corridors in the centre',
        'Chamber of commerce seminar rooms',
        'Food hall stalls at Reffen',
        'Makers’ market tables at festivals',
      ],
      formats: [
        'Early-morning trader coffee before opening',
        'Brewer and food producer tasting nights',
        'Chamber clinics on registration and export',
        'Shared supplier and logistics cooperatives',
        'Seasonal festival planning tables',
      ],
      howToStart: [
        'Anchor the group to one market or food hall — Torvehallerne’s traders are a proven meeting point.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first coffee meeting.',
        'Collect the owners’ recurring headaches — rent, permits, export paperwork — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Copenhagen’s startup scene punches far above its size, built on a deep engineering culture, a world-class sustainability mindset, and a surprising strength in gaming — the city that produced global hits is also home to a dense cluster of studios. Climate tech, biotech, and digital health are the other pillars, supported by DTU’s research, CBS’s business graduates, and a venture community that takes green impact seriously. Coworking spaces and startup cafés across Nørrebro and Vesterbro host founder breakfasts, pitch evenings, and demo days, while harbour-side hubs give the scene its distinctive light. English is the default in most groups, which makes Copenhagen one of Europe’s most accessible startup communities for international founders. The culture is collaborative and egalitarian — Danish founders share rather than compete, and flat hierarchies are the norm. Starting a startup community here works best with a narrow vertical and a regular rhythm — a monthly climate founders table or a game-dev night builds a loyal following faster than a generalist group.',
    creative:
      'Copenhagen’s creative communities carry the legacy of Danish design — furniture, architecture, and craftsmanship that shaped global taste — while Refshaleøen, the former shipyard island, has become the city’s most exciting creative frontier. Studios, galleries, street-food stalls, and music venues fill its industrial halls, and the annual festival season turns the whole island into a stage. Nørrebro adds a younger, multicultural energy with ateliers and project spaces, and the city’s art and design schools feed a steady stream of graduates into a scene known for design, film, and music. Formats include Refshaleøen open studio days, design walking tours, portfolio reviews, and music production circles, with harbour swims and cafés providing the natural closing ritual. The scene is compact, well-organised, and proud of its craftsmanship. Starting a creative community in Copenhagen is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Copenhagen’s civic culture is one of Europe’s most participatory, built on co-housing, cycling advocacy, and a municipal tradition of consultation. The city’s housing cooperatives and bofællesskaber — co-housing communities with shared kitchens and common houses — give residents a direct stake in how they live, and the famous bike culture was won and is maintained by organised citizens. Neighbourhood councils, community centres, and volunteer groups shape everything from playgrounds to harbour baths, and the municipality runs real public consultations before major decisions. The culture values consensus, evidence, and patience: Copenhageners expect to be heard and are willing to show up to meetings, often with data in hand. Civic tech and sustainability groups add a forward-looking layer, and the city’s climate goals are themselves a community project. Starting a political community means choosing a concrete issue and a small geography, then partnering with the existing housing, cycling, or neighbourhood networks — the landscape is organised enough that collaboration beats competition.',
    meetup:
      'Copenhagen’s meetup scene runs on the harbour, the park, and the café. The harbour baths at Islands Brygge and Refshaleøen are the city’s great summer social venues — swimming, sunbathing, and conversation on the wooden decks — and a weekly swim-and-coffee is the easiest community to start. Fælledparken hosts picnics, sports, and open-air events, while Reffen’s street-food stalls draw evening crowds that turn into impromptu parties. Cycling clubs, sailing schools, and kayak groups keep the water and the lanes busy, and the hygge tradition makes even a simple café table feel like an occasion. Board game cafés and bookshop reading rooms carry the long winter evenings. Formats include harbour swims, park picnics, board game evenings, and language exchanges (Danish–English). The city is small, safe, and beautifully planned — a group of twenty is already a lively evening. Starting a meetup in Copenhagen means choosing a repeatable format and a fixed venue, and the city’s trust and warmth do the rest.',
    'small-business':
      'Copenhagen small business communities are anchored by Torvehallerne, the glass market hall, and by a craft culture that the world knows as Danish design. The market’s traders — bakers, cheese mongers, fishmongers, and coffee roasters — form a tight community of suppliers and schedules, while the city’s craft breweries and food producers collaborate on taprooms, festivals, and export. Design shops and ateliers in the centre keep the craft tradition alive, and Reffen’s street-food stalls give young entrepreneurs a low-cost stage. The chamber of commerce offers structured help with registration, export, and sustainability certification — a growing requirement that Danish owners treat as a selling point. What binds these groups is craft pride and place: a market hall or a shop street is a natural community with a collective stake in quality and the neighbourhood’s life. Starting a small business community is very achievable: a monthly trader coffee at a market hall, with rotating topics like rent, permits, and export, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Copenhagen is an ideal city for testing new community event ideas: the harbour baths are free summer venues, the parks are generous, and the hygge tradition means people show up for well-made gatherings. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Copenhagen, from harbour baths and market halls to Refshaleøen studios and co-housing common houses. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Copenhagen’s trust do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Harbour bath meet for newcomers',
            pitch:
              'A weekly gathering at the same harbour bath where newcomers and long-term residents swap city tips over post-swim coffee.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A harbour bath like Islands Brygge',
          },
          {
            title: 'Founder breakfast at the food hall',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and smørrebrød.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café at Torvehallerne',
          },
          {
            title: 'Nørrebro meet-and-greet',
            pitch:
              'A low-pressure evening in one neighbourhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighbourhood',
            venueType: 'A café in Nørrebro',
          },
          {
            title: 'Expat Copenhagen circle',
            pitch:
              'International residents share settling-in tips — CPR numbers, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in Vesterbro',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Danish table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Danish',
            venueType: 'A café or community centre in the centre',
          },
          {
            title: 'CPR and tax clinic',
            pitch:
              'A practical session on the CPR number, registration, and the tax basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Hygge dinner traditions night',
            pitch:
              'Learn the rituals of Danish gathering — candles, coffee, and the art of cozy conversation — over a shared meal.',
            audience: 'Culture lovers and curious newcomers',
            venueType: 'A community kitchen or club room',
          },
          {
            title: 'Danish pastry baking class',
            pitch:
              'A baker teaches the layers of the legendary Danish pastry, from dough to the perfect cinnamon twist.',
            audience: 'Bakers and sweet-toothed newcomers',
            venueType: 'A bakery or cooking school',
          },
          {
            title: 'City cycling safety course',
            pitch:
              'A friendly course on riding confidently in Copenhagen traffic, taught by experienced city cyclists.',
            audience: 'New and nervous cyclists',
            venueType: 'A cycling organisation room or workshop',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Fælledparken picnic and games',
            pitch:
              'Blankets, frisbee, and board games in the city’s biggest park, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Fælledparken',
          },
          {
            title: 'Harbour swim morning',
            pitch:
              'A friendly morning swim in the clean harbour, followed by coffee and pastries at the deck café.',
            audience: 'Swimmers of every level',
            venueType: 'A harbour bath',
          },
          {
            title: 'Reffen street-food evening',
            pitch:
              'A group evening at the street-food market, sharing dishes from a dozen kitchens.',
            audience: 'Food lovers and newcomers',
            venueType: 'Reffen street-food stalls',
          },
          {
            title: 'Canal boat social',
            pitch:
              'A guided canal tour with seats that rotate, so everyone talks to everyone by the end.',
            audience: 'Anyone who wants to meet new people',
            venueType: 'A canal boat tour from the centre',
          },
          {
            title: 'Refshaleøen walk and swim',
            pitch:
              'A walk around the former shipyard island, ending with a swim and street food at the harbour.',
            audience: 'Walkers and water lovers',
            venueType: 'Refshaleøen and its harbour',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Climate founders table',
            pitch:
              'A monthly roundtable for climate and sustainability founders to share progress and partnerships.',
            audience: 'Climate tech founders and operators',
            venueType: 'A sustainability hub meeting room',
          },
          {
            title: 'Game dev night',
            pitch:
              'Game developers share projects, engines, and lessons from one of the city’s proudest industries.',
            audience: 'Game developers and enthusiasts',
            venueType: 'A game studio or tech event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in the centre',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A design studio in the centre',
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
            title: 'Refshaleøen open studio day',
            pitch:
              'A district of shipyard studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio halls of Refshaleøen',
          },
          {
            title: 'Danish design walking tour',
            pitch:
              'A guided walk through the furniture, architecture, and design shops that made Copenhagen famous.',
            audience: 'Design fans and visitors',
            venueType: 'The design district of the centre',
          },
          {
            title: 'Ceramics circle',
            pitch:
              'A weekly session where potters share wheels, kilns, and feedback on their pieces.',
            audience: 'Potters and curious beginners',
            venueType: 'A ceramics studio or community workshop',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
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
            title: 'Co-housing info evening',
            pitch:
              'Learn how bofællesskaber work — shared kitchens, common houses, and how to join or start one.',
            audience: 'Renters interested in cooperative living',
            venueType: 'A co-housing common house',
          },
          {
            title: 'Cycling advocacy ride',
            pitch:
              'A friendly ride through the city’s bike lanes with the advocates who fight for them, ending with coffee.',
            audience: 'Cyclists and street-design fans',
            venueType: 'A cycling organisation room',
          },
          {
            title: 'Harbour cleanup paddle',
            pitch:
              'A morning spent picking litter from the harbour in kayaks and canoes, with coffee afterwards.',
            audience: 'Water lovers and volunteers',
            venueType: 'A harbour-side launch point',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Torvehallerne stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'Torvehallerne market hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Copenhagen, recurring formats with a fixed venue — a weekly swim, a monthly picnic — build community fastest.',
      },
      {
        question: 'Do I need to speak Danish to organise?',
        answer:
          'No. English is widely spoken and many groups run in English. A little Danish — and a lot of hygge — opens doors with neighbours and traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Copenhagen communities start, from harbour swims to cycling clubs. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Copenhagen?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighbourhoods, venues, and formats where Copenhageners gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Copenhagen?',
      answer:
        'Yes. Copenhagen has harbour baths, parks, cafés, and a culture of participation. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — harbour baths, Torvehallerne, Refshaleøen studios, co-housing common houses, parks — exists in Copenhagen. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Copenhagen?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Copenhageners find or start communities.',
    },
  ],
};

export default content;
