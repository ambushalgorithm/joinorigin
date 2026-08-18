import type { CityContent } from '../../types';

/**
 * Moscow content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'moscow',
  pageTitles: {
    city: 'Communities in Moscow | JoinOrigin',
    cityDescription:
      'Find or start communities in Moscow — startup, creative, political, meetup, and small business groups across the Russian capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Moscow | JoinOrigin',
      creative: 'Creative communities in Moscow | JoinOrigin',
      political: 'Political & civic communities in Moscow | JoinOrigin',
      meetup: 'Meetup & social communities in Moscow | JoinOrigin',
      'small-business': 'Small business communities in Moscow | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Moscow — founders, engineers, and operators around the IT scene, Skolkovo, and the city centre. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Moscow — studios, galleries, and collectives across Winzavod, Gorky Park, and the courtyards. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Moscow — volunteer networks, neighbourhood initiatives, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Moscow — park life, café tables, chess evenings, and skating on winter rinks. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Moscow — market traders, café owners, and neighbourhood shops. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Moscow | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Moscow — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Moscow is a capital of scale: grand avenues, monumental parks, and a metro system that carries the city underground in minutes. Its communities match that scale — from chess clubs and hiking clubs with thousands of members to intimate café tables in the courtyards off the big streets. The city’s rhythm balances the monumental with the personal: a Soviet-era park, a modern food hall, and a quiet courtyard can all host the same week’s gatherings.',
    'Gorky Park, Sokolniki, and the VDNKh exhibition grounds give Moscow residents free, famous places to gather, while the Sparrow Hills overlook the river from above. Universities such as Moscow State University, HSE, and Bauman feed a constant stream of students, and the city’s IT sector — anchored by giants like Yandex — makes it one of Europe’s largest tech communities. The metro connects everything, so a group can meet anywhere in the city in thirty minutes.',
    'Moscow culture values depth: chess, literature, theatre, and music are taken seriously, and communities often form around shared obsessions rather than casual interests. Newcomers who bring genuine curiosity and show up consistently will find the city’s doors open.',
  ],
  dataPoints: [
    'Roughly 10.4 million residents; the capital of Russia.',
    'Universities include Moscow State University, HSE, and Bauman.',
    'One of Europe’s largest IT sectors, anchored by companies like Yandex.',
    'Public anchors: Gorky Park, Sokolniki, VDNKh, and the Sparrow Hills.',
    'Strong theatre, chess, and literary cultures — deep interests anchor communities.',
    'The metro connects every district — cross-city attendance is practical.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking floors in the city centre',
        'IT campus event rooms — Skolkovo and the innovation parks',
        'Yandex and tech-company open spaces',
        'HSE and Bauman entrepreneurship rooms',
        'Startup cafés around Gorky Park',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Metro-meets-tech breakfasts in rotating districts',
        'Demo days with corporate partners',
        'Fintech and AI roundtables',
        'Engineers’ showcase nights',
        'Cross-border founder evenings (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, AI, or B2B SaaS — and an English-friendly name.',
        'Book a rotating weekly slot across three city-centre coworking floors so no commute repeats.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Winzavod contemporary-art courtyards',
        'Garage museum and Gorky Park pavilions',
        'Studios and ateliers in the courtyards',
        'Art school and academy workshop rooms',
        'Independent theatres and rehearsal spaces',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Winzavod gallery walks with artist talks',
        'Studio open days in the courtyard ateliers',
        'Design and illustration critique evenings',
        'Music production circles and jam nights',
        'Independent zine and print fairs',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — the courtyards for studios, Winzavod for shows.',
        'Partner with a gallery, atelier, or theatre to host the first event.',
        'Make the ritual count: every session ends with a public review of the night’s work, then tea.',
      ],
    },
    political: {
      venues: [
        'District administration consultation rooms',
        'Volunteer and charity hub offices',
        'Housing and utility rights advice centres',
        'Clubhouses and community centres',
        'Library rooms with meeting tables',
        'Courtyard meeting corners',
      ],
      formats: [
        'Charity and volunteer orientation evenings',
        'Courtyard improvement planning sessions',
        'Housing and utility bill clinics',
        'Safety and first-aid courses',
        'Neighbourhood consultation workshops',
      ],
      howToStart: [
        'Pick one visible local problem — a broken courtyard, a busy crossing, a neglected park — and photograph it.',
        'Register the group with an established volunteer or district organisation so the city takes you seriously.',
        'Set a short, winnable first goal and announce it publicly; Moscow respects delivered results.',
      ],
    },
    meetup: {
      venues: [
        'Gorky Park and its pavilion cafés',
        'Sokolniki and the VDNKh grounds',
        'Courtyard cafés off the main streets',
        'Chess clubs and library rooms',
        'Outdoor rinks in winter',
        'Sparrow Hills viewpoint and paths',
      ],
      formats: [
        'Weekly park table at the same pavilion',
        'Chess and backgammon evenings',
        'Skating and sledging days in winter',
        'Hiking and ski club gatherings',
        'Language exchange tables (Russian–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly park meet, a monthly chess evening — and a fixed spot.',
        'Pick a pavilion, club room, or rink that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Danilovsky Market and Depo food halls',
        'Coffee roastery tasting rooms',
        'Vendor corridors in the central markets',
        'Business support centre seminar rooms',
        'Shop rows inside the courtyard blocks',
        'Flea and craft market stalls',
      ],
      formats: [
        'Pre-opening trader tea with a guest speaker',
        'Coffee-roaster cupping and sourcing nights',
        'Business support clinics on registration and online selling',
        'Joint delivery and warehousing groups',
        'Seasonal fair and festival planning tables',
      ],
      howToStart: [
        'Choose one food hall or market and start with a simple trader breakfast — the vendors already know each other, they just need a table.',
        'Bring in a business-support consultant for the second meeting; free advice is the best magnet in Moscow.',
        'Publish a monthly one-page fix-it agenda — registration, rent, deliveries — and let traders vote on the next topic.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Moscow’s tech community is one of Europe’s largest, built on a deep engineering culture and the success of home-grown giants like Yandex. The scene spans fintech, AI, marketplaces, and B2B software, with coworking floors in the centre and innovation campuses like Skolkovo providing infrastructure for early teams. HSE and Bauman feed a steady stream of engineers and analysts into startups, and the city’s scale means every vertical has a critical mass of practitioners. Formats include founder breakfasts, pitch evenings, demo days, and product network nights where founders and operators share war stories. The community is professional and results-driven — Moscow builders respect craft and working code — and increasingly international, with English common in product groups. The city’s winter rhythm shapes events: evenings are long and indoor, which suits meetups. Starting a startup community in Moscow works best with a narrow vertical and a regular rhythm — a monthly fintech table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Moscow’s creative communities are anchored by world-class institutions and a courtyard culture that keeps the scene intimate. Winzavod, the contemporary-art quarter in former winery buildings, hosts galleries and studios, while the Garage museum at Gorky Park brings international contemporary art to a broad audience. The city’s theatre tradition — from the Bolshoi to hundreds of independent stages — makes performance a central community art, and chess, literature, and classical music carry equal weight. Studios and ateliers cluster in the courtyards behind the grand streets, where makers know each other across crafts. Formats include gallery walks, studio open days, design critiques, and music production circles, with the city’s cafés providing the natural meeting point after every event. The scene is serious and ambitious — Moscow artists work at a high level and value substance. Starting a creative community in Moscow is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Moscow’s civic landscape is shaped by a strong tradition of organised volunteering and neighbourhood initiative. Volunteer networks coordinate aid, community centres host clubs and classes, and residents organise around courtyards, parks, and housing — the courtyard, the shared space behind every apartment block, is the natural unit of local life. Libraries and clubhouses anchor community activity, and district administrations hold consultations on local improvements, from park benches to road repairs. The culture values practicality and trust: Moscow residents respond to organisers who deliver concrete results and are careful about who they invite into their networks. Participation happens through established channels, and newcomers who connect with a real volunteer or neighbourhood organisation find a warm reception. Starting a civic community means choosing a concrete issue and a small geography — a courtyard, a park, a building — and partnering with an existing network rather than duplicating it. The landscape is organised enough that collaboration beats competition.',
    meetup:
      'Moscow’s meetup scene runs on parks, chess, and the seasons. Gorky Park is the city’s social heart — pavilion cafés, river walks, and summer events draw crowds all day — while Sokolniki and the VDNKh grounds offer huge green spaces for picnics and games. In winter the city turns outward: outdoor rinks fill with skaters, sledging hills appear in every park, and indoor chess and board game clubs carry the evenings. The courtyard cafés off the main streets host a quieter, more intimate scene, and language exchanges (Russian–English) run across the city. The metro makes cross-city attendance practical, so a niche interest can gather members from every district. Moscow’s culture of depth shows in the formats: chess evenings, hiking and ski clubs, theatre-going groups, and literary salons all have devoted followings. Starting a meetup in Moscow means choosing a repeatable format and a fixed venue — a weekly park table or a monthly chess evening — and the city’s scale does the rest.',
    'small-business':
      'Moscow’s small business community operates at a scale few European cities can match: the metro delivers customers from every district, food halls like Danilovsky Market and Depo anchor modern commerce, and the city’s specialty-coffee boom has turned café and roastery owners into one of the most connected professional networks in town. Business support centres and the chamber of commerce offer structured help with registration, tax, and online selling, while the courtyard shops of the older districts keep a more intimate commerce alive. The craft and flea markets add a maker layer that collaborates on fairs and festivals across the city. What binds these groups is ambition and place: a food hall or a shop row is a natural community with a collective stake in the neighbourhood’s life. Starting a small business community is very achievable: a monthly trader coffee at a market hall, with rotating topics like registration, rent, and delivery, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Moscow is an ideal city for testing new community event ideas: the parks are monumental, the metro connects everything, and the city’s culture of depth rewards well-made events. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Moscow, from park pavilions and food halls to chess clubs and courtyard ateliers. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Moscow’s scale do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Park pavilion meet for newcomers',
            pitch:
              'A weekly gathering at the same Gorky Park café where newcomers and long-term residents trade city tips.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A pavilion café in Gorky Park',
          },
          {
            title: 'Founder breakfast in the centre',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and blini.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in the city centre',
          },
          {
            title: 'Metro-line meet-and-greet',
            pitch:
              'A low-pressure evening near a station on the same metro line, with a rule that you meet three new people.',
            audience: 'Residents of a single metro corridor',
            venueType: 'A café near a chosen station',
          },
          {
            title: 'Expat Moscow circle',
            pitch:
              'International residents share settling-in tips — registration, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A specialty-coffee bar in the centre',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Russian table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Russian',
            venueType: 'A café or library room in the centre',
          },
          {
            title: 'Registration and tax clinic',
            pitch:
              'A practical session on registration, tax basics, and the administrative steps every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Banya and traditions night',
            pitch:
              'A friendly introduction to the banya ritual and the customs around it — steam, birch, and tea.',
            audience: 'Culture lovers and curious newcomers',
            venueType: 'A banya complex',
          },
          {
            title: 'Theatre-going club',
            pitch:
              'A monthly club that picks a play, reads a little background, and discusses it over tea after the show.',
            audience: 'Theatre lovers and first-timers',
            venueType: 'A theatre foyer or nearby café',
          },
          {
            title: 'Chess school evening',
            pitch:
              'A friendly evening of chess with local players — lessons for beginners and matches for the rest.',
            audience: 'Chess fans of every level',
            venueType: 'A chess club or library room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Gorky Park picnic',
            pitch:
              'Blankets, frisbee, and river views in the city’s favourite park, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Gorky Park lawns',
          },
          {
            title: 'Sokolniki forest walk',
            pitch:
              'A guided walk through the forest park’s paths, ending at a pavilion café for tea.',
            audience: 'Walkers and nature lovers',
            venueType: 'Sokolniki Park',
          },
          {
            title: 'Sparrow Hills viewpoint evening',
            pitch:
              'A sunset gathering on the hill above the river, with the city skyline as the backdrop.',
            audience: 'Sunset lovers and newcomers',
            venueType: 'The Sparrow Hills viewpoint',
          },
          {
            title: 'Winter skating evening',
            pitch:
              'A weekly skate on an outdoor rink, with warm drinks and hot snacks at the pavilion after.',
            audience: 'Skaters of every level',
            venueType: 'An outdoor rink in a city park',
          },
          {
            title: 'Hiking club gathering',
            pitch:
              'A club evening to plan weekend trips out of the city, share routes, and swap gear advice.',
            audience: 'Hikers and nature lovers',
            venueType: 'A hiking club room or outdoor shop',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share progress, regulation learnings, and partnerships.',
            audience: 'Fintech founders and operators',
            venueType: 'A fintech office or event space',
          },
          {
            title: 'AI builders night',
            pitch:
              'Engineers and researchers share real projects — models, pipelines, and lessons that did not make the blog post.',
            audience: 'AI and ML practitioners',
            venueType: 'A tech office or coworking hall',
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
            venueType: 'A design studio or agency office',
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
            title: 'Winzavod gallery walk',
            pitch:
              'A guided evening walk through the contemporary-art quarter, with talks and a café stop at the end.',
            audience: 'Art lovers and students',
            venueType: 'The galleries of Winzavod',
          },
          {
            title: 'Garage museum visit and talk',
            pitch:
              'A group visit to the contemporary-art museum with a guided tour and a discussion over coffee.',
            audience: 'Contemporary-art fans',
            venueType: 'The Garage museum at Gorky Park',
          },
          {
            title: 'Courtyard atelier open day',
            pitch:
              'A cluster of courtyard studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The ateliers in a city courtyard',
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
            title: 'Volunteer hub briefing',
            pitch:
              'An orientation at an established volunteer hub, followed by a first shift with a real team.',
            audience: 'First-time volunteers',
            venueType: 'A volunteer hub or community centre',
          },
          {
            title: 'Courtyard improvement meeting',
            pitch:
              'Neighbours gather to plan a shared courtyard — benches, planters, playgrounds — and divide the tasks.',
            audience: 'Neighbours of one building or block',
            venueType: 'A shared courtyard or clubhouse',
          },
          {
            title: 'Park cleanup morning',
            pitch:
              'A Saturday morning cleanup of a park or riverbank, with gloves, bags, and tea supplied.',
            audience: 'Park lovers and volunteers',
            venueType: 'A Moscow park',
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
            venueType: 'A food hall like Danilovsky Market',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Moscow, recurring formats with a fixed venue — a weekly park table, a monthly chess evening — build community fastest.',
      },
      {
        question: 'Do I need to speak Russian to organise?',
        answer:
          'No. Many Moscow groups run in English or are bilingual, especially in tech and creative scenes. A little Russian opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Moscow communities start, from chess clubs to hiking groups. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Moscow?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Muscovites gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Moscow?',
      answer:
        'Yes. Moscow has monumental parks, a practical metro, and a culture of deep interests — chess, theatre, hiking. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — park pavilions, food halls, chess clubs, courtyard ateliers, banyas — exists in Moscow. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Moscow?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Muscovites find or start communities.',
    },
  ],
};

export default content;
