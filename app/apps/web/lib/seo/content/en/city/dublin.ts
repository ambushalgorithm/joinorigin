import type { CityContent } from '../../types';

/**
 * Dublin content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'dublin',
  pageTitles: {
    city: 'Origins in Dublin | JoinOrigin',
    cityDescription:
      'Find or start Origins in Dublin — startup, creative, political, meetup, and small business groups across the Irish capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup Origins in Dublin | JoinOrigin',
      creative: 'Creative Origins in Dublin | JoinOrigin',
      political: 'Political & civic Origins in Dublin | JoinOrigin',
      meetup: 'Meetup & social Origins in Dublin | JoinOrigin',
      'small-business': 'Small business Origins in Dublin | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup Origins in Dublin — founders, engineers, and operators around the Silicon Docks, Ranelagh, and the tech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative Origins in Dublin — studios, galleries, and collectives across the Liberties, Temple Bar, and the city centre. JoinOrigin waitlist.',
      political:
        'Find or start political and civic Origins in Dublin — residents associations, housing activism, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social Origins in Dublin — pub sessions, GAA clubs, coastal swims, and park life. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business Origins in Dublin — market traders, family pubs, and neighbourhood shops. JoinOrigin waitlist.',
    },
    ideas: '30 Origin event ideas in Dublin | JoinOrigin',
    ideasDescription:
      'Discover 30 Origin event ideas in Dublin — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Dublin is a small capital with a big conversational culture. The pub is the city’s true town square — a place where a quiet pint can turn into a session of music, a job offer, or a plan to start something together. From Stoneybatter to Ranelagh, the neighbourhoods each have their own pub, their own GAA club, and their own rhythm of community life.',
    'The city has changed fast: the Silicon Docks brought global tech companies, a wave of international workers, and a startup scene that sits alongside the city’s older literary and sporting traditions. Trinity College, UCD, and DCU feed a constant stream of students, and the coast — the Forty Foot swimming spot, Howth’s cliffs, Dún Laoghaire’s pier — gives Dubliners a free outdoor stage for sea swims and cliff walks. Phoenix Park, one of Europe’s largest enclosed city parks, is the great green living room.',
    'Dubliners are famously friendly and equally famous for loving a story. Communities here form through conversation and consistency — pick a pub, a club, or a coastline, show up every week, and the city will adopt you.',
  ],
  dataPoints: [
    'Roughly 1 million residents in the city and county; the capital of Ireland.',
    'Universities include Trinity College Dublin, UCD, and DCU.',
    'The Silicon Docks host major tech companies and a growing startup scene.',
    'Public anchors: Phoenix Park, St Stephen’s Green, and the coastal walkways.',
    'Pub and session culture — music and conversation are the social glue.',
    'GAA, rugby, and football clubs anchor neighbourhood community life.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in the Silicon Docks',
        'Startup event rooms in Ranelagh and the Grand Canal Dock',
        'Incubator floors near Trinity College',
        'Tech cafés along the Grand Canal',
        'University entrepreneurship spaces at UCD and DCU',
        'Pub rooms for relaxed founder socials',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'SaaS and fintech founder tables',
        'Enterprise Ireland and chamber networking evenings',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — B2B SaaS, fintech, or health tech — and an English-friendly name.',
        'Reserve a weekly slot at a Grand Canal Dock or Ranelagh coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Studios and galleries in the Liberties',
        'Temple Bar cultural centre rooms',
        'Design studios in the city centre',
        'NCAD and art school workshop rooms',
        'Theatre and rehearsal spaces',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Open studio weekends and portfolio nights',
        'Literary pub crawls and reading nights',
        'Design and illustration critique evenings',
        'Music production circles and open-mic nights',
        'Print and zine fairs in the Liberties',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — the Liberties for studios, Temple Bar for performance.',
        'Partner with a studio, gallery, or bookshop to host the first critique night.',
        'Make feedback the ritual: every session ends with three spoken comments per work, then a pint.',
      ],
    },
    political: {
      venues: [
        'City council committee rooms',
        'Residents association halls in the suburbs',
        'Tenant union meeting spaces',
        'Parish and school halls for assemblies',
        'Community centres in every district',
        'Library meeting corners',
      ],
      formats: [
        'Open committee and council sessions',
        'Rent-pressure zone info evenings',
        'Estate and street-club planning nights',
        'Volunteer training and intake evenings',
        'Campaign canvassing and coffee mornings',
      ],
      howToStart: [
        'Start with one estate-level issue — a park, a school route, a rent battle — and invite the street to a first meeting.',
        'Knock on the residents association door and ask what they are planning; offer hands, not a lecture.',
        'Hold your second meeting in a pub back room — Dublin decisions are made over a pint as often as in chambers.',
      ],
    },
    meetup: {
      venues: [
        'Pubs with music sessions in the city centre',
        'St Stephen’s Green and Phoenix Park',
        'The Forty Foot and Dún Laoghaire pier',
        'Howth and the coastal walkways',
        'GAA club pitches and clubhouses',
        'Board game cafés in the centre',
      ],
      formats: [
        'Weekly pub corner at the same time',
        'Traditional music session nights',
        'Sea-swim mornings at the Forty Foot',
        'Cliff walks and coastal rambles',
        'GAA and sports club taster evenings',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly pub night, a monthly coastal walk — and a fixed venue.',
        'Pick a pub, park, or swimming spot that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'George’s Street Arcade and market stalls',
        'Temple Bar food market tables',
        'Family pub owners’ tables',
        'Craft brewery taprooms',
        'Chamber of commerce seminar rooms',
        'Neighbourhood shop corridors',
      ],
      formats: [
        'Early-morning trader breakfasts before the market opens',
        'Pub and restaurant owner roundtables over tea',
        'Chamber clinics on VAT, rates, and digital storefronts',
        'Shared supplier and delivery cooperatives',
        'Christmas-season trading and festival planning',
      ],
      howToStart: [
        'Anchor the group to one market or shopping street — George’s Street Arcade’s traders are a proven magnet.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — rent, rates, staffing — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Dublin’s startup scene lives in the shadow of the Silicon Docks — the Grand Canal Dock area where global tech giants built European headquarters — but it has grown its own identity around B2B SaaS, fintech, and health tech. Ranelagh, Grand Canal Dock, and the city centre host coworking spaces, incubators, and startup cafés, while Trinity, UCD, and DCU feed graduates into early teams and enterprise agencies run structured support programmes. The community is compact and conversational: founders meet at breakfasts, pitch evenings, and chamber networking events, and the pub remains the place where partnerships actually get sealed. English is the default, and the city’s international workforce makes cross-border hiring and expansion practical. The scene’s small size means introductions happen fast and reputations travel quickly. Dublin’s rhythm is social — meetings often begin on time but end over pints. Starting a startup Origin here works best with a narrow vertical and a regular rhythm — a monthly SaaS founders table or a health-tech night builds a loyal following faster than a generalist group.',
    creative:
      'Dublin’s creative communities draw on one of Europe’s great literary traditions — Joyce, Wilde, Yeats, Beckett — and on a live arts scene that fills theatres, galleries, and pubs with new work every week. The Liberties, the old working-class district, now hosts studios and creative spaces, while Temple Bar’s cultural quarter packs galleries, cinemas, and music venues into a few streets. NCAD and the city’s art schools feed a steady stream of graduates into a scene known for literature, theatre, music, and design. Formats include literary pub crawls, reading nights, open studio weekends, portfolio reviews, and music production circles, with traditional sessions adding a distinctly Irish layer. The city’s small scale means artists, writers, and musicians know each other, and collaborations cross disciplines easily. Starting a creative Origin in Dublin is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Dublin’s civic life is anchored by residents associations and a housing crisis that has made tenant organising one of the city’s most active movements. Local area committees and the city council keep planning decisions close to home, and well-organised neighbourhoods shape how housing, transport, and public space develop. Renters’ unions run clinics and campaigns that are open to newcomers, while volunteers power food banks, community gardens, and after-school programmes. The city’s history of civic mobilisation — from the housing campaigns of the last century to the marriage equality referendum — shows how quickly organised Dubliners can change national conversation. Coastal and heritage groups add another layer, caring for beaches, canals, and the city’s Georgian streetscapes. The political culture is direct and social: campaigns are won over cups of tea and pints as much as in council chambers. Starting a political Origin means choosing a concrete issue and a small geography, then partnering with existing associations — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Dublin’s meetup scene runs on the pub, the club, and the sea. The traditional music session — a few musicians, a corner of a pub, a crowd that joins in — is the city’s most beloved community format, and it happens every night somewhere in the city. GAA clubs, rugby clubs, and football clubs anchor neighbourhood life, welcoming newcomers to training and to the clubhouse afterwards. The coast is a second living room: the Forty Foot swimming spot at Sandycove hosts a famously friendly sea-swimming community, Howth’s cliffs and Dún Laoghaire’s pier draw walking groups, and Phoenix Park and St Stephen’s Green fill with picnics and games. Formats include weekly pub nights, session evenings, sea-swim mornings, coastal rambles, and board game cafés. The city is compact and walkable, and Dubliners’ love of chat means strangers become regulars quickly. Starting a meetup in Dublin means choosing a repeatable format and a fixed venue — a weekly pub night or a monthly coastal walk — and the city’s warmth does the rest.',
    'small-business':
      'Dublin small business communities are anchored by the city’s markets, family pubs, and craft producers. George’s Street Arcade, one of Europe’s oldest shopping malls, and the Temple Bar food market host communities of stallholders who share suppliers, schedules, and gossip. The family pub — often run by the same family for generations — is both a business and a neighbourhood institution, and publicans form tight networks of trust. Craft breweries and food producers have created a new layer of makers who collaborate on festivals and shared taprooms. The chamber of commerce offers workshops on permits, digitalisation, and exporting, while the city’s festivals give traders a shared calendar. What binds these groups is place and story: a market hall or a pub street is a natural community with a collective stake in the neighbourhood’s character. Starting a small business Origin is very achievable: a monthly trader breakfast at a market hall, with rotating topics like rent, rates, and staffing, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Dublin is an ideal city for testing new Origin event ideas: pubs host everything for the price of a pint, the coast and parks are free venues, and the city’s conversational culture makes strangers into regulars quickly. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Dublin, from pub corners and market halls to the Forty Foot and GAA clubhouses. Some ideas work as one-off events; others are designed to become recurring Origins with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Dublin’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Pub corner for newcomers',
            pitch:
              'A weekly gathering at the same pub corner where newcomers and long-term residents trade city tips over a pint.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A neighbourhood pub in Stoneybatter or Ranelagh',
          },
          {
            title: 'Founder breakfast at the Docklands',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and fry-ups.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in the Grand Canal Dock',
          },
          {
            title: 'Ranelagh meet-and-greet',
            pitch:
              'A low-pressure evening in one neighbourhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighbourhood',
            venueType: 'A café or community room in Ranelagh',
          },
          {
            title: 'Expat Dublin circle',
            pitch:
              'International residents share settling-in tips — PPS numbers, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café near Grafton Street',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Ciorcal comhrá — Irish conversation circle',
            pitch:
              'A relaxed Irish-language conversation circle for learners and fluent speakers, with tea and biscuits.',
            audience: 'Irish learners of every level',
            venueType: 'A cultural centre or library room',
          },
          {
            title: 'PPS number and tax clinic',
            pitch:
              'A practical session on the public services number, registration, and the basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Stout and whiskey tasting school',
            pitch:
              'A friendly evening learning to taste stout and whiskey with brewers and distillers who love their craft.',
            audience: 'Drink lovers and curious newcomers',
            venueType: 'A brewery taproom or whiskey bar',
          },
          {
            title: 'Creative writing workshop',
            pitch:
              'A supportive workshop in the city of writers, where beginners and regulars share pages and feedback.',
            audience: 'Writers of every level',
            venueType: 'A bookshop or library room',
          },
          {
            title: 'Sea-swim safety and acclimatisation',
            pitch:
              'Experienced cold-water swimmers teach the basics of safe sea swimming before the group heads in.',
            audience: 'Beginners and curious swimmers',
            venueType: 'A swimming spot like the Forty Foot',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Phoenix Park picnic and deer watch',
            pitch:
              'Blankets, frisbee, and a stroll past the deer in Europe’s largest enclosed city park.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Phoenix Park',
          },
          {
            title: 'Forty Foot swim morning',
            pitch:
              'A friendly morning sea swim with regulars, followed by coffee and stories at the nearby café.',
            audience: 'Swimmers of every level',
            venueType: 'The Forty Foot at Sandycove',
          },
          {
            title: 'Howth cliff walk',
            pitch:
              'A guided walk around the headland with sea views, harbour fish and chips at the end.',
            audience: 'Walkers and nature lovers',
            venueType: 'The Howth cliff paths',
          },
          {
            title: 'Traditional music session night',
            pitch:
              'An open session where musicians and singers gather in a pub corner and the crowd joins in.',
            audience: 'Musicians and music lovers',
            venueType: 'A pub known for sessions',
          },
          {
            title: 'GAA taster evening',
            pitch:
              'A friendly introduction to Gaelic games — hurling and football — with a local club’s players as coaches.',
            audience: 'Curious newcomers and families',
            venueType: 'A local GAA club pitch',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Tech founders table',
            pitch:
              'A monthly roundtable for tech founders to share progress, fundraising lessons, and partnerships.',
            audience: 'Tech founders and operators',
            venueType: 'A coworking meeting room in the Docklands',
          },
          {
            title: 'SaaS and sales circle',
            pitch:
              'Founders and sales leaders compare pipelines, pricing, and the art of closing in B2B SaaS.',
            audience: 'SaaS founders and sales leaders',
            venueType: 'A tech office or event space',
          },
          {
            title: 'Pharma and biotech night',
            pitch:
              'Scientists and professionals from the life-sciences cluster share updates and collaboration ideas.',
            audience: 'Pharma and biotech professionals',
            venueType: 'A science campus event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Ranelagh',
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
            title: 'Liberties open studio day',
            pitch:
              'A district of studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio streets of the Liberties',
          },
          {
            title: 'Literary pub crawl',
            pitch:
              'A guided walk through the pubs and streets of Joyce and Beckett, with readings at every stop.',
            audience: 'Book lovers and newcomers',
            venueType: 'The pubs of the city centre',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Homebrew circle',
            pitch:
              'Brewers share batches, recipes, and feedback at a regular tasting table in a taproom.',
            audience: 'Homebrewers and beer lovers',
            venueType: 'A craft brewery taproom',
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
            title: 'Renters rights info evening',
            pitch:
              'A plain-language session on rent rules, deposits, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenants’ union or community centre',
          },
          {
            title: 'Residents association open night',
            pitch:
              'An open evening at the local association where residents set next month’s agenda.',
            audience: 'Neighbours who want to get involved',
            venueType: 'A residents association hall',
          },
          {
            title: 'Coast cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of coast, with gloves, bags, and coffee supplied.',
            audience: 'Coast lovers and volunteers',
            venueType: 'A Dublin beach or headland',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like George’s Street Arcade',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Dublin, recurring formats with a fixed venue — a weekly pub night, a monthly coastal walk — build community fastest.',
      },
      {
        question: 'Do I need to be Irish to organise?',
        answer:
          'No. Dublin’s communities welcome newcomers warmly, and many groups run with a mix of locals and internationals. Showing up consistently matters far more than your accent.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Dublin Origins start, from pub sessions to GAA clubs. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Dublin?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real neighbourhoods, venues, and formats where Dubliners gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Dublin?',
      answer:
        'Yes. Dublin has pubs, parks, the coast, and a famously friendly culture. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — pubs, market halls, the Forty Foot, GAA clubhouses, Phoenix Park — exists in Dublin. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Dublin?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Dubliners find or start Origins.',
    },
  ],
};

export default content;
