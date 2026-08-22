import type { CityContent } from '../../types';

/**
 * Istanbul content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'istanbul',
  pageTitles: {
    city: 'Communities in Istanbul | JoinOrigin',
    cityDescription:
      'Find or start communities in Istanbul — startup, creative, political, meetup, and small business groups across Turkey’s largest city. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Istanbul | JoinOrigin',
      creative: 'Creative communities in Istanbul | JoinOrigin',
      political: 'Political & civic communities in Istanbul | JoinOrigin',
      meetup: 'Meetup & social communities in Istanbul | JoinOrigin',
      'small-business': 'Small business communities in Istanbul | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Istanbul — founders, engineers, and operators around Kadıköy, Beşiktaş, and the e-commerce scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Istanbul — studios, galleries, and collectives across Karaköy, Kadıköy, and Beyoğlu. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Istanbul — neighbourhood solidarity networks, housing activism, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Istanbul — çay gardens, Bosphorus ferries, seaside walks, and backgammon evenings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Istanbul — bazaar traders, esnaf networks, and family shops. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Istanbul | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Istanbul — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Istanbul is the only major city in the world that spans two continents, and its communities span even more: the ferries that cross the Bosphorus connect the European side’s business districts with the Asian side’s cafés and neighbourhood life, making the boat ride itself a daily social ritual. Tea is the lubricant — çay gardens, tea shops, and the glasses served at every shop and office keep conversations flowing.',
    'The city’s layers are visible everywhere: Byzantine walls, Ottoman mosques, and modern skyscrapers share the skyline, and the same mixing shapes its people. Universities such as Boğaziçi, Istanbul University, and ITU feed a constant stream of students, while a booming e-commerce and gaming scene has made Istanbul one of the region’s startup capitals. Kadıköy on the Asian side and Karaköy on the European side anchor the creative and tech scenes.',
    'Turkish hospitality is famous for a reason: strangers are invited for tea, neighbours are treated like family, and communities form quickly around shared tables. Newcomers who embrace the çay ritual and the ferry rhythm will find Istanbul opens its doors wide.',
  ],
  dataPoints: [
    'Roughly 15.7 million residents — Turkey’s largest city, spanning two continents.',
    'Universities include Boğaziçi, Istanbul University, ITU, and Koç.',
    'A regional startup capital — e-commerce, fintech, and gaming are strengths.',
    'Public anchors: the Bosphorus, Kadıköy’s seaside, Emirgan Park, and the historic peninsula.',
    'Çay culture — tea gardens and street tea shops anchor daily community life.',
    'Bazaar and esnaf tradition — Grand Bazaar and neighbourhood shops run on personal trust.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Startup hubs and coworking floors in Kadıköy',
        'Game studio offices in Beşiktaş and Şişli',
        'Accelerator event rooms near Maslak',
        'Boğaziçi and ITU entrepreneurship spaces',
        'Tech cafés along the Moda coast',
        'Rooftop terraces with Bosphorus views',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'E-commerce and gaming founder tables',
        'Fintech and payments network nights',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — e-commerce, gaming, or fintech — and an English-friendly name.',
        'Reserve a weekly slot at a Kadıköy or Beşiktaş coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Karaköy galleries and converted warehouses',
        'Kadıköy studios and mural streets',
        'Beyoğlu ateliers and music venues',
        'Art school workshop rooms',
        'Ceramics and tile workshops',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Open studio weekends in Kadıköy',
        'Karaköy gallery walks with artist talks',
        'Design and illustration critique evenings',
        'Music production circles and jam nights',
        'Print and zine fairs in the centre',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Kadıköy for studios, Karaköy for galleries.',
        'Partner with a studio, gallery, or music venue to host the first event.',
        'Make tea the ritual: every session ends with a shared çay round and three comments per work.',
      ],
    },
    political: {
      venues: [
        'District municipality meeting rooms',
        'Neighbourhood solidarity (komşuluk) networks',
        'Housing and tenant association rooms',
        'Community kitchens and day centres',
        'Public libraries with meeting rooms',
        'Parks and squares used for assemblies',
      ],
      formats: [
        'Neighbourhood assembly meetings',
        'Housing and rent-rights info evenings',
        'Community kitchen volunteer shifts',
        'Disaster-preparedness and first-aid trainings',
        'Civic participation workshops',
      ],
      howToStart: [
        'Start with one concrete issue — a park, a housing street, a school — and map who already cares.',
        'Join the neighbourhood solidarity network in your area; trust travels through komşuluk ties.',
        'Hold your first meeting with tea and food — in Istanbul, every gathering needs a shared table.',
      ],
    },
    meetup: {
      venues: [
        'Çay bahçesi (tea gardens) in Kadıköy and Üsküdar',
        'Bosphorus ferry piers and decks',
        'Seaside walks in Moda and Beşiktaş',
        'Emirgan Park and Yıldız Park',
        'Kahvehane and backgammon cafés',
        'Community centres with garden tables',
      ],
      formats: [
        'Weekly çay garden gathering',
        'Bosphorus sunset ferry rides',
        'Seaside walks along the Bosphorus',
        'Backgammon (tavla) evenings',
        'Language exchange tables (Turkish–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly çay garden meet, a monthly ferry ride — and a fixed spot.',
        'Pick a tea garden, pier, or seaside café that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Bazaar stalls — Grand Bazaar, Spice Bazaar, Kadıköy market',
        'Esnaf (tradesmen) shop corridors',
        'Café and restaurant owner tables',
        'Chamber of commerce seminar rooms',
        'Neighbourhood bazaar squares',
        'Brewery and tea-shop tables',
      ],
      formats: [
        'Early-morning esnaf tea at the shop corridor',
        'Bazaar stallholder planning for the season',
        'Chamber clinics on permits and digitalisation',
        'Shared supplier and delivery cooperatives',
        'Neighbourhood bazaar and festival planning',
      ],
      howToStart: [
        'Anchor the group to one bazaar or shop corridor — Kadıköy market’s traders are a proven meeting point.',
        'Invite a veteran esnaf or a chamber delegate to co-host the first tea meeting.',
        'Collect the owners’ recurring headaches — permits, rent, delivery — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Istanbul’s startup scene is the largest in the region, powered by a young population, a deep engineering talent pool, and home-grown giants in e-commerce and food delivery. Kadıköy on the Asian side hosts a dense cluster of coworking spaces and startup cafés, while Beşiktaş and Maslak on the European side anchor gaming studios, fintech, and corporate innovation. Universities such as Boğaziçi and ITU feed a steady stream of graduates into early teams, and the city’s position between Europe and Asia makes it a natural hub for cross-border expansion. Formats include founder breakfasts, pitch evenings, demo days, and gaming nights that showcase the country’s proudest industry. The community is young, energetic, and increasingly English-speaking, though Turkish remains the default for local groups. Istanbul’s rhythm is social and late — meetings often continue over tea or dinner. Starting a startup community here works best with a narrow vertical and a regular rhythm — a monthly e-commerce table or a gaming founders night builds a loyal following faster than a generalist group.',
    creative:
      'Istanbul’s creative communities bridge two continents and a dozen traditions: Karaköy’s converted warehouses host galleries and design studios, Kadıköy’s streets carry the city’s liveliest murals, and Beyoğlu keeps the bohemian energy of a district that has inspired artists for a century. The city’s craft traditions — ceramics, tiles, calligraphy, and carpet weaving — connect old workshops with contemporary makers. Art schools and the city’s film and music scenes feed a steady stream of talent into a community known for visual art, music, and cinema. Formats include open studio weekends in Kadıköy, Karaköy gallery walks, design critiques, and music production circles, with çay gardens providing the natural meeting point after every event. The scene is dense and connected — a good project can travel from a Moda studio to a Karaköy gallery in a week. Starting a creative community in Istanbul is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Istanbul’s civic life is anchored by a strong culture of komşuluk — neighbourhood solidarity — and by organised movements around housing, public space, and disaster preparedness. The city’s geography makes planning a constant public question: the Bosphorus bridges, the metro expansion, and the redevelopment of old neighbourhoods are all fought over in real community consultations. Housing is a defining issue, with tenant associations and neighbourhood networks organising against displacement and rising rents. Community kitchens, day centres, and volunteer networks respond to daily needs, while the city’s experience with earthquakes has produced serious preparedness training, including first-aid and building-safety workshops that welcome newcomers. The political culture values directness and solidarity: Istanbul residents help their neighbours first and debate policy after. Starting a political community means choosing a concrete issue and a small geography, then partnering with the solidarity network that already exists in your neighbourhood — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Istanbul’s meetup scene runs on tea, water, and conversation. The çay bahçesi, the tea garden, is the city’s true public living room — glasses of tea, backgammon boards, and long conversations under the trees. The Bosphorus ferries add a floating social layer: commuters and groups alike ride the boats for the views, and a ferry gathering is a uniquely Istanbul way to meet. The seaside walks of Moda, Beşiktaş, and Üsküdar host running groups, strollers, and fishermen, while Emirgan and Yıldız parks fill with picnics and family gatherings. Backgammon evenings in kahvehane and tea gardens keep an old tradition alive, and language exchanges (Turkish–English) run across the city. The rhythm is late and generous — a meetup that starts at nine in the evening is perfectly normal. Starting a meetup in Istanbul means choosing a repeatable format and a fixed spot — a weekly çay garden meet or a monthly ferry ride — and the city’s hospitality does the rest.',
    'small-business':
      'Istanbul small business communities run on the bazaar and the esnaf — the tradesmen who have anchored neighbourhood commerce for centuries. The Grand Bazaar and the Spice Bazaar are the most famous, but every neighbourhood has its own market square where stallholders know each other across generations. The esnaf culture is built on trust: shopkeepers help each other with deliveries, customers, and the endless paperwork of permits and licences. Kadıköy market and the food halls of the European side add a modern layer of young entrepreneurs who share suppliers and pop-up spaces. Chambers of commerce and trade associations offer workshops on digitalisation and exporting, while the city’s festivals give traders a shared calendar. What binds these groups is place and habit: a bazaar or a shop corridor is a natural community with a collective stake in the street’s character. Starting a small business community is very achievable: a monthly esnaf tea at a market hall, with rotating topics like permits, rent, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Istanbul is an ideal city for testing new community event ideas: çay gardens and seaside cafés are everywhere, the ferries make every meeting an adventure, and Turkish hospitality guarantees a warm welcome. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Istanbul, from tea gardens and ferry piers to bazaars and neighbourhood kitchens. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Istanbul’s hospitality do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Çay garden meet for newcomers',
            pitch:
              'A weekly gathering at the same tea garden where newcomers and long-term residents trade city tips over glasses of çay.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A çay bahçesi in Kadıköy or Üsküdar',
          },
          {
            title: 'Founder breakfast in Beşiktaş',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over Turkish coffee and simit.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in Beşiktaş',
          },
          {
            title: 'Ferry meet-and-greet',
            pitch:
              'A round-trip ferry ride where participants rotate seats and share stories across the Bosphorus.',
            audience: 'Anyone who wants to meet new people',
            venueType: 'A Bosphorus ferry pier',
          },
          {
            title: 'Expat Istanbul circle',
            pitch:
              'International residents share settling-in tips — residence permits, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in Kadıköy',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Turkish table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Turkish',
            venueType: 'A café or community centre in Kadıköy',
          },
          {
            title: 'İkamet and tax clinic',
            pitch:
              'A practical session on residence permits, registration, and the basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Turkish tea and coffee ceremony',
            pitch:
              'A friendly introduction to the rituals of Turkish tea and coffee — brewing, serving, and the grounds-reading at the end.',
            audience: 'Culture lovers and curious newcomers',
            venueType: 'A coffee house or cultural centre',
          },
          {
            title: 'Ottoman history walk',
            pitch:
              'A guided walk through the historic peninsula’s layers — Byzantine, Ottoman, and modern.',
            audience: 'History lovers and newcomers',
            venueType: 'A museum or library meeting room',
          },
          {
            title: 'Turkish cuisine class',
            pitch:
              'A hands-on cooking evening of meze and mains, followed by a shared dinner with the chefs.',
            audience: 'Home cooks and food lovers',
            venueType: 'A community kitchen or cooking school',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Bosphorus sunset ferry ride',
            pitch:
              'An evening ferry ride at sunset with snacks and stories, watching the city lights come on.',
            audience: 'Sunset lovers and newcomers',
            venueType: 'A Bosphorus ferry',
          },
          {
            title: 'Moda seaside walk',
            pitch:
              'A slow evening stroll along the Kadıköy coast with tea stops and impromptu games.',
            audience: 'Walkers and seaside lovers',
            venueType: 'The Moda coastline',
          },
          {
            title: 'Emirgan Park picnic',
            pitch:
              'Blankets, frisbee, and a stroll past the tulips in one of the city’s most beautiful parks.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Emirgan Park',
          },
          {
            title: 'Backgammon evening at a tea garden',
            pitch:
              'A weekly tavla evening where beginners learn and regulars compete over endless çay.',
            audience: 'Backgammon fans and curious beginners',
            venueType: 'A kahvehane or çay bahçesi',
          },
          {
            title: 'Beyoğlu street-food crawl',
            pitch:
              'A guided evening crawl through the side streets, with one shared plate and story at each stop.',
            audience: 'Food lovers and newcomers',
            venueType: 'The streets around Istiklal Avenue',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'E-commerce founders table',
            pitch:
              'A monthly roundtable for e-commerce founders to share progress, logistics lessons, and partnerships.',
            audience: 'E-commerce founders and operators',
            venueType: 'A startup hub meeting room in Kadıköy',
          },
          {
            title: 'Gaming founders night',
            pitch:
              'Game developers and studio founders share projects, engines, and the lessons of a booming industry.',
            audience: 'Game developers and studio owners',
            venueType: 'A game studio or tech event room',
          },
          {
            title: 'Fintech and payments circle',
            pitch:
              'Founders and operators discuss payments, regulation, and the region’s fintech opportunities.',
            audience: 'Fintech founders and operators',
            venueType: 'A fintech office or event space',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Şişli',
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
            title: 'Kadıköy open studio day',
            pitch:
              'A district of studios and murals opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio streets of Kadıköy',
          },
          {
            title: 'Karaköy gallery walk',
            pitch:
              'A guided evening walk through the galleries of the converted warehouses, ending at a harbour café.',
            audience: 'Art lovers and collectors',
            venueType: 'The galleries of Karaköy',
          },
          {
            title: 'Ceramics and tile workshop',
            pitch: 'Paint your own tile in the tradition of İznik ceramics with a master potter.',
            audience: 'Craft lovers and souvenir seekers',
            venueType: 'A ceramics or tile workshop',
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
            title: 'Renters rights info evening',
            pitch:
              'A plain-language session on rent rules, contracts, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association or community centre',
          },
          {
            title: 'Komşuluk solidarity night',
            pitch:
              'Neighbours gather to map who needs help on the street — the elderly, new families, the ill — and plan support.',
            audience: 'Neighbours who want to help',
            venueType: 'A neighbourhood community room',
          },
          {
            title: 'Bosphorus coast cleanup',
            pitch:
              'A Saturday morning cleanup of a stretch of coastline, with gloves, bags, and tea supplied.',
            audience: 'Coast lovers and volunteers',
            venueType: 'A stretch of the Bosphorus shore',
          },
          {
            title: 'Community kitchen volunteer shift',
            pitch:
              'Help prepare and serve meals at a neighbourhood kitchen that feeds people in need.',
            audience: 'First-time volunteers',
            venueType: 'A community kitchen or day centre',
          },
          {
            title: 'Bazaar stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions and çay.',
            audience: 'Neighbours and food lovers',
            venueType: 'A bazaar like the Kadıköy market',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Istanbul, recurring formats with a fixed venue — a weekly çay garden meet, a monthly ferry ride — build community fastest.',
      },
      {
        question: 'Do I need to speak Turkish to organise?',
        answer:
          'No. Many Istanbul groups run in English or are bilingual, especially in tech and creative scenes. A little Turkish — and a lot of çay — opens doors with neighbours and traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Istanbul communities start, and the city’s hospitality gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Istanbul?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Istanbul residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Istanbul?',
      answer:
        'Yes. Istanbul has tea gardens, ferries, and seaside promenades as free venues, plus a famously hospitable culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — çay gardens, ferry piers, bazaars, neighbourhood kitchens, parks — exists in Istanbul. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Istanbul?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Istanbul residents find or start communities.',
    },
  ],
};

export default content;
