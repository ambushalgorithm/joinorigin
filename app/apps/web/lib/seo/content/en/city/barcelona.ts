import type { CityContent } from '../../types';

/**
 * Barcelona content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'barcelona',
  pageTitles: {
    city: 'Communities in Barcelona | JoinOrigin',
    cityDescription:
      'Find or start communities in Barcelona — startup, creative, political, meetup, and small business groups across the Catalan capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Barcelona | JoinOrigin',
      creative: 'Creative communities in Barcelona | JoinOrigin',
      political: 'Political & civic communities in Barcelona | JoinOrigin',
      meetup: 'Meetup & social communities in Barcelona | JoinOrigin',
      'small-business': 'Small business communities in Barcelona | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Barcelona — founders, engineers, and operators around 22@, Poblenou, and the tech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Barcelona — studios, galleries, and collectives across El Raval, Poblenou, and Gràcia. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Barcelona — neighbourhood assemblies, housing activism, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Barcelona — plaza gatherings, tapas crawls, beach sessions, and terrace life. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Barcelona — market traders, vermuterías, and neighbourhood shop networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Barcelona | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Barcelona — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Barcelona is a city of plazas. From the sun-drenched squares of Gràcia to the hidden courtyards of El Born, public space is the stage for community life — improvised football games, vermouth afternoons, castells towers, and late-night conversations under plane trees. The city’s Mediterranean climate stretches the gathering season almost year-round, and the beach at Barceloneta extends it to the shoreline.',
    'The city is also a dense urban experiment: the grid of Eixample, the factory conversion of Poblenou’s 22@ district, and the hillside barrios of Carmel and Vallcabra each have their own character. Universities such as the Universitat de Barcelona, UPC, and Pompeu Fabra feed a constant stream of students, while the city’s strong cooperative and associative traditions — from neighbourhood associations to civic platforms — give communities a recognised shape.',
    'Catalan identity runs deep here, and groups that respect the language and the local rhythm earn loyalty quickly. Barcelona rewards consistency: a weekly table at the same vermutería or a monthly plaza gathering builds a community that outlasts any single event.',
  ],
  dataPoints: [
    'Roughly 1.7 million residents; the capital of Catalonia, Spain.',
    'Universities include the Universitat de Barcelona, UPC, and Pompeu Fabra.',
    '22@ in Poblenou is the city’s innovation and tech district.',
    'Mediterranean climate — plazas, terraces, and the beach host gatherings.',
    'Strong associative and cooperative traditions, from castells to neighbourhood groups.',
    'Public anchors: Ciutadella Park, Montjuïc, the Rambla, and Barceloneta beach.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        '22@ innovation district event floors',
        'Coworking spaces in Poblenou and El Born',
        'Accelerator rooms near the Glòries towers',
        'University entrepreneurship hubs at UPC and Pompeu Fabra',
        'Startup cafés around Eixample',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo nights',
        'Mobility, health, and SaaS founder tables',
        'Mobile World Congress side events all year',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — mobility, health, or SaaS — and an English-friendly name.',
        'Reserve a weekly slot at a 22@ or Poblenou coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Studios and galleries in El Raval and El Born',
        'Poblenou maker spaces in converted factories',
        'Design studios in Gràcia',
        'Art schools — EINA, BAU, Massana — workshop rooms',
        'Rehearsal rooms in the music district',
        'Roof terraces for exhibition openings',
      ],
      formats: [
        'Open studio weekends and portfolio nights',
        'Gallery walkthroughs with artist talks',
        'Design critique evenings in studio collectives',
        'Music production circles and open-mic nights',
        'Street-art and mural walks',
      ],
      howToStart: [
        'Pick a craft, a neighbourhood, and a regular evening — specificity builds identity faster here.',
        'Find a collective studio in El Raval or Poblenou willing to host the first night.',
        'Run a first open studio session, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'Neighbourhood association (associació de veïns) rooms',
        'District council chambers across the ten districts',
        'Housing activist spaces in the centre',
        'Community centres (centres cívics) in every barrio',
        'Public libraries with meeting rooms',
        'Community gardens on vacant lots',
      ],
      formats: [
        'Neighbourhood assembly meetings',
        'Housing and rent-rights info evenings',
        'District planning workshops',
        'Volunteer briefings and first-shift sessions',
        'Citizen initiative planning sessions',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a block, a barrio, or one housing policy.',
        'Attend three existing association meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organiser as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Plazas in Gràcia and El Born',
        'Terrace bars and vermuterías',
        'Barceloneta beach and the boardwalk',
        'Ciutadella Park and Montjuïc slopes',
        'Board game cafés in the centre',
        'Community centres with courtyard tables',
      ],
      formats: [
        'Weekly plaza gathering at the same time',
        'Vermouth afternoons on Sunday',
        'Beach volleyball and paddle sessions',
        'Tapas crawls through a neighbourhood',
        'Language exchange tables (Catalan, Spanish, English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly plaza meet, a Sunday vermouth — and a fixed spot.',
        'Pick a plaza, terrace bar, or beach point that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market halls — La Boqueria, Mercat de Sant Antoni',
        'Vermutería and bodega tables',
        'Gremi (guild) meeting rooms',
        'Shopkeepers’ associations in the old town',
        'Chamber of commerce seminar rooms',
        'Maker market stalls at neighbourhood fairs',
      ],
      formats: [
        'Neighbourhood trader breakfasts before opening',
        'Market stallholder planning for the season',
        'Guild and chamber workshops on permits and digitalisation',
        'Shared buying circles for supplies',
        'Festa major street-fair planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market hall or shopping street — Sant Antoni’s Sunday market is a proven meeting point.',
        'Invite a veteran stallholder or guild representative to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — permits, rent, footfall — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Barcelona’s startup scene has grown around the 22@ innovation district in Poblenou, where old textile factories now house accelerators, venture funds, and thousands of startups. The city’s strengths are visible in its companies: mobility, health tech, SaaS, and marketplaces, with a strong international founder community drawn by the climate and quality of life. Mobile World Congress puts the city on the global calendar every spring and keeps a year-round buzz of side events. Coworking spaces across Poblenou and El Born host founder breakfasts, pitch evenings, and demo days, while UPC and Pompeu Fabra feed graduates into early teams. The community is genuinely international — English is common in meetups, and Catalan and Spanish both appear depending on the room. The Mediterranean rhythm shapes the scene: events are relaxed, punctuality is flexible, and rooftop terraces are as important as boardrooms. Starting a startup community in Barcelona works best with a narrow vertical and a regular rhythm — a monthly mobility founders table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Barcelona’s creative communities live between the old town and the converted factories of Poblenou: El Raval and El Born host galleries and studios, Gràcia carries a bohemian tradition of ateliers and craft, and 22@ has become home to design and maker studios in former industrial sheds. Art schools such as EINA, BAU, and the Massana feed a steady stream of designers, illustrators, and makers into a scene known for graphic design, street art, and furniture craft. Formats include open studio weekends, portfolio reviews, design critiques, and music production circles, with roof terraces turning exhibition openings into evening parties. The city’s festivals — from La Mercè to neighbourhood festes majors — give creatives a natural calendar of deadlines and showcases. The scene is compact enough that word travels fast, and the Mediterranean light and pace infuse the work. Starting a creative community in Barcelona is realistic: pick a craft, a neighbourhood, and a regular evening, and the density of curious, skilled people will find you.',
    political:
      'Barcelona has one of Europe’s strongest traditions of civic organising: the associacions de veïns, neighbourhood associations, were central to the city’s post-franco recovery and still anchor local life today. Housing is the defining issue — the tourist economy has squeezed the rental market, producing active tenant unions, rent strikes, and campaigns for public housing that draw international attention. The city is divided into ten districts with elected councils, and centres cívics give every barrio a physical home for meetings, classes, and volunteer groups. Mobility and public space are also contested: superblocks, pedestrian streets, and green corridors are planned and fought over in real community consultations. The political culture values participation — residents expect to be heard, and well-organised groups get results. Starting a political community means choosing a concrete issue and a small geography — a block, a barrio, or one housing policy — then partnering with existing associations rather than duplicating them. The landscape is rich enough that collaboration beats competition.',
    meetup:
      'Barcelona’s meetup scene runs on the plaza, the terrace, and the beach. Neighbourhoods like Gràcia and El Born live outdoors: squares fill with families, friends, and improvised games, while Sunday vermouth turns terraces into social institutions. The beach at Barceloneta and the boardwalk host volleyball, paddle, and sunset gatherings that draw people from across the city. Ciutadella Park and Montjuïc offer green escapes for picnics and open-air exercise. Formats include weekly plaza meetups, tapas crawls, language exchanges (Catalan, Spanish, English), and board game evenings in the city’s many game cafés. The Mediterranean climate makes the outdoor season long, and the city’s density means a small group can fill a terrace without effort. Newcomers are welcomed warmly, though a little Catalan or Spanish opens doors. Starting a meetup in Barcelona means choosing a repeatable format and a fixed spot — a weekly plaza meeting or a Sunday vermouth — and the city’s love of public space does the rest.',
    'small-business':
      'Barcelona small business communities are anchored by the city’s markets, guilds, and neighbourhood streets. La Boqueria on the Rambla and the restored Mercat de Sant Antoni are not just food markets — they are tight communities of stallholders who share suppliers, schedules, and gossip. The gremis, trade guilds with centuries of history, still organise many crafts, while shopkeepers’ associations in the old town run joint promotions and street fairs. Festes majors — the annual neighbourhood festivals — are planned by committees of traders and residents who know each other by name. The chamber of commerce and district business groups offer workshops on permits, digitalisation, and financing, often in Catalan, Spanish, and English. What binds these groups is place: a market hall, a shopping street, or a plaza is a natural community with a collective stake in foot traffic and the neighbourhood’s identity. Starting a small business community is very achievable: a monthly trader breakfast at a market hall, with rotating topics like rent, permits, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Barcelona is an ideal city for testing new community event ideas: plazas and terraces are free venues, the beach extends the season, and the city’s associative tradition gives every group a recognised shape. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Barcelona, from plaza corners and vermuterías to market halls and centres cívics. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Barcelona’s open-air energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Sunday vermouth newcomers table',
            pitch:
              'A regular Sunday table at the same vermutería where newcomers and long-term locals trade barrio tips over vermouth and olives.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A vermutería in Gràcia or El Born',
          },
          {
            title: 'Founder walk-and-talk',
            pitch:
              'A morning stroll along the boardwalk where founders share the week’s wins and blockers while walking.',
            audience: 'Founders and operators of every stage',
            venueType: 'The Barceloneta boardwalk',
          },
          {
            title: 'Barrio-hopping social',
            pitch:
              'A monthly evening that rotates to a different neighbourhood each time, exploring its bars and meeting its residents.',
            audience: 'Residents and explorers of the whole city',
            venueType: 'A different centre cívic each month',
          },
          {
            title: 'Startup expat circle',
            pitch:
              'International workers in Barcelona startups share onboarding tips, visa lessons, and local business etiquette.',
            audience: 'Expats working in tech',
            venueType: 'A 22@ coworking café',
          },
          {
            title: 'Portrait swap night',
            pitch:
              'Strangers pair up, interview each other for ten minutes, and introduce their partner to the whole room.',
            audience: 'Anyone who wants to meet new people',
            venueType: 'A centre cívic sala or café back room',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Survival Catalan workshop',
            pitch:
              'A fun crash course in the Catalan phrases that open doors at the market, the pharmacy, and the neighbourhood bar.',
            audience: 'Newcomers who want to fit in fast',
            venueType: 'A public library or centre cívic',
          },
          {
            title: 'Autónomo tax clinic',
            pitch:
              'A practical session on freelance registration, invoices, and quarterly tax filings in Spain.',
            audience: 'Freelancers and international residents',
            venueType: 'A coworking or chamber event room',
          },
          {
            title: 'Castells for beginners',
            pitch:
              'Learn the basics of building human towers with a local colla — one of Catalonia’s most beloved traditions.',
            audience: 'Curious newcomers and families',
            venueType: 'A colla practice space or open plaza',
          },
          {
            title: 'Market-to-table cook night',
            pitch:
              'Shop the market together in the morning, then cook a shared Mediterranean dinner in a community kitchen.',
            audience: 'Food lovers and home cooks',
            venueType: 'A community kitchen near a market hall',
          },
          {
            title: 'Plaza chess school',
            pitch:
              'Local players teach beginners in the park, with boards provided and a friendly tournament at the end.',
            audience: 'Beginner chess players of all ages',
            venueType: 'Chess tables in a neighbourhood plaza',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Sunset beach volleyball league',
            pitch:
              'A casual weekly volleyball evening on the sand with rotating teams and a shared dinner afterwards.',
            audience: 'Casual players and beach lovers',
            venueType: 'The volleyball courts at Barceloneta',
          },
          {
            title: 'Montjuïc picnic and viewpoint walk',
            pitch:
              'A slow afternoon climb through the gardens with picnic stops at the city’s best viewpoints.',
            audience: 'Walkers and sunset lovers',
            venueType: 'Montjuïc hill and its viewpoints',
          },
          {
            title: 'Pàdel beginner nights',
            pitch:
              'A friendly introduction to padel — Spain’s favourite racket sport — with coaching and court time.',
            audience: 'Beginners and curious athletes',
            venueType: 'Local padel courts',
          },
          {
            title: 'Rooftop terrace movie night',
            pitch:
              'A summer film screening on a residential rooftop, with blankets, popcorn, and city views.',
            audience: 'Film lovers and neighbours',
            venueType: 'A shared residential rooftop terrace',
          },
          {
            title: 'Festa major volunteer squad',
            pitch:
              'Join the committee that plans a neighbourhood festa major — music, giants, and street food for everyone.',
            audience: 'Neighbours who want to give back',
            venueType: 'A neighbourhood association room',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Mobility roundtable',
            pitch:
              'Founders, engineers, and city officials discuss shared mobility trends over a working breakfast.',
            audience: 'Mobility professionals and startups',
            venueType: 'A 22@ office or event space',
          },
          {
            title: 'Health tech breakfast',
            pitch:
              'A monthly breakfast where health tech founders share progress, regulation learnings, and partnerships.',
            audience: 'Health tech founders and operators',
            venueType: 'An accelerator room in Poblenou',
          },
          {
            title: 'SaaS pricing clinic',
            pitch:
              'Founders bring their pricing pages and leave with honest feedback from operators who have done it.',
            audience: 'B2B and SaaS founders',
            venueType: 'A coworking meeting room in 22@',
          },
          {
            title: 'Data and AI practitioners night',
            pitch:
              'Practitioners share real projects — models, pipelines, and the lessons that did not make it into the blog post.',
            audience: 'Data scientists and ML engineers',
            venueType: 'A university or coworking hall',
          },
          {
            title: 'Studio owners circle',
            pitch:
              'Creative studio owners meet to compare client management, hiring, and project pricing with peers.',
            audience: 'Small design and agency owners',
            venueType: 'A design studio in Gràcia',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Trencadís mosaic workshop',
            pitch:
              'Try the broken-tile mosaic technique made famous by Gaudí and leave with your own colourful tile.',
            audience: 'Craft lovers and souvenir seekers',
            venueType: 'A ceramics or mosaic studio',
          },
          {
            title: 'Open-air art crawl through Poblenou',
            pitch:
              'A guided evening walk through the murals and galleries of the old factory district, ending at a studio bar.',
            audience: 'Art walkers and photographers',
            venueType: 'The streets and studios of Poblenou',
          },
          {
            title: 'Ceramics circle',
            pitch:
              'A weekly session where potters share wheels, kilns, and feedback on their pieces.',
            audience: 'Potters and curious beginners',
            venueType: 'A ceramics studio or community workshop',
          },
          {
            title: 'Rumba catalana jam night',
            pitch:
              'An open jam where musicians trade rumba, flamenco, and pop classics in a small neighbourhood venue.',
            audience: 'Musicians and music lovers',
            venueType: 'A small music venue in Gràcia',
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
            title: 'Renters’ rights info evening',
            pitch:
              'A plain-language session on rent rules, contracts, and where to get free housing advice in Barcelona.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenants’ union room or centre cívic',
          },
          {
            title: 'Superblock walk and talk',
            pitch:
              'Tour a superblock with its planners and residents and learn how car-free squares are designed and won.',
            audience: 'Urbanists and neighbourhood activists',
            venueType: 'A district council room or the superblock itself',
          },
          {
            title: 'Beach cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of coastline, with gloves, bags, and coffee supplied.',
            audience: 'Beach lovers and volunteers',
            venueType: 'Barceloneta beach and the promenade',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden on a vacant lot',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran stallholders share five-minute stories behind their counters, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like Sant Antoni',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Barcelona, recurring formats with a fixed venue — a weekly plaza meet, a Sunday vermouth, a monthly walk — build community fastest.',
      },
      {
        question: 'Do I need to speak Spanish or Catalan to organise?',
        answer:
          'No. Many Barcelona groups run in English or are bilingual, especially in tech and creative scenes. A little Spanish or Catalan opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Barcelona communities start, and the city’s associative tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Barcelona?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighbourhoods, venues, and formats where Barcelonins gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Barcelona?',
      answer:
        'Yes. Barcelona has plazas, terraces, and the beach as free venues, plus a strong associative tradition. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — plazas, vermuterías, market halls, centres cívics, the beach — exists in Barcelona. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Barcelona?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Barcelonins find or start communities.',
    },
  ],
};

export default content;
