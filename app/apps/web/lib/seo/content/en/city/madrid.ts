import type { CityContent } from '../../types';

/**
 * Madrid content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'madrid',
  pageTitles: {
    city: 'Communities in Madrid | JoinOrigin',
    cityDescription:
      'Find or start communities in Madrid — startup, creative, political, meetup, and small business groups across the Spanish capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Madrid | JoinOrigin',
      creative: 'Creative communities in Madrid | JoinOrigin',
      political: 'Political & civic communities in Madrid | JoinOrigin',
      meetup: 'Meetup & social communities in Madrid | JoinOrigin',
      'small-business': 'Small business communities in Madrid | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Madrid — founders, engineers, and operators around Malasaña, Gran Vía, and the tech hubs. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Madrid — studios, galleries, and collectives across Lavapiés, Matadero, and Malasaña. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Madrid — district boards, asociaciones de vecinos, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Madrid — tapas crawls, terrace life, Retiro park, and barrio gatherings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Madrid — market traders, family shops, and barrio networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Madrid | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Madrid — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Madrid is a city that lives outdoors and late. The day starts with coffee on a terrace, flows through the rastro flea market on Sunday, and ends with tapas in La Latina or Chueca long after midnight. This rhythm makes community life easy: almost every gathering has a natural venue — a bar terrace, a plaza, a corner of the Retiro park — and almost everyone is open to a conversation.',
    'The city’s barrios each have a distinct personality: Malasaña for indie culture, Lavapiés for its multicultural mix, Salamanca for its upscale shops, and La Latina for its tapas alleys. Universities such as the Complutense and the Autónoma feed a constant stream of students, while the city’s status as the capital attracts people from every Spanish region and much of Latin America.',
    'Madrid’s political and associative traditions are strong — from the asociaciones de vecinos that rebuilt neighbourhood life after the Franco years to the civic platforms of the 15-M movement. Communities here reward warmth and consistency: show up at the same terrace, the same plaza, the same market stall, and the city will treat you like family.',
  ],
  dataPoints: [
    'Roughly 3.3 million residents; the capital of Spain.',
    'Universities include the Complutense, the Autónoma, and the Politécnica.',
    'Public anchors: Retiro Park, the Rastro, Gran Vía, and the Madrid Río riverbank.',
    'Barrios with distinct identities — Malasaña, Chueca, Lavapiés, La Latina.',
    'Strong terrace, tapas, and rastro culture of outdoor gathering.',
    'Home to major museums — the Prado, Reina Sofía, and Thyssen.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Tech hubs and coworking floors in Malasaña',
        'Incubator rooms near Gran Vía',
        'Startup cafés in Salamanca and Chamberí',
        'University entrepreneurship spaces at the Politécnica',
        'Rooftop terraces for evening mixers',
        'Bank-converted event halls in the centre',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'SaaS and marketplace founder tables',
        'International founder mixers (English-first)',
        'Hackathons and weekend builder jams',
      ],
      howToStart: [
        'Pick a narrow vertical — SaaS, marketplaces, or AI — and an English-friendly name.',
        'Reserve a weekly slot at a Malasaña coworking or tech hub that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Studios and galleries in Lavapiés',
        'Matadero Madrid creative factory halls',
        'Design studios in Malasaña',
        'Art schools and academy workshop rooms',
        'Independent cinemas and music venues',
        'Bookstore cafés with reading corners',
      ],
      formats: [
        'Open studio weekends and portfolio nights',
        'Gallery walkthroughs with artist talks',
        'Design and illustration critique evenings',
        'Music production circles and open-mic nights',
        'Fanzine and print fairs in Lavapiés',
      ],
      howToStart: [
        'Pick a craft, a barrio, and a regular evening — specificity builds identity faster here.',
        'Find a collective studio in Lavapiés or a Matadero hall willing to host the first night.',
        'Run a first open studio session, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'District board (junta municipal) meeting rooms',
        'Asociación de vecinos halls across the barrios',
        'Community centres in every district',
        'Civic tech meetup spaces in the centre',
        'Public libraries with meeting rooms',
        'Plazas used for assemblies and rallies',
      ],
      formats: [
        'Open district board sessions',
        'Housing and rent-rights info evenings',
        'Neighbourhood association assemblies',
        'Volunteer briefings and first-shift sessions',
        'Citizen initiative planning meetings',
      ],
      howToStart: [
        'Start with one street-level concern — a market, a plaza, a rent battle — and invite the block to a first assembly.',
        'Find the asociación de vecinos that already covers your barrio and offer to co-run one meeting with them.',
        'Use the district board’s public agenda to anchor your second event around a live decision residents can influence.',
      ],
    },
    meetup: {
      venues: [
        'Terrace bars in Malasaña and La Latina',
        'Retiro Park lawns and Madrid Río banks',
        'Tapas bars along the Cava Baja',
        'Board game cafés in the centre',
        'Community centres with courtyards',
        'Sunday rastro market streets',
      ],
      formats: [
        'Weekly terrace gathering at the same time',
        'Tapas crawl through a barrio',
        'Retiro park picnics and outdoor games',
        'Language exchange tables (Spanish–English)',
        'Night-walk tours through the old town',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly terrace meet, a monthly tapas crawl — and a fixed spot.',
        'Pick a terrace bar, plaza, or park corner that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market halls — San Miguel, San Antón, Vallehermoso',
        'Rastro stallholders’ streets',
        'Family shop corridors in Salamanca and Chamberí',
        'Chamber of commerce seminar rooms',
        'Tapas bar owners’ tables',
        'Guild and association meeting rooms',
      ],
      formats: [
        'Neighbourhood owner breakfasts before opening',
        'Market stallholder planning for the season',
        'Chamber workshops on permits and digitalisation',
        'Shared buying circles for supplies',
        'Barrio commercial-walk planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market hall or shopping street — Vallehermoso’s weekend traders are a proven magnet.',
        'Invite a veteran stallholder or chamber delegate to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — permits, rent, footfall — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Madrid’s startup scene has matured rapidly into Spain’s largest, anchored by corporate headquarters, major universities, and a growing venture community around Malasaña and Gran Vía. The city combines the stability of a capital with the informality of a barrio: founders meet in coworking spaces and tech hubs during the day and continue conversations on rooftops at night. Strengths include SaaS, marketplaces, fintech, and a fast-growing AI scene, with strong ties to Latin America that make Madrid a natural bridge for Spanish-speaking founders. Formats include founder breakfasts, pitch evenings, demo days, and industry happy hours that rotate between converted bank halls and startup cafés. The scene is genuinely international — English is common in meetups, while Spanish remains the default for many local groups. The city’s later rhythm shapes events: dinners run long, and networking often continues at a terrace. Starting a startup community in Madrid works best with a narrow vertical and a regular rhythm — a monthly SaaS founders table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Madrid’s creative communities are anchored by the Golden Triangle of museums — the Prado, Reina Sofía, and Thyssen — and energised by the barrios around them. Lavapiés has become the creative frontier, with studios, galleries, and international artists, while Matadero Madrid, a converted slaughterhouse, hosts a year-round programme of exhibitions, residencies, and maker events. Malasaña carries the indie spirit of the movida, the cultural explosion that followed the Franco years, and still hosts design studios, record shops, and fanzine culture. Formats include open studio weekends, gallery walkthroughs, portfolio nights, and music production circles, with the city’s late hours turning evening critiques into late-night conversations. Independent cinemas and bookshop cafés add a literary thread that connects writers, translators, and editors. The scene is big enough to support niche communities and compact enough that word travels fast. Starting a creative community in Madrid is realistic: pick a craft, a barrio, and a regular evening, and the density of curious, skilled people will find you.',
    political:
      'Madrid’s civic landscape is defined by its asociaciones de vecinos — neighbourhood associations that were central to the recovery of democracy after the Franco years and still run local life today. The city is divided into districts with elected boards, and the civic platforms born from the 15-M movement continue to shape housing, mobility, and public space debates. Housing is the defining issue: the tourist economy has pushed rents up, producing tenant unions and campaigns for public and affordable housing that draw national attention. The Madrid Río project — a highway turned riverside park — is the city’s most visible proof that organised residents can win big transformations. Community centres in every district host meetings, classes, and volunteer groups. The political culture rewards persistence and presence: residents who show up to assemblies and speak plainly get results. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing associations — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Madrid’s meetup scene is built on the terrace, the tapas bar, and the late night. Barrios like Malasaña, Chueca, and La Latina live outdoors: terraces fill from morning coffee to midnight drinks, and the Cava Baja’s tapas alleys turn eating into a social sport. The Retiro park and the Madrid Río riverbanks offer green escapes for picnics, games, and outdoor classes, while Sunday’s rastro market turns the streets of La Latina into a moving festival. Formats include weekly terrace gatherings, tapas crawls, language exchanges (Spanish–English), board game nights, and late-night walking tours through the old town. The city’s hours are generous — a meetup that starts at nine in the evening is perfectly normal. Newcomers are welcomed with warmth, and the city’s density means a small group can fill a terrace without effort. Starting a meetup in Madrid means choosing a repeatable format and a fixed spot — a weekly terrace meet or a monthly tapas crawl — and the city’s love of company does the rest.',
    'small-business':
      'Madrid small business communities are anchored by the city’s markets, the rastro, and the family shop tradition. Market halls like San Miguel, San Antón, and Vallehermoso are not just food destinations — they are communities of stallholders who share suppliers, schedules, and gossip. The rastro, the Sunday flea market, has been running for centuries and still hosts traders who know each other across generations. Family shops in Salamanca, Chamberí, and the barrios form friendly networks of owners who compare notes on rent, staffing, and footfall. The chamber of commerce offers workshops on permits, digitalisation, and financing, while barrio commercial associations organise joint promotions and street events. What binds these groups is place: a market hall or a shopping street is a natural community with a collective stake in the neighbourhood’s life. Starting a small business community is very achievable: a monthly trader breakfast at a market hall, with rotating topics like rent, permits, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Madrid is an ideal city for testing new community event ideas: terraces and plazas are free venues, the hours are long, and the city’s associative tradition gives every group a recognised shape. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Madrid, from terrace bars and market halls to the Retiro park and Matadero’s creative halls. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Madrid’s open-air energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Terrace meet for newcomers',
            pitch:
              'A weekly gathering at the same terrace where newcomers and long-term residents trade barrio tips over cañas.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A terrace bar in Malasaña or La Latina',
          },
          {
            title: 'Founder breakfast at a rooftop',
            pitch:
              'An early breakfast on a rooftop terrace where founders share the week’s wins and blockers over coffee and tostadas.',
            audience: 'Founders and operators of every stage',
            venueType: 'A rooftop terrace café in the centre',
          },
          {
            title: 'Barrio meet-and-greet',
            pitch:
              'A low-pressure evening in one neighbourhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single barrio',
            venueType: 'A community centre or café room',
          },
          {
            title: 'Latinoamérica network night',
            pitch:
              'Professionals from across Latin America and Spain share contacts, opportunities, and a sense of home.',
            audience: 'Latin American professionals in Madrid',
            venueType: 'A coworking or cultural centre room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A coworking café in Chamberí',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Spanish table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Spanish',
            venueType: 'A café or community centre in Lavapiés',
          },
          {
            title: 'Empadronamiento and tax clinic',
            pitch:
              'A practical session on registration, the padrón, and the tax basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Flamenco history and guitar basics',
            pitch:
              'A friendly introduction to flamenco — its history, its palos, and the first chords of the guitar.',
            audience: 'Music lovers and curious beginners',
            venueType: 'A peña flamenca or music school room',
          },
          {
            title: 'Rastro finds and vintage valuation',
            pitch:
              'Antiques dealers share how to spot treasures at the Sunday flea market and what they are worth.',
            audience: 'Bargain hunters and vintage lovers',
            venueType: 'A shop near the Rastro',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to district boards, neighbourhood associations, and how to have your say.',
            audience: 'New activists and curious residents',
            venueType: 'A district board or library room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Retiro picnic and games',
            pitch:
              'Blankets, frisbee, and rowing-boat jokes in the park, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'The Retiro park lawns',
          },
          {
            title: 'Cava Baja tapas crawl',
            pitch:
              'A guided evening crawl through five tapas bars, with one shared plate and story at each.',
            audience: 'Food lovers and newcomers',
            venueType: 'The tapas bars of the Cava Baja',
          },
          {
            title: 'Madrid Río riverside ride',
            pitch:
              'A relaxed bike or scooter ride along the river park, with swimming and café stops in summer.',
            audience: 'Leisure riders of every pace',
            venueType: 'The Madrid Río riverbank paths',
          },
          {
            title: 'Board game evening at a café',
            pitch: 'A weekly stack of board games at a café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in the centre',
          },
          {
            title: 'Night walk through the old town',
            pitch:
              'A late-evening guided walk through the historic streets, ending with churros and chocolate.',
            audience: 'Night owls and newcomers',
            venueType: 'The old town streets near the Plaza Mayor',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'SaaS founders table',
            pitch:
              'A monthly roundtable for SaaS founders to share progress, pricing lessons, and partnerships.',
            audience: 'SaaS founders and operators',
            venueType: 'A tech hub meeting room in Malasaña',
          },
          {
            title: 'Marketplace and e-commerce circle',
            pitch:
              'Operators compare notes on logistics, growth, and the Latin American expansion playbook.',
            audience: 'E-commerce and marketplace operators',
            venueType: 'A coworking event room near Gran Vía',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Chamberí',
          },
          {
            title: 'Gastro-entrepreneurs night',
            pitch:
              'Chefs, food founders, and market stallholders share trends and taste-test new products.',
            audience: 'Food entrepreneurs and hospitality owners',
            venueType: 'A market hall or food-lab kitchen',
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
            title: 'Lavapiés open studio evening',
            pitch:
              'A cluster of studios opens its doors for an evening of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio streets of Lavapiés',
          },
          {
            title: 'Matadero maker visit',
            pitch:
              'A guided visit to the creative factory’s workshops and residencies, with a talk from a resident artist.',
            audience: 'Makers and art lovers',
            venueType: 'Matadero Madrid',
          },
          {
            title: 'Fanzine and risograph night',
            pitch:
              'A hands-on evening of zine making with risograph printing and trading at the end.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print studio or arts space in Malasaña',
          },
          {
            title: 'Open-mic music night',
            pitch:
              'A weekly open mic where new and seasoned musicians share two songs each in a small venue.',
            audience: 'Musicians and music lovers',
            venueType: 'A small music venue in Malasaña',
          },
          {
            title: 'Fashion upcycling night',
            pitch:
              'A clothing swap followed by a hands-on redesign session with sewing machines and a seamstress helper.',
            audience: 'Fashion lovers and makers',
            venueType: 'An atelier or community sewing room',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Renters rights info evening',
            pitch:
              'A plain-language session on rent rules, leases, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenants’ union or community centre',
          },
          {
            title: 'Asociación de vecinos open night',
            pitch:
              'An open evening at the neighbourhood association where residents set next month’s agenda.',
            audience: 'Neighbours who want to get involved',
            venueType: 'An asociación de vecinos hall',
          },
          {
            title: 'Barrio cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or plaza, with gloves and coffee supplied by local shops.',
            audience: 'Neighbours and shop owners',
            venueType: 'A chosen street in any barrio',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or urban orchard',
          },
          {
            title: 'Mercado stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like Vallehermoso',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Madrid, recurring formats with a fixed venue — a weekly terrace meet, a monthly tapas crawl — build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish to organise?',
        answer:
          'No. Many Madrid groups run in English or are bilingual, especially in tech and creative scenes. A little Spanish opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Madrid communities start, and the city’s associative tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Madrid?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real barrios, venues, and formats where Madrileños gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Madrid?',
      answer:
        'Yes. Madrid has terraces and plazas everywhere, generous park space, and a strong associative tradition. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — terrace bars, market halls, the Retiro, Matadero, community centres — exists in Madrid. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Madrid?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Madrileños find or start communities.',
    },
  ],
};

export default content;
